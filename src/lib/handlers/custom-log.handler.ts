import { nanoid } from "nanoid";

/**
 * @info colors for console msg coloring
 */
const COLORS = {
  Reset: "\x1b[0m",
  Dim: "\x1b[2m",

  hex: (hex: string, bg = false) => hexToAnsi(hex, bg),
};

export const HonoLogger = (message: string, ...rest: string[]) => {
  console.log(
    `${COLORS.Dim}[${new Date().toUTCString()}]:${COLORS.Reset} ${message}`,
    `${rest.join(" ")}`
  );
};

const hexToAnsi = (hex: string, isBg = false) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `\x1b[${isBg ? 48 : 38};2;${r};${g};${b}m`;
};

export const logger = {
  error: (...messages: string[]) => {
    console.log(
      `${COLORS.Dim}[${new Date().toUTCString()}]: ${nanoid()} -${
        COLORS.Reset
      }${COLORS.hex("#d11824ff")} ERROR - ${messages.join("\n")}${COLORS.Reset}`
    );
  },
  debug: (...messages: string[]) => {
    console.log(
      `${COLORS.Dim}[${new Date().toUTCString()}]: -${COLORS.Reset}${COLORS.hex(
        "#da61e7ff"
      )} DEBUG - ${messages.join("\n")}${COLORS.Reset}`
    );
  },
  log: (...messages: string[]) => {
    console.log(
      `${COLORS.Dim}[${new Date().toUTCString()}]: -${COLORS.Reset}${COLORS.hex(
        "#22b872ff"
      )} LOG - ${messages.join("\n")}${COLORS.Reset}`
    );
  },
  warn: (...messages: string[]) => {
    console.log(
      `${COLORS.Dim}[${new Date().toUTCString()}]: ${nanoid()} -${
        COLORS.Reset
      }${COLORS.hex("#bb7339ff")} WARN - ${messages.join("\n")}${COLORS.Reset}`
    );
  },
  verbose: (...messages: string[]) => {
    console.log(
      `${COLORS.Dim}[${new Date().toUTCString()}]: ${nanoid()} -${
        COLORS.Reset
      }${COLORS.hex("#33c7de")} VERBOSE - ${messages.join("\n")}${COLORS.Reset}`
    );
  },
};

/**
 * @use logger.log("Hello")
 */
