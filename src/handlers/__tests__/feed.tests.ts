/* eslint-env jest */
import { parseFromQuery } from '../feed';

test('feed should filter based on both startTime and endTime', async () => {
  const feeds = await parseFromQuery({
    url: 'https://rolflekang.com/feed.xml',
    startTime: '2019-11-14',
    endTime: '2020-09-12',
  });

  expect(feeds.items?.map((item) => item.title)).toEqual([
    'Using Ansible handlers in loops',
    'Serving text/plain for curl with Next',
    'Wireless uplinks with Unifi',
    'Using git commits instead of git stash',
  ]);
});

test('feed should filter based on startTime', async () => {
  const feeds = await parseFromQuery({
    url: 'https://rolflekang.com/feed.xml',
    startTime: '2019-11-14',
  });

  expect(feeds.items?.map((item) => item.title)).toEqual([
    'Using certbot with Ansible',
    'Using Ansible handlers in loops',
    'Serving text/plain for curl with Next',
    'Wireless uplinks with Unifi',
    'Using git commits instead of git stash',
  ]);
});

test('feed should filter based on both endTime', async () => {
  const feeds = await parseFromQuery({
    url: 'https://rolflekang.com/feed.xml',
    endTime: '2012-11-14',
  });

  expect(feeds.items?.map((item) => item.title)).toEqual([
    'django-nopassword',
    'The Github lamp',
  ]);
});
