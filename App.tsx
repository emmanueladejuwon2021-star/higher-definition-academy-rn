import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import RegistrationScreen, { Profile } from "./src/screens/RegistrationScreen";
import HomeDashboard from "./src/screens/HomeDashboard";
import ExamSimulator from "./src/screens/ExamSimulator";
import AnalyticsScreen, { scoreSession } from "./src/screens/AnalyticsScreen";
import { ExamSession } from "./src/types";
import { makeTheme } from "./src/theme";
import { clearProfile, loadHistory, loadProfile, loadTheme, saveHistory, saveProfile, saveTheme } from "./src/utils/storage";

type ViewName = "registration" | "launchpad" | "simulator" | "analytics";
type HistoryRow = { id: string; aggregate: number; when: string };

export default function App() {
  const [ready, setReady] = useState(false);
  const [view, setView] = useState<ViewName>("registration");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<ExamSession | null>(null);
  const [dark, setDark] = useState(true);
  const [history, setHistory] = useState<HistoryRow[]>([]);
  const theme = makeTheme(dark);

  useEffect(() => {
    (async () => {
      const [p, t, h] = await Promise.all([loadProfile<Profile>(), loadTheme(), loadHistory<HistoryRow>()]);
      setDark(t);
      setHistory(h);
      if (p) { setProfile(p); setView("launchpad"); }
      setReady(true);
    })();
  }, []);

  const toggleTheme = () => setDark((d) => { const n = !d; saveTheme(n); return n; });

  if (!ready) {
    return <View style={{ flex: 1, backgroundColor: "#090a0f", alignItems: "center", justifyContent: "center" }}><ActivityIndicator color="#00e676" /></View>;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
        <StatusBar style={dark ? "light" : "dark"} />
        {view === "registration" && (
          <RegistrationScreen theme={theme} onToggleTheme={toggleTheme} onComplete={(p) => { setProfile(p); saveProfile(p); setView("launchpad"); }} />
        )}
        {view === "launchpad" && profile && (
          <HomeDashboard
            theme={theme}
            profile={profile}
            history={history}
            onToggleTheme={toggleTheme}
            onLogout={() => { clearProfile(); setProfile(null); setView("registration"); }}
            onStartExam={(s) => { setSession(s); setView("simulator"); }}
          />
        )}
        {view === "simulator" && session && (
          <ExamSimulator
            theme={theme}
            session={session}
            onToggleTheme={toggleTheme}
            onExit={() => setView("launchpad")}
            onFinish={(done) => {
              setSession(done);
              const aggregate = scoreSession(done).aggregate;
              const row = { id: done.id, aggregate, when: new Date().toLocaleString() };
              const next = [row, ...history].slice(0, 20);
              setHistory(next);
              saveHistory(next);
              setView("analytics");
            }}
          />
        )}
        {view === "analytics" && (
          <AnalyticsScreen theme={theme} session={session} onHome={() => setView("launchpad")} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
