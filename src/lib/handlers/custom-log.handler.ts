/**
 * @info colors for console msg coloring
 */
const COLORS = {
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",

  FgBlack: "\x1b[30m",
  FgRed: "\x1b[31m",
  FgGreen: "\x1b[32m",
  FgYellow: "\x1b[33m",
  FgBlue: "\x1b[34m",
  FgMagenta: "\x1b[35m",
  FgCyan: "\x1b[36m",
  FgWhite: "\x1b[37m",

  BgBlack: "\x1b[40m",
  BgRed: "\x1b[41m",
  BgGreen: "\x1b[42m",
  BgYellow: "\x1b[43m",
  BgBlue: "\x1b[44m",
  BgMagenta: "\x1b[45m",
  BgCyan: "\x1b[46m",
  BgWhite: "\x1b[47m",
};

export const LOG__LEVEL = {
  SUCCESS: "LOG__LEVEL=success",
  INFO: "LOG__LEVEL=info",
  WARN: "LOG__LEVEL=warn",
  DANGER: "LOG__LEVEL=danger",
} as const;

export const customLogger = (message: string, ...rest: string[]) => {
  const timestamp = new Date().toUTCString();

  let coloredMessage = message;
  let coloredTimestamp = timestamp;

  coloredTimestamp = `${COLORS.Underscore}[${timestamp}]${COLORS.Reset}`;
  if (rest.includes(LOG__LEVEL.SUCCESS)) {
    coloredMessage = `${COLORS.FgGreen}${message}${COLORS.Reset}`;
  } else if (rest.includes(LOG__LEVEL.DANGER)) {
    coloredMessage = `${COLORS.FgRed}${message}${COLORS.Reset}`;
  } else if (rest.includes(LOG__LEVEL.INFO)) {
    coloredMessage = `${COLORS.FgCyan}${message}${COLORS.Reset}`;
  } else if (rest.includes(LOG__LEVEL.WARN)) {
    coloredMessage = `${COLORS.FgYellow}${message}${COLORS.Reset}`;
  } else {
    coloredTimestamp = `${COLORS.Dim}[${timestamp}]${COLORS.Reset}`;
    coloredMessage = `${COLORS.FgWhite}${message}${COLORS.Reset}`;
  }

  console.log(`${coloredTimestamp} ${coloredMessage}`, ...rest);
};

/**
 * @use customLogger("Error while updating blog",JSON.stringify({ message: "This is a msg" }),LOG__LEVEL.DANGER);
 */
