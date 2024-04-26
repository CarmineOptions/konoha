// Original file: src/proto/stream.proto

import type { Cursor as _apibara_node_v1alpha2_Cursor, Cursor__Output as _apibara_node_v1alpha2_Cursor__Output } from '../../../apibara/node/v1alpha2/Cursor';
import type { DataFinality as _apibara_node_v1alpha2_DataFinality, DataFinality__Output as _apibara_node_v1alpha2_DataFinality__Output } from '../../../apibara/node/v1alpha2/DataFinality';

export interface Data {
  'endCursor'?: (_apibara_node_v1alpha2_Cursor | null);
  'finality'?: (_apibara_node_v1alpha2_DataFinality);
  'data'?: (Buffer | Uint8Array | string)[];
  'cursor'?: (_apibara_node_v1alpha2_Cursor | null);
}

export interface Data__Output {
  'endCursor': (_apibara_node_v1alpha2_Cursor__Output | null);
  'finality': (_apibara_node_v1alpha2_DataFinality__Output);
  'data': (Uint8Array)[];
  'cursor': (_apibara_node_v1alpha2_Cursor__Output | null);
}
