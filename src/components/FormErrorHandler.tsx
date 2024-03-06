import React, { FC, ReactNode, useEffect } from "react";
import { FormErrorProvider } from "react-hook-form-mui";
import Alert from "@mui/material/Alert";
import { getFormMessage, getServerMessage } from "../utils/commonUtils";

type Props = {
  children: ReactNode;
  error: string;
};

const FormErrorHandler: FC<Props> = ({ children, error }) => {
  useEffect(() => {
    if (error) {
      window.scrollTo(0, 0);
    }
  }, [error]);

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
