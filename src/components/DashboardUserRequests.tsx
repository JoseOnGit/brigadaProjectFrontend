import React, { FC, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  userPickedDaysSelector,
  userRequestsSelector,
} from "../slices/userRequest";
import { CurrentUserType } from "../types/userTypes";
import {
  getStoreInfo,
  storeRequestsSelector,
  storeRequestsStoresSelector,
} from "../slices/storeRequest";
import { PickedDayByUserList } from "./PickedDayByUserList";
import { RequestByStoreList } from "./RequestByStoreList";

const DashboardUserRequests: FC = () => {
  const dispatch = useAppDispatch();

  const userRequests = useAppSelector(userRequestsSelector);

  const storeRequests = useAppSelector(storeRequestsSelector);
  const storeRequestsStores = useAppSelector(storeRequestsStoresSelector);

  const pickedDays = useAppSelector(userPickedDaysSelector);

  const uniqueStores = useMemo(() => {
    return storeRequests
      .map((request) => request.userId)
      .filter((value, index, self) => self.indexOf(value) === index);
  }, [storeRequests]);

  useEffect(() => {
    if (uniqueStores)
      uniqueStores.map((uniqueStore) => {
        const alreadyFetchedStore =
          storeRequestsStores.find(
            (requestsStore) => requestsStore.id === uniqueStore
          ) || ({} as CurrentUserType);

        if (!alreadyFetchedStore.id) {
          dispatch(getStoreInfo(uniqueStore || 0));
        }

        return null;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uniqueStores]);

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
