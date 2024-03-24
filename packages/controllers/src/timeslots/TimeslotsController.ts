import { Controller } from "@tsed/di";
import { Get } from "@tsed/schema";

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
  async getTimeslotById() {
    return {
      id: 1,
      name: "Timeslot 1"
    };
  }
}
