# Source data

`NI_Women_attendance.xlsx` — the original attendance record supplied by the IFA
for the Northern Ireland Women's Senior Team (73 fixtures, 2017–2026).

This is the **real** dataset behind the **Match-day & Attendance** screen. It is
transformed into `src/data/matchHistory.js` with the following cleaning applied:

- **Encoding fixed** on venue and opponent names that were stored as UTF-8 read
  as Latin-1 (e.g. `TÃ³rsvÃ¸llur` → `Tórsvøllur`, `TÃ¼rkiye` → `Türkiye`).
- **Sponsor prefix removed** from the national stadium
  (`Clearer Twist National Stadium at Windsor Park` → `National Stadium at
  Windsor Park`).
- **Blank attendance / capacity** (behind-closed-doors COVID fixtures and
  unrecorded games) stored as `null` rather than `0`, so averages are not skewed.
- **NI perspective derived** for each fixture: home/away, opponent, result
  (W/D/L) and score, plus a flag for whether the venue is one of the team's
  Northern Ireland home grounds.

No personal data is present — the file contains only match-level records.
