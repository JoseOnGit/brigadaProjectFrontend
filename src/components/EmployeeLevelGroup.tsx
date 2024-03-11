import styled from "@emotion/styled";
import React, { FC, ReactNode } from "react";

type DirectionType = "row" | "column";

type Props = {
  children: ReactNode;
  direction?: DirectionType;
  padding?: string;
};

const defaultPadding = "0rem";

const EmployeeLevelGroup: FC<Props> = ({ children, direction, padding }) => {
  // STYLED COMPONENTS

  const LevelGroupWrapper = styled("div")({
    width: "fit-content",
    maxWidth: "100%",
    display: "flex",
    flexDirection: direction || "row",
    padding: padding || defaultPadding,
  });

  return <LevelGroupWrapper>{children}</LevelGroupWrapper>;
};

export { EmployeeLevelGroup };
