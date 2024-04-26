import styled from "@emotion/styled";
import React, { FC, ReactNode } from "react";
import { DirectionType } from "../types/commonTypes";

type Props = {
  children: ReactNode;
  direction?: DirectionType;
  padding?: string;
};

const defaultPadding = "0rem";

const EmployeeLevelGroup: FC<Props> = ({ children, direction, padding }) => {
  // < STYLED COMPONENTS
  const LevelGroupWrapper = styled("div")({
    width: "fit-content",
    maxWidth: "100%",
    display: "flex",
    flexDirection: direction || "row",
    padding: padding || defaultPadding,
  });
  //  STYLED COMPONENTS >

  return <LevelGroupWrapper>{children}</LevelGroupWrapper>;
};

export { EmployeeLevelGroup };
