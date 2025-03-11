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
// import "./styles.css";
import verbs from "./verbs.json";

interface Verb {
  Infinitivo: string;
  Significato: string;
  "Presente-io": string;
  "Presente-tu": string;
  "Presente-lui/lei": string;
  "Presente-noi": string;
  "Presente-voi": string;
  "Presente-loro": string;
  Ausiliario: string;
  Participio: string;
  Gerundio: string;
  "Imperfetto-io": string;
  "Imperfetto-tu": string;
  "Imperfetto-lui/lei": string;
  "Imperfetto-noi": string;
  "Imperfetto-voi": string;
  "Imperfetto-loro": string;
  "Passato Remoto-io": string;
  "Passato Remoto-tu": string;
  "Passato Remoto-lui/lei": string;
  "Passato Remoto-noi": string;
  "Passato Remoto-voi": string;
  "Passato Remoto-loro": string;
  "Futuro-io": string;
  "Futuro-tu": string;
  "Futuro-lui/lei": string;
  "Futuro-noi": string;
  "Futuro-voi": string;
  "Futuro-loro": string;
  "Congiuntivo (Presente)-io": string;
  "Congiuntivo (Presente)-tu": string;
  "Congiuntivo (Presente)-lui/lei": string;
  "Congiuntivo (Presente)-noi": string;
  "Congiuntivo (Presente)-voi": string;
  "Congiuntivo (Presente)-loro": string;
  "Congiuntivo (Imperfetto)-io": string;
  "Congiuntivo (Imperfetto)-tu": string;
  "Congiuntivo (Imperfetto)-lui/lei": string;
  "Congiuntivo (Imperfetto)-noi": string;
  "Congiuntivo (Imperfetto)-voi": string;
  "Congiuntivo (Imperfetto)-loro": string;
  "Condizionale-io": string;
  "Condizionale-tu": string;
  "Condizionale-lui/lei": string;
  "Condizionale-noi": string;
  "Condizionale-voi": string;
  "Condizionale-loro": string;
  "Imperativo-tu": string;
  "Imperativo-lui/lei": string;
  "Imperativo-noi": string;
  "Imperativo-voi": string;
  "Imperativo-loro": string;
  "conj.": string;
  "PR regolare": string;
  "futuro regolare": string;
  "part. regolare": string;
  Fondamentale: string;
  Reverso: string;
}

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

export default function App() {
  const [showSplash, setShowSplash] = useState(false);
  console.log(verbs);

  // useEffect(() => {
  //   if (!showSplash && !isActive) {
  //     startCountdown(500);
  //   }
  // }, [showSplash]);

  if (showSplash) {
    return (
      <SplashScreen showSplash={showSplash} setShowSplash={setShowSplash} />
    );
  }

  return (
    <div className="App">
      <Navbar className="bg-body-tertiary">
        <NavbarBrand href="/">FormRL</NavbarBrand>
        <Nav className="me-auto">
          <NavItem>
            <NavLink disabled href="#">
              HI
            </NavLink>
          </NavItem>
        </Nav>

        <UncontrolledDropdown nav inNavbar style={{ listStyle: "none" }}>
          <DropdownToggle caret>
            Welcome <b>Chris</b>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem active={false}></DropdownItem>
            <DropdownItem>Option 2</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Reset</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Navbar>

      <Row className="justify-content-center m-4">
        <Col sm={6}>
          <Card className="mx-auto">
            <CardBody></CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
