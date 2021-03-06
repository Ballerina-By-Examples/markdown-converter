# Request interceptor at service level

When you want to engage a `RequestInterceptor` for a specific service path, you can engage interceptors at
the service level through the `ServiceConfig` annotation. The interceptors engaged at the service level will have the 
base path same as the target service.
For more information, see the [HTTP module](https://docs.central.ballerina.io/ballerina/http/latest/).

::: code ./examples/http-request-interceptor-at-service/http_request_interceptor_at_service.bal :::

::: out ./examples/http-request-interceptor-at-service/http_request_interceptor_at_service.client.out :::

::: out ./examples/http-request-interceptor-at-service/http_request_interceptor_at_service.server.out :::