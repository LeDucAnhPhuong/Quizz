import { useState } from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { QUESTIONS } from "../source/question";
import Result from "./Result.jsx";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
function App() {
  const boxCss = {
    display: "flex",
    width: "800px",
    flexWrap: "wrap",
    columnGap: "10px",
    rowGap: "20px",
  };
  const radioGroupCss = {
    display: "flex",
    flexDirection: "column",
    width: "800px",
    boxSizing: "border-box",
    padding: "20px",
    alignItems: "start",
    position: "relative",
  };
  const [numberQuestion, setNumberQuestion] = useState({
    easy: 0,
    medium: 0,
    hard: 0,
    addQuestion: false,
  });
  const [checkAnswer, setCheckAnswer] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [quizz, setQuizz] = useState([]);
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", rowGap: "20px", flexDirection: "column" }}>
      <Box sx={boxCss}>
        <TextField
          onChange={({ target }) => {
            setNumberQuestion({
              ...numberQuestion,
              easy: target.value,
            });
          }}
          sx={{ flex: "1 0 30%" }}
          defaultValuevalue={0}
          label="Easy"
        ></TextField>
        <TextField
          onChange={({ target }) => {
            setNumberQuestion({
              ...numberQuestion,
              medium: target.value,
            });
          }}
          sx={{ flex: "1 0 30%" }}
          defaultValuevalue={0}
          label="Medium"
        ></TextField>
        <TextField
          onChange={({ target }) => {
            setNumberQuestion({
              ...numberQuestion,
              hard: target.value,
            });
          }}
          sx={{ flex: "1 0 30%" }}
          defaultValuevalue={0}
          label="Hard"
        ></TextField>
        <Button
          onClick={() => {
            setNumberQuestion({
              ...numberQuestion,
              addQuestion: true,
            });
            const leng = QUESTIONS.length;
            let arr = [];
            let correct = [];
            let position = [];
            let sortAnswer = []
            let numberEasy = Number(numberQuestion.easy);
            let numberMedium = Number(numberQuestion.medium);
            let numberHard = Number(numberQuestion.hard);
            setCheckAnswer(
              Array(numberEasy + numberMedium + numberHard).fill(0)
            );
            QUESTIONS.forEach((e, index) => {
              const number = Math.floor(Math.random() * leng);
              let answer = [];
              let numberRandom = Math.floor(Math.random() * 10) % 4;
              let check = false;
              if (QUESTIONS[number].difficulty == "easy" && numberEasy > 0) {
                numberEasy--;
                check = true;
              }
              if (
                QUESTIONS[number].difficulty == "medium" &&
                numberMedium > 0
              ) {
                numberMedium--;
                check = true;
              }
              if (QUESTIONS[number].difficulty == "hard" && numberHard > 0) {
                numberHard--;
                check = true;
              }
              if (check) {
                answer[(numberRandom + 1) % 4] = e.correctAnswer;
                answer[(numberRandom + 2) % 4] =
                  e.incorrectAnswers[numberRandom % 3];
                answer[(numberRandom + 3) % 4] =
                  e.incorrectAnswers[(numberRandom + 1) % 3];
                answer[(numberRandom + 4) % 4] =
                  e.incorrectAnswers[(numberRandom + 2) % 3];
                correct = [...correct, e.correctAnswer];
                sortAnswer = [...sortAnswer, answer]
                arr = [...arr, { ...QUESTIONS[number], answer: answer }];
                position = [...position, index];
              }
            });
            localStorage.setItem("positionQuestion", JSON.stringify(position));
            localStorage.setItem("sortAnswer", JSON.stringify(sortAnswer));
            setCorrectAnswer(correct);
            setQuizz(arr);
          }}
          sx={{ flex: "3 0 100%" }}
          fullWidth
          variant="contained"
        >
          Add question
        </Button>
      </Box>
      {quizz.map((e, index) => {
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
                  e.difficulty == "easy"
                    ? "green"
                    : e.difficulty == "medium"
                    ? "yellow"
                    : "red",
              }}
            ></span>
            <Typography sx={{ display: "flex", alignItems: "start" }}>
              {e.question.text}
            </Typography>
            <FormControl>
              <RadioGroup
                onChange={({ target }) => {
                  const result = checkAnswer.toSpliced(
                    index,
                    1,
                    target.value
                  );
                  setCheckAnswer(result);
                }}
                sx={radioGroupCss}
              >
                <FormControlLabel
                  value={e.answer[0]}
                  checked={checkAnswer[index] == e.answer[0] ? true : false}
                  label={e.answer[0]}
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  value={e.answer[1]}
                  checked={checkAnswer[index] == e.answer[1] ? true : false}
                  label={e.answer[1]}
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  value={e.answer[2]}
                  checked={checkAnswer[index] == e.answer[2] ? true : false}
                  label={e.answer[2]}
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  value={e.answer[3]}
                  checked={checkAnswer[index] == e.answer[3] ? true : false}
                  label={e.answer[3]}
                  control={<Radio />}
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </Card>
        );
      })}
      {numberQuestion.addQuestion && (
        <Box sx={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <Button
            onClick={() => {
              setCheckAnswer(
                Array(
                  numberQuestion.easy +
                    numberQuestion.medium +
                    numberQuestion.hard
                ).fill(0)
              );
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
            variant="outlined"
            startIcon={<RestartAltIcon />}
          >
            Reset
          </Button>
          <Button
            onClick={() => {
              localStorage.setItem("answer", JSON.stringify(checkAnswer));
              localStorage.setItem(
                "correctAnswer",
                JSON.stringify(correctAnswer)
              );
              navigate("/result");
            }}
            variant="contained"
            startIcon={<SendRoundedIcon />}
          >
            Submit
          </Button>
        </Box>
      )}
      <Routes>
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
