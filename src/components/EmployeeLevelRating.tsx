import React, { FC, ReactNode } from "react";
import {
  EmployeeLevel,
  LevelNumberType,
  employeeLevels,
} from "./EmployeeLevel";

type Props = {
  level: number;
  col?: boolean;
};

const EmployeeLevelRating: FC<Props> = ({ level, col }) => {
  console.log("%c⧭ level ", "color: #99adcc", level);
  console.log("%c⧭ col ", "color: #99adcc", col);

  const renderLevels = () => {
    let allLlevels: ReactNode[] = [];

    for (let i = 1; i < employeeLevels.length + 1; i++) {
      console.log("%c⧭ i ", "color: #f279ca", i);
      allLlevels.push(
        <EmployeeLevel
          key={i}
          level={i as LevelNumberType}
          disabled={i > level}
          hideLabel
        />
      );
    }
    return allLlevels;
  };

  return <div>{renderLevels()}</div>;
};

export { EmployeeLevelRating };
