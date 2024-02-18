import React, { FC } from "react";
import { getRegistrationRoutePath } from "../routes/routePaths";
import { PageHeadline } from "../components/PageHeadline";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

type Props = {};

const LoginPage: FC<Props> = () => {
  console.log("%c⧭ LoginPage component is rendered.. ", "color: #00bf00");

  return (
    <>
      <PageHeadline headline="Přihlášení" />
      <Typography paragraph>
        Nový užívatel? <Link href={getRegistrationRoutePath()}>Registrace</Link>
      </Typography>
    </>
  );
};

export { LoginPage };
