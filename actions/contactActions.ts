"use server";

import connectDB from "@/lib/db";
import Contact from "@/models/Contact";
import { ContactFormData } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function getContacts({
  page = 1,
  limit = 10,
  search = "",
  sort = "recent",
}: {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
}) {
  await connectDB();
  const query: any = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
    ];
  }
  let sortOption: any = {};
  if (sort === "az") sortOption = { name: 1 };
  else if (sort === "za") sortOption = { name: -1 };
  else sortOption = { createdAt: -1 };

  const skip = (page - 1) * limit;
  const [contacts, total] = await Promise.all([
    Contact.find(query).sort(sortOption).skip(skip).limit(limit).lean(),
    Contact.countDocuments(query),
  ]);

  return {
    contacts: JSON.parse(JSON.stringify(contacts)),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getContactById(id: string) {
  await connectDB();
  const contact = await Contact.findById(id).lean();
  return contact ? JSON.parse(JSON.stringify(contact)) : null;
}

export async function createContact(data: ContactFormData) {
  await connectDB();
  await Contact.create(data);
  revalidatePath("/dashboard/contacts");
}

export async function updateContact(id: string, data: ContactFormData) {
  await connectDB();
  await Contact.findByIdAndUpdate(id, data);
  revalidatePath("/dashboard/contacts");
}

export async function deleteContact(id: string) {
  await connectDB();
  await Contact.findByIdAndDelete(id);
  revalidatePath("/dashboard/contacts");
}