import {Controller} from "@tsed/di";
import {Get, Returns} from "@tsed/schema";

@Controller("/helloworld")
export class HelloLambdaController {
  @Get("/")
  @Returns(200, String)
  get() {
    return "hello lambda";
  }
}
