/**
 * Simple logger utility for controlling console output
 */

export const logger = {
  // Development logging
  dev: {
    log: (...args: any[]) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(...args);
      }
    },
    error: (...args: any[]) => {
      if (process.env.NODE_ENV === 'development') {
        console.error(...args);
      }
    },
    warn: (...args: any[]) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn(...args);
      }
    },
    info: (...args: any[]) => {
      if (process.env.NODE_ENV === 'development') {
        console.info(...args);
      }
    }
  },
  
  // Production-safe logging (always logs)
  prod: {
    log: (...args: any[]) => console.log(...args),
    error: (...args: any[]) => console.error(...args),
    warn: (...args: any[]) => console.warn(...args),
    info: (...args: any[]) => console.info(...args)
  },
  
  // Silent logging (never logs)
  silent: {
    log: () => {},
    error: () => {},
    warn: () => {},
    info: () => {}
  }
};

// Default logger based on environment
export const log = process.env.NODE_ENV === 'production' ? logger.silent : logger.dev;
