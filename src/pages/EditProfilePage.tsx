import React, { FC, useMemo, useState } from "react";
import TXT from "../contexts/texts.json";
import { PageHeadline } from "../components/PageHeadline";
import { FormContainer } from "react-hook-form-mui";
import { FormSubmitButton } from "../components/FormSubmitButton";
import { EmployeeType } from "../types/employeeTypes";
import { useNavigate } from "react-router-dom";

const EditProfilePage: FC = () => {
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const user = {} as any;

  const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string>("");

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

  return (
    <>
      <PageHeadline
        headline={TXT.profilePage.headline}
        hasBackButton
        bottomSpace="3rem"
      />
      <FormContainer defaultValues={initialValues} onSuccess={handleSubmit}>
        {/* <EmployeeForm /> */}

        <FormSubmitButton
          label={TXT.profilePage.submitButton}
          loading={loading}
        />
      </FormContainer>
    </>
  );
};

export { EditProfilePage };
