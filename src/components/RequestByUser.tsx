import React, { FC } from "react";
import TXT from "../contexts/texts.json";
import styled from "@emotion/styled";
import { RequestType } from "../types/brigadaTypes";
import { CurrentUserType } from "../types/userTypes";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { ArrowDropDownIcon } from "@mui/x-date-pickers/icons";
import { EmployeeLevelRating } from "./EmployeeLevelRating";
import { getWorkTime } from "../utils/commonUtils";

type Props = {
  request: RequestType;
  requestUser: CurrentUserType;
};

// < STYLED COMPONENTS
const RequestByUserWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "2rem",
  width: "100%",
  minHeight: "3.6rem",
  padding: "0.5rem",
});

const NameWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});
const DetailsWrapper = styled("div")({
  marginLeft: "0rem",
  textAlign: "left",
});
const LevelWrapper = styled("div")({
  marginLeft: "1rem",
  textAlign: "left",
});
//  STYLED COMPONENTS >

const RequestByUser: FC<Props> = ({ request, requestUser }) => {
  return (
    <>
      <Accordion
        sx={{
          background: "#A7FFB0",
          borderTop: "1px solid #898989",
          marginBottom: "1rem",
        }}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ padding: 0, margin: 0, div: { margin: 0 } }}
        >
          <RequestByUserWrapper>
            <div>
              <Avatar sx={{ width: "4rem", height: "4rem" }}>
                {`${requestUser.name?.[0]}`}
              </Avatar>
            </div>

            <NameWrapper>
              <Typography
                variant="h6"
                component="div"
                sx={{ marginBottom: "0", fontWeight: "bold" }}
              >
                {requestUser.name} {requestUser.surname}
              </Typography>

              <Typography
                paragraph
                sx={{ fontSize: "0.9rem", lineHeight: "0.9rem" }}
              >
                {requestUser.base?.name}
              </Typography>

              <Typography
                paragraph
                sx={{ marginBottom: "0", fontWeight: "bold" }}
              >
                {dayjs(request.day).format("D.MMM.YYYY")}
              </Typography>
            </NameWrapper>
          </RequestByUserWrapper>
        </AccordionSummary>

        <AccordionDetails sx={{ background: "#ccffd1" }}>
          <DetailsWrapper>
            <Typography sx={{ marginTop: "0.5rem" }}>
              <strong>
                {TXT.dashboardPage.store.userList.detail.workTime}:
              </strong>{" "}
              {getWorkTime(request)}
            </Typography>

            <Typography sx={{ marginTop: "0.5rem" }}>
              <strong>{TXT.dashboardPage.store.userList.detail.base}:</strong>{" "}
              {requestUser.base?.name}
            </Typography>

            <Typography sx={{ marginTop: "0.5rem" }}>
              <strong>{TXT.dashboardPage.store.userList.detail.level}:</strong>{" "}
            </Typography>
            <LevelWrapper>
              <EmployeeLevelRating level={requestUser.level} col labelOn />
            </LevelWrapper>

            <Typography sx={{ marginTop: "0.5rem" }}>
              <strong>{TXT.dashboardPage.store.userList.detail.email}:</strong>{" "}
              {requestUser.email}
            </Typography>

            <Typography sx={{ marginTop: "0.5rem" }}>
              <strong>{TXT.dashboardPage.store.userList.detail.phone}:</strong>{" "}
              {requestUser.phone}
            </Typography>
          </DetailsWrapper>

          <Button
            href={`mailto:${requestUser.phone}`}
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ marginTop: "2rem", padding: "1rem 0rem" }}
          >
            {TXT.dashboardPage.store.userList.detail.buttonMail}
          </Button>

          <Button
            href={`tel:${requestUser.phone}`}
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ marginTop: "1rem", padding: "1rem 0rem" }}
          >
            {TXT.dashboardPage.store.userList.detail.buttonCall}
          </Button>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export { RequestByUser };
