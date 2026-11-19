# 🥊 Fight House — site oficial

Site da Academia Fight House (Valparaíso de Goiás). React + Vite, pronto para publicar na **Vercel** com domínio próprio.

## Editar o conteúdo (sem mexer em código)

| O quê | Arquivo |
|---|---|
| WhatsApp, Instagram, endereço, mapa | `src/data/site.js` → `contato` |
| **Horários** de cada modalidade | `src/data/site.js` → `modalidades[].aulas` |
| Textos, benefícios e fotos das modalidades | `src/data/site.js` → `modalidades` |
| **Valores / planos** | `src/data/site.js` → `planos` |
| Professores, perguntas frequentes | `src/data/site.js` → `equipe`, `faq` |
| **Eventos** com data (próximos e realizados) | `src/data/eventos.js` |

A grade de horários, o "próxima aula", os botões de WhatsApp e os filtros são gerados automaticamente a partir desses arquivos.

## Rodar no computador

```bash
npm install
npm run dev      # http://localhost:5173 (mostra eventos de EXEMPLO só aqui)
npm run build    # gera a pasta dist/
```

## Publicar com domínio (Vercel — grátis)

1. Suba este projeto para um repositório **seu** no GitHub.
2. Em [vercel.com](https://vercel.com) → *Add New Project* → importe o repositório (detecta Vite sozinho) → *Deploy*.
3. *Settings → Domains* → adicione seu domínio (ex.: `fighthousevalparaiso.com.br`) e configure o DNS que a Vercel indicar no Registro.br/onde comprou.
4. A cada `git push` o site atualiza sozinho.

## Integração com o Instagram (aba Eventos)

A seção **Eventos** mostra:
1. Os eventos cadastrados em `src/data/eventos.js` (com data, local, tipo "organiza"/"participa" e link do post);
2. **Automaticamente**, os posts recentes do @fighthousevalparaiso que falam de evento (campeonato, copa, torneio, graduação, seminário, pódio, medalha, `#fhevento`...), via `api/instagram.js`.

Sem token configurado, o bloco automático vira um botão "Seguir no Instagram" — o site funciona normalmente.

### Ativar o feed automático
1. A conta do Instagram precisa ser **Profissional** (Criador ou Empresa).
2. Em [developers.facebook.com](https://developers.facebook.com) crie um app → produto **Instagram** → *API setup with Instagram login* → adicione a conta e gere um **token de acesso** (longa duração, 60 dias).
3. Na Vercel: *Settings → Environment Variables* → `INSTAGRAM_TOKEN` = token → *Redeploy*.
4. Renove o token antes de 60 dias:
   `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=SEU_TOKEN`
   e atualize a variável.

Dica: use a hashtag **#fhevento** nos posts de evento para garantir que apareçam.

## Páginas antigas
`/admin`, `/produtos`, `/blog` continuam no código, mas dependem da API Java antiga (`VITE_API_URL`).
