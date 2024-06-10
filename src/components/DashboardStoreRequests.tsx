import React, { FC } from "react";
import { useAppSelector } from "../redux/hooks";
import { userPickedDaysSelector } from "../slices/userRequest";
import { RequestByUserList } from "./RequestByUserList";
import { PickedDaysList } from "./PickedDaysList";
import { RequestType } from "../types/brigadaTypes";

type Props = {
  requests: RequestType[];
};

const DashboardStoreRequests: FC<Props> = ({ requests }) => {
  const pickedDays = useAppSelector(userPickedDaysSelector);

  return (
    <div>
      {requests.length !== 0 && <RequestByUserList requests={requests} />}

      {pickedDays.length !== 0 && (
        <PickedDaysList pickedDays={pickedDays} type="selected" />
      )}
    </div>
  );
};

export { DashboardStoreRequests };
