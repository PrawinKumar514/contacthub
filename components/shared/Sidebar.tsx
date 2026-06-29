"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  PlusCircle,
  Settings,
  LogOut,
} from "lucide-react";

const routes = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/contacts", label: "Contacts", icon: Users },
  { href: "/dashboard/contacts/new", label: "Add Contact", icon: PlusCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-card px-4 py-6 h-full">
      <div className="text-2xl font-bold text-primary mb-8 px-2">ContactHub</div>
      <nav className="space-y-2 flex-1">
        {routes.map((route) => {
          const Icon = route.icon;
          return (
            <Link key={route.href} href={route.href}>
              <Button
                variant={pathname === route.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 font-normal",
                  pathname === route.href && "bg-secondary"
                )}
              >
                <Icon className="h-5 w-5" />
                {route.label}
              </Button>
            </Link>
          );
        })}
      </nav>
      <div className="border-t pt-4 mt-4 space-y-2">
        <Button variant="ghost" className="w-full justify-start gap-3 font-normal">
          <Settings className="h-5 w-5" />
          Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3 font-normal text-destructive">
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </aside>
  );
}