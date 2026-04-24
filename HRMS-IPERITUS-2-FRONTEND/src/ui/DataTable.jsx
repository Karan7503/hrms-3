import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from "@tanstack/react-table";

function DataTable({
  data = [],
  columns = [],
  emptyMessage = "No data available",
  toolbar,
  pagination
}) {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="bg-bgCard rounded-2xl border border-primary/10 shadow-sm overflow-hidden flex flex-col max-h-[calc(100vh-250px)]">
      
      {/* TOOLBAR AREA */}
      {toolbar && (
        <div className="px-6 py-4 border-b border-primary/5 flex-shrink-0">
          {toolbar}
        </div>
      )}

      <div className="w-full overflow-auto relative scrollbar-thin">
        <table className="w-full border-separate border-spacing-0">
          {/* HEADER */}
          <thead className="sticky top-0 z-30 bg-bgCard">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="
                      px-6 py-5
                      text-[11px]
                      text-left
                      font-black
                      text-muted/40
                      uppercase
                      tracking-widest
                      bg-bgCard
                      border-b border-primary/10
                    "
                    style={{ width: header.getSize() }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* BODY */}
          <tbody className="divide-y divide-primary/5">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <tr
                  key={row.id}
                  className="hover:bg-primary/5 transition-all duration-200"
                >
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="px-6 py-5 text-[13px] text-textMain/80 border-b border-primary/5"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-20 text-sm text-muted font-medium italic"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION AREA */}
      {pagination && (
        <div className="px-6 py-4 border-t border-primary/5 bg-bgCard flex-shrink-0">
          {pagination}
        </div>
      )}
    </div>
  );
}

export default DataTable;


