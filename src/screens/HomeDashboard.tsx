import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ExamSession, JAMBSubject } from "../types";
import { Theme, palette } from "../theme";
import { Profile } from "./RegistrationScreen";
import LaunchPad from "./LaunchPad";
import { CareerCutoff, DigitalNotes, EducationalGames, LiteratureGuide, QuestionSearch, ResultHistory, StudyTimetable } from "./modules";

type Tab = "home" | "practice" | "study" | "games" | "analytics";
type Sub = null | "notes" | "timetable" | "search" | "correction" | "literature" | "cutoff" | "games" | "practice" | "flashcards";

const TILES: { id: Sub; label: string; hint: string }[] = [
  { id: "practice", label: "Practice UTME", hint: "Launch the CBT workstation" },
  { id: "notes", label: "Digital notes", hint: "Topic sheets" },
  { id: "timetable", label: "Timetable", hint: "Weekly blocks" },
  { id: "search", label: "Question search", hint: "Bank lookup" },
  { id: "correction", label: "Result history", hint: "Past aggregates" },
  { id: "games", label: "Speed games", hint: "Synonym duel" },
  { id: "literature", label: "Literature", hint: "Lekki Headmaster" },
  { id: "cutoff", label: "Cutoffs", hint: "Course chance" },
  { id: "flashcards", label: "Flashcards", hint: "Quick recall" },
];

export default function HomeDashboard({
  theme, profile, onLogout, onStartExam, onToggleTheme, history,
}: {
  theme: Theme;
  profile: Profile;
  onLogout: () => void;
  onStartExam: (s: ExamSession) => void;
  onToggleTheme: () => void;
  history: { id: string; aggregate: number; when: string }[];
}) {
  const [tab, setTab] = useState<Tab>("home");
  const [sub, setSub] = useState<Sub>(null);
  const subjects = (profile.selectedSubjects?.length ? profile.selectedSubjects : ["Use of English", "Mathematics", "Physics", "Chemistry"]) as JAMBSubject[];

  const body = () => {
    if (sub === "practice" || tab === "practice") return <LaunchPad theme={theme} subjects={subjects} onStart={onStartExam} onBack={() => { setSub(null); setTab("home"); }} />;
    if (sub === "notes" || tab === "study") return <DigitalNotes theme={theme} />;
    if (sub === "timetable") return <StudyTimetable theme={theme} />;
    if (sub === "search") return <QuestionSearch theme={theme} />;
    if (sub === "correction" || tab === "analytics") return <ResultHistory theme={theme} rows={history} />;
    if (sub === "literature") return <LiteratureGuide theme={theme} />;
    if (sub === "cutoff") return <CareerCutoff theme={theme} />;
    if (sub === "games" || tab === "games") return <EducationalGames theme={theme} />;
    if (sub === "flashcards") return <QuestionSearch theme={theme} />;
    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, paddingBottom: 24 }}>
        <View style={styles.top}>
          <View>
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
      {sub && tab === "home" ? (
        <Pressable onPress={() => setSub(null)} style={{ paddingHorizontal: 20, paddingTop: 8 }}>
          <Text style={{ color: palette.accent, fontWeight: "700" }}>Academy home</Text>
        </Pressable>
      ) : null}
      <View style={{ flex: 1 }}>{body()}</View>
      <View style={[styles.tabs, { borderColor: theme.line, backgroundColor: theme.card }]}>
        {(["home", "practice", "study", "games", "analytics"] as Tab[]).map((id) => (
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
