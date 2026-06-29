"use client";

import { Contact } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Building, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteContact } from "@/actions/contactActions";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export function ContactCard({ contact }: { contact: Contact }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteContact(contact._id);
      toast.success("Contact deleted successfully");
      router.refresh();
    } catch {
      toast.error("Failed to delete contact");
    }
    setOpen(false);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{contact.name}</h3>
            <p className="text-sm text-muted-foreground">{contact.designation}</p>
            {contact.company && (
              <p className="text-sm flex items-center gap-1 mt-1">
                <Building className="h-3 w-3" />
                {contact.company}
              </p>
            )}
          </div>
          <Badge variant="outline">{contact.email}</Badge>
        </div>
        <div className="mt-3 space-y-1 text-sm">
          {contact.phone && (
            <p className="flex items-center gap-2">
              <Phone className="h-3 w-3 text-muted-foreground" />
              {contact.phone}
            </p>
          )}
          {contact.email && (
            <p className="flex items-center gap-2">
              <Mail className="h-3 w-3 text-muted-foreground" />
              {contact.email}
            </p>
          )}
          {contact.address && (
            <p className="flex items-center gap-2">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              {contact.address}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 border-t pt-3">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/dashboard/contacts/${contact._id}/edit`}>
            <Pencil className="h-4 w-4 mr-1" />
            Edit
          </Link>
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {contact.name}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}