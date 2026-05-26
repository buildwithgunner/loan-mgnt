export default function Card({ title, children, className = "" }) {
  return (
    <div className={`bg-black/40 backdrop-blur-2xl rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] border border-white/20 p-6 transition-all ${className}`}>
      {title && <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>}
      <div className="text-gray-200">{children}</div>
    </div>
  );
}
