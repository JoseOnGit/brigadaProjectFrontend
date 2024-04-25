import { Dayjs } from "dayjs";

export type PickedDayType = {
  day: string;
  timeStart: Dayjs | string;
  timeEnd: Dayjs | string;
  wholeDay: boolean;
};
