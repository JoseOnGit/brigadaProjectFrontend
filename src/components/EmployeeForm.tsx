import React, { FC, useEffect, useMemo, useState } from "react";
import { FormSection } from "./FormSection";
import TXT from "../contexts/texts.json";
import {
  CheckboxElement,
  PasswordElement,
  PasswordRepeatElement,
  SelectElement,
  TextFieldElement,
} from "react-hook-form-mui";
import { textFieldBasicProps } from "../constants/commonConstants";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Stack from "@mui/material/Stack";
import styled from "@emotion/styled";
import { SelectOptionsType } from "../types/commonTypes";
import { StoreApiType } from "../types/storesTypes";
import { getAllStoresApiCall } from "../api/apiCalls";
import { getStoresOptions } from "../utils/commonUtils";

type Props = {};

const VisuallyHiddenInputForAvatar = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const EmployeeForm: FC<Props> = () => {
  console.log("🚀 ~ EmployeeForm is rendered....");
  const [stores, setStores] = useState<StoreApiType[]>([]);
  const [storesLoading, setStoresLoading] = useState<boolean>(false);
  const [storesError, setStoresError] = useState<string>("");

  useEffect(() => {
    if (!stores.length && !storesLoading && !storesError) {
      getAllStoresApiCall(setStores, setStoresLoading, setStoresError);
    }
  }, [stores.length, storesLoading, storesError]);

  const storesOptions: SelectOptionsType = useMemo(
    () => getStoresOptions(stores),
    [stores]
  );

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
          type="tel"
          {...textFieldBasicProps}
        />
      </FormSection>

      <FormSection headline={TXT.registrationPage.section.avatar.headline}>
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
      </FormSection>

      <FormSection
        headline={TXT.registrationPage.section.position.headline}
        text={TXT.registrationPage.section.position.text}
      >
        <SelectElement
          name="base"
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
        <br />
        <br />
        <CheckboxElement
          label={TXT.registrationPage.section.position.label.adult}
          name="isAdult"
        />
        <br />
        <br />
        <CheckboxElement
          label={TXT.registrationPage.section.position.label.cassa}
          name="isCassa"
        />
        <br />
        <br />
        <CheckboxElement
          label={TXT.registrationPage.section.position.label.merch}
          name="isMerch"
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

export { EmployeeForm };
