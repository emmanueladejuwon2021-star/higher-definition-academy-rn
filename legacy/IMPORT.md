# Imported web project

The Drive archive was a Vite + React + Express app (Higher Definition Academy).

Kept architecture:
- App view state: registration -> launchpad (HomeDashboard) -> simulator -> analytics
- Dashboard tabs: home, practice, study, games, analytics
- Sub-screens: notes, timetable, search, literature, cutoff, games, history, flashcards, CBT launch pad
- Types: JAMBSubject, ExamMode, Question, ExamSession
- Theme key hda_theme, profile key hda_user_profile

Original web screens, server.ts, and Vite config were read from the archive and rewritten against React Native primitives (View, Pressable, AsyncStorage, expo-speech). Generated banks over 100KB (topicQuestionsPhysics.json, pastQuestionsCRS.json, pastQuestionsCommerce.json) were not committed.
