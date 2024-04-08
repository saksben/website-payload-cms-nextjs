import RichTextParser from '@/utils/RichTextParser'
import React from 'react'
import axios from 'axios';

export default function blogPost({blogPost: {title, body}}) {
  return (
    <div className='py-10 px-6'>
        <h1>{title}</h1>
        <RichTextParser content={body} />
    </div>
  )
}

// Fetch all blog posts to api, maps those posts to slugs
export const getStaticPaths = async () => {
    const listingsReq = await axios(`/api/blogPosts?limit=1000`);
    const listingData = listingsReq.data;


    const returnObj = {
        paths: listingData.docs.map(({ slug }) => {
            return {
                params: { slug: [slug] },
            };
        }),
        fallback: false,
    };

    return returnObj;
};

// Takes a slug and gets that post's data to render
export const getStaticProps = async (ctx) => {
    const slug = ctx.params?.slug;

    const listingsRes = await axios(`/api/blogPosts?where[slug][equals]=${slug}`);
    const listingData = listingsRes.data;

    return {
        props: {
            blogPost: listingData.docs[0],
        },
    };
};