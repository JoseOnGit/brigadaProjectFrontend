import React, { FC, useState } from "react";
import { PageHeadline } from "../components/PageHeadline";
import { FormSection } from "../components/FormSection";
import Button from "@mui/material/Button";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { useNavigate } from "react-router-dom";

type EmployeeType = {
  name: string;
  surname: string;
  email: string;
  phone: string;
};

const RegistrationPage: FC = () => {
  let navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (data: EmployeeType) => {
    console.log("%c⧭ data to submit ", "color: #917399", data);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 2000);
  };

  const submitButtonLabel = loading ? "Pracuje se na tom..." : "Registrovat";

  const initialValues = { name: "", surname: "" };

  return (
    <>
      <PageHeadline headline="Registrace" bottomSpace="3rem" hasBackButton />
      <FormContainer defaultValues={initialValues} onSuccess={handleSubmit}>
        <FormSection
          headline="Kontaktní údaje"
          text="Zadej jméno, email a tel. číslo, aby tě store-manager poznal a mohl v prípadě potřeby kontaktovat."
        >
          <TextFieldElement
            name="name"
            label="Jméno"
            margin="normal"
            fullWidth
            required
          />
          <TextFieldElement
            name="surname"
            label="Příjmení"
            margin="normal"
            fullWidth
            required
          />
          <TextFieldElement
            name="email"
            label="Email"
            margin="normal"
            fullWidth
            required
          />
          <TextFieldElement
            name="phone"
            label="Tel. číslo"
            margin="normal"
            fullWidth
            required
          />
        </FormSection>
        <FormSection headline="Avatar">
          <div></div>
        </FormSection>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={loading}
          fullWidth
        >
          {submitButtonLabel}
        </Button>
      </FormContainer>
    </>
  );
};

export { RegistrationPage };
