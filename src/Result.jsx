import React, { useState } from "react";
import { QUESTIONS } from "../source/question";
import {
  Card,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
const Result = () => {
  const answer = JSON.parse(localStorage.getItem("answer") || "[]");
  const sortAnswer = JSON.parse(localStorage.getItem("sortAnswer") || "[]");
  const correctAnswer = JSON.parse(
    localStorage.getItem("correctAnswer") || "[]"
  );
  const positionQuestion = JSON.parse(
    localStorage.getItem("positionQuestion") || "[]"
  );
  const radioGroupCss = {
    display: "flex",
    flexDirection: "column",
    width: "800px",
    boxSizing: "border-box",
    padding: "20px",
    alignItems: "start",
    position: "relative",
  };
  const [count, setCount] = useState(() => {
    let i = 0;
    answer.map((e, index) => {
      if (e == correctAnswer[index]) {
        i++;
      }
    });
    return i;
  });
  return (
    <>
      <Typography>Correct answer : {count}</Typography>
      <Typography>Uncorrect answer : {answer.length - count}</Typography>
      {answer.map((element, index) => {
        const e = QUESTIONS[positionQuestion[index]];
        return (
          <Card key={e.id} sx={radioGroupCss} variant="outlined">
            <span
              style={{
                position: "absolute",
                left: 0,
                width: "8px",
                top: 0,
                height: "100%",
                backgroundColor:
                  element == correctAnswer[index] ? "green" : "red",
              }}
            ></span>
            <Typography sx={{ display: "flex", alignItems: "start" }}>
              {e.question.text}
            </Typography>
            <FormControl>
              <RadioGroup sx={radioGroupCss}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    value={1}
                    checked={element == sortAnswer[index][0] ? true : false}
                    label={sortAnswer[index][0]}
                    control={<Radio />}
                  ></FormControlLabel>
                  {sortAnswer[index][0] == correctAnswer[index] ? (
                    <CheckRoundedIcon sx={{ color: "green" }} />
                  ) : sortAnswer[index][0] == element ? (
                    <ClearRoundedIcon sx={{ color: "red" }} />
                  ) : null}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    value={2}
                    checked={element == sortAnswer[index][1] ? true : false}
                    label={sortAnswer[index][1]}
                    control={<Radio />}
                  ></FormControlLabel>
                  {sortAnswer[index][1] == correctAnswer[index] ? (
                    <CheckRoundedIcon sx={{ color: "green" }} />
                  ) : sortAnswer[index][1] == element ? (
                    <ClearRoundedIcon sx={{ color: "red" }} />
                  ) : null}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    value={1}
                    checked={element == sortAnswer[index][2] ? true : false}
                    label={sortAnswer[index][2]}
                    control={<Radio />}
                  ></FormControlLabel>
                  {sortAnswer[index][2] == correctAnswer[index] ? (
                    <CheckRoundedIcon sx={{ color: "green" }} />
                  ) : sortAnswer[index][2] == element ? (
                    <ClearRoundedIcon sx={{ color: "red" }} />
                  ) : null}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    value={1}
                    checked={element == sortAnswer[index][3] ? true : false}
                    label={sortAnswer[index][3]}
                    control={<Radio />}

                  ></FormControlLabel>
                  {sortAnswer[index][3] == correctAnswer[index] ? (
                    <CheckRoundedIcon sx={{ color: "green" }} />
                  ) : sortAnswer[index][3] == element ? (
                    <ClearRoundedIcon sx={{ color: "red" }} />
                  ) : null}
                </div>
              </RadioGroup>
            </FormControl>
          </Card>
        );
      })}
    </>
  );
};

export default Result;
