/**
 * Data Table Component - Usage Examples
 * 
 * This file demonstrates how to use the DataTable component
 * for different content types in the admin dashboard.
 */

import { DataTable, DataTableColumn, DataTableAction } from "./data-table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

// Example 1: News Articles Table
interface NewsArticle {
  id: string
  title: string
  category: string
  featured: boolean
  publishedAt: Date
}

export function NewsTableExample() {
  const newsData: NewsArticle[] = [
    {
      id: "1",
      title: "Sample News Article",
      category: "Events",
      featured: true,
      publishedAt: new Date(),
    },
  ]

  const newsColumns: DataTableColumn<NewsArticle>[] = [
    {
      key: "title",
      label: "Title",
      sortable: true,
    },
    {
      key: "category",
      label: "Category",
      sortable: true,
      render: (item) => (
        <Badge variant="outline">{item.category}</Badge>
      ),
    },
    {
      key: "featured",
      label: "Featured",
      render: (item) => (
        <Badge variant={item.featured ? "default" : "secondary"}>
          {item.featured ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      key: "publishedAt",
      label: "Published",
      sortable: true,
      render: (item) => format(item.publishedAt, "MMM dd, yyyy"),
    },
  ]

  const newsActions: DataTableAction<NewsArticle>[] = [
    {
      label: "Edit",
      onClick: (item) => {
        console.log("Edit", item.id)
        // Navigate to edit page
      },
    },
    {
      label: "Delete",
      onClick: (item) => {
        console.log("Delete", item.id)
        // Show delete confirmation
      },
      variant: "destructive",
    },
  ]

  return (
    <DataTable
      data={newsData}
      columns={newsColumns}
      actions={newsActions}
      searchKey="title"
      searchPlaceholder="Search news articles..."
      itemsPerPage={10}
      emptyMessage="No news articles found"
    />
  )
}

// Example 2: Team Members Table
interface TeamMember {
  id: string
  name: string
  role: string
  email: string
  order: number
}

export function TeamTableExample() {
  const teamData: TeamMember[] = [
    {
      id: "1",
      name: "John Doe",
      role: "Director",
      email: "john@example.com",
      order: 1,
    },
  ]

  const teamColumns: DataTableColumn<TeamMember>[] = [
    {
      key: "name",
      label: "Name",
      sortable: true,
    },
    {
      key: "role",
      label: "Role",
      sortable: true,
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "order",
      label: "Order",
      sortable: true,
    },
  ]

  const teamActions: DataTableAction<TeamMember>[] = [
    {
      label: "Edit",
      onClick: (item) => {
        console.log("Edit", item.id)
      },
    },
    {
      label: "Delete",
      onClick: (item) => {
        console.log("Delete", item.id)
      },
      variant: "destructive",
    },
  ]

  return (
    <DataTable
      data={teamData}
      columns={teamColumns}
      actions={teamActions}
      searchKey="name"
      searchPlaceholder="Search team members..."
      itemsPerPage={10}
    />
  )
}

// Example 3: Partners Table
interface Partner {
  id: string
  name: string
  website: string | null
  order: number
}

export function PartnersTableExample() {
  const partnersData: Partner[] = [
    {
      id: "1",
      name: "Partner Organization",
      website: "https://example.com",
      order: 1,
    },
  ]

  const partnersColumns: DataTableColumn<Partner>[] = [
    {
      key: "name",
      label: "Name",
      sortable: true,
    },
    {
      key: "website",
      label: "Website",
      render: (item) =>
        item.website ? (
          <a
            href={item.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {item.website}
          </a>
        ) : (
          <span className="text-muted-foreground">—</span>
        ),
    },
    {
      key: "order",
      label: "Order",
      sortable: true,
    },
  ]

  const partnersActions: DataTableAction<Partner>[] = [
    {
      label: "Edit",
      onClick: (item) => {
        console.log("Edit", item.id)
      },
    },
    {
      label: "Delete",
      onClick: (item) => {
        console.log("Delete", item.id)
      },
      variant: "destructive",
    },
  ]

  return (
    <DataTable
      data={partnersData}
      columns={partnersColumns}
      actions={partnersActions}
      searchKey="name"
      searchPlaceholder="Search partners..."
      itemsPerPage={10}
    />
  )
}

// Example 4: Statistics Table
interface Statistic {
  id: string
  label: string
  value: number
  suffix: string | null
  icon: string
  order: number
}

export function StatisticsTableExample() {
  const statsData: Statistic[] = [
    {
      id: "1",
      label: "Active Projects",
      value: 150,
      suffix: "+",
      icon: "briefcase",
      order: 1,
    },
  ]

  const statsColumns: DataTableColumn<Statistic>[] = [
    {
      key: "label",
      label: "Label",
      sortable: true,
    },
    {
      key: "value",
      label: "Value",
      sortable: true,
      render: (item) => (
        <span className="font-semibold">
          {item.value}
          {item.suffix}
        </span>
      ),
    },
    {
      key: "icon",
      label: "Icon",
    },
    {
      key: "order",
      label: "Order",
      sortable: true,
    },
  ]

  const statsActions: DataTableAction<Statistic>[] = [
    {
      label: "Edit",
      onClick: (item) => {
        console.log("Edit", item.id)
      },
    },
    {
      label: "Delete",
      onClick: (item) => {
        console.log("Delete", item.id)
      },
      variant: "destructive",
    },
  ]

  return (
    <DataTable
      data={statsData}
      columns={statsColumns}
      actions={statsActions}
      searchKey="label"
      searchPlaceholder="Search statistics..."
      itemsPerPage={10}
    />
  )
}
