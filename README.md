# typedlog - Minimalistic log implementation with TypeScript support

<a href="https://www.npmjs.com/package/typedlog"><img src="https://img.shields.io/npm/v/typedlog.svg" alt="NPM Package" /></a> <a href="https://travis-ci.org/not-a-seagull/tlog"><img src="https://travis-ci.org/not-a-seagull/tlog.svg?branch=master" alt="Build Status" /></a> <a href='https://coveralls.io/github/not-a-seagull/tlog?branch=master'><img src='https://coveralls.io/repos/github/not-a-seagull/tlog/badge.svg?branch=master' alt='Coverage Status' /></a>


This library was created due to my dissatisfaction with ulog's lack of Typescript support. This allows one to create logging modules to use in their programs. When minified, typedlog takes up around 2.36 kB of space. When minzipped, typedlog takes up 1.05 kB of space.

## Installation

If you would like to use typedlog in a Node program, install it via `npm` or `yarn`.

```
# npm users
$ npm i --save typedlog
# yarn users
$ yarn add typedlog
```

If you would like to use typedlog inside of the web browser, pull it from [unpkg](unpkg.com).

```
<script src="https://unpkg.com/typedlog" type="text/javascript />
<script type="text/javascript">
// your code here
</script>
```

## Usage

```
const logger = require("typedlog").logger("my-module-name");

logger.info("Starting up!");
logger.debug(`The result of 2+2 is ${2+2}`);
logger.warn("Be aware of what I'm doing");
logger.log("Reached this point in the program");

if (err) {
  logger.error("An error occurred: ", err);
  logger.trace("Made it this far.");
}
```

### Log Level

The "log level" of each module can be set, using one of three strategies:

**1). Set it manually in the logger**

```
const tlog = require("typedlog");
const logger = tlog.logger("my-module-name");

logger.level = tlog.LogLevel.Warn;

logger.error("Outputs an error to the console");
logger.info("Does not output anything");
```

**2). Set it in an environment variable**

```
$ LOG=warn node program.js
```

**3). Set it in the query**

```
https://mysite.com/mypage?log=warn
```

### Custom Transforms

Transforms take the following function signature:

```
type Transform = (args: any[], level: LogLevel, modname: string) => void;
```

For instance, in order to add a transform to preprend the module name to the output:

```
const logger = tlog.logger("my-module-name");
logger.transforms.push((args: any[], level: tlog.LogLevel, modname: string) => {
  args.unshift(`[${modname}]`);
});

logger.log("Hello world!"); // [my-module-name] Hello world!
```

Transforms are applied in the order that they are appended to the `transforms` array.

### Custom console object

By default, typedlog will simply forward logging requests to the `console` global object. However, if a different object is desired, it will have to implement the following interface:

```
type LogFunction = (...args: any[]) => void;

interface ConsoleLikeObject {
  error: LogFunction;
  warn: LogFunction;
  info: LogFunction;
  log: LogFunction;
  debug: LogFunction;
  trace: LogFunction;
}

```

An example of this, using a custom object to write to a file.

```
const fs = require("fs");
const tlog = require("typedlog");
const util = require("util");

const stream = fs.createWriteStream("logs.txt");

let fileOutput = {};
fileOutput.error = fileOutput.warn = fileOutput.info = fileOutput.log = fileOutput.debug = fileOutput.trace = function(...args: any[]) {
  const output = util.format.apply({}, args);
  stream.write(output, "utf8");
}

const logger = tlog.logger("my-module-name", fileOutput);
logger.log("This should go to the file");
```

## Test Suite

typedlog uses [tape](https://github.com/substack/tape) for testing. In order to run the test suite, first install typedlog's development dependencies.

```
# npm users
$ npm ci
# yarn users
$ yarn install

$ npm run test
```

## License

BSD-3-Clause
