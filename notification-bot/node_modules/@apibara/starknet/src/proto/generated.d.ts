import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace apibara. */
export namespace apibara {

    /** Namespace starknet. */
    namespace starknet {

        /** Namespace v1alpha2. */
        namespace v1alpha2 {

            /** Properties of a Filter. */
            interface IFilter {

                /** Filter header */
                header?: (apibara.starknet.v1alpha2.IHeaderFilter|null);

                /** Filter transactions */
                transactions?: (apibara.starknet.v1alpha2.ITransactionFilter[]|null);

                /** Filter stateUpdate */
                stateUpdate?: (apibara.starknet.v1alpha2.IStateUpdateFilter|null);

                /** Filter events */
                events?: (apibara.starknet.v1alpha2.IEventFilter[]|null);

                /** Filter messages */
                messages?: (apibara.starknet.v1alpha2.IL2ToL1MessageFilter[]|null);
            }

            /** Represents a Filter. */
            class Filter implements IFilter {

                /**
                 * Constructs a new Filter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IFilter);

                /** Filter header. */
                public header?: (apibara.starknet.v1alpha2.IHeaderFilter|null);

                /** Filter transactions. */
                public transactions: apibara.starknet.v1alpha2.ITransactionFilter[];

                /** Filter stateUpdate. */
                public stateUpdate?: (apibara.starknet.v1alpha2.IStateUpdateFilter|null);

                /** Filter events. */
                public events: apibara.starknet.v1alpha2.IEventFilter[];

                /** Filter messages. */
                public messages: apibara.starknet.v1alpha2.IL2ToL1MessageFilter[];

                /**
                 * Creates a new Filter instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Filter instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IFilter): apibara.starknet.v1alpha2.Filter;

                /**
                 * Encodes the specified Filter message. Does not implicitly {@link apibara.starknet.v1alpha2.Filter.verify|verify} messages.
                 * @param message Filter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Filter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.Filter.verify|verify} messages.
                 * @param message Filter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Filter message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Filter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.Filter;

                /**
                 * Decodes a Filter message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Filter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.Filter;

                /**
                 * Verifies a Filter message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Filter message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Filter
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.Filter;

                /**
                 * Creates a plain object from a Filter message. Also converts values to other types if specified.
                 * @param message Filter
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.Filter, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Filter to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for Filter
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a HeaderFilter. */
            interface IHeaderFilter {

                /** HeaderFilter weak */
                weak?: (boolean|null);
            }

            /** Represents a HeaderFilter. */
            class HeaderFilter implements IHeaderFilter {

                /**
                 * Constructs a new HeaderFilter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IHeaderFilter);

                /** HeaderFilter weak. */
                public weak: boolean;

                /**
                 * Creates a new HeaderFilter instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns HeaderFilter instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IHeaderFilter): apibara.starknet.v1alpha2.HeaderFilter;

                /**
                 * Encodes the specified HeaderFilter message. Does not implicitly {@link apibara.starknet.v1alpha2.HeaderFilter.verify|verify} messages.
                 * @param message HeaderFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IHeaderFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified HeaderFilter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.HeaderFilter.verify|verify} messages.
                 * @param message HeaderFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IHeaderFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a HeaderFilter message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns HeaderFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.HeaderFilter;

                /**
                 * Decodes a HeaderFilter message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns HeaderFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.HeaderFilter;

                /**
                 * Verifies a HeaderFilter message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a HeaderFilter message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns HeaderFilter
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.HeaderFilter;

                /**
                 * Creates a plain object from a HeaderFilter message. Also converts values to other types if specified.
                 * @param message HeaderFilter
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.HeaderFilter, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this HeaderFilter to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for HeaderFilter
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a TransactionFilter. */
            interface ITransactionFilter {

                /** TransactionFilter invokeV0 */
                invokeV0?: (apibara.starknet.v1alpha2.IInvokeTransactionV0Filter|null);

                /** TransactionFilter invokeV1 */
                invokeV1?: (apibara.starknet.v1alpha2.IInvokeTransactionV1Filter|null);

                /** TransactionFilter deploy */
                deploy?: (apibara.starknet.v1alpha2.IDeployTransactionFilter|null);

                /** TransactionFilter declare */
                declare?: (apibara.starknet.v1alpha2.IDeclareTransactionFilter|null);

                /** TransactionFilter l1Handler */
                l1Handler?: (apibara.starknet.v1alpha2.IL1HandlerTransactionFilter|null);

                /** TransactionFilter deployAccount */
                deployAccount?: (apibara.starknet.v1alpha2.IDeployAccountTransactionFilter|null);
            }

            /** Represents a TransactionFilter. */
            class TransactionFilter implements ITransactionFilter {

                /**
                 * Constructs a new TransactionFilter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.ITransactionFilter);

                /** TransactionFilter invokeV0. */
                public invokeV0?: (apibara.starknet.v1alpha2.IInvokeTransactionV0Filter|null);

                /** TransactionFilter invokeV1. */
                public invokeV1?: (apibara.starknet.v1alpha2.IInvokeTransactionV1Filter|null);

                /** TransactionFilter deploy. */
                public deploy?: (apibara.starknet.v1alpha2.IDeployTransactionFilter|null);

                /** TransactionFilter declare. */
                public declare?: (apibara.starknet.v1alpha2.IDeclareTransactionFilter|null);

                /** TransactionFilter l1Handler. */
                public l1Handler?: (apibara.starknet.v1alpha2.IL1HandlerTransactionFilter|null);

                /** TransactionFilter deployAccount. */
                public deployAccount?: (apibara.starknet.v1alpha2.IDeployAccountTransactionFilter|null);

                /** TransactionFilter filter. */
                public filter?: ("invokeV0"|"invokeV1"|"deploy"|"declare"|"l1Handler"|"deployAccount");

                /**
                 * Creates a new TransactionFilter instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TransactionFilter instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.ITransactionFilter): apibara.starknet.v1alpha2.TransactionFilter;

                /**
                 * Encodes the specified TransactionFilter message. Does not implicitly {@link apibara.starknet.v1alpha2.TransactionFilter.verify|verify} messages.
                 * @param message TransactionFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.ITransactionFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TransactionFilter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.TransactionFilter.verify|verify} messages.
                 * @param message TransactionFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.ITransactionFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TransactionFilter message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TransactionFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.TransactionFilter;

                /**
                 * Decodes a TransactionFilter message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TransactionFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.TransactionFilter;

                /**
                 * Verifies a TransactionFilter message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TransactionFilter message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TransactionFilter
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.TransactionFilter;

                /**
                 * Creates a plain object from a TransactionFilter message. Also converts values to other types if specified.
                 * @param message TransactionFilter
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.TransactionFilter, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TransactionFilter to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for TransactionFilter
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of an InvokeTransactionV0Filter. */
            interface IInvokeTransactionV0Filter {

                /** InvokeTransactionV0Filter contractAddress */
                contractAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** InvokeTransactionV0Filter entryPointSelector */
                entryPointSelector?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** InvokeTransactionV0Filter calldata */
                calldata?: (apibara.starknet.v1alpha2.IFieldElement[]|null);
            }

            /** Represents an InvokeTransactionV0Filter. */
            class InvokeTransactionV0Filter implements IInvokeTransactionV0Filter {

                /**
                 * Constructs a new InvokeTransactionV0Filter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IInvokeTransactionV0Filter);

                /** InvokeTransactionV0Filter contractAddress. */
                public contractAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** InvokeTransactionV0Filter entryPointSelector. */
                public entryPointSelector?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** InvokeTransactionV0Filter calldata. */
                public calldata: apibara.starknet.v1alpha2.IFieldElement[];

                /**
                 * Creates a new InvokeTransactionV0Filter instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns InvokeTransactionV0Filter instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IInvokeTransactionV0Filter): apibara.starknet.v1alpha2.InvokeTransactionV0Filter;

                /**
                 * Encodes the specified InvokeTransactionV0Filter message. Does not implicitly {@link apibara.starknet.v1alpha2.InvokeTransactionV0Filter.verify|verify} messages.
                 * @param message InvokeTransactionV0Filter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IInvokeTransactionV0Filter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified InvokeTransactionV0Filter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.InvokeTransactionV0Filter.verify|verify} messages.
                 * @param message InvokeTransactionV0Filter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IInvokeTransactionV0Filter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an InvokeTransactionV0Filter message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns InvokeTransactionV0Filter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.InvokeTransactionV0Filter;

                /**
                 * Decodes an InvokeTransactionV0Filter message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns InvokeTransactionV0Filter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.InvokeTransactionV0Filter;

                /**
                 * Verifies an InvokeTransactionV0Filter message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an InvokeTransactionV0Filter message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns InvokeTransactionV0Filter
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.InvokeTransactionV0Filter;

                /**
                 * Creates a plain object from an InvokeTransactionV0Filter message. Also converts values to other types if specified.
                 * @param message InvokeTransactionV0Filter
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.InvokeTransactionV0Filter, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this InvokeTransactionV0Filter to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for InvokeTransactionV0Filter
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of an InvokeTransactionV1Filter. */
            interface IInvokeTransactionV1Filter {

                /** InvokeTransactionV1Filter senderAddress */
                senderAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** InvokeTransactionV1Filter calldata */
                calldata?: (apibara.starknet.v1alpha2.IFieldElement[]|null);
            }

            /** Represents an InvokeTransactionV1Filter. */
            class InvokeTransactionV1Filter implements IInvokeTransactionV1Filter {

                /**
                 * Constructs a new InvokeTransactionV1Filter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IInvokeTransactionV1Filter);

                /** InvokeTransactionV1Filter senderAddress. */
                public senderAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** InvokeTransactionV1Filter calldata. */
                public calldata: apibara.starknet.v1alpha2.IFieldElement[];

                /**
                 * Creates a new InvokeTransactionV1Filter instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns InvokeTransactionV1Filter instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IInvokeTransactionV1Filter): apibara.starknet.v1alpha2.InvokeTransactionV1Filter;

                /**
                 * Encodes the specified InvokeTransactionV1Filter message. Does not implicitly {@link apibara.starknet.v1alpha2.InvokeTransactionV1Filter.verify|verify} messages.
                 * @param message InvokeTransactionV1Filter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IInvokeTransactionV1Filter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified InvokeTransactionV1Filter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.InvokeTransactionV1Filter.verify|verify} messages.
                 * @param message InvokeTransactionV1Filter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IInvokeTransactionV1Filter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an InvokeTransactionV1Filter message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns InvokeTransactionV1Filter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.InvokeTransactionV1Filter;

                /**
                 * Decodes an InvokeTransactionV1Filter message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns InvokeTransactionV1Filter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.InvokeTransactionV1Filter;

                /**
                 * Verifies an InvokeTransactionV1Filter message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an InvokeTransactionV1Filter message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns InvokeTransactionV1Filter
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.InvokeTransactionV1Filter;

                /**
                 * Creates a plain object from an InvokeTransactionV1Filter message. Also converts values to other types if specified.
                 * @param message InvokeTransactionV1Filter
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.InvokeTransactionV1Filter, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this InvokeTransactionV1Filter to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for InvokeTransactionV1Filter
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a DeployTransactionFilter. */
            interface IDeployTransactionFilter {

                /** DeployTransactionFilter contractAddressSalt */
                contractAddressSalt?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeployTransactionFilter classHash */
                classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeployTransactionFilter constructorCalldata */
                constructorCalldata?: (apibara.starknet.v1alpha2.IFieldElement[]|null);
            }

            /** Represents a DeployTransactionFilter. */
            class DeployTransactionFilter implements IDeployTransactionFilter {

                /**
                 * Constructs a new DeployTransactionFilter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IDeployTransactionFilter);

                /** DeployTransactionFilter contractAddressSalt. */
                public contractAddressSalt?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeployTransactionFilter classHash. */
                public classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeployTransactionFilter constructorCalldata. */
                public constructorCalldata: apibara.starknet.v1alpha2.IFieldElement[];

                /**
                 * Creates a new DeployTransactionFilter instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns DeployTransactionFilter instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IDeployTransactionFilter): apibara.starknet.v1alpha2.DeployTransactionFilter;

                /**
                 * Encodes the specified DeployTransactionFilter message. Does not implicitly {@link apibara.starknet.v1alpha2.DeployTransactionFilter.verify|verify} messages.
                 * @param message DeployTransactionFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IDeployTransactionFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DeployTransactionFilter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.DeployTransactionFilter.verify|verify} messages.
                 * @param message DeployTransactionFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IDeployTransactionFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DeployTransactionFilter message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DeployTransactionFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.DeployTransactionFilter;

                /**
                 * Decodes a DeployTransactionFilter message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DeployTransactionFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.DeployTransactionFilter;

                /**
                 * Verifies a DeployTransactionFilter message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DeployTransactionFilter message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DeployTransactionFilter
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.DeployTransactionFilter;

                /**
                 * Creates a plain object from a DeployTransactionFilter message. Also converts values to other types if specified.
                 * @param message DeployTransactionFilter
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.DeployTransactionFilter, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DeployTransactionFilter to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for DeployTransactionFilter
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a DeclareTransactionFilter. */
            interface IDeclareTransactionFilter {

                /** DeclareTransactionFilter classHash */
                classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeclareTransactionFilter senderAddress */
                senderAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);
            }

            /** Represents a DeclareTransactionFilter. */
            class DeclareTransactionFilter implements IDeclareTransactionFilter {

                /**
                 * Constructs a new DeclareTransactionFilter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IDeclareTransactionFilter);

                /** DeclareTransactionFilter classHash. */
                public classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeclareTransactionFilter senderAddress. */
                public senderAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /**
                 * Creates a new DeclareTransactionFilter instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns DeclareTransactionFilter instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IDeclareTransactionFilter): apibara.starknet.v1alpha2.DeclareTransactionFilter;

                /**
                 * Encodes the specified DeclareTransactionFilter message. Does not implicitly {@link apibara.starknet.v1alpha2.DeclareTransactionFilter.verify|verify} messages.
                 * @param message DeclareTransactionFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IDeclareTransactionFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DeclareTransactionFilter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.DeclareTransactionFilter.verify|verify} messages.
                 * @param message DeclareTransactionFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IDeclareTransactionFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DeclareTransactionFilter message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DeclareTransactionFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.DeclareTransactionFilter;

                /**
                 * Decodes a DeclareTransactionFilter message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DeclareTransactionFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.DeclareTransactionFilter;

                /**
                 * Verifies a DeclareTransactionFilter message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DeclareTransactionFilter message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DeclareTransactionFilter
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.DeclareTransactionFilter;

                /**
                 * Creates a plain object from a DeclareTransactionFilter message. Also converts values to other types if specified.
                 * @param message DeclareTransactionFilter
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.DeclareTransactionFilter, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DeclareTransactionFilter to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for DeclareTransactionFilter
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a L1HandlerTransactionFilter. */
            interface IL1HandlerTransactionFilter {

