import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Theme, palette } from "../theme";
import { CHALLENGE_POOL, SYNONYM_QUESTIONS } from "../data/content/EducationalGames.data";

export default function EducationalGames({ theme }: { theme: Theme }) {
  const [mode, setMode] = useState<"synonym" | "challenge">("synonym");
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [done, setDone] = useState(false);
  const raw = mode === "synonym" ? SYNONYM_QUESTIONS : CHALLENGE_POOL;
  const pool = raw.map((item: any) => ({ word: item.word || item.q, type: item.type || item.subj, options: item.options || item.opts, correct: item.correct || item.cor }));
  const q = pool[i];
  const reset = (m: "synonym" | "challenge") => { setMode(m); setI(0); setScore(0); setStreak(0); setDone(false); };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <Text style={{ color: theme.text, fontSize: 26, fontWeight: "800" }}>Speed games</Text>
      <Text style={{ color: theme.muted, marginBottom: 8 }}>Score {score} · streak {streak}</Text>
      <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
        <Pressable onPress={() => reset("synonym")}><Text style={{ color: mode === "synonym" ? palette.accent : theme.muted }}>Synonym</Text></Pressable>
        <Pressable onPress={() => reset("challenge")}><Text style={{ color: mode === "challenge" ? palette.accent : theme.muted }}>Challenge</Text></Pressable>
      </View>
      {done || !q ? <Text style={{ color: palette.accent, fontSize: 20, fontWeight: "800" }}>Round clear. {score}/{pool.length}</Text> : (
        <View>
          <Text style={{ color: palette.accent, fontSize: 12 }}>{q.type || "Question"}</Text>
          <Text style={{ color: theme.text, fontSize: 28, fontWeight: "800", marginVertical: 8 }}>{q.word}</Text>
          {(q.options || []).map((o: string) => (
            <Pressable key={o} onPress={() => {
              const correct = o === q.correct;
              if (correct) { setScore((n) => n + 1); setStreak((n) => n + 1); } else setStreak(0);
              if (i + 1 >= pool.length) setDone(true); else setI(i + 1);
            }} style={{ borderWidth: 1, borderColor: theme.line, backgroundColor: theme.card, borderRadius: 14, padding: 12, marginBottom: 8 }}>
              <Text style={{ color: theme.text }}>{o}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
