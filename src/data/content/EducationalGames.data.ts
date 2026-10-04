import { JAMBSubject } from '../../types';
export const SYNONYM_QUESTIONS = [
  { word: 'EPHEMERAL', type: 'Synonym', options: ['Fleeting', 'Enduring', 'Voluminous', 'Rigid'], correct: 'Fleeting', explanation: 'Ephemeral means lasting for a very short time.' },
  { word: 'CANDID', type: 'Synonym', options: ['Deceptive', 'Frank', 'Secretive', 'Timid'], correct: 'Frank', explanation: 'Candid means truthful and straightforward; frank.' },
  { word: 'MITIGATE', type: 'Antonym', options: ['Alleviate', 'Aggravate', 'Moderate', 'Pacify'], correct: 'Aggravate', explanation: 'Mitigate means to lessen severity; its antonym is aggravate.' },
  { word: 'METICULOUS', type: 'Synonym', options: ['Careless', 'Fastidious', 'Clumsy', 'Hasty'], correct: 'Fastidious', explanation: 'Meticulous means showing great attention to detail; very careful and precise.' },
  { word: 'PRAGMATIC', type: 'Synonym', options: ['Theoretical', 'Practical', 'Fanciful', 'Dogmatic'], correct: 'Practical', explanation: 'Pragmatic deals with matters sensibly and realistically.' },
  { word: 'ZEALOUS', type: 'Antonym', options: ['Enthusiastic', 'Apathetic', 'Passionate', 'Ardent'], correct: 'Apathetic', explanation: 'Zealous means having great energy/enthusiasm; opposite is apathetic.' },
  { word: 'UBIQUITOUS', type: 'Synonym', options: ['Omnipresent', 'Rare', 'Inconspicuous', 'Isolated'], correct: 'Omnipresent', explanation: 'Ubiquitous means present, appearing, or found everywhere.' },
  { word: 'LACONIC', type: 'Antonym', options: ['Concise', 'Verbose', 'Brief', 'Taciturn'], correct: 'Verbose', explanation: 'Laconic means using very few words; the antonym is verbose.' }
];

export const CHALLENGE_POOL = [
  { q: 'In binary system, 1101 is equivalent to decimal:', opts: ['13', '11', '15', '9'], cor: '13', subj: 'Computer' },
  { q: 'What is the oxidation number of Sulfur in H2SO4?', opts: ['+6', '+4', '+2', '-2'], cor: '+6', subj: 'Chemistry' },
  { q: 'Which wave phenomenon proves the transverse nature of light?', opts: ['Polarization', 'Interference', 'Diffraction', 'Refraction'], cor: 'Polarization', subj: 'Physics' },
  { q: 'A group of lions living together is known as a ________:', opts: ['Pride', 'School', 'Flock', 'Pack'], cor: 'Pride', subj: 'English' },
  { q: 'If 2x - 3 = 11, find the value of x^2 + 1:', opts: ['50', '49', '36', '64'], cor: '50', subj: 'Math' },
  { q: 'The author of The Lekki Headmaster examines themes of:', opts: ['Integrity & Educational reform', 'Feudal colonialism', 'Agrarian revolution', 'Aviation history'], cor: 'Integrity & Educational reform', subj: 'Literature' }
];
