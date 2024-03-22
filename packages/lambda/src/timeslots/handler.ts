import { TimeslotsController } from "@project/controllers/timeslots/TimeslotsController";
import { PlatformServerless } from "@tsed/platform-serverless";

const platform = PlatformServerless.bootstrap({
  lambda: [TimeslotsController]
});

// then export the lambda
export const { getTimeslots } = platform.callbacks();
