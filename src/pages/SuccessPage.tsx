import React, { FC, ReactNode, useEffect } from "react";
import TXT from "../contexts/texts.json";
import { useNavigate, useParams } from "react-router-dom";
import { getDashboardRoutePath, getLoginRoutePath } from "../routes/routePaths";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";

export type SuccesPageTypes = "registration" | "login" | "confirmed";

type SuccessPageListType = {
  type: SuccesPageTypes;
  redirectTo: string;
  icon?: ReactNode; // TO BE DONE
  message?: string;
  subMessage?: string;
  delay?: number;
};

const successPageList: SuccessPageListType[] = [
  {
    type: "registration",
    redirectTo: getLoginRoutePath(),
    message: TXT.registrationPage.submitMessage,
    subMessage: TXT.registrationPage.submitSubMessage,
    delay: 8000,
  },
  {
    type: "login",
    redirectTo: getDashboardRoutePath(),
    message: TXT.loginPage.submitMessage,
  },
  {
    type: "confirmed",
    redirectTo: getDashboardRoutePath(),
    message: TXT.pickedDaysConfirmPage.submitMessage,
    delay: 8000,
  },
];
const SuccessMessageWrapper = styled("div")({
  width: "100%",
  height: "40vh",
  display: "flex",
  flexWrap: "wrap",
  alignContent: "flex-end",
  justifyContent: "center",
});

const SuccessPage: FC = () => {
  const navigate = useNavigate();
  const { type } = useParams();

  const page = successPageList.find((typeOfPage) => typeOfPage.type === type);

  const delayBeforeRedirect = page?.delay ?? 2000;

  useEffect(() => {
    setTimeout(() => {
      const path = page?.redirectTo || getDashboardRoutePath();
      navigate(path);
    }, delayBeforeRedirect);
  }, [page, delayBeforeRedirect, navigate]);

  return (
    <SuccessMessageWrapper>
      {page?.message && (
        <Typography
          align="center"
          variant="h5"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          {page.message}
        </Typography>
      )}
      {page?.subMessage && (
        <Typography
          align="center"
          variant="subtitle1"
          component="div"
          sx={{ flexGrow: 1, marginTop: "2rem" }}
        >
          {page.subMessage}
        </Typography>
      )}
    </SuccessMessageWrapper>
  );
};

export { SuccessPage };
