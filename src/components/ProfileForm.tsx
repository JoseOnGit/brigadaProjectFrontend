import React, { FC, useEffect, useMemo, useState } from "react";
import { FormSection } from "./FormSection";
import TXT from "../contexts/texts.json";
import {
  DatePickerElement,
  PasswordElement,
  PasswordRepeatElement,
  RadioButtonGroup,
  SelectElement,
  TextFieldElement,
} from "react-hook-form-mui";
import { textFieldBasicProps } from "../constants/commonConstants";
import { EmployeeLevel, LevelNumberType } from "./EmployeeLevel";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import StoreService from "../services/storeService";
import { SelectOptionsType } from "../types/commonTypes";
import { getStoresOptions } from "../utils/commonUtils";

type Props = {};

// const VisuallyHiddenInputForAvatar = styled("input")({
//   clip: "rect(0 0 0 0)",
//   clipPath: "inset(50%)",
//   height: 1,
//   overflow: "hidden",
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   whiteSpace: "nowrap",
//   width: 1,
// });

const ProfileForm: FC<Props> = () => {
  console.log("🚀 ~ ProfileForm is rendered....");
  const [stores, setStores] = useState([]);
  const [storesLoading, setStoresLoading] = useState<boolean>(false);
  const [storesError, setStoresError] = useState<string>("");

  useEffect(() => {
    setStoresLoading(true);

    StoreService.getAllStoreNames()
      .then(
        (response) => {
          setStores(response);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setStoresError(resMessage);
        }
      )
      .finally(() => setStoresLoading(false));
  }, []);

  const storesOptions: SelectOptionsType = useMemo(
    () => getStoresOptions(stores),
    [stores]
  );

  const getRadioButtons = () => {
    let radioButtons = [];

    for (let i = 1; i <= 6; i++) {
      radioButtons.push({
        id: i as number,
        label: <EmployeeLevel level={i as LevelNumberType} />,
      });
    }

    return radioButtons;
  };

  console.log("%c⧭ getRadioButtons ", "color: #86bf60", getRadioButtons());

  return (
    <>
      <FormSection
        headline={TXT.registrationPage.section.contact.headline}
        text={TXT.registrationPage.section.contact.text}
      >
        <TextFieldElement
          name="name"
          label={TXT.registrationPage.section.contact.label.name}
          {...textFieldBasicProps}
        />
        <TextFieldElement
          name="surname"
          label={TXT.registrationPage.section.contact.label.surname}
          {...textFieldBasicProps}
        />
        <TextFieldElement
          name="email"
          label={TXT.registrationPage.section.contact.label.email}
          type="email"
          {...textFieldBasicProps}
        />
        <TextFieldElement
          name="phone"
          label={TXT.registrationPage.section.contact.label.phone}
          // type="tel"
          {...textFieldBasicProps}
        />
      </FormSection>

      {/* <FormSection headline={TXT.registrationPage.section.avatar.headline}>
        <Stack direction="row" spacing={2}>
          <Avatar alt="Avatar" src="" />
          <Button
            component="label"
            role={undefined}
            endIcon={<KeyboardArrowRightIcon />}
          >
            {TXT.registrationPage.section.avatar.button}
            <VisuallyHiddenInputForAvatar
              type="file"
              name="avatar"
              accept="image/png, image/jpeg"
            />
          </Button>
        </Stack>
      </FormSection> */}

      <FormSection
        headline={TXT.registrationPage.section.position.headline}
        text={TXT.registrationPage.section.position.text}
      >
        <SelectElement
          name="baseId"
          label={
            storesLoading
              ? TXT.common.loading
              : TXT.registrationPage.section.position.label.base
          }
          options={storesOptions}
          required={!storesError}
          disabled={!!storesError || !!storesLoading}
          helperText={
            storesError &&
            TXT.registrationPage.section.position.tooltip.baseError
          }
          fullWidth
        />

        <DatePickerElement
          name="onboardDate"
          label={TXT.registrationPage.section.position.label.onboardDate}
          maxDate={dayjs()}
          sx={{
            width: "100%",
            margin: "1rem 0",
          }}
          required
        />

        <Typography paragraph sx={{ margin: "1rem 0" }}>
          {TXT.registrationPage.section.position.label.levelLabel}
        </Typography>

        <RadioButtonGroup
          name="level"
          type="number"
          options={getRadioButtons()}
          required
        />
      </FormSection>

      <FormSection
        headline={TXT.registrationPage.section.password.headline}
        text={TXT.registrationPage.section.password.text}
      >
        <PasswordElement
          name="password"
          label={TXT.registrationPage.section.password.label.password}
          {...textFieldBasicProps}
        />
        <PasswordRepeatElement
          name="passwordRepeat"
          passwordFieldName="password"
          label={TXT.registrationPage.section.password.label.repeatPassword}
          {...textFieldBasicProps}
        />
      </FormSection>
    </>
  );
};

export { ProfileForm };
