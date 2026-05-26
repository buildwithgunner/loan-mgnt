export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <img 
        src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=100&w=2800" 
        className="w-full h-full object-cover" 
        alt="Global Background" 
      />
      <div className="absolute inset-0 bg-[#051a2c]/65" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
    </div>
  );
}
