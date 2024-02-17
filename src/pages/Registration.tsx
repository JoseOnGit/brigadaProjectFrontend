import React, { FC } from "react";
import { PageHeadline } from "../components/PageHeadline";

type Props = {};

const Registration: FC<Props> = () => {
  console.log("%c⧭ Registration component is rendered.. ", "color: #00bf00");

  return (
    <>
      <PageHeadline text="Registrace" backButtton={true} />
    </>
  );
};

export { Registration };
