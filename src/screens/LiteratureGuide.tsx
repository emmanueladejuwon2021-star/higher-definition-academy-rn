import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Theme, palette } from "../theme";
import { LEKKI_CHAPTERS } from "../data/content/LiteratureGuide.data";

export default function LiteratureGuide({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState<"overview" | "chapters" | "quiz">("overview");
  const [chapter, setChapter] = useState(0);
  const [pick, setPick] = useState<string | null>(null);
  const ch = LEKKI_CHAPTERS[chapter];
  if (!ch) return null;
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <Text style={{ color: theme.text, fontSize: 26, fontWeight: "800" }}>The Lekki Headmaster</Text>
      <View style={{ flexDirection: "row", gap: 8, marginVertical: 10 }}>
        {(["overview","chapters","quiz"] as const).map((t) => (
          <Pressable key={t} onPress={() => setTab(t)} style={{ borderWidth: 1, borderColor: tab === t ? palette.accent : theme.line, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 }}>
            <Text style={{ color: tab === t ? palette.accent : theme.muted, textTransform: "capitalize" }}>{t}</Text>
          </Pressable>
        ))}
      </View>
      {tab === "overview" && <Text style={{ color: theme.muted, lineHeight: 22 }}>{LEKKI_CHAPTERS.length} chapter notes from the academy literature guide. Open a chapter for events and likely UTME stems.</Text>}
      {(tab === "chapters" || tab === "quiz") && (
        <>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
            {LEKKI_CHAPTERS.map((c, i) => (
              <Pressable key={c.chapter} onPress={() => { setChapter(i); setPick(null); }} style={{ marginRight: 8, borderWidth: 1, borderColor: i === chapter ? palette.accent : theme.line, borderRadius: 10, padding: 8 }}>
                <Text style={{ color: theme.text }}>{c.chapter}</Text>
              </Pressable>
            ))}
          </ScrollView>
          <Text style={{ color: theme.text, fontWeight: "800", fontSize: 18 }}>{ch.title}</Text>
          <Text style={{ color: theme.muted, marginVertical: 8 }}>{ch.summary}</Text>
          {ch.keyEvents.map((e: string) => <Text key={e} style={{ color: theme.text, marginBottom: 4 }}>• {e}</Text>)}
          {tab === "quiz" && ch.likelyQuestions.map((q) => (
            <View key={q.q} style={{ marginTop: 12, borderWidth: 1, borderColor: theme.line, borderRadius: 14, padding: 12, backgroundColor: theme.card }}>
              <Text style={{ color: theme.text, fontWeight: "700" }}>{q.q}</Text>
              {(["A","B","C","D"] as const).map((k) => (
                <Pressable key={k} onPress={() => setPick(q.q + k)} style={{ marginTop: 6 }}>
                  <Text style={{ color: pick === q.q + k ? (k === q.correct ? palette.accent : palette.danger) : theme.muted }}>{k}. {q.options[k]}</Text>
                </Pressable>
              ))}
              {pick?.startsWith(q.q) && <Text style={{ color: theme.muted, marginTop: 6 }}>{q.explanation}</Text>}
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
}
