# Higher Definition Academy — React Native

JAMB CBT simulation and learning workspace, rewritten from the Vite/React web app onto an Expo React Native stack.

The product goal is unchanged: register a candidate, lock Use of English plus three UTME subjects, run a CBT workstation, then read a result slip. Design stays on the same dark academy palette (`#090a0f`, accent `#00e676`).

## Architecture (preserved)

View ownership still sits in `App.tsx`:

1. `registration` — candidate portal, profile persisted (AsyncStorage replaces `localStorage`)
2. `launchpad` — `HomeDashboard` with the same home / practice / study / games / analytics tabs and the same sub-screens (notes, timetable, search, literature, cutoffs, games, history, flashcards, CBT launch pad)
3. `simulator` — subject switcher, A–D options, flag, question map, calculator, speech, study-mode explanation
4. `analytics` — per-subject score out of 100 and aggregate

`ExamSession`, `Question`, and `ExamMode` are the original types. Question padding still comes from the academy bank via `buildSession`.

## Run

```bash
npm install
npx expo start
```

## Legacy import

`legacy/` holds the imported web project (screens, Express/Gemini server, Vite config). The React Native app does not call that server. Very large generated banks (physics topic JSON, commerce/CRS past papers) remain in the original Drive archive and are not duplicated here because of size.
