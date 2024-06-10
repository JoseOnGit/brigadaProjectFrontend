import React, { FC } from "react";

type Props = {};

const DashboardUserRequests: FC<Props> = () => {
  console.log(
    "%c⧭ DashboardUserRequests component is rendered.. ",
    "color: #00bf00"
  );

  return <div>DashboardUserRequests</div>;
};

export { DashboardUserRequests };
