// =====================================================================
//  FIGHT HOUSE — ARQUIVO CENTRAL DE CONTEÚDO
//  Edite aqui: contato, horários, valores e textos das modalidades.
//  Tudo no site é gerado a partir deste arquivo.
// =====================================================================
import boxe from '../assets/modalidade-boxe.png';
import kickboxing from '../assets/modalidade-kickboxing.jpg';
import kids from '../assets/modalidade-turma-kids.jpg';
import muaythai from '../assets/modalidade-muaythai.jpg';
import personal from '../assets/modalidade-personal.jpg';
import taekwondo from '../assets/modalidade-taekwondo.jpg';
import jiujitsu from '../assets/modalidade-jiujitsu.png';

export const contato = {
  whatsapp: '5561981865159', // só números, com DDI 55
  whatsappExibicao: '(61) 98186-5159',
  instagram: 'fighthousevalparaiso',
  endereco: 'Rua 25, Qd 33, Lote 22 — Jardim Oriente, Valparaíso de Goiás - GO',
  mapsLink: 'https://maps.app.goo.gl/LMqMu6hdkqhpQJHt9',
  mapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d958.4605601691858!2d-47.991295428728066!3d-16.073674280311945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935985933b156fe9%3A0x3200b266cdfd5c95!2sAcademia%20de%20Lutas%20Fight%20House!5e0!3m2!1spt-BR!2sbr!4v1732904945823!5m2!1spt-BR!2sbr',
};

/** Gera link do WhatsApp com mensagem pronta (útil para a futura automação com IA). */
export const whatsLink = (msg = 'Olá! Vim pelo site e quero agendar uma aula experimental na Fight House.') =>
  `https://wa.me/${contato.whatsapp}?text=${encodeURIComponent(msg)}`;

export const instagramLink = `https://www.instagram.com/${contato.instagram}/`;

