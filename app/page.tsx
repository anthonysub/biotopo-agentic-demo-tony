import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { TrailCard } from "@/components/TrailCard";
import { VisitorInfo } from "@/components/VisitorInfo";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="inicio">
        <section className="hero" aria-labelledby="hero-title">
          <Image
            src="/cloud-forest-hero.png"
            alt="Bosque nuboso con helechos, sendero natural y neblina entre montanas verdes"
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
            <a className="button" href="#visita">
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
            El Biotopo Universitario para la Conservacion del Quetzal, conocido como
            Biotopo del Quetzal, protege un ecosistema montano humedo donde los musgos,
            helechos y arboles cargados de epifitas crean un paisaje de neblina y agua.
            Esta demo usa informacion general y publica para mantener el foco en el flujo
            de trabajo agentico.
          </p>
        </section>

        <section className="section split" id="quetzal" aria-labelledby="quetzal-title">
          <div className="section-copy">
            <p className="eyebrow">Ave simbolo</p>
            <h2 id="quetzal-title">El quetzal y su habitat</h2>
            <p>
              El quetzal resplandeciente depende de bosques sanos, arboles maduros y
              alimento disponible durante distintas epocas del ano. Observarlo requiere
              paciencia, silencio y respeto por los senderos.
            </p>
          </div>
          <div className="fact-panel" aria-label="Datos para visitantes">
            <div>
              <strong>Tipo</strong>
              <span>Reserva natural</span>
            </div>
            <div>
              <strong>Ambiente</strong>
              <span>Bosque nuboso</span>
            </div>
            <div>
              <strong>Enfoque</strong>
              <span>Conservacion y educacion</span>
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
              Una ruta ideal para hablar de humedad, sotobosque y adaptaciones de las
              plantas en el bosque nuboso.
            </TrailCard>
            <TrailCard index="02" title="Sendero Los Musgos">
              Un recorrido pensado para observar texturas, troncos cubiertos de vida y
              el papel del agua en el ecosistema.
            </TrailCard>
            <TrailCard index="03" title="Miradores naturales">
              Espacios para detenerse, escuchar el bosque y conectar la visita con
              preguntas de ciencia, tecnologia y conservacion.
            </TrailCard>
          </div>
        </section>

        <VisitorInfo />
      </main>

      <footer className="site-footer">
        <p>Demo educativa para GitHub Agentic Workflows. Sin logos ni credenciales.</p>
        <a href="#inicio">Volver arriba</a>
      </footer>
    </>
  );
}
