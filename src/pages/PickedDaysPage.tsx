import React, { FC } from "react";
import TXT from "../contexts/texts.json";
import { PageHeadline } from "../components/PageHeadline";
import { PickedDaysList } from "../components/PickedDaysList";

type Props = {};

const PickedDaysPage: FC<Props> = () => {
  return (
    <div>
      <PageHeadline headline={TXT.pickedDaysPage.headline} />

      <PickedDaysList />
    </div>
  );
};

export { PickedDaysPage };
