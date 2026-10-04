import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ExamSession, JAMBSubject, Question } from "../types";
import { Theme, palette } from "../theme";
import { Profile } from "./RegistrationPortal";
import LaunchPad from "./LaunchPad";
import DigitalNotes from "./DigitalNotes";
import StudyTimetable from "./StudyTimetable";
import QuestionSearch from "./QuestionSearch";
import ResultHistoryAndCorrection from "./ResultHistoryAndCorrection";
import EducationalGames from "./EducationalGames";
import CareerCutoffCalculator from "./CareerCutoffCalculator";
import LiteratureGuide from "./LiteratureGuide";
import { MOCK_QUESTIONS } from "../data/mockQuestions";
import { StoredResult } from "../utils/resultsStore";

type Tab = "home" | "practice" | "study" | "games" | "analytics";
type Sub = null | "notes" | "timetable" | "search" | "correction" | "literature" | "cutoff" | "games" | "practice" | "flashcards";

const TILES: { id: Exclude<Sub, null>; label: string; hint: string }[] = [
  { id: "practice", label: "Practice UTME", hint: "CBT launch pad" },
  { id: "notes", label: "Digital notes", hint: "Notes and formula vault" },
  { id: "timetable", label: "Timetable", hint: "Weekly blocks" },
  { id: "search", label: "Question search", hint: "Full bank lookup" },
  { id: "correction", label: "Result history", hint: "Correct past papers" },
  { id: "games", label: "Speed games", hint: "Synonym and challenge" },
  { id: "literature", label: "Literature", hint: "Lekki Headmaster" },
  { id: "cutoff", label: "Cutoffs", hint: "Merit and catchment" },
  { id: "flashcards", label: "Flashcards", hint: "Flip the bank" },
];

export default function HomeDashboard({ theme, profile, onLogout, onStartExam, onToggleTheme, history, onOpenHistory }: {
  theme: Theme; profile: Profile; onLogout: () => void; onStartExam: (s: ExamSession) => void; onToggleTheme: () => void;
  history: StoredResult[]; onOpenHistory: (s: ExamSession) => void;
}) {
  const [tab, setTab] = useState<Tab>("home");
  const [sub, setSub] = useState<Sub>(null);
  const pool = useMemo(() => Object.values(MOCK_QUESTIONS).flat() as Question[], []);
  const [card, setCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const subjects = profile.selectedSubjects as JAMBSubject[];

  const body = () => {
    if (sub === "practice" || tab === "practice") return <LaunchPad theme={theme} profile={profile} subjects={subjects} onStart={onStartExam} onBack={() => { setSub(null); setTab("home"); }} />;
    if (sub === "notes" || tab === "study") return <DigitalNotes theme={theme} />;
    if (sub === "timetable") return <StudyTimetable theme={theme} />;
    if (sub === "search") return <QuestionSearch theme={theme} />;
    if (sub === "correction" || tab === "analytics") return <ResultHistoryAndCorrection theme={theme} rows={history} onOpen={onOpenHistory} />;
    if (sub === "literature") return <LiteratureGuide theme={theme} />;
    if (sub === "cutoff") return <CareerCutoffCalculator theme={theme} />;
    if (sub === "games" || tab === "games") return <EducationalGames theme={theme} />;
    if (sub === "flashcards") {
      const q = pool[card % Math.max(pool.length, 1)];
      return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
          <Text style={{ color: theme.text, fontSize: 26, fontWeight: "800" }}>Flashcards</Text>
          <Pressable onPress={() => setFlipped((f) => !f)} style={{ marginTop: 16, minHeight: 180, borderWidth: 1, borderColor: theme.line, backgroundColor: theme.card, borderRadius: 18, padding: 16 }}>
            <Text style={{ color: palette.accent, fontSize: 12 }}>{q?.subject}</Text>
            <Text style={{ color: theme.text, fontSize: 18, marginTop: 8 }}>{flipped ? `Answer ${q?.correctOption}. ${q?.explanation || ""}` : q?.text}</Text>
          </Pressable>
          <Pressable onPress={() => { setCard((n) => n + 1); setFlipped(false); }} style={{ marginTop: 12 }}><Text style={{ color: palette.accent, fontWeight: "800" }}>Next card</Text></Pressable>
        </ScrollView>
      );
    }
    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, paddingBottom: 24 }}>
        <View style={styles.top}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: palette.accent, fontWeight: "800", letterSpacing: 1, fontSize: 11 }}>HDA</Text>
            <Text style={{ color: theme.text, fontSize: 22, fontWeight: "800" }}>{profile.name}</Text>
            <Text style={{ color: theme.muted }}>{subjects.join(" · ")}</Text>
          </View>
          <Pressable onPress={onToggleTheme}><Text style={{ color: theme.muted }}>{theme.dark ? "Light" : "Dark"}</Text></Pressable>
        </View>
        <View style={styles.grid}>
          {TILES.map((t) => (
            <Pressable key={t.id} onPress={() => setSub(t.id)} style={[styles.tile, { backgroundColor: theme.card, borderColor: theme.line }]}>
              <Text style={{ color: theme.text, fontWeight: "800" }}>{t.label}</Text>
              <Text style={{ color: theme.muted, marginTop: 4, fontSize: 12 }}>{t.hint}</Text>
            </Pressable>
          ))}
        </View>
        <Pressable onPress={onLogout} style={{ marginTop: 8 }}><Text style={{ color: palette.danger }}>Log out</Text></Pressable>
      </ScrollView>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      {sub && tab === "home" ? <Pressable onPress={() => setSub(null)} style={{ paddingHorizontal: 20, paddingTop: 8 }}><Text style={{ color: palette.accent, fontWeight: "700" }}>Academy home</Text></Pressable> : null}
      <View style={{ flex: 1 }}>{body()}</View>
      <View style={[styles.tabs, { borderColor: theme.line, backgroundColor: theme.card }]}>
        {(["home","practice","study","games","analytics"] as Tab[]).map((id) => (
          <Pressable key={id} onPress={() => { setTab(id); setSub(null); }} style={styles.tab}>
            <Text style={{ color: tab === id && !sub ? palette.accent : theme.muted, fontWeight: "800", fontSize: 11, textTransform: "capitalize" }}>{id}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  top: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  tile: { width: "47%", borderWidth: 1, borderRadius: 16, padding: 14, minHeight: 92 },
  tabs: { flexDirection: "row", borderTopWidth: 1, paddingVertical: 10 },
  tab: { flex: 1, alignItems: "center" },
});
