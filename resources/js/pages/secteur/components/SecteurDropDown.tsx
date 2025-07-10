"use client";

import React, { useState } from "react";
import { Row } from "@tanstack/react-table";
import { Secteur } from "@/pages/secteur/config/columns";

import { FaRegEdit } from "react-icons/fa";
import { MdContentCopy, MdOutlineDelete } from "react-icons/md";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useForm } from "@inertiajs/react";
import toast from "react-hot-toast";
import SecteurDialogEdit from "@/pages/secteur/components/SecteurEditDialogEdit";

type MenuItem =
  | {
      icon: React.ReactElement;
      label: string;
      className: string;
      separator?: false | undefined;
      id?: string | undefined;
    }
  | {
      separator: true;
      icon?: undefined;
      label?: undefined;
      className?: undefined;
    };

export default function ProductDropDown({ row }: { row: Row<Secteur> }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { delete: destroy , post} = useForm();

  function handleEdit() {
    // Fermer le dropdown avant d'ouvrir le dialog
    setIsDropdownOpen(false);

    // Petit délai pour permettre au dropdown de se fermer complètement
    setTimeout(() => {
      setIsEditDialogOpen(true);
    }, 100);
  }

  async function handleDelete() {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce secteur ?')) {
      destroy(route('secteurs.destroy', { secteur: row.original.id }), {
        onSuccess: () => {
          toast.success('Secteur supprimée avec succès');
        },
        onError: () => {
          toast.error('Erreur lors de la suppression de Secteur');
        },
        preserveScroll: true,
      });
    }
  }
   async function handleCopy() {
     if (confirm('Êtes-vous sûr de vouloir faire une copie de ce secteur ?')) {
      const originalName = row.original.nameSecteur;
      const copiedName = `${originalName} - Copy`;

    post(route('secteurs.store', { nameSecteur: copiedName }), {
      onSuccess: () => {
        toast.success('Secteur copiée avec succès');
      },
      onError: () => {
        toast.error('Erreur lors de la copie de la Secteur');
      },
      preserveScroll: true,
    });
  }
}


  function handleClickedItem(item: MenuItem) {
    if (item.label === "Delete") {
      setIsDropdownOpen(false);
      setTimeout(() => {
        handleDelete();
      }, 100);
    }

     if (item.label === "Copy") {
      setIsDropdownOpen(false);
      setTimeout(() => {
        handleCopy();
      }, 100);
    }


    if (item.label === "Edit") {
      handleEdit();
    }
  }

  const menuItems: MenuItem[] = [
    { icon: <MdContentCopy />, label: "Copy", className: "" },
    { icon: <FaRegEdit />, label: "Edit", className: "" },
    { separator: true } as const,
    { icon: <MdOutlineDelete className="text-lg" />, label: "Delete", className: "text-red-600" }
  ];

  return (
    <div>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="poppins">
          {menuItems.map((item, index) =>
            item.separator ? (
              <DropdownMenuSeparator key={index} />
            ) : (
              <DropdownMenuItem
                key={index}
                className={`flex items-center gap-1 p-[10px] ${item.className}`}
                onClick={() => handleClickedItem(item)}
                onSelect={(e) => {
                  // Empêcher la fermeture automatique pour Edit
                  if (item.label === "Edit") {
                    e.preventDefault();
                  }
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog d'édition séparé */}
      <SecteurDialogEdit
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        product={row.original}
      />
    </div>
  );
}

















