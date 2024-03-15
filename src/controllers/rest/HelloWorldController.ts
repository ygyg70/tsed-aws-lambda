import {Controller} from "@tsed/di";
import { Get, Returns } from "@tsed/schema";

@Controller("/rest")
export class HelloWorldController {
  @Get("/hello-world")
  @Returns(200, String)
  get() {
    return "hello";
  }
}
