// Original file: src/proto/stream.proto

export const DataFinality = {
  DATA_STATUS_UNKNOWN: 'DATA_STATUS_UNKNOWN',
  DATA_STATUS_PENDING: 'DATA_STATUS_PENDING',
  DATA_STATUS_ACCEPTED: 'DATA_STATUS_ACCEPTED',
  DATA_STATUS_FINALIZED: 'DATA_STATUS_FINALIZED',
} as const;

export type DataFinality =
  | 'DATA_STATUS_UNKNOWN'
  | 0
  | 'DATA_STATUS_PENDING'
  | 1
  | 'DATA_STATUS_ACCEPTED'
  | 2
  | 'DATA_STATUS_FINALIZED'
  | 3

export type DataFinality__Output = typeof DataFinality[keyof typeof DataFinality]
