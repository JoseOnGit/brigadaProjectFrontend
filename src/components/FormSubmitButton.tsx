import React, { FC } from "react";
import TXT from "../contexts/texts.json";
import Button from "@mui/material/Button";

type Props = {
  label: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

const FormSubmitButton: FC<Props> = ({ label, loading, disabled, onClick }) => (
  <Button
    type="submit"
    variant="contained"
    color="primary"
    size="large"
    disabled={loading || disabled}
    fullWidth
    sx={{ marginTop: "1rem", padding: "1rem 0rem" }}
    onClick={onClick}
  >
    {loading ? TXT.common.loading : label}
  </Button>
);

export { FormSubmitButton };
