"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import React from "react";
import { usePathname } from "next/navigation";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const pathname = usePathname();
  const splitPathname = pathname.split("/")[2];

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="rounded-md border ">
        {/*nevim podle čeho hledat*/}
        {/*<div className="flex items-center py-4">*/}
        {/*  <Input*/}
        {/*    placeholder="Filter emails..."*/}
        {/*    value={(table.getColumn("id")?.getFilterValue() as number) ?? ""}*/}
        {/*    onChange={(event) =>*/}
        {/*      table.getColumn("id")?.setFilterValue(event.target.value)*/}
        {/*    }*/}
        {/*    className="max-w-sm"*/}
        {/*  />*/}
        {/*</div>*/}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`${splitPathname === "orders" && "[&:nth-child(4)]:max-sm:hidden "} ${splitPathname === "products" && "[&:nth-child(4)]:max-sm:hidden "} `}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`${splitPathname === "orders" && " [&:nth-child(3)]:block [&:nth-child(3)]:max-h-[90px] [&:nth-child(3)]:max-w-[300px] [&:nth-child(3)]:overflow-auto [&:nth-child(4)]:max-sm:hidden first:overflow-auto"} ${splitPathname === "products" && "[&:nth-child(4)]:max-sm:hidden "} `}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center "
                >
                  Bez výsledků
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Předchozí
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Další
        </Button>
      </div>
    </div>
  );
}
