import { CheckCircle, Clock, XCircle } from "lucide-react";

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

export default function LeaveLegend() {
  return (
    <div className="flex flex-wrap gap-3">
      <LegendItem
        label="Approved"
        style="summary-success"
        icon={CheckCircle}
      />
      <LegendItem
        label="Pending"
        style="summary-warning"
        icon={Clock}
      />
      <LegendItem
        label="Rejected"
        style="summary-danger"
        icon={XCircle}
      />
    </div>
  );
}