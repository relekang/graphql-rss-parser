# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.3.0](https://github.com/relekang/micro-rss-parser/compare/v2.2.0...v2.3.0) (2020-09-29)


### Features

* Make findfeed return errors ([7fa09ab](https://github.com/relekang/micro-rss-parser/commit/7fa09ab3bca06ebe611d5e236c2948ac9f206567))


### Bug Fixes

* Add DnsLookupError ([6a1f67b](https://github.com/relekang/micro-rss-parser/commit/6a1f67b92358cbeadbf573a7106536d6691f49fd))

## [2.2.0](https://github.com/relekang/micro-rss-parser/compare/v2.1.3...v2.2.0) (2020-09-28)


### Features

* Add more information in error responses ([c7bfa84](https://github.com/relekang/micro-rss-parser/commit/c7bfa84c1302a81053f6072aae95032fdc392718))

### [2.1.3](https://github.com/relekang/micro-rss-parser/compare/v2.1.2...v2.1.3) (2020-09-27)


### Bug Fixes

* Upgrade axios to 0.20.0 ([770e7e7](https://github.com/relekang/micro-rss-parser/commit/770e7e77c8b771d6280cddce646972386260a1c6))
* Upgrade graphql dependencies ([0ffe768](https://github.com/relekang/micro-rss-parser/commit/0ffe768ab82723a6e2e7a4e09960895d54d32859))

### [2.1.2](https://github.com/relekang/micro-rss-parser/compare/v2.1.1...v2.1.2) (2020-09-27)


### Bug Fixes

* Upgrade normalize-url to 5.1.0 ([c1acda4](https://github.com/relekang/micro-rss-parser/commit/c1acda479c33333d2d10b55eb5d60f71d48cd653))
* Upgrade rss-parser to 3.9.0 ([a121774](https://github.com/relekang/micro-rss-parser/commit/a121774c27962c671fca5f0d5ac0046969242040))

### [2.1.1](https://github.com/relekang/micro-rss-parser/compare/v2.1.0...v2.1.1) (2020-09-27)


### Bug Fixes

* Make rss-parser work with CET and CEST dates without parenthesis ([e787392](https://github.com/relekang/micro-rss-parser/commit/e787392a17ab346cf6663e56f1f8ba361e2346b9))
* Return error on empty url in findFeed ([8d5ac1a](https://github.com/relekang/micro-rss-parser/commit/8d5ac1a73925e78d69d5574ff170178e2f82b11b))

## [2.1.0](https://github.com/relekang/micro-rss-parser/compare/v2.0.0...v2.1.0) (2020-05-18)


### Features

* Add support for categories ([9e99ec0](https://github.com/relekang/micro-rss-parser/commit/9e99ec0ad1b2ac5ea472a6938d6dd5e901a51f45))
* Add support for entry author ([c8c3ff9](https://github.com/relekang/micro-rss-parser/commit/c8c3ff94de0c21d15c89fde386b54b9b0d171a0e))


### Bug Fixes

* Correctly set required in schema ([0a878d9](https://github.com/relekang/micro-rss-parser/commit/0a878d92fe3f78806dfc3dc7f44a30346e89e967))

## [2.0.0](https://github.com/relekang/micro-rss-parser/compare/v1.5.12...v2.0.0) (2020-02-03)


### ⚠ BREAKING CHANGES

* Require node 10
* The old routes are replaced by having the graphql
endpoint at "/".

### Features

* Upgrade apollo and move route to / ([b05acd4](https://github.com/relekang/micro-rss-parser/commit/b05acd45f3fdd426670f26b20b006e535e6b8ebc))


### Bug Fixes

* Make error handling more robust when missing stack ([3b16ede](https://github.com/relekang/micro-rss-parser/commit/3b16edeb2492ad41d61c98b446c252208d3ce67a))
* Only retry feed if normalize is true ([31fe7c2](https://github.com/relekang/micro-rss-parser/commit/31fe7c2b576a2d2a0e6ee49925ea55e7f7f28c51))
* Require node 10 ([c065b51](https://github.com/relekang/micro-rss-parser/commit/c065b51bcaa975f741e27624c65cc36516642622))
* Upgrade apollo-server-micro ([9a86993](https://github.com/relekang/micro-rss-parser/commit/9a869932f5867b502758bb4e4c61c31384a13a4d))
* Upgrade axios ([ac99cbd](https://github.com/relekang/micro-rss-parser/commit/ac99cbdd5ad5d6ccf29a529ea2de6a65fbf9c1aa))
* Upgrade axios ([a160af2](https://github.com/relekang/micro-rss-parser/commit/a160af2826379d18c646e3f7dfd97eccb9e3fd0c))
* Upgrade cheerio ([29a2bb7](https://github.com/relekang/micro-rss-parser/commit/29a2bb7e39f78adfa6861a355a260de929019e17))
* Upgrade feedme ([c84ab0d](https://github.com/relekang/micro-rss-parser/commit/c84ab0d74661072abc69f6c5ef5dec23dc029fd7))
* Upgrade graphql ([19b87be](https://github.com/relekang/micro-rss-parser/commit/19b87be2e85f6478394ec0b6a42986973dd9ca45))
* Upgrade is-url ([cd51794](https://github.com/relekang/micro-rss-parser/commit/cd5179485d2b4c56deac75165e699e0b8d91ad63))
* Upgrade micro ([9141174](https://github.com/relekang/micro-rss-parser/commit/9141174b62e875dbbc748600caab5d2cafcfe217))
* Upgrade normalize-url ([f41b2a4](https://github.com/relekang/micro-rss-parser/commit/f41b2a4db02ad2945605c273249547f956e5cf2e))
* Upgrade raven ([a2aaf73](https://github.com/relekang/micro-rss-parser/commit/a2aaf73c132ba77ea68c249da0317922b0c68fdd))
* Upgrade rss-parser ([936c927](https://github.com/relekang/micro-rss-parser/commit/936c927af038cde4a8cb1dfdae3c96c018fce5ac))
* Upgrade rss-parser package ([5761e3d](https://github.com/relekang/micro-rss-parser/commit/5761e3dd6c4dc2654a0c7cbd94caa4d7b78aa137))

<a name="1.5.12"></a>
## [1.5.12](https://github.com/relekang/micro-rss-parser/compare/v1.5.11...v1.5.12) (2018-02-23)


### Bug Fixes

* Upgrade args ([8b5cbf0](https://github.com/relekang/micro-rss-parser/commit/8b5cbf0))
* Upgrade feedme ([c554fb3](https://github.com/relekang/micro-rss-parser/commit/c554fb3))
* Upgrade graphql-tools ([b8909e0](https://github.com/relekang/micro-rss-parser/commit/b8909e0))
* Upgrade micro ([7d8bafc](https://github.com/relekang/micro-rss-parser/commit/7d8bafc))
* Upgrade normalize-url ([d1cd23f](https://github.com/relekang/micro-rss-parser/commit/d1cd23f))
* Upgrade raven ([0877246](https://github.com/relekang/micro-rss-parser/commit/0877246))
* Upgrade rss-parser to 3.x ([0dffab6](https://github.com/relekang/micro-rss-parser/commit/0dffab6))



<a name="1.5.11"></a>
## [1.5.11](https://github.com/relekang/micro-rss-parser/compare/v1.5.10...v1.5.11) (2018-02-23)


### Bug Fixes

* Add starting message ([e52a9ad](https://github.com/relekang/micro-rss-parser/commit/e52a9ad))
* Throw correct exception with axios ([e65b1ee](https://github.com/relekang/micro-rss-parser/commit/e65b1ee))
* Try without normalizing url if it fails in findFeed ([0239fcf](https://github.com/relekang/micro-rss-parser/commit/0239fcf))



<a name="1.5.10"></a>
## [1.5.10](https://github.com/relekang/micro-rss-parser/compare/v1.5.9...v1.5.10) (2018-02-23)


### Bug Fixes

* Add more debug logging to findfeed ([5b500a6](https://github.com/relekang/micro-rss-parser/commit/5b500a6))
* Change from superagent to axios ([4ca882d](https://github.com/relekang/micro-rss-parser/commit/4ca882d))


### Performance Improvements

* Remove unecessary duplicate requests for feeds ([87fed1e](https://github.com/relekang/micro-rss-parser/commit/87fed1e))



<a name="1.5.9"></a>
## [1.5.9](https://github.com/relekang/micro-rss-parser/compare/v1.5.8...v1.5.9) (2018-02-23)


### Bug Fixes

* Accept rss-feeds with html content-type ([6900b5a](https://github.com/relekang/micro-rss-parser/commit/6900b5a))
* **package:** update graphql to version 0.13.0 ([36aceef](https://github.com/relekang/micro-rss-parser/commit/36aceef))



<a name="1.5.8"></a>
## [1.5.8](https://github.com/relekang/micro-rss-parser/compare/v1.5.7...v1.5.8) (2017-12-17)


### Bug Fixes

* Add type to error response with name of exception ([40265b6](https://github.com/relekang/micro-rss-parser/commit/40265b6))
* Make ConnectionFailed error extend BaseError ([6e210e3](https://github.com/relekang/micro-rss-parser/commit/6e210e3))
* Use apollo server instead of graphql-express ([29e6419](https://github.com/relekang/micro-rss-parser/commit/29e6419))



<a name="1.5.7"></a>
## [1.5.7](https://github.com/relekang/micro-rss-parser/compare/v1.5.6...v1.5.7) (2017-12-11)


### Bug Fixes

* Upgrade micro to 9.0.2 ([6efec1c](https://github.com/relekang/micro-rss-parser/commit/6efec1c))
* Upgrade raven to 2.3.0 ([727b785](https://github.com/relekang/micro-rss-parser/commit/727b785))
* Upgrade rss-parser to 2.11.0 ([130de3c](https://github.com/relekang/micro-rss-parser/commit/130de3c))
* Upgrade superagent to 3.8.2 ([f4bddbe](https://github.com/relekang/micro-rss-parser/commit/f4bddbe))



<a name="1.5.6"></a>
## [1.5.6](https://github.com/relekang/micro-rss-parser/compare/v1.5.5...v1.5.6) (2017-12-10)


### Bug Fixes

* Add parser to ParserError ([feca909](https://github.com/relekang/micro-rss-parser/commit/feca909))
* Make error handling use full parser list ([a224ec6](https://github.com/relekang/micro-rss-parser/commit/a224ec6))
* Make rss-parser reject with NotAFeedError on syntax error ([5093a73](https://github.com/relekang/micro-rss-parser/commit/5093a73))
* Remove feedme from list of parsers ([8044de7](https://github.com/relekang/micro-rss-parser/commit/8044de7))



<a name="1.5.5"></a>
## [1.5.5](https://github.com/relekang/micro-rss-parser/compare/v1.5.4...v1.5.5) (2017-12-06)


### Bug Fixes

* Accept application/xml as rss feeds ([50ed952](https://github.com/relekang/micro-rss-parser/commit/50ed952))



<a name="1.5.4"></a>
## [1.5.4](https://github.com/relekang/micro-rss-parser/compare/v1.5.3...v1.5.4) (2017-12-02)


### Bug Fixes

* **package:** update normalize-url to version 2.0.0 ([1f812de](https://github.com/relekang/micro-rss-parser/commit/1f812de))



<a name="1.5.3"></a>
## [1.5.3](https://github.com/relekang/micro-rss-parser/compare/v1.5.2...v1.5.3) (2017-11-19)


### Bug Fixes

* Move normalizing of url after all building of the url ([e2a0f23](https://github.com/relekang/micro-rss-parser/commit/e2a0f23))



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
