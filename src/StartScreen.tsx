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
  FormGroup,
  Label,
} from "reactstrap";
import { useLocalStorage } from "@uidotdev/usehooks";
import { VerbListOption, verbListOptions } from "./verbs";

interface StartScreenProps {
  showStart: boolean;
  startGame: () => void;
}
const StartScreen = ({ showStart, startGame }: StartScreenProps) => {
  const [chosenVerbListOption, setChosenVerbListOption] = useLocalStorage("setting-verb-list-option", 'fundamental');
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
              <Label check for="verb-list-option">
                Verbs to use
              </Label>
            <FormGroup>
              <Input
              id="verb-list-option"
                value={chosenVerbListOption}
                type="select"
                onChange={(e: any) => setChosenVerbListOption(e.target.value)}
              >
                {verbListOptions.map((verbListOption: VerbListOption) => (
                  <option key={verbListOption}>{ verbListOption }</option>
                ))}
              </Input>
            </FormGroup>
            </CardText>
            <FormGroup check>
              <Input
                id="only-fundamental"
                onChange={() => {}}
                type="checkbox"
              />{" "}
              <Label check for="only-fundamental">
                Only fundamental verbs
              </Label>
            </FormGroup>
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
