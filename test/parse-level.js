/*
 * test/parse-level.js
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

require("@babel/register");

const test = require("tape-catch");
const loglevel = require("../dist/level");

const ll = loglevel.LogLevel;

// map to test
const testMap = {
  "trace": ll.Trace,
  "debug": ll.Debug,
  "log": ll.Log,
  "info": ll.Info,
  "warn": ll.Warn,
  "error": ll.Error,
  "1": ll.Error,
  "2": ll.Warn,
  "3": ll.Info,
  "4": ll.Log,
  "5": ll.Debug,
  "6": ll.Trace,
  "TRACE": ll.Trace,
  "InFo": ll.Info,
  "NOTHING": ll.Debug,
  "No-Op": ll.Debug
};

for (const mapping of Object.keys(testMap)) {
  test(`Ensuring "${mapping}" maps to ${testMap[mapping]}`, (assert) => {
    assert.plan(1);
    assert.equal(loglevel.parseLogLevel(mapping), testMap[mapping]);
  });
}
