import verbsJson from "./verbsList.json";

const TEST_VERBS = [
  "avere",
  "dormire",
  "dovere",
  "essere",
  "mangiare",
  "sapere",
  "volere",
];

type AusiliarioTypes = "avere" | "essere" | "avere/essere";
export interface Verb {
  Infinitivo: string;
  Significato: string;
  "Presente-io": string;
  "Presente-tu": string;
  "Presente-lui/lei": string;
  "Presente-noi": string;
  "Presente-voi": string;
  "Presente-loro": string;
  Ausiliario: AusiliarioTypes;
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
  Fondamentale: "Y" | "N";
  Reverso: number;
}
const isPlural = (person: Person): boolean => {
  return ["noi", "voi", "loro"].includes(person);
};

const persons = ["io", "tu", "lui/lei", "noi", "voi", "loro"] as const;
type Person = (typeof persons)[number];

const genders = ["maschile", "femminile"] as const;
type Gender = (typeof genders)[number];

const tenses = [
  "Presente",
  "Imperfetto",
  "Passato Prossimo",
  "Passato Remoto",
  "Futuro",
  "Congiuntivo (Presente)",
  "Congiuntivo (Imperfetto)",
  "Condizionale",
  "Imperativo",
] as const;
type Tense = (typeof tenses)[number];

export const getVerbInTenseAndPerson = ({
  verb,
  tense,
  person,
  gender,
  ausiliario,
}: {
  verb: Verb;
  tense: Tense;
  person: Person;
  gender: Gender;
  ausiliario: Verb;
}): string => {
  if (tense === "Passato Prossimo") {
    // handle differently
    const conjugatedAusiliario = getVerbInTenseAndPerson({
      verb: ausiliario,
      tense: "Presente",
      person,
      gender,
      ausiliario,
    });
    let participio = verb.Participio;
    if (ausiliario.Infinitivo === "essere") {
      const plural = isPlural(person);
      let ending = "o";
      if (!plural && gender === "femminile") ending = "a";
      if (plural && gender === "maschile") ending = "i";
      if (plural && gender === "femminile") ending = "e";
      participio = verb.Participio.replace(/.$/, ending);
    }
    return `${conjugatedAusiliario} ${participio}`;
  }
  if (tense === "Imperativo") {
    // handle differently
    return "";
  }
  const key: `${typeof tense}-${typeof person}` = `${tense}-${person}`;
  return verb[key] as string;
};

const randomIndex = (length: number) => Math.floor(Math.random() * length);

function randomSelection<T>(arr: readonly T[]) {
  return arr[randomIndex(arr.length)];
}

export interface Question {
  verb: Verb;
  tense: Tense;
  person: Person;
  gender: Gender;
  answer: string;
  ausiliario: Verb;
  plural: boolean;
}
export type Game = Question[];
export const createGame = (): Game => {
  const tensesToUse = tenses.slice(0, 3);

  const verbsList = verbsJson as Verb[];
  const verbs = verbsList.filter((verb) => verb.Fondamentale === "Y");
  const avere = verbsList.find((verb) => verb.Infinitivo === "avere")!;
  const essere = verbsList.find((verb) => verb.Infinitivo === "essere")!;
  const ausiliari = { avere, essere };

  return [...Array(5)].map(() => {
    const verb = randomSelection(verbs);
    const tense = randomSelection(tensesToUse);
    const person = randomSelection(persons);
    const gender = randomSelection(genders);

    let ausiliario: Verb;
    if (verb.Ausiliario === "avere/essere") {
      ausiliario = randomSelection([avere, essere]);
    } else {
      ausiliario = ausiliari[verb.Ausiliario];
    }

    return {
      verb,
      tense,
      person,
      gender,
      ausiliario,
      plural: isPlural(person),
      answer: getVerbInTenseAndPerson({
        verb,
        tense,
        person,
        gender,
        ausiliario,
      }),
    };
  });
};
