import {
  Button,
  Fade,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Input,
} from "reactstrap";
import { useLocalStorage } from "@uidotdev/usehooks";

interface StartScreenProps {
  showStart: boolean;
  startGame: () => void;
}
const StartScreen = ({ showStart, startGame }: StartScreenProps) => {
  const [value, setValue] = useLocalStorage("test-key", 1);
  return (
    <Fade in={showStart}>
      <Row className="align-items-center">
        <Card className="w-75 mx-auto mt-4">
          <CardBody>
            <CardTitle>
              <h4>Shverb</h4>
            </CardTitle>
            <CardSubtitle>Conjugate l'italiano!</CardSubtitle>
            <CardText>
              <Input
                value={value}
                type="select"
                onChange={(e: any) => setValue(e.target.value)}
              >
                <option>1</option>
                <option>2</option>
              </Input>
            </CardText>
            <Fade>
              <Button color="primary" onClick={() => startGame()}>
                Start
              </Button>
            </Fade>
          </CardBody>
        </Card>
      </Row>
    </Fade>
  );
};

export default StartScreen;
