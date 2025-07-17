"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
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
import { useEffect, useState } from "react";
import PaginationSelection from "@/pages/product/components/PaginationSelection";
import type { Product } from "@/types";
import { motion, AnimatePresence } from 'framer-motion';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export interface PaginationType {
  pageIndex: number;
  pageSize: number;
}

export function ProductTable<TData extends Product, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState<PaginationType>({
    pageIndex: 0,
    pageSize: 8,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [openProductId, setOpenProductId] = useState<number | null>(null);

  useEffect(() => {
    setSorting([
      {
        id: "product_libelle",
        desc: true,
      },
    ]);
  }, []);

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      columnFilters,
      sorting,
    },
    filterFns: {
      multiSelect: () => true,
      idMultiSelect: () => true,
      globalSearch: () => true,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="poppins">
      <div className="flex flex-col gap-3 mb-8 mt-6 ">
        <div className="flex items-center justify-between ">
          <div className="flex gap-2 max-w-lg">
            <Input
              value={(table.getColumn("product_Ref")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("product_Ref")?.setFilterValue(event.target.value)
              }
              placeholder="Rechercher par référence..."
              className="max-w-sm h-10"
            />
            <Input
              value={(table.getColumn("product_libelle")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("product_libelle")?.setFilterValue(event.target.value)
              }
              placeholder="Rechercher par libellé..."
              className="max-w-sm h-10"
            />
          </div>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
                <TableHead>Actions</TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const product = row.original as Product;
                return (
                  <>
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                      <TableCell>
                        <button
                          className="text-blue-600 underline text-sm"
                          onClick={() => setOpenProductId(openProductId === product.id ? null : product.id)}
                        >
                          {openProductId === product.id ? "Voir moins" : "Voir plus"}
                        </button>
                      </TableCell>
                    </TableRow>
                    <AnimatePresence initial={false}>
                      {openProductId === product.id && (
                        <TableRow key={`details-${product.id}`}>
                          <TableCell colSpan={columns.length + 1} className="bg-gray-50 p-0">
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                              style={{ overflow: 'hidden' }}
                            >
                              <div className="p-4 text-sm grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div><span className="font-semibold">Référence :</span> {product.product_Ref}</div>
                                <div><span className="font-semibold">Libellé :</span> {product.product_libelle}</div>
                                <div><span className="font-semibold">Prix achat colis :</span> {product.prix_achat_colis} </div>
                                <div><span className="font-semibold">Prix achat unité :</span> {product.prix_achat_unite} </div>
                                <div><span className="font-semibold">Prix vente colis :</span> {product.prix_vente_colis} </div>
                                <div><span className="font-semibold">Prix vente unité :</span> {product.prix_vente_unite} </div>
                                <div><span className="font-semibold">Poids :</span> {product.product_Poids} </div>
                                <div><span className="font-semibold">Unités/colis :</span> {product.nombre_unite_par_colis} </div>
                                <div><span className="font-semibold">Observation :</span> {product.observation || "-"} </div>
                                <div><span className="font-semibold">Marque :</span> {product.brand?.brand_name || product.brand_id} </div>
                                <div><span className="font-semibold">Catégorie :</span> {product.category?.category_name || product.category_id} </div>
                              </div>
                            </motion.div>
                          </TableCell>
                        </TableRow>
                      )}
                    </AnimatePresence>
                  </>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                  Aucun produit trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <PaginationSelection
          pagination={pagination}
          setPagination={setPagination}
        />
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <BiFirstPage />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <GrFormPrevious />
          </Button>
          <span>
            Page {table.getState().pagination.pageIndex + 1} sur {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <GrFormNext />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <BiLastPage />
          </Button>
        </div>
      </div>
    </div>
  );
}
