export type Data = number | null | string | Data[];

export const CR = '\r';
export const LF = '\n';
export const CRLF = `${CR}${LF}`;

export enum Prefix {
	SimpleString = '+',
	Error = '-',
	Integer = ':',
	BulkString = '$',
	Array = '*'
}

export const OK = `${Prefix.SimpleString}OK${CRLF}`;
export const NULL = `${Prefix.BulkString}-1${CRLF}`;
