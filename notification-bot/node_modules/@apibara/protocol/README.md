# `@apibara/protocol`

This package provides a gRPC client to interact with an [Apibara streaming server](https://www.apibara.com/docs/streaming-protocol).

## Installation

```bash
npm add @apibara/protocol
```

## Usage

The package exports a `NodeClient` used to interact with the server.
The client has two methods:

 - `status`: returns the indexing status of the node. 
 - `streamMessages`: returns a node.js `Stream` with the messages from the server.

```ts
import { NodeClient, credentials } from '@apibara/protocol'

async function main() {
  // create client connected to the StarkNet Goerli stream
  // the server uses ssl
  const node = new NodeClient(
    'goerli.starknet.stream.apibara.com:443',
    credentials.createSsl()
  )

  // check server status
  const status = await node.status()

  // stream all messages from the server
  // returns a promise resolved when it finishes
  // streaming from the server
  const messages = node.streamMessages()
  return new Promise((resolve, reject) => {
    messages.on('end', resolve)
    messages.on('error', reject)
    messages.on('data', (data) => {
      console.log(data)
    })
  })
}
```

## License

Copyright 2022 GNC Labs Limited

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
