# Consumer groups

This is an example of a Kafka consumer used as a listener to listen to a
given topic/topics. The listener uses a group of concurrent consumers within
the service. This consumer uses the builtin `string` deserializer for the
values. For this example to work properly, an active Kafka broker should be
present.<br/><br/>
For more information on the underlying module, 
see the [Kafka module](https://docs.central.ballerina.io/ballerinax/kafka/latest).


::: code ./examples/kafka-consumer-group-service/kafka_consumer_group_service.bal :::

::: out ./examples/kafka-consumer-group-service/kafka_consumer_group_service.out :::