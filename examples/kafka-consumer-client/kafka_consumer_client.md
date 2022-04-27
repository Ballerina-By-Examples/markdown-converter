# Consumer client

This is an example on how to use a `kafka:Consumer` as a simple record
consumer. The records from a subscribed topic can be retrieved using the
`poll()` function.
This consumer uses the builtin byte array deserializer for both the key and
the value, which is the default deserializer in the `kafka:Consumer`. For
this example to work properly, an active Kafka broker should be present.
<br/><br/>
For more information on the underlying module, 
see the [Kafka module](https://docs.central.ballerina.io/ballerinax/kafka/latest).


::: code ./examples/kafka-consumer-client/kafka_consumer_client.bal :::

::: out ./examples/kafka-consumer-client/kafka_consumer_client.out :::