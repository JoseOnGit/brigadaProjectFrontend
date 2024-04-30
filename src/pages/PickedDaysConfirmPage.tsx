import React, { FC, useEffect } from "react";
import TXT from "../contexts/texts.json";
import { PageHeadline } from "../components/PageHeadline";
import { PickedDaysList } from "../components/PickedDaysList";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { addToStorageList, removeStorageList } from "../utils/storageUtils";
import { RequestType } from "../types/brigadaTypes";
import {
  getCalendarRoutePath,
  getSuccessRoutePath,
} from "../routes/routePaths";
import { FormSubmitButton } from "../components/FormSubmitButton";
import { userSelector, pickedDaysSelector } from "../slices/user";
import { useAppSelector } from "../redux/hooks";

type Props = {};

const PickedDaysConfirmPage: FC<Props> = () => {
  const navigate = useNavigate();

  const currentUser = useAppSelector(userSelector);
  const pickedDays = useAppSelector(pickedDaysSelector);

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

    userRequest.map((request) => addToStorageList("reqestsUser", request));
    removeStorageList("pickedDays");
    navigate(getSuccessRoutePath("confirmed"));
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
