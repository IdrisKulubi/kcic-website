import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Home,
  BarChart3,
  Newspaper,
  Users,
  Handshake,
  Briefcase,
  Layout,
  Megaphone,
} from "lucide-react";
import db from "../../../db/drizzle";
import { news, teamMembers, partners, statistics } from "../../../db/schema";
import { sql } from "drizzle-orm";

export default async function AdminDashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Fetch quick stats
  const [newsCount, teamCount, partnersCount, statsCount] = await Promise.all([
    db
      .select({ count: sql<number>`count(*)` })
      .from(news)
      .then((r) => r[0]?.count ?? 0),
    db
      .select({ count: sql<number>`count(*)` })
      .from(teamMembers)
      .then((r) => r[0]?.count ?? 0),
    db
      .select({ count: sql<number>`count(*)` })
      .from(partners)
      .then((r) => r[0]?.count ?? 0),
    db
      .select({ count: sql<number>`count(*)` })
      .from(statistics)
      .then((r) => r[0]?.count ?? 0),
  ]);

  const quickLinks = [
    {
      title: "Hero Section",
      description: "Edit homepage hero content",
      href: "/admin/hero",
      icon: Home,
    },
    {
      title: "Statistics",
      description: "Manage impact statistics",
      href: "/admin/stats",
      icon: BarChart3,
      count: statsCount,
    },
    {
      title: "News",
      description: "Manage news articles",
      href: "/admin/news",
      icon: Newspaper,
      count: newsCount,
    },
    {
      title: "Team",
      description: "Manage team members",
      href: "/admin/team",
      icon: Users,
      count: teamCount,
    },
    {
      title: "Partners",
      description: "Manage partner organizations",
      href: "/admin/partners",
      icon: Handshake,
      count: partnersCount,
    },
    {
      title: "Programmes",
      description: "Edit programme information",
      href: "/admin/programmes",
      icon: Briefcase,
    },
    {
      title: "Footer",
      description: "Edit footer content",
      href: "/admin/footer",
      icon: Layout,
    },
    {
      title: "CTA Banner",
      description: "Edit call-to-action banner",
      href: "/admin/cta",
      icon: Megaphone,
    },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {session?.user.name}!
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">News Articles</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newsCount}</div>
            <p className="text-xs text-muted-foreground">Published articles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamCount}</div>
            <p className="text-xs text-muted-foreground">Active team members</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Partners</CardTitle>
            <Handshake className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{partnersCount}</div>
            <p className="text-xs text-muted-foreground">
              Partner organizations
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Statistics</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsCount}</div>
            <p className="text-xs text-muted-foreground">Impact statistics</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Quick Links</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Card
                key={link.href}
                className="hover:bg-accent transition-colors"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Icon className="h-8 w-8 text-primary" />
                    {link.count !== undefined && (
                      <span className="text-2xl font-bold">{link.count}</span>
                    )}
                  </div>
                  <CardTitle>{link.title}</CardTitle>
                  <CardDescription>{link.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href={link.href}>Manage</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
