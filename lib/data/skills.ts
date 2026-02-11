import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    name: "Data Science & Machine Learning",
    skills: [
      { name: "Python", level: 5 },
      { name: "Pandas", level: 5 },
      { name: "NumPy", level: 5 },
      { name: "Scikit-learn", level: 4 },
      { name: "Machine Learning", level: 4 },
      { name: "Data Analysis", level: 5 },
    ],
  },
  {
    name: "Database & SQL",
    skills: [
      { name: "SQL", level: 5 },
      { name: "T-SQL", level: 5 },
      { name: "PL-SQL", level: 4 },
      { name: "SQL Server", level: 5 },
      { name: "PostgreSQL", level: 4 },
      { name: "Database Design", level: 5 },
    ],
  },
  {
    name: "Data Integration & ETL",
    skills: [
      { name: "Talend Studio", level: 4 },
      { name: "Qlik Replicate", level: 4 },
      { name: "Qlik Compose", level: 4 },
      { name: "ETL/ELT", level: 4 },
      { name: "Data Lakehouse", level: 3 },
      { name: "CDC (Change Data Capture)", level: 4 },
    ],
  },
  {
    name: "Data Visualization & BI",
    skills: [
      { name: "Tableau", level: 4 },
      { name: "Microsoft Excel", level: 5 },
      { name: "Data Visualization", level: 4 },
      { name: "Dashboard Design", level: 4 },
    ],
  },
  {
    name: "Development & Tools",
    skills: [
      { name: "Git / GitHub", level: 5 },
      { name: "FastAPI", level: 4 },
      { name: "React", level: 3 },
      { name: "Next.js", level: 3 },
      { name: "REST API", level: 4 },
    ],
  },
  {
    name: "Languages",
    skills: [
      { name: "Turkish (Native)", level: 5 },
      { name: "English (B1)", level: 3 },
      { name: "Romanian (B1)", level: 3 },
    ],
  },
];
