# Consumer service

This is an example, which creates a Kafka consumer used as a listener
to a service with manual offset commits.
This consumer uses the builtin `int` deserializer for the keys and the
builtin `string` deserializer for the values. For this example to work
properly, an active Kafka broker should be present.<br/><br/>
For more information on the underlying module, 
see the [Kafka module](https://docs.central.ballerina.io/ballerinax/kafka/latest).


::: code ./examples/kafka-consumer-service/kafka_consumer_service.bal :::

::: out ./examples/kafka-consumer-service/kafka_consumer_service.out :::