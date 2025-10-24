"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus, Star, StarOff } from "lucide-react";
import {
  DataTable,
  type DataTableColumn,
  type DataTableAction,
} from "@/components/admin/data-table";
import {
  listNews,
  deleteNewsArticle,
  toggleFeaturedNews,
  type NewsData,
} from "@/lib/actions/news";
import { showSuccessToast, showErrorToast } from "@/lib/toast";

const NEWS_CATEGORIES = [
  "All Categories",
  "Events",
  "Announcements",
  "Success Stories",
  "Press Release",
  "Updates",
];

export default function NewsListPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<NewsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Load news articles
  const loadNews = async () => {
    setIsLoading(true);
    const result = await listNews({
      category:
        selectedCategory === "All Categories" ? undefined : selectedCategory,
    });

    if (result.success && result.data) {
      setArticles(result.data.articles);
    } else {
      showErrorToast(
        "Failed to load news",
        !result.success ? result.error : "Unknown error"
      );
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadNews();
  }, [selectedCategory]);

  // Handle delete
  const handleDeleteClick = (article: NewsData) => {
    setDeletingId(article.id!);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;

    const result = await deleteNewsArticle(deletingId);

    if (result.success) {
      showSuccessToast("Article deleted", "The news article has been removed");
      await loadNews();
    } else {
      showErrorToast(
        "Failed to delete article",
        !result.success ? result.error : "Unknown error"
      );
    }

    setDeleteDialogOpen(false);
    setDeletingId(null);
  };

  // Handle toggle featured
  const handleToggleFeatured = async (article: NewsData) => {
    const result = await toggleFeaturedNews(article.id!);

    if (result.success) {
      showSuccessToast(
        article.featured ? "Removed from featured" : "Added to featured",
        "Changes are now live on the homepage"
      );
      await loadNews();
    } else {
      showErrorToast(
        "Failed to update featured status",
        !result.success ? result.error : "Unknown error"
      );
    }
  };

  // Handle edit
  const handleEdit = (article: NewsData) => {
    router.push(`/admin/news/${article.id}/edit`);
  };

  // Define table columns
  const columns: DataTableColumn<NewsData>[] = [
    {
      key: "thumbnail",
      label: "Image",
      render: (article) => (
        <img
          src={article.thumbnail}
          alt={article.title}
          className="w-16 h-16 object-cover rounded"
        />
      ),
    },
    {
      key: "title",
      label: "Title",
      sortable: true,
      render: (article) => (
        <div className="max-w-md">
          <p className="font-medium line-clamp-2">{article.title}</p>
          <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
            {article.excerpt}
          </p>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      sortable: true,
      render: (article) => (
        <Badge variant="secondary">{article.category}</Badge>
      ),
    },
    {
      key: "publishedAt",
      label: "Published",
      sortable: true,
      render: (article) => {
        const date = new Date(article.publishedAt);
        return (
          <span className="text-sm">
            {date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        );
      },
    },
    {
      key: "featured",
      label: "Featured",
      render: (article) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleToggleFeatured(article)}
          className="h-8"
        >
          {article.featured ? (
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ) : (
            <StarOff className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      ),
    },
  ];

  // Define table actions
  const actions: DataTableAction<NewsData>[] = [
    {
      label: "Edit",
      onClick: handleEdit,
    },
    {
      label: "Delete",
      onClick: handleDeleteClick,
      variant: "destructive",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">News Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage news articles and announcements
          </p>
        </div>
        <Button onClick={() => router.push("/admin/news/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Add Article
        </Button>
      </div>

      <div className="mb-4">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {NEWS_CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DataTable
        data={articles}
        columns={columns}
        actions={actions}
        searchKey="title"
        searchPlaceholder="Search articles..."
        itemsPerPage={10}
        emptyMessage="No news articles found"
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this news article. This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
