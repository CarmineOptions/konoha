// Original file: src/proto/stream.proto

import type { Long } from '@grpc/proto-loader';

export interface Cursor {
  'orderKey'?: (number | string | Long);
  'uniqueKey'?: (Buffer | Uint8Array | string);
}

export interface Cursor__Output {
  'orderKey': (Long);
  'uniqueKey': (Uint8Array);
}
