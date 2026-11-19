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
    descricao: '5ª edição do maior campeonato de artes marciais de Valparaíso. Abertura 20/11 às 19h; boxe e kickboxing no sábado (21/11); taekwondo no domingo (22/11). Venha torcer pelos nossos atletas!',
    instagram: 'https://www.instagram.com/camamval/',
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
