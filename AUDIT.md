# Conversion audit

Restored as separate React Native screens, not a reduced module file:

- RegistrationPortal: name, email, phone, country, school, full subject list, activation key
- LaunchPad: practice/mock/study, duration, shuffle questions and options, year, count, syllabus topics, dynamic generator
- ExamSimulator: timer, subjects, flags, grid, calculator, speech, study explanations
- Analytics: per-subject bar, missed-item correction
- DigitalNotes: original notes and formula vault, add note
- StudyTimetable: original 10 slots, complete toggle, add block
- LiteratureGuide: original Lekki chapters, events, likely questions
- CareerCutoffCalculator: original institution table and O-level points
- EducationalGames: original synonym list and challenge pool
- QuestionSearch: full loaded bank
- ResultHistoryAndCorrection: device result slips and reopen in study mode
- Flashcards: flip through the bank

Question banks from the web archive are in src/data/banks, including physics, CRS, and commerce JSON. Results persist on device because the Express API is not running inside the app. server/server.ts is the original API.
