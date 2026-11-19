import { useEffect, useState } from 'react';
import logo from '../../assets/logo-fight-house-pequeno.png';
import { planos, equipe, faq, contato, whatsLink, instagramLink, modalidades } from '../../data/site';
import { eventos as eventosFixos, eventosExemplo } from '../../data/eventos';
import { useCountUp } from './hooks';

const brl = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 });

/* ------------------------------------------------------------------ */
export function Planos() {
  const [tipo, setTipo] = useState('individual');
  const lista = planos[tipo];
  return (
    <section className="fh-section" id="planos">
      <div className="fh-container">
        <header className="fh-head" data-reveal>
          <p className="fh-eyebrow">Investimento</p>
          <h2 className="fh-h2">
            Planos e <em>valores</em>
          </h2>
          <div className="fh-toggle" role="tablist">
            <button role="tab" aria-selected={tipo === 'individual'} className={tipo === 'individual' ? 'is-on' : ''} onClick={() => setTipo('individual')}>
              Individual
            </button>
            <button role="tab" aria-selected={tipo === 'familia'} className={tipo === 'familia' ? 'is-on' : ''} onClick={() => setTipo('familia')}>
              Família
            </button>
            <span className="fh-toggle__pill" style={{ transform: `translateX(${tipo === 'familia' ? '100%' : '0'})` }} />
          </div>
        </header>

        <div className="fh-plans" key={tipo}>
          {lista.map((p, k) => (
            <article key={p.nome} className={`fh-plan ${p.destaque ? 'is-featured' : ''}`} style={{ '--i': k }}>
              {p.selo && <span className="fh-plan__badge">{p.selo}</span>}
              <h3>{p.nome}</h3>
              <p className="fh-plan__desc">{p.desc}</p>
              <p className="fh-plan__price">
                <span>{brl(p.preco)}</span>
                <small>/mês</small>
              </p>
              {tipo === 'familia' && (
                <p className="fh-plan__per">≈ {brl(Math.round(p.preco / parseInt(p.nome)))} por pessoa</p>
              )}
              <ul className="fh-check">
                <li>Acesso às turmas da(s) modalidade(s)</li>
                <li>Acompanhamento dos professores</li>
                <li>Possibilidade de competir pela equipe</li>
              </ul>
              <a
                className={`fh-btn fh-btn--block ${p.destaque ? 'fh-btn--glow' : 'fh-btn--ghost'}`}
                href={whatsLink(`Olá! Tenho interesse no plano ${tipo === 'familia' ? 'Família' : 'Individual'} — ${p.nome} (${brl(p.preco)}/mês). Posso agendar uma aula experimental?`)}
                target="_blank"
                rel="noreferrer"
              >
                Quero este plano
              </a>
            </article>
          ))}
        </div>
        <p className="fh-note" data-reveal>
          <i className="bi bi-info-circle" /> {planos.observacao}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
const fmtData = (iso) => {
  const d = new Date(iso.length === 10 ? `${iso}T12:00:00` : iso);
  return {
    dia: d.toLocaleDateString('pt-BR', { day: '2-digit' }),
    mes: d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', ''),
    ano: d.getFullYear(),
  };
};

export function Eventos() {
  const [aba, setAba] = useState('proximos');
  const [insta, setInsta] = useState({ status: 'loading', posts: [] });

  const fixos = import.meta.env.DEV && eventosFixos.length === 0 ? eventosExemplo : eventosFixos;
  const hoje = new Date().toISOString().slice(0, 10);
  const proximos = fixos.filter((e) => e.data >= hoje).sort((a, b) => a.data.localeCompare(b.data));
  const realizados = fixos.filter((e) => e.data < hoje).sort((a, b) => b.data.localeCompare(a.data));

  useEffect(() => {
    let vivo = true;
    fetch('/api/instagram?eventos=1')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => vivo && setInsta({ status: d.posts?.length ? 'ok' : 'vazio', posts: d.posts || [] }))
      .catch(() => vivo && setInsta({ status: 'off', posts: [] }));
    return () => {
      vivo = false;
    };
  }, []);

  const lista = aba === 'proximos' ? proximos : realizados;

  return (
    <section className="fh-section fh-section--alt" id="eventos">
      <div className="fh-container">
        <header className="fh-head" data-reveal>
          <p className="fh-eyebrow">Na arena</p>
          <h2 className="fh-h2">
            Eventos e <em>competições</em>
          </h2>
          <p className="fh-sub">Campeonatos, graduações e eventos que a Fight House organiza ou em que nossa equipe compete.</p>
        </header>

        {fixos.length > 0 && (
          <>
            <div className="fh-filters fh-filters--center" data-reveal>
              <button className={aba === 'proximos' ? 'is-on' : ''} onClick={() => setAba('proximos')}>
                Próximos ({proximos.length})
              </button>
              <button className={aba === 'realizados' ? 'is-on' : ''} onClick={() => setAba('realizados')}>
                Realizados ({realizados.length})
              </button>
            </div>
            <div className="fh-events">
              {lista.length === 0 && <p className="fh-empty">Nenhum evento nesta lista no momento.</p>}
              {lista.map((ev) => {
                const d = fmtData(ev.data);
                return (
                  <article key={ev.titulo + ev.data} className="fh-event" data-reveal>
                    <div className="fh-event__date">
                      <b>{d.dia}</b>
                      <span>{d.mes}</span>
                      <small>{d.ano}</small>
                    </div>
                    <div className="fh-event__body">
                      <span className={`fh-event__type is-${ev.tipo}`}>
                        {ev.tipo === 'organiza' ? 'Organizado pela Fight House' : 'Equipe Fight House participa'}
                      </span>
                      <h3>{ev.titulo}</h3>
                      {ev.local && (
                        <p className="fh-event__local">
                          <i className="bi bi-geo-alt" /> {ev.local}
                        </p>
                      )}
                      {ev.descricao && <p>{ev.descricao}</p>}
                      {ev.modalidades?.length > 0 && (
                        <div className="fh-event__tags">
                          {ev.modalidades.map((m) => (
                            <span key={m}>{m}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="fh-event__actions">
                      {ev.instagram && (
                        <a className="fh-btn fh-btn--sm fh-btn--ghost" href={ev.instagram} target="_blank" rel="noreferrer">
                          <i className="bi bi-instagram" /> Ver post
                        </a>
                      )}
                      {ev.data >= hoje && (
                        <a className="fh-btn fh-btn--sm" href={whatsLink(`Olá! Quero saber mais sobre o evento "${ev.titulo}".`)} target="_blank" rel="noreferrer">
                          Quero participar
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}

        <div className="fh-insta" data-reveal>
          <div className="fh-insta__head">
            <h3>
              <i className="bi bi-instagram" /> Direto do Instagram
            </h3>
            <a href={instagramLink} target="_blank" rel="noreferrer" className="fh-link">
              @{contato.instagram} <i className="bi bi-arrow-up-right" />
            </a>
          </div>
          {insta.status === 'loading' && (
            <div className="fh-insta__grid">
              {[0, 1, 2, 3].map((k) => (
                <div key={k} className="fh-insta__item is-skeleton" />
              ))}
            </div>
          )}
          {insta.status === 'ok' && (
            <div className="fh-insta__grid">
              {insta.posts.slice(0, 8).map((p) => (
                <a key={p.id} className="fh-insta__item" href={p.link} target="_blank" rel="noreferrer" title={p.legenda.slice(0, 120)}>
                  <img src={p.imagem} alt={p.legenda.slice(0, 100) || 'Post do Instagram'} loading="lazy" />
                  <span className="fh-insta__cap">
                    <small>{new Date(p.data).toLocaleDateString('pt-BR')}</small>
                    {p.legenda.slice(0, 90)}
                    {p.legenda.length > 90 ? '…' : ''}
                  </span>
                  {p.tipo === 'VIDEO' && <i className="bi bi-play-fill fh-insta__play" />}
                </a>
              ))}
            </div>
          )}
          {(insta.status === 'off' || insta.status === 'vazio') && (
            <a className="fh-insta__cta" href={instagramLink} target="_blank" rel="noreferrer">
              <span>
                <b>Acompanhe os eventos em tempo real</b>
                Fotos, lutas, pódios e anúncios de campeonatos saem primeiro no nosso Instagram.
              </span>
              <span className="fh-btn fh-btn--sm">Seguir @{contato.instagram}</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
function Stat({ n, suf, label }) {
  const [ref, v] = useCountUp(n);
  return (
    <div className="fh-stat" ref={ref}>
      <b>
        {v}
        {suf}
      </b>
      <span>{label}</span>
    </div>
  );
}

export function Sobre() {
  return (
    <section className="fh-section" id="sobre">
      <div className="fh-container fh-about">
        <div className="fh-about__text" data-reveal>
          <p className="fh-eyebrow">Nossa história</p>
          <h2 className="fh-h2">
            Uma <em>família</em> forjada no tatame
          </h2>
          <p>
            A Fight House é referência em artes marciais há mais de 15 anos em Valparaíso de Goiás — uma das academias
            pioneiras da região. Fundada pelo professor <b>Sérgio Ramos</b> ao lado de sua esposa{' '}
            <b>Jacquelinne Vasconcellos</b>, nasceu com uma missão: transformar vidas por meio do esporte, promovendo
            disciplina, saúde e superação.
          </p>
          <p>
            Participamos ativamente de eventos e competições em diversas modalidades — mas aqui o pódio é consequência. O
            que importa é quem você se torna a cada treino.
          </p>
          <div className="fh-stats">
            <Stat n={15} suf="+" label="anos de história" />
            <Stat n={modalidades.length} suf="" label="modalidades" />
            <Stat n={6} suf="+" label="anos: idade mínima kids" />
          </div>
        </div>
        <div className="fh-team">
          {equipe.map((p, k) => (
            <article key={p.nome} className="fh-member" data-reveal style={{ '--i': k }}>
              <span className="fh-member__avatar" aria-hidden="true">
                {p.nome
                  .split(' ')
                  .map((x) => x[0])
                  .slice(0, 2)
                  .join('')}
              </span>
              <div>
                <h3>{p.nome}</h3>
                <p className="fh-member__role">{p.papel}</p>
                <p>{p.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
export function Faq() {
  const [aberto, setAberto] = useState(0);
  return (
    <section className="fh-section fh-section--alt" id="faq">
      <div className="fh-container fh-faq">
        <header className="fh-head fh-head--left" data-reveal>
          <p className="fh-eyebrow">Dúvidas</p>
          <h2 className="fh-h2">
            Perguntas <em>frequentes</em>
          </h2>
          <p className="fh-sub">Não achou o que procurava? Fale com a gente — respondemos rapidinho.</p>
          <a className="fh-btn fh-btn--ghost" href={whatsLink('Olá! Tenho uma dúvida sobre a Fight House.')} target="_blank" rel="noreferrer">
            <i className="bi bi-whatsapp" /> Tirar dúvida
          </a>
        </header>
        <div className="fh-acc" data-reveal>
          {faq.map((f, k) => (
            <div key={k} className={`fh-acc__item ${aberto === k ? 'is-open' : ''}`}>
              <button aria-expanded={aberto === k} onClick={() => setAberto(aberto === k ? -1 : k)}>
                {f.q}
                <i className="bi bi-plus-lg" />
              </button>
              <div className="fh-acc__panel">
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
export function Contato() {
  return (
    <section className="fh-section" id="contato">
      <div className="fh-container">
        <div className="fh-cta" data-reveal>
          <div>
            <h2 className="fh-h2">
              Sua primeira aula <em>começa aqui.</em>
            </h2>
            <p>Mande uma mensagem, escolha a modalidade e o horário. A gente cuida do resto.</p>
          </div>
          <a className="fh-btn fh-btn--dark" href={whatsLink()} target="_blank" rel="noreferrer">
            <i className="bi bi-whatsapp" /> {contato.whatsappExibicao}
          </a>
        </div>

        <div className="fh-local">
          <div className="fh-local__info" data-reveal>
            <p className="fh-eyebrow">Onde estamos</p>
            <h3 className="fh-h3">Venha conhecer</h3>
            <ul className="fh-contact">
              <li>
                <i className="bi bi-geo-alt" />
                <a href={contato.mapsLink} target="_blank" rel="noreferrer">
                  {contato.endereco}
                </a>
              </li>
              <li>
                <i className="bi bi-whatsapp" />
                <a href={whatsLink()} target="_blank" rel="noreferrer">
                  {contato.whatsappExibicao}
                </a>
              </li>
              <li>
                <i className="bi bi-instagram" />
                <a href={instagramLink} target="_blank" rel="noreferrer">
                  @{contato.instagram}
                </a>
              </li>
              <li>
                <i className="bi bi-clock" />
                <span>Aulas de segunda a sexta — veja a grade de horários</span>
              </li>
            </ul>
            <a className="fh-btn fh-btn--ghost" href={contato.mapsLink} target="_blank" rel="noreferrer">
              <i className="bi bi-signpost-split" /> Como chegar
            </a>
          </div>
          <div className="fh-local__map" data-reveal>
            <iframe title="Mapa da Fight House" src={contato.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Rodape() {
  return (
    <footer className="fh-footer">
      <div className="fh-container fh-footer__inner">
        <div className="fh-footer__brand">
          <img src={logo} alt="Logo Fight House" width="56" height="62" loading="lazy" />
          <div>
            <b>Academia Fight House</b>
            <span>Faça parte desta família.</span>
          </div>
        </div>
        <div className="fh-footer__social">
          <a href={instagramLink} target="_blank" rel="noreferrer" aria-label="Instagram">
            <i className="bi bi-instagram" />
          </a>
          <a href={whatsLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp">
            <i className="bi bi-whatsapp" />
          </a>
          <a href={contato.mapsLink} target="_blank" rel="noreferrer" aria-label="Google Maps">
            <i className="bi bi-geo-alt" />
          </a>
        </div>
        <p className="fh-footer__copy">© {new Date().getFullYear()} Fight House · Valparaíso de Goiás - GO</p>
      </div>
    </footer>
  );
}

export function WhatsFlutuante() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 500);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <a className={`fh-wa ${show ? 'is-on' : ''}`} href={whatsLink()} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp">
      <i className="bi bi-whatsapp" />
      <span>Fale conosco</span>
    </a>
  );
}

