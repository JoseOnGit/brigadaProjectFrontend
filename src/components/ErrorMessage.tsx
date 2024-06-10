import React, { FC } from "react";
import { getServerMessage } from "./FormErrorHandler";

type Props = {
  message: string;
};

const ErrorMessage: FC<Props> = ({ message }) => {
  return <div>{getServerMessage(message)}</div>;
};

export { ErrorMessage };
