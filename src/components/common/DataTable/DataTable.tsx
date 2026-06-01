import {
  Table,
  TableBody,
  TableCol,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";

export interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

export function Datatable<T>({
  columns,
  data,
  emptyMessage,
}: DataTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((row) => (
            <TableRow>
              {columns.map((column) => (
                <TableCol>
                  {column.render
                    ? column.render(row[column.key], row)
                    : String(row[column.key] ?? "-")}
                </TableCol>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCol colSpan={columns.length}>{emptyMessage}</TableCol>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
