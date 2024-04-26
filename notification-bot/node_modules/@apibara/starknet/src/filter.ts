import { v1alpha2 } from "./proto";

/**
 * Helper functions to create StarkNet data filters.
 */
export const Filter = {
  /**
   * Creates the root filter object.
   */
  create: () => new FilterBuilder(),

  /**
   * Creates a transaction filter.
   */
  transaction: () => new TransactionFilter(),

  /**
   * Creates an event filter.
   */
  event: () => new EventFilter(),

  /**
   * Creates an L2 to L1 message filter.
   */
  message: () => new L2ToL1MessageFilter(),

  /**
   * Creates a new state update filter.
   */
  stateUpdate: () => new StateUpdateFilter(),
};

export class FilterBuilder {
  private inner: v1alpha2.Filter;

  constructor() {
    this.inner = new v1alpha2.Filter();
  }

  /**
   * Include header in the returned data.
   *
   * If the `weak` flag is set, the block header will be included only if any
   * other filter matches.
   */
  withHeader(args?: { weak?: boolean }) {
    const { weak } = args ?? {};
    this.inner.header = { weak };
    return this;
  }

  /**
   * Include transaction data. Use an empty filter to return all transactions.
   */
  addTransaction(
    filterOrBuilder:
      | IEncodableTransactionFilter
      | ((builder: TransactionFilter) => IEncodableTransactionFilter),
  ) {
    this.inner.transactions.push(
      createFilter(filterOrBuilder, () => new TransactionFilter()),
    );
    return this;
  }

  /**
   * Include event data. Use an empty filter to include all events.
   */
  addEvent(
    filterOrBuilder:
      | IEncodable<v1alpha2.IEventFilter>
      | ((builder: EventFilter) => IEncodable<v1alpha2.IEventFilter>),
  ) {
    this.inner.events.push(
      createFilter(filterOrBuilder, () => new EventFilter()),
    );
    return this;
  }

  /**
   * Include messages from L2 to L1. Use an empty filter to include all messages.
   */
  addMessage(
    filterOrBuilder:
      | IEncodable<v1alpha2.IL2ToL1MessageFilter>
      | ((
          builder: L2ToL1MessageFilter,
        ) => IEncodable<v1alpha2.IL2ToL1MessageFilter>),
  ) {
    this.inner.messages.push(
      createFilter(filterOrBuilder, () => new L2ToL1MessageFilter()),
    );
    return this;
  }

  /**
   * Include state updates.
   */
  withStateUpdate(
    filterOrBuilder:
      | IEncodable<v1alpha2.IStateUpdateFilter>
      | ((
          filter: StateUpdateFilter,
        ) => IEncodable<v1alpha2.IStateUpdateFilter>),
  ) {
    this.inner.stateUpdate = createFilter(
      filterOrBuilder,
      () => new StateUpdateFilter(),
    );
    return this;
  }

  /**
   * Returns the filter in encoded form, ready to be added to a request.
   */
  encode(): Uint8Array {
    return v1alpha2.Filter.encode(this.inner).finish();
  }

  /**
   * Returns the filter as a plain object.
   */
  toObject(): v1alpha2.IFilter {
    return this.inner;
  }
}

export class TransactionFilter {
  /**
   * Includes any transaction type.
   */
  any() {
    return new AnyTransactionFilter();
  }
  /**
   * Include invoke transactions, V0
   */
  invokeV0() {
    return new InvokeV0TransactionFilter();
  }

  /**
   * Include invoke transactions, V1
   */
  invokeV1() {
    return new InvokeV1TransactionFilter();
  }

  /**
   * Include deploy transactions
   */
  deploy() {
    return new DeployTransactionFilter();
  }

  /**
   * Include declare transactions
   */
  declare() {
    return new DeclareTransactionFilter();
  }

  /**
   * Include l1 handler transactions
   */
  l1Handler() {
    return new L1HandlerTransactionFilter();
  }

  /**
   * Include deploy account transactions
   */
  deployAccount() {
    return new DeployAccountTransactionFilter();
  }
}

export interface IEncodable<T> {
  encode(): T;
}

export class AnyTransactionFilter
  implements IEncodable<v1alpha2.ITransactionFilter>
{
  encode(): v1alpha2.ITransactionFilter {
    return {};
  }
}

type IEncodableTransactionFilter = IEncodable<v1alpha2.ITransactionFilter>;

export class InvokeV0TransactionFilter implements IEncodableTransactionFilter {
  private inner: v1alpha2.IInvokeTransactionV0Filter;

  constructor() {
    this.inner = {};
  }

