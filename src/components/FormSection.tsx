import React, { FC, ReactNode } from "react";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

type Props = {
  headline: string;
  children: ReactNode;
  text?: string;
};

// < STYLED COMPONENTS
const Section = styled("div")({
  paddingBottom: "2rem",
});
//  STYLED COMPONENTS >

const FormSection: FC<Props> = ({ headline, children, text }) => (
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

export { FormSection };
