import React, { FC, ReactNode } from "react";
import styled from "@emotion/styled";
import TXT from "../contexts/texts.json";
import ChildCareIcon from '@mui/icons-material/ChildCare';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import CreditScoreIcon from '@mui/icons-material/CreditScore';

import StarsIcon from "@mui/icons-material/Stars";

type EmployeeLevelType = {
  id: number;
  icon: ReactNode;
  label: string;
}

type Props = {
  levelNumber: number
};

const levels: EmployeeLevelType[] = [
  {
    id: 1,
    icon: <ChildCareIcon />,
    label: TXT.registrationPage.section.position.label.level1,
  }
  {
    id: 2,
    icon: <ChildCareIcon />,
    label: TXT.registrationPage.section.position.label.level2,
  }
  {
    id: 3,
    icon: <ChildCareIcon />,
    label: TXT.registrationPage.section.position.label.level3,
  }
  {
    id: 4,
    icon: <ChildCareIcon />,
    label: TXT.registrationPage.section.position.label.level4,
  }
  {
    id: 5,
    icon: <ChildCareIcon />,
    label: TXT.registrationPage.section.position.label.level5,
  }
  {
    id: 6,
    icon: <ChildCareIcon />,
    label: TXT.registrationPage.section.position.label.level6,
  }
]

const LevelIcon = styled("div")({
  width: "100%",
  height: "40vh",
  display: "flex",
  flexWrap: "wrap",
  alignContent: "flex-end",
  justifyContent: "center",
});

const EmployeeLevel: FC<Props> = (levelNumber: number) => {

  const getLevelIcon = (level: number) => {
    switch (level) {
      case 1:
        return <ChildCareIcon />
      case 2:
        return <CreditCardOffIcon />
      case 3:
        return <CreditScoreIcon />
      case 4:
        return <ChildCareIcon />
      case 5:
        return <ChildCareIcon />
      case 6:
        return <StarsIcon />
    }
  }

  return (
    <div>
      <LevelIcon>
        {getLevelIcon(levelNumber)}
      </LevelIcon>
    </div>
  );
};

export { EmployeeLevel };
