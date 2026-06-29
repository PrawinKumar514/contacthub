import { ContactForm } from "@/components/contacts/ContactForm";

export default function NewContactPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Add New Contact</h1>
      <ContactForm />
    </div>
  );
}