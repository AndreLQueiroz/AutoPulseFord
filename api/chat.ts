import type { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from 'groq-sdk';

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const fordKnowledgeBase = {
  ranger: {
    nome: 'Ford Ranger 26MY',
    categoria: 'picape média',
    motor: '3.0 V6 Diesel Turbo',
    potencia: '250 cv',
    torque: '600 Nm',
    cambio: 'Automático de 10 marchas',
    consumoMedio: '9,55 km/L',
    foco: 'força, tecnologia, uso misto, estrada, trabalho e aventura',
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
    foco: 'cidade, estrada, versatilidade e uso misto',
    tecnologias: [
      'caçamba funcional',
      'assistências ao condutor',
      'boa proposta de uso urbano',
    ],
  },

  broncoSport: {
    nome: 'Ford Bronco Sport',
    categoria: 'SUV aventureiro',
    foco: 'aventura, off-road leve e tecnologia embarcada',
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

const modelAliases: Record<string, keyof typeof fordKnowledgeBase> = {
  ranger: 'ranger',
  'ford ranger': 'ranger',
  territory: 'territory',
  'ford territory': 'territory',
  maverick: 'maverick',
  'ford maverick': 'maverick',
  bronco: 'broncoSport',
  'bronco sport': 'broncoSport',
  'ford bronco': 'broncoSport',
  f150: 'f150',
  'f-150': 'f150',
  'ford f150': 'f150',
  'ford f-150': 'f150',
  transit: 'transit',
  'ford transit': 'transit',
  ecosport: 'ecosport',
  'eco sport': 'ecosport',
  'ford ecosport': 'ecosport',
  ka: 'ka',
  'ford ka': 'ka',
};

function normalizeText(text?: string) {
  return text
    ?.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim() || '';
}

function detectFordModel(model?: string, message?: string) {
  const fullText = normalizeText(`${model || ''} ${message || ''}`);

  for (const alias of Object.keys(modelAliases)) {
    if (fullText.includes(alias)) {
      return fordKnowledgeBase[modelAliases[alias]];
    }
  }

  return null;
}

function detectIntent(message: string) {
  const text = normalizeText(message);

  if (text.includes('consumo') || text.includes('km/l') || text.includes('gasolina') || text.includes('diesel')) {
    return 'consumo';
  }

  if (text.includes('manutencao') || text.includes('revisao') || text.includes('oleo') || text.includes('pneu')) {
    return 'manutencao';
  }

  if (text.includes('comparar') || text.includes('melhor') || text.includes('hilux') || text.includes('s10') || text.includes('ram')) {
    return 'comparacao';
  }

  if (text.includes('viagem') || text.includes('estrada') || text.includes('autonomia') || text.includes('rota')) {
    return 'viagem';
  }

  if (text.includes('problema') || text.includes('erro') || text.includes('barulho') || text.includes('falha')) {
    return 'diagnostico';
  }

  return 'geral';
}

function buildFuelSummary(fuelHistory: any) {
  if (!Array.isArray(fuelHistory) || fuelHistory.length === 0) {
    return 'Nenhum histórico de abastecimento cadastrado.';
  }

  const last = fuelHistory[fuelHistory.length - 1];

  return `
Quantidade de abastecimentos cadastrados: ${fuelHistory.length}
Último abastecimento:
${JSON.stringify(last, null, 2)}
`;
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
    const {
      message,
      vehicle,
      fuelHistory,
      history = [],
    } = req.body as {
      message: string;
      vehicle?: {
        model?: string;
        year?: string;
        version?: string;
        mileage?: number;
      };
      fuelHistory?: unknown;
      history?: Array<{
        role: 'user' | 'assistant';
        content: string;
      }>;
    };

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Mensagem inválida.',
      });
    }

    const detectedModel = detectFordModel(vehicle?.model, message);
    const intent = detectIntent(message);
    const fuelSummary = buildFuelSummary(fuelHistory);

    const safeHistory = history
      .filter((item) => item.role === 'user' || item.role === 'assistant')
      .slice(-8);

    const completion = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      temperature: 0.45,
      max_tokens: 900,

      messages: [
        {
          role: 'system',
          content: `
Você é o AutoPulse AI, um copiloto automotivo inteligente especializado em veículos Ford.

Sua função é agir como uma IA automotiva premium dentro de um app Ford.

ESTILO DE RESPOSTA:
- Responda sempre em português do Brasil.
- Seja natural, direto e útil.
- Fale como um consultor automotivo inteligente, não como um chatbot genérico.
- Use frases curtas e objetivas.
- Quando possível, dê recomendações práticas.
- Não exagere no texto.
- Não use linguagem robótica.
- Não invente dados técnicos oficiais.

PERSONALIDADE:
- Inteligente
- Confiável
- Estratégico
- Automotivo
- Prático
- Moderno

REGRAS IMPORTANTES:
1. Nunca invente potência, torque, preço, consumo, versões ou equipamentos como se fossem oficiais.
2. Se não houver dado oficial na base do app, diga: "não tenho esse dado oficial na base do app".
3. Mesmo sem dado oficial, ajude com uma explicação geral.
4. Use os dados do veículo cadastrado quando existirem.
5. Use o histórico de abastecimento quando a pergunta envolver consumo, autonomia ou custo.
6. Se a pergunta envolver diagnóstico de problema, oriente de forma preventiva e recomende avaliação profissional quando necessário.
7. Se o usuário pedir comparação, destaque vantagens e limitações com equilíbrio.
8. Se a pergunta for vaga, responda com a melhor hipótese e sugira uma próxima ação.
9. Não diga que é um modelo de linguagem.
10. Não fale de marcas concorrentes com dados inventados.

TIPOS DE RESPOSTA:
- Para consumo: explique consumo médio, possíveis causas de variação e dicas práticas.
- Para manutenção: explique riscos, prioridade e próximos cuidados.
- Para viagem: analise autonomia, conforto, segurança e preparo.
- Para comparação: compare por proposta de uso, não apenas por números.
- Para tecnologia: explique o recurso de forma simples e aplicada ao motorista.
- Para diagnóstico: organize em possíveis causas, nível de urgência e recomendação.

INTENÇÃO DETECTADA:
${intent}

BASE FORD DISPONÍVEL:
${JSON.stringify(fordKnowledgeBase, null, 2)}

MODELO DETECTADO:
${JSON.stringify(detectedModel, null, 2)}

VEÍCULO CADASTRADO PELO USUÁRIO:
${JSON.stringify(vehicle, null, 2)}

RESUMO DO HISTÓRICO DE ABASTECIMENTO:
${fuelSummary}
`,
        },

        ...safeHistory,

        {
          role: 'user',
          content: message,
        },
      ],
    });

    return res.status(200).json({
      response:
        completion.choices[0].message.content ||
        'Não consegui gerar uma resposta agora.',
      detectedModel,
      intent,
    });
  } catch (error: unknown) {
    console.error(error);

    return res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : 'Erro ao processar a resposta da IA.',
    });
  }
}