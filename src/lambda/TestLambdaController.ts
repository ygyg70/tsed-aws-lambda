import {Controller} from "@tsed/di";
import {Get, Returns} from "@tsed/schema";

@Controller("/testlambda")
export class TestLambdaController {

  @Get("/")
  @Returns(200, Array).Of(String)
  get() {
    return ["test", "foo", "bar"];
  }
}