                /** L1HandlerTransactionFilter contractAddress */
                contractAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** L1HandlerTransactionFilter entryPointSelector */
                entryPointSelector?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** L1HandlerTransactionFilter calldata */
                calldata?: (apibara.starknet.v1alpha2.IFieldElement[]|null);
            }

            /** Represents a L1HandlerTransactionFilter. */
            class L1HandlerTransactionFilter implements IL1HandlerTransactionFilter {

                /**
                 * Constructs a new L1HandlerTransactionFilter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IL1HandlerTransactionFilter);

                /** L1HandlerTransactionFilter contractAddress. */
                public contractAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** L1HandlerTransactionFilter entryPointSelector. */
                public entryPointSelector?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** L1HandlerTransactionFilter calldata. */
                public calldata: apibara.starknet.v1alpha2.IFieldElement[];

                /**
                 * Creates a new L1HandlerTransactionFilter instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns L1HandlerTransactionFilter instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IL1HandlerTransactionFilter): apibara.starknet.v1alpha2.L1HandlerTransactionFilter;

                /**
                 * Encodes the specified L1HandlerTransactionFilter message. Does not implicitly {@link apibara.starknet.v1alpha2.L1HandlerTransactionFilter.verify|verify} messages.
                 * @param message L1HandlerTransactionFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IL1HandlerTransactionFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified L1HandlerTransactionFilter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.L1HandlerTransactionFilter.verify|verify} messages.
                 * @param message L1HandlerTransactionFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IL1HandlerTransactionFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a L1HandlerTransactionFilter message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns L1HandlerTransactionFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.L1HandlerTransactionFilter;

                /**
                 * Decodes a L1HandlerTransactionFilter message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns L1HandlerTransactionFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.L1HandlerTransactionFilter;

                /**
                 * Verifies a L1HandlerTransactionFilter message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a L1HandlerTransactionFilter message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns L1HandlerTransactionFilter
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.L1HandlerTransactionFilter;

                /**
                 * Creates a plain object from a L1HandlerTransactionFilter message. Also converts values to other types if specified.
                 * @param message L1HandlerTransactionFilter
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.L1HandlerTransactionFilter, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this L1HandlerTransactionFilter to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for L1HandlerTransactionFilter
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a DeployAccountTransactionFilter. */
            interface IDeployAccountTransactionFilter {

                /** DeployAccountTransactionFilter contractAddressSalt */
                contractAddressSalt?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeployAccountTransactionFilter classHash */
                classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeployAccountTransactionFilter constructorCalldata */
                constructorCalldata?: (apibara.starknet.v1alpha2.IFieldElement[]|null);
            }

            /** Represents a DeployAccountTransactionFilter. */
            class DeployAccountTransactionFilter implements IDeployAccountTransactionFilter {

                /**
                 * Constructs a new DeployAccountTransactionFilter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IDeployAccountTransactionFilter);

                /** DeployAccountTransactionFilter contractAddressSalt. */
                public contractAddressSalt?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeployAccountTransactionFilter classHash. */
                public classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeployAccountTransactionFilter constructorCalldata. */
                public constructorCalldata: apibara.starknet.v1alpha2.IFieldElement[];

                /**
                 * Creates a new DeployAccountTransactionFilter instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns DeployAccountTransactionFilter instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IDeployAccountTransactionFilter): apibara.starknet.v1alpha2.DeployAccountTransactionFilter;

                /**
                 * Encodes the specified DeployAccountTransactionFilter message. Does not implicitly {@link apibara.starknet.v1alpha2.DeployAccountTransactionFilter.verify|verify} messages.
                 * @param message DeployAccountTransactionFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IDeployAccountTransactionFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DeployAccountTransactionFilter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.DeployAccountTransactionFilter.verify|verify} messages.
                 * @param message DeployAccountTransactionFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IDeployAccountTransactionFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DeployAccountTransactionFilter message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DeployAccountTransactionFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.DeployAccountTransactionFilter;

                /**
                 * Decodes a DeployAccountTransactionFilter message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DeployAccountTransactionFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.DeployAccountTransactionFilter;

                /**
                 * Verifies a DeployAccountTransactionFilter message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DeployAccountTransactionFilter message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DeployAccountTransactionFilter
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.DeployAccountTransactionFilter;

                /**
                 * Creates a plain object from a DeployAccountTransactionFilter message. Also converts values to other types if specified.
                 * @param message DeployAccountTransactionFilter
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.DeployAccountTransactionFilter, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DeployAccountTransactionFilter to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for DeployAccountTransactionFilter
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a L2ToL1MessageFilter. */
            interface IL2ToL1MessageFilter {

                /** L2ToL1MessageFilter toAddress */
                toAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** L2ToL1MessageFilter payload */
                payload?: (apibara.starknet.v1alpha2.IFieldElement[]|null);
            }

            /** Represents a L2ToL1MessageFilter. */
            class L2ToL1MessageFilter implements IL2ToL1MessageFilter {

                /**
                 * Constructs a new L2ToL1MessageFilter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IL2ToL1MessageFilter);

                /** L2ToL1MessageFilter toAddress. */
                public toAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** L2ToL1MessageFilter payload. */
                public payload: apibara.starknet.v1alpha2.IFieldElement[];

                /**
                 * Creates a new L2ToL1MessageFilter instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns L2ToL1MessageFilter instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IL2ToL1MessageFilter): apibara.starknet.v1alpha2.L2ToL1MessageFilter;

                /**
                 * Encodes the specified L2ToL1MessageFilter message. Does not implicitly {@link apibara.starknet.v1alpha2.L2ToL1MessageFilter.verify|verify} messages.
                 * @param message L2ToL1MessageFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IL2ToL1MessageFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified L2ToL1MessageFilter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.L2ToL1MessageFilter.verify|verify} messages.
                 * @param message L2ToL1MessageFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IL2ToL1MessageFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a L2ToL1MessageFilter message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns L2ToL1MessageFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.L2ToL1MessageFilter;

                /**
                 * Decodes a L2ToL1MessageFilter message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns L2ToL1MessageFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.L2ToL1MessageFilter;

                /**
                 * Verifies a L2ToL1MessageFilter message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a L2ToL1MessageFilter message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns L2ToL1MessageFilter
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.L2ToL1MessageFilter;

                /**
                 * Creates a plain object from a L2ToL1MessageFilter message. Also converts values to other types if specified.
                 * @param message L2ToL1MessageFilter
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.L2ToL1MessageFilter, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this L2ToL1MessageFilter to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for L2ToL1MessageFilter
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of an EventFilter. */
            interface IEventFilter {

                /** EventFilter fromAddress */
                fromAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** EventFilter keys */
                keys?: (apibara.starknet.v1alpha2.IFieldElement[]|null);

                /** EventFilter data */
                data?: (apibara.starknet.v1alpha2.IFieldElement[]|null);

                /** EventFilter includeReverted */
                includeReverted?: (boolean|null);

                /** EventFilter includeTransaction */
                includeTransaction?: (boolean|null);

                /** EventFilter includeReceipt */
                includeReceipt?: (boolean|null);
            }

            /** Represents an EventFilter. */
            class EventFilter implements IEventFilter {

                /**
                 * Constructs a new EventFilter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IEventFilter);

                /** EventFilter fromAddress. */
                public fromAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** EventFilter keys. */
                public keys: apibara.starknet.v1alpha2.IFieldElement[];

                /** EventFilter data. */
                public data: apibara.starknet.v1alpha2.IFieldElement[];

                /** EventFilter includeReverted. */
                public includeReverted?: (boolean|null);

                /** EventFilter includeTransaction. */
                public includeTransaction?: (boolean|null);

                /** EventFilter includeReceipt. */
                public includeReceipt?: (boolean|null);

                /** EventFilter _includeReverted. */
                public _includeReverted?: "includeReverted";

                /** EventFilter _includeTransaction. */
                public _includeTransaction?: "includeTransaction";

                /** EventFilter _includeReceipt. */
                public _includeReceipt?: "includeReceipt";

                /**
                 * Creates a new EventFilter instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns EventFilter instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IEventFilter): apibara.starknet.v1alpha2.EventFilter;

                /**
                 * Encodes the specified EventFilter message. Does not implicitly {@link apibara.starknet.v1alpha2.EventFilter.verify|verify} messages.
                 * @param message EventFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IEventFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified EventFilter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.EventFilter.verify|verify} messages.
                 * @param message EventFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IEventFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an EventFilter message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns EventFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.EventFilter;

                /**
                 * Decodes an EventFilter message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns EventFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.EventFilter;

                /**
                 * Verifies an EventFilter message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an EventFilter message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns EventFilter
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.EventFilter;

                /**
                 * Creates a plain object from an EventFilter message. Also converts values to other types if specified.
                 * @param message EventFilter
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.EventFilter, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this EventFilter to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for EventFilter
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a StateUpdateFilter. */
            interface IStateUpdateFilter {

                /** StateUpdateFilter storageDiffs */
                storageDiffs?: (apibara.starknet.v1alpha2.IStorageDiffFilter[]|null);

                /** StateUpdateFilter declaredContracts */
                declaredContracts?: (apibara.starknet.v1alpha2.IDeclaredContractFilter[]|null);

                /** StateUpdateFilter deployedContracts */
                deployedContracts?: (apibara.starknet.v1alpha2.IDeployedContractFilter[]|null);

                /** StateUpdateFilter nonces */
                nonces?: (apibara.starknet.v1alpha2.INonceUpdateFilter[]|null);

                /** StateUpdateFilter declaredClasses */
                declaredClasses?: (apibara.starknet.v1alpha2.IDeclaredClassFilter[]|null);

                /** StateUpdateFilter replacedClasses */
                replacedClasses?: (apibara.starknet.v1alpha2.IReplacedClassFilter[]|null);
            }

            /** Represents a StateUpdateFilter. */
            class StateUpdateFilter implements IStateUpdateFilter {

                /**
                 * Constructs a new StateUpdateFilter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IStateUpdateFilter);

                /** StateUpdateFilter storageDiffs. */
                public storageDiffs: apibara.starknet.v1alpha2.IStorageDiffFilter[];

                /** StateUpdateFilter declaredContracts. */
                public declaredContracts: apibara.starknet.v1alpha2.IDeclaredContractFilter[];

                /** StateUpdateFilter deployedContracts. */
                public deployedContracts: apibara.starknet.v1alpha2.IDeployedContractFilter[];

                /** StateUpdateFilter nonces. */
                public nonces: apibara.starknet.v1alpha2.INonceUpdateFilter[];

                /** StateUpdateFilter declaredClasses. */
                public declaredClasses: apibara.starknet.v1alpha2.IDeclaredClassFilter[];

                /** StateUpdateFilter replacedClasses. */
                public replacedClasses: apibara.starknet.v1alpha2.IReplacedClassFilter[];

                /**
                 * Creates a new StateUpdateFilter instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns StateUpdateFilter instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IStateUpdateFilter): apibara.starknet.v1alpha2.StateUpdateFilter;

                /**
                 * Encodes the specified StateUpdateFilter message. Does not implicitly {@link apibara.starknet.v1alpha2.StateUpdateFilter.verify|verify} messages.
                 * @param message StateUpdateFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IStateUpdateFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified StateUpdateFilter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.StateUpdateFilter.verify|verify} messages.
                 * @param message StateUpdateFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IStateUpdateFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a StateUpdateFilter message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns StateUpdateFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.StateUpdateFilter;

                /**
                 * Decodes a StateUpdateFilter message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns StateUpdateFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.StateUpdateFilter;

                /**
                 * Verifies a StateUpdateFilter message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a StateUpdateFilter message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns StateUpdateFilter
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.StateUpdateFilter;

                /**
                 * Creates a plain object from a StateUpdateFilter message. Also converts values to other types if specified.
                 * @param message StateUpdateFilter
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.StateUpdateFilter, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this StateUpdateFilter to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for StateUpdateFilter
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a StorageDiffFilter. */
            interface IStorageDiffFilter {

                /** StorageDiffFilter contractAddress */
                contractAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);
            }

            /** Represents a StorageDiffFilter. */
            class StorageDiffFilter implements IStorageDiffFilter {

                /**
                 * Constructs a new StorageDiffFilter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IStorageDiffFilter);

                /** StorageDiffFilter contractAddress. */
                public contractAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /**
                 * Creates a new StorageDiffFilter instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns StorageDiffFilter instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IStorageDiffFilter): apibara.starknet.v1alpha2.StorageDiffFilter;

                /**
                 * Encodes the specified StorageDiffFilter message. Does not implicitly {@link apibara.starknet.v1alpha2.StorageDiffFilter.verify|verify} messages.
                 * @param message StorageDiffFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IStorageDiffFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified StorageDiffFilter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.StorageDiffFilter.verify|verify} messages.
                 * @param message StorageDiffFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IStorageDiffFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a StorageDiffFilter message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns StorageDiffFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.StorageDiffFilter;

                /**
                 * Decodes a StorageDiffFilter message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns StorageDiffFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.StorageDiffFilter;

                /**
                 * Verifies a StorageDiffFilter message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a StorageDiffFilter message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns StorageDiffFilter
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.StorageDiffFilter;

                /**
                 * Creates a plain object from a StorageDiffFilter message. Also converts values to other types if specified.
                 * @param message StorageDiffFilter
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.StorageDiffFilter, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this StorageDiffFilter to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for StorageDiffFilter
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a DeclaredContractFilter. */
            interface IDeclaredContractFilter {

                /** DeclaredContractFilter classHash */
                classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);
            }

