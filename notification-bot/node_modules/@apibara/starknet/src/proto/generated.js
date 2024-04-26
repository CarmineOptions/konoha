/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.apibara = (function() {

    /**
     * Namespace apibara.
     * @exports apibara
     * @namespace
     */
    var apibara = {};

    apibara.starknet = (function() {

        /**
         * Namespace starknet.
         * @memberof apibara
         * @namespace
         */
        var starknet = {};

        starknet.v1alpha2 = (function() {

            /**
             * Namespace v1alpha2.
             * @memberof apibara.starknet
             * @namespace
             */
            var v1alpha2 = {};

            v1alpha2.Filter = (function() {

                /**
                 * Properties of a Filter.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IFilter
                 * @property {apibara.starknet.v1alpha2.IHeaderFilter|null} [header] Filter header
                 * @property {Array.<apibara.starknet.v1alpha2.ITransactionFilter>|null} [transactions] Filter transactions
                 * @property {apibara.starknet.v1alpha2.IStateUpdateFilter|null} [stateUpdate] Filter stateUpdate
                 * @property {Array.<apibara.starknet.v1alpha2.IEventFilter>|null} [events] Filter events
                 * @property {Array.<apibara.starknet.v1alpha2.IL2ToL1MessageFilter>|null} [messages] Filter messages
                 */

                /**
                 * Constructs a new Filter.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a Filter.
                 * @implements IFilter
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IFilter=} [properties] Properties to set
                 */
                function Filter(properties) {
                    this.transactions = [];
                    this.events = [];
                    this.messages = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Filter header.
                 * @member {apibara.starknet.v1alpha2.IHeaderFilter|null|undefined} header
                 * @memberof apibara.starknet.v1alpha2.Filter
                 * @instance
                 */
                Filter.prototype.header = null;

                /**
                 * Filter transactions.
                 * @member {Array.<apibara.starknet.v1alpha2.ITransactionFilter>} transactions
                 * @memberof apibara.starknet.v1alpha2.Filter
                 * @instance
                 */
                Filter.prototype.transactions = $util.emptyArray;

                /**
                 * Filter stateUpdate.
                 * @member {apibara.starknet.v1alpha2.IStateUpdateFilter|null|undefined} stateUpdate
                 * @memberof apibara.starknet.v1alpha2.Filter
                 * @instance
                 */
                Filter.prototype.stateUpdate = null;

                /**
                 * Filter events.
                 * @member {Array.<apibara.starknet.v1alpha2.IEventFilter>} events
                 * @memberof apibara.starknet.v1alpha2.Filter
                 * @instance
                 */
                Filter.prototype.events = $util.emptyArray;

                /**
                 * Filter messages.
                 * @member {Array.<apibara.starknet.v1alpha2.IL2ToL1MessageFilter>} messages
                 * @memberof apibara.starknet.v1alpha2.Filter
                 * @instance
                 */
                Filter.prototype.messages = $util.emptyArray;

                /**
                 * Creates a new Filter instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.Filter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IFilter=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.Filter} Filter instance
                 */
                Filter.create = function create(properties) {
                    return new Filter(properties);
                };

                /**
                 * Encodes the specified Filter message. Does not implicitly {@link apibara.starknet.v1alpha2.Filter.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.Filter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IFilter} message Filter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Filter.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                        $root.apibara.starknet.v1alpha2.HeaderFilter.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.transactions != null && message.transactions.length)
                        for (var i = 0; i < message.transactions.length; ++i)
                            $root.apibara.starknet.v1alpha2.TransactionFilter.encode(message.transactions[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.stateUpdate != null && Object.hasOwnProperty.call(message, "stateUpdate"))
                        $root.apibara.starknet.v1alpha2.StateUpdateFilter.encode(message.stateUpdate, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.events != null && message.events.length)
                        for (var i = 0; i < message.events.length; ++i)
                            $root.apibara.starknet.v1alpha2.EventFilter.encode(message.events[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    if (message.messages != null && message.messages.length)
                        for (var i = 0; i < message.messages.length; ++i)
                            $root.apibara.starknet.v1alpha2.L2ToL1MessageFilter.encode(message.messages[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified Filter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.Filter.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.Filter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IFilter} message Filter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Filter.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Filter message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.Filter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.Filter} Filter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Filter.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.Filter();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.header = $root.apibara.starknet.v1alpha2.HeaderFilter.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                if (!(message.transactions && message.transactions.length))
                                    message.transactions = [];
                                message.transactions.push($root.apibara.starknet.v1alpha2.TransactionFilter.decode(reader, reader.uint32()));
                                break;
                            }
                        case 3: {
                                message.stateUpdate = $root.apibara.starknet.v1alpha2.StateUpdateFilter.decode(reader, reader.uint32());
                                break;
                            }
                        case 4: {
                                if (!(message.events && message.events.length))
                                    message.events = [];
                                message.events.push($root.apibara.starknet.v1alpha2.EventFilter.decode(reader, reader.uint32()));
                                break;
                            }
                        case 5: {
                                if (!(message.messages && message.messages.length))
                                    message.messages = [];
                                message.messages.push($root.apibara.starknet.v1alpha2.L2ToL1MessageFilter.decode(reader, reader.uint32()));
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Filter message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.Filter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.Filter} Filter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Filter.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Filter message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.Filter
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Filter.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.header != null && message.hasOwnProperty("header")) {
                        var error = $root.apibara.starknet.v1alpha2.HeaderFilter.verify(message.header);
                        if (error)
                            return "header." + error;
                    }
                    if (message.transactions != null && message.hasOwnProperty("transactions")) {
                        if (!Array.isArray(message.transactions))
                            return "transactions: array expected";
                        for (var i = 0; i < message.transactions.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.TransactionFilter.verify(message.transactions[i]);
                            if (error)
                                return "transactions." + error;
                        }
                    }
                    if (message.stateUpdate != null && message.hasOwnProperty("stateUpdate")) {
                        var error = $root.apibara.starknet.v1alpha2.StateUpdateFilter.verify(message.stateUpdate);
                        if (error)
                            return "stateUpdate." + error;
                    }
                    if (message.events != null && message.hasOwnProperty("events")) {
                        if (!Array.isArray(message.events))
                            return "events: array expected";
                        for (var i = 0; i < message.events.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.EventFilter.verify(message.events[i]);
                            if (error)
                                return "events." + error;
                        }
                    }
                    if (message.messages != null && message.hasOwnProperty("messages")) {
                        if (!Array.isArray(message.messages))
                            return "messages: array expected";
                        for (var i = 0; i < message.messages.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.L2ToL1MessageFilter.verify(message.messages[i]);
                            if (error)
                                return "messages." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a Filter message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.Filter
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.Filter} Filter
                 */
                Filter.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.Filter)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.Filter();
                    if (object.header != null) {
                        if (typeof object.header !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.Filter.header: object expected");
                        message.header = $root.apibara.starknet.v1alpha2.HeaderFilter.fromObject(object.header);
                    }
                    if (object.transactions) {
                        if (!Array.isArray(object.transactions))
                            throw TypeError(".apibara.starknet.v1alpha2.Filter.transactions: array expected");
                        message.transactions = [];
                        for (var i = 0; i < object.transactions.length; ++i) {
                            if (typeof object.transactions[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.Filter.transactions: object expected");
                            message.transactions[i] = $root.apibara.starknet.v1alpha2.TransactionFilter.fromObject(object.transactions[i]);
                        }
                    }
                    if (object.stateUpdate != null) {
                        if (typeof object.stateUpdate !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.Filter.stateUpdate: object expected");
                        message.stateUpdate = $root.apibara.starknet.v1alpha2.StateUpdateFilter.fromObject(object.stateUpdate);
                    }
                    if (object.events) {
                        if (!Array.isArray(object.events))
                            throw TypeError(".apibara.starknet.v1alpha2.Filter.events: array expected");
                        message.events = [];
                        for (var i = 0; i < object.events.length; ++i) {
                            if (typeof object.events[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.Filter.events: object expected");
                            message.events[i] = $root.apibara.starknet.v1alpha2.EventFilter.fromObject(object.events[i]);
                        }
                    }
                    if (object.messages) {
                        if (!Array.isArray(object.messages))
                            throw TypeError(".apibara.starknet.v1alpha2.Filter.messages: array expected");
                        message.messages = [];
                        for (var i = 0; i < object.messages.length; ++i) {
                            if (typeof object.messages[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.Filter.messages: object expected");
                            message.messages[i] = $root.apibara.starknet.v1alpha2.L2ToL1MessageFilter.fromObject(object.messages[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a Filter message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.Filter
                 * @static
                 * @param {apibara.starknet.v1alpha2.Filter} message Filter
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Filter.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults) {
                        object.transactions = [];
                        object.events = [];
                        object.messages = [];
                    }
                    if (options.defaults) {
                        object.header = null;
                        object.stateUpdate = null;
                    }
                    if (message.header != null && message.hasOwnProperty("header"))
                        object.header = $root.apibara.starknet.v1alpha2.HeaderFilter.toObject(message.header, options);
                    if (message.transactions && message.transactions.length) {
                        object.transactions = [];
                        for (var j = 0; j < message.transactions.length; ++j)
                            object.transactions[j] = $root.apibara.starknet.v1alpha2.TransactionFilter.toObject(message.transactions[j], options);
                    }
                    if (message.stateUpdate != null && message.hasOwnProperty("stateUpdate"))
                        object.stateUpdate = $root.apibara.starknet.v1alpha2.StateUpdateFilter.toObject(message.stateUpdate, options);
                    if (message.events && message.events.length) {
                        object.events = [];
                        for (var j = 0; j < message.events.length; ++j)
                            object.events[j] = $root.apibara.starknet.v1alpha2.EventFilter.toObject(message.events[j], options);
                    }
                    if (message.messages && message.messages.length) {
                        object.messages = [];
                        for (var j = 0; j < message.messages.length; ++j)
                            object.messages[j] = $root.apibara.starknet.v1alpha2.L2ToL1MessageFilter.toObject(message.messages[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this Filter to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.Filter
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Filter.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for Filter
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.Filter
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                Filter.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.Filter";
                };

                return Filter;
            })();

            v1alpha2.HeaderFilter = (function() {

                /**
                 * Properties of a HeaderFilter.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IHeaderFilter
                 * @property {boolean|null} [weak] HeaderFilter weak
                 */

                /**
                 * Constructs a new HeaderFilter.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a HeaderFilter.
                 * @implements IHeaderFilter
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IHeaderFilter=} [properties] Properties to set
                 */
                function HeaderFilter(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * HeaderFilter weak.
                 * @member {boolean} weak
                 * @memberof apibara.starknet.v1alpha2.HeaderFilter
                 * @instance
                 */
                HeaderFilter.prototype.weak = false;

                /**
                 * Creates a new HeaderFilter instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.HeaderFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IHeaderFilter=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.HeaderFilter} HeaderFilter instance
                 */
                HeaderFilter.create = function create(properties) {
                    return new HeaderFilter(properties);
                };

                /**
                 * Encodes the specified HeaderFilter message. Does not implicitly {@link apibara.starknet.v1alpha2.HeaderFilter.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.HeaderFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IHeaderFilter} message HeaderFilter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                HeaderFilter.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.weak != null && Object.hasOwnProperty.call(message, "weak"))
                        writer.uint32(/* id 1, wireType 0 =*/8).bool(message.weak);
                    return writer;
                };

                /**
                 * Encodes the specified HeaderFilter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.HeaderFilter.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.HeaderFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IHeaderFilter} message HeaderFilter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                HeaderFilter.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a HeaderFilter message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.HeaderFilter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.HeaderFilter} HeaderFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                HeaderFilter.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.HeaderFilter();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.weak = reader.bool();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a HeaderFilter message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.HeaderFilter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.HeaderFilter} HeaderFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                HeaderFilter.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a HeaderFilter message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.HeaderFilter
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                HeaderFilter.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.weak != null && message.hasOwnProperty("weak"))
                        if (typeof message.weak !== "boolean")
                            return "weak: boolean expected";
                    return null;
                };

                /**
                 * Creates a HeaderFilter message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.HeaderFilter
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.HeaderFilter} HeaderFilter
                 */
                HeaderFilter.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.HeaderFilter)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.HeaderFilter();
                    if (object.weak != null)
                        message.weak = Boolean(object.weak);
                    return message;
                };

                /**
                 * Creates a plain object from a HeaderFilter message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.HeaderFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.HeaderFilter} message HeaderFilter
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                HeaderFilter.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.weak = false;
                    if (message.weak != null && message.hasOwnProperty("weak"))
                        object.weak = message.weak;
                    return object;
                };

                /**
                 * Converts this HeaderFilter to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.HeaderFilter
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                HeaderFilter.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for HeaderFilter
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.HeaderFilter
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                HeaderFilter.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.HeaderFilter";
                };

                return HeaderFilter;
            })();

            v1alpha2.TransactionFilter = (function() {

                /**
                 * Properties of a TransactionFilter.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface ITransactionFilter
                 * @property {apibara.starknet.v1alpha2.IInvokeTransactionV0Filter|null} [invokeV0] TransactionFilter invokeV0
                 * @property {apibara.starknet.v1alpha2.IInvokeTransactionV1Filter|null} [invokeV1] TransactionFilter invokeV1
                 * @property {apibara.starknet.v1alpha2.IDeployTransactionFilter|null} [deploy] TransactionFilter deploy
                 * @property {apibara.starknet.v1alpha2.IDeclareTransactionFilter|null} [declare] TransactionFilter declare
                 * @property {apibara.starknet.v1alpha2.IL1HandlerTransactionFilter|null} [l1Handler] TransactionFilter l1Handler
                 * @property {apibara.starknet.v1alpha2.IDeployAccountTransactionFilter|null} [deployAccount] TransactionFilter deployAccount
                 */

                /**
                 * Constructs a new TransactionFilter.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a TransactionFilter.
                 * @implements ITransactionFilter
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.ITransactionFilter=} [properties] Properties to set
                 */
                function TransactionFilter(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TransactionFilter invokeV0.
                 * @member {apibara.starknet.v1alpha2.IInvokeTransactionV0Filter|null|undefined} invokeV0
                 * @memberof apibara.starknet.v1alpha2.TransactionFilter
                 * @instance
                 */
                TransactionFilter.prototype.invokeV0 = null;

                /**
                 * TransactionFilter invokeV1.
                 * @member {apibara.starknet.v1alpha2.IInvokeTransactionV1Filter|null|undefined} invokeV1
                 * @memberof apibara.starknet.v1alpha2.TransactionFilter
                 * @instance
                 */
                TransactionFilter.prototype.invokeV1 = null;

                /**
                 * TransactionFilter deploy.
                 * @member {apibara.starknet.v1alpha2.IDeployTransactionFilter|null|undefined} deploy
                 * @memberof apibara.starknet.v1alpha2.TransactionFilter
                 * @instance
                 */
                TransactionFilter.prototype.deploy = null;

                /**
                 * TransactionFilter declare.
                 * @member {apibara.starknet.v1alpha2.IDeclareTransactionFilter|null|undefined} declare
                 * @memberof apibara.starknet.v1alpha2.TransactionFilter
                 * @instance
                 */
                TransactionFilter.prototype.declare = null;

                /**
                 * TransactionFilter l1Handler.
                 * @member {apibara.starknet.v1alpha2.IL1HandlerTransactionFilter|null|undefined} l1Handler
                 * @memberof apibara.starknet.v1alpha2.TransactionFilter
                 * @instance
                 */
                TransactionFilter.prototype.l1Handler = null;

                /**
                 * TransactionFilter deployAccount.
                 * @member {apibara.starknet.v1alpha2.IDeployAccountTransactionFilter|null|undefined} deployAccount
                 * @memberof apibara.starknet.v1alpha2.TransactionFilter
                 * @instance
                 */
                TransactionFilter.prototype.deployAccount = null;

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * TransactionFilter filter.
                 * @member {"invokeV0"|"invokeV1"|"deploy"|"declare"|"l1Handler"|"deployAccount"|undefined} filter
                 * @memberof apibara.starknet.v1alpha2.TransactionFilter
                 * @instance
                 */
                Object.defineProperty(TransactionFilter.prototype, "filter", {
                    get: $util.oneOfGetter($oneOfFields = ["invokeV0", "invokeV1", "deploy", "declare", "l1Handler", "deployAccount"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new TransactionFilter instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.TransactionFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.ITransactionFilter=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.TransactionFilter} TransactionFilter instance
                 */
                TransactionFilter.create = function create(properties) {
                    return new TransactionFilter(properties);
                };

                /**
                 * Encodes the specified TransactionFilter message. Does not implicitly {@link apibara.starknet.v1alpha2.TransactionFilter.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.TransactionFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.ITransactionFilter} message TransactionFilter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TransactionFilter.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.invokeV0 != null && Object.hasOwnProperty.call(message, "invokeV0"))
                        $root.apibara.starknet.v1alpha2.InvokeTransactionV0Filter.encode(message.invokeV0, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.invokeV1 != null && Object.hasOwnProperty.call(message, "invokeV1"))
                        $root.apibara.starknet.v1alpha2.InvokeTransactionV1Filter.encode(message.invokeV1, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.deploy != null && Object.hasOwnProperty.call(message, "deploy"))
                        $root.apibara.starknet.v1alpha2.DeployTransactionFilter.encode(message.deploy, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.declare != null && Object.hasOwnProperty.call(message, "declare"))
                        $root.apibara.starknet.v1alpha2.DeclareTransactionFilter.encode(message.declare, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    if (message.l1Handler != null && Object.hasOwnProperty.call(message, "l1Handler"))
                        $root.apibara.starknet.v1alpha2.L1HandlerTransactionFilter.encode(message.l1Handler, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                    if (message.deployAccount != null && Object.hasOwnProperty.call(message, "deployAccount"))
                        $root.apibara.starknet.v1alpha2.DeployAccountTransactionFilter.encode(message.deployAccount, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified TransactionFilter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.TransactionFilter.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.TransactionFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.ITransactionFilter} message TransactionFilter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TransactionFilter.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a TransactionFilter message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.TransactionFilter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.TransactionFilter} TransactionFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TransactionFilter.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.TransactionFilter();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.invokeV0 = $root.apibara.starknet.v1alpha2.InvokeTransactionV0Filter.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.invokeV1 = $root.apibara.starknet.v1alpha2.InvokeTransactionV1Filter.decode(reader, reader.uint32());
                                break;
                            }
                        case 3: {
                                message.deploy = $root.apibara.starknet.v1alpha2.DeployTransactionFilter.decode(reader, reader.uint32());
                                break;
                            }
                        case 4: {
                                message.declare = $root.apibara.starknet.v1alpha2.DeclareTransactionFilter.decode(reader, reader.uint32());
                                break;
                            }
                        case 5: {
                                message.l1Handler = $root.apibara.starknet.v1alpha2.L1HandlerTransactionFilter.decode(reader, reader.uint32());
                                break;
                            }
                        case 6: {
                                message.deployAccount = $root.apibara.starknet.v1alpha2.DeployAccountTransactionFilter.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TransactionFilter message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.TransactionFilter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.TransactionFilter} TransactionFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TransactionFilter.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TransactionFilter message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.TransactionFilter
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TransactionFilter.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    var properties = {};
                    if (message.invokeV0 != null && message.hasOwnProperty("invokeV0")) {
                        properties.filter = 1;
                        {
                            var error = $root.apibara.starknet.v1alpha2.InvokeTransactionV0Filter.verify(message.invokeV0);
                            if (error)
                                return "invokeV0." + error;
                        }
                    }
                    if (message.invokeV1 != null && message.hasOwnProperty("invokeV1")) {
                        if (properties.filter === 1)
                            return "filter: multiple values";
                        properties.filter = 1;
                        {
                            var error = $root.apibara.starknet.v1alpha2.InvokeTransactionV1Filter.verify(message.invokeV1);
                            if (error)
                                return "invokeV1." + error;
                        }
                    }
                    if (message.deploy != null && message.hasOwnProperty("deploy")) {
                        if (properties.filter === 1)
                            return "filter: multiple values";
                        properties.filter = 1;
                        {
                            var error = $root.apibara.starknet.v1alpha2.DeployTransactionFilter.verify(message.deploy);
                            if (error)
                                return "deploy." + error;
                        }
                    }
                    if (message.declare != null && message.hasOwnProperty("declare")) {
                        if (properties.filter === 1)
                            return "filter: multiple values";
                        properties.filter = 1;
                        {
                            var error = $root.apibara.starknet.v1alpha2.DeclareTransactionFilter.verify(message.declare);
                            if (error)
                                return "declare." + error;
                        }
                    }
                    if (message.l1Handler != null && message.hasOwnProperty("l1Handler")) {
                        if (properties.filter === 1)
                            return "filter: multiple values";
                        properties.filter = 1;
                        {
                            var error = $root.apibara.starknet.v1alpha2.L1HandlerTransactionFilter.verify(message.l1Handler);
                            if (error)
                                return "l1Handler." + error;
                        }
                    }
                    if (message.deployAccount != null && message.hasOwnProperty("deployAccount")) {
                        if (properties.filter === 1)
                            return "filter: multiple values";
                        properties.filter = 1;
                        {
                            var error = $root.apibara.starknet.v1alpha2.DeployAccountTransactionFilter.verify(message.deployAccount);
                            if (error)
                                return "deployAccount." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a TransactionFilter message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.TransactionFilter
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.TransactionFilter} TransactionFilter
                 */
                TransactionFilter.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.TransactionFilter)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.TransactionFilter();
                    if (object.invokeV0 != null) {
                        if (typeof object.invokeV0 !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.TransactionFilter.invokeV0: object expected");
                        message.invokeV0 = $root.apibara.starknet.v1alpha2.InvokeTransactionV0Filter.fromObject(object.invokeV0);
                    }
                    if (object.invokeV1 != null) {
                        if (typeof object.invokeV1 !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.TransactionFilter.invokeV1: object expected");
                        message.invokeV1 = $root.apibara.starknet.v1alpha2.InvokeTransactionV1Filter.fromObject(object.invokeV1);
                    }
                    if (object.deploy != null) {
                        if (typeof object.deploy !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.TransactionFilter.deploy: object expected");
                        message.deploy = $root.apibara.starknet.v1alpha2.DeployTransactionFilter.fromObject(object.deploy);
                    }
                    if (object.declare != null) {
                        if (typeof object.declare !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.TransactionFilter.declare: object expected");
                        message.declare = $root.apibara.starknet.v1alpha2.DeclareTransactionFilter.fromObject(object.declare);
                    }
                    if (object.l1Handler != null) {
                        if (typeof object.l1Handler !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.TransactionFilter.l1Handler: object expected");
                        message.l1Handler = $root.apibara.starknet.v1alpha2.L1HandlerTransactionFilter.fromObject(object.l1Handler);
                    }
                    if (object.deployAccount != null) {
                        if (typeof object.deployAccount !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.TransactionFilter.deployAccount: object expected");
                        message.deployAccount = $root.apibara.starknet.v1alpha2.DeployAccountTransactionFilter.fromObject(object.deployAccount);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a TransactionFilter message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.TransactionFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.TransactionFilter} message TransactionFilter
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TransactionFilter.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (message.invokeV0 != null && message.hasOwnProperty("invokeV0")) {
                        object.invokeV0 = $root.apibara.starknet.v1alpha2.InvokeTransactionV0Filter.toObject(message.invokeV0, options);
                        if (options.oneofs)
                            object.filter = "invokeV0";
                    }
                    if (message.invokeV1 != null && message.hasOwnProperty("invokeV1")) {
                        object.invokeV1 = $root.apibara.starknet.v1alpha2.InvokeTransactionV1Filter.toObject(message.invokeV1, options);
                        if (options.oneofs)
                            object.filter = "invokeV1";
                    }
                    if (message.deploy != null && message.hasOwnProperty("deploy")) {
                        object.deploy = $root.apibara.starknet.v1alpha2.DeployTransactionFilter.toObject(message.deploy, options);
                        if (options.oneofs)
                            object.filter = "deploy";
                    }
                    if (message.declare != null && message.hasOwnProperty("declare")) {
                        object.declare = $root.apibara.starknet.v1alpha2.DeclareTransactionFilter.toObject(message.declare, options);
                        if (options.oneofs)
                            object.filter = "declare";
                    }
                    if (message.l1Handler != null && message.hasOwnProperty("l1Handler")) {
                        object.l1Handler = $root.apibara.starknet.v1alpha2.L1HandlerTransactionFilter.toObject(message.l1Handler, options);
                        if (options.oneofs)
                            object.filter = "l1Handler";
                    }
                    if (message.deployAccount != null && message.hasOwnProperty("deployAccount")) {
                        object.deployAccount = $root.apibara.starknet.v1alpha2.DeployAccountTransactionFilter.toObject(message.deployAccount, options);
                        if (options.oneofs)
                            object.filter = "deployAccount";
                    }
                    return object;
                };

                /**
                 * Converts this TransactionFilter to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.TransactionFilter
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TransactionFilter.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for TransactionFilter
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.TransactionFilter
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                TransactionFilter.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.TransactionFilter";
                };

                return TransactionFilter;
            })();

            v1alpha2.InvokeTransactionV0Filter = (function() {

                /**
                 * Properties of an InvokeTransactionV0Filter.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IInvokeTransactionV0Filter
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [contractAddress] InvokeTransactionV0Filter contractAddress
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [entryPointSelector] InvokeTransactionV0Filter entryPointSelector
                 * @property {Array.<apibara.starknet.v1alpha2.IFieldElement>|null} [calldata] InvokeTransactionV0Filter calldata
                 */

                /**
                 * Constructs a new InvokeTransactionV0Filter.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents an InvokeTransactionV0Filter.
                 * @implements IInvokeTransactionV0Filter
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IInvokeTransactionV0Filter=} [properties] Properties to set
                 */
                function InvokeTransactionV0Filter(properties) {
                    this.calldata = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * InvokeTransactionV0Filter contractAddress.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} contractAddress
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV0Filter
                 * @instance
                 */
                InvokeTransactionV0Filter.prototype.contractAddress = null;

                /**
                 * InvokeTransactionV0Filter entryPointSelector.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} entryPointSelector
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV0Filter
                 * @instance
                 */
                InvokeTransactionV0Filter.prototype.entryPointSelector = null;

                /**
                 * InvokeTransactionV0Filter calldata.
                 * @member {Array.<apibara.starknet.v1alpha2.IFieldElement>} calldata
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV0Filter
                 * @instance
                 */
                InvokeTransactionV0Filter.prototype.calldata = $util.emptyArray;

                /**
                 * Creates a new InvokeTransactionV0Filter instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV0Filter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IInvokeTransactionV0Filter=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.InvokeTransactionV0Filter} InvokeTransactionV0Filter instance
                 */
                InvokeTransactionV0Filter.create = function create(properties) {
                    return new InvokeTransactionV0Filter(properties);
                };

                /**
                 * Encodes the specified InvokeTransactionV0Filter message. Does not implicitly {@link apibara.starknet.v1alpha2.InvokeTransactionV0Filter.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV0Filter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IInvokeTransactionV0Filter} message InvokeTransactionV0Filter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InvokeTransactionV0Filter.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.contractAddress != null && Object.hasOwnProperty.call(message, "contractAddress"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.contractAddress, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.entryPointSelector != null && Object.hasOwnProperty.call(message, "entryPointSelector"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.entryPointSelector, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.calldata != null && message.calldata.length)
                        for (var i = 0; i < message.calldata.length; ++i)
                            $root.apibara.starknet.v1alpha2.FieldElement.encode(message.calldata[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified InvokeTransactionV0Filter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.InvokeTransactionV0Filter.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV0Filter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IInvokeTransactionV0Filter} message InvokeTransactionV0Filter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InvokeTransactionV0Filter.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an InvokeTransactionV0Filter message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV0Filter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.InvokeTransactionV0Filter} InvokeTransactionV0Filter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InvokeTransactionV0Filter.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.InvokeTransactionV0Filter();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.entryPointSelector = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 3: {
                                if (!(message.calldata && message.calldata.length))
                                    message.calldata = [];
                                message.calldata.push($root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32()));
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an InvokeTransactionV0Filter message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV0Filter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.InvokeTransactionV0Filter} InvokeTransactionV0Filter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InvokeTransactionV0Filter.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an InvokeTransactionV0Filter message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV0Filter
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                InvokeTransactionV0Filter.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.contractAddress != null && message.hasOwnProperty("contractAddress")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.contractAddress);
                        if (error)
                            return "contractAddress." + error;
                    }
                    if (message.entryPointSelector != null && message.hasOwnProperty("entryPointSelector")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.entryPointSelector);
                        if (error)
                            return "entryPointSelector." + error;
                    }
                    if (message.calldata != null && message.hasOwnProperty("calldata")) {
                        if (!Array.isArray(message.calldata))
                            return "calldata: array expected";
                        for (var i = 0; i < message.calldata.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.calldata[i]);
                            if (error)
                                return "calldata." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates an InvokeTransactionV0Filter message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV0Filter
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.InvokeTransactionV0Filter} InvokeTransactionV0Filter
                 */
                InvokeTransactionV0Filter.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.InvokeTransactionV0Filter)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.InvokeTransactionV0Filter();
                    if (object.contractAddress != null) {
                        if (typeof object.contractAddress !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.InvokeTransactionV0Filter.contractAddress: object expected");
                        message.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.contractAddress);
                    }
                    if (object.entryPointSelector != null) {
                        if (typeof object.entryPointSelector !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.InvokeTransactionV0Filter.entryPointSelector: object expected");
                        message.entryPointSelector = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.entryPointSelector);
                    }
                    if (object.calldata) {
                        if (!Array.isArray(object.calldata))
                            throw TypeError(".apibara.starknet.v1alpha2.InvokeTransactionV0Filter.calldata: array expected");
                        message.calldata = [];
                        for (var i = 0; i < object.calldata.length; ++i) {
                            if (typeof object.calldata[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.InvokeTransactionV0Filter.calldata: object expected");
                            message.calldata[i] = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.calldata[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from an InvokeTransactionV0Filter message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV0Filter
                 * @static
                 * @param {apibara.starknet.v1alpha2.InvokeTransactionV0Filter} message InvokeTransactionV0Filter
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                InvokeTransactionV0Filter.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.calldata = [];
                    if (options.defaults) {
                        object.contractAddress = null;
                        object.entryPointSelector = null;
                    }
                    if (message.contractAddress != null && message.hasOwnProperty("contractAddress"))
                        object.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.contractAddress, options);
                    if (message.entryPointSelector != null && message.hasOwnProperty("entryPointSelector"))
                        object.entryPointSelector = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.entryPointSelector, options);
                    if (message.calldata && message.calldata.length) {
                        object.calldata = [];
                        for (var j = 0; j < message.calldata.length; ++j)
                            object.calldata[j] = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.calldata[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this InvokeTransactionV0Filter to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV0Filter
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                InvokeTransactionV0Filter.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for InvokeTransactionV0Filter
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV0Filter
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                InvokeTransactionV0Filter.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.InvokeTransactionV0Filter";
                };

                return InvokeTransactionV0Filter;
            })();

            v1alpha2.InvokeTransactionV1Filter = (function() {

                /**
                 * Properties of an InvokeTransactionV1Filter.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IInvokeTransactionV1Filter
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [senderAddress] InvokeTransactionV1Filter senderAddress
                 * @property {Array.<apibara.starknet.v1alpha2.IFieldElement>|null} [calldata] InvokeTransactionV1Filter calldata
                 */

                /**
                 * Constructs a new InvokeTransactionV1Filter.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents an InvokeTransactionV1Filter.
                 * @implements IInvokeTransactionV1Filter
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IInvokeTransactionV1Filter=} [properties] Properties to set
                 */
                function InvokeTransactionV1Filter(properties) {
                    this.calldata = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * InvokeTransactionV1Filter senderAddress.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} senderAddress
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV1Filter
                 * @instance
                 */
                InvokeTransactionV1Filter.prototype.senderAddress = null;

                /**
                 * InvokeTransactionV1Filter calldata.
                 * @member {Array.<apibara.starknet.v1alpha2.IFieldElement>} calldata
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV1Filter
                 * @instance
                 */
                InvokeTransactionV1Filter.prototype.calldata = $util.emptyArray;

                /**
                 * Creates a new InvokeTransactionV1Filter instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV1Filter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IInvokeTransactionV1Filter=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.InvokeTransactionV1Filter} InvokeTransactionV1Filter instance
                 */
                InvokeTransactionV1Filter.create = function create(properties) {
                    return new InvokeTransactionV1Filter(properties);
                };

                /**
                 * Encodes the specified InvokeTransactionV1Filter message. Does not implicitly {@link apibara.starknet.v1alpha2.InvokeTransactionV1Filter.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV1Filter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IInvokeTransactionV1Filter} message InvokeTransactionV1Filter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InvokeTransactionV1Filter.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.senderAddress != null && Object.hasOwnProperty.call(message, "senderAddress"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.senderAddress, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.calldata != null && message.calldata.length)
                        for (var i = 0; i < message.calldata.length; ++i)
                            $root.apibara.starknet.v1alpha2.FieldElement.encode(message.calldata[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified InvokeTransactionV1Filter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.InvokeTransactionV1Filter.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV1Filter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IInvokeTransactionV1Filter} message InvokeTransactionV1Filter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InvokeTransactionV1Filter.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an InvokeTransactionV1Filter message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV1Filter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.InvokeTransactionV1Filter} InvokeTransactionV1Filter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InvokeTransactionV1Filter.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.InvokeTransactionV1Filter();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.senderAddress = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 3: {
                                if (!(message.calldata && message.calldata.length))
                                    message.calldata = [];
                                message.calldata.push($root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32()));
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an InvokeTransactionV1Filter message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV1Filter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.InvokeTransactionV1Filter} InvokeTransactionV1Filter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InvokeTransactionV1Filter.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an InvokeTransactionV1Filter message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV1Filter
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                InvokeTransactionV1Filter.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.senderAddress != null && message.hasOwnProperty("senderAddress")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.senderAddress);
                        if (error)
                            return "senderAddress." + error;
                    }
                    if (message.calldata != null && message.hasOwnProperty("calldata")) {
                        if (!Array.isArray(message.calldata))
                            return "calldata: array expected";
                        for (var i = 0; i < message.calldata.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.calldata[i]);
                            if (error)
                                return "calldata." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates an InvokeTransactionV1Filter message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV1Filter
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.InvokeTransactionV1Filter} InvokeTransactionV1Filter
                 */
                InvokeTransactionV1Filter.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.InvokeTransactionV1Filter)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.InvokeTransactionV1Filter();
                    if (object.senderAddress != null) {
                        if (typeof object.senderAddress !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.InvokeTransactionV1Filter.senderAddress: object expected");
                        message.senderAddress = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.senderAddress);
                    }
                    if (object.calldata) {
                        if (!Array.isArray(object.calldata))
                            throw TypeError(".apibara.starknet.v1alpha2.InvokeTransactionV1Filter.calldata: array expected");
                        message.calldata = [];
                        for (var i = 0; i < object.calldata.length; ++i) {
                            if (typeof object.calldata[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.InvokeTransactionV1Filter.calldata: object expected");
                            message.calldata[i] = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.calldata[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from an InvokeTransactionV1Filter message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV1Filter
                 * @static
                 * @param {apibara.starknet.v1alpha2.InvokeTransactionV1Filter} message InvokeTransactionV1Filter
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                InvokeTransactionV1Filter.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.calldata = [];
                    if (options.defaults)
                        object.senderAddress = null;
                    if (message.senderAddress != null && message.hasOwnProperty("senderAddress"))
                        object.senderAddress = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.senderAddress, options);
                    if (message.calldata && message.calldata.length) {
                        object.calldata = [];
                        for (var j = 0; j < message.calldata.length; ++j)
                            object.calldata[j] = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.calldata[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this InvokeTransactionV1Filter to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV1Filter
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                InvokeTransactionV1Filter.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for InvokeTransactionV1Filter
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV1Filter
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                InvokeTransactionV1Filter.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.InvokeTransactionV1Filter";
                };

                return InvokeTransactionV1Filter;
            })();

            v1alpha2.DeployTransactionFilter = (function() {

                /**
                 * Properties of a DeployTransactionFilter.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IDeployTransactionFilter
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [contractAddressSalt] DeployTransactionFilter contractAddressSalt
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [classHash] DeployTransactionFilter classHash
                 * @property {Array.<apibara.starknet.v1alpha2.IFieldElement>|null} [constructorCalldata] DeployTransactionFilter constructorCalldata
                 */

                /**
                 * Constructs a new DeployTransactionFilter.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a DeployTransactionFilter.
                 * @implements IDeployTransactionFilter
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IDeployTransactionFilter=} [properties] Properties to set
                 */
                function DeployTransactionFilter(properties) {
                    this.constructorCalldata = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DeployTransactionFilter contractAddressSalt.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} contractAddressSalt
                 * @memberof apibara.starknet.v1alpha2.DeployTransactionFilter
                 * @instance
                 */
                DeployTransactionFilter.prototype.contractAddressSalt = null;

                /**
                 * DeployTransactionFilter classHash.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} classHash
                 * @memberof apibara.starknet.v1alpha2.DeployTransactionFilter
                 * @instance
                 */
                DeployTransactionFilter.prototype.classHash = null;

                /**
                 * DeployTransactionFilter constructorCalldata.
                 * @member {Array.<apibara.starknet.v1alpha2.IFieldElement>} constructorCalldata
                 * @memberof apibara.starknet.v1alpha2.DeployTransactionFilter
                 * @instance
                 */
                DeployTransactionFilter.prototype.constructorCalldata = $util.emptyArray;

                /**
                 * Creates a new DeployTransactionFilter instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.DeployTransactionFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeployTransactionFilter=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.DeployTransactionFilter} DeployTransactionFilter instance
                 */
                DeployTransactionFilter.create = function create(properties) {
                    return new DeployTransactionFilter(properties);
                };

                /**
                 * Encodes the specified DeployTransactionFilter message. Does not implicitly {@link apibara.starknet.v1alpha2.DeployTransactionFilter.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.DeployTransactionFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeployTransactionFilter} message DeployTransactionFilter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeployTransactionFilter.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.contractAddressSalt != null && Object.hasOwnProperty.call(message, "contractAddressSalt"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.contractAddressSalt, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.classHash != null && Object.hasOwnProperty.call(message, "classHash"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.classHash, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.constructorCalldata != null && message.constructorCalldata.length)
                        for (var i = 0; i < message.constructorCalldata.length; ++i)
                            $root.apibara.starknet.v1alpha2.FieldElement.encode(message.constructorCalldata[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified DeployTransactionFilter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.DeployTransactionFilter.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.DeployTransactionFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeployTransactionFilter} message DeployTransactionFilter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeployTransactionFilter.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a DeployTransactionFilter message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.DeployTransactionFilter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.DeployTransactionFilter} DeployTransactionFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeployTransactionFilter.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.DeployTransactionFilter();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.contractAddressSalt = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 4: {
                                if (!(message.constructorCalldata && message.constructorCalldata.length))
                                    message.constructorCalldata = [];
                                message.constructorCalldata.push($root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32()));
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a DeployTransactionFilter message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.DeployTransactionFilter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.DeployTransactionFilter} DeployTransactionFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeployTransactionFilter.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a DeployTransactionFilter message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.DeployTransactionFilter
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DeployTransactionFilter.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.contractAddressSalt != null && message.hasOwnProperty("contractAddressSalt")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.contractAddressSalt);
                        if (error)
                            return "contractAddressSalt." + error;
                    }
                    if (message.classHash != null && message.hasOwnProperty("classHash")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.classHash);
                        if (error)
                            return "classHash." + error;
                    }
                    if (message.constructorCalldata != null && message.hasOwnProperty("constructorCalldata")) {
                        if (!Array.isArray(message.constructorCalldata))
                            return "constructorCalldata: array expected";
                        for (var i = 0; i < message.constructorCalldata.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.constructorCalldata[i]);
                            if (error)
                                return "constructorCalldata." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a DeployTransactionFilter message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.DeployTransactionFilter
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.DeployTransactionFilter} DeployTransactionFilter
                 */
                DeployTransactionFilter.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.DeployTransactionFilter)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.DeployTransactionFilter();
                    if (object.contractAddressSalt != null) {
                        if (typeof object.contractAddressSalt !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.DeployTransactionFilter.contractAddressSalt: object expected");
                        message.contractAddressSalt = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.contractAddressSalt);
                    }
                    if (object.classHash != null) {
                        if (typeof object.classHash !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.DeployTransactionFilter.classHash: object expected");
                        message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.classHash);
                    }
                    if (object.constructorCalldata) {
                        if (!Array.isArray(object.constructorCalldata))
                            throw TypeError(".apibara.starknet.v1alpha2.DeployTransactionFilter.constructorCalldata: array expected");
                        message.constructorCalldata = [];
                        for (var i = 0; i < object.constructorCalldata.length; ++i) {
                            if (typeof object.constructorCalldata[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.DeployTransactionFilter.constructorCalldata: object expected");
                            message.constructorCalldata[i] = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.constructorCalldata[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a DeployTransactionFilter message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.DeployTransactionFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.DeployTransactionFilter} message DeployTransactionFilter
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DeployTransactionFilter.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.constructorCalldata = [];
                    if (options.defaults) {
                        object.contractAddressSalt = null;
                        object.classHash = null;
                    }
                    if (message.contractAddressSalt != null && message.hasOwnProperty("contractAddressSalt"))
                        object.contractAddressSalt = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.contractAddressSalt, options);
                    if (message.classHash != null && message.hasOwnProperty("classHash"))
                        object.classHash = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.classHash, options);
                    if (message.constructorCalldata && message.constructorCalldata.length) {
                        object.constructorCalldata = [];
                        for (var j = 0; j < message.constructorCalldata.length; ++j)
                            object.constructorCalldata[j] = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.constructorCalldata[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this DeployTransactionFilter to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.DeployTransactionFilter
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DeployTransactionFilter.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for DeployTransactionFilter
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.DeployTransactionFilter
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                DeployTransactionFilter.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.DeployTransactionFilter";
                };

                return DeployTransactionFilter;
            })();

            v1alpha2.DeclareTransactionFilter = (function() {

                /**
                 * Properties of a DeclareTransactionFilter.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IDeclareTransactionFilter
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [classHash] DeclareTransactionFilter classHash
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [senderAddress] DeclareTransactionFilter senderAddress
                 */

                /**
                 * Constructs a new DeclareTransactionFilter.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a DeclareTransactionFilter.
                 * @implements IDeclareTransactionFilter
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IDeclareTransactionFilter=} [properties] Properties to set
                 */
                function DeclareTransactionFilter(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DeclareTransactionFilter classHash.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} classHash
                 * @memberof apibara.starknet.v1alpha2.DeclareTransactionFilter
                 * @instance
                 */
                DeclareTransactionFilter.prototype.classHash = null;

                /**
                 * DeclareTransactionFilter senderAddress.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} senderAddress
                 * @memberof apibara.starknet.v1alpha2.DeclareTransactionFilter
                 * @instance
                 */
                DeclareTransactionFilter.prototype.senderAddress = null;

                /**
                 * Creates a new DeclareTransactionFilter instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.DeclareTransactionFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeclareTransactionFilter=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.DeclareTransactionFilter} DeclareTransactionFilter instance
                 */
                DeclareTransactionFilter.create = function create(properties) {
                    return new DeclareTransactionFilter(properties);
                };

                /**
                 * Encodes the specified DeclareTransactionFilter message. Does not implicitly {@link apibara.starknet.v1alpha2.DeclareTransactionFilter.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.DeclareTransactionFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeclareTransactionFilter} message DeclareTransactionFilter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeclareTransactionFilter.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.classHash != null && Object.hasOwnProperty.call(message, "classHash"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.classHash, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.senderAddress != null && Object.hasOwnProperty.call(message, "senderAddress"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.senderAddress, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified DeclareTransactionFilter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.DeclareTransactionFilter.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.DeclareTransactionFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeclareTransactionFilter} message DeclareTransactionFilter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeclareTransactionFilter.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a DeclareTransactionFilter message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.DeclareTransactionFilter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.DeclareTransactionFilter} DeclareTransactionFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeclareTransactionFilter.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.DeclareTransactionFilter();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.senderAddress = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a DeclareTransactionFilter message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.DeclareTransactionFilter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.DeclareTransactionFilter} DeclareTransactionFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeclareTransactionFilter.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a DeclareTransactionFilter message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.DeclareTransactionFilter
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DeclareTransactionFilter.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.classHash != null && message.hasOwnProperty("classHash")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.classHash);
                        if (error)
                            return "classHash." + error;
                    }
                    if (message.senderAddress != null && message.hasOwnProperty("senderAddress")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.senderAddress);
                        if (error)
                            return "senderAddress." + error;
                    }
                    return null;
                };

                /**
                 * Creates a DeclareTransactionFilter message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.DeclareTransactionFilter
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.DeclareTransactionFilter} DeclareTransactionFilter
                 */
                DeclareTransactionFilter.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.DeclareTransactionFilter)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.DeclareTransactionFilter();
                    if (object.classHash != null) {
                        if (typeof object.classHash !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.DeclareTransactionFilter.classHash: object expected");
                        message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.classHash);
                    }
                    if (object.senderAddress != null) {
                        if (typeof object.senderAddress !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.DeclareTransactionFilter.senderAddress: object expected");
                        message.senderAddress = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.senderAddress);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a DeclareTransactionFilter message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.DeclareTransactionFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.DeclareTransactionFilter} message DeclareTransactionFilter
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DeclareTransactionFilter.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.classHash = null;
                        object.senderAddress = null;
                    }
                    if (message.classHash != null && message.hasOwnProperty("classHash"))
                        object.classHash = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.classHash, options);
                    if (message.senderAddress != null && message.hasOwnProperty("senderAddress"))
                        object.senderAddress = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.senderAddress, options);
                    return object;
                };

                /**
                 * Converts this DeclareTransactionFilter to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.DeclareTransactionFilter
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DeclareTransactionFilter.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for DeclareTransactionFilter
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.DeclareTransactionFilter
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                DeclareTransactionFilter.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.DeclareTransactionFilter";
                };

                return DeclareTransactionFilter;
            })();

            v1alpha2.L1HandlerTransactionFilter = (function() {

                /**
                 * Properties of a L1HandlerTransactionFilter.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IL1HandlerTransactionFilter
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [contractAddress] L1HandlerTransactionFilter contractAddress
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [entryPointSelector] L1HandlerTransactionFilter entryPointSelector
                 * @property {Array.<apibara.starknet.v1alpha2.IFieldElement>|null} [calldata] L1HandlerTransactionFilter calldata
                 */

                /**
                 * Constructs a new L1HandlerTransactionFilter.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a L1HandlerTransactionFilter.
                 * @implements IL1HandlerTransactionFilter
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IL1HandlerTransactionFilter=} [properties] Properties to set
                 */
                function L1HandlerTransactionFilter(properties) {
                    this.calldata = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * L1HandlerTransactionFilter contractAddress.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} contractAddress
                 * @memberof apibara.starknet.v1alpha2.L1HandlerTransactionFilter
                 * @instance
                 */
                L1HandlerTransactionFilter.prototype.contractAddress = null;

                /**
                 * L1HandlerTransactionFilter entryPointSelector.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} entryPointSelector
                 * @memberof apibara.starknet.v1alpha2.L1HandlerTransactionFilter
                 * @instance
                 */
                L1HandlerTransactionFilter.prototype.entryPointSelector = null;

                /**
                 * L1HandlerTransactionFilter calldata.
                 * @member {Array.<apibara.starknet.v1alpha2.IFieldElement>} calldata
                 * @memberof apibara.starknet.v1alpha2.L1HandlerTransactionFilter
                 * @instance
                 */
                L1HandlerTransactionFilter.prototype.calldata = $util.emptyArray;

                /**
                 * Creates a new L1HandlerTransactionFilter instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.L1HandlerTransactionFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IL1HandlerTransactionFilter=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.L1HandlerTransactionFilter} L1HandlerTransactionFilter instance
                 */
                L1HandlerTransactionFilter.create = function create(properties) {
                    return new L1HandlerTransactionFilter(properties);
                };

                /**
                 * Encodes the specified L1HandlerTransactionFilter message. Does not implicitly {@link apibara.starknet.v1alpha2.L1HandlerTransactionFilter.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.L1HandlerTransactionFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IL1HandlerTransactionFilter} message L1HandlerTransactionFilter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                L1HandlerTransactionFilter.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.contractAddress != null && Object.hasOwnProperty.call(message, "contractAddress"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.contractAddress, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.entryPointSelector != null && Object.hasOwnProperty.call(message, "entryPointSelector"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.entryPointSelector, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.calldata != null && message.calldata.length)
                        for (var i = 0; i < message.calldata.length; ++i)
                            $root.apibara.starknet.v1alpha2.FieldElement.encode(message.calldata[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified L1HandlerTransactionFilter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.L1HandlerTransactionFilter.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.L1HandlerTransactionFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IL1HandlerTransactionFilter} message L1HandlerTransactionFilter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                L1HandlerTransactionFilter.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a L1HandlerTransactionFilter message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.L1HandlerTransactionFilter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.L1HandlerTransactionFilter} L1HandlerTransactionFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                L1HandlerTransactionFilter.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.L1HandlerTransactionFilter();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.entryPointSelector = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 3: {
                                if (!(message.calldata && message.calldata.length))
                                    message.calldata = [];
                                message.calldata.push($root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32()));
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a L1HandlerTransactionFilter message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.L1HandlerTransactionFilter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.L1HandlerTransactionFilter} L1HandlerTransactionFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                L1HandlerTransactionFilter.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a L1HandlerTransactionFilter message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.L1HandlerTransactionFilter
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                L1HandlerTransactionFilter.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.contractAddress != null && message.hasOwnProperty("contractAddress")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.contractAddress);
                        if (error)
                            return "contractAddress." + error;
                    }
                    if (message.entryPointSelector != null && message.hasOwnProperty("entryPointSelector")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.entryPointSelector);
                        if (error)
                            return "entryPointSelector." + error;
                    }
                    if (message.calldata != null && message.hasOwnProperty("calldata")) {
                        if (!Array.isArray(message.calldata))
                            return "calldata: array expected";
                        for (var i = 0; i < message.calldata.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.calldata[i]);
                            if (error)
                                return "calldata." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a L1HandlerTransactionFilter message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.L1HandlerTransactionFilter
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.L1HandlerTransactionFilter} L1HandlerTransactionFilter
                 */
                L1HandlerTransactionFilter.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.L1HandlerTransactionFilter)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.L1HandlerTransactionFilter();
                    if (object.contractAddress != null) {
                        if (typeof object.contractAddress !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.L1HandlerTransactionFilter.contractAddress: object expected");
                        message.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.contractAddress);
                    }
                    if (object.entryPointSelector != null) {
                        if (typeof object.entryPointSelector !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.L1HandlerTransactionFilter.entryPointSelector: object expected");
                        message.entryPointSelector = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.entryPointSelector);
                    }
                    if (object.calldata) {
                        if (!Array.isArray(object.calldata))
                            throw TypeError(".apibara.starknet.v1alpha2.L1HandlerTransactionFilter.calldata: array expected");
                        message.calldata = [];
                        for (var i = 0; i < object.calldata.length; ++i) {
                            if (typeof object.calldata[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.L1HandlerTransactionFilter.calldata: object expected");
                            message.calldata[i] = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.calldata[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a L1HandlerTransactionFilter message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.L1HandlerTransactionFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.L1HandlerTransactionFilter} message L1HandlerTransactionFilter
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                L1HandlerTransactionFilter.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.calldata = [];
                    if (options.defaults) {
                        object.contractAddress = null;
                        object.entryPointSelector = null;
                    }
                    if (message.contractAddress != null && message.hasOwnProperty("contractAddress"))
                        object.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.contractAddress, options);
                    if (message.entryPointSelector != null && message.hasOwnProperty("entryPointSelector"))
                        object.entryPointSelector = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.entryPointSelector, options);
                    if (message.calldata && message.calldata.length) {
                        object.calldata = [];
                        for (var j = 0; j < message.calldata.length; ++j)
                            object.calldata[j] = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.calldata[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this L1HandlerTransactionFilter to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.L1HandlerTransactionFilter
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                L1HandlerTransactionFilter.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for L1HandlerTransactionFilter
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.L1HandlerTransactionFilter
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                L1HandlerTransactionFilter.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.L1HandlerTransactionFilter";
                };

                return L1HandlerTransactionFilter;
            })();

            v1alpha2.DeployAccountTransactionFilter = (function() {

                /**
                 * Properties of a DeployAccountTransactionFilter.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IDeployAccountTransactionFilter
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [contractAddressSalt] DeployAccountTransactionFilter contractAddressSalt
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [classHash] DeployAccountTransactionFilter classHash
                 * @property {Array.<apibara.starknet.v1alpha2.IFieldElement>|null} [constructorCalldata] DeployAccountTransactionFilter constructorCalldata
                 */

                /**
                 * Constructs a new DeployAccountTransactionFilter.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a DeployAccountTransactionFilter.
                 * @implements IDeployAccountTransactionFilter
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IDeployAccountTransactionFilter=} [properties] Properties to set
                 */
                function DeployAccountTransactionFilter(properties) {
                    this.constructorCalldata = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DeployAccountTransactionFilter contractAddressSalt.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} contractAddressSalt
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransactionFilter
                 * @instance
                 */
                DeployAccountTransactionFilter.prototype.contractAddressSalt = null;

                /**
                 * DeployAccountTransactionFilter classHash.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} classHash
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransactionFilter
                 * @instance
                 */
                DeployAccountTransactionFilter.prototype.classHash = null;

                /**
                 * DeployAccountTransactionFilter constructorCalldata.
                 * @member {Array.<apibara.starknet.v1alpha2.IFieldElement>} constructorCalldata
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransactionFilter
                 * @instance
                 */
                DeployAccountTransactionFilter.prototype.constructorCalldata = $util.emptyArray;

                /**
                 * Creates a new DeployAccountTransactionFilter instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransactionFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeployAccountTransactionFilter=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.DeployAccountTransactionFilter} DeployAccountTransactionFilter instance
                 */
                DeployAccountTransactionFilter.create = function create(properties) {
                    return new DeployAccountTransactionFilter(properties);
                };

                /**
                 * Encodes the specified DeployAccountTransactionFilter message. Does not implicitly {@link apibara.starknet.v1alpha2.DeployAccountTransactionFilter.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransactionFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeployAccountTransactionFilter} message DeployAccountTransactionFilter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeployAccountTransactionFilter.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.contractAddressSalt != null && Object.hasOwnProperty.call(message, "contractAddressSalt"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.contractAddressSalt, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.classHash != null && Object.hasOwnProperty.call(message, "classHash"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.classHash, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.constructorCalldata != null && message.constructorCalldata.length)
                        for (var i = 0; i < message.constructorCalldata.length; ++i)
                            $root.apibara.starknet.v1alpha2.FieldElement.encode(message.constructorCalldata[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified DeployAccountTransactionFilter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.DeployAccountTransactionFilter.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransactionFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeployAccountTransactionFilter} message DeployAccountTransactionFilter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeployAccountTransactionFilter.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a DeployAccountTransactionFilter message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransactionFilter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.DeployAccountTransactionFilter} DeployAccountTransactionFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeployAccountTransactionFilter.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.DeployAccountTransactionFilter();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.contractAddressSalt = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 4: {
                                if (!(message.constructorCalldata && message.constructorCalldata.length))
                                    message.constructorCalldata = [];
                                message.constructorCalldata.push($root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32()));
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a DeployAccountTransactionFilter message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransactionFilter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.DeployAccountTransactionFilter} DeployAccountTransactionFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeployAccountTransactionFilter.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a DeployAccountTransactionFilter message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransactionFilter
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DeployAccountTransactionFilter.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.contractAddressSalt != null && message.hasOwnProperty("contractAddressSalt")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.contractAddressSalt);
                        if (error)
                            return "contractAddressSalt." + error;
                    }
                    if (message.classHash != null && message.hasOwnProperty("classHash")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.classHash);
                        if (error)
                            return "classHash." + error;
                    }
                    if (message.constructorCalldata != null && message.hasOwnProperty("constructorCalldata")) {
                        if (!Array.isArray(message.constructorCalldata))
                            return "constructorCalldata: array expected";
                        for (var i = 0; i < message.constructorCalldata.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.constructorCalldata[i]);
                            if (error)
                                return "constructorCalldata." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a DeployAccountTransactionFilter message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransactionFilter
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.DeployAccountTransactionFilter} DeployAccountTransactionFilter
                 */
                DeployAccountTransactionFilter.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.DeployAccountTransactionFilter)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.DeployAccountTransactionFilter();
                    if (object.contractAddressSalt != null) {
                        if (typeof object.contractAddressSalt !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.DeployAccountTransactionFilter.contractAddressSalt: object expected");
                        message.contractAddressSalt = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.contractAddressSalt);
                    }
                    if (object.classHash != null) {
                        if (typeof object.classHash !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.DeployAccountTransactionFilter.classHash: object expected");
                        message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.classHash);
                    }
                    if (object.constructorCalldata) {
                        if (!Array.isArray(object.constructorCalldata))
                            throw TypeError(".apibara.starknet.v1alpha2.DeployAccountTransactionFilter.constructorCalldata: array expected");
                        message.constructorCalldata = [];
                        for (var i = 0; i < object.constructorCalldata.length; ++i) {
                            if (typeof object.constructorCalldata[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.DeployAccountTransactionFilter.constructorCalldata: object expected");
                            message.constructorCalldata[i] = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.constructorCalldata[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a DeployAccountTransactionFilter message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransactionFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.DeployAccountTransactionFilter} message DeployAccountTransactionFilter
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DeployAccountTransactionFilter.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.constructorCalldata = [];
                    if (options.defaults) {
                        object.contractAddressSalt = null;
                        object.classHash = null;
                    }
                    if (message.contractAddressSalt != null && message.hasOwnProperty("contractAddressSalt"))
                        object.contractAddressSalt = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.contractAddressSalt, options);
                    if (message.classHash != null && message.hasOwnProperty("classHash"))
                        object.classHash = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.classHash, options);
                    if (message.constructorCalldata && message.constructorCalldata.length) {
                        object.constructorCalldata = [];
                        for (var j = 0; j < message.constructorCalldata.length; ++j)
                            object.constructorCalldata[j] = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.constructorCalldata[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this DeployAccountTransactionFilter to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransactionFilter
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DeployAccountTransactionFilter.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for DeployAccountTransactionFilter
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransactionFilter
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                DeployAccountTransactionFilter.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.DeployAccountTransactionFilter";
                };

                return DeployAccountTransactionFilter;
            })();

            v1alpha2.L2ToL1MessageFilter = (function() {

                /**
                 * Properties of a L2ToL1MessageFilter.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IL2ToL1MessageFilter
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [toAddress] L2ToL1MessageFilter toAddress
                 * @property {Array.<apibara.starknet.v1alpha2.IFieldElement>|null} [payload] L2ToL1MessageFilter payload
                 */

                /**
                 * Constructs a new L2ToL1MessageFilter.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a L2ToL1MessageFilter.
                 * @implements IL2ToL1MessageFilter
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IL2ToL1MessageFilter=} [properties] Properties to set
                 */
                function L2ToL1MessageFilter(properties) {
                    this.payload = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * L2ToL1MessageFilter toAddress.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} toAddress
                 * @memberof apibara.starknet.v1alpha2.L2ToL1MessageFilter
                 * @instance
                 */
                L2ToL1MessageFilter.prototype.toAddress = null;

                /**
                 * L2ToL1MessageFilter payload.
                 * @member {Array.<apibara.starknet.v1alpha2.IFieldElement>} payload
                 * @memberof apibara.starknet.v1alpha2.L2ToL1MessageFilter
                 * @instance
                 */
                L2ToL1MessageFilter.prototype.payload = $util.emptyArray;

                /**
                 * Creates a new L2ToL1MessageFilter instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.L2ToL1MessageFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IL2ToL1MessageFilter=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.L2ToL1MessageFilter} L2ToL1MessageFilter instance
                 */
                L2ToL1MessageFilter.create = function create(properties) {
                    return new L2ToL1MessageFilter(properties);
                };

                /**
                 * Encodes the specified L2ToL1MessageFilter message. Does not implicitly {@link apibara.starknet.v1alpha2.L2ToL1MessageFilter.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.L2ToL1MessageFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IL2ToL1MessageFilter} message L2ToL1MessageFilter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                L2ToL1MessageFilter.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.toAddress != null && Object.hasOwnProperty.call(message, "toAddress"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.toAddress, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.payload != null && message.payload.length)
                        for (var i = 0; i < message.payload.length; ++i)
                            $root.apibara.starknet.v1alpha2.FieldElement.encode(message.payload[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified L2ToL1MessageFilter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.L2ToL1MessageFilter.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.L2ToL1MessageFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IL2ToL1MessageFilter} message L2ToL1MessageFilter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                L2ToL1MessageFilter.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a L2ToL1MessageFilter message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.L2ToL1MessageFilter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.L2ToL1MessageFilter} L2ToL1MessageFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                L2ToL1MessageFilter.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.L2ToL1MessageFilter();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.toAddress = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                if (!(message.payload && message.payload.length))
                                    message.payload = [];
                                message.payload.push($root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32()));
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a L2ToL1MessageFilter message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.L2ToL1MessageFilter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.L2ToL1MessageFilter} L2ToL1MessageFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                L2ToL1MessageFilter.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a L2ToL1MessageFilter message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.L2ToL1MessageFilter
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                L2ToL1MessageFilter.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.toAddress != null && message.hasOwnProperty("toAddress")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.toAddress);
                        if (error)
                            return "toAddress." + error;
                    }
                    if (message.payload != null && message.hasOwnProperty("payload")) {
                        if (!Array.isArray(message.payload))
                            return "payload: array expected";
                        for (var i = 0; i < message.payload.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.payload[i]);
                            if (error)
                                return "payload." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a L2ToL1MessageFilter message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.L2ToL1MessageFilter
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.L2ToL1MessageFilter} L2ToL1MessageFilter
                 */
                L2ToL1MessageFilter.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.L2ToL1MessageFilter)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.L2ToL1MessageFilter();
                    if (object.toAddress != null) {
                        if (typeof object.toAddress !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.L2ToL1MessageFilter.toAddress: object expected");
                        message.toAddress = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.toAddress);
                    }
                    if (object.payload) {
                        if (!Array.isArray(object.payload))
                            throw TypeError(".apibara.starknet.v1alpha2.L2ToL1MessageFilter.payload: array expected");
                        message.payload = [];
                        for (var i = 0; i < object.payload.length; ++i) {
                            if (typeof object.payload[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.L2ToL1MessageFilter.payload: object expected");
                            message.payload[i] = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.payload[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a L2ToL1MessageFilter message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.L2ToL1MessageFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.L2ToL1MessageFilter} message L2ToL1MessageFilter
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                L2ToL1MessageFilter.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.payload = [];
                    if (options.defaults)
                        object.toAddress = null;
                    if (message.toAddress != null && message.hasOwnProperty("toAddress"))
                        object.toAddress = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.toAddress, options);
                    if (message.payload && message.payload.length) {
                        object.payload = [];
                        for (var j = 0; j < message.payload.length; ++j)
                            object.payload[j] = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.payload[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this L2ToL1MessageFilter to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.L2ToL1MessageFilter
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                L2ToL1MessageFilter.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for L2ToL1MessageFilter
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.L2ToL1MessageFilter
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                L2ToL1MessageFilter.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.L2ToL1MessageFilter";
                };

                return L2ToL1MessageFilter;
            })();

            v1alpha2.EventFilter = (function() {

                /**
                 * Properties of an EventFilter.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IEventFilter
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [fromAddress] EventFilter fromAddress
                 * @property {Array.<apibara.starknet.v1alpha2.IFieldElement>|null} [keys] EventFilter keys
                 * @property {Array.<apibara.starknet.v1alpha2.IFieldElement>|null} [data] EventFilter data
                 * @property {boolean|null} [includeReverted] EventFilter includeReverted
                 * @property {boolean|null} [includeTransaction] EventFilter includeTransaction
                 * @property {boolean|null} [includeReceipt] EventFilter includeReceipt
                 */

                /**
                 * Constructs a new EventFilter.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents an EventFilter.
                 * @implements IEventFilter
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IEventFilter=} [properties] Properties to set
                 */
                function EventFilter(properties) {
                    this.keys = [];
                    this.data = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * EventFilter fromAddress.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} fromAddress
                 * @memberof apibara.starknet.v1alpha2.EventFilter
                 * @instance
                 */
                EventFilter.prototype.fromAddress = null;

                /**
                 * EventFilter keys.
                 * @member {Array.<apibara.starknet.v1alpha2.IFieldElement>} keys
                 * @memberof apibara.starknet.v1alpha2.EventFilter
                 * @instance
                 */
                EventFilter.prototype.keys = $util.emptyArray;

                /**
                 * EventFilter data.
                 * @member {Array.<apibara.starknet.v1alpha2.IFieldElement>} data
                 * @memberof apibara.starknet.v1alpha2.EventFilter
                 * @instance
                 */
                EventFilter.prototype.data = $util.emptyArray;

                /**
                 * EventFilter includeReverted.
                 * @member {boolean|null|undefined} includeReverted
                 * @memberof apibara.starknet.v1alpha2.EventFilter
                 * @instance
                 */
                EventFilter.prototype.includeReverted = null;

                /**
                 * EventFilter includeTransaction.
                 * @member {boolean|null|undefined} includeTransaction
                 * @memberof apibara.starknet.v1alpha2.EventFilter
                 * @instance
                 */
                EventFilter.prototype.includeTransaction = null;

                /**
                 * EventFilter includeReceipt.
                 * @member {boolean|null|undefined} includeReceipt
                 * @memberof apibara.starknet.v1alpha2.EventFilter
                 * @instance
                 */
                EventFilter.prototype.includeReceipt = null;

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * EventFilter _includeReverted.
                 * @member {"includeReverted"|undefined} _includeReverted
                 * @memberof apibara.starknet.v1alpha2.EventFilter
                 * @instance
                 */
                Object.defineProperty(EventFilter.prototype, "_includeReverted", {
                    get: $util.oneOfGetter($oneOfFields = ["includeReverted"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * EventFilter _includeTransaction.
                 * @member {"includeTransaction"|undefined} _includeTransaction
                 * @memberof apibara.starknet.v1alpha2.EventFilter
                 * @instance
                 */
                Object.defineProperty(EventFilter.prototype, "_includeTransaction", {
                    get: $util.oneOfGetter($oneOfFields = ["includeTransaction"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * EventFilter _includeReceipt.
                 * @member {"includeReceipt"|undefined} _includeReceipt
                 * @memberof apibara.starknet.v1alpha2.EventFilter
                 * @instance
                 */
                Object.defineProperty(EventFilter.prototype, "_includeReceipt", {
                    get: $util.oneOfGetter($oneOfFields = ["includeReceipt"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new EventFilter instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.EventFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IEventFilter=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.EventFilter} EventFilter instance
                 */
                EventFilter.create = function create(properties) {
                    return new EventFilter(properties);
                };

                /**
                 * Encodes the specified EventFilter message. Does not implicitly {@link apibara.starknet.v1alpha2.EventFilter.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.EventFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IEventFilter} message EventFilter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                EventFilter.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.fromAddress != null && Object.hasOwnProperty.call(message, "fromAddress"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.fromAddress, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.keys != null && message.keys.length)
                        for (var i = 0; i < message.keys.length; ++i)
                            $root.apibara.starknet.v1alpha2.FieldElement.encode(message.keys[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.data != null && message.data.length)
                        for (var i = 0; i < message.data.length; ++i)
                            $root.apibara.starknet.v1alpha2.FieldElement.encode(message.data[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.includeReverted != null && Object.hasOwnProperty.call(message, "includeReverted"))
                        writer.uint32(/* id 4, wireType 0 =*/32).bool(message.includeReverted);
                    if (message.includeTransaction != null && Object.hasOwnProperty.call(message, "includeTransaction"))
                        writer.uint32(/* id 5, wireType 0 =*/40).bool(message.includeTransaction);
                    if (message.includeReceipt != null && Object.hasOwnProperty.call(message, "includeReceipt"))
                        writer.uint32(/* id 6, wireType 0 =*/48).bool(message.includeReceipt);
                    return writer;
                };

                /**
                 * Encodes the specified EventFilter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.EventFilter.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.EventFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IEventFilter} message EventFilter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                EventFilter.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an EventFilter message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.EventFilter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.EventFilter} EventFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                EventFilter.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.EventFilter();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.fromAddress = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                if (!(message.keys && message.keys.length))
                                    message.keys = [];
                                message.keys.push($root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32()));
                                break;
                            }
                        case 3: {
                                if (!(message.data && message.data.length))
                                    message.data = [];
                                message.data.push($root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32()));
                                break;
                            }
                        case 4: {
                                message.includeReverted = reader.bool();
                                break;
                            }
                        case 5: {
                                message.includeTransaction = reader.bool();
                                break;
                            }
                        case 6: {
                                message.includeReceipt = reader.bool();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an EventFilter message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.EventFilter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.EventFilter} EventFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                EventFilter.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an EventFilter message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.EventFilter
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                EventFilter.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    var properties = {};
                    if (message.fromAddress != null && message.hasOwnProperty("fromAddress")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.fromAddress);
                        if (error)
                            return "fromAddress." + error;
                    }
                    if (message.keys != null && message.hasOwnProperty("keys")) {
                        if (!Array.isArray(message.keys))
                            return "keys: array expected";
                        for (var i = 0; i < message.keys.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.keys[i]);
                            if (error)
                                return "keys." + error;
                        }
                    }
                    if (message.data != null && message.hasOwnProperty("data")) {
                        if (!Array.isArray(message.data))
                            return "data: array expected";
                        for (var i = 0; i < message.data.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.data[i]);
                            if (error)
                                return "data." + error;
                        }
                    }
                    if (message.includeReverted != null && message.hasOwnProperty("includeReverted")) {
                        properties._includeReverted = 1;
                        if (typeof message.includeReverted !== "boolean")
                            return "includeReverted: boolean expected";
                    }
                    if (message.includeTransaction != null && message.hasOwnProperty("includeTransaction")) {
                        properties._includeTransaction = 1;
                        if (typeof message.includeTransaction !== "boolean")
                            return "includeTransaction: boolean expected";
                    }
                    if (message.includeReceipt != null && message.hasOwnProperty("includeReceipt")) {
                        properties._includeReceipt = 1;
                        if (typeof message.includeReceipt !== "boolean")
                            return "includeReceipt: boolean expected";
                    }
                    return null;
                };

                /**
                 * Creates an EventFilter message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.EventFilter
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.EventFilter} EventFilter
                 */
                EventFilter.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.EventFilter)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.EventFilter();
                    if (object.fromAddress != null) {
                        if (typeof object.fromAddress !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.EventFilter.fromAddress: object expected");
                        message.fromAddress = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.fromAddress);
                    }
                    if (object.keys) {
                        if (!Array.isArray(object.keys))
                            throw TypeError(".apibara.starknet.v1alpha2.EventFilter.keys: array expected");
                        message.keys = [];
                        for (var i = 0; i < object.keys.length; ++i) {
                            if (typeof object.keys[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.EventFilter.keys: object expected");
                            message.keys[i] = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.keys[i]);
                        }
                    }
                    if (object.data) {
                        if (!Array.isArray(object.data))
                            throw TypeError(".apibara.starknet.v1alpha2.EventFilter.data: array expected");
                        message.data = [];
                        for (var i = 0; i < object.data.length; ++i) {
                            if (typeof object.data[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.EventFilter.data: object expected");
                            message.data[i] = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.data[i]);
                        }
                    }
                    if (object.includeReverted != null)
                        message.includeReverted = Boolean(object.includeReverted);
                    if (object.includeTransaction != null)
                        message.includeTransaction = Boolean(object.includeTransaction);
                    if (object.includeReceipt != null)
                        message.includeReceipt = Boolean(object.includeReceipt);
                    return message;
                };

                /**
                 * Creates a plain object from an EventFilter message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.EventFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.EventFilter} message EventFilter
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                EventFilter.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults) {
                        object.keys = [];
                        object.data = [];
                    }
                    if (options.defaults)
                        object.fromAddress = null;
                    if (message.fromAddress != null && message.hasOwnProperty("fromAddress"))
                        object.fromAddress = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.fromAddress, options);
                    if (message.keys && message.keys.length) {
                        object.keys = [];
                        for (var j = 0; j < message.keys.length; ++j)
                            object.keys[j] = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.keys[j], options);
                    }
                    if (message.data && message.data.length) {
                        object.data = [];
                        for (var j = 0; j < message.data.length; ++j)
                            object.data[j] = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.data[j], options);
                    }
                    if (message.includeReverted != null && message.hasOwnProperty("includeReverted")) {
                        object.includeReverted = message.includeReverted;
                        if (options.oneofs)
                            object._includeReverted = "includeReverted";
                    }
                    if (message.includeTransaction != null && message.hasOwnProperty("includeTransaction")) {
                        object.includeTransaction = message.includeTransaction;
                        if (options.oneofs)
                            object._includeTransaction = "includeTransaction";
                    }
                    if (message.includeReceipt != null && message.hasOwnProperty("includeReceipt")) {
                        object.includeReceipt = message.includeReceipt;
                        if (options.oneofs)
                            object._includeReceipt = "includeReceipt";
                    }
                    return object;
                };

                /**
                 * Converts this EventFilter to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.EventFilter
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                EventFilter.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for EventFilter
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.EventFilter
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                EventFilter.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.EventFilter";
                };

                return EventFilter;
            })();

            v1alpha2.StateUpdateFilter = (function() {

                /**
                 * Properties of a StateUpdateFilter.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IStateUpdateFilter
                 * @property {Array.<apibara.starknet.v1alpha2.IStorageDiffFilter>|null} [storageDiffs] StateUpdateFilter storageDiffs
                 * @property {Array.<apibara.starknet.v1alpha2.IDeclaredContractFilter>|null} [declaredContracts] StateUpdateFilter declaredContracts
                 * @property {Array.<apibara.starknet.v1alpha2.IDeployedContractFilter>|null} [deployedContracts] StateUpdateFilter deployedContracts
                 * @property {Array.<apibara.starknet.v1alpha2.INonceUpdateFilter>|null} [nonces] StateUpdateFilter nonces
                 * @property {Array.<apibara.starknet.v1alpha2.IDeclaredClassFilter>|null} [declaredClasses] StateUpdateFilter declaredClasses
                 * @property {Array.<apibara.starknet.v1alpha2.IReplacedClassFilter>|null} [replacedClasses] StateUpdateFilter replacedClasses
                 */

                /**
                 * Constructs a new StateUpdateFilter.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a StateUpdateFilter.
                 * @implements IStateUpdateFilter
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IStateUpdateFilter=} [properties] Properties to set
                 */
                function StateUpdateFilter(properties) {
                    this.storageDiffs = [];
                    this.declaredContracts = [];
                    this.deployedContracts = [];
                    this.nonces = [];
                    this.declaredClasses = [];
                    this.replacedClasses = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * StateUpdateFilter storageDiffs.
                 * @member {Array.<apibara.starknet.v1alpha2.IStorageDiffFilter>} storageDiffs
                 * @memberof apibara.starknet.v1alpha2.StateUpdateFilter
                 * @instance
                 */
                StateUpdateFilter.prototype.storageDiffs = $util.emptyArray;

                /**
                 * StateUpdateFilter declaredContracts.
                 * @member {Array.<apibara.starknet.v1alpha2.IDeclaredContractFilter>} declaredContracts
                 * @memberof apibara.starknet.v1alpha2.StateUpdateFilter
                 * @instance
                 */
                StateUpdateFilter.prototype.declaredContracts = $util.emptyArray;

                /**
                 * StateUpdateFilter deployedContracts.
                 * @member {Array.<apibara.starknet.v1alpha2.IDeployedContractFilter>} deployedContracts
                 * @memberof apibara.starknet.v1alpha2.StateUpdateFilter
                 * @instance
                 */
                StateUpdateFilter.prototype.deployedContracts = $util.emptyArray;

                /**
                 * StateUpdateFilter nonces.
                 * @member {Array.<apibara.starknet.v1alpha2.INonceUpdateFilter>} nonces
                 * @memberof apibara.starknet.v1alpha2.StateUpdateFilter
                 * @instance
                 */
                StateUpdateFilter.prototype.nonces = $util.emptyArray;

                /**
                 * StateUpdateFilter declaredClasses.
                 * @member {Array.<apibara.starknet.v1alpha2.IDeclaredClassFilter>} declaredClasses
                 * @memberof apibara.starknet.v1alpha2.StateUpdateFilter
                 * @instance
                 */
                StateUpdateFilter.prototype.declaredClasses = $util.emptyArray;

                /**
                 * StateUpdateFilter replacedClasses.
                 * @member {Array.<apibara.starknet.v1alpha2.IReplacedClassFilter>} replacedClasses
                 * @memberof apibara.starknet.v1alpha2.StateUpdateFilter
                 * @instance
                 */
                StateUpdateFilter.prototype.replacedClasses = $util.emptyArray;

                /**
                 * Creates a new StateUpdateFilter instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.StateUpdateFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IStateUpdateFilter=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.StateUpdateFilter} StateUpdateFilter instance
                 */
                StateUpdateFilter.create = function create(properties) {
                    return new StateUpdateFilter(properties);
                };

                /**
                 * Encodes the specified StateUpdateFilter message. Does not implicitly {@link apibara.starknet.v1alpha2.StateUpdateFilter.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.StateUpdateFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IStateUpdateFilter} message StateUpdateFilter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                StateUpdateFilter.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.storageDiffs != null && message.storageDiffs.length)
                        for (var i = 0; i < message.storageDiffs.length; ++i)
                            $root.apibara.starknet.v1alpha2.StorageDiffFilter.encode(message.storageDiffs[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.declaredContracts != null && message.declaredContracts.length)
                        for (var i = 0; i < message.declaredContracts.length; ++i)
                            $root.apibara.starknet.v1alpha2.DeclaredContractFilter.encode(message.declaredContracts[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.deployedContracts != null && message.deployedContracts.length)
                        for (var i = 0; i < message.deployedContracts.length; ++i)
                            $root.apibara.starknet.v1alpha2.DeployedContractFilter.encode(message.deployedContracts[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.nonces != null && message.nonces.length)
                        for (var i = 0; i < message.nonces.length; ++i)
                            $root.apibara.starknet.v1alpha2.NonceUpdateFilter.encode(message.nonces[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    if (message.declaredClasses != null && message.declaredClasses.length)
                        for (var i = 0; i < message.declaredClasses.length; ++i)
                            $root.apibara.starknet.v1alpha2.DeclaredClassFilter.encode(message.declaredClasses[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                    if (message.replacedClasses != null && message.replacedClasses.length)
                        for (var i = 0; i < message.replacedClasses.length; ++i)
                            $root.apibara.starknet.v1alpha2.ReplacedClassFilter.encode(message.replacedClasses[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified StateUpdateFilter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.StateUpdateFilter.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.StateUpdateFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IStateUpdateFilter} message StateUpdateFilter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                StateUpdateFilter.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a StateUpdateFilter message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.StateUpdateFilter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.StateUpdateFilter} StateUpdateFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                StateUpdateFilter.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.StateUpdateFilter();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                if (!(message.storageDiffs && message.storageDiffs.length))
                                    message.storageDiffs = [];
                                message.storageDiffs.push($root.apibara.starknet.v1alpha2.StorageDiffFilter.decode(reader, reader.uint32()));
                                break;
                            }
                        case 2: {
                                if (!(message.declaredContracts && message.declaredContracts.length))
                                    message.declaredContracts = [];
                                message.declaredContracts.push($root.apibara.starknet.v1alpha2.DeclaredContractFilter.decode(reader, reader.uint32()));
                                break;
                            }
                        case 3: {
                                if (!(message.deployedContracts && message.deployedContracts.length))
                                    message.deployedContracts = [];
                                message.deployedContracts.push($root.apibara.starknet.v1alpha2.DeployedContractFilter.decode(reader, reader.uint32()));
                                break;
                            }
                        case 4: {
                                if (!(message.nonces && message.nonces.length))
                                    message.nonces = [];
                                message.nonces.push($root.apibara.starknet.v1alpha2.NonceUpdateFilter.decode(reader, reader.uint32()));
                                break;
                            }
                        case 5: {
                                if (!(message.declaredClasses && message.declaredClasses.length))
                                    message.declaredClasses = [];
                                message.declaredClasses.push($root.apibara.starknet.v1alpha2.DeclaredClassFilter.decode(reader, reader.uint32()));
                                break;
                            }
                        case 6: {
                                if (!(message.replacedClasses && message.replacedClasses.length))
                                    message.replacedClasses = [];
                                message.replacedClasses.push($root.apibara.starknet.v1alpha2.ReplacedClassFilter.decode(reader, reader.uint32()));
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a StateUpdateFilter message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.StateUpdateFilter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.StateUpdateFilter} StateUpdateFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                StateUpdateFilter.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a StateUpdateFilter message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.StateUpdateFilter
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                StateUpdateFilter.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.storageDiffs != null && message.hasOwnProperty("storageDiffs")) {
                        if (!Array.isArray(message.storageDiffs))
                            return "storageDiffs: array expected";
                        for (var i = 0; i < message.storageDiffs.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.StorageDiffFilter.verify(message.storageDiffs[i]);
                            if (error)
                                return "storageDiffs." + error;
                        }
                    }
                    if (message.declaredContracts != null && message.hasOwnProperty("declaredContracts")) {
                        if (!Array.isArray(message.declaredContracts))
                            return "declaredContracts: array expected";
                        for (var i = 0; i < message.declaredContracts.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.DeclaredContractFilter.verify(message.declaredContracts[i]);
                            if (error)
                                return "declaredContracts." + error;
                        }
                    }
                    if (message.deployedContracts != null && message.hasOwnProperty("deployedContracts")) {
                        if (!Array.isArray(message.deployedContracts))
                            return "deployedContracts: array expected";
                        for (var i = 0; i < message.deployedContracts.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.DeployedContractFilter.verify(message.deployedContracts[i]);
                            if (error)
                                return "deployedContracts." + error;
                        }
                    }
                    if (message.nonces != null && message.hasOwnProperty("nonces")) {
                        if (!Array.isArray(message.nonces))
                            return "nonces: array expected";
                        for (var i = 0; i < message.nonces.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.NonceUpdateFilter.verify(message.nonces[i]);
                            if (error)
                                return "nonces." + error;
                        }
                    }
                    if (message.declaredClasses != null && message.hasOwnProperty("declaredClasses")) {
                        if (!Array.isArray(message.declaredClasses))
                            return "declaredClasses: array expected";
                        for (var i = 0; i < message.declaredClasses.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.DeclaredClassFilter.verify(message.declaredClasses[i]);
                            if (error)
                                return "declaredClasses." + error;
                        }
                    }
                    if (message.replacedClasses != null && message.hasOwnProperty("replacedClasses")) {
                        if (!Array.isArray(message.replacedClasses))
                            return "replacedClasses: array expected";
                        for (var i = 0; i < message.replacedClasses.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.ReplacedClassFilter.verify(message.replacedClasses[i]);
                            if (error)
                                return "replacedClasses." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a StateUpdateFilter message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.StateUpdateFilter
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.StateUpdateFilter} StateUpdateFilter
                 */
                StateUpdateFilter.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.StateUpdateFilter)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.StateUpdateFilter();
                    if (object.storageDiffs) {
                        if (!Array.isArray(object.storageDiffs))
                            throw TypeError(".apibara.starknet.v1alpha2.StateUpdateFilter.storageDiffs: array expected");
                        message.storageDiffs = [];
                        for (var i = 0; i < object.storageDiffs.length; ++i) {
                            if (typeof object.storageDiffs[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.StateUpdateFilter.storageDiffs: object expected");
                            message.storageDiffs[i] = $root.apibara.starknet.v1alpha2.StorageDiffFilter.fromObject(object.storageDiffs[i]);
                        }
                    }
                    if (object.declaredContracts) {
                        if (!Array.isArray(object.declaredContracts))
                            throw TypeError(".apibara.starknet.v1alpha2.StateUpdateFilter.declaredContracts: array expected");
                        message.declaredContracts = [];
                        for (var i = 0; i < object.declaredContracts.length; ++i) {
                            if (typeof object.declaredContracts[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.StateUpdateFilter.declaredContracts: object expected");
                            message.declaredContracts[i] = $root.apibara.starknet.v1alpha2.DeclaredContractFilter.fromObject(object.declaredContracts[i]);
                        }
                    }
                    if (object.deployedContracts) {
                        if (!Array.isArray(object.deployedContracts))
                            throw TypeError(".apibara.starknet.v1alpha2.StateUpdateFilter.deployedContracts: array expected");
                        message.deployedContracts = [];
                        for (var i = 0; i < object.deployedContracts.length; ++i) {
                            if (typeof object.deployedContracts[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.StateUpdateFilter.deployedContracts: object expected");
                            message.deployedContracts[i] = $root.apibara.starknet.v1alpha2.DeployedContractFilter.fromObject(object.deployedContracts[i]);
                        }
                    }
                    if (object.nonces) {
                        if (!Array.isArray(object.nonces))
                            throw TypeError(".apibara.starknet.v1alpha2.StateUpdateFilter.nonces: array expected");
                        message.nonces = [];
                        for (var i = 0; i < object.nonces.length; ++i) {
                            if (typeof object.nonces[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.StateUpdateFilter.nonces: object expected");
                            message.nonces[i] = $root.apibara.starknet.v1alpha2.NonceUpdateFilter.fromObject(object.nonces[i]);
                        }
                    }
                    if (object.declaredClasses) {
                        if (!Array.isArray(object.declaredClasses))
                            throw TypeError(".apibara.starknet.v1alpha2.StateUpdateFilter.declaredClasses: array expected");
                        message.declaredClasses = [];
                        for (var i = 0; i < object.declaredClasses.length; ++i) {
                            if (typeof object.declaredClasses[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.StateUpdateFilter.declaredClasses: object expected");
                            message.declaredClasses[i] = $root.apibara.starknet.v1alpha2.DeclaredClassFilter.fromObject(object.declaredClasses[i]);
                        }
                    }
                    if (object.replacedClasses) {
                        if (!Array.isArray(object.replacedClasses))
                            throw TypeError(".apibara.starknet.v1alpha2.StateUpdateFilter.replacedClasses: array expected");
                        message.replacedClasses = [];
                        for (var i = 0; i < object.replacedClasses.length; ++i) {
                            if (typeof object.replacedClasses[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.StateUpdateFilter.replacedClasses: object expected");
                            message.replacedClasses[i] = $root.apibara.starknet.v1alpha2.ReplacedClassFilter.fromObject(object.replacedClasses[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a StateUpdateFilter message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.StateUpdateFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.StateUpdateFilter} message StateUpdateFilter
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                StateUpdateFilter.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults) {
                        object.storageDiffs = [];
                        object.declaredContracts = [];
                        object.deployedContracts = [];
                        object.nonces = [];
                        object.declaredClasses = [];
                        object.replacedClasses = [];
                    }
                    if (message.storageDiffs && message.storageDiffs.length) {
                        object.storageDiffs = [];
                        for (var j = 0; j < message.storageDiffs.length; ++j)
                            object.storageDiffs[j] = $root.apibara.starknet.v1alpha2.StorageDiffFilter.toObject(message.storageDiffs[j], options);
                    }
                    if (message.declaredContracts && message.declaredContracts.length) {
                        object.declaredContracts = [];
                        for (var j = 0; j < message.declaredContracts.length; ++j)
                            object.declaredContracts[j] = $root.apibara.starknet.v1alpha2.DeclaredContractFilter.toObject(message.declaredContracts[j], options);
                    }
                    if (message.deployedContracts && message.deployedContracts.length) {
                        object.deployedContracts = [];
                        for (var j = 0; j < message.deployedContracts.length; ++j)
                            object.deployedContracts[j] = $root.apibara.starknet.v1alpha2.DeployedContractFilter.toObject(message.deployedContracts[j], options);
                    }
                    if (message.nonces && message.nonces.length) {
                        object.nonces = [];
                        for (var j = 0; j < message.nonces.length; ++j)
                            object.nonces[j] = $root.apibara.starknet.v1alpha2.NonceUpdateFilter.toObject(message.nonces[j], options);
                    }
                    if (message.declaredClasses && message.declaredClasses.length) {
                        object.declaredClasses = [];
                        for (var j = 0; j < message.declaredClasses.length; ++j)
                            object.declaredClasses[j] = $root.apibara.starknet.v1alpha2.DeclaredClassFilter.toObject(message.declaredClasses[j], options);
                    }
                    if (message.replacedClasses && message.replacedClasses.length) {
                        object.replacedClasses = [];
                        for (var j = 0; j < message.replacedClasses.length; ++j)
                            object.replacedClasses[j] = $root.apibara.starknet.v1alpha2.ReplacedClassFilter.toObject(message.replacedClasses[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this StateUpdateFilter to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.StateUpdateFilter
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                StateUpdateFilter.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for StateUpdateFilter
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.StateUpdateFilter
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                StateUpdateFilter.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.StateUpdateFilter";
                };

                return StateUpdateFilter;
            })();

            v1alpha2.StorageDiffFilter = (function() {

                /**
                 * Properties of a StorageDiffFilter.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IStorageDiffFilter
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [contractAddress] StorageDiffFilter contractAddress
                 */

                /**
                 * Constructs a new StorageDiffFilter.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a StorageDiffFilter.
                 * @implements IStorageDiffFilter
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IStorageDiffFilter=} [properties] Properties to set
                 */
                function StorageDiffFilter(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * StorageDiffFilter contractAddress.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} contractAddress
                 * @memberof apibara.starknet.v1alpha2.StorageDiffFilter
                 * @instance
                 */
                StorageDiffFilter.prototype.contractAddress = null;

                /**
                 * Creates a new StorageDiffFilter instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.StorageDiffFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IStorageDiffFilter=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.StorageDiffFilter} StorageDiffFilter instance
                 */
                StorageDiffFilter.create = function create(properties) {
                    return new StorageDiffFilter(properties);
                };

                /**
                 * Encodes the specified StorageDiffFilter message. Does not implicitly {@link apibara.starknet.v1alpha2.StorageDiffFilter.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.StorageDiffFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IStorageDiffFilter} message StorageDiffFilter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                StorageDiffFilter.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.contractAddress != null && Object.hasOwnProperty.call(message, "contractAddress"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.contractAddress, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified StorageDiffFilter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.StorageDiffFilter.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.StorageDiffFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IStorageDiffFilter} message StorageDiffFilter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                StorageDiffFilter.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a StorageDiffFilter message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.StorageDiffFilter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.StorageDiffFilter} StorageDiffFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                StorageDiffFilter.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.StorageDiffFilter();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a StorageDiffFilter message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.StorageDiffFilter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.StorageDiffFilter} StorageDiffFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                StorageDiffFilter.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a StorageDiffFilter message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.StorageDiffFilter
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                StorageDiffFilter.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.contractAddress != null && message.hasOwnProperty("contractAddress")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.contractAddress);
                        if (error)
                            return "contractAddress." + error;
                    }
                    return null;
                };

                /**
                 * Creates a StorageDiffFilter message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.StorageDiffFilter
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.StorageDiffFilter} StorageDiffFilter
                 */
                StorageDiffFilter.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.StorageDiffFilter)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.StorageDiffFilter();
                    if (object.contractAddress != null) {
                        if (typeof object.contractAddress !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.StorageDiffFilter.contractAddress: object expected");
                        message.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.contractAddress);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a StorageDiffFilter message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.StorageDiffFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.StorageDiffFilter} message StorageDiffFilter
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                StorageDiffFilter.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.contractAddress = null;
                    if (message.contractAddress != null && message.hasOwnProperty("contractAddress"))
                        object.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.contractAddress, options);
                    return object;
                };

                /**
                 * Converts this StorageDiffFilter to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.StorageDiffFilter
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                StorageDiffFilter.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for StorageDiffFilter
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.StorageDiffFilter
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                StorageDiffFilter.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.StorageDiffFilter";
                };

                return StorageDiffFilter;
            })();

            v1alpha2.DeclaredContractFilter = (function() {

                /**
                 * Properties of a DeclaredContractFilter.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IDeclaredContractFilter
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [classHash] DeclaredContractFilter classHash
                 */

                /**
                 * Constructs a new DeclaredContractFilter.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a DeclaredContractFilter.
                 * @implements IDeclaredContractFilter
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IDeclaredContractFilter=} [properties] Properties to set
                 */
                function DeclaredContractFilter(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DeclaredContractFilter classHash.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} classHash
                 * @memberof apibara.starknet.v1alpha2.DeclaredContractFilter
                 * @instance
                 */
                DeclaredContractFilter.prototype.classHash = null;

                /**
                 * Creates a new DeclaredContractFilter instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.DeclaredContractFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeclaredContractFilter=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.DeclaredContractFilter} DeclaredContractFilter instance
                 */
                DeclaredContractFilter.create = function create(properties) {
                    return new DeclaredContractFilter(properties);
                };

                /**
                 * Encodes the specified DeclaredContractFilter message. Does not implicitly {@link apibara.starknet.v1alpha2.DeclaredContractFilter.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.DeclaredContractFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeclaredContractFilter} message DeclaredContractFilter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeclaredContractFilter.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.classHash != null && Object.hasOwnProperty.call(message, "classHash"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.classHash, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified DeclaredContractFilter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.DeclaredContractFilter.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.DeclaredContractFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeclaredContractFilter} message DeclaredContractFilter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeclaredContractFilter.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a DeclaredContractFilter message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.DeclaredContractFilter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.DeclaredContractFilter} DeclaredContractFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeclaredContractFilter.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.DeclaredContractFilter();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a DeclaredContractFilter message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.DeclaredContractFilter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.DeclaredContractFilter} DeclaredContractFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeclaredContractFilter.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a DeclaredContractFilter message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.DeclaredContractFilter
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DeclaredContractFilter.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.classHash != null && message.hasOwnProperty("classHash")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.classHash);
                        if (error)
                            return "classHash." + error;
                    }
                    return null;
                };

                /**
                 * Creates a DeclaredContractFilter message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.DeclaredContractFilter
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.DeclaredContractFilter} DeclaredContractFilter
                 */
                DeclaredContractFilter.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.DeclaredContractFilter)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.DeclaredContractFilter();
                    if (object.classHash != null) {
                        if (typeof object.classHash !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.DeclaredContractFilter.classHash: object expected");
                        message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.classHash);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a DeclaredContractFilter message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.DeclaredContractFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.DeclaredContractFilter} message DeclaredContractFilter
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DeclaredContractFilter.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.classHash = null;
                    if (message.classHash != null && message.hasOwnProperty("classHash"))
                        object.classHash = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.classHash, options);
                    return object;
                };

                /**
                 * Converts this DeclaredContractFilter to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.DeclaredContractFilter
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DeclaredContractFilter.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for DeclaredContractFilter
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.DeclaredContractFilter
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                DeclaredContractFilter.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.DeclaredContractFilter";
                };

                return DeclaredContractFilter;
            })();

            v1alpha2.DeclaredClassFilter = (function() {

                /**
                 * Properties of a DeclaredClassFilter.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IDeclaredClassFilter
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [classHash] DeclaredClassFilter classHash
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [compiledClassHash] DeclaredClassFilter compiledClassHash
                 */

                /**
                 * Constructs a new DeclaredClassFilter.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a DeclaredClassFilter.
                 * @implements IDeclaredClassFilter
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IDeclaredClassFilter=} [properties] Properties to set
                 */
                function DeclaredClassFilter(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DeclaredClassFilter classHash.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} classHash
                 * @memberof apibara.starknet.v1alpha2.DeclaredClassFilter
                 * @instance
                 */
                DeclaredClassFilter.prototype.classHash = null;

                /**
                 * DeclaredClassFilter compiledClassHash.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} compiledClassHash
                 * @memberof apibara.starknet.v1alpha2.DeclaredClassFilter
                 * @instance
                 */
                DeclaredClassFilter.prototype.compiledClassHash = null;

                /**
                 * Creates a new DeclaredClassFilter instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.DeclaredClassFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeclaredClassFilter=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.DeclaredClassFilter} DeclaredClassFilter instance
                 */
                DeclaredClassFilter.create = function create(properties) {
                    return new DeclaredClassFilter(properties);
                };

                /**
                 * Encodes the specified DeclaredClassFilter message. Does not implicitly {@link apibara.starknet.v1alpha2.DeclaredClassFilter.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.DeclaredClassFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeclaredClassFilter} message DeclaredClassFilter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeclaredClassFilter.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.classHash != null && Object.hasOwnProperty.call(message, "classHash"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.classHash, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.compiledClassHash != null && Object.hasOwnProperty.call(message, "compiledClassHash"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.compiledClassHash, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified DeclaredClassFilter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.DeclaredClassFilter.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.DeclaredClassFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeclaredClassFilter} message DeclaredClassFilter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeclaredClassFilter.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a DeclaredClassFilter message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.DeclaredClassFilter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.DeclaredClassFilter} DeclaredClassFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeclaredClassFilter.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.DeclaredClassFilter();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.compiledClassHash = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a DeclaredClassFilter message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.DeclaredClassFilter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.DeclaredClassFilter} DeclaredClassFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeclaredClassFilter.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a DeclaredClassFilter message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.DeclaredClassFilter
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DeclaredClassFilter.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.classHash != null && message.hasOwnProperty("classHash")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.classHash);
                        if (error)
                            return "classHash." + error;
                    }
                    if (message.compiledClassHash != null && message.hasOwnProperty("compiledClassHash")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.compiledClassHash);
                        if (error)
                            return "compiledClassHash." + error;
                    }
                    return null;
                };

                /**
                 * Creates a DeclaredClassFilter message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.DeclaredClassFilter
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.DeclaredClassFilter} DeclaredClassFilter
                 */
                DeclaredClassFilter.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.DeclaredClassFilter)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.DeclaredClassFilter();
                    if (object.classHash != null) {
                        if (typeof object.classHash !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.DeclaredClassFilter.classHash: object expected");
                        message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.classHash);
                    }
                    if (object.compiledClassHash != null) {
                        if (typeof object.compiledClassHash !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.DeclaredClassFilter.compiledClassHash: object expected");
                        message.compiledClassHash = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.compiledClassHash);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a DeclaredClassFilter message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.DeclaredClassFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.DeclaredClassFilter} message DeclaredClassFilter
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DeclaredClassFilter.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.classHash = null;
                        object.compiledClassHash = null;
                    }
                    if (message.classHash != null && message.hasOwnProperty("classHash"))
                        object.classHash = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.classHash, options);
                    if (message.compiledClassHash != null && message.hasOwnProperty("compiledClassHash"))
                        object.compiledClassHash = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.compiledClassHash, options);
                    return object;
                };

                /**
                 * Converts this DeclaredClassFilter to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.DeclaredClassFilter
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DeclaredClassFilter.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for DeclaredClassFilter
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.DeclaredClassFilter
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                DeclaredClassFilter.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.DeclaredClassFilter";
                };

                return DeclaredClassFilter;
            })();

            v1alpha2.ReplacedClassFilter = (function() {

                /**
                 * Properties of a ReplacedClassFilter.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IReplacedClassFilter
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [contractAddress] ReplacedClassFilter contractAddress
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [classHash] ReplacedClassFilter classHash
                 */

                /**
                 * Constructs a new ReplacedClassFilter.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a ReplacedClassFilter.
                 * @implements IReplacedClassFilter
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IReplacedClassFilter=} [properties] Properties to set
                 */
                function ReplacedClassFilter(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ReplacedClassFilter contractAddress.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} contractAddress
                 * @memberof apibara.starknet.v1alpha2.ReplacedClassFilter
                 * @instance
                 */
                ReplacedClassFilter.prototype.contractAddress = null;

                /**
                 * ReplacedClassFilter classHash.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} classHash
                 * @memberof apibara.starknet.v1alpha2.ReplacedClassFilter
                 * @instance
                 */
                ReplacedClassFilter.prototype.classHash = null;

                /**
                 * Creates a new ReplacedClassFilter instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.ReplacedClassFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IReplacedClassFilter=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.ReplacedClassFilter} ReplacedClassFilter instance
                 */
                ReplacedClassFilter.create = function create(properties) {
                    return new ReplacedClassFilter(properties);
                };

                /**
                 * Encodes the specified ReplacedClassFilter message. Does not implicitly {@link apibara.starknet.v1alpha2.ReplacedClassFilter.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.ReplacedClassFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IReplacedClassFilter} message ReplacedClassFilter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ReplacedClassFilter.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.contractAddress != null && Object.hasOwnProperty.call(message, "contractAddress"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.contractAddress, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.classHash != null && Object.hasOwnProperty.call(message, "classHash"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.classHash, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified ReplacedClassFilter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.ReplacedClassFilter.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.ReplacedClassFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IReplacedClassFilter} message ReplacedClassFilter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ReplacedClassFilter.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ReplacedClassFilter message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.ReplacedClassFilter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.ReplacedClassFilter} ReplacedClassFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ReplacedClassFilter.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.ReplacedClassFilter();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ReplacedClassFilter message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.ReplacedClassFilter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.ReplacedClassFilter} ReplacedClassFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ReplacedClassFilter.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ReplacedClassFilter message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.ReplacedClassFilter
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ReplacedClassFilter.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.contractAddress != null && message.hasOwnProperty("contractAddress")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.contractAddress);
                        if (error)
                            return "contractAddress." + error;
                    }
                    if (message.classHash != null && message.hasOwnProperty("classHash")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.classHash);
                        if (error)
                            return "classHash." + error;
                    }
                    return null;
                };

                /**
                 * Creates a ReplacedClassFilter message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.ReplacedClassFilter
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.ReplacedClassFilter} ReplacedClassFilter
                 */
                ReplacedClassFilter.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.ReplacedClassFilter)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.ReplacedClassFilter();
                    if (object.contractAddress != null) {
                        if (typeof object.contractAddress !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.ReplacedClassFilter.contractAddress: object expected");
                        message.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.contractAddress);
                    }
                    if (object.classHash != null) {
                        if (typeof object.classHash !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.ReplacedClassFilter.classHash: object expected");
                        message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.classHash);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a ReplacedClassFilter message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.ReplacedClassFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.ReplacedClassFilter} message ReplacedClassFilter
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ReplacedClassFilter.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.contractAddress = null;
                        object.classHash = null;
                    }
                    if (message.contractAddress != null && message.hasOwnProperty("contractAddress"))
                        object.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.contractAddress, options);
                    if (message.classHash != null && message.hasOwnProperty("classHash"))
                        object.classHash = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.classHash, options);
                    return object;
                };

                /**
                 * Converts this ReplacedClassFilter to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.ReplacedClassFilter
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ReplacedClassFilter.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ReplacedClassFilter
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.ReplacedClassFilter
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ReplacedClassFilter.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.ReplacedClassFilter";
                };

                return ReplacedClassFilter;
            })();

            v1alpha2.DeployedContractFilter = (function() {

                /**
                 * Properties of a DeployedContractFilter.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IDeployedContractFilter
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [contractAddress] DeployedContractFilter contractAddress
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [classHash] DeployedContractFilter classHash
                 */

                /**
                 * Constructs a new DeployedContractFilter.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a DeployedContractFilter.
                 * @implements IDeployedContractFilter
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IDeployedContractFilter=} [properties] Properties to set
                 */
                function DeployedContractFilter(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DeployedContractFilter contractAddress.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} contractAddress
                 * @memberof apibara.starknet.v1alpha2.DeployedContractFilter
                 * @instance
                 */
                DeployedContractFilter.prototype.contractAddress = null;

                /**
                 * DeployedContractFilter classHash.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} classHash
                 * @memberof apibara.starknet.v1alpha2.DeployedContractFilter
                 * @instance
                 */
                DeployedContractFilter.prototype.classHash = null;

                /**
                 * Creates a new DeployedContractFilter instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.DeployedContractFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeployedContractFilter=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.DeployedContractFilter} DeployedContractFilter instance
                 */
                DeployedContractFilter.create = function create(properties) {
                    return new DeployedContractFilter(properties);
                };

                /**
                 * Encodes the specified DeployedContractFilter message. Does not implicitly {@link apibara.starknet.v1alpha2.DeployedContractFilter.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.DeployedContractFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeployedContractFilter} message DeployedContractFilter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeployedContractFilter.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.contractAddress != null && Object.hasOwnProperty.call(message, "contractAddress"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.contractAddress, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.classHash != null && Object.hasOwnProperty.call(message, "classHash"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.classHash, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified DeployedContractFilter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.DeployedContractFilter.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.DeployedContractFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeployedContractFilter} message DeployedContractFilter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeployedContractFilter.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a DeployedContractFilter message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.DeployedContractFilter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.DeployedContractFilter} DeployedContractFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeployedContractFilter.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.DeployedContractFilter();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a DeployedContractFilter message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.DeployedContractFilter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.DeployedContractFilter} DeployedContractFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeployedContractFilter.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a DeployedContractFilter message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.DeployedContractFilter
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DeployedContractFilter.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.contractAddress != null && message.hasOwnProperty("contractAddress")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.contractAddress);
                        if (error)
                            return "contractAddress." + error;
                    }
                    if (message.classHash != null && message.hasOwnProperty("classHash")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.classHash);
                        if (error)
                            return "classHash." + error;
                    }
                    return null;
                };

                /**
                 * Creates a DeployedContractFilter message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.DeployedContractFilter
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.DeployedContractFilter} DeployedContractFilter
                 */
                DeployedContractFilter.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.DeployedContractFilter)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.DeployedContractFilter();
                    if (object.contractAddress != null) {
                        if (typeof object.contractAddress !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.DeployedContractFilter.contractAddress: object expected");
                        message.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.contractAddress);
                    }
                    if (object.classHash != null) {
                        if (typeof object.classHash !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.DeployedContractFilter.classHash: object expected");
                        message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.classHash);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a DeployedContractFilter message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.DeployedContractFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.DeployedContractFilter} message DeployedContractFilter
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DeployedContractFilter.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.contractAddress = null;
                        object.classHash = null;
                    }
                    if (message.contractAddress != null && message.hasOwnProperty("contractAddress"))
                        object.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.contractAddress, options);
                    if (message.classHash != null && message.hasOwnProperty("classHash"))
                        object.classHash = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.classHash, options);
                    return object;
                };

                /**
                 * Converts this DeployedContractFilter to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.DeployedContractFilter
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DeployedContractFilter.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for DeployedContractFilter
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.DeployedContractFilter
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                DeployedContractFilter.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.DeployedContractFilter";
                };

                return DeployedContractFilter;
            })();

            v1alpha2.NonceUpdateFilter = (function() {

                /**
                 * Properties of a NonceUpdateFilter.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface INonceUpdateFilter
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [contractAddress] NonceUpdateFilter contractAddress
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [nonce] NonceUpdateFilter nonce
                 */

                /**
                 * Constructs a new NonceUpdateFilter.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a NonceUpdateFilter.
                 * @implements INonceUpdateFilter
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.INonceUpdateFilter=} [properties] Properties to set
                 */
                function NonceUpdateFilter(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * NonceUpdateFilter contractAddress.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} contractAddress
                 * @memberof apibara.starknet.v1alpha2.NonceUpdateFilter
                 * @instance
                 */
                NonceUpdateFilter.prototype.contractAddress = null;

                /**
                 * NonceUpdateFilter nonce.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} nonce
                 * @memberof apibara.starknet.v1alpha2.NonceUpdateFilter
                 * @instance
                 */
                NonceUpdateFilter.prototype.nonce = null;

                /**
                 * Creates a new NonceUpdateFilter instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.NonceUpdateFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.INonceUpdateFilter=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.NonceUpdateFilter} NonceUpdateFilter instance
                 */
                NonceUpdateFilter.create = function create(properties) {
                    return new NonceUpdateFilter(properties);
                };

                /**
                 * Encodes the specified NonceUpdateFilter message. Does not implicitly {@link apibara.starknet.v1alpha2.NonceUpdateFilter.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.NonceUpdateFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.INonceUpdateFilter} message NonceUpdateFilter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                NonceUpdateFilter.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.contractAddress != null && Object.hasOwnProperty.call(message, "contractAddress"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.contractAddress, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.nonce != null && Object.hasOwnProperty.call(message, "nonce"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.nonce, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified NonceUpdateFilter message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.NonceUpdateFilter.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.NonceUpdateFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.INonceUpdateFilter} message NonceUpdateFilter message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                NonceUpdateFilter.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a NonceUpdateFilter message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.NonceUpdateFilter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.NonceUpdateFilter} NonceUpdateFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                NonceUpdateFilter.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.NonceUpdateFilter();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.nonce = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a NonceUpdateFilter message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.NonceUpdateFilter
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.NonceUpdateFilter} NonceUpdateFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                NonceUpdateFilter.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a NonceUpdateFilter message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.NonceUpdateFilter
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                NonceUpdateFilter.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.contractAddress != null && message.hasOwnProperty("contractAddress")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.contractAddress);
                        if (error)
                            return "contractAddress." + error;
                    }
                    if (message.nonce != null && message.hasOwnProperty("nonce")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.nonce);
                        if (error)
                            return "nonce." + error;
                    }
                    return null;
                };

                /**
                 * Creates a NonceUpdateFilter message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.NonceUpdateFilter
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.NonceUpdateFilter} NonceUpdateFilter
                 */
                NonceUpdateFilter.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.NonceUpdateFilter)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.NonceUpdateFilter();
                    if (object.contractAddress != null) {
                        if (typeof object.contractAddress !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.NonceUpdateFilter.contractAddress: object expected");
                        message.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.contractAddress);
                    }
                    if (object.nonce != null) {
                        if (typeof object.nonce !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.NonceUpdateFilter.nonce: object expected");
                        message.nonce = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.nonce);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a NonceUpdateFilter message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.NonceUpdateFilter
                 * @static
                 * @param {apibara.starknet.v1alpha2.NonceUpdateFilter} message NonceUpdateFilter
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                NonceUpdateFilter.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.contractAddress = null;
                        object.nonce = null;
                    }
                    if (message.contractAddress != null && message.hasOwnProperty("contractAddress"))
                        object.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.contractAddress, options);
                    if (message.nonce != null && message.hasOwnProperty("nonce"))
                        object.nonce = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.nonce, options);
                    return object;
                };

                /**
                 * Converts this NonceUpdateFilter to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.NonceUpdateFilter
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                NonceUpdateFilter.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for NonceUpdateFilter
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.NonceUpdateFilter
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                NonceUpdateFilter.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.NonceUpdateFilter";
                };

                return NonceUpdateFilter;
            })();

            v1alpha2.FieldElement = (function() {

                /**
                 * Properties of a FieldElement.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IFieldElement
                 * @property {number|Long|null} [loLo] FieldElement loLo
                 * @property {number|Long|null} [loHi] FieldElement loHi
                 * @property {number|Long|null} [hiLo] FieldElement hiLo
                 * @property {number|Long|null} [hiHi] FieldElement hiHi
                 */

                /**
                 * Constructs a new FieldElement.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a FieldElement.
                 * @implements IFieldElement
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IFieldElement=} [properties] Properties to set
                 */
                function FieldElement(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * FieldElement loLo.
                 * @member {number|Long} loLo
                 * @memberof apibara.starknet.v1alpha2.FieldElement
                 * @instance
                 */
                FieldElement.prototype.loLo = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * FieldElement loHi.
                 * @member {number|Long} loHi
                 * @memberof apibara.starknet.v1alpha2.FieldElement
                 * @instance
                 */
                FieldElement.prototype.loHi = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * FieldElement hiLo.
                 * @member {number|Long} hiLo
                 * @memberof apibara.starknet.v1alpha2.FieldElement
                 * @instance
                 */
                FieldElement.prototype.hiLo = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * FieldElement hiHi.
                 * @member {number|Long} hiHi
                 * @memberof apibara.starknet.v1alpha2.FieldElement
                 * @instance
                 */
                FieldElement.prototype.hiHi = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * Creates a new FieldElement instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.FieldElement
                 * @static
                 * @param {apibara.starknet.v1alpha2.IFieldElement=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.FieldElement} FieldElement instance
                 */
                FieldElement.create = function create(properties) {
                    return new FieldElement(properties);
                };

                /**
                 * Encodes the specified FieldElement message. Does not implicitly {@link apibara.starknet.v1alpha2.FieldElement.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.FieldElement
                 * @static
                 * @param {apibara.starknet.v1alpha2.IFieldElement} message FieldElement message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                FieldElement.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.loLo != null && Object.hasOwnProperty.call(message, "loLo"))
                        writer.uint32(/* id 1, wireType 1 =*/9).fixed64(message.loLo);
                    if (message.loHi != null && Object.hasOwnProperty.call(message, "loHi"))
                        writer.uint32(/* id 2, wireType 1 =*/17).fixed64(message.loHi);
                    if (message.hiLo != null && Object.hasOwnProperty.call(message, "hiLo"))
                        writer.uint32(/* id 3, wireType 1 =*/25).fixed64(message.hiLo);
                    if (message.hiHi != null && Object.hasOwnProperty.call(message, "hiHi"))
                        writer.uint32(/* id 4, wireType 1 =*/33).fixed64(message.hiHi);
                    return writer;
                };

                /**
                 * Encodes the specified FieldElement message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.FieldElement.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.FieldElement
                 * @static
                 * @param {apibara.starknet.v1alpha2.IFieldElement} message FieldElement message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                FieldElement.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a FieldElement message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.FieldElement
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.FieldElement} FieldElement
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                FieldElement.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.FieldElement();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.loLo = reader.fixed64();
                                break;
                            }
                        case 2: {
                                message.loHi = reader.fixed64();
                                break;
                            }
                        case 3: {
                                message.hiLo = reader.fixed64();
                                break;
                            }
                        case 4: {
                                message.hiHi = reader.fixed64();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a FieldElement message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.FieldElement
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.FieldElement} FieldElement
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                FieldElement.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a FieldElement message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.FieldElement
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                FieldElement.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.loLo != null && message.hasOwnProperty("loLo"))
                        if (!$util.isInteger(message.loLo) && !(message.loLo && $util.isInteger(message.loLo.low) && $util.isInteger(message.loLo.high)))
                            return "loLo: integer|Long expected";
                    if (message.loHi != null && message.hasOwnProperty("loHi"))
                        if (!$util.isInteger(message.loHi) && !(message.loHi && $util.isInteger(message.loHi.low) && $util.isInteger(message.loHi.high)))
                            return "loHi: integer|Long expected";
                    if (message.hiLo != null && message.hasOwnProperty("hiLo"))
                        if (!$util.isInteger(message.hiLo) && !(message.hiLo && $util.isInteger(message.hiLo.low) && $util.isInteger(message.hiLo.high)))
                            return "hiLo: integer|Long expected";
                    if (message.hiHi != null && message.hasOwnProperty("hiHi"))
                        if (!$util.isInteger(message.hiHi) && !(message.hiHi && $util.isInteger(message.hiHi.low) && $util.isInteger(message.hiHi.high)))
                            return "hiHi: integer|Long expected";
                    return null;
                };

                /**
                 * Creates a FieldElement message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.FieldElement
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.FieldElement} FieldElement
                 */
                FieldElement.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.FieldElement)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.FieldElement();
                    if (object.loLo != null)
                        if ($util.Long)
                            (message.loLo = $util.Long.fromValue(object.loLo)).unsigned = false;
                        else if (typeof object.loLo === "string")
                            message.loLo = parseInt(object.loLo, 10);
                        else if (typeof object.loLo === "number")
                            message.loLo = object.loLo;
                        else if (typeof object.loLo === "object")
                            message.loLo = new $util.LongBits(object.loLo.low >>> 0, object.loLo.high >>> 0).toNumber();
                    if (object.loHi != null)
                        if ($util.Long)
                            (message.loHi = $util.Long.fromValue(object.loHi)).unsigned = false;
                        else if (typeof object.loHi === "string")
                            message.loHi = parseInt(object.loHi, 10);
                        else if (typeof object.loHi === "number")
                            message.loHi = object.loHi;
                        else if (typeof object.loHi === "object")
                            message.loHi = new $util.LongBits(object.loHi.low >>> 0, object.loHi.high >>> 0).toNumber();
                    if (object.hiLo != null)
                        if ($util.Long)
                            (message.hiLo = $util.Long.fromValue(object.hiLo)).unsigned = false;
                        else if (typeof object.hiLo === "string")
                            message.hiLo = parseInt(object.hiLo, 10);
                        else if (typeof object.hiLo === "number")
                            message.hiLo = object.hiLo;
                        else if (typeof object.hiLo === "object")
                            message.hiLo = new $util.LongBits(object.hiLo.low >>> 0, object.hiLo.high >>> 0).toNumber();
                    if (object.hiHi != null)
                        if ($util.Long)
                            (message.hiHi = $util.Long.fromValue(object.hiHi)).unsigned = false;
                        else if (typeof object.hiHi === "string")
                            message.hiHi = parseInt(object.hiHi, 10);
                        else if (typeof object.hiHi === "number")
                            message.hiHi = object.hiHi;
                        else if (typeof object.hiHi === "object")
                            message.hiHi = new $util.LongBits(object.hiHi.low >>> 0, object.hiHi.high >>> 0).toNumber();
                    return message;
                };

                /**
                 * Creates a plain object from a FieldElement message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.FieldElement
                 * @static
                 * @param {apibara.starknet.v1alpha2.FieldElement} message FieldElement
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                FieldElement.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.loLo = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.loLo = options.longs === String ? "0" : 0;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.loHi = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.loHi = options.longs === String ? "0" : 0;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.hiLo = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.hiLo = options.longs === String ? "0" : 0;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.hiHi = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.hiHi = options.longs === String ? "0" : 0;
                    }
                    if (message.loLo != null && message.hasOwnProperty("loLo"))
                        if (typeof message.loLo === "number")
                            object.loLo = options.longs === String ? String(message.loLo) : message.loLo;
                        else
                            object.loLo = options.longs === String ? $util.Long.prototype.toString.call(message.loLo) : options.longs === Number ? new $util.LongBits(message.loLo.low >>> 0, message.loLo.high >>> 0).toNumber() : message.loLo;
                    if (message.loHi != null && message.hasOwnProperty("loHi"))
                        if (typeof message.loHi === "number")
                            object.loHi = options.longs === String ? String(message.loHi) : message.loHi;
                        else
                            object.loHi = options.longs === String ? $util.Long.prototype.toString.call(message.loHi) : options.longs === Number ? new $util.LongBits(message.loHi.low >>> 0, message.loHi.high >>> 0).toNumber() : message.loHi;
                    if (message.hiLo != null && message.hasOwnProperty("hiLo"))
                        if (typeof message.hiLo === "number")
                            object.hiLo = options.longs === String ? String(message.hiLo) : message.hiLo;
                        else
                            object.hiLo = options.longs === String ? $util.Long.prototype.toString.call(message.hiLo) : options.longs === Number ? new $util.LongBits(message.hiLo.low >>> 0, message.hiLo.high >>> 0).toNumber() : message.hiLo;
                    if (message.hiHi != null && message.hasOwnProperty("hiHi"))
                        if (typeof message.hiHi === "number")
                            object.hiHi = options.longs === String ? String(message.hiHi) : message.hiHi;
                        else
                            object.hiHi = options.longs === String ? $util.Long.prototype.toString.call(message.hiHi) : options.longs === Number ? new $util.LongBits(message.hiHi.low >>> 0, message.hiHi.high >>> 0).toNumber() : message.hiHi;
                    return object;
                };

                /**
                 * Converts this FieldElement to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.FieldElement
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                FieldElement.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for FieldElement
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.FieldElement
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                FieldElement.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.FieldElement";
                };

                return FieldElement;
            })();

            v1alpha2.Block = (function() {

                /**
                 * Properties of a Block.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IBlock
                 * @property {apibara.starknet.v1alpha2.BlockStatus|null} [status] Block status
                 * @property {apibara.starknet.v1alpha2.IBlockHeader|null} [header] Block header
                 * @property {Array.<apibara.starknet.v1alpha2.ITransactionWithReceipt>|null} [transactions] Block transactions
                 * @property {apibara.starknet.v1alpha2.IStateUpdate|null} [stateUpdate] Block stateUpdate
                 * @property {Array.<apibara.starknet.v1alpha2.IEventWithTransaction>|null} [events] Block events
                 * @property {Array.<apibara.starknet.v1alpha2.IL2ToL1MessageWithTransaction>|null} [l2ToL1Messages] Block l2ToL1Messages
                 * @property {boolean|null} [empty] Block empty
                 */

                /**
                 * Constructs a new Block.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a Block.
                 * @implements IBlock
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IBlock=} [properties] Properties to set
                 */
                function Block(properties) {
                    this.transactions = [];
                    this.events = [];
                    this.l2ToL1Messages = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Block status.
                 * @member {apibara.starknet.v1alpha2.BlockStatus} status
                 * @memberof apibara.starknet.v1alpha2.Block
                 * @instance
                 */
                Block.prototype.status = 0;

                /**
                 * Block header.
                 * @member {apibara.starknet.v1alpha2.IBlockHeader|null|undefined} header
                 * @memberof apibara.starknet.v1alpha2.Block
                 * @instance
                 */
                Block.prototype.header = null;

                /**
                 * Block transactions.
                 * @member {Array.<apibara.starknet.v1alpha2.ITransactionWithReceipt>} transactions
                 * @memberof apibara.starknet.v1alpha2.Block
                 * @instance
                 */
                Block.prototype.transactions = $util.emptyArray;

                /**
                 * Block stateUpdate.
                 * @member {apibara.starknet.v1alpha2.IStateUpdate|null|undefined} stateUpdate
                 * @memberof apibara.starknet.v1alpha2.Block
                 * @instance
                 */
                Block.prototype.stateUpdate = null;

                /**
                 * Block events.
                 * @member {Array.<apibara.starknet.v1alpha2.IEventWithTransaction>} events
                 * @memberof apibara.starknet.v1alpha2.Block
                 * @instance
                 */
                Block.prototype.events = $util.emptyArray;

                /**
                 * Block l2ToL1Messages.
                 * @member {Array.<apibara.starknet.v1alpha2.IL2ToL1MessageWithTransaction>} l2ToL1Messages
                 * @memberof apibara.starknet.v1alpha2.Block
                 * @instance
                 */
                Block.prototype.l2ToL1Messages = $util.emptyArray;

                /**
                 * Block empty.
                 * @member {boolean} empty
                 * @memberof apibara.starknet.v1alpha2.Block
                 * @instance
                 */
                Block.prototype.empty = false;

                /**
                 * Creates a new Block instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.Block
                 * @static
                 * @param {apibara.starknet.v1alpha2.IBlock=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.Block} Block instance
                 */
                Block.create = function create(properties) {
                    return new Block(properties);
                };

                /**
                 * Encodes the specified Block message. Does not implicitly {@link apibara.starknet.v1alpha2.Block.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.Block
                 * @static
                 * @param {apibara.starknet.v1alpha2.IBlock} message Block message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Block.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.status);
                    if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                        $root.apibara.starknet.v1alpha2.BlockHeader.encode(message.header, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.transactions != null && message.transactions.length)
                        for (var i = 0; i < message.transactions.length; ++i)
                            $root.apibara.starknet.v1alpha2.TransactionWithReceipt.encode(message.transactions[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.stateUpdate != null && Object.hasOwnProperty.call(message, "stateUpdate"))
                        $root.apibara.starknet.v1alpha2.StateUpdate.encode(message.stateUpdate, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    if (message.events != null && message.events.length)
                        for (var i = 0; i < message.events.length; ++i)
                            $root.apibara.starknet.v1alpha2.EventWithTransaction.encode(message.events[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                    if (message.l2ToL1Messages != null && message.l2ToL1Messages.length)
                        for (var i = 0; i < message.l2ToL1Messages.length; ++i)
                            $root.apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction.encode(message.l2ToL1Messages[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                    if (message.empty != null && Object.hasOwnProperty.call(message, "empty"))
                        writer.uint32(/* id 7, wireType 0 =*/56).bool(message.empty);
                    return writer;
                };

                /**
                 * Encodes the specified Block message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.Block.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.Block
                 * @static
                 * @param {apibara.starknet.v1alpha2.IBlock} message Block message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Block.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Block message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.Block
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.Block} Block
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Block.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.Block();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.status = reader.int32();
                                break;
                            }
                        case 2: {
                                message.header = $root.apibara.starknet.v1alpha2.BlockHeader.decode(reader, reader.uint32());
                                break;
                            }
                        case 3: {
                                if (!(message.transactions && message.transactions.length))
                                    message.transactions = [];
                                message.transactions.push($root.apibara.starknet.v1alpha2.TransactionWithReceipt.decode(reader, reader.uint32()));
                                break;
                            }
                        case 4: {
                                message.stateUpdate = $root.apibara.starknet.v1alpha2.StateUpdate.decode(reader, reader.uint32());
                                break;
                            }
                        case 5: {
                                if (!(message.events && message.events.length))
                                    message.events = [];
                                message.events.push($root.apibara.starknet.v1alpha2.EventWithTransaction.decode(reader, reader.uint32()));
                                break;
                            }
                        case 6: {
                                if (!(message.l2ToL1Messages && message.l2ToL1Messages.length))
                                    message.l2ToL1Messages = [];
                                message.l2ToL1Messages.push($root.apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction.decode(reader, reader.uint32()));
                                break;
                            }
                        case 7: {
                                message.empty = reader.bool();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Block message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.Block
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.Block} Block
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Block.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Block message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.Block
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Block.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.status != null && message.hasOwnProperty("status"))
                        switch (message.status) {
                        default:
                            return "status: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                            break;
                        }
                    if (message.header != null && message.hasOwnProperty("header")) {
                        var error = $root.apibara.starknet.v1alpha2.BlockHeader.verify(message.header);
                        if (error)
                            return "header." + error;
                    }
                    if (message.transactions != null && message.hasOwnProperty("transactions")) {
                        if (!Array.isArray(message.transactions))
                            return "transactions: array expected";
                        for (var i = 0; i < message.transactions.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.TransactionWithReceipt.verify(message.transactions[i]);
                            if (error)
                                return "transactions." + error;
                        }
                    }
                    if (message.stateUpdate != null && message.hasOwnProperty("stateUpdate")) {
                        var error = $root.apibara.starknet.v1alpha2.StateUpdate.verify(message.stateUpdate);
                        if (error)
                            return "stateUpdate." + error;
                    }
                    if (message.events != null && message.hasOwnProperty("events")) {
                        if (!Array.isArray(message.events))
                            return "events: array expected";
                        for (var i = 0; i < message.events.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.EventWithTransaction.verify(message.events[i]);
                            if (error)
                                return "events." + error;
                        }
                    }
                    if (message.l2ToL1Messages != null && message.hasOwnProperty("l2ToL1Messages")) {
                        if (!Array.isArray(message.l2ToL1Messages))
                            return "l2ToL1Messages: array expected";
                        for (var i = 0; i < message.l2ToL1Messages.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction.verify(message.l2ToL1Messages[i]);
                            if (error)
                                return "l2ToL1Messages." + error;
                        }
                    }
                    if (message.empty != null && message.hasOwnProperty("empty"))
                        if (typeof message.empty !== "boolean")
                            return "empty: boolean expected";
                    return null;
                };

                /**
                 * Creates a Block message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.Block
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.Block} Block
                 */
                Block.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.Block)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.Block();
                    switch (object.status) {
                    default:
                        if (typeof object.status === "number") {
                            message.status = object.status;
                            break;
                        }
                        break;
                    case "BLOCK_STATUS_UNSPECIFIED":
                    case 0:
                        message.status = 0;
                        break;
                    case "BLOCK_STATUS_PENDING":
                    case 1:
                        message.status = 1;
                        break;
                    case "BLOCK_STATUS_ACCEPTED_ON_L2":
                    case 2:
                        message.status = 2;
                        break;
                    case "BLOCK_STATUS_ACCEPTED_ON_L1":
                    case 3:
                        message.status = 3;
                        break;
                    case "BLOCK_STATUS_REJECTED":
                    case 4:
                        message.status = 4;
                        break;
                    }
                    if (object.header != null) {
                        if (typeof object.header !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.Block.header: object expected");
                        message.header = $root.apibara.starknet.v1alpha2.BlockHeader.fromObject(object.header);
                    }
                    if (object.transactions) {
                        if (!Array.isArray(object.transactions))
                            throw TypeError(".apibara.starknet.v1alpha2.Block.transactions: array expected");
                        message.transactions = [];
                        for (var i = 0; i < object.transactions.length; ++i) {
                            if (typeof object.transactions[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.Block.transactions: object expected");
                            message.transactions[i] = $root.apibara.starknet.v1alpha2.TransactionWithReceipt.fromObject(object.transactions[i]);
                        }
                    }
                    if (object.stateUpdate != null) {
                        if (typeof object.stateUpdate !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.Block.stateUpdate: object expected");
                        message.stateUpdate = $root.apibara.starknet.v1alpha2.StateUpdate.fromObject(object.stateUpdate);
                    }
                    if (object.events) {
                        if (!Array.isArray(object.events))
                            throw TypeError(".apibara.starknet.v1alpha2.Block.events: array expected");
                        message.events = [];
                        for (var i = 0; i < object.events.length; ++i) {
                            if (typeof object.events[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.Block.events: object expected");
                            message.events[i] = $root.apibara.starknet.v1alpha2.EventWithTransaction.fromObject(object.events[i]);
                        }
                    }
                    if (object.l2ToL1Messages) {
                        if (!Array.isArray(object.l2ToL1Messages))
                            throw TypeError(".apibara.starknet.v1alpha2.Block.l2ToL1Messages: array expected");
                        message.l2ToL1Messages = [];
                        for (var i = 0; i < object.l2ToL1Messages.length; ++i) {
                            if (typeof object.l2ToL1Messages[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.Block.l2ToL1Messages: object expected");
                            message.l2ToL1Messages[i] = $root.apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction.fromObject(object.l2ToL1Messages[i]);
                        }
                    }
                    if (object.empty != null)
                        message.empty = Boolean(object.empty);
                    return message;
                };

                /**
                 * Creates a plain object from a Block message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.Block
                 * @static
                 * @param {apibara.starknet.v1alpha2.Block} message Block
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Block.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults) {
                        object.transactions = [];
                        object.events = [];
                        object.l2ToL1Messages = [];
                    }
                    if (options.defaults) {
                        object.status = options.enums === String ? "BLOCK_STATUS_UNSPECIFIED" : 0;
                        object.header = null;
                        object.stateUpdate = null;
                        object.empty = false;
                    }
                    if (message.status != null && message.hasOwnProperty("status"))
                        object.status = options.enums === String ? $root.apibara.starknet.v1alpha2.BlockStatus[message.status] === undefined ? message.status : $root.apibara.starknet.v1alpha2.BlockStatus[message.status] : message.status;
                    if (message.header != null && message.hasOwnProperty("header"))
                        object.header = $root.apibara.starknet.v1alpha2.BlockHeader.toObject(message.header, options);
                    if (message.transactions && message.transactions.length) {
                        object.transactions = [];
                        for (var j = 0; j < message.transactions.length; ++j)
                            object.transactions[j] = $root.apibara.starknet.v1alpha2.TransactionWithReceipt.toObject(message.transactions[j], options);
                    }
                    if (message.stateUpdate != null && message.hasOwnProperty("stateUpdate"))
                        object.stateUpdate = $root.apibara.starknet.v1alpha2.StateUpdate.toObject(message.stateUpdate, options);
                    if (message.events && message.events.length) {
                        object.events = [];
                        for (var j = 0; j < message.events.length; ++j)
                            object.events[j] = $root.apibara.starknet.v1alpha2.EventWithTransaction.toObject(message.events[j], options);
                    }
                    if (message.l2ToL1Messages && message.l2ToL1Messages.length) {
                        object.l2ToL1Messages = [];
                        for (var j = 0; j < message.l2ToL1Messages.length; ++j)
                            object.l2ToL1Messages[j] = $root.apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction.toObject(message.l2ToL1Messages[j], options);
                    }
                    if (message.empty != null && message.hasOwnProperty("empty"))
                        object.empty = message.empty;
                    return object;
                };

                /**
                 * Converts this Block to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.Block
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Block.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for Block
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.Block
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                Block.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.Block";
                };

                return Block;
            })();

            v1alpha2.BlockHeader = (function() {

                /**
                 * Properties of a BlockHeader.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IBlockHeader
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [blockHash] BlockHeader blockHash
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [parentBlockHash] BlockHeader parentBlockHash
                 * @property {number|Long|null} [blockNumber] BlockHeader blockNumber
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [sequencerAddress] BlockHeader sequencerAddress
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [newRoot] BlockHeader newRoot
                 * @property {google.protobuf.ITimestamp|null} [timestamp] BlockHeader timestamp
                 * @property {string|null} [starknetVersion] BlockHeader starknetVersion
                 * @property {apibara.starknet.v1alpha2.IResourcePrice|null} [l1GasPrice] BlockHeader l1GasPrice
                 * @property {apibara.starknet.v1alpha2.IResourcePrice|null} [l1DataGasPrice] BlockHeader l1DataGasPrice
                 * @property {apibara.starknet.v1alpha2.L1DataAvailabilityMode|null} [l1DataAvailabilityMode] BlockHeader l1DataAvailabilityMode
                 */

                /**
                 * Constructs a new BlockHeader.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a BlockHeader.
                 * @implements IBlockHeader
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IBlockHeader=} [properties] Properties to set
                 */
                function BlockHeader(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * BlockHeader blockHash.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} blockHash
                 * @memberof apibara.starknet.v1alpha2.BlockHeader
                 * @instance
                 */
                BlockHeader.prototype.blockHash = null;

                /**
                 * BlockHeader parentBlockHash.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} parentBlockHash
                 * @memberof apibara.starknet.v1alpha2.BlockHeader
                 * @instance
                 */
                BlockHeader.prototype.parentBlockHash = null;

                /**
                 * BlockHeader blockNumber.
                 * @member {number|Long} blockNumber
                 * @memberof apibara.starknet.v1alpha2.BlockHeader
                 * @instance
                 */
                BlockHeader.prototype.blockNumber = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * BlockHeader sequencerAddress.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} sequencerAddress
                 * @memberof apibara.starknet.v1alpha2.BlockHeader
                 * @instance
                 */
                BlockHeader.prototype.sequencerAddress = null;

                /**
                 * BlockHeader newRoot.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} newRoot
                 * @memberof apibara.starknet.v1alpha2.BlockHeader
                 * @instance
                 */
                BlockHeader.prototype.newRoot = null;

                /**
                 * BlockHeader timestamp.
                 * @member {google.protobuf.ITimestamp|null|undefined} timestamp
                 * @memberof apibara.starknet.v1alpha2.BlockHeader
                 * @instance
                 */
                BlockHeader.prototype.timestamp = null;

                /**
                 * BlockHeader starknetVersion.
                 * @member {string} starknetVersion
                 * @memberof apibara.starknet.v1alpha2.BlockHeader
                 * @instance
                 */
                BlockHeader.prototype.starknetVersion = "";

                /**
                 * BlockHeader l1GasPrice.
                 * @member {apibara.starknet.v1alpha2.IResourcePrice|null|undefined} l1GasPrice
                 * @memberof apibara.starknet.v1alpha2.BlockHeader
                 * @instance
                 */
                BlockHeader.prototype.l1GasPrice = null;

                /**
                 * BlockHeader l1DataGasPrice.
                 * @member {apibara.starknet.v1alpha2.IResourcePrice|null|undefined} l1DataGasPrice
                 * @memberof apibara.starknet.v1alpha2.BlockHeader
                 * @instance
                 */
                BlockHeader.prototype.l1DataGasPrice = null;

                /**
                 * BlockHeader l1DataAvailabilityMode.
                 * @member {apibara.starknet.v1alpha2.L1DataAvailabilityMode} l1DataAvailabilityMode
                 * @memberof apibara.starknet.v1alpha2.BlockHeader
                 * @instance
                 */
                BlockHeader.prototype.l1DataAvailabilityMode = 0;

                /**
                 * Creates a new BlockHeader instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.BlockHeader
                 * @static
                 * @param {apibara.starknet.v1alpha2.IBlockHeader=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.BlockHeader} BlockHeader instance
                 */
                BlockHeader.create = function create(properties) {
                    return new BlockHeader(properties);
                };

                /**
                 * Encodes the specified BlockHeader message. Does not implicitly {@link apibara.starknet.v1alpha2.BlockHeader.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.BlockHeader
                 * @static
                 * @param {apibara.starknet.v1alpha2.IBlockHeader} message BlockHeader message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                BlockHeader.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.blockHash != null && Object.hasOwnProperty.call(message, "blockHash"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.blockHash, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.parentBlockHash != null && Object.hasOwnProperty.call(message, "parentBlockHash"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.parentBlockHash, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.blockNumber != null && Object.hasOwnProperty.call(message, "blockNumber"))
                        writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.blockNumber);
                    if (message.sequencerAddress != null && Object.hasOwnProperty.call(message, "sequencerAddress"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.sequencerAddress, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    if (message.newRoot != null && Object.hasOwnProperty.call(message, "newRoot"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.newRoot, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                    if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                        $root.google.protobuf.Timestamp.encode(message.timestamp, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                    if (message.starknetVersion != null && Object.hasOwnProperty.call(message, "starknetVersion"))
                        writer.uint32(/* id 7, wireType 2 =*/58).string(message.starknetVersion);
                    if (message.l1GasPrice != null && Object.hasOwnProperty.call(message, "l1GasPrice"))
                        $root.apibara.starknet.v1alpha2.ResourcePrice.encode(message.l1GasPrice, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                    if (message.l1DataGasPrice != null && Object.hasOwnProperty.call(message, "l1DataGasPrice"))
                        $root.apibara.starknet.v1alpha2.ResourcePrice.encode(message.l1DataGasPrice, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
                    if (message.l1DataAvailabilityMode != null && Object.hasOwnProperty.call(message, "l1DataAvailabilityMode"))
                        writer.uint32(/* id 10, wireType 0 =*/80).int32(message.l1DataAvailabilityMode);
                    return writer;
                };

                /**
                 * Encodes the specified BlockHeader message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.BlockHeader.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.BlockHeader
                 * @static
                 * @param {apibara.starknet.v1alpha2.IBlockHeader} message BlockHeader message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                BlockHeader.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a BlockHeader message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.BlockHeader
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.BlockHeader} BlockHeader
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                BlockHeader.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.BlockHeader();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.blockHash = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.parentBlockHash = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 3: {
                                message.blockNumber = reader.uint64();
                                break;
                            }
                        case 4: {
                                message.sequencerAddress = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 5: {
                                message.newRoot = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 6: {
                                message.timestamp = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                                break;
                            }
                        case 7: {
                                message.starknetVersion = reader.string();
                                break;
                            }
                        case 8: {
                                message.l1GasPrice = $root.apibara.starknet.v1alpha2.ResourcePrice.decode(reader, reader.uint32());
                                break;
                            }
                        case 9: {
                                message.l1DataGasPrice = $root.apibara.starknet.v1alpha2.ResourcePrice.decode(reader, reader.uint32());
                                break;
                            }
                        case 10: {
                                message.l1DataAvailabilityMode = reader.int32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a BlockHeader message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.BlockHeader
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.BlockHeader} BlockHeader
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                BlockHeader.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a BlockHeader message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.BlockHeader
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                BlockHeader.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.blockHash != null && message.hasOwnProperty("blockHash")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.blockHash);
                        if (error)
                            return "blockHash." + error;
                    }
                    if (message.parentBlockHash != null && message.hasOwnProperty("parentBlockHash")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.parentBlockHash);
                        if (error)
                            return "parentBlockHash." + error;
                    }
                    if (message.blockNumber != null && message.hasOwnProperty("blockNumber"))
                        if (!$util.isInteger(message.blockNumber) && !(message.blockNumber && $util.isInteger(message.blockNumber.low) && $util.isInteger(message.blockNumber.high)))
                            return "blockNumber: integer|Long expected";
                    if (message.sequencerAddress != null && message.hasOwnProperty("sequencerAddress")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.sequencerAddress);
                        if (error)
                            return "sequencerAddress." + error;
                    }
                    if (message.newRoot != null && message.hasOwnProperty("newRoot")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.newRoot);
                        if (error)
                            return "newRoot." + error;
                    }
                    if (message.timestamp != null && message.hasOwnProperty("timestamp")) {
                        var error = $root.google.protobuf.Timestamp.verify(message.timestamp);
                        if (error)
                            return "timestamp." + error;
                    }
                    if (message.starknetVersion != null && message.hasOwnProperty("starknetVersion"))
                        if (!$util.isString(message.starknetVersion))
                            return "starknetVersion: string expected";
                    if (message.l1GasPrice != null && message.hasOwnProperty("l1GasPrice")) {
                        var error = $root.apibara.starknet.v1alpha2.ResourcePrice.verify(message.l1GasPrice);
                        if (error)
                            return "l1GasPrice." + error;
                    }
                    if (message.l1DataGasPrice != null && message.hasOwnProperty("l1DataGasPrice")) {
                        var error = $root.apibara.starknet.v1alpha2.ResourcePrice.verify(message.l1DataGasPrice);
                        if (error)
                            return "l1DataGasPrice." + error;
                    }
                    if (message.l1DataAvailabilityMode != null && message.hasOwnProperty("l1DataAvailabilityMode"))
                        switch (message.l1DataAvailabilityMode) {
                        default:
                            return "l1DataAvailabilityMode: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                            break;
                        }
                    return null;
                };

                /**
                 * Creates a BlockHeader message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.BlockHeader
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.BlockHeader} BlockHeader
                 */
                BlockHeader.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.BlockHeader)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.BlockHeader();
                    if (object.blockHash != null) {
                        if (typeof object.blockHash !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.BlockHeader.blockHash: object expected");
                        message.blockHash = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.blockHash);
                    }
                    if (object.parentBlockHash != null) {
                        if (typeof object.parentBlockHash !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.BlockHeader.parentBlockHash: object expected");
                        message.parentBlockHash = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.parentBlockHash);
                    }
                    if (object.blockNumber != null)
                        if ($util.Long)
                            (message.blockNumber = $util.Long.fromValue(object.blockNumber)).unsigned = true;
                        else if (typeof object.blockNumber === "string")
                            message.blockNumber = parseInt(object.blockNumber, 10);
                        else if (typeof object.blockNumber === "number")
                            message.blockNumber = object.blockNumber;
                        else if (typeof object.blockNumber === "object")
                            message.blockNumber = new $util.LongBits(object.blockNumber.low >>> 0, object.blockNumber.high >>> 0).toNumber(true);
                    if (object.sequencerAddress != null) {
                        if (typeof object.sequencerAddress !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.BlockHeader.sequencerAddress: object expected");
                        message.sequencerAddress = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.sequencerAddress);
                    }
                    if (object.newRoot != null) {
                        if (typeof object.newRoot !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.BlockHeader.newRoot: object expected");
                        message.newRoot = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.newRoot);
                    }
                    if (object.timestamp != null) {
                        if (typeof object.timestamp !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.BlockHeader.timestamp: object expected");
                        message.timestamp = $root.google.protobuf.Timestamp.fromObject(object.timestamp);
                    }
                    if (object.starknetVersion != null)
                        message.starknetVersion = String(object.starknetVersion);
                    if (object.l1GasPrice != null) {
                        if (typeof object.l1GasPrice !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.BlockHeader.l1GasPrice: object expected");
                        message.l1GasPrice = $root.apibara.starknet.v1alpha2.ResourcePrice.fromObject(object.l1GasPrice);
                    }
                    if (object.l1DataGasPrice != null) {
                        if (typeof object.l1DataGasPrice !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.BlockHeader.l1DataGasPrice: object expected");
                        message.l1DataGasPrice = $root.apibara.starknet.v1alpha2.ResourcePrice.fromObject(object.l1DataGasPrice);
                    }
                    switch (object.l1DataAvailabilityMode) {
                    default:
                        if (typeof object.l1DataAvailabilityMode === "number") {
                            message.l1DataAvailabilityMode = object.l1DataAvailabilityMode;
                            break;
                        }
                        break;
                    case "L1_DATA_AVAILABILITY_MODE_UNSPECIFIED":
                    case 0:
                        message.l1DataAvailabilityMode = 0;
                        break;
                    case "L1_DATA_AVAILABILITY_MODE_BLOB":
                    case 1:
                        message.l1DataAvailabilityMode = 1;
                        break;
                    case "L1_DATA_AVAILABILITY_MODE_CALLDATA":
                    case 2:
                        message.l1DataAvailabilityMode = 2;
                        break;
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a BlockHeader message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.BlockHeader
                 * @static
                 * @param {apibara.starknet.v1alpha2.BlockHeader} message BlockHeader
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                BlockHeader.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.blockHash = null;
                        object.parentBlockHash = null;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, true);
                            object.blockNumber = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.blockNumber = options.longs === String ? "0" : 0;
                        object.sequencerAddress = null;
                        object.newRoot = null;
                        object.timestamp = null;
                        object.starknetVersion = "";
                        object.l1GasPrice = null;
                        object.l1DataGasPrice = null;
                        object.l1DataAvailabilityMode = options.enums === String ? "L1_DATA_AVAILABILITY_MODE_UNSPECIFIED" : 0;
                    }
                    if (message.blockHash != null && message.hasOwnProperty("blockHash"))
                        object.blockHash = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.blockHash, options);
                    if (message.parentBlockHash != null && message.hasOwnProperty("parentBlockHash"))
                        object.parentBlockHash = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.parentBlockHash, options);
                    if (message.blockNumber != null && message.hasOwnProperty("blockNumber"))
                        if (typeof message.blockNumber === "number")
                            object.blockNumber = options.longs === String ? String(message.blockNumber) : message.blockNumber;
                        else
                            object.blockNumber = options.longs === String ? $util.Long.prototype.toString.call(message.blockNumber) : options.longs === Number ? new $util.LongBits(message.blockNumber.low >>> 0, message.blockNumber.high >>> 0).toNumber(true) : message.blockNumber;
                    if (message.sequencerAddress != null && message.hasOwnProperty("sequencerAddress"))
                        object.sequencerAddress = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.sequencerAddress, options);
                    if (message.newRoot != null && message.hasOwnProperty("newRoot"))
                        object.newRoot = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.newRoot, options);
                    if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                        object.timestamp = $root.google.protobuf.Timestamp.toObject(message.timestamp, options);
                    if (message.starknetVersion != null && message.hasOwnProperty("starknetVersion"))
                        object.starknetVersion = message.starknetVersion;
                    if (message.l1GasPrice != null && message.hasOwnProperty("l1GasPrice"))
                        object.l1GasPrice = $root.apibara.starknet.v1alpha2.ResourcePrice.toObject(message.l1GasPrice, options);
                    if (message.l1DataGasPrice != null && message.hasOwnProperty("l1DataGasPrice"))
                        object.l1DataGasPrice = $root.apibara.starknet.v1alpha2.ResourcePrice.toObject(message.l1DataGasPrice, options);
                    if (message.l1DataAvailabilityMode != null && message.hasOwnProperty("l1DataAvailabilityMode"))
                        object.l1DataAvailabilityMode = options.enums === String ? $root.apibara.starknet.v1alpha2.L1DataAvailabilityMode[message.l1DataAvailabilityMode] === undefined ? message.l1DataAvailabilityMode : $root.apibara.starknet.v1alpha2.L1DataAvailabilityMode[message.l1DataAvailabilityMode] : message.l1DataAvailabilityMode;
                    return object;
                };

                /**
                 * Converts this BlockHeader to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.BlockHeader
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                BlockHeader.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for BlockHeader
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.BlockHeader
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                BlockHeader.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.BlockHeader";
                };

                return BlockHeader;
            })();

            /**
             * L1DataAvailabilityMode enum.
             * @name apibara.starknet.v1alpha2.L1DataAvailabilityMode
             * @enum {number}
             * @property {number} L1_DATA_AVAILABILITY_MODE_UNSPECIFIED=0 L1_DATA_AVAILABILITY_MODE_UNSPECIFIED value
             * @property {number} L1_DATA_AVAILABILITY_MODE_BLOB=1 L1_DATA_AVAILABILITY_MODE_BLOB value
             * @property {number} L1_DATA_AVAILABILITY_MODE_CALLDATA=2 L1_DATA_AVAILABILITY_MODE_CALLDATA value
             */
            v1alpha2.L1DataAvailabilityMode = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "L1_DATA_AVAILABILITY_MODE_UNSPECIFIED"] = 0;
                values[valuesById[1] = "L1_DATA_AVAILABILITY_MODE_BLOB"] = 1;
                values[valuesById[2] = "L1_DATA_AVAILABILITY_MODE_CALLDATA"] = 2;
                return values;
            })();

            /**
             * BlockStatus enum.
             * @name apibara.starknet.v1alpha2.BlockStatus
             * @enum {number}
             * @property {number} BLOCK_STATUS_UNSPECIFIED=0 BLOCK_STATUS_UNSPECIFIED value
             * @property {number} BLOCK_STATUS_PENDING=1 BLOCK_STATUS_PENDING value
             * @property {number} BLOCK_STATUS_ACCEPTED_ON_L2=2 BLOCK_STATUS_ACCEPTED_ON_L2 value
             * @property {number} BLOCK_STATUS_ACCEPTED_ON_L1=3 BLOCK_STATUS_ACCEPTED_ON_L1 value
             * @property {number} BLOCK_STATUS_REJECTED=4 BLOCK_STATUS_REJECTED value
             */
            v1alpha2.BlockStatus = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "BLOCK_STATUS_UNSPECIFIED"] = 0;
                values[valuesById[1] = "BLOCK_STATUS_PENDING"] = 1;
                values[valuesById[2] = "BLOCK_STATUS_ACCEPTED_ON_L2"] = 2;
                values[valuesById[3] = "BLOCK_STATUS_ACCEPTED_ON_L1"] = 3;
                values[valuesById[4] = "BLOCK_STATUS_REJECTED"] = 4;
                return values;
            })();

            v1alpha2.TransactionWithReceipt = (function() {

                /**
                 * Properties of a TransactionWithReceipt.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface ITransactionWithReceipt
                 * @property {apibara.starknet.v1alpha2.ITransaction|null} [transaction] TransactionWithReceipt transaction
                 * @property {apibara.starknet.v1alpha2.ITransactionReceipt|null} [receipt] TransactionWithReceipt receipt
                 */

                /**
                 * Constructs a new TransactionWithReceipt.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a TransactionWithReceipt.
                 * @implements ITransactionWithReceipt
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.ITransactionWithReceipt=} [properties] Properties to set
                 */
                function TransactionWithReceipt(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TransactionWithReceipt transaction.
                 * @member {apibara.starknet.v1alpha2.ITransaction|null|undefined} transaction
                 * @memberof apibara.starknet.v1alpha2.TransactionWithReceipt
                 * @instance
                 */
                TransactionWithReceipt.prototype.transaction = null;

                /**
                 * TransactionWithReceipt receipt.
                 * @member {apibara.starknet.v1alpha2.ITransactionReceipt|null|undefined} receipt
                 * @memberof apibara.starknet.v1alpha2.TransactionWithReceipt
                 * @instance
                 */
                TransactionWithReceipt.prototype.receipt = null;

                /**
                 * Creates a new TransactionWithReceipt instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.TransactionWithReceipt
                 * @static
                 * @param {apibara.starknet.v1alpha2.ITransactionWithReceipt=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.TransactionWithReceipt} TransactionWithReceipt instance
                 */
                TransactionWithReceipt.create = function create(properties) {
                    return new TransactionWithReceipt(properties);
                };

                /**
                 * Encodes the specified TransactionWithReceipt message. Does not implicitly {@link apibara.starknet.v1alpha2.TransactionWithReceipt.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.TransactionWithReceipt
                 * @static
                 * @param {apibara.starknet.v1alpha2.ITransactionWithReceipt} message TransactionWithReceipt message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TransactionWithReceipt.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.transaction != null && Object.hasOwnProperty.call(message, "transaction"))
                        $root.apibara.starknet.v1alpha2.Transaction.encode(message.transaction, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.receipt != null && Object.hasOwnProperty.call(message, "receipt"))
                        $root.apibara.starknet.v1alpha2.TransactionReceipt.encode(message.receipt, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified TransactionWithReceipt message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.TransactionWithReceipt.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.TransactionWithReceipt
                 * @static
                 * @param {apibara.starknet.v1alpha2.ITransactionWithReceipt} message TransactionWithReceipt message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TransactionWithReceipt.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a TransactionWithReceipt message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.TransactionWithReceipt
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.TransactionWithReceipt} TransactionWithReceipt
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TransactionWithReceipt.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.TransactionWithReceipt();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.transaction = $root.apibara.starknet.v1alpha2.Transaction.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.receipt = $root.apibara.starknet.v1alpha2.TransactionReceipt.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TransactionWithReceipt message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.TransactionWithReceipt
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.TransactionWithReceipt} TransactionWithReceipt
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TransactionWithReceipt.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TransactionWithReceipt message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.TransactionWithReceipt
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TransactionWithReceipt.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.transaction != null && message.hasOwnProperty("transaction")) {
                        var error = $root.apibara.starknet.v1alpha2.Transaction.verify(message.transaction);
                        if (error)
                            return "transaction." + error;
                    }
                    if (message.receipt != null && message.hasOwnProperty("receipt")) {
                        var error = $root.apibara.starknet.v1alpha2.TransactionReceipt.verify(message.receipt);
                        if (error)
                            return "receipt." + error;
                    }
                    return null;
                };

                /**
                 * Creates a TransactionWithReceipt message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.TransactionWithReceipt
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.TransactionWithReceipt} TransactionWithReceipt
                 */
                TransactionWithReceipt.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.TransactionWithReceipt)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.TransactionWithReceipt();
                    if (object.transaction != null) {
                        if (typeof object.transaction !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.TransactionWithReceipt.transaction: object expected");
                        message.transaction = $root.apibara.starknet.v1alpha2.Transaction.fromObject(object.transaction);
                    }
                    if (object.receipt != null) {
                        if (typeof object.receipt !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.TransactionWithReceipt.receipt: object expected");
                        message.receipt = $root.apibara.starknet.v1alpha2.TransactionReceipt.fromObject(object.receipt);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a TransactionWithReceipt message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.TransactionWithReceipt
                 * @static
                 * @param {apibara.starknet.v1alpha2.TransactionWithReceipt} message TransactionWithReceipt
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TransactionWithReceipt.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.transaction = null;
                        object.receipt = null;
                    }
                    if (message.transaction != null && message.hasOwnProperty("transaction"))
                        object.transaction = $root.apibara.starknet.v1alpha2.Transaction.toObject(message.transaction, options);
                    if (message.receipt != null && message.hasOwnProperty("receipt"))
                        object.receipt = $root.apibara.starknet.v1alpha2.TransactionReceipt.toObject(message.receipt, options);
                    return object;
                };

                /**
                 * Converts this TransactionWithReceipt to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.TransactionWithReceipt
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TransactionWithReceipt.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for TransactionWithReceipt
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.TransactionWithReceipt
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                TransactionWithReceipt.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.TransactionWithReceipt";
                };

                return TransactionWithReceipt;
            })();

            v1alpha2.Transaction = (function() {

                /**
                 * Properties of a Transaction.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface ITransaction
                 * @property {apibara.starknet.v1alpha2.ITransactionMeta|null} [meta] Transaction meta
                 * @property {apibara.starknet.v1alpha2.IInvokeTransactionV0|null} [invokeV0] Transaction invokeV0
                 * @property {apibara.starknet.v1alpha2.IInvokeTransactionV1|null} [invokeV1] Transaction invokeV1
                 * @property {apibara.starknet.v1alpha2.IDeployTransaction|null} [deploy] Transaction deploy
                 * @property {apibara.starknet.v1alpha2.IDeclareTransaction|null} [declare] Transaction declare
                 * @property {apibara.starknet.v1alpha2.IL1HandlerTransaction|null} [l1Handler] Transaction l1Handler
                 * @property {apibara.starknet.v1alpha2.IDeployAccountTransaction|null} [deployAccount] Transaction deployAccount
                 * @property {apibara.starknet.v1alpha2.IDeployAccountTransactionV3|null} [deployAccountV3] Transaction deployAccountV3
                 * @property {apibara.starknet.v1alpha2.IInvokeTransactionV3|null} [invokeV3] Transaction invokeV3
                 * @property {apibara.starknet.v1alpha2.IDeclareTransactionV3|null} [declareV3] Transaction declareV3
                 */

                /**
                 * Constructs a new Transaction.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a Transaction.
                 * @implements ITransaction
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.ITransaction=} [properties] Properties to set
                 */
                function Transaction(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Transaction meta.
                 * @member {apibara.starknet.v1alpha2.ITransactionMeta|null|undefined} meta
                 * @memberof apibara.starknet.v1alpha2.Transaction
                 * @instance
                 */
                Transaction.prototype.meta = null;

                /**
                 * Transaction invokeV0.
                 * @member {apibara.starknet.v1alpha2.IInvokeTransactionV0|null|undefined} invokeV0
                 * @memberof apibara.starknet.v1alpha2.Transaction
                 * @instance
                 */
                Transaction.prototype.invokeV0 = null;

                /**
                 * Transaction invokeV1.
                 * @member {apibara.starknet.v1alpha2.IInvokeTransactionV1|null|undefined} invokeV1
                 * @memberof apibara.starknet.v1alpha2.Transaction
                 * @instance
                 */
                Transaction.prototype.invokeV1 = null;

                /**
                 * Transaction deploy.
                 * @member {apibara.starknet.v1alpha2.IDeployTransaction|null|undefined} deploy
                 * @memberof apibara.starknet.v1alpha2.Transaction
                 * @instance
                 */
                Transaction.prototype.deploy = null;

                /**
                 * Transaction declare.
                 * @member {apibara.starknet.v1alpha2.IDeclareTransaction|null|undefined} declare
                 * @memberof apibara.starknet.v1alpha2.Transaction
                 * @instance
                 */
                Transaction.prototype.declare = null;

                /**
                 * Transaction l1Handler.
                 * @member {apibara.starknet.v1alpha2.IL1HandlerTransaction|null|undefined} l1Handler
                 * @memberof apibara.starknet.v1alpha2.Transaction
                 * @instance
                 */
                Transaction.prototype.l1Handler = null;

                /**
                 * Transaction deployAccount.
                 * @member {apibara.starknet.v1alpha2.IDeployAccountTransaction|null|undefined} deployAccount
                 * @memberof apibara.starknet.v1alpha2.Transaction
                 * @instance
                 */
                Transaction.prototype.deployAccount = null;

                /**
                 * Transaction deployAccountV3.
                 * @member {apibara.starknet.v1alpha2.IDeployAccountTransactionV3|null|undefined} deployAccountV3
                 * @memberof apibara.starknet.v1alpha2.Transaction
                 * @instance
                 */
                Transaction.prototype.deployAccountV3 = null;

                /**
                 * Transaction invokeV3.
                 * @member {apibara.starknet.v1alpha2.IInvokeTransactionV3|null|undefined} invokeV3
                 * @memberof apibara.starknet.v1alpha2.Transaction
                 * @instance
                 */
                Transaction.prototype.invokeV3 = null;

                /**
                 * Transaction declareV3.
                 * @member {apibara.starknet.v1alpha2.IDeclareTransactionV3|null|undefined} declareV3
                 * @memberof apibara.starknet.v1alpha2.Transaction
                 * @instance
                 */
                Transaction.prototype.declareV3 = null;

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * Transaction transaction.
                 * @member {"invokeV0"|"invokeV1"|"deploy"|"declare"|"l1Handler"|"deployAccount"|"deployAccountV3"|"invokeV3"|"declareV3"|undefined} transaction
                 * @memberof apibara.starknet.v1alpha2.Transaction
                 * @instance
                 */
                Object.defineProperty(Transaction.prototype, "transaction", {
                    get: $util.oneOfGetter($oneOfFields = ["invokeV0", "invokeV1", "deploy", "declare", "l1Handler", "deployAccount", "deployAccountV3", "invokeV3", "declareV3"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new Transaction instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.Transaction
                 * @static
                 * @param {apibara.starknet.v1alpha2.ITransaction=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.Transaction} Transaction instance
                 */
                Transaction.create = function create(properties) {
                    return new Transaction(properties);
                };

                /**
                 * Encodes the specified Transaction message. Does not implicitly {@link apibara.starknet.v1alpha2.Transaction.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.Transaction
                 * @static
                 * @param {apibara.starknet.v1alpha2.ITransaction} message Transaction message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Transaction.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.meta != null && Object.hasOwnProperty.call(message, "meta"))
                        $root.apibara.starknet.v1alpha2.TransactionMeta.encode(message.meta, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.invokeV0 != null && Object.hasOwnProperty.call(message, "invokeV0"))
                        $root.apibara.starknet.v1alpha2.InvokeTransactionV0.encode(message.invokeV0, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.invokeV1 != null && Object.hasOwnProperty.call(message, "invokeV1"))
                        $root.apibara.starknet.v1alpha2.InvokeTransactionV1.encode(message.invokeV1, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.deploy != null && Object.hasOwnProperty.call(message, "deploy"))
                        $root.apibara.starknet.v1alpha2.DeployTransaction.encode(message.deploy, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    if (message.declare != null && Object.hasOwnProperty.call(message, "declare"))
                        $root.apibara.starknet.v1alpha2.DeclareTransaction.encode(message.declare, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                    if (message.l1Handler != null && Object.hasOwnProperty.call(message, "l1Handler"))
                        $root.apibara.starknet.v1alpha2.L1HandlerTransaction.encode(message.l1Handler, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                    if (message.deployAccount != null && Object.hasOwnProperty.call(message, "deployAccount"))
                        $root.apibara.starknet.v1alpha2.DeployAccountTransaction.encode(message.deployAccount, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                    if (message.deployAccountV3 != null && Object.hasOwnProperty.call(message, "deployAccountV3"))
                        $root.apibara.starknet.v1alpha2.DeployAccountTransactionV3.encode(message.deployAccountV3, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                    if (message.invokeV3 != null && Object.hasOwnProperty.call(message, "invokeV3"))
                        $root.apibara.starknet.v1alpha2.InvokeTransactionV3.encode(message.invokeV3, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
                    if (message.declareV3 != null && Object.hasOwnProperty.call(message, "declareV3"))
                        $root.apibara.starknet.v1alpha2.DeclareTransactionV3.encode(message.declareV3, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified Transaction message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.Transaction.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.Transaction
                 * @static
                 * @param {apibara.starknet.v1alpha2.ITransaction} message Transaction message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Transaction.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Transaction message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.Transaction
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.Transaction} Transaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Transaction.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.Transaction();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.meta = $root.apibara.starknet.v1alpha2.TransactionMeta.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.invokeV0 = $root.apibara.starknet.v1alpha2.InvokeTransactionV0.decode(reader, reader.uint32());
                                break;
                            }
                        case 3: {
                                message.invokeV1 = $root.apibara.starknet.v1alpha2.InvokeTransactionV1.decode(reader, reader.uint32());
                                break;
                            }
                        case 4: {
                                message.deploy = $root.apibara.starknet.v1alpha2.DeployTransaction.decode(reader, reader.uint32());
                                break;
                            }
                        case 5: {
                                message.declare = $root.apibara.starknet.v1alpha2.DeclareTransaction.decode(reader, reader.uint32());
                                break;
                            }
                        case 6: {
                                message.l1Handler = $root.apibara.starknet.v1alpha2.L1HandlerTransaction.decode(reader, reader.uint32());
                                break;
                            }
                        case 7: {
                                message.deployAccount = $root.apibara.starknet.v1alpha2.DeployAccountTransaction.decode(reader, reader.uint32());
                                break;
                            }
                        case 8: {
                                message.deployAccountV3 = $root.apibara.starknet.v1alpha2.DeployAccountTransactionV3.decode(reader, reader.uint32());
                                break;
                            }
                        case 9: {
                                message.invokeV3 = $root.apibara.starknet.v1alpha2.InvokeTransactionV3.decode(reader, reader.uint32());
                                break;
                            }
                        case 10: {
                                message.declareV3 = $root.apibara.starknet.v1alpha2.DeclareTransactionV3.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Transaction message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.Transaction
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.Transaction} Transaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Transaction.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Transaction message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.Transaction
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Transaction.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    var properties = {};
                    if (message.meta != null && message.hasOwnProperty("meta")) {
                        var error = $root.apibara.starknet.v1alpha2.TransactionMeta.verify(message.meta);
                        if (error)
                            return "meta." + error;
                    }
                    if (message.invokeV0 != null && message.hasOwnProperty("invokeV0")) {
                        properties.transaction = 1;
                        {
                            var error = $root.apibara.starknet.v1alpha2.InvokeTransactionV0.verify(message.invokeV0);
                            if (error)
                                return "invokeV0." + error;
                        }
                    }
                    if (message.invokeV1 != null && message.hasOwnProperty("invokeV1")) {
                        if (properties.transaction === 1)
                            return "transaction: multiple values";
                        properties.transaction = 1;
                        {
                            var error = $root.apibara.starknet.v1alpha2.InvokeTransactionV1.verify(message.invokeV1);
                            if (error)
                                return "invokeV1." + error;
                        }
                    }
                    if (message.deploy != null && message.hasOwnProperty("deploy")) {
                        if (properties.transaction === 1)
                            return "transaction: multiple values";
                        properties.transaction = 1;
                        {
                            var error = $root.apibara.starknet.v1alpha2.DeployTransaction.verify(message.deploy);
                            if (error)
                                return "deploy." + error;
                        }
                    }
                    if (message.declare != null && message.hasOwnProperty("declare")) {
                        if (properties.transaction === 1)
                            return "transaction: multiple values";
                        properties.transaction = 1;
                        {
                            var error = $root.apibara.starknet.v1alpha2.DeclareTransaction.verify(message.declare);
                            if (error)
                                return "declare." + error;
                        }
                    }
                    if (message.l1Handler != null && message.hasOwnProperty("l1Handler")) {
                        if (properties.transaction === 1)
                            return "transaction: multiple values";
                        properties.transaction = 1;
                        {
                            var error = $root.apibara.starknet.v1alpha2.L1HandlerTransaction.verify(message.l1Handler);
                            if (error)
                                return "l1Handler." + error;
                        }
                    }
                    if (message.deployAccount != null && message.hasOwnProperty("deployAccount")) {
                        if (properties.transaction === 1)
                            return "transaction: multiple values";
                        properties.transaction = 1;
                        {
                            var error = $root.apibara.starknet.v1alpha2.DeployAccountTransaction.verify(message.deployAccount);
                            if (error)
                                return "deployAccount." + error;
                        }
                    }
                    if (message.deployAccountV3 != null && message.hasOwnProperty("deployAccountV3")) {
                        if (properties.transaction === 1)
                            return "transaction: multiple values";
                        properties.transaction = 1;
                        {
                            var error = $root.apibara.starknet.v1alpha2.DeployAccountTransactionV3.verify(message.deployAccountV3);
                            if (error)
                                return "deployAccountV3." + error;
                        }
                    }
                    if (message.invokeV3 != null && message.hasOwnProperty("invokeV3")) {
                        if (properties.transaction === 1)
                            return "transaction: multiple values";
                        properties.transaction = 1;
                        {
                            var error = $root.apibara.starknet.v1alpha2.InvokeTransactionV3.verify(message.invokeV3);
                            if (error)
                                return "invokeV3." + error;
                        }
                    }
                    if (message.declareV3 != null && message.hasOwnProperty("declareV3")) {
                        if (properties.transaction === 1)
                            return "transaction: multiple values";
                        properties.transaction = 1;
                        {
                            var error = $root.apibara.starknet.v1alpha2.DeclareTransactionV3.verify(message.declareV3);
                            if (error)
                                return "declareV3." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a Transaction message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.Transaction
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.Transaction} Transaction
                 */
                Transaction.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.Transaction)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.Transaction();
                    if (object.meta != null) {
                        if (typeof object.meta !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.Transaction.meta: object expected");
                        message.meta = $root.apibara.starknet.v1alpha2.TransactionMeta.fromObject(object.meta);
                    }
                    if (object.invokeV0 != null) {
                        if (typeof object.invokeV0 !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.Transaction.invokeV0: object expected");
                        message.invokeV0 = $root.apibara.starknet.v1alpha2.InvokeTransactionV0.fromObject(object.invokeV0);
                    }
                    if (object.invokeV1 != null) {
                        if (typeof object.invokeV1 !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.Transaction.invokeV1: object expected");
                        message.invokeV1 = $root.apibara.starknet.v1alpha2.InvokeTransactionV1.fromObject(object.invokeV1);
                    }
                    if (object.deploy != null) {
                        if (typeof object.deploy !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.Transaction.deploy: object expected");
                        message.deploy = $root.apibara.starknet.v1alpha2.DeployTransaction.fromObject(object.deploy);
                    }
                    if (object.declare != null) {
                        if (typeof object.declare !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.Transaction.declare: object expected");
                        message.declare = $root.apibara.starknet.v1alpha2.DeclareTransaction.fromObject(object.declare);
                    }
                    if (object.l1Handler != null) {
                        if (typeof object.l1Handler !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.Transaction.l1Handler: object expected");
                        message.l1Handler = $root.apibara.starknet.v1alpha2.L1HandlerTransaction.fromObject(object.l1Handler);
                    }
                    if (object.deployAccount != null) {
                        if (typeof object.deployAccount !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.Transaction.deployAccount: object expected");
                        message.deployAccount = $root.apibara.starknet.v1alpha2.DeployAccountTransaction.fromObject(object.deployAccount);
                    }
                    if (object.deployAccountV3 != null) {
                        if (typeof object.deployAccountV3 !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.Transaction.deployAccountV3: object expected");
                        message.deployAccountV3 = $root.apibara.starknet.v1alpha2.DeployAccountTransactionV3.fromObject(object.deployAccountV3);
                    }
                    if (object.invokeV3 != null) {
                        if (typeof object.invokeV3 !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.Transaction.invokeV3: object expected");
                        message.invokeV3 = $root.apibara.starknet.v1alpha2.InvokeTransactionV3.fromObject(object.invokeV3);
                    }
                    if (object.declareV3 != null) {
                        if (typeof object.declareV3 !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.Transaction.declareV3: object expected");
                        message.declareV3 = $root.apibara.starknet.v1alpha2.DeclareTransactionV3.fromObject(object.declareV3);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a Transaction message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.Transaction
                 * @static
                 * @param {apibara.starknet.v1alpha2.Transaction} message Transaction
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Transaction.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.meta = null;
                    if (message.meta != null && message.hasOwnProperty("meta"))
                        object.meta = $root.apibara.starknet.v1alpha2.TransactionMeta.toObject(message.meta, options);
                    if (message.invokeV0 != null && message.hasOwnProperty("invokeV0")) {
                        object.invokeV0 = $root.apibara.starknet.v1alpha2.InvokeTransactionV0.toObject(message.invokeV0, options);
                        if (options.oneofs)
                            object.transaction = "invokeV0";
                    }
                    if (message.invokeV1 != null && message.hasOwnProperty("invokeV1")) {
                        object.invokeV1 = $root.apibara.starknet.v1alpha2.InvokeTransactionV1.toObject(message.invokeV1, options);
                        if (options.oneofs)
                            object.transaction = "invokeV1";
                    }
                    if (message.deploy != null && message.hasOwnProperty("deploy")) {
                        object.deploy = $root.apibara.starknet.v1alpha2.DeployTransaction.toObject(message.deploy, options);
                        if (options.oneofs)
                            object.transaction = "deploy";
                    }
                    if (message.declare != null && message.hasOwnProperty("declare")) {
                        object.declare = $root.apibara.starknet.v1alpha2.DeclareTransaction.toObject(message.declare, options);
                        if (options.oneofs)
                            object.transaction = "declare";
                    }
                    if (message.l1Handler != null && message.hasOwnProperty("l1Handler")) {
                        object.l1Handler = $root.apibara.starknet.v1alpha2.L1HandlerTransaction.toObject(message.l1Handler, options);
                        if (options.oneofs)
                            object.transaction = "l1Handler";
                    }
                    if (message.deployAccount != null && message.hasOwnProperty("deployAccount")) {
                        object.deployAccount = $root.apibara.starknet.v1alpha2.DeployAccountTransaction.toObject(message.deployAccount, options);
                        if (options.oneofs)
                            object.transaction = "deployAccount";
                    }
                    if (message.deployAccountV3 != null && message.hasOwnProperty("deployAccountV3")) {
                        object.deployAccountV3 = $root.apibara.starknet.v1alpha2.DeployAccountTransactionV3.toObject(message.deployAccountV3, options);
                        if (options.oneofs)
                            object.transaction = "deployAccountV3";
                    }
                    if (message.invokeV3 != null && message.hasOwnProperty("invokeV3")) {
                        object.invokeV3 = $root.apibara.starknet.v1alpha2.InvokeTransactionV3.toObject(message.invokeV3, options);
                        if (options.oneofs)
                            object.transaction = "invokeV3";
                    }
                    if (message.declareV3 != null && message.hasOwnProperty("declareV3")) {
                        object.declareV3 = $root.apibara.starknet.v1alpha2.DeclareTransactionV3.toObject(message.declareV3, options);
                        if (options.oneofs)
                            object.transaction = "declareV3";
                    }
                    return object;
                };

                /**
                 * Converts this Transaction to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.Transaction
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Transaction.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for Transaction
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.Transaction
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                Transaction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.Transaction";
                };

                return Transaction;
            })();

            v1alpha2.TransactionMeta = (function() {

                /**
                 * Properties of a TransactionMeta.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface ITransactionMeta
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [hash] TransactionMeta hash
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [maxFee] TransactionMeta maxFee
                 * @property {Array.<apibara.starknet.v1alpha2.IFieldElement>|null} [signature] TransactionMeta signature
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [nonce] TransactionMeta nonce
                 * @property {number|Long|null} [version] TransactionMeta version
                 * @property {apibara.starknet.v1alpha2.IResourceBoundsMapping|null} [resourceBounds] TransactionMeta resourceBounds
                 * @property {number|Long|null} [tip] TransactionMeta tip
                 * @property {Array.<apibara.starknet.v1alpha2.IFieldElement>|null} [paymasterData] TransactionMeta paymasterData
                 * @property {apibara.starknet.v1alpha2.DataAvailabilityMode|null} [nonceDataAvailabilityMode] TransactionMeta nonceDataAvailabilityMode
                 * @property {apibara.starknet.v1alpha2.DataAvailabilityMode|null} [feeDataAvailabilityMode] TransactionMeta feeDataAvailabilityMode
                 * @property {number|Long|null} [transactionIndex] TransactionMeta transactionIndex
                 */

                /**
                 * Constructs a new TransactionMeta.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a TransactionMeta.
                 * @implements ITransactionMeta
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.ITransactionMeta=} [properties] Properties to set
                 */
                function TransactionMeta(properties) {
                    this.signature = [];
                    this.paymasterData = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TransactionMeta hash.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} hash
                 * @memberof apibara.starknet.v1alpha2.TransactionMeta
                 * @instance
                 */
                TransactionMeta.prototype.hash = null;

                /**
                 * TransactionMeta maxFee.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} maxFee
                 * @memberof apibara.starknet.v1alpha2.TransactionMeta
                 * @instance
                 */
                TransactionMeta.prototype.maxFee = null;

                /**
                 * TransactionMeta signature.
                 * @member {Array.<apibara.starknet.v1alpha2.IFieldElement>} signature
                 * @memberof apibara.starknet.v1alpha2.TransactionMeta
                 * @instance
                 */
                TransactionMeta.prototype.signature = $util.emptyArray;

                /**
                 * TransactionMeta nonce.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} nonce
                 * @memberof apibara.starknet.v1alpha2.TransactionMeta
                 * @instance
                 */
                TransactionMeta.prototype.nonce = null;

                /**
                 * TransactionMeta version.
                 * @member {number|Long} version
                 * @memberof apibara.starknet.v1alpha2.TransactionMeta
                 * @instance
                 */
                TransactionMeta.prototype.version = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * TransactionMeta resourceBounds.
                 * @member {apibara.starknet.v1alpha2.IResourceBoundsMapping|null|undefined} resourceBounds
                 * @memberof apibara.starknet.v1alpha2.TransactionMeta
                 * @instance
                 */
                TransactionMeta.prototype.resourceBounds = null;

                /**
                 * TransactionMeta tip.
                 * @member {number|Long} tip
                 * @memberof apibara.starknet.v1alpha2.TransactionMeta
                 * @instance
                 */
                TransactionMeta.prototype.tip = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * TransactionMeta paymasterData.
                 * @member {Array.<apibara.starknet.v1alpha2.IFieldElement>} paymasterData
                 * @memberof apibara.starknet.v1alpha2.TransactionMeta
                 * @instance
                 */
                TransactionMeta.prototype.paymasterData = $util.emptyArray;

                /**
                 * TransactionMeta nonceDataAvailabilityMode.
                 * @member {apibara.starknet.v1alpha2.DataAvailabilityMode} nonceDataAvailabilityMode
                 * @memberof apibara.starknet.v1alpha2.TransactionMeta
                 * @instance
                 */
                TransactionMeta.prototype.nonceDataAvailabilityMode = 0;

                /**
                 * TransactionMeta feeDataAvailabilityMode.
                 * @member {apibara.starknet.v1alpha2.DataAvailabilityMode} feeDataAvailabilityMode
                 * @memberof apibara.starknet.v1alpha2.TransactionMeta
                 * @instance
                 */
                TransactionMeta.prototype.feeDataAvailabilityMode = 0;

                /**
                 * TransactionMeta transactionIndex.
                 * @member {number|Long} transactionIndex
                 * @memberof apibara.starknet.v1alpha2.TransactionMeta
                 * @instance
                 */
                TransactionMeta.prototype.transactionIndex = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * Creates a new TransactionMeta instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.TransactionMeta
                 * @static
                 * @param {apibara.starknet.v1alpha2.ITransactionMeta=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.TransactionMeta} TransactionMeta instance
                 */
                TransactionMeta.create = function create(properties) {
                    return new TransactionMeta(properties);
                };

                /**
                 * Encodes the specified TransactionMeta message. Does not implicitly {@link apibara.starknet.v1alpha2.TransactionMeta.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.TransactionMeta
                 * @static
                 * @param {apibara.starknet.v1alpha2.ITransactionMeta} message TransactionMeta message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TransactionMeta.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.hash != null && Object.hasOwnProperty.call(message, "hash"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.hash, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.maxFee != null && Object.hasOwnProperty.call(message, "maxFee"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.maxFee, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.signature != null && message.signature.length)
                        for (var i = 0; i < message.signature.length; ++i)
                            $root.apibara.starknet.v1alpha2.FieldElement.encode(message.signature[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.nonce != null && Object.hasOwnProperty.call(message, "nonce"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.nonce, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                        writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.version);
                    if (message.resourceBounds != null && Object.hasOwnProperty.call(message, "resourceBounds"))
                        $root.apibara.starknet.v1alpha2.ResourceBoundsMapping.encode(message.resourceBounds, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                    if (message.tip != null && Object.hasOwnProperty.call(message, "tip"))
                        writer.uint32(/* id 7, wireType 0 =*/56).uint64(message.tip);
                    if (message.paymasterData != null && message.paymasterData.length)
                        for (var i = 0; i < message.paymasterData.length; ++i)
                            $root.apibara.starknet.v1alpha2.FieldElement.encode(message.paymasterData[i], writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                    if (message.nonceDataAvailabilityMode != null && Object.hasOwnProperty.call(message, "nonceDataAvailabilityMode"))
                        writer.uint32(/* id 9, wireType 0 =*/72).int32(message.nonceDataAvailabilityMode);
                    if (message.feeDataAvailabilityMode != null && Object.hasOwnProperty.call(message, "feeDataAvailabilityMode"))
                        writer.uint32(/* id 10, wireType 0 =*/80).int32(message.feeDataAvailabilityMode);
                    if (message.transactionIndex != null && Object.hasOwnProperty.call(message, "transactionIndex"))
                        writer.uint32(/* id 11, wireType 0 =*/88).uint64(message.transactionIndex);
                    return writer;
                };

                /**
                 * Encodes the specified TransactionMeta message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.TransactionMeta.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.TransactionMeta
                 * @static
                 * @param {apibara.starknet.v1alpha2.ITransactionMeta} message TransactionMeta message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TransactionMeta.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a TransactionMeta message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.TransactionMeta
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.TransactionMeta} TransactionMeta
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TransactionMeta.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.TransactionMeta();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.hash = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.maxFee = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 3: {
                                if (!(message.signature && message.signature.length))
                                    message.signature = [];
                                message.signature.push($root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32()));
                                break;
                            }
                        case 4: {
                                message.nonce = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 5: {
                                message.version = reader.uint64();
                                break;
                            }
                        case 6: {
                                message.resourceBounds = $root.apibara.starknet.v1alpha2.ResourceBoundsMapping.decode(reader, reader.uint32());
                                break;
                            }
                        case 7: {
                                message.tip = reader.uint64();
                                break;
                            }
                        case 8: {
                                if (!(message.paymasterData && message.paymasterData.length))
                                    message.paymasterData = [];
                                message.paymasterData.push($root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32()));
                                break;
                            }
                        case 9: {
                                message.nonceDataAvailabilityMode = reader.int32();
                                break;
                            }
                        case 10: {
                                message.feeDataAvailabilityMode = reader.int32();
                                break;
                            }
                        case 11: {
                                message.transactionIndex = reader.uint64();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TransactionMeta message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.TransactionMeta
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.TransactionMeta} TransactionMeta
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TransactionMeta.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TransactionMeta message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.TransactionMeta
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TransactionMeta.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.hash != null && message.hasOwnProperty("hash")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.hash);
                        if (error)
                            return "hash." + error;
                    }
                    if (message.maxFee != null && message.hasOwnProperty("maxFee")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.maxFee);
                        if (error)
                            return "maxFee." + error;
                    }
                    if (message.signature != null && message.hasOwnProperty("signature")) {
                        if (!Array.isArray(message.signature))
                            return "signature: array expected";
                        for (var i = 0; i < message.signature.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.signature[i]);
                            if (error)
                                return "signature." + error;
                        }
                    }
                    if (message.nonce != null && message.hasOwnProperty("nonce")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.nonce);
                        if (error)
                            return "nonce." + error;
                    }
                    if (message.version != null && message.hasOwnProperty("version"))
                        if (!$util.isInteger(message.version) && !(message.version && $util.isInteger(message.version.low) && $util.isInteger(message.version.high)))
                            return "version: integer|Long expected";
                    if (message.resourceBounds != null && message.hasOwnProperty("resourceBounds")) {
                        var error = $root.apibara.starknet.v1alpha2.ResourceBoundsMapping.verify(message.resourceBounds);
                        if (error)
                            return "resourceBounds." + error;
                    }
                    if (message.tip != null && message.hasOwnProperty("tip"))
                        if (!$util.isInteger(message.tip) && !(message.tip && $util.isInteger(message.tip.low) && $util.isInteger(message.tip.high)))
                            return "tip: integer|Long expected";
                    if (message.paymasterData != null && message.hasOwnProperty("paymasterData")) {
                        if (!Array.isArray(message.paymasterData))
                            return "paymasterData: array expected";
                        for (var i = 0; i < message.paymasterData.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.paymasterData[i]);
                            if (error)
                                return "paymasterData." + error;
                        }
                    }
                    if (message.nonceDataAvailabilityMode != null && message.hasOwnProperty("nonceDataAvailabilityMode"))
                        switch (message.nonceDataAvailabilityMode) {
                        default:
                            return "nonceDataAvailabilityMode: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                            break;
                        }
                    if (message.feeDataAvailabilityMode != null && message.hasOwnProperty("feeDataAvailabilityMode"))
                        switch (message.feeDataAvailabilityMode) {
                        default:
                            return "feeDataAvailabilityMode: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                            break;
                        }
                    if (message.transactionIndex != null && message.hasOwnProperty("transactionIndex"))
                        if (!$util.isInteger(message.transactionIndex) && !(message.transactionIndex && $util.isInteger(message.transactionIndex.low) && $util.isInteger(message.transactionIndex.high)))
                            return "transactionIndex: integer|Long expected";
                    return null;
                };

                /**
                 * Creates a TransactionMeta message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.TransactionMeta
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.TransactionMeta} TransactionMeta
                 */
                TransactionMeta.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.TransactionMeta)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.TransactionMeta();
                    if (object.hash != null) {
                        if (typeof object.hash !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.TransactionMeta.hash: object expected");
                        message.hash = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.hash);
                    }
                    if (object.maxFee != null) {
                        if (typeof object.maxFee !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.TransactionMeta.maxFee: object expected");
                        message.maxFee = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.maxFee);
                    }
                    if (object.signature) {
                        if (!Array.isArray(object.signature))
                            throw TypeError(".apibara.starknet.v1alpha2.TransactionMeta.signature: array expected");
                        message.signature = [];
                        for (var i = 0; i < object.signature.length; ++i) {
                            if (typeof object.signature[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.TransactionMeta.signature: object expected");
                            message.signature[i] = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.signature[i]);
                        }
                    }
                    if (object.nonce != null) {
                        if (typeof object.nonce !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.TransactionMeta.nonce: object expected");
                        message.nonce = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.nonce);
                    }
                    if (object.version != null)
                        if ($util.Long)
                            (message.version = $util.Long.fromValue(object.version)).unsigned = true;
                        else if (typeof object.version === "string")
                            message.version = parseInt(object.version, 10);
                        else if (typeof object.version === "number")
                            message.version = object.version;
                        else if (typeof object.version === "object")
                            message.version = new $util.LongBits(object.version.low >>> 0, object.version.high >>> 0).toNumber(true);
                    if (object.resourceBounds != null) {
                        if (typeof object.resourceBounds !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.TransactionMeta.resourceBounds: object expected");
                        message.resourceBounds = $root.apibara.starknet.v1alpha2.ResourceBoundsMapping.fromObject(object.resourceBounds);
                    }
                    if (object.tip != null)
                        if ($util.Long)
                            (message.tip = $util.Long.fromValue(object.tip)).unsigned = true;
                        else if (typeof object.tip === "string")
                            message.tip = parseInt(object.tip, 10);
                        else if (typeof object.tip === "number")
                            message.tip = object.tip;
                        else if (typeof object.tip === "object")
                            message.tip = new $util.LongBits(object.tip.low >>> 0, object.tip.high >>> 0).toNumber(true);
                    if (object.paymasterData) {
                        if (!Array.isArray(object.paymasterData))
                            throw TypeError(".apibara.starknet.v1alpha2.TransactionMeta.paymasterData: array expected");
                        message.paymasterData = [];
                        for (var i = 0; i < object.paymasterData.length; ++i) {
                            if (typeof object.paymasterData[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.TransactionMeta.paymasterData: object expected");
                            message.paymasterData[i] = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.paymasterData[i]);
                        }
                    }
                    switch (object.nonceDataAvailabilityMode) {
                    default:
                        if (typeof object.nonceDataAvailabilityMode === "number") {
                            message.nonceDataAvailabilityMode = object.nonceDataAvailabilityMode;
                            break;
                        }
                        break;
                    case "DATA_AVAILABILITY_MODE_UNSPECIFIED":
                    case 0:
                        message.nonceDataAvailabilityMode = 0;
                        break;
                    case "DATA_AVAILABILITY_MODE_L1":
                    case 1:
                        message.nonceDataAvailabilityMode = 1;
                        break;
                    case "DATA_AVAILABILITY_MODE_L2":
                    case 2:
                        message.nonceDataAvailabilityMode = 2;
                        break;
                    }
                    switch (object.feeDataAvailabilityMode) {
                    default:
                        if (typeof object.feeDataAvailabilityMode === "number") {
                            message.feeDataAvailabilityMode = object.feeDataAvailabilityMode;
                            break;
                        }
                        break;
                    case "DATA_AVAILABILITY_MODE_UNSPECIFIED":
                    case 0:
                        message.feeDataAvailabilityMode = 0;
                        break;
                    case "DATA_AVAILABILITY_MODE_L1":
                    case 1:
                        message.feeDataAvailabilityMode = 1;
                        break;
                    case "DATA_AVAILABILITY_MODE_L2":
                    case 2:
                        message.feeDataAvailabilityMode = 2;
                        break;
                    }
                    if (object.transactionIndex != null)
                        if ($util.Long)
                            (message.transactionIndex = $util.Long.fromValue(object.transactionIndex)).unsigned = true;
                        else if (typeof object.transactionIndex === "string")
                            message.transactionIndex = parseInt(object.transactionIndex, 10);
                        else if (typeof object.transactionIndex === "number")
                            message.transactionIndex = object.transactionIndex;
                        else if (typeof object.transactionIndex === "object")
                            message.transactionIndex = new $util.LongBits(object.transactionIndex.low >>> 0, object.transactionIndex.high >>> 0).toNumber(true);
                    return message;
                };

                /**
                 * Creates a plain object from a TransactionMeta message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.TransactionMeta
                 * @static
                 * @param {apibara.starknet.v1alpha2.TransactionMeta} message TransactionMeta
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TransactionMeta.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults) {
                        object.signature = [];
                        object.paymasterData = [];
                    }
                    if (options.defaults) {
                        object.hash = null;
                        object.maxFee = null;
                        object.nonce = null;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, true);
                            object.version = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.version = options.longs === String ? "0" : 0;
                        object.resourceBounds = null;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, true);
                            object.tip = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.tip = options.longs === String ? "0" : 0;
                        object.nonceDataAvailabilityMode = options.enums === String ? "DATA_AVAILABILITY_MODE_UNSPECIFIED" : 0;
                        object.feeDataAvailabilityMode = options.enums === String ? "DATA_AVAILABILITY_MODE_UNSPECIFIED" : 0;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, true);
                            object.transactionIndex = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.transactionIndex = options.longs === String ? "0" : 0;
                    }
                    if (message.hash != null && message.hasOwnProperty("hash"))
                        object.hash = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.hash, options);
                    if (message.maxFee != null && message.hasOwnProperty("maxFee"))
                        object.maxFee = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.maxFee, options);
                    if (message.signature && message.signature.length) {
                        object.signature = [];
                        for (var j = 0; j < message.signature.length; ++j)
                            object.signature[j] = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.signature[j], options);
                    }
                    if (message.nonce != null && message.hasOwnProperty("nonce"))
                        object.nonce = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.nonce, options);
                    if (message.version != null && message.hasOwnProperty("version"))
                        if (typeof message.version === "number")
                            object.version = options.longs === String ? String(message.version) : message.version;
                        else
                            object.version = options.longs === String ? $util.Long.prototype.toString.call(message.version) : options.longs === Number ? new $util.LongBits(message.version.low >>> 0, message.version.high >>> 0).toNumber(true) : message.version;
                    if (message.resourceBounds != null && message.hasOwnProperty("resourceBounds"))
                        object.resourceBounds = $root.apibara.starknet.v1alpha2.ResourceBoundsMapping.toObject(message.resourceBounds, options);
                    if (message.tip != null && message.hasOwnProperty("tip"))
                        if (typeof message.tip === "number")
                            object.tip = options.longs === String ? String(message.tip) : message.tip;
                        else
                            object.tip = options.longs === String ? $util.Long.prototype.toString.call(message.tip) : options.longs === Number ? new $util.LongBits(message.tip.low >>> 0, message.tip.high >>> 0).toNumber(true) : message.tip;
                    if (message.paymasterData && message.paymasterData.length) {
                        object.paymasterData = [];
                        for (var j = 0; j < message.paymasterData.length; ++j)
                            object.paymasterData[j] = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.paymasterData[j], options);
                    }
                    if (message.nonceDataAvailabilityMode != null && message.hasOwnProperty("nonceDataAvailabilityMode"))
                        object.nonceDataAvailabilityMode = options.enums === String ? $root.apibara.starknet.v1alpha2.DataAvailabilityMode[message.nonceDataAvailabilityMode] === undefined ? message.nonceDataAvailabilityMode : $root.apibara.starknet.v1alpha2.DataAvailabilityMode[message.nonceDataAvailabilityMode] : message.nonceDataAvailabilityMode;
                    if (message.feeDataAvailabilityMode != null && message.hasOwnProperty("feeDataAvailabilityMode"))
                        object.feeDataAvailabilityMode = options.enums === String ? $root.apibara.starknet.v1alpha2.DataAvailabilityMode[message.feeDataAvailabilityMode] === undefined ? message.feeDataAvailabilityMode : $root.apibara.starknet.v1alpha2.DataAvailabilityMode[message.feeDataAvailabilityMode] : message.feeDataAvailabilityMode;
                    if (message.transactionIndex != null && message.hasOwnProperty("transactionIndex"))
                        if (typeof message.transactionIndex === "number")
                            object.transactionIndex = options.longs === String ? String(message.transactionIndex) : message.transactionIndex;
                        else
                            object.transactionIndex = options.longs === String ? $util.Long.prototype.toString.call(message.transactionIndex) : options.longs === Number ? new $util.LongBits(message.transactionIndex.low >>> 0, message.transactionIndex.high >>> 0).toNumber(true) : message.transactionIndex;
                    return object;
                };

                /**
                 * Converts this TransactionMeta to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.TransactionMeta
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TransactionMeta.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for TransactionMeta
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.TransactionMeta
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                TransactionMeta.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.TransactionMeta";
                };

                return TransactionMeta;
            })();

            v1alpha2.InvokeTransactionV0 = (function() {

                /**
                 * Properties of an InvokeTransactionV0.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IInvokeTransactionV0
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [contractAddress] InvokeTransactionV0 contractAddress
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [entryPointSelector] InvokeTransactionV0 entryPointSelector
                 * @property {Array.<apibara.starknet.v1alpha2.IFieldElement>|null} [calldata] InvokeTransactionV0 calldata
                 */

                /**
                 * Constructs a new InvokeTransactionV0.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents an InvokeTransactionV0.
                 * @implements IInvokeTransactionV0
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IInvokeTransactionV0=} [properties] Properties to set
                 */
                function InvokeTransactionV0(properties) {
                    this.calldata = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * InvokeTransactionV0 contractAddress.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} contractAddress
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV0
                 * @instance
                 */
                InvokeTransactionV0.prototype.contractAddress = null;

                /**
                 * InvokeTransactionV0 entryPointSelector.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} entryPointSelector
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV0
                 * @instance
                 */
                InvokeTransactionV0.prototype.entryPointSelector = null;

                /**
                 * InvokeTransactionV0 calldata.
                 * @member {Array.<apibara.starknet.v1alpha2.IFieldElement>} calldata
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV0
                 * @instance
                 */
                InvokeTransactionV0.prototype.calldata = $util.emptyArray;

                /**
                 * Creates a new InvokeTransactionV0 instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV0
                 * @static
                 * @param {apibara.starknet.v1alpha2.IInvokeTransactionV0=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.InvokeTransactionV0} InvokeTransactionV0 instance
                 */
                InvokeTransactionV0.create = function create(properties) {
                    return new InvokeTransactionV0(properties);
                };

                /**
                 * Encodes the specified InvokeTransactionV0 message. Does not implicitly {@link apibara.starknet.v1alpha2.InvokeTransactionV0.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV0
                 * @static
                 * @param {apibara.starknet.v1alpha2.IInvokeTransactionV0} message InvokeTransactionV0 message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InvokeTransactionV0.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.contractAddress != null && Object.hasOwnProperty.call(message, "contractAddress"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.contractAddress, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.entryPointSelector != null && Object.hasOwnProperty.call(message, "entryPointSelector"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.entryPointSelector, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.calldata != null && message.calldata.length)
                        for (var i = 0; i < message.calldata.length; ++i)
                            $root.apibara.starknet.v1alpha2.FieldElement.encode(message.calldata[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified InvokeTransactionV0 message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.InvokeTransactionV0.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV0
                 * @static
                 * @param {apibara.starknet.v1alpha2.IInvokeTransactionV0} message InvokeTransactionV0 message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InvokeTransactionV0.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an InvokeTransactionV0 message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV0
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.InvokeTransactionV0} InvokeTransactionV0
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InvokeTransactionV0.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.InvokeTransactionV0();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.entryPointSelector = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 3: {
                                if (!(message.calldata && message.calldata.length))
                                    message.calldata = [];
                                message.calldata.push($root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32()));
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an InvokeTransactionV0 message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV0
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.InvokeTransactionV0} InvokeTransactionV0
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InvokeTransactionV0.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an InvokeTransactionV0 message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV0
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                InvokeTransactionV0.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.contractAddress != null && message.hasOwnProperty("contractAddress")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.contractAddress);
                        if (error)
                            return "contractAddress." + error;
                    }
                    if (message.entryPointSelector != null && message.hasOwnProperty("entryPointSelector")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.entryPointSelector);
                        if (error)
                            return "entryPointSelector." + error;
                    }
                    if (message.calldata != null && message.hasOwnProperty("calldata")) {
                        if (!Array.isArray(message.calldata))
                            return "calldata: array expected";
                        for (var i = 0; i < message.calldata.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.calldata[i]);
                            if (error)
                                return "calldata." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates an InvokeTransactionV0 message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV0
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.InvokeTransactionV0} InvokeTransactionV0
                 */
                InvokeTransactionV0.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.InvokeTransactionV0)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.InvokeTransactionV0();
                    if (object.contractAddress != null) {
                        if (typeof object.contractAddress !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.InvokeTransactionV0.contractAddress: object expected");
                        message.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.contractAddress);
                    }
                    if (object.entryPointSelector != null) {
                        if (typeof object.entryPointSelector !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.InvokeTransactionV0.entryPointSelector: object expected");
                        message.entryPointSelector = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.entryPointSelector);
                    }
                    if (object.calldata) {
                        if (!Array.isArray(object.calldata))
                            throw TypeError(".apibara.starknet.v1alpha2.InvokeTransactionV0.calldata: array expected");
                        message.calldata = [];
                        for (var i = 0; i < object.calldata.length; ++i) {
                            if (typeof object.calldata[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.InvokeTransactionV0.calldata: object expected");
                            message.calldata[i] = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.calldata[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from an InvokeTransactionV0 message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV0
                 * @static
                 * @param {apibara.starknet.v1alpha2.InvokeTransactionV0} message InvokeTransactionV0
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                InvokeTransactionV0.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.calldata = [];
                    if (options.defaults) {
                        object.contractAddress = null;
                        object.entryPointSelector = null;
                    }
                    if (message.contractAddress != null && message.hasOwnProperty("contractAddress"))
                        object.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.contractAddress, options);
                    if (message.entryPointSelector != null && message.hasOwnProperty("entryPointSelector"))
                        object.entryPointSelector = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.entryPointSelector, options);
                    if (message.calldata && message.calldata.length) {
                        object.calldata = [];
                        for (var j = 0; j < message.calldata.length; ++j)
                            object.calldata[j] = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.calldata[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this InvokeTransactionV0 to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV0
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                InvokeTransactionV0.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for InvokeTransactionV0
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV0
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                InvokeTransactionV0.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.InvokeTransactionV0";
                };

                return InvokeTransactionV0;
            })();

            v1alpha2.InvokeTransactionV1 = (function() {

                /**
                 * Properties of an InvokeTransactionV1.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IInvokeTransactionV1
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [senderAddress] InvokeTransactionV1 senderAddress
                 * @property {Array.<apibara.starknet.v1alpha2.IFieldElement>|null} [calldata] InvokeTransactionV1 calldata
                 */

                /**
                 * Constructs a new InvokeTransactionV1.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents an InvokeTransactionV1.
                 * @implements IInvokeTransactionV1
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IInvokeTransactionV1=} [properties] Properties to set
                 */
                function InvokeTransactionV1(properties) {
                    this.calldata = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * InvokeTransactionV1 senderAddress.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} senderAddress
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV1
                 * @instance
                 */
                InvokeTransactionV1.prototype.senderAddress = null;

                /**
                 * InvokeTransactionV1 calldata.
                 * @member {Array.<apibara.starknet.v1alpha2.IFieldElement>} calldata
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV1
                 * @instance
                 */
                InvokeTransactionV1.prototype.calldata = $util.emptyArray;

                /**
                 * Creates a new InvokeTransactionV1 instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV1
                 * @static
                 * @param {apibara.starknet.v1alpha2.IInvokeTransactionV1=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.InvokeTransactionV1} InvokeTransactionV1 instance
                 */
                InvokeTransactionV1.create = function create(properties) {
                    return new InvokeTransactionV1(properties);
                };

                /**
                 * Encodes the specified InvokeTransactionV1 message. Does not implicitly {@link apibara.starknet.v1alpha2.InvokeTransactionV1.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV1
                 * @static
                 * @param {apibara.starknet.v1alpha2.IInvokeTransactionV1} message InvokeTransactionV1 message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InvokeTransactionV1.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.senderAddress != null && Object.hasOwnProperty.call(message, "senderAddress"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.senderAddress, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.calldata != null && message.calldata.length)
                        for (var i = 0; i < message.calldata.length; ++i)
                            $root.apibara.starknet.v1alpha2.FieldElement.encode(message.calldata[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified InvokeTransactionV1 message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.InvokeTransactionV1.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV1
                 * @static
                 * @param {apibara.starknet.v1alpha2.IInvokeTransactionV1} message InvokeTransactionV1 message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InvokeTransactionV1.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an InvokeTransactionV1 message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV1
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.InvokeTransactionV1} InvokeTransactionV1
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InvokeTransactionV1.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.InvokeTransactionV1();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.senderAddress = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                if (!(message.calldata && message.calldata.length))
                                    message.calldata = [];
                                message.calldata.push($root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32()));
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an InvokeTransactionV1 message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV1
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.InvokeTransactionV1} InvokeTransactionV1
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InvokeTransactionV1.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an InvokeTransactionV1 message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV1
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                InvokeTransactionV1.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.senderAddress != null && message.hasOwnProperty("senderAddress")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.senderAddress);
                        if (error)
                            return "senderAddress." + error;
                    }
                    if (message.calldata != null && message.hasOwnProperty("calldata")) {
                        if (!Array.isArray(message.calldata))
                            return "calldata: array expected";
                        for (var i = 0; i < message.calldata.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.calldata[i]);
                            if (error)
                                return "calldata." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates an InvokeTransactionV1 message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV1
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.InvokeTransactionV1} InvokeTransactionV1
                 */
                InvokeTransactionV1.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.InvokeTransactionV1)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.InvokeTransactionV1();
                    if (object.senderAddress != null) {
                        if (typeof object.senderAddress !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.InvokeTransactionV1.senderAddress: object expected");
                        message.senderAddress = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.senderAddress);
                    }
                    if (object.calldata) {
                        if (!Array.isArray(object.calldata))
                            throw TypeError(".apibara.starknet.v1alpha2.InvokeTransactionV1.calldata: array expected");
                        message.calldata = [];
                        for (var i = 0; i < object.calldata.length; ++i) {
                            if (typeof object.calldata[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.InvokeTransactionV1.calldata: object expected");
                            message.calldata[i] = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.calldata[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from an InvokeTransactionV1 message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV1
                 * @static
                 * @param {apibara.starknet.v1alpha2.InvokeTransactionV1} message InvokeTransactionV1
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                InvokeTransactionV1.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.calldata = [];
                    if (options.defaults)
                        object.senderAddress = null;
                    if (message.senderAddress != null && message.hasOwnProperty("senderAddress"))
                        object.senderAddress = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.senderAddress, options);
                    if (message.calldata && message.calldata.length) {
                        object.calldata = [];
                        for (var j = 0; j < message.calldata.length; ++j)
                            object.calldata[j] = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.calldata[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this InvokeTransactionV1 to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV1
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                InvokeTransactionV1.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for InvokeTransactionV1
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV1
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                InvokeTransactionV1.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.InvokeTransactionV1";
                };

                return InvokeTransactionV1;
            })();

            v1alpha2.InvokeTransactionV3 = (function() {

                /**
                 * Properties of an InvokeTransactionV3.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IInvokeTransactionV3
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [senderAddress] InvokeTransactionV3 senderAddress
                 * @property {Array.<apibara.starknet.v1alpha2.IFieldElement>|null} [calldata] InvokeTransactionV3 calldata
                 * @property {Array.<apibara.starknet.v1alpha2.IFieldElement>|null} [accountDeploymentData] InvokeTransactionV3 accountDeploymentData
                 */

                /**
                 * Constructs a new InvokeTransactionV3.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents an InvokeTransactionV3.
                 * @implements IInvokeTransactionV3
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IInvokeTransactionV3=} [properties] Properties to set
                 */
                function InvokeTransactionV3(properties) {
                    this.calldata = [];
                    this.accountDeploymentData = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * InvokeTransactionV3 senderAddress.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} senderAddress
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV3
                 * @instance
                 */
                InvokeTransactionV3.prototype.senderAddress = null;

                /**
                 * InvokeTransactionV3 calldata.
                 * @member {Array.<apibara.starknet.v1alpha2.IFieldElement>} calldata
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV3
                 * @instance
                 */
                InvokeTransactionV3.prototype.calldata = $util.emptyArray;

                /**
                 * InvokeTransactionV3 accountDeploymentData.
                 * @member {Array.<apibara.starknet.v1alpha2.IFieldElement>} accountDeploymentData
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV3
                 * @instance
                 */
                InvokeTransactionV3.prototype.accountDeploymentData = $util.emptyArray;

                /**
                 * Creates a new InvokeTransactionV3 instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV3
                 * @static
                 * @param {apibara.starknet.v1alpha2.IInvokeTransactionV3=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.InvokeTransactionV3} InvokeTransactionV3 instance
                 */
                InvokeTransactionV3.create = function create(properties) {
                    return new InvokeTransactionV3(properties);
                };

                /**
                 * Encodes the specified InvokeTransactionV3 message. Does not implicitly {@link apibara.starknet.v1alpha2.InvokeTransactionV3.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV3
                 * @static
                 * @param {apibara.starknet.v1alpha2.IInvokeTransactionV3} message InvokeTransactionV3 message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InvokeTransactionV3.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.senderAddress != null && Object.hasOwnProperty.call(message, "senderAddress"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.senderAddress, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.calldata != null && message.calldata.length)
                        for (var i = 0; i < message.calldata.length; ++i)
                            $root.apibara.starknet.v1alpha2.FieldElement.encode(message.calldata[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.accountDeploymentData != null && message.accountDeploymentData.length)
                        for (var i = 0; i < message.accountDeploymentData.length; ++i)
                            $root.apibara.starknet.v1alpha2.FieldElement.encode(message.accountDeploymentData[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified InvokeTransactionV3 message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.InvokeTransactionV3.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV3
                 * @static
                 * @param {apibara.starknet.v1alpha2.IInvokeTransactionV3} message InvokeTransactionV3 message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InvokeTransactionV3.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an InvokeTransactionV3 message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV3
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.InvokeTransactionV3} InvokeTransactionV3
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InvokeTransactionV3.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.InvokeTransactionV3();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.senderAddress = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                if (!(message.calldata && message.calldata.length))
                                    message.calldata = [];
                                message.calldata.push($root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32()));
                                break;
                            }
                        case 3: {
                                if (!(message.accountDeploymentData && message.accountDeploymentData.length))
                                    message.accountDeploymentData = [];
                                message.accountDeploymentData.push($root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32()));
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an InvokeTransactionV3 message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV3
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.InvokeTransactionV3} InvokeTransactionV3
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InvokeTransactionV3.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an InvokeTransactionV3 message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV3
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                InvokeTransactionV3.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.senderAddress != null && message.hasOwnProperty("senderAddress")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.senderAddress);
                        if (error)
                            return "senderAddress." + error;
                    }
                    if (message.calldata != null && message.hasOwnProperty("calldata")) {
                        if (!Array.isArray(message.calldata))
                            return "calldata: array expected";
                        for (var i = 0; i < message.calldata.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.calldata[i]);
                            if (error)
                                return "calldata." + error;
                        }
                    }
                    if (message.accountDeploymentData != null && message.hasOwnProperty("accountDeploymentData")) {
                        if (!Array.isArray(message.accountDeploymentData))
                            return "accountDeploymentData: array expected";
                        for (var i = 0; i < message.accountDeploymentData.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.accountDeploymentData[i]);
                            if (error)
                                return "accountDeploymentData." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates an InvokeTransactionV3 message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV3
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.InvokeTransactionV3} InvokeTransactionV3
                 */
                InvokeTransactionV3.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.InvokeTransactionV3)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.InvokeTransactionV3();
                    if (object.senderAddress != null) {
                        if (typeof object.senderAddress !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.InvokeTransactionV3.senderAddress: object expected");
                        message.senderAddress = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.senderAddress);
                    }
                    if (object.calldata) {
                        if (!Array.isArray(object.calldata))
                            throw TypeError(".apibara.starknet.v1alpha2.InvokeTransactionV3.calldata: array expected");
                        message.calldata = [];
                        for (var i = 0; i < object.calldata.length; ++i) {
                            if (typeof object.calldata[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.InvokeTransactionV3.calldata: object expected");
                            message.calldata[i] = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.calldata[i]);
                        }
                    }
                    if (object.accountDeploymentData) {
                        if (!Array.isArray(object.accountDeploymentData))
                            throw TypeError(".apibara.starknet.v1alpha2.InvokeTransactionV3.accountDeploymentData: array expected");
                        message.accountDeploymentData = [];
                        for (var i = 0; i < object.accountDeploymentData.length; ++i) {
                            if (typeof object.accountDeploymentData[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.InvokeTransactionV3.accountDeploymentData: object expected");
                            message.accountDeploymentData[i] = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.accountDeploymentData[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from an InvokeTransactionV3 message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV3
                 * @static
                 * @param {apibara.starknet.v1alpha2.InvokeTransactionV3} message InvokeTransactionV3
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                InvokeTransactionV3.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults) {
                        object.calldata = [];
                        object.accountDeploymentData = [];
                    }
                    if (options.defaults)
                        object.senderAddress = null;
                    if (message.senderAddress != null && message.hasOwnProperty("senderAddress"))
                        object.senderAddress = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.senderAddress, options);
                    if (message.calldata && message.calldata.length) {
                        object.calldata = [];
                        for (var j = 0; j < message.calldata.length; ++j)
                            object.calldata[j] = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.calldata[j], options);
                    }
                    if (message.accountDeploymentData && message.accountDeploymentData.length) {
                        object.accountDeploymentData = [];
                        for (var j = 0; j < message.accountDeploymentData.length; ++j)
                            object.accountDeploymentData[j] = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.accountDeploymentData[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this InvokeTransactionV3 to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV3
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                InvokeTransactionV3.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for InvokeTransactionV3
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.InvokeTransactionV3
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                InvokeTransactionV3.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.InvokeTransactionV3";
                };

                return InvokeTransactionV3;
            })();

            v1alpha2.DeployTransaction = (function() {

                /**
                 * Properties of a DeployTransaction.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IDeployTransaction
                 * @property {Array.<apibara.starknet.v1alpha2.IFieldElement>|null} [constructorCalldata] DeployTransaction constructorCalldata
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [contractAddressSalt] DeployTransaction contractAddressSalt
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [classHash] DeployTransaction classHash
                 */

                /**
                 * Constructs a new DeployTransaction.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a DeployTransaction.
                 * @implements IDeployTransaction
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IDeployTransaction=} [properties] Properties to set
                 */
                function DeployTransaction(properties) {
                    this.constructorCalldata = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DeployTransaction constructorCalldata.
                 * @member {Array.<apibara.starknet.v1alpha2.IFieldElement>} constructorCalldata
                 * @memberof apibara.starknet.v1alpha2.DeployTransaction
                 * @instance
                 */
                DeployTransaction.prototype.constructorCalldata = $util.emptyArray;

                /**
                 * DeployTransaction contractAddressSalt.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} contractAddressSalt
                 * @memberof apibara.starknet.v1alpha2.DeployTransaction
                 * @instance
                 */
                DeployTransaction.prototype.contractAddressSalt = null;

                /**
                 * DeployTransaction classHash.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} classHash
                 * @memberof apibara.starknet.v1alpha2.DeployTransaction
                 * @instance
                 */
                DeployTransaction.prototype.classHash = null;

                /**
                 * Creates a new DeployTransaction instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.DeployTransaction
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeployTransaction=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.DeployTransaction} DeployTransaction instance
                 */
                DeployTransaction.create = function create(properties) {
                    return new DeployTransaction(properties);
                };

                /**
                 * Encodes the specified DeployTransaction message. Does not implicitly {@link apibara.starknet.v1alpha2.DeployTransaction.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.DeployTransaction
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeployTransaction} message DeployTransaction message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeployTransaction.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.constructorCalldata != null && message.constructorCalldata.length)
                        for (var i = 0; i < message.constructorCalldata.length; ++i)
                            $root.apibara.starknet.v1alpha2.FieldElement.encode(message.constructorCalldata[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.contractAddressSalt != null && Object.hasOwnProperty.call(message, "contractAddressSalt"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.contractAddressSalt, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.classHash != null && Object.hasOwnProperty.call(message, "classHash"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.classHash, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified DeployTransaction message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.DeployTransaction.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.DeployTransaction
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeployTransaction} message DeployTransaction message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeployTransaction.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a DeployTransaction message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.DeployTransaction
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.DeployTransaction} DeployTransaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeployTransaction.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.DeployTransaction();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 2: {
                                if (!(message.constructorCalldata && message.constructorCalldata.length))
                                    message.constructorCalldata = [];
                                message.constructorCalldata.push($root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32()));
                                break;
                            }
                        case 3: {
                                message.contractAddressSalt = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 4: {
                                message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a DeployTransaction message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.DeployTransaction
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.DeployTransaction} DeployTransaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeployTransaction.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a DeployTransaction message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.DeployTransaction
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DeployTransaction.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.constructorCalldata != null && message.hasOwnProperty("constructorCalldata")) {
                        if (!Array.isArray(message.constructorCalldata))
                            return "constructorCalldata: array expected";
                        for (var i = 0; i < message.constructorCalldata.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.constructorCalldata[i]);
                            if (error)
                                return "constructorCalldata." + error;
                        }
                    }
                    if (message.contractAddressSalt != null && message.hasOwnProperty("contractAddressSalt")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.contractAddressSalt);
                        if (error)
                            return "contractAddressSalt." + error;
                    }
                    if (message.classHash != null && message.hasOwnProperty("classHash")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.classHash);
                        if (error)
                            return "classHash." + error;
                    }
                    return null;
                };

                /**
                 * Creates a DeployTransaction message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.DeployTransaction
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.DeployTransaction} DeployTransaction
                 */
                DeployTransaction.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.DeployTransaction)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.DeployTransaction();
                    if (object.constructorCalldata) {
                        if (!Array.isArray(object.constructorCalldata))
                            throw TypeError(".apibara.starknet.v1alpha2.DeployTransaction.constructorCalldata: array expected");
                        message.constructorCalldata = [];
                        for (var i = 0; i < object.constructorCalldata.length; ++i) {
                            if (typeof object.constructorCalldata[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.DeployTransaction.constructorCalldata: object expected");
                            message.constructorCalldata[i] = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.constructorCalldata[i]);
                        }
                    }
                    if (object.contractAddressSalt != null) {
                        if (typeof object.contractAddressSalt !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.DeployTransaction.contractAddressSalt: object expected");
                        message.contractAddressSalt = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.contractAddressSalt);
                    }
                    if (object.classHash != null) {
                        if (typeof object.classHash !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.DeployTransaction.classHash: object expected");
                        message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.classHash);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a DeployTransaction message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.DeployTransaction
                 * @static
                 * @param {apibara.starknet.v1alpha2.DeployTransaction} message DeployTransaction
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DeployTransaction.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.constructorCalldata = [];
                    if (options.defaults) {
                        object.contractAddressSalt = null;
                        object.classHash = null;
                    }
                    if (message.constructorCalldata && message.constructorCalldata.length) {
                        object.constructorCalldata = [];
                        for (var j = 0; j < message.constructorCalldata.length; ++j)
                            object.constructorCalldata[j] = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.constructorCalldata[j], options);
                    }
                    if (message.contractAddressSalt != null && message.hasOwnProperty("contractAddressSalt"))
                        object.contractAddressSalt = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.contractAddressSalt, options);
                    if (message.classHash != null && message.hasOwnProperty("classHash"))
                        object.classHash = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.classHash, options);
                    return object;
                };

                /**
                 * Converts this DeployTransaction to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.DeployTransaction
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DeployTransaction.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for DeployTransaction
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.DeployTransaction
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                DeployTransaction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.DeployTransaction";
                };

                return DeployTransaction;
            })();

            v1alpha2.DeclareTransaction = (function() {

                /**
                 * Properties of a DeclareTransaction.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IDeclareTransaction
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [classHash] DeclareTransaction classHash
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [senderAddress] DeclareTransaction senderAddress
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [compiledClassHash] DeclareTransaction compiledClassHash
                 */

                /**
                 * Constructs a new DeclareTransaction.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a DeclareTransaction.
                 * @implements IDeclareTransaction
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IDeclareTransaction=} [properties] Properties to set
                 */
                function DeclareTransaction(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DeclareTransaction classHash.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} classHash
                 * @memberof apibara.starknet.v1alpha2.DeclareTransaction
                 * @instance
                 */
                DeclareTransaction.prototype.classHash = null;

                /**
                 * DeclareTransaction senderAddress.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} senderAddress
                 * @memberof apibara.starknet.v1alpha2.DeclareTransaction
                 * @instance
                 */
                DeclareTransaction.prototype.senderAddress = null;

                /**
                 * DeclareTransaction compiledClassHash.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} compiledClassHash
                 * @memberof apibara.starknet.v1alpha2.DeclareTransaction
                 * @instance
                 */
                DeclareTransaction.prototype.compiledClassHash = null;

                /**
                 * Creates a new DeclareTransaction instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.DeclareTransaction
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeclareTransaction=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.DeclareTransaction} DeclareTransaction instance
                 */
                DeclareTransaction.create = function create(properties) {
                    return new DeclareTransaction(properties);
                };

                /**
                 * Encodes the specified DeclareTransaction message. Does not implicitly {@link apibara.starknet.v1alpha2.DeclareTransaction.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.DeclareTransaction
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeclareTransaction} message DeclareTransaction message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeclareTransaction.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.classHash != null && Object.hasOwnProperty.call(message, "classHash"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.classHash, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.senderAddress != null && Object.hasOwnProperty.call(message, "senderAddress"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.senderAddress, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.compiledClassHash != null && Object.hasOwnProperty.call(message, "compiledClassHash"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.compiledClassHash, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified DeclareTransaction message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.DeclareTransaction.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.DeclareTransaction
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeclareTransaction} message DeclareTransaction message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeclareTransaction.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a DeclareTransaction message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.DeclareTransaction
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.DeclareTransaction} DeclareTransaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeclareTransaction.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.DeclareTransaction();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.senderAddress = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 3: {
                                message.compiledClassHash = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a DeclareTransaction message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.DeclareTransaction
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.DeclareTransaction} DeclareTransaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeclareTransaction.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a DeclareTransaction message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.DeclareTransaction
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DeclareTransaction.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.classHash != null && message.hasOwnProperty("classHash")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.classHash);
                        if (error)
                            return "classHash." + error;
                    }
                    if (message.senderAddress != null && message.hasOwnProperty("senderAddress")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.senderAddress);
                        if (error)
                            return "senderAddress." + error;
                    }
                    if (message.compiledClassHash != null && message.hasOwnProperty("compiledClassHash")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.compiledClassHash);
                        if (error)
                            return "compiledClassHash." + error;
                    }
                    return null;
                };

                /**
                 * Creates a DeclareTransaction message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.DeclareTransaction
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.DeclareTransaction} DeclareTransaction
                 */
                DeclareTransaction.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.DeclareTransaction)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.DeclareTransaction();
                    if (object.classHash != null) {
                        if (typeof object.classHash !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.DeclareTransaction.classHash: object expected");
                        message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.classHash);
                    }
                    if (object.senderAddress != null) {
                        if (typeof object.senderAddress !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.DeclareTransaction.senderAddress: object expected");
                        message.senderAddress = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.senderAddress);
                    }
                    if (object.compiledClassHash != null) {
                        if (typeof object.compiledClassHash !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.DeclareTransaction.compiledClassHash: object expected");
                        message.compiledClassHash = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.compiledClassHash);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a DeclareTransaction message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.DeclareTransaction
                 * @static
                 * @param {apibara.starknet.v1alpha2.DeclareTransaction} message DeclareTransaction
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DeclareTransaction.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.classHash = null;
                        object.senderAddress = null;
                        object.compiledClassHash = null;
                    }
                    if (message.classHash != null && message.hasOwnProperty("classHash"))
                        object.classHash = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.classHash, options);
                    if (message.senderAddress != null && message.hasOwnProperty("senderAddress"))
                        object.senderAddress = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.senderAddress, options);
                    if (message.compiledClassHash != null && message.hasOwnProperty("compiledClassHash"))
                        object.compiledClassHash = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.compiledClassHash, options);
                    return object;
                };

                /**
                 * Converts this DeclareTransaction to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.DeclareTransaction
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DeclareTransaction.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for DeclareTransaction
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.DeclareTransaction
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                DeclareTransaction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.DeclareTransaction";
                };

                return DeclareTransaction;
            })();

            v1alpha2.DeclareTransactionV3 = (function() {

                /**
                 * Properties of a DeclareTransactionV3.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IDeclareTransactionV3
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [classHash] DeclareTransactionV3 classHash
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [senderAddress] DeclareTransactionV3 senderAddress
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [compiledClassHash] DeclareTransactionV3 compiledClassHash
                 * @property {Array.<apibara.starknet.v1alpha2.IFieldElement>|null} [accountDeploymentData] DeclareTransactionV3 accountDeploymentData
                 */

                /**
                 * Constructs a new DeclareTransactionV3.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a DeclareTransactionV3.
                 * @implements IDeclareTransactionV3
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IDeclareTransactionV3=} [properties] Properties to set
                 */
                function DeclareTransactionV3(properties) {
                    this.accountDeploymentData = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DeclareTransactionV3 classHash.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} classHash
                 * @memberof apibara.starknet.v1alpha2.DeclareTransactionV3
                 * @instance
                 */
                DeclareTransactionV3.prototype.classHash = null;

                /**
                 * DeclareTransactionV3 senderAddress.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} senderAddress
                 * @memberof apibara.starknet.v1alpha2.DeclareTransactionV3
                 * @instance
                 */
                DeclareTransactionV3.prototype.senderAddress = null;

                /**
                 * DeclareTransactionV3 compiledClassHash.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} compiledClassHash
                 * @memberof apibara.starknet.v1alpha2.DeclareTransactionV3
                 * @instance
                 */
                DeclareTransactionV3.prototype.compiledClassHash = null;

                /**
                 * DeclareTransactionV3 accountDeploymentData.
                 * @member {Array.<apibara.starknet.v1alpha2.IFieldElement>} accountDeploymentData
                 * @memberof apibara.starknet.v1alpha2.DeclareTransactionV3
                 * @instance
                 */
                DeclareTransactionV3.prototype.accountDeploymentData = $util.emptyArray;

                /**
                 * Creates a new DeclareTransactionV3 instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.DeclareTransactionV3
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeclareTransactionV3=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.DeclareTransactionV3} DeclareTransactionV3 instance
                 */
                DeclareTransactionV3.create = function create(properties) {
                    return new DeclareTransactionV3(properties);
                };

                /**
                 * Encodes the specified DeclareTransactionV3 message. Does not implicitly {@link apibara.starknet.v1alpha2.DeclareTransactionV3.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.DeclareTransactionV3
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeclareTransactionV3} message DeclareTransactionV3 message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeclareTransactionV3.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.classHash != null && Object.hasOwnProperty.call(message, "classHash"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.classHash, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.senderAddress != null && Object.hasOwnProperty.call(message, "senderAddress"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.senderAddress, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.compiledClassHash != null && Object.hasOwnProperty.call(message, "compiledClassHash"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.compiledClassHash, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.accountDeploymentData != null && message.accountDeploymentData.length)
                        for (var i = 0; i < message.accountDeploymentData.length; ++i)
                            $root.apibara.starknet.v1alpha2.FieldElement.encode(message.accountDeploymentData[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified DeclareTransactionV3 message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.DeclareTransactionV3.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.DeclareTransactionV3
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeclareTransactionV3} message DeclareTransactionV3 message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeclareTransactionV3.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a DeclareTransactionV3 message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.DeclareTransactionV3
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.DeclareTransactionV3} DeclareTransactionV3
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeclareTransactionV3.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.DeclareTransactionV3();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.senderAddress = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 3: {
                                message.compiledClassHash = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 4: {
                                if (!(message.accountDeploymentData && message.accountDeploymentData.length))
                                    message.accountDeploymentData = [];
                                message.accountDeploymentData.push($root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32()));
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a DeclareTransactionV3 message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.DeclareTransactionV3
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.DeclareTransactionV3} DeclareTransactionV3
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeclareTransactionV3.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a DeclareTransactionV3 message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.DeclareTransactionV3
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DeclareTransactionV3.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.classHash != null && message.hasOwnProperty("classHash")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.classHash);
                        if (error)
                            return "classHash." + error;
                    }
                    if (message.senderAddress != null && message.hasOwnProperty("senderAddress")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.senderAddress);
                        if (error)
                            return "senderAddress." + error;
                    }
                    if (message.compiledClassHash != null && message.hasOwnProperty("compiledClassHash")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.compiledClassHash);
                        if (error)
                            return "compiledClassHash." + error;
                    }
                    if (message.accountDeploymentData != null && message.hasOwnProperty("accountDeploymentData")) {
                        if (!Array.isArray(message.accountDeploymentData))
                            return "accountDeploymentData: array expected";
                        for (var i = 0; i < message.accountDeploymentData.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.accountDeploymentData[i]);
                            if (error)
                                return "accountDeploymentData." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a DeclareTransactionV3 message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.DeclareTransactionV3
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.DeclareTransactionV3} DeclareTransactionV3
                 */
                DeclareTransactionV3.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.DeclareTransactionV3)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.DeclareTransactionV3();
                    if (object.classHash != null) {
                        if (typeof object.classHash !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.DeclareTransactionV3.classHash: object expected");
                        message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.classHash);
                    }
                    if (object.senderAddress != null) {
                        if (typeof object.senderAddress !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.DeclareTransactionV3.senderAddress: object expected");
                        message.senderAddress = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.senderAddress);
                    }
                    if (object.compiledClassHash != null) {
                        if (typeof object.compiledClassHash !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.DeclareTransactionV3.compiledClassHash: object expected");
                        message.compiledClassHash = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.compiledClassHash);
                    }
                    if (object.accountDeploymentData) {
                        if (!Array.isArray(object.accountDeploymentData))
                            throw TypeError(".apibara.starknet.v1alpha2.DeclareTransactionV3.accountDeploymentData: array expected");
                        message.accountDeploymentData = [];
                        for (var i = 0; i < object.accountDeploymentData.length; ++i) {
                            if (typeof object.accountDeploymentData[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.DeclareTransactionV3.accountDeploymentData: object expected");
                            message.accountDeploymentData[i] = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.accountDeploymentData[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a DeclareTransactionV3 message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.DeclareTransactionV3
                 * @static
                 * @param {apibara.starknet.v1alpha2.DeclareTransactionV3} message DeclareTransactionV3
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DeclareTransactionV3.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.accountDeploymentData = [];
                    if (options.defaults) {
                        object.classHash = null;
                        object.senderAddress = null;
                        object.compiledClassHash = null;
                    }
                    if (message.classHash != null && message.hasOwnProperty("classHash"))
                        object.classHash = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.classHash, options);
                    if (message.senderAddress != null && message.hasOwnProperty("senderAddress"))
                        object.senderAddress = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.senderAddress, options);
                    if (message.compiledClassHash != null && message.hasOwnProperty("compiledClassHash"))
                        object.compiledClassHash = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.compiledClassHash, options);
                    if (message.accountDeploymentData && message.accountDeploymentData.length) {
                        object.accountDeploymentData = [];
                        for (var j = 0; j < message.accountDeploymentData.length; ++j)
                            object.accountDeploymentData[j] = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.accountDeploymentData[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this DeclareTransactionV3 to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.DeclareTransactionV3
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DeclareTransactionV3.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for DeclareTransactionV3
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.DeclareTransactionV3
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                DeclareTransactionV3.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.DeclareTransactionV3";
                };

                return DeclareTransactionV3;
            })();

            v1alpha2.L1HandlerTransaction = (function() {

                /**
                 * Properties of a L1HandlerTransaction.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IL1HandlerTransaction
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [contractAddress] L1HandlerTransaction contractAddress
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [entryPointSelector] L1HandlerTransaction entryPointSelector
                 * @property {Array.<apibara.starknet.v1alpha2.IFieldElement>|null} [calldata] L1HandlerTransaction calldata
                 */

                /**
                 * Constructs a new L1HandlerTransaction.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a L1HandlerTransaction.
                 * @implements IL1HandlerTransaction
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IL1HandlerTransaction=} [properties] Properties to set
                 */
                function L1HandlerTransaction(properties) {
                    this.calldata = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * L1HandlerTransaction contractAddress.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} contractAddress
                 * @memberof apibara.starknet.v1alpha2.L1HandlerTransaction
                 * @instance
                 */
                L1HandlerTransaction.prototype.contractAddress = null;

                /**
                 * L1HandlerTransaction entryPointSelector.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} entryPointSelector
                 * @memberof apibara.starknet.v1alpha2.L1HandlerTransaction
                 * @instance
                 */
                L1HandlerTransaction.prototype.entryPointSelector = null;

                /**
                 * L1HandlerTransaction calldata.
                 * @member {Array.<apibara.starknet.v1alpha2.IFieldElement>} calldata
                 * @memberof apibara.starknet.v1alpha2.L1HandlerTransaction
                 * @instance
                 */
                L1HandlerTransaction.prototype.calldata = $util.emptyArray;

                /**
                 * Creates a new L1HandlerTransaction instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.L1HandlerTransaction
                 * @static
                 * @param {apibara.starknet.v1alpha2.IL1HandlerTransaction=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.L1HandlerTransaction} L1HandlerTransaction instance
                 */
                L1HandlerTransaction.create = function create(properties) {
                    return new L1HandlerTransaction(properties);
                };

                /**
                 * Encodes the specified L1HandlerTransaction message. Does not implicitly {@link apibara.starknet.v1alpha2.L1HandlerTransaction.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.L1HandlerTransaction
                 * @static
                 * @param {apibara.starknet.v1alpha2.IL1HandlerTransaction} message L1HandlerTransaction message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                L1HandlerTransaction.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.contractAddress != null && Object.hasOwnProperty.call(message, "contractAddress"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.contractAddress, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.entryPointSelector != null && Object.hasOwnProperty.call(message, "entryPointSelector"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.entryPointSelector, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.calldata != null && message.calldata.length)
                        for (var i = 0; i < message.calldata.length; ++i)
                            $root.apibara.starknet.v1alpha2.FieldElement.encode(message.calldata[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified L1HandlerTransaction message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.L1HandlerTransaction.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.L1HandlerTransaction
                 * @static
                 * @param {apibara.starknet.v1alpha2.IL1HandlerTransaction} message L1HandlerTransaction message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                L1HandlerTransaction.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a L1HandlerTransaction message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.L1HandlerTransaction
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.L1HandlerTransaction} L1HandlerTransaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                L1HandlerTransaction.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.L1HandlerTransaction();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 2: {
                                message.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 3: {
                                message.entryPointSelector = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 4: {
                                if (!(message.calldata && message.calldata.length))
                                    message.calldata = [];
                                message.calldata.push($root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32()));
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a L1HandlerTransaction message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.L1HandlerTransaction
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.L1HandlerTransaction} L1HandlerTransaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                L1HandlerTransaction.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a L1HandlerTransaction message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.L1HandlerTransaction
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                L1HandlerTransaction.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.contractAddress != null && message.hasOwnProperty("contractAddress")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.contractAddress);
                        if (error)
                            return "contractAddress." + error;
                    }
                    if (message.entryPointSelector != null && message.hasOwnProperty("entryPointSelector")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.entryPointSelector);
                        if (error)
                            return "entryPointSelector." + error;
                    }
                    if (message.calldata != null && message.hasOwnProperty("calldata")) {
                        if (!Array.isArray(message.calldata))
                            return "calldata: array expected";
                        for (var i = 0; i < message.calldata.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.calldata[i]);
                            if (error)
                                return "calldata." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a L1HandlerTransaction message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.L1HandlerTransaction
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.L1HandlerTransaction} L1HandlerTransaction
                 */
                L1HandlerTransaction.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.L1HandlerTransaction)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.L1HandlerTransaction();
                    if (object.contractAddress != null) {
                        if (typeof object.contractAddress !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.L1HandlerTransaction.contractAddress: object expected");
                        message.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.contractAddress);
                    }
                    if (object.entryPointSelector != null) {
                        if (typeof object.entryPointSelector !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.L1HandlerTransaction.entryPointSelector: object expected");
                        message.entryPointSelector = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.entryPointSelector);
                    }
                    if (object.calldata) {
                        if (!Array.isArray(object.calldata))
                            throw TypeError(".apibara.starknet.v1alpha2.L1HandlerTransaction.calldata: array expected");
                        message.calldata = [];
                        for (var i = 0; i < object.calldata.length; ++i) {
                            if (typeof object.calldata[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.L1HandlerTransaction.calldata: object expected");
                            message.calldata[i] = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.calldata[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a L1HandlerTransaction message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.L1HandlerTransaction
                 * @static
                 * @param {apibara.starknet.v1alpha2.L1HandlerTransaction} message L1HandlerTransaction
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                L1HandlerTransaction.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.calldata = [];
                    if (options.defaults) {
                        object.contractAddress = null;
                        object.entryPointSelector = null;
                    }
                    if (message.contractAddress != null && message.hasOwnProperty("contractAddress"))
                        object.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.contractAddress, options);
                    if (message.entryPointSelector != null && message.hasOwnProperty("entryPointSelector"))
                        object.entryPointSelector = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.entryPointSelector, options);
                    if (message.calldata && message.calldata.length) {
                        object.calldata = [];
                        for (var j = 0; j < message.calldata.length; ++j)
                            object.calldata[j] = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.calldata[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this L1HandlerTransaction to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.L1HandlerTransaction
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                L1HandlerTransaction.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for L1HandlerTransaction
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.L1HandlerTransaction
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                L1HandlerTransaction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.L1HandlerTransaction";
                };

                return L1HandlerTransaction;
            })();

            v1alpha2.DeployAccountTransaction = (function() {

                /**
                 * Properties of a DeployAccountTransaction.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IDeployAccountTransaction
                 * @property {Array.<apibara.starknet.v1alpha2.IFieldElement>|null} [constructorCalldata] DeployAccountTransaction constructorCalldata
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [contractAddressSalt] DeployAccountTransaction contractAddressSalt
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [classHash] DeployAccountTransaction classHash
                 */

                /**
                 * Constructs a new DeployAccountTransaction.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a DeployAccountTransaction.
                 * @implements IDeployAccountTransaction
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IDeployAccountTransaction=} [properties] Properties to set
                 */
                function DeployAccountTransaction(properties) {
                    this.constructorCalldata = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DeployAccountTransaction constructorCalldata.
                 * @member {Array.<apibara.starknet.v1alpha2.IFieldElement>} constructorCalldata
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransaction
                 * @instance
                 */
                DeployAccountTransaction.prototype.constructorCalldata = $util.emptyArray;

                /**
                 * DeployAccountTransaction contractAddressSalt.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} contractAddressSalt
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransaction
                 * @instance
                 */
                DeployAccountTransaction.prototype.contractAddressSalt = null;

                /**
                 * DeployAccountTransaction classHash.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} classHash
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransaction
                 * @instance
                 */
                DeployAccountTransaction.prototype.classHash = null;

                /**
                 * Creates a new DeployAccountTransaction instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransaction
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeployAccountTransaction=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.DeployAccountTransaction} DeployAccountTransaction instance
                 */
                DeployAccountTransaction.create = function create(properties) {
                    return new DeployAccountTransaction(properties);
                };

                /**
                 * Encodes the specified DeployAccountTransaction message. Does not implicitly {@link apibara.starknet.v1alpha2.DeployAccountTransaction.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransaction
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeployAccountTransaction} message DeployAccountTransaction message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeployAccountTransaction.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.constructorCalldata != null && message.constructorCalldata.length)
                        for (var i = 0; i < message.constructorCalldata.length; ++i)
                            $root.apibara.starknet.v1alpha2.FieldElement.encode(message.constructorCalldata[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.contractAddressSalt != null && Object.hasOwnProperty.call(message, "contractAddressSalt"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.contractAddressSalt, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.classHash != null && Object.hasOwnProperty.call(message, "classHash"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.classHash, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified DeployAccountTransaction message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.DeployAccountTransaction.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransaction
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeployAccountTransaction} message DeployAccountTransaction message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeployAccountTransaction.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a DeployAccountTransaction message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransaction
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.DeployAccountTransaction} DeployAccountTransaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeployAccountTransaction.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.DeployAccountTransaction();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 2: {
                                if (!(message.constructorCalldata && message.constructorCalldata.length))
                                    message.constructorCalldata = [];
                                message.constructorCalldata.push($root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32()));
                                break;
                            }
                        case 3: {
                                message.contractAddressSalt = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 4: {
                                message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a DeployAccountTransaction message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransaction
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.DeployAccountTransaction} DeployAccountTransaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeployAccountTransaction.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a DeployAccountTransaction message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransaction
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DeployAccountTransaction.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.constructorCalldata != null && message.hasOwnProperty("constructorCalldata")) {
                        if (!Array.isArray(message.constructorCalldata))
                            return "constructorCalldata: array expected";
                        for (var i = 0; i < message.constructorCalldata.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.constructorCalldata[i]);
                            if (error)
                                return "constructorCalldata." + error;
                        }
                    }
                    if (message.contractAddressSalt != null && message.hasOwnProperty("contractAddressSalt")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.contractAddressSalt);
                        if (error)
                            return "contractAddressSalt." + error;
                    }
                    if (message.classHash != null && message.hasOwnProperty("classHash")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.classHash);
                        if (error)
                            return "classHash." + error;
                    }
                    return null;
                };

                /**
                 * Creates a DeployAccountTransaction message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransaction
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.DeployAccountTransaction} DeployAccountTransaction
                 */
                DeployAccountTransaction.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.DeployAccountTransaction)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.DeployAccountTransaction();
                    if (object.constructorCalldata) {
                        if (!Array.isArray(object.constructorCalldata))
                            throw TypeError(".apibara.starknet.v1alpha2.DeployAccountTransaction.constructorCalldata: array expected");
                        message.constructorCalldata = [];
                        for (var i = 0; i < object.constructorCalldata.length; ++i) {
                            if (typeof object.constructorCalldata[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.DeployAccountTransaction.constructorCalldata: object expected");
                            message.constructorCalldata[i] = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.constructorCalldata[i]);
                        }
                    }
                    if (object.contractAddressSalt != null) {
                        if (typeof object.contractAddressSalt !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.DeployAccountTransaction.contractAddressSalt: object expected");
                        message.contractAddressSalt = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.contractAddressSalt);
                    }
                    if (object.classHash != null) {
                        if (typeof object.classHash !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.DeployAccountTransaction.classHash: object expected");
                        message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.classHash);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a DeployAccountTransaction message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransaction
                 * @static
                 * @param {apibara.starknet.v1alpha2.DeployAccountTransaction} message DeployAccountTransaction
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DeployAccountTransaction.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.constructorCalldata = [];
                    if (options.defaults) {
                        object.contractAddressSalt = null;
                        object.classHash = null;
                    }
                    if (message.constructorCalldata && message.constructorCalldata.length) {
                        object.constructorCalldata = [];
                        for (var j = 0; j < message.constructorCalldata.length; ++j)
                            object.constructorCalldata[j] = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.constructorCalldata[j], options);
                    }
                    if (message.contractAddressSalt != null && message.hasOwnProperty("contractAddressSalt"))
                        object.contractAddressSalt = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.contractAddressSalt, options);
                    if (message.classHash != null && message.hasOwnProperty("classHash"))
                        object.classHash = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.classHash, options);
                    return object;
                };

                /**
                 * Converts this DeployAccountTransaction to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransaction
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DeployAccountTransaction.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for DeployAccountTransaction
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransaction
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                DeployAccountTransaction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.DeployAccountTransaction";
                };

                return DeployAccountTransaction;
            })();

            v1alpha2.DeployAccountTransactionV3 = (function() {

                /**
                 * Properties of a DeployAccountTransactionV3.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IDeployAccountTransactionV3
                 * @property {Array.<apibara.starknet.v1alpha2.IFieldElement>|null} [constructorCalldata] DeployAccountTransactionV3 constructorCalldata
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [contractAddressSalt] DeployAccountTransactionV3 contractAddressSalt
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [classHash] DeployAccountTransactionV3 classHash
                 */

                /**
                 * Constructs a new DeployAccountTransactionV3.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a DeployAccountTransactionV3.
                 * @implements IDeployAccountTransactionV3
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IDeployAccountTransactionV3=} [properties] Properties to set
                 */
                function DeployAccountTransactionV3(properties) {
                    this.constructorCalldata = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DeployAccountTransactionV3 constructorCalldata.
                 * @member {Array.<apibara.starknet.v1alpha2.IFieldElement>} constructorCalldata
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransactionV3
                 * @instance
                 */
                DeployAccountTransactionV3.prototype.constructorCalldata = $util.emptyArray;

                /**
                 * DeployAccountTransactionV3 contractAddressSalt.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} contractAddressSalt
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransactionV3
                 * @instance
                 */
                DeployAccountTransactionV3.prototype.contractAddressSalt = null;

                /**
                 * DeployAccountTransactionV3 classHash.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} classHash
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransactionV3
                 * @instance
                 */
                DeployAccountTransactionV3.prototype.classHash = null;

                /**
                 * Creates a new DeployAccountTransactionV3 instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransactionV3
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeployAccountTransactionV3=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.DeployAccountTransactionV3} DeployAccountTransactionV3 instance
                 */
                DeployAccountTransactionV3.create = function create(properties) {
                    return new DeployAccountTransactionV3(properties);
                };

                /**
                 * Encodes the specified DeployAccountTransactionV3 message. Does not implicitly {@link apibara.starknet.v1alpha2.DeployAccountTransactionV3.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransactionV3
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeployAccountTransactionV3} message DeployAccountTransactionV3 message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeployAccountTransactionV3.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.constructorCalldata != null && message.constructorCalldata.length)
                        for (var i = 0; i < message.constructorCalldata.length; ++i)
                            $root.apibara.starknet.v1alpha2.FieldElement.encode(message.constructorCalldata[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.contractAddressSalt != null && Object.hasOwnProperty.call(message, "contractAddressSalt"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.contractAddressSalt, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.classHash != null && Object.hasOwnProperty.call(message, "classHash"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.classHash, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified DeployAccountTransactionV3 message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.DeployAccountTransactionV3.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransactionV3
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeployAccountTransactionV3} message DeployAccountTransactionV3 message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeployAccountTransactionV3.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a DeployAccountTransactionV3 message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransactionV3
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.DeployAccountTransactionV3} DeployAccountTransactionV3
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeployAccountTransactionV3.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.DeployAccountTransactionV3();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                if (!(message.constructorCalldata && message.constructorCalldata.length))
                                    message.constructorCalldata = [];
                                message.constructorCalldata.push($root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32()));
                                break;
                            }
                        case 2: {
                                message.contractAddressSalt = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 3: {
                                message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a DeployAccountTransactionV3 message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransactionV3
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.DeployAccountTransactionV3} DeployAccountTransactionV3
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeployAccountTransactionV3.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a DeployAccountTransactionV3 message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransactionV3
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DeployAccountTransactionV3.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.constructorCalldata != null && message.hasOwnProperty("constructorCalldata")) {
                        if (!Array.isArray(message.constructorCalldata))
                            return "constructorCalldata: array expected";
                        for (var i = 0; i < message.constructorCalldata.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.constructorCalldata[i]);
                            if (error)
                                return "constructorCalldata." + error;
                        }
                    }
                    if (message.contractAddressSalt != null && message.hasOwnProperty("contractAddressSalt")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.contractAddressSalt);
                        if (error)
                            return "contractAddressSalt." + error;
                    }
                    if (message.classHash != null && message.hasOwnProperty("classHash")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.classHash);
                        if (error)
                            return "classHash." + error;
                    }
                    return null;
                };

                /**
                 * Creates a DeployAccountTransactionV3 message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransactionV3
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.DeployAccountTransactionV3} DeployAccountTransactionV3
                 */
                DeployAccountTransactionV3.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.DeployAccountTransactionV3)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.DeployAccountTransactionV3();
                    if (object.constructorCalldata) {
                        if (!Array.isArray(object.constructorCalldata))
                            throw TypeError(".apibara.starknet.v1alpha2.DeployAccountTransactionV3.constructorCalldata: array expected");
                        message.constructorCalldata = [];
                        for (var i = 0; i < object.constructorCalldata.length; ++i) {
                            if (typeof object.constructorCalldata[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.DeployAccountTransactionV3.constructorCalldata: object expected");
                            message.constructorCalldata[i] = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.constructorCalldata[i]);
                        }
                    }
                    if (object.contractAddressSalt != null) {
                        if (typeof object.contractAddressSalt !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.DeployAccountTransactionV3.contractAddressSalt: object expected");
                        message.contractAddressSalt = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.contractAddressSalt);
                    }
                    if (object.classHash != null) {
                        if (typeof object.classHash !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.DeployAccountTransactionV3.classHash: object expected");
                        message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.classHash);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a DeployAccountTransactionV3 message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransactionV3
                 * @static
                 * @param {apibara.starknet.v1alpha2.DeployAccountTransactionV3} message DeployAccountTransactionV3
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DeployAccountTransactionV3.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.constructorCalldata = [];
                    if (options.defaults) {
                        object.contractAddressSalt = null;
                        object.classHash = null;
                    }
                    if (message.constructorCalldata && message.constructorCalldata.length) {
                        object.constructorCalldata = [];
                        for (var j = 0; j < message.constructorCalldata.length; ++j)
                            object.constructorCalldata[j] = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.constructorCalldata[j], options);
                    }
                    if (message.contractAddressSalt != null && message.hasOwnProperty("contractAddressSalt"))
                        object.contractAddressSalt = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.contractAddressSalt, options);
                    if (message.classHash != null && message.hasOwnProperty("classHash"))
                        object.classHash = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.classHash, options);
                    return object;
                };

                /**
                 * Converts this DeployAccountTransactionV3 to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransactionV3
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DeployAccountTransactionV3.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for DeployAccountTransactionV3
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.DeployAccountTransactionV3
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                DeployAccountTransactionV3.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.DeployAccountTransactionV3";
                };

                return DeployAccountTransactionV3;
            })();

            /**
             * ExecutionStatus enum.
             * @name apibara.starknet.v1alpha2.ExecutionStatus
             * @enum {number}
             * @property {number} EXECUTION_STATUS_UNSPECIFIED=0 EXECUTION_STATUS_UNSPECIFIED value
             * @property {number} EXECUTION_STATUS_SUCCEEDED=1 EXECUTION_STATUS_SUCCEEDED value
             * @property {number} EXECUTION_STATUS_REVERTED=2 EXECUTION_STATUS_REVERTED value
             */
            v1alpha2.ExecutionStatus = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "EXECUTION_STATUS_UNSPECIFIED"] = 0;
                values[valuesById[1] = "EXECUTION_STATUS_SUCCEEDED"] = 1;
                values[valuesById[2] = "EXECUTION_STATUS_REVERTED"] = 2;
                return values;
            })();

            v1alpha2.TransactionReceipt = (function() {

                /**
                 * Properties of a TransactionReceipt.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface ITransactionReceipt
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [transactionHash] TransactionReceipt transactionHash
                 * @property {number|Long|null} [transactionIndex] TransactionReceipt transactionIndex
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [actualFee] TransactionReceipt actualFee
                 * @property {Array.<apibara.starknet.v1alpha2.IL2ToL1Message>|null} [l2ToL1Messages] TransactionReceipt l2ToL1Messages
                 * @property {Array.<apibara.starknet.v1alpha2.IEvent>|null} [events] TransactionReceipt events
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [contractAddress] TransactionReceipt contractAddress
                 * @property {apibara.starknet.v1alpha2.ExecutionStatus|null} [executionStatus] TransactionReceipt executionStatus
                 * @property {string|null} [revertReason] TransactionReceipt revertReason
                 * @property {apibara.starknet.v1alpha2.IFeePayment|null} [actualFeePaid] TransactionReceipt actualFeePaid
                 * @property {apibara.starknet.v1alpha2.IExecutionResources|null} [executionResources] TransactionReceipt executionResources
                 */

                /**
                 * Constructs a new TransactionReceipt.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a TransactionReceipt.
                 * @implements ITransactionReceipt
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.ITransactionReceipt=} [properties] Properties to set
                 */
                function TransactionReceipt(properties) {
                    this.l2ToL1Messages = [];
                    this.events = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TransactionReceipt transactionHash.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} transactionHash
                 * @memberof apibara.starknet.v1alpha2.TransactionReceipt
                 * @instance
                 */
                TransactionReceipt.prototype.transactionHash = null;

                /**
                 * TransactionReceipt transactionIndex.
                 * @member {number|Long} transactionIndex
                 * @memberof apibara.starknet.v1alpha2.TransactionReceipt
                 * @instance
                 */
                TransactionReceipt.prototype.transactionIndex = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * TransactionReceipt actualFee.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} actualFee
                 * @memberof apibara.starknet.v1alpha2.TransactionReceipt
                 * @instance
                 */
                TransactionReceipt.prototype.actualFee = null;

                /**
                 * TransactionReceipt l2ToL1Messages.
                 * @member {Array.<apibara.starknet.v1alpha2.IL2ToL1Message>} l2ToL1Messages
                 * @memberof apibara.starknet.v1alpha2.TransactionReceipt
                 * @instance
                 */
                TransactionReceipt.prototype.l2ToL1Messages = $util.emptyArray;

                /**
                 * TransactionReceipt events.
                 * @member {Array.<apibara.starknet.v1alpha2.IEvent>} events
                 * @memberof apibara.starknet.v1alpha2.TransactionReceipt
                 * @instance
                 */
                TransactionReceipt.prototype.events = $util.emptyArray;

                /**
                 * TransactionReceipt contractAddress.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} contractAddress
                 * @memberof apibara.starknet.v1alpha2.TransactionReceipt
                 * @instance
                 */
                TransactionReceipt.prototype.contractAddress = null;

                /**
                 * TransactionReceipt executionStatus.
                 * @member {apibara.starknet.v1alpha2.ExecutionStatus} executionStatus
                 * @memberof apibara.starknet.v1alpha2.TransactionReceipt
                 * @instance
                 */
                TransactionReceipt.prototype.executionStatus = 0;

                /**
                 * TransactionReceipt revertReason.
                 * @member {string} revertReason
                 * @memberof apibara.starknet.v1alpha2.TransactionReceipt
                 * @instance
                 */
                TransactionReceipt.prototype.revertReason = "";

                /**
                 * TransactionReceipt actualFeePaid.
                 * @member {apibara.starknet.v1alpha2.IFeePayment|null|undefined} actualFeePaid
                 * @memberof apibara.starknet.v1alpha2.TransactionReceipt
                 * @instance
                 */
                TransactionReceipt.prototype.actualFeePaid = null;

                /**
                 * TransactionReceipt executionResources.
                 * @member {apibara.starknet.v1alpha2.IExecutionResources|null|undefined} executionResources
                 * @memberof apibara.starknet.v1alpha2.TransactionReceipt
                 * @instance
                 */
                TransactionReceipt.prototype.executionResources = null;

                /**
                 * Creates a new TransactionReceipt instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.TransactionReceipt
                 * @static
                 * @param {apibara.starknet.v1alpha2.ITransactionReceipt=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.TransactionReceipt} TransactionReceipt instance
                 */
                TransactionReceipt.create = function create(properties) {
                    return new TransactionReceipt(properties);
                };

                /**
                 * Encodes the specified TransactionReceipt message. Does not implicitly {@link apibara.starknet.v1alpha2.TransactionReceipt.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.TransactionReceipt
                 * @static
                 * @param {apibara.starknet.v1alpha2.ITransactionReceipt} message TransactionReceipt message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TransactionReceipt.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.transactionHash != null && Object.hasOwnProperty.call(message, "transactionHash"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.transactionHash, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.transactionIndex != null && Object.hasOwnProperty.call(message, "transactionIndex"))
                        writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.transactionIndex);
                    if (message.actualFee != null && Object.hasOwnProperty.call(message, "actualFee"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.actualFee, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.l2ToL1Messages != null && message.l2ToL1Messages.length)
                        for (var i = 0; i < message.l2ToL1Messages.length; ++i)
                            $root.apibara.starknet.v1alpha2.L2ToL1Message.encode(message.l2ToL1Messages[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    if (message.events != null && message.events.length)
                        for (var i = 0; i < message.events.length; ++i)
                            $root.apibara.starknet.v1alpha2.Event.encode(message.events[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                    if (message.contractAddress != null && Object.hasOwnProperty.call(message, "contractAddress"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.contractAddress, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                    if (message.executionStatus != null && Object.hasOwnProperty.call(message, "executionStatus"))
                        writer.uint32(/* id 7, wireType 0 =*/56).int32(message.executionStatus);
                    if (message.revertReason != null && Object.hasOwnProperty.call(message, "revertReason"))
                        writer.uint32(/* id 8, wireType 2 =*/66).string(message.revertReason);
                    if (message.actualFeePaid != null && Object.hasOwnProperty.call(message, "actualFeePaid"))
                        $root.apibara.starknet.v1alpha2.FeePayment.encode(message.actualFeePaid, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
                    if (message.executionResources != null && Object.hasOwnProperty.call(message, "executionResources"))
                        $root.apibara.starknet.v1alpha2.ExecutionResources.encode(message.executionResources, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified TransactionReceipt message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.TransactionReceipt.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.TransactionReceipt
                 * @static
                 * @param {apibara.starknet.v1alpha2.ITransactionReceipt} message TransactionReceipt message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TransactionReceipt.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a TransactionReceipt message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.TransactionReceipt
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.TransactionReceipt} TransactionReceipt
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TransactionReceipt.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.TransactionReceipt();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.transactionHash = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.transactionIndex = reader.uint64();
                                break;
                            }
                        case 3: {
                                message.actualFee = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 4: {
                                if (!(message.l2ToL1Messages && message.l2ToL1Messages.length))
                                    message.l2ToL1Messages = [];
                                message.l2ToL1Messages.push($root.apibara.starknet.v1alpha2.L2ToL1Message.decode(reader, reader.uint32()));
                                break;
                            }
                        case 5: {
                                if (!(message.events && message.events.length))
                                    message.events = [];
                                message.events.push($root.apibara.starknet.v1alpha2.Event.decode(reader, reader.uint32()));
                                break;
                            }
                        case 6: {
                                message.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 7: {
                                message.executionStatus = reader.int32();
                                break;
                            }
                        case 8: {
                                message.revertReason = reader.string();
                                break;
                            }
                        case 9: {
                                message.actualFeePaid = $root.apibara.starknet.v1alpha2.FeePayment.decode(reader, reader.uint32());
                                break;
                            }
                        case 10: {
                                message.executionResources = $root.apibara.starknet.v1alpha2.ExecutionResources.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TransactionReceipt message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.TransactionReceipt
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.TransactionReceipt} TransactionReceipt
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TransactionReceipt.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TransactionReceipt message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.TransactionReceipt
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TransactionReceipt.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.transactionHash != null && message.hasOwnProperty("transactionHash")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.transactionHash);
                        if (error)
                            return "transactionHash." + error;
                    }
                    if (message.transactionIndex != null && message.hasOwnProperty("transactionIndex"))
                        if (!$util.isInteger(message.transactionIndex) && !(message.transactionIndex && $util.isInteger(message.transactionIndex.low) && $util.isInteger(message.transactionIndex.high)))
                            return "transactionIndex: integer|Long expected";
                    if (message.actualFee != null && message.hasOwnProperty("actualFee")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.actualFee);
                        if (error)
                            return "actualFee." + error;
                    }
                    if (message.l2ToL1Messages != null && message.hasOwnProperty("l2ToL1Messages")) {
                        if (!Array.isArray(message.l2ToL1Messages))
                            return "l2ToL1Messages: array expected";
                        for (var i = 0; i < message.l2ToL1Messages.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.L2ToL1Message.verify(message.l2ToL1Messages[i]);
                            if (error)
                                return "l2ToL1Messages." + error;
                        }
                    }
                    if (message.events != null && message.hasOwnProperty("events")) {
                        if (!Array.isArray(message.events))
                            return "events: array expected";
                        for (var i = 0; i < message.events.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.Event.verify(message.events[i]);
                            if (error)
                                return "events." + error;
                        }
                    }
                    if (message.contractAddress != null && message.hasOwnProperty("contractAddress")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.contractAddress);
                        if (error)
                            return "contractAddress." + error;
                    }
                    if (message.executionStatus != null && message.hasOwnProperty("executionStatus"))
                        switch (message.executionStatus) {
                        default:
                            return "executionStatus: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                            break;
                        }
                    if (message.revertReason != null && message.hasOwnProperty("revertReason"))
                        if (!$util.isString(message.revertReason))
                            return "revertReason: string expected";
                    if (message.actualFeePaid != null && message.hasOwnProperty("actualFeePaid")) {
                        var error = $root.apibara.starknet.v1alpha2.FeePayment.verify(message.actualFeePaid);
                        if (error)
                            return "actualFeePaid." + error;
                    }
                    if (message.executionResources != null && message.hasOwnProperty("executionResources")) {
                        var error = $root.apibara.starknet.v1alpha2.ExecutionResources.verify(message.executionResources);
                        if (error)
                            return "executionResources." + error;
                    }
                    return null;
                };

                /**
                 * Creates a TransactionReceipt message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.TransactionReceipt
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.TransactionReceipt} TransactionReceipt
                 */
                TransactionReceipt.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.TransactionReceipt)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.TransactionReceipt();
                    if (object.transactionHash != null) {
                        if (typeof object.transactionHash !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.TransactionReceipt.transactionHash: object expected");
                        message.transactionHash = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.transactionHash);
                    }
                    if (object.transactionIndex != null)
                        if ($util.Long)
                            (message.transactionIndex = $util.Long.fromValue(object.transactionIndex)).unsigned = true;
                        else if (typeof object.transactionIndex === "string")
                            message.transactionIndex = parseInt(object.transactionIndex, 10);
                        else if (typeof object.transactionIndex === "number")
                            message.transactionIndex = object.transactionIndex;
                        else if (typeof object.transactionIndex === "object")
                            message.transactionIndex = new $util.LongBits(object.transactionIndex.low >>> 0, object.transactionIndex.high >>> 0).toNumber(true);
                    if (object.actualFee != null) {
                        if (typeof object.actualFee !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.TransactionReceipt.actualFee: object expected");
                        message.actualFee = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.actualFee);
                    }
                    if (object.l2ToL1Messages) {
                        if (!Array.isArray(object.l2ToL1Messages))
                            throw TypeError(".apibara.starknet.v1alpha2.TransactionReceipt.l2ToL1Messages: array expected");
                        message.l2ToL1Messages = [];
                        for (var i = 0; i < object.l2ToL1Messages.length; ++i) {
                            if (typeof object.l2ToL1Messages[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.TransactionReceipt.l2ToL1Messages: object expected");
                            message.l2ToL1Messages[i] = $root.apibara.starknet.v1alpha2.L2ToL1Message.fromObject(object.l2ToL1Messages[i]);
                        }
                    }
                    if (object.events) {
                        if (!Array.isArray(object.events))
                            throw TypeError(".apibara.starknet.v1alpha2.TransactionReceipt.events: array expected");
                        message.events = [];
                        for (var i = 0; i < object.events.length; ++i) {
                            if (typeof object.events[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.TransactionReceipt.events: object expected");
                            message.events[i] = $root.apibara.starknet.v1alpha2.Event.fromObject(object.events[i]);
                        }
                    }
                    if (object.contractAddress != null) {
                        if (typeof object.contractAddress !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.TransactionReceipt.contractAddress: object expected");
                        message.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.contractAddress);
                    }
                    switch (object.executionStatus) {
                    default:
                        if (typeof object.executionStatus === "number") {
                            message.executionStatus = object.executionStatus;
                            break;
                        }
                        break;
                    case "EXECUTION_STATUS_UNSPECIFIED":
                    case 0:
                        message.executionStatus = 0;
                        break;
                    case "EXECUTION_STATUS_SUCCEEDED":
                    case 1:
                        message.executionStatus = 1;
                        break;
                    case "EXECUTION_STATUS_REVERTED":
                    case 2:
                        message.executionStatus = 2;
                        break;
                    }
                    if (object.revertReason != null)
                        message.revertReason = String(object.revertReason);
                    if (object.actualFeePaid != null) {
                        if (typeof object.actualFeePaid !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.TransactionReceipt.actualFeePaid: object expected");
                        message.actualFeePaid = $root.apibara.starknet.v1alpha2.FeePayment.fromObject(object.actualFeePaid);
                    }
                    if (object.executionResources != null) {
                        if (typeof object.executionResources !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.TransactionReceipt.executionResources: object expected");
                        message.executionResources = $root.apibara.starknet.v1alpha2.ExecutionResources.fromObject(object.executionResources);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a TransactionReceipt message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.TransactionReceipt
                 * @static
                 * @param {apibara.starknet.v1alpha2.TransactionReceipt} message TransactionReceipt
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TransactionReceipt.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults) {
                        object.l2ToL1Messages = [];
                        object.events = [];
                    }
                    if (options.defaults) {
                        object.transactionHash = null;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, true);
                            object.transactionIndex = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.transactionIndex = options.longs === String ? "0" : 0;
                        object.actualFee = null;
                        object.contractAddress = null;
                        object.executionStatus = options.enums === String ? "EXECUTION_STATUS_UNSPECIFIED" : 0;
                        object.revertReason = "";
                        object.actualFeePaid = null;
                        object.executionResources = null;
                    }
                    if (message.transactionHash != null && message.hasOwnProperty("transactionHash"))
                        object.transactionHash = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.transactionHash, options);
                    if (message.transactionIndex != null && message.hasOwnProperty("transactionIndex"))
                        if (typeof message.transactionIndex === "number")
                            object.transactionIndex = options.longs === String ? String(message.transactionIndex) : message.transactionIndex;
                        else
                            object.transactionIndex = options.longs === String ? $util.Long.prototype.toString.call(message.transactionIndex) : options.longs === Number ? new $util.LongBits(message.transactionIndex.low >>> 0, message.transactionIndex.high >>> 0).toNumber(true) : message.transactionIndex;
                    if (message.actualFee != null && message.hasOwnProperty("actualFee"))
                        object.actualFee = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.actualFee, options);
                    if (message.l2ToL1Messages && message.l2ToL1Messages.length) {
                        object.l2ToL1Messages = [];
                        for (var j = 0; j < message.l2ToL1Messages.length; ++j)
                            object.l2ToL1Messages[j] = $root.apibara.starknet.v1alpha2.L2ToL1Message.toObject(message.l2ToL1Messages[j], options);
                    }
                    if (message.events && message.events.length) {
                        object.events = [];
                        for (var j = 0; j < message.events.length; ++j)
                            object.events[j] = $root.apibara.starknet.v1alpha2.Event.toObject(message.events[j], options);
                    }
                    if (message.contractAddress != null && message.hasOwnProperty("contractAddress"))
                        object.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.contractAddress, options);
                    if (message.executionStatus != null && message.hasOwnProperty("executionStatus"))
                        object.executionStatus = options.enums === String ? $root.apibara.starknet.v1alpha2.ExecutionStatus[message.executionStatus] === undefined ? message.executionStatus : $root.apibara.starknet.v1alpha2.ExecutionStatus[message.executionStatus] : message.executionStatus;
                    if (message.revertReason != null && message.hasOwnProperty("revertReason"))
                        object.revertReason = message.revertReason;
                    if (message.actualFeePaid != null && message.hasOwnProperty("actualFeePaid"))
                        object.actualFeePaid = $root.apibara.starknet.v1alpha2.FeePayment.toObject(message.actualFeePaid, options);
                    if (message.executionResources != null && message.hasOwnProperty("executionResources"))
                        object.executionResources = $root.apibara.starknet.v1alpha2.ExecutionResources.toObject(message.executionResources, options);
                    return object;
                };

                /**
                 * Converts this TransactionReceipt to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.TransactionReceipt
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TransactionReceipt.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for TransactionReceipt
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.TransactionReceipt
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                TransactionReceipt.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.TransactionReceipt";
                };

                return TransactionReceipt;
            })();

            v1alpha2.L2ToL1MessageWithTransaction = (function() {

                /**
                 * Properties of a L2ToL1MessageWithTransaction.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IL2ToL1MessageWithTransaction
                 * @property {apibara.starknet.v1alpha2.ITransaction|null} [transaction] L2ToL1MessageWithTransaction transaction
                 * @property {apibara.starknet.v1alpha2.ITransactionReceipt|null} [receipt] L2ToL1MessageWithTransaction receipt
                 * @property {apibara.starknet.v1alpha2.IL2ToL1Message|null} [message] L2ToL1MessageWithTransaction message
                 */

                /**
                 * Constructs a new L2ToL1MessageWithTransaction.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a L2ToL1MessageWithTransaction.
                 * @implements IL2ToL1MessageWithTransaction
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IL2ToL1MessageWithTransaction=} [properties] Properties to set
                 */
                function L2ToL1MessageWithTransaction(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * L2ToL1MessageWithTransaction transaction.
                 * @member {apibara.starknet.v1alpha2.ITransaction|null|undefined} transaction
                 * @memberof apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction
                 * @instance
                 */
                L2ToL1MessageWithTransaction.prototype.transaction = null;

                /**
                 * L2ToL1MessageWithTransaction receipt.
                 * @member {apibara.starknet.v1alpha2.ITransactionReceipt|null|undefined} receipt
                 * @memberof apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction
                 * @instance
                 */
                L2ToL1MessageWithTransaction.prototype.receipt = null;

                /**
                 * L2ToL1MessageWithTransaction message.
                 * @member {apibara.starknet.v1alpha2.IL2ToL1Message|null|undefined} message
                 * @memberof apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction
                 * @instance
                 */
                L2ToL1MessageWithTransaction.prototype.message = null;

                /**
                 * Creates a new L2ToL1MessageWithTransaction instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction
                 * @static
                 * @param {apibara.starknet.v1alpha2.IL2ToL1MessageWithTransaction=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction} L2ToL1MessageWithTransaction instance
                 */
                L2ToL1MessageWithTransaction.create = function create(properties) {
                    return new L2ToL1MessageWithTransaction(properties);
                };

                /**
                 * Encodes the specified L2ToL1MessageWithTransaction message. Does not implicitly {@link apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction
                 * @static
                 * @param {apibara.starknet.v1alpha2.IL2ToL1MessageWithTransaction} message L2ToL1MessageWithTransaction message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                L2ToL1MessageWithTransaction.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.transaction != null && Object.hasOwnProperty.call(message, "transaction"))
                        $root.apibara.starknet.v1alpha2.Transaction.encode(message.transaction, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.receipt != null && Object.hasOwnProperty.call(message, "receipt"))
                        $root.apibara.starknet.v1alpha2.TransactionReceipt.encode(message.receipt, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                        $root.apibara.starknet.v1alpha2.L2ToL1Message.encode(message.message, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified L2ToL1MessageWithTransaction message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction
                 * @static
                 * @param {apibara.starknet.v1alpha2.IL2ToL1MessageWithTransaction} message L2ToL1MessageWithTransaction message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                L2ToL1MessageWithTransaction.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a L2ToL1MessageWithTransaction message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction} L2ToL1MessageWithTransaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                L2ToL1MessageWithTransaction.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.transaction = $root.apibara.starknet.v1alpha2.Transaction.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.receipt = $root.apibara.starknet.v1alpha2.TransactionReceipt.decode(reader, reader.uint32());
                                break;
                            }
                        case 3: {
                                message.message = $root.apibara.starknet.v1alpha2.L2ToL1Message.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a L2ToL1MessageWithTransaction message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction} L2ToL1MessageWithTransaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                L2ToL1MessageWithTransaction.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a L2ToL1MessageWithTransaction message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                L2ToL1MessageWithTransaction.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.transaction != null && message.hasOwnProperty("transaction")) {
                        var error = $root.apibara.starknet.v1alpha2.Transaction.verify(message.transaction);
                        if (error)
                            return "transaction." + error;
                    }
                    if (message.receipt != null && message.hasOwnProperty("receipt")) {
                        var error = $root.apibara.starknet.v1alpha2.TransactionReceipt.verify(message.receipt);
                        if (error)
                            return "receipt." + error;
                    }
                    if (message.message != null && message.hasOwnProperty("message")) {
                        var error = $root.apibara.starknet.v1alpha2.L2ToL1Message.verify(message.message);
                        if (error)
                            return "message." + error;
                    }
                    return null;
                };

                /**
                 * Creates a L2ToL1MessageWithTransaction message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction} L2ToL1MessageWithTransaction
                 */
                L2ToL1MessageWithTransaction.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction();
                    if (object.transaction != null) {
                        if (typeof object.transaction !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction.transaction: object expected");
                        message.transaction = $root.apibara.starknet.v1alpha2.Transaction.fromObject(object.transaction);
                    }
                    if (object.receipt != null) {
                        if (typeof object.receipt !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction.receipt: object expected");
                        message.receipt = $root.apibara.starknet.v1alpha2.TransactionReceipt.fromObject(object.receipt);
                    }
                    if (object.message != null) {
                        if (typeof object.message !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction.message: object expected");
                        message.message = $root.apibara.starknet.v1alpha2.L2ToL1Message.fromObject(object.message);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a L2ToL1MessageWithTransaction message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction
                 * @static
                 * @param {apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction} message L2ToL1MessageWithTransaction
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                L2ToL1MessageWithTransaction.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.transaction = null;
                        object.receipt = null;
                        object.message = null;
                    }
                    if (message.transaction != null && message.hasOwnProperty("transaction"))
                        object.transaction = $root.apibara.starknet.v1alpha2.Transaction.toObject(message.transaction, options);
                    if (message.receipt != null && message.hasOwnProperty("receipt"))
                        object.receipt = $root.apibara.starknet.v1alpha2.TransactionReceipt.toObject(message.receipt, options);
                    if (message.message != null && message.hasOwnProperty("message"))
                        object.message = $root.apibara.starknet.v1alpha2.L2ToL1Message.toObject(message.message, options);
                    return object;
                };

                /**
                 * Converts this L2ToL1MessageWithTransaction to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                L2ToL1MessageWithTransaction.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for L2ToL1MessageWithTransaction
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                L2ToL1MessageWithTransaction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.L2ToL1MessageWithTransaction";
                };

                return L2ToL1MessageWithTransaction;
            })();

            v1alpha2.L2ToL1Message = (function() {

                /**
                 * Properties of a L2ToL1Message.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IL2ToL1Message
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [toAddress] L2ToL1Message toAddress
                 * @property {Array.<apibara.starknet.v1alpha2.IFieldElement>|null} [payload] L2ToL1Message payload
                 * @property {number|Long|null} [index] L2ToL1Message index
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [fromAddress] L2ToL1Message fromAddress
                 */

                /**
                 * Constructs a new L2ToL1Message.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a L2ToL1Message.
                 * @implements IL2ToL1Message
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IL2ToL1Message=} [properties] Properties to set
                 */
                function L2ToL1Message(properties) {
                    this.payload = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * L2ToL1Message toAddress.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} toAddress
                 * @memberof apibara.starknet.v1alpha2.L2ToL1Message
                 * @instance
                 */
                L2ToL1Message.prototype.toAddress = null;

                /**
                 * L2ToL1Message payload.
                 * @member {Array.<apibara.starknet.v1alpha2.IFieldElement>} payload
                 * @memberof apibara.starknet.v1alpha2.L2ToL1Message
                 * @instance
                 */
                L2ToL1Message.prototype.payload = $util.emptyArray;

                /**
                 * L2ToL1Message index.
                 * @member {number|Long} index
                 * @memberof apibara.starknet.v1alpha2.L2ToL1Message
                 * @instance
                 */
                L2ToL1Message.prototype.index = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * L2ToL1Message fromAddress.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} fromAddress
                 * @memberof apibara.starknet.v1alpha2.L2ToL1Message
                 * @instance
                 */
                L2ToL1Message.prototype.fromAddress = null;

                /**
                 * Creates a new L2ToL1Message instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.L2ToL1Message
                 * @static
                 * @param {apibara.starknet.v1alpha2.IL2ToL1Message=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.L2ToL1Message} L2ToL1Message instance
                 */
                L2ToL1Message.create = function create(properties) {
                    return new L2ToL1Message(properties);
                };

                /**
                 * Encodes the specified L2ToL1Message message. Does not implicitly {@link apibara.starknet.v1alpha2.L2ToL1Message.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.L2ToL1Message
                 * @static
                 * @param {apibara.starknet.v1alpha2.IL2ToL1Message} message L2ToL1Message message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                L2ToL1Message.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.toAddress != null && Object.hasOwnProperty.call(message, "toAddress"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.toAddress, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.payload != null && message.payload.length)
                        for (var i = 0; i < message.payload.length; ++i)
                            $root.apibara.starknet.v1alpha2.FieldElement.encode(message.payload[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                        writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.index);
                    if (message.fromAddress != null && Object.hasOwnProperty.call(message, "fromAddress"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.fromAddress, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified L2ToL1Message message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.L2ToL1Message.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.L2ToL1Message
                 * @static
                 * @param {apibara.starknet.v1alpha2.IL2ToL1Message} message L2ToL1Message message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                L2ToL1Message.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a L2ToL1Message message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.L2ToL1Message
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.L2ToL1Message} L2ToL1Message
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                L2ToL1Message.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.L2ToL1Message();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 3: {
                                message.toAddress = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 4: {
                                if (!(message.payload && message.payload.length))
                                    message.payload = [];
                                message.payload.push($root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32()));
                                break;
                            }
                        case 5: {
                                message.index = reader.uint64();
                                break;
                            }
                        case 6: {
                                message.fromAddress = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a L2ToL1Message message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.L2ToL1Message
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.L2ToL1Message} L2ToL1Message
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                L2ToL1Message.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a L2ToL1Message message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.L2ToL1Message
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                L2ToL1Message.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.toAddress != null && message.hasOwnProperty("toAddress")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.toAddress);
                        if (error)
                            return "toAddress." + error;
                    }
                    if (message.payload != null && message.hasOwnProperty("payload")) {
                        if (!Array.isArray(message.payload))
                            return "payload: array expected";
                        for (var i = 0; i < message.payload.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.payload[i]);
                            if (error)
                                return "payload." + error;
                        }
                    }
                    if (message.index != null && message.hasOwnProperty("index"))
                        if (!$util.isInteger(message.index) && !(message.index && $util.isInteger(message.index.low) && $util.isInteger(message.index.high)))
                            return "index: integer|Long expected";
                    if (message.fromAddress != null && message.hasOwnProperty("fromAddress")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.fromAddress);
                        if (error)
                            return "fromAddress." + error;
                    }
                    return null;
                };

                /**
                 * Creates a L2ToL1Message message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.L2ToL1Message
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.L2ToL1Message} L2ToL1Message
                 */
                L2ToL1Message.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.L2ToL1Message)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.L2ToL1Message();
                    if (object.toAddress != null) {
                        if (typeof object.toAddress !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.L2ToL1Message.toAddress: object expected");
                        message.toAddress = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.toAddress);
                    }
                    if (object.payload) {
                        if (!Array.isArray(object.payload))
                            throw TypeError(".apibara.starknet.v1alpha2.L2ToL1Message.payload: array expected");
                        message.payload = [];
                        for (var i = 0; i < object.payload.length; ++i) {
                            if (typeof object.payload[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.L2ToL1Message.payload: object expected");
                            message.payload[i] = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.payload[i]);
                        }
                    }
                    if (object.index != null)
                        if ($util.Long)
                            (message.index = $util.Long.fromValue(object.index)).unsigned = true;
                        else if (typeof object.index === "string")
                            message.index = parseInt(object.index, 10);
                        else if (typeof object.index === "number")
                            message.index = object.index;
                        else if (typeof object.index === "object")
                            message.index = new $util.LongBits(object.index.low >>> 0, object.index.high >>> 0).toNumber(true);
                    if (object.fromAddress != null) {
                        if (typeof object.fromAddress !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.L2ToL1Message.fromAddress: object expected");
                        message.fromAddress = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.fromAddress);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a L2ToL1Message message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.L2ToL1Message
                 * @static
                 * @param {apibara.starknet.v1alpha2.L2ToL1Message} message L2ToL1Message
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                L2ToL1Message.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.payload = [];
                    if (options.defaults) {
                        object.toAddress = null;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, true);
                            object.index = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.index = options.longs === String ? "0" : 0;
                        object.fromAddress = null;
                    }
                    if (message.toAddress != null && message.hasOwnProperty("toAddress"))
                        object.toAddress = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.toAddress, options);
                    if (message.payload && message.payload.length) {
                        object.payload = [];
                        for (var j = 0; j < message.payload.length; ++j)
                            object.payload[j] = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.payload[j], options);
                    }
                    if (message.index != null && message.hasOwnProperty("index"))
                        if (typeof message.index === "number")
                            object.index = options.longs === String ? String(message.index) : message.index;
                        else
                            object.index = options.longs === String ? $util.Long.prototype.toString.call(message.index) : options.longs === Number ? new $util.LongBits(message.index.low >>> 0, message.index.high >>> 0).toNumber(true) : message.index;
                    if (message.fromAddress != null && message.hasOwnProperty("fromAddress"))
                        object.fromAddress = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.fromAddress, options);
                    return object;
                };

                /**
                 * Converts this L2ToL1Message to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.L2ToL1Message
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                L2ToL1Message.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for L2ToL1Message
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.L2ToL1Message
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                L2ToL1Message.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.L2ToL1Message";
                };

                return L2ToL1Message;
            })();

            v1alpha2.EventWithTransaction = (function() {

                /**
                 * Properties of an EventWithTransaction.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IEventWithTransaction
                 * @property {apibara.starknet.v1alpha2.ITransaction|null} [transaction] EventWithTransaction transaction
                 * @property {apibara.starknet.v1alpha2.ITransactionReceipt|null} [receipt] EventWithTransaction receipt
                 * @property {apibara.starknet.v1alpha2.IEvent|null} [event] EventWithTransaction event
                 */

                /**
                 * Constructs a new EventWithTransaction.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents an EventWithTransaction.
                 * @implements IEventWithTransaction
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IEventWithTransaction=} [properties] Properties to set
                 */
                function EventWithTransaction(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * EventWithTransaction transaction.
                 * @member {apibara.starknet.v1alpha2.ITransaction|null|undefined} transaction
                 * @memberof apibara.starknet.v1alpha2.EventWithTransaction
                 * @instance
                 */
                EventWithTransaction.prototype.transaction = null;

                /**
                 * EventWithTransaction receipt.
                 * @member {apibara.starknet.v1alpha2.ITransactionReceipt|null|undefined} receipt
                 * @memberof apibara.starknet.v1alpha2.EventWithTransaction
                 * @instance
                 */
                EventWithTransaction.prototype.receipt = null;

                /**
                 * EventWithTransaction event.
                 * @member {apibara.starknet.v1alpha2.IEvent|null|undefined} event
                 * @memberof apibara.starknet.v1alpha2.EventWithTransaction
                 * @instance
                 */
                EventWithTransaction.prototype.event = null;

                /**
                 * Creates a new EventWithTransaction instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.EventWithTransaction
                 * @static
                 * @param {apibara.starknet.v1alpha2.IEventWithTransaction=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.EventWithTransaction} EventWithTransaction instance
                 */
                EventWithTransaction.create = function create(properties) {
                    return new EventWithTransaction(properties);
                };

                /**
                 * Encodes the specified EventWithTransaction message. Does not implicitly {@link apibara.starknet.v1alpha2.EventWithTransaction.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.EventWithTransaction
                 * @static
                 * @param {apibara.starknet.v1alpha2.IEventWithTransaction} message EventWithTransaction message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                EventWithTransaction.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.transaction != null && Object.hasOwnProperty.call(message, "transaction"))
                        $root.apibara.starknet.v1alpha2.Transaction.encode(message.transaction, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.receipt != null && Object.hasOwnProperty.call(message, "receipt"))
                        $root.apibara.starknet.v1alpha2.TransactionReceipt.encode(message.receipt, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.event != null && Object.hasOwnProperty.call(message, "event"))
                        $root.apibara.starknet.v1alpha2.Event.encode(message.event, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified EventWithTransaction message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.EventWithTransaction.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.EventWithTransaction
                 * @static
                 * @param {apibara.starknet.v1alpha2.IEventWithTransaction} message EventWithTransaction message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                EventWithTransaction.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an EventWithTransaction message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.EventWithTransaction
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.EventWithTransaction} EventWithTransaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                EventWithTransaction.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.EventWithTransaction();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.transaction = $root.apibara.starknet.v1alpha2.Transaction.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.receipt = $root.apibara.starknet.v1alpha2.TransactionReceipt.decode(reader, reader.uint32());
                                break;
                            }
                        case 3: {
                                message.event = $root.apibara.starknet.v1alpha2.Event.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an EventWithTransaction message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.EventWithTransaction
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.EventWithTransaction} EventWithTransaction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                EventWithTransaction.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an EventWithTransaction message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.EventWithTransaction
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                EventWithTransaction.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.transaction != null && message.hasOwnProperty("transaction")) {
                        var error = $root.apibara.starknet.v1alpha2.Transaction.verify(message.transaction);
                        if (error)
                            return "transaction." + error;
                    }
                    if (message.receipt != null && message.hasOwnProperty("receipt")) {
                        var error = $root.apibara.starknet.v1alpha2.TransactionReceipt.verify(message.receipt);
                        if (error)
                            return "receipt." + error;
                    }
                    if (message.event != null && message.hasOwnProperty("event")) {
                        var error = $root.apibara.starknet.v1alpha2.Event.verify(message.event);
                        if (error)
                            return "event." + error;
                    }
                    return null;
                };

                /**
                 * Creates an EventWithTransaction message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.EventWithTransaction
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.EventWithTransaction} EventWithTransaction
                 */
                EventWithTransaction.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.EventWithTransaction)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.EventWithTransaction();
                    if (object.transaction != null) {
                        if (typeof object.transaction !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.EventWithTransaction.transaction: object expected");
                        message.transaction = $root.apibara.starknet.v1alpha2.Transaction.fromObject(object.transaction);
                    }
                    if (object.receipt != null) {
                        if (typeof object.receipt !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.EventWithTransaction.receipt: object expected");
                        message.receipt = $root.apibara.starknet.v1alpha2.TransactionReceipt.fromObject(object.receipt);
                    }
                    if (object.event != null) {
                        if (typeof object.event !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.EventWithTransaction.event: object expected");
                        message.event = $root.apibara.starknet.v1alpha2.Event.fromObject(object.event);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from an EventWithTransaction message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.EventWithTransaction
                 * @static
                 * @param {apibara.starknet.v1alpha2.EventWithTransaction} message EventWithTransaction
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                EventWithTransaction.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.transaction = null;
                        object.receipt = null;
                        object.event = null;
                    }
                    if (message.transaction != null && message.hasOwnProperty("transaction"))
                        object.transaction = $root.apibara.starknet.v1alpha2.Transaction.toObject(message.transaction, options);
                    if (message.receipt != null && message.hasOwnProperty("receipt"))
                        object.receipt = $root.apibara.starknet.v1alpha2.TransactionReceipt.toObject(message.receipt, options);
                    if (message.event != null && message.hasOwnProperty("event"))
                        object.event = $root.apibara.starknet.v1alpha2.Event.toObject(message.event, options);
                    return object;
                };

                /**
                 * Converts this EventWithTransaction to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.EventWithTransaction
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                EventWithTransaction.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for EventWithTransaction
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.EventWithTransaction
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                EventWithTransaction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.EventWithTransaction";
                };

                return EventWithTransaction;
            })();

            v1alpha2.Event = (function() {

                /**
                 * Properties of an Event.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IEvent
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [fromAddress] Event fromAddress
                 * @property {Array.<apibara.starknet.v1alpha2.IFieldElement>|null} [keys] Event keys
                 * @property {Array.<apibara.starknet.v1alpha2.IFieldElement>|null} [data] Event data
                 * @property {number|Long|null} [index] Event index
                 */

                /**
                 * Constructs a new Event.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents an Event.
                 * @implements IEvent
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IEvent=} [properties] Properties to set
                 */
                function Event(properties) {
                    this.keys = [];
                    this.data = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Event fromAddress.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} fromAddress
                 * @memberof apibara.starknet.v1alpha2.Event
                 * @instance
                 */
                Event.prototype.fromAddress = null;

                /**
                 * Event keys.
                 * @member {Array.<apibara.starknet.v1alpha2.IFieldElement>} keys
                 * @memberof apibara.starknet.v1alpha2.Event
                 * @instance
                 */
                Event.prototype.keys = $util.emptyArray;

                /**
                 * Event data.
                 * @member {Array.<apibara.starknet.v1alpha2.IFieldElement>} data
                 * @memberof apibara.starknet.v1alpha2.Event
                 * @instance
                 */
                Event.prototype.data = $util.emptyArray;

                /**
                 * Event index.
                 * @member {number|Long} index
                 * @memberof apibara.starknet.v1alpha2.Event
                 * @instance
                 */
                Event.prototype.index = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * Creates a new Event instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.Event
                 * @static
                 * @param {apibara.starknet.v1alpha2.IEvent=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.Event} Event instance
                 */
                Event.create = function create(properties) {
                    return new Event(properties);
                };

                /**
                 * Encodes the specified Event message. Does not implicitly {@link apibara.starknet.v1alpha2.Event.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.Event
                 * @static
                 * @param {apibara.starknet.v1alpha2.IEvent} message Event message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Event.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.fromAddress != null && Object.hasOwnProperty.call(message, "fromAddress"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.fromAddress, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.keys != null && message.keys.length)
                        for (var i = 0; i < message.keys.length; ++i)
                            $root.apibara.starknet.v1alpha2.FieldElement.encode(message.keys[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.data != null && message.data.length)
                        for (var i = 0; i < message.data.length; ++i)
                            $root.apibara.starknet.v1alpha2.FieldElement.encode(message.data[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                        writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.index);
                    return writer;
                };

                /**
                 * Encodes the specified Event message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.Event.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.Event
                 * @static
                 * @param {apibara.starknet.v1alpha2.IEvent} message Event message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Event.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an Event message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.Event
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.Event} Event
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Event.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.Event();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.fromAddress = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                if (!(message.keys && message.keys.length))
                                    message.keys = [];
                                message.keys.push($root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32()));
                                break;
                            }
                        case 3: {
                                if (!(message.data && message.data.length))
                                    message.data = [];
                                message.data.push($root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32()));
                                break;
                            }
                        case 4: {
                                message.index = reader.uint64();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an Event message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.Event
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.Event} Event
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Event.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an Event message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.Event
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Event.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.fromAddress != null && message.hasOwnProperty("fromAddress")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.fromAddress);
                        if (error)
                            return "fromAddress." + error;
                    }
                    if (message.keys != null && message.hasOwnProperty("keys")) {
                        if (!Array.isArray(message.keys))
                            return "keys: array expected";
                        for (var i = 0; i < message.keys.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.keys[i]);
                            if (error)
                                return "keys." + error;
                        }
                    }
                    if (message.data != null && message.hasOwnProperty("data")) {
                        if (!Array.isArray(message.data))
                            return "data: array expected";
                        for (var i = 0; i < message.data.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.data[i]);
                            if (error)
                                return "data." + error;
                        }
                    }
                    if (message.index != null && message.hasOwnProperty("index"))
                        if (!$util.isInteger(message.index) && !(message.index && $util.isInteger(message.index.low) && $util.isInteger(message.index.high)))
                            return "index: integer|Long expected";
                    return null;
                };

                /**
                 * Creates an Event message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.Event
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.Event} Event
                 */
                Event.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.Event)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.Event();
                    if (object.fromAddress != null) {
                        if (typeof object.fromAddress !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.Event.fromAddress: object expected");
                        message.fromAddress = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.fromAddress);
                    }
                    if (object.keys) {
                        if (!Array.isArray(object.keys))
                            throw TypeError(".apibara.starknet.v1alpha2.Event.keys: array expected");
                        message.keys = [];
                        for (var i = 0; i < object.keys.length; ++i) {
                            if (typeof object.keys[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.Event.keys: object expected");
                            message.keys[i] = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.keys[i]);
                        }
                    }
                    if (object.data) {
                        if (!Array.isArray(object.data))
                            throw TypeError(".apibara.starknet.v1alpha2.Event.data: array expected");
                        message.data = [];
                        for (var i = 0; i < object.data.length; ++i) {
                            if (typeof object.data[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.Event.data: object expected");
                            message.data[i] = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.data[i]);
                        }
                    }
                    if (object.index != null)
                        if ($util.Long)
                            (message.index = $util.Long.fromValue(object.index)).unsigned = true;
                        else if (typeof object.index === "string")
                            message.index = parseInt(object.index, 10);
                        else if (typeof object.index === "number")
                            message.index = object.index;
                        else if (typeof object.index === "object")
                            message.index = new $util.LongBits(object.index.low >>> 0, object.index.high >>> 0).toNumber(true);
                    return message;
                };

                /**
                 * Creates a plain object from an Event message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.Event
                 * @static
                 * @param {apibara.starknet.v1alpha2.Event} message Event
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Event.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults) {
                        object.keys = [];
                        object.data = [];
                    }
                    if (options.defaults) {
                        object.fromAddress = null;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, true);
                            object.index = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.index = options.longs === String ? "0" : 0;
                    }
                    if (message.fromAddress != null && message.hasOwnProperty("fromAddress"))
                        object.fromAddress = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.fromAddress, options);
                    if (message.keys && message.keys.length) {
                        object.keys = [];
                        for (var j = 0; j < message.keys.length; ++j)
                            object.keys[j] = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.keys[j], options);
                    }
                    if (message.data && message.data.length) {
                        object.data = [];
                        for (var j = 0; j < message.data.length; ++j)
                            object.data[j] = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.data[j], options);
                    }
                    if (message.index != null && message.hasOwnProperty("index"))
                        if (typeof message.index === "number")
                            object.index = options.longs === String ? String(message.index) : message.index;
                        else
                            object.index = options.longs === String ? $util.Long.prototype.toString.call(message.index) : options.longs === Number ? new $util.LongBits(message.index.low >>> 0, message.index.high >>> 0).toNumber(true) : message.index;
                    return object;
                };

                /**
                 * Converts this Event to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.Event
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Event.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for Event
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.Event
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                Event.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.Event";
                };

                return Event;
            })();

            v1alpha2.StateUpdate = (function() {

                /**
                 * Properties of a StateUpdate.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IStateUpdate
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [newRoot] StateUpdate newRoot
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [oldRoot] StateUpdate oldRoot
                 * @property {apibara.starknet.v1alpha2.IStateDiff|null} [stateDiff] StateUpdate stateDiff
                 */

                /**
                 * Constructs a new StateUpdate.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a StateUpdate.
                 * @implements IStateUpdate
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IStateUpdate=} [properties] Properties to set
                 */
                function StateUpdate(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * StateUpdate newRoot.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} newRoot
                 * @memberof apibara.starknet.v1alpha2.StateUpdate
                 * @instance
                 */
                StateUpdate.prototype.newRoot = null;

                /**
                 * StateUpdate oldRoot.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} oldRoot
                 * @memberof apibara.starknet.v1alpha2.StateUpdate
                 * @instance
                 */
                StateUpdate.prototype.oldRoot = null;

                /**
                 * StateUpdate stateDiff.
                 * @member {apibara.starknet.v1alpha2.IStateDiff|null|undefined} stateDiff
                 * @memberof apibara.starknet.v1alpha2.StateUpdate
                 * @instance
                 */
                StateUpdate.prototype.stateDiff = null;

                /**
                 * Creates a new StateUpdate instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.StateUpdate
                 * @static
                 * @param {apibara.starknet.v1alpha2.IStateUpdate=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.StateUpdate} StateUpdate instance
                 */
                StateUpdate.create = function create(properties) {
                    return new StateUpdate(properties);
                };

                /**
                 * Encodes the specified StateUpdate message. Does not implicitly {@link apibara.starknet.v1alpha2.StateUpdate.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.StateUpdate
                 * @static
                 * @param {apibara.starknet.v1alpha2.IStateUpdate} message StateUpdate message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                StateUpdate.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.newRoot != null && Object.hasOwnProperty.call(message, "newRoot"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.newRoot, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.oldRoot != null && Object.hasOwnProperty.call(message, "oldRoot"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.oldRoot, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.stateDiff != null && Object.hasOwnProperty.call(message, "stateDiff"))
                        $root.apibara.starknet.v1alpha2.StateDiff.encode(message.stateDiff, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified StateUpdate message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.StateUpdate.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.StateUpdate
                 * @static
                 * @param {apibara.starknet.v1alpha2.IStateUpdate} message StateUpdate message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                StateUpdate.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a StateUpdate message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.StateUpdate
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.StateUpdate} StateUpdate
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                StateUpdate.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.StateUpdate();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.newRoot = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.oldRoot = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 3: {
                                message.stateDiff = $root.apibara.starknet.v1alpha2.StateDiff.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a StateUpdate message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.StateUpdate
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.StateUpdate} StateUpdate
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                StateUpdate.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a StateUpdate message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.StateUpdate
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                StateUpdate.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.newRoot != null && message.hasOwnProperty("newRoot")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.newRoot);
                        if (error)
                            return "newRoot." + error;
                    }
                    if (message.oldRoot != null && message.hasOwnProperty("oldRoot")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.oldRoot);
                        if (error)
                            return "oldRoot." + error;
                    }
                    if (message.stateDiff != null && message.hasOwnProperty("stateDiff")) {
                        var error = $root.apibara.starknet.v1alpha2.StateDiff.verify(message.stateDiff);
                        if (error)
                            return "stateDiff." + error;
                    }
                    return null;
                };

                /**
                 * Creates a StateUpdate message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.StateUpdate
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.StateUpdate} StateUpdate
                 */
                StateUpdate.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.StateUpdate)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.StateUpdate();
                    if (object.newRoot != null) {
                        if (typeof object.newRoot !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.StateUpdate.newRoot: object expected");
                        message.newRoot = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.newRoot);
                    }
                    if (object.oldRoot != null) {
                        if (typeof object.oldRoot !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.StateUpdate.oldRoot: object expected");
                        message.oldRoot = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.oldRoot);
                    }
                    if (object.stateDiff != null) {
                        if (typeof object.stateDiff !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.StateUpdate.stateDiff: object expected");
                        message.stateDiff = $root.apibara.starknet.v1alpha2.StateDiff.fromObject(object.stateDiff);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a StateUpdate message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.StateUpdate
                 * @static
                 * @param {apibara.starknet.v1alpha2.StateUpdate} message StateUpdate
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                StateUpdate.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.newRoot = null;
                        object.oldRoot = null;
                        object.stateDiff = null;
                    }
                    if (message.newRoot != null && message.hasOwnProperty("newRoot"))
                        object.newRoot = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.newRoot, options);
                    if (message.oldRoot != null && message.hasOwnProperty("oldRoot"))
                        object.oldRoot = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.oldRoot, options);
                    if (message.stateDiff != null && message.hasOwnProperty("stateDiff"))
                        object.stateDiff = $root.apibara.starknet.v1alpha2.StateDiff.toObject(message.stateDiff, options);
                    return object;
                };

                /**
                 * Converts this StateUpdate to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.StateUpdate
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                StateUpdate.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for StateUpdate
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.StateUpdate
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                StateUpdate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.StateUpdate";
                };

                return StateUpdate;
            })();

            v1alpha2.StateDiff = (function() {

                /**
                 * Properties of a StateDiff.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IStateDiff
                 * @property {Array.<apibara.starknet.v1alpha2.IStorageDiff>|null} [storageDiffs] StateDiff storageDiffs
                 * @property {Array.<apibara.starknet.v1alpha2.IDeclaredContract>|null} [declaredContracts] StateDiff declaredContracts
                 * @property {Array.<apibara.starknet.v1alpha2.IDeployedContract>|null} [deployedContracts] StateDiff deployedContracts
                 * @property {Array.<apibara.starknet.v1alpha2.INonceUpdate>|null} [nonces] StateDiff nonces
                 * @property {Array.<apibara.starknet.v1alpha2.IDeclaredClass>|null} [declaredClasses] StateDiff declaredClasses
                 * @property {Array.<apibara.starknet.v1alpha2.IReplacedClass>|null} [replacedClasses] StateDiff replacedClasses
                 */

                /**
                 * Constructs a new StateDiff.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a StateDiff.
                 * @implements IStateDiff
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IStateDiff=} [properties] Properties to set
                 */
                function StateDiff(properties) {
                    this.storageDiffs = [];
                    this.declaredContracts = [];
                    this.deployedContracts = [];
                    this.nonces = [];
                    this.declaredClasses = [];
                    this.replacedClasses = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * StateDiff storageDiffs.
                 * @member {Array.<apibara.starknet.v1alpha2.IStorageDiff>} storageDiffs
                 * @memberof apibara.starknet.v1alpha2.StateDiff
                 * @instance
                 */
                StateDiff.prototype.storageDiffs = $util.emptyArray;

                /**
                 * StateDiff declaredContracts.
                 * @member {Array.<apibara.starknet.v1alpha2.IDeclaredContract>} declaredContracts
                 * @memberof apibara.starknet.v1alpha2.StateDiff
                 * @instance
                 */
                StateDiff.prototype.declaredContracts = $util.emptyArray;

                /**
                 * StateDiff deployedContracts.
                 * @member {Array.<apibara.starknet.v1alpha2.IDeployedContract>} deployedContracts
                 * @memberof apibara.starknet.v1alpha2.StateDiff
                 * @instance
                 */
                StateDiff.prototype.deployedContracts = $util.emptyArray;

                /**
                 * StateDiff nonces.
                 * @member {Array.<apibara.starknet.v1alpha2.INonceUpdate>} nonces
                 * @memberof apibara.starknet.v1alpha2.StateDiff
                 * @instance
                 */
                StateDiff.prototype.nonces = $util.emptyArray;

                /**
                 * StateDiff declaredClasses.
                 * @member {Array.<apibara.starknet.v1alpha2.IDeclaredClass>} declaredClasses
                 * @memberof apibara.starknet.v1alpha2.StateDiff
                 * @instance
                 */
                StateDiff.prototype.declaredClasses = $util.emptyArray;

                /**
                 * StateDiff replacedClasses.
                 * @member {Array.<apibara.starknet.v1alpha2.IReplacedClass>} replacedClasses
                 * @memberof apibara.starknet.v1alpha2.StateDiff
                 * @instance
                 */
                StateDiff.prototype.replacedClasses = $util.emptyArray;

                /**
                 * Creates a new StateDiff instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.StateDiff
                 * @static
                 * @param {apibara.starknet.v1alpha2.IStateDiff=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.StateDiff} StateDiff instance
                 */
                StateDiff.create = function create(properties) {
                    return new StateDiff(properties);
                };

                /**
                 * Encodes the specified StateDiff message. Does not implicitly {@link apibara.starknet.v1alpha2.StateDiff.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.StateDiff
                 * @static
                 * @param {apibara.starknet.v1alpha2.IStateDiff} message StateDiff message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                StateDiff.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.storageDiffs != null && message.storageDiffs.length)
                        for (var i = 0; i < message.storageDiffs.length; ++i)
                            $root.apibara.starknet.v1alpha2.StorageDiff.encode(message.storageDiffs[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.declaredContracts != null && message.declaredContracts.length)
                        for (var i = 0; i < message.declaredContracts.length; ++i)
                            $root.apibara.starknet.v1alpha2.DeclaredContract.encode(message.declaredContracts[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.deployedContracts != null && message.deployedContracts.length)
                        for (var i = 0; i < message.deployedContracts.length; ++i)
                            $root.apibara.starknet.v1alpha2.DeployedContract.encode(message.deployedContracts[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.nonces != null && message.nonces.length)
                        for (var i = 0; i < message.nonces.length; ++i)
                            $root.apibara.starknet.v1alpha2.NonceUpdate.encode(message.nonces[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    if (message.declaredClasses != null && message.declaredClasses.length)
                        for (var i = 0; i < message.declaredClasses.length; ++i)
                            $root.apibara.starknet.v1alpha2.DeclaredClass.encode(message.declaredClasses[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                    if (message.replacedClasses != null && message.replacedClasses.length)
                        for (var i = 0; i < message.replacedClasses.length; ++i)
                            $root.apibara.starknet.v1alpha2.ReplacedClass.encode(message.replacedClasses[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified StateDiff message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.StateDiff.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.StateDiff
                 * @static
                 * @param {apibara.starknet.v1alpha2.IStateDiff} message StateDiff message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                StateDiff.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a StateDiff message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.StateDiff
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.StateDiff} StateDiff
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                StateDiff.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.StateDiff();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                if (!(message.storageDiffs && message.storageDiffs.length))
                                    message.storageDiffs = [];
                                message.storageDiffs.push($root.apibara.starknet.v1alpha2.StorageDiff.decode(reader, reader.uint32()));
                                break;
                            }
                        case 2: {
                                if (!(message.declaredContracts && message.declaredContracts.length))
                                    message.declaredContracts = [];
                                message.declaredContracts.push($root.apibara.starknet.v1alpha2.DeclaredContract.decode(reader, reader.uint32()));
                                break;
                            }
                        case 3: {
                                if (!(message.deployedContracts && message.deployedContracts.length))
                                    message.deployedContracts = [];
                                message.deployedContracts.push($root.apibara.starknet.v1alpha2.DeployedContract.decode(reader, reader.uint32()));
                                break;
                            }
                        case 4: {
                                if (!(message.nonces && message.nonces.length))
                                    message.nonces = [];
                                message.nonces.push($root.apibara.starknet.v1alpha2.NonceUpdate.decode(reader, reader.uint32()));
                                break;
                            }
                        case 5: {
                                if (!(message.declaredClasses && message.declaredClasses.length))
                                    message.declaredClasses = [];
                                message.declaredClasses.push($root.apibara.starknet.v1alpha2.DeclaredClass.decode(reader, reader.uint32()));
                                break;
                            }
                        case 6: {
                                if (!(message.replacedClasses && message.replacedClasses.length))
                                    message.replacedClasses = [];
                                message.replacedClasses.push($root.apibara.starknet.v1alpha2.ReplacedClass.decode(reader, reader.uint32()));
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a StateDiff message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.StateDiff
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.StateDiff} StateDiff
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                StateDiff.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a StateDiff message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.StateDiff
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                StateDiff.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.storageDiffs != null && message.hasOwnProperty("storageDiffs")) {
                        if (!Array.isArray(message.storageDiffs))
                            return "storageDiffs: array expected";
                        for (var i = 0; i < message.storageDiffs.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.StorageDiff.verify(message.storageDiffs[i]);
                            if (error)
                                return "storageDiffs." + error;
                        }
                    }
                    if (message.declaredContracts != null && message.hasOwnProperty("declaredContracts")) {
                        if (!Array.isArray(message.declaredContracts))
                            return "declaredContracts: array expected";
                        for (var i = 0; i < message.declaredContracts.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.DeclaredContract.verify(message.declaredContracts[i]);
                            if (error)
                                return "declaredContracts." + error;
                        }
                    }
                    if (message.deployedContracts != null && message.hasOwnProperty("deployedContracts")) {
                        if (!Array.isArray(message.deployedContracts))
                            return "deployedContracts: array expected";
                        for (var i = 0; i < message.deployedContracts.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.DeployedContract.verify(message.deployedContracts[i]);
                            if (error)
                                return "deployedContracts." + error;
                        }
                    }
                    if (message.nonces != null && message.hasOwnProperty("nonces")) {
                        if (!Array.isArray(message.nonces))
                            return "nonces: array expected";
                        for (var i = 0; i < message.nonces.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.NonceUpdate.verify(message.nonces[i]);
                            if (error)
                                return "nonces." + error;
                        }
                    }
                    if (message.declaredClasses != null && message.hasOwnProperty("declaredClasses")) {
                        if (!Array.isArray(message.declaredClasses))
                            return "declaredClasses: array expected";
                        for (var i = 0; i < message.declaredClasses.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.DeclaredClass.verify(message.declaredClasses[i]);
                            if (error)
                                return "declaredClasses." + error;
                        }
                    }
                    if (message.replacedClasses != null && message.hasOwnProperty("replacedClasses")) {
                        if (!Array.isArray(message.replacedClasses))
                            return "replacedClasses: array expected";
                        for (var i = 0; i < message.replacedClasses.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.ReplacedClass.verify(message.replacedClasses[i]);
                            if (error)
                                return "replacedClasses." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a StateDiff message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.StateDiff
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.StateDiff} StateDiff
                 */
                StateDiff.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.StateDiff)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.StateDiff();
                    if (object.storageDiffs) {
                        if (!Array.isArray(object.storageDiffs))
                            throw TypeError(".apibara.starknet.v1alpha2.StateDiff.storageDiffs: array expected");
                        message.storageDiffs = [];
                        for (var i = 0; i < object.storageDiffs.length; ++i) {
                            if (typeof object.storageDiffs[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.StateDiff.storageDiffs: object expected");
                            message.storageDiffs[i] = $root.apibara.starknet.v1alpha2.StorageDiff.fromObject(object.storageDiffs[i]);
                        }
                    }
                    if (object.declaredContracts) {
                        if (!Array.isArray(object.declaredContracts))
                            throw TypeError(".apibara.starknet.v1alpha2.StateDiff.declaredContracts: array expected");
                        message.declaredContracts = [];
                        for (var i = 0; i < object.declaredContracts.length; ++i) {
                            if (typeof object.declaredContracts[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.StateDiff.declaredContracts: object expected");
                            message.declaredContracts[i] = $root.apibara.starknet.v1alpha2.DeclaredContract.fromObject(object.declaredContracts[i]);
                        }
                    }
                    if (object.deployedContracts) {
                        if (!Array.isArray(object.deployedContracts))
                            throw TypeError(".apibara.starknet.v1alpha2.StateDiff.deployedContracts: array expected");
                        message.deployedContracts = [];
                        for (var i = 0; i < object.deployedContracts.length; ++i) {
                            if (typeof object.deployedContracts[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.StateDiff.deployedContracts: object expected");
                            message.deployedContracts[i] = $root.apibara.starknet.v1alpha2.DeployedContract.fromObject(object.deployedContracts[i]);
                        }
                    }
                    if (object.nonces) {
                        if (!Array.isArray(object.nonces))
                            throw TypeError(".apibara.starknet.v1alpha2.StateDiff.nonces: array expected");
                        message.nonces = [];
                        for (var i = 0; i < object.nonces.length; ++i) {
                            if (typeof object.nonces[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.StateDiff.nonces: object expected");
                            message.nonces[i] = $root.apibara.starknet.v1alpha2.NonceUpdate.fromObject(object.nonces[i]);
                        }
                    }
                    if (object.declaredClasses) {
                        if (!Array.isArray(object.declaredClasses))
                            throw TypeError(".apibara.starknet.v1alpha2.StateDiff.declaredClasses: array expected");
                        message.declaredClasses = [];
                        for (var i = 0; i < object.declaredClasses.length; ++i) {
                            if (typeof object.declaredClasses[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.StateDiff.declaredClasses: object expected");
                            message.declaredClasses[i] = $root.apibara.starknet.v1alpha2.DeclaredClass.fromObject(object.declaredClasses[i]);
                        }
                    }
                    if (object.replacedClasses) {
                        if (!Array.isArray(object.replacedClasses))
                            throw TypeError(".apibara.starknet.v1alpha2.StateDiff.replacedClasses: array expected");
                        message.replacedClasses = [];
                        for (var i = 0; i < object.replacedClasses.length; ++i) {
                            if (typeof object.replacedClasses[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.StateDiff.replacedClasses: object expected");
                            message.replacedClasses[i] = $root.apibara.starknet.v1alpha2.ReplacedClass.fromObject(object.replacedClasses[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a StateDiff message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.StateDiff
                 * @static
                 * @param {apibara.starknet.v1alpha2.StateDiff} message StateDiff
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                StateDiff.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults) {
                        object.storageDiffs = [];
                        object.declaredContracts = [];
                        object.deployedContracts = [];
                        object.nonces = [];
                        object.declaredClasses = [];
                        object.replacedClasses = [];
                    }
                    if (message.storageDiffs && message.storageDiffs.length) {
                        object.storageDiffs = [];
                        for (var j = 0; j < message.storageDiffs.length; ++j)
                            object.storageDiffs[j] = $root.apibara.starknet.v1alpha2.StorageDiff.toObject(message.storageDiffs[j], options);
                    }
                    if (message.declaredContracts && message.declaredContracts.length) {
                        object.declaredContracts = [];
                        for (var j = 0; j < message.declaredContracts.length; ++j)
                            object.declaredContracts[j] = $root.apibara.starknet.v1alpha2.DeclaredContract.toObject(message.declaredContracts[j], options);
                    }
                    if (message.deployedContracts && message.deployedContracts.length) {
                        object.deployedContracts = [];
                        for (var j = 0; j < message.deployedContracts.length; ++j)
                            object.deployedContracts[j] = $root.apibara.starknet.v1alpha2.DeployedContract.toObject(message.deployedContracts[j], options);
                    }
                    if (message.nonces && message.nonces.length) {
                        object.nonces = [];
                        for (var j = 0; j < message.nonces.length; ++j)
                            object.nonces[j] = $root.apibara.starknet.v1alpha2.NonceUpdate.toObject(message.nonces[j], options);
                    }
                    if (message.declaredClasses && message.declaredClasses.length) {
                        object.declaredClasses = [];
                        for (var j = 0; j < message.declaredClasses.length; ++j)
                            object.declaredClasses[j] = $root.apibara.starknet.v1alpha2.DeclaredClass.toObject(message.declaredClasses[j], options);
                    }
                    if (message.replacedClasses && message.replacedClasses.length) {
                        object.replacedClasses = [];
                        for (var j = 0; j < message.replacedClasses.length; ++j)
                            object.replacedClasses[j] = $root.apibara.starknet.v1alpha2.ReplacedClass.toObject(message.replacedClasses[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this StateDiff to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.StateDiff
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                StateDiff.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for StateDiff
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.StateDiff
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                StateDiff.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.StateDiff";
                };

                return StateDiff;
            })();

            v1alpha2.StorageDiff = (function() {

                /**
                 * Properties of a StorageDiff.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IStorageDiff
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [contractAddress] StorageDiff contractAddress
                 * @property {Array.<apibara.starknet.v1alpha2.IStorageEntry>|null} [storageEntries] StorageDiff storageEntries
                 */

                /**
                 * Constructs a new StorageDiff.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a StorageDiff.
                 * @implements IStorageDiff
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IStorageDiff=} [properties] Properties to set
                 */
                function StorageDiff(properties) {
                    this.storageEntries = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * StorageDiff contractAddress.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} contractAddress
                 * @memberof apibara.starknet.v1alpha2.StorageDiff
                 * @instance
                 */
                StorageDiff.prototype.contractAddress = null;

                /**
                 * StorageDiff storageEntries.
                 * @member {Array.<apibara.starknet.v1alpha2.IStorageEntry>} storageEntries
                 * @memberof apibara.starknet.v1alpha2.StorageDiff
                 * @instance
                 */
                StorageDiff.prototype.storageEntries = $util.emptyArray;

                /**
                 * Creates a new StorageDiff instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.StorageDiff
                 * @static
                 * @param {apibara.starknet.v1alpha2.IStorageDiff=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.StorageDiff} StorageDiff instance
                 */
                StorageDiff.create = function create(properties) {
                    return new StorageDiff(properties);
                };

                /**
                 * Encodes the specified StorageDiff message. Does not implicitly {@link apibara.starknet.v1alpha2.StorageDiff.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.StorageDiff
                 * @static
                 * @param {apibara.starknet.v1alpha2.IStorageDiff} message StorageDiff message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                StorageDiff.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.contractAddress != null && Object.hasOwnProperty.call(message, "contractAddress"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.contractAddress, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.storageEntries != null && message.storageEntries.length)
                        for (var i = 0; i < message.storageEntries.length; ++i)
                            $root.apibara.starknet.v1alpha2.StorageEntry.encode(message.storageEntries[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified StorageDiff message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.StorageDiff.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.StorageDiff
                 * @static
                 * @param {apibara.starknet.v1alpha2.IStorageDiff} message StorageDiff message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                StorageDiff.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a StorageDiff message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.StorageDiff
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.StorageDiff} StorageDiff
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                StorageDiff.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.StorageDiff();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                if (!(message.storageEntries && message.storageEntries.length))
                                    message.storageEntries = [];
                                message.storageEntries.push($root.apibara.starknet.v1alpha2.StorageEntry.decode(reader, reader.uint32()));
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a StorageDiff message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.StorageDiff
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.StorageDiff} StorageDiff
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                StorageDiff.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a StorageDiff message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.StorageDiff
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                StorageDiff.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.contractAddress != null && message.hasOwnProperty("contractAddress")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.contractAddress);
                        if (error)
                            return "contractAddress." + error;
                    }
                    if (message.storageEntries != null && message.hasOwnProperty("storageEntries")) {
                        if (!Array.isArray(message.storageEntries))
                            return "storageEntries: array expected";
                        for (var i = 0; i < message.storageEntries.length; ++i) {
                            var error = $root.apibara.starknet.v1alpha2.StorageEntry.verify(message.storageEntries[i]);
                            if (error)
                                return "storageEntries." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a StorageDiff message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.StorageDiff
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.StorageDiff} StorageDiff
                 */
                StorageDiff.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.StorageDiff)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.StorageDiff();
                    if (object.contractAddress != null) {
                        if (typeof object.contractAddress !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.StorageDiff.contractAddress: object expected");
                        message.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.contractAddress);
                    }
                    if (object.storageEntries) {
                        if (!Array.isArray(object.storageEntries))
                            throw TypeError(".apibara.starknet.v1alpha2.StorageDiff.storageEntries: array expected");
                        message.storageEntries = [];
                        for (var i = 0; i < object.storageEntries.length; ++i) {
                            if (typeof object.storageEntries[i] !== "object")
                                throw TypeError(".apibara.starknet.v1alpha2.StorageDiff.storageEntries: object expected");
                            message.storageEntries[i] = $root.apibara.starknet.v1alpha2.StorageEntry.fromObject(object.storageEntries[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a StorageDiff message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.StorageDiff
                 * @static
                 * @param {apibara.starknet.v1alpha2.StorageDiff} message StorageDiff
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                StorageDiff.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.storageEntries = [];
                    if (options.defaults)
                        object.contractAddress = null;
                    if (message.contractAddress != null && message.hasOwnProperty("contractAddress"))
                        object.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.contractAddress, options);
                    if (message.storageEntries && message.storageEntries.length) {
                        object.storageEntries = [];
                        for (var j = 0; j < message.storageEntries.length; ++j)
                            object.storageEntries[j] = $root.apibara.starknet.v1alpha2.StorageEntry.toObject(message.storageEntries[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this StorageDiff to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.StorageDiff
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                StorageDiff.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for StorageDiff
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.StorageDiff
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                StorageDiff.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.StorageDiff";
                };

                return StorageDiff;
            })();

            v1alpha2.StorageEntry = (function() {

                /**
                 * Properties of a StorageEntry.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IStorageEntry
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [key] StorageEntry key
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [value] StorageEntry value
                 */

                /**
                 * Constructs a new StorageEntry.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a StorageEntry.
                 * @implements IStorageEntry
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IStorageEntry=} [properties] Properties to set
                 */
                function StorageEntry(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * StorageEntry key.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} key
                 * @memberof apibara.starknet.v1alpha2.StorageEntry
                 * @instance
                 */
                StorageEntry.prototype.key = null;

                /**
                 * StorageEntry value.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} value
                 * @memberof apibara.starknet.v1alpha2.StorageEntry
                 * @instance
                 */
                StorageEntry.prototype.value = null;

                /**
                 * Creates a new StorageEntry instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.StorageEntry
                 * @static
                 * @param {apibara.starknet.v1alpha2.IStorageEntry=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.StorageEntry} StorageEntry instance
                 */
                StorageEntry.create = function create(properties) {
                    return new StorageEntry(properties);
                };

                /**
                 * Encodes the specified StorageEntry message. Does not implicitly {@link apibara.starknet.v1alpha2.StorageEntry.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.StorageEntry
                 * @static
                 * @param {apibara.starknet.v1alpha2.IStorageEntry} message StorageEntry message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                StorageEntry.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.key, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.value, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified StorageEntry message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.StorageEntry.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.StorageEntry
                 * @static
                 * @param {apibara.starknet.v1alpha2.IStorageEntry} message StorageEntry message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                StorageEntry.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a StorageEntry message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.StorageEntry
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.StorageEntry} StorageEntry
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                StorageEntry.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.StorageEntry();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.key = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.value = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a StorageEntry message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.StorageEntry
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.StorageEntry} StorageEntry
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                StorageEntry.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a StorageEntry message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.StorageEntry
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                StorageEntry.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.key != null && message.hasOwnProperty("key")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.key);
                        if (error)
                            return "key." + error;
                    }
                    if (message.value != null && message.hasOwnProperty("value")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.value);
                        if (error)
                            return "value." + error;
                    }
                    return null;
                };

                /**
                 * Creates a StorageEntry message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.StorageEntry
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.StorageEntry} StorageEntry
                 */
                StorageEntry.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.StorageEntry)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.StorageEntry();
                    if (object.key != null) {
                        if (typeof object.key !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.StorageEntry.key: object expected");
                        message.key = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.key);
                    }
                    if (object.value != null) {
                        if (typeof object.value !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.StorageEntry.value: object expected");
                        message.value = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.value);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a StorageEntry message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.StorageEntry
                 * @static
                 * @param {apibara.starknet.v1alpha2.StorageEntry} message StorageEntry
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                StorageEntry.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.key = null;
                        object.value = null;
                    }
                    if (message.key != null && message.hasOwnProperty("key"))
                        object.key = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.key, options);
                    if (message.value != null && message.hasOwnProperty("value"))
                        object.value = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.value, options);
                    return object;
                };

                /**
                 * Converts this StorageEntry to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.StorageEntry
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                StorageEntry.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for StorageEntry
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.StorageEntry
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                StorageEntry.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.StorageEntry";
                };

                return StorageEntry;
            })();

            v1alpha2.DeclaredContract = (function() {

                /**
                 * Properties of a DeclaredContract.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IDeclaredContract
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [classHash] DeclaredContract classHash
                 */

                /**
                 * Constructs a new DeclaredContract.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a DeclaredContract.
                 * @implements IDeclaredContract
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IDeclaredContract=} [properties] Properties to set
                 */
                function DeclaredContract(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DeclaredContract classHash.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} classHash
                 * @memberof apibara.starknet.v1alpha2.DeclaredContract
                 * @instance
                 */
                DeclaredContract.prototype.classHash = null;

                /**
                 * Creates a new DeclaredContract instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.DeclaredContract
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeclaredContract=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.DeclaredContract} DeclaredContract instance
                 */
                DeclaredContract.create = function create(properties) {
                    return new DeclaredContract(properties);
                };

                /**
                 * Encodes the specified DeclaredContract message. Does not implicitly {@link apibara.starknet.v1alpha2.DeclaredContract.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.DeclaredContract
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeclaredContract} message DeclaredContract message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeclaredContract.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.classHash != null && Object.hasOwnProperty.call(message, "classHash"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.classHash, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified DeclaredContract message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.DeclaredContract.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.DeclaredContract
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeclaredContract} message DeclaredContract message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeclaredContract.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a DeclaredContract message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.DeclaredContract
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.DeclaredContract} DeclaredContract
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeclaredContract.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.DeclaredContract();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a DeclaredContract message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.DeclaredContract
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.DeclaredContract} DeclaredContract
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeclaredContract.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a DeclaredContract message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.DeclaredContract
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DeclaredContract.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.classHash != null && message.hasOwnProperty("classHash")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.classHash);
                        if (error)
                            return "classHash." + error;
                    }
                    return null;
                };

                /**
                 * Creates a DeclaredContract message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.DeclaredContract
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.DeclaredContract} DeclaredContract
                 */
                DeclaredContract.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.DeclaredContract)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.DeclaredContract();
                    if (object.classHash != null) {
                        if (typeof object.classHash !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.DeclaredContract.classHash: object expected");
                        message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.classHash);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a DeclaredContract message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.DeclaredContract
                 * @static
                 * @param {apibara.starknet.v1alpha2.DeclaredContract} message DeclaredContract
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DeclaredContract.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.classHash = null;
                    if (message.classHash != null && message.hasOwnProperty("classHash"))
                        object.classHash = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.classHash, options);
                    return object;
                };

                /**
                 * Converts this DeclaredContract to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.DeclaredContract
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DeclaredContract.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for DeclaredContract
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.DeclaredContract
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                DeclaredContract.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.DeclaredContract";
                };

                return DeclaredContract;
            })();

            v1alpha2.DeclaredClass = (function() {

                /**
                 * Properties of a DeclaredClass.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IDeclaredClass
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [classHash] DeclaredClass classHash
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [compiledClassHash] DeclaredClass compiledClassHash
                 */

                /**
                 * Constructs a new DeclaredClass.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a DeclaredClass.
                 * @implements IDeclaredClass
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IDeclaredClass=} [properties] Properties to set
                 */
                function DeclaredClass(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DeclaredClass classHash.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} classHash
                 * @memberof apibara.starknet.v1alpha2.DeclaredClass
                 * @instance
                 */
                DeclaredClass.prototype.classHash = null;

                /**
                 * DeclaredClass compiledClassHash.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} compiledClassHash
                 * @memberof apibara.starknet.v1alpha2.DeclaredClass
                 * @instance
                 */
                DeclaredClass.prototype.compiledClassHash = null;

                /**
                 * Creates a new DeclaredClass instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.DeclaredClass
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeclaredClass=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.DeclaredClass} DeclaredClass instance
                 */
                DeclaredClass.create = function create(properties) {
                    return new DeclaredClass(properties);
                };

                /**
                 * Encodes the specified DeclaredClass message. Does not implicitly {@link apibara.starknet.v1alpha2.DeclaredClass.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.DeclaredClass
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeclaredClass} message DeclaredClass message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeclaredClass.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.classHash != null && Object.hasOwnProperty.call(message, "classHash"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.classHash, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.compiledClassHash != null && Object.hasOwnProperty.call(message, "compiledClassHash"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.compiledClassHash, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified DeclaredClass message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.DeclaredClass.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.DeclaredClass
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeclaredClass} message DeclaredClass message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeclaredClass.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a DeclaredClass message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.DeclaredClass
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.DeclaredClass} DeclaredClass
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeclaredClass.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.DeclaredClass();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.compiledClassHash = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a DeclaredClass message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.DeclaredClass
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.DeclaredClass} DeclaredClass
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeclaredClass.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a DeclaredClass message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.DeclaredClass
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DeclaredClass.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.classHash != null && message.hasOwnProperty("classHash")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.classHash);
                        if (error)
                            return "classHash." + error;
                    }
                    if (message.compiledClassHash != null && message.hasOwnProperty("compiledClassHash")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.compiledClassHash);
                        if (error)
                            return "compiledClassHash." + error;
                    }
                    return null;
                };

                /**
                 * Creates a DeclaredClass message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.DeclaredClass
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.DeclaredClass} DeclaredClass
                 */
                DeclaredClass.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.DeclaredClass)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.DeclaredClass();
                    if (object.classHash != null) {
                        if (typeof object.classHash !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.DeclaredClass.classHash: object expected");
                        message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.classHash);
                    }
                    if (object.compiledClassHash != null) {
                        if (typeof object.compiledClassHash !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.DeclaredClass.compiledClassHash: object expected");
                        message.compiledClassHash = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.compiledClassHash);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a DeclaredClass message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.DeclaredClass
                 * @static
                 * @param {apibara.starknet.v1alpha2.DeclaredClass} message DeclaredClass
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DeclaredClass.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.classHash = null;
                        object.compiledClassHash = null;
                    }
                    if (message.classHash != null && message.hasOwnProperty("classHash"))
                        object.classHash = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.classHash, options);
                    if (message.compiledClassHash != null && message.hasOwnProperty("compiledClassHash"))
                        object.compiledClassHash = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.compiledClassHash, options);
                    return object;
                };

                /**
                 * Converts this DeclaredClass to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.DeclaredClass
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DeclaredClass.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for DeclaredClass
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.DeclaredClass
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                DeclaredClass.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.DeclaredClass";
                };

                return DeclaredClass;
            })();

            v1alpha2.ReplacedClass = (function() {

                /**
                 * Properties of a ReplacedClass.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IReplacedClass
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [contractAddress] ReplacedClass contractAddress
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [classHash] ReplacedClass classHash
                 */

                /**
                 * Constructs a new ReplacedClass.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a ReplacedClass.
                 * @implements IReplacedClass
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IReplacedClass=} [properties] Properties to set
                 */
                function ReplacedClass(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ReplacedClass contractAddress.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} contractAddress
                 * @memberof apibara.starknet.v1alpha2.ReplacedClass
                 * @instance
                 */
                ReplacedClass.prototype.contractAddress = null;

                /**
                 * ReplacedClass classHash.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} classHash
                 * @memberof apibara.starknet.v1alpha2.ReplacedClass
                 * @instance
                 */
                ReplacedClass.prototype.classHash = null;

                /**
                 * Creates a new ReplacedClass instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.ReplacedClass
                 * @static
                 * @param {apibara.starknet.v1alpha2.IReplacedClass=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.ReplacedClass} ReplacedClass instance
                 */
                ReplacedClass.create = function create(properties) {
                    return new ReplacedClass(properties);
                };

                /**
                 * Encodes the specified ReplacedClass message. Does not implicitly {@link apibara.starknet.v1alpha2.ReplacedClass.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.ReplacedClass
                 * @static
                 * @param {apibara.starknet.v1alpha2.IReplacedClass} message ReplacedClass message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ReplacedClass.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.contractAddress != null && Object.hasOwnProperty.call(message, "contractAddress"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.contractAddress, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.classHash != null && Object.hasOwnProperty.call(message, "classHash"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.classHash, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified ReplacedClass message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.ReplacedClass.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.ReplacedClass
                 * @static
                 * @param {apibara.starknet.v1alpha2.IReplacedClass} message ReplacedClass message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ReplacedClass.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ReplacedClass message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.ReplacedClass
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.ReplacedClass} ReplacedClass
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ReplacedClass.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.ReplacedClass();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ReplacedClass message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.ReplacedClass
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.ReplacedClass} ReplacedClass
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ReplacedClass.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ReplacedClass message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.ReplacedClass
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ReplacedClass.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.contractAddress != null && message.hasOwnProperty("contractAddress")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.contractAddress);
                        if (error)
                            return "contractAddress." + error;
                    }
                    if (message.classHash != null && message.hasOwnProperty("classHash")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.classHash);
                        if (error)
                            return "classHash." + error;
                    }
                    return null;
                };

                /**
                 * Creates a ReplacedClass message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.ReplacedClass
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.ReplacedClass} ReplacedClass
                 */
                ReplacedClass.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.ReplacedClass)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.ReplacedClass();
                    if (object.contractAddress != null) {
                        if (typeof object.contractAddress !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.ReplacedClass.contractAddress: object expected");
                        message.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.contractAddress);
                    }
                    if (object.classHash != null) {
                        if (typeof object.classHash !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.ReplacedClass.classHash: object expected");
                        message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.classHash);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a ReplacedClass message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.ReplacedClass
                 * @static
                 * @param {apibara.starknet.v1alpha2.ReplacedClass} message ReplacedClass
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ReplacedClass.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.contractAddress = null;
                        object.classHash = null;
                    }
                    if (message.contractAddress != null && message.hasOwnProperty("contractAddress"))
                        object.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.contractAddress, options);
                    if (message.classHash != null && message.hasOwnProperty("classHash"))
                        object.classHash = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.classHash, options);
                    return object;
                };

                /**
                 * Converts this ReplacedClass to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.ReplacedClass
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ReplacedClass.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ReplacedClass
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.ReplacedClass
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ReplacedClass.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.ReplacedClass";
                };

                return ReplacedClass;
            })();

            v1alpha2.DeployedContract = (function() {

                /**
                 * Properties of a DeployedContract.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IDeployedContract
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [contractAddress] DeployedContract contractAddress
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [classHash] DeployedContract classHash
                 */

                /**
                 * Constructs a new DeployedContract.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a DeployedContract.
                 * @implements IDeployedContract
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IDeployedContract=} [properties] Properties to set
                 */
                function DeployedContract(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DeployedContract contractAddress.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} contractAddress
                 * @memberof apibara.starknet.v1alpha2.DeployedContract
                 * @instance
                 */
                DeployedContract.prototype.contractAddress = null;

                /**
                 * DeployedContract classHash.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} classHash
                 * @memberof apibara.starknet.v1alpha2.DeployedContract
                 * @instance
                 */
                DeployedContract.prototype.classHash = null;

                /**
                 * Creates a new DeployedContract instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.DeployedContract
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeployedContract=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.DeployedContract} DeployedContract instance
                 */
                DeployedContract.create = function create(properties) {
                    return new DeployedContract(properties);
                };

                /**
                 * Encodes the specified DeployedContract message. Does not implicitly {@link apibara.starknet.v1alpha2.DeployedContract.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.DeployedContract
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeployedContract} message DeployedContract message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeployedContract.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.contractAddress != null && Object.hasOwnProperty.call(message, "contractAddress"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.contractAddress, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.classHash != null && Object.hasOwnProperty.call(message, "classHash"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.classHash, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified DeployedContract message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.DeployedContract.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.DeployedContract
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDeployedContract} message DeployedContract message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeployedContract.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a DeployedContract message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.DeployedContract
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.DeployedContract} DeployedContract
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeployedContract.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.DeployedContract();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a DeployedContract message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.DeployedContract
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.DeployedContract} DeployedContract
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeployedContract.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a DeployedContract message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.DeployedContract
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DeployedContract.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.contractAddress != null && message.hasOwnProperty("contractAddress")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.contractAddress);
                        if (error)
                            return "contractAddress." + error;
                    }
                    if (message.classHash != null && message.hasOwnProperty("classHash")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.classHash);
                        if (error)
                            return "classHash." + error;
                    }
                    return null;
                };

                /**
                 * Creates a DeployedContract message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.DeployedContract
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.DeployedContract} DeployedContract
                 */
                DeployedContract.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.DeployedContract)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.DeployedContract();
                    if (object.contractAddress != null) {
                        if (typeof object.contractAddress !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.DeployedContract.contractAddress: object expected");
                        message.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.contractAddress);
                    }
                    if (object.classHash != null) {
                        if (typeof object.classHash !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.DeployedContract.classHash: object expected");
                        message.classHash = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.classHash);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a DeployedContract message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.DeployedContract
                 * @static
                 * @param {apibara.starknet.v1alpha2.DeployedContract} message DeployedContract
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DeployedContract.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.contractAddress = null;
                        object.classHash = null;
                    }
                    if (message.contractAddress != null && message.hasOwnProperty("contractAddress"))
                        object.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.contractAddress, options);
                    if (message.classHash != null && message.hasOwnProperty("classHash"))
                        object.classHash = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.classHash, options);
                    return object;
                };

                /**
                 * Converts this DeployedContract to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.DeployedContract
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DeployedContract.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for DeployedContract
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.DeployedContract
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                DeployedContract.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.DeployedContract";
                };

                return DeployedContract;
            })();

            v1alpha2.NonceUpdate = (function() {

                /**
                 * Properties of a NonceUpdate.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface INonceUpdate
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [contractAddress] NonceUpdate contractAddress
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [nonce] NonceUpdate nonce
                 */

                /**
                 * Constructs a new NonceUpdate.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a NonceUpdate.
                 * @implements INonceUpdate
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.INonceUpdate=} [properties] Properties to set
                 */
                function NonceUpdate(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * NonceUpdate contractAddress.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} contractAddress
                 * @memberof apibara.starknet.v1alpha2.NonceUpdate
                 * @instance
                 */
                NonceUpdate.prototype.contractAddress = null;

                /**
                 * NonceUpdate nonce.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} nonce
                 * @memberof apibara.starknet.v1alpha2.NonceUpdate
                 * @instance
                 */
                NonceUpdate.prototype.nonce = null;

                /**
                 * Creates a new NonceUpdate instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.NonceUpdate
                 * @static
                 * @param {apibara.starknet.v1alpha2.INonceUpdate=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.NonceUpdate} NonceUpdate instance
                 */
                NonceUpdate.create = function create(properties) {
                    return new NonceUpdate(properties);
                };

                /**
                 * Encodes the specified NonceUpdate message. Does not implicitly {@link apibara.starknet.v1alpha2.NonceUpdate.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.NonceUpdate
                 * @static
                 * @param {apibara.starknet.v1alpha2.INonceUpdate} message NonceUpdate message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                NonceUpdate.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.contractAddress != null && Object.hasOwnProperty.call(message, "contractAddress"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.contractAddress, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.nonce != null && Object.hasOwnProperty.call(message, "nonce"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.nonce, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified NonceUpdate message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.NonceUpdate.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.NonceUpdate
                 * @static
                 * @param {apibara.starknet.v1alpha2.INonceUpdate} message NonceUpdate message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                NonceUpdate.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a NonceUpdate message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.NonceUpdate
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.NonceUpdate} NonceUpdate
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                NonceUpdate.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.NonceUpdate();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.nonce = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a NonceUpdate message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.NonceUpdate
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.NonceUpdate} NonceUpdate
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                NonceUpdate.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a NonceUpdate message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.NonceUpdate
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                NonceUpdate.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.contractAddress != null && message.hasOwnProperty("contractAddress")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.contractAddress);
                        if (error)
                            return "contractAddress." + error;
                    }
                    if (message.nonce != null && message.hasOwnProperty("nonce")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.nonce);
                        if (error)
                            return "nonce." + error;
                    }
                    return null;
                };

                /**
                 * Creates a NonceUpdate message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.NonceUpdate
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.NonceUpdate} NonceUpdate
                 */
                NonceUpdate.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.NonceUpdate)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.NonceUpdate();
                    if (object.contractAddress != null) {
                        if (typeof object.contractAddress !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.NonceUpdate.contractAddress: object expected");
                        message.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.contractAddress);
                    }
                    if (object.nonce != null) {
                        if (typeof object.nonce !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.NonceUpdate.nonce: object expected");
                        message.nonce = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.nonce);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a NonceUpdate message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.NonceUpdate
                 * @static
                 * @param {apibara.starknet.v1alpha2.NonceUpdate} message NonceUpdate
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                NonceUpdate.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.contractAddress = null;
                        object.nonce = null;
                    }
                    if (message.contractAddress != null && message.hasOwnProperty("contractAddress"))
                        object.contractAddress = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.contractAddress, options);
                    if (message.nonce != null && message.hasOwnProperty("nonce"))
                        object.nonce = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.nonce, options);
                    return object;
                };

                /**
                 * Converts this NonceUpdate to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.NonceUpdate
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                NonceUpdate.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for NonceUpdate
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.NonceUpdate
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                NonceUpdate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.NonceUpdate";
                };

                return NonceUpdate;
            })();

            v1alpha2.ResourcePrice = (function() {

                /**
                 * Properties of a ResourcePrice.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IResourcePrice
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [priceInFri] ResourcePrice priceInFri
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [priceInWei] ResourcePrice priceInWei
                 */

                /**
                 * Constructs a new ResourcePrice.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a ResourcePrice.
                 * @implements IResourcePrice
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IResourcePrice=} [properties] Properties to set
                 */
                function ResourcePrice(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ResourcePrice priceInFri.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} priceInFri
                 * @memberof apibara.starknet.v1alpha2.ResourcePrice
                 * @instance
                 */
                ResourcePrice.prototype.priceInFri = null;

                /**
                 * ResourcePrice priceInWei.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} priceInWei
                 * @memberof apibara.starknet.v1alpha2.ResourcePrice
                 * @instance
                 */
                ResourcePrice.prototype.priceInWei = null;

                /**
                 * Creates a new ResourcePrice instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.ResourcePrice
                 * @static
                 * @param {apibara.starknet.v1alpha2.IResourcePrice=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.ResourcePrice} ResourcePrice instance
                 */
                ResourcePrice.create = function create(properties) {
                    return new ResourcePrice(properties);
                };

                /**
                 * Encodes the specified ResourcePrice message. Does not implicitly {@link apibara.starknet.v1alpha2.ResourcePrice.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.ResourcePrice
                 * @static
                 * @param {apibara.starknet.v1alpha2.IResourcePrice} message ResourcePrice message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ResourcePrice.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.priceInFri != null && Object.hasOwnProperty.call(message, "priceInFri"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.priceInFri, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.priceInWei != null && Object.hasOwnProperty.call(message, "priceInWei"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.priceInWei, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified ResourcePrice message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.ResourcePrice.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.ResourcePrice
                 * @static
                 * @param {apibara.starknet.v1alpha2.IResourcePrice} message ResourcePrice message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ResourcePrice.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ResourcePrice message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.ResourcePrice
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.ResourcePrice} ResourcePrice
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ResourcePrice.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.ResourcePrice();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.priceInFri = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.priceInWei = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ResourcePrice message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.ResourcePrice
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.ResourcePrice} ResourcePrice
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ResourcePrice.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ResourcePrice message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.ResourcePrice
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ResourcePrice.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.priceInFri != null && message.hasOwnProperty("priceInFri")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.priceInFri);
                        if (error)
                            return "priceInFri." + error;
                    }
                    if (message.priceInWei != null && message.hasOwnProperty("priceInWei")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.priceInWei);
                        if (error)
                            return "priceInWei." + error;
                    }
                    return null;
                };

                /**
                 * Creates a ResourcePrice message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.ResourcePrice
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.ResourcePrice} ResourcePrice
                 */
                ResourcePrice.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.ResourcePrice)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.ResourcePrice();
                    if (object.priceInFri != null) {
                        if (typeof object.priceInFri !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.ResourcePrice.priceInFri: object expected");
                        message.priceInFri = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.priceInFri);
                    }
                    if (object.priceInWei != null) {
                        if (typeof object.priceInWei !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.ResourcePrice.priceInWei: object expected");
                        message.priceInWei = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.priceInWei);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a ResourcePrice message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.ResourcePrice
                 * @static
                 * @param {apibara.starknet.v1alpha2.ResourcePrice} message ResourcePrice
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ResourcePrice.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.priceInFri = null;
                        object.priceInWei = null;
                    }
                    if (message.priceInFri != null && message.hasOwnProperty("priceInFri"))
                        object.priceInFri = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.priceInFri, options);
                    if (message.priceInWei != null && message.hasOwnProperty("priceInWei"))
                        object.priceInWei = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.priceInWei, options);
                    return object;
                };

                /**
                 * Converts this ResourcePrice to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.ResourcePrice
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ResourcePrice.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ResourcePrice
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.ResourcePrice
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ResourcePrice.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.ResourcePrice";
                };

                return ResourcePrice;
            })();

            v1alpha2.FeePayment = (function() {

                /**
                 * Properties of a FeePayment.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IFeePayment
                 * @property {apibara.starknet.v1alpha2.IFieldElement|null} [amount] FeePayment amount
                 * @property {apibara.starknet.v1alpha2.PriceUnit|null} [unit] FeePayment unit
                 */

                /**
                 * Constructs a new FeePayment.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a FeePayment.
                 * @implements IFeePayment
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IFeePayment=} [properties] Properties to set
                 */
                function FeePayment(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * FeePayment amount.
                 * @member {apibara.starknet.v1alpha2.IFieldElement|null|undefined} amount
                 * @memberof apibara.starknet.v1alpha2.FeePayment
                 * @instance
                 */
                FeePayment.prototype.amount = null;

                /**
                 * FeePayment unit.
                 * @member {apibara.starknet.v1alpha2.PriceUnit} unit
                 * @memberof apibara.starknet.v1alpha2.FeePayment
                 * @instance
                 */
                FeePayment.prototype.unit = 0;

                /**
                 * Creates a new FeePayment instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.FeePayment
                 * @static
                 * @param {apibara.starknet.v1alpha2.IFeePayment=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.FeePayment} FeePayment instance
                 */
                FeePayment.create = function create(properties) {
                    return new FeePayment(properties);
                };

                /**
                 * Encodes the specified FeePayment message. Does not implicitly {@link apibara.starknet.v1alpha2.FeePayment.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.FeePayment
                 * @static
                 * @param {apibara.starknet.v1alpha2.IFeePayment} message FeePayment message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                FeePayment.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                        $root.apibara.starknet.v1alpha2.FieldElement.encode(message.amount, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.unit != null && Object.hasOwnProperty.call(message, "unit"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.unit);
                    return writer;
                };

                /**
                 * Encodes the specified FeePayment message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.FeePayment.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.FeePayment
                 * @static
                 * @param {apibara.starknet.v1alpha2.IFeePayment} message FeePayment message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                FeePayment.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a FeePayment message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.FeePayment
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.FeePayment} FeePayment
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                FeePayment.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.FeePayment();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.amount = $root.apibara.starknet.v1alpha2.FieldElement.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.unit = reader.int32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a FeePayment message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.FeePayment
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.FeePayment} FeePayment
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                FeePayment.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a FeePayment message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.FeePayment
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                FeePayment.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.amount != null && message.hasOwnProperty("amount")) {
                        var error = $root.apibara.starknet.v1alpha2.FieldElement.verify(message.amount);
                        if (error)
                            return "amount." + error;
                    }
                    if (message.unit != null && message.hasOwnProperty("unit"))
                        switch (message.unit) {
                        default:
                            return "unit: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                            break;
                        }
                    return null;
                };

                /**
                 * Creates a FeePayment message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.FeePayment
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.FeePayment} FeePayment
                 */
                FeePayment.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.FeePayment)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.FeePayment();
                    if (object.amount != null) {
                        if (typeof object.amount !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.FeePayment.amount: object expected");
                        message.amount = $root.apibara.starknet.v1alpha2.FieldElement.fromObject(object.amount);
                    }
                    switch (object.unit) {
                    default:
                        if (typeof object.unit === "number") {
                            message.unit = object.unit;
                            break;
                        }
                        break;
                    case "PRICE_UNIT_UNSPECIFIED":
                    case 0:
                        message.unit = 0;
                        break;
                    case "PRICE_UNIT_WEI":
                    case 1:
                        message.unit = 1;
                        break;
                    case "PRICE_UNIT_FRI":
                    case 2:
                        message.unit = 2;
                        break;
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a FeePayment message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.FeePayment
                 * @static
                 * @param {apibara.starknet.v1alpha2.FeePayment} message FeePayment
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                FeePayment.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.amount = null;
                        object.unit = options.enums === String ? "PRICE_UNIT_UNSPECIFIED" : 0;
                    }
                    if (message.amount != null && message.hasOwnProperty("amount"))
                        object.amount = $root.apibara.starknet.v1alpha2.FieldElement.toObject(message.amount, options);
                    if (message.unit != null && message.hasOwnProperty("unit"))
                        object.unit = options.enums === String ? $root.apibara.starknet.v1alpha2.PriceUnit[message.unit] === undefined ? message.unit : $root.apibara.starknet.v1alpha2.PriceUnit[message.unit] : message.unit;
                    return object;
                };

                /**
                 * Converts this FeePayment to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.FeePayment
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                FeePayment.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for FeePayment
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.FeePayment
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                FeePayment.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.FeePayment";
                };

                return FeePayment;
            })();

            /**
             * PriceUnit enum.
             * @name apibara.starknet.v1alpha2.PriceUnit
             * @enum {number}
             * @property {number} PRICE_UNIT_UNSPECIFIED=0 PRICE_UNIT_UNSPECIFIED value
             * @property {number} PRICE_UNIT_WEI=1 PRICE_UNIT_WEI value
             * @property {number} PRICE_UNIT_FRI=2 PRICE_UNIT_FRI value
             */
            v1alpha2.PriceUnit = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "PRICE_UNIT_UNSPECIFIED"] = 0;
                values[valuesById[1] = "PRICE_UNIT_WEI"] = 1;
                values[valuesById[2] = "PRICE_UNIT_FRI"] = 2;
                return values;
            })();

            v1alpha2.ExecutionResources = (function() {

                /**
                 * Properties of an ExecutionResources.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IExecutionResources
                 * @property {apibara.starknet.v1alpha2.IComputationResources|null} [computation] ExecutionResources computation
                 * @property {apibara.starknet.v1alpha2.IDataAvailabilityResources|null} [dataAvailability] ExecutionResources dataAvailability
                 */

                /**
                 * Constructs a new ExecutionResources.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents an ExecutionResources.
                 * @implements IExecutionResources
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IExecutionResources=} [properties] Properties to set
                 */
                function ExecutionResources(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ExecutionResources computation.
                 * @member {apibara.starknet.v1alpha2.IComputationResources|null|undefined} computation
                 * @memberof apibara.starknet.v1alpha2.ExecutionResources
                 * @instance
                 */
                ExecutionResources.prototype.computation = null;

                /**
                 * ExecutionResources dataAvailability.
                 * @member {apibara.starknet.v1alpha2.IDataAvailabilityResources|null|undefined} dataAvailability
                 * @memberof apibara.starknet.v1alpha2.ExecutionResources
                 * @instance
                 */
                ExecutionResources.prototype.dataAvailability = null;

                /**
                 * Creates a new ExecutionResources instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.ExecutionResources
                 * @static
                 * @param {apibara.starknet.v1alpha2.IExecutionResources=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.ExecutionResources} ExecutionResources instance
                 */
                ExecutionResources.create = function create(properties) {
                    return new ExecutionResources(properties);
                };

                /**
                 * Encodes the specified ExecutionResources message. Does not implicitly {@link apibara.starknet.v1alpha2.ExecutionResources.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.ExecutionResources
                 * @static
                 * @param {apibara.starknet.v1alpha2.IExecutionResources} message ExecutionResources message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ExecutionResources.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.computation != null && Object.hasOwnProperty.call(message, "computation"))
                        $root.apibara.starknet.v1alpha2.ComputationResources.encode(message.computation, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.dataAvailability != null && Object.hasOwnProperty.call(message, "dataAvailability"))
                        $root.apibara.starknet.v1alpha2.DataAvailabilityResources.encode(message.dataAvailability, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified ExecutionResources message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.ExecutionResources.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.ExecutionResources
                 * @static
                 * @param {apibara.starknet.v1alpha2.IExecutionResources} message ExecutionResources message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ExecutionResources.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an ExecutionResources message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.ExecutionResources
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.ExecutionResources} ExecutionResources
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ExecutionResources.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.ExecutionResources();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.computation = $root.apibara.starknet.v1alpha2.ComputationResources.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.dataAvailability = $root.apibara.starknet.v1alpha2.DataAvailabilityResources.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an ExecutionResources message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.ExecutionResources
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.ExecutionResources} ExecutionResources
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ExecutionResources.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an ExecutionResources message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.ExecutionResources
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ExecutionResources.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.computation != null && message.hasOwnProperty("computation")) {
                        var error = $root.apibara.starknet.v1alpha2.ComputationResources.verify(message.computation);
                        if (error)
                            return "computation." + error;
                    }
                    if (message.dataAvailability != null && message.hasOwnProperty("dataAvailability")) {
                        var error = $root.apibara.starknet.v1alpha2.DataAvailabilityResources.verify(message.dataAvailability);
                        if (error)
                            return "dataAvailability." + error;
                    }
                    return null;
                };

                /**
                 * Creates an ExecutionResources message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.ExecutionResources
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.ExecutionResources} ExecutionResources
                 */
                ExecutionResources.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.ExecutionResources)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.ExecutionResources();
                    if (object.computation != null) {
                        if (typeof object.computation !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.ExecutionResources.computation: object expected");
                        message.computation = $root.apibara.starknet.v1alpha2.ComputationResources.fromObject(object.computation);
                    }
                    if (object.dataAvailability != null) {
                        if (typeof object.dataAvailability !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.ExecutionResources.dataAvailability: object expected");
                        message.dataAvailability = $root.apibara.starknet.v1alpha2.DataAvailabilityResources.fromObject(object.dataAvailability);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from an ExecutionResources message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.ExecutionResources
                 * @static
                 * @param {apibara.starknet.v1alpha2.ExecutionResources} message ExecutionResources
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ExecutionResources.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.computation = null;
                        object.dataAvailability = null;
                    }
                    if (message.computation != null && message.hasOwnProperty("computation"))
                        object.computation = $root.apibara.starknet.v1alpha2.ComputationResources.toObject(message.computation, options);
                    if (message.dataAvailability != null && message.hasOwnProperty("dataAvailability"))
                        object.dataAvailability = $root.apibara.starknet.v1alpha2.DataAvailabilityResources.toObject(message.dataAvailability, options);
                    return object;
                };

                /**
                 * Converts this ExecutionResources to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.ExecutionResources
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ExecutionResources.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ExecutionResources
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.ExecutionResources
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ExecutionResources.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.ExecutionResources";
                };

                return ExecutionResources;
            })();

            v1alpha2.ComputationResources = (function() {

                /**
                 * Properties of a ComputationResources.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IComputationResources
                 * @property {number|Long|null} [steps] ComputationResources steps
                 * @property {number|Long|null} [memoryHoles] ComputationResources memoryHoles
                 * @property {number|Long|null} [rangeCheckBuiltinApplications] ComputationResources rangeCheckBuiltinApplications
                 * @property {number|Long|null} [pedersenBuiltinApplications] ComputationResources pedersenBuiltinApplications
                 * @property {number|Long|null} [poseidonBuiltinApplications] ComputationResources poseidonBuiltinApplications
                 * @property {number|Long|null} [ecOpBuiltinApplications] ComputationResources ecOpBuiltinApplications
                 * @property {number|Long|null} [ecdsaBuiltinApplications] ComputationResources ecdsaBuiltinApplications
                 * @property {number|Long|null} [bitwiseBuiltinApplications] ComputationResources bitwiseBuiltinApplications
                 * @property {number|Long|null} [keccakBuiltinApplications] ComputationResources keccakBuiltinApplications
                 * @property {number|Long|null} [segmentArenaBuiltin] ComputationResources segmentArenaBuiltin
                 */

                /**
                 * Constructs a new ComputationResources.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a ComputationResources.
                 * @implements IComputationResources
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IComputationResources=} [properties] Properties to set
                 */
                function ComputationResources(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ComputationResources steps.
                 * @member {number|Long} steps
                 * @memberof apibara.starknet.v1alpha2.ComputationResources
                 * @instance
                 */
                ComputationResources.prototype.steps = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * ComputationResources memoryHoles.
                 * @member {number|Long} memoryHoles
                 * @memberof apibara.starknet.v1alpha2.ComputationResources
                 * @instance
                 */
                ComputationResources.prototype.memoryHoles = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * ComputationResources rangeCheckBuiltinApplications.
                 * @member {number|Long} rangeCheckBuiltinApplications
                 * @memberof apibara.starknet.v1alpha2.ComputationResources
                 * @instance
                 */
                ComputationResources.prototype.rangeCheckBuiltinApplications = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * ComputationResources pedersenBuiltinApplications.
                 * @member {number|Long} pedersenBuiltinApplications
                 * @memberof apibara.starknet.v1alpha2.ComputationResources
                 * @instance
                 */
                ComputationResources.prototype.pedersenBuiltinApplications = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * ComputationResources poseidonBuiltinApplications.
                 * @member {number|Long} poseidonBuiltinApplications
                 * @memberof apibara.starknet.v1alpha2.ComputationResources
                 * @instance
                 */
                ComputationResources.prototype.poseidonBuiltinApplications = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * ComputationResources ecOpBuiltinApplications.
                 * @member {number|Long} ecOpBuiltinApplications
                 * @memberof apibara.starknet.v1alpha2.ComputationResources
                 * @instance
                 */
                ComputationResources.prototype.ecOpBuiltinApplications = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * ComputationResources ecdsaBuiltinApplications.
                 * @member {number|Long} ecdsaBuiltinApplications
                 * @memberof apibara.starknet.v1alpha2.ComputationResources
                 * @instance
                 */
                ComputationResources.prototype.ecdsaBuiltinApplications = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * ComputationResources bitwiseBuiltinApplications.
                 * @member {number|Long} bitwiseBuiltinApplications
                 * @memberof apibara.starknet.v1alpha2.ComputationResources
                 * @instance
                 */
                ComputationResources.prototype.bitwiseBuiltinApplications = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * ComputationResources keccakBuiltinApplications.
                 * @member {number|Long} keccakBuiltinApplications
                 * @memberof apibara.starknet.v1alpha2.ComputationResources
                 * @instance
                 */
                ComputationResources.prototype.keccakBuiltinApplications = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * ComputationResources segmentArenaBuiltin.
                 * @member {number|Long} segmentArenaBuiltin
                 * @memberof apibara.starknet.v1alpha2.ComputationResources
                 * @instance
                 */
                ComputationResources.prototype.segmentArenaBuiltin = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * Creates a new ComputationResources instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.ComputationResources
                 * @static
                 * @param {apibara.starknet.v1alpha2.IComputationResources=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.ComputationResources} ComputationResources instance
                 */
                ComputationResources.create = function create(properties) {
                    return new ComputationResources(properties);
                };

                /**
                 * Encodes the specified ComputationResources message. Does not implicitly {@link apibara.starknet.v1alpha2.ComputationResources.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.ComputationResources
                 * @static
                 * @param {apibara.starknet.v1alpha2.IComputationResources} message ComputationResources message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ComputationResources.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.steps != null && Object.hasOwnProperty.call(message, "steps"))
                        writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.steps);
                    if (message.memoryHoles != null && Object.hasOwnProperty.call(message, "memoryHoles"))
                        writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.memoryHoles);
                    if (message.rangeCheckBuiltinApplications != null && Object.hasOwnProperty.call(message, "rangeCheckBuiltinApplications"))
                        writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.rangeCheckBuiltinApplications);
                    if (message.pedersenBuiltinApplications != null && Object.hasOwnProperty.call(message, "pedersenBuiltinApplications"))
                        writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.pedersenBuiltinApplications);
                    if (message.poseidonBuiltinApplications != null && Object.hasOwnProperty.call(message, "poseidonBuiltinApplications"))
                        writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.poseidonBuiltinApplications);
                    if (message.ecOpBuiltinApplications != null && Object.hasOwnProperty.call(message, "ecOpBuiltinApplications"))
                        writer.uint32(/* id 6, wireType 0 =*/48).uint64(message.ecOpBuiltinApplications);
                    if (message.ecdsaBuiltinApplications != null && Object.hasOwnProperty.call(message, "ecdsaBuiltinApplications"))
                        writer.uint32(/* id 7, wireType 0 =*/56).uint64(message.ecdsaBuiltinApplications);
                    if (message.bitwiseBuiltinApplications != null && Object.hasOwnProperty.call(message, "bitwiseBuiltinApplications"))
                        writer.uint32(/* id 8, wireType 0 =*/64).uint64(message.bitwiseBuiltinApplications);
                    if (message.keccakBuiltinApplications != null && Object.hasOwnProperty.call(message, "keccakBuiltinApplications"))
                        writer.uint32(/* id 9, wireType 0 =*/72).uint64(message.keccakBuiltinApplications);
                    if (message.segmentArenaBuiltin != null && Object.hasOwnProperty.call(message, "segmentArenaBuiltin"))
                        writer.uint32(/* id 10, wireType 0 =*/80).uint64(message.segmentArenaBuiltin);
                    return writer;
                };

                /**
                 * Encodes the specified ComputationResources message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.ComputationResources.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.ComputationResources
                 * @static
                 * @param {apibara.starknet.v1alpha2.IComputationResources} message ComputationResources message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ComputationResources.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ComputationResources message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.ComputationResources
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.ComputationResources} ComputationResources
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ComputationResources.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.ComputationResources();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.steps = reader.uint64();
                                break;
                            }
                        case 2: {
                                message.memoryHoles = reader.uint64();
                                break;
                            }
                        case 3: {
                                message.rangeCheckBuiltinApplications = reader.uint64();
                                break;
                            }
                        case 4: {
                                message.pedersenBuiltinApplications = reader.uint64();
                                break;
                            }
                        case 5: {
                                message.poseidonBuiltinApplications = reader.uint64();
                                break;
                            }
                        case 6: {
                                message.ecOpBuiltinApplications = reader.uint64();
                                break;
                            }
                        case 7: {
                                message.ecdsaBuiltinApplications = reader.uint64();
                                break;
                            }
                        case 8: {
                                message.bitwiseBuiltinApplications = reader.uint64();
                                break;
                            }
                        case 9: {
                                message.keccakBuiltinApplications = reader.uint64();
                                break;
                            }
                        case 10: {
                                message.segmentArenaBuiltin = reader.uint64();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ComputationResources message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.ComputationResources
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.ComputationResources} ComputationResources
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ComputationResources.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ComputationResources message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.ComputationResources
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ComputationResources.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.steps != null && message.hasOwnProperty("steps"))
                        if (!$util.isInteger(message.steps) && !(message.steps && $util.isInteger(message.steps.low) && $util.isInteger(message.steps.high)))
                            return "steps: integer|Long expected";
                    if (message.memoryHoles != null && message.hasOwnProperty("memoryHoles"))
                        if (!$util.isInteger(message.memoryHoles) && !(message.memoryHoles && $util.isInteger(message.memoryHoles.low) && $util.isInteger(message.memoryHoles.high)))
                            return "memoryHoles: integer|Long expected";
                    if (message.rangeCheckBuiltinApplications != null && message.hasOwnProperty("rangeCheckBuiltinApplications"))
                        if (!$util.isInteger(message.rangeCheckBuiltinApplications) && !(message.rangeCheckBuiltinApplications && $util.isInteger(message.rangeCheckBuiltinApplications.low) && $util.isInteger(message.rangeCheckBuiltinApplications.high)))
                            return "rangeCheckBuiltinApplications: integer|Long expected";
                    if (message.pedersenBuiltinApplications != null && message.hasOwnProperty("pedersenBuiltinApplications"))
                        if (!$util.isInteger(message.pedersenBuiltinApplications) && !(message.pedersenBuiltinApplications && $util.isInteger(message.pedersenBuiltinApplications.low) && $util.isInteger(message.pedersenBuiltinApplications.high)))
                            return "pedersenBuiltinApplications: integer|Long expected";
                    if (message.poseidonBuiltinApplications != null && message.hasOwnProperty("poseidonBuiltinApplications"))
                        if (!$util.isInteger(message.poseidonBuiltinApplications) && !(message.poseidonBuiltinApplications && $util.isInteger(message.poseidonBuiltinApplications.low) && $util.isInteger(message.poseidonBuiltinApplications.high)))
                            return "poseidonBuiltinApplications: integer|Long expected";
                    if (message.ecOpBuiltinApplications != null && message.hasOwnProperty("ecOpBuiltinApplications"))
                        if (!$util.isInteger(message.ecOpBuiltinApplications) && !(message.ecOpBuiltinApplications && $util.isInteger(message.ecOpBuiltinApplications.low) && $util.isInteger(message.ecOpBuiltinApplications.high)))
                            return "ecOpBuiltinApplications: integer|Long expected";
                    if (message.ecdsaBuiltinApplications != null && message.hasOwnProperty("ecdsaBuiltinApplications"))
                        if (!$util.isInteger(message.ecdsaBuiltinApplications) && !(message.ecdsaBuiltinApplications && $util.isInteger(message.ecdsaBuiltinApplications.low) && $util.isInteger(message.ecdsaBuiltinApplications.high)))
                            return "ecdsaBuiltinApplications: integer|Long expected";
                    if (message.bitwiseBuiltinApplications != null && message.hasOwnProperty("bitwiseBuiltinApplications"))
                        if (!$util.isInteger(message.bitwiseBuiltinApplications) && !(message.bitwiseBuiltinApplications && $util.isInteger(message.bitwiseBuiltinApplications.low) && $util.isInteger(message.bitwiseBuiltinApplications.high)))
                            return "bitwiseBuiltinApplications: integer|Long expected";
                    if (message.keccakBuiltinApplications != null && message.hasOwnProperty("keccakBuiltinApplications"))
                        if (!$util.isInteger(message.keccakBuiltinApplications) && !(message.keccakBuiltinApplications && $util.isInteger(message.keccakBuiltinApplications.low) && $util.isInteger(message.keccakBuiltinApplications.high)))
                            return "keccakBuiltinApplications: integer|Long expected";
                    if (message.segmentArenaBuiltin != null && message.hasOwnProperty("segmentArenaBuiltin"))
                        if (!$util.isInteger(message.segmentArenaBuiltin) && !(message.segmentArenaBuiltin && $util.isInteger(message.segmentArenaBuiltin.low) && $util.isInteger(message.segmentArenaBuiltin.high)))
                            return "segmentArenaBuiltin: integer|Long expected";
                    return null;
                };

                /**
                 * Creates a ComputationResources message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.ComputationResources
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.ComputationResources} ComputationResources
                 */
                ComputationResources.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.ComputationResources)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.ComputationResources();
                    if (object.steps != null)
                        if ($util.Long)
                            (message.steps = $util.Long.fromValue(object.steps)).unsigned = true;
                        else if (typeof object.steps === "string")
                            message.steps = parseInt(object.steps, 10);
                        else if (typeof object.steps === "number")
                            message.steps = object.steps;
                        else if (typeof object.steps === "object")
                            message.steps = new $util.LongBits(object.steps.low >>> 0, object.steps.high >>> 0).toNumber(true);
                    if (object.memoryHoles != null)
                        if ($util.Long)
                            (message.memoryHoles = $util.Long.fromValue(object.memoryHoles)).unsigned = true;
                        else if (typeof object.memoryHoles === "string")
                            message.memoryHoles = parseInt(object.memoryHoles, 10);
                        else if (typeof object.memoryHoles === "number")
                            message.memoryHoles = object.memoryHoles;
                        else if (typeof object.memoryHoles === "object")
                            message.memoryHoles = new $util.LongBits(object.memoryHoles.low >>> 0, object.memoryHoles.high >>> 0).toNumber(true);
                    if (object.rangeCheckBuiltinApplications != null)
                        if ($util.Long)
                            (message.rangeCheckBuiltinApplications = $util.Long.fromValue(object.rangeCheckBuiltinApplications)).unsigned = true;
                        else if (typeof object.rangeCheckBuiltinApplications === "string")
                            message.rangeCheckBuiltinApplications = parseInt(object.rangeCheckBuiltinApplications, 10);
                        else if (typeof object.rangeCheckBuiltinApplications === "number")
                            message.rangeCheckBuiltinApplications = object.rangeCheckBuiltinApplications;
                        else if (typeof object.rangeCheckBuiltinApplications === "object")
                            message.rangeCheckBuiltinApplications = new $util.LongBits(object.rangeCheckBuiltinApplications.low >>> 0, object.rangeCheckBuiltinApplications.high >>> 0).toNumber(true);
                    if (object.pedersenBuiltinApplications != null)
                        if ($util.Long)
                            (message.pedersenBuiltinApplications = $util.Long.fromValue(object.pedersenBuiltinApplications)).unsigned = true;
                        else if (typeof object.pedersenBuiltinApplications === "string")
                            message.pedersenBuiltinApplications = parseInt(object.pedersenBuiltinApplications, 10);
                        else if (typeof object.pedersenBuiltinApplications === "number")
                            message.pedersenBuiltinApplications = object.pedersenBuiltinApplications;
                        else if (typeof object.pedersenBuiltinApplications === "object")
                            message.pedersenBuiltinApplications = new $util.LongBits(object.pedersenBuiltinApplications.low >>> 0, object.pedersenBuiltinApplications.high >>> 0).toNumber(true);
                    if (object.poseidonBuiltinApplications != null)
                        if ($util.Long)
                            (message.poseidonBuiltinApplications = $util.Long.fromValue(object.poseidonBuiltinApplications)).unsigned = true;
                        else if (typeof object.poseidonBuiltinApplications === "string")
                            message.poseidonBuiltinApplications = parseInt(object.poseidonBuiltinApplications, 10);
                        else if (typeof object.poseidonBuiltinApplications === "number")
                            message.poseidonBuiltinApplications = object.poseidonBuiltinApplications;
                        else if (typeof object.poseidonBuiltinApplications === "object")
                            message.poseidonBuiltinApplications = new $util.LongBits(object.poseidonBuiltinApplications.low >>> 0, object.poseidonBuiltinApplications.high >>> 0).toNumber(true);
                    if (object.ecOpBuiltinApplications != null)
                        if ($util.Long)
                            (message.ecOpBuiltinApplications = $util.Long.fromValue(object.ecOpBuiltinApplications)).unsigned = true;
                        else if (typeof object.ecOpBuiltinApplications === "string")
                            message.ecOpBuiltinApplications = parseInt(object.ecOpBuiltinApplications, 10);
                        else if (typeof object.ecOpBuiltinApplications === "number")
                            message.ecOpBuiltinApplications = object.ecOpBuiltinApplications;
                        else if (typeof object.ecOpBuiltinApplications === "object")
                            message.ecOpBuiltinApplications = new $util.LongBits(object.ecOpBuiltinApplications.low >>> 0, object.ecOpBuiltinApplications.high >>> 0).toNumber(true);
                    if (object.ecdsaBuiltinApplications != null)
                        if ($util.Long)
                            (message.ecdsaBuiltinApplications = $util.Long.fromValue(object.ecdsaBuiltinApplications)).unsigned = true;
                        else if (typeof object.ecdsaBuiltinApplications === "string")
                            message.ecdsaBuiltinApplications = parseInt(object.ecdsaBuiltinApplications, 10);
                        else if (typeof object.ecdsaBuiltinApplications === "number")
                            message.ecdsaBuiltinApplications = object.ecdsaBuiltinApplications;
                        else if (typeof object.ecdsaBuiltinApplications === "object")
                            message.ecdsaBuiltinApplications = new $util.LongBits(object.ecdsaBuiltinApplications.low >>> 0, object.ecdsaBuiltinApplications.high >>> 0).toNumber(true);
                    if (object.bitwiseBuiltinApplications != null)
                        if ($util.Long)
                            (message.bitwiseBuiltinApplications = $util.Long.fromValue(object.bitwiseBuiltinApplications)).unsigned = true;
                        else if (typeof object.bitwiseBuiltinApplications === "string")
                            message.bitwiseBuiltinApplications = parseInt(object.bitwiseBuiltinApplications, 10);
                        else if (typeof object.bitwiseBuiltinApplications === "number")
                            message.bitwiseBuiltinApplications = object.bitwiseBuiltinApplications;
                        else if (typeof object.bitwiseBuiltinApplications === "object")
                            message.bitwiseBuiltinApplications = new $util.LongBits(object.bitwiseBuiltinApplications.low >>> 0, object.bitwiseBuiltinApplications.high >>> 0).toNumber(true);
                    if (object.keccakBuiltinApplications != null)
                        if ($util.Long)
                            (message.keccakBuiltinApplications = $util.Long.fromValue(object.keccakBuiltinApplications)).unsigned = true;
                        else if (typeof object.keccakBuiltinApplications === "string")
                            message.keccakBuiltinApplications = parseInt(object.keccakBuiltinApplications, 10);
                        else if (typeof object.keccakBuiltinApplications === "number")
                            message.keccakBuiltinApplications = object.keccakBuiltinApplications;
                        else if (typeof object.keccakBuiltinApplications === "object")
                            message.keccakBuiltinApplications = new $util.LongBits(object.keccakBuiltinApplications.low >>> 0, object.keccakBuiltinApplications.high >>> 0).toNumber(true);
                    if (object.segmentArenaBuiltin != null)
                        if ($util.Long)
                            (message.segmentArenaBuiltin = $util.Long.fromValue(object.segmentArenaBuiltin)).unsigned = true;
                        else if (typeof object.segmentArenaBuiltin === "string")
                            message.segmentArenaBuiltin = parseInt(object.segmentArenaBuiltin, 10);
                        else if (typeof object.segmentArenaBuiltin === "number")
                            message.segmentArenaBuiltin = object.segmentArenaBuiltin;
                        else if (typeof object.segmentArenaBuiltin === "object")
                            message.segmentArenaBuiltin = new $util.LongBits(object.segmentArenaBuiltin.low >>> 0, object.segmentArenaBuiltin.high >>> 0).toNumber(true);
                    return message;
                };

                /**
                 * Creates a plain object from a ComputationResources message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.ComputationResources
                 * @static
                 * @param {apibara.starknet.v1alpha2.ComputationResources} message ComputationResources
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ComputationResources.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, true);
                            object.steps = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.steps = options.longs === String ? "0" : 0;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, true);
                            object.memoryHoles = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.memoryHoles = options.longs === String ? "0" : 0;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, true);
                            object.rangeCheckBuiltinApplications = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.rangeCheckBuiltinApplications = options.longs === String ? "0" : 0;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, true);
                            object.pedersenBuiltinApplications = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.pedersenBuiltinApplications = options.longs === String ? "0" : 0;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, true);
                            object.poseidonBuiltinApplications = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.poseidonBuiltinApplications = options.longs === String ? "0" : 0;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, true);
                            object.ecOpBuiltinApplications = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.ecOpBuiltinApplications = options.longs === String ? "0" : 0;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, true);
                            object.ecdsaBuiltinApplications = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.ecdsaBuiltinApplications = options.longs === String ? "0" : 0;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, true);
                            object.bitwiseBuiltinApplications = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.bitwiseBuiltinApplications = options.longs === String ? "0" : 0;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, true);
                            object.keccakBuiltinApplications = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.keccakBuiltinApplications = options.longs === String ? "0" : 0;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, true);
                            object.segmentArenaBuiltin = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.segmentArenaBuiltin = options.longs === String ? "0" : 0;
                    }
                    if (message.steps != null && message.hasOwnProperty("steps"))
                        if (typeof message.steps === "number")
                            object.steps = options.longs === String ? String(message.steps) : message.steps;
                        else
                            object.steps = options.longs === String ? $util.Long.prototype.toString.call(message.steps) : options.longs === Number ? new $util.LongBits(message.steps.low >>> 0, message.steps.high >>> 0).toNumber(true) : message.steps;
                    if (message.memoryHoles != null && message.hasOwnProperty("memoryHoles"))
                        if (typeof message.memoryHoles === "number")
                            object.memoryHoles = options.longs === String ? String(message.memoryHoles) : message.memoryHoles;
                        else
                            object.memoryHoles = options.longs === String ? $util.Long.prototype.toString.call(message.memoryHoles) : options.longs === Number ? new $util.LongBits(message.memoryHoles.low >>> 0, message.memoryHoles.high >>> 0).toNumber(true) : message.memoryHoles;
                    if (message.rangeCheckBuiltinApplications != null && message.hasOwnProperty("rangeCheckBuiltinApplications"))
                        if (typeof message.rangeCheckBuiltinApplications === "number")
                            object.rangeCheckBuiltinApplications = options.longs === String ? String(message.rangeCheckBuiltinApplications) : message.rangeCheckBuiltinApplications;
                        else
                            object.rangeCheckBuiltinApplications = options.longs === String ? $util.Long.prototype.toString.call(message.rangeCheckBuiltinApplications) : options.longs === Number ? new $util.LongBits(message.rangeCheckBuiltinApplications.low >>> 0, message.rangeCheckBuiltinApplications.high >>> 0).toNumber(true) : message.rangeCheckBuiltinApplications;
                    if (message.pedersenBuiltinApplications != null && message.hasOwnProperty("pedersenBuiltinApplications"))
                        if (typeof message.pedersenBuiltinApplications === "number")
                            object.pedersenBuiltinApplications = options.longs === String ? String(message.pedersenBuiltinApplications) : message.pedersenBuiltinApplications;
                        else
                            object.pedersenBuiltinApplications = options.longs === String ? $util.Long.prototype.toString.call(message.pedersenBuiltinApplications) : options.longs === Number ? new $util.LongBits(message.pedersenBuiltinApplications.low >>> 0, message.pedersenBuiltinApplications.high >>> 0).toNumber(true) : message.pedersenBuiltinApplications;
                    if (message.poseidonBuiltinApplications != null && message.hasOwnProperty("poseidonBuiltinApplications"))
                        if (typeof message.poseidonBuiltinApplications === "number")
                            object.poseidonBuiltinApplications = options.longs === String ? String(message.poseidonBuiltinApplications) : message.poseidonBuiltinApplications;
                        else
                            object.poseidonBuiltinApplications = options.longs === String ? $util.Long.prototype.toString.call(message.poseidonBuiltinApplications) : options.longs === Number ? new $util.LongBits(message.poseidonBuiltinApplications.low >>> 0, message.poseidonBuiltinApplications.high >>> 0).toNumber(true) : message.poseidonBuiltinApplications;
                    if (message.ecOpBuiltinApplications != null && message.hasOwnProperty("ecOpBuiltinApplications"))
                        if (typeof message.ecOpBuiltinApplications === "number")
                            object.ecOpBuiltinApplications = options.longs === String ? String(message.ecOpBuiltinApplications) : message.ecOpBuiltinApplications;
                        else
                            object.ecOpBuiltinApplications = options.longs === String ? $util.Long.prototype.toString.call(message.ecOpBuiltinApplications) : options.longs === Number ? new $util.LongBits(message.ecOpBuiltinApplications.low >>> 0, message.ecOpBuiltinApplications.high >>> 0).toNumber(true) : message.ecOpBuiltinApplications;
                    if (message.ecdsaBuiltinApplications != null && message.hasOwnProperty("ecdsaBuiltinApplications"))
                        if (typeof message.ecdsaBuiltinApplications === "number")
                            object.ecdsaBuiltinApplications = options.longs === String ? String(message.ecdsaBuiltinApplications) : message.ecdsaBuiltinApplications;
                        else
                            object.ecdsaBuiltinApplications = options.longs === String ? $util.Long.prototype.toString.call(message.ecdsaBuiltinApplications) : options.longs === Number ? new $util.LongBits(message.ecdsaBuiltinApplications.low >>> 0, message.ecdsaBuiltinApplications.high >>> 0).toNumber(true) : message.ecdsaBuiltinApplications;
                    if (message.bitwiseBuiltinApplications != null && message.hasOwnProperty("bitwiseBuiltinApplications"))
                        if (typeof message.bitwiseBuiltinApplications === "number")
                            object.bitwiseBuiltinApplications = options.longs === String ? String(message.bitwiseBuiltinApplications) : message.bitwiseBuiltinApplications;
                        else
                            object.bitwiseBuiltinApplications = options.longs === String ? $util.Long.prototype.toString.call(message.bitwiseBuiltinApplications) : options.longs === Number ? new $util.LongBits(message.bitwiseBuiltinApplications.low >>> 0, message.bitwiseBuiltinApplications.high >>> 0).toNumber(true) : message.bitwiseBuiltinApplications;
                    if (message.keccakBuiltinApplications != null && message.hasOwnProperty("keccakBuiltinApplications"))
                        if (typeof message.keccakBuiltinApplications === "number")
                            object.keccakBuiltinApplications = options.longs === String ? String(message.keccakBuiltinApplications) : message.keccakBuiltinApplications;
                        else
                            object.keccakBuiltinApplications = options.longs === String ? $util.Long.prototype.toString.call(message.keccakBuiltinApplications) : options.longs === Number ? new $util.LongBits(message.keccakBuiltinApplications.low >>> 0, message.keccakBuiltinApplications.high >>> 0).toNumber(true) : message.keccakBuiltinApplications;
                    if (message.segmentArenaBuiltin != null && message.hasOwnProperty("segmentArenaBuiltin"))
                        if (typeof message.segmentArenaBuiltin === "number")
                            object.segmentArenaBuiltin = options.longs === String ? String(message.segmentArenaBuiltin) : message.segmentArenaBuiltin;
                        else
                            object.segmentArenaBuiltin = options.longs === String ? $util.Long.prototype.toString.call(message.segmentArenaBuiltin) : options.longs === Number ? new $util.LongBits(message.segmentArenaBuiltin.low >>> 0, message.segmentArenaBuiltin.high >>> 0).toNumber(true) : message.segmentArenaBuiltin;
                    return object;
                };

                /**
                 * Converts this ComputationResources to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.ComputationResources
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ComputationResources.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ComputationResources
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.ComputationResources
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ComputationResources.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.ComputationResources";
                };

                return ComputationResources;
            })();

            v1alpha2.DataAvailabilityResources = (function() {

                /**
                 * Properties of a DataAvailabilityResources.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IDataAvailabilityResources
                 * @property {number|Long|null} [l1Gas] DataAvailabilityResources l1Gas
                 * @property {number|Long|null} [l1DataGas] DataAvailabilityResources l1DataGas
                 */

                /**
                 * Constructs a new DataAvailabilityResources.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a DataAvailabilityResources.
                 * @implements IDataAvailabilityResources
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IDataAvailabilityResources=} [properties] Properties to set
                 */
                function DataAvailabilityResources(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DataAvailabilityResources l1Gas.
                 * @member {number|Long} l1Gas
                 * @memberof apibara.starknet.v1alpha2.DataAvailabilityResources
                 * @instance
                 */
                DataAvailabilityResources.prototype.l1Gas = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * DataAvailabilityResources l1DataGas.
                 * @member {number|Long} l1DataGas
                 * @memberof apibara.starknet.v1alpha2.DataAvailabilityResources
                 * @instance
                 */
                DataAvailabilityResources.prototype.l1DataGas = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * Creates a new DataAvailabilityResources instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.DataAvailabilityResources
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDataAvailabilityResources=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.DataAvailabilityResources} DataAvailabilityResources instance
                 */
                DataAvailabilityResources.create = function create(properties) {
                    return new DataAvailabilityResources(properties);
                };

                /**
                 * Encodes the specified DataAvailabilityResources message. Does not implicitly {@link apibara.starknet.v1alpha2.DataAvailabilityResources.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.DataAvailabilityResources
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDataAvailabilityResources} message DataAvailabilityResources message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DataAvailabilityResources.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.l1Gas != null && Object.hasOwnProperty.call(message, "l1Gas"))
                        writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.l1Gas);
                    if (message.l1DataGas != null && Object.hasOwnProperty.call(message, "l1DataGas"))
                        writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.l1DataGas);
                    return writer;
                };

                /**
                 * Encodes the specified DataAvailabilityResources message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.DataAvailabilityResources.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.DataAvailabilityResources
                 * @static
                 * @param {apibara.starknet.v1alpha2.IDataAvailabilityResources} message DataAvailabilityResources message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DataAvailabilityResources.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a DataAvailabilityResources message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.DataAvailabilityResources
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.DataAvailabilityResources} DataAvailabilityResources
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DataAvailabilityResources.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.DataAvailabilityResources();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.l1Gas = reader.uint64();
                                break;
                            }
                        case 2: {
                                message.l1DataGas = reader.uint64();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a DataAvailabilityResources message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.DataAvailabilityResources
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.DataAvailabilityResources} DataAvailabilityResources
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DataAvailabilityResources.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a DataAvailabilityResources message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.DataAvailabilityResources
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DataAvailabilityResources.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.l1Gas != null && message.hasOwnProperty("l1Gas"))
                        if (!$util.isInteger(message.l1Gas) && !(message.l1Gas && $util.isInteger(message.l1Gas.low) && $util.isInteger(message.l1Gas.high)))
                            return "l1Gas: integer|Long expected";
                    if (message.l1DataGas != null && message.hasOwnProperty("l1DataGas"))
                        if (!$util.isInteger(message.l1DataGas) && !(message.l1DataGas && $util.isInteger(message.l1DataGas.low) && $util.isInteger(message.l1DataGas.high)))
                            return "l1DataGas: integer|Long expected";
                    return null;
                };

                /**
                 * Creates a DataAvailabilityResources message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.DataAvailabilityResources
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.DataAvailabilityResources} DataAvailabilityResources
                 */
                DataAvailabilityResources.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.DataAvailabilityResources)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.DataAvailabilityResources();
                    if (object.l1Gas != null)
                        if ($util.Long)
                            (message.l1Gas = $util.Long.fromValue(object.l1Gas)).unsigned = true;
                        else if (typeof object.l1Gas === "string")
                            message.l1Gas = parseInt(object.l1Gas, 10);
                        else if (typeof object.l1Gas === "number")
                            message.l1Gas = object.l1Gas;
                        else if (typeof object.l1Gas === "object")
                            message.l1Gas = new $util.LongBits(object.l1Gas.low >>> 0, object.l1Gas.high >>> 0).toNumber(true);
                    if (object.l1DataGas != null)
                        if ($util.Long)
                            (message.l1DataGas = $util.Long.fromValue(object.l1DataGas)).unsigned = true;
                        else if (typeof object.l1DataGas === "string")
                            message.l1DataGas = parseInt(object.l1DataGas, 10);
                        else if (typeof object.l1DataGas === "number")
                            message.l1DataGas = object.l1DataGas;
                        else if (typeof object.l1DataGas === "object")
                            message.l1DataGas = new $util.LongBits(object.l1DataGas.low >>> 0, object.l1DataGas.high >>> 0).toNumber(true);
                    return message;
                };

                /**
                 * Creates a plain object from a DataAvailabilityResources message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.DataAvailabilityResources
                 * @static
                 * @param {apibara.starknet.v1alpha2.DataAvailabilityResources} message DataAvailabilityResources
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DataAvailabilityResources.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, true);
                            object.l1Gas = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.l1Gas = options.longs === String ? "0" : 0;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, true);
                            object.l1DataGas = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.l1DataGas = options.longs === String ? "0" : 0;
                    }
                    if (message.l1Gas != null && message.hasOwnProperty("l1Gas"))
                        if (typeof message.l1Gas === "number")
                            object.l1Gas = options.longs === String ? String(message.l1Gas) : message.l1Gas;
                        else
                            object.l1Gas = options.longs === String ? $util.Long.prototype.toString.call(message.l1Gas) : options.longs === Number ? new $util.LongBits(message.l1Gas.low >>> 0, message.l1Gas.high >>> 0).toNumber(true) : message.l1Gas;
                    if (message.l1DataGas != null && message.hasOwnProperty("l1DataGas"))
                        if (typeof message.l1DataGas === "number")
                            object.l1DataGas = options.longs === String ? String(message.l1DataGas) : message.l1DataGas;
                        else
                            object.l1DataGas = options.longs === String ? $util.Long.prototype.toString.call(message.l1DataGas) : options.longs === Number ? new $util.LongBits(message.l1DataGas.low >>> 0, message.l1DataGas.high >>> 0).toNumber(true) : message.l1DataGas;
                    return object;
                };

                /**
                 * Converts this DataAvailabilityResources to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.DataAvailabilityResources
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DataAvailabilityResources.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for DataAvailabilityResources
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.DataAvailabilityResources
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                DataAvailabilityResources.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.DataAvailabilityResources";
                };

                return DataAvailabilityResources;
            })();

            v1alpha2.ResourceBoundsMapping = (function() {

                /**
                 * Properties of a ResourceBoundsMapping.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IResourceBoundsMapping
                 * @property {apibara.starknet.v1alpha2.IResourceBounds|null} [l1Gas] ResourceBoundsMapping l1Gas
                 * @property {apibara.starknet.v1alpha2.IResourceBounds|null} [l2Gas] ResourceBoundsMapping l2Gas
                 */

                /**
                 * Constructs a new ResourceBoundsMapping.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a ResourceBoundsMapping.
                 * @implements IResourceBoundsMapping
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IResourceBoundsMapping=} [properties] Properties to set
                 */
                function ResourceBoundsMapping(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ResourceBoundsMapping l1Gas.
                 * @member {apibara.starknet.v1alpha2.IResourceBounds|null|undefined} l1Gas
                 * @memberof apibara.starknet.v1alpha2.ResourceBoundsMapping
                 * @instance
                 */
                ResourceBoundsMapping.prototype.l1Gas = null;

                /**
                 * ResourceBoundsMapping l2Gas.
                 * @member {apibara.starknet.v1alpha2.IResourceBounds|null|undefined} l2Gas
                 * @memberof apibara.starknet.v1alpha2.ResourceBoundsMapping
                 * @instance
                 */
                ResourceBoundsMapping.prototype.l2Gas = null;

                /**
                 * Creates a new ResourceBoundsMapping instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.ResourceBoundsMapping
                 * @static
                 * @param {apibara.starknet.v1alpha2.IResourceBoundsMapping=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.ResourceBoundsMapping} ResourceBoundsMapping instance
                 */
                ResourceBoundsMapping.create = function create(properties) {
                    return new ResourceBoundsMapping(properties);
                };

                /**
                 * Encodes the specified ResourceBoundsMapping message. Does not implicitly {@link apibara.starknet.v1alpha2.ResourceBoundsMapping.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.ResourceBoundsMapping
                 * @static
                 * @param {apibara.starknet.v1alpha2.IResourceBoundsMapping} message ResourceBoundsMapping message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ResourceBoundsMapping.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.l1Gas != null && Object.hasOwnProperty.call(message, "l1Gas"))
                        $root.apibara.starknet.v1alpha2.ResourceBounds.encode(message.l1Gas, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.l2Gas != null && Object.hasOwnProperty.call(message, "l2Gas"))
                        $root.apibara.starknet.v1alpha2.ResourceBounds.encode(message.l2Gas, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified ResourceBoundsMapping message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.ResourceBoundsMapping.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.ResourceBoundsMapping
                 * @static
                 * @param {apibara.starknet.v1alpha2.IResourceBoundsMapping} message ResourceBoundsMapping message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ResourceBoundsMapping.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ResourceBoundsMapping message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.ResourceBoundsMapping
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.ResourceBoundsMapping} ResourceBoundsMapping
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ResourceBoundsMapping.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.ResourceBoundsMapping();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.l1Gas = $root.apibara.starknet.v1alpha2.ResourceBounds.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.l2Gas = $root.apibara.starknet.v1alpha2.ResourceBounds.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ResourceBoundsMapping message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.ResourceBoundsMapping
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.ResourceBoundsMapping} ResourceBoundsMapping
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ResourceBoundsMapping.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ResourceBoundsMapping message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.ResourceBoundsMapping
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ResourceBoundsMapping.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.l1Gas != null && message.hasOwnProperty("l1Gas")) {
                        var error = $root.apibara.starknet.v1alpha2.ResourceBounds.verify(message.l1Gas);
                        if (error)
                            return "l1Gas." + error;
                    }
                    if (message.l2Gas != null && message.hasOwnProperty("l2Gas")) {
                        var error = $root.apibara.starknet.v1alpha2.ResourceBounds.verify(message.l2Gas);
                        if (error)
                            return "l2Gas." + error;
                    }
                    return null;
                };

                /**
                 * Creates a ResourceBoundsMapping message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.ResourceBoundsMapping
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.ResourceBoundsMapping} ResourceBoundsMapping
                 */
                ResourceBoundsMapping.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.ResourceBoundsMapping)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.ResourceBoundsMapping();
                    if (object.l1Gas != null) {
                        if (typeof object.l1Gas !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.ResourceBoundsMapping.l1Gas: object expected");
                        message.l1Gas = $root.apibara.starknet.v1alpha2.ResourceBounds.fromObject(object.l1Gas);
                    }
                    if (object.l2Gas != null) {
                        if (typeof object.l2Gas !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.ResourceBoundsMapping.l2Gas: object expected");
                        message.l2Gas = $root.apibara.starknet.v1alpha2.ResourceBounds.fromObject(object.l2Gas);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a ResourceBoundsMapping message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.ResourceBoundsMapping
                 * @static
                 * @param {apibara.starknet.v1alpha2.ResourceBoundsMapping} message ResourceBoundsMapping
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ResourceBoundsMapping.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.l1Gas = null;
                        object.l2Gas = null;
                    }
                    if (message.l1Gas != null && message.hasOwnProperty("l1Gas"))
                        object.l1Gas = $root.apibara.starknet.v1alpha2.ResourceBounds.toObject(message.l1Gas, options);
                    if (message.l2Gas != null && message.hasOwnProperty("l2Gas"))
                        object.l2Gas = $root.apibara.starknet.v1alpha2.ResourceBounds.toObject(message.l2Gas, options);
                    return object;
                };

                /**
                 * Converts this ResourceBoundsMapping to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.ResourceBoundsMapping
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ResourceBoundsMapping.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ResourceBoundsMapping
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.ResourceBoundsMapping
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ResourceBoundsMapping.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.ResourceBoundsMapping";
                };

                return ResourceBoundsMapping;
            })();

            v1alpha2.ResourceBounds = (function() {

                /**
                 * Properties of a ResourceBounds.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IResourceBounds
                 * @property {number|Long|null} [maxAmount] ResourceBounds maxAmount
                 * @property {apibara.starknet.v1alpha2.IUint128|null} [maxPricePerUnit] The max price per unit of resource.
                 */

                /**
                 * Constructs a new ResourceBounds.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents a ResourceBounds.
                 * @implements IResourceBounds
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IResourceBounds=} [properties] Properties to set
                 */
                function ResourceBounds(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ResourceBounds maxAmount.
                 * @member {number|Long} maxAmount
                 * @memberof apibara.starknet.v1alpha2.ResourceBounds
                 * @instance
                 */
                ResourceBounds.prototype.maxAmount = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * The max price per unit of resource.
                 * @member {apibara.starknet.v1alpha2.IUint128|null|undefined} maxPricePerUnit
                 * @memberof apibara.starknet.v1alpha2.ResourceBounds
                 * @instance
                 */
                ResourceBounds.prototype.maxPricePerUnit = null;

                /**
                 * Creates a new ResourceBounds instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.ResourceBounds
                 * @static
                 * @param {apibara.starknet.v1alpha2.IResourceBounds=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.ResourceBounds} ResourceBounds instance
                 */
                ResourceBounds.create = function create(properties) {
                    return new ResourceBounds(properties);
                };

                /**
                 * Encodes the specified ResourceBounds message. Does not implicitly {@link apibara.starknet.v1alpha2.ResourceBounds.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.ResourceBounds
                 * @static
                 * @param {apibara.starknet.v1alpha2.IResourceBounds} message ResourceBounds message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ResourceBounds.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.maxAmount != null && Object.hasOwnProperty.call(message, "maxAmount"))
                        writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.maxAmount);
                    if (message.maxPricePerUnit != null && Object.hasOwnProperty.call(message, "maxPricePerUnit"))
                        $root.apibara.starknet.v1alpha2.Uint128.encode(message.maxPricePerUnit, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified ResourceBounds message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.ResourceBounds.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.ResourceBounds
                 * @static
                 * @param {apibara.starknet.v1alpha2.IResourceBounds} message ResourceBounds message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ResourceBounds.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ResourceBounds message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.ResourceBounds
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.ResourceBounds} ResourceBounds
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ResourceBounds.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.ResourceBounds();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.maxAmount = reader.uint64();
                                break;
                            }
                        case 2: {
                                message.maxPricePerUnit = $root.apibara.starknet.v1alpha2.Uint128.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ResourceBounds message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.ResourceBounds
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.ResourceBounds} ResourceBounds
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ResourceBounds.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ResourceBounds message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.ResourceBounds
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ResourceBounds.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.maxAmount != null && message.hasOwnProperty("maxAmount"))
                        if (!$util.isInteger(message.maxAmount) && !(message.maxAmount && $util.isInteger(message.maxAmount.low) && $util.isInteger(message.maxAmount.high)))
                            return "maxAmount: integer|Long expected";
                    if (message.maxPricePerUnit != null && message.hasOwnProperty("maxPricePerUnit")) {
                        var error = $root.apibara.starknet.v1alpha2.Uint128.verify(message.maxPricePerUnit);
                        if (error)
                            return "maxPricePerUnit." + error;
                    }
                    return null;
                };

                /**
                 * Creates a ResourceBounds message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.ResourceBounds
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.ResourceBounds} ResourceBounds
                 */
                ResourceBounds.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.ResourceBounds)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.ResourceBounds();
                    if (object.maxAmount != null)
                        if ($util.Long)
                            (message.maxAmount = $util.Long.fromValue(object.maxAmount)).unsigned = true;
                        else if (typeof object.maxAmount === "string")
                            message.maxAmount = parseInt(object.maxAmount, 10);
                        else if (typeof object.maxAmount === "number")
                            message.maxAmount = object.maxAmount;
                        else if (typeof object.maxAmount === "object")
                            message.maxAmount = new $util.LongBits(object.maxAmount.low >>> 0, object.maxAmount.high >>> 0).toNumber(true);
                    if (object.maxPricePerUnit != null) {
                        if (typeof object.maxPricePerUnit !== "object")
                            throw TypeError(".apibara.starknet.v1alpha2.ResourceBounds.maxPricePerUnit: object expected");
                        message.maxPricePerUnit = $root.apibara.starknet.v1alpha2.Uint128.fromObject(object.maxPricePerUnit);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a ResourceBounds message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.ResourceBounds
                 * @static
                 * @param {apibara.starknet.v1alpha2.ResourceBounds} message ResourceBounds
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ResourceBounds.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, true);
                            object.maxAmount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.maxAmount = options.longs === String ? "0" : 0;
                        object.maxPricePerUnit = null;
                    }
                    if (message.maxAmount != null && message.hasOwnProperty("maxAmount"))
                        if (typeof message.maxAmount === "number")
                            object.maxAmount = options.longs === String ? String(message.maxAmount) : message.maxAmount;
                        else
                            object.maxAmount = options.longs === String ? $util.Long.prototype.toString.call(message.maxAmount) : options.longs === Number ? new $util.LongBits(message.maxAmount.low >>> 0, message.maxAmount.high >>> 0).toNumber(true) : message.maxAmount;
                    if (message.maxPricePerUnit != null && message.hasOwnProperty("maxPricePerUnit"))
                        object.maxPricePerUnit = $root.apibara.starknet.v1alpha2.Uint128.toObject(message.maxPricePerUnit, options);
                    return object;
                };

                /**
                 * Converts this ResourceBounds to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.ResourceBounds
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ResourceBounds.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ResourceBounds
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.ResourceBounds
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ResourceBounds.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.ResourceBounds";
                };

                return ResourceBounds;
            })();

            v1alpha2.Uint128 = (function() {

                /**
                 * Properties of an Uint128.
                 * @memberof apibara.starknet.v1alpha2
                 * @interface IUint128
                 * @property {number|Long|null} [low] Uint128 low
                 * @property {number|Long|null} [high] Uint128 high
                 */

                /**
                 * Constructs a new Uint128.
                 * @memberof apibara.starknet.v1alpha2
                 * @classdesc Represents an Uint128.
                 * @implements IUint128
                 * @constructor
                 * @param {apibara.starknet.v1alpha2.IUint128=} [properties] Properties to set
                 */
                function Uint128(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Uint128 low.
                 * @member {number|Long} low
                 * @memberof apibara.starknet.v1alpha2.Uint128
                 * @instance
                 */
                Uint128.prototype.low = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * Uint128 high.
                 * @member {number|Long} high
                 * @memberof apibara.starknet.v1alpha2.Uint128
                 * @instance
                 */
                Uint128.prototype.high = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * Creates a new Uint128 instance using the specified properties.
                 * @function create
                 * @memberof apibara.starknet.v1alpha2.Uint128
                 * @static
                 * @param {apibara.starknet.v1alpha2.IUint128=} [properties] Properties to set
                 * @returns {apibara.starknet.v1alpha2.Uint128} Uint128 instance
                 */
                Uint128.create = function create(properties) {
                    return new Uint128(properties);
                };

                /**
                 * Encodes the specified Uint128 message. Does not implicitly {@link apibara.starknet.v1alpha2.Uint128.verify|verify} messages.
                 * @function encode
                 * @memberof apibara.starknet.v1alpha2.Uint128
                 * @static
                 * @param {apibara.starknet.v1alpha2.IUint128} message Uint128 message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Uint128.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.low != null && Object.hasOwnProperty.call(message, "low"))
                        writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.low);
                    if (message.high != null && Object.hasOwnProperty.call(message, "high"))
                        writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.high);
                    return writer;
                };

                /**
                 * Encodes the specified Uint128 message, length delimited. Does not implicitly {@link apibara.starknet.v1alpha2.Uint128.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof apibara.starknet.v1alpha2.Uint128
                 * @static
                 * @param {apibara.starknet.v1alpha2.IUint128} message Uint128 message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Uint128.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an Uint128 message from the specified reader or buffer.
                 * @function decode
                 * @memberof apibara.starknet.v1alpha2.Uint128
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {apibara.starknet.v1alpha2.Uint128} Uint128
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Uint128.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apibara.starknet.v1alpha2.Uint128();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.low = reader.uint64();
                                break;
                            }
                        case 2: {
                                message.high = reader.uint64();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an Uint128 message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof apibara.starknet.v1alpha2.Uint128
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {apibara.starknet.v1alpha2.Uint128} Uint128
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Uint128.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an Uint128 message.
                 * @function verify
                 * @memberof apibara.starknet.v1alpha2.Uint128
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Uint128.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.low != null && message.hasOwnProperty("low"))
                        if (!$util.isInteger(message.low) && !(message.low && $util.isInteger(message.low.low) && $util.isInteger(message.low.high)))
                            return "low: integer|Long expected";
                    if (message.high != null && message.hasOwnProperty("high"))
                        if (!$util.isInteger(message.high) && !(message.high && $util.isInteger(message.high.low) && $util.isInteger(message.high.high)))
                            return "high: integer|Long expected";
                    return null;
                };

                /**
                 * Creates an Uint128 message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof apibara.starknet.v1alpha2.Uint128
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {apibara.starknet.v1alpha2.Uint128} Uint128
                 */
                Uint128.fromObject = function fromObject(object) {
                    if (object instanceof $root.apibara.starknet.v1alpha2.Uint128)
                        return object;
                    var message = new $root.apibara.starknet.v1alpha2.Uint128();
                    if (object.low != null)
                        if ($util.Long)
                            (message.low = $util.Long.fromValue(object.low)).unsigned = true;
                        else if (typeof object.low === "string")
                            message.low = parseInt(object.low, 10);
                        else if (typeof object.low === "number")
                            message.low = object.low;
                        else if (typeof object.low === "object")
                            message.low = new $util.LongBits(object.low.low >>> 0, object.low.high >>> 0).toNumber(true);
                    if (object.high != null)
                        if ($util.Long)
                            (message.high = $util.Long.fromValue(object.high)).unsigned = true;
                        else if (typeof object.high === "string")
                            message.high = parseInt(object.high, 10);
                        else if (typeof object.high === "number")
                            message.high = object.high;
                        else if (typeof object.high === "object")
                            message.high = new $util.LongBits(object.high.low >>> 0, object.high.high >>> 0).toNumber(true);
                    return message;
                };

                /**
                 * Creates a plain object from an Uint128 message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof apibara.starknet.v1alpha2.Uint128
                 * @static
                 * @param {apibara.starknet.v1alpha2.Uint128} message Uint128
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Uint128.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, true);
                            object.low = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.low = options.longs === String ? "0" : 0;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, true);
                            object.high = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.high = options.longs === String ? "0" : 0;
                    }
                    if (message.low != null && message.hasOwnProperty("low"))
                        if (typeof message.low === "number")
                            object.low = options.longs === String ? String(message.low) : message.low;
                        else
                            object.low = options.longs === String ? $util.Long.prototype.toString.call(message.low) : options.longs === Number ? new $util.LongBits(message.low.low >>> 0, message.low.high >>> 0).toNumber(true) : message.low;
                    if (message.high != null && message.hasOwnProperty("high"))
                        if (typeof message.high === "number")
                            object.high = options.longs === String ? String(message.high) : message.high;
                        else
                            object.high = options.longs === String ? $util.Long.prototype.toString.call(message.high) : options.longs === Number ? new $util.LongBits(message.high.low >>> 0, message.high.high >>> 0).toNumber(true) : message.high;
                    return object;
                };

                /**
                 * Converts this Uint128 to JSON.
                 * @function toJSON
                 * @memberof apibara.starknet.v1alpha2.Uint128
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Uint128.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for Uint128
                 * @function getTypeUrl
                 * @memberof apibara.starknet.v1alpha2.Uint128
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                Uint128.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/apibara.starknet.v1alpha2.Uint128";
                };

                return Uint128;
            })();

            /**
             * DataAvailabilityMode enum.
             * @name apibara.starknet.v1alpha2.DataAvailabilityMode
             * @enum {number}
             * @property {number} DATA_AVAILABILITY_MODE_UNSPECIFIED=0 DATA_AVAILABILITY_MODE_UNSPECIFIED value
             * @property {number} DATA_AVAILABILITY_MODE_L1=1 DATA_AVAILABILITY_MODE_L1 value
             * @property {number} DATA_AVAILABILITY_MODE_L2=2 DATA_AVAILABILITY_MODE_L2 value
             */
            v1alpha2.DataAvailabilityMode = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "DATA_AVAILABILITY_MODE_UNSPECIFIED"] = 0;
                values[valuesById[1] = "DATA_AVAILABILITY_MODE_L1"] = 1;
                values[valuesById[2] = "DATA_AVAILABILITY_MODE_L2"] = 2;
                return values;
            })();

            return v1alpha2;
        })();

        return starknet;
    })();

    return apibara;
})();

$root.google = (function() {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    var google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        var protobuf = {};

        protobuf.Timestamp = (function() {

            /**
             * Properties of a Timestamp.
             * @memberof google.protobuf
             * @interface ITimestamp
             * @property {number|Long|null} [seconds] Timestamp seconds
             * @property {number|null} [nanos] Timestamp nanos
             */

            /**
             * Constructs a new Timestamp.
             * @memberof google.protobuf
             * @classdesc Represents a Timestamp.
             * @implements ITimestamp
             * @constructor
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             */
            function Timestamp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Timestamp seconds.
             * @member {number|Long} seconds
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Timestamp nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.nanos = 0;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             * @returns {google.protobuf.Timestamp} Timestamp instance
             */
            Timestamp.create = function create(properties) {
                return new Timestamp(properties);
            };

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.seconds != null && Object.hasOwnProperty.call(message, "seconds"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
                if (message.nanos != null && Object.hasOwnProperty.call(message, "nanos"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
                return writer;
            };

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Timestamp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.seconds = reader.int64();
                            break;
                        }
                    case 2: {
                            message.nanos = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Timestamp message.
             * @function verify
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Timestamp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                        return "seconds: integer|Long expected";
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    if (!$util.isInteger(message.nanos))
                        return "nanos: integer expected";
                return null;
            };

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Timestamp} Timestamp
             */
            Timestamp.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Timestamp)
                    return object;
                var message = new $root.google.protobuf.Timestamp();
                if (object.seconds != null)
                    if ($util.Long)
                        (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                    else if (typeof object.seconds === "string")
                        message.seconds = parseInt(object.seconds, 10);
                    else if (typeof object.seconds === "number")
                        message.seconds = object.seconds;
                    else if (typeof object.seconds === "object")
                        message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
                if (object.nanos != null)
                    message.nanos = object.nanos | 0;
                return message;
            };

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp} message Timestamp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Timestamp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seconds = options.longs === String ? "0" : 0;
                    object.nanos = 0;
                }
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (typeof message.seconds === "number")
                        object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                    else
                        object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    object.nanos = message.nanos;
                return object;
            };

            /**
             * Converts this Timestamp to JSON.
             * @function toJSON
             * @memberof google.protobuf.Timestamp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Timestamp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Timestamp
             * @function getTypeUrl
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Timestamp.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/google.protobuf.Timestamp";
            };

            return Timestamp;
        })();

        return protobuf;
    })();

    return google;
})();

module.exports = $root;
