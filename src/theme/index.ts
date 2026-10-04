export const palette = {
  bg: "#090a0f",
  bgLight: "#f1f5f9",
  card: "#12141c",
  cardLight: "#ffffff",
  line: "rgba(255,255,255,0.08)",
  lineLight: "rgba(15,23,42,0.08)",
  text: "#f8fafc",
  textLight: "#0f172a",
  muted: "#94a3b8",
  mutedLight: "#64748b",
  accent: "#00e676",
  accentDim: "rgba(0,230,118,0.14)",
  warn: "#f59e0b",
  danger: "#f43f5e",
  info: "#38bdf8",
};

export type Theme = {
  dark: boolean;
  bg: string;
  card: string;
  line: string;
  text: string;
  muted: string;
  accent: string;
};

export function makeTheme(dark: boolean): Theme {
  return {
    dark,
    bg: dark ? palette.bg : palette.bgLight,
    card: dark ? palette.card : palette.cardLight,
    line: dark ? palette.line : palette.lineLight,
    text: dark ? palette.text : palette.textLight,
    muted: dark ? palette.muted : palette.mutedLight,
    accent: palette.accent,
  };
}