  /**
   * Filter by contract address.
   */
  withContractAddress(address: v1alpha2.IFieldElement) {
    this.inner.contractAddress = address;
    return this;
  }

  /**
   * Filter by entry point selector.
   */
  withEntryPointSelector(selector: v1alpha2.IFieldElement) {
    this.inner.entryPointSelector = selector;
    return this;
  }

  /**
   * Filter by calldata prefix.
   */
  withCalldata(calldata: v1alpha2.IFieldElement[]) {
    this.inner.calldata = calldata;
    return this;
  }

  encode(): v1alpha2.ITransactionFilter {
    return {
      invokeV0: this.inner,
    };
  }
}

export class InvokeV1TransactionFilter implements IEncodableTransactionFilter {
  private inner: v1alpha2.IInvokeTransactionV1Filter;

  constructor() {
    this.inner = {};
  }

  /**
   * Filter by sender address.
   */
  withSenderAddress(address: v1alpha2.IFieldElement) {
    this.inner.senderAddress = address;
    return this;
  }

  /**
   * Filter by calldata prefix.
   */
  withCalldata(calldata: v1alpha2.IFieldElement[]) {
    this.inner.calldata = calldata;
    return this;
  }

  encode(): v1alpha2.ITransactionFilter {
    return {
      invokeV1: this.inner,
    };
  }
}

export class DeployTransactionFilter implements IEncodableTransactionFilter {
  private inner: v1alpha2.IDeployTransactionFilter;

  constructor() {
    this.inner = {};
  }

  /**
   * Filter by contract address salt.
   */
  withContractAddressSalt(salt: v1alpha2.IFieldElement) {
    this.inner.contractAddressSalt = salt;
    return this;
  }

  /**
   * Filter by class hash.
   */
  withClassHash(hash: v1alpha2.IFieldElement) {
    this.inner.classHash = hash;
    return this;
  }

  /**
   * Filter by constructor calldata prefix.
   */
  withConstructorCalldata(calldata: v1alpha2.IFieldElement[]) {
    this.inner.constructorCalldata = calldata;
    return this;
  }

  encode(): v1alpha2.ITransactionFilter {
    return {
      deploy: this.inner,
    };
  }
}

export class DeclareTransactionFilter implements IEncodableTransactionFilter {
  private inner: v1alpha2.IDeclareTransactionFilter;

  constructor() {
    this.inner = {};
  }

  /**
   * Filter by sender address.
   */
  withSenderAddress(address: v1alpha2.IFieldElement) {
    this.inner.senderAddress = address;
    return this;
  }

  /**
   * Filter by class hash.
   */
  withClassHash(hash: v1alpha2.IFieldElement) {
    this.inner.classHash = hash;
    return this;
  }

  encode(): v1alpha2.ITransactionFilter {
    return {
      declare: this.inner,
    };
  }
}

export class L1HandlerTransactionFilter implements IEncodableTransactionFilter {
  private inner: v1alpha2.IL1HandlerTransactionFilter;

  constructor() {
    this.inner = {};
  }

  /**
   * Filter by contract address.
   */
  withContractAddress(address: v1alpha2.IFieldElement) {
    this.inner.contractAddress = address;
    return this;
  }

  /**
   * Filter by entry point selector.
   */
  withEntryPointSelector(selector: v1alpha2.IFieldElement) {
    this.inner.entryPointSelector = selector;
    return this;
  }

  /**
   * Filter by calldata prefix.
   */
  withCalldata(calldata: v1alpha2.IFieldElement[]) {
    this.inner.calldata = calldata;
    return this;
  }

  encode(): v1alpha2.ITransactionFilter {
    return {
      l1Handler: this.inner,
    };
  }
}

export class DeployAccountTransactionFilter
  implements IEncodableTransactionFilter
{
  private inner: v1alpha2.IDeployAccountTransactionFilter;

  constructor() {
    this.inner = {};
  }

  /**
   * Filter by contract address salt.
   */
  withContractAddressSalt(salt: v1alpha2.IFieldElement) {
    this.inner.contractAddressSalt = salt;
    return this;
  }

  /**
   * Filter by class hash.
   */
  withClassHash(hash: v1alpha2.IFieldElement) {
    this.inner.classHash = hash;
    return this;
  }

  /**
   * Filter by constructor calldata prefix.
   */
  withConstructorCalldata(calldata: v1alpha2.IFieldElement[]) {
    this.inner.constructorCalldata = calldata;
    return this;
  }

  encode(): v1alpha2.ITransactionFilter {
    return {
      deployAccount: this.inner,
    };
  }
}

export class EventFilter implements IEncodable<v1alpha2.IEventFilter> {
  private inner: v1alpha2.IEventFilter;

