import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { JAMBSubject } from "../types";
import { Theme, palette } from "../theme";
import { PrimaryButton } from "../components/ui";

const SUBJECTS: JAMBSubject[] = [
  "Use of English", "Mathematics", "Physics", "Chemistry", "Biology",
  "Economics", "Government", "Literature", "CRS", "Commerce", "Geography",
  "Agricultural Science", "Principles of Accounts", "Computer Studies",
];

export type Profile = {
  name: string;
  email: string;
  school: string;
  country: string;
  selectedSubjects: JAMBSubject[];
};

export default function RegistrationScreen({
  theme, onComplete, onToggleTheme,
}: { theme: Theme; onComplete: (p: Profile) => void; onToggleTheme: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [picked, setPicked] = useState<JAMBSubject[]>(["Use of English", "Mathematics", "Physics", "Chemistry"]);
  const [error, setError] = useState("");

  const toggle = (s: JAMBSubject) => {
    if (s === "Use of English") return;
    setPicked((prev) => {
      if (prev.includes(s)) return prev.filter((x) => x !== s);
      const next = [...prev, s];
      return next.length > 4 ? prev : next;
    });
  };

  const submit = () => {
    if (!name.trim() || !email.includes("@")) {
      setError("Enter a name and a valid email.");
      return;
    }
    if (picked.length !== 4) {
      setError("JAMB requires Use of English plus 3 subjects.");
      return;
    }
    onComplete({ name: name.trim(), email: email.trim(), school: school.trim() || "Independent candidate", country: "Nigeria", selectedSubjects: picked });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }} contentContainerStyle={styles.body}>
      <View style={styles.top}>
        <Text style={[styles.kicker, { color: palette.accent }]}>HIGHER DEFINITION ACADEMY</Text>
        <Pressable onPress={onToggleTheme}><Text style={{ color: theme.muted }}>{theme.dark ? "Light" : "Dark"}</Text></Pressable>
      </View>
      <Text style={[styles.h1, { color: theme.text }]}>Candidate registration</Text>
      <Text style={[styles.sub, { color: theme.muted }]}>Same portal as the web LMS. English is locked. Pick three more UTME subjects.</Text>
      {[{ label: "Full name", value: name, set: setName }, { label: "Email", value: email, set: setEmail }, { label: "School", value: school, set: setSchool }].map((f) => (
        <TextInput key={f.label} placeholder={f.label} placeholderTextColor={theme.muted} value={f.value} onChangeText={f.set}
          style={[styles.input, { color: theme.text, borderColor: theme.line, backgroundColor: theme.card }]} />
      ))}
      <Text style={[styles.label, { color: theme.text }]}>Subject combination ({picked.length}/4)</Text>
      <View style={styles.wrap}>
        {SUBJECTS.map((s) => {
          const on = picked.includes(s);
          return (
            <Pressable key={s} onPress={() => toggle(s)} style={[styles.chip, { borderColor: on ? palette.accent : theme.line, backgroundColor: on ? palette.accentDim : theme.card }]}>
              <Text style={{ color: on ? palette.accent : theme.text, fontWeight: "700", fontSize: 12 }}>{s}</Text>
            </Pressable>
          );
        })}
      </View>
      {!!error && <Text style={{ color: palette.danger, marginBottom: 10 }}>{error}</Text>}
      <PrimaryButton label="Enter academy" onPress={submit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: { padding: 20, paddingBottom: 48 },
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 18 },
  kicker: { fontSize: 11, fontWeight: "800", letterSpacing: 1.4 },
  h1: { fontSize: 28, fontWeight: "800" },
  sub: { marginTop: 8, marginBottom: 18, lineHeight: 20 },
  input: { borderWidth: 1, borderRadius: 14, padding: 14, marginBottom: 10 },
  label: { fontWeight: "700", marginTop: 8, marginBottom: 10 },
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 },
  chip: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
});
