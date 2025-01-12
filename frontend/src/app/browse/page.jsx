"use client";

import React from "react";
import BackgroundWrapper from "@/components/wrappers/BackgroundWrapper";
import { browsePageData } from "@/data/browsePageData";
import SearchInput from "@/components/library/browse/SearchInput";
import Filters from "@/components/library/browse/Filters";
import BrowseBooks from "@/components/library/browse/BrowseBooks";

function BrowsePage() {
  return (
    <BackgroundWrapper
      src={browsePageData.background}
      bgOpacity={60}
      backgroundAttachment={"fixed"}
      className="min-h-screen"
    >
      <div className="flex flex-col lg:flex-row min-h-screen p-2 gap-4">
        <div className="flex flex-col-reverse lg:flex-col gap-2 w-full lg:w-1/5 lg:border-r-2 lg:pr-4 lg:border-secondary dark:border-primary">
          <SearchInput/>
          <Filters/>
        </div>
        <BrowseBooks/>
      </div>

    </BackgroundWrapper>
  );
}

export default BrowsePage;
