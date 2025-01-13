import { navData } from "@/data/navData";
import React from "react";


function BookOwner({ owner_profile_pic = navData.defaultImg, owner_username = "Unknown Owner" }) {

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
