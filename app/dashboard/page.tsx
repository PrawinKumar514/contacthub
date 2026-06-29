import { StatsCards } from "@/components/dashboard/StatsCards";
import { RecentContacts } from "@/components/dashboard/RecentContacts";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { getContacts } from "@/actions/contactActions";
import { Contact } from "@/types";

export default async function DashboardPage() {
  const { contacts } = await getContacts({ page: 1, limit: 5 }) as { contacts: Contact[] };
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <StatsCards />
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <RecentContacts contacts={contacts} />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
}