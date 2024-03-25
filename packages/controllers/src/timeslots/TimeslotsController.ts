import { Controller } from "@tsed/di";
import { PathParams } from "@tsed/platform-params";
import { Get, Max } from "@tsed/schema";

@Controller("/timeslots")
export class TimeslotsController {
  @Get("/")
  async getTimeslots() {
    return [
      {
        id: 8,
        name: "Timeslot 1"
      }
    ];
  }

  @Get("/:id")
  async getTimeslotById(@PathParams("id") @Max(50) id: number) {
    return {
      id: id,
      name: `Timeslot ${id}`
    };
  }
}
