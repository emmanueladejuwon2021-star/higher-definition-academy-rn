import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { ExamMode, ExamSession, JAMBSubject } from "../types";
import { Theme, palette } from "../theme";
import { getTopicsForSubject } from "../data/syllabusTopics";
import { generateDynamicQuestions } from "../utils/questionGenerator";
import { Profile } from "./RegistrationPortal";
import { buildSession } from "../utils/session";

const YEARS = ["2013","2014","2015","2016","2017 Model","2018 Model","2019 Model","2020 Model","2021 Model","2022 Model","2023 Model I","2024 Model I","2025 Model I","RANDOM"];
const COUNTS = [10,20,30,40,50,60,70,80,90,100];
const ALL: JAMBSubject[] = ["Use of English","Mathematics","Physics","Chemistry","Biology","Economics","Government","Literature","CRS","Commerce","Geography","Agricultural Science","Computer Studies","CRK","IRK"];

export default function LaunchPad({ theme, profile, subjects, onStart, onBack }: {
  theme: Theme; profile?: Profile; subjects: JAMBSubject[]; onStart: (s: ExamSession) => void; onBack: () => void;
}) {
  const [selectedSubjects, setSelectedSubjects] = useState<JAMBSubject[]>(subjects.length ? subjects : ["Use of English","Mathematics","Physics","Chemistry"]);
  const [activeTab, setActiveTab] = useState<JAMBSubject>(selectedSubjects[0]);
  const [years, setYears] = useState<Record<string, string>>({});
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [topics, setTopics] = useState<Record<string, string[]>>({});
  const [mode, setMode] = useState<ExamMode>(ExamMode.PRACTICE);
  const [duration, setDuration] = useState(120);
  const [shuffleQuestion, setShuffleQuestion] = useState(true);
  const [shuffleOption, setShuffleOption] = useState(false);
  const [picker, setPicker] = useState<null | "year" | "count" | "topic" | "subject">(null);
  const [progress, setProgress] = useState("");
  const [busy, setBusy] = useState(false);
  const topicList = getTopicsForSubject(activeTab);

  const start = async () => {
    setBusy(true);
    try {
      const questions = {} as ExamSession["questions"];
      for (const sub of selectedSubjects) {
        const count = counts[sub] || (sub === "Use of English" ? 60 : 40);
        const selected = topics[sub] || [];
        setProgress(`Building ${sub} (${count})`);
        let result = await generateDynamicQuestions(sub, count, selected.length ? selected : getTopicsForSubject(sub));
        if (!result.length) result = buildSession([sub], mode).questions[sub];
        if (shuffleQuestion) result = [...result].sort(() => Math.random() - 0.5);
        questions[sub] = result;
      }
      onStart({
        id: Math.random().toString(36).slice(2, 10),
        subjects: selectedSubjects,
        mode,
        duration,
        startTime: Date.now(),
        questions,
        answers: {},
        flags: [],
        timeRemaining: duration * 60,
      });
    } finally {
      setBusy(false);
      setProgress("");
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <Pressable onPress={onBack}><Text style={{ color: palette.accent, fontWeight: "700" }}>Academy home</Text></Pressable>
      <Text style={[styles.h1, { color: theme.text }]}>CBT launch pad</Text>
      <Text style={{ color: theme.muted, marginBottom: 10 }}>{profile?.name || "Candidate"} · {selectedSubjects.length} subjects · {duration} min</Text>
      <View style={styles.row}>
        {[["Practice", ExamMode.PRACTICE],["Mock", ExamMode.EXAM],["Study", ExamMode.STUDY]].map(([label, val]) => (
          <Pressable key={String(label)} onPress={() => setMode(val as ExamMode)} style={[styles.chip, { borderColor: mode === val ? palette.accent : theme.line, backgroundColor: mode === val ? palette.accentDim : theme.card }]}>
            <Text style={{ color: mode === val ? palette.accent : theme.text, fontWeight: "800" }}>{label}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.row}>
        {[60, 90, 120].map((m) => (
          <Pressable key={m} onPress={() => setDuration(m)} style={[styles.chip, { borderColor: duration === m ? palette.accent : theme.line }]}><Text style={{ color: theme.text }}>{m} min</Text></Pressable>
        ))}
      </View>
      <View style={styles.switchRow}><Text style={{ color: theme.text }}>Shuffle questions</Text><Switch value={shuffleQuestion} onValueChange={setShuffleQuestion} /></View>
      <View style={styles.switchRow}><Text style={{ color: theme.text }}>Shuffle options</Text><Switch value={shuffleOption} onValueChange={setShuffleOption} /></View>
      <Pressable onPress={() => setPicker(picker === "subject" ? null : "subject")}><Text style={{ color: palette.accent, marginVertical: 8 }}>Edit subject combination</Text></Pressable>
      {picker === "subject" && <View style={styles.wrap}>{ALL.map((s) => { const on = selectedSubjects.includes(s); return <Pressable key={s} onPress={() => setSelectedSubjects((prev) => on ? (prev.length > 1 ? prev.filter((x) => x !== s) : prev) : (prev.length < 4 ? [...prev, s] : prev))} style={[styles.chip, { borderColor: on ? palette.accent : theme.line }]}><Text style={{ color: on ? palette.accent : theme.text, fontSize: 12 }}>{s}</Text></Pressable>; })}</View>}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 8 }}>
        {selectedSubjects.map((s) => (
          <Pressable key={s} onPress={() => setActiveTab(s)} style={[styles.chip, { borderColor: activeTab === s ? palette.accent : theme.line, marginRight: 8 }]}><Text style={{ color: activeTab === s ? palette.accent : theme.muted }}>{s}</Text></Pressable>
        ))}
      </ScrollView>
      <Text style={{ color: theme.text, fontWeight: "800" }}>{activeTab}</Text>
      <Text style={{ color: theme.muted, marginBottom: 6 }}>Year {years[activeTab] || "RANDOM"} · {counts[activeTab] || (activeTab === "Use of English" ? 60 : 40)} questions</Text>
      <View style={styles.row}>
        <Pressable onPress={() => setPicker(picker === "year" ? null : "year")} style={styles.chip}><Text style={{ color: theme.text }}>Year</Text></Pressable>
        <Pressable onPress={() => setPicker(picker === "count" ? null : "count")} style={styles.chip}><Text style={{ color: theme.text }}>Count</Text></Pressable>
        <Pressable onPress={() => setPicker(picker === "topic" ? null : "topic")} style={styles.chip}><Text style={{ color: theme.text }}>Topics</Text></Pressable>
      </View>
      {picker === "year" && <View style={styles.wrap}>{YEARS.map((y) => <Pressable key={y} onPress={() => setYears((p) => ({ ...p, [activeTab]: y }))} style={styles.chip}><Text style={{ color: years[activeTab] === y ? palette.accent : theme.text, fontSize: 12 }}>{y}</Text></Pressable>)}</View>}
      {picker === "count" && <View style={styles.wrap}>{COUNTS.map((n) => <Pressable key={n} onPress={() => setCounts((p) => ({ ...p, [activeTab]: n }))} style={styles.chip}><Text style={{ color: counts[activeTab] === n ? palette.accent : theme.text }}>{n}</Text></Pressable>)}</View>}
      {picker === "topic" && <View style={styles.wrap}>{topicList.map((t) => { const on = (topics[activeTab] || []).includes(t); return <Pressable key={t} onPress={() => setTopics((prev) => { const cur = prev[activeTab] || []; return { ...prev, [activeTab]: cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t] }; })} style={[styles.chip, { borderColor: on ? palette.accent : theme.line }]}><Text style={{ color: on ? palette.accent : theme.muted, fontSize: 12 }}>{t}</Text></Pressable>; })}{!topicList.length && <Text style={{ color: theme.muted }}>No syllabus list for this subject. The bank is used as-is.</Text>}</View>}
      {!!progress && <Text style={{ color: palette.accent, marginTop: 8 }}>{progress}</Text>}
      <Pressable disabled={busy} onPress={start} style={[styles.btn, { opacity: busy ? 0.6 : 1 }]}><Text style={styles.btnText}>{busy ? "Building paper" : "Start session"}</Text></Pressable>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  h1: { fontSize: 26, fontWeight: "800", marginTop: 6 },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginVertical: 6 },
  chip: { borderWidth: 1, borderColor: "rgba(148,163,184,0.35)", borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginVertical: 8 },
  switchRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 4 },
  btn: { marginTop: 16, backgroundColor: palette.accent, borderRadius: 14, padding: 14, alignItems: "center" },
  btnText: { fontWeight: "800", color: "#04140c" },
});
