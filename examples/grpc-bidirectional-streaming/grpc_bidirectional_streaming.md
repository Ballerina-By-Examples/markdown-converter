# Bidirectional streaming RPC

The gRPC Server Connector exposes the gRPC service over HTTP2.
This example demonstrates how a gRPC bidirectional streaming service and a client
operate when each of them sends a sequence of messages using a read-write stream. 
In such scenarios, the two streams operate independently. Therefore, clients and servers can read and write in any order.<br/><br/>
For more information on the underlying module, 
see the [GRPC module](https://docs.central.ballerina.io/ballerina/grpc/latest/).


::: code ./examples/grpc-bidirectional-streaming/grpc_bidirectional_streaming.proto :::

::: out ./examples/grpc-bidirectional-streaming/grpc_bidirectional_streaming.out :::

::: code ./examples/grpc-bidirectional-streaming/grpc_bidirectional_streaming_service.bal :::

::: out ./examples/grpc-bidirectional-streaming/grpc_bidirectional_streaming_service.out :::

::: code ./examples/grpc-bidirectional-streaming/grpc_bidirectional_streaming_service_client.bal :::

::: out ./examples/grpc-bidirectional-streaming/grpc_bidirectional_streaming_service_client.out :::