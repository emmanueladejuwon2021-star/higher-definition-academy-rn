export const INSTITUTIONS_DATA = [
  { institution: 'University of Ibadan (UI)', course: 'Medicine & Surgery', meritCutoff: 315, catchmentCutoff: 302, postUtmeRequired: true, notes: 'Merit strictly based on 50% UTME + 50% Post-UTME composite.' },
  { institution: 'University of Lagos (UNILAG)', course: 'Medicine & Surgery', meritCutoff: 310, catchmentCutoff: 295, postUtmeRequired: true, notes: 'Composite formula: (UTME/8) + O-Level (20%) + Post-UTME (30%).' },
  { institution: 'Obafemi Awolowo University (OAU)', course: 'Medicine & Surgery', meritCutoff: 298, catchmentCutoff: 288, postUtmeRequired: true, notes: 'Requires minimum of 200 in UTME to be eligible for Post-UTME screening.' },
  { institution: 'University of Nigeria, Nsukka (UNN)', course: 'Medicine & Surgery', meritCutoff: 290, catchmentCutoff: 280, postUtmeRequired: true, notes: '50% UTME + 50% Post-UTME standard formula.' },
  { institution: 'Ahmadu Bello University (ABU)', course: 'Medicine & Surgery', meritCutoff: 275, catchmentCutoff: 260, postUtmeRequired: true, notes: 'High catchment allocation for northern states.' },
  { institution: 'University of Lagos (UNILAG)', course: 'Computer Science', meritCutoff: 275, catchmentCutoff: 262, postUtmeRequired: true, notes: 'O-Level Math, English, Physics, Chem must be credit or higher.' },
  { institution: 'Federal University of Technology, Akure (FUTA)', course: 'Computer Science', meritCutoff: 260, catchmentCutoff: 248, postUtmeRequired: true, notes: 'Premier tech university in western region.' },
  { institution: 'University of Ibadan (UI)', course: 'Computer Science', meritCutoff: 280, catchmentCutoff: 268, postUtmeRequired: true, notes: 'High competition in faculty of science.' },
  { institution: 'University of Ilorin (UNILORIN)', course: 'Computer Science', meritCutoff: 245, catchmentCutoff: 235, postUtmeRequired: false, notes: 'Fast-paced academic calendar with online screening.' },
  { institution: 'University of Ibadan (UI)', course: 'Law', meritCutoff: 295, catchmentCutoff: 285, postUtmeRequired: true, notes: 'Lit in English and CRS/IRS are crucial in subject combination.' },
  { institution: 'University of Lagos (UNILAG)', course: 'Law', meritCutoff: 288, catchmentCutoff: 278, postUtmeRequired: true, notes: 'Top ranked faculty of law.' },
  { institution: 'University of Benin (UNIBEN)', course: 'Law', meritCutoff: 265, catchmentCutoff: 252, postUtmeRequired: true, notes: 'Rigorous post-UTME aptitude.' },
  { institution: 'University of Lagos (UNILAG)', course: 'Mechanical Engineering', meritCutoff: 270, catchmentCutoff: 258, postUtmeRequired: true, notes: 'Math, Physics, Chem required.' },
  { institution: 'Federal University of Technology, Minna (FUTMINNA)', course: 'Mechanical Engineering', meritCutoff: 220, catchmentCutoff: 205, postUtmeRequired: false, notes: 'Technical screening.' },
  { institution: 'Covenant University', course: 'Computer Engineering', meritCutoff: 230, catchmentCutoff: 210, postUtmeRequired: true, notes: 'Private institutional interview.' }
];

export const GRADE_POINTS: Record<string, number> = {
  A1: 8, A: 8, B2: 7, B3: 6, B: 6, C4: 5, C5: 4, C6: 3, C: 3, D7: 2, E8: 1, F9: 0, F: 0,
};
