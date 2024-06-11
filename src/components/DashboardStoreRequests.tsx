import React, { FC } from "react";
import { useAppSelector } from "../redux/hooks";
import { userRequestsSelector } from "../slices/userRequest";
import { RequestByUserList } from "./RequestByUserList";
import {
  storePickedDaysSelector,
  storeRequestsSelector,
} from "../slices/storeRequest";
import { PickedDayByStoreList } from "./PickedDayByStoreList";

const DashboardStoreRequests: FC = () => {
  const userRequests = useAppSelector(userRequestsSelector);
  const storeRequests = useAppSelector(storeRequestsSelector);
  const pickedDays = useAppSelector(storePickedDaysSelector);

  return (
    <div>
      {storeRequests.length !== 0 && (
        <PickedDayByStoreList pickedDays={storeRequests} type="confirmed" />
      )}
      {pickedDays.length !== 0 && (
        <PickedDayByStoreList pickedDays={pickedDays} type="selected" />
      )}
      {userRequests.length !== 0 && (
        <RequestByUserList requests={userRequests} />
      )}
    </div>
  );
};

export { DashboardStoreRequests };