// ---------------------------------------------------------------------
//  MODALIDADES
//  "aulas": cada item = dias da semana + horário.
//  Dias: 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab'
// ---------------------------------------------------------------------
export const modalidades = [
  {
    id: 'boxe',
    nome: 'Boxe',
    imagem: boxe,
    cor: '#F9EF23',
    chamada: 'A nobre arte dos punhos',
    descricao:
      'O boxe utiliza apenas os punhos para ataque e defesa. Trabalha resistência, coordenação, agilidade e leitura de jogo — ideal tanto para quem quer competir quanto para quem busca condicionamento físico de alto nível.',
    beneficios: ['Queima calórica intensa', 'Reflexo e coordenação', 'Condicionamento cardiovascular', 'Alívio do estresse'],
    publico: 'Jovens e adultos, do iniciante ao competidor',
    intensidade: 4,
    aulas: [
      { dias: ['seg', 'qua', 'sex'], hora: '19:00' },
      { dias: ['ter', 'qui'], hora: '07:00' },
    ],
  },
  {
    id: 'kickboxing',
    nome: 'Kickboxing',
    imagem: kickboxing,
    cor: '#E6A12E',
    chamada: 'Socos e chutes em alta intensidade',
    descricao:
      'O kickboxing combina socos e chutes, com diversas modalidades de regras (light, full contact, K1, low kick...). Excelente para competir, ganhar condicionamento e desenvolver força, resistência e coordenação.',
    beneficios: ['Força e explosão', 'Defesa pessoal', 'Emagrecimento', 'Autoconfiança'],
    publico: 'Jovens e adultos, todos os níveis',
    intensidade: 5,
    aulas: [
      { dias: ['seg', 'qua', 'sex'], hora: '08:00' },
      { dias: ['seg', 'qua', 'sex'], hora: '20:30' },
    ],
  },
  {
    id: 'muaythai',
    nome: 'Muay Thai',
    imagem: muaythai,
    cor: '#FF5A36',
    chamada: 'A arte das oito armas',
    descricao:
      'Arte marcial tailandesa que utiliza punhos, cotovelos, joelhos e canelas — por isso é chamada de “arte das oito armas”. Melhora força, resistência e flexibilidade, sendo ideal para defesa pessoal, condicionamento e competições.',
    beneficios: ['Corpo inteiro trabalhando', 'Resistência física e mental', 'Defesa pessoal eficiente', 'Disciplina'],
    publico: 'Jovens e adultos, todos os níveis',
    intensidade: 5,
    aulas: [
      { dias: ['seg', 'qua', 'sex'], hora: '07:00' },
      { dias: ['ter', 'qui'], hora: '20:00' },
      { dias: ['ter', 'qui'], hora: '21:00' },
    ],
  },
  {
    id: 'jiujitsu',
    nome: 'Jiu-Jitsu',
    imagem: jiujitsu,
    cor: '#4DA3FF',
    chamada: 'Técnica que vence a força',
    descricao:
      'Arte marcial focada em projeções, imobilizações e finalizações no solo. Trabalha força, resistência, flexibilidade e raciocínio estratégico — o famoso “xadrez humano”. Ideal para defesa pessoal, controle corporal e competições.',
    beneficios: ['Raciocínio estratégico', 'Flexibilidade e mobilidade', 'Defesa pessoal sem impacto', 'Controle emocional'],
    publico: 'Jovens e adultos, todos os níveis',
    intensidade: 4,
    aulas: [
      { dias: ['ter', 'qui'], hora: '09:00' },
      { dias: ['ter', 'qui'], hora: '18:00' },
    ],
  },
  {
    id: 'taekwondo',
    nome: 'Taekwondo',
    imagem: taekwondo,
    cor: '#B57BFF',
    chamada: 'Velocidade e precisão olímpica',
    descricao:
      'Arte marcial coreana e esporte olímpico que combina técnica, velocidade e explosão, com ênfase em chutes rápidos e precisos. Desenvolve flexibilidade, coordenação, disciplina, autocontrole e confiança — dentro e fora do tatame.',
    beneficios: ['Flexibilidade', 'Chutes rápidos e precisos', 'Disciplina e foco', 'Esporte olímpico'],
    publico: 'Crianças, jovens e adultos',
    intensidade: 3,
    aulas: [{ dias: ['ter', 'qui'], hora: '17:30' }],
  },
  {
    id: 'fightkids',
    nome: 'Fight Kids',
    imagem: kids,
    cor: '#FF7AC6',
    chamada: 'Novidade! Kickboxing de 3 a 6 anos',
    descricao:
      'Turma de kickboxing para os pequenos de 3 a 6 anos. Aulas lúdicas e seguras que desenvolvem coordenação motora, equilíbrio, foco e respeito — brincando e gastando energia de um jeito saudável.',
    beneficios: ['Coordenação e equilíbrio', 'Foco e obediência a regras', 'Socialização', 'Gasto de energia saudável'],
    publico: 'Crianças de 3 a 6 anos',
    intensidade: 1,
    aulas: [
      { dias: ['ter', 'qui'], hora: '08:30' },
      { dias: ['ter', 'qui'], hora: '16:30' },
    ],
  },
  {
    id: 'kids',
    nome: 'Kickboxing Infantil',
    imagem: kids,
    cor: '#3DDC97',
    chamada: 'Turma infantil com a Tia Jack, a partir de 7 anos',
    descricao:
      'A turma infantil, conduzida pela professora Jacquelinne — a Tia Jack —, recebe crianças a partir de 7 anos. As aulas ensinam disciplina, respeito e coordenação de forma lúdica, promovendo saúde, confiança e desenvolvimento físico e emocional desde cedo.',
    beneficios: ['Disciplina e respeito', 'Coordenação motora', 'Combate à timidez', 'Gasto de energia saudável'],
    publico: 'Crianças a partir de 7 anos',
    intensidade: 2,
    aulas: [{ dias: ['seg', 'qua', 'sex'], hora: '17:00' }],
  },
  {
    id: 'personal',
    nome: 'Personal Fight',
    imagem: personal,
    cor: '#FFFFFF',
    chamada: 'Aulas particulares com o multicampeão Augusto Sérgio',
    descricao:
      'Treine boxe e kickboxing com o multicampeão Augusto Sérgio em aulas particulares feitas para você. Horários personalizados e atenção total para evoluir rápido, no seu ritmo — seja para competir, emagrecer ou aprender do zero.',
    beneficios: ['Horário flexível', 'Treino 100% individual', 'Evolução acelerada', 'Foco no seu objetivo'],
    publico: 'Qualquer idade e nível',
    intensidade: 4,
    aulas: [],
    sobConsulta: true,
  },
];

