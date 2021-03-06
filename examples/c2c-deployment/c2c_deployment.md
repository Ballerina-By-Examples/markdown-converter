# Kubernetes

Ballerina supports generating Docker and Kubernetes artifacts from code without any additional configuration.
This simplifies the experience of developing and deploying Ballerina code in the cloud.
Code to Cloud builds the containers and required artifacts by deriving the required values from the code.
If you want to override the default values taken by the compiler, you can use a `Cloud.toml` file. <br/><br/>
For more information, see [Code to Cloud deployment](/learn/run-ballerina-programs-in-the-cloud/code-to-cloud-deployment/).

::: code ./examples/c2c-deployment/c2c_deployment.bal :::

::: out ./examples/c2c-deployment/c2c_deployment.out :::