import { ExamMode, ExamSession, JAMBSubject, Question } from "../types";
import { MOCK_QUESTIONS } from "../data/mockQuestions";

function pad(subject: JAMBSubject, count: number): Question[] {
  const pool = MOCK_QUESTIONS[subject] || MOCK_QUESTIONS["Use of English"] || [];
  if (!pool.length) return [];
  const out: Question[] = [];
  for (let i = 0; i < count; i++) {
    const base = pool[i % pool.length];
    out.push({ ...base, id: `${subject}-${i}-${base.id}` });
  }
  return out;
}

export function buildSession(subjects: JAMBSubject[], mode: ExamMode): ExamSession {
  const questions = {} as Record<JAMBSubject, Question[]>;
  subjects.forEach((s) => {
    const count = s === "Use of English" ? 60 : 40;
    questions[s] = pad(s, mode === ExamMode.STUDY ? Math.min(10, count) : count);
  });
  const duration = mode === ExamMode.EXAM ? 120 : mode === ExamMode.PRACTICE ? 45 : 0;
  return {
    id: `hda-${Date.now()}`,
    subjects,
    mode,
    duration,
    startTime: Date.now(),
    questions,
    answers: {},
    flags: [],
    timeRemaining: duration * 60,
  };
}
