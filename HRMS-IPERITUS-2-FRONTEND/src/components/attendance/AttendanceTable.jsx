import DataTable from "../../ui/DataTable";
import {
  Search,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

function AttendanceTable({ data = [] }) {

  const getStatusBadge = (status) => {
    switch (status) {
      case "Present":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Absent":
        return "bg-rose-100 text-rose-700 border-rose-200";
      case "Late":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Holiday":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Weekly Off":
        return "bg-slate-100 text-slate-700 border-slate-200";
      default:
        return "bg-slate-50 text-slate-500 border-slate-100";
    }
  };

  const columns = [
    {
      accessorKey: "no",
      header: "No",
      size: 50,
      cell: ({ row }) => <span className="text-muted/60">{row.index + 1}</span>
    },
    {
      accessorKey: "date",
      header: "Date",
      size: 150,
      cell: ({ row }) => (
        <span className="font-bold text-textMain tracking-tight">
          {row.original.date}
        </span>
      )
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 120,
      cell: ({ row }) => {
        const value = row.original.status || "N/A";
        return (
          <span className={`
            px-3 py-1 
            rounded-full 
            text-[11px] 
            font-bold 
            border 
            ${getStatusBadge(value)}
          `}>
            {value === "Present" ? "Yes" : value === "Absent" ? "No" : value}
          </span>
        );
      }
    },
    {
      accessorKey: "inTime",
      header: "Time In",
      size: 120,
      cell: ({ row }) => <span className="text-muted font-medium">{row.original.inTime || "-"}</span>
    },
    {
      accessorKey: "outTime",
      header: "Time Out",
      size: 120,
      cell: ({ row }) => <span className="text-muted font-medium">{row.original.outTime || "-"}</span>
    },
    {
      accessorKey: "hours",
      header: "Hours",
      size: 100,
      cell: ({ row }) => <span className="font-bold">{row.original.hours || "0"}h</span>
    },
    {
      id: "actions",
      header: "",
      size: 50,
      cell: () => (
        <button className="p-1 hover:bg-bgMain rounded-full transition-colors text-muted hover:text-textMain">
          <MoreVertical size={18} />
        </button>
      )
    }
  ];

  const Toolbar = (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center flex-1 max-w-md bg-bgMain/50 rounded-xl border border-primary/5 px-3 py-2">
        <Search size={18} className="text-muted/50 mr-2" />
        <input
          type="text"
          placeholder="Search records..."
          className="bg-transparent border-none outline-none text-sm w-full text-textMain/70"
        />
      </div>
      <button className="flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary/70 hover:bg-primary/10 rounded-xl transition-all font-bold text-xs uppercase tracking-widest border border-primary/10">
        <Download size={16} />
        Export CSV
      </button>
    </div>
  );

  const Pagination = (
    <div className="flex items-center justify-between">
      <span className="text-[12px] text-muted/60 font-medium tracking-tight">
        Showing 1 to {data.length} of {data.length} entries
      </span>
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-bgCard rounded-lg border border-primary/5 text-muted/40 transition-all">
          <ChevronLeft size={18} />
        </button>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-lg font-bold text-xs shadow-sm">1</button>
        </div>
        <button className="p-2 hover:bg-bgCard rounded-lg border border-primary/5 text-muted/40 transition-all">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );

  return (
    <DataTable
      data={data}
      columns={columns}
      toolbar={Toolbar}
      pagination={Pagination}
    />
  );
}

export default AttendanceTable;