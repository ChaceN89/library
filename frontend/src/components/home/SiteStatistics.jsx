/**
 * @file SiteStatistics.jsx
 * @module SiteStatistics
 * @description Component for displaying detailed site statistics in a user-friendly layout using reusable `StatBox` components.
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
   * @param {Array} [list] - Optional list of items to display.
   */
  const StatBox = ({ title, data, subtext, list = [] }) => (
    <div className="card-background p-2">
      <h4 className="text-lg font-semibold pb-1.5">{title}</h4>
      <div className="flex justify-between gap-2 items-center">
        {data && <h6 className="item-box"><span className="px-2">{data}</span></h6>}
        {subtext && <p>{subtext}</p>}
      </div>
      {list.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {list.map((item, index) => (
            <p
              key={index}
              className="item-box"
            >
              {item}
            </p>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <section className="pt-6">
      <h2 className="pb-2 text-2xl font-bold">Site Statistics</h2>
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
        <>
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
          </div>

          <div className="flex flex-col gap-6 mt-6">
            <StatBox
              title="Genres"
              list={Object.entries(siteStats.genres).map(
                ([genre, count]) => `${genre}: ${count} books`
              )}
            />
            <StatBox
              title="Books Per Language"
              list={siteStats.books_per_language.map(
                (lang) => `${lang.language}: ${lang.count} books`
              )}
            />
          </div>
        </>
      )}
    </section>
  );
}

export default SiteStatistics;