            /** Represents a DeclaredContractFilter. */
            class DeclaredContractFilter implements IDeclaredContractFilter {

                /**
                 * Constructs a new DeclaredContractFilter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IDeclaredContractFilter);

                /** DeclaredContractFilter classHash. */
                public classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /**
                 * Creates a new DeclaredContractFilter instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns DeclaredContractFilter instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IDeclaredContractFilter): apibara.starknet.v1alpha2.DeclaredContractFilter;

                /**
                 * Encodes the specified DeclaredContractFilter message. Does not implicitly {@link apibara.starknet.v1alpha2.DeclaredContractFilter.verify|verify} messages.
                 * @param message DeclaredContractFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IDeclaredContractFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DeclaredContractFilter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.DeclaredContractFilter.verify|verify} messages.
                 * @param message DeclaredContractFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IDeclaredContractFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DeclaredContractFilter message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DeclaredContractFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.DeclaredContractFilter;

                /**
                 * Decodes a DeclaredContractFilter message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DeclaredContractFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.DeclaredContractFilter;

                /**
                 * Verifies a DeclaredContractFilter message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DeclaredContractFilter message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DeclaredContractFilter
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.DeclaredContractFilter;

                /**
                 * Creates a plain object from a DeclaredContractFilter message. Also converts values to other types if specified.
                 * @param message DeclaredContractFilter
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.DeclaredContractFilter, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DeclaredContractFilter to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for DeclaredContractFilter
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a DeclaredClassFilter. */
            interface IDeclaredClassFilter {

                /** DeclaredClassFilter classHash */
                classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeclaredClassFilter compiledClassHash */
                compiledClassHash?: (apibara.starknet.v1alpha2.IFieldElement|null);
            }

            /** Represents a DeclaredClassFilter. */
            class DeclaredClassFilter implements IDeclaredClassFilter {

                /**
                 * Constructs a new DeclaredClassFilter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IDeclaredClassFilter);

                /** DeclaredClassFilter classHash. */
                public classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeclaredClassFilter compiledClassHash. */
                public compiledClassHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /**
                 * Creates a new DeclaredClassFilter instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns DeclaredClassFilter instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IDeclaredClassFilter): apibara.starknet.v1alpha2.DeclaredClassFilter;

                /**
                 * Encodes the specified DeclaredClassFilter message. Does not implicitly {@link apibara.starknet.v1alpha2.DeclaredClassFilter.verify|verify} messages.
                 * @param message DeclaredClassFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IDeclaredClassFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DeclaredClassFilter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.DeclaredClassFilter.verify|verify} messages.
                 * @param message DeclaredClassFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IDeclaredClassFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DeclaredClassFilter message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DeclaredClassFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.DeclaredClassFilter;

                /**
                 * Decodes a DeclaredClassFilter message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DeclaredClassFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.DeclaredClassFilter;

                /**
                 * Verifies a DeclaredClassFilter message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DeclaredClassFilter message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DeclaredClassFilter
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.DeclaredClassFilter;

                /**
                 * Creates a plain object from a DeclaredClassFilter message. Also converts values to other types if specified.
                 * @param message DeclaredClassFilter
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.DeclaredClassFilter, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DeclaredClassFilter to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for DeclaredClassFilter
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ReplacedClassFilter. */
            interface IReplacedClassFilter {

                /** ReplacedClassFilter contractAddress */
                contractAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** ReplacedClassFilter classHash */
                classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);
            }

            /** Represents a ReplacedClassFilter. */
            class ReplacedClassFilter implements IReplacedClassFilter {

                /**
                 * Constructs a new ReplacedClassFilter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IReplacedClassFilter);

                /** ReplacedClassFilter contractAddress. */
                public contractAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** ReplacedClassFilter classHash. */
                public classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /**
                 * Creates a new ReplacedClassFilter instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ReplacedClassFilter instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IReplacedClassFilter): apibara.starknet.v1alpha2.ReplacedClassFilter;

                /**
                 * Encodes the specified ReplacedClassFilter message. Does not implicitly {@link apibara.starknet.v1alpha2.ReplacedClassFilter.verify|verify} messages.
                 * @param message ReplacedClassFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IReplacedClassFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ReplacedClassFilter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.ReplacedClassFilter.verify|verify} messages.
                 * @param message ReplacedClassFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IReplacedClassFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ReplacedClassFilter message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ReplacedClassFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.ReplacedClassFilter;

                /**
                 * Decodes a ReplacedClassFilter message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ReplacedClassFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.ReplacedClassFilter;

                /**
                 * Verifies a ReplacedClassFilter message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ReplacedClassFilter message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ReplacedClassFilter
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.ReplacedClassFilter;

                /**
                 * Creates a plain object from a ReplacedClassFilter message. Also converts values to other types if specified.
                 * @param message ReplacedClassFilter
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.ReplacedClassFilter, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ReplacedClassFilter to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ReplacedClassFilter
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a DeployedContractFilter. */
            interface IDeployedContractFilter {

                /** DeployedContractFilter contractAddress */
                contractAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeployedContractFilter classHash */
                classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);
            }

            /** Represents a DeployedContractFilter. */
            class DeployedContractFilter implements IDeployedContractFilter {

                /**
                 * Constructs a new DeployedContractFilter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IDeployedContractFilter);

                /** DeployedContractFilter contractAddress. */
                public contractAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeployedContractFilter classHash. */
                public classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /**
                 * Creates a new DeployedContractFilter instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns DeployedContractFilter instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IDeployedContractFilter): apibara.starknet.v1alpha2.DeployedContractFilter;

                /**
                 * Encodes the specified DeployedContractFilter message. Does not implicitly {@link apibara.starknet.v1alpha2.DeployedContractFilter.verify|verify} messages.
                 * @param message DeployedContractFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IDeployedContractFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DeployedContractFilter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.DeployedContractFilter.verify|verify} messages.
                 * @param message DeployedContractFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IDeployedContractFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DeployedContractFilter message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DeployedContractFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.DeployedContractFilter;

                /**
                 * Decodes a DeployedContractFilter message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DeployedContractFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.DeployedContractFilter;

                /**
                 * Verifies a DeployedContractFilter message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DeployedContractFilter message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DeployedContractFilter
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.DeployedContractFilter;

                /**
                 * Creates a plain object from a DeployedContractFilter message. Also converts values to other types if specified.
                 * @param message DeployedContractFilter
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.DeployedContractFilter, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DeployedContractFilter to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for DeployedContractFilter
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a NonceUpdateFilter. */
            interface INonceUpdateFilter {

                /** NonceUpdateFilter contractAddress */
                contractAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** NonceUpdateFilter nonce */
                nonce?: (apibara.starknet.v1alpha2.IFieldElement|null);
            }

            /** Represents a NonceUpdateFilter. */
            class NonceUpdateFilter implements INonceUpdateFilter {

                /**
                 * Constructs a new NonceUpdateFilter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.INonceUpdateFilter);

                /** NonceUpdateFilter contractAddress. */
                public contractAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** NonceUpdateFilter nonce. */
                public nonce?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /**
                 * Creates a new NonceUpdateFilter instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns NonceUpdateFilter instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.INonceUpdateFilter): apibara.starknet.v1alpha2.NonceUpdateFilter;

                /**
                 * Encodes the specified NonceUpdateFilter message. Does not implicitly {@link apibara.starknet.v1alpha2.NonceUpdateFilter.verify|verify} messages.
                 * @param message NonceUpdateFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.INonceUpdateFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified NonceUpdateFilter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.NonceUpdateFilter.verify|verify} messages.
                 * @param message NonceUpdateFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.INonceUpdateFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a NonceUpdateFilter message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns NonceUpdateFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.NonceUpdateFilter;

                /**
                 * Decodes a NonceUpdateFilter message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns NonceUpdateFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.NonceUpdateFilter;

                /**
                 * Verifies a NonceUpdateFilter message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a NonceUpdateFilter message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns NonceUpdateFilter
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.NonceUpdateFilter;

                /**
                 * Creates a plain object from a NonceUpdateFilter message. Also converts values to other types if specified.
                 * @param message NonceUpdateFilter
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.NonceUpdateFilter, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this NonceUpdateFilter to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for NonceUpdateFilter
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a FieldElement. */
            interface IFieldElement {

                /** FieldElement loLo */
                loLo?: (number|Long|null);

                /** FieldElement loHi */
                loHi?: (number|Long|null);

                /** FieldElement hiLo */
                hiLo?: (number|Long|null);

                /** FieldElement hiHi */
                hiHi?: (number|Long|null);
            }

            /** Represents a FieldElement. */
            class FieldElement implements IFieldElement {

                /**
                 * Constructs a new FieldElement.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IFieldElement);

                /** FieldElement loLo. */
                public loLo: (number|Long);

                /** FieldElement loHi. */
                public loHi: (number|Long);

                /** FieldElement hiLo. */
                public hiLo: (number|Long);

                /** FieldElement hiHi. */
                public hiHi: (number|Long);

                /**
                 * Creates a new FieldElement instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns FieldElement instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IFieldElement): apibara.starknet.v1alpha2.FieldElement;

                /**
                 * Encodes the specified FieldElement message. Does not implicitly {@link apibara.starknet.v1alpha2.FieldElement.verify|verify} messages.
                 * @param message FieldElement message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IFieldElement, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified FieldElement message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.FieldElement.verify|verify} messages.
                 * @param message FieldElement message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IFieldElement, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a FieldElement message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns FieldElement
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.FieldElement;

                /**
                 * Decodes a FieldElement message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns FieldElement
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.FieldElement;

                /**
                 * Verifies a FieldElement message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a FieldElement message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns FieldElement
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.FieldElement;

                /**
                 * Creates a plain object from a FieldElement message. Also converts values to other types if specified.
                 * @param message FieldElement
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.FieldElement, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this FieldElement to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for FieldElement
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a Block. */
            interface IBlock {

                /** Block status */
                status?: (apibara.starknet.v1alpha2.BlockStatus|null);

                /** Block header */
                header?: (apibara.starknet.v1alpha2.IBlockHeader|null);

                /** Block transactions */
                transactions?: (apibara.starknet.v1alpha2.ITransactionWithReceipt[]|null);

                /** Block stateUpdate */
                stateUpdate?: (apibara.starknet.v1alpha2.IStateUpdate|null);

                /** Block events */
                events?: (apibara.starknet.v1alpha2.IEventWithTransaction[]|null);

                /** Block l2ToL1Messages */
                l2ToL1Messages?: (apibara.starknet.v1alpha2.IL2ToL1MessageWithTransaction[]|null);

                /** Block empty */
                empty?: (boolean|null);
            }

            /** Represents a Block. */
            class Block implements IBlock {

                /**
                 * Constructs a new Block.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IBlock);

                /** Block status. */
                public status: apibara.starknet.v1alpha2.BlockStatus;

                /** Block header. */
                public header?: (apibara.starknet.v1alpha2.IBlockHeader|null);

                /** Block transactions. */
                public transactions: apibara.starknet.v1alpha2.ITransactionWithReceipt[];

                /** Block stateUpdate. */
                public stateUpdate?: (apibara.starknet.v1alpha2.IStateUpdate|null);

                /** Block events. */
                public events: apibara.starknet.v1alpha2.IEventWithTransaction[];

                /** Block l2ToL1Messages. */
                public l2ToL1Messages: apibara.starknet.v1alpha2.IL2ToL1MessageWithTransaction[];

                /** Block empty. */
                public empty: boolean;

                /**
                 * Creates a new Block instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Block instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IBlock): apibara.starknet.v1alpha2.Block;

                /**
                 * Encodes the specified Block message. Does not implicitly {@link apibara.starknet.v1alpha2.Block.verify|verify} messages.
                 * @param message Block message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IBlock, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Block message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.Block.verify|verify} messages.
                 * @param message Block message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IBlock, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Block message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Block
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.Block;

                /**
                 * Decodes a Block message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Block
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.Block;

                /**
                 * Verifies a Block message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Block message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Block
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.Block;

                /**
                 * Creates a plain object from a Block message. Also converts values to other types if specified.
                 * @param message Block
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.Block, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Block to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for Block
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a BlockHeader. */
            interface IBlockHeader {

                /** BlockHeader blockHash */
                blockHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** BlockHeader parentBlockHash */
                parentBlockHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** BlockHeader blockNumber */
                blockNumber?: (number|Long|null);

                /** BlockHeader sequencerAddress */
                sequencerAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** BlockHeader newRoot */
                newRoot?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** BlockHeader timestamp */
                timestamp?: (google.protobuf.ITimestamp|null);

                /** BlockHeader starknetVersion */
                starknetVersion?: (string|null);

                /** BlockHeader l1GasPrice */
                l1GasPrice?: (apibara.starknet.v1alpha2.IResourcePrice|null);

                /** BlockHeader l1DataGasPrice */
                l1DataGasPrice?: (apibara.starknet.v1alpha2.IResourcePrice|null);

                /** BlockHeader l1DataAvailabilityMode */
                l1DataAvailabilityMode?: (apibara.starknet.v1alpha2.L1DataAvailabilityMode|null);
            }

            /** Represents a BlockHeader. */
            class BlockHeader implements IBlockHeader {

                /**
                 * Constructs a new BlockHeader.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IBlockHeader);

                /** BlockHeader blockHash. */
                public blockHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** BlockHeader parentBlockHash. */
                public parentBlockHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** BlockHeader blockNumber. */
                public blockNumber: (number|Long);

                /** BlockHeader sequencerAddress. */
                public sequencerAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** BlockHeader newRoot. */
                public newRoot?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** BlockHeader timestamp. */
                public timestamp?: (google.protobuf.ITimestamp|null);

                /** BlockHeader starknetVersion. */
                public starknetVersion: string;

                /** BlockHeader l1GasPrice. */
                public l1GasPrice?: (apibara.starknet.v1alpha2.IResourcePrice|null);

                /** BlockHeader l1DataGasPrice. */
                public l1DataGasPrice?: (apibara.starknet.v1alpha2.IResourcePrice|null);

                /** BlockHeader l1DataAvailabilityMode. */
                public l1DataAvailabilityMode: apibara.starknet.v1alpha2.L1DataAvailabilityMode;

