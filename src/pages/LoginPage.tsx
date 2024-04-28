import React, { FC, useMemo } from "react";
import TXT from "../contexts/texts.json";
import { PageHeadline } from "../components/PageHeadline";
import {
  FormContainer,
  PasswordElement,
  TextFieldElement,
} from "react-hook-form-mui";
import { FormSubmitButton } from "../components/FormSubmitButton";
import { textFieldBasicProps } from "../constants/commonConstants";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import {
  getRegistrationRoutePath,
  getSuccessRoutePath,
} from "../routes/routePaths";
import { FormErrorHandler } from "../components/FormErrorHandler";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { login, userErrorSelector, userLoadingSelector } from "../slices/user";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userStatus = useAppSelector(userLoadingSelector);
  const userError = useAppSelector(userErrorSelector);

  const handleSubmit = (data: any) => {
    const { email, password } = data;

    dispatch(login({ email, password })).then((response) => {
      navigate(getSuccessRoutePath("login"));
    });
  };

  const initialValues = useMemo(
    () => ({
      email: "",
      password: "",
    }),
    []
  );

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
        <FormErrorHandler error={userError}>
          <TextFieldElement
            name="email"
            label={TXT.registrationPage.section.contact.label.email}
            {...textFieldBasicProps}
          />
          <PasswordElement
            name="password"
            label={TXT.registrationPage.section.password.label.password}
            {...textFieldBasicProps}
          />
          <FormSubmitButton
            label={TXT.loginPage.loginButton}
            loading={userStatus === "loading"}
          />
        </FormErrorHandler>
      </FormContainer>
    </>
  );
};

export { LoginPage };
