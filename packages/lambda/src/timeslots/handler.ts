import { TimeslotsController } from "@project/controllers/timeslots/TimeslotsController";
import { PlatformServerless } from "@tsed/platform-serverless";

export const getTimeslots = PlatformServerless.callback(TimeslotsController, "getTimeslots");
