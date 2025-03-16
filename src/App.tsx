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
} from "reactstrap";
import StartScreen from "./StartScreen";
import { createGame, Game, Question } from "./verbs";

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
    };
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

  return (
    <Card className="mx-auto">
      <CardBody>
        <CardTitle>
          <Row>
            <Col>
              <span style={{ color: "grey" }}>#{questionIndex + 1}</span>{" "}
              {curQuestion.tense}
            </Col>
            <Col
              className="user-select-none cursor-pointer"
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
          <Input
            invalid={answerStatus === "wrong"}
            valid={answerStatus === "correct"}
            value={answer}
            onChange={(e: any) => setAnswer(e.target.value)}
          />
        </CardText>
        <Row>
          <Col>
            <Button
              disabled={!!timeoutId}
              onClick={() => {
                if (answer === curQuestion.answer) {
                  onCorrectAnswer();
                } else {
                  setAnswerStatus("wrong");
                }
              }}
            >
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
        <CardText>ANS: {curQuestion.answer}</CardText>
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
    return <StartScreen showStart={!game} startGame={startGame} />;
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
