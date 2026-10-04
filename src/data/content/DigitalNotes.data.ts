export const FORMULA_VAULT = [
  { category: 'Mathematics', name: 'Quadratic Formula', formula: 'x = (-b ± sqrt(b^2 - 4ac)) / (2a)', description: 'Roots of quadratic equation ax^2 + bx + c = 0' },
  { category: 'Mathematics', name: 'Logarithm Product Rule', formula: 'log_a(xy) = log_a(x) + log_a(y)', description: 'Logarithm of product equals sum of logarithms' },
  { category: 'Mathematics', name: 'Change of Base', formula: 'log_b(a) = log_c(a) / log_c(b)', description: 'Converting logarithm to a new base' },
  { category: 'Mathematics', name: 'Trig Pythagoras', formula: 'sin^2(theta) + cos^2(theta) = 1', description: 'Fundamental trigonometric identity' },
  { category: 'Mathematics', name: 'Arithmetic Progression', formula: 'T_n = a + (n - 1)d', description: 'General term of an arithmetic sequence' },
  { category: 'Mathematics', name: 'Geometric Progression', formula: 'T_n = a * r^(n-1)', description: 'General term of a geometric sequence' },
  { category: 'Physics', name: 'Newton Second Law', formula: 'F = m * a', description: 'Force equals mass multiplied by acceleration' },
  { category: 'Physics', name: 'Linear Motion 1', formula: 'v = u + a*t', description: 'Velocity after time t under constant acceleration' },
  { category: 'Physics', name: 'Linear Motion 2', formula: 's = u*t + 0.5*a*t^2', description: 'Displacement with constant acceleration' },
  { category: 'Physics', name: 'Linear Motion 3', formula: 'v^2 = u^2 + 2*a*s', description: 'Velocity squared formula without time' },
  { category: 'Physics', name: 'Wave Velocity', formula: 'v = f * lambda', description: 'Wave speed equals frequency times wavelength' },
  { category: 'Physics', name: 'Ohm Law', formula: 'V = I * R', description: 'Voltage equals current times resistance' },
  { category: 'Physics', name: 'Electric Power', formula: 'P = V * I', description: 'Electrical power dissipation' },
  { category: 'Physics', name: 'Simple Pendulum', formula: 'T = 2*pi*sqrt(L/g)', description: 'Period of a simple pendulum' }
];

export const INITIAL_NOTES = [
  { id: 'note_1', title: 'Concord and stress', subject: 'Use of English', content: 'Neither of takes a singular verb. Calendar, minister, and quantity stress the first syllable; computer stresses the second.', date: '2024-09-01', tags: ['english'] },
  { id: 'note_2', title: 'Quadratic roots', subject: 'Mathematics', content: 'For ax^2+bx+c=0, x = [-b ± sqrt(b^2-4ac)] / 2a. Discriminant sign tells 2, 1, or 0 real roots.', date: '2024-09-01', tags: ['math'] },
  { id: 'note_3', title: 'Newton and momentum', subject: 'Physics', content: 'F = ma. Momentum p = mv is conserved when net external force is zero.', date: '2024-09-01', tags: ['physics'] },
  { id: 'note_4', title: 'The Lekki Headmaster', subject: 'Literature', content: 'Fafore holds the academic standard against board pressure in Lekki. Staff anxiety follows the summons.', date: '2024-09-01', tags: ['literature'] }
];
