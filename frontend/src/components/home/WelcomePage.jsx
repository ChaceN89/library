"use client"
import React, { useEffect, useState } from 'react';
import { fetchMostViewedBooks, fetchMostRecentBooks, fetchSiteStatistics } from '@/API/homePageAPI';
import BookCard from '../library/book/BookCard'; // Ensure the path to BookCard is correct
import { toast } from 'react-hot-toast';

function WelcomePage() {
  const [mostViewedBooks, setMostViewedBooks] = useState([]);
  const [mostRecentBooks, setMostRecentBooks] = useState([]);
  const [siteStats, setSiteStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomePageData = async () => {
      try {
        // Fetch most viewed books
        const viewedBooks = await fetchMostViewedBooks(3);
        setMostViewedBooks(viewedBooks.results);

        // Fetch most recent books
        const recentBooks = await fetchMostRecentBooks(3);
        setMostRecentBooks(recentBooks.results);

        // Fetch site statistics
        const statistics = await fetchSiteStatistics();
        setSiteStats(statistics);
      } catch (error) {
        toast.error('Failed to load data');
        console.error('Error loading homepage data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHomePageData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Library</h1>

      <p className="text-lg mb-8">
        Our mission is to make books accessible to everyone, offering a rich library experience where you can explore, read, and save your favorites. Whether you're discovering new genres or revisiting timeless classics, PageFlow Library is here to fuel your passion for reading. Sign up today to create an account, browse our growing collection, and manage your personal library with features like favorites and recommendations. Begin your reading journey now!
      </p>
      
      {/* Most Viewed Books Section */}
      <section>
        <h2 className="text-xl font-bold mb-2">Top 3 Most Viewed Books</h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mostViewedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </ul>
      </section>

      {/* Most Recent Books Section */}
      <section className="mt-8">
        <h2 className="text-xl font-bold mb-2">Top 3 Most Recent Books</h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mostRecentBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </ul>
      </section>

      {/* Site Statistics Section */}
      <section className="mt-8">
        <h2 className="text-xl font-bold mb-2">Site Statistics</h2>
        <pre className="bg-gray-100 p-4 rounded-lg">
          {JSON.stringify(siteStats, null, 2)}
        </pre>
      </section>
    </div>
  );
}

export default WelcomePage;
