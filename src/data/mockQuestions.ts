import { Question } from "../types";

const q = (id: string, subject: Question["subject"], text: string, options: Question["options"], correctOption: Question["correctOption"], explanation: string, topic: string): Question => ({
  id, subject, year: 2024, text, options, correctOption, explanation, topic,
});

export const MOCK_QUESTIONS: Record<string, Question[]> = {
  "Use of English": [
    q("eng1", "Use of English", "Neither of the boys ____ present at the hearing yesterday.", { A: "were", B: "was", C: "are", D: "will be" }, "B", "Neither of takes a singular verb; yesterday needs past tense.", "Sentence completion"),
    q("eng2", "Use of English", "The word nearest in meaning to disdain is:", { A: "approval", B: "contempt", C: "indifference", D: "support" }, "B", "Disdain is contemptuous dislike.", "Synonyms"),
    q("eng3", "Use of English", "Opposite of arbitrary is:", { A: "capricious", B: "methodical", C: "random", D: "dictatorial" }, "B", "Arbitrary is whim-based; methodical is systematic.", "Antonyms"),
    q("eng4", "Use of English", "Why were staff anxious about Fafore's dismissal in The Lekki Headmaster?", { A: "Sympathy and dissatisfaction with the board", B: "They supported the board fully", C: "They disliked Fafore", D: "They blamed the community" }, "A", "Fafore was respected; the abrupt decision caused distress.", "The Lekki Headmaster"),
  ],
  "Mathematics": [
    q("m1", "Mathematics", "Solve x^2 - 5x + 6 = 0.", { A: "2 and 3", B: "1 and 6", C: "-2 and -3", D: "5 and 1" }, "A", "Factors to (x-2)(x-3).", "Quadratics"),
    q("m2", "Mathematics", "log10 1000 equals:", { A: "2", B: "3", C: "10", D: "100" }, "B", "10^3 = 1000.", "Logs"),
  ],
  "Physics": [
    q("p1", "Physics", "The SI unit of force is:", { A: "joule", B: "newton", C: "watt", D: "pascal" }, "B", "Force is measured in newtons.", "Mechanics"),
    q("p2", "Physics", "Momentum is conserved when:", { A: "net external force is zero", B: "speed is constant only", C: "mass changes", D: "friction is large" }, "A", "Isolated system: net external force zero.", "Momentum"),
  ],
  "Chemistry": [
    q("c1", "Chemistry", "The organelle analogy does not apply; moles in 18g of water are:", { A: "0.5", B: "1", C: "2", D: "18" }, "B", "Molar mass of water is 18 g/mol.", "Mole concept"),
  ],
  "Biology": [
    q("b1", "Biology", "Aerobic respiration is centred in the:", { A: "ribosome", B: "mitochondrion", C: "Golgi", D: "nucleolus" }, "B", "Mitochondria run the Krebs cycle and electron transport.", "Cell"),
  ],
};
