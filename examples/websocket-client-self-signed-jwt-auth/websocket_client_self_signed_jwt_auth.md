# Client - self signed JWT Auth

A client, which is secured with self-signed JWT can be used to connect to
a secured service.<br/>
The client is enriched with the `Authorization: Bearer <token>` header by
passing the `websocket:JwtIssuerConfig` to the `auth` configuration of the
client. A self-signed JWT is issued before the request is sent.<br/><br/>
For more information on the underlying module,
see the [OAuth2 module](https://docs.central.ballerina.io/ballerina/oauth2/latest/).


::: code ./examples/websocket-client-self-signed-jwt-auth/websocket_client_self_signed_jwt_auth.bal :::

::: out ./examples/websocket-client-self-signed-jwt-auth/websocket_client_self_signed_jwt_auth.out :::