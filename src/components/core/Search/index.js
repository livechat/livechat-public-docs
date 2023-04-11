import { DocSearch } from "@docsearch/react";
import { EXCLUDED_SEARCH_RESULTS, UNCLEAR_SEARCH_MATCHES } from "constant";

const baseUrl = process.env.CONTEXT === "deploy-preview" ? "" : "/docs";

const transformHits = (hits) => {
  const updatedHits = hits
    .filter(
      (hit) => !EXCLUDED_SEARCH_RESULTS.some((slug) => hit.url.includes(slug))
    )
    .map((hit) => {
      let content = null;
      UNCLEAR_SEARCH_MATCHES.forEach((item) => {
        const result = hit.url.match(item.regex);

        if (Array.isArray(result) && result.length > 0) {
          content = item.content;
        }
      });

      const url = hit.url.replace(
        "https://developers.livechat.com/docs",
        baseUrl
      );

      if (content)
        return {
          ...hit,
          content: content,
          url,
        };

      return {
        ...hit,
        url,
      };
    });

  return updatedHits;
};

const Search = () => (
  <DocSearch
    apiKey={process.env.NEXT_PUBLIC_ALGOLIA_API_KEY}
    appId={process.env.NEXT_PUBLIC_ALGOLIA_APP_ID}
    indexName={"livechatinc"}
    searchParameters={{ hitsPerPage: 7 }}
    transformItems={transformHits}
  />
);

export default Search;
