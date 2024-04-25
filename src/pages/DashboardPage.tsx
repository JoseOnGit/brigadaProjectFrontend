import React, { FC } from "react";
// import TXT from "../contexts/texts.json";
import AuthService from "../services/auth.service";
import { DashboardProfile } from "../components/DashboardProfile";
import { FormSubmitButton } from "../components/FormSubmitButton";
import { useNavigate } from "react-router-dom";
import TXT from "../contexts/texts.json";
import { getCalendarRoutePath } from "../routes/routePaths";

type Props = {};

const DashboardPage: FC<Props> = () => {
  console.log("🚀 ~ DashboardPage is rendered....");
  const navigate = useNavigate();

  const currentUser = AuthService.getCurrentUser();

  return (
    <>
      <DashboardProfile currentUser={currentUser} />
      <FormSubmitButton
        onClick={() => navigate(getCalendarRoutePath())}
        label={TXT.dashboardPage.calendarButton}
      />
    </>
  );
};

export { DashboardPage };
