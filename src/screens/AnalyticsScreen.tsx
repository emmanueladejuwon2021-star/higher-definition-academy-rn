import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ExamSession, JAMBSubject } from "../types";
import { Theme, palette } from "../theme";
import { PrimaryButton } from "../components/ui";

export function scoreSession(session: ExamSession) {
  const bySubject: Record<string, { correct: number; total: number; score: number }> = {};
  const weak: string[] = [];
  session.subjects.forEach((s) => {
    const qs = session.questions[s] || [];
    const correct = qs.filter((q) => session.answers[q.id] === q.correctOption).length;
    const score = qs.length ? Math.round((correct / qs.length) * 100) : 0;
    bySubject[s] = { correct, total: qs.length, score };
    if (score < 50) weak.push(s);
  });
  const aggregate = Object.values(bySubject).reduce((a, b) => a + b.score, 0);
  return { bySubject, aggregate, weak };
}

export default function AnalyticsScreen({ theme, session, onHome }: { theme: Theme; session: ExamSession | null; onHome: () => void }) {
  const report = useMemo(() => (session ? scoreSession(session) : null), [session]);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }} contentContainerStyle={{ padding: 20 }}>
      <Text style={{ color: palette.accent, fontWeight: "800", letterSpacing: 1 }}>RESULT SLIP</Text>
      <Text style={[styles.h1, { color: theme.text }]}>Performance analytics</Text>
      {!report && <Text style={{ color: theme.muted }}>Finish a paper to see subject scores, aggregate, and weak areas.</Text>}
      {report && (
        <>
          <View style={[styles.hero, { backgroundColor: theme.card, borderColor: theme.line }]}>
            <Text style={{ color: theme.muted }}>Aggregate (out of {session!.subjects.length * 100})</Text>
            <Text style={{ color: palette.accent, fontSize: 42, fontWeight: "800" }}>{report.aggregate}</Text>
          </View>
          {session!.subjects.map((s: JAMBSubject) => {
            const row = report.bySubject[s];
            return (
              <View key={s} style={[styles.row, { borderColor: theme.line }]}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: theme.text, fontWeight: "700" }}>{s}</Text>
                  <Text style={{ color: theme.muted }}>{row.correct}/{row.total} correct</Text>
                </View>
                <Text style={{ color: row.score >= 50 ? palette.accent : palette.danger, fontWeight: "800", fontSize: 18 }}>{row.score}</Text>
              </View>
            );
          })}
          <Text style={{ color: theme.text, fontWeight: "800", marginTop: 16 }}>Focus next</Text>
          <Text style={{ color: theme.muted, marginBottom: 16 }}>{report.weak.length ? report.weak.join(", ") : "No subject under 50. Keep the same mix and raise speed."}</Text>
        </>
      )}
      <PrimaryButton label="Back to academy" onPress={onHome} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  h1: { fontSize: 28, fontWeight: "800", marginVertical: 8 },
  hero: { borderWidth: 1, borderRadius: 18, padding: 16, marginBottom: 12 },
  row: { borderBottomWidth: 1, paddingVertical: 12, flexDirection: "row", alignItems: "center" },
});
