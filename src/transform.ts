import isUrl from 'is-url'
import { Feed, Item } from './types'

function transformItem(item: Item) {
  return Object.assign({}, item, {
    link: !item.link && isUrl(item.title || '') ? item.title : item.link,
  })
}

const transformEntries = (items: Item[]) => items.map(transformItem)

export default function transform<T extends Feed>(feed: T): T {
  return Object.assign({}, feed, {
    entries: transformEntries(feed.entries),
  })
}
