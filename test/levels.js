/*
 * test/levels.js
 * typedlog - Tiny logging utility with TypeScript support
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

require("@babel/register");

const sinon = require("sinon");
const test = require("tape-catch");
const typedlog = require("../dist");

const LogLevels = typedlog.LogLevel;

// levels to test at
const levels = [
  LogLevels.Trace,
  LogLevels.Debug,
  LogLevels.Log,
  LogLevels.Info,
  LogLevels.Warn,
  LogLevels.Error
];

const methodNames = [
  "trace",
  "debug",
  "log",
  "info",
  "warn",
  "error"
];

// sinon mock
function setupMock() {
  let fakeConsole = {};
  for (const method of methodNames) {
    fakeConsole[method] = sinon.fake();
  }
  return fakeConsole;
}

// set up log level testing
for (let i = 0; i < levels.length; i++) {
  let fakeConsole = setupMock();
  test(`Setting logger to log level ${methodNames[i]} functions properly`, (assert) => {
    assert.plan(levels.length);

    const logger = typedlog.logger("testing", fakeConsole);
    logger.level = levels[i];
    for (let j = 0; j < levels.length; j++) {
      logger[methodNames[j]](`Message at level ${methodNames[j]}`);
      if (i < j) {
        assert.equal(fakeConsole[methodNames[j]].callCount, 0, `Method ${methodNames[j]} should not be called`);
      } else {
        assert.equal(fakeConsole[methodNames[j]].callCount, 1, `Method ${methodNames[j]} should be called`);
      }
    }
  });
}
