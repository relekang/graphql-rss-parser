import isUrl from "is-url";
import type { Feed, Item } from "./types.js";

function transformItem(item: Item) {
	return Object.assign({}, item, {
		url: !item.url && isUrl(item.title || "") ? item.title || "" : item.url,
	});
}

const transformItems = (items: Item[]) => items.map(transformItem);

export default function transform<T extends Feed>(feed: T): T {
	return Object.assign({}, feed, {
		entries: transformItems(feed.items || []),
	});
}
