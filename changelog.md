# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [3.0.4](https://github.com/relekang/graphql-rss-parser/compare/v3.0.3...v3.0.4) (2022-03-13)

### [3.0.3](https://github.com/relekang/graphql-rss-parser/compare/v3.0.2...v3.0.3) (2022-03-13)


### Bug Fixes

* Remove node env from builder image ([a62c99a](https://github.com/relekang/graphql-rss-parser/commit/a62c99ade5e7be6e2f3e96243119efaf9d206e51))

### [3.0.2](https://github.com/relekang/graphql-rss-parser/compare/v3.0.1...v3.0.2) (2022-03-13)

### [3.0.1](https://github.com/relekang/graphql-rss-parser/compare/v3.0.0...v3.0.1) (2022-03-13)


### Bug Fixes

* Add new detection of not a feed ([09b2c28](https://github.com/relekang/graphql-rss-parser/commit/09b2c28a3c9b328b0dcf61fbd66857f273d3243d))
* Run npm audit fix ([25758c6](https://github.com/relekang/graphql-rss-parser/commit/25758c62e4b4883828b970ef4bf49f072a26e026))
* Update security fixes with npm audit fix ([e7c4a6b](https://github.com/relekang/graphql-rss-parser/commit/e7c4a6bee2aa3f6227e94a4dae47118e09e8fce0))
* Upgrade @sentry/node ([1480830](https://github.com/relekang/graphql-rss-parser/commit/148083010225b13ba18bd0a5e78bce173843a693))
* Upgrade axios ([357bfa8](https://github.com/relekang/graphql-rss-parser/commit/357bfa86114dc67b6ebe8b7499416eb42e732adc))
* Upgrade cmd-ts ([6b41e60](https://github.com/relekang/graphql-rss-parser/commit/6b41e603b2acf8bf519a841f0b367a334e7ecf67))
* Upgrade http-status-codes ([93d601d](https://github.com/relekang/graphql-rss-parser/commit/93d601d49cd8317b0bba29016c92344bf71d959d))

## [3.0.0](https://github.com/relekang/graphql-rss-parser/compare/v2.9.1...v3.0.0) (2021-06-27)


### ⚠ BREAKING CHANGES

* Drops support for node 10 and 12. If you need support
for that you can change the target in tsconfig and compile the project.
* This renames multiple fields in the schema. Check the
schema definition in graphiql or schema.ts

### Features

* Make the schema compatible with the json feed spec ([da50751](https://github.com/relekang/graphql-rss-parser/commit/da507514b5f62cc9ffea282e9be2b12eed5c45ae))


### Bug Fixes

* Add types for jsonfeed and handle v1.1 spec ([7ed710b](https://github.com/relekang/graphql-rss-parser/commit/7ed710b4c9613fc2569c251d5a1d9df038a67def))
* Set minimum node version to 14 ([b40108b](https://github.com/relekang/graphql-rss-parser/commit/b40108be01716f2c6678514d1d2446bf2b6824f8))
* Upgrade @sentry/node ([9fdc8ab](https://github.com/relekang/graphql-rss-parser/commit/9fdc8abd44c65fa82e149e6af782473a7a94d07d))
* Upgrade normalize-url ([4d28452](https://github.com/relekang/graphql-rss-parser/commit/4d284526ddf663d11a7679f4b02d97cc48372418))

### [2.9.1](https://github.com/relekang/graphql-rss-parser/compare/v2.9.0...v2.9.1) (2021-06-02)

## [2.9.0](https://github.com/relekang/graphql-rss-parser/compare/v2.8.1...v2.9.0) (2021-06-02)


### Features

* Add support for jsonfeed v1 ([d78906c](https://github.com/relekang/graphql-rss-parser/commit/d78906cf064676d7af4a02c5ee1e9301a2d1185d))

### [2.8.1](https://github.com/relekang/graphql-rss-parser/compare/v2.8.0...v2.8.1) (2021-03-30)


### Bug Fixes

* Add support for feed links without leading slash ([4da2091](https://github.com/relekang/graphql-rss-parser/commit/4da20912d7a60191d4d1db441ed3f37f88a9d630))
* Add y18n to resolutions ([afb5711](https://github.com/relekang/graphql-rss-parser/commit/afb57112153a7ccef591262d656bba21423b6829))
* Upgrade graphql dependencies ([7dbda12](https://github.com/relekang/graphql-rss-parser/commit/7dbda12837571b3e17bf27957591645a2af25105))
* Upgrade rss-parser ([a3f373a](https://github.com/relekang/graphql-rss-parser/commit/a3f373ab9f10dd260fda65422c6962f738f0d811))
* Upgrade rss-to-json ([3bf73f7](https://github.com/relekang/graphql-rss-parser/commit/3bf73f7320bc467cb0aca9b452591e672eaee07b))

## [2.8.0](https://github.com/relekang/graphql-rss-parser/compare/v2.7.2...v2.8.0) (2021-02-13)


### Features

* Add support for startTime and endTime ([04d14ab](https://github.com/relekang/graphql-rss-parser/commit/04d14ab847601590ce46aa68b3a01d159a08517d)), closes [#3](https://github.com/relekang/graphql-rss-parser/issues/3)

### [2.7.2](https://github.com/relekang/graphql-rss-parser/compare/v2.7.1...v2.7.2) (2021-02-13)


### Bug Fixes

* Upgrade @sentry/node to 6.1.0 ([01405bc](https://github.com/relekang/graphql-rss-parser/commit/01405bcece094cc2903c2036c119ad46a84022af))
* Upgrade feedme to 2.0.2 ([e62bb6e](https://github.com/relekang/graphql-rss-parser/commit/e62bb6eae3b78333e1e5be7cc193a790c1dce723))
* Upgrade normalize-url to 5.3.0 ([1e6a3f7](https://github.com/relekang/graphql-rss-parser/commit/1e6a3f74afc3ed6e7f64639bc89b5a5d1ca14c8c))
* Upgrade rss-parser to 3.11.0 ([40516b3](https://github.com/relekang/graphql-rss-parser/commit/40516b32382ad6a367fe1b31008a49231c09325b))
* Upgrade rss-to-json to 1.1.2 ([ca2445a](https://github.com/relekang/graphql-rss-parser/commit/ca2445abec0387f80986cb63c890544aca63a58f))

### [2.7.1](https://github.com/relekang/graphql-rss-parser/compare/v2.7.0...v2.7.1) (2020-11-02)


### Bug Fixes

* Add handling of tls errors ([9e42a96](https://github.com/relekang/graphql-rss-parser/commit/9e42a9633d0d70b8aea595beb9b26d6e97f6d0f8))

## [2.7.0](https://github.com/relekang/graphql-rss-parser/compare/v2.6.2...v2.7.0) (2020-10-25)


### Features

* Add timeout to feed request ([0d3a127](https://github.com/relekang/graphql-rss-parser/commit/0d3a1277628b2b33507bb78d6b0e7bd439a57fdd))


### Bug Fixes

* Make error handling return own errors ([4f95842](https://github.com/relekang/graphql-rss-parser/commit/4f95842425d6eaaaf7a6d77249fac48c2744e064))
* Upgrade axios to 0.21.0 ([d164827](https://github.com/relekang/graphql-rss-parser/commit/d164827440560905b276bd55326a40cb785b808f))
* Upgrade sentry client ([717d328](https://github.com/relekang/graphql-rss-parser/commit/717d32858c0f7dc37631c395bfc6c131b7e96b15))

### [2.6.2](https://github.com/relekang/graphql-rss-parser/compare/v2.6.1...v2.6.2) (2020-10-14)


### Bug Fixes

* Add release tag in sentry ([4aa0138](https://github.com/relekang/graphql-rss-parser/commit/4aa013837c0de60146bafaa996ebf888ed7e9feb))
* Handle ECONNRESET errors ([5d6e803](https://github.com/relekang/graphql-rss-parser/commit/5d6e8037d8ab282225ab049add06466408b5fdda))

### [2.6.1](https://github.com/relekang/graphql-rss-parser/compare/v2.6.0...v2.6.1) (2020-10-02)


### Bug Fixes

* Make sentry debug controllable with env variable ([b6a4044](https://github.com/relekang/graphql-rss-parser/commit/b6a4044bee87508bfa9aa64225444d505a2265a9))

## [2.6.0](https://github.com/relekang/graphql-rss-parser/compare/v2.5.0...v2.6.0) (2020-10-02)


### Features

* Port raven to sentry sdk and add error filtering ([2a6e209](https://github.com/relekang/graphql-rss-parser/commit/2a6e209513cb39ec9f27f2abf4e2dda2b0fed9ae))

## [2.5.0](https://github.com/relekang/graphql-rss-parser/compare/v2.4.0...v2.5.0) (2020-10-02)


### Features

* Add debug logging ([7f12cc1](https://github.com/relekang/graphql-rss-parser/commit/7f12cc17e2d4669f582b66a9f45258e1cf746866))


### Bug Fixes

* Add handling of not feed errors in rss-to-json ([8992e7c](https://github.com/relekang/graphql-rss-parser/commit/8992e7c1199085955683244f67522e3e1db14f68))
* Upgrade normalize-url ([8a26300](https://github.com/relekang/graphql-rss-parser/commit/8a26300e8b9e2c47d19e12dbd5ba464c22fb39c5))

## [2.4.0](https://github.com/relekang/graphql-rss-parser/compare/v2.3.3...v2.4.0) (2020-09-30)


### Features

* Add new parser rss-to-json ([bf7dc71](https://github.com/relekang/graphql-rss-parser/commit/bf7dc71e77b6bc3db66958d0baed9669062423bc))
* Enable feedme and rss-to-json ([3773c9b](https://github.com/relekang/graphql-rss-parser/commit/3773c9bdb75f7439f02748dd803087444af28878))


### Bug Fixes

* Enable filtering of empty entries ([3fd0add](https://github.com/relekang/graphql-rss-parser/commit/3fd0add82b80d1f016bb8e9d3c398fe6120573ab))
* Handle more errors in requests ([0b64958](https://github.com/relekang/graphql-rss-parser/commit/0b64958af94f8d7e83c9225f8235f0ff0cca3721))
* Make categories parsing in feedme work ([5d5a0e8](https://github.com/relekang/graphql-rss-parser/commit/5d5a0e8f31157fdeee87521b19dd2ea54da0c61a))

### [2.3.3](https://github.com/relekang/graphql-rss-parser/compare/v2.3.2...v2.3.3) (2020-09-29)


### Bug Fixes

* Handle unknown status code ([e955531](https://github.com/relekang/graphql-rss-parser/commit/e95553182767aeb9c333e875a1b3178d38dcfa2b))

### [2.3.2](https://github.com/relekang/graphql-rss-parser/compare/v2.3.1...v2.3.2) (2020-09-29)


### Bug Fixes

* Add connection refused error ([7cb8be5](https://github.com/relekang/graphql-rss-parser/commit/7cb8be563659e299f854bb40dc5d27fb34e03990))
* Add status text in upstream error ([abe215c](https://github.com/relekang/graphql-rss-parser/commit/abe215c904adf0bd5f6fca1fc207e99cd0dd3860))

### [2.3.1](https://github.com/relekang/graphql-rss-parser/compare/v2.3.0...v2.3.1) (2020-09-29)


### Bug Fixes

* Upgrade dependencies with vulnerabilities ([5efcf6e](https://github.com/relekang/graphql-rss-parser/commit/5efcf6eae2297ec4102c3760c7563d74ab2585d1))
* Upgrade normalize-url ([414fb2c](https://github.com/relekang/graphql-rss-parser/commit/414fb2c93b75746236bbeba831c8bb1113ee05d0))
* Use node 14 in dockerfile ([54e0f17](https://github.com/relekang/graphql-rss-parser/commit/54e0f171602ce9b369d4091d95dc08a2b315092c))

## [2.3.0](https://github.com/relekang/graphql-rss-parser/compare/v2.2.0...v2.3.0) (2020-09-29)


### Features

* Make findfeed return errors ([7fa09ab](https://github.com/relekang/graphql-rss-parser/commit/7fa09ab3bca06ebe611d5e236c2948ac9f206567))


### Bug Fixes

* Add DnsLookupError ([6a1f67b](https://github.com/relekang/graphql-rss-parser/commit/6a1f67b92358cbeadbf573a7106536d6691f49fd))

## [2.2.0](https://github.com/relekang/graphql-rss-parser/compare/v2.1.3...v2.2.0) (2020-09-28)


### Features

* Add more information in error responses ([c7bfa84](https://github.com/relekang/graphql-rss-parser/commit/c7bfa84c1302a81053f6072aae95032fdc392718))

### [2.1.3](https://github.com/relekang/graphql-rss-parser/compare/v2.1.2...v2.1.3) (2020-09-27)


### Bug Fixes

* Upgrade axios to 0.20.0 ([770e7e7](https://github.com/relekang/graphql-rss-parser/commit/770e7e77c8b771d6280cddce646972386260a1c6))
* Upgrade graphql dependencies ([0ffe768](https://github.com/relekang/graphql-rss-parser/commit/0ffe768ab82723a6e2e7a4e09960895d54d32859))

### [2.1.2](https://github.com/relekang/graphql-rss-parser/compare/v2.1.1...v2.1.2) (2020-09-27)


### Bug Fixes

* Upgrade normalize-url to 5.1.0 ([c1acda4](https://github.com/relekang/graphql-rss-parser/commit/c1acda479c33333d2d10b55eb5d60f71d48cd653))
* Upgrade rss-parser to 3.9.0 ([a121774](https://github.com/relekang/graphql-rss-parser/commit/a121774c27962c671fca5f0d5ac0046969242040))

### [2.1.1](https://github.com/relekang/graphql-rss-parser/compare/v2.1.0...v2.1.1) (2020-09-27)


### Bug Fixes

* Make rss-parser work with CET and CEST dates without parenthesis ([e787392](https://github.com/relekang/graphql-rss-parser/commit/e787392a17ab346cf6663e56f1f8ba361e2346b9))
* Return error on empty url in findFeed ([8d5ac1a](https://github.com/relekang/graphql-rss-parser/commit/8d5ac1a73925e78d69d5574ff170178e2f82b11b))

## [2.1.0](https://github.com/relekang/graphql-rss-parser/compare/v2.0.0...v2.1.0) (2020-05-18)


### Features

* Add support for categories ([9e99ec0](https://github.com/relekang/graphql-rss-parser/commit/9e99ec0ad1b2ac5ea472a6938d6dd5e901a51f45))
* Add support for entry author ([c8c3ff9](https://github.com/relekang/graphql-rss-parser/commit/c8c3ff94de0c21d15c89fde386b54b9b0d171a0e))


### Bug Fixes

* Correctly set required in schema ([0a878d9](https://github.com/relekang/graphql-rss-parser/commit/0a878d92fe3f78806dfc3dc7f44a30346e89e967))

## [2.0.0](https://github.com/relekang/graphql-rss-parser/compare/v1.5.12...v2.0.0) (2020-02-03)


### ⚠ BREAKING CHANGES

* Require node 10
* The old routes are replaced by having the graphql
endpoint at "/".

### Features

* Upgrade apollo and move route to / ([b05acd4](https://github.com/relekang/graphql-rss-parser/commit/b05acd45f3fdd426670f26b20b006e535e6b8ebc))


### Bug Fixes

* Make error handling more robust when missing stack ([3b16ede](https://github.com/relekang/graphql-rss-parser/commit/3b16edeb2492ad41d61c98b446c252208d3ce67a))
* Only retry feed if normalize is true ([31fe7c2](https://github.com/relekang/graphql-rss-parser/commit/31fe7c2b576a2d2a0e6ee49925ea55e7f7f28c51))
* Require node 10 ([c065b51](https://github.com/relekang/graphql-rss-parser/commit/c065b51bcaa975f741e27624c65cc36516642622))
* Upgrade apollo-server-micro ([9a86993](https://github.com/relekang/graphql-rss-parser/commit/9a869932f5867b502758bb4e4c61c31384a13a4d))
* Upgrade axios ([ac99cbd](https://github.com/relekang/graphql-rss-parser/commit/ac99cbdd5ad5d6ccf29a529ea2de6a65fbf9c1aa))
* Upgrade axios ([a160af2](https://github.com/relekang/graphql-rss-parser/commit/a160af2826379d18c646e3f7dfd97eccb9e3fd0c))
* Upgrade cheerio ([29a2bb7](https://github.com/relekang/graphql-rss-parser/commit/29a2bb7e39f78adfa6861a355a260de929019e17))
* Upgrade feedme ([c84ab0d](https://github.com/relekang/graphql-rss-parser/commit/c84ab0d74661072abc69f6c5ef5dec23dc029fd7))
* Upgrade graphql ([19b87be](https://github.com/relekang/graphql-rss-parser/commit/19b87be2e85f6478394ec0b6a42986973dd9ca45))
* Upgrade is-url ([cd51794](https://github.com/relekang/graphql-rss-parser/commit/cd5179485d2b4c56deac75165e699e0b8d91ad63))
* Upgrade micro ([9141174](https://github.com/relekang/graphql-rss-parser/commit/9141174b62e875dbbc748600caab5d2cafcfe217))
* Upgrade normalize-url ([f41b2a4](https://github.com/relekang/graphql-rss-parser/commit/f41b2a4db02ad2945605c273249547f956e5cf2e))
* Upgrade raven ([a2aaf73](https://github.com/relekang/graphql-rss-parser/commit/a2aaf73c132ba77ea68c249da0317922b0c68fdd))
* Upgrade rss-parser ([936c927](https://github.com/relekang/graphql-rss-parser/commit/936c927af038cde4a8cb1dfdae3c96c018fce5ac))
* Upgrade rss-parser package ([5761e3d](https://github.com/relekang/graphql-rss-parser/commit/5761e3dd6c4dc2654a0c7cbd94caa4d7b78aa137))

<a name="1.5.12"></a>
## [1.5.12](https://github.com/relekang/graphql-rss-parser/compare/v1.5.11...v1.5.12) (2018-02-23)


### Bug Fixes

* Upgrade args ([8b5cbf0](https://github.com/relekang/graphql-rss-parser/commit/8b5cbf0))
* Upgrade feedme ([c554fb3](https://github.com/relekang/graphql-rss-parser/commit/c554fb3))
* Upgrade graphql-tools ([b8909e0](https://github.com/relekang/graphql-rss-parser/commit/b8909e0))
* Upgrade micro ([7d8bafc](https://github.com/relekang/graphql-rss-parser/commit/7d8bafc))
* Upgrade normalize-url ([d1cd23f](https://github.com/relekang/graphql-rss-parser/commit/d1cd23f))
* Upgrade raven ([0877246](https://github.com/relekang/graphql-rss-parser/commit/0877246))
* Upgrade rss-parser to 3.x ([0dffab6](https://github.com/relekang/graphql-rss-parser/commit/0dffab6))



<a name="1.5.11"></a>
## [1.5.11](https://github.com/relekang/graphql-rss-parser/compare/v1.5.10...v1.5.11) (2018-02-23)


### Bug Fixes

* Add starting message ([e52a9ad](https://github.com/relekang/graphql-rss-parser/commit/e52a9ad))
* Throw correct exception with axios ([e65b1ee](https://github.com/relekang/graphql-rss-parser/commit/e65b1ee))
* Try without normalizing url if it fails in findFeed ([0239fcf](https://github.com/relekang/graphql-rss-parser/commit/0239fcf))



<a name="1.5.10"></a>
## [1.5.10](https://github.com/relekang/graphql-rss-parser/compare/v1.5.9...v1.5.10) (2018-02-23)


### Bug Fixes

* Add more debug logging to findfeed ([5b500a6](https://github.com/relekang/graphql-rss-parser/commit/5b500a6))
* Change from superagent to axios ([4ca882d](https://github.com/relekang/graphql-rss-parser/commit/4ca882d))


### Performance Improvements

* Remove unecessary duplicate requests for feeds ([87fed1e](https://github.com/relekang/graphql-rss-parser/commit/87fed1e))



<a name="1.5.9"></a>
## [1.5.9](https://github.com/relekang/graphql-rss-parser/compare/v1.5.8...v1.5.9) (2018-02-23)


### Bug Fixes

* Accept rss-feeds with html content-type ([6900b5a](https://github.com/relekang/graphql-rss-parser/commit/6900b5a))
* **package:** update graphql to version 0.13.0 ([36aceef](https://github.com/relekang/graphql-rss-parser/commit/36aceef))



<a name="1.5.8"></a>
## [1.5.8](https://github.com/relekang/graphql-rss-parser/compare/v1.5.7...v1.5.8) (2017-12-17)


### Bug Fixes

* Add type to error response with name of exception ([40265b6](https://github.com/relekang/graphql-rss-parser/commit/40265b6))
* Make ConnectionFailed error extend BaseError ([6e210e3](https://github.com/relekang/graphql-rss-parser/commit/6e210e3))
* Use apollo server instead of graphql-express ([29e6419](https://github.com/relekang/graphql-rss-parser/commit/29e6419))



<a name="1.5.7"></a>
## [1.5.7](https://github.com/relekang/graphql-rss-parser/compare/v1.5.6...v1.5.7) (2017-12-11)


### Bug Fixes

* Upgrade micro to 9.0.2 ([6efec1c](https://github.com/relekang/graphql-rss-parser/commit/6efec1c))
* Upgrade raven to 2.3.0 ([727b785](https://github.com/relekang/graphql-rss-parser/commit/727b785))
* Upgrade rss-parser to 2.11.0 ([130de3c](https://github.com/relekang/graphql-rss-parser/commit/130de3c))
* Upgrade superagent to 3.8.2 ([f4bddbe](https://github.com/relekang/graphql-rss-parser/commit/f4bddbe))



<a name="1.5.6"></a>
## [1.5.6](https://github.com/relekang/graphql-rss-parser/compare/v1.5.5...v1.5.6) (2017-12-10)


### Bug Fixes

* Add parser to ParserError ([feca909](https://github.com/relekang/graphql-rss-parser/commit/feca909))
* Make error handling use full parser list ([a224ec6](https://github.com/relekang/graphql-rss-parser/commit/a224ec6))
* Make rss-parser reject with NotAFeedError on syntax error ([5093a73](https://github.com/relekang/graphql-rss-parser/commit/5093a73))
* Remove feedme from list of parsers ([8044de7](https://github.com/relekang/graphql-rss-parser/commit/8044de7))



<a name="1.5.5"></a>
## [1.5.5](https://github.com/relekang/graphql-rss-parser/compare/v1.5.4...v1.5.5) (2017-12-06)


### Bug Fixes

* Accept application/xml as rss feeds ([50ed952](https://github.com/relekang/graphql-rss-parser/commit/50ed952))



<a name="1.5.4"></a>
## [1.5.4](https://github.com/relekang/graphql-rss-parser/compare/v1.5.3...v1.5.4) (2017-12-02)


### Bug Fixes

* **package:** update normalize-url to version 2.0.0 ([1f812de](https://github.com/relekang/graphql-rss-parser/commit/1f812de))



<a name="1.5.3"></a>
## [1.5.3](https://github.com/relekang/graphql-rss-parser/compare/v1.5.2...v1.5.3) (2017-11-19)


### Bug Fixes

* Move normalizing of url after all building of the url ([e2a0f23](https://github.com/relekang/graphql-rss-parser/commit/e2a0f23))



<a name="1.5.2"></a>
## [1.5.2](https://github.com/relekang/graphql-rss-parser/compare/v1.5.1...v1.5.2) (2017-11-17)


### Bug Fixes

* Filter out crashed findfeed results ([9113c2b](https://github.com/relekang/graphql-rss-parser/commit/9113c2b))



<a name="1.5.1"></a>
## [1.5.1](https://github.com/relekang/graphql-rss-parser/compare/v1.5.0...v1.5.1) (2017-11-16)


### Bug Fixes

* Add support for feeds with content-type text/xml ([f4c5a1d](https://github.com/relekang/graphql-rss-parser/commit/f4c5a1d))
* Add title to the case when same url is returned ([a7b89e0](https://github.com/relekang/graphql-rss-parser/commit/a7b89e0))



<a name="1.5.0"></a>
# [1.5.0](https://github.com/relekang/graphql-rss-parser/compare/v1.4.1...v1.5.0) (2017-11-08)


### Bug Fixes

* Add readme in fixture folder ([8865767](https://github.com/relekang/graphql-rss-parser/commit/8865767))
* Upgrade micro ([119721f](https://github.com/relekang/graphql-rss-parser/commit/119721f))
* Upgrade superagent ([083be46](https://github.com/relekang/graphql-rss-parser/commit/083be46))


### Features

* Add title to findFeed result ([047c8fc](https://github.com/relekang/graphql-rss-parser/commit/047c8fc))



<a name="1.4.1"></a>
## [1.4.1](https://github.com/relekang/graphql-rss-parser/compare/v1.4.0...v1.4.1) (2017-11-01)


### Bug Fixes

* Make normalize urls to not remove trailing slash ([315f7eb](https://github.com/relekang/graphql-rss-parser/commit/315f7eb))



<a name="1.4.0"></a>
# [1.4.0](https://github.com/relekang/graphql-rss-parser/compare/v1.3.2...v1.4.0) (2017-11-01)


### Features

* Support feeds in findfeed ([4624bdc](https://github.com/relekang/graphql-rss-parser/commit/4624bdc))



<a name="1.3.2"></a>
## [1.3.2](https://github.com/relekang/graphql-rss-parser/compare/v1.3.1...v1.3.2) (2017-10-29)


### Bug Fixes

* Add Dockerfile ([b210512](https://github.com/relekang/graphql-rss-parser/commit/b210512))
* Throw ConnectionFailedError on ENOTFOUND error ([1ab1d81](https://github.com/relekang/graphql-rss-parser/commit/1ab1d81))
* Ugprade feedme ([df0b39b](https://github.com/relekang/graphql-rss-parser/commit/df0b39b))
* Upgrade rss-parser ([67e4fbc](https://github.com/relekang/graphql-rss-parser/commit/67e4fbc))
* Upgrade superagent ([fa8b977](https://github.com/relekang/graphql-rss-parser/commit/fa8b977))



<a name="1.3.1"></a>
## [1.3.1](https://github.com/relekang/graphql-rss-parser/compare/v1.3.0...v1.3.1) (2017-10-15)


### Bug Fixes

* Upgrade grahpql dependencies ([8fa3154](https://github.com/relekang/graphql-rss-parser/commit/8fa3154))
* Upgrade micro ([f018a12](https://github.com/relekang/graphql-rss-parser/commit/f018a12))
* Upgrade raven ([c4b8e4e](https://github.com/relekang/graphql-rss-parser/commit/c4b8e4e))
* Upgrade rss-parsers ([5de999a](https://github.com/relekang/graphql-rss-parser/commit/5de999a))
* Upgrade superagent ([e226086](https://github.com/relekang/graphql-rss-parser/commit/e226086))



<a name="1.3.0"></a>
# [1.3.0](https://github.com/relekang/graphql-rss-parser/compare/v1.2.0...v1.3.0) (2017-08-05)


### Bug Fixes

* **package:** update cheerio to version 1.0.0-rc.2 ([c5aaf3e](https://github.com/relekang/graphql-rss-parser/commit/c5aaf3e))
* **package:** update graphql to version 0.10.0 ([b232402](https://github.com/relekang/graphql-rss-parser/commit/b232402))
* **package:** update micro to version 8.0.0 ([b1d057b](https://github.com/relekang/graphql-rss-parser/commit/b1d057b))
* Make findFeed return full url ([7780a33](https://github.com/relekang/graphql-rss-parser/commit/7780a33)), closes [#10](https://github.com/relekang/graphql-rss-parser/issues/10)
* Move nock to dev dependencies ([fdadc10](https://github.com/relekang/graphql-rss-parser/commit/fdadc10))
* Update rss-parser and use isoDate ([d8e8112](https://github.com/relekang/graphql-rss-parser/commit/d8e8112))
* Upgrade express-graphql ([711c084](https://github.com/relekang/graphql-rss-parser/commit/711c084))
* Upgrade raven ([0040ff8](https://github.com/relekang/graphql-rss-parser/commit/0040ff8))
* Use internal request wrapper in findFeed ([79c76e6](https://github.com/relekang/graphql-rss-parser/commit/79c76e6))
* Use npmignore to remove tests and fixtures ([99ea41c](https://github.com/relekang/graphql-rss-parser/commit/99ea41c))


### Features

* Add feedme to available parsers ([5a53ff0](https://github.com/relekang/graphql-rss-parser/commit/5a53ff0))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/relekang/graphql-rss-parser/compare/v1.1.0...v1.2.0) (2017-05-13)


### Bug Fixes

* Add info about raven dsn in help screen ([4de993d](https://github.com/relekang/graphql-rss-parser/commit/4de993d))
* Rename fromWebsite to findFeed ([157ea90](https://github.com/relekang/graphql-rss-parser/commit/157ea90))
* Upgrade raven to 2.0.0 ([50b881c](https://github.com/relekang/graphql-rss-parser/commit/50b881c))


### Features

* Add a way to discover feeds through website URL ([#2](https://github.com/relekang/graphql-rss-parser/issues/2)) ([b1a3df8](https://github.com/relekang/graphql-rss-parser/commit/b1a3df8))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/relekang/graphql-rss-parser/compare/v1.0.1...v1.1.0) (2017-05-11)


### Features

* Add parser field to feed response ([e50d312](https://github.com/relekang/graphql-rss-parser/commit/e50d312))
