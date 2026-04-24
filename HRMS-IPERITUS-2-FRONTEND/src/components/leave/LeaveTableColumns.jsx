import { Pencil, Trash2, MoreVertical } from "lucide-react";

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

const LeaveTableColumns = (onEdit, onDelete) => [
  {
    id: "req",
    header: "Req",
    size: 50,
    cell: ({ row }) => <span className="text-muted/40 font-medium tabular-nums">{row.index + 1}</span>
  },
  {
    accessorKey: "leaveType",
    header: "Type",
    cell: ({ row }) => <span className="font-bold text-textMain">{row.original.leaveType}</span>
  },
  {
    accessorKey: "fromDate",
    header: "From",
    cell: ({ row }) => <span className="text-muted/60 tabular-nums">{row.original.fromDate}</span>
  },
  {
    accessorKey: "toDate",
    header: "To",
    cell: ({ row }) => <span className="text-muted/60 tabular-nums">{row.original.toDate}</span>
  },
  {
    accessorKey: "days",
    header: "Days",
    cell: ({ row }) => <span className="text-muted/60 font-medium">{row.original.days}</span>
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className={`
        px-3 py-1 
        rounded-full 
        text-[11px] 
        font-bold 
        border
        ${getStatusBadge(row.original.status)}
      `}>
        {row.original.status}
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

export default LeaveTableColumns;