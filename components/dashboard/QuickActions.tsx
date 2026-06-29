import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button asChild className="w-full justify-start gap-2">
          <Link href="/dashboard/contacts/new">
            <PlusCircle className="h-4 w-4" />
            Add New Contact
          </Link>
        </Button>
        <Button variant="outline" asChild className="w-full justify-start gap-2">
          <Link href="/dashboard/contacts">
            <Search className="h-4 w-4" />
            Search Contacts
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}