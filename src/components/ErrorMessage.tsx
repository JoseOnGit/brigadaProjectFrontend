import React, { FC } from "react";

type Props = {
  error: string;
};

const ErrorMessage: FC<Props> = ({ error }) => {
  console.log("%c⧭ ErrorMessage component is rendered.. ", "color: #00bf00");

  return <div>{`ErrorMessage: ${error}`}</div>;
};

export { ErrorMessage };
