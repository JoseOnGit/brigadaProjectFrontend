import { Dayjs } from "dayjs";
import { ToastPosition } from "react-toastify";

export type PickedDayType = {
  id?: number;
  day: string;
  timeStart: Dayjs | string;
  timeEnd: Dayjs | string;
  wholeDay: boolean;
  byStore: boolean;
  level: number;
};

export type RequestType = {
  id?: number;
  userId?: number;
  day: string;
  timeStart: Dayjs | string;
  timeEnd: Dayjs | string;
  wholeDay: boolean;
  byStore: boolean;
  level: number;
};

export type NotificationType = {
  id: string;
  userId: number;
  name: string;
  date: string;
  time: string;
  byStore: boolean;
};

export type NotificationOption = {
  position: ToastPosition | undefined;
  autoClose: number | false | undefined;
  hideProgressBar: boolean;
  closeOnClick: boolean;
  pauseOnHover: boolean;
  draggable: boolean;
  progress: undefined;
  theme: string;
  onClose?: () => void;
  toastId?: string;
};
