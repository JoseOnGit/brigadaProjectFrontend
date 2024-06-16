import React, { FC, ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import {
  userErrorSelector,
  userLoadingSelector,
  userSelector,
  userStoreErrorSelector,
  userStoreLoadingSelector,
  userStoreSelector,
} from "../slices/user";
import {
  userRequestsErrorSelector,
  userRequestsLoadingSelector,
  userRequestsSelector,
  userRequestsUsersErrorSelector,
  userRequestsUsersLoadingSelector,
  userRequestsUsersSelector,
} from "../slices/userRequest";
import {
  storeRequestsErrorSelector,
  storeRequestsLoadingSelector,
  storeRequestsSelector,
  storeRequestsStoresErrorSelector,
  storeRequestsStoresLoadingSelector,
  storeRequestsStoresSelector,
} from "../slices/storeRequest";
import { Loader } from "./Loader";

type Props = {
  children: ReactNode;
};

const AppFetcher: FC<Props> = ({ children }) => {
  console.log("%c⧭ AppFetcher component is rendered.. ", "color: #00bf00");

  // Current User
  const currentUser = useAppSelector(userSelector);
  const currentUserLoading = useAppSelector(userLoadingSelector);
  const currentUserError = useAppSelector(userErrorSelector);
  console.log("%c⧭ currentUser ", "color: #f27999", currentUser);

  // Store for current User, if User is store-manager
  const store = useAppSelector(userStoreSelector);
  const storeLoading = useAppSelector(userStoreLoadingSelector);
  const storeError = useAppSelector(userStoreErrorSelector);
  console.log("%c⧭ store ", "color: #cc7033", store);

  // Requests made by User - user see his own, store-manager see all
  const userRequests = useAppSelector(userRequestsSelector);
  const userRequestsLoading = useAppSelector(userRequestsLoadingSelector);
  const userRequestsError = useAppSelector(userRequestsErrorSelector);
  console.log("%c⧭ userRequests ", "color: #86bf60", userRequests);

  //
  const userRequestsStores = useAppSelector(userRequestsUsersSelector);
  const userRequestsStoresLoading = useAppSelector(
    userRequestsUsersLoadingSelector
  );
  const userRequestsStoresError = useAppSelector(
    userRequestsUsersErrorSelector
  );
  console.log("%c⧭ userRequestsStores ", "color: #ace2e6", userRequestsStores);

  const storeRequests = useAppSelector(storeRequestsSelector);
  const storeRequestsLoading = useAppSelector(storeRequestsLoadingSelector);
  const storeRequestsError = useAppSelector(storeRequestsErrorSelector);
  console.log("%c⧭ storeRequests ", "color: #9c66cc", storeRequests);

  const storeRequestsUsers = useAppSelector(storeRequestsStoresSelector);
  const storeRequestsUsersLoading = useAppSelector(
    storeRequestsStoresLoadingSelector
  );
  const storeRequestsUsersError = useAppSelector(
    storeRequestsStoresErrorSelector
  );
  console.log("%c⧭ storeRequestsUsers ", "color: #ff0000", storeRequestsUsers);

  // if (!currentUser.id) {
  //   <Loader />;
  // }

  return <div>{children}</div>;
};

export { AppFetcher };
