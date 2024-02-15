import React, { FC } from "react";
import { Outlet } from "react-router-dom";

type Props = {};

const PageWrapper: FC<Props> = () => {
  console.log("%c⧭ PageWrapper component is rendered.. ", "color: #00bf00");

  return (
    <>
      <div>PageWrapper</div>
      <Outlet />
    </>
  );
};

export { PageWrapper };
