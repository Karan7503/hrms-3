import { Pencil, Trash2 } from "lucide-react";

const getStatusBadge = (status) => {
  switch (status) {
    case "Approved":
      return "bg-emerald-50 text-emerald-600 border-emerald-100";
    case "Pending":
      return "bg-amber-50 text-amber-600 border-amber-100";
    case "Rejected":
      return "bg-rose-50 text-rose-600 border-rose-100";
    default:
      return "bg-slate-50 text-slate-500 border-slate-50";
  }
};

const RequestTableColumns = (onEdit, onDelete) => [
  {
    id: "req",
    header: "No",
    size: 50,
    cell: ({ row }) => <span className="text-muted/40 font-medium tabular-nums">{row.index + 1}</span>
  },
  {
    accessorKey: "request_for",
    header: "Request For",
    cell: ({ row }) => <span className="font-bold text-textMain">{row.original.request_for}</span>
  },
  {
    accessorKey: "owner",
    header: "Owner",
    cell: ({ row }) => <span className="text-muted/60">{row.original.owner}</span>
  },
  {
    accessorKey: "open_date",
    header: "Date",
    cell: ({ row }) => <span className="text-muted/60 tabular-nums">{row.original.open_date}</span>
  },
  {
    accessorKey: "request_status",
    header: "Status",
    cell: ({ row }) => (
      <span className={`
        px-3 py-1 
        rounded-full 
        text-[11px] 
        font-bold 
        border
        ${getStatusBadge(row.original.request_status)}
      `}>
        {row.original.request_status}
      </span>
    )
  },
  {
    id: "actions",
    header: "",
    size: 90,
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <button
          onClick={() => onEdit(row.original)}
          className="p-1.5 hover:bg-bgMain/20 rounded-lg transition-colors text-muted/60 border border-primary/10"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={() => onDelete(row.original)}
          className="p-1.5 hover:bg-rose-50 rounded-lg transition-colors text-rose-500 border border-rose-100"
        >
          <Trash2 size={14} />
        </button>
      </div>
    )
  }
];

export default RequestTableColumns;