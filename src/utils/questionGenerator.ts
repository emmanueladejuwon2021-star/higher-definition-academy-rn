import { JAMBSubject, Question } from "../types";
import { MOCK_QUESTIONS } from "../data/mockQuestions";

export async function generateDynamicQuestions(subject: JAMBSubject, count: number, selectedTopics: string[] = []): Promise<Question[]> {
  const mockPool = MOCK_QUESTIONS[subject] || MOCK_QUESTIONS["Use of English"] || [];
  let candidatePool = mockPool;
  if (selectedTopics.length) {
    const topicFiltered = mockPool.filter((q) => q.topic && selectedTopics.some((sel) => q.topic?.toLowerCase().includes(sel.toLowerCase()) || sel.toLowerCase().includes((q.topic || "").toLowerCase())));
    if (topicFiltered.length) candidatePool = topicFiltered;
  }
  if (!candidatePool.length) return [];
  const shuffled = [...candidatePool].sort(() => Math.random() - 0.5);
  const selected: Question[] = [];
  for (let i = 0; i < count; i++) {
    const q = shuffled[i % shuffled.length];
    selected.push({ ...q, id: `${q.id}_exam_${i}` });
  }
  return selected;
}
