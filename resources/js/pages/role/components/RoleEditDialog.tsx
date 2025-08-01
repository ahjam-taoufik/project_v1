"use client";

import { useEffect, useMemo } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import toast from 'react-hot-toast';
import { Role } from '@/pages/role/config/columns';
import type { Permission } from "@/types";

interface RoleWithPermissions extends Omit<Role, 'permissions'> {
  permissions?: Permission[];
}

interface RoleEditDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  role: RoleWithPermissions;
  permissions: Permission[];
}

export default function RoleEditDialog({ isOpen, onOpenChange, role, permissions }: RoleEditDialogProps) {
  const { data, setData, put, errors, reset, processing } = useForm({
    name: "",
    permissions: [] as string[],
  });

  // Grouper les permissions par modèle
  const groupedPermissions = useMemo(() => {
    const groups: Record<string, Permission[]> = {};

    permissions.forEach((permission) => {
      const [model] = permission.name.split('.');
      const modelName = model.charAt(0).toUpperCase() + model.slice(1);

      if (!groups[modelName]) {
        groups[modelName] = [];
      }
      groups[modelName].push(permission);
    });

    return groups;
  }, [permissions]);

  useEffect(() => {
    if (isOpen && role) {
      const rolePermissions = role.permissions ? role.permissions.map((p: Permission) => p.name) : [];

      setData({
        name: role.name,
        permissions: rolePermissions,
      });
    }
  }, [isOpen, role, setData]);

  const handlePermissionChange = (permissionName: string, checked: boolean) => {
    if (checked) {
      setData('permissions', [...data.permissions, permissionName]);
    } else {
      setData('permissions', data.permissions.filter(p => p !== permissionName));
    }
  };

  // Gérer la sélection/désélection de toutes les permissions d'un groupe
  const handleGroupChange = (groupPermissions: Permission[], checked: boolean) => {
    const groupPermissionNames = groupPermissions.map(p => p.name);

    if (checked) {
      const newPermissions = [...data.permissions];
      groupPermissionNames.forEach(name => {
        if (!newPermissions.includes(name)) {
          newPermissions.push(name);
        }
      });
      setData('permissions', newPermissions);
    } else {
      setData('permissions', data.permissions.filter(p => !groupPermissionNames.includes(p)));
    }
  };

  // Vérifier si toutes les permissions d'un groupe sont sélectionnées
  const isGroupFullySelected = (groupPermissions: Permission[]) => {
    return groupPermissions.every(permission => data.permissions.includes(permission.name));
  };

  // Vérifier si au moins une permission d'un groupe est sélectionnée
  const isGroupPartiallySelected = (groupPermissions: Permission[]) => {
    return groupPermissions.some(permission => data.permissions.includes(permission.name)) &&
           !isGroupFullySelected(groupPermissions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    put(route('roles.update', { role: role.id }), {
      onSuccess: () => {
        toast.success('Rôle modifié avec succès!');
        onOpenChange(false);
      },
      onError: () => {
        console.log(errors);
        toast.error('Erreur lors de la modification du rôle!');
      },
      preserveScroll: true,
    });
  };

  const handleCancel = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[95vw] max-w-[800px] max-h-[95vh] overflow-y-auto p-4 sm:p-6 sm:max-w-[800px] md:p-7 md:px-8 poppins"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-lg sm:text-xl md:text-[22px] text-center sm:text-left">
            Modifier le Rôle
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-center sm:text-left">
            Modifiez les informations du rôle
          </DialogDescription>
        </DialogHeader>
        <Separator className="my-4" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="space-y-1">
              <Label htmlFor="edit-name">Nom du Rôle</Label>
              <Input
                id="edit-name"
                name="name"
                type="text"
                placeholder="Entrez le nom du rôle (min. 3 caractères)"
                className="h-10 sm:h-11"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label>Permissions</Label>
              <div className="max-h-64 overflow-y-auto p-3 border rounded-md space-y-4">
                {Object.keys(groupedPermissions).length > 0 ? (
                  Object.entries(groupedPermissions).map(([groupName, groupPermissions]) => (
                    <div key={groupName} className="space-y-2">
                      <div className="flex items-center space-x-2 pb-2 border-b">
                        <Checkbox
                          id={`edit-group-${groupName}`}
                          checked={isGroupFullySelected(groupPermissions)}
                          ref={(checkbox) => {
                            if (checkbox) {
                              const input = checkbox.querySelector('input') as HTMLInputElement;
                              if (input) {
                                input.indeterminate = isGroupPartiallySelected(groupPermissions);
                              }
                            }
                          }}
                          onCheckedChange={(checked) =>
                            handleGroupChange(groupPermissions, checked as boolean)
                          }
                        />
                        <Label
                          htmlFor={`edit-group-${groupName}`}
                          className="text-sm font-semibold cursor-pointer text-primary"
                        >
                          {groupName}
                        </Label>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-6">
                        {groupPermissions.map((permission) => (
                          <div key={permission.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`edit-permission-${permission.id}`}
                              checked={data.permissions.includes(permission.name)}
                              onCheckedChange={(checked) =>
                                handlePermissionChange(permission.name, checked as boolean)
                              }
                            />
                            <Label
                              htmlFor={`edit-permission-${permission.id}`}
                              className="text-sm font-normal cursor-pointer text-muted-foreground"
                            >
                              {permission.name.split('.')[1]}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Aucune permission disponible
                  </p>
                )}
              </div>
              {errors.permissions && (
                <p className="text-xs text-red-500">{errors.permissions}</p>
              )}
            </div>
          </div>

          <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 md:pt-9">
            <Button
              type="button"
              variant="secondary"
              className="h-11 px-6 sm:px-8 md:px-11 w-full sm:w-auto"
              disabled={processing}
              onClick={handleCancel}
            >
              Annuler
            </Button>

            <Button
              type="submit"
              className="h-11 px-6 sm:px-8 md:px-11 w-full sm:w-auto flex items-center justify-center gap-2"
              disabled={processing}
            >
              {processing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Modification en cours...</span>
                </>
              ) : (
                "Modifier"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
