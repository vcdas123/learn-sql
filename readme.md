# 📊 SQL Mastery: Learning Journey & Interactive App

A comprehensive collection of study notes, architectural patterns, and hands-on examples for SQL development. This repository now features a modern, interactive web application to browse these notes with a professional developer experience.

---

## 🚀 Interactive Learning App

I've built a modern, responsive **React + Vite** application to serve these notes with a professional documentation experience.

### ✨ Features
- **Dark/Light Mode UI:** Sleek design with theme persistence using `localStorage`.
- **Syntax Highlighting:** Professional code block styling for SQL queries and results.
- **Dynamic Loading:** Powered by Vite's `import.meta.glob` to parse notes directly from source.
- **Responsive Design:** Optimized for mobile, tablet, and desktop viewing.
- **Automated TOC:** Dynamic Table of Contents generation for every module.

### 🛠 Tech Stack
- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS v4
- **Components:** Framer Motion, Lucide React
- **Markdown:** React Markdown, Remark GFM, React Syntax Highlighter

### 🏃 How to Run Locally
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
Then visit `http://localhost:5173` in your browser.

---

## 📚 SQL Learning Notes Index

Welcome to the SQL Learning Notes index. This is a comprehensive collection of SQL fundamentals to advanced topics.

### 🎯 Complete Chapter List

#### Foundation & Introduction
- [00. SQL & Database - Foundations](src/notes/00.%20SQL%20&%20Database%20-%20Foundations.md) - **START HERE** - Introduction to SQL, databases, DBMS, and database types

#### Basic SQL Concepts
- [01. SQL Query Basics 1](src/notes/01.%20SQL%20Query%20Basics%201.md)
- [01.1. SQL Query Basics 2](src/notes/01.1.%20SQL%20Query%20Basics%202.md)
- [02. SQL DDL (Data Definition Language)](src/notes/02.%20SQL%20DDL%20(Data%20Definition%20Language).md)
- [03. SQL DDL Constraints](src/notes/03.%20SQL%20DDL%20Constraints.md)
- [04. SQL DML (Data Manipulation Language)](src/notes/04.%20SQL%20DML%20(Data%20Manipulation%20Language).md)
- [05. SQL WHERE Clause & Operators](src/notes/05.%20SQL%20WHERE%20Clause%20&%20Operators.md)

#### Data Retrieval & Joins
- [06. SQL Joins – Combining Data from Multiple Tables](src/notes/06.%20SQL%20Joins%20–%20Combining%20Data%20from%20Multiple%20Tables.md)
- [07. SQL Advanced Joins – Anti Joins & Cross Join](src/notes/07.%20SQL%20Advanced%20Joins%20–%20Anti%20Joins%20&%20Cross%20Join.md)
- [08. SQL Join Decision Tree & Multi-Table Joining Strategy](src/notes/08.%20SQL%20Join%20Decision%20Tree%20&%20Multi-Table%20Joining%20Strategy.md)
- [09. SQL Set Operators – Complete Structured Guide](src/notes/09.%20SQL%20Set%20Operators%20–%20Complete%20Structured%20Guide.md)

#### Functions & Data Manipulation
- [10. SQL Functions – Complete Structured Guide](src/notes/10.%20SQL%20Functions%20–%20Complete%20Structured%20Guide.md)
- [11. SQL String Functions](src/notes/11.%20SQL%20String%20Functions.md)
- [12. SQL Numeric Functions – ROUND & ABS](src/notes/12.%20SQL%20Numeric%20Functions%20–%20ROUND%20&%20ABS.md)
- [13. Working with Date and Time in SQL](src/notes/13.%20Working%20with%20Date%20and%20Time%20in%20SQL.md)
- [14. SQL Date Formatting and Casting](src/notes/14.%20SQL%20Date%20Formatting%20and%20Casting.md)
- [15. SQL Date Calculations and Validation](src/notes/15.%20SQL%20Date%20Calculations%20and%20Validation.md)

#### NULL Handling & Conditional Logic
- [16. Handling NULL Values](src/notes/16.%20Handling%20NULL%20Values.md)
- [17. NULL vs Empty String vs Blank Space](src/notes/17.%20NULL%20vs%20Empty%20String%20vs%20Blank%20Space.md)
- [18. CASE Statement](src/notes/18.%20CASE%20Statement.md)

#### Aggregation & Window Functions
- [19. Aggregate Functions in SQL](src/notes/19.%20Aggregate%20Functions%20in%20SQL.md)
- [20. Window Functions (Analytical Functions) in SQL](src/notes/20.%20Window%20Functions%20(Analytical%20Functions)%20in%20SQL.md)
- [21. Window Aggregate Functions in SQL](src/notes/21.%20Window%20Aggregate%20Functions%20in%20SQL.md)
- [22. Window Ranking Functions in SQL](src/notes/22.%20Window%20Ranking%20Functions%20in%20SQL.md)
- [23. Window Value Functions (Analytical Functions) in SQL](src/notes/23.%20Window%20Value%20Functions%20(Analytical%20Functions)%20in%20SQL.md)

#### Indexing & Query Performance
- [24. SQL Indexes — Complete Notes](src/notes/24.%20SQL%20Indexes%20—%20Complete%20Notes.md)
- [25. SQL Columnstore Index](src/notes/25.%20SQL%20Columnstore%20Index.md)
- [26. SQL Unique Index & Filtered Index](src/notes/26.%20SQL%20Unique%20Index%20&%20Filtered%20Index.md)
- [27. SQL Index Maintenance, Monitoring & Strategy](src/notes/27.%20SQL%20Index%20Maintenance,%20Monitoring%20&%20Strategy.md)
- [28. Execution Plans, SQL Hints & Indexing Strategy](src/notes/28.%20Execution%20Plans,%20SQL%20Hints%20&%20Indexing%20Strategy.md)

#### Advanced Query Techniques
- [29. Managing Query Complexity — Subqueries, CTEs, Views, Temporary Tables & CTAS](src/notes/29.%20Managing%20Query%20Complexity%20—%20Subqueries,%20CTEs,%20Views,%20Temporary%20Tables%20&%20CTAS.md)
- [30. Subqueries — Types, Operators, and Execution](src/notes/30.%20Subqueries%20—%20Types,%20Operators,%20and%20Execution.md)
- [31. Common Table Expressions (CTEs) in SQL](src/notes/31.%20Common%20Table%20Expressions%20(CTEs)%20in%20SQL.md)
- [32. SQL Views — Virtual Tables, Abstraction, and Data Architecture](src/notes/32.%20SQL%20Views%20—%20Virtual%20Tables,%20Abstraction,%20and%20Data%20Architecture.md)
- [33. SQL Tables & CTAS — Permanent Storage, Snapshots, and Data Architecture](src/notes/33.%20SQL%20Tables%20&%20CTAS%20—%20Permanent%20Storage,%20Snapshots,%20and%20Data%20Architecture.md)
- [34. SQL Temporary Tables — Session-Scoped Intermediate Storage](src/notes/34.%20SQL%20Temporary%20Tables%20—%20Session-Scoped%20Intermediate%20Storage.md)
- [35. SQL Subquery vs CTE vs Views vs CTAS vs TEMP](src/notes/35.%20SQL%20Subquery%20vs%20CTE%20vs%20Views%20vs%20CTAS%20vs%20TEMP.md)

#### Database Objects & Automation
- [36. Stored Procedures](src/notes/36.%20Stored%20Procedures.md)
- [37. Triggers](src/notes/37.%20Triggers.md)

---

## 🎯 Learning Path Recommendation

1. **Start with Foundations**: Chapter 00 introduces databases, SQL, and DBMS concepts
2. **Learn Basic SQL**: Chapters 01-05 cover basic syntax and queries
3. **Master Data Retrieval**: Chapters 06-09 teach you how to join tables and combine data
4. **Understand Functions**: Chapters 10-23 cover string, numeric, date, and analytical functions
5. **Optimize Performance**: Chapters 24-28 teach indexing and query optimization
6. **Advanced Techniques**: Chapters 29-37 cover subqueries, CTEs, views, stored procedures, and triggers

## 📖 About This Collection

This comprehensive SQL learning resource covers:
- ✅ Beginner to Advanced topics
- ✅ Real-world examples and use cases
- ✅ Best practices and common mistakes
- ✅ MySQL, MSSQL, and PostgreSQL comparisons
- ✅ Performance optimization techniques
- ✅ Practical sample schemas and queries

Happy Learning! 🚀
