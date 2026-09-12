const visitTips = [
  "Usa calzado comodo para terreno humedo.",
  "Camina dentro de los senderos senalizados.",
  "Evita ruido innecesario y no alimentes fauna silvestre.",
  "Confirma horarios, tarifas y condiciones con fuentes oficiales antes de viajar.",
];

export function VisitorInfo() {
  return (
    <section className="visit-band" id="visita" aria-labelledby="visita-title">
      <div>
        <p className="eyebrow">Para visitantes</p>
        <h2 id="visita-title">Planifica con respeto por el entorno</h2>
      </div>
      <ul className="visit-list">
        {visitTips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
    </section>
  );
}
