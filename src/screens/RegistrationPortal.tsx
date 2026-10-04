import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { JAMBSubject } from "../types";
import { Theme, palette } from "../theme";

const SUBJECTS: JAMBSubject[] = [
  "Use of English","Agriculture","Arabic","Biology","Chemistry","Commerce","Computer Studies","CRK",
  "Economics","Fine Art","French","Geography","Government","Hausa","History","Home Economics","Igbo",
  "IRK","Literature","Literature Textbooks","Mathematics","Music","PHE","Physics","The Lekki Headmaster","Yoruba",
];

export type Profile = {
  name: string; email: string; phone: string; country: string; school: string;
  selectedSubjects: JAMBSubject[]; activationKey: string;
};

export default function RegistrationPortal({ theme, onComplete, onToggleTheme }: {
  theme: Theme; onComplete: (p: Profile) => void; onToggleTheme: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [school, setSchool] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<JAMBSubject[]>(["Use of English"]);
  const [activationKey, setActivationKey] = useState("");
  const [error, setError] = useState("");

  const toggle = (s: JAMBSubject) => {
    if (s === "Use of English") return;
    setSelectedSubjects((prev) => {
      if (prev.includes(s)) return prev.length > 1 ? prev.filter((x) => x !== s) : prev;
      return prev.length < 4 ? [...prev, s] : prev;
    });
  };

  const register = () => {
    if (!name.trim() || !email.includes("@")) { setError("Name and a valid email are required."); return; }
    if (selectedSubjects.length !== 4) { setError("Select Use of English plus 3 subjects."); return; }
    const key = `HDA-${1000 + Math.floor(Math.random()*9000)}-${1000 + Math.floor(Math.random()*9000)}-${1000 + Math.floor(Math.random()*9000)}`;
    setActivationKey(key);
  };

  if (activationKey) {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: theme.bg }} contentContainerStyle={styles.body}>
        <Text style={styles.kicker}>CANDIDATE ACTIVATED</Text>
        <Text style={[styles.h1, { color: theme.text }]}>{name}</Text>
        <Text style={{ color: theme.muted, marginBottom: 12 }}>Keep this key. It is stored with your profile on this device.</Text>
        <Text style={[styles.key, { color: palette.accent, borderColor: theme.line }]}>{activationKey}</Text>
        <Text style={{ color: theme.muted, marginBottom: 16 }}>{email} · {phone || "no phone"} · {school || "Independent"} · {country}</Text>
        <Text style={{ color: theme.text, marginBottom: 16 }}>{selectedSubjects.join(" · ")}</Text>
        <Pressable style={styles.btn} onPress={() => onComplete({ name, email, phone, country, school, selectedSubjects, activationKey })}>
          <Text style={styles.btnText}>Enter academy</Text>
        </Pressable>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }} contentContainerStyle={styles.body}>
      <View style={styles.row}>
        <Text style={styles.kicker}>HIGHER DEFINITION ACADEMY</Text>
        <Pressable onPress={onToggleTheme}><Text style={{ color: theme.muted }}>{theme.dark ? "Light" : "Dark"}</Text></Pressable>
      </View>
      <Text style={[styles.h1, { color: theme.text }]}>Candidate registration</Text>
      <Text style={{ color: theme.muted, marginBottom: 14 }}>English is locked. Add three UTME subjects. An activation key is issued on this device.</Text>
      {[["Full name", name, setName],["Email", email, setEmail],["Phone", phone, setPhone],["Country", country, setCountry],["School", school, setSchool]].map(([label, value, set]) => (
        <TextInput key={String(label)} placeholder={String(label)} placeholderTextColor={theme.muted} value={String(value)} onChangeText={set as (t: string) => void}
          style={[styles.input, { color: theme.text, borderColor: theme.line, backgroundColor: theme.card }]} />
      ))}
      <Text style={{ color: theme.text, fontWeight: "800", marginBottom: 8 }}>Subjects {selectedSubjects.length}/4</Text>
      <View style={styles.wrap}>
        {SUBJECTS.map((s) => {
          const on = selectedSubjects.includes(s);
          return (
            <Pressable key={s} onPress={() => toggle(s)} style={[styles.chip, { borderColor: on ? palette.accent : theme.line, backgroundColor: on ? palette.accentDim : theme.card }]}>
              <Text style={{ color: on ? palette.accent : theme.text, fontSize: 12, fontWeight: "700" }}>{s}</Text>
            </Pressable>
          );
        })}
      </View>
      {!!error && <Text style={{ color: palette.danger, marginBottom: 8 }}>{error}</Text>}
      <Pressable style={styles.btn} onPress={register}><Text style={styles.btnText}>Issue activation key</Text></Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: { padding: 20, paddingBottom: 48 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  kicker: { color: palette.accent, fontWeight: "800", letterSpacing: 1.2, fontSize: 11 },
  h1: { fontSize: 28, fontWeight: "800", marginVertical: 8 },
  input: { borderWidth: 1, borderRadius: 14, padding: 14, marginBottom: 10 },
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 14 },
  chip: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
  btn: { backgroundColor: palette.accent, borderRadius: 14, padding: 14, alignItems: "center" },
  btnText: { fontWeight: "800", color: "#04140c" },
  key: { borderWidth: 1, borderRadius: 14, padding: 14, fontWeight: "800", marginBottom: 12 },
});
