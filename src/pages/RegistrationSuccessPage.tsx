import React, { FC, useEffect } from "react";
import { getLoginRoutePath } from "../routes/routePaths";
import { useNavigate } from "react-router-dom";

type Props = {};

const RegistrationSuccessPage: FC<Props> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate(getLoginRoutePath());
    }, 2000);
  }, [navigate]);

  return <div>RegistrationSuccessPage</div>;
};

export { RegistrationSuccessPage };
