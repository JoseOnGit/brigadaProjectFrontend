import React, { FC } from "react";
import TXT from "../contexts/texts.json";
import Button from "@mui/material/Button";

type Props = {
  label: string;
  loading: boolean;
};

const FormSubmitButton: FC<Props> = ({ label, loading }) => (
  <Button
    type="submit"
    variant="contained"
    color="primary"
    size="large"
    disabled={loading}
    fullWidth
  >
    {loading ? TXT.common.loading : label}
  </Button>
);

export { FormSubmitButton };
