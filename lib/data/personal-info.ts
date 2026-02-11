import { PersonalInfo } from "@/types";

// Social links data without icons (icons will be added in components)
const socialLinksRaw: Omit<PersonalInfo["socialLinks"][0], "icon">[] = [
  {
    platform: "github",
    url: "https://github.com/EnesErdemT",
  },
  {
    platform: "linkedin",
    url: "https://www.linkedin.com/in/enesterdem/",
  },
  {
    platform: "email",
    url: "mailto:enesterdem@gmail.com",
  },
];

export const personalInfoData = {
  name: "Enes Talha Erdem",
  title: "Data Science Specialist",
  titles: ["Data Science Specialist", "Machine Learning Engineer", "Data Engineer"],
  email: "enesterdem@gmail.com",
  phone: "+90 534 580 3440",
  location: "İstanbul, Türkiye / Constanța, Romania",
  profileImage: "/images/profile.jpeg",
  bio: `Computer Science student at Ovidius University of Constanța and a selected participant of the Google AI Academy. I specialize in Data Science and Machine Learning, with a strong technical stack in Python, SQL, and T-SQL. Beyond analysis, I have advanced skills in enterprise data integration using Talend Studio and Qlik (Replicate & Compose) for real-time CDC and Data Warehouse automation. I am driven to leverage AI and data engineering to create meaningful value in international projects.`,
  education: [
    {
      institution: "Ovidius University of Constanța",
      degree: "Computer Science",
      location: "Constanța, Romania",
      years: "2023-2026",
      type: "university",
    },
    {
      institution: "Ovidius University of Constanța",
      degree: "Romanian Language Preparatory Year",
      location: "Constanța, Romania",
      years: "2022-2023",
      type: "preparatory",
    },
    {
      institution: "Oguz Canpolat High School",
      degree: "High School Diploma",
      location: "İstanbul, Türkiye",
      years: "2018-2022",
      type: "high-school",
    },
  ],
  goals: `I aim to deepen my expertise in AI and data engineering in the short term, and in the long term, to lead innovative data-driven solutions in international projects that create meaningful impact.`,
};

export const socialLinksData = socialLinksRaw;
