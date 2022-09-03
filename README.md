[![npm version](https://badge.fury.io/js/angular2-expandable-list.svg)](https://badge.fury.io/js/angular2-expandable-list)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# nextjs-utilites

> This library provides many helpful utilities for use in [Next.js](https://nextjs.org) projects.

## Prerequisites

This project requires NodeJS (version 8 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
6.4.1
v8.16.0
```

## Table of contents

- [nextjs-utilities](#nextjs-utilites)
  - [Prerequisites](#prerequisites)
  - [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Example Usage](#example-usage)
    - [API Route Utilities](#api-route-utilities)
  - [API](#api)
    - [typeWrapper](#typewrapper)
    - [withMethod](#withmethod)
      - [get](#get)
      - [post](#post)
      - [put](#put)
      - [delete](#delete)
  - [Contributing](#contributing)
  - [Credits](#credits)
  - [Built With](#built-with)
  - [Versioning](#versioning)
  - [Authors](#authors)
  - [License](#license)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

To install and set up the library, run:

```sh
$ npm install nextjs-utilities
```

Or if you prefer using Yarn:

```sh
$ yarn add nextjs-utilities
```

## Example Usage

### API Route Utilities

```ts
import { get, post, withMethod, typeWrapper } from "next-utils";

interface RequestBody {
  name: string;
}

interface ResponseBody {
  id: number;
  logged_in: boolean;
}

const getHandler = get((req, res) => {
  res.status(200).json({ name: "Get" });
});

const postHandler = post(
  typeWrapper<RequestBody, ResponseBody>((req, res) => {
    console.log(typeof req.body); // { name: string }
    console.log(typeof res.json); // (body: { id: number; logged_in: boolean; }) => void
  })
);

export default withMethod(getHandler, postHandler);
```

## API

### typeWrapper

```ts
typeWrapper<Req, Res>(handler: (req: NextAPIRequest & { body: Req }, res: NextAPIResponse<Res>) => void): NextAPIHandler
```

The `typeWrapper` function accepts two generics and preprocesses and types the request body and response json function. The request body is automatically parsed and coerced into the Req type given.

_NOTE_ To account for type inconsistencies, the query object is instead moved to the body property no matter the type of request, so whether using GET or POST/PUT/DELETE, use `req.body` for the information passed to the API route.

Supported options and result fields for the `typeWrapper` function are listed below.

`Req` _(REQUIRED)_

The type of the request body/query (consolidated into a single `body` property on the req object).

`Res` _(REQUIRED)_

The type of the response body (used for the `json` method on the res object).

`handler` _(REQUIRED)_

The API route logic, with extended request and response objects passed in.

Example:

```ts
interface RequestBody {
  name: string;
}

interface ResponseBody {
  id: number;
  logged_in: boolean;
}

typeWrapper<RequestBody, ResponseBody>((req, res) => {
  console.log(typeof req.body); // { name: string }
  console.log(typeof res.json); // (body: { id: number; logged_in: boolean; }) => void
});
```

### withMethod

```ts
withMethod(...handlers: NextAPIHandler[]): NextAPIHandler
```

The `withMethod` function accepts a list of API route handlers and compiles them into one handler that is intended to be the default export of that route. Meant to be used with the following method handlers.

#### get

```ts
get((req, res) => {
  console.log(req.method); // GET
});
```

Runs the handler provided against a GET method check.

#### post

```ts
post((req, res) => {
  console.log(req.method); // POST
});
```

Runs the handler provided against a POST method check.

#### put

```ts
put((req, res) => {
  console.log(req.method); // PUT or PATCH
});
```

Runs the handler provided against a PUT or PATCH method check.

#### delete

```ts
del((req, res) => {
  console.log(req.method); // DELETE
});
```

Runs the handler provided against a DELETE method check.

Supported options and result fields for the `withMethod` function are listed below.

`...handlers` _(REQUIRED)_

List of handlers to run in one single exported handler function. Ideally should be a list of method handlers.

Supported options and result fields for all four method handlers are listed below.

`handler` _(REQUIRED)_

The handler to run against the method check

Example:

```ts
const getHandler = get((req, res) => {
  res.status(200).json({ name: "GET" });
});

const postHandler = post((req, res) => {
  res.status(200).json({ name: "POST" });
});

export default withMethod(getHandler, postHandler);
```

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b amazing-feature`)
3. Commit your changes (`git commit -am 'Add some amazing feature'`)
4. Push to the branch (`git push origin amazing-feature`)
5. Create a new Pull Request

## Credits

## Built With

- [Next.js](https://nextjs.org/) - The web framework used
- [TypeScript](https://www.typescriptlang.org/) - The language used

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

- **Snehil Kakani** - _Creator and Lead Developer_ - [SneK152](https://github.com/snek152)

See also the list of [contributors](https://github.com/snek152/nextjs-utilities/contributors) who participated in this project.

## License

[MIT License](https://andreasonny.mit-license.org/2019) © Andrea SonnY
