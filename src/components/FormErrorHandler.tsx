import React, { FC, ReactNode, useEffect } from "react";
import TXT from "../contexts/texts.json";
import Alert from "@mui/material/Alert";
import { authMessage } from "../constants/commonConstants";
import { FieldError, FormErrorProvider } from "react-hook-form-mui";

type Props = {
  children: ReactNode;
  error: string | null;
};

const FormErrorHandler: FC<Props> = ({ children, error }) => {
  useEffect(() => {
    if (error) {
      window.scrollTo(0, 0);
    }
  }, [error]);

  const getServerMessage = (response: string) => {
    switch (response) {
      // possible LOGIN messages from backend
      case authMessage.invalidPassword:
        return TXT.common.message.invalidPasword;

      case authMessage.userNotFound:
        return TXT.common.message.userNotFound;

      // possible REGISTER messages from backend
      case authMessage.phoneIsInUse:
        return TXT.common.message.phoneIsInUse;

      case authMessage.emailIsInUse:
        return TXT.common.message.emailIsInUse;

      case authMessage.networkError:
        return TXT.common.message.networkError;

      default:
        return response;
    }
  };

  const getFormMessage = (error: FieldError) => {
    switch (error.type) {
      case "required":
        return TXT.common.message.required;

      case "pattern":
        return TXT.common.message.emailPattern;

      case "validate":
        return TXT.common.message.validate;

      default:
        return error.message || "";
    }
  };

  return (
    <FormErrorProvider onError={(error) => getFormMessage(error)}>
      {error && (
        <Alert
          variant="filled"
          severity="error"
          sx={{ marginBottom: "1rem", padding: "0.75rem 1rem" }}
        >
          {getServerMessage(error)}
        </Alert>
      )}

      {children}
    </FormErrorProvider>
  );
};

export { FormErrorHandler };
