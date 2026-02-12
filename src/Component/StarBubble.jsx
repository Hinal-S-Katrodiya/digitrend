const StarburstBubble = ({ text = "Services", className = " text-black", size = 100 }) => {
  const points = 18;
  const outerRadius = size / 2;
  const innerRadius = outerRadius * 0.65;
  const center = size / 2;

  const pathData = Array.from({ length: points * 2 }, (_, i) => {
    const angle = (Math.PI * i) / points - Math.PI / 2;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return `${i === 0 ? "M" : "L"}${x},${y}`;
  }).join(" ") + "Z";

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="absolute inset-0 drop-shadow-lg "
      >
        <path d={pathData} className="fill-yellow-100" />

      </svg>
      <span className="relative z-10 font-bold text-starburst-foreground text-xl select-none">
        {text}
      </span>
    </div>
  );
};

export default StarburstBubble;