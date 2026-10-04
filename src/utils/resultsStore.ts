import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "hda_results";

export type StoredResult = {
  id: string;
  createdAt: string;
  subjects: string[];
  mode: string;
  aggregate: number;
  bySubject: Record<string, { correct: number; total: number; score: number }>;
  answers: Record<string, string | null>;
  questions: unknown;
};

export async function listResults(): Promise<StoredResult[]> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function saveResult(row: StoredResult) {
  const all = await listResults();
  await AsyncStorage.setItem(KEY, JSON.stringify([row, ...all].slice(0, 50)));
}
