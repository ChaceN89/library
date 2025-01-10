/**
 * @file SiteStatistics.jsx
 * @module SiteStatistics
 * @description Component for displaying detailed site statistics in a user-friendly layout.
 *
 * @author Chace Nielson
 * @created 2025-01-08
 * @updated 2025-01-08
 */

"use client";
import React, { useEffect, useState } from "react";
import { fetchSiteStatistics } from "@/API/homePageAPI";
import { toast } from "react-hot-toast";
import LoadingWheel from "@/components/loading/LoadingWheel";
import ErrorLoading from "@/components/loading/ErrorLoading";

function SiteStatistics() {
  const [siteStats, setSiteStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch function
  const loadStatistics = async () => {
    try {
      const statistics = await fetchSiteStatistics();
      setSiteStats(statistics);
    } catch (error) {
      setError(true);
      toast.error("Failed to load site statistics");
      console.error("Error fetching site statistics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatistics();
  }, []);

  if (loading) {
    return <LoadingWheel className="h-32" />;
  }

  if (error) {
    return (
      <ErrorLoading message="Failed to load site statistics. Please try again later." />
    );
  }

  if (!siteStats) {
    return (
      <ErrorLoading message="No site statistics available at the moment." />
    );
  }

  // Separate the data for easier use
  const {
    total_books,
    total_authors,
    total_views,
    total_downloads,
    genres,
    books_per_language,
    average_views_per_book,
    average_downloads_per_book,
    top_viewed_book,
    top_downloaded_book,
  } = siteStats;

  /**
   * Reusable Statistics Box Component
   * @param {string} title - The title of the statistic.
   * @param {string|number} data - The statistic value to display.
   * @param {string} [subtext] - Optional subtext or additional information.
   */
  const StatBox = ({ title, data, subtext }) => (
    <div className="bg-gray-100 p-4 rounded-lg shadow">
      <h4 className="">{title}</h4>
      <p className="text-xl font-bold">"{data}"</p>
      {subtext && <p className="text-sm">{subtext}</p>}
    </div>
  );

  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-4">Site Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatBox title="Total Books" data={total_books} />
        <StatBox title="Total Authors" data={total_authors} />
        <StatBox title="Total Views" data={total_views} />
        <StatBox title="Total Downloads" data={total_downloads} />
        <StatBox
          title="Average Views Per Book"
          data={average_views_per_book.toFixed(2)}
        />
        <StatBox
          title="Average Downloads Per Book"
          data={average_downloads_per_book.toFixed(2)}
        />
        <StatBox
          title="Top Viewed Book"
          data={top_viewed_book.title}
          subtext={`Views: ${top_viewed_book.views}`}
        />
        <StatBox
          title="Top Downloaded Book"
          data={top_downloaded_book.title}
          subtext={`Downloads: ${top_downloaded_book.downloads}`}
        />
        <div className="bg-gray-100 p-4 rounded-lg shadow col-span-1 md:col-span-2 lg:col-span-3">
          <h3 className="text-lg font-semibold">Books Per Language</h3>
          <ul className="list-disc list-inside">
            {books_per_language.map((lang) => (
              <li key={lang.language} className="text-sm">
                {lang.language}: {lang.count} books
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow col-span-1 md:col-span-2 lg:col-span-3">
          <h3 className="text-lg font-semibold">Genres</h3>
          <ul className="list-disc list-inside">
            {Object.entries(genres).map(([genre, count]) => (
              <li key={genre} className="text-sm">
                {genre}: {count} books
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default SiteStatistics;
