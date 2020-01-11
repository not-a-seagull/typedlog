export declare enum LogLevel {
    Error = 1,
    Warn = 2,
    Info = 3,
    Log = 4,
    Debug = 5,
    Trace = 6
}
declare type LogFunction = (this: any, ...args: any[]) => void;
export interface Logger {
    name: string;
    error: LogFunction;
    warn: LogFunction;
    info: LogFunction;
    log: LogFunction;
    debug: LogFunction;
    trace: LogFunction;
    level: LogLevel;
}
export declare function logger(name: string): Logger;
export {};
