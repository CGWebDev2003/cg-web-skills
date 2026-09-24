/**
 * ASCII banner shown above the help text.
 *
 * The banner is decoration only: it is printed when stdout is an interactive
 * terminal wide enough to fit it, so piped output and narrow windows keep the
 * plain text help.
 */

const LINES = [
  ' ██████╗ ██████╗     ██╗    ██╗███████╗██████╗     ███████╗██╗  ██╗██╗██╗     ██╗     ███████╗',
  '██╔════╝██╔════╝     ██║    ██║██╔════╝██╔══██╗    ██╔════╝██║ ██╔╝██║██║     ██║     ██╔════╝',
  '██║     ██║  ███╗    ██║ █╗ ██║█████╗  ██████╔╝    ███████╗█████╔╝ ██║██║     ██║     ███████╗',
  '██║     ██║   ██║    ██║███╗██║██╔══╝  ██╔══██╗    ╚════██║██╔═██╗ ██║██║     ██║     ╚════██║',
  '╚██████╗╚██████╔╝    ╚███╔███╔╝███████╗██████╔╝    ███████║██║  ██╗██║███████╗███████╗███████║',
  ' ╚═════╝ ╚═════╝      ╚══╝╚══╝ ╚══════╝╚═════╝     ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝',
];

export const BANNER = LINES.join('\n');

/** Width of the widest banner line, in terminal columns. */
export const BANNER_WIDTH = Math.max(...LINES.map((line) => [...line].length));

/** Returns true when `stream` is a terminal with room for the banner. */
export function canShowBanner(stream = process.stdout) {
  return Boolean(stream.isTTY) && (stream.columns ?? 0) >= BANNER_WIDTH;
}
