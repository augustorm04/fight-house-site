// =====================================================================
//  EVENTOS — lista manual (sempre aparece no site)
//
//  Além desta lista, o site busca automaticamente os posts do Instagram
//  @fighthousevalparaiso que falem de eventos (veja api/instagram.js e o
//  README). Use esta lista para eventos futuros, com data certinha.
//
//  Campos:
//    titulo       (obrigatório)
//    data         'AAAA-MM-DD' (obrigatório) — define se é "próximo" ou "realizado"
//    ate          'AAAA-MM-DD' (opcional) — último dia, para eventos de vários dias
//    tipo         'organiza' (a Fight House organiza) | 'participa' (a equipe compete/participa)
//                 | 'informativo' (só avisa: aparece "Próximo evento" / "Evento realizado")
//    local        texto livre
//    modalidades  ['Kickboxing', 'Muay Thai', ...]
//    descricao    texto curto
//    instagram    link do post (https://www.instagram.com/p/XXXX/)
//    imagem       flyer do evento (opcional) — coloque o arquivo em public/eventos/
//                 e use '/eventos/nome-do-arquivo.jpg'
// =====================================================================

export const eventos = [
  {
    titulo: 'CAMAM 2026 — Campeonato Municipal de Artes Marciais',
    data: '2026-11-20',
    ate: '2026-11-22',
    tipo: 'participa',
    local: 'Complexo Esportivo Jardim Oriente e Centro de Treinamento de Artes Marciais — Valparaíso de Goiás',
    modalidades: ['Boxe', 'Kickboxing', 'Taekwondo'],
    descricao: '5ª edição do maior campeonato de artes marciais de Valparaíso. Pesagem dos nossos atletas na Fight House em 20/11 (feriado, sem aulas). Abertura 20/11 às 19h; boxe e kickboxing no sábado (21/11); taekwondo no domingo (22/11). Venha torcer pelos nossos atletas!',
    instagram: 'https://www.instagram.com/camamval/',
    atletasTitulo: 'Nossos atletas no boxe — sábado, 21/11',
    atletas: [
      { nome: 'Gabriel Fyllype', categoria: 'Juvenil · 70 kg', flyer: '/eventos/camam/gabriel-fyllype.jpg' },
      { nome: 'Ravi Pöttker', categoria: 'Juvenil · 80 kg', flyer: '/eventos/camam/ravi-pottker.jpg' },
      { nome: 'Lucas André', categoria: 'Cadete · 80 kg', flyer: '/eventos/camam/lucas-andre.jpg' },
      { nome: 'Bruno Keven', categoria: 'Elite · 65 kg', flyer: '/eventos/camam/bruno-keven.jpg' },
      { nome: 'Pedro Noleto', categoria: 'Elite · 70 kg', flyer: '/eventos/camam/pedro-noleto.jpg' },
      { nome: 'Vitor Mendonça', categoria: 'Elite · 80 kg', flyer: '/eventos/camam/vitor-mendonca.jpg' },
      { nome: 'Hallyson Diego', categoria: 'Elite · +90 kg', flyer: '/eventos/camam/hallyson-diego.jpg' },
      { nome: 'Maria Isabel', categoria: 'Sparring', flyer: '/eventos/camam/maria-isabel.jpg' },
    ],
  },
  {
    titulo: 'Graduação Avançada de Muay Thai',
    data: '2026-12-06',
    tipo: 'informativo',
    local: 'Local e horário a confirmar',
    modalidades: ['Muay Thai'],
    descricao: 'Graduação avançada da equipe Impacto Muaythai: um novo nível exige mais técnica, disciplina e evolução. Pagamento até 20/11.',
    imagem: '/eventos/graduacao-avancada-muaythai-2026.jpg',
  },
  // {
  //   titulo: 'Copa Fight House de Kickboxing',
  //   data: '2027-03-14',
  //   tipo: 'organiza',
  //   local: 'Fight House — Valparaíso de Goiás',
  //   modalidades: ['Kickboxing'],
  //   descricao: 'Campeonato interno aberto a outras equipes. Inscrições pelo WhatsApp.',
  //   instagram: 'https://www.instagram.com/p/XXXXXXXX/',
  // },
];

// =====================================================================
//  POSTS DO INSTAGRAM (sem token)
//
//  Enquanto o token do Instagram não estiver configurado, o bloco
//  "Direto do Instagram" mostra estes posts incorporados.
//  Para adicionar: no Instagram, "..." → Copiar link, e cole aqui
//  (o mais novo primeiro). Funciona com /p/ e /reel/.
// =====================================================================
export const postsInstagram = [
  'https://www.instagram.com/reel/Dd07gFIKpiA/',
  'https://www.instagram.com/p/DbmFFV1AH2s/',
  'https://www.instagram.com/p/DZV9NOqGWeh/',
  'https://www.instagram.com/p/DYr-4EGIHF6/',
  'https://www.instagram.com/p/DYpRtAxxmtV/',
  'https://www.instagram.com/reel/DTWK70LDv0f/',
];

// Exemplos que aparecem APENAS no modo de desenvolvimento (npm run dev),
// para você ver como fica o layout. Nunca vão para o site publicado.
export const eventosExemplo = [
  {
    titulo: '[EXEMPLO] Copa Fight House de Kickboxing',
    data: '2027-03-14',
    tipo: 'organiza',
    local: 'Fight House — Valparaíso de Goiás',
    modalidades: ['Kickboxing', 'Kids'],
    descricao: 'Exemplo de evento organizado pela academia. Edite src/data/eventos.js.',
  },
  {
    titulo: '[EXEMPLO] Campeonato Goiano de Muay Thai',
    data: '2026-12-06',
    tipo: 'participa',
    local: 'Goiânia - GO',
    modalidades: ['Muay Thai'],
    descricao: 'Exemplo de evento em que a equipe compete.',
  },
  {
    titulo: '[EXEMPLO] Exame de graduação',
    data: '2026-08-20',
    tipo: 'organiza',
    local: 'Fight House',
    modalidades: ['Taekwondo', 'Kickboxing'],
    descricao: 'Exemplo de evento já realizado.',
  },
];
