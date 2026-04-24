import { Package, Monitor, Book, AlertTriangle, Calendar, Users } from "lucide-react";

function LegendItem({ label, style, icon: Icon }) {
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${style} border border-white/5 shadow-sm transition-all duration-300 hover:scale-105 cursor-default`}>
      <div className="p-1 rounded-lg bg-white/20">
        <Icon size={12} />
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest text-textMain/80">
        {label}
      </span>
    </div>
  );
}

export default function RequestLegend() {
  return (
    <div className="flex flex-wrap gap-3">
      <LegendItem label="Stationary" style="summary-primary" icon={Package} />
      <LegendItem label="IT" style="summary-success" icon={Monitor} />
      <LegendItem label="Library" style="summary-neutral" icon={Book} />
      <LegendItem label="Fault" style="summary-danger" icon={AlertTriangle} />
      <LegendItem label="Leave" style="summary-warning" icon={Calendar} />
      <LegendItem label="Conference" style="summary-neutral" icon={Users} />
    </div>
  );
}