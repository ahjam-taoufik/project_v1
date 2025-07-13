"use client";

import { Column, ColumnDef } from "@tanstack/react-table";
import ClientDropDown from "@/pages/client/components/ClientDropDown";
import { ArrowUpDown } from "lucide-react";
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export type Client = {
  id: string;
  code: string;
  fullName: string;
  idVille: string;
  idSecteur: string;
  created_at: Date;
  ville: {
    id: string;
    nameVille: string;
  };
  secteur: {
    id: string;
    nameSecteur: string;
  };
};

function SortableHeader({ column, label }: { column: Column<Client, unknown>, label: string }) {
  const isSorted = column.getIsSorted();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 data-[state=open]:bg-accent">
          {label}
          {isSorted === "desc" ? (
            <IoMdArrowDown className="ml-2 h-4 w-4" />
          ) : isSorted === "asc" ? (
            <IoMdArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
          <IoMdArrowUp className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
          <IoMdArrowDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Desc
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => <SortableHeader column={column} label="Code" />,
    cell: ({ row }) => {
      return <div className="text-left font-medium">{row.getValue("code")}</div>
    },
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => <SortableHeader column={column} label="Nom Complet" />,
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue("fullName")}</div>
    },
  },
  {
    accessorKey: "idVille",
    header: ({ column }) => <SortableHeader column={column} label="Ville" />,
    cell: ({ row }) => {
      return <div className="text-left">{row.original.ville?.nameVille || 'Inconnue'}</div>
    },
  },
  {
    accessorKey: "idSecteur",
    header: ({ column }) => <SortableHeader column={column} label="Secteur" />,
    cell: ({ row }) => {
      return <div className="text-left">{row.original.secteur?.nameSecteur || 'Inconnu'}</div>
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (<div className="text-center"> <SortableHeader column={column} label="Created At" /></div>),
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"))
      const formatted = date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })

      return <div className="text-center">{formatted}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ClientDropDown row={row} />;
    },
  },
];
