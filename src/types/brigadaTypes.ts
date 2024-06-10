import { Dayjs } from "dayjs";

export type PickedDayType = {
  id?: number;
  day: string;
  timeStart: Dayjs | string;
  timeEnd: Dayjs | string;
  wholeDay: boolean;
  byStore: boolean;
};

export type RequestType = {
  id?: number;
  userId?: number;
  day: string;
  timeStart: Dayjs | string;
  timeEnd: Dayjs | string;
  wholeDay: boolean;
  byStore: boolean;
};
