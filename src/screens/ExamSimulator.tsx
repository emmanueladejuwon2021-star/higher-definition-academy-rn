import React, { useEffect, useMemo, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import * as Speech from "expo-speech";
import { ExamSession, JAMBSubject } from "../types";
import { Theme, palette } from "../theme";

export default function ExamSimulator({
  theme, session, onFinish, onExit, onToggleTheme,
}: {
  theme: Theme;
  session: ExamSession;
  onFinish: (session: ExamSession) => void;
  onExit: () => void;
  onToggleTheme: () => void;
}) {
  const [subject, setSubject] = useState<JAMBSubject>(session.subjects[0]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(session.answers);
  const [flags, setFlags] = useState<string[]>(session.flags);
  const [timeLeft, setTimeLeft] = useState(session.timeRemaining);
  const [grid, setGrid] = useState(false);
  const [calc, setCalc] = useState(false);
  const [expr, setExpr] = useState("");
  const [exit, setExit] = useState(false);
  const [solution, setSolution] = useState(false);

  useEffect(() => {
    if (session.mode !== "exam" && session.mode !== "practice") return;
    if (timeLeft <= 0) return;
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [session.mode, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && (session.mode === "exam" || session.mode === "practice")) finish();
  }, [timeLeft]);

  const questions = session.questions[subject] || [];
  const q = questions[index];
  const clock = useMemo(() => {
    const m = Math.floor(Math.max(timeLeft, 0) / 60);
    const s = Math.max(timeLeft, 0) % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  }, [timeLeft]);

  const choose = (opt: "A" | "B" | "C" | "D") => {
    if (!q) return;
    setAnswers((prev) => ({ ...prev, [q.id]: opt }));
    if (session.mode === "study") setSolution(true);
  };

  const finish = () => onFinish({ ...session, answers, flags, timeRemaining: timeLeft });

  const speak = () => {
    if (!q) return;
    Speech.stop();
    Speech.speak(`${q.text}. A ${q.options.A}. B ${q.options.B}. C ${q.options.C}. D ${q.options.D}.`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <View style={[styles.bar, { borderColor: theme.line }]}>
        <Pressable onPress={() => setExit(true)}><Text style={{ color: palette.danger, fontWeight: "800" }}>Exit</Text></Pressable>
        <Text style={{ color: timeLeft < 300 ? palette.danger : palette.accent, fontWeight: "800" }}>{session.duration ? clock : "Untimed"}</Text>
        <Pressable onPress={onToggleTheme}><Text style={{ color: theme.muted }}>{theme.dark ? "Light" : "Dark"}</Text></Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ maxHeight: 48 }} contentContainerStyle={{ paddingHorizontal: 12, gap: 8, alignItems: "center" }}>
        {session.subjects.map((s) => (
          <Pressable key={s} onPress={() => { setSubject(s); setIndex(0); setSolution(false); }} style={[styles.chip, { borderColor: s === subject ? palette.accent : theme.line }]}>
            <Text style={{ color: s === subject ? palette.accent : theme.muted, fontWeight: "700" }}>{s}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 30 }}>
        <Text style={{ color: theme.muted, marginBottom: 8 }}>Question {index + 1} of {questions.length}{q?.topic ? ` · ${q.topic}` : ""}</Text>
        <Text style={[styles.q, { color: theme.text }]}>{q?.text || "No questions loaded for this subject."}</Text>
        {(["A", "B", "C", "D"] as const).map((k) => {
          const selected = q && answers[q.id] === k;
          const correct = session.mode === "study" && solution && q?.correctOption === k;
          const wrong = session.mode === "study" && solution && selected && q?.correctOption !== k;
          return (
            <Pressable key={k} onPress={() => choose(k)} style={[styles.opt, { borderColor: correct ? palette.accent : wrong ? palette.danger : selected ? palette.accent : theme.line, backgroundColor: theme.card }]}>
              <Text style={{ color: palette.accent, fontWeight: "800", width: 22 }}>{k}</Text>
              <Text style={{ color: theme.text, flex: 1 }}>{q?.options[k]}</Text>
            </Pressable>
          );
        })}
        {session.mode === "study" && solution && q?.explanation ? (
          <Text style={{ color: theme.muted, marginTop: 8 }}>{q.explanation}</Text>
        ) : null}
        <View style={styles.row}>
          <Pressable onPress={() => { setIndex((i) => Math.max(0, i - 1)); setSolution(false); }} style={styles.small}><Text style={{ color: theme.text }}>Prev</Text></Pressable>
          <Pressable onPress={() => q && setFlags((f) => f.includes(q.id) ? f.filter((x) => x !== q.id) : [...f, q.id])} style={styles.small}><Text style={{ color: palette.warn }}>{q && flags.includes(q.id) ? "Unflag" : "Flag"}</Text></Pressable>
          <Pressable onPress={speak} style={styles.small}><Text style={{ color: theme.text }}>Read</Text></Pressable>
          <Pressable onPress={() => setCalc(true)} style={styles.small}><Text style={{ color: theme.text }}>Calc</Text></Pressable>
          <Pressable onPress={() => setGrid(true)} style={styles.small}><Text style={{ color: theme.text }}>Grid</Text></Pressable>
          <Pressable onPress={() => { setIndex((i) => Math.min(questions.length - 1, i + 1)); setSolution(false); }} style={styles.small}><Text style={{ color: theme.text }}>Next</Text></Pressable>
        </View>
        <Pressable onPress={finish} style={[styles.submit, { backgroundColor: palette.accent }]}><Text style={{ fontWeight: "800" }}>Submit paper</Text></Pressable>
      </ScrollView>
      <Modal visible={grid} transparent animationType="fade">
        <View style={styles.modal}>
          <View style={[styles.sheet, { backgroundColor: theme.card }]}>
            <Text style={{ color: theme.text, fontWeight: "800", marginBottom: 10 }}>Question map</Text>
            <View style={styles.wrap}>
              {questions.map((item, i) => (
                <Pressable key={item.id} onPress={() => { setIndex(i); setGrid(false); }} style={[styles.cell, { backgroundColor: answers[item.id] ? palette.accent : flags.includes(item.id) ? palette.warn : theme.bg }]}>
                  <Text style={{ color: answers[item.id] ? "#04140c" : theme.text, fontWeight: "700" }}>{i + 1}</Text>
                </Pressable>
              ))}
            </View>
            <Pressable onPress={() => setGrid(false)}><Text style={{ color: palette.accent, marginTop: 12 }}>Close</Text></Pressable>
          </View>
        </View>
      </Modal>
      <Modal visible={calc} transparent animationType="slide">
        <View style={styles.modal}>
          <View style={[styles.sheet, { backgroundColor: theme.card }]}>
            <Text style={{ color: theme.text, fontWeight: "800" }}>Calculator</Text>
            <TextInput value={expr} onChangeText={setExpr} placeholder="e.g. (12+8)*3" placeholderTextColor={theme.muted} style={[styles.input, { color: theme.text, borderColor: theme.line }]} />
            <Text style={{ color: palette.accent, fontSize: 22, fontWeight: "800" }}>{safeEval(expr)}</Text>
            <Pressable onPress={() => setCalc(false)}><Text style={{ color: theme.muted, marginTop: 10 }}>Close</Text></Pressable>
          </View>
        </View>
      </Modal>
      <Modal visible={exit} transparent>
        <View style={styles.modal}>
          <View style={[styles.sheet, { backgroundColor: theme.card }]}>
            <Text style={{ color: theme.text, fontWeight: "800", marginBottom: 8 }}>Leave the workstation?</Text>
            <Text style={{ color: theme.muted, marginBottom: 12 }}>Unsubmitted answers stay on this device only until you submit.</Text>
            <Pressable onPress={onExit}><Text style={{ color: palette.danger, fontWeight: "800" }}>Leave</Text></Pressable>
            <Pressable onPress={() => setExit(false)}><Text style={{ color: theme.text, marginTop: 10 }}>Stay</Text></Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function safeEval(input: string) {
  if (!/^[\d+\-*/().\s]+$/.test(input)) return "—";
  try { return String(Function(`"use strict"; return (${input})`)()); } catch { return "—"; }
}

const styles = StyleSheet.create({
  bar: { flexDirection: "row", justifyContent: "space-between", padding: 16, borderBottomWidth: 1 },
  chip: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  q: { fontSize: 18, fontWeight: "700", lineHeight: 26, marginBottom: 14 },
  opt: { borderWidth: 1, borderRadius: 14, padding: 12, marginBottom: 8, flexDirection: "row", gap: 8 },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 12 },
  small: { borderWidth: 1, borderColor: "rgba(148,163,184,0.3)", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 8 },
  submit: { marginTop: 16, borderRadius: 14, alignItems: "center", padding: 14 },
  modal: { flex: 1, backgroundColor: "rgba(0,0,0,0.55)", justifyContent: "flex-end" },
  sheet: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 18, maxHeight: "70%" },
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  cell: { width: 36, height: 36, borderRadius: 8, alignItems: "center", justifyContent: "center" },
  input: { borderWidth: 1, borderRadius: 12, padding: 12, marginVertical: 10 },
});
