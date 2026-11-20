import React from 'react';
import '../../components/site/site.css';
import { Navbar, Hero, Marquee } from '../../components/site/Topo';
import { Modalidades, Horarios } from '../../components/site/Modalidades';
import { Planos, Eventos, Galeria, Sobre, Faq, Contato, Rodape, WhatsFlutuante } from '../../components/site/Secoes';
import { useRevealAll } from '../../components/site/hooks';

function HomePage() {
    useRevealAll();
    return (
        <div className="fh">
            <Navbar />
            <main>
                <Hero />
                <Marquee />
                <Modalidades />
                <Horarios />
                <Planos />
                <Eventos />
                <Galeria />
                <Sobre />
                <Faq />
                <Contato />
            </main>
            <Rodape />
            <WhatsFlutuante />
        </div>
    );
}

export default HomePage;