  constructor() {
    this.inner = {};
  }

  /**
   * Filter by address emitting the event.
   */
  withFromAddress(address: v1alpha2.IFieldElement) {
    this.inner.fromAddress = address;
    return this;
  }

  /**
   * Filter by keys prefix.
   */
  withKeys(keys: v1alpha2.IFieldElement[]) {
    this.inner.keys = keys;
    return this;
  }

  /**
   * Filter by data prefix.
   */
  withData(data: v1alpha2.IFieldElement[]) {
    this.inner.data = data;
    return this;
  }

  /**
   * Include events emitted by reverted transactions.
   */
  withIncludeReverted(includeReverted: boolean) {
    this.inner.includeReverted = includeReverted;
    return this;
  }

  /**
   * Include the transaction that emitted the event. Defaults to true.
   */
  withIncludeTransaction(includeTransaction: boolean) {
    this.inner.includeTransaction = includeTransaction;
    return this;
  }

  /**
   * Include the receipt of the transaction that emitted the event. Defaults to true.
   */
  withIncludeReceipt(includeReceipt: boolean) {
    this.inner.includeReceipt = includeReceipt;
    return this;
  }

  encode(): v1alpha2.IEventFilter {
    return this.inner;
  }
}

export class L2ToL1MessageFilter
  implements IEncodable<v1alpha2.IL2ToL1MessageFilter>
{
  private inner: v1alpha2.IL2ToL1MessageFilter;

  constructor() {
    this.inner = {};
  }

  /**
   * Filter by destination address.
   */
  withToAddress(address: v1alpha2.IFieldElement) {
    this.inner.toAddress = address;
    return this;
  }

  /**
   * Filter by payload prefix.
   */
  withPayload(payload: v1alpha2.IFieldElement[]) {
    this.inner.payload = payload;
    return this;
  }

  encode(): v1alpha2.IL2ToL1MessageFilter {
    return this.inner;
  }
}

export class StateUpdateFilter
  implements IEncodable<v1alpha2.IStateUpdateFilter>
{
  private inner: v1alpha2.StateUpdateFilter;

  constructor() {
    this.inner = new v1alpha2.StateUpdateFilter();
  }

  /**
   * Includes all storage changes that match the filter.
   */
  addStorageDiff(
    filterOrBuilder:
      | IEncodable<v1alpha2.IStorageDiffFilter>
      | ((
          builder: StorageDiffFilter,
        ) => IEncodable<v1alpha2.IStorageDiffFilter>),
  ) {
    this.inner.storageDiffs.push(
      createFilter(filterOrBuilder, () => new StorageDiffFilter()),
    );
    return this;
  }

  /**
   * Includes all declared contracts that match the filter.
   */
  addDeclaredContract(
    filterOrBuilder:
      | IEncodable<v1alpha2.IDeclaredContractFilter>
      | ((
          builder: DeclaredContractFilter,
        ) => IEncodable<v1alpha2.IDeclaredContractFilter>),
  ) {
    this.inner.declaredContracts.push(
      createFilter(filterOrBuilder, () => new DeclaredContractFilter()),
    );
    return this;
  }

  /**
   * Includes all deployed contracts that match the filter.
   */
  addDeployedContract(
    filterOrBuilder:
      | IEncodable<v1alpha2.IDeployedContractFilter>
      | ((
          builder: DeployedContractFilter,
        ) => IEncodable<v1alpha2.IDeployedContractFilter>),
  ) {
    this.inner.deployedContracts.push(
      createFilter(filterOrBuilder, () => new DeployedContractFilter()),
    );
    return this;
  }

  /**
   * Includes all declared classes that match the filter.
   */
  addDeclaredClass(
    filterOrBuilder:
      | IEncodable<v1alpha2.IDeclaredClassFilter>
      | ((
          builder: DeclaredClassFilter,
        ) => IEncodable<v1alpha2.IDeclaredClassFilter>),
  ) {
    this.inner.declaredClasses.push(
      createFilter(filterOrBuilder, () => new DeclaredClassFilter()),
    );
    return this;
  }

  /**
   * Includes all replaced classes that match the filter.
   */
  addReplacedClass(
    filterOrBuilder:
      | IEncodable<v1alpha2.IReplacedClassFilter>
      | ((
          builder: ReplacedClassFilter,
        ) => IEncodable<v1alpha2.IReplacedClassFilter>),
  ) {
    this.inner.replacedClasses.push(
      createFilter(filterOrBuilder, () => new ReplacedClassFilter()),
    );
    return this;
  }

  /**
   * Includes all nonce updates that match the filter.
   */
  addNonceUpdate(
    filterOrBuilder:
      | IEncodable<v1alpha2.INonceUpdateFilter>
      | ((
          builder: NonceUpdateFilter,
        ) => IEncodable<v1alpha2.INonceUpdateFilter>),
  ) {
    this.inner.nonces.push(
      createFilter(filterOrBuilder, () => new NonceUpdateFilter()),
    );
    return this;
  }

  encode(): v1alpha2.IStateUpdateFilter {
    return this.inner;
  }
}

