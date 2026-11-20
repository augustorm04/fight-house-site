import { useEffect, useRef, useState } from 'react';

/** Adiciona .is-visible em todos os [data-reveal] quando entram na tela. */
export function useRevealAll(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]:not(.is-visible)');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Contador animado que começa quando o elemento aparece. */
export function useCountUp(target, duration = 1600) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      setValue(target);
      return;
    }
    let raf;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);
  return [ref, value];
}

/** Hora atual em Brasília, atualizada a cada minuto. */
export function useNowBrasilia() {
  const get = () => {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Sao_Paulo',
      weekday: 'short',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(new Date());
    const p = Object.fromEntries(parts.map((x) => [x.type, x.value]));
    const map = { Mon: 'seg', Tue: 'ter', Wed: 'qua', Thu: 'qui', Fri: 'sex', Sat: 'sab', Sun: 'dom' };
    const h = p.hour === '24' ? '00' : p.hour;
    return { dia: map[p.weekday], hora: `${h}:${p.minute}`, data: `${p.year}-${p.month}-${p.day}` };
  };
  const [now, setNow] = useState(get);
  useEffect(() => {
    const id = setInterval(() => setNow(get()), 30000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top: y, behavior: 'smooth' });
};

/** Soma dias a uma data 'AAAA-MM-DD'. */
export const somaDias = (data, n) => {
  const d = new Date(`${data}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};

