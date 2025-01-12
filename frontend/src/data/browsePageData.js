import { IMAGE_PREFIX } from "@/globals";

export const browsePageData={
  
  title: "Discover Your Next Great Read",
  subTitle: "Explore a world of stories, knowledge, and inspiration in our user-driven library. Discover and search through everything our community has uploaded, and find books that match your interests.",
  background: `${IMAGE_PREFIX}/frontendAssets/whiteGeoMetric2.png`,

  pageNumOption:[
    10,
    20,
    30,
    40,
    50
  ],


  sortOptions:{
    most_recent: "Most Recent",
    least_recent: "Least Recent",
    most_viewed: "Most Viewed",
    least_viewed: "Least Viewed",
    most_downloaded: "Most Downloaded",
    least_downloaded: "Least Downloaded",
    title_asc: "Title (A-Z)",
    title_desc: "Title (Z-A)",
  }
}
