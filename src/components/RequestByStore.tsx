import React, { FC } from "react";
import TXT from "../contexts/texts.json";
import styled from "@emotion/styled";
import { RequestType } from "../types/requestTypes";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Typography,
} from "@mui/material";
import { ArrowDropDownIcon } from "@mui/x-date-pickers/icons";
import { EmployeeLevelRating } from "./EmployeeLevelRating";
import { getDateInFormat, getWorkTime } from "../utils/commonUtils";
import { StoreApiType } from "../types/storesTypes";

type Props = {
  request: RequestType;
  requestStore: StoreApiType;
};

// < STYLED COMPONENTS
const RequestByUserWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
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
  textAlign: "left",
});
const LevelWrapper = styled("div")({
  marginLeft: "1rem",
});
//  STYLED COMPONENTS >

const RequestByStore: FC<Props> = ({ request, requestStore }) => {
  console.log("%c⧭ request ", "color: #917399", request);
  return (
    <>
      <Accordion
        sx={{
          background: "#d6bbfa",
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
              <Avatar sx={{ width: "3rem", height: "3rem" }}>
                {`${requestStore.name?.[0]}`}
              </Avatar>
            </div>

            <NameWrapper>
              <Typography
                component="div"
                sx={{
                  marginBottom: "0",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                }}
              >
                {requestStore.name}
              </Typography>

              <Typography sx={{ fontSize: "0.9rem", lineHeight: "0.9rem" }}>
                {getWorkTime(request)}
              </Typography>
            </NameWrapper>
          </RequestByUserWrapper>
        </AccordionSummary>

        <AccordionDetails sx={{ background: "#e1cff8" }}>
          <DetailsWrapper>
            <Typography sx={{ marginTop: "0.5rem" }}>
              <strong>
                {TXT.dashboardPage.user.storeList.detail.requestDate}:
              </strong>{" "}
              {getDateInFormat(request.day)}
            </Typography>

            <Typography sx={{ marginTop: "0.5rem" }}>
              <strong>
                {TXT.dashboardPage.user.storeList.detail.requestTime}:
              </strong>{" "}
              {getWorkTime(request)}
            </Typography>

            <Typography sx={{ marginTop: "0.5rem" }}>
              <strong>{TXT.dashboardPage.user.storeList.detail.place}:</strong>{" "}
              {requestStore.name}
            </Typography>

            <Typography sx={{ marginTop: "0.5rem" }}>
              <strong>{TXT.dashboardPage.user.storeList.detail.level}:</strong>{" "}
            </Typography>
            <LevelWrapper>
              <EmployeeLevelRating level={request.level} col labelOn />
            </LevelWrapper>

            <Typography sx={{ marginTop: "0.5rem" }}>
              <strong>
                {TXT.dashboardPage.user.storeList.detail.manager}:
              </strong>{" "}
              {requestStore.manager}
            </Typography>

            <Typography sx={{ marginTop: "0.5rem" }}>
              <strong>{TXT.dashboardPage.user.storeList.detail.email}:</strong>{" "}
              {requestStore.email}
            </Typography>

            <Typography sx={{ marginTop: "0.5rem" }}>
              <strong>{TXT.dashboardPage.user.storeList.detail.phone}:</strong>{" "}
              {requestStore.phone}
            </Typography>
          </DetailsWrapper>

          <Button
            href={`mailto:${requestStore.phone}`}
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ marginTop: "2rem", padding: "1rem 0rem" }}
          >
            {TXT.dashboardPage.user.storeList.detail.buttonMail}
          </Button>

          <Button
            href={`tel:${requestStore.phone}`}
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ marginTop: "1rem", padding: "1rem 0rem" }}
          >
            {TXT.dashboardPage.user.storeList.detail.buttonCall}
          </Button>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export { RequestByStore };
