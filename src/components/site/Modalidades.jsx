import { useEffect, useMemo, useState } from 'react';
import { modalidades, whatsLink, DIAS, gradeHorarios } from '../../data/site';
import { useNowBrasilia } from './hooks';

const diasTexto = (dias) => dias.map((d) => DIAS.find((x) => x.id === d)?.curto).join(' · ');

function Intensidade({ n }) {
  return (
    <span className="fh-intens" aria-label={`Intensidade ${n} de 5`}>
      {[1, 2, 3, 4, 5].map((k) => (
        <i key={k} className={k <= n ? 'on' : ''} />
      ))}
    </span>
  );
}

export function Modalidades() {
  const [aberta, setAberta] = useState(null);

  useEffect(() => {
    if (!aberta) return;
    const onKey = (e) => e.key === 'Escape' && setAberta(null);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [aberta]);

  const onTilt = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty('--rx', `${-y * 6}deg`);
    e.currentTarget.style.setProperty('--ry', `${x * 8}deg`);
    e.currentTarget.style.setProperty('--mx', `${(x + 0.5) * 100}%`);
    e.currentTarget.style.setProperty('--my', `${(y + 0.5) * 100}%`);
  };
  const offTilt = (e) => {
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
  };

  return (
    <section className="fh-section" id="modalidades">
      <div className="fh-container">
        <header className="fh-head" data-reveal>
          <p className="fh-eyebrow">{String(modalidades.length).padStart(2, '0')} modalidades</p>
          <h2 className="fh-h2">
            Escolha sua <em>luta</em>
          </h2>
          <p className="fh-sub">Toque em uma modalidade para ver detalhes, benefícios e horários.</p>
        </header>

        <div className="fh-mods">
          {modalidades.map((m, idx) => (
            <button
              key={m.id}
              className="fh-mod"
              style={{ '--c': m.cor, '--i': idx }}
              data-reveal
              onMouseMove={onTilt}
              onMouseLeave={offTilt}
              onClick={() => setAberta(m)}
            >
              <span className="fh-mod__img" style={{ backgroundImage: `url(${m.imagem})` }} />
              <span className="fh-mod__shine" />
              <span className="fh-mod__body">
                <span className="fh-mod__num">{String(idx + 1).padStart(2, '0')}</span>
                <span className="fh-mod__name">{m.nome}</span>
                <span className="fh-mod__tag">{m.chamada}</span>
                <span className="fh-mod__meta">
                  {m.sobConsulta ? (
                    <span>Horário sob consulta</span>
                  ) : (
                    <span>
                      <i className="bi bi-clock" /> {m.aulas.length} turma{m.aulas.length > 1 ? 's' : ''}
                    </span>
                  )}
                  <span className="fh-mod__more">
                    Saiba mais <i className="bi bi-arrow-up-right" />
                  </span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {aberta && (
        <div className="fh-modal" role="dialog" aria-modal="true" aria-label={aberta.nome} onClick={() => setAberta(null)}>
          <div className="fh-modal__panel" style={{ '--c': aberta.cor }} onClick={(e) => e.stopPropagation()}>
            <button className="fh-modal__close" aria-label="Fechar" onClick={() => setAberta(null)}>
              <i className="bi bi-x-lg" />
            </button>
            <div className="fh-modal__img" style={{ backgroundImage: `url(${aberta.imagem})` }} />
            <div className="fh-modal__body">
              <p className="fh-eyebrow">{aberta.chamada}</p>
              <h3 className="fh-h3">{aberta.nome}</h3>
              <p>{aberta.descricao}</p>
              <div className="fh-modal__grid">
                <div>
                  <h4>Benefícios</h4>
                  <ul className="fh-check">
                    {aberta.beneficios.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Para quem</h4>
                  <p>{aberta.publico}</p>
                  <h4>Intensidade</h4>
                  <Intensidade n={aberta.intensidade} />
                </div>
              </div>
              <h4>Horários</h4>
              {aberta.sobConsulta ? (
                <p>Horários personalizados — combine pelo WhatsApp.</p>
              ) : (
                <ul className="fh-slots">
                  {aberta.aulas.map((a, k) => (
                    <li key={k}>
                      <b>{a.hora}</b>
                      <span>{diasTexto(a.dias)}</span>
                    </li>
                  ))}
                </ul>
              )}
              <a
                className="fh-btn fh-btn--glow fh-btn--block"
                href={whatsLink(`Olá! Vim pelo site e quero agendar uma aula experimental de ${aberta.nome}.`)}
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-whatsapp" /> Quero uma aula de {aberta.nome}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function Horarios() {
  const now = useNowBrasilia();
  const [filtro, setFiltro] = useState('todas');
  const [diaMobile, setDiaMobile] = useState(() => (DIAS.some((d) => d.id === now.dia) ? now.dia : 'seg'));

  const comAula = modalidades.filter((m) => !m.sobConsulta);
  const grade = useMemo(
    () => gradeHorarios.filter((g) => filtro === 'todas' || g.modalidade.id === filtro),
    [filtro]
  );
  const horas = [...new Set(grade.map((g) => g.hora))];

  const proxima = useMemo(() => {
    const ordem = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
    const hoje = ordem.indexOf(now.dia);
    for (let k = 0; k < 7; k++) {
      const dia = ordem[(hoje + k) % 7];
      const aulas = gradeHorarios.filter((g) => g.dia === dia && (k > 0 || g.hora > now.hora));
      if (aulas.length) return { ...aulas[0], hoje: k === 0, amanha: k === 1 };
    }
    return null;
  }, [now]);

  const cell = (dia, hora) =>
    grade
      .filter((g) => g.dia === dia && g.hora === hora)
      .map((g) => (
        <span key={g.modalidade.id} className="fh-chip" style={{ '--c': g.modalidade.cor }}>
          {g.modalidade.nome}
        </span>
      ));

  return (
    <section className="fh-section fh-section--alt" id="horarios">
      <div className="fh-container">
        <header className="fh-head" data-reveal>
          <p className="fh-eyebrow">Grade semanal</p>
          <h2 className="fh-h2">
            Horários das <em>aulas</em>
          </h2>
          {proxima && (
            <p className="fh-live">
              <span className="fh-dot fh-dot--live" />
              <span>
                Próxima aula{' '}
                {proxima.hoje ? 'hoje' : proxima.amanha ? 'amanhã' : `na ${DIAS.find((d) => d.id === proxima.dia)?.longo.toLowerCase()}`}{' '}
                às <b>{proxima.hora}</b> — {proxima.modalidade.nome}
              </span>
            </p>
          )}
        </header>

        <div className="fh-filters" role="tablist" aria-label="Filtrar por modalidade" data-reveal>
          <button className={filtro === 'todas' ? 'is-on' : ''} onClick={() => setFiltro('todas')}>
            Todas
          </button>
          {comAula.map((m) => (
            <button
              key={m.id}
              style={{ '--c': m.cor }}
              className={filtro === m.id ? 'is-on' : ''}
              onClick={() => setFiltro(m.id)}
            >
              {m.nome}
            </button>
          ))}
        </div>

        {/* Desktop: tabela */}
        <div className="fh-table-wrap" data-reveal>
          <table className="fh-table">
            <thead>
              <tr>
                <th>Horário</th>
                {DIAS.map((d) => (
                  <th key={d.id} className={now.dia === d.id ? 'is-today' : ''}>
                    {d.longo}
                    {now.dia === d.id && <small>hoje</small>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {horas.map((h) => (
                <tr key={h}>
                  <th scope="row">{h}</th>
                  {DIAS.map((d) => (
                    <td key={d.id} className={now.dia === d.id ? 'is-today' : ''}>
                      {cell(d.id, h)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: abas por dia */}
        <div className="fh-daytabs">
          <div className="fh-daytabs__bar">
            {DIAS.map((d) => (
              <button key={d.id} className={diaMobile === d.id ? 'is-on' : ''} onClick={() => setDiaMobile(d.id)}>
                {d.curto}
                {now.dia === d.id && <i />}
              </button>
            ))}
          </div>
          <ul className="fh-daylist">
            {grade.filter((g) => g.dia === diaMobile).length === 0 && <li className="fh-empty">Sem aulas desta modalidade neste dia.</li>}
            {grade
              .filter((g) => g.dia === diaMobile)
              .map((g, k) => (
                <li key={k} style={{ '--c': g.modalidade.cor }}>
                  <b>{g.hora}</b>
                  <span>{g.modalidade.nome}</span>
                </li>
              ))}
          </ul>
        </div>

        <p className="fh-note" data-reveal>
          <i className="bi bi-info-circle" /> Personal Fight com horário flexível, sob agendamento. Horários podem mudar em
          feriados — confirme no{' '}
          <a href={whatsLink('Olá! Gostaria de confirmar os horários das aulas.')} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          .
        </p>
      </div>
    </section>
  );
}
