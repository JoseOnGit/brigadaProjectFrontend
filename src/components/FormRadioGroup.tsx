import React, { FC, useState } from "react";
import TXT from "../contexts/texts.json";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { EmployeeLevel, LevelNumberType } from "./EmployeeLevel";
import { useForm } from "react-hook-form-mui";

type Props = {
  name: string;
  label: string;
};

const FormRadioGroup: FC<Props> = ({ name, label }) => {
  const { register, handleSubmit, reset, control, setValue } = useForm();
  console.log("%c⧭ control ", "color: #f27999", control._formValues);

  const [level, setLevel] = useState();

  const handleChange = (e: any) => {
    const { value } = e.target;
    console.log("%c⧭ value ", "color: #cc7033", value);
    //set value of Radio button
    setLevel(value);
    //set value in hook-form
    setValue("fruit", value);
  };

  const getRadioButtons = () => {
    let radioButtons = [];

    for (let i = 1; i < 6; i++) {
      radioButtons.push(
        <FormControlLabel
          key={`level-${i}`}
          value={i}
          control={<Radio />}
          label={<EmployeeLevel level={i as LevelNumberType} />}
        />
      );
    }

    return radioButtons;
  };

  return (
    <>
      <Typography paragraph sx={{ margin: "1rem 0" }}>
        {TXT.registrationPage.section.position.label.levelLabel}
      </Typography>

      <RadioGroup
        aria-labelledby="employee-skill-level"
        // defaultValue={1}
        value={level}
        name="level"
        onChange={handleChange}
      >
        {getRadioButtons()}
      </RadioGroup>
    </>
  );
};

export { FormRadioGroup };
