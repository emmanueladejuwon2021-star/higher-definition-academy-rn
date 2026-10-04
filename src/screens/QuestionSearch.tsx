import React, { useMemo, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { Theme, palette } from "../theme";
import { MOCK_QUESTIONS } from "../data/mockQuestions";
import { Question } from "../types";

export default function QuestionSearch({ theme }: { theme: Theme }) {
  const pool = useMemo(() => Object.values(MOCK_QUESTIONS).flat() as Question[], []);
  const [q, setQ] = useState("");
  const [subject, setSubject] = useState("All");
  const hits = pool.filter((item) => (subject === "All" || item.subject === subject) && (item.text.toLowerCase().includes(q.toLowerCase()) || (item.topic || "").toLowerCase().includes(q.toLowerCase()))).slice(0, 40);
  const subjects = ["All", ...Object.keys(MOCK_QUESTIONS)];
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <Text style={{ color: theme.text, fontSize: 26, fontWeight: "800" }}>Question search</Text>
      <Text style={{ color: theme.muted, marginBottom: 8 }}>{pool.length} items in the loaded bank</Text>
      <TextInput value={q} onChangeText={setQ} placeholder="Stem or topic" placeholderTextColor={theme.muted} style={{ borderWidth: 1, borderColor: theme.line, color: theme.text, borderRadius: 12, padding: 12, marginBottom: 8, backgroundColor: theme.card }} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
        {subjects.map((s) => (
          <Text key={s} onPress={() => setSubject(s)} style={{ color: subject === s ? palette.accent : theme.muted, marginRight: 12 }}>{s}</Text>
        ))}
      </ScrollView>
      {hits.map((item) => (
        <View key={item.id} style={{ borderWidth: 1, borderColor: theme.line, backgroundColor: theme.card, borderRadius: 14, padding: 12, marginBottom: 8 }}>
          <Text style={{ color: palette.accent, fontSize: 12, fontWeight: "800" }}>{item.subject} · {item.topic || item.year}</Text>
          <Text style={{ color: theme.text, marginVertical: 6 }}>{item.text}</Text>
          <Text style={{ color: theme.muted }}>A {item.options.A} · B {item.options.B} · C {item.options.C} · D {item.options.D}</Text>
          <Text style={{ color: palette.accent, marginTop: 4 }}>Answer {item.correctOption}. {item.explanation}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
