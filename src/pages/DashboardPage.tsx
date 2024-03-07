import React, { FC } from "react";
// import TXT from "../contexts/texts.json";
import AuthService from "../services/auth.service";
import { DashboardProfile } from "../components/DashboardProfile";

type Props = {};

const DashboardPage: FC<Props> = () => {
  console.log("🚀 ~ DashboardPage is rendered....");

  const currentUser = AuthService.getCurrentUser();

  return (
    <>
      <DashboardProfile currentUser={currentUser} />
    </>
  );
};

export { DashboardPage };
