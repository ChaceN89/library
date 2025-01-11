/**
 * @file SiteStatistics.jsx
 * @module SiteStatistics
 * @description Component for displaying detailed site statistics in a user-friendly layout.
 *
 * @author Chace Nielson
 * @created 2025-01-10
 * @updated 2025-01-10
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
      <h2 className='pb-2'>Site Statistics</h2>
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg mb-2">Loading site statistics...</p>
          <LoadingWheel className="h-16 w-16" />
        </div>
      ) : error ? (
        <ErrorLoading message="Failed to load site statistics. Please try again later." />
      ) : !siteStats ? (
        <ErrorLoading message="No site statistics available at the moment." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatBox title="Total Books" data={siteStats.total_books} />
          <StatBox title="Total Authors" data={siteStats.total_authors} />
          <StatBox title="Total Views" data={siteStats.total_views} />
          <StatBox title="Total Downloads" data={siteStats.total_downloads} />
          <StatBox
            title="Average Views Per Book"
            data={siteStats.average_views_per_book.toFixed(2)}
          />
          <StatBox
            title="Average Downloads Per Book"
            data={siteStats.average_downloads_per_book.toFixed(2)}
          />
          <StatBox
            title="Top Viewed Book"
            data={siteStats.top_viewed_book.title}
            subtext={`Views: ${siteStats.top_viewed_book.views}`}
          />
          <StatBox
            title="Top Downloaded Book"
            data={siteStats.top_downloaded_book.title}
            subtext={`Downloads: ${siteStats.top_downloaded_book.downloads}`}
          />
          <div className="bg-gray-100 p-4 rounded-lg shadow col-span-1 md:col-span-2 lg:col-span-3">
            <h4 className="text-lg font-semibold">Books Per Language</h4>
            <ul className="list-disc list-inside">
              {siteStats.books_per_language.map((lang) => (
                <li key={lang.language} className="text-sm">
                  {lang.language}: {lang.count} books
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow col-span-1 md:col-span-2 lg:col-span-3">
            <h4 className="text-lg font-semibold">Genres</h4>
            <ul className="list-disc list-inside">
              {Object.entries(siteStats.genres).map(([genre, count]) => (
                <li key={genre} className="text-sm">
                  {genre}: {count} books
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}

export default SiteStatistics;
