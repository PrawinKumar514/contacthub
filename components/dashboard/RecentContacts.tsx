import { Contact } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactCard } from "../contacts/ContactCard";

export function RecentContacts({ contacts }: { contacts: Contact[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Contacts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {contacts.length === 0 ? (
          <p className="text-muted-foreground">No contacts yet.</p>
        ) : (
          contacts.map((contact) => (
            <ContactCard key={contact._id} contact={contact} />
          ))
        )}
      </CardContent>
    </Card>
  );
}