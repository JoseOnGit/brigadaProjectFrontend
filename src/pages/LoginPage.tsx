import React, { FC, useMemo, useState } from "react";
import TXT from "../contexts/texts.json";
import { PageHeadline } from "../components/PageHeadline";
import {
  FormContainer,
  PasswordElement,
  TextFieldElement,
} from "react-hook-form-mui";
import { FormSubmitButton } from "../components/FormSubmitButton";
import AuthService from "../services/auth.service";
import { textFieldBasicProps } from "../constants/commonConstants";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import {
  getRegistrationRoutePath,
  getSuccessRoutePath,
} from "../routes/routePaths";
import { FormErrorHandler } from "../components/FormErrorHandler";
import { useNavigate } from "react-router-dom";

const LoginPage: FC = () => {
  console.log("🚀 ~ LoginPage is rendered....");
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = (data: any) => {
    setLoading(true);

    AuthService.login(data.username, data.password)
      .then(
        () => {
          navigate(getSuccessRoutePath("login"));
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setError(resMessage);
        }
      )
      .finally(() => setLoading(false));
  };

  const initialValues = useMemo(
    () => ({
      username: "",
      password: "",
    }),
    []
  );

  return (
    <>
      <PageHeadline headline={TXT.loginPage.headline} hasBackButton />

      <Typography paragraph>
        {TXT.loginPage.newUser}{" "}
        <Link href={getRegistrationRoutePath()}>
          {TXT.loginPage.registrationLink}
        </Link>
      </Typography>

      <FormContainer defaultValues={initialValues} onSuccess={handleSubmit}>
        <FormErrorHandler error={error}>
          <TextFieldElement
            name="username"
            label={TXT.registrationPage.section.contact.label.name}
            {...textFieldBasicProps}
          />
          <PasswordElement
            name="password"
            label={TXT.registrationPage.section.password.label.password}
            {...textFieldBasicProps}
          />
          <FormSubmitButton
            label={TXT.loginPage.loginButton}
            loading={loading}
          />
        </FormErrorHandler>
      </FormContainer>
    </>
  );
};

export { LoginPage };
