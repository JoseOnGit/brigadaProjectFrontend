import React, { FC, ReactNode } from "react";
import {
  EmployeeLevel,
  LevelNumberType,
  employeeLevels,
} from "./EmployeeLevel";
import styled from "@emotion/styled";

type Props = {
  level: number;
  col?: boolean;
  labelOn?: boolean;
};

const EmployeeLevelRating: FC<Props> = ({ level, col, labelOn }) => {
  // < STYLED COMPONENTS
  const LevelRatingWrapper = styled("div")({
    display: "flex",
    flexDirection: col ? "column" : "row",
  });
  //  STYLED COMPONENTS >

  const renderLevels = () => {
    let allLlevels: ReactNode[] = [];

    for (let i = 1; i < employeeLevels.length + 1; i++) {
      allLlevels.push(
        <EmployeeLevel
          key={i}
          level={i as LevelNumberType}
          disabled={i > level}
          hideLabel={!labelOn}
        />
      );
    }
    return allLlevels;
  };

  return <LevelRatingWrapper>{renderLevels()}</LevelRatingWrapper>;
};

export { EmployeeLevelRating };
