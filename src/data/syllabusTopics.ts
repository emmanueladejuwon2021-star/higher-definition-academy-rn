export const SYLLABUS_TOPICS: Record<string, string[]> = {
  "Use of English": ["Lexis and structure", "Synonyms and antonyms", "Sentence completion", "Oral English stress", "Comprehension", "The Lekki Headmaster"],
  "Mathematics": ["Number bases", "Indices and logs", "Quadratic equations", "Sets", "Statistics", "Trigonometry"],
  "Physics": ["Measurement", "Motion", "Newton's laws", "Work energy power", "Waves", "Current electricity"],
  "Chemistry": ["Particulate nature", "Periodic table", "Stoichiometry", "Acids bases salts", "Organic chemistry", "Rates"],
  "Biology": ["Cell structure", "Nutrition", "Respiration", "Ecology", "Genetics", "Reproduction"],
  "Economics": ["Demand and supply", "Market structures", "National income", "Money and banking"],
  "Literature": ["The Lekki Headmaster", "Drama", "Poetry", "Prose"],
  "CRS": ["Old Testament", "New Testament", "Themes"],
  "Commerce": ["Trade", "Business units", "Insurance", "Banking"],
};
export function getTopicsForSubject(subject: string): string[] {
  return SYLLABUS_TOPICS[subject] || [];
}
