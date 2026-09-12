type TrailCardProps = {
  index: string;
  title: string;
  children: React.ReactNode;
};

export function TrailCard({ index, title, children }: TrailCardProps) {
  return (
    <article className="trail-card">
      <span className="trail-icon" aria-hidden="true">
        {index}
      </span>
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  );
}