                /**
                 * Creates a new BlockHeader instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns BlockHeader instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IBlockHeader): apibara.starknet.v1alpha2.BlockHeader;

                /**
                 * Encodes the specified BlockHeader message. Does not implicitly {@link apibara.starknet.v1alpha2.BlockHeader.verify|verify} messages.
                 * @param message BlockHeader message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IBlockHeader, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified BlockHeader message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.BlockHeader.verify|verify} messages.
                 * @param message BlockHeader message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IBlockHeader, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a BlockHeader message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns BlockHeader
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.BlockHeader;

                /**
                 * Decodes a BlockHeader message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns BlockHeader
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.BlockHeader;

                /**
                 * Verifies a BlockHeader message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a BlockHeader message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns BlockHeader
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.BlockHeader;

                /**
                 * Creates a plain object from a BlockHeader message. Also converts values to other types if specified.
                 * @param message BlockHeader
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.BlockHeader, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this BlockHeader to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for BlockHeader
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** L1DataAvailabilityMode enum. */
            enum L1DataAvailabilityMode {
                L1_DATA_AVAILABILITY_MODE_UNSPECIFIED = 0,
                L1_DATA_AVAILABILITY_MODE_BLOB = 1,
                L1_DATA_AVAILABILITY_MODE_CALLDATA = 2
            }

            /** BlockStatus enum. */
            enum BlockStatus {
                BLOCK_STATUS_UNSPECIFIED = 0,
                BLOCK_STATUS_PENDING = 1,
                BLOCK_STATUS_ACCEPTED_ON_L2 = 2,
                BLOCK_STATUS_ACCEPTED_ON_L1 = 3,
                BLOCK_STATUS_REJECTED = 4
            }

            /** Properties of a TransactionWithReceipt. */
            interface ITransactionWithReceipt {

                /** TransactionWithReceipt transaction */
                transaction?: (apibara.starknet.v1alpha2.ITransaction|null);

                /** TransactionWithReceipt receipt */
                receipt?: (apibara.starknet.v1alpha2.ITransactionReceipt|null);
            }

            /** Represents a TransactionWithReceipt. */
            class TransactionWithReceipt implements ITransactionWithReceipt {

                /**
                 * Constructs a new TransactionWithReceipt.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.ITransactionWithReceipt);

                /** TransactionWithReceipt transaction. */
                public transaction?: (apibara.starknet.v1alpha2.ITransaction|null);

                /** TransactionWithReceipt receipt. */
                public receipt?: (apibara.starknet.v1alpha2.ITransactionReceipt|null);

                /**
                 * Creates a new TransactionWithReceipt instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TransactionWithReceipt instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.ITransactionWithReceipt): apibara.starknet.v1alpha2.TransactionWithReceipt;

                /**
                 * Encodes the specified TransactionWithReceipt message. Does not implicitly {@link apibara.starknet.v1alpha2.TransactionWithReceipt.verify|verify} messages.
                 * @param message TransactionWithReceipt message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.ITransactionWithReceipt, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TransactionWithReceipt message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.TransactionWithReceipt.verify|verify} messages.
                 * @param message TransactionWithReceipt message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.ITransactionWithReceipt, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TransactionWithReceipt message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TransactionWithReceipt
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.TransactionWithReceipt;

                /**
                 * Decodes a TransactionWithReceipt message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TransactionWithReceipt
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.TransactionWithReceipt;

                /**
                 * Verifies a TransactionWithReceipt message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TransactionWithReceipt message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TransactionWithReceipt
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.TransactionWithReceipt;

                /**
                 * Creates a plain object from a TransactionWithReceipt message. Also converts values to other types if specified.
                 * @param message TransactionWithReceipt
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.TransactionWithReceipt, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TransactionWithReceipt to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for TransactionWithReceipt
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a Transaction. */
            interface ITransaction {

                /** Transaction meta */
                meta?: (apibara.starknet.v1alpha2.ITransactionMeta|null);

                /** Transaction invokeV0 */
                invokeV0?: (apibara.starknet.v1alpha2.IInvokeTransactionV0|null);

                /** Transaction invokeV1 */
                invokeV1?: (apibara.starknet.v1alpha2.IInvokeTransactionV1|null);

                /** Transaction deploy */
                deploy?: (apibara.starknet.v1alpha2.IDeployTransaction|null);

                /** Transaction declare */
                declare?: (apibara.starknet.v1alpha2.IDeclareTransaction|null);

                /** Transaction l1Handler */
                l1Handler?: (apibara.starknet.v1alpha2.IL1HandlerTransaction|null);

                /** Transaction deployAccount */
                deployAccount?: (apibara.starknet.v1alpha2.IDeployAccountTransaction|null);

                /** Transaction deployAccountV3 */
                deployAccountV3?: (apibara.starknet.v1alpha2.IDeployAccountTransactionV3|null);

                /** Transaction invokeV3 */
                invokeV3?: (apibara.starknet.v1alpha2.IInvokeTransactionV3|null);

                /** Transaction declareV3 */
                declareV3?: (apibara.starknet.v1alpha2.IDeclareTransactionV3|null);
            }

            /** Represents a Transaction. */
            class Transaction implements ITransaction {

                /**
                 * Constructs a new Transaction.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.ITransaction);

                /** Transaction meta. */
                public meta?: (apibara.starknet.v1alpha2.ITransactionMeta|null);

                /** Transaction invokeV0. */
                public invokeV0?: (apibara.starknet.v1alpha2.IInvokeTransactionV0|null);

                /** Transaction invokeV1. */
                public invokeV1?: (apibara.starknet.v1alpha2.IInvokeTransactionV1|null);

                /** Transaction deploy. */
                public deploy?: (apibara.starknet.v1alpha2.IDeployTransaction|null);

                /** Transaction declare. */
                public declare?: (apibara.starknet.v1alpha2.IDeclareTransaction|null);

                /** Transaction l1Handler. */
                public l1Handler?: (apibara.starknet.v1alpha2.IL1HandlerTransaction|null);

                /** Transaction deployAccount. */
                public deployAccount?: (apibara.starknet.v1alpha2.IDeployAccountTransaction|null);

                /** Transaction deployAccountV3. */
                public deployAccountV3?: (apibara.starknet.v1alpha2.IDeployAccountTransactionV3|null);

                /** Transaction invokeV3. */
                public invokeV3?: (apibara.starknet.v1alpha2.IInvokeTransactionV3|null);

                /** Transaction declareV3. */
                public declareV3?: (apibara.starknet.v1alpha2.IDeclareTransactionV3|null);

                /** Transaction transaction. */
                public transaction?: ("invokeV0"|"invokeV1"|"deploy"|"declare"|"l1Handler"|"deployAccount"|"deployAccountV3"|"invokeV3"|"declareV3");

                /**
                 * Creates a new Transaction instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Transaction instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.ITransaction): apibara.starknet.v1alpha2.Transaction;

                /**
                 * Encodes the specified Transaction message. Does not implicitly {@link apibara.starknet.v1alpha2.Transaction.verify|verify} messages.
                 * @param message Transaction message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.ITransaction, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Transaction message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.Transaction.verify|verify} messages.
                 * @param message Transaction message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.ITransaction, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Transaction message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Transaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.Transaction;

                /**
                 * Decodes a Transaction message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Transaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.Transaction;

                /**
                 * Verifies a Transaction message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Transaction message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Transaction
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.Transaction;

                /**
                 * Creates a plain object from a Transaction message. Also converts values to other types if specified.
                 * @param message Transaction
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.Transaction, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Transaction to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for Transaction
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a TransactionMeta. */
            interface ITransactionMeta {

                /** TransactionMeta hash */
                hash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** TransactionMeta maxFee */
                maxFee?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** TransactionMeta signature */
                signature?: (apibara.starknet.v1alpha2.IFieldElement[]|null);

                /** TransactionMeta nonce */
                nonce?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** TransactionMeta version */
                version?: (number|Long|null);

                /** TransactionMeta resourceBounds */
                resourceBounds?: (apibara.starknet.v1alpha2.IResourceBoundsMapping|null);

                /** TransactionMeta tip */
                tip?: (number|Long|null);

                /** TransactionMeta paymasterData */
                paymasterData?: (apibara.starknet.v1alpha2.IFieldElement[]|null);

                /** TransactionMeta nonceDataAvailabilityMode */
                nonceDataAvailabilityMode?: (apibara.starknet.v1alpha2.DataAvailabilityMode|null);

                /** TransactionMeta feeDataAvailabilityMode */
                feeDataAvailabilityMode?: (apibara.starknet.v1alpha2.DataAvailabilityMode|null);

                /** TransactionMeta transactionIndex */
                transactionIndex?: (number|Long|null);
            }

            /** Represents a TransactionMeta. */
            class TransactionMeta implements ITransactionMeta {

                /**
                 * Constructs a new TransactionMeta.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.ITransactionMeta);

                /** TransactionMeta hash. */
                public hash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** TransactionMeta maxFee. */
                public maxFee?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** TransactionMeta signature. */
                public signature: apibara.starknet.v1alpha2.IFieldElement[];

                /** TransactionMeta nonce. */
                public nonce?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** TransactionMeta version. */
                public version: (number|Long);

                /** TransactionMeta resourceBounds. */
                public resourceBounds?: (apibara.starknet.v1alpha2.IResourceBoundsMapping|null);

                /** TransactionMeta tip. */
                public tip: (number|Long);

                /** TransactionMeta paymasterData. */
                public paymasterData: apibara.starknet.v1alpha2.IFieldElement[];

                /** TransactionMeta nonceDataAvailabilityMode. */
                public nonceDataAvailabilityMode: apibara.starknet.v1alpha2.DataAvailabilityMode;

                /** TransactionMeta feeDataAvailabilityMode. */
                public feeDataAvailabilityMode: apibara.starknet.v1alpha2.DataAvailabilityMode;

                /** TransactionMeta transactionIndex. */
                public transactionIndex: (number|Long);

                /**
                 * Creates a new TransactionMeta instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TransactionMeta instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.ITransactionMeta): apibara.starknet.v1alpha2.TransactionMeta;

                /**
                 * Encodes the specified TransactionMeta message. Does not implicitly {@link apibara.starknet.v1alpha2.TransactionMeta.verify|verify} messages.
                 * @param message TransactionMeta message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.ITransactionMeta, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TransactionMeta message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.TransactionMeta.verify|verify} messages.
                 * @param message TransactionMeta message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.ITransactionMeta, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TransactionMeta message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TransactionMeta
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.TransactionMeta;

                /**
                 * Decodes a TransactionMeta message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TransactionMeta
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.TransactionMeta;

                /**
                 * Verifies a TransactionMeta message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TransactionMeta message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TransactionMeta
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.TransactionMeta;

                /**
                 * Creates a plain object from a TransactionMeta message. Also converts values to other types if specified.
                 * @param message TransactionMeta
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.TransactionMeta, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TransactionMeta to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for TransactionMeta
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of an InvokeTransactionV0. */
            interface IInvokeTransactionV0 {

                /** InvokeTransactionV0 contractAddress */
                contractAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** InvokeTransactionV0 entryPointSelector */
                entryPointSelector?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** InvokeTransactionV0 calldata */
                calldata?: (apibara.starknet.v1alpha2.IFieldElement[]|null);
            }

            /** Represents an InvokeTransactionV0. */
            class InvokeTransactionV0 implements IInvokeTransactionV0 {

                /**
                 * Constructs a new InvokeTransactionV0.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IInvokeTransactionV0);

                /** InvokeTransactionV0 contractAddress. */
                public contractAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** InvokeTransactionV0 entryPointSelector. */
                public entryPointSelector?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** InvokeTransactionV0 calldata. */
                public calldata: apibara.starknet.v1alpha2.IFieldElement[];

                /**
                 * Creates a new InvokeTransactionV0 instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns InvokeTransactionV0 instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IInvokeTransactionV0): apibara.starknet.v1alpha2.InvokeTransactionV0;

                /**
                 * Encodes the specified InvokeTransactionV0 message. Does not implicitly {@link apibara.starknet.v1alpha2.InvokeTransactionV0.verify|verify} messages.
                 * @param message InvokeTransactionV0 message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IInvokeTransactionV0, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified InvokeTransactionV0 message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.InvokeTransactionV0.verify|verify} messages.
                 * @param message InvokeTransactionV0 message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IInvokeTransactionV0, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an InvokeTransactionV0 message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns InvokeTransactionV0
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.InvokeTransactionV0;

                /**
                 * Decodes an InvokeTransactionV0 message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns InvokeTransactionV0
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.InvokeTransactionV0;

                /**
                 * Verifies an InvokeTransactionV0 message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an InvokeTransactionV0 message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns InvokeTransactionV0
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.InvokeTransactionV0;

                /**
                 * Creates a plain object from an InvokeTransactionV0 message. Also converts values to other types if specified.
                 * @param message InvokeTransactionV0
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.InvokeTransactionV0, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this InvokeTransactionV0 to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for InvokeTransactionV0
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of an InvokeTransactionV1. */
            interface IInvokeTransactionV1 {

                /** InvokeTransactionV1 senderAddress */
                senderAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** InvokeTransactionV1 calldata */
                calldata?: (apibara.starknet.v1alpha2.IFieldElement[]|null);
            }

            /** Represents an InvokeTransactionV1. */
            class InvokeTransactionV1 implements IInvokeTransactionV1 {

                /**
                 * Constructs a new InvokeTransactionV1.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IInvokeTransactionV1);

                /** InvokeTransactionV1 senderAddress. */
                public senderAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** InvokeTransactionV1 calldata. */
                public calldata: apibara.starknet.v1alpha2.IFieldElement[];

                /**
                 * Creates a new InvokeTransactionV1 instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns InvokeTransactionV1 instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IInvokeTransactionV1): apibara.starknet.v1alpha2.InvokeTransactionV1;

                /**
                 * Encodes the specified InvokeTransactionV1 message. Does not implicitly {@link apibara.starknet.v1alpha2.InvokeTransactionV1.verify|verify} messages.
                 * @param message InvokeTransactionV1 message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IInvokeTransactionV1, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified InvokeTransactionV1 message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.InvokeTransactionV1.verify|verify} messages.
                 * @param message InvokeTransactionV1 message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IInvokeTransactionV1, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an InvokeTransactionV1 message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns InvokeTransactionV1
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.InvokeTransactionV1;

                /**
                 * Decodes an InvokeTransactionV1 message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns InvokeTransactionV1
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.InvokeTransactionV1;

                /**
                 * Verifies an InvokeTransactionV1 message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an InvokeTransactionV1 message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns InvokeTransactionV1
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.InvokeTransactionV1;

                /**
                 * Creates a plain object from an InvokeTransactionV1 message. Also converts values to other types if specified.
                 * @param message InvokeTransactionV1
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.InvokeTransactionV1, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this InvokeTransactionV1 to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for InvokeTransactionV1
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of an InvokeTransactionV3. */
            interface IInvokeTransactionV3 {

