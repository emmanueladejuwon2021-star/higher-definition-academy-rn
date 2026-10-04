import React from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Theme, palette } from "../theme";

export function Card({ theme, children, style }: { theme: Theme; children: React.ReactNode; style?: ViewStyle }) {
  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.line }, style]}>
      {children}
    </View>
  );
}

export function PrimaryButton({ label, onPress, tone = "accent" }: { label: string; onPress: () => void; tone?: "accent" | "danger" | "ghost" }) {
  const bg = tone === "accent" ? palette.accent : tone === "danger" ? palette.danger : "transparent";
  const color = tone === "ghost" ? palette.accent : "#04140c";
  return (
    <Pressable onPress={onPress} style={[styles.btn, { backgroundColor: bg, borderColor: tone === "ghost" ? palette.accent : bg }]}>
      <Text style={[styles.btnText, { color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 18, padding: 16 },
  btn: { borderRadius: 14, paddingVertical: 14, paddingHorizontal: 16, alignItems: "center", borderWidth: 1 },
  btnText: { fontWeight: "800", letterSpacing: 0.3 },
});
