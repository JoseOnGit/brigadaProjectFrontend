import React, { FC, useEffect, useMemo, useState } from "react";
import TXT from "../contexts/texts.json";
import { PageHeadline } from "../components/PageHeadline";
import {
  FormContainer,
  PasswordElement,
  TextFieldElement,
} from "react-hook-form-mui";
import { FormSubmitButton } from "../components/FormSubmitButton";
import { ApiCallResponse } from "../types/commonTypes";
import AuthService from "../services/auth.service";
import { authMessage, textFieldBasicProps } from "../constants/commonConstants";
import { FormErrorHandler } from "../components/FormErrorHandler";
import { getRegistrationSuccessRoutePath } from "../routes/routePaths";
import { useNavigate } from "react-router-dom";

const RegistrationPage2: FC = () => {
  const navigate = useNavigate();

  const [response, setResponse] = useState<ApiCallResponse>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (response?.message === authMessage.userRegisteredSuccessfully) {
      navigate(getRegistrationSuccessRoutePath());
    }
  }, [response, navigate]);

  const handleSubmit = (data: any) => {
    setLoading(true);

    AuthService.register(data.username, data.email, data.password)
      .then(
        (response) => {
          setResponse({
            message: response.data.message,
          });
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
      email: "",
      password: "",
    }),
    []
  );

  return (
    <>
      <PageHeadline
        headline={TXT.registrationPage.headline}
        hasBackButton
        bottomSpace="3rem"
      />

      <FormContainer defaultValues={initialValues} onSuccess={handleSubmit}>
        <FormErrorHandler error={error}>
          <TextFieldElement
            name="username"
            label={TXT.registrationPage.section.contact.label.name}
            {...textFieldBasicProps}
          />
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
          <FormSubmitButton
            label={TXT.registrationPage.submitButon}
            loading={loading}
          />
        </FormErrorHandler>
      </FormContainer>
    </>
  );
};

export { RegistrationPage2 };