                /** InvokeTransactionV3 senderAddress */
                senderAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** InvokeTransactionV3 calldata */
                calldata?: (apibara.starknet.v1alpha2.IFieldElement[]|null);

                /** InvokeTransactionV3 accountDeploymentData */
                accountDeploymentData?: (apibara.starknet.v1alpha2.IFieldElement[]|null);
            }

            /** Represents an InvokeTransactionV3. */
            class InvokeTransactionV3 implements IInvokeTransactionV3 {

                /**
                 * Constructs a new InvokeTransactionV3.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IInvokeTransactionV3);

                /** InvokeTransactionV3 senderAddress. */
                public senderAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** InvokeTransactionV3 calldata. */
                public calldata: apibara.starknet.v1alpha2.IFieldElement[];

                /** InvokeTransactionV3 accountDeploymentData. */
                public accountDeploymentData: apibara.starknet.v1alpha2.IFieldElement[];

                /**
                 * Creates a new InvokeTransactionV3 instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns InvokeTransactionV3 instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IInvokeTransactionV3): apibara.starknet.v1alpha2.InvokeTransactionV3;

                /**
                 * Encodes the specified InvokeTransactionV3 message. Does not implicitly {@link apibara.starknet.v1alpha2.InvokeTransactionV3.verify|verify} messages.
                 * @param message InvokeTransactionV3 message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IInvokeTransactionV3, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified InvokeTransactionV3 message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.InvokeTransactionV3.verify|verify} messages.
                 * @param message InvokeTransactionV3 message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IInvokeTransactionV3, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an InvokeTransactionV3 message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns InvokeTransactionV3
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.InvokeTransactionV3;

                /**
                 * Decodes an InvokeTransactionV3 message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns InvokeTransactionV3
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.InvokeTransactionV3;

                /**
                 * Verifies an InvokeTransactionV3 message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an InvokeTransactionV3 message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns InvokeTransactionV3
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.InvokeTransactionV3;

                /**
                 * Creates a plain object from an InvokeTransactionV3 message. Also converts values to other types if specified.
                 * @param message InvokeTransactionV3
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.InvokeTransactionV3, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this InvokeTransactionV3 to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for InvokeTransactionV3
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a DeployTransaction. */
            interface IDeployTransaction {

                /** DeployTransaction constructorCalldata */
                constructorCalldata?: (apibara.starknet.v1alpha2.IFieldElement[]|null);

                /** DeployTransaction contractAddressSalt */
                contractAddressSalt?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeployTransaction classHash */
                classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);
            }

            /** Represents a DeployTransaction. */
            class DeployTransaction implements IDeployTransaction {

                /**
                 * Constructs a new DeployTransaction.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IDeployTransaction);

                /** DeployTransaction constructorCalldata. */
                public constructorCalldata: apibara.starknet.v1alpha2.IFieldElement[];

                /** DeployTransaction contractAddressSalt. */
                public contractAddressSalt?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeployTransaction classHash. */
                public classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /**
                 * Creates a new DeployTransaction instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns DeployTransaction instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IDeployTransaction): apibara.starknet.v1alpha2.DeployTransaction;

                /**
                 * Encodes the specified DeployTransaction message. Does not implicitly {@link apibara.starknet.v1alpha2.DeployTransaction.verify|verify} messages.
                 * @param message DeployTransaction message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IDeployTransaction, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DeployTransaction message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.DeployTransaction.verify|verify} messages.
                 * @param message DeployTransaction message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IDeployTransaction, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DeployTransaction message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DeployTransaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.DeployTransaction;

                /**
                 * Decodes a DeployTransaction message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DeployTransaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.DeployTransaction;

                /**
                 * Verifies a DeployTransaction message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DeployTransaction message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DeployTransaction
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.DeployTransaction;

                /**
                 * Creates a plain object from a DeployTransaction message. Also converts values to other types if specified.
                 * @param message DeployTransaction
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.DeployTransaction, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DeployTransaction to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for DeployTransaction
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a DeclareTransaction. */
            interface IDeclareTransaction {

                /** DeclareTransaction classHash */
                classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeclareTransaction senderAddress */
                senderAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeclareTransaction compiledClassHash */
                compiledClassHash?: (apibara.starknet.v1alpha2.IFieldElement|null);
            }

            /** Represents a DeclareTransaction. */
            class DeclareTransaction implements IDeclareTransaction {

                /**
                 * Constructs a new DeclareTransaction.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IDeclareTransaction);

                /** DeclareTransaction classHash. */
                public classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeclareTransaction senderAddress. */
                public senderAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeclareTransaction compiledClassHash. */
                public compiledClassHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /**
                 * Creates a new DeclareTransaction instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns DeclareTransaction instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IDeclareTransaction): apibara.starknet.v1alpha2.DeclareTransaction;

                /**
                 * Encodes the specified DeclareTransaction message. Does not implicitly {@link apibara.starknet.v1alpha2.DeclareTransaction.verify|verify} messages.
                 * @param message DeclareTransaction message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IDeclareTransaction, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DeclareTransaction message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.DeclareTransaction.verify|verify} messages.
                 * @param message DeclareTransaction message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IDeclareTransaction, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DeclareTransaction message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DeclareTransaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.DeclareTransaction;

                /**
                 * Decodes a DeclareTransaction message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DeclareTransaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.DeclareTransaction;

                /**
                 * Verifies a DeclareTransaction message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DeclareTransaction message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DeclareTransaction
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.DeclareTransaction;

                /**
                 * Creates a plain object from a DeclareTransaction message. Also converts values to other types if specified.
                 * @param message DeclareTransaction
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.DeclareTransaction, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DeclareTransaction to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for DeclareTransaction
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a DeclareTransactionV3. */
            interface IDeclareTransactionV3 {

                /** DeclareTransactionV3 classHash */
                classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeclareTransactionV3 senderAddress */
                senderAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeclareTransactionV3 compiledClassHash */
                compiledClassHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeclareTransactionV3 accountDeploymentData */
                accountDeploymentData?: (apibara.starknet.v1alpha2.IFieldElement[]|null);
            }

            /** Represents a DeclareTransactionV3. */
            class DeclareTransactionV3 implements IDeclareTransactionV3 {

                /**
                 * Constructs a new DeclareTransactionV3.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IDeclareTransactionV3);

                /** DeclareTransactionV3 classHash. */
                public classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeclareTransactionV3 senderAddress. */
                public senderAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeclareTransactionV3 compiledClassHash. */
                public compiledClassHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeclareTransactionV3 accountDeploymentData. */
                public accountDeploymentData: apibara.starknet.v1alpha2.IFieldElement[];

                /**
                 * Creates a new DeclareTransactionV3 instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns DeclareTransactionV3 instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IDeclareTransactionV3): apibara.starknet.v1alpha2.DeclareTransactionV3;

                /**
                 * Encodes the specified DeclareTransactionV3 message. Does not implicitly {@link apibara.starknet.v1alpha2.DeclareTransactionV3.verify|verify} messages.
                 * @param message DeclareTransactionV3 message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IDeclareTransactionV3, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DeclareTransactionV3 message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.DeclareTransactionV3.verify|verify} messages.
                 * @param message DeclareTransactionV3 message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IDeclareTransactionV3, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DeclareTransactionV3 message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DeclareTransactionV3
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.DeclareTransactionV3;

                /**
                 * Decodes a DeclareTransactionV3 message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DeclareTransactionV3
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.DeclareTransactionV3;

                /**
                 * Verifies a DeclareTransactionV3 message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DeclareTransactionV3 message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DeclareTransactionV3
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.DeclareTransactionV3;

                /**
                 * Creates a plain object from a DeclareTransactionV3 message. Also converts values to other types if specified.
                 * @param message DeclareTransactionV3
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.DeclareTransactionV3, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DeclareTransactionV3 to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for DeclareTransactionV3
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a L1HandlerTransaction. */
            interface IL1HandlerTransaction {

                /** L1HandlerTransaction contractAddress */
                contractAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** L1HandlerTransaction entryPointSelector */
                entryPointSelector?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** L1HandlerTransaction calldata */
                calldata?: (apibara.starknet.v1alpha2.IFieldElement[]|null);
            }

            /** Represents a L1HandlerTransaction. */
            class L1HandlerTransaction implements IL1HandlerTransaction {

                /**
                 * Constructs a new L1HandlerTransaction.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IL1HandlerTransaction);

                /** L1HandlerTransaction contractAddress. */
                public contractAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** L1HandlerTransaction entryPointSelector. */
                public entryPointSelector?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** L1HandlerTransaction calldata. */
                public calldata: apibara.starknet.v1alpha2.IFieldElement[];

                /**
                 * Creates a new L1HandlerTransaction instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns L1HandlerTransaction instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IL1HandlerTransaction): apibara.starknet.v1alpha2.L1HandlerTransaction;

                /**
                 * Encodes the specified L1HandlerTransaction message. Does not implicitly {@link apibara.starknet.v1alpha2.L1HandlerTransaction.verify|verify} messages.
                 * @param message L1HandlerTransaction message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IL1HandlerTransaction, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified L1HandlerTransaction message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.L1HandlerTransaction.verify|verify} messages.
                 * @param message L1HandlerTransaction message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IL1HandlerTransaction, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a L1HandlerTransaction message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns L1HandlerTransaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.L1HandlerTransaction;

                /**
                 * Decodes a L1HandlerTransaction message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns L1HandlerTransaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.L1HandlerTransaction;

                /**
                 * Verifies a L1HandlerTransaction message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a L1HandlerTransaction message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns L1HandlerTransaction
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.L1HandlerTransaction;

                /**
                 * Creates a plain object from a L1HandlerTransaction message. Also converts values to other types if specified.
                 * @param message L1HandlerTransaction
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.L1HandlerTransaction, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this L1HandlerTransaction to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for L1HandlerTransaction
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a DeployAccountTransaction. */
            interface IDeployAccountTransaction {

                /** DeployAccountTransaction constructorCalldata */
                constructorCalldata?: (apibara.starknet.v1alpha2.IFieldElement[]|null);

                /** DeployAccountTransaction contractAddressSalt */
                contractAddressSalt?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeployAccountTransaction classHash */
                classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);
            }

            /** Represents a DeployAccountTransaction. */
            class DeployAccountTransaction implements IDeployAccountTransaction {

                /**
                 * Constructs a new DeployAccountTransaction.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IDeployAccountTransaction);

                /** DeployAccountTransaction constructorCalldata. */
                public constructorCalldata: apibara.starknet.v1alpha2.IFieldElement[];

                /** DeployAccountTransaction contractAddressSalt. */
                public contractAddressSalt?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeployAccountTransaction classHash. */
                public classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /**
                 * Creates a new DeployAccountTransaction instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns DeployAccountTransaction instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IDeployAccountTransaction): apibara.starknet.v1alpha2.DeployAccountTransaction;

                /**
                 * Encodes the specified DeployAccountTransaction message. Does not implicitly {@link apibara.starknet.v1alpha2.DeployAccountTransaction.verify|verify} messages.
                 * @param message DeployAccountTransaction message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IDeployAccountTransaction, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DeployAccountTransaction message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.DeployAccountTransaction.verify|verify} messages.
                 * @param message DeployAccountTransaction message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IDeployAccountTransaction, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DeployAccountTransaction message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DeployAccountTransaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.DeployAccountTransaction;

                /**
                 * Decodes a DeployAccountTransaction message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DeployAccountTransaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.DeployAccountTransaction;

                /**
                 * Verifies a DeployAccountTransaction message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DeployAccountTransaction message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DeployAccountTransaction
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.DeployAccountTransaction;

                /**
                 * Creates a plain object from a DeployAccountTransaction message. Also converts values to other types if specified.
                 * @param message DeployAccountTransaction
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.DeployAccountTransaction, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DeployAccountTransaction to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for DeployAccountTransaction
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a DeployAccountTransactionV3. */
            interface IDeployAccountTransactionV3 {

                /** DeployAccountTransactionV3 constructorCalldata */
                constructorCalldata?: (apibara.starknet.v1alpha2.IFieldElement[]|null);

                /** DeployAccountTransactionV3 contractAddressSalt */
                contractAddressSalt?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeployAccountTransactionV3 classHash */
                classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);
            }

            /** Represents a DeployAccountTransactionV3. */
            class DeployAccountTransactionV3 implements IDeployAccountTransactionV3 {

                /**
                 * Constructs a new DeployAccountTransactionV3.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IDeployAccountTransactionV3);

                /** DeployAccountTransactionV3 constructorCalldata. */
                public constructorCalldata: apibara.starknet.v1alpha2.IFieldElement[];

                /** DeployAccountTransactionV3 contractAddressSalt. */
                public contractAddressSalt?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeployAccountTransactionV3 classHash. */
                public classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /**
                 * Creates a new DeployAccountTransactionV3 instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns DeployAccountTransactionV3 instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IDeployAccountTransactionV3): apibara.starknet.v1alpha2.DeployAccountTransactionV3;

                /**
                 * Encodes the specified DeployAccountTransactionV3 message. Does not implicitly {@link apibara.starknet.v1alpha2.DeployAccountTransactionV3.verify|verify} messages.
                 * @param message DeployAccountTransactionV3 message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IDeployAccountTransactionV3, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DeployAccountTransactionV3 message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.DeployAccountTransactionV3.verify|verify} messages.
                 * @param message DeployAccountTransactionV3 message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IDeployAccountTransactionV3, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DeployAccountTransactionV3 message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DeployAccountTransactionV3
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.DeployAccountTransactionV3;

                /**
                 * Decodes a DeployAccountTransactionV3 message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DeployAccountTransactionV3
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.DeployAccountTransactionV3;

                /**
                 * Verifies a DeployAccountTransactionV3 message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DeployAccountTransactionV3 message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DeployAccountTransactionV3
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.DeployAccountTransactionV3;

                /**
                 * Creates a plain object from a DeployAccountTransactionV3 message. Also converts values to other types if specified.
                 * @param message DeployAccountTransactionV3
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.DeployAccountTransactionV3, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DeployAccountTransactionV3 to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for DeployAccountTransactionV3
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** ExecutionStatus enum. */
            enum ExecutionStatus {
                EXECUTION_STATUS_UNSPECIFIED = 0,
                EXECUTION_STATUS_SUCCEEDED = 1,
                EXECUTION_STATUS_REVERTED = 2
            }

