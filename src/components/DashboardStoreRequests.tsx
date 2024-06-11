import React, { FC, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  getUserInfo,
  userPickedDaysSelector,
  userRequestsSelector,
  userRequestsUsersSelector,
} from "../slices/userRequest";
import { RequestByUserList } from "./RequestByUserList";
import { CurrentUserType } from "../types/userTypes";
import { storeRequestsSelector } from "../slices/storeRequest";
import { PickedDayByStoreList } from "./PickedDayByStoreList";

const DashboardStoreRequests: FC = () => {
  const dispatch = useAppDispatch();

  const userRequests = useAppSelector(userRequestsSelector);
  const userRequestsUsers = useAppSelector(userRequestsUsersSelector);

  const storeRequests = useAppSelector(storeRequestsSelector);
  console.log("%c⧭ storeRequests ", "color: #00a3cc", storeRequests);

  const pickedDays = useAppSelector(userPickedDaysSelector);

  const uniqueUsers = useMemo(() => {
    return userRequests
      .map((request) => request.userId)
      .filter((value, index, self) => self.indexOf(value) === index);
  }, [userRequests]);

  useEffect(() => {
    if (uniqueUsers)
      uniqueUsers.map((uniqueUser) => {
        const alreadyFetchedUser =
          userRequestsUsers.find(
            (requestsUser) => requestsUser.id === uniqueUser
          ) || ({} as CurrentUserType);

        if (!alreadyFetchedUser.id) {
          dispatch(getUserInfo(uniqueUser || 0));
        }

        return null;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uniqueUsers]);
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
