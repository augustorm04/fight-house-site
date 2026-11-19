// =====================================================================
//  Função serverless (Vercel) — integra o Instagram ao site.
//
//  GET /api/instagram            -> posts recentes
//  GET /api/instagram?eventos=1  -> só posts que falam de eventos
//
//  Requer a variável de ambiente INSTAGRAM_TOKEN (token de longa duração
//  da "Instagram API com login do Instagram" — conta Profissional:
//  Criador de conteúdo ou Empresa). Passo a passo no README.
//
//  O token de longa duração vale 60 dias. Renove antes de vencer (README)
//  e atualize a variável na Vercel.
// =====================================================================

const GRAPH = 'https://graph.instagram.com';

// Palavras que indicam que um post é sobre evento.
const EVENT_RE =
  /(#?evento|#?campeonat|#?copa\b|#?torneio|#?gradua|exame de faixa|#?semin[aá]rio|#?festival|#?desafio|#?card\b|#?fightnight|#?competi|#?p[oó]dio|#?medalh|#?fhevento)/i;

export default async function handler(req, res) {
  const token = process.env.INSTAGRAM_TOKEN;
  if (!token) {
    res.status(503).json({ error: 'INSTAGRAM_TOKEN não configurado', posts: [] });
    return;
  }

  try {
    const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
    const r = await fetch(`${GRAPH}/me/media?fields=${fields}&limit=50&access_token=${encodeURIComponent(token)}`);
    const data = await r.json();
    if (!r.ok) throw new Error(data?.error?.message || `HTTP ${r.status}`);

    let posts = (data.data || []).map((p) => ({
      id: p.id,
      legenda: p.caption || '',
      tipo: p.media_type,
      imagem: p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url,
      link: p.permalink,
      data: p.timestamp,
    }));

    const q = req.query || {};
    if (q.eventos) posts = posts.filter((p) => EVENT_RE.test(p.legenda));

    // Cache na CDN da Vercel por 1h; serve versão antiga por até 1 dia enquanto atualiza.
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).json({ posts: posts.slice(0, 12) });
  } catch (e) {
    res.status(502).json({ error: String(e.message || e), posts: [] });
  }
}
