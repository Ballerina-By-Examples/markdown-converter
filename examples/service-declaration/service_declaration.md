# Service declaration

A service represents a collection of remotely accessible methods attached to a particular listener.
A service declaration is syntactic sugar for creating services in Ballerina. 
A service declaration gets desugared into several things including creating a listener object,
registering it with the module, creating a service object, attaching the service object to the listener object, etc,.
The type of the listener determines required type of remote methods.

::: code ./examples/service-declaration/service_declaration.bal :::

::: out ./examples/service-declaration/service_declaration.client.out :::

::: out ./examples/service-declaration/service_declaration.server.out :::