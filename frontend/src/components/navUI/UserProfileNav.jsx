import React from "react";
import Link from "next/link"; // Import Link for navigation
import Image from "next/image";
import { navData } from "@/data/navData";

const UserProfileNav = ({ username, profilePic }) => {
  // Max length a username can be displayed
  const maxLen = 30;
  const truncatedUsername =
    username.length > maxLen ? `${username.substring(0, maxLen - 3)}...` : username;

  return (
    <Link href="/settings" className="hover:underline">
      <div className="flex items-center gap-2">
        <div className="relative w-10 h-10">
          <Image
            src={profilePic || navData.defaultImg}
            alt="Profile"
            fill
            sizes="(max-width: 768px) 40px, (max-width: 1200px) 48px, 64px"
            className="rounded-full object-cover"
          />
        </div>
        <span className="break-words hyphens-auto max-w-40 lg:max-w-56 xl:max-w-72">
          {truncatedUsername}
        </span>
      </div>
    </Link>
  );
};

export default UserProfileNav;
