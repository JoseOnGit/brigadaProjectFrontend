import React, { FC } from "react";

type Props = {};

const MainPage: FC<Props> = () => {
  console.log("%c⧭ MainPage component is rendered.. ", "color: #00bf00");

  return <div>MainPage</div>;
};

export { MainPage };
