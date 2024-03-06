import React, { FC, useEffect } from "react";
import TXT from "../contexts/texts.json";
import { useNavigate, useParams } from "react-router-dom";
import { getDashboardRoutePath, getLoginRoutePath } from "../routes/routePaths";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";

export type SuccesPageTypes = "registration" | "login";

const successPage = [
  {
    type: "registration",
    redirectTo: getLoginRoutePath(),
    message: TXT.registrationPage.submitMessage,
  },
  {
    type: "login",
    redirectTo: getDashboardRoutePath(),
    message: TXT.loginPage.submitMessage,
  },
];

const SuccessMessageWrapper = styled.div`
  width: 100%;
  height: 40vh;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-end;
  justify-content: center;
`;

const SuccessPage: FC = () => {
  const navigate = useNavigate();
  const { type } = useParams();

  const page = successPage.find((typeOfPage) => typeOfPage.type === type);

  useEffect(() => {
    setTimeout(() => {
      const path = page?.redirectTo || getDashboardRoutePath();
      navigate(path);
    }, 2000);
  }, [page, navigate]);

  return (
    <SuccessMessageWrapper>
      <Typography
        align="center"
        variant="h5"
        component="div"
        sx={{ flexGrow: 1 }}
      >
        {page?.message}
      </Typography>
    </SuccessMessageWrapper>
  );
};

export { SuccessPage };
