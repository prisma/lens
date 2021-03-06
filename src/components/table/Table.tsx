import React, { createContext, useRef, useContext } from "react"
import cn from "classnames"
import {
  useTable,
  useTableRow,
  useTableColumnHeader,
  useTableCell,
  useTableRowGroup,
} from "@react-aria/table"
import {
  useTableState,
  TableState,
  TableHeader as ReactAriaTableHeader,
  TableBody as ReactAriaTableBody,
  Row as ReactAriaTableRow,
  Column as ReactAriaTableColumn,
  Cell as ReactAriaTableCell,
} from "@react-stately/table"
import {
  TableHeaderProps as ReactAriaTableHeaderProps,
  TableBodyProps as ReactAriaTableBodyProps,
  RowProps as ReactAriaTableRowProps,
  ColumnProps as ReactAriaTableColumnProps,
  CellProps as ReactAriaTableCellProps,
} from "@react-types/table"

// @ts-expect-error: We cannot provide a valid initial value, but TSC does not understand that it is okay
const TableContext = createContext<TableState<TableValue>>(null)

// This is not typed so that the consumer has the freedom to render whatever they like
type TableValue = any

/** Manually typed representation of a row / column / cell in react-aria. Reference: https://react-spectrum.adobe.com/react-stately/Collection.html */
type ReactAriaTableNode = {
  /** User provided key */
  key: React.Key
  /** Type of node. Can be `column` (for columns), `item` (for rows) or `cell` (for cells) */
  type: string
  /** Rendered React element */
  rendered: React.ReactNode
  /** User provided value from `Table.Header`'s `column` prop */
  value: TableValue
  /** Depth of this column */
  level: number
  /** Indicates if this columns has more sub-columns */
  hasChildNodes: boolean
  /** Sub-columns */
  childNodes: Iterable<ReactAriaTableNode>
  /** Not really sure */
  textValue: string
}

type TableContainerProps = {
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** A label describing what this table represents (for accessibility) */
  label: string
  children: React.ReactElement[]
}

function TableContainer({ id, label, children }: TableContainerProps) {
  const ref = useRef<HTMLTableElement>(null)

  if (children.length < 2) {
    throw new Error("A Table.Container must contain at least two children")
  }

  const state = useTableState<TableValue>({
    selectionMode: "none",
    children,
  })
  const { gridProps } = useTable({ id, "aria-label": label }, state, ref)

  return (
    <TableContext.Provider value={state}>
      <table
        ref={ref}
        className="table w-full"
        style={{ borderSpacing: "0 1rem" }}
        {...gridProps}
        id={id}
      >
        <TableHeader />
        <TableBody />
      </table>
    </TableContext.Provider>
  )
}

type TableHeaderProps = {}

function TableHeader({}: TableHeaderProps) {
  const state = useContext(TableContext)
  const ref = useRef<HTMLTableSectionElement>(null)
  const { rowGroupProps } = useTableRowGroup()

  if (state.collection.headerRows.length == 0) {
    // If no header rows are defined, render nothing
    return null
  }

  return (
    <thead ref={ref} lens-role="table-header" {...rowGroupProps}>
      {state.collection.headerRows.map((r) => (
        <TableHeaderRow key={r.key} row={r} />
      ))}
    </thead>
  )
}

type TableHeaderRowProps = {
  row: ReactAriaTableNode
}
function TableHeaderRow({ row }: TableHeaderRowProps) {
  const state = useContext(TableContext)
  const ref = useRef<HTMLTableRowElement>(null)
  const { rowProps } = useTableRow({ node: row }, state, ref)

  return (
    <tr
      ref={ref}
      lens-role="table-header-row"
      {...rowProps}
      className="table-row"
    >
      {[...row.childNodes].map((c) => (
        <TableColumnHeader key={c.key} column={c} />
      ))}
    </tr>
  )
}

type TableColumnHeaderProps = {
  column: ReactAriaTableNode
}
function TableColumnHeader({ column }: TableColumnHeaderProps) {
  const state = useContext(TableContext)
  const ref = useRef<HTMLTableHeaderCellElement>(null)
  const { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref
  )

  return (
    <th
      ref={ref}
      lens-role="table-column-header"
      {...columnHeaderProps}
      className={cn(
        "table-cell",
        "px-6 py-2",
        "font-barlow uppercase text-sm text-left text-gray-800 dark:text-gray-100"
      )}
    >
      {column.rendered}
    </th>
  )
}

export function TableBody({}) {
  const state = useContext(TableContext)
  return (
    <tbody lens-role="table-body">
      {[...state.collection.body.childNodes].map((row) => (
        <TableRow key={row.key} row={row} />
      ))}
    </tbody>
  )
}

type TableRowProps = {
  row: ReactAriaTableNode
}
function TableRow({ row }: TableRowProps) {
  const ref = useRef<HTMLTableRowElement>(null)
  const state = useContext(TableContext)
  const { rowProps } = useTableRow({ node: row }, state, ref)

  return (
    <tr
      ref={ref}
      lens-role="table-row"
      {...rowProps}
      className={cn(
        "table-row",
        "even:bg-white dark:even:bg-gray-800 odd:bg-gray-100 dark:odd:bg-gray-900"
      )}
    >
      {[...row.childNodes].map((cell: any) => (
        <TableCell key={cell.key} cell={cell} />
      ))}
    </tr>
  )
}

type TableCellProps = {
  cell: ReactAriaTableNode
}
function TableCell({ cell }: TableCellProps) {
  const ref = useRef<HTMLTableDataCellElement>(null)
  const state = useContext(TableContext)
  const { gridCellProps } = useTableCell({ node: cell }, state, ref)

  return (
    <td
      ref={ref}
      lens-role="table-cell"
      {...gridCellProps}
      className={cn(
        "table-cell px-6 py-3",
        "text-sm text-gray-600 dark:text-gray-300"
      )}
    >
      {cell.rendered}
    </td>
  )
}

export const Table = {
  Container: TableContainer,
  Header: ReactAriaTableHeader as React.FC<
    ReactAriaTableHeaderProps<TableValue>
  >,
  Body: ReactAriaTableBody as React.FC<ReactAriaTableBodyProps<TableValue>>,
  Row: ReactAriaTableRow as React.FC<ReactAriaTableRowProps>,
  Column: ReactAriaTableColumn as React.FC<
    ReactAriaTableColumnProps<TableValue>
  >,
  Cell: ReactAriaTableCell as React.FC<ReactAriaTableCellProps>,
}
