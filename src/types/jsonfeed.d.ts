declare namespace JsonFeed {
  declare type Feed = JsonFeedV1.Feed | JsonFeedV1_1.Feed;
  declare type Item = JsonFeedV1.Item | JsonFeedV1_1.Item;
  declare type Hub = JsonFeedV1.Hub | JsonFeedV1_1.Hub;
  declare type Author = JsonFeedV1.Author | JsonFeedV1_1.Author;
}

declare namespace JsonFeedV1 {
  declare interface Feed {
    version: 'https://jsonfeed.org/version/1';
    title: string;
    home_page_url?: string;
    feed_url?: string;
    description?: string;
    user_comment?: string;
    next_url?: string;
    icon?: string;
    favicon?: string;
    author?: Author;
    language?: Language;
    expired?: boolean;
    hubs?: Hub[];
    items?: Item[];
  }

  declare interface Item {
    id: string;
    url?: string;
    title?: string;
    external_url?: string;
    content_html?: string;
    content_text?: string;
    summary?: string;
    image?: string;
    banner_image?: string;
    date_published?: string;
    date_modified?: string;
    author?: Author;
    tags: string[];
    language: Language;
  }

  declare type Language = string;

  declare interface Author {
    name?: string;
    url?: string;
    avatar?: string;
  }

  declare interface Hub {
    type: string;
    url: string;
  }
}

declare namespace JsonFeedV1_1 {
  declare interface Feed {
    version: 'https://jsonfeed.org/version/1.1';
    title: string;
    home_page_url?: string;
    feed_url?: string;
    description?: string;
    user_comment?: string;
    next_url?: string;
    icon?: string;
    favicon?: string;
    authors?: Author[];
    expired?: boolean;
    hubs?: Hub[];
    items?: Item[];
  }

  declare interface Item {
    id: string;
    url?: string;
    title?: string;
    external_url?: string;
    content_html?: string;
    content_text?: string;
    summary?: string;
    image?: string;
    banner_image?: string;
    date_published?: string;
    date_modified?: string;
    authors?: Author[];
    tags: string[];
  }

  declare interface Author {
    name?: string;
    url?: string;
    avatar?: string;
  }

  declare interface Hub {
    type: string;
    url: string;
  }
}