            /** Properties of a TransactionReceipt. */
            interface ITransactionReceipt {

                /** TransactionReceipt transactionHash */
                transactionHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** TransactionReceipt transactionIndex */
                transactionIndex?: (number|Long|null);

                /** TransactionReceipt actualFee */
                actualFee?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** TransactionReceipt l2ToL1Messages */
                l2ToL1Messages?: (apibara.starknet.v1alpha2.IL2ToL1Message[]|null);

                /** TransactionReceipt events */
                events?: (apibara.starknet.v1alpha2.IEvent[]|null);

                /** TransactionReceipt contractAddress */
                contractAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** TransactionReceipt executionStatus */
                executionStatus?: (apibara.starknet.v1alpha2.ExecutionStatus|null);

                /** TransactionReceipt revertReason */
                revertReason?: (string|null);

                /** TransactionReceipt actualFeePaid */
                actualFeePaid?: (apibara.starknet.v1alpha2.IFeePayment|null);

                /** TransactionReceipt executionResources */
                executionResources?: (apibara.starknet.v1alpha2.IExecutionResources|null);
            }

            /** Represents a TransactionReceipt. */
            class TransactionReceipt implements ITransactionReceipt {

                /**
                 * Constructs a new TransactionReceipt.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.ITransactionReceipt);

                /** TransactionReceipt transactionHash. */
                public transactionHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** TransactionReceipt transactionIndex. */
                public transactionIndex: (number|Long);

                /** TransactionReceipt actualFee. */
                public actualFee?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** TransactionReceipt l2ToL1Messages. */
                public l2ToL1Messages: apibara.starknet.v1alpha2.IL2ToL1Message[];

                /** TransactionReceipt events. */
                public events: apibara.starknet.v1alpha2.IEvent[];

                /** TransactionReceipt contractAddress. */
                public contractAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** TransactionReceipt executionStatus. */
                public executionStatus: apibara.starknet.v1alpha2.ExecutionStatus;

                /** TransactionReceipt revertReason. */
                public revertReason: string;

                /** TransactionReceipt actualFeePaid. */
                public actualFeePaid?: (apibara.starknet.v1alpha2.IFeePayment|null);

                /** TransactionReceipt executionResources. */
                public executionResources?: (apibara.starknet.v1alpha2.IExecutionResources|null);

                /**
                 * Creates a new TransactionReceipt instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TransactionReceipt instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.ITransactionReceipt): apibara.starknet.v1alpha2.TransactionReceipt;

                /**
                 * Encodes the specified TransactionReceipt message. Does not implicitly {@link apibara.starknet.v1alpha2.TransactionReceipt.verify|verify} messages.
                 * @param message TransactionReceipt message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.ITransactionReceipt, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TransactionReceipt message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.TransactionReceipt.verify|verify} messages.
                 * @param message TransactionReceipt message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.ITransactionReceipt, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TransactionReceipt message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TransactionReceipt
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.TransactionReceipt;

                /**
                 * Decodes a TransactionReceipt message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TransactionReceipt
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.TransactionReceipt;

                /**
                 * Verifies a TransactionReceipt message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TransactionReceipt message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TransactionReceipt
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.TransactionReceipt;

                /**
                 * Creates a plain object from a TransactionReceipt message. Also converts values to other types if specified.
                 * @param message TransactionReceipt
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.TransactionReceipt, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TransactionReceipt to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for TransactionReceipt
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a L2ToL1MessageWithTransaction. */
            interface IL2ToL1MessageWithTransaction {

                /** L2ToL1MessageWithTransaction transaction */
                transaction?: (apibara.starknet.v1alpha2.ITransaction|null);

                /** L2ToL1MessageWithTransaction receipt */
                receipt?: (apibara.starknet.v1alpha2.ITransactionReceipt|null);

                /** L2ToL1MessageWithTransaction message */
                message?: (apibara.starknet.v1alpha2.IL2ToL1Message|null);
            }

            /** Represents a L2ToL1MessageWithTransaction. */
            class L2ToL1MessageWithTransaction implements IL2ToL1MessageWithTransaction {

                /**
                 * Constructs a new L2ToL1MessageWithTransaction.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IL2ToL1MessageWithTransaction);

                /** L2ToL1MessageWithTransaction transaction. */
                public transaction?: (apibara.starknet.v1alpha2.ITransaction|null);

                /** L2ToL1MessageWithTransaction receipt. */
                public receipt?: (apibara.starknet.v1alpha2.ITransactionReceipt|null);

                /** L2ToL1MessageWithTransaction message. */
                public message?: (apibara.starknet.v1alpha2.IL2ToL1Message|null);

                /**
                 * Creates a new L2ToL1MessageWithTransaction instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns L2ToL1MessageWithTransaction instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IL2ToL1MessageWithTransaction): apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction;

                /**
                 * Encodes the specified L2ToL1MessageWithTransaction message. Does not implicitly {@link apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction.verify|verify} messages.
                 * @param message L2ToL1MessageWithTransaction message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IL2ToL1MessageWithTransaction, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified L2ToL1MessageWithTransaction message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction.verify|verify} messages.
                 * @param message L2ToL1MessageWithTransaction message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IL2ToL1MessageWithTransaction, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a L2ToL1MessageWithTransaction message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns L2ToL1MessageWithTransaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction;

                /**
                 * Decodes a L2ToL1MessageWithTransaction message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns L2ToL1MessageWithTransaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction;

                /**
                 * Verifies a L2ToL1MessageWithTransaction message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a L2ToL1MessageWithTransaction message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns L2ToL1MessageWithTransaction
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction;

                /**
                 * Creates a plain object from a L2ToL1MessageWithTransaction message. Also converts values to other types if specified.
                 * @param message L2ToL1MessageWithTransaction
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this L2ToL1MessageWithTransaction to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for L2ToL1MessageWithTransaction
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a L2ToL1Message. */
            interface IL2ToL1Message {

                /** L2ToL1Message toAddress */
                toAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** L2ToL1Message payload */
                payload?: (apibara.starknet.v1alpha2.IFieldElement[]|null);

                /** L2ToL1Message index */
                index?: (number|Long|null);

                /** L2ToL1Message fromAddress */
                fromAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);
            }

            /** Represents a L2ToL1Message. */
            class L2ToL1Message implements IL2ToL1Message {

                /**
                 * Constructs a new L2ToL1Message.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IL2ToL1Message);

                /** L2ToL1Message toAddress. */
                public toAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** L2ToL1Message payload. */
                public payload: apibara.starknet.v1alpha2.IFieldElement[];

                /** L2ToL1Message index. */
                public index: (number|Long);

                /** L2ToL1Message fromAddress. */
                public fromAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /**
                 * Creates a new L2ToL1Message instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns L2ToL1Message instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IL2ToL1Message): apibara.starknet.v1alpha2.L2ToL1Message;

                /**
                 * Encodes the specified L2ToL1Message message. Does not implicitly {@link apibara.starknet.v1alpha2.L2ToL1Message.verify|verify} messages.
                 * @param message L2ToL1Message message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IL2ToL1Message, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified L2ToL1Message message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.L2ToL1Message.verify|verify} messages.
                 * @param message L2ToL1Message message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IL2ToL1Message, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a L2ToL1Message message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns L2ToL1Message
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.L2ToL1Message;

                /**
                 * Decodes a L2ToL1Message message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns L2ToL1Message
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.L2ToL1Message;

                /**
                 * Verifies a L2ToL1Message message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a L2ToL1Message message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns L2ToL1Message
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.L2ToL1Message;

                /**
                 * Creates a plain object from a L2ToL1Message message. Also converts values to other types if specified.
                 * @param message L2ToL1Message
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.L2ToL1Message, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this L2ToL1Message to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for L2ToL1Message
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of an EventWithTransaction. */
            interface IEventWithTransaction {

                /** EventWithTransaction transaction */
                transaction?: (apibara.starknet.v1alpha2.ITransaction|null);

                /** EventWithTransaction receipt */
                receipt?: (apibara.starknet.v1alpha2.ITransactionReceipt|null);

                /** EventWithTransaction event */
                event?: (apibara.starknet.v1alpha2.IEvent|null);
            }

            /** Represents an EventWithTransaction. */
            class EventWithTransaction implements IEventWithTransaction {

                /**
                 * Constructs a new EventWithTransaction.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IEventWithTransaction);

                /** EventWithTransaction transaction. */
                public transaction?: (apibara.starknet.v1alpha2.ITransaction|null);

                /** EventWithTransaction receipt. */
                public receipt?: (apibara.starknet.v1alpha2.ITransactionReceipt|null);

                /** EventWithTransaction event. */
                public event?: (apibara.starknet.v1alpha2.IEvent|null);

                /**
                 * Creates a new EventWithTransaction instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns EventWithTransaction instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IEventWithTransaction): apibara.starknet.v1alpha2.EventWithTransaction;

                /**
                 * Encodes the specified EventWithTransaction message. Does not implicitly {@link apibara.starknet.v1alpha2.EventWithTransaction.verify|verify} messages.
                 * @param message EventWithTransaction message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IEventWithTransaction, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified EventWithTransaction message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.EventWithTransaction.verify|verify} messages.
                 * @param message EventWithTransaction message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IEventWithTransaction, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an EventWithTransaction message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns EventWithTransaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.EventWithTransaction;

                /**
                 * Decodes an EventWithTransaction message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns EventWithTransaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.EventWithTransaction;

                /**
                 * Verifies an EventWithTransaction message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an EventWithTransaction message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns EventWithTransaction
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.EventWithTransaction;

                /**
                 * Creates a plain object from an EventWithTransaction message. Also converts values to other types if specified.
                 * @param message EventWithTransaction
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.EventWithTransaction, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this EventWithTransaction to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for EventWithTransaction
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of an Event. */
            interface IEvent {

                /** Event fromAddress */
                fromAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** Event keys */
                keys?: (apibara.starknet.v1alpha2.IFieldElement[]|null);

                /** Event data */
                data?: (apibara.starknet.v1alpha2.IFieldElement[]|null);

                /** Event index */
                index?: (number|Long|null);
            }

            /** Represents an Event. */
            class Event implements IEvent {

                /**
                 * Constructs a new Event.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IEvent);

                /** Event fromAddress. */
                public fromAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** Event keys. */
                public keys: apibara.starknet.v1alpha2.IFieldElement[];

                /** Event data. */
                public data: apibara.starknet.v1alpha2.IFieldElement[];

                /** Event index. */
                public index: (number|Long);

                /**
                 * Creates a new Event instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Event instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IEvent): apibara.starknet.v1alpha2.Event;

                /**
                 * Encodes the specified Event message. Does not implicitly {@link apibara.starknet.v1alpha2.Event.verify|verify} messages.
                 * @param message Event message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IEvent, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Event message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.Event.verify|verify} messages.
                 * @param message Event message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IEvent, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an Event message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Event
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.Event;

                /**
                 * Decodes an Event message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Event
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.Event;

                /**
                 * Verifies an Event message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an Event message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Event
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.Event;

                /**
                 * Creates a plain object from an Event message. Also converts values to other types if specified.
                 * @param message Event
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.Event, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Event to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for Event
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a StateUpdate. */
            interface IStateUpdate {

                /** StateUpdate newRoot */
                newRoot?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** StateUpdate oldRoot */
                oldRoot?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** StateUpdate stateDiff */
                stateDiff?: (apibara.starknet.v1alpha2.IStateDiff|null);
            }

            /** Represents a StateUpdate. */
            class StateUpdate implements IStateUpdate {

                /**
                 * Constructs a new StateUpdate.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IStateUpdate);

                /** StateUpdate newRoot. */
                public newRoot?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** StateUpdate oldRoot. */
                public oldRoot?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** StateUpdate stateDiff. */
                public stateDiff?: (apibara.starknet.v1alpha2.IStateDiff|null);

                /**
                 * Creates a new StateUpdate instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns StateUpdate instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IStateUpdate): apibara.starknet.v1alpha2.StateUpdate;

                /**
                 * Encodes the specified StateUpdate message. Does not implicitly {@link apibara.starknet.v1alpha2.StateUpdate.verify|verify} messages.
                 * @param message StateUpdate message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IStateUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified StateUpdate message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.StateUpdate.verify|verify} messages.
                 * @param message StateUpdate message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IStateUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a StateUpdate message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns StateUpdate
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.StateUpdate;

                /**
                 * Decodes a StateUpdate message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns StateUpdate
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.StateUpdate;

                /**
                 * Verifies a StateUpdate message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a StateUpdate message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns StateUpdate
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.StateUpdate;

                /**
                 * Creates a plain object from a StateUpdate message. Also converts values to other types if specified.
                 * @param message StateUpdate
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.StateUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this StateUpdate to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for StateUpdate
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a StateDiff. */
            interface IStateDiff {

                /** StateDiff storageDiffs */
                storageDiffs?: (apibara.starknet.v1alpha2.IStorageDiff[]|null);

                /** StateDiff declaredContracts */
                declaredContracts?: (apibara.starknet.v1alpha2.IDeclaredContract[]|null);

                /** StateDiff deployedContracts */
                deployedContracts?: (apibara.starknet.v1alpha2.IDeployedContract[]|null);

                /** StateDiff nonces */
                nonces?: (apibara.starknet.v1alpha2.INonceUpdate[]|null);

                /** StateDiff declaredClasses */
                declaredClasses?: (apibara.starknet.v1alpha2.IDeclaredClass[]|null);

