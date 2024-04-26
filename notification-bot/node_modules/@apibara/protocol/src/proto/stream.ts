import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { StreamClient as _apibara_node_v1alpha2_StreamClient, StreamDefinition as _apibara_node_v1alpha2_StreamDefinition } from './apibara/node/v1alpha2/Stream';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  apibara: {
    node: {
      v1alpha2: {
        Cursor: MessageTypeDefinition
        Data: MessageTypeDefinition
        DataFinality: EnumTypeDefinition
        Heartbeat: MessageTypeDefinition
        Invalidate: MessageTypeDefinition
        Stream: SubtypeConstructor<typeof grpc.Client, _apibara_node_v1alpha2_StreamClient> & { service: _apibara_node_v1alpha2_StreamDefinition }
        StreamDataRequest: MessageTypeDefinition
        StreamDataResponse: MessageTypeDefinition
      }
    }
  }
}

