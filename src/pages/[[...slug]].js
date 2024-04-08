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

export const getStaticPaths = async () => {
    const pageReq = await axios(`/api/pages?limit=100`);
    const pageData = pageReq.data;

    const pagesToSave = pageData.docs


    // const templateReq = await axios(`/api/pageTemplates?limit=100`);
    // const pageTemplates = templateReq.data.docs;

    // for (const template of pageTemplates) {
    //     // fetch data from template collection
    //     const templateCollectionReq = await axios(`/api/${template.templateCollection}?limit=100`);
    //     const templateCollectionData = templateCollectionReq.data.docs;


    //     for (const item of templateCollectionData) {

    //         const populatedLayout = template.layout.map((layoutBlock) => {
    //             if (layoutBlock.blockType) { }

    //             // Replace placeholders (<%= ... %>) in layout
    //             let layoutString = JSON.stringify(layoutBlock);
    //             // Parse EJS Placeholders
    //             const regex = /<%=(.*?)%>/g;
    //             const matches = layoutString.match(regex);
    //             if (matches) {
    //                 for (const match of matches) {
    //                     const key = match.replace('<%=', '').replace('%>', '').trim();
    //                     const value = item[key];

    //                     // If it's a rich Text, replace the entire field
    //                     if (value?.root?.children?.length) {
    //                         layoutBlock[key] = value;
    //                         return layoutBlock;
    //                     } else {
    //                         // Else just replace the specific parts
    //                         layoutString = layoutString.replace(match, value);
    //                     }
    //                 }
    //             }
    //             return (JSON.parse(layoutString));
    //         })

    //         pagesToSave.push({
    //             ...item,
    //             slug: `${template.slug}/${item.slug}`,
    //             layout: populatedLayout
    //         })
    //     }
    // }

    // const fs = await import('fs');
    // fs.writeFileSync('./src/pages.json', JSON.stringify(pagesToSave, null, 2));


    const returnObj = {
        paths: pagesToSave.map((page) => ({
            params: {
                slug: page.slug === 'index' ? [] : page.slug.split('/'),
            },
        })),
        fallback: false,
    };

    return returnObj;
};

export const getStaticProps = async (ctx) => {
    const slug = ctx.params?.slug || ['index'];

    // const fs = await import('fs');
    // const pages = JSON.parse(fs.readFileSync('./src/pages.json', 'utf8'));
    // const pageData = pages.find((page) => page.slug === slug.join('/'));

    const pagesRes = await axios(`/api/pages?where[slug][equals]=${slug}`)
    const pagesData = pagesRes.data;

    return {
        props: {
            // page: pageData,
            page: pagesData.docs[0],
        },
        // revalidate: 10, // Incremental static regeneration
    };

};