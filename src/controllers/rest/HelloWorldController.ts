import {Controller, Inject} from "@tsed/di";
import { Get, Returns } from "@tsed/schema";
import {GreetingService} from "../../services/greeting-service";

@Controller("/rest")
export class HelloWorldController {
  @Inject()
  private greetingService: GreetingService;

  @Get("/hello-world")
  @Returns(200, String)
  get() {
    return this.greetingService.greet( "world");
  }
}
