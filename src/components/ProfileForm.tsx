import React, { FC } from "react";
import { FormSection } from "./FormSection";
import TXT from "../contexts/texts.json";
import {
  PasswordElement,
  PasswordRepeatElement,
  TextFieldElement,
} from "react-hook-form-mui";
import { textFieldBasicProps } from "../constants/commonConstants";

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
  // const [stores, setStores] = useState<StoreApiType[]>([]);
  // const [storesLoading, setStoresLoading] = useState<boolean>(false);
  // const [storesError, setStoresError] = useState<string>("");

  // useEffect(() => {
  //   if (!stores.length && !storesLoading && !storesError) {
  //     getAllStoresApiCall(setStores, setStoresLoading, setStoresError);
  //   }
  // }, [stores.length, storesLoading, storesError]);

  // const storesOptions: SelectOptionsType = useMemo(
  //   () => getStoresOptions(stores),
  //   [stores]
  // );

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
