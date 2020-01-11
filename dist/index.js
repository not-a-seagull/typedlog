"use strict";
exports.__esModule = true;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Error"] = 1] = "Error";
    LogLevel[LogLevel["Warn"] = 2] = "Warn";
    LogLevel[LogLevel["Info"] = 3] = "Info";
    LogLevel[LogLevel["Log"] = 4] = "Log";
    LogLevel[LogLevel["Debug"] = 5] = "Debug";
    LogLevel[LogLevel["Trace"] = 6] = "Trace";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
function createConsoleFunction(logLevel, logName) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.level <= logLevel) {
            console[logName](args);
        }
    };
}
function logger(name) {
    return {
        name: name,
        level: LogLevel.Debug,
        error: createConsoleFunction(LogLevel.Error, "error"),
        warn: createConsoleFunction(LogLevel.Warn, "warn"),
        info: createConsoleFunction(LogLevel.Info, "info"),
        log: createConsoleFunction(LogLevel.Log, "log"),
        debug: createConsoleFunction(LogLevel.Debug, "debug"),
        trace: createConsoleFunction(LogLevel.Trace, "trace")
    };
}
exports.logger = logger;
//# sourceMappingURL=index.js.map