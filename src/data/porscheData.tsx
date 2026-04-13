// ============================================================
//  src/types/IPorsche.ts  (emulado via window global)
//  Interfaces TypeScript para o domínio Porsche Experience
// ============================================================

/*
  interface IPorscheModel {
    id: string;
    nome: string;
    tagline: string;
    descricao: string;
    badge: string;
    badgeClass: string;
    imagem: string;
    specs: ISpec[];
    specsDetalhe: ISpecDetalhe[];
    problemas: IProblema[];
    faq: IFaq[];
  }

  interface ISpec {
    valor: string;
    label: string;
  }

  interface ISpecDetalhe {
    icone: string;
    valor: string;
    label: string;
  }

  interface IProblema {
    titulo: string;
    descricao: string;
    severidade: 'Alta' | 'Média' | 'Baixa';
  }

  interface IFaq {
    pergunta: string;
    resposta: string;
  }

  interface IAppState {
    paginaAtual: string;
    modeloSelecionado: string | null;
    favoritos: string[];
    totalFavoritos: number;
    totalModelos: number;
  }

  interface IDashboardProps {
    favoritos: string[];
    modelos: IPorscheModel[];
  }

  interface IModelCardProps {
    modelo: IPorscheModel;
    favoritado: boolean;
    onFavoritar: (id: string) => void;
    onVerDetalhes: (id: string) => void;
  }

  interface IProblemCardProps {
    problema: IProblema;
  }

  interface IFaqItemProps {
    faq: IFaq;
  }
*/

// ============================================================
//  DATA LAYER — porscheData.tsx
// ============================================================