export class StorageDiffFilter
  implements IEncodable<v1alpha2.IStorageDiffFilter>
{
  private inner: v1alpha2.StorageDiffFilter;

  constructor() {
    this.inner = new v1alpha2.StorageDiffFilter();
  }

  /**
   * Filter by contract address.
   */
  withContractAddress(address: v1alpha2.IFieldElement) {
    this.inner.contractAddress = address;
    return this;
  }

  encode(): v1alpha2.IStorageDiffFilter {
    return this.inner;
  }
}

export class DeclaredContractFilter
  implements IEncodable<v1alpha2.IDeclaredContractFilter>
{
  private inner: v1alpha2.DeclaredContractFilter;

  constructor() {
    this.inner = new v1alpha2.DeclaredContractFilter();
  }

  /**
   * Filter by class hash.
   */
  withClassHash(hash: v1alpha2.IFieldElement) {
    this.inner.classHash = hash;
    return this;
  }

  encode(): v1alpha2.IDeclaredContractFilter {
    return this.inner;
  }
}

export class DeployedContractFilter
  implements IEncodable<v1alpha2.IDeployedContractFilter>
{
  private inner: v1alpha2.DeployedContractFilter;

  constructor() {
    this.inner = new v1alpha2.DeployedContractFilter();
  }

  /**
   * Filter by contract address.
   */
  withContractAddress(address: v1alpha2.IFieldElement) {
    this.inner.contractAddress = address;
    return this;
  }

  /**
   * Filter by class hash.
   */
  withClassHash(hash: v1alpha2.IFieldElement) {
    this.inner.classHash = hash;
    return this;
  }

  encode(): v1alpha2.IDeployedContractFilter {
    return this.inner;
  }
}

export class DeclaredClassFilter
  implements IEncodable<v1alpha2.IDeclaredClassFilter>
{
  private inner: v1alpha2.DeclaredClassFilter;

  constructor() {
    this.inner = new v1alpha2.DeclaredClassFilter();
  }

  /**
   * Filter by class hash.
   */
  withCompiledClassHash(classHash: v1alpha2.IFieldElement) {
    this.inner.compiledClassHash = classHash;
    return this;
  }

  /**
   * Filter by class hash.
   */
  withClassHash(hash: v1alpha2.IFieldElement) {
    this.inner.classHash = hash;
    return this;
  }

  encode(): v1alpha2.IDeclaredClassFilter {
    return this.inner;
  }
}

export class ReplacedClassFilter
  implements IEncodable<v1alpha2.IReplacedClassFilter>
{
  private inner: v1alpha2.ReplacedClassFilter;

  constructor() {
    this.inner = new v1alpha2.ReplacedClassFilter();
  }

  /**
   * Filter by contract address.
   */
  withContractAddress(address: v1alpha2.IFieldElement) {
    this.inner.contractAddress = address;
    return this;
  }

  /**
   * Filter by class hash.
   */
  withClassHash(hash: v1alpha2.IFieldElement) {
    this.inner.classHash = hash;
    return this;
  }

  encode(): v1alpha2.IReplacedClassFilter {
    return this.inner;
  }
}

export class NonceUpdateFilter
  implements IEncodable<v1alpha2.INonceUpdateFilter>
{
  private inner: v1alpha2.NonceUpdateFilter;

  constructor() {
    this.inner = new v1alpha2.NonceUpdateFilter();
  }

  /**
   * Filter by contract address.
   */
  withContractAddress(address: v1alpha2.IFieldElement) {
    this.inner.contractAddress = address;
    return this;
  }

  /**
   * Filter by nonce.
   */
  withNonce(nonce: v1alpha2.IFieldElement) {
    this.inner.nonce = nonce;
    return this;
  }

  encode(): v1alpha2.INonceUpdateFilter {
    return this.inner;
  }
}

function createFilter<T, B>(
  filterOrBuilder: IEncodable<T> | ((builder: B) => IEncodable<T>),
  mk: () => B,
) {
  let filter: IEncodable<T>;
  if (typeof filterOrBuilder === "function") {
    filter = filterOrBuilder(mk());
  } else {
    filter = filterOrBuilder;
  }
  return filter.encode();
}
