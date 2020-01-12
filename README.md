# tlog - Minimalistic log implementation with TypeScript support

This library was created due to my dissatisfaction with ulog's lack of Typescript support. This allows one to create logging modules to use in their programs.

## Usage

```
const logger = require("tlog").logger("my-module-name");

logger.info("Starting up!");
logger.debug(`The result of 2+2 is ${2+2}`);
logger.warn("Be aware of what I'm doing");
logger.log("Reached this point in the program");

if (err) {
  logger.error("An error occurred: ", err);
  logger.trace("Made it this far.");
}
```
