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

interface GameControllerProps {
  game: Game;
}
const GameController = ({ game }: GameControllerProps) => {
  const [questionIndex, setQuestionIndex] = useState(1);
  const [answer, setAnswer] = useState("");

  const curQuestion = game[questionIndex];

  const getEmoji = (question: Question) => {
    const plural = ["noi", "voi", "loro"].includes(question.person);
    if (question.gender === "maschile") {
      return "👨";
    } else {
      return "👩";
    }
  };

  return (
    <Card className="mx-auto">
      <CardBody>
        <CardTitle>
          #{questionIndex + 1} {curQuestion.tense}
        </CardTitle>
        <CardText>
          {getEmoji(curQuestion)} {curQuestion.person}{" "}
          <b>{curQuestion.verb.Infinitivo}</b>
        </CardText>
        <CardText>
          <Input
            value={answer}
            onChange={(e: any) => setAnswer(e.target.value)}
          />
        </CardText>
        <Button
          onClick={() => {
            if (answer === curQuestion.answer) {
              setQuestionIndex(questionIndex + 1);
            }
          }}
        >
          Next
        </Button>
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

  // useEffect(() => {
  //   if (!showStart && !isActive) {
  //     startCountdown(500);
  //   }
  // }, [showStart]);

  if (!game) {
    return <StartScreen showStart={!game} startGame={startGame} />;
  }

  return (
    <div className="App">
      <Fade>
        <Row className="justify-content-center m-4">
          <Col sm={6}>
            <GameController game={game} />
          </Col>
        </Row>
      </Fade>
    </div>
  );
}
