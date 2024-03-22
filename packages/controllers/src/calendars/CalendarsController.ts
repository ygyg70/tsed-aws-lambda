import { Delete, Get, Post, Put } from "@tsed/schema";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Controller } from "@tsed/di";

@Controller("/calendars")
export class CalendarsController {
  @Get("/")
  async getCalendars() {
    return [
      {
        id: 1,
        name: "My calendar"
      }
    ];
  }

  @Get("/:id")
  async getCalendar(@PathParams("id") id: number) {
    return {
      id,
      name: "My calendar"
    };
  }

  @Post("/")
  async createCalendar(@BodyParams("name") name: string) {
    return {
      id: 1,
      name
    };
  }

  @Put("/:id")
  async updateCalendar(@PathParams("id") id: number, @BodyParams("name") name: string) {
    return {
      id,
      name
    };
  }

  @Delete("/:id")
  async deleteCalendar(@PathParams("id") id: number) {
    return {
      id
    };
  }
}
