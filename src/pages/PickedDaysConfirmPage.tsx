import React, { FC, useEffect } from "react";
import TXT from "../contexts/texts.json";
import AuthService from "../services/auth.service";
import { PageHeadline } from "../components/PageHeadline";
import { PickedDaysList } from "../components/PickedDaysList";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import {
  addToStorageList,
  getFromStorage,
  removeStorageList,
} from "../utils/storageUtils";
import { PickedDayType, RequestType } from "../types/brigadaTypes";
import {
  getCalendarRoutePath,
  getSuccessRoutePath,
} from "../routes/routePaths";
import { FormSubmitButton } from "../components/FormSubmitButton";

type Props = {};

const PickedDaysConfirmPage: FC<Props> = () => {
  const navigate = useNavigate();

  const currentUser = AuthService.getCurrentUser();
  const pickedDays: PickedDayType[] = getFromStorage("pickedDays");

  useEffect(() => {
    if (pickedDays.length === 0) {
      navigate(getCalendarRoutePath());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickedDays]);

  const handleSubmit = () => {
    const userRequest: RequestType[] = pickedDays.map((pickedDay) => {
      return {
        userId: currentUser.id,
        ...pickedDay,
      };
    });
    navigate(getSuccessRoutePath("confirmed"));

    userRequest.map((request) => addToStorageList("reqestsUser", request));
    removeStorageList("pickedDays", true);
  };

  return (
    <div>
      <PageHeadline
        headline={TXT.pickedDaysConfirmPage.headline}
        bottomSpace="3rem"
      />

      <PickedDaysList pickedDays={pickedDays} type="selected" />
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
