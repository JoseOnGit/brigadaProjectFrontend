import React, { FC, useMemo, useState } from "react";
import TXT from "../contexts/texts.json";
import { PageHeadline } from "../components/PageHeadline";
import { FormContainer } from "react-hook-form-mui";
import { FormSubmitButton } from "../components/FormSubmitButton";
import AuthService from "../services/auth.service";
import { FormErrorHandler } from "../components/FormErrorHandler";
import { getSuccessRoutePath } from "../routes/routePaths";
import { useNavigate } from "react-router-dom";
import { ProfileForm } from "../components/ProfileForm";

const RegistrationPage: FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = (data: any) => {
    setLoading(true);

    AuthService.register(
      data.name,
      data.surname,
      data.email,
      data.phone,
      data.password
    )
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
      name: "",
      surname: "",
      email: "",
      phone: "",
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
          <ProfileForm />

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
