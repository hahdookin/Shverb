import {
  Button,
  Fade,
  Row,
  Card,
  CardBody,
  CardTitle,
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
  const [chosenVerbListOption, setChosenVerbListOption] = useLocalStorage(
    "setting-verb-list-option",
    "10 most common"
  );
  const [tenseInputs, setTenseInputs] = useLocalStorage(
    "setting-selected-tenses",
    {
      Presente: true,
      Imperfetto: true,
      "Passato Prossimo": true,
      Futuro: true,
      Condizionale: true,
      // "Passato Remoto",
      // "Congiuntivo (Presente)",
      // "Congiuntivo (Imperfetto)",
      // "Imperativo",
    }
  );

  return (
    <Fade in={showStart}>
      <Row className="align-items-center">
        <Card className="mx-auto">
          <CardBody>
            <CardTitle>
              <h4>Conjugate: Verbi Italiani</h4>
            </CardTitle>
            <CardText>
              <FormGroup className="mt-2">
                <Label check for="verb-list-option" className="text-muted">
                  Verbs to use
                </Label>
                <Input
                  id="verb-list-option"
                  value={chosenVerbListOption}
                  type="select"
                  onChange={(e: any) => setChosenVerbListOption(e.target.value)}
                >
                  {verbListOptions.map((verbListOption: VerbListOption) => (
                    <option key={verbListOption}>{verbListOption}</option>
                  ))}
                </Input>
              </FormGroup>
              {Object.entries(tenseInputs).map(([tense, checked]) => (
                <FormGroup check key={tense}>
                  <Input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) =>
                      setTenseInputs({
                        ...tenseInputs,
                        [tense]: e.target.checked,
                      })
                    }
                  />
                  <Label>{tense}</Label>
                </FormGroup>
              ))}
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
