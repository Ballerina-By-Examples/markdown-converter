# Consumer groups

Here, a `kafka:Consumer` is used as a listener to listen to a
given set of topic/topics. The listener uses a group of concurrent consumers within
the service. For this to work properly, an active Kafka broker should be
present.<br/><br/>
For more information on the underlying module, 
see the [`kafka` module](https://lib.ballerina.io/ballerinax/kafka/latest).

::: code ./examples/kafka-consumer-group-service/kafka_consumer_group_service.bal :::

::: out ./examples/kafka-consumer-group-service/kafka_consumer_group_service.out :::