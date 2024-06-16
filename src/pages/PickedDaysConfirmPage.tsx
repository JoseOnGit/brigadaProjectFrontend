import React, { FC, useEffect } from "react";
import TXT from "../contexts/texts.json";
import { PageHeadline } from "../components/PageHeadline";
import { PickedDayByUserList } from "../components/PickedDayByUserList";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { NotificationType, RequestType } from "../types/requestTypes";
import {
  getCalendarRoutePath,
  getSuccessRoutePath,
} from "../routes/routePaths";
import { FormSubmitButton } from "../components/FormSubmitButton";
import { userSelector, userStoreSelector } from "../slices/user";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ROLE } from "../constants/commonConstants";
import {
  addUserRequest,
  userPickedDaysSelector,
  userRequestNotification,
} from "../slices/userRequest";
import {
  addStoreRequest,
  storePickedDaysSelector,
} from "../slices/storeRequest";
import { getWorkTime } from "../utils/commonUtils";

type Props = {};

const PickedDaysConfirmPage: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentUser = useAppSelector(userSelector);
  const isStore = currentUser && currentUser?.roles?.includes(ROLE.MODERATOR);
  const currentUserStore = useAppSelector(userStoreSelector);

  const pickedDays = useAppSelector(
    isStore ? storePickedDaysSelector : userPickedDaysSelector
  );

  useEffect(() => {
    if (pickedDays.length === 0) {
      navigate(getCalendarRoutePath());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickedDays]);

  const handleSubmit = () => {
    const userRequests: RequestType[] = pickedDays.map((pickedDay) => {
      return {
        userId: currentUser.id,
        ...pickedDay,
        byStore: false,
      };
    });

    // if we are store,
    // then send request with additional parameter 'byStore: true' and 'userId: base of current user'
    userRequests.map((request) => {
      const requestByStore = {
        ...request,
        userId: currentUser.base.id,
        byStore: true,
      };

      const notification: NotificationType = {
        id: isStore
          ? `store-${currentUserStore?.id}-${request.day}`
          : `user-${currentUser.id}-${request.day}`,
        userId: isStore ? currentUserStore?.id || 0 : currentUser.id,
        name: isStore
          ? currentUserStore?.name || ""
          : `${currentUser.name} ${currentUser.surname}`,
        date: request.day,
        time: getWorkTime(request),
        byStore: isStore,
      };
      dispatch(
        isStore ? addStoreRequest(requestByStore) : addUserRequest(request)
      );
      dispatch(userRequestNotification(notification));

      return null;
    });

    navigate(getSuccessRoutePath("confirmed"));
  };

  return (
    <div>
      <PageHeadline
        headline={TXT.pickedDaysConfirmPage.headline}
        bottomSpace="3rem"
      />

      <PickedDayByUserList pickedDays={pickedDays} type="selected" />
      <Button
        variant="text"
        color="primary"
        size="large"
        fullWidth
        sx={{ marginTop: "1rem", padding: "1rem 0rem" }}
        onClick={() => navigate(getCalendarRoutePath())}
      >
        {TXT.pickedDaysConfirmPage.backButton}
      </Button>
      <FormSubmitButton
        onClick={handleSubmit}
        label={TXT.pickedDaysConfirmPage.submitButton}
      />
    </div>
  );
};

export { PickedDaysConfirmPage };
