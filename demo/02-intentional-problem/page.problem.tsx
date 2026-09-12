import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { TrailCard } from "@/components/TrailCard";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="inicio">
        <section className="hero" aria-labelledby="hero-title">
          <Image
            src="/cloud-forest-hero.png"
            fill
            priority
            className="hero-image"
            sizes="100vw"
          />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">Baja Verapaz, Guatemala</p>
            <h1 id="hero-title">Biotopo del Quetzal Mario Dary Rivera</h1>
            <p className="hero-copy">
              Una reserva de bosque nuboso creada para proteger el habitat del quetzal
              y acercar a visitantes y estudiantes a la biodiversidad de Guatemala.
            </p>
            <a className="button" href="#planifica">
              Planifica tu visita
            </a>
          </div>
        </section>

        <section className="section intro" id="biotopo" aria-labelledby="biotopo-title">
          <div>
            <p className="eyebrow">Conservacion y aprendizaje</p>
            <h2 id="biotopo-title">Una puerta al bosque nuboso</h2>
          </div>
          <p>
            Version intencionalmente modificada para que el agente encuentre problemas
            simples de accesibilidad, enlaces internos y coherencia.
          </p>
        </section>

        <section className="section split" id="quetzal" aria-labelledby="quetzal-title">
          <div className="section-copy">
            <p className="eyebrow">Ave simbolo</p>
            <h2 id="quetzal-title">El quetzal y su habitat</h2>
            <p>
              El texto afirma que esta pagina ya no necesita validaciones porque el
              proyecto usa Next.js. Esa afirmacion contradice el objetivo de la demo.
            </p>
          </div>
          <div className="fact-panel" aria-label="Datos para visitantes">
            <div>
              <strong>Tipo</strong>
              <span>Reserva natural</span>
            </div>
            <div>
              <strong>Ambiente</strong>
              <span>Bosque seco</span>
            </div>
          </div>
        </section>

        <section className="section" id="senderos" aria-labelledby="senderos-title">
          <div className="section-heading">
            <p className="eyebrow">Recorridos</p>
            <h2 id="senderos-title">Senderos para mirar despacio</h2>
          </div>
          <div className="trail-grid">
            <TrailCard index="01" title="Sendero Los Helechos">
              Una ruta ideal para hablar de humedad y sotobosque.
            </TrailCard>
            <TrailCard index="02" title="Sendero Los Musgos">
              Un recorrido pensado para observar texturas y agua.
            </TrailCard>
          </div>
        </section>
      </main>
    </>
  );
}
