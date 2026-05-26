export default function Modal({ open, title, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="w-full max-w-2xl rounded-2xl border border-white/20 bg-slate-950 p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="rounded-md border border-white/20 px-3 py-1 text-sm text-slate-200 hover:bg-white/10">Close</button>
        </div>
        {children}
      </div>
    </div>
  );
}
