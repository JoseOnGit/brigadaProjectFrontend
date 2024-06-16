import React, { FC } from "react";
import { NotificationType } from "../types/requestTypes";
import TXT from "../contexts/texts.json";
import { getDateInFormat } from "../utils/commonUtils";

type Props = {
  notification: NotificationType;
  isStore: boolean;
};

const NotificationMessage: FC<Props> = ({ notification, isStore }) => {
  const notificationMessage = isStore
    ? TXT.common.notifications.userSendRequest
    : TXT.common.notifications.storeSendRequest;

  return (
    <div>
      <div style={{ fontWeight: "bold" }}>{notification.name}</div>
      <div>
        {notificationMessage}{" "}
        <span style={{ fontWeight: "bold" }}>
          {getDateInFormat(notification.date)}
        </span>
      </div>
      <div>
        {TXT.common.notifications.inTime}{" "}
        <span style={{ fontWeight: "bold" }}>{notification?.time}</span>
      </div>
    </div>
  );
};

export { NotificationMessage };
