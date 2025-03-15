import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  Input,
  Label,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavItem,
  NavLink,
  Progress,
  Row,
  UncontrolledDropdown,
  ModalFooter,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";
import StartScreen from "./StartScreen";
import type { Verb } from "./verbs";

interface CountdownTimerProps {
  seconds: number;
}
const CountdownTimer = ({ seconds }: CountdownTimerProps) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;

  const formattedMinutes = String(m); //.padStart(2, '0');
  const formattedSeconds = String(s).padStart(2, "0");

  return <>{`${formattedMinutes}:${formattedSeconds}`}</>;
};

// const randomChance = (x: number, y: number) => {
//   return Math.random() <= x / y;
// };

// const percentChance = (percent: number) => {
//     return Math.random() <= percent;
// }

const useCountdown = () => {
  const [seconds, setSeconds] = useState(300);
  const [intervalId, setIntervalId] = useState<number | undefined>();
  const startCountdown = (seconds: number) => {
    setSeconds(seconds);
    const id = setInterval(() => {
      setSeconds((prev: number) => prev - 1);
    }, 1000);
    setIntervalId(id);
  };

  useEffect(() => {
    if (intervalId && seconds === 0) {
      console.log("clearing");
      clearInterval(intervalId);
      setIntervalId();
      return () => clearInterval(intervalId);
    }
  }, [intervalId, seconds]);

  return { startCountdown, seconds, isActive: intervalId !== undefined };
};

const TEST_VERBS = [
  "avere",
  "dormire",
  "dovere",
  "essere",
  "mangiare",
  "sapere",
  "volere",
];

export default function App() {
  const [showStart, setShowStart] = useState(true);
  const verbs = (verbsJson as Verb[]).filter((verb, i) =>
    TEST_VERBS.includes(verb.Infinitivo),
  );

  // useEffect(() => {
  //   if (!showStart && !isActive) {
  //     startCountdown(500);
  //   }
  // }, [showStart]);

  if (showStart) {
    return <StartScreen showStart={showStart} setShowStart={setShowStart} />;
  }

  return (
    <div className="App">
      <Fade>
        <Row className="justify-content-center m-4">
          <Col sm={6}>
            <Card className="mx-auto">
              <CardBody>hello!</CardBody>
            </Card>
          </Col>
        </Row>
      </Fade>
    </div>
  );
}
