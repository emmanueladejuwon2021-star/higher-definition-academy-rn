import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput } from "react-native";
import { Theme, palette } from "../theme";
import { DEFAULT_SLOTS } from "../data/content/StudyTimetable.data";

export default function StudyTimetable({ theme }: { theme: Theme }) {
  const [slots, setSlots] = useState(DEFAULT_SLOTS);
  const [topic, setTopic] = useState("");
  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <Text style={{ color: theme.text, fontSize: 26, fontWeight: "800", marginBottom: 8 }}>Study timetable</Text>
      <Text style={{ color: theme.muted, marginBottom: 10 }}>{slots.filter((s) => s.completed).length}/{slots.length} blocks done</Text>
      {days.map((day) => {
        const rows = slots.filter((s) => s.day === day);
        if (!rows.length) return null;
        return (
          <React.Fragment key={day}>
            <Text style={{ color: palette.accent, fontWeight: "800", marginBottom: 6 }}>{day}</Text>
            {rows.map((slot) => (
              <Pressable key={slot.id} onPress={() => setSlots((prev) => prev.map((s) => s.id === slot.id ? { ...s, completed: !s.completed } : s))} style={{ borderWidth: 1, borderColor: theme.line, backgroundColor: theme.card, borderRadius: 14, padding: 12, marginBottom: 8 }}>
                <Text style={{ color: theme.text, fontWeight: "800" }}>{slot.startTime}-{slot.endTime} · {slot.subject}</Text>
                <Text style={{ color: theme.muted }}>{slot.topic}</Text>
                <Text style={{ color: slot.completed ? palette.accent : palette.warn, marginTop: 4 }}>{slot.completed ? "Done" : slot.priority}</Text>
              </Pressable>
            ))}
          </React.Fragment>
        );
      })}
      <TextInput value={topic} onChangeText={setTopic} placeholder="Add a Monday topic" placeholderTextColor={theme.muted} style={{ borderWidth: 1, borderColor: theme.line, color: theme.text, borderRadius: 12, padding: 12, marginBottom: 8 }} />
      <Pressable onPress={() => { if (!topic.trim()) return; setSlots((prev) => [...prev, { id: `slot_${Date.now()}`, day: "Monday", startTime: "19:00", endTime: "20:00", subject: "Use of English", topic, completed: false, priority: "Normal" }]); setTopic(""); }} style={{ backgroundColor: palette.accent, borderRadius: 12, padding: 12, alignItems: "center" }}><Text style={{ fontWeight: "800" }}>Add block</Text></Pressable>
    </ScrollView>
  );
}
