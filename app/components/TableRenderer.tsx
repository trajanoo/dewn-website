import React from 'react'

type Table = {
  caption?: string
  columns: string[]
  rows: { cells: string[] }[]
}

export default function TableRenderer({ table }: { table: Table }) {
  return (
    <div className="my-6 overflow-auto">
      {table.caption && <p className="text-sm text-muted-foreground mb-2">{table.caption}</p>}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            {table.columns.map((c, i) => (
              <th key={i} className="border px-3 py-2 text-left bg-surface/50">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((r, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? '' : 'bg-muted/5'}>
              {r.cells.map((cell, ci) => (
                <td key={ci} className="border px-3 py-2 align-top">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
