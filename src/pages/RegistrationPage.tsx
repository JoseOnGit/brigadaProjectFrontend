import React, { FC, useMemo, useState } from "react";
import TXT from "../contexts/texts.json";
import { PageHeadline } from "../components/PageHeadline";
import { FormContainer } from "react-hook-form-mui";
import { useNavigate } from "react-router-dom";
import { FormSubmitButton } from "../components/FormSubmitButton";
import { EmployeeForm } from "../components/EmployeeForm";
import { getAddEmployeeApiCall } from "../api/apiCalls";
import { ApiCallResponse } from "../types/commonTypes";
import { ErrorMessage } from "../components/ErrorMessage";
import { EmployeeType } from "../types/employeeTypes";

const RegistrationPage: FC = () => {
  const navigate = useNavigate();

  const [response, setResponse] = useState<ApiCallResponse>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  console.log("%c⧭ response ", "color: #006dcc", response);

  const handleSubmit = (data: EmployeeType) => {
    console.log("%c⧭ data to submit ", "color: #917399", data);
    setLoading(true);

    getAddEmployeeApiCall(data, setResponse, setLoading, setError);

    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 2000);
  };

  const initialValues: EmployeeType = useMemo(
    () => ({
      name: "",
      surname: "",
      email: "",
      phone: "",
      avatar: "",
      base: "",
      isAdult: false,
      isCassa: false,
      isMerch: false,
      newPassword: "",
      newPasswordRepeat: "",
    }),
    []
  );

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      <PageHeadline
        headline={TXT.registrationPage.headline}
        hasBackButton
        bottomSpace="3rem"
      />
      <FormContainer defaultValues={initialValues} onSuccess={handleSubmit}>
        <EmployeeForm />

        <FormSubmitButton
          label={TXT.registrationPage.submitButon}
          loading={loading}
        />
      </FormContainer>
    </>
  );
};

export { RegistrationPage };
