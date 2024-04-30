import React, { FC, useMemo, useState } from "react";
import TXT from "../contexts/texts.json";
import { PageHeadline } from "../components/PageHeadline";
import { FormContainer } from "react-hook-form-mui";
import { FormSubmitButton } from "../components/FormSubmitButton";
import { FormErrorHandler } from "../components/FormErrorHandler";
import { getSuccessRoutePath } from "../routes/routePaths";
import { useNavigate } from "react-router-dom";
import { ProfileForm } from "../components/ProfileForm";
import { register } from "../slices/user";
import { useAppDispatch } from "../redux/hooks";

const RegistrationPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = (data: any) => {
    setLoading(true);

    const newUser = {
      name: data.name,
      surname: data.surname,
      email: data.email,
      phone: data.phone,
      baseId: data.baseId,
      onboardDate: data.onboardDate,
      level: data.level,
      password: data.password,
    };

    dispatch(register(newUser))
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
      baseId: "",
      onboardDate: "",
      level: null,
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
            label={TXT.registrationPage.submitButton}
            loading={loading}
          />
        </FormErrorHandler>
      </FormContainer>
    </>
  );
};

export { RegistrationPage };
