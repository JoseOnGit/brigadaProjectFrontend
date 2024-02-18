import React, { FC, ReactNode } from "react";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

const Section = styled.div`
  padding-bottom: 2rem;
`;

type Props = {
  headline: string;
  children: ReactNode;
  text?: string;
};

const FormSection: FC<Props> = ({ headline, children, text }) => {
  console.log("%c⧭ FormSection component is rendered.. ", "color: #00bf00");

  return (
    <Section>
      <Typography
        align="left"
        variant="h5"
        component="div"
        sx={{
          marginBottom: "1rem",
          fontWeight: "bold",
        }}
      >
        {headline}
      </Typography>

      {text && (
        <Typography
          paragraph
          sx={{
            marginBottom: "1rem",
          }}
        >
          {text}
        </Typography>
      )}

      {children}
    </Section>
  );
};

export { FormSection };
