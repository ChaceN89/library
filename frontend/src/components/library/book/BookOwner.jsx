/**
 * @file BookOwner.jsx
 * @module BookOwner
 * @description
 * Displays the profile picture and username of the book's owner. 
 * If the loading state is active, the component does not render.
 *
 * @param {boolean} loading - Whether the component is in a loading state.
 * @param {string} owner_profile_pic - URL of the owner's profile picture (default provided by navData).
 * @param {string} owner_username - Username of the owner (default: "Unknown Owner").
 *
 * @example
 * <BookOwner 
 *   loading={false} 
 *   owner_profile_pic="https://example.com/profile.jpg" 
 *   owner_username="John Doe" 
 * />
 *
 * @requires React
 * @requires next/image - Used for rendering optimized images.
 * @requires @/data/navData - Provides the default profile image.
 *
 * @exports BookOwner
 *
 * @author Chace Nielson
 * @created 2025-01-13
 * @updated 2025-01-13
 */

import React from "react";
import Image from "next/image";
import { navData } from "@/data/navData";

function BookOwner({
  loading,
  owner_profile_pic = navData.defaultImg,
  owner_username = "Unknown Owner",
}) {
  // If loading, do not render the component
  if (loading) {
    return null;
  }

  return (
    <div className="flex items-center gap-1.5">
      {/* Owner profile picture */}
      <Image
        src={owner_profile_pic}
        alt={`Profile picture of ${owner_username}`}
        width={45}
        height={45}
        className="rounded-full border border-gray-300"
      />

      {/* Owner username */}
      <h5 className="text-gray-600">{owner_username}</h5>
    </div>
  );
}

export default BookOwner;
