import { testGraphqlApi } from "./utils.js";

const websiteUrl = "https://rolflekang.com";
const url = "https://rolflekang.com/feed.xml";

testGraphqlApi`
  feed(url: "${url}") { title }
`;

testGraphqlApi`
  feed(url: "${url}") {
    title
    feed_url
    items {
      title
      url
      date_published
    }
  }
`;

testGraphqlApi`
  feed(url: "${url}", parser: FEEDPARSER) { title }
`;

testGraphqlApi`
  feed(url: "${url}", parser: RSS_PARSER) { title }
`;

testGraphqlApi`
  feed(url: "${url}", parser: FEEDME) { title }
`;

testGraphqlApi`
  feed(url: "${url}", parser: RSS_TO_JSON) { title }
`;

testGraphqlApi`
  feed(url: "https://rolflekang.com/feed.json", parser: JSON_FEED_V1) { title }
`;

testGraphqlApi`
  feed(url: "${url}") { title, badField }
`;

testGraphqlApi`
  feed(url: "https://rolflekang.com/testing-simple-graphql-services") { title }
`;

testGraphqlApi`
  feed(url: "https://non--------existing-domain.com") { title }
`;

testGraphqlApi`
  findFeed(url: "${websiteUrl}") {
    link
  }
`;

testGraphqlApi`
  feed(url: "${url}", startTime: "2020-01-01", endTime: "2020-10-31") {
    items { title }
  }
`;
