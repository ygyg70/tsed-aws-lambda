import {PlatformServerless} from "@tsed/platform-serverless";
import {TestLambdaController} from "./lambda/TestLambdaController";
import { HelloLambdaController } from "./lambda/HelloLambdaController";
import { HelloWorldController } from "./controllers/rest";

const platform = PlatformServerless.bootstrap({
  lambda: [TestLambdaController, HelloLambdaController, HelloWorldController]
  // put your Application configuration here
});

// then export the lambda
export const handler= platform.handler();
