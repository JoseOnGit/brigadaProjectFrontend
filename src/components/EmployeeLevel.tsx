import React, { FC } from "react";
import TXT from "../contexts/texts.json";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import CreditCardOffIcon from "@mui/icons-material/CreditCardOff";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import StoreIcon from "@mui/icons-material/Store";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import StarsIcon from "@mui/icons-material/Stars";
import SvgIcon from "@mui/icons-material/Stars";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";

// TYPES

type EmployeeLevelType = {
  id: number;
  icon: any;
  label: string;
};
type LabelSizeType = {
  type: SizeType;
  fontSize: typographySize;
};
type LabelPositionsType = {
  type: PositionsType;
  styles: Object;
};
export type LevelNumberType = 1 | 2 | 3 | 4 | 5 | 6;
type SizeType = "small" | "medium" | "large";
type PositionsType =
  | "top-start"
  | "top"
  | "top-end"
  | "left-start"
  | "left"
  | "left-end"
  | "bottom-start"
  | "bottom"
  | "bottom-end"
  | "right-start"
  | "right"
  | "right-end";

// ALL LEVELS LIST

const employeeLevels: EmployeeLevelType[] = [
  {
    id: 1,
    icon: ChildCareIcon,
    label: TXT.registrationPage.section.position.label.level1,
  },
  {
    id: 2,
    icon: CreditCardOffIcon,
    label: TXT.registrationPage.section.position.label.level2,
  },
  {
    id: 3,
    icon: CreditScoreIcon,
    label: TXT.registrationPage.section.position.label.level3,
  },
  {
    id: 4,
    icon: StoreIcon,
    label: TXT.registrationPage.section.position.label.level4,
  },
  {
    id: 5,
    icon: PlaylistAddCheckIcon,
    label: TXT.registrationPage.section.position.label.level5,
  },
  {
    id: 6,
    icon: StarsIcon,
    label: TXT.registrationPage.section.position.label.level6,
  },
];

// FONT SIZES

enum typographySize {
  SMALL = "body2",
  MEDIUM = "body1",
  LARGE = "h6",
}

const fontSizes: LabelSizeType[] = [
  {
    type: "small",
    fontSize: typographySize.SMALL,
  },
  {
    type: "medium",
    fontSize: typographySize.MEDIUM,
  },
  {
    type: "large",
    fontSize: typographySize.LARGE,
  },
];

// LABEL POSITIONS

const labelPositionStyles: LabelPositionsType[] = [
  {
    type: "top-start",
    styles: { flexDirection: "column-reverse", alignItems: "flex-start" },
  },
  {
    type: "top",
    styles: { flexDirection: "column-reverse" },
  },
  {
    type: "top-end",
    styles: { flexDirection: "column-reverse", alignItems: "flex-end" },
  },
  {
    type: "right-start",
    styles: { flexDirection: "row", alignItems: "flex-start" },
  },
  {
    type: "right",
    styles: { flexDirection: "row", gap: "0.5rem" },
  },
  {
    type: "right-end",
    styles: { flexDirection: "row", alignItems: "flex-end" },
  },
  {
    type: "bottom-start",
    styles: { flexDirection: "column", alignItems: "flex-start" },
  },
  {
    type: "bottom",
    styles: { flexDirection: "column" },
  },
  {
    type: "bottom-end",
    styles: { flexDirection: "column", alignItems: "flex-end" },
  },
  {
    type: "left-start",
    styles: { flexDirection: "row-reverse", alignItems: "flex-start" },
  },
  {
    type: "left",
    styles: { flexDirection: "row-reverse", gap: "0.5rem" },
  },
  {
    type: "left-end",
    styles: { flexDirection: "row-reverse", alignItems: "flex-end" },
  },
];

// DEFAULT VALUES

const defaultPadding = "0.5rem";
const defaultGap = "0.5rem";
const defaultDisplay = "inline-block";
const defaultTextAlignment = "left";
const defaultLabelPosition = "right";
const defaultTooltipPosition = "top";
const disabledColor = "#00000042";

// PROPERTIES

type Props = {
  level: LevelNumberType;
  size?: SizeType;
  iconSize?: any;
  labelSize?: SizeType;
  labelPosition?: PositionsType;
  tooltipPosition?: PositionsType;
  useTooltip?: boolean;
  hideIcon?: boolean;
  hideLabel?: boolean;
  displayBlock?: boolean;
  width?: string;
  padding?: string;
  gap?: string;
  disabled?: boolean;
};

