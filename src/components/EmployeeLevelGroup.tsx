import styled from "@emotion/styled";
import React, { FC, ReactNode } from "react";
import { DirectionType } from "../types/commonTypes";
import { DEFAULT_EMPLOYEE_LEVEL_GROUP_PADDING } from "../constants/commonConstants";

type Props = {
  children: ReactNode;
  direction?: DirectionType;
  padding?: string;
};

const EmployeeLevelGroup: FC<Props> = ({ children, direction, padding }) => {
  // < STYLED COMPONENTS
  const LevelGroupWrapper = styled("div")({
    width: "fit-content",
    maxWidth: "100%",
    display: "flex",
    flexDirection: direction || "row",
    padding: padding || DEFAULT_EMPLOYEE_LEVEL_GROUP_PADDING,
  });
  //  STYLED COMPONENTS >

  return <LevelGroupWrapper>{children}</LevelGroupWrapper>;
};

export { EmployeeLevelGroup };
