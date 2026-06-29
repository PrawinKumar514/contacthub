import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Contact from "@/models/Contact";
import { contactSchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  await connectDB();
  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "recent";

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

  return NextResponse.json({
    contacts,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const validated = contactSchema.parse(body);
  const contact = await Contact.create(validated);
  return NextResponse.json(contact, { status: 201 });
}