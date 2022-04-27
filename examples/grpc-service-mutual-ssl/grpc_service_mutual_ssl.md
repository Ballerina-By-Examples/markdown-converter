# Service - mutual SSL

Ballerina supports mutual SSL, which is a certificate-based authentication
process in which two parties (the client and server) authenticate each other by
verifying the digital certificates. It ensures that both parties are assured
of each other's identity.<br/><br/>
For more information on the underlying module, 
see the [gRPC module](https://docs.central.ballerina.io/ballerina/grpc/latest/).


::: code ./examples/grpc-service-mutual-ssl/grpc_service.proto :::

::: out ./examples/grpc-service-mutual-ssl/grpc_service.out :::

::: code ./examples/grpc-service-mutual-ssl/grpc_service_mutual_ssl.bal :::

::: out ./examples/grpc-service-mutual-ssl/grpc_service_mutual_ssl.server.out :::