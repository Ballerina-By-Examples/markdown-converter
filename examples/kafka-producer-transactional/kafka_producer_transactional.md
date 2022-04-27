# Transactional producer

This example shows you how to do transactional message producing by sending
messages to kafka brokers atomically using the `kafka:Producer` object. For
this example to work properly, an active Kafka broker should be present.
<br/><br/>
For more information on the underlying module, 
see the [Kafka module](https://docs.central.ballerina.io/ballerinax/kafka/latest).


::: code ./examples/kafka-producer-transactional/kafka_producer_transactional.bal :::

::: out ./examples/kafka-producer-transactional/kafka_producer_transactional.out :::