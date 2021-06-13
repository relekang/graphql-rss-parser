/* eslint-env jest */
import { parse } from '../rss-parser'
import request from '../../request'

test('should parse string from rolflekang.com/feed.xml', async () => {
  const fixture = await request('https://rolflekang.com/feed.xml')

  expect(await parse(fixture.text)).toMatchSnapshot()
})

test('should parse string from google.blogspot.com/feeds/posts/default', async () => {
  const fixture = await request('http://google.blogspot.com/feeds/posts/default')

  expect(await parse(fixture.text)).toMatchSnapshot()
})

test('should parse string with CET dates', () => {
  const feed = `
    <rss version="2.0">
      <channel>
      <title>Writing by Rolf Erik Lekang</title>
      <description>Writing by Rolf Erik Lekang</description>
      <link>https://rolflekang.com</link>
      <generator>GatsbyJS</generator>
      <lastBuildDate>Sat, 12 Sep 2020 14:51:45 GMT</lastBuildDate>
      <item>
        <title>Using Ansible handlers in loops</title>
        <description>
        Recently I have been dusting of my old ansible playbooks that I use to deploy personal stuff. Everything from side projects like feedhuddler…
        </description>
        <link>https://rolflekang.com/ansible-handlers-in-loops</link>
        <guid isPermaLink="false">https://rolflekang.com/ansible-handlers-in-loops</guid>
        <category>ansible</category>
        <category>devops</category>
        <category>ops</category>
        <category>infrastructure-as-code</category>
        <pubDate>Sat, 12 Sep 2020 00:00:00 CET</pubDate>
      </item>
      <item>
        <title>Using Ansible handlers in loops</title>
        <description>
        Recently I have been dusting of my old ansible playbooks that I use to deploy personal stuff. Everything from side projects like feedhuddler…
        </description>
        <link>https://rolflekang.com/ansible-handlers-in-loops</link>
        <guid isPermaLink="false">https://rolflekang.com/ansible-handlers-in-loops</guid>
        <category>ansible</category>
        <category>devops</category>
        <category>ops</category>
        <category>infrastructure-as-code</category>
        <pubDate>Sat, 12 Sep 2020 00:00:00 CEST</pubDate>
      </item>
    </channel>
  </rss>
  `
  expect(parse(feed)).toMatchSnapshot()
})
