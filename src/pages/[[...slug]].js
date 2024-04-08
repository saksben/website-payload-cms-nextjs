import RenderBlocks from "@/utils/RenderBlocks";
import React from "react";
import axios from "axios";

// For every page, it has the RenderBlocks component
export default function Page({ page }) {
  return (
    <div>
      <RenderBlocks layout={page.layout} />
    </div>
  );
}

// For every page, it will return the slug
export const getStaticPaths = async () => {
  const pageReq = await axios(`/api/pages?limit=100`);
  const pageData = pageReq.data;

  const returnObj = {
    paths: pageData.docs.map(({ slug, id }) => {
      return {
        params: { slug: slug !== "index" ? slug.split("/") : false },
      };
    }),
    fallback: false,
  };

  return returnObj;
};

// Fetches all page-specific data and renders it
export const getStaticProps = async (ctx) => {
  const slug = ctx.params?.slug || "index";

  // Fetch page
  const pageReq = await axios(`/api/pages?where[slug][equals]=${slug}`);
  let pageData = pageReq.data.docs[0];

  return {
    props: {
      page: pageData,
    },
  };
};
