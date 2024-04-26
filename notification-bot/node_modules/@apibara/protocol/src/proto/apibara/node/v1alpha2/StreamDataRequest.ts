// Original file: src/proto/stream.proto

import type { Cursor as _apibara_node_v1alpha2_Cursor, Cursor__Output as _apibara_node_v1alpha2_Cursor__Output } from '../../../apibara/node/v1alpha2/Cursor';
import type { DataFinality as _apibara_node_v1alpha2_DataFinality, DataFinality__Output as _apibara_node_v1alpha2_DataFinality__Output } from '../../../apibara/node/v1alpha2/DataFinality';
import type { Long } from '@grpc/proto-loader';

export interface StreamDataRequest {
  'streamId'?: (number | string | Long);
  'batchSize'?: (number | string | Long);
  'startingCursor'?: (_apibara_node_v1alpha2_Cursor | null);
  'finality'?: (_apibara_node_v1alpha2_DataFinality);
  'filter'?: (Buffer | Uint8Array | string);
  '_streamId'?: "streamId";
  '_batchSize'?: "batchSize";
  '_finality'?: "finality";
}

export interface StreamDataRequest__Output {
  'streamId'?: (Long);
  'batchSize'?: (Long);
  'startingCursor': (_apibara_node_v1alpha2_Cursor__Output | null);
  'finality'?: (_apibara_node_v1alpha2_DataFinality__Output);
  'filter': (Uint8Array);
  '_streamId': "streamId";
  '_batchSize': "batchSize";
  '_finality': "finality";
}
