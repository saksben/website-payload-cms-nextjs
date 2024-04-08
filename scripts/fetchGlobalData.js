const { default: axios } = require("axios");
const fs = require("fs");
require("dotenv").config();
const { loadEnvConfig } = require("@next/env");

loadEnvConfig(process.cwd());

async function fetchGlobalData() {
  try {
    console.log("running initial fetch");
    const [header, footer, blogPosts] = await Promise.all([
      axios(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/globals/header`).then(
        (res) => res?.data
      ),
      axios(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/globals/footer`).then(
        (res) => res?.data
      ),
      axios(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogPosts?limit=3`
      ).then((res) => {
        return res.data.docs.map((blogPost) => {
          return {
            title: blogPost.title,
            slug: blogPost.slug,
            body: blogPost.body,
          };
        });
      }),
    ]);
    const globalData = {
      header,
      footer,
      blogPosts,
    };
    // Write the data to a file
    for (const [key, value] of Object.entries(globalData)) {
      if (value) {
        const jsonValue = JSON.stringify(value, null, 2);
        fs.writeFileSync(`src/globalData/${key}.json`, jsonValue);
      }
    }
  } catch (error) {
    console.error("Error fetching global data:", error);
    process.exit(1); //Exit with an error code
  }
}

fetchGlobalData();
