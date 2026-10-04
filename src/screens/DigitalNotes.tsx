import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Theme, palette } from "../theme";
import { FORMULA_VAULT, INITIAL_NOTES } from "../data/content/DigitalNotes.data";

const FALLBACK_NOTES = [
  { id: "n1", title: "Concord and stress", subject: "Use of English", content: "Neither of takes a singular verb. Calendar, minister, and quantity stress the first syllable.", date: "2024-01-01", tags: ["english"] },
  { id: "n2", title: "Quadratic roots", subject: "Mathematics", content: "x = [-b ± sqrt(b^2-4ac)] / 2a.", date: "2024-01-01", tags: ["math"] },
];
const FALLBACK_FORMULAS = [
  { category: "Mathematics", name: "Quadratic formula", formula: "x = (-b ± sqrt(b^2-4ac)) / 2a", description: "Roots of ax^2+bx+c=0" },
  { category: "Physics", name: "Newton second law", formula: "F = m a", description: "Force equals mass times acceleration" },
  { category: "Physics", name: "Ohm law", formula: "V = I R", description: "Voltage equals current times resistance" },
  { category: "Chemistry", name: "Mole", formula: "n = m / M", description: "Moles equal mass over molar mass" },
];

export default function DigitalNotes({ theme }: { theme: Theme }) {
  const seedNotes = (INITIAL_NOTES && INITIAL_NOTES.length ? INITIAL_NOTES : FALLBACK_NOTES) as typeof FALLBACK_NOTES;
  const seedFormulas = (FORMULA_VAULT && FORMULA_VAULT.length ? FORMULA_VAULT : FALLBACK_FORMULAS) as typeof FALLBACK_FORMULAS;
  const [notes, setNotes] = useState(seedNotes);
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<"notes" | "formulas">("notes");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [subject, setSubject] = useState("Mathematics");
  const rows = notes.filter((n) => (n.title + n.subject + n.content).toLowerCase().includes(q.toLowerCase()));
  const formulas = seedFormulas.filter((f) => (f.name + f.category + f.formula).toLowerCase().includes(q.toLowerCase()));
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }} contentContainerStyle={s.pad}>
      <Text style={[s.h1, { color: theme.text }]}>Digital notes</Text>
      <TextInput value={q} onChangeText={setQ} placeholder="Search notes or formulas" placeholderTextColor={theme.muted} style={[s.input, { color: theme.text, borderColor: theme.line, backgroundColor: theme.card }]} />
      <View style={s.row}>
        {(["notes","formulas"] as const).map((t) => (
          <Pressable key={t} onPress={() => setTab(t)} style={[s.chip, { borderColor: tab === t ? palette.accent : theme.line }]}><Text style={{ color: tab === t ? palette.accent : theme.muted, textTransform: "capitalize" }}>{t}</Text></Pressable>
        ))}
      </View>
      {tab === "notes" && rows.map((n) => (
        <View key={n.id} style={[s.card, { backgroundColor: theme.card, borderColor: theme.line }]}>
          <Text style={{ color: palette.accent, fontSize: 12, fontWeight: "800" }}>{n.subject} · {n.date}</Text>
          <Text style={{ color: theme.text, fontWeight: "800", fontSize: 16, marginVertical: 4 }}>{n.title}</Text>
          <Text style={{ color: theme.muted, lineHeight: 20 }}>{n.content}</Text>
        </View>
      ))}
      {tab === "formulas" && formulas.map((f) => (
        <View key={f.name} style={[s.card, { backgroundColor: theme.card, borderColor: theme.line }]}>
          <Text style={{ color: palette.accent, fontSize: 12, fontWeight: "800" }}>{f.category}</Text>
          <Text style={{ color: theme.text, fontWeight: "800" }}>{f.name}</Text>
          <Text style={{ color: palette.accent, marginVertical: 4 }}>{f.formula}</Text>
          <Text style={{ color: theme.muted }}>{f.description}</Text>
        </View>
      ))}
      <TextInput value={title} onChangeText={setTitle} placeholder="New note title" placeholderTextColor={theme.muted} style={[s.input, { color: theme.text, borderColor: theme.line, backgroundColor: theme.card }]} />
      <TextInput value={subject} onChangeText={setSubject} placeholder="Subject" placeholderTextColor={theme.muted} style={[s.input, { color: theme.text, borderColor: theme.line, backgroundColor: theme.card }]} />
      <TextInput value={body} onChangeText={setBody} placeholder="Note" placeholderTextColor={theme.muted} multiline style={[s.input, { color: theme.text, borderColor: theme.line, backgroundColor: theme.card, minHeight: 80 }]} />
      <Pressable onPress={() => { if (!title.trim()) return; setNotes([{ id: `n-${Date.now()}`, title, subject, content: body, date: new Date().toLocaleDateString(), tags: [] }, ...notes]); setTitle(""); setBody(""); }} style={s.btn}><Text style={{ fontWeight: "800" }}>Save note</Text></Pressable>
    </ScrollView>
  );
}
const s = StyleSheet.create({
  pad: { padding: 16, paddingBottom: 40 }, h1: { fontSize: 26, fontWeight: "800", marginBottom: 8 },
  input: { borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 8 },
  card: { borderWidth: 1, borderRadius: 16, padding: 14, marginBottom: 10 },
  row: { flexDirection: "row", gap: 8, marginBottom: 10 },
  chip: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  btn: { backgroundColor: palette.accent, borderRadius: 12, padding: 12, alignItems: "center" },
});
