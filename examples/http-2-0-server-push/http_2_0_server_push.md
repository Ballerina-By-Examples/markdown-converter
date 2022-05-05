# HTTP 2.0 server push

HTTP/2 server push messages can be sent and received using the Ballerina `http` library.
HTTP/2 Server Push messages allow the server to send resources to the client before the client requests for it.<br/><br/>
For more information on the underlying module, 
see the [HTTP module](https://docs.central.ballerina.io/ballerina/http/latest/).

::: code ./examples/http-2-0-server-push/http_2_0_service.bal :::

::: out ./examples/http-2-0-server-push/http_2_0_service.out :::

::: code ./examples/http-2-0-server-push/http_client.bal :::

::: out ./examples/http-2-0-server-push/http_client.out :::