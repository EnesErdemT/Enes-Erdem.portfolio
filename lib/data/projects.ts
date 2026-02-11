import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "CineMatch - AI-Powered Movie Recommendation System",
    description:
      "Hybrid recommendation engine using Cosine Similarity and genre-weighting for personalized film suggestions",
    longDescription:
      "Developed a hybrid recommendation engine using Cosine Similarity and genre-weighting to provide personalized film suggestions. Engineered a scalable FastAPI backend for high-performance data processing and integrated Scikit-learn for popularity normalization. Designed a modern, interactive user interface using Next.js and React, featuring an AI-driven chatbot for movie discovery. Collaborated in a cross-functional team, managing the integration of TMDB API for real-time data ingestion and dataset preparation.",
    technologies: [
      "Python",
      "FastAPI",
      "Scikit-learn",
      "Next.js",
      "React",
      "TMDB API",
      "Machine Learning",
      "Cosine Similarity",
    ],
    githubUrl: "https://github.com/AdalSuUygur/CineMatch",
    featured: true,
  },
  {
    id: "2",
    title: "T-SQL University Management System",
    description:
      "Robust T-SQL database with Stored Procedures, Triggers, and Transactions for automated academic management",
    longDescription:
      "Built a robust T-SQL database featuring Stored Procedures, Triggers, and Transactions for automated academic management. Optimized data retrieval with Indexes and designed PIVOT-based reporting views for performance-driven insights. By learning and applying T-SQL and Machine Learning, I have gained skills in Data Science and Technology, including Python, SQL, T-SQL, PL-SQL, and Qlik tools (Replicate, Compose). I am driven to leverage AI and data engineering to create meaningful value in international projects.",
    technologies: [
      "T-SQL",
      "SQL Server",
      "Stored Procedures",
      "Triggers",
      "Transactions",
      "Database Design",
      "Performance Optimization",
    ],
    githubUrl: "https://github.com/EnesErdemT/T-SQL-UNIVERSITY-MANAGEMENT-SYSTEM",
    featured: true,
  },
  {
    id: "3",
    title: "Library Management Application",
    description:
      "Comprehensive library management system for book tracking and member management",
    longDescription:
      "Developed a full-featured library management application with book inventory tracking, member registration, borrowing/return operations, and overdue fine calculations. Implemented user-friendly interface with search and filter capabilities for efficient library operations.",
    technologies: [
      "C#",
      ".NET",
      "SQL Server",
      "Windows Forms",
      "Database Design",
    ],
    githubUrl: "https://github.com/EnesErdemT/LibraryApp",
    featured: false,
  },
  {
    id: "4",
    title: "SmartStore Reservation System",
    description:
      "Intelligent store reservation and appointment management platform",
    longDescription:
      "Created a smart reservation system for retail stores enabling customers to book appointments, manage time slots, and receive automated notifications. Integrated calendar functionality and real-time availability checking for seamless user experience.",
    technologies: [
      "Python",
      "Flask",
      "SQLite",
      "JavaScript",
      "Bootstrap",
      "REST API",
    ],
    githubUrl: "https://github.com/EnesErdemT/SmartStoreReservation",
    featured: false,
  },
];
