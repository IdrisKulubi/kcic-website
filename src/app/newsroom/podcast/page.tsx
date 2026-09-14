"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, PlayCircle } from "@phosphor-icons/react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  podcastEpisodes,
  YOUTUBE_PODCAST_PLAYLIST_URL,
} from "@/data/podcasts";

function toEmbedUrl(youtubeUrl: string) {
  try {
    const url = new URL(youtubeUrl);
    const videoId =
      url.searchParams.get("v") || url.pathname.split("/").filter(Boolean)[0];
    return videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
      : null;
  } catch {
    return null;
  }
}

function thumbnailUrl(youtubeUrl: string) {
  try {
    const url = new URL(youtubeUrl);
    const videoId =
      url.searchParams.get("v") || url.pathname.split("/").filter(Boolean)[0];
    return videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null;
  } catch {
    return null;
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function PodcastPage() {
  const [activeEpisodeId, setActiveEpisodeId] = useState<string | null>(null);

  const latestEpisode = podcastEpisodes[0];
  const otherEpisodes = podcastEpisodes.slice(1);
  const latestThumbnail = thumbnailUrl(latestEpisode.youtubeUrl);

  const activeEpisode = useMemo(
    () => podcastEpisodes.find((episode) => episode.id === activeEpisodeId) ?? null,
    [activeEpisodeId]
  );
  const activeEmbed = activeEpisode ? toEmbedUrl(activeEpisode.youtubeUrl) : null;

  return (
    <PageLayout
      title="Podcast"
      subtitle="Sustainably Speaking Africa"
      description="Conversations with climate entrepreneurs, funders, and practitioners across Africa, produced by KCIC."
      breadcrumb={[
        { label: "Newsroom", href: "/newsroom" },
        { label: "Podcast" },
      ]}
    >
      <div className="mx-auto max-w-5xl space-y-10">
        <button
          type="button"
          onClick={() => setActiveEpisodeId(latestEpisode.id)}
          className="group block w-full text-left"
          aria-label={`Play latest episode: ${latestEpisode.title}`}
        >
          <div className="overflow-hidden border border-[#d6e1d8] bg-white">
            <div className="relative aspect-[16/9] bg-black">
              {latestThumbnail ? (
                <img
                  src={latestThumbnail}
                  alt={latestEpisode.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              ) : null}
              <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                <span className="inline-flex h-16 w-16 items-center justify-center border border-white/30 bg-white/20 text-white">
                  <PlayCircle className="h-9 w-9" weight="fill" />
                </span>
              </div>
            </div>
            <div className="p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#3c7f1c]">
                Latest episode · {formatDate(latestEpisode.publishedAt)}
              </p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900 sm:text-2xl">
                {latestEpisode.title}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                {latestEpisode.excerpt}
              </p>
            </div>
          </div>
        </button>

        <div>
          <div className="mb-4 flex items-end justify-between gap-4">
            <h3 className="text-lg font-semibold text-slate-900">
              More episodes
            </h3>
            <Link
              href={YOUTUBE_PODCAST_PLAYLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#3c7f1c] underline-offset-4 hover:underline"
            >
              Watch on YouTube
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="divide-y divide-[#d6e1d8] border-y border-[#d6e1d8]">
            {otherEpisodes.map((episode) => (
              <button
                key={episode.id}
                type="button"
                onClick={() => setActiveEpisodeId(episode.id)}
                className="flex w-full items-start justify-between gap-4 py-4 text-left transition hover:bg-[#f7fbf8]"
              >
                <span className="min-w-0">
                  <span className="block font-medium leading-6 text-slate-900">
                    {episode.title}
                  </span>
                  <span className="mt-1 block text-sm text-slate-500">
                    {formatDate(episode.publishedAt)}
                  </span>
                </span>
                <PlayCircle
                  className="mt-1 h-5 w-5 shrink-0 text-[#80c738]"
                  weight="fill"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <Dialog
        open={Boolean(activeEpisode)}
        onOpenChange={(open) => !open && setActiveEpisodeId(null)}
      >
        <DialogContent className="overflow-hidden p-0 sm:max-w-4xl" showCloseButton>
          <DialogTitle className="sr-only">Podcast Player</DialogTitle>
          <div className="bg-black">
            {activeEmbed ? (
              <div className="relative w-full pt-[56.25%]">
                <iframe
                  title={activeEpisode?.title || "Podcast"}
                  src={activeEmbed}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : null}
          </div>
          <div className="bg-white px-4 pb-4 pt-3">
            <p className="line-clamp-2 text-sm font-medium text-gray-900">
              {activeEpisode?.title}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}
