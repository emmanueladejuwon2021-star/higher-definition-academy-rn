import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Theme, palette } from "../theme";
import { MOCK_QUESTIONS } from "../data/mockQuestions";
import { Question } from "../types";

const NOTES = [
  { title: "Concord and stress", subject: "Use of English", body: "Neither/nor and neither of take a singular verb. Stress the first syllable of calendar, minister, quantity; computer is second-syllable stress." },
  { title: "Quadratic roots", subject: "Mathematics", body: "For ax^2+bx+c=0, x = [-b ± sqrt(b^2-4ac)] / 2a. Discriminant sign tells 2, 1, or 0 real roots." },
  { title: "Newton and momentum", subject: "Physics", body: "F = ma. Momentum p = mv is conserved in an isolated system. Impulse equals change in momentum." },
  { title: "Mole concept", subject: "Chemistry", body: "n = m/M. 1 mole of gas at s.t.p. occupies 22.4 dm^3." },
  { title: "The Lekki Headmaster", subject: "Literature", body: "Fafore's abrupt dismissal in Lekki sets the staff into sympathy and anxiety. Setting is upscale Lekki, Lagos." },
];

export function DigitalNotes({ theme }: { theme: Theme }) {
  const [q, setQ] = useState("");
  const rows = NOTES.filter((n) => (n.title + n.subject + n.body).toLowerCase().includes(q.toLowerCase()));
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }} contentContainerStyle={s.pad}>
      <Text style={[s.h1, { color: theme.text }]}>Digital notes</Text>
      <TextInput value={q} onChangeText={setQ} placeholder="Search notes" placeholderTextColor={theme.muted} style={[s.input, { color: theme.text, borderColor: theme.line, backgroundColor: theme.card }]} />
      {rows.map((n) => (
        <View key={n.title} style={[s.card, { backgroundColor: theme.card, borderColor: theme.line }]}>
          <Text style={{ color: palette.accent, fontWeight: "800", fontSize: 12 }}>{n.subject}</Text>
          <Text style={{ color: theme.text, fontWeight: "800", fontSize: 16, marginVertical: 4 }}>{n.title}</Text>
          <Text style={{ color: theme.muted, lineHeight: 20 }}>{n.body}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const PLAN = [
  { day: "Mon", block: "English lexis + 20 CBT items" },
  { day: "Tue", block: "Mathematics algebra + physics mechanics" },
  { day: "Wed", block: "Chemistry calculations + biology cells" },
  { day: "Thu", block: "Literature: Lekki Headmaster chapters" },
  { day: "Fri", block: "Mixed 40-item practice, review flags" },
  { day: "Sat", block: "Full 120-minute mock" },
  { day: "Sun", block: "Correction of weak topics only" },
];
export function StudyTimetable({ theme }: { theme: Theme }) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }} contentContainerStyle={s.pad}>
      <Text style={[s.h1, { color: theme.text }]}>Study timetable</Text>
      {PLAN.map((p) => (
        <View key={p.day} style={[s.card, { backgroundColor: theme.card, borderColor: theme.line, flexDirection: "row", gap: 12 }]}>
          <Text style={{ color: palette.accent, fontWeight: "800", width: 40 }}>{p.day}</Text>
          <Text style={{ color: theme.text, flex: 1 }}>{p.block}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

export function QuestionSearch({ theme }: { theme: Theme }) {
  const pool = useMemo(() => Object.values(MOCK_QUESTIONS).flat() as Question[], []);
  const [q, setQ] = useState("");
  const hits = pool.filter((item) => item.text.toLowerCase().includes(q.toLowerCase()) || (item.topic || "").toLowerCase().includes(q.toLowerCase())).slice(0, 20);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }} contentContainerStyle={s.pad}>
      <Text style={[s.h1, { color: theme.text }]}>Question search</Text>
      <TextInput value={q} onChangeText={setQ} placeholder="Topic or stem" placeholderTextColor={theme.muted} style={[s.input, { color: theme.text, borderColor: theme.line, backgroundColor: theme.card }]} />
      {hits.map((item) => (
        <View key={item.id} style={[s.card, { backgroundColor: theme.card, borderColor: theme.line }]}>
          <Text style={{ color: palette.accent, fontSize: 12, fontWeight: "800" }}>{item.subject} · {item.topic || item.year}</Text>
          <Text style={{ color: theme.text, marginVertical: 6 }}>{item.text}</Text>
          <Text style={{ color: theme.muted }}>Answer {item.correctOption}. {item.explanation}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const CUTOFFS = [
  { institution: "University of Ibadan", course: "Medicine & Surgery", merit: 300, catchment: 290 },
  { institution: "Obafemi Awolowo University", course: "Medicine & Surgery", merit: 298, catchment: 288 },
  { institution: "University of Lagos", course: "Law", merit: 288, catchment: 278 },
  { institution: "University of Lagos", course: "Computer Science", merit: 275, catchment: 262 },
  { institution: "University of Ilorin", course: "Computer Science", merit: 245, catchment: 235 },
  { institution: "FUTA", course: "Computer Science", merit: 260, catchment: 248 },
  { institution: "ABU", course: "Medicine & Surgery", merit: 275, catchment: 260 },
];
export function CareerCutoff({ theme }: { theme: Theme }) {
  const [score, setScore] = useState("250");
  const n = Number(score) || 0;
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }} contentContainerStyle={s.pad}>
      <Text style={[s.h1, { color: theme.text }]}>Cutoff calculator</Text>
      <TextInput keyboardType="number-pad" value={score} onChangeText={setScore} style={[s.input, { color: theme.text, borderColor: theme.line, backgroundColor: theme.card }]} />
      {CUTOFFS.map((c) => {
        const ok = n >= c.catchment;
        return (
          <View key={c.institution + c.course} style={[s.card, { backgroundColor: theme.card, borderColor: theme.line }]}>
            <Text style={{ color: theme.text, fontWeight: "800" }}>{c.course}</Text>
            <Text style={{ color: theme.muted }}>{c.institution}</Text>
            <Text style={{ color: ok ? palette.accent : palette.danger, marginTop: 6 }}>{ok ? "Within catchment range" : "Below catchment"} · merit {c.merit} / catchment {c.catchment}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const CHAPTERS = [
  { title: "The Unforeseen Summons", body: "Fafore is called without warning. The Lekki campus registers the first shock." },
  { title: "Echoes in the Staff Quarters", body: "Staff sympathy and anxiety spread after the dismissal rumour hardens." },
  { title: "The Crucible of Trial", body: "Authority, reputation, and the Lagos private-school economy collide." },
];
export function LiteratureGuide({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState<"overview" | "characters" | "chapters">("overview");
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }} contentContainerStyle={s.pad}>
      <Text style={[s.h1, { color: theme.text }]}>The Lekki Headmaster</Text>
      <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
        {(["overview", "characters", "chapters"] as const).map((t) => (
          <Pressable key={t} onPress={() => setTab(t)} style={[s.chip, { borderColor: tab === t ? palette.accent : theme.line }]}>
            <Text style={{ color: tab === t ? palette.accent : theme.muted, textTransform: "capitalize" }}>{t}</Text>
          </Pressable>
        ))}
      </View>
      {tab === "overview" && <Text style={{ color: theme.muted, lineHeight: 22 }}>Set in Lekki, Lagos. The novel tracks Mr Timothy Fafore after an abrupt board decision.</Text>}
      {tab === "characters" && ["Mr Timothy Fafore", "Chief Adeleke", "Mrs Evelyn Benson", "Tayo Fafore", "Inspector Alabi"].map((n) => (
        <Text key={n} style={{ color: theme.text, marginBottom: 8 }}>• {n}</Text>
      ))}
      {tab === "chapters" && CHAPTERS.map((c) => (
        <View key={c.title} style={[s.card, { backgroundColor: theme.card, borderColor: theme.line }]}>
          <Text style={{ color: theme.text, fontWeight: "800" }}>{c.title}</Text>
          <Text style={{ color: theme.muted, marginTop: 4 }}>{c.body}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const SYN = [
  { word: "EPHEMERAL", options: ["Fleeting", "Enduring", "Rigid", "Voluminous"], correct: "Fleeting" },
  { word: "CANDID", options: ["Deceptive", "Frank", "Timid", "Secretive"], correct: "Frank" },
  { word: "ARBITRARY", options: ["Methodical", "Random", "Capricious", "Dictatorial"], correct: "Random" },
];
export function EducationalGames({ theme }: { theme: Theme }) {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = SYN[i];
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }} contentContainerStyle={s.pad}>
      <Text style={[s.h1, { color: theme.text }]}>Speed games</Text>
      <Text style={{ color: theme.muted, marginBottom: 10 }}>Synonym duel · score {score}</Text>
      {done ? <Text style={{ color: palette.accent, fontSize: 20, fontWeight: "800" }}>Round clear. {score}/{SYN.length}</Text> : (
        <>
          <Text style={{ color: theme.text, fontSize: 28, fontWeight: "800", marginBottom: 12 }}>{q.word}</Text>
          {q.options.map((o) => (
            <Pressable key={o} onPress={() => { if (o === q.correct) setScore((n) => n + 1); if (i + 1 >= SYN.length) setDone(true); else setI(i + 1); }} style={[s.card, { backgroundColor: theme.card, borderColor: theme.line }]}>
              <Text style={{ color: theme.text }}>{o}</Text>
            </Pressable>
          ))}
        </>
      )}
    </ScrollView>
  );
}

export function ResultHistory({ theme, rows }: { theme: Theme; rows: { id: string; aggregate: number; when: string }[] }) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }} contentContainerStyle={s.pad}>
      <Text style={[s.h1, { color: theme.text }]}>Result history</Text>
      {!rows.length && <Text style={{ color: theme.muted }}>No submitted papers yet.</Text>}
      {rows.map((r) => (
        <View key={r.id} style={[s.card, { backgroundColor: theme.card, borderColor: theme.line }]}>
          <Text style={{ color: theme.text, fontWeight: "800" }}>{r.aggregate} aggregate</Text>
          <Text style={{ color: theme.muted }}>{r.when}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  pad: { padding: 20, paddingBottom: 40 },
  h1: { fontSize: 26, fontWeight: "800", marginBottom: 10 },
  input: { borderWidth: 1, borderRadius: 14, padding: 12, marginBottom: 12 },
  card: { borderWidth: 1, borderRadius: 16, padding: 14, marginBottom: 10 },
  chip: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
});
