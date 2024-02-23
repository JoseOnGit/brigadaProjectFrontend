import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TXT from "../contexts/texts.json";
import Button from "@mui/material/Button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

type Props = {
  headline: string;
  hasBackButton?: boolean;
  bottomSpace?: string;
};

const PageHeadline: FC<Props> = ({ headline, hasBackButton, bottomSpace }) => {
  const navigate = useNavigate();

  return (
    <>
      {hasBackButton && (
        <Button
          onClick={() => navigate(-1)}
          startIcon={<KeyboardArrowLeftIcon />}
        >
          {TXT.common.back}
        </Button>
      )}

      <Typography
        align="left"
        variant="h3"
        component="div"
        sx={{
          marginTop: hasBackButton ? "1rem" : "4rem",
          marginBottom: bottomSpace ?? "1rem",
          fontWeight: "bold",
        }}
      >
        {headline}
      </Typography>
    </>
  );
};

export { PageHeadline };
