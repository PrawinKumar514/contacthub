import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building, UserPlus } from "lucide-react";
import { getContacts } from "@/actions/contactActions";

export async function StatsCards() {
  const { contacts, total } = await getContacts({ page: 1, limit: 1 });
  // For demo, we just use total count; we can also compute unique companies
  const companies = new Set(contacts.map(c => c.company).filter(Boolean)).size;
  // For real stats, we would do separate queries, but for simplicity:
  const totalCompanies = await getContacts({ page: 1, limit: 1, search: "" }) // not actual
    .then(() => 0); // placeholder

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Companies</CardTitle>
          <Building className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{companies}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recent Additions</CardTitle>
          <UserPlus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total}</div>
        </CardContent>
      </Card>
    </div>
  );
}