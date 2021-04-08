import { CR, LF, Prefix } from './constants';
import type { Data } from './constants';

type Token = {
  value: Data;
  offset: number;
};

export function decode(value: Buffer): Data {
  const token = parse(value);
  return token.value;
}

function parse(value: Buffer, offset = 0): Token {
  const prefix = String.fromCharCode(value.readUInt8(offset++));

  switch (prefix) {
    case Prefix.SimpleString:
      return decodeSimpleString(value, offset);
    case Prefix.BulkString:
      return decodeBulkString(value, offset);
    case Prefix.Array:
      return decodeArray(value, offset);
    case Prefix.Integer:
      return decodeInteger(value, offset);
    case Prefix.Error: {
      const error = readNext(value, offset);
      throw new Error(String(error.value));
    }
    default:
      throw new Error(`Protocol error: unknown data type prefix '${prefix}'`);
  }
}

function readNext(value: Buffer, offset = 0): Token {
  let tokenValue = '';
  let char = '';

  while (char !== CR && offset < value.length) {
    tokenValue += char;
    char = String.fromCharCode(value.readUInt8(offset++));
  }

  try {
    const nextByte = String.fromCharCode(value.readUInt8(offset++));
    if (nextByte !== LF) throw new Error();
  } catch (e) {
    throw new Error('Protocol error: must terminate with CRLF');
  }

  return {
    value: tokenValue,
    offset,
  };
}

function decodeSimpleString(value: Buffer, offset: number): Token {
  const token = readNext(value, offset);

  return {
    value: token.value,
    offset: token.offset,
  };
}

function decodeBulkString(value: Buffer, offset: number): Token {
  const bytesToken = readNext(value, offset);
  const bytes = parseInt(String(bytesToken.value), 10);
  offset = bytesToken.offset;

  if (Number.isNaN(bytes)) {
    throw new Error('Protocol error: invalid bulk length');
  }

  if (bytes === -1) {
    return {
      value: null,
      offset,
    };
  }

  const bulkStringToken = readNext(value, offset);

  if (String(bulkStringToken.value).length !== bytes) {
    throw new Error('Protocol error: bulk length does not match value length');
  }

  return {
    value: bulkStringToken.value,
    offset: bulkStringToken.offset,
  };
}

function decodeArray(value: Buffer, offset: number): Token {
  const countToken = readNext(value, offset);
  const count = parseInt(String(countToken.value), 10);
  offset = countToken.offset;

  if (Number.isNaN(count)) {
    throw new Error('Protocol error: invalid array length');
  }

  const elements = [];
  for (let i = 0; i < count; i++) {
    const token = parse(value, offset);
    offset = token.offset;
    elements.push(token.value);
  }

  return {
    value: elements,
    offset,
  };
}

function decodeInteger(value: Buffer, offset: number): Token {
  const token = readNext(value, offset);
  const integer = parseInt(String(token.value), 10);

  if (Number.isNaN(integer)) {
    throw new Error('Protocol error: invalid integer');
  }

  return {
    value: integer,
    offset: token.offset,
  };
}
