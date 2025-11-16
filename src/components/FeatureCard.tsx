interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

const FeatureCard = ({
  title,
  description,
  icon,
  className = "",
}: FeatureCardProps) => {
  return (
    <div
      className={`bg-card border border-border rounded-xl p-6 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${className}`}
    >
      {icon && <div className="mb-4 text-foreground/80">{icon}</div>}
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground text-base leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;