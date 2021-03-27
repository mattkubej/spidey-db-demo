import { CRLF, NULL, Prefix } from './constants';

export function encodeSimpleString(value: string): string {
  return `${Prefix.SimpleString}${value}${CRLF}`;
}

export function encodeBulkString(value: string | null): string {
  if (value === null) return NULL;
  return `${Prefix.BulkString}${value.length}${CRLF}${value}${CRLF}`;
}

export function encodeInteger(value: number): string {
  return `${Prefix.Integer}${value}${CRLF}`;
}

export function encodeArray(values: string[]): string {
  return values.reduce(function (acc, cur) {
    return (acc += cur);
  }, `${Prefix.Array}${values.length}${CRLF}`);
}

export function encodeError(value: string): string {
  return `${Prefix.Error}ERR ${value}${CRLF}`;
}
