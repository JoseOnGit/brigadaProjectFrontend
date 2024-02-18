import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

type Props = {
  headline: string;
  hasBackButton?: boolean;
  bottomSpace?: string;
};

const PageHeadline: FC<Props> = ({ headline, hasBackButton, bottomSpace }) => {
  console.log("%c⧭ PageHeadline component is rendered.. ", "color: #00bf00");
  const navigate = useNavigate();

  return (
    <>
      {hasBackButton && (
        <Link href={"#"} sx={{ display: "block", height: "2rem" }}>
          <div onClick={() => navigate(-1)}>{`< ZPĚT`}</div>
        </Link>
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
