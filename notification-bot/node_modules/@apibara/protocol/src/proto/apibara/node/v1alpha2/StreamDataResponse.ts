// Original file: src/proto/stream.proto

import type { Invalidate as _apibara_node_v1alpha2_Invalidate, Invalidate__Output as _apibara_node_v1alpha2_Invalidate__Output } from '../../../apibara/node/v1alpha2/Invalidate';
import type { Data as _apibara_node_v1alpha2_Data, Data__Output as _apibara_node_v1alpha2_Data__Output } from '../../../apibara/node/v1alpha2/Data';
import type { Heartbeat as _apibara_node_v1alpha2_Heartbeat, Heartbeat__Output as _apibara_node_v1alpha2_Heartbeat__Output } from '../../../apibara/node/v1alpha2/Heartbeat';
import type { Long } from '@grpc/proto-loader';

export interface StreamDataResponse {
  'streamId'?: (number | string | Long);
  'invalidate'?: (_apibara_node_v1alpha2_Invalidate | null);
  'data'?: (_apibara_node_v1alpha2_Data | null);
  'heartbeat'?: (_apibara_node_v1alpha2_Heartbeat | null);
  'message'?: "invalidate"|"data"|"heartbeat";
}

export interface StreamDataResponse__Output {
  'streamId': (Long);
  'invalidate'?: (_apibara_node_v1alpha2_Invalidate__Output | null);
  'data'?: (_apibara_node_v1alpha2_Data__Output | null);
  'heartbeat'?: (_apibara_node_v1alpha2_Heartbeat__Output | null);
  'message': "invalidate"|"data"|"heartbeat";
}
