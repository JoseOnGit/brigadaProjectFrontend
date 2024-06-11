import React, { FC } from "react";
import { useAppSelector } from "../redux/hooks";
import {
  userPickedDaysSelector,
  userRequestsSelector,
} from "../slices/userRequest";
import { storeRequestsSelector } from "../slices/storeRequest";
import { PickedDayByUserList } from "./PickedDayByUserList";
import { RequestByStoreList } from "./RequestByStoreList";

const DashboardUserRequests: FC = () => {
  const userRequests = useAppSelector(userRequestsSelector);
  const storeRequests = useAppSelector(storeRequestsSelector);
  const pickedDays = useAppSelector(userPickedDaysSelector);

  return (
    <div>
      {userRequests.length !== 0 && (
        <PickedDayByUserList pickedDays={userRequests} type="confirmed" />
      )}
      {pickedDays.length !== 0 && (
        <PickedDayByUserList pickedDays={pickedDays} type="selected" />
      )}
      {storeRequests.length !== 0 && (
        <RequestByStoreList requests={storeRequests} />
      )}
    </div>
  );
};

export { DashboardUserRequests };
