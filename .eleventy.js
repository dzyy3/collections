module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("assets");

  // create a variable for our dev environment; production = gh-pages, nothing = local by default
  const isProduction = process.env.ELEVENTY_ENV === "production";

  // Global variable for our path prefix, remember to insert your repo name
  eleventyConfig.addGlobalData("pathPrefix", isProduction ? "/collections/" : "/");

  // create a filter for our url prefix 
  eleventyConfig.addFilter("prefixedUrl", (url, prefix) => {
    const finalPrefix = prefix || (isProduction ? "/collections/" : "/");
    return finalPrefix + url.replace(/^\/+/, "");
   });

  //to shorten the post conent summary {{ content | truncate }}
  eleventyConfig.addFilter("truncate", (str, len = 100) =>{
    return str.length > len ? str.substring(0, len) + '...' : str;
  });

	//tells eleventy to output to docs instead of _site
  return {
    dir: { input: ".", output: "docs" },
    htmlTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md"]
  };
};
