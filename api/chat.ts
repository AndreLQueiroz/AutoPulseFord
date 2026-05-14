import type { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from 'groq-sdk';

const client = new Groq({
  apiKey: process.env.REACT_APP_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const fordKnowledgeBase = {
  ranger: {
    nome: 'Ford Ranger 26MY',
    motor: '3.0 V6 Diesel Turbo',
    potencia: '250 cv',
    torque: '600 Nm',
    cambio: 'Automático de 10 marchas',
    consumoMedio: '9,55 km/L',
    tecnologias: [
      'AEB',
      'TPMS nas versões Limited e Limited+',
      'FordPass Connect',
      'Câmera 360° em versões superiores',
      'Piloto adaptativo Stop & Go na Limited+',
      'Terrain Management System',
      'Tração integral',
    ],
  },

  territory: {
    nome: 'Ford Territory',
    categoria: 'SUV médio',
    foco: 'conforto, tecnologia, conectividade e uso urbano/familiar',
    tecnologias: [
      'central multimídia',
      'assistências ao condutor',
      'conectividade',
      'recursos de conforto',
    ],
  },

  maverick: {
    nome: 'Ford Maverick',
    categoria: 'picape urbana',
    foco: 'uso misto, cidade, estrada e versatilidade',
    tecnologias: [
      'caçamba funcional',
      'assistências ao condutor',
      'boa proposta de uso urbano',
    ],
  },

  broncoSport: {
    nome: 'Ford Bronco Sport',
    categoria: 'SUV aventureiro',
    foco: 'off-road leve, aventura e tecnologia embarcada',
    tecnologias: [
      'modos de condução',
      'tração inteligente',
      'recursos off-road',
    ],
  },

  f150: {
    nome: 'Ford F-150',
    categoria: 'picape grande',
    foco: 'força, carga, reboque e desempenho',
    tecnologias: [
      'motor de alta performance',
      'capacidade de reboque',
      'tecnologias de assistência',
    ],
  },

  transit: {
    nome: 'Ford Transit',
    categoria: 'veículo comercial',
    foco: 'transporte, carga, operação profissional e frota',
    tecnologias: [
      'controle operacional',
      'conectividade',
      'uso comercial',
    ],
  },

  ecosport: {
    nome: 'Ford EcoSport',
    categoria: 'SUV compacto',
    foco: 'uso urbano, praticidade e manutenção acessível',
    tecnologias: [
      'posição elevada de dirigir',
      'multimídia em versões equipadas',
      'boa proposta urbana',
    ],
  },

  ka: {
    nome: 'Ford Ka',
    categoria: 'hatch/sedan compacto',
    foco: 'economia, cidade e manutenção simples',
    tecnologias: [
      'baixo custo de uso',
      'praticidade urbana',
      'consumo eficiente',
    ],
  },
};

function detectFordModel(model?: string) {
  const text = model?.toLowerCase() || '';

  if (text.includes('ranger')) return fordKnowledgeBase.ranger;
  if (text.includes('territory')) return fordKnowledgeBase.territory;
  if (text.includes('maverick')) return fordKnowledgeBase.maverick;
  if (text.includes('bronco')) return fordKnowledgeBase.broncoSport;
  if (text.includes('f-150') || text.includes('f150')) return fordKnowledgeBase.f150;
  if (text.includes('transit')) return fordKnowledgeBase.transit;
  if (text.includes('ecosport')) return fordKnowledgeBase.ecosport;
  if (text.includes('ka')) return fordKnowledgeBase.ka;

  return null;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Método não permitido',
    });
  }

  try {
    const { message, vehicle, fuelHistory } = req.body as {
      message: string;
      vehicle?: {
        model?: string;
      };
      fuelHistory: unknown;
    };

    const detectedModel = detectFordModel(vehicle?.model);

    const completion = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',

      messages: [
        {
          role: 'system',
          content: `
Você é o AutoPulse AI, um copiloto automotivo inteligente da Ford.

Responda em português do Brasil.
Use linguagem moderna, natural, objetiva e fácil de entender.

Você pode ajudar com:
- especificações técnicas
- tecnologias Ford
- manutenção
- consumo
- custos
- viagens
- modos de condução
- dúvidas gerais sobre carros

IMPORTANTE:
- Se o usuário perguntar sobre Ford Ranger, use a base técnica detalhada.
- Se perguntar sobre outro Ford, use a base geral abaixo.
- Se não houver especificação exata na base, diga claramente: "não tenho esse dado oficial na base do app", mas ainda ajude com uma explicação geral.
- Não invente potência, torque, consumo ou equipamentos como se fossem oficiais.
- Sempre que fizer sentido, use os dados cadastrados pelo usuário.

Base geral Ford:
${JSON.stringify(fordKnowledgeBase, null, 2)}

Modelo detectado pelo cadastro:
${JSON.stringify(detectedModel, null, 2)}

Dados cadastrados pelo usuário:
${JSON.stringify(vehicle, null, 2)}

Histórico de abastecimento:
${JSON.stringify(fuelHistory, null, 2)}
`,
        },
        {
          role: 'user',
          content: message,
        },
      ],
    });

    return res.status(200).json({
      response: completion.choices[0].message.content,
    });
  } catch (error: unknown) {
    console.error(error);

    return res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : 'Erro Groq',
    });
  }
}