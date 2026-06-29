import { ContactForm } from "@/components/contacts/ContactForm";
import { getContactById } from "@/actions/contactActions";
import { notFound } from "next/navigation";

export default async function EditContactPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const contact = await getContactById(id);
  if (!contact) notFound();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Edit Contact</h1>
      <ContactForm initialData={contact} isEditing />
    </div>
  );
}