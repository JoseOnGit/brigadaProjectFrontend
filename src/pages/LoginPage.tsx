import React, { FC } from "react";
import { Link, Typography } from "@mui/material";
import { getRegistrationRoutePath } from "../routes/routePaths";
import { PageHeadline } from "../components/PageHeadline";

type Props = {};

const LoginPage: FC<Props> = () => {
  console.log("%c⧭ LoginPage component is rendered.. ", "color: #00bf00");

  return (
    <>
      <PageHeadline text="Přihlášení" />
      <Typography paragraph={true}>
        Nový užívatel? <Link href={getRegistrationRoutePath()}>Registrace</Link>
      </Typography>
    </>
  );
};

export { LoginPage };
