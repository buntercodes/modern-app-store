/**
 * Simple logger utility for controlling console output
 */

export const logger = {
  // Development logging
  dev: {
    log: (...args: unknown[]) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(...args);
      }
    },
    error: (...args: unknown[]) => {
      if (process.env.NODE_ENV === 'development') {
        console.error(...args);
      }
    },
    warn: (...args: unknown[]) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn(...args);
      }
    },
    info: (...args: unknown[]) => {
      if (process.env.NODE_ENV === 'development') {
        console.info(...args);
      }
    }
  },
  
  // Production-safe logging (always logs)
  prod: {
    log: (...args: unknown[]) => console.log(...args),
    error: (...args: unknown[]) => console.error(...args),
    warn: (...args: unknown[]) => console.warn(...args),
    info: (...args: unknown[]) => console.info(...args)
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