// LEVEL:
//    @level: (number) - set ID of employee skills level which is defined in 'employeeLevels' object.
//
// SIZES:
//    !!! Important !!!
//    If there is 'iconSize' or 'labelSize' prop defined, then 'size' value will be overwritten!
//
//    @size:            (string) - set common size for icon and label. OPTIONS: 'small' | 'medium' | 'large'
//    @iconSize:        (string) - set size just for icon. OPTIONS: 'small' | 'medium' | 'large'
//    @labelSize:       (string) - set size just for label. OPTIONS: 'small' | 'medium' | 'large'
//
// VISIBILITY:
//    @hideIcon:        (boolean) - disable icon, only label will be shown.
//    @hideLabel:       (boolean) - disable label, only icon will be shonw.
//
// TOOLTIP:
//    @useTooltip:      (boolean) - enable tooltip. It will show text of label.
//
// POSITIONS:
//    @labelPosition:   (string) - set position of label according to icon.
//                        OPTIONS: 'top-start' | 'top' | 'top-end | 'left-start' | 'left' | 'bottom-end' |
//                                 'bottom-start' | 'bottom' | 'bottom-end' | 'right-start' | 'right' | 'right-end'.
//    @tooltipPosition: (string) - set position of tooltip according to icon.
//                        OPTIONS: 'top-start' | 'top' | 'top-end | 'left-start' | 'left' | 'bottom-end' |
//                                 'bottom-start' | 'bottom' | 'bottom-end' | 'right-start' | 'right' | 'right-end'.
//
// DISPLAY:
//    @displayBlock:    (boolean) - set "display: block" to wrapper.
//    @width:            (string) - optional width can be set.
//    @padding:          (string) - optional padding of wrapper.
//    @gap:              (string) - optional gap between icon and label can be set.
//    @disabled:        (boolean) - set level as disabled.
//

const EmployeeLevel: FC<Props> = ({
  level = 1,
  size,
  iconSize,
  labelSize,
  labelPosition,
  tooltipPosition,
  useTooltip = false,
  hideIcon = false,
  hideLabel = false,
  displayBlock = false,
  width,
  padding,
  gap,
  disabled,
}) => {
  // LEVEL - get employee skills level we want to render. (Levels are defined in 'employeeLevels' list)

  const displayedLevel = employeeLevels.filter(
    (employeeLevel) => employeeLevel.id === level
  )[0];

  //SIZES - get final size properties for icon and text. (if we don't set any size, default is 'medium')

  // Icon - 'iconSize' overwrites 'size'
  const sizeOfIcon: SizeType = iconSize ?? size;
  const isCustomSize =
    sizeOfIcon &&
    sizeOfIcon !== "small" &&
    sizeOfIcon !== "medium" &&
    sizeOfIcon !== "large";

  // Label - 'labelSize' overwrites 'size' prop.
  const getCorrectLabelSizeType = (size: SizeType) =>
    fontSizes.find((fontSize) => fontSize.type === size)?.fontSize;

  const sizeOfLabel = labelSize
    ? getCorrectLabelSizeType(labelSize)
    : size
    ? getCorrectLabelSizeType(size)
    : typographySize.MEDIUM;

  // POSITION - get position and alignment of label according to icon. Default is 'right'.

  const defaultPosition = labelPositionStyles.filter(
    (position) => position.type === defaultLabelPosition
  )[0];

  const positionStyles =
    labelPositionStyles.find((position) => position.type === labelPosition)
      ?.styles || defaultPosition.styles;

  const alignmentStyles =
    labelPosition === "top" || labelPosition === "bottom"
      ? "center"
      : labelPosition?.includes("left") ||
        labelPosition === "top-end" ||
        labelPosition === "bottom-end"
      ? "right"
      : defaultTextAlignment;

  // < STYLED COMPONENTS
  const LevelWrapper = styled("div")({
    display: displayBlock ? "block" : defaultDisplay,
    maxWidth: "100%",
    padding: padding || defaultPadding,
  });

  const Level = styled("div")(
    {
      position: "relative",
      width: width ? width : displayBlock ? "auto" : "fit-content",
      maxWidth: "100%",
      display: "flex",
      alignItems: "center",
      gap: gap || defaultGap,
    },
    { ...positionStyles }
  );

  const LevelIcon = styled("div")({
    fontSize: sizeOfIcon,
  });
  // STYLED COMPONENTS >

  const renderEmployeeLevel = () => {
    return (
      <LevelWrapper>
        <Level>
          {!hideIcon && (
            <LevelIcon>
              <SvgIcon
                component={displayedLevel.icon}
                fontSize={isCustomSize ? "inherit" : sizeOfIcon}
                color={disabled ? "disabled" : "inherit"}
              />
            </LevelIcon>
          )}
          {!hideLabel && (
            <Typography
              align={alignmentStyles}
              variant={sizeOfLabel}
              color={disabled ? disabledColor : "inherit"}
            >
              {displayedLevel.label}
            </Typography>
          )}
        </Level>
      </LevelWrapper>
    );
  };

  return useTooltip || hideLabel ? (
    <Tooltip
      title={displayedLevel.label}
      placement={tooltipPosition || defaultTooltipPosition}
      arrow
    >
      {renderEmployeeLevel()}
    </Tooltip>
  ) : (
    renderEmployeeLevel()
  );
};

export { EmployeeLevel };
