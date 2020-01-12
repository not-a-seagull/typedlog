/*
 * src/index.ts
 * tlog - Tiny logging utility with TypeScript support
 *
 * Copyright (c) 2019, not_a_seagull
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * 3. Neither the name of the copyright holder nor the names of its
 *    contributors may be used to endorse or promote products derived from
 *    this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { defaultLvl } from "./default/node-env";
import { LogLevel } from "./level";
import { Transform } from "./transform";

// a log function
type LogFunction = (this: any, ...args: any[]) => void;

// names of logging functions
type LogFunctionName = "error" | "warn" | "info" | "log" | "debug" | "trace";

export interface ConsoleLikeObject {
	error: LogFunction;
  warn: LogFunction;
	info: LogFunction;
	log: LogFunction;
	debug: LogFunction;
  trace: LogFunction;
}

export interface Logger extends ConsoleLikeObject {
  name: string;
  level: LogLevel;
	transforms: Transform[];
}

// instantiate a console-based log function
function createConsoleFunction(logLevel: LogLevel, logName: LogFunctionName, internal: ConsoleLikeObject): LogFunction {
	return function(this: Logger, ...args: any[]) {
		if (this.level <= logLevel) {
			// apply transforms
      for (let i = 0; i < this.transforms.length; i++) {
        this.transforms[i](args);
			}

      internal[logName](args);
		}
	};
}

let defaultLevel: LogLevel | undefined = undefined;

function getDefaultLevel(): LogLevel {
  if (defaultLevel !== undefined) {
    return defaultLevel;
	}
  return (defaultLevel = defaultLvl());
}

// copy LogLevel into a const to help with minification
const ll = LogLevel;

function logger(name: string, internal: ConsoleLikeObject = null): Logger {
	if (!internal) {
    internal = console;
	}

	return {
		name,
		level: getDefaultLevel(),
		error: createConsoleFunction(ll.Error, "error", internal),
		warn: createConsoleFunction(ll.Warn, "warn", internal),
		info: createConsoleFunction(ll.Info, "info", internal),
		log: createConsoleFunction(ll.Log, "log", internal),
    debug: createConsoleFunction(ll.Debug, "debug", internal),
		trace: createConsoleFunction(ll.Trace, "trace", internal),
		transforms: []
	};
}

export {logger, LogLevel, Transform};
