import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Theme, palette } from "../theme";
import { GRADE_POINTS, INSTITUTIONS_DATA } from "../data/content/CareerCutoffCalculator.data";

export default function CareerCutoffCalculator({ theme }: { theme: Theme }) {
  const [jamb, setJamb] = useState("270");
  const [grades, setGrades] = useState("B,B,C,C,C");
  const olevel = useMemo(() => grades.split(",").map((g) => GRADE_POINTS[g.trim().toUpperCase()] || 0).reduce((a, b) => a + b, 0), [grades]);
  const score = Number(jamb) || 0;
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <Text style={{ color: theme.text, fontSize: 26, fontWeight: "800" }}>Cutoff calculator</Text>
      <Text style={{ color: theme.muted, marginVertical: 8 }}>UTME score and O-level grades (A-F, comma separated). Merit and catchment come from the academy table.</Text>
      <TextInput value={jamb} onChangeText={setJamb} keyboardType="number-pad" style={[styles.input, { color: theme.text, borderColor: theme.line, backgroundColor: theme.card }]} />
      <TextInput value={grades} onChangeText={setGrades} placeholder="A,B,B,C,C" placeholderTextColor={theme.muted} style={[styles.input, { color: theme.text, borderColor: theme.line, backgroundColor: theme.card }]} />
      <Text style={{ color: palette.accent, marginBottom: 10 }}>O-level points {olevel}</Text>
      {INSTITUTIONS_DATA.map((c) => {
        const ok = score >= c.catchmentCutoff;
        return (
          <View key={c.institution + c.course} style={[styles.card, { backgroundColor: theme.card, borderColor: theme.line }]}>
            <Text style={{ color: theme.text, fontWeight: "800" }}>{c.course}</Text>
            <Text style={{ color: theme.muted }}>{c.institution}</Text>
            <Text style={{ color: ok ? palette.accent : palette.danger, marginTop: 4 }}>{ok ? "Within catchment" : "Below catchment"} · merit {c.meritCutoff} / catchment {c.catchmentCutoff}</Text>
            <Text style={{ color: theme.muted, marginTop: 4 }}>{c.postUtmeRequired ? "Post-UTME required. " : "No post-UTME. "}{c.notes}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  input: { borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 8 },
  card: { borderWidth: 1, borderRadius: 14, padding: 12, marginBottom: 8 },
});
