# Lambda

This package contains the lambda function that is used to process the incoming data from the IoT devices.

## Installation

Install the localstack CLI:

```sh
brew install localstack/tap/localstack-cli
```
> See more detail for all operating system: https://docs.localstack.cloud/getting-started/installation/#localstack-cli

## Start the localstack

```sh
docker compose up
```

Then check if the localstack configuration is correct:

```sh
localstack config validate
```

