# Kubernetes

Ballerina supports generating Docker and Kubernetes artifacts from code without any additional configuration.
This simplifies the experience of developing and deploying Ballerina code in the cloud.
Code to cloud builds the containers and required artifacts by deriving the required values from the code.
If you want to override the default values taken by the compiler, you can use a `Cloud.toml` file. <br/><br/>
For more information, see [Code to Cloud Deployment](/learn/deployment/code-to-cloud).


::: code ./examples/c2c-deployment/c2c_deployment.bal :::

::: out ./examples/c2c-deployment/c2c_deployment.out :::