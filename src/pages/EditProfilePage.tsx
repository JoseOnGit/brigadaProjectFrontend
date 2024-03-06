import React, { FC, useContext, useMemo, useState } from "react";
import TXT from "../contexts/texts.json";
import { ApiCallResponse } from "../types/commonTypes";
import { PageHeadline } from "../components/PageHeadline";
import { ErrorMessage } from "../components/ErrorMessage";
import { FormContainer } from "react-hook-form-mui";
import { EmployeeForm } from "../components/EmployeeForm";
import { FormSubmitButton } from "../components/FormSubmitButton";
import { EmployeeType } from "../types/employeeTypes";
import { useNavigate } from "react-router-dom";

type Props = {};

const EditProfilePage: FC<Props> = () => {
  console.log("🚀 ~ ProfilePage is rendered....");
  const navigate = useNavigate();

  const user = {} as any;

  const [response, setResponse] = useState<ApiCallResponse>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const initialValues: EmployeeType = useMemo(
    () => ({
      name: user?.Name || "",
      surname: user?.Surname || "",
      email: user?.Email || "",
      phone: user?.Phone || "",
      avatar: user?.Avatar || "",
      base: user?.Base || "",
      isAdult: !!user?.isAdult,
      isCassa: !!user?.isCassa,
      isMerch: !!user?.isMerch,
      password: user?.Password || "",
      newPassword: "",
      newPasswordRepeat: "",
    }),
    [user]
  );

  const handleSubmit = (data: EmployeeType) => {
    console.log("%c⧭ data to submit ", "color: #917399", data);
    setLoading(true);

    // getAddEmployeeApiCall(data, setResponse, setLoading, setError);
    // vytvorit endpoint pre update()

    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 2000);
  };

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      <PageHeadline
        headline={TXT.profilePage.headline}
        hasBackButton
        bottomSpace="3rem"
      />
      <FormContainer defaultValues={initialValues} onSuccess={handleSubmit}>
        <EmployeeForm />

        <FormSubmitButton
          label={TXT.profilePage.submitButon}
          loading={loading}
        />
      </FormContainer>
    </>
  );
};

export { EditProfilePage };
