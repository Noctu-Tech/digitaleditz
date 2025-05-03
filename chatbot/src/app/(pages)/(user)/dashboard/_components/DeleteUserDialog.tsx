"use client"

import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogAction
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { deleteManyUsers, deleteUser } from "@/lib/functions/user/deleteUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  userName?: string;
  userId: string | string[];
}

function DeleteUserDialog({ open, setOpen, userId, userName }: Props) {
  const [confirmText, setConfirmtext] = useState("");
  const queryClient = useQueryClient();

  const normalizedUserIds = Array.isArray(userId) ? userId : [userId];
  const requiresConfirmation = normalizedUserIds.length === 1;

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (normalizedUserIds.length === 1) {
        return deleteUser(normalizedUserIds[0]);
      } else {
        return deleteManyUsers(normalizedUserIds);
      }
    },
    onSuccess: () => {
      toast.success("User(s) deleted successfully", { id: JSON.stringify(userId) });
      setConfirmtext("");
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setOpen(false);
    },
    onError: () => {
      toast.error("Something went wrong", { id: JSON.stringify(userId) });
    }
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            If you delete {normalizedUserIds.length > 1 ? "these users" : "this user"}, you will not be able to recover {normalizedUserIds.length > 1 ? "them" : "it"}.
            {requiresConfirmation && (
              <div className="flex flex-col py-4 gap-2">
                <p>If you are sure, enter <b>{userName}</b> to confirm:</p>
                <Input
                  value={confirmText}
                  onChange={(e) => setConfirmtext(e.target.value)}
                />
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmtext("")}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={(requiresConfirmation && confirmText !== userName) || deleteMutation.isPending}
            onClick={() => {
              toast.loading("Deleting user(s)...", { id: JSON.stringify(userId) });
              deleteMutation.mutate();
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteUserDialog;