                /** StateDiff replacedClasses */
                replacedClasses?: (apibara.starknet.v1alpha2.IReplacedClass[]|null);
            }

            /** Represents a StateDiff. */
            class StateDiff implements IStateDiff {

                /**
                 * Constructs a new StateDiff.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IStateDiff);

                /** StateDiff storageDiffs. */
                public storageDiffs: apibara.starknet.v1alpha2.IStorageDiff[];

                /** StateDiff declaredContracts. */
                public declaredContracts: apibara.starknet.v1alpha2.IDeclaredContract[];

                /** StateDiff deployedContracts. */
                public deployedContracts: apibara.starknet.v1alpha2.IDeployedContract[];

                /** StateDiff nonces. */
                public nonces: apibara.starknet.v1alpha2.INonceUpdate[];

                /** StateDiff declaredClasses. */
                public declaredClasses: apibara.starknet.v1alpha2.IDeclaredClass[];

                /** StateDiff replacedClasses. */
                public replacedClasses: apibara.starknet.v1alpha2.IReplacedClass[];

                /**
                 * Creates a new StateDiff instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns StateDiff instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IStateDiff): apibara.starknet.v1alpha2.StateDiff;

                /**
                 * Encodes the specified StateDiff message. Does not implicitly {@link apibara.starknet.v1alpha2.StateDiff.verify|verify} messages.
                 * @param message StateDiff message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IStateDiff, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified StateDiff message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.StateDiff.verify|verify} messages.
                 * @param message StateDiff message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IStateDiff, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a StateDiff message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns StateDiff
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.StateDiff;

                /**
                 * Decodes a StateDiff message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns StateDiff
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.StateDiff;

                /**
                 * Verifies a StateDiff message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a StateDiff message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns StateDiff
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.StateDiff;

                /**
                 * Creates a plain object from a StateDiff message. Also converts values to other types if specified.
                 * @param message StateDiff
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.StateDiff, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this StateDiff to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for StateDiff
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a StorageDiff. */
            interface IStorageDiff {

                /** StorageDiff contractAddress */
                contractAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** StorageDiff storageEntries */
                storageEntries?: (apibara.starknet.v1alpha2.IStorageEntry[]|null);
            }

            /** Represents a StorageDiff. */
            class StorageDiff implements IStorageDiff {

                /**
                 * Constructs a new StorageDiff.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IStorageDiff);

                /** StorageDiff contractAddress. */
                public contractAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** StorageDiff storageEntries. */
                public storageEntries: apibara.starknet.v1alpha2.IStorageEntry[];

                /**
                 * Creates a new StorageDiff instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns StorageDiff instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IStorageDiff): apibara.starknet.v1alpha2.StorageDiff;

                /**
                 * Encodes the specified StorageDiff message. Does not implicitly {@link apibara.starknet.v1alpha2.StorageDiff.verify|verify} messages.
                 * @param message StorageDiff message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IStorageDiff, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified StorageDiff message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.StorageDiff.verify|verify} messages.
                 * @param message StorageDiff message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IStorageDiff, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a StorageDiff message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns StorageDiff
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.StorageDiff;

                /**
                 * Decodes a StorageDiff message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns StorageDiff
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.StorageDiff;

                /**
                 * Verifies a StorageDiff message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a StorageDiff message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns StorageDiff
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.StorageDiff;

                /**
                 * Creates a plain object from a StorageDiff message. Also converts values to other types if specified.
                 * @param message StorageDiff
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.StorageDiff, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this StorageDiff to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for StorageDiff
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a StorageEntry. */
            interface IStorageEntry {

                /** StorageEntry key */
                key?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** StorageEntry value */
                value?: (apibara.starknet.v1alpha2.IFieldElement|null);
            }

            /** Represents a StorageEntry. */
            class StorageEntry implements IStorageEntry {

                /**
                 * Constructs a new StorageEntry.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IStorageEntry);

                /** StorageEntry key. */
                public key?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** StorageEntry value. */
                public value?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /**
                 * Creates a new StorageEntry instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns StorageEntry instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IStorageEntry): apibara.starknet.v1alpha2.StorageEntry;

                /**
                 * Encodes the specified StorageEntry message. Does not implicitly {@link apibara.starknet.v1alpha2.StorageEntry.verify|verify} messages.
                 * @param message StorageEntry message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IStorageEntry, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified StorageEntry message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.StorageEntry.verify|verify} messages.
                 * @param message StorageEntry message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IStorageEntry, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a StorageEntry message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns StorageEntry
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.StorageEntry;

                /**
                 * Decodes a StorageEntry message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns StorageEntry
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.StorageEntry;

                /**
                 * Verifies a StorageEntry message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a StorageEntry message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns StorageEntry
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.StorageEntry;

                /**
                 * Creates a plain object from a StorageEntry message. Also converts values to other types if specified.
                 * @param message StorageEntry
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.StorageEntry, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this StorageEntry to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for StorageEntry
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a DeclaredContract. */
            interface IDeclaredContract {

                /** DeclaredContract classHash */
                classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);
            }

            /** Represents a DeclaredContract. */
            class DeclaredContract implements IDeclaredContract {

                /**
                 * Constructs a new DeclaredContract.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IDeclaredContract);

                /** DeclaredContract classHash. */
                public classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /**
                 * Creates a new DeclaredContract instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns DeclaredContract instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IDeclaredContract): apibara.starknet.v1alpha2.DeclaredContract;

                /**
                 * Encodes the specified DeclaredContract message. Does not implicitly {@link apibara.starknet.v1alpha2.DeclaredContract.verify|verify} messages.
                 * @param message DeclaredContract message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IDeclaredContract, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DeclaredContract message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.DeclaredContract.verify|verify} messages.
                 * @param message DeclaredContract message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IDeclaredContract, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DeclaredContract message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DeclaredContract
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.DeclaredContract;

                /**
                 * Decodes a DeclaredContract message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DeclaredContract
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.DeclaredContract;

                /**
                 * Verifies a DeclaredContract message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DeclaredContract message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DeclaredContract
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.DeclaredContract;

                /**
                 * Creates a plain object from a DeclaredContract message. Also converts values to other types if specified.
                 * @param message DeclaredContract
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.DeclaredContract, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DeclaredContract to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for DeclaredContract
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a DeclaredClass. */
            interface IDeclaredClass {

                /** DeclaredClass classHash */
                classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeclaredClass compiledClassHash */
                compiledClassHash?: (apibara.starknet.v1alpha2.IFieldElement|null);
            }

            /** Represents a DeclaredClass. */
            class DeclaredClass implements IDeclaredClass {

                /**
                 * Constructs a new DeclaredClass.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IDeclaredClass);

                /** DeclaredClass classHash. */
                public classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeclaredClass compiledClassHash. */
                public compiledClassHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /**
                 * Creates a new DeclaredClass instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns DeclaredClass instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IDeclaredClass): apibara.starknet.v1alpha2.DeclaredClass;

                /**
                 * Encodes the specified DeclaredClass message. Does not implicitly {@link apibara.starknet.v1alpha2.DeclaredClass.verify|verify} messages.
                 * @param message DeclaredClass message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IDeclaredClass, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DeclaredClass message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.DeclaredClass.verify|verify} messages.
                 * @param message DeclaredClass message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IDeclaredClass, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DeclaredClass message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DeclaredClass
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.DeclaredClass;

                /**
                 * Decodes a DeclaredClass message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DeclaredClass
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.DeclaredClass;

                /**
                 * Verifies a DeclaredClass message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DeclaredClass message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DeclaredClass
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.DeclaredClass;

                /**
                 * Creates a plain object from a DeclaredClass message. Also converts values to other types if specified.
                 * @param message DeclaredClass
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.DeclaredClass, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DeclaredClass to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for DeclaredClass
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ReplacedClass. */
            interface IReplacedClass {

                /** ReplacedClass contractAddress */
                contractAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** ReplacedClass classHash */
                classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);
            }

            /** Represents a ReplacedClass. */
            class ReplacedClass implements IReplacedClass {

                /**
                 * Constructs a new ReplacedClass.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IReplacedClass);

                /** ReplacedClass contractAddress. */
                public contractAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** ReplacedClass classHash. */
                public classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /**
                 * Creates a new ReplacedClass instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ReplacedClass instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IReplacedClass): apibara.starknet.v1alpha2.ReplacedClass;

                /**
                 * Encodes the specified ReplacedClass message. Does not implicitly {@link apibara.starknet.v1alpha2.ReplacedClass.verify|verify} messages.
                 * @param message ReplacedClass message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IReplacedClass, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ReplacedClass message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.ReplacedClass.verify|verify} messages.
                 * @param message ReplacedClass message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IReplacedClass, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ReplacedClass message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ReplacedClass
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.ReplacedClass;

                /**
                 * Decodes a ReplacedClass message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ReplacedClass
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.ReplacedClass;

                /**
                 * Verifies a ReplacedClass message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ReplacedClass message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ReplacedClass
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.ReplacedClass;

                /**
                 * Creates a plain object from a ReplacedClass message. Also converts values to other types if specified.
                 * @param message ReplacedClass
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.ReplacedClass, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ReplacedClass to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ReplacedClass
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a DeployedContract. */
            interface IDeployedContract {

                /** DeployedContract contractAddress */
                contractAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeployedContract classHash */
                classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);
            }

            /** Represents a DeployedContract. */
            class DeployedContract implements IDeployedContract {

                /**
                 * Constructs a new DeployedContract.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IDeployedContract);

                /** DeployedContract contractAddress. */
                public contractAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** DeployedContract classHash. */
                public classHash?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /**
                 * Creates a new DeployedContract instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns DeployedContract instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IDeployedContract): apibara.starknet.v1alpha2.DeployedContract;

                /**
                 * Encodes the specified DeployedContract message. Does not implicitly {@link apibara.starknet.v1alpha2.DeployedContract.verify|verify} messages.
                 * @param message DeployedContract message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IDeployedContract, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DeployedContract message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.DeployedContract.verify|verify} messages.
                 * @param message DeployedContract message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IDeployedContract, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DeployedContract message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DeployedContract
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.DeployedContract;

                /**
                 * Decodes a DeployedContract message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DeployedContract
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.DeployedContract;

                /**
                 * Verifies a DeployedContract message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DeployedContract message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DeployedContract
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.DeployedContract;

                /**
                 * Creates a plain object from a DeployedContract message. Also converts values to other types if specified.
                 * @param message DeployedContract
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.DeployedContract, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DeployedContract to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for DeployedContract
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a NonceUpdate. */
            interface INonceUpdate {

                /** NonceUpdate contractAddress */
                contractAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** NonceUpdate nonce */
                nonce?: (apibara.starknet.v1alpha2.IFieldElement|null);
            }

            /** Represents a NonceUpdate. */
            class NonceUpdate implements INonceUpdate {

                /**
                 * Constructs a new NonceUpdate.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.INonceUpdate);

                /** NonceUpdate contractAddress. */
                public contractAddress?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** NonceUpdate nonce. */
                public nonce?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /**
                 * Creates a new NonceUpdate instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns NonceUpdate instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.INonceUpdate): apibara.starknet.v1alpha2.NonceUpdate;

                /**
                 * Encodes the specified NonceUpdate message. Does not implicitly {@link apibara.starknet.v1alpha2.NonceUpdate.verify|verify} messages.
                 * @param message NonceUpdate message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.INonceUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified NonceUpdate message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.NonceUpdate.verify|verify} messages.
                 * @param message NonceUpdate message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.INonceUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a NonceUpdate message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns NonceUpdate
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.NonceUpdate;

                /**
                 * Decodes a NonceUpdate message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns NonceUpdate
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.NonceUpdate;

                /**
                 * Verifies a NonceUpdate message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a NonceUpdate message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns NonceUpdate
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.NonceUpdate;

                /**
                 * Creates a plain object from a NonceUpdate message. Also converts values to other types if specified.
                 * @param message NonceUpdate
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.NonceUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this NonceUpdate to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for NonceUpdate
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ResourcePrice. */
            interface IResourcePrice {

                /** ResourcePrice priceInFri */
                priceInFri?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** ResourcePrice priceInWei */
                priceInWei?: (apibara.starknet.v1alpha2.IFieldElement|null);
            }

            /** Represents a ResourcePrice. */
            class ResourcePrice implements IResourcePrice {

                /**
                 * Constructs a new ResourcePrice.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IResourcePrice);

                /** ResourcePrice priceInFri. */
                public priceInFri?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** ResourcePrice priceInWei. */
                public priceInWei?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /**
                 * Creates a new ResourcePrice instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ResourcePrice instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IResourcePrice): apibara.starknet.v1alpha2.ResourcePrice;

                /**
                 * Encodes the specified ResourcePrice message. Does not implicitly {@link apibara.starknet.v1alpha2.ResourcePrice.verify|verify} messages.
                 * @param message ResourcePrice message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IResourcePrice, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ResourcePrice message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.ResourcePrice.verify|verify} messages.
                 * @param message ResourcePrice message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IResourcePrice, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ResourcePrice message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ResourcePrice
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.ResourcePrice;

                /**
                 * Decodes a ResourcePrice message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ResourcePrice
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.ResourcePrice;

                /**
                 * Verifies a ResourcePrice message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ResourcePrice message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ResourcePrice
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.ResourcePrice;

                /**
                 * Creates a plain object from a ResourcePrice message. Also converts values to other types if specified.
                 * @param message ResourcePrice
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.ResourcePrice, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ResourcePrice to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ResourcePrice
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a FeePayment. */
            interface IFeePayment {

                /** FeePayment amount */
                amount?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** FeePayment unit */
                unit?: (apibara.starknet.v1alpha2.PriceUnit|null);
            }

            /** Represents a FeePayment. */
            class FeePayment implements IFeePayment {

                /**
                 * Constructs a new FeePayment.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IFeePayment);

                /** FeePayment amount. */
                public amount?: (apibara.starknet.v1alpha2.IFieldElement|null);

                /** FeePayment unit. */
                public unit: apibara.starknet.v1alpha2.PriceUnit;

