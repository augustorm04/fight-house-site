// =====================================================================
//  AVISOS — recados rápidos (feriados, academia fechada, mudanças)
//
//  Cada aviso aparece no topo do site e na grade de horários entre as
//  datas "de" e "ate" (inclusive) e some sozinho depois.
//
//  Campos:
//    de          'AAAA-MM-DD' — primeiro dia em que o aviso aparece
//    ate         'AAAA-MM-DD' — último dia em que o aviso aparece
//    titulo      texto curto em destaque
//    texto       detalhe
//    semAulas    ['AAAA-MM-DD', ...] (opcional) — dias sem aula; a
//                "Próxima aula" da grade pula essas datas
// =====================================================================

export const avisos = [
  {
    de: '2026-11-18',
    ate: '2026-11-20',
    titulo: 'Sexta, 20/11 — feriado: sem aulas',
    texto: 'No feriado da Consciência Negra não teremos aulas. A academia abre apenas para a pesagem dos atletas do CAMAM.',
    semAulas: ['2026-11-20'],
  },
];

/** Avisos que valem na data (AAAA-MM-DD). */
export const avisosAtivos = (data) => avisos.filter((a) => a.de <= data && data <= a.ate);

/** true se a data (AAAA-MM-DD) está marcada como sem aula. */
export const semAula = (data) => avisos.some((a) => (a.semAulas || []).includes(data));
