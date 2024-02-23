import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import {
  getProfileRoutePath,
  getRegistrationRoutePath,
} from "../routes/routePaths";
import { PageHeadline } from "../components/PageHeadline";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import TXT from "../contexts/texts.json";
import {
  FormContainer,
  PasswordElement,
  TextFieldElement,
} from "react-hook-form-mui";
import { FormSubmitButton } from "../components/FormSubmitButton";
import { textFieldBasicProps } from "../constants/commonConstants";
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

const LoginPage: FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const { user, login } = useContext(AuthContext);

  const initialValues = useMemo(
    () => ({
      email: "",
      password: "",
    }),
    []
  );

  useEffect(() => {
    if (user?.ID) {
      navigate(getProfileRoutePath(user.ID));
      setLoading(false);
    }
  }, [user, navigate]);

  const handleSubmit = (data: any) => {
    setLoading(true);
    login(1, data, false);
  };

  return (
    <>
      <PageHeadline headline={TXT.loginPage.headline} />
      <Typography paragraph>
        {TXT.loginPage.newUser}{" "}
        <Link href={getRegistrationRoutePath()}>
          {TXT.loginPage.registrationLink}
        </Link>
      </Typography>
      <FormContainer defaultValues={initialValues} onSuccess={handleSubmit}>
        <TextFieldElement
          name="email"
          label={TXT.registrationPage.section.contact.label.email}
          type="email"
          {...textFieldBasicProps}
        />
        <PasswordElement
          name="password"
          label={TXT.registrationPage.section.password.label.password}
          {...textFieldBasicProps}
        />
        <FormSubmitButton label={TXT.loginPage.loginButton} loading={loading} />
      </FormContainer>
    </>
  );
};

export { LoginPage };
