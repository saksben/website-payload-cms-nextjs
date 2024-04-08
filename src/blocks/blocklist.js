import Hero from "./Hero";
import RecentBlogPosts from "./RecentBlogPosts";
import SimpleRichText from "./SimpleRichText";
import TwoColumns from "./TwoColumns";

// Maps the slugs of backend blocks to frontend blocks
export const blocks = {
    hero: Hero,
    twoColumn: TwoColumns,
    simpleRichText: SimpleRichText,
    recentBlogPosts: RecentBlogPosts,
}