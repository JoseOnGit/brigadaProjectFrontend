import React, { FC } from "react";
import { PickedDayType } from "../types/brigadaTypes";
import { getFromStorage } from "../utils/storageUtils";
import { PickedDay } from "./PickedDay";
import dayjs from "dayjs";

type Props = {};

const PickedDaysList: FC<Props> = () => {
  const pickedDays: PickedDayType[] = getFromStorage("pickedDays");
  console.log("%c⧭ pickedDays ", "color: #007300", pickedDays);

  return (
    <div>
      {pickedDays
        .sort((a, b) => dayjs(a.day).valueOf() - dayjs(b.day).valueOf())
        .map((day, index) => (
          <PickedDay key={index} pickedDay={day} type="selected" />
        ))}
    </div>
  );
};

export { PickedDaysList };