// ---------------------------------------------------------------------
//  PLANOS E VALORES (mensais)
// ---------------------------------------------------------------------
export const planos = {
  individual: [
    { nome: '1 modalidade', preco: 100, desc: 'Escolha a luta que mais combina com você', destaque: false },
    { nome: '2 modalidades', preco: 145, desc: 'Combine em pé e chão, ou dobre o volume', destaque: true, selo: 'Mais escolhido' },
    { nome: '3 modalidades', preco: 165, desc: 'Para quem quer viver a luta de verdade', destaque: false, selo: 'Melhor custo' },
  ],
  familia: [
    { nome: '2 pessoas', preco: 160, desc: 'Treine junto com quem você ama', destaque: false },
    { nome: '3 pessoas', preco: 210, desc: 'A família inteira no tatame', destaque: true, selo: 'Mais escolhido' },
    { nome: '4 pessoas', preco: 230, desc: 'Melhor valor por pessoa', destaque: false, selo: 'Melhor custo' },
  ],
  observacao: 'Valores mensais. Personal Fight sob consulta. A aula experimental é gratuita — agende pelo WhatsApp.',
};

// ---------------------------------------------------------------------
//  EQUIPE
// ---------------------------------------------------------------------
export const equipe = [
  { nome: 'Sérgio Ramos', papel: 'Fundador e head coach', bio: 'Pioneiro das artes marciais em Valparaíso, à frente da Fight House há mais de 17 anos.' },
  { nome: 'Jacquelinne Vasconcellos', papel: 'Cofundadora · Tia Jack', bio: 'Responsável pela turma kids, ensinando disciplina e respeito de forma leve e divertida.' },
  { nome: 'Augusto Sérgio', papel: 'Multicampeão · Personal Fight', bio: 'Atleta multicampeão de boxe e kickboxing, conduz as aulas particulares.' },
];

// ---------------------------------------------------------------------
//  PERGUNTAS FREQUENTES
// ---------------------------------------------------------------------
export const faq = [
  { q: 'Nunca lutei. Posso começar?', a: 'Pode e deve! A maioria dos nossos alunos começou do zero. As aulas são adaptadas ao seu nível e você evolui no seu ritmo, com segurança.' },
  { q: 'A aula experimental é paga?', a: 'Não! A aula experimental é gratuita. Chame a gente no WhatsApp, escolha a modalidade e o horário, e venha conhecer a academia. Venha com roupa confortável de treino e uma garrafinha de água.' },
  { q: 'Preciso comprar equipamento logo de cara?', a: 'Não. Para começar você só precisa de roupa de treino. Com o tempo indicamos o equipamento certo para cada modalidade (luvas, bandagem, caneleira, kimono...).' },
  { q: 'Qual a idade mínima para a turma kids?', a: 'A partir de 3 anos! O Fight Kids é para crianças de 3 a 6 anos (terça e quinta, 8h30 ou 16h30) e a turma infantil de kickboxing recebe a partir de 7 anos (segunda, quarta e sexta, 17h). O Taekwondo também recebe crianças.' },
  { q: 'Posso fazer mais de uma modalidade?', a: 'Sim! Os planos de 2 e 3 modalidades têm desconto progressivo — e combinar lutas em pé com jiu-jitsu é uma ótima escolha.' },
  { q: 'Tem plano família?', a: 'Tem. A partir de 2 pessoas da mesma família o valor por pessoa cai bastante. Veja a aba “Família” nos planos.' },
];

// ---------------------------------------------------------------------
//  Helpers de horários
// ---------------------------------------------------------------------
export const DIAS = [
  { id: 'seg', curto: 'Seg', longo: 'Segunda' },
  { id: 'ter', curto: 'Ter', longo: 'Terça' },
  { id: 'qua', curto: 'Qua', longo: 'Quarta' },
  { id: 'qui', curto: 'Qui', longo: 'Quinta' },
  { id: 'sex', curto: 'Sex', longo: 'Sexta' },
];

/** Lista plana: [{ dia, hora, modalidade }] ordenada por horário. */
export const gradeHorarios = modalidades
  .flatMap((m) => m.aulas.flatMap((a) => a.dias.map((dia) => ({ dia, hora: a.hora, modalidade: m }))))
  .sort((a, b) => a.hora.localeCompare(b.hora));
