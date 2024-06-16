/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, ReactNode, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import { NotificationType } from "../types/requestTypes";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { userSelector } from "../slices/user";
import { ROLE } from "../constants/commonConstants";
import { NotificationMessage } from "./NotificationMessage";
import { fetchDataForStore, fetchDataForUser } from "../utils/commonUtils";

type Props = {
  children: ReactNode;
  socket: Socket;
};

const NotificationProvider: FC<Props> = ({ children, socket }) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(userSelector);
  const isStore = currentUser && currentUser?.roles?.includes(ROLE.MODERATOR);

  const [userNotifications, setUserNotifications] = useState<
    NotificationType[]
  >([]);
  const [storeNotifications, setStoreNotifications] = useState<
    NotificationType[]
  >([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`Connected to server`);
    });

    socket.on("notification", (data: any) => {
      if (isStore && !data.notification.byStore) {
        setUserNotifications([...userNotifications, data.notification]);
      }
      if (!isStore && data.notification.byStore) {
        setStoreNotifications([...storeNotifications, data.notification]);
      }
    });

    socket.on("disconnect", () => {
      console.log(`Disconnected from server`);
    });
  }, [socket, isStore]);

  useEffect(() => {
    if (currentUser.id) {
      setTimeout(() => {
        isStore
          ? fetchDataForStore(dispatch, currentUser.base.id)
          : fetchDataForUser(dispatch, currentUser.id);
      }, 750);
    }
  }, [currentUser, userNotifications, storeNotifications]);

  const removeNotification = (id: string) => {
    const notifications = isStore ? userNotifications : storeNotifications;
    const newNotifications = notifications.filter((notif) => notif.id !== id);
    isStore
      ? setUserNotifications(newNotifications)
      : setStoreNotifications(newNotifications);
  };

  useEffect(() => {
    const latestNotification = isStore
      ? userNotifications[userNotifications.length - 1]
      : storeNotifications[storeNotifications.length - 1];

    if (latestNotification) {
      toast.error(
        <NotificationMessage
          notification={latestNotification}
          isStore={isStore}
        />,
        {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          onClose: () => removeNotification(latestNotification?.id),
          toastId: latestNotification?.id,
        }
      );
    }
  }, [userNotifications, storeNotifications]);

  return (
    <div>
      {children}
      <ToastContainer />
    </div>
  );
};

export { NotificationProvider };
