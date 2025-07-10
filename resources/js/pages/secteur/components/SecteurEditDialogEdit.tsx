"use client"
import React from "react";
import { Secteur } from "@/pages/secteur/config/columns";
import { useForm } from "@inertiajs/react";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProductDialogEditProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  product: Secteur;
}

export default function ProductDialogEdit({
  isOpen,
  onOpenChange,
  product
}: ProductDialogEditProps) {
  const { put, data, setData, processing, reset, errors } = useForm({
    nameSecteur: product.nameSecteur || "",
  });

  function handleEditSubmit(e: React.FormEvent) {
    e.preventDefault();

    put(route('secteurs.update', { ville: product.id }), {
      onSuccess: () => {
        toast.success('Secteur modifiée avec succès');
        onOpenChange(false);
        reset();
      },
      onError: (errors) => {
        toast.error('Erreur lors de la modification');
        console.error(errors);
      },
      preserveScroll: true,
    });
  }

  // Réinitialiser les données quand le dialog s'ouvre
  React.useEffect(() => {
    if (isOpen) {
      setData({
        nameSecteur: product.nameSecteur|| "",
      });
    }
  }, [isOpen, product.nameSecteur, setData]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier Secteur</DialogTitle>
          <DialogDescription>
            Modifiez le nom de secteur ci-dessous.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleEditSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nameVille" className="text-right">
                Secteur Name
              </Label>
              <Input
                id="nameVille"
                value={data.nameSecteur}
                onChange={(e) => setData('nameSecteur', e.target.value)}
                className="col-span-3"
                required
              />
            </div>
               {errors.nameSecteur && (
                <p className="text-xs text-red-500">{errors.nameSecteur}</p>
              )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={processing}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={processing}>
              {processing ? 'Modification...' : 'Modifier'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
