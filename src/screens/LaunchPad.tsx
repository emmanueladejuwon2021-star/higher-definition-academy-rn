import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ExamMode, ExamSession, JAMBSubject } from "../types";
import { Theme, palette } from "../theme";
import { buildSession } from "../utils/session";
import { SYLLABUS_TOPICS } from "../data/syllabusTopics";
import { PrimaryButton } from "../components/ui";

export default function LaunchPad({
  theme, subjects, onStart, onBack,
}: { theme: Theme; subjects: JAMBSubject[]; onStart: (s: ExamSession) => void; onBack: () => void }) {
  const [mode, setMode] = useState<ExamMode>(ExamMode.EXAM);
  const [tab, setTab] = useState<JAMBSubject>(subjects[0] || "Use of English");
  const topics = SYLLABUS_TOPICS[tab] || SYLLABUS_TOPICS["Use of English"] || [];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
      <Pressable onPress={onBack}><Text style={{ color: palette.accent, fontWeight: "700" }}>Back</Text></Pressable>
      <Text style={[styles.h1, { color: theme.text }]}>CBT launch pad</Text>
      <Text style={{ color: theme.muted, marginBottom: 14 }}>English + 3 subjects. Exam is 120 minutes. Practice is 45. Study is untimed, 10 items each.</Text>
      <View style={styles.row}>
        {[ExamMode.EXAM, ExamMode.PRACTICE, ExamMode.STUDY].map((m) => (
          <Pressable key={m} onPress={() => setMode(m)} style={[styles.chip, { borderColor: mode === m ? palette.accent : theme.line, backgroundColor: mode === m ? palette.accentDim : theme.card }]}>
            <Text style={{ color: mode === m ? palette.accent : theme.text, fontWeight: "800", textTransform: "capitalize" }}>{m}</Text>
          </Pressable>
        ))}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 12 }}>
        {subjects.map((s) => (
          <Pressable key={s} onPress={() => setTab(s)} style={[styles.tab, { borderColor: tab === s ? palette.accent : theme.line }]}>
            <Text style={{ color: tab === s ? palette.accent : theme.muted, fontWeight: "700" }}>{s}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.line }]}>
        <Text style={{ color: theme.text, fontWeight: "800", marginBottom: 8 }}>{tab} syllabus focus</Text>
        {topics.slice(0, 8).map((t) => (
          <Text key={t} style={{ color: theme.muted, marginBottom: 6 }}>• {t}</Text>
        ))}
        {!topics.length && <Text style={{ color: theme.muted }}>Questions are drawn from the academy bank for this subject.</Text>}
      </View>
      <View style={{ height: 16 }} />
      <PrimaryButton label={`Start ${mode} session`} onPress={() => onStart(buildSession(subjects, mode))} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  h1: { fontSize: 26, fontWeight: "800", marginTop: 8, marginBottom: 6 },
  row: { flexDirection: "row", gap: 8 },
  chip: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8 },
  tab: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8, marginRight: 8 },
  card: { borderWidth: 1, borderRadius: 16, padding: 14 },
});
