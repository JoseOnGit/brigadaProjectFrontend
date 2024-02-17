import React, { FC } from "react";
import { Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {
  text: string;
  backButtton?: boolean;
};

const PageHeadline: FC<Props> = ({ text, backButtton }) => {
  console.log("%c⧭ PageHeadline component is rendered.. ", "color: #00bf00");
  const navigate = useNavigate();

  return (
    <>
      {backButtton && (
        <Link href={"#"} sx={{ display: "block", height: "2rem" }}>
          <div onClick={() => navigate(-1)}>{`< ZPĚT`}</div>
        </Link>
      )}
      <Typography
        align="left"
        variant="h3"
        component="div"
        sx={{
          marginTop: backButtton ? "1rem" : "4rem",
          marginBottom: "1rem",
          fontWeight: "bold",
        }}
      >
        {text}
      </Typography>
    </>
  );
};

export { PageHeadline };
