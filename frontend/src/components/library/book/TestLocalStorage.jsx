import React, { useEffect, useState } from "react";

function TestLocalStorage() {
  const [bookStates, setBookStates] = useState({});

  useEffect(() => {
    // Function to fetch localStorage data
    const fetchLocalStorageData = () => {
      if (typeof window !== "undefined") {
        const storedData = JSON.parse(localStorage.getItem("bookStates") || "{}");
        setBookStates(storedData);
      }
    };

    // Fetch data initially
    fetchLocalStorageData();

    // Set interval to check every 0.5 seconds
    const intervalId = setInterval(fetchLocalStorageData, 500);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-wrap">
      {Object.keys(bookStates).length > 0 ? (
        <pre className="text-xs bg-gray-100 p-2 rounded">
          {JSON.stringify(bookStates, null, 2)} {/* Pretty-print the object */}
        </pre>
      ) : (
        <p className="text-gray-500">No recently read books found.</p>
      )}
    </div>
  );
}

export default TestLocalStorage;
