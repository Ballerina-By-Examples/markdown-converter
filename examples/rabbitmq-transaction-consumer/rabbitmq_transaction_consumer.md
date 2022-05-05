# Transactional consumer

The messages are consumed from an
existing queue using the Ballerina RabbitMQ message listener
and Ballerina transactions.
Upon successful execution of the transaction block,
the acknowledgement will commit or rollback in the case of any error.
Messages will not be re-queued in the case of a rollback
automatically unless negatively acknowledged by the user.
For more information on the underlying module,
see the [RabbitMQ module](https://docs.central.ballerina.io/ballerinax/rabbitmq/latest).

::: code ./examples/rabbitmq-transaction-consumer/rabbitmq_transaction_consumer.bal :::

::: out ./examples/rabbitmq-transaction-consumer/rabbitmq_transaction_consumer.out :::