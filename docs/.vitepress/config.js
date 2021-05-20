const docs = [
  {
    text: "Say hello to Lemon",
    children: [{ text: "Why Lemon?", link: "/" }],
  },
  {
    text: "Getting Started",
    children: [
      {
        text: "Your First Project",
        link: "/getting-started/your-first-project",
      },
      {
        text: "Going Deeper",
        link: "/getting-started/going-deeper",
      },
    ],
  },
];

module.exports = {
  title: "Lemon",
  description: "A dead simple PHP framework",
  base: "/",
  lang: "en-US",
  themeConfig: {
    algolia: {
      ...require("../../algolia.json"),
      searchParameters: {
        facetFilters: ["tags:guide,api"],
      },
    },
    sidebar: {
      "/": docs,
      "/getting-started": docs,
    },
  },
  repo: "lemon-framework/lemon",
  docsRepo: "lemon-framework/lemon-framework.github.io",
  docsDir: ".",
  docsBranch: "master",
  editLinks: true,
};
