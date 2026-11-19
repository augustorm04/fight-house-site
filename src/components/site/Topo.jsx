import { useEffect, useState } from 'react';
import logo from '../../assets/logo-fight-house-pequeno.png';
import bg from '../../assets/academia-background.png';
import { modalidades, whatsLink, instagramLink } from '../../data/site';
import { scrollToId } from './hooks';

const LINKS = [
  ['modalidades', 'Modalidades'],
  ['horarios', 'Horários'],
  ['planos', 'Planos'],
  ['eventos', 'Eventos'],
  ['sobre', 'Sobre'],
  ['contato', 'Contato'],
];

export function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 40);
      let cur = '';
      for (const [id] of LINKS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 140) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className={`fh-nav ${solid ? 'is-solid' : ''} ${open ? 'is-open' : ''}`}>
      <div className="fh-container fh-nav__inner">
        <a href="#topo" className="fh-nav__brand" onClick={(e) => go(e, 'topo')}>
          <img src={logo} alt="" width="44" height="49" />
          <span>
            Fight<b>House</b>
          </span>
        </a>
        <nav className="fh-nav__links" aria-label="Seções">
          {LINKS.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={(e) => go(e, id)} className={active === id ? 'is-active' : ''}>
              {label}
            </a>
          ))}
        </nav>
        <a className="fh-btn fh-btn--sm fh-nav__cta" href={whatsLink()} target="_blank" rel="noreferrer">
          Aula experimental
        </a>
        <button className="fh-nav__burger" aria-label="Abrir menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

export function Hero() {
  const nomes = modalidades.filter((m) => !m.sobConsulta).map((m) => m.nome);
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % nomes.length), 2200);
    return () => clearInterval(id);
  }, [nomes.length]);

  useEffect(() => {
    const el = document.querySelector('.fh-hero__bg');
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < window.innerHeight) el.style.transform = `translate3d(0, ${y * 0.35}px, 0) scale(1.08)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="fh-hero" id="topo">
      <div className="fh-hero__bg" style={{ backgroundImage: `url(${bg})` }} aria-hidden="true" />
      <div className="fh-hero__shade" aria-hidden="true" />
      <div className="fh-hero__grain" aria-hidden="true" />
      <div className="fh-container fh-hero__content">
        <p className="fh-hero__kicker fh-anim" style={{ '--d': '0.1s' }}>
          <span className="fh-dot" /> Valparaíso de Goiás · +15 anos de tradição
        </p>
        <h1 className="fh-hero__title">
          <span className="fh-anim" style={{ '--d': '0.2s' }}>
            Treine
          </span>
          <span className="fh-hero__rotator fh-anim" style={{ '--d': '0.35s' }} aria-live="polite">
            <span key={i} className="fh-hero__word">
              {nomes[i]}
            </span>
          </span>
          <span className="fh-anim fh-outline" style={{ '--d': '0.5s' }}>
            com quem é referência.
          </span>
        </h1>
        <p className="fh-hero__lead fh-anim" style={{ '--d': '0.65s' }}>
          Mais de 15 anos formando atletas e transformando vidas. Do primeiro treino ao pódio, para adultos e crianças a
          partir de 6 anos.
        </p>
        <div className="fh-hero__ctas fh-anim" style={{ '--d': '0.8s' }}>
          <a className="fh-btn fh-btn--glow" href={whatsLink()} target="_blank" rel="noreferrer">
            <i className="bi bi-whatsapp" /> Agendar aula experimental
          </a>
          <a
            className="fh-btn fh-btn--ghost"
            href="#horarios"
            onClick={(e) => {
              e.preventDefault();
              scrollToId('horarios');
            }}
          >
            Ver horários <i className="bi bi-arrow-down" />
          </a>
        </div>
        <a className="fh-hero__insta fh-anim" style={{ '--d': '0.95s' }} href={instagramLink} target="_blank" rel="noreferrer">
          <i className="bi bi-instagram" /> @fighthousevalparaiso
        </a>
      </div>
      <div className="fh-hero__scroll" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}

export function Marquee() {
  const items = [...modalidades.map((m) => m.nome), 'Defesa pessoal', 'Condicionamento', 'Competição'];
  const row = items.map((t, k) => (
    <span key={k}>
      {t} <i className="bi bi-lightning-charge-fill" />
    </span>
  ));
  return (
    <div className="fh-marquee" aria-hidden="true">
      <div className="fh-marquee__track">
        {row}
        {row}
      </div>
    </div>
  );
}
