/**
 * Minimal CLI logger.
 *
 * Colors are used only when writing to a TTY and `NO_COLOR` is not set
 * (https://no-color.org). Informational output goes to stdout; warnings
 * and errors go to stderr.
 */

function useColor(stream) {
  return Boolean(stream.isTTY) && !('NO_COLOR' in process.env);
}

function paint(stream, code, text) {
  return useColor(stream) ? `\u001b[${code}m${text}\u001b[0m` : text;
}

export function info(message = '') {
  process.stdout.write(`${message}\n`);
}

/** Writes `message` to stdout in the accent color (used for the banner). */
export function accent(message) {
  process.stdout.write(`${paint(process.stdout, 36, message)}\n`);
}

export function success(message) {
  process.stdout.write(`${paint(process.stdout, 32, '✔')} ${message}\n`);
}

export function warning(message) {
  process.stderr.write(`${paint(process.stderr, 33, '!')} ${message}\n`);
}

export function error(message) {
  process.stderr.write(`${paint(process.stderr, 31, '✖')} ${message}\n`);
}
