# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.5.2"></a>
## [1.5.2](https://github.com/relekang/micro-rss-parser/compare/v1.5.1...v1.5.2) (2017-11-17)


### Bug Fixes

* Filter out crashed findfeed results ([9113c2b](https://github.com/relekang/micro-rss-parser/commit/9113c2b))



<a name="1.5.1"></a>
## [1.5.1](https://github.com/relekang/micro-rss-parser/compare/v1.5.0...v1.5.1) (2017-11-16)


### Bug Fixes

* Add support for feeds with content-type text/xml ([f4c5a1d](https://github.com/relekang/micro-rss-parser/commit/f4c5a1d))
* Add title to the case when same url is returned ([a7b89e0](https://github.com/relekang/micro-rss-parser/commit/a7b89e0))



<a name="1.5.0"></a>
# [1.5.0](https://github.com/relekang/micro-rss-parser/compare/v1.4.1...v1.5.0) (2017-11-08)


### Bug Fixes

* Add readme in fixture folder ([8865767](https://github.com/relekang/micro-rss-parser/commit/8865767))
* Upgrade micro ([119721f](https://github.com/relekang/micro-rss-parser/commit/119721f))
* Upgrade superagent ([083be46](https://github.com/relekang/micro-rss-parser/commit/083be46))


### Features

* Add title to findFeed result ([047c8fc](https://github.com/relekang/micro-rss-parser/commit/047c8fc))



<a name="1.4.1"></a>
## [1.4.1](https://github.com/relekang/micro-rss-parser/compare/v1.4.0...v1.4.1) (2017-11-01)


### Bug Fixes

* Make normalize urls to not remove trailing slash ([315f7eb](https://github.com/relekang/micro-rss-parser/commit/315f7eb))



<a name="1.4.0"></a>
# [1.4.0](https://github.com/relekang/micro-rss-parser/compare/v1.3.2...v1.4.0) (2017-11-01)


### Features

* Support feeds in findfeed ([4624bdc](https://github.com/relekang/micro-rss-parser/commit/4624bdc))



<a name="1.3.2"></a>
## [1.3.2](https://github.com/relekang/micro-rss-parser/compare/v1.3.1...v1.3.2) (2017-10-29)


### Bug Fixes

* Add Dockerfile ([b210512](https://github.com/relekang/micro-rss-parser/commit/b210512))
* Throw ConnectionFailedError on ENOTFOUND error ([1ab1d81](https://github.com/relekang/micro-rss-parser/commit/1ab1d81))
* Ugprade feedme ([df0b39b](https://github.com/relekang/micro-rss-parser/commit/df0b39b))
* Upgrade rss-parser ([67e4fbc](https://github.com/relekang/micro-rss-parser/commit/67e4fbc))
* Upgrade superagent ([fa8b977](https://github.com/relekang/micro-rss-parser/commit/fa8b977))



<a name="1.3.1"></a>
## [1.3.1](https://github.com/relekang/micro-rss-parser/compare/v1.3.0...v1.3.1) (2017-10-15)


### Bug Fixes

* Upgrade grahpql dependencies ([8fa3154](https://github.com/relekang/micro-rss-parser/commit/8fa3154))
* Upgrade micro ([f018a12](https://github.com/relekang/micro-rss-parser/commit/f018a12))
* Upgrade raven ([c4b8e4e](https://github.com/relekang/micro-rss-parser/commit/c4b8e4e))
* Upgrade rss-parsers ([5de999a](https://github.com/relekang/micro-rss-parser/commit/5de999a))
* Upgrade superagent ([e226086](https://github.com/relekang/micro-rss-parser/commit/e226086))



<a name="1.3.0"></a>
# [1.3.0](https://github.com/relekang/micro-rss-parser/compare/v1.2.0...v1.3.0) (2017-08-05)


### Bug Fixes

* **package:** update cheerio to version 1.0.0-rc.2 ([c5aaf3e](https://github.com/relekang/micro-rss-parser/commit/c5aaf3e))
* **package:** update graphql to version 0.10.0 ([b232402](https://github.com/relekang/micro-rss-parser/commit/b232402))
* **package:** update micro to version 8.0.0 ([b1d057b](https://github.com/relekang/micro-rss-parser/commit/b1d057b))
* Make findFeed return full url ([7780a33](https://github.com/relekang/micro-rss-parser/commit/7780a33)), closes [#10](https://github.com/relekang/micro-rss-parser/issues/10)
* Move nock to dev dependencies ([fdadc10](https://github.com/relekang/micro-rss-parser/commit/fdadc10))
* Update rss-parser and use isoDate ([d8e8112](https://github.com/relekang/micro-rss-parser/commit/d8e8112))
* Upgrade express-graphql ([711c084](https://github.com/relekang/micro-rss-parser/commit/711c084))
* Upgrade raven ([0040ff8](https://github.com/relekang/micro-rss-parser/commit/0040ff8))
* Use internal request wrapper in findFeed ([79c76e6](https://github.com/relekang/micro-rss-parser/commit/79c76e6))
* Use npmignore to remove tests and fixtures ([99ea41c](https://github.com/relekang/micro-rss-parser/commit/99ea41c))


### Features

* Add feedme to available parsers ([5a53ff0](https://github.com/relekang/micro-rss-parser/commit/5a53ff0))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/relekang/micro-rss-parser/compare/v1.1.0...v1.2.0) (2017-05-13)


### Bug Fixes

* Add info about raven dsn in help screen ([4de993d](https://github.com/relekang/micro-rss-parser/commit/4de993d))
* Rename fromWebsite to findFeed ([157ea90](https://github.com/relekang/micro-rss-parser/commit/157ea90))
* Upgrade raven to 2.0.0 ([50b881c](https://github.com/relekang/micro-rss-parser/commit/50b881c))


### Features

* Add a way to discover feeds through website URL ([#2](https://github.com/relekang/micro-rss-parser/issues/2)) ([b1a3df8](https://github.com/relekang/micro-rss-parser/commit/b1a3df8))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/relekang/micro-rss-parser/compare/v1.0.1...v1.1.0) (2017-05-11)


### Features

* Add parser field to feed response ([e50d312](https://github.com/relekang/micro-rss-parser/commit/e50d312))