                /**
                 * Creates a new FeePayment instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns FeePayment instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IFeePayment): apibara.starknet.v1alpha2.FeePayment;

                /**
                 * Encodes the specified FeePayment message. Does not implicitly {@link apibara.starknet.v1alpha2.FeePayment.verify|verify} messages.
                 * @param message FeePayment message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IFeePayment, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified FeePayment message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.FeePayment.verify|verify} messages.
                 * @param message FeePayment message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IFeePayment, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a FeePayment message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns FeePayment
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.FeePayment;

                /**
                 * Decodes a FeePayment message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns FeePayment
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.FeePayment;

                /**
                 * Verifies a FeePayment message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a FeePayment message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns FeePayment
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.FeePayment;

                /**
                 * Creates a plain object from a FeePayment message. Also converts values to other types if specified.
                 * @param message FeePayment
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.FeePayment, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this FeePayment to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for FeePayment
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** PriceUnit enum. */
            enum PriceUnit {
                PRICE_UNIT_UNSPECIFIED = 0,
                PRICE_UNIT_WEI = 1,
                PRICE_UNIT_FRI = 2
            }

            /** Properties of an ExecutionResources. */
            interface IExecutionResources {

                /** ExecutionResources computation */
                computation?: (apibara.starknet.v1alpha2.IComputationResources|null);

                /** ExecutionResources dataAvailability */
                dataAvailability?: (apibara.starknet.v1alpha2.IDataAvailabilityResources|null);
            }

            /** Represents an ExecutionResources. */
            class ExecutionResources implements IExecutionResources {

                /**
                 * Constructs a new ExecutionResources.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IExecutionResources);

                /** ExecutionResources computation. */
                public computation?: (apibara.starknet.v1alpha2.IComputationResources|null);

                /** ExecutionResources dataAvailability. */
                public dataAvailability?: (apibara.starknet.v1alpha2.IDataAvailabilityResources|null);

                /**
                 * Creates a new ExecutionResources instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ExecutionResources instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IExecutionResources): apibara.starknet.v1alpha2.ExecutionResources;

                /**
                 * Encodes the specified ExecutionResources message. Does not implicitly {@link apibara.starknet.v1alpha2.ExecutionResources.verify|verify} messages.
                 * @param message ExecutionResources message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IExecutionResources, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ExecutionResources message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.ExecutionResources.verify|verify} messages.
                 * @param message ExecutionResources message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IExecutionResources, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an ExecutionResources message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ExecutionResources
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.ExecutionResources;

                /**
                 * Decodes an ExecutionResources message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ExecutionResources
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.ExecutionResources;

                /**
                 * Verifies an ExecutionResources message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an ExecutionResources message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ExecutionResources
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.ExecutionResources;

                /**
                 * Creates a plain object from an ExecutionResources message. Also converts values to other types if specified.
                 * @param message ExecutionResources
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.ExecutionResources, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ExecutionResources to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ExecutionResources
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ComputationResources. */
            interface IComputationResources {

                /** ComputationResources steps */
                steps?: (number|Long|null);

                /** ComputationResources memoryHoles */
                memoryHoles?: (number|Long|null);

                /** ComputationResources rangeCheckBuiltinApplications */
                rangeCheckBuiltinApplications?: (number|Long|null);

                /** ComputationResources pedersenBuiltinApplications */
                pedersenBuiltinApplications?: (number|Long|null);

                /** ComputationResources poseidonBuiltinApplications */
                poseidonBuiltinApplications?: (number|Long|null);

                /** ComputationResources ecOpBuiltinApplications */
                ecOpBuiltinApplications?: (number|Long|null);

                /** ComputationResources ecdsaBuiltinApplications */
                ecdsaBuiltinApplications?: (number|Long|null);

                /** ComputationResources bitwiseBuiltinApplications */
                bitwiseBuiltinApplications?: (number|Long|null);

                /** ComputationResources keccakBuiltinApplications */
                keccakBuiltinApplications?: (number|Long|null);

                /** ComputationResources segmentArenaBuiltin */
                segmentArenaBuiltin?: (number|Long|null);
            }

            /** Represents a ComputationResources. */
            class ComputationResources implements IComputationResources {

                /**
                 * Constructs a new ComputationResources.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IComputationResources);

                /** ComputationResources steps. */
                public steps: (number|Long);

                /** ComputationResources memoryHoles. */
                public memoryHoles: (number|Long);

                /** ComputationResources rangeCheckBuiltinApplications. */
                public rangeCheckBuiltinApplications: (number|Long);

                /** ComputationResources pedersenBuiltinApplications. */
                public pedersenBuiltinApplications: (number|Long);

                /** ComputationResources poseidonBuiltinApplications. */
                public poseidonBuiltinApplications: (number|Long);

                /** ComputationResources ecOpBuiltinApplications. */
                public ecOpBuiltinApplications: (number|Long);

                /** ComputationResources ecdsaBuiltinApplications. */
                public ecdsaBuiltinApplications: (number|Long);

                /** ComputationResources bitwiseBuiltinApplications. */
                public bitwiseBuiltinApplications: (number|Long);

                /** ComputationResources keccakBuiltinApplications. */
                public keccakBuiltinApplications: (number|Long);

                /** ComputationResources segmentArenaBuiltin. */
                public segmentArenaBuiltin: (number|Long);

                /**
                 * Creates a new ComputationResources instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ComputationResources instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IComputationResources): apibara.starknet.v1alpha2.ComputationResources;

                /**
                 * Encodes the specified ComputationResources message. Does not implicitly {@link apibara.starknet.v1alpha2.ComputationResources.verify|verify} messages.
                 * @param message ComputationResources message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IComputationResources, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ComputationResources message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.ComputationResources.verify|verify} messages.
                 * @param message ComputationResources message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IComputationResources, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ComputationResources message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ComputationResources
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.ComputationResources;

                /**
                 * Decodes a ComputationResources message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ComputationResources
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.ComputationResources;

                /**
                 * Verifies a ComputationResources message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ComputationResources message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ComputationResources
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.ComputationResources;

                /**
                 * Creates a plain object from a ComputationResources message. Also converts values to other types if specified.
                 * @param message ComputationResources
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.ComputationResources, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ComputationResources to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ComputationResources
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a DataAvailabilityResources. */
            interface IDataAvailabilityResources {

                /** DataAvailabilityResources l1Gas */
                l1Gas?: (number|Long|null);

                /** DataAvailabilityResources l1DataGas */
                l1DataGas?: (number|Long|null);
            }

            /** Represents a DataAvailabilityResources. */
            class DataAvailabilityResources implements IDataAvailabilityResources {

                /**
                 * Constructs a new DataAvailabilityResources.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IDataAvailabilityResources);

                /** DataAvailabilityResources l1Gas. */
                public l1Gas: (number|Long);

                /** DataAvailabilityResources l1DataGas. */
                public l1DataGas: (number|Long);

                /**
                 * Creates a new DataAvailabilityResources instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns DataAvailabilityResources instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IDataAvailabilityResources): apibara.starknet.v1alpha2.DataAvailabilityResources;

                /**
                 * Encodes the specified DataAvailabilityResources message. Does not implicitly {@link apibara.starknet.v1alpha2.DataAvailabilityResources.verify|verify} messages.
                 * @param message DataAvailabilityResources message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IDataAvailabilityResources, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DataAvailabilityResources message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.DataAvailabilityResources.verify|verify} messages.
                 * @param message DataAvailabilityResources message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IDataAvailabilityResources, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DataAvailabilityResources message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DataAvailabilityResources
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.DataAvailabilityResources;

                /**
                 * Decodes a DataAvailabilityResources message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DataAvailabilityResources
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.DataAvailabilityResources;

                /**
                 * Verifies a DataAvailabilityResources message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DataAvailabilityResources message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DataAvailabilityResources
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.DataAvailabilityResources;

                /**
                 * Creates a plain object from a DataAvailabilityResources message. Also converts values to other types if specified.
                 * @param message DataAvailabilityResources
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.DataAvailabilityResources, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DataAvailabilityResources to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for DataAvailabilityResources
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ResourceBoundsMapping. */
            interface IResourceBoundsMapping {

                /** ResourceBoundsMapping l1Gas */
                l1Gas?: (apibara.starknet.v1alpha2.IResourceBounds|null);

                /** ResourceBoundsMapping l2Gas */
                l2Gas?: (apibara.starknet.v1alpha2.IResourceBounds|null);
            }

            /** Represents a ResourceBoundsMapping. */
            class ResourceBoundsMapping implements IResourceBoundsMapping {

                /**
                 * Constructs a new ResourceBoundsMapping.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IResourceBoundsMapping);

                /** ResourceBoundsMapping l1Gas. */
                public l1Gas?: (apibara.starknet.v1alpha2.IResourceBounds|null);

                /** ResourceBoundsMapping l2Gas. */
                public l2Gas?: (apibara.starknet.v1alpha2.IResourceBounds|null);

                /**
                 * Creates a new ResourceBoundsMapping instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ResourceBoundsMapping instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IResourceBoundsMapping): apibara.starknet.v1alpha2.ResourceBoundsMapping;

                /**
                 * Encodes the specified ResourceBoundsMapping message. Does not implicitly {@link apibara.starknet.v1alpha2.ResourceBoundsMapping.verify|verify} messages.
                 * @param message ResourceBoundsMapping message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IResourceBoundsMapping, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ResourceBoundsMapping message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.ResourceBoundsMapping.verify|verify} messages.
                 * @param message ResourceBoundsMapping message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IResourceBoundsMapping, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ResourceBoundsMapping message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ResourceBoundsMapping
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.ResourceBoundsMapping;

                /**
                 * Decodes a ResourceBoundsMapping message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ResourceBoundsMapping
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.ResourceBoundsMapping;

                /**
                 * Verifies a ResourceBoundsMapping message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ResourceBoundsMapping message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ResourceBoundsMapping
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.ResourceBoundsMapping;

                /**
                 * Creates a plain object from a ResourceBoundsMapping message. Also converts values to other types if specified.
                 * @param message ResourceBoundsMapping
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.ResourceBoundsMapping, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ResourceBoundsMapping to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ResourceBoundsMapping
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ResourceBounds. */
            interface IResourceBounds {

                /** ResourceBounds maxAmount */
                maxAmount?: (number|Long|null);

                /** The max price per unit of resource. */
                maxPricePerUnit?: (apibara.starknet.v1alpha2.IUint128|null);
            }

            /** Represents a ResourceBounds. */
            class ResourceBounds implements IResourceBounds {

                /**
                 * Constructs a new ResourceBounds.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IResourceBounds);

                /** ResourceBounds maxAmount. */
                public maxAmount: (number|Long);

                /** The max price per unit of resource. */
                public maxPricePerUnit?: (apibara.starknet.v1alpha2.IUint128|null);

                /**
                 * Creates a new ResourceBounds instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ResourceBounds instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IResourceBounds): apibara.starknet.v1alpha2.ResourceBounds;

                /**
                 * Encodes the specified ResourceBounds message. Does not implicitly {@link apibara.starknet.v1alpha2.ResourceBounds.verify|verify} messages.
                 * @param message ResourceBounds message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IResourceBounds, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ResourceBounds message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.ResourceBounds.verify|verify} messages.
                 * @param message ResourceBounds message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IResourceBounds, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ResourceBounds message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ResourceBounds
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.ResourceBounds;

                /**
                 * Decodes a ResourceBounds message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ResourceBounds
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.ResourceBounds;

                /**
                 * Verifies a ResourceBounds message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ResourceBounds message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ResourceBounds
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.ResourceBounds;

                /**
                 * Creates a plain object from a ResourceBounds message. Also converts values to other types if specified.
                 * @param message ResourceBounds
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.ResourceBounds, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ResourceBounds to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ResourceBounds
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of an Uint128. */
            interface IUint128 {

                /** Uint128 low */
                low?: (number|Long|null);

                /** Uint128 high */
                high?: (number|Long|null);
            }

            /** Represents an Uint128. */
            class Uint128 implements IUint128 {

                /**
                 * Constructs a new Uint128.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: apibara.starknet.v1alpha2.IUint128);

                /** Uint128 low. */
                public low: (number|Long);

                /** Uint128 high. */
                public high: (number|Long);

                /**
                 * Creates a new Uint128 instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Uint128 instance
                 */
                public static create(properties?: apibara.starknet.v1alpha2.IUint128): apibara.starknet.v1alpha2.Uint128;

                /**
                 * Encodes the specified Uint128 message. Does not implicitly {@link apibara.starknet.v1alpha2.Uint128.verify|verify} messages.
                 * @param message Uint128 message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: apibara.starknet.v1alpha2.IUint128, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Uint128 message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.Uint128.verify|verify} messages.
                 * @param message Uint128 message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: apibara.starknet.v1alpha2.IUint128, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an Uint128 message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Uint128
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): apibara.starknet.v1alpha2.Uint128;

                /**
                 * Decodes an Uint128 message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Uint128
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): apibara.starknet.v1alpha2.Uint128;

                /**
                 * Verifies an Uint128 message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an Uint128 message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Uint128
                 */
                public static fromObject(object: { [k: string]: any }): apibara.starknet.v1alpha2.Uint128;

                /**
                 * Creates a plain object from an Uint128 message. Also converts values to other types if specified.
                 * @param message Uint128
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: apibara.starknet.v1alpha2.Uint128, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Uint128 to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for Uint128
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** DataAvailabilityMode enum. */
            enum DataAvailabilityMode {
                DATA_AVAILABILITY_MODE_UNSPECIFIED = 0,
                DATA_AVAILABILITY_MODE_L1 = 1,
                DATA_AVAILABILITY_MODE_L2 = 2
            }
        }
    }
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of a Timestamp. */
        interface ITimestamp {

            /** Timestamp seconds */
            seconds?: (number|Long|null);

            /** Timestamp nanos */
            nanos?: (number|null);
        }

        /** Represents a Timestamp. */
        class Timestamp implements ITimestamp {

            /**
             * Constructs a new Timestamp.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.ITimestamp);

            /** Timestamp seconds. */
            public seconds: (number|Long);

            /** Timestamp nanos. */
            public nanos: number;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Timestamp instance
             */
            public static create(properties?: google.protobuf.ITimestamp): google.protobuf.Timestamp;

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Timestamp;

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Timestamp;

            /**
             * Verifies a Timestamp message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Timestamp
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Timestamp;

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @param message Timestamp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Timestamp, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Timestamp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Timestamp
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }
}
