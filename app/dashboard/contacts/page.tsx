import { ContactList } from "@/components/contacts/ContactList";
import { getContacts } from "@/actions/contactActions";
import { ContactFilters } from "@/components/contacts/ContactFilters";

interface SearchParams {
  search?: string;
  sort?: string;
  page?: string;
}

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const search = params.search || "";
  const sort = params.sort || "recent";

  const { contacts, totalPages, total } = await getContacts({
    page,
    limit: 10,
    search,
    sort,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Contacts</h1>
      </div>
      <ContactFilters initialSearch={search} initialSort={sort} />
      <ContactList
        contacts={contacts}
        currentPage={page}
        totalPages={totalPages}
        total={total}
      />
    </div>
  );
}