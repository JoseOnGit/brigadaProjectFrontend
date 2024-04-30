import React, { FC, useMemo } from "react";
import TXT from "../contexts/texts.json";
import { PageHeadline } from "../components/PageHeadline";
import {
  FormContainer,
  PasswordElement,
  TextFieldElement,
} from "react-hook-form-mui";
import { FormSubmitButton } from "../components/FormSubmitButton";
import { TEXT_FIELD_COMMON_PROPS } from "../constants/commonConstants";
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
      if (!response.payload.response?.data?.message) {
        navigate(getSuccessRoutePath("login"));
        // window.location.reload();
      }
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
        <Link onClick={() => navigate(getRegistrationRoutePath())}>
          {TXT.loginPage.registrationLink}
        </Link>
      </Typography>

      <FormContainer defaultValues={initialValues} onSuccess={handleSubmit}>
        <FormErrorHandler error={userError}>
          <TextFieldElement
            name="email"
            label={TXT.registrationPage.section.contact.label.email}
            {...TEXT_FIELD_COMMON_PROPS}
          />
          <PasswordElement
            name="password"
            label={TXT.registrationPage.section.password.label.password}
            {...TEXT_FIELD_COMMON_PROPS}
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
