import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Theme, palette } from "../theme";
import { StoredResult } from "../utils/resultsStore";
import { ExamSession } from "../types";

export default function ResultHistoryAndCorrection({ theme, rows, onOpen }: { theme: Theme; rows: StoredResult[]; onOpen: (session: ExamSession) => void }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <Text style={{ color: theme.text, fontSize: 26, fontWeight: "800" }}>Result history</Text>
      {!rows.length && <Text style={{ color: theme.muted }}>Submit a paper to store a slip on this device.</Text>}
      {rows.map((r) => (
        <View key={r.id} style={{ borderWidth: 1, borderColor: theme.line, backgroundColor: theme.card, borderRadius: 14, padding: 12, marginTop: 8 }}>
          <Text style={{ color: theme.text, fontWeight: "800" }}>{r.aggregate} aggregate · {r.mode}</Text>
          <Text style={{ color: theme.muted }}>{r.createdAt} · {r.subjects.join(", ")}</Text>
          <Pressable onPress={() => setOpen(open === r.id ? null : r.id)}><Text style={{ color: palette.accent, marginTop: 6 }}>{open === r.id ? "Hide correction" : "Correct paper"}</Text></Pressable>
          {open === r.id && Object.entries(r.bySubject).map(([sub, row]) => (
            <Text key={sub} style={{ color: theme.text, marginTop: 4 }}>{sub}: {row.correct}/{row.total} ({row.score})</Text>
          ))}
          {open === r.id && (
            <Pressable onPress={() => onOpen(r.questions as ExamSession)}><Text style={{ color: palette.accent, marginTop: 8 }}>Reopen in study mode</Text></Pressable>
          )}
        </View>
      ))}
    </ScrollView>
  );
}
