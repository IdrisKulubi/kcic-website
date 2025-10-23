"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  BarChart3,
  Newspaper,
  Users,
  Handshake,
  Briefcase,
  Layout,
  Megaphone,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    label: "Homepage Content",
    items: [
      { title: "Hero Section", href: "/admin/hero", icon: Home },
      { title: "Statistics", href: "/admin/stats", icon: BarChart3 },
      { title: "Programmes", href: "/admin/programmes", icon: Briefcase },
      { title: "CTA Banner", href: "/admin/cta", icon: Megaphone },
    ],
  },
  {
    label: "Dynamic Content",
    items: [
      { title: "News", href: "/admin/news", icon: Newspaper },
      { title: "Team", href: "/admin/team", icon: Users },
      { title: "Partners", href: "/admin/partners", icon: Handshake },
    ],
  },
  {
    label: "Site-wide",
    items: [
      { title: "Footer", href: "/admin/footer", icon: Layout },
    ],
  },
];

interface AdminSidebarProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <LayoutDashboard className="h-4 w-4" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold">KCIC Admin</span>
            <span className="text-xs text-muted-foreground">Content Management</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {navGroups.map((group, index) => (
          <div key={group.label}>
            <SidebarGroup>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    
                    return (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton asChild isActive={isActive}>
                          <Link href={item.href}>
                            <Icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            {index < navGroups.length - 1 && <SidebarSeparator />}
          </div>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <div className="px-2 py-2 text-xs text-muted-foreground">
          <p className="truncate font-medium">{user.name}</p>
          <p className="truncate">{user.email}</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