export default [
  {
    id: '911',
    nome: 'Porsche 911',
    tagline: 'Modelo Ícone',
    descricao: 'Desde 1964, o 911 é a quintessência do esportivo. Motor boxer traseiro, silhueta inconfundível e uma evolução constante que jamais perde a essência original. De 385 cv a 640 cv na linha Turbo S, o 911 representa mais de 60 anos de engenharia alemã de precisão.',
    badge: 'Modelo Ícone',
    badgeClass: 'badge-icone',
    imagem: 'imagens/911.jpg',
    specs: [
      { valor: '385+', label: 'CV Base' },
      { valor: '640', label: 'CV Turbo S' },
      { valor: '60+', label: 'Anos' }
    ],
    specsDetalhe: [
      { icone: 'bi-speedometer2', valor: '385+', label: 'CV Base' },
      { icone: 'bi-lightning-charge', valor: '640', label: 'CV Turbo S' },
      { icone: 'bi-clock-history', valor: '3.2s', label: '0-100 km/h' },
      { icone: 'bi-wind', valor: '318', label: 'km/h Vel. Máx.' },
      { icone: 'bi-gear', valor: 'PDK', label: 'Câmbio' },
      { icone: 'bi-calendar3', valor: '60+', label: 'Anos de história' }
    ],
    problemas: [
      {
        titulo: 'Vazamento de óleo nos selos do eixo intermediário (IMS)',
        descricao: 'Problema comum em modelos 996 e 997.1 (1999–2008). O rolamento do eixo intermediário pode falhar, causando vazamentos e, em casos extremos, danos ao motor.',
        severidade: 'Alta'
      },
      {
        titulo: 'Desgaste prematuro dos cilindros (bore scoring)',
        descricao: 'Alguns modelos 991 (2012–2016) podem apresentar desgaste irregular nas paredes dos cilindros, especialmente quando não aquecidos adequadamente antes de exigir desempenho.',
        severidade: 'Média'
      },
      {
        titulo: 'Falha no atuador do turbo',
        descricao: 'Modelos turbo podem apresentar falhas no atuador wastegate, causando perda de potência e códigos de erro. Verificar durante manutenções preventivas.',
        severidade: 'Média'
      },
      {
        titulo: 'Condensação nos faróis LED',
        descricao: 'Alguns proprietários relatam acúmulo de umidade dentro dos faróis LED. Geralmente coberto por garantia quando em período válido.',
        severidade: 'Baixa'
      }
    ],
    faq: [
      { pergunta: 'Por que o motor do 911 fica na traseira?', resposta: 'O motor traseiro é uma filosofia de design desde o 911 original de 1963. Ferdinand Porsche acreditava que o peso sobre as rodas traseiras melhorava a tração. Com décadas de refinamento, a Porsche tornou essa configuração uma vantagem através da engenharia de chassi avançada.' },
      { pergunta: 'Qual a diferença entre 911 Carrera e Turbo?', resposta: 'O Carrera usa motor biturbo de 3.0L com 385–450 cv. O Turbo usa motor biturbo de 3.7L com 580–640 cv e turbocompressores de geometria variável, além de diferencial traseiro ativo e asas ativas.' },
      { pergunta: 'Qual é o intervalo de manutenção recomendado?', resposta: 'A Porsche recomenda revisão a cada 20.000 km ou 2 anos (o que ocorrer primeiro). O Porsche Vehicle Tracking System (PVTS) monitora o veículo continuamente.' },
      { pergunta: 'O 911 é adequado para uso diário?', resposta: 'Sim! O 911 é famoso por ser um esportivo completamente utilizável no dia a dia, com porta-malas frontal, ar-condicionado eficiente, e conforto suficiente para viagens longas, mantendo a performance de pista.' }
    ]
  },
  {
    id: 'taycan',
    nome: 'Porsche Taycan',
    tagline: 'Elétrico',
    descricao: 'O esportivo 100% elétrico da Porsche. Com até 761 cv na versão Turbo S e arquitetura de 800V para carregamento ultrarrápido, o Taycan redefine o que um carro elétrico pode ser. Desempenho consistente, sem compromisso.',
    badge: 'Elétrico',
    badgeClass: 'badge-eletrico',
    imagem: 'imagens/taycan.jpeg',
    specs: [
      { valor: '761cv', label: 'Turbo S' },
      { valor: '2.8s', label: '0-100 km/h' },
      { valor: '800V', label: 'Arquitetura' }
    ],
    specsDetalhe: [
      { icone: 'bi-lightning-charge', valor: '761', label: 'CV Turbo S' },
      { icone: 'bi-speedometer2', valor: '2.8s', label: '0-100 km/h' },
      { icone: 'bi-battery-charging', valor: '800V', label: 'Arquitetura' },
      { icone: 'bi-wind', valor: '260', label: 'km/h Vel. Máx.' },
      { icone: 'bi-map', valor: '500+', label: 'km Autonomia' },
      { icone: 'bi-plug', valor: '22min', label: '10–80% carga' }
    ],
    problemas: [
      {
        titulo: 'Degradação acelerada da bateria em climas quentes',
        descricao: 'Em regiões com altas temperaturas, alguns proprietários relatam degradação de bateria acima do esperado nos primeiros anos. Recomenda-se não carregar acima de 80% regularmente.',
        severidade: 'Média'
      },
      {
        titulo: 'Falha no software de gerenciamento de energia',
        descricao: 'Versões de software mais antigas apresentavam bugs no sistema de recuperação de energia, corrigidos via atualização OTA pela Porsche.',
        severidade: 'Baixa'
      },
      {
        titulo: 'Ruído anormal na suspensão traseira em baixas velocidades',
        descricao: 'Relatado em unidades de 2020–2021. A Porsche emitiu um boletim técnico e o conserto é coberto pela garantia.',
        severidade: 'Baixa'
      }
    ],
    faq: [
      { pergunta: 'Qual a autonomia real do Taycan?', resposta: 'Varia por versão: Taycan padrão ~400 km, Taycan 4S ~450 km, Turbo ~500 km (ciclo WLTP). Na prática, direção esportiva pode reduzir 20–30%.' },
      { pergunta: 'Quanto tempo leva para carregar?', resposta: 'Com carregador DC de 270kW (800V), vai de 10% a 80% em apenas 22 minutos. Em casa com carregador AC de 11kW, leva cerca de 9 horas para carga completa.' },
      { pergunta: 'O Taycan mantém performance em múltiplas acelerações?', resposta: 'Sim! Ao contrário de muitos elétricos, o Taycan usa resfriamento dedicado da bateria e motores que permitem performance consistente em track days, sem throttling térmico.' },
      { pergunta: 'Existe versão familiar do Taycan?', resposta: 'Sim, o Taycan Sport Turismo (station wagon) e o Taycan Cross Turismo com suspensão elevada e proteções de carroceria para uso misto.' }
    ]
  },
  {
    id: 'cayman',
    nome: '718 Cayman',
    tagline: 'Esportivo',
    descricao: 'Motor central, equilíbrio perfeito e precisão absoluta. O 718 Cayman oferece a experiência de condução mais pura da linha Porsche. Versões até 400 cv na configuração GT4, com foco total na conexão piloto-máquina.',
    badge: 'Esportivo',
    badgeClass: 'badge-esportivo',
    imagem: 'imagens/cayman.jpg',
    specs: [
      { valor: '400cv', label: 'GT4' },
      { valor: '3.4s', label: '0-100 km/h' },
      { valor: '304', label: 'km/h' }
    ],
    specsDetalhe: [
      { icone: 'bi-speedometer2', valor: '400', label: 'CV GT4' },
      { icone: 'bi-lightning-charge', valor: '3.4s', label: '0-100 km/h' },
      { icone: 'bi-wind', valor: '304', label: 'km/h Vel. Máx.' },
      { icone: 'bi-gear', valor: 'PDK/6M', label: 'Câmbio' },
      { icone: 'bi-arrows-angle-contract', valor: 'Central', label: 'Motor' },
      { icone: 'bi-trophy', valor: 'GT4', label: 'Versão Topo' }
    ],
    problemas: [
      {
        titulo: 'Vibração no motor 2.0T em baixas rotações',
        descricao: 'Alguns proprietários dos modelos 718 com motor 2.0 turbo relatam vibração perceptível entre 1.500–2.000 rpm. Verificar montagem do motor e suportes.',
        severidade: 'Baixa'
      },
      {
        titulo: 'Superaquecimento em uso intenso em pista',
        descricao: 'O sistema de resfriamento do 718 pode ser insuficiente em sessões longas de track day sem preparação adequada. Recomenda-se kit de resfriamento adicional.',
        severidade: 'Média'
      }
    ],
    faq: [
      { pergunta: 'Por que o motor central é superior para esportivos?', resposta: 'O motor central posiciona o peso mais pesado do carro próximo ao centro de massa, reduzindo a inércia de guinada e tornando o carro mais ágil e equilibrado em curvas.' },
      { pergunta: 'PDK ou câmbio manual no GT4?', resposta: 'O GT4 oferece ambos. O PDK é mais rápido em aceleração, mas o manual de 6 velocidades é preferido por entusiastas pela conexão e experiência de condução.' },
      { pergunta: 'Cayman vs 911: qual escolher?', resposta: 'O Cayman é mais puro e preciso para quem quer a melhor experiência de condução. O 911 oferece mais potência, uso diário e prestígio. Ambos são excepcionais.' }
    ]
  },
  {
    id: 'macan',
    nome: 'Porsche Macan',
    tagline: 'SUV',
    descricao: 'O SUV compacto mais esportivo do mundo. Agora disponível em versão 100% elétrica, o Macan combina praticidade de SUV com dinâmica de condução que envergonha muitos esportivos. Perfeito para o dia a dia sem abrir mão da emoção.',
    badge: 'SUV',
    badgeClass: 'badge-suv',
    imagem: 'imagens/macan.jpg',
    specs: [
      { valor: '639cv', label: 'Elétrico' },
      { valor: '3.3s', label: '0-100 km/h' },
      { valor: '518', label: 'km Autonomia' }
    ],
    specsDetalhe: [
      { icone: 'bi-lightning-charge', valor: '639', label: 'CV Elétrico' },
      { icone: 'bi-speedometer2', valor: '3.3s', label: '0-100 km/h' },
      { icone: 'bi-map', valor: '518', label: 'km Autonomia' },
      { icone: 'bi-wind', valor: '260', label: 'km/h Vel. Máx.' },
      { icone: 'bi-battery-charging', valor: '800V', label: 'Arquitetura' },
      { icone: 'bi-box-seam', valor: 'SUV', label: 'Categoria' }
    ],
    problemas: [
      {
        titulo: 'Desgaste prematuro dos freios dianteiros',
        descricao: 'Modelos 2014–2018 apresentam desgaste acelerado dos discos e pastilhas dianteiras, especialmente em uso urbano intenso. Troca a cada 30.000 km recomendada.',
        severidade: 'Média'
      },
      {
        titulo: 'Falha no módulo de controle da suspensão adaptativa',
        descricao: 'Em alguns modelos com PASM, o módulo de controle pode apresentar falha, resultando em mensagem de erro e suspensão travada no modo mais firme.',
        severidade: 'Média'
      }
    ],
    faq: [
      { pergunta: 'O Macan elétrico vs gasolina: qual é melhor?', resposta: 'Depende do uso. O elétrico tem mais torque instantâneo e menor custo operacional. O gasolina tem mais flexibilidade para viagens longas sem infraestrutura de carga.' },
      { pergunta: 'O Macan é bom para família?', resposta: 'Sim, com 5 lugares e porta-malas de 523L (gasolina) ou 540L (elétrico), o Macan atende bem famílias pequenas mantendo o DNA esportivo Porsche.' }
    ]
  },
  {
    id: 'panamera',
    nome: 'Porsche Panamera',
    tagline: 'Sedan',
    descricao: 'O sedan executivo de alto desempenho da Porsche. Combina o conforto de um Gran Turismo com performance de superesportivo. Disponível em versões híbridas plug-in com até 700 cv, redefinindo o que uma berlina esportiva pode oferecer.',
    badge: 'Sedan',
    badgeClass: 'badge-sedan',
    imagem: 'imagens/panamera.jpg',
    specs: [
      { valor: '700cv', label: 'Turbo S E-Hybrid' },
      { valor: '3.2s', label: '0-100 km/h' },
      { valor: '315', label: 'km/h' }
    ],
    specsDetalhe: [
      { icone: 'bi-speedometer2', valor: '700', label: 'CV Turbo S E-Hyb.' },
      { icone: 'bi-lightning-charge', valor: '3.2s', label: '0-100 km/h' },
      { icone: 'bi-wind', valor: '315', label: 'km/h Vel. Máx.' },
      { icone: 'bi-gear', valor: 'PDK', label: 'Câmbio 8vel.' },
      { icone: 'bi-plug', valor: 'PHEV', label: 'Híbrido Plug-in' },
      { icone: 'bi-people', valor: '4', label: 'Lugares' }
    ],
    problemas: [
      {
        titulo: 'Falha no sistema de bateria híbrida (PHEV)',
        descricao: 'Versões plug-in podem apresentar degradação prematura da bateria de alta tensão. Monitorar através do sistema de diagnóstico Porsche.',
        severidade: 'Média'
      },
      {
        titulo: 'Vazamento de óleo no motor V8',
        descricao: 'Modelos mais antigos com motor V8 4.8L podem apresentar vazamentos nos retentores do virabrequim após 80.000 km.',
        severidade: 'Alta'
      }
    ],
    faq: [
      { pergunta: 'O Panamera é prático para uso diário?', resposta: 'Absolutamente. Com 4 portas reais, porta-malas de 500L e sistemas de assistência avançados, o Panamera é um dos sedãs mais completos do mercado.' },
      { pergunta: 'Vale a pena o Panamera Turbo S E-Hybrid?', resposta: 'Para quem prioriza desempenho máximo e eficiência, sim. Os 700 cv com baixo consumo urbano tornam-no irresistível. O custo é elevado, mas a experiência é incomparável.' }
    ]
  },
  {
    id: 'spyder',
    nome: '718 Spyder RS',
    tagline: 'Esportivo',
    descricao: 'A versão mais extrema e descoberta da linha 718. Com motor aspirado de 500 cv derivado do GT3, o Spyder RS é a essência da condução ao ar livre levada ao limite. Produção limitada para os mais dedicados entusiastas.',
    badge: 'Esportivo',
    badgeClass: 'badge-esportivo',
    imagem: 'imagens/spyder.jpg',
    specs: [
      { valor: '500cv', label: 'Aspirado' },
      { valor: '3.4s', label: '0-100 km/h' },
      { valor: '309', label: 'km/h' }
    ],
    specsDetalhe: [
      { icone: 'bi-speedometer2', valor: '500', label: 'CV Aspirado' },
      { icone: 'bi-lightning-charge', valor: '3.4s', label: '0-100 km/h' },
      { icone: 'bi-wind', valor: '309', label: 'km/h Vel. Máx.' },
      { icone: 'bi-gear', valor: 'PDK', label: 'Câmbio' },
      { icone: 'bi-arrows-angle-contract', valor: 'Central', label: 'Motor' },
      { icone: 'bi-star', valor: 'RS', label: 'Versão' }
    ],
    problemas: [
      {
        titulo: 'Capota manual de operação complexa',
        descricao: 'A capota soft-top do Spyder requer operação manual e pode ser trabalhosa sob chuva. Recomenda-se treinar o processo antes.',
        severidade: 'Baixa'
      }
    ],
    faq: [
      { pergunta: 'O Spyder RS é um carro para uso diário?', resposta: 'Não é o mais indicado. Sem teto rígido e focado em performance, é um carro para fins de semana e track days. Ideal como segundo carro.' },
      { pergunta: 'Qual a diferença entre Spyder e Boxster?', resposta: 'O Spyder RS tem motor maior (500 cv vs 300 cv), é mais leve, mais extremo e tem capota mais simples. O Boxster é mais versátil para uso diário.' }
    ]
  }
];
