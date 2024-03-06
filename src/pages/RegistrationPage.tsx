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
import { FormErrorHandler } from "../components/FormErrorHandler";
import { getSuccessRoutePath } from "../routes/routePaths";
import { useNavigate } from "react-router-dom";

const RegistrationPage: FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = (data: any) => {
    setLoading(true);

    AuthService.register(data.username, data.email, data.password)
      .then(
        () => {
          navigate(getSuccessRoutePath("registration"));
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

export { RegistrationPage };
