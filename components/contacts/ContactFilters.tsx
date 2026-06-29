"use client";

import { useRouter, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

interface ContactFiltersProps {
  initialSearch: string;
  initialSort: string;
}

export function ContactFilters({
  initialSearch,
  initialSort,
}: ContactFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState(initialSearch);
  const [sort, setSort] = useState(initialSort);
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (sort) params.set("sort", sort);
    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedSearch, sort, pathname, router]);

  return (
    <div className="flex flex-wrap gap-4 items-end">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, email, company, phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>
      <Select value={sort} onValueChange={setSort}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recent">Recently Added</SelectItem>
          <SelectItem value="az">Name A-Z</SelectItem>
          <SelectItem value="za">Name Z-A</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}