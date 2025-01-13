import { navData } from "@/data/navData";
import React from "react";

function BookOwner({ book }) {
  // Destructure with defaults to handle missing or null properties
  const {
    owner_profile_pic = navData.defaultImg, // Fallback to a default image
    owner_username = "Unknown Owner", // Fallback to a default username
  } = book || {}; // Use an empty object if `book` is null

  return (
    <div className="flex items-center gap-1">
      <img
        src={owner_profile_pic}
        alt={`Profile picture of ${owner_username}`}
        width={45}
        height={45}
        className="rounded-full border border-gray-300"
      />
      <h5 className="text-gray-600"> {owner_username}</h5>
    </div>
  );
}

export default BookOwner;
