import { useEffect, useState } from "react";
import {
  Col,
  Fade,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Input,
  Button,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import StartScreen from "./StartScreen";
import { createGame, Game, Question } from "./verbs";
import "./App.css";
import { useLocalStorage } from "@uidotdev/usehooks";

// const randomChance = (x: number, y: number) => {
//   return Math.random() <= x / y;
// };

// const percentChance = (percent: number) => {
//     return Math.random() <= percent;
// }

const vowelSet = ["a", "e", "i", "o", "u"] as const;
type VowelSet = (typeof vowelSet)[number];

interface GameControllerProps {
  game: Game;
  onCancelGame: () => void;
}
type AnswerStatus = "pending" | "wrong" | "correct";
const GameController = ({ game, onCancelGame }: GameControllerProps) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showCorrectAnswer, setShowCorrectAnswer] = useLocalStorage(
    "show-correct-answer",
    false,
  );
  const [timeoutId, setTimeoutId] = useState<number | undefined>();
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>("pending");
  const [showVowelSet, setShowVowelSet] = useState<VowelSet | undefined>();

  const curQuestion = game[questionIndex];

  const vowelSetMap = {
    a: ["à"],
    e: ["è", "é"],
    i: ["ì"],
    o: ["ò", "ó"],
    u: ["ù"],
  };

  useEffect(() => {
    if (!answer.length) {
      setShowVowelSet(undefined);
      return;
    }
    const lastChar = answer[answer.length - 1] as VowelSet;
    if (vowelSet.includes(lastChar)) {
      setShowVowelSet(lastChar);
    } else {
      setShowVowelSet(undefined);
    }
  }, [answer]);

  const getEmoji = (question: Question) => {
    if (question.gender === "maschile") {
      return "👨";
    } else {
      return "👩";
    }
  };
  const onCorrectAnswer = () => {
    setAnswerStatus("correct");
    const timeoutId = setTimeout(() => {
      setQuestionIndex(questionIndex + 1);
      setTimeoutId(undefined);
      setAnswerStatus("pending");
      setAnswer("");
    }, 750);
    setTimeoutId(timeoutId);
  };

  const onNextClicked = () => {
    const answerToUse = answer.toLowerCase().trim();
    if (answerToUse === curQuestion.answer) {
      onCorrectAnswer();
    } else {
      setAnswerStatus("wrong");
    }
  };

  const onKeyDown = (e: any) => {
    if (e.key === "Enter") {
      onNextClicked();
    }
    if (["1", "2"].includes(e.key) && showVowelSet) {
      e.preventDefault();
      const index = Number(e.key) - 1;
      const set = vowelSetMap[showVowelSet];
      const vowel = set[index];
      if (!vowel) return;
      setAnswer(answer.replace(/.$/, vowel));
    }
  };

  return (
    <Card className="mx-auto">
      <CardBody>
        <CardTitle>
          <Row className="justify-content-between">
            <Col>
              <span style={{ color: "grey" }}>#{questionIndex + 1}</span>{" "}
              {curQuestion.tense}
            </Col>
            <Col
              className="user-select-none cursor-pointer"
              style={{ textAlign: "right" }}
              onClick={onCancelGame}
              xs={2}
            >
              ✖️
            </Col>
          </Row>
        </CardTitle>
        <CardText>
          {getEmoji(curQuestion)} {curQuestion.person}{" "}
          <b>{curQuestion.verb.Infinitivo}</b>{" "}
          <span style={{ color: "lightgray", fontSize: ".8em" }}>
            {curQuestion.verb.Significato}
          </span>
        </CardText>
        <CardText>
          <InputGroup style={{ fontSize: "16px" }}>
            <InputGroupText>{curQuestion.person}</InputGroupText>
            <Input
              invalid={answerStatus === "wrong"}
              valid={answerStatus === "correct"}
              value={answer}
              onKeyDown={onKeyDown}
              onChange={(e: any) => setAnswer(e.target.value)}
            />
          </InputGroup>
        </CardText>
        <Row>
          <Col>
            <Button disabled={!!timeoutId} onClick={onNextClicked}>
              Next
            </Button>
          </Col>
          <Col>
            {showVowelSet &&
              vowelSetMap[showVowelSet].map((vowel) => (
                <Button
                  onClick={() => {
                    setAnswer(answer.replace(/.$/, vowel));
                  }}
                >
                  {vowel}
                </Button>
              ))}
          </Col>
        </Row>
        <CardText style={{ color: "lightgrey" }} className="mt-2"
            onClick={() => setShowCorrectAnswer((prev) => !prev)}
        >
          <span>{showCorrectAnswer ? "🐵" : "🙈"}</span>{" "}
          <span
            className="cursor-pointer text-decoration-underline text-select-none"
          >
            {showCorrectAnswer ? curQuestion.answer : "Reveal answer"}
          </span>
        </CardText>
      </CardBody>
    </Card>
  );
};

export default function App() {
  const [game, setGame] = useState<Game | undefined>();

  const startGame = () => {
    setGame(createGame());
  };

  if (!game) {
    return (
      <div className="App">
        <Fade>
          <Row className="justify-content-center m-4">
            <Col sm={6}>
              <StartScreen showStart={!game} startGame={startGame} />
            </Col>
          </Row>
        </Fade>
      </div>
    );
  }

  return (
    <div className="App">
      <Fade>
        <Row className="justify-content-center m-4">
          <Col sm={6}>
            <GameController
              game={game}
              onCancelGame={() => setGame(undefined)}
            />
          </Col>
        </Row>
      </Fade>
    </div>
  );
}
