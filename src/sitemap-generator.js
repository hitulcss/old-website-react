const { default: axios } = require("axios");

require("babel-register")({
  presets: ["es2015", "react"],
});

const router = require("./sitemap-routes").default;
const Sitemap = require("react-router-sitemap").default;

const getSiteMap = async () => {
  // setLoading(true)

  const config = {
    headers: {
      "content-type": "application/json",
      // Authorization: `Bearer ${authToken ? authToken : ''}`,
    },
  };

  axios
    .get(
      `https://backend-prod.sdcampus.com/api/v1/webContains/getSiteMap`,
      config
    )
    .then((res) => {
      generateSitemap(
        res.data.data.batchUrls,
        res.data.data.cateUrls,
        res.data.data.examsCateBlogUrls
      );
    })
    .catch((e) => console.log(e));
};

getSiteMap();

async function generateSitemap(batch, category, exams) {
  try {
    const batcheUrls = batch;
    const cateUrls = category;
    const examsCateBlogUrls = exams;
    const lastModifiedDate = "2024-01-31";
    const changeFrequency = "monthly";
    const priorityValue = "0.8";

    let courseCatMap = [];
    for (var i = 0; i < cateUrls.length; i++) {
      courseCatMap.push({
        slug: cateUrls[i],
        lastmod: lastModifiedDate,
        changefreq: changeFrequency,
        priority: priorityValue,
      });
    }

    let courseMap = [];
    for (var i = 0; i < batcheUrls.length; i++) {
      courseMap.push({
        categorySlug: batcheUrls[i].cat,
        batchSlug: batcheUrls[i].slug,
        lastmod: lastModifiedDate,
        changefreq: changeFrequency,
        priority: priorityValue,
      });
    }

    let examsCatMap = [];
    for (var i = 0; i < cateUrls.length; i++) {
      examsCatMap.push({
        categorySlug: cateUrls[i],
        lastmod: lastModifiedDate,
        changefreq: changeFrequency,
        priority: priorityValue,
      });
    }

    let examsCatPostMap = [];
    for (var i = 0; i < examsCateBlogUrls.length; i++) {
      examsCatPostMap.push({
        categorySlug: examsCateBlogUrls[i].cat,
        slug: examsCateBlogUrls[i].slug,
        lastmod: lastModifiedDate,
        changefreq: changeFrequency,
        priority: priorityValue,
      });
    }
    const paramsConfig = {
      "/:slug": courseCatMap,
      "/:categorySlug/:batchSlug": courseMap,
      "/:slug/view-all": courseCatMap,
      // "/exams/:categorySlug": examsCatMap,
      // "/exams/:categorySlug/:slug": examsCatPostMap
    };

    const sitemap = new Sitemap(router);
    await sitemap
      .applyParams(paramsConfig)
      .build("https://www.sdcampus.com")
      .save("./public/sitemap.xml", {
        lastmod: true,
        changefreq: true,
        priority: true,
      });

    console.log("Sitemap generated successfully!");
  } catch (e) {
    console.error("Error generating sitemap:", e);
  }
}
