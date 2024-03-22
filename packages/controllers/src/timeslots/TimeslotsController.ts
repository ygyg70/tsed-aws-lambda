import { Controller } from "@tsed/di";
import { Get } from "@tsed/schema";

@Controller("/timeslots")
export class TimeslotsController {
  @Get("/")
  async getTimeslots() {
    return [
      {
        id: 1,
        name: "Timeslot 1"
      }
    ];
  }
}
