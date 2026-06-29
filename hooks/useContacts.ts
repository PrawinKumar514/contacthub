import { useEffect, useState } from "react";
import { Contact } from "@/types";

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contacts")
      .then((res) => res.json())
      .then((data) => {
        setContacts(data.contacts);
        setLoading(false);
      });
  }, []);

  return { contacts, loading };
}