# Publish/subscribe

This sample demonstrates a basic publish/subscribe implementation of the NATS Streaming client
In order to run this sample, a NATS Streaming server should be
running on the corresponding port used in the sample.<br/><br/>
For more information on the underlying module, 
see the [STAN module](https://docs.central.ballerina.io/ballerinax/stan/latest).


::: code ./examples/nats-streaming-pub-sub/publisher.bal :::

::: out ./examples/nats-streaming-pub-sub/publisher.out :::

::: code ./examples/nats-streaming-pub-sub/subscriber.bal :::

::: out ./examples/nats-streaming-pub-sub/subscriber.out :::