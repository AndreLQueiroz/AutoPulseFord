import type {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

import Groq from 'groq-sdk';

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const fordRangerSpecs = {
  modeloBase: 'Ford Ranger 26MY',
  versoes: [
    'XLT 3.0L V6 AT 26MY',
    'Limited 3.0L V6 26MY',
    'Limited + 3.0L V6 26MY',
  ],

  motorTransmissao: {
    motor: '3.0 V6 Diesel Turbo',
    potencia: '250 cv',
    torque: '600 Nm',
    cambio: 'Automático de 10 marchas',
    combustivel: 'Diesel',
    consumoMedio: '9,55 km/L',
    eShifter: 'Sim',
    tecnologiaTurbo: 'Sim',
  },

  rodasPneus: {
    xlt: 'Rodas de liga leve 17 polegadas',
    limited: 'Rodas de liga leve 18 polegadas',
    limitedPlus: 'Rodas de liga leve 20 polegadas',
    estepe: 'Estepe full size',
    pneusATR: 'Disponível nas versões XLT e Limited',
  },

  conectividade: {
    fordPassConnect: [
      'Travamento e destravamento remoto das portas',
      'Partida remota',
      'Localização do veículo',
      'Status do veículo',
      'Alertas de saúde do veículo',
      'Loja de aplicativos',
    ],
    bluetooth: 'Sim',
    androidAutoCarPlay: 'Com cabo e wireless',
    usb: '4 entradas USB',
    carregamentoWireless: 'Sim',
    assistenciaEmergencia: 'Sim',
    multimidia: {
      xlt: 'Tela multimídia de 10 polegadas',
      limited: 'Tela multimídia de 12 polegadas',
      limitedPlus: 'Tela multimídia de 12 polegadas',
    },
    painelInstrumentos: {
      xlt: 'Tela colorida de 8 polegadas',
      limited: 'Tela colorida de 8 polegadas',
      limitedPlus: 'Tela colorida de 12,4 polegadas',
    },
  },

  seguranca: {
    airbags: '7 airbags',
    controleAntiCapotamento: 'Sim',
    controleDescida: 'Sim',
    controleAdaptativoCarga: 'Sim',
    controleReboque: 'Sim',
    freioAutomaticoPosImpacto: 'Sim',
    absOffRoad: 'Não informado como disponível',
    tpms: {
      xlt: 'Não',
      limited: 'Sim',
      limitedPlus: 'Sim',
    },
    aeb: 'Frenagem autônoma de emergência disponível nas três versões',
    alertaColisaoFrontal: 'Sim',
    limitadorVelocidade: 'Sim',
    sensoresEstacionamento: 'Dianteiro e traseiro',
    sensorChuva: 'Sim',
    farolAutomatico: 'Sim',
    freioMaoEletronico: 'Sim',
    reconhecimentoSinaisTransito: 'Sim',
  },

  assistenciasConducao: {
    pilotoAutomatico: {
      xlt: 'Sim',
      limited: 'Sim',
      limitedPlus: 'Não na forma simples, pois usa pacote mais avançado',
    },
    permanenciaFaixa: {
      xlt: 'Sim',
      limited: 'Sim',
      limitedPlus: 'Não listado no pacote simples',
    },
    centralizacaoFaixa: {
      xlt: 'Não',
      limited: 'Não',
      limitedPlus: 'Sim',
    },
    pilotoAdaptativoStopGo: {
      xlt: 'Não',
      limited: 'Não',
      limitedPlus: 'Sim',
    },
    blisTrafegoCruzado: {
      xlt: 'Não',
      limited: 'Não',
      limitedPlus: 'Sim',
    },
    reverseAEB: {
      xlt: 'Não',
      limited: 'Não',
      limitedPlus: 'Sim',
    },
    assistenciaDirecaoDefensiva: {
      xlt: 'Não',
      limited: 'Não',
      limitedPlus: 'Sim',
    },
  },

  confortoAcabamento: {
    bancosCouro: 'Sim',
    volanteCouro: 'Sim',
    manoplaCouro: 'Sim',
    painelSoftTouch: {
      xlt: 'Não',
      limited: 'Sim',
      limitedPlus: 'Sim',
    },
    bancoEletrico: '8 posições',
    arCondicionado: {
      xlt: 'Com saída para segunda fileira',
      limited: 'Automático digital de duas zonas',
      limitedPlus: 'Automático digital de duas zonas',
    },
    keylessStart: {
      xlt: 'Não',
      limited: 'Sim',
      limitedPlus: 'Sim',
    },
  },

  iluminacao: {
    faroisFullLED: 'Sim',
    luzDiurnaLED: 'Sim',
    farolAltoAutomatico: 'Sim',
    ajusteAlturaFarois: 'Sim',
    setaRetrovisor: 'Sim',
    lanternaLEDParcial: {
      xlt: 'Não',
      limited: 'Sim',
      limitedPlus: 'Sim',
    },
  },

  offRoadCarga: {
    tracao: 'AWD / tração integral nas três versões',
    diferencialTraseiroBlocante: 'Sim',
    terrainManagementSystem:
      'Sim, com modos como Auto, Sand, Snow, Mud e Rock',
    estriboLateral: 'Sim',
    protetorCacamba: {
      xlt: 'Não',
      limited: 'Sim',
      limitedPlus: 'Sim',
    },
    boxRails: {
      xlt: 'Não',
      limited: 'Sim',
      limitedPlus: 'Sim',
    },
    santoAntonio: {
      xlt: 'Não',
      limited: 'Sim',
      limitedPlus: 'Sim',
    },
    engateReboque: '3.500 kg',
    ganchosReboque: {
      xlt: '1',
      limited: '2',
      limitedPlus: '2',
    },
    protetorCarter: 'Sim',
    protetorTanqueCombustivel: 'Sim',
    bussolaInclinometros: 'Sim',
  },

  garantiaOutros: {
    garantia: '5 anos',
    cabineDupla: 'Sim',
    monitorVidaUtilOleo: 'Sim',
    assistenteTampaCacamba: 'Sim',
    travamentoEletricoCacamba: 'Sim',
    degrauAcessoCacamba: 'Sim',
    tomada12v: 'Sim',
    tapeteBorracha: 'Sim',
    preparacaoReboque: 'Sim',
  },
};

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
    } = req.body as {
      message: string;
      vehicle: unknown;
      fuelHistory: unknown;
    };

    const completion =
      await client.chat.completions.create({
        model: 'llama-3.3-70b-versatile',

        messages: [
          {
            role: 'system',
            content: `
Você é o AutoPulse AI, um copiloto automotivo inteligente da Ford.

Responda em português do Brasil.
Use linguagem moderna, natural, objetiva e fácil de entender.

Você pode ajudar com:
- especificações técnicas da Ford Ranger 26MY
- comparação entre versões XLT, Limited e Limited+
- manutenção
- consumo
- custos
- viagens
- tecnologias Ford
- direção
- dúvidas gerais do usuário

Use os dados do veículo do usuário quando fizer sentido.
Use a base técnica Ford abaixo quando perguntarem sobre especificações, tecnologia, segurança, motor, versões, conforto, off-road, conectividade ou equipamentos.

Não invente dado técnico. Se uma informação não estiver na base, diga que ela não aparece na base fornecida.

Base técnica Ford:
${JSON.stringify(fordRangerSpecs, null, 2)}

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
      response:
        completion.choices[0].message.content,
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