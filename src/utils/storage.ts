import AsyncStorage from "@react-native-async-storage/async-storage";

const PROFILE = "hda_user_profile";
const THEME = "hda_theme";
const HISTORY = "hda_result_history";

export async function loadProfile<T>(): Promise<T | null> {
  const raw = await AsyncStorage.getItem(PROFILE);
  return raw ? (JSON.parse(raw) as T) : null;
}
export async function saveProfile(profile: unknown) {
  await AsyncStorage.setItem(PROFILE, JSON.stringify(profile));
}
export async function clearProfile() {
  await AsyncStorage.removeItem(PROFILE);
}
export async function loadTheme(): Promise<boolean> {
  const raw = await AsyncStorage.getItem(THEME);
  return raw ? raw === "dark" : true;
}
export async function saveTheme(dark: boolean) {
  await AsyncStorage.setItem(THEME, dark ? "dark" : "light");
}
export async function loadHistory<T>(): Promise<T[]> {
  const raw = await AsyncStorage.getItem(HISTORY);
  return raw ? (JSON.parse(raw) as T[]) : [];
}
export async function saveHistory(rows: unknown[]) {
  await AsyncStorage.setItem(HISTORY, JSON.stringify(rows));
}
