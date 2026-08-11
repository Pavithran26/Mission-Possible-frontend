import {
  Session,
  User,
  CodePlaygroundExercise,
  InspectMetadata,
  PersonalNote,
  DiscussionPost,
  SessionTrackerRecord
} from '../types';

export const mockCurrentUser: User = {
  id: 'gt-101',
  name: 'Alex Vance',
  email: 'alex.vance@enterprise.com',
  role: 'GT',
  batch: 'GT-2026-Batch-02',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  xp: 2850,
  level: 5,
  streakDays: 14,
  lastActiveDate: '2026-08-01',
  dailyGoalMinutes: 45,
  todayMinutesSpent: 38,
};

export const mockUser = mockCurrentUser;


export const mockSessions: Session[] = [
  {
    id: 'session-dotnet',
    name: '.NET with C#',
    category: '.NET with C#',
    trainerName: 'Santhosh',
    description: 'Comprehensive mastery of C# 12, OOP, LINQ, Async/Await, SOLID principles, ASP.NET Core Web API, and Entity Framework Core.',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    durationHours: 32,
    difficulty: 'Intermediate',
    progressPercent: 80,
    lastAccessed: 'Today, 09:15 AM',
    isPublished: true,
    rating: 4.9,
    ratingCount: 142,
    learningObjectives: [
      'Understand C# Memory Model, Garbage Collection, and Value vs Reference Types',
      'Apply SOLID Principles & Clean Architecture patterns in Enterprise Apps',
      'Build High-performance RESTful APIs with ASP.NET Core & Swagger',
      'Master Entity Framework Core ORM with Code-First Migrations & LINQ Queries'
    ],
    topics: [
      {
        id: 'dotnet-t1',
        title: 'Introduction & Basics',
        order: 1,
        status: 'Completed',
        description: 'C# Runtime environment (.NET 8), CLR, JIT compilation, and basic program execution flow.',
        subtopics: [
          { id: 'st-1', title: '.NET Ecosystem & CLR', durationMinutes: 20, status: 'Completed' },
          { id: 'st-2', title: 'Variables, Constants & Data Types', durationMinutes: 30, status: 'Completed' },
          { id: 'st-3', title: 'Control Flow & Loops', durationMinutes: 25, status: 'Completed' },
          { id: 'st-4', title: 'Operators & Expressions', durationMinutes: 20, status: 'Completed' },
          { id: 'st-5', title: 'Methods & Parameters', durationMinutes: 30, status: 'Completed' },
          { id: 'st-6', title: 'Namespaces & Project Structure', durationMinutes: 25, status: 'Completed' }
        ]
      },
      {
        id: 'dotnet-t2',
        title: 'Object-Oriented Programming (OOP)',
        order: 2,
        status: 'Completed',
        description: 'Classes, Objects, Encapsulation, Inheritance, Polymorphism, Abstraction, and Interfaces.',
        subtopics: [
          { id: 'st-7', title: 'Classes, Structs & Records', durationMinutes: 45, status: 'Completed' },
          { id: 'st-8', title: 'Inheritance & Polymorphism', durationMinutes: 40, status: 'Completed' },
          { id: 'st-9', title: 'Interfaces & Abstract Classes', durationMinutes: 35, status: 'Completed' },
          { id: 'st-10', title: 'Constructors & Destructors', durationMinutes: 25, status: 'Completed' },
          { id: 'st-11', title: 'Access Modifiers', durationMinutes: 20, status: 'Completed' },
          { id: 'st-12', title: 'Properties & Indexers', durationMinutes: 30, status: 'Completed' }
        ]
      },
      {
        id: 'dotnet-t3',
        title: 'Collections & LINQ',
        order: 3,
        status: 'Completed',
        description: 'Generic Collections, Delegates, Lambda Expressions, Deferred Execution, and LINQ Query Operators.',
        subtopics: [
          { id: 'st-13', title: 'List, Dictionary & HashSet', durationMinutes: 30, status: 'Completed' },
          { id: 'st-14', title: 'Delegates & Events', durationMinutes: 40, status: 'Completed' },
          { id: 'st-15', title: 'LINQ Query Syntaxes & Method Chaining', durationMinutes: 50, status: 'Completed' },
          { id: 'st-16', title: 'Lambda Expressions', durationMinutes: 30, status: 'Completed' },
          { id: 'st-17', title: 'Extension Methods', durationMinutes: 25, status: 'Completed' },
          { id: 'st-18', title: 'Grouping, Ordering & Filtering Data', durationMinutes: 35, status: 'Completed' }
        ]
      },
      {
        id: 'dotnet-t4',
        title: 'Async Programming & Exception Handling',
        order: 4,
        status: 'In Progress',
        description: 'Async/Await pattern, Task Parallel Library (TPL), CancellationTokens, custom exception filters.',
        subtopics: [
          { id: 'st-19', title: 'Task & Async/Await Under the Hood', durationMinutes: 45, status: 'Completed' },
          { id: 'st-20', title: 'Handling Race Conditions & SemaphoreSlim', durationMinutes: 35, status: 'In Progress' },
          { id: 'st-21', title: 'Global Exception Middleware', durationMinutes: 30, status: 'Unlocked' },
          { id: 'st-22', title: 'Cancellation Tokens', durationMinutes: 25, status: 'Unlocked' },
          { id: 'st-23', title: 'Custom Exceptions & Logging', durationMinutes: 30, status: 'Unlocked' },
          { id: 'st-24', title: 'Parallel Programming (TPL)', durationMinutes: 40, status: 'Unlocked' }
        ]
      },
      {
        id: 'dotnet-t5',
        title: 'File Handling & Serialization',
        order: 5,
        status: 'Locked',
        description: 'Working with files, streams, JSON/XML serialization, and configuration files.',
        subtopics: [
          { id: 'st-25', title: 'File & Directory Operations', durationMinutes: 30, status: 'Locked' },
          { id: 'st-26', title: 'Streams & StreamReader/Writer', durationMinutes: 35, status: 'Locked' },
          { id: 'st-27', title: 'JSON Serialization', durationMinutes: 40, status: 'Locked' },
          { id: 'st-28', title: 'XML Serialization', durationMinutes: 30, status: 'Locked' },
          { id: 'st-29', title: 'Configuration Files', durationMinutes: 25, status: 'Locked' },
          { id: 'st-30', title: 'Logging with ILogger', durationMinutes: 25, status: 'Locked' }
        ]
      },
      {
        id: 'dotnet-t6',
        title: 'Entity Framework Core',
        order: 6,
        status: 'Locked',
        description: 'Database connectivity, ORM concepts, migrations, and CRUD operations using EF Core.',
        subtopics: [
          { id: 'st-31', title: 'DbContext & DbSet', durationMinutes: 35, status: 'Locked' },
          { id: 'st-32', title: 'Code First Approach', durationMinutes: 40, status: 'Locked' },
          { id: 'st-33', title: 'Migrations', durationMinutes: 30, status: 'Locked' },
          { id: 'st-34', title: 'CRUD Operations', durationMinutes: 45, status: 'Locked' },
          { id: 'st-35', title: 'Relationships & Navigation Properties', durationMinutes: 40, status: 'Locked' },
          { id: 'st-36', title: 'LINQ with EF Core', durationMinutes: 35, status: 'Locked' }
        ]
      },
      {
        id: 'dotnet-t7',
        title: 'ASP.NET Core Web API',
        order: 7,
        status: 'Locked',
        description: 'Building REST APIs using ASP.NET Core, dependency injection, middleware, and authentication.',
        subtopics: [
          { id: 'st-37', title: 'Creating REST APIs', durationMinutes: 40, status: 'Locked' },
          { id: 'st-38', title: 'Controllers & Routing', durationMinutes: 35, status: 'Locked' },
          { id: 'st-39', title: 'Dependency Injection', durationMinutes: 30, status: 'Locked' },
          { id: 'st-40', title: 'Middleware Pipeline', durationMinutes: 35, status: 'Locked' },
          { id: 'st-41', title: 'JWT Authentication', durationMinutes: 45, status: 'Locked' },
          { id: 'st-42', title: 'Swagger & API Testing', durationMinutes: 25, status: 'Locked' }
        ]
      },
      {
        id: 'dotnet-t8',
        title: 'Testing & Design Patterns',
        order: 8,
        status: 'Locked',
        description: 'Unit testing, mocking frameworks, SOLID principles, and common design patterns.',
        subtopics: [
          { id: 'st-43', title: 'Unit Testing with xUnit', durationMinutes: 40, status: 'Locked' },
          { id: 'st-44', title: 'Mocking with Moq', durationMinutes: 35, status: 'Locked' },
          { id: 'st-45', title: 'SOLID Principles', durationMinutes: 45, status: 'Locked' },
          { id: 'st-46', title: 'Repository Pattern', durationMinutes: 35, status: 'Locked' },
          { id: 'st-47', title: 'Factory & Singleton Patterns', durationMinutes: 30, status: 'Locked' },
          { id: 'st-48', title: 'Clean Architecture Basics', durationMinutes: 40, status: 'Locked' }
        ]
      },
      {
        id: 'dotnet-t9',
        title: 'Deployment & Capstone Project',
        order: 9,
        status: 'Locked',
        description: 'Deploying .NET applications and building an end-to-end real-world project.',
        subtopics: [
          { id: 'st-49', title: 'Application Configuration', durationMinutes: 25, status: 'Locked' },
          { id: 'st-50', title: 'Docker Basics', durationMinutes: 40, status: 'Locked' },
          { id: 'st-51', title: 'Azure Deployment', durationMinutes: 45, status: 'Locked' },
          { id: 'st-52', title: 'CI/CD Pipeline Basics', durationMinutes: 35, status: 'Locked' },
          { id: 'st-53', title: 'Performance Optimization', durationMinutes: 35, status: 'Locked' },
          { id: 'st-54', title: 'Capstone Project Implementation', durationMinutes: 90, status: 'Locked' }
        ]
      }
    ],
    assignments: [
      {
        id: 'assign-dotnet-1',
        sessionId: 'session-dotnet',
        topicId: 'dotnet-t4',
        title: 'Async Programming Debugging Task',
        description: 'Diagnose and fix the race condition in the sample C# async method implementation.',
        dueDate: '2026-08-18',
        totalPoints: 40,
        instructions: 'Clone the repository, update the code, and submit the corrected C# file with comments explaining the fix.',
        submissionFormat: 'GitHub URL / File Upload',
        attachmentName: 'AsyncRaceConditionStudyGuide.pdf',
        attachmentUrl: 'https://example.com/AsyncRaceConditionStudyGuide.pdf',
        status: 'Pending'
      }
    ]
  },
  {
    id: 'session-insurance',
    name: 'Insurance Domain Fundamentals',
    category: 'Insurance',
    trainerName: 'Harish',
    description: 'Essential business domain knowledge covering Life, Property & Casualty (P&C), Underwriting, Actuarial Calculations, Claims Processing, and Reinsurance.',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
    durationHours: 18,
    difficulty: 'Beginner',
    progressPercent: 65,
    lastAccessed: 'Yesterday, 04:30 PM',
    isPublished: true,
    rating: 4.8,
    ratingCount: 98,
    learningObjectives: [
      'Understand Core Insurance Principles: Indemnity, Utmost Good Faith, Insurable Interest',
      'Map the End-to-End Policy Lifecycle from Quote to Underwriting & Issuance',
      'Analyze Claims Management, Loss Assessment, Fraud Detection, and Payout Workflows',
      'Grasp Regulatory Frameworks (IRDAI, Solvency II, NAIC compliance requirements)'
    ],
    topics: [
      {
        id: 'ins-t1',
        title: 'Insurance Fundamentals',
        order: 1,
        status: 'Completed',
        description: 'Introduction to insurance, risk management, and core insurance concepts.',
        subtopics: [
          { id: 'ist-1', title: 'What is Insurance?', durationMinutes: 25, status: 'Completed' },
          { id: 'ist-2', title: 'Risk & Risk Transfer', durationMinutes: 30, status: 'Completed' },
          { id: 'ist-3', title: 'Risk Pooling', durationMinutes: 25, status: 'Completed' },
          { id: 'ist-4', title: 'Insurer vs Insured', durationMinutes: 20, status: 'Completed' },
          { id: 'ist-5', title: 'Premium, Policy & Claim', durationMinutes: 30, status: 'Completed' },
          { id: 'ist-6', title: 'Insurance Market Ecosystem', durationMinutes: 35, status: 'Completed' }
        ]
      },

      {
        id: 'ins-t2',
        title: 'Insurance Principles',
        order: 2,
        status: 'Completed',
        description: 'Fundamental principles governing insurance contracts.',
        subtopics: [
          { id: 'ist-7', title: 'Utmost Good Faith', durationMinutes: 30, status: 'Completed' },
          { id: 'ist-8', title: 'Insurable Interest', durationMinutes: 30, status: 'Completed' },
          { id: 'ist-9', title: 'Principle of Indemnity', durationMinutes: 35, status: 'Completed' },
          { id: 'ist-10', title: 'Contribution', durationMinutes: 25, status: 'Completed' },
          { id: 'ist-11', title: 'Subrogation', durationMinutes: 30, status: 'Completed' },
          { id: 'ist-12', title: 'Proximate Cause & Loss Minimization', durationMinutes: 35, status: 'Completed' }
        ]
      },

      {
        id: 'ins-t3',
        title: 'Insurance Products',
        order: 3,
        status: 'Completed',
        description: 'Insurance product categories and product configuration.',
        subtopics: [
          { id: 'ist-13', title: 'Life Insurance', durationMinutes: 30, status: 'Completed' },
          { id: 'ist-14', title: 'Health Insurance', durationMinutes: 30, status: 'Completed' },
          { id: 'ist-15', title: 'Property Insurance', durationMinutes: 35, status: 'Completed' },
          { id: 'ist-16', title: 'Casualty Insurance', durationMinutes: 35, status: 'Completed' },
          { id: 'ist-17', title: 'Coverage, Rules & Forms', durationMinutes: 40, status: 'Completed' },
          { id: 'ist-18', title: 'Product System', durationMinutes: 35, status: 'Completed' }
        ]
      },

      {
        id: 'ins-t4',
        title: 'Sales, Underwriting & Rating',
        order: 4,
        status: 'In Progress',
        description: 'Customer onboarding, underwriting, premium calculation and quote generation.',
        subtopics: [
          { id: 'ist-19', title: 'Sales Lifecycle', durationMinutes: 30, status: 'Completed' },
          { id: 'ist-20', title: 'Lead, Prospect & Customer', durationMinutes: 30, status: 'Completed' },
          { id: 'ist-21', title: 'Risk Assessment', durationMinutes: 40, status: 'In Progress' },
          { id: 'ist-22', title: 'Underwriting Process', durationMinutes: 40, status: 'In Progress' },
          { id: 'ist-23', title: 'Rating Engine & Rate Tables', durationMinutes: 40, status: 'Unlocked' },
          { id: 'ist-24', title: 'Quote Management System (QMS)', durationMinutes: 35, status: 'Unlocked' }
        ]
      },

      {
        id: 'ins-t5',
        title: 'Policy Administration',
        order: 5,
        status: 'Locked',
        description: 'Policy lifecycle and administration activities.',
        subtopics: [
          { id: 'ist-25', title: 'Policy Administration System (PAS)', durationMinutes: 40, status: 'Locked' },
          { id: 'ist-26', title: 'Policy Issuance', durationMinutes: 35, status: 'Locked' },
          { id: 'ist-27', title: 'Endorsements', durationMinutes: 30, status: 'Locked' },
          { id: 'ist-28', title: 'Renewals', durationMinutes: 30, status: 'Locked' },
          { id: 'ist-29', title: 'Cancellation & Reinstatement', durationMinutes: 35, status: 'Locked' },
          { id: 'ist-30', title: 'Policy Servicing', durationMinutes: 30, status: 'Locked' }
        ]
      },

      {
        id: 'ins-t6',
        title: 'Claims Management',
        order: 6,
        status: 'Locked',
        description: 'End-to-end claims processing lifecycle.',
        subtopics: [
          { id: 'ist-31', title: 'First Notice of Loss (FNOL)', durationMinutes: 35, status: 'Locked' },
          { id: 'ist-32', title: 'Claim Registration', durationMinutes: 30, status: 'Locked' },
          { id: 'ist-33', title: 'Coverage Verification', durationMinutes: 35, status: 'Locked' },
          { id: 'ist-34', title: 'Claim Investigation', durationMinutes: 40, status: 'Locked' },
          { id: 'ist-35', title: 'Claim Settlement', durationMinutes: 40, status: 'Locked' },
          { id: 'ist-36', title: 'Claim Closure', durationMinutes: 25, status: 'Locked' }
        ]
      },

      {
        id: 'ins-t7',
        title: 'Financial & Documentation Flow',
        order: 7,
        status: 'Locked',
        description: 'Billing, remittance, documentation and financial activities.',
        subtopics: [
          { id: 'ist-37', title: 'Billing System', durationMinutes: 30, status: 'Locked' },
          { id: 'ist-38', title: 'Premium Collection', durationMinutes: 30, status: 'Locked' },
          { id: 'ist-39', title: 'Remittance', durationMinutes: 30, status: 'Locked' },
          { id: 'ist-40', title: 'Document Management System (DMS)', durationMinutes: 40, status: 'Locked' },
          { id: 'ist-41', title: 'Policy & Claim Documents', durationMinutes: 35, status: 'Locked' },
          { id: 'ist-42', title: 'Financial Records & Reserves', durationMinutes: 35, status: 'Locked' }
        ]
      },

      {
        id: 'ins-t8',
        title: 'Claims Valuation & Policy Transactions',
        order: 8,
        status: 'Locked',
        description: 'Loss valuation methods and policy transaction types.',
        subtopics: [
          { id: 'ist-43', title: 'Deductibles', durationMinutes: 25, status: 'Locked' },
          { id: 'ist-44', title: 'Actual Cash Value (ACV)', durationMinutes: 30, status: 'Locked' },
          { id: 'ist-45', title: 'Replacement Cost Value (RCV)', durationMinutes: 30, status: 'Locked' },
          { id: 'ist-46', title: 'New Business', durationMinutes: 30, status: 'Locked' },
          { id: 'ist-47', title: 'Renewals & Endorsements', durationMinutes: 35, status: 'Locked' },
          { id: 'ist-48', title: 'Policy Lifecycle Transactions', durationMinutes: 35, status: 'Locked' }
        ]
      },

      {
        id: 'ins-t9',
        title: 'Insurance Technology & SDLC',
        order: 9,
        status: 'Locked',
        description: 'Connecting insurance business with software development.',
        subtopics: [
          { id: 'ist-49', title: 'Insurance System Architecture', durationMinutes: 35, status: 'Locked' },
          { id: 'ist-50', title: 'Business Requirements (BRD)', durationMinutes: 30, status: 'Locked' },
          { id: 'ist-51', title: 'FRD, SRS & PRD', durationMinutes: 35, status: 'Locked' },
          { id: 'ist-52', title: 'Epics, Features & User Stories', durationMinutes: 35, status: 'Locked' },
          { id: 'ist-53', title: 'Business to Technology Flow', durationMinutes: 40, status: 'Locked' },
          { id: 'ist-54', title: 'End-to-End Insurance Ecosystem Review', durationMinutes: 45, status: 'Locked' }
        ]
      }
    ],
    assignments: [
      {
        id: 'assign-insurance-1',
        sessionId: 'session-insurance',
        topicId: 'ins-t4',
        title: 'Policy Lifecycle Case Study',
        description: 'Analyze a policy scenario and document the underwriting, issuance, and claims workflow.',
        dueDate: '2026-08-20',
        totalPoints: 50,
        instructions: 'Read the case scenario, identify key policy lifecycle steps, and submit a one-page summary.',
        submissionFormat: 'Document Upload',
        attachmentName: 'PolicyLifecycleCaseStudy.pdf',
        attachmentUrl: 'https://example.com/PolicyLifecycleCaseStudy.pdf',
        status: 'Pending'
      }
    ]
  },
  {
    id: 'session-sql',
    name: 'SQL & Relational Database Engineering',
    category: 'SQL',
    trainerName: 'Janani',
    description: 'Master PostgreSQL fundamentals: Schemas, Keys, Constraints, CRUD Operations, Joins, Views, Indexes, Triggers and Stored Procedures',
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=80',
    durationHours: 24,
    difficulty: 'Intermediate',
    progressPercent: 55,
    lastAccessed: '2 days ago',
    isPublished: true,
    rating: 4.85,
    ratingCount: 110,
    learningObjectives: [
      'Design 3NF Normalized relational schemas with foreign key integrity',
      'Write advanced SQL queries with Window Functions (ROW_NUMBER, DENSE_RANK, LAG, LEAD)',
      'Analyze Query Execution Plans (EXPLAIN ANALYZE) and implement B-Tree / Hash Indexes',
      'Manage ACID Transactions, Isolation Levels, and Concurrent Locking'
    ],
  topics: [
  {
    id: 'sql-t1',
    title: 'Introduction to PostgreSQL & Database Fundamentals',
    order: 1,
    status: 'Completed',
    description: 'Introduction to PostgreSQL, database creation, schema design, data types, and constraints.',
    subtopics: [
      { id: 'sqlst-1', title: 'Introduction to PostgreSQL', durationMinutes: 20, status: 'Completed' },
      { id: 'sqlst-2', title: 'Create Database & Schema', durationMinutes: 30, status: 'Completed' },
      { id: 'sqlst-3', title: 'Create Tables', durationMinutes: 35, status: 'Completed' },
      { id: 'sqlst-4', title: 'PostgreSQL Data Types', durationMinutes: 30, status: 'Completed' },
      { id: 'sqlst-5', title: 'Database Constraints', durationMinutes: 35, status: 'Completed' },
      { id: 'sqlst-6', title: 'Primary & Foreign Keys', durationMinutes: 35, status: 'Completed' }
    ]
  },

  {
    id: 'sql-t2',
    title: 'Data Manipulation & Basic Queries',
    order: 2,
    status: 'Completed',
    description: 'Working with data using INSERT, SELECT, UPDATE, DELETE and filtering techniques.',
    subtopics: [
      { id: 'sqlst-7', title: 'INSERT Statement', durationMinutes: 30, status: 'Completed' },
      { id: 'sqlst-8', title: 'SELECT Statement', durationMinutes: 35, status: 'Completed' },
      { id: 'sqlst-9', title: 'WHERE Clause', durationMinutes: 30, status: 'Completed' },
      { id: 'sqlst-10', title: 'UPDATE Statement', durationMinutes: 25, status: 'Completed' },
      { id: 'sqlst-11', title: 'DELETE Statement', durationMinutes: 25, status: 'Completed' },
      { id: 'sqlst-12', title: 'ORDER BY Clause', durationMinutes: 25, status: 'Completed' }
    ]
  },

  {
    id: 'sql-t3',
    title: 'Table Design & Constraints',
    order: 3,
    status: 'Completed',
    description: 'Managing tables, constraints, normalization, and schema modifications.',
    subtopics: [
      { id: 'sqlst-13', title: 'NOT NULL Constraint', durationMinutes: 20, status: 'Completed' },
      { id: 'sqlst-14', title: 'UNIQUE Constraint', durationMinutes: 20, status: 'Completed' },
      { id: 'sqlst-15', title: 'CHECK Constraint', durationMinutes: 25, status: 'Completed' },
      { id: 'sqlst-16', title: 'DEFAULT Constraint', durationMinutes: 20, status: 'Completed' },
      { id: 'sqlst-17', title: 'ALTER TABLE', durationMinutes: 35, status: 'Completed' },
      { id: 'sqlst-18', title: 'Normalization Basics (1NF-3NF)', durationMinutes: 40, status: 'Completed' }
    ]
  },

  {
    id: 'sql-t4',
    title: 'Functions & Aggregations',
    order: 4,
    status: 'In Progress',
    description: 'Aggregate functions, grouping, filtering grouped data, and built-in functions.',
    subtopics: [
      { id: 'sqlst-19', title: 'COUNT(), SUM()', durationMinutes: 30, status: 'Completed' },
      { id: 'sqlst-20', title: 'AVG(), MIN(), MAX()', durationMinutes: 30, status: 'Completed' },
      { id: 'sqlst-21', title: 'GROUP BY', durationMinutes: 35, status: 'In Progress' },
      { id: 'sqlst-22', title: 'HAVING Clause', durationMinutes: 30, status: 'Unlocked' },
      { id: 'sqlst-23', title: 'String & Date Functions', durationMinutes: 35, status: 'Unlocked' },
      { id: 'sqlst-24', title: 'Mathematical Functions', durationMinutes: 25, status: 'Unlocked' }
    ]
  },

  {
    id: 'sql-t5',
    title: 'Joins & Advanced Queries',
    order: 5,
    status: 'Locked',
    description: 'Retrieving related data using joins, subqueries, and views.',
    subtopics: [
      { id: 'sqlst-25', title: 'INNER JOIN', durationMinutes: 35, status: 'Locked' },
      { id: 'sqlst-26', title: 'LEFT JOIN', durationMinutes: 30, status: 'Locked' },
      { id: 'sqlst-27', title: 'RIGHT JOIN', durationMinutes: 30, status: 'Locked' },
      { id: 'sqlst-28', title: 'FULL OUTER JOIN', durationMinutes: 35, status: 'Locked' },
      { id: 'sqlst-29', title: 'Subqueries', durationMinutes: 35, status: 'Locked' },
      { id: 'sqlst-30', title: 'Views', durationMinutes: 30, status: 'Locked' }
    ]
  },

  {
    id: 'sql-t6',
    title: 'Indexes & Database Objects',
    order: 6,
    status: 'Locked',
    description: 'Improving query performance and creating reusable database objects.',
    subtopics: [
      { id: 'sqlst-31', title: 'Indexes', durationMinutes: 35, status: 'Locked' },
      { id: 'sqlst-32', title: 'Unique Indexes', durationMinutes: 25, status: 'Locked' },
      { id: 'sqlst-33', title: 'Views vs Materialized Views', durationMinutes: 30, status: 'Locked' },
      { id: 'sqlst-34', title: 'Sequences', durationMinutes: 25, status: 'Locked' },
      { id: 'sqlst-35', title: 'Schemas', durationMinutes: 25, status: 'Locked' },
      { id: 'sqlst-36', title: 'Performance Optimization', durationMinutes: 40, status: 'Locked' }
    ]
  },

  {
    id: 'sql-t7',
    title: 'PL/pgSQL Programming',
    order: 7,
    status: 'Locked',
    description: 'Writing procedural code using PL/pgSQL with functions, procedures, variables, and cursors.',
    subtopics: [
      { id: 'sqlst-37', title: 'SQL DO Blocks', durationMinutes: 30, status: 'Locked' },
      { id: 'sqlst-38', title: 'Variables & Control Statements', durationMinutes: 35, status: 'Locked' },
      { id: 'sqlst-39', title: 'Stored Procedures', durationMinutes: 40, status: 'Locked' },
      { id: 'sqlst-40', title: 'User Defined Functions (UDF)', durationMinutes: 40, status: 'Locked' },
      { id: 'sqlst-41', title: 'Built-in Functions', durationMinutes: 30, status: 'Locked' },
      { id: 'sqlst-42', title: 'Cursors', durationMinutes: 35, status: 'Locked' }
    ]
  },

  {
    id: 'sql-t8',
    title: 'Triggers & Dynamic SQL',
    order: 8,
    status: 'Locked',
    description: 'Automating database operations using triggers and executing dynamic SQL.',
    subtopics: [
      { id: 'sqlst-43', title: 'Introduction to Triggers', durationMinutes: 30, status: 'Locked' },
      { id: 'sqlst-44', title: 'DML Triggers', durationMinutes: 35, status: 'Locked' },
      { id: 'sqlst-45', title: 'DDL Triggers', durationMinutes: 30, status: 'Locked' },
      { id: 'sqlst-46', title: 'Dynamic SQL', durationMinutes: 35, status: 'Locked' },
      { id: 'sqlst-47', title: 'Exception & Error Handling', durationMinutes: 35, status: 'Locked' },
      { id: 'sqlst-48', title: 'Debugging PL/pgSQL Code', durationMinutes: 30, status: 'Locked' }
    ]
  },

  {
    id: 'sql-t9',
    title: 'Transactions & Database Management',
    order: 9,
    status: 'Locked',
    description: 'Managing transactions, concurrency, and database reliability.',
    subtopics: [
      { id: 'sqlst-49', title: 'BEGIN Transaction', durationMinutes: 25, status: 'Locked' },
      { id: 'sqlst-50', title: 'COMMIT Transaction', durationMinutes: 25, status: 'Locked' },
      { id: 'sqlst-51', title: 'ROLLBACK Transaction', durationMinutes: 30, status: 'Locked' },
      { id: 'sqlst-52', title: 'Transaction Isolation Levels', durationMinutes: 35, status: 'Locked' },
      { id: 'sqlst-53', title: 'Concurrency Control', durationMinutes: 35, status: 'Locked' },
      { id: 'sqlst-54', title: 'End-to-End PostgreSQL Project', durationMinutes: 60, status: 'Locked' }
    ]
  },
  ],
  assignments: [
      {
        id: 'assign-sql-1',

        sessionId: 'session-sql',
        topicId: 'sql-t4',
        title: 'PostgreSQL Query Optimization Exercise',
        description: 'Tune a SQL query and explain the performance improvements.',
        dueDate: '2026-08-25',
        totalPoints: 50,
        instructions: 'Optimize the query, document your changes, and submit the revised SQL with notes.',
        submissionFormat: 'SQL / Document Upload',
        attachmentName: 'QueryPerformanceChecklist.pdf',
        attachmentUrl: 'https://example.com/QueryPerformanceChecklist.pdf',
        status: 'Pending'
      }
    ]
  },
  {
    id: 'session-c2c',
    name: 'Campus to Corporate',
    category: 'C2C',
    trainerName: 'Mayford Gomes',
    description: 'Accountability, Teamwork, Business Etiette, Effective Communication, Time Management (Pomodoro & Eisenhower Matrix), and Vocal Variety (Power, Pitch, Pace & Pause) for Workplace Success.',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
    durationHours: 20,
    difficulty: 'Beginner',
    progressPercent: 40,
    lastAccessed: 'Just now',
    isPublished: true,
    rating: 4.9,
    ratingCount: 115,
    learningObjectives: [
      'Master Professional Communication & Active Listening in Agile Squads',
      'Understand Corporate Hierarchy, Ethics, and Governance Standards',
      'Deliver High-Impact Technical Presentations & Client-Facing Demos',
      'Navigate Team Dynamics, Time Management, and Escalation Workflows'
    ],
    topics: [
      {
        id: 'c2c-t1',
        title: 'Communication Fundamentals',
        order: 1,
        status: 'Completed',
        description: 'Communication, listening, questioning and effective use of words.',
        subtopics: [
          { id: 'c2cst-1', title: 'Listening Skills', durationMinutes: 30, status: 'Completed' },
          { id: 'c2cst-2', title: 'Types of Questioning', durationMinutes: 30, status: 'Completed' },
          { id: 'c2cst-3', title: 'The Power of Words', durationMinutes: 30, status: 'Completed' },
          { id: 'c2cst-4', title: 'Communication Skills', durationMinutes: 30, status: 'Completed' },

        ]
      },
      {
        id: 'c2c-t2',
        title: 'Professionalism & Workplace Ethics',
        order: 2,
        status: 'In Progress',
        description: 'Accountability, teamwork, etiquette, professionalism, and workplace relationships.',
        subtopics: [
          { id: 'c2cst-1', title: 'Accountability and Ownership', durationMinutes: 40, status: 'In Progress' },
          { id: 'c2cst-2', title: 'Teamwork and Collaboration', durationMinutes: 40, status: 'Unlocked' },
          { id: 'c2cst-3', title: 'Business Etiquette', durationMinutes: 40, status: 'Unlocked' },
          { id: 'c2cst-4', title: 'Punctuality and Professionalism', durationMinutes: 40, status: 'Unlocked' },
          { id: 'c2cst-5', title: 'Workplace Collaboration and Relationship Building', durationMinutes: 40, status: 'Unlocked' }
        ]
      },
      {
        id: 'c2c-t3',
        title: 'Self-Development & Productivity',
        order: 3,
        status: 'Locked',
        description: 'Goal setting, self-awareness, reflection, time management, and productivity.',
         subtopics: [
          { id: 'c2cst-1', title: 'Goal Setting and Self-Improvement', durationMinutes: 40, status: 'In Progress' },
          { id: 'c2cst-2', title: 'Journaling and Self-Awareness', durationMinutes: 40, status: 'Unlocked' },
          { id: 'c2cst-3', title: 'Daily Self-Assessment Through Video Recording', durationMinutes: 40, status: 'Unlocked' },
          { id: 'c2cst-4', title: 'Time Management', durationMinutes: 40, status: 'Unlocked' },
          { id: 'c2cst-5', title: 'Productivity and Prioritization', durationMinutes: 40, status: 'Unlocked' }
         ]
      },
      {
        id: 'c2c-t4',
        title: 'Productivity Techniques',
        order: 4,
        status: 'Locked',
        description: 'Productivity techniques, vocal variety, growth mindset, and continuous learning.',
         subtopics: [
          { id: 'c2cst-1', title: 'Pomodoro Technique', durationMinutes: 40, status: 'In Progress' },
          { id: 'c2cst-2', title: 'Eisenhower Matrix', durationMinutes: 40, status: 'Unlocked' },
          { id: 'c2cst-3', title: '4 Ps of Vocal Variety', durationMinutes: 40, status: 'Unlocked' },
          { id: 'c2cst-4', title: 'Personal and Professional Growth Mindset', durationMinutes: 40, status: 'Unlocked' },
          { id: 'c2cst-5', title: 'Continuous Learning and Development', durationMinutes: 40, status: 'Unlocked' }
         ]
      }
    ],
    assignments: [
      {
        id: 'assign-c2c-1',
        sessionId: 'session-c2c',
        topicId: 'c2c-t4',
        title: 'Workplace Communication Reflection',
        description: 'Create a plan that applies communication and time management techniques to a corporate scenario.',
        dueDate: '2026-08-21',
        totalPoints: 40,
        instructions: 'Submit a one-page plan describing how you would use the Pomodoro Technique and Eisenhower Matrix at work.',
        submissionFormat: 'Document Upload',
        attachmentName: 'CommunicationReflectionTemplate.docx',
        attachmentUrl: 'https://example.com/CommunicationReflectionTemplate.docx',
        status: 'Pending'
      }
    ]
  },
  {
    id: 'session-data-modeling-fundamentals',
    name: 'Data Modelling Fundamentals',
    category: 'Data',
    trainerName: 'Gabriel N Maria Linton',
    description: 'Introduction to Data Modeling, Entity Relationships, Cardinality, Keys, Normalization, SDLC, and Project Roles in Enterprise Software Development.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    durationHours: 12,
    difficulty: 'Beginner',
    progressPercent: 0,
    lastAccessed: 'Never',
    isPublished: true,
    rating: 4.8,
    ratingCount: 92,
    learningObjectives: [
      'Understand the fundamentals of data modeling and database design',
      'Learn entity relationships, cardinality, and identifiers',
      'Apply normalization techniques to improve data quality',
      'Understand SDLC phases and project stakeholder responsibilities'
    ],
    topics: [
      {
        id: 'dm-t1',
        title: 'Data Modelling Fundamentals',
        order: 1,
        status: 'Completed',
        description: 'Introduction to Data Modelling, Entities & Attributes, Relationships, Cardinality, Keys & Identifiers',
        subtopics: [
          { id: 'dmst-1', title: 'Introduction to Data Modelling', durationMinutes: 45, status: 'Completed' },
          { id: 'dmst-2', title: 'Entities and Attributes', durationMinutes: 45, status: 'Completed' },
          { id: 'dmst-3', title: 'Relationships in Data Models', durationMinutes: 60, status: 'Completed' },
          { id: 'dmst-4', title: 'Cardinality and Keys', durationMinutes: 45, status: 'Completed' }
        ]
      },
      {
        id: 'dm-t2',
        title: 'Database Design & System Architecture',
        order: 2,
        status: 'Completed',
        description: 'Transform business requirements into structured, reliable, scalable, and maintainable system designs.',
        subtopics: [
          { id: 'dmst-1', title: 'Business Requirements to System Design', durationMinutes: 60, status: 'Completed' },
          { id: 'dmst-2', title: 'Maintaining Data Integrity and Consistency', durationMinutes: 45, status: 'Completed' },
          { id: 'dmst-3', title: 'Organizing Data Through Normalization', durationMinutes: 60, status: 'Completed' },
          { id: 'dmst-4', title: 'Applying Effective Database Design Practices', durationMinutes: 45, status: 'Completed' },
          { id: 'dmst-5', title: 'Designing Scalable and Maintainable Systems', durationMinutes: 45, status: 'Completed' }
        ]
      },
      {
        id: 'dm-t3',
        title: 'Software Development & Business Alignment',
        order: 3,
        status: 'Completed',
        description: 'Understand how data modelling connects business, development, and analytics.',
        subtopics: [
          { id: 'dmst-1', title: ' Understanding the Software Development Life Cycle', durationMinutes: 60, status: 'Completed' },
          { id: 'dmst-2', title: 'Understanding Software Project Roles', durationMinutes: 45, status: 'Completed' },
          { id: 'dmst-3', title: 'Collaborating Across Software Delivery Teams', durationMinutes: 60, status: 'Completed' },
          { id: 'dmst-4', title: 'Connecting Business Needs with Technical Solutions', durationMinutes: 45, status: 'Completed' },
          { id: 'dmst-5', title: 'Using Data Models as a Foundation for Software and Analytics', durationMinutes: 45, status: 'Completed' }
        ]
      }
    ],
    assignments: [
      {
        id: 'assign-data-modeling-1',
        sessionId: 'session-data-modeling-fundamentals',
        topicId: 'dm-t3',
        title: 'Entity Relationship Diagram Case Study',
        description: 'Build an ER diagram and explain how it supports business requirements.',
        dueDate: '2026-08-23',
        totalPoints: 45,
        instructions: 'Submit the ER diagram and a short description of entity relationships and cardinality choices.',
        submissionFormat: 'Image / Document Upload',
        attachmentName: 'ERDiagramTemplate.pdf',
        attachmentUrl: 'https://example.com/ERDiagramTemplate.pdf',
        status: 'Pending'
      }
    ]
  },
  {
    id: 'session-data-fundamentals',
    name: 'Data Fundamentals',
    category: 'Data',
    trainerName: 'Parthiban Arumugam',
    description: 'Core Data Concepts, Data Quality, Medallion Architecture, Azure Services, Power BI, Excel Analytics, and Business Reporting.',
    thumbnail: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&auto=format&fit=crop&q=80',
    durationHours: 18,
    difficulty: 'Beginner',
    progressPercent: 0,
    lastAccessed: 'Never',
    isPublished: true,
    rating: 4.8,
    ratingCount: 108,
    learningObjectives: [
      'Understand how organizations collect and process data',
      'Learn data quality, redundancy, and governance basics',
      'Explore Medallion Architecture and modern analytics platforms',
      'Build executive dashboards and business reports'
    ],
    topics: [
      {
        id: 'df-t1',
        title: 'Data Fundamentals & Management',
        order: 1,
        status: 'Completed',
        description: 'Understanding Data, Role of Data, Data Aggregation, Data Quality, Data Redundancy, Data Lifecycle',
        subtopics: [
          { id: 'dfst-1', title: 'Understanding Data and Information', durationMinutes: 60, status: 'Completed' },
          { id: 'dfst-2', title: 'Role of Data in Modern Organizations', durationMinutes: 45, status: 'Completed' },
          { id: 'dfst-3', title: 'Combining Data for Meaningful Analysis', durationMinutes: 60, status: 'Completed' },
          { id: 'dfst-4', title: 'Data Quality and Reliability', durationMinutes: 45, status: 'Completed' },
          { id: 'dfst-5', title: 'Managing Data Redundancy', durationMinutes: 60, status: 'Completed' },
          { id: 'dfst-6', title: 'Data Lifecycle', durationMinutes: 45, status: 'Completed' }

        ]
      },
      {
        id: 'df-t2',
        title: 'Data Architecture, Cloud & Analytics Tools',
        order: 2,
        status: 'Completed',
        description: 'Modern data architecture, cloud platforms, and analytics tools for effective data management, visualization, and decision-making.',
        subtopics: [
          { id: 'dfst-1', title: 'The Medallion Architecture', durationMinutes: 60, status: 'Completed' },
          { id: 'dfst-2', title: 'Microsoft Azure Fundamentals', durationMinutes: 75, status: 'Completed' },
          { id: 'dfst-3', title: 'Understanding Cloud-Based Data Platforms', durationMinutes: 90, status: 'Completed' },
          { id: 'dfst-4', title: 'Data Visualizations and Reports Using Power BI', durationMinutes: 75, status: 'Completed' },
          { id: 'dfst-5', title: 'Analyzing Data with Microsoft Excel', durationMinutes: 90, status: 'Completed' }
        ]
      },
      {
        id: 'df-t3',
        title: 'Database Design & Data Management',
        order: 3,
        status: 'Completed',
        description: 'Database design, data modeling, normalization, scalability, and best practices for effective data management.',
        subtopics: [
          { id: 'dfst-1', title: 'Database Design Principles', durationMinutes: 60, status: 'Completed' },
          { id: 'dfst-2', title: 'Structuring Databases for Scalability', durationMinutes: 75, status: 'Completed' },
          { id: 'dfst-3', title: 'Organizing Data Through Normalization', durationMinutes: 90, status: 'Completed' },
          { id: 'dfst-4', title: 'Modeling Relationships Between Data Entities', durationMinutes: 75, status: 'Completed' },
          { id: 'dfst-5', title: 'Data Management Best Practices', durationMinutes: 90, status: 'Completed' }
        ]
      },
      {
        id: 'df-t4',
        title: 'Analytics, Business Insights & Modern Data Ecosystem',
        order: 4,
        status: 'Completed',
        description: 'Transforming data into business insights, drive data-driven decisions,the modern data ecosystem.',
        subtopics: [
          { id: 'dfst-1', title: 'Turning Data into Business Insights', durationMinutes: 60, status: 'Completed' },
          { id: 'dfst-2', title: 'Understanding the Modern Data Ecosystem', durationMinutes: 75, status: 'Completed' },
          { id: 'dfst-3', title: 'Data-Driven Business Decisions', durationMinutes: 90, status: 'Completed' },
          { id: 'dfst-4', title: 'Understanding the Strategic Value of Data', durationMinutes: 75, status: 'Completed' },
          { id: 'dfst-5', title: 'Connecting Data, Technology, and Analytics End-to-End', durationMinutes: 90, status: 'Completed' }
        ]
      }
    ],
    assignments: [
      {
        id: 'assign-data-fundamentals-1',
        sessionId: 'session-data-fundamentals',
        topicId: 'df-t4',
        title: 'Business Analytics Dashboard Design',
        description: 'Outline the analytics pipeline and dashboard requirements for a business case.',
        dueDate: '2026-08-24',
        totalPoints: 45,
        instructions: 'Provide a document describing data sources, transformations, and key dashboard metrics.',
        submissionFormat: 'Document Upload',
        attachmentName: 'AnalyticsDashboardBrief.docx',
        attachmentUrl: 'https://example.com/AnalyticsDashboardBrief.docx',
        status: 'Pending'
      }
    ]
  },

  {
    id: 'session-html-css-js',
    name: 'HTML, CSS & JavaScript',
    category: 'Frontend',
    trainerName: 'Sre Leka Rajan',
    description: 'Web Development Fundamentals covering HTML Structure, CSS Styling, Responsive Design, JavaScript Programming, DOM Manipulation, and Asynchronous Programming.',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80',
    durationHours: 25,
    difficulty: 'Intermediate',
    progressPercent: 0,
    lastAccessed: 'Never',
    isPublished: true,
    rating: 4.9,
    ratingCount: 125,
    learningObjectives: [
      'Build responsive and accessible web pages',
      'Apply modern CSS layouts and responsive design patterns',
      'Develop interactive applications using JavaScript',
      'Understand advanced JavaScript concepts and asynchronous programming'
    ],
    topics: [
      {
        id: 'web-t1',
        title: 'HTML & WebPage Structure',
        order: 1,
        status: 'Completed',
        description: 'structure web pages using HTML, work with elements and forms, and create semantic and accessible web content.',
        subtopics: [
          { id: 'webst-1', title: 'Understanding HTML Document Structure', durationMinutes: 60, status: 'Completed' },
          { id: 'webst-2', title: 'Working with HTML Elements and Tags', durationMinutes: 75, status: 'Completed' },
          { id: 'webst-3', title: 'HTML Forms', durationMinutes: 90, status: 'Completed' },
          { id: 'webst-4', title: 'Semantic HTML', durationMinutes: 90, status: 'Completed' },
          { id: 'webst-5', title: 'Creating Well-Structured Web Pages', durationMinutes: 75, status: 'Completed' }
        ]
      },
      {
        id: 'web-t2',
        title: 'CSS Styling & Responsive Design',
        order: 2,
        status: 'Completed',
        description: 'styling web pages, select and position elements,flexible layouts, and build responsive interfaces using modern CSS techniques.',
        subtopics: [
          { id: 'webst-1', title: 'Understanding CSS Fundamentals', durationMinutes: 90, status: 'Completed' },
          { id: 'webst-2', title: 'Types of CSS', durationMinutes: 90, status: 'Completed' },
          { id: 'webst-3', title: 'Working with CSS Selectors', durationMinutes: 90, status: 'Completed' },
          { id: 'webst-4', title: 'Understanding the CSS Box Model', durationMinutes: 90, status: 'Completed' },
          { id: 'webst-5', title: 'Building Layouts with Flexbox and Grid', durationMinutes: 90, status: 'Completed' },
          { id: 'webst-6', title: 'Creating Responsive Web Layouts', durationMinutes: 90, status: 'Completed' },
        ]
      },
      {
        id: 'web-t3',
        title: 'JavaScript Fundamentals',
        order: 3,
        status: 'Completed',
        description: 'JavaScript fundamentals, variables, data types, program control, functions, and advanced concepts that govern JavaScript execution.',
        subtopics: [
          { id: 'webst-1', title: 'Understanding JavaScript Fundamentals', durationMinutes: 90, status: 'Completed' },
          { id: 'webst-2', title: 'Working with Variables and Data Types', durationMinutes: 90, status: 'Completed' },
          { id: 'webst-3', title: 'Operators and Conditional Statements', durationMinutes: 90, status: 'Completed' },
          { id: 'webst-4', title: 'Loops and Functions', durationMinutes: 90, status: 'Completed' },
          { id: 'webst-5', title: 'Advanced JavaScript Concepts', durationMinutes: 90, status: 'Completed' },
          { id: 'webst-6', title: 'Understanding Asynchronous JavaScript Concepts', durationMinutes: 90, status: 'Completed' },
        ]
      },
      {
        id: 'web-t4',
        title: 'Dynamic Web Interfaces',
        order: 4,
        status: 'Completed',
        description: 'Dynamic web interfaces using events, DOM manipulation, form validation, front-end integration, debugging, and problem-solving techniques.',
        subtopics: [
          { id: 'webst-1', title: 'Handling Events and User Interactions', durationMinutes: 90, status: 'Completed' },
          { id: 'webst-2', title: 'Manipulating the DOM', durationMinutes: 90, status: 'Completed' },
          { id: 'webst-3', title: 'Implementing Form Validation', durationMinutes: 90, status: 'Completed' },
          { id: 'webst-4', title: 'Integrating HTML, CSS, and JavaScript', durationMinutes: 90, status: 'Completed' },
          { id: 'webst-5', title: 'Building and Debugging Web Applications', durationMinutes: 90, status: 'Completed' },
          { id: 'webst-6', title: 'Front-End Problem-Solving and UI Practices', durationMinutes: 90, status: 'Completed' },
        ]
      },
    ],
    quizzes: [
      {
        id: 'quiz-html-css-js-1',
        sessionId: 'session-html-css-js',
        topicId: 'web-t3',
        title: 'HTML, CSS & JavaScript Web Fundamentals Quiz',
        description: 'Measure your knowledge of semantic HTML, CSS layout, DOM interaction, and JavaScript behavior.',
        passingScorePercent: 80,
        timeLimitMinutes: 20,
        questions: [
          {
            id: 'q1',
            type: 'MCQ' as const,
            prompt: 'Which HTML element is best for defining the main navigation of a webpage?',
            options: ['<section>', '<nav>', '<header>', '<div>'],
            correctAnswer: '<nav>',
            explanation: 'The <nav> element semantically represents page navigation links.'
          },
          {
            id: 'q2',
            type: 'Fill in Blank' as const,
            prompt: 'A CSS class selector begins with the ______ symbol.',
            options: ['.', '#', '$'],
            correctAnswer: '.',
            explanation: 'CSS class selectors start with a dot (.) followed by the class name.'
          },
          {
            id: 'q3',
            type: 'Multiple Select' as const,
            prompt: 'Which items are part of the JavaScript event loop? (Select all that apply)',
            options: ['Call Stack', 'Microtask Queue', 'Render Tree', 'WebSocket API'],
            correctAnswer: ['Call Stack', 'Microtask Queue'],
            explanation: 'The event loop manages the call stack and microtask queue; render tree and WebSocket API are separate browser subsystems.'
          },
          {
            id: 'q4',
            type: 'True / False' as const,
            prompt: 'A const variable in JavaScript can be reassigned to a new value.',
            options: ['True', 'False'],
            correctAnswer: 'False',
            explanation: 'const variables cannot be reassigned after initialization.'
          },
          {
            id: 'q5',
            type: 'Code Output' as const,
            prompt: 'What does this JavaScript snippet log?\nconst items = [1, 2, 3];\nconst doubled = items.map(n => n * 2);\nconsole.log(doubled[1]);',
            options: ['1', '2', '4', '6'],
            correctAnswer: '4',
            explanation: 'The second item in the doubled array is 4.'
          },
          {
            id: 'q6',
            type: 'MCQ' as const,
            prompt: 'What does DOM stand for?',
            options: ['Document Object Model', 'Dynamic Object Method', 'Design Oriented Markup', 'Data Output Manager'],
            correctAnswer: 'Document Object Model',
            explanation: 'DOM stands for Document Object Model.'
          },
          {
            id: 'q7',
            type: 'MCQ' as const,
            prompt: 'Responsive web design typically uses which CSS techniques?',
            options: ['Media queries and flexbox', 'Fixed pixel widths only', 'Inline JavaScript alerts', 'Database normalization'],
            correctAnswer: 'Media queries and flexbox',
            explanation: 'Responsive design relies on media queries and flexible layouts like flexbox.'
          },
          {
            id: 'q8',
            type: 'True / False' as const,
            prompt: 'The "use strict" directive enables strict mode in JavaScript.',
            options: ['True', 'False'],
            correctAnswer: 'True',
            explanation: '"use strict" enables stricter parsing and error handling in JavaScript.'
          }
        ]
      }
    ],
    assignments: [
      {
        id: 'assign-html-css-js-1',
        sessionId: 'session-html-css-js',
        topicId: 'web-t2',
        title: 'Interactive Web Page Challenge',
        description: 'Create a simple responsive web page layout and describe how JavaScript updates the DOM.',
        dueDate: '2026-08-26',
        totalPoints: 50,
        instructions: 'Submit the HTML/CSS/JS design explanation and include example code snippets.',
        submissionFormat: 'Code Snippet / Document Upload',
        attachmentName: 'WebPageChallengeGuide.pdf',
        attachmentUrl: 'https://example.com/WebPageChallengeGuide.pdf',
        status: 'Pending'
      }
    ]
  },
  {
    id: 'session-modern-data-platforms',
    name: 'Advanced Data Modeling & Modern Data Platforms',
    category: 'Data Engineering',
    trainerName: 'Anitha',
    description: 'Advanced Data Modeling, Cloud Data Platforms, ETL Processes, Data Lakes, Lakehouses, Microsoft Fabric, Databricks, Data Governance, Analytics, and AI.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    durationHours: 24,
    difficulty: 'Advanced',
    progressPercent: 0,
    lastAccessed: 'Never',
    isPublished: true,
    rating: 5.0,
    ratingCount: 98,
    learningObjectives: [
      'Design conceptual, logical, and physical data models',
      'Understand cloud-based modern data architectures',
      'Learn ETL, data warehousing, and lakehouse concepts',
      'Apply governance, analytics, visualization, and AI principles'
    ],
    topics: [
      {
        id: 'mdp-t1',
        title: 'Advanced Data Modeling & Platform Foundations',
        order: 1,
        status: 'Completed',
        description: 'Advanced data models, modern data platforms, cloud environments, and the technologies that support enterprise data ecosystems.',
        subtopics: [
          { id: 'mdpst-1', title: 'Designing Conceptual, Logical, and Physical Data Models', durationMinutes: 60, status: 'Completed' },
          { id: 'mdpst-2', title: 'Legacy and Modern Data Platforms', durationMinutes: 75, status: 'Completed' },
          { id: 'mdpst-3', title: 'Cloud Data Platforms', durationMinutes: 90, status: 'Completed' },
          { id: 'mdpst-4', title: 'Data Sources and Storage', durationMinutes: 75, status: 'Completed' },
          { id: 'mdpst-5', title: 'Designing Modern Data Platform Architectures', durationMinutes: 90, status: 'Completed' }
        ]
      },
      {
        id: 'mdp-t2',
        title: 'Data Engineering & Processing',
        order: 2,
        status: 'Completed',
        description: 'Learn how data is extracted, transformed, processed, and prepared using modern engineering tools and programming techniques.',
        subtopics: [
          { id: 'mdpst-1', title: 'ETL and ELT Workflows', durationMinutes: 90, status: 'Completed' },
          { id: 'mdpst-2', title: 'Data Engineering Scripting', durationMinutes: 90, status: 'Completed' },
          { id: 'mdpst-3', title: 'Transforming Data with Pandas', durationMinutes: 90, status: 'Completed' },
          { id: 'mdpst-4', title: 'Processing Data with PySpark', durationMinutes: 90, status: 'Completed' },
          { id: 'mdpst-5', title: 'Working with Jupyter Notebooks', durationMinutes: 90, status: 'Completed' }
        ]
      },
      {
        id: 'mdp-t3',
        title: 'Modern Data Architecture & Platforms',
        order: 3,
        status: 'Completed',
        description: 'Modern data architectures, storage technologies, and leading platforms used to build scalable data solutions.',
        subtopics: [
          { id: 'mdpst-1', title: 'Implementing Medallion Architecture', durationMinutes: 90, status: 'Completed' },
          { id: 'mdpst-2', title: 'Understanding Data Lakes, Warehouses, and Lakehouses', durationMinutes: 90, status: 'Completed' },
          { id: 'mdpst-3', title: 'Working with Apache Parquet', durationMinutes: 90, status: 'Completed' },
          { id: 'mdpst-4', title: 'Exploring Azure Data Factory', durationMinutes: 90, status: 'Completed' },
          { id: 'mdpst-5', title: 'Working with Microsoft Fabric and Databricks', durationMinutes: 90, status: 'Completed' }
        ]
      },
      {
        id: 'mdp-t4',
        title: 'Data Pipelines & Integration',
        order: 4,
        status: 'Completed',
        description: 'Build and manage end-to-end data pipelines while integrating data sources, transformations, platforms, and analytics systems.',
        subtopics: [
          { id: 'mdpst-1', title: 'Building End-to-End Data Pipelines', durationMinutes: 90, status: 'Completed' },
          { id: 'mdpst-2', title: 'Managing Inbound and Outbound Data', durationMinutes: 90, status: 'Completed' },
          { id: 'mdpst-3', title: 'Performing Lookup and Data Enrichment Operations', durationMinutes: 90, status: 'Completed' },
          { id: 'mdpst-4', title: 'Data Quality and Anomaly Detection', durationMinutes: 90, status: 'Completed' },
          { id: 'mdpst-5', title: 'Integrating Data with Power BI', durationMinutes: 90, status: 'Completed' }
        ]
      },
      {
        id: 'mdp-t5',
        title: 'Data Governance, Management & Analytics',
        order: 5,
        status: 'Completed',
        description: 'Data governance, security, master data management, prioritization, and analytics practices to deliver trusted business data.',
        subtopics: [
          { id: 'mdpst-1', title: 'Master Data Management', durationMinutes: 90, status: 'Completed' },
          { id: 'mdpst-2', title: 'Data Governance and Security', durationMinutes: 90, status: 'Completed' },
          { id: 'mdpst-3', title: 'Data Platform Requirements', durationMinutes: 90, status: 'Completed' },
          { id: 'mdpst-4', title: 'Analytics and Reporting Solutions', durationMinutes: 90, status: 'Completed' },
        ]
      }
    ],
    assignments: [
      {
        id: 'assign-modern-data-platforms-1',
        sessionId: 'session-modern-data-platforms',
        topicId: 'mdp-t2',
        title: 'Data Platform Architecture Proposal',
        description: 'Draft a proposal for a modern data platform architecture meeting scalability and governance needs.',
        dueDate: '2026-08-27',
        totalPoints: 55,
        instructions: 'Submit a brief architecture proposal with platform components and data flow.',
        submissionFormat: 'Document Upload',
        attachmentName: 'DataPlatformProposalTemplate.pdf',
        attachmentUrl: 'https://example.com/DataPlatformProposalTemplate.pdf',
        status: 'Pending'
      }
    ]
  },
  {
    id: 'session-software-testing',
    name: 'Software Testing Fundamentals',
    category: 'Quality Assurance',
    trainerName: 'Swathi',
    description: 'Comprehensive introduction to Software Testing covering Testing Fundamentals, Types of Testing, Test Case Design Techniques, Defect Management, and Quality Assurance Best Practices.',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    durationHours: 16,
    difficulty: 'Beginner',
    progressPercent: 0,
    lastAccessed: 'Never',
    isPublished: true,
    rating: 4.8,
    ratingCount: 96,
    learningObjectives: [
      'Understand the importance of software testing in the SDLC',
      'Differentiate between various testing types and approaches',
      'Design effective test scenarios and test cases',
      'Apply equivalence partitioning and boundary value analysis techniques',
      'Understand defect tracking and the defect life cycle'
    ],
    topics: [
      {
        id: 'st-t1',
        title: 'Software Testing Foundations',
        order: 1,
        status: 'Completed',
        description: 'Understand software development and testing lifecycles, quality concepts, testing principles, and verification and validation practices.',
        subtopics: [
          { id: 'stst-1', title: 'Understanding the Software Development Life Cycle', durationMinutes: 45, status: 'Completed' },
          { id: 'stst-2', title: 'Understanding the Software Testing Life Cycle', durationMinutes: 60, status: 'Completed' },
          { id: 'stst-3', title: 'Applying Verification and Validation Techniques', durationMinutes: 45, status: 'Completed' },
          { id: 'stst-4', title: 'Quality Assurance and Quality Control', durationMinutes: 45, status: 'Completed' },
          { id: 'stst-5', title: 'Fundamental Testing Principles', durationMinutes: 45, status: 'Completed' }
        ]
      },
      {
        id: 'st-t2',
        title: 'Testing Levels',
        order: 2,
        status: 'Completed',
        description: 'Different levels of Testingand types of testing and develop effective test scenarios, test cases, test data, and traceability techniques.',
        subtopics: [
          { id: 'stst-1', title: 'Unit and Integration Testing', durationMinutes: 45, status: 'Completed' },
          { id: 'stst-2', title: 'System and User Acceptance Testing', durationMinutes: 60, status: 'Completed' },
          { id: 'stst-3', title: 'Regression, Smoke, and Sanity Testing', durationMinutes: 45, status: 'Completed' },
          { id: 'stst-4', title: 'Designing Test Scenarios and Test Cases', durationMinutes: 45, status: 'Completed' },
          { id: 'stst-5', title: 'Test Data and Requirement Traceability', durationMinutes: 45, status: 'Completed' }
        ]
      },
      {
        id: 'st-t3',
        title: 'Test Design & Execution',
        order: 3,
        status: 'Completed',
        description: 'Effective test conditions, cases, and data while applying systematic techniques to validate software behavior.',
        subtopics: [
          { id: 'stst-1', title: 'Conducting Smoke and Sanity Testing', durationMinutes: 45, status: 'Completed' },
          { id: 'stst-2', title: 'Designing Test Scenarios and Test Cases', durationMinutes: 60, status: 'Completed' },
          { id: 'stst-3', title: 'Preparing Effective Test Data', durationMinutes: 45, status: 'Completed' },
          { id: 'stst-4', title: 'Maintaining Requirement Traceability', durationMinutes: 45, status: 'Completed' },
          { id: 'stst-5', title: 'Applying Equivalence Partitioning and Boundary Value Analysis ', durationMinutes: 45, status: 'Completed' }
        ]
      },
      {
         id: 'st-t4',
        title: 'Defect Management & Agile Testing',
        order: 4,
        status: 'Completed',
        description: 'Identify, track, and resolve defects while applying exploratory and Agile testing practices throughout software development.',
        subtopics: [
          { id: 'stst-1', title: 'Software Defect Lifecycle', durationMinutes: 45, status: 'Completed' },
          { id: 'stst-2', title: 'Prioritizing Defects by Severity and Priority', durationMinutes: 60, status: 'Completed' },
          { id: 'stst-3', title: 'Applying Agile and Scrum Testing Practices', durationMinutes: 45, status: 'Completed' },
          { id: 'stst-4', title: 'Testing User Stories and Sprint Deliverables', durationMinutes: 45, status: 'Completed' },
          { id: 'stst-5', title: 'Exploratory Testing ', durationMinutes: 45, status: 'Completed' }
        ]
      },
      {
        id: 'st-t5',
        title: 'Test Automation with Playwright',
        order: 5,
        status: 'Completed',
        description: 'Understand automation testing fundamentals and use Playwright to automate and execute reliable software tests.',
        subtopics: [
          { id: 'stst-1', title: 'Understanding Test Automation Fundamentals', durationMinutes: 45, status: 'Completed' },
          { id: 'stst-2', title: 'Understanding Automation Test Frameworks', durationMinutes: 60, status: 'Completed' },
          { id: 'stst-3', title: 'Getting Started with Playwright', durationMinutes: 45, status: 'Completed' },
          { id: 'stst-4', title: 'Building Automated Tests with Playwright', durationMinutes: 45, status: 'Completed' }
  
        ]
      }
    ],
    quizzes: [
      {
        id: 'quiz-testing-1',
        sessionId: 'session-software-testing',
        topicId: 'st-t2',
        title: 'Software Testing Fundamentals Quiz',
        description: 'Review key testing principles, test planning, automation, and defect lifecycle concepts.',
        passingScorePercent: 75,
        timeLimitMinutes: 18,
        questions: [
          {
            id: 'q1',
            type: 'MCQ' as const,
            prompt: 'Which test type validates a single unit or function of code?',
            options: ['Integration testing', 'System testing', 'Unit testing', 'Acceptance testing'],
            correctAnswer: 'Unit testing',
            explanation: 'Unit testing validates individual units or components in isolation.'
          },
          {
            id: 'q2',
            type: 'True / False' as const,
            prompt: 'Regression testing ensures recent changes do not break existing functionality.',
            options: ['True', 'False'],
            correctAnswer: 'True',
            explanation: 'Regression testing checks that new code changes do not introduce defects in existing behavior.'
          },
          {
            id: 'q3',
            type: 'Multiple Select' as const,
            prompt: 'Which of these are testing levels? (Select all that apply)',
            options: ['Unit', 'Integration', 'System', 'Deployment'],
            correctAnswer: ['Unit', 'Integration', 'System'],
            explanation: 'Testing levels include unit, integration, and system testing.'
          },
          {
            id: 'q4',
            type: 'Fill in Blank' as const,
            prompt: 'The defect lifecycle ends when the bug status is set to ______.',
            options: ['Closed', 'Open', 'Assigned'],
            correctAnswer: 'Closed',
            explanation: 'The defect lifecycle finishes when the issue is closed after verification.'
          },
          {
            id: 'q5',
            type: 'MCQ' as const,
            prompt: 'Which tool is commonly used for end-to-end web UI automation in modern testing?',
            options: ['Playwright', 'Photoshop', 'Excel', 'Postman'],
            correctAnswer: 'Playwright',
            explanation: 'Playwright is a browser automation tool used for web UI testing.'
          },
          {
            id: 'q6',
            type: 'True / False' as const,
            prompt: 'Smoke testing verifies core application functionality after a new build.',
            options: ['True', 'False'],
            correctAnswer: 'True',
            explanation: 'Smoke tests check basic functionality before deeper testing is performed.'
          },
          {
            id: 'q7',
            type: 'MCQ' as const,
            prompt: 'Boundary value analysis focuses on test inputs around ______.',
            options: ['edge cases and limits', 'only valid data', 'UI colors', 'network speed'],
            correctAnswer: 'edge cases and limits',
            explanation: 'Boundary value analysis tests the edge cases around input limits.'
          },
          {
            id: 'q8',
            type: 'Multiple Select' as const,
            prompt: 'Which test design techniques are commonly used? (Select all that apply)',
            options: ['Equivalence partitioning', 'Boundary value analysis', 'Decision tables', 'Waterfall planning'],
            correctAnswer: ['Equivalence partitioning', 'Boundary value analysis', 'Decision tables'],
            explanation: 'Equivalence partitioning, boundary value analysis, and decision tables are common test design techniques.'
          }
        ]
      }
    ],
    assignments: [
      {
        id: 'assign-software-testing-1',
        sessionId: 'session-software-testing',
        topicId: 'st-t2',
        title: 'Test Case Design Assignment',
        description: 'Create a set of test cases for a sample feature and explain the chosen techniques.',
        dueDate: '2026-08-28',
        totalPoints: 45,
        instructions: 'Submit a document with test cases, expected outcomes, and test design notes.',
        submissionFormat: 'Document Upload',
        attachmentName: 'TestCaseDesignTemplate.docx',
        attachmentUrl: 'https://example.com/TestCaseDesignTemplate.docx',
        status: 'Pending'
      }
    ]
  }

];

export const mockStudyMaterials = [
  {
    id: 'mat-1',
    sessionId: 'session-dotnet',
    topicId: 'dotnet-t1',
    title: '.NET 8 Architecture & C# 12 Master Reference.pdf',
    type: 'PDF' as const,
    url: 'https://raw.githubusercontent.com/mozilla/pdf.js/master/web/compressed.tracemonkey-pldi-09.pdf',
    description: 'Detailed enterprise handbook covering memory management, CLR garbage collector generations, and C# 12 language specifications.',
    durationOrPages: '42 Pages',
    currentVersion: 2.1,
    versions: [
      { version: 2.1, updatedAt: '2026-07-28', updatedBy: 'Lead L&D Architect', changeLog: 'Added .NET 8 Performance Benchmarks & C# 12 Collection Expressions' },
      { version: 1.0, updatedAt: '2026-01-15', updatedBy: 'Admin L&D', changeLog: 'Initial release for .NET 7' }
    ],
    contentBody: `# .NET 8 Architecture & C# 12 Master Reference

## 1. Common Language Runtime (CLR) & JIT
The CLR is the execution engine for .NET applications. It provides key services:
- **Automatic Memory Management (Garbage Collector)**
- **Type Safety & Exception Handling**
- **Just-In-Time (JIT) Compilation (RyuJIT)**

### Memory Allocation: Stack vs Heap
- **Stack**: Stores value types, method invocation frames, and reference pointers. Fast LIFO allocation.
- **Heap**: Stores reference type instances. Garbage collected across Gen 0, Gen 1, Gen 2, and Large Object Heap (LOH).

## 2. C# 12 Key Language Features
1. **Primary Constructors**: Declare constructors directly on class or struct definitions.
2. **Collection Expressions**: Simplified syntax using \`[1, 2, 3]\` construct.
3. **Ref Readonly Parameters**: Enhanced memory optimization without copying.`,
    tags: ['C#', '.NET 8', 'CLR', 'Memory']
  },
  {
    id: 'mat-2',
    sessionId: 'session-dotnet',
    topicId: 'dotnet-t2',
    title: 'SOLID Principles & Clean Architecture Enterprise Overview.pptx',
    type: 'PowerPoint' as const,
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    description: 'Executive presentation deck covering Onion Architecture, Dependency Inversion, Repository & Unit of Work patterns.',
    durationOrPages: '28 Slides',
    currentVersion: 1.2,
    versions: [
      { version: 1.2, updatedAt: '2026-07-20', updatedBy: 'Sr Solution Architect', changeLog: 'Updated diagram for CQRS and MediatR integration' }
    ],
    contentBody: `# SOLID Principles Presentation Summary

1. **S - Single Responsibility Principle**: A class should have one, and only one, reason to change.
2. **O - Open/Closed Principle**: Software entities should be open for extension, but closed for modification.
3. **L - Liskov Substitution Principle**: Subtypes must be substitutable for their base types.
4. **I - Interface Segregation Principle**: Many client-specific interfaces are better than one general-purpose interface.
5. **D - Dependency Inversion Principle**: Depend upon abstractions, not concretions.`,
    tags: ['Architecture', 'SOLID', 'Design Patterns']
  },
  {
    id: 'mat-3',
    sessionId: 'session-dotnet',
    topicId: 'dotnet-t3',
    title: 'LINQ Query Operators & Deferred Execution Guide.docx',
    type: 'Word' as const,
    url: '#',
    description: 'In-depth notes on IEnumerable vs IQueryable, expressions trees, SQL generation, and performance pitfalls.',
    durationOrPages: '15 Pages',
    currentVersion: 1.0,
    versions: [{ version: 1.0, updatedAt: '2026-06-10', updatedBy: 'Admin L&D', changeLog: 'Initial Document' }],
    contentBody: `# LINQ Query Operators & Deferred Execution

## IEnumerable vs IQueryable
- **IEnumerable<T>**: Executes queries in memory on the client side. Ideal for LINQ to Objects.
- **IQueryable<T>**: Translates LINQ expression trees to database SQL queries (EF Core). Executes on the database server.

## Deferred Execution
Queries are not executed when defined; they execute when enumerated (e.g., calling \`ToList()\`, \`FirstOrDefault()\`, or iterating in a \`foreach\` loop).`,
    tags: ['LINQ', 'C#', 'EF Core']
  },
  {
    id: 'mat-4',
    sessionId: 'session-dotnet',
    topicId: 'dotnet-t4',
    title: 'Building High Throughput Async Web Services in ASP.NET Core',
    type: 'YouTube' as const,
    url: 'https://www.youtube.com/watch?v=R-z2O34O-I4',
    description: 'Masterclass video session explaining async/await state machines, thread pool thread exhaustion, and SemaphoreSlim locking.',
    durationOrPages: '48 Mins',
    currentVersion: 1.0,
    versions: [{ version: 1.0, updatedAt: '2026-05-12', updatedBy: 'Tech Lead', changeLog: 'Uploaded masterclass video' }],
    tags: ['Video', 'Async', 'Performance']
  },
  {
    id: 'mat-5',
    sessionId: 'session-dotnet',
    topicId: 'dotnet-t5',
    title: 'Udemy: Enterprise ASP.NET Core & EF Core Masterclass',
    type: 'Udemy' as const,
    url: 'https://www.udemy.com/course/aspnet-core-masterclass',
    description: 'Direct enterprise access link to full 18-hour accredited Udemy course on ASP.NET Core Web APIs.',
    durationOrPages: '18 Hours',
    currentVersion: 1.0,
    versions: [{ version: 1.0, updatedAt: '2026-04-01', updatedBy: 'Udemy L&D Integration', changeLog: 'Activated Udemy Single Sign-On link' }],
    tags: ['Udemy', 'External Course']
  },
  // Insurance Domain Study Materials
  {
    id: 'mat-ins-1',
    sessionId: 'session-insurance',
    topicId: 'ins-t1',
    title: 'Enterprise Insurance Domain Handbook & Policy Lifecycle.pdf',
    type: 'PDF' as const,
    url: 'https://raw.githubusercontent.com/mozilla/pdf.js/master/web/compressed.tracemonkey-pldi-09.pdf',
    description: 'Comprehensive domain reference manual covering Life, Property & Casualty, Policy Underwriting, Premiums, and Claims processing.',
    durationOrPages: '36 Pages',
    currentVersion: 2.0,
    versions: [{ version: 2.0, updatedAt: '2026-07-15', updatedBy: 'Domain Practice Lead', changeLog: 'Updated IRDAI & Solvency II compliance rules' }],
    contentBody: `# Enterprise Insurance Domain Handbook

## Core Insurance Principles
1. **Principle of Indemnity**: Restores the insured to the financial position prior to loss.
2. **Utmost Good Faith (Uberrimae Fidei)**: Both insurer and insured must disclose all material facts.
3. **Insurable Interest**: The policyholder must suffer a direct financial loss upon property damage or event occurrence.

## Policy Lifecycle Stages
- **Lead Generation & Quote Submission**
- **Underwriting Risk Rating & Actuarial Calculation**
- **Policy Binder Issuance & Premium Invoicing**
- **Claims FNOL (First Notice of Loss) & Settlement**`,
    tags: ['Insurance', 'Underwriting', 'P&C', 'Claims']
  },
  {
    id: 'mat-ins-2',
    sessionId: 'session-insurance',
    topicId: 'ins-t2',
    title: 'Underwriting Principles & Risk Assessment Guide.pptx',
    type: 'PowerPoint' as const,
    url: '#',
    description: 'Deck explaining loss ratios, actuarial rate making, deductible structures, and underwriting guidelines.',
    durationOrPages: '24 Slides',
    currentVersion: 1.1,
    versions: [{ version: 1.1, updatedAt: '2026-06-20', updatedBy: 'L&D Admin', changeLog: 'Added underwriting risk score calculation formula' }],
    contentBody: `# Underwriting & Actuarial Basics Slide Summary
- **Loss Ratio Formula**: (Total Paid Claims + Claims Adjustment Expenses) / Total Earned Premiums
- **Combined Ratio**: Loss Ratio + Expense Ratio. A combined ratio < 100% indicates underwriting profitability.`,
    tags: ['Underwriting', 'Actuarial', 'Risk Rating']
  },
  {
    id: 'mat-ins-3',
    sessionId: 'session-insurance',
    topicId: 'ins-t3',
    title: 'Claims Management & FNOL Workflow Documentation.docx',
    type: 'Word' as const,
    url: '#',
    description: 'First Notice of Loss intake process, adjuster investigation, reserve estimation, and fraud detection algorithms.',
    durationOrPages: '18 Pages',
    currentVersion: 1.0,
    versions: [{ version: 1.0, updatedAt: '2026-05-10', updatedBy: 'Claims Operations Team', changeLog: 'Initial release' }],
    contentBody: `# Claims Management Workflow
1. **FNOL Intake**: Digital web portal or mobile app submission of incident details.
2. **Automated Fraud Scoring**: ML model evaluates claim risk flags.
3. **Adjuster Assignment & Reserve Booking**: Financial reserves locked for expected loss.
4. **Settlement & Payout**: Direct BACS/ACH transfer upon approval.`,
    tags: ['Claims', 'FNOL', 'Fraud Analytics']
  },
  {
    id: 'mat-ins-4',
    sessionId: 'session-insurance',
    topicId: 'ins-t1',
    title: 'End-to-End Policy Lifecycle & Reinsurance Architecture',
    type: 'YouTube' as const,
    url: 'https://www.youtube.com/watch?v=R-z2O34O-I4',
    description: 'Video masterclass detailing how core insurance software processes quotes, policies, and claims.',
    durationOrPages: '42 Mins',
    currentVersion: 1.0,
    versions: [{ version: 1.0, updatedAt: '2026-04-18', updatedBy: 'Enterprise L&D', changeLog: 'Video link published' }],
    tags: ['Video', 'Policy Lifecycle']
  },

  // Frontend React Study Materials
  {
    id: 'mat-fe-1',
    sessionId: 'session-frontend',
    topicId: 'fe-t1',
    title: 'React 19 & TypeScript Enterprise Architecture Guide.pdf',
    type: 'PDF' as const,
    url: 'https://raw.githubusercontent.com/mozilla/pdf.js/master/web/compressed.tracemonkey-pldi-09.pdf',
    description: 'Definitive engineering guide for modern React 19, Server Components, Hooks, and strict TypeScript types.',
    durationOrPages: '50 Pages',
    currentVersion: 3.0,
    versions: [{ version: 3.0, updatedAt: '2026-07-29', updatedBy: 'Lead Frontend Architect', changeLog: 'Updated for React 19 Actions and useOptimistic' }],
    contentBody: `# React 19 & TypeScript Enterprise Architecture Guide
## 1. React 19 Core Enhancements
- **Actions & useActionState**: Simplified async transition and pending state management.
- **useOptimistic**: Instant client-side state updates while async server mutations resolve.
- **use Hook**: Unwrap promises and context directly in render functions.

## 2. TypeScript Best Practices
- Define strict interface props for every component.
- Use generics for reusable table and dropdown UI primitives.`,
    tags: ['React 19', 'TypeScript', 'Frontend', 'Hooks']
  },
  {
    id: 'mat-fe-2',
    sessionId: 'session-frontend',
    topicId: 'fe-t3',
    title: 'Modern UI Systems with Tailwind CSS & Motion.pptx',
    type: 'PowerPoint' as const,
    url: '#',
    description: 'Presentation covering responsive grids, dark mode color tokens, layout transitions, and micro-interactions.',
    durationOrPages: '32 Slides',
    currentVersion: 1.2,
    versions: [{ version: 1.2, updatedAt: '2026-07-10', updatedBy: 'UI/UX Lead', changeLog: 'Added Tailwind v4 CSS theme variables' }],
    tags: ['Tailwind', 'Motion', 'Design Systems']
  },
  {
    id: 'mat-fe-3',
    sessionId: 'session-frontend',
    topicId: 'fe-t2',
    title: 'State Management with Zustand & React Query.docx',
    type: 'Word' as const,
    url: '#',
    description: 'Client state vs server cache state architecture, optimistic updates, and background revalidation.',
    durationOrPages: '20 Pages',
    currentVersion: 1.0,
    versions: [{ version: 1.0, updatedAt: '2026-06-05', updatedBy: 'Frontend Team', changeLog: 'Initial release' }],
    tags: ['State Management', 'Zustand', 'React Query']
  },

  // SQL & Database Study Materials
  {
    id: 'mat-sql-1',
    sessionId: 'session-sql',
    topicId: 'sql-t1',
    title: 'PostgreSQL & SQL Server Database Engineering Manual.pdf',
    type: 'PDF' as const,
    url: 'https://raw.githubusercontent.com/mozilla/pdf.js/master/web/compressed.tracemonkey-pldi-09.pdf',
    description: 'In-depth reference manual on 3NF Normalization, Foreign Key Cascades, CTEs, Window Functions, and Query Tuning.',
    durationOrPages: '45 Pages',
    currentVersion: 2.1,
    versions: [{ version: 2.1, updatedAt: '2026-07-22', updatedBy: 'Principal DB Engineer', changeLog: 'Added PostgreSQL EXPLAIN ANALYZE tuning techniques' }],
    contentBody: `# PostgreSQL & SQL Server Database Engineering
## 1. Database Normalization
- **1NF**: Eliminate repeating groups; ensure atomic values.
- **2NF**: Meet 1NF; ensure full functional dependency on primary key.
- **3NF**: Meet 2NF; remove transitive dependencies.

## 2. Window Functions
\`\`\`sql
SELECT EmployeeId, Salary,
       DENSE_RANK() OVER (PARTITION BY DepartmentId ORDER BY Salary DESC) as Rank
FROM Employees;
\`\`\``,
    tags: ['SQL', 'PostgreSQL', 'Database', 'Indexing']
  },
  {
    id: 'mat-sql-2',
    sessionId: 'session-sql',
    topicId: 'sql-t2',
    title: 'Advanced Querying, CTEs & Window Functions Deck.pptx',
    type: 'PowerPoint' as const,
    url: '#',
    description: 'Slide deck explaining Common Table Expressions, ROW_NUMBER, RANK, DENSE_RANK, and LEAD/LAG.',
    durationOrPages: '26 Slides',
    currentVersion: 1.0,
    versions: [{ version: 1.0, updatedAt: '2026-05-30', updatedBy: 'DBA Team', changeLog: 'Published window functions deck' }],
    tags: ['Window Functions', 'CTEs', 'SQL']
  },

  // Azure Cloud Study Materials
  {
    id: 'mat-az-1',
    sessionId: 'session-azure',
    topicId: 'az-t1',
    title: 'Azure Enterprise Infrastructure Architecture.pdf',
    type: 'PDF' as const,
    url: 'https://raw.githubusercontent.com/mozilla/pdf.js/master/web/compressed.tracemonkey-pldi-09.pdf',
    description: 'Enterprise guide for Azure App Services, Key Vault, Container Apps, Application Insights, and Managed Identities.',
    durationOrPages: '38 Pages',
    currentVersion: 1.5,
    versions: [{ version: 1.5, updatedAt: '2026-07-12', updatedBy: 'Azure Cloud Architect', changeLog: 'Updated Bicep IaC deployment scripts' }],
    contentBody: `# Azure Enterprise Infrastructure Guide
## Core Azure Infrastructure Services
1. **App Services**: Managed platform for hosting web applications and REST APIs.
2. **Key Vault**: Secure storage for certificates, connection strings, and secret keys.
3. **Managed Identity**: Eliminates the need for hardcoded credentials in app code.`,
    tags: ['Azure', 'Cloud', 'DevOps', 'App Services']
  },
  {
    id: 'mat-az-2',
    sessionId: 'session-azure',
    topicId: 'az-t2',
    title: 'Azure DevOps CI/CD Pipelines Master Guide.pptx',
    type: 'PowerPoint' as const,
    url: '#',
    description: 'YAML build triggers, artifact staging, release gates, and deployment slots presentation deck.',
    durationOrPages: '30 Slides',
    currentVersion: 1.0,
    versions: [{ version: 1.0, updatedAt: '2026-06-15', updatedBy: 'DevOps Lead', changeLog: 'Initial release' }],
    tags: ['Azure DevOps', 'CI/CD', 'Pipelines']
  },

  // Microservices Study Materials
  {
    id: 'mat-ms-1',
    sessionId: 'session-microservices',
    topicId: 'ms-t1',
    title: 'Microservices Design Patterns & Domain-Driven Design.pdf',
    type: 'PDF' as const,
    url: 'https://raw.githubusercontent.com/mozilla/pdf.js/master/web/compressed.tracemonkey-pldi-09.pdf',
    description: 'Comprehensive manual on DDD Bounded Contexts, Event-Driven Architecture, Outbox Pattern, and Circuit Breakers.',
    durationOrPages: '52 Pages',
    currentVersion: 2.0,
    versions: [{ version: 2.0, updatedAt: '2026-07-25', updatedBy: 'Chief Architect', changeLog: 'Added Polly 8 Resilience pipelines and YARP Gateway' }],
    contentBody: `# Microservices & Domain-Driven Design (DDD)
## Key Architectural Patterns
1. **Bounded Context**: Explicit boundaries around a domain model.
2. **Transactional Outbox Pattern**: Guarantees event delivery to message broker without two-phase commit.
3. **API Gateway (YARP / Ocelot)**: Single entry point providing routing, rate limiting, and SSL termination.`,
    tags: ['Microservices', 'DDD', 'Architecture', 'API Gateway']
  },
  {
    id: 'mat-ms-2',
    sessionId: 'session-microservices',
    topicId: 'ms-t1',
    title: 'Event-Driven Architecture with RabbitMQ & Kafka.pptx',
    type: 'PowerPoint' as const,
    url: '#',
    description: 'Deck explaining publish-subscribe channels, dead-letter queues, idempotent consumers, and distributed sagas.',
    durationOrPages: '35 Slides',
    currentVersion: 1.0,
    versions: [{ version: 1.0, updatedAt: '2026-06-28', updatedBy: 'System Architect', changeLog: 'Initial release' }],
    tags: ['Event-Driven', 'RabbitMQ', 'Kafka']
  }
];

export const mockQuizzes = [
  {
    id: 'quiz-dotnet-1',
    sessionId: 'session-dotnet',
    topicId: 'dotnet-t4',
    title: 'C# Async Programming Assessment',
    passingScorePercent: 80,
    timeLimitMinutes: 15,
    questions: [
      {
        id: 'dotnet-q1',
        type: 'MCQ' as const,
        prompt: 'Which keyword is used to create an asynchronous method in C#?',
        options: ['await', 'async', 'yield', 'task'],
        correctAnswer: 'async',
        explanation: 'The async keyword marks a method as asynchronous so it can use await inside.'
      },
      {
        id: 'dotnet-q2',
        type: 'MCQ' as const,
        prompt: 'What is the correct return type for an async method that does not return a value?',
        options: ['void', 'Task', 'Task<int>', 'IEnumerable<Task>'],
        correctAnswer: 'Task',
        explanation: 'Async methods that do not return a result should return Task to allow callers to await them.'
      },
      {
        id: 'dotnet-q3',
        type: 'MCQ' as const,
        prompt: 'Which of the following is a valid way to handle exceptions from an awaited async call?',
        options: ['Use try/catch around await', 'Use Task.DisableExceptionHandling()', 'Call await in a finally block only', 'Use async void and ignore exceptions'],
        correctAnswer: 'Use try/catch around await',
        explanation: 'Exceptions from awaited Tasks are propagated and can be caught using try/catch around the await expression.'
      },
      {
        id: 'dotnet-q4',
        type: 'MCQ' as const,
        prompt: 'Which method is used to convert a query to a list and execute it immediately in LINQ to Objects?',
        options: ['Select()', 'Where()', 'ToList()', 'Defer()'],
        correctAnswer: 'ToList()',
        explanation: 'ToList() materializes the query and forces immediate execution.'
      },
      {
        id: 'dotnet-q5',
        type: 'MCQ' as const,
        prompt: 'What is the purpose of the using statement in C#?',
        options: ['Declare a namespace', 'Manage resources and call Dispose', 'Start a new thread', 'Create a lambda expression'],
        correctAnswer: 'Manage resources and call Dispose',
        explanation: 'The using statement automatically disposes of IDisposable objects when the block exits.'
      }
    ]
  },
  {
    id: 'quiz-insurance-1',
    sessionId: 'session-insurance',
    topicId: 'ins-t1',
    title: 'Insurance Fundamentals Assessment',
    passingScorePercent: 75,
    timeLimitMinutes: 15,
    questions: [
      {
        id: 'insurance-q1',
        type: 'MCQ' as const,
        prompt: 'Which principle requires the insured to disclose all material facts to the insurer?',
        options: ['Utmost Good Faith', 'Indemnity', 'Subrogation', 'Proximate Cause'],
        correctAnswer: 'Utmost Good Faith',
        explanation: 'Utmost good faith means both parties must share all relevant information.'
      },
      {
        id: 'insurance-q2',
        type: 'MCQ' as const,
        prompt: 'What does insurable interest mean?',
        options: ['The insured benefits financially from the insured item', 'The insurer can refuse coverage', 'The policy has no deductible', 'Premiums are fixed annually'],
        correctAnswer: 'The insured benefits financially from the insured item',
        explanation: 'Insurable interest exists when the insured would suffer a financial loss if the insured item is damaged.'
      },
      {
        id: 'insurance-q3',
        type: 'MCQ' as const,
        prompt: 'Which type of insurance covers property and casualty risks?',
        options: ['Life Insurance', 'Health Insurance', 'P&C Insurance', 'Title Insurance'],
        correctAnswer: 'P&C Insurance',
        explanation: 'Property and casualty insurance protects against loss to property and liability exposures.'
      },
      {
        id: 'insurance-q4',
        type: 'MCQ' as const,
        prompt: 'What is the first notice of loss (FNOL)?',
        options: ['A policy renewal notice', 'The initial report of a claim', 'A premium invoice', 'A underwriting decision'],
        correctAnswer: 'The initial report of a claim',
        explanation: 'FNOL is the first notification an insurer receives when a loss occurs.'
      },
      {
        id: 'insurance-q5',
        type: 'MCQ' as const,
        prompt: 'Which document typically describes coverage rules and exclusions?',
        options: ['Policy Schedule', 'Insurance Proposal', 'Policy Wordings', 'Claim Form'],
        correctAnswer: 'Policy Wordings',
        explanation: 'Policy wordings define the terms, conditions, and exclusions of coverage.'
      }
    ]
  },
  {
    id: 'quiz-sql-1',
    sessionId: 'session-sql',
    topicId: 'sql-t1',
    title: 'SQL & Database Engineering Assessment',
    passingScorePercent: 75,
    timeLimitMinutes: 15,
    questions: [
      {
        id: 'sql-q1',
        type: 'MCQ' as const,
        prompt: 'Which SQL command is used to create a new table?',
        options: ['INSERT', 'UPDATE', 'CREATE TABLE', 'ALTER TABLE'],
        correctAnswer: 'CREATE TABLE',
        explanation: 'CREATE TABLE is the DDL command used to define a new table structure.'
      },
      {
        id: 'sql-q2',
        type: 'MCQ' as const,
        prompt: 'What does the WHERE clause do in a SELECT statement?',
        options: ['Sorts the results', 'Filters rows that meet a condition', 'Groups rows', 'Defines a join condition'],
        correctAnswer: 'Filters rows that meet a condition',
        explanation: 'WHERE restricts the rows returned by the query based on the given predicate.'
      },
      {
        id: 'sql-q3',
        type: 'MCQ' as const,
        prompt: 'Which join returns only matching rows from both tables?',
        options: ['LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN', 'INNER JOIN'],
        correctAnswer: 'INNER JOIN',
        explanation: 'INNER JOIN returns rows where the join condition matches in both tables.'
      },
      {
        id: 'sql-q4',
        type: 'MCQ' as const,
        prompt: 'What is the purpose of a primary key?',
        options: ['Allow duplicate rows', 'Enforce unique row identity', 'Store large text values', 'Create indexes automatically'],
        correctAnswer: 'Enforce unique row identity',
        explanation: 'A primary key uniquely identifies each row in a table.'
      },
      {
        id: 'sql-q5',
        type: 'MCQ' as const,
        prompt: 'Which SQL statement is used to remove all rows from a table but keep the table structure?',
        options: ['DROP TABLE', 'DELETE FROM', 'TRUNCATE TABLE', 'ALTER TABLE'],
        correctAnswer: 'TRUNCATE TABLE',
        explanation: 'TRUNCATE TABLE removes all rows efficiently while preserving the table definition.'
      }
    ]
  },
  {
    id: 'quiz-c2c-1',
    sessionId: 'session-c2c',
    topicId: 'c2c-t1',
    title: 'Campus to Corporate Communication Assessment',
    passingScorePercent: 70,
    timeLimitMinutes: 15,
    questions: [
      {
        id: 'c2c-q1',
        type: 'MCQ' as const,
        prompt: 'What is the most important component of active listening?',
        options: ['Interrupting quickly', 'Thinking about your response', 'Asking clarifying questions', 'Multitasking'],
        correctAnswer: 'Asking clarifying questions',
        explanation: 'Clarifying questions show engagement and help ensure understanding.'
      },
      {
        id: 'c2c-q2',
        type: 'MCQ' as const,
        prompt: 'Which behavior best reflects professional workplace etiquette?',
        options: ['Ignoring deadlines', 'Responding promptly to messages', 'Speaking loudly in meetings', 'Skipping status updates'],
        correctAnswer: 'Responding promptly to messages',
        explanation: 'Timely communication is a core part of professionalism.'
      },
      {
        id: 'c2c-q3',
        type: 'MCQ' as const,
        prompt: 'What is the primary aim of the Pomodoro Technique?',
        options: ['Work without breaks', 'Increase short bursts of focused work', 'Eliminate daily planning', 'Monitor other people’s productivity'],
        correctAnswer: 'Increase short bursts of focused work',
        explanation: 'Pomodoro uses timeboxing with focused work sessions and breaks to improve productivity.'
      },
      {
        id: 'c2c-q4',
        type: 'MCQ' as const,
        prompt: 'The Eisenhower Matrix helps you prioritize tasks based on urgency and what else?',
        options: ['Complexity', 'Importance', 'Time required', 'Budget'],
        correctAnswer: 'Importance',
        explanation: 'The Eisenhower Matrix uses urgency and importance as its two dimensions.'
      },
      {
        id: 'c2c-q5',
        type: 'MCQ' as const,
        prompt: 'What is a good practice when giving constructive feedback?',
        options: ['Focus only on personality', 'Wait until a yearly review', 'Be specific and actionable', 'Use vague terms'],
        correctAnswer: 'Be specific and actionable',
        explanation: 'Effective feedback is clear, specific, and gives the recipient steps they can take.'
      }
    ]
  },
  {
    id: 'quiz-data-modeling-fundamentals-1',
    sessionId: 'session-data-modeling-fundamentals',
    topicId: 'dm-t1',
    title: 'Data Modeling Fundamentals Assessment',
    passingScorePercent: 75,
    timeLimitMinutes: 15,
    questions: [
      {
        id: 'dm-q1',
        type: 'MCQ' as const,
        prompt: 'What is an entity in data modeling?',
        options: ['A business process', 'A set of code libraries', 'A real-world object or concept', 'A network topology'],
        correctAnswer: 'A real-world object or concept',
        explanation: 'Entities represent things of interest in a data model, such as Customer or Order.'
      },
      {
        id: 'dm-q2',
        type: 'MCQ' as const,
        prompt: 'What does cardinality describe in a relationship?',
        options: ['The number of tables', 'The number of attributes', 'How many instances relate between entities', 'The execution speed'],
        correctAnswer: 'How many instances relate between entities',
        explanation: 'Cardinality defines one-to-one, one-to-many, or many-to-many relationships.'
      },
      {
        id: 'dm-q3',
        type: 'MCQ' as const,
        prompt: 'Which normal form eliminates repeating groups and ensures each field contains atomic values?',
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        correctAnswer: '1NF',
        explanation: 'First normal form requires that each column contains indivisible values and each row is unique.'
      },
      {
        id: 'dm-q4',
        type: 'MCQ' as const,
        prompt: 'A foreign key is used to:',
        options: ['Store a list of values', 'Enforce referential integrity between tables', 'Speed up query execution', 'Format display output'],
        correctAnswer: 'Enforce referential integrity between tables',
        explanation: 'Foreign keys link records across tables and enforce relationship constraints.'
      },
      {
        id: 'dm-q5',
        type: 'MCQ' as const,
        prompt: 'What is the main purpose of a logical data model?',
        options: ['Describe hardware requirements', 'Define business entities and relationships independent of technology', 'Assign project tasks', 'Write SQL queries'],
        correctAnswer: 'Define business entities and relationships independent of technology',
        explanation: 'Logical models capture data structure and relationships without platform-specific details.'
      }
    ]
  },
  {
    id: 'quiz-data-fundamentals-1',
    sessionId: 'session-data-fundamentals',
    topicId: 'df-t1',
    title: 'Data Fundamentals Assessment',
    passingScorePercent: 75,
    timeLimitMinutes: 15,
    questions: [
      {
        id: 'df-q1',
        type: 'MCQ' as const,
        prompt: 'What is a key component of data quality?',
        options: ['High volume only', 'Accuracy', 'Faster internet', 'More tables'],
        correctAnswer: 'Accuracy',
        explanation: 'Accuracy is a foundational data quality dimension, ensuring data reflects real-world values.'
      },
      {
        id: 'df-q2',
        type: 'MCQ' as const,
        prompt: 'What does the medallion architecture typically include?',
        options: ['Bronze, Silver, Gold layers', 'Front-end, back-end, database', 'Alpha, Beta, Gamma', 'Load, transform, serve'],
        correctAnswer: 'Bronze, Silver, Gold layers',
        explanation: 'The medallion architecture organizes data into bronze/raw, silver/cleaned, and gold/curated layers.'
      },
      {
        id: 'df-q3',
        type: 'MCQ' as const,
        prompt: 'Which tool is often used for business intelligence and dashboards in Microsoft environments?',
        options: ['Power BI', 'Vim', 'GitHub', 'Docker'],
        correctAnswer: 'Power BI',
        explanation: 'Power BI is a Microsoft analytics service for building dashboards and reports.'
      },
      {
        id: 'df-q4',
        type: 'MCQ' as const,
        prompt: 'Which Azure service is typically used for managed data lakes and analytics?',
        options: ['Azure DevOps', 'Azure Data Lake', 'Azure Functions', 'Azure Active Directory'],
        correctAnswer: 'Azure Data Lake',
        explanation: 'Azure Data Lake is used for scalable storage and analytics on large volumes of data.'
      },
      {
        id: 'df-q5',
        type: 'MCQ' as const,
        prompt: 'Why is data governance important?',
        options: ['To increase storage costs', 'To ensure consistent policies and compliance', 'To slow down data access', 'To avoid user training'],
        correctAnswer: 'To ensure consistent policies and compliance',
        explanation: 'Data governance provides rules and processes for managing data quality, privacy, and compliance.'
      }
    ]
  },
  {
    id: 'quiz-html-css-js-1',
    sessionId: 'session-html-css-js',
    topicId: 'web-t1',
    title: 'Web Development Fundamentals Assessment',
    passingScorePercent: 75,
    timeLimitMinutes: 15,
    questions: [
      {
        id: 'web-q1',
        type: 'MCQ' as const,
        prompt: 'Which HTML element is used to define the main content of a page?',
        options: ['<header>', '<main>', '<section>', '<div>'],
        correctAnswer: '<main>',
        explanation: '<main> indicates the primary content of the document.'
      },
      {
        id: 'web-q2',
        type: 'MCQ' as const,
        prompt: 'Which CSS property controls the space between an element’s border and its content?',
        options: ['margin', 'padding', 'border-spacing', 'gap'],
        correctAnswer: 'padding',
        explanation: 'Padding adds space inside the border, between the border and content.'
      },
      {
        id: 'web-q3',
        type: 'MCQ' as const,
        prompt: 'What is the purpose of document.querySelector in JavaScript?',
        options: ['Create a new element', 'Select an element from the DOM', 'Send an HTTP request', 'Style an element'],
        correctAnswer: 'Select an element from the DOM',
        explanation: 'querySelector returns the first element matching a CSS selector.'
      },
      {
        id: 'web-q4',
        type: 'MCQ' as const,
        prompt: 'Which event is fired when the DOM has fully loaded?',
        options: ['click', 'load', 'DOMContentLoaded', 'change'],
        correctAnswer: 'DOMContentLoaded',
        explanation: 'DOMContentLoaded fires when the initial HTML document is completely loaded and parsed.'
      },
      {
        id: 'web-q5',
        type: 'MCQ' as const,
        prompt: 'Which JavaScript keyword is used to define an asynchronous function?',
        options: ['await', 'async', 'defer', 'setTimeout'],
        correctAnswer: 'async',
        explanation: 'The async keyword defines an asynchronous function that can use await.'
      }
    ]
  },
  {
    id: 'quiz-modern-data-platforms-1',
    sessionId: 'session-modern-data-platforms',
    topicId: 'mdp-t1',
    title: 'Modern Data Platforms Assessment',
    passingScorePercent: 75,
    timeLimitMinutes: 15,
    questions: [
      {
        id: 'mdp-q1',
        type: 'MCQ' as const,
        prompt: 'Which architecture pattern combines data lakes and warehouses?',
        options: ['Monolith', 'Data Lakehouse', 'MVC', 'Client-Server'],
        correctAnswer: 'Data Lakehouse',
        explanation: 'Lakehouse architecture merges data lake flexibility with data warehouse structure.'
      },
      {
        id: 'mdp-q2',
        type: 'MCQ' as const,
        prompt: 'What does ETL stand for?',
        options: ['Extract, Transform, Load', 'Evaluate, Test, Launch', 'Enterprise, Technology, Logic', 'Extract, Transfer, Link'],
        correctAnswer: 'Extract, Transform, Load',
        explanation: 'ETL is the process of extracting data, transforming it, and loading it into a target store.'
      },
      {
        id: 'mdp-q3',
        type: 'MCQ' as const,
        prompt: 'Which Microsoft service is commonly used for analytics and lakehouse storage?',
        options: ['Azure Functions', 'Azure Data Factory', 'Databricks', 'Power Apps'],
        correctAnswer: 'Databricks',
        explanation: 'Databricks provides analytics and lakehouse capabilities on Azure.'
      },
      {
        id: 'mdp-q4',
        type: 'MCQ' as const,
        prompt: 'What is data governance primarily concerned with?',
        options: ['Performance tuning', 'Data ownership and policies', 'Color schemes in dashboards', 'Network configuration'],
        correctAnswer: 'Data ownership and policies',
        explanation: 'Data governance defines responsibilities, policies, and compliance rules for data.'
      },
      {
        id: 'mdp-q5',
        type: 'MCQ' as const,
        prompt: 'Why are metadata catalogs important in modern data platforms?',
        options: ['They store actual data rows', 'They track data lineage and discovery', 'They replace the database engine', 'They host web applications'],
        correctAnswer: 'They track data lineage and discovery',
        explanation: 'Catalogs make it easier to discover data assets and understand lineage and usage.'
      }
    ]
  },
  {
    id: 'quiz-software-testing-1',
    sessionId: 'session-software-testing',
    topicId: 'st-t1',
    title: 'Software Testing Fundamentals Assessment',
    passingScorePercent: 75,
    timeLimitMinutes: 15,
    questions: [
      {
        id: 'st-q1',
        type: 'MCQ' as const,
        prompt: 'Which testing type verifies that the system meets user requirements?',
        options: ['Unit Testing', 'Integration Testing', 'Acceptance Testing', 'Smoke Testing'],
        correctAnswer: 'Acceptance Testing',
        explanation: 'Acceptance testing checks if the system satisfies business requirements and user needs.'
      },
      {
        id: 'st-q2',
        type: 'MCQ' as const,
        prompt: 'What is boundary value analysis used for?',
        options: ['Checking performance at high load', 'Testing values at the edges of input ranges', 'Improving code readability', 'Designing user interfaces'],
        correctAnswer: 'Testing values at the edges of input ranges',
        explanation: 'Boundary value analysis tests values near the boundaries of input domains where defects often occur.'
      },
      {
        id: 'st-q3',
        type: 'MCQ' as const,
        prompt: 'Which activity is part of defect management?',
        options: ['Writing user stories', 'Logging and tracking bugs', 'Deploying to production', 'Creating test automation frameworks'],
        correctAnswer: 'Logging and tracking bugs',
        explanation: 'Defect management involves identifying, logging, tracking, and resolving bugs.'
      },
      {
        id: 'st-q4',
        type: 'MCQ' as const,
        prompt: 'What does regression testing verify?',
        options: ['New features work in isolation', 'No new code was added', 'Existing functionality still works after changes', 'Only UI elements render correctly'],
        correctAnswer: 'Existing functionality still works after changes',
        explanation: 'Regression testing ensures changes don’t break existing behavior.'
      },
      {
        id: 'st-q5',
        type: 'MCQ' as const,
        prompt: 'What is a test case?',
        options: ['A bug report', 'A scripted set of conditions and expected results', 'A deployment pipeline', 'A production incident'],
        correctAnswer: 'A scripted set of conditions and expected results',
        explanation: 'A test case defines inputs, execution conditions, and expected outcomes for a test scenario.'
      }
    ]
  },
  {
    id: 'quiz-insurance-1',
    sessionId: 'session-insurance',
    topicId: 'ins-t4',
    title: 'Insurance Underwriting & Claims Fundamentals Quiz',
    description: 'Verify your knowledge of underwriting principles, insurance products, and claims lifecycle management.',
    passingScorePercent: 75,
    timeLimitMinutes: 15,
    questions: [
      {
        id: 'q1',
        type: 'MCQ' as const,
        prompt: 'Which principle requires both insurer and insured to disclose all material facts?',
        options: ['Indemnity', 'Utmost Good Faith', 'Subrogation', 'Insurable Interest'],
        correctAnswer: 'Utmost Good Faith',
        explanation: 'Utmost Good Faith requires full disclosure of material facts by both parties.'
      },
      {
        id: 'q2',
        type: 'True / False' as const,
        prompt: 'The principle of indemnity aims to return the insured to the same financial position as before the loss.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'Indemnity restores the insured to the pre-loss financial position, not to make a profit.'
      },
      {
        id: 'q3',
        type: 'Fill in Blank' as const,
        prompt: 'FNOL stands for First Notice of ______.',
        options: ['Loss', 'Liability', 'Location'],
        correctAnswer: 'Loss',
        explanation: 'First Notice of Loss (FNOL) is the initial report of a claim event.'
      },
      {
        id: 'q4',
        type: 'Multiple Select' as const,
        prompt: 'Which products are typical insurance categories? (Select all that apply)',
        options: ['Life', 'Health', 'Property', 'Software'],
        correctAnswer: ['Life', 'Health', 'Property'],
        explanation: 'Life, Health, and Property are core insurance categories; Software is not an insurance product category.'
      },
      {
        id: 'q5',
        type: 'MCQ' as const,
        prompt: 'What is the primary purpose of underwriting?',
        options: ['To generate marketing leads', 'To assess risk and determine premium pricing', 'To process claim payments', 'To develop new product features'],
        correctAnswer: 'To assess risk and determine premium pricing',
        explanation: 'Underwriting evaluates risk and sets appropriate rates to ensure profitability and compliance.'
      },
      {
        id: 'q6',
        type: 'MCQ' as const,
        prompt: 'Which of the following is an element of the insurance policy lifecycle?',
        options: ['Code deployment', 'Claim settlement', 'Database normalization', 'Network topology'],
        correctAnswer: 'Claim settlement',
        explanation: 'Claim settlement is a key step in the insurance policy lifecycle.'
      },
      {
        id: 'q7',
        type: 'True / False' as const,
        prompt: 'A combined ratio below 100% indicates an underwriting profit.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'A combined ratio under 100% means premiums exceed claims and expenses.'
      },
      {
        id: 'q8',
        type: 'MCQ' as const,
        prompt: 'Insurable interest means the insured must have a ______ in the subject matter.',
        options: ['financial interest', 'technical skill', 'social connection', 'contractor agreement'],
        correctAnswer: 'financial interest',
        explanation: 'Insurable interest requires a financial stake in the insured item or person.'
      }
    ]
  },
  {
    id: 'quiz-sql-1',
    sessionId: 'session-sql',
    topicId: 'sql-t4',
    title: 'SQL Querying & Data Management Assessment',
    description: 'Test your knowledge of SQL query syntax, joins, normalization, and transaction behavior.',
    passingScorePercent: 80,
    timeLimitMinutes: 20,
    questions: [
      {
        id: 'q1',
        type: 'MCQ' as const,
        prompt: 'Which JOIN returns rows only when there is a match in both tables?',
        options: ['LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'FULL OUTER JOIN'],
        correctAnswer: 'INNER JOIN',
        explanation: 'INNER JOIN returns only matching rows from both tables.'
      },
      {
        id: 'q2',
        type: 'Fill in Blank' as const,
        prompt: 'The SQL clause used to group rows and compute aggregates is ______.',
        options: ['GROUP BY', 'ORDER BY', 'WHERE'],
        correctAnswer: 'GROUP BY',
        explanation: 'GROUP BY groups rows to compute aggregates such as SUM and COUNT.'
      },
      {
        id: 'q3',
        type: 'Multiple Select' as const,
        prompt: 'Which SQL functions are considered window functions? (Select all that apply)',
        options: ['ROW_NUMBER()', 'SUM()', 'DENSE_RANK()', 'AVG()'],
        correctAnswer: ['ROW_NUMBER()', 'DENSE_RANK()'],
        explanation: 'ROW_NUMBER and DENSE_RANK are window functions; SUM and AVG are aggregate functions unless used with OVER().'   
      },
      {
        id: 'q4',
        type: 'True / False' as const,
        prompt: 'A database index always improves the performance of every SQL query.',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanation: 'Indexes can slow down writes and do not benefit all query patterns.'
      },
      {
        id: 'q5',
        type: 'Code Output' as const,
        prompt: `What result does this SQL return?\nSELECT COUNT(*) FROM Orders WHERE OrderDate >= '2026-01-01';`,
        options: ['The number of orders since Jan 1, 2026', 'The sum of all order totals', 'A list of orders', 'The latest order date'],
        correctAnswer: 'The number of orders since Jan 1, 2026',
        explanation: 'COUNT(*) returns the count of rows that match the WHERE clause.'
      },
      {
        id: 'q6',
        type: 'MCQ' as const,
        prompt: 'Which normalization form removes transitive dependencies?',
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        correctAnswer: '3NF',
        explanation: 'Third Normal Form removes transitive dependencies in a relational schema.'
      },
      {
        id: 'q7',
        type: 'MCQ' as const,
        prompt: 'Which SQL command modifies the structure of an existing table?',
        options: ['INSERT', 'ALTER TABLE', 'DROP TABLE', 'SELECT'],
        correctAnswer: 'ALTER TABLE',
        explanation: 'ALTER TABLE changes a table definition, such as adding or dropping columns.'
      },
      {
        id: 'q8',
        type: 'Multiple Select' as const,
        prompt: 'Which of these are transaction isolation levels in SQL? (Select all that apply)',
        options: ['READ COMMITTED', 'SERIALIZABLE', 'READ UNCOMMITTED', 'AUTO COMMIT'],
        correctAnswer: ['READ COMMITTED', 'SERIALIZABLE', 'READ UNCOMMITTED'],
        explanation: 'AUTO COMMIT is a transaction mode, not an isolation level.'
      }
    ]
  },
  {
    id: 'quiz-c2c-1',
    sessionId: 'session-c2c',
    topicId: 'c2c-t2',
    title: 'Campus to Corporate Professional Skills Quiz',
    description: 'Evaluate your understanding of workplace communication, etiquette, productivity, and presentation skills.',
    passingScorePercent: 75,
    timeLimitMinutes: 15,
    questions: [
      {
        id: 'q1',
        type: 'MCQ' as const,
        prompt: 'Which behavior is most important for professional workplace communication?',
        options: ['Using technical jargon constantly', 'Listening actively and asking clarifying questions', 'Interrupting to make your point', 'Relying only on email for all communication'],
        correctAnswer: 'Listening actively and asking clarifying questions',
        explanation: 'Active listening helps build trust and ensures understanding in professional interactions.'
      },
      {
        id: 'q2',
        type: 'Fill in Blank' as const,
        prompt: 'The Pomodoro Technique typically uses repeated work intervals of ______ minutes.',
        options: ['25', '45', '60'],
        correctAnswer: '25',
        explanation: 'The Pomodoro Technique uses 25-minute focused work intervals followed by short breaks.'
      },
      {
        id: 'q3',
        type: 'True / False' as const,
        prompt: 'Business etiquette includes punctuality, professional language, and respectful behavior.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'Punctuality, professional language, and respect are core elements of business etiquette.'
      },
      {
        id: 'q4',
        type: 'MCQ' as const,
        prompt: 'Which quadrant of the Eisenhower Matrix contains tasks that are important but not urgent?',
        options: ['Do First', 'Schedule', 'Delegate', 'Eliminate'],
        correctAnswer: 'Schedule',
        explanation: 'Important but not urgent tasks should be scheduled for later.'
      },
      {
        id: 'q5',
        type: 'Multiple Select' as const,
        prompt: 'Which skills contribute to strong teamwork? (Select all that apply)',
        options: ['Accountability', 'Open communication', 'Individual competition', 'Collaborative problem solving'],
        correctAnswer: ['Accountability', 'Open communication', 'Collaborative problem solving'],
        explanation: 'Teamwork depends on accountability, communication, and collaboration.'
      },
      {
        id: 'q6',
        type: 'MCQ' as const,
        prompt: 'Vocal variety in presentations refers to changes in which elements?',
        options: ['Power, pitch, pace, and pause', 'Content length only', 'Cost and budget', 'Headset type'],
        correctAnswer: 'Power, pitch, pace, and pause',
        explanation: 'Effective presentation delivery uses variation in power, pitch, pace, and pauses.'
      },
      {
        id: 'q7',
        type: 'True / False' as const,
        prompt: 'Professional communication should always avoid asking questions to appear confident.',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanation: 'Asking questions is a sign of engagement and helps clarify expectations.'
      },
      {
        id: 'q8',
        type: 'MCQ' as const,
        prompt: 'What is the best approach when resolving a workplace conflict?',
        options: ['Ignore the issue', 'Discuss openly and seek a solution together', 'Blame others publicly', 'Delay indefinitely'],
        correctAnswer: 'Discuss openly and seek a solution together',
        explanation: 'Open discussion and collaboration are the healthiest ways to resolve conflict.'
      }
    ]
  },
  {
    id: 'quiz-data-modeling-1',
    sessionId: 'session-data-modeling-fundamentals',
    topicId: 'dm-t2',
    title: 'Data Modeling & Entity Relationship Assessment',
    description: 'Validate your knowledge of data modeling concepts, entity relationships, normalization, and system design alignment.',
    passingScorePercent: 75,
    timeLimitMinutes: 18,
    questions: [
      {
        id: 'q1',
        type: 'MCQ' as const,
        prompt: 'In data modeling, which cardinality defines one record in a table relating to many records in another table?',
        options: ['One-to-One', 'One-to-Many', 'Many-to-Many', 'Zero-to-One'],
        correctAnswer: 'One-to-Many',
        explanation: 'One-to-many cardinality means one parent record relates to many child records.'
      },
      {
        id: 'q2',
        type: 'True / False' as const,
        prompt: 'An entity in a data model typically represents a real-world object or concept.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'Entities represent objects, concepts, or things with distinct existence in the domain.'
      },
      {
        id: 'q3',
        type: 'Fill in Blank' as const,
        prompt: 'A primary key must uniquely identify each ______ in a table.',
        options: ['row', 'column', 'schema'],
        correctAnswer: 'row',
        explanation: 'A primary key uniquely identifies each row in a table.'
      },
      {
        id: 'q4',
        type: 'MCQ' as const,
        prompt: 'Which normalization form requires that no non-key attribute depends on another non-key attribute?',
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        correctAnswer: '3NF',
        explanation: 'Third Normal Form removes transitive dependencies where non-key attributes depend on other non-key attributes.'
      },
      {
        id: 'q5',
        type: 'Multiple Select' as const,
        prompt: 'Which are common relationship types in data modeling? (Select all that apply)',
        options: ['One-to-One', 'One-to-Many', 'Many-to-Many', 'Single-to-Multi'],
        correctAnswer: ['One-to-One', 'One-to-Many', 'Many-to-Many'],
        explanation: 'Common relationships include one-to-one, one-to-many, and many-to-many.'
      },
      {
        id: 'q6',
        type: 'MCQ' as const,
        prompt: 'A logical data model is primarily concerned with which of the following?',
        options: ['Cloud provider configuration', 'Database indexing strategy', 'Entities, attributes, and relationships', 'UI component layout'],
        correctAnswer: 'Entities, attributes, and relationships',
        explanation: 'Logical models describe data elements and relationships independent of physical implementation.'
      },
      {
        id: 'q7',
        type: 'True / False' as const,
        prompt: 'ER diagrams show entities, relationships, and cardinality constraints in a data model.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'ER diagrams visualize entities, relationships, and cardinality in a data model.'
      },
      {
        id: 'q8',
        type: 'MCQ' as const,
        prompt: 'Which model type typically contains technical storage details and physical tables?',
        options: ['Conceptual model', 'Logical model', 'Physical model', 'Business model'],
        correctAnswer: 'Physical model',
        explanation: 'Physical models map logical design to actual database tables and storage details.'
      }
    ]
  },
  {
    id: 'quiz-data-fundamentals-1',
    sessionId: 'session-data-fundamentals',
    topicId: 'df-t2',
    title: 'Data Fundamentals & Analytics Foundations Quiz',
    description: 'Check your understanding of data quality, architecture, analytics tools, and modern data ecosystems.',
    passingScorePercent: 75,
    timeLimitMinutes: 18,
    questions: [
      {
        id: 'q1',
        type: 'MCQ' as const,
        prompt: 'Which architecture pattern describes bronze, silver, and gold data layers?',
        options: ['Lambda Architecture', 'Medallion Architecture', 'Star Schema', 'Data Mesh'],
        correctAnswer: 'Medallion Architecture',
        explanation: 'Medallion Architecture uses bronze, silver, and gold layers for data refinement.'
      },
      {
        id: 'q2',
        type: 'Fill in Blank' as const,
        prompt: 'Data quality includes accuracy, completeness, consistency, and ______.',
        options: ['reliability', 'performance', 'latency'],
        correctAnswer: 'reliability',
        explanation: 'Quality dimensions include accuracy, completeness, consistency, and reliability.'
      },
      {
        id: 'q3',
        type: 'True / False' as const,
        prompt: 'Data governance is responsible for policies, ownership, and data stewardship.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'Data governance defines policies, accountability, and stewardship for enterprise data.'
      },
      {
        id: 'q4',
        type: 'Multiple Select' as const,
        prompt: 'Which tools are commonly used for data analytics and reporting? (Select all that apply)',
        options: ['Power BI', 'Excel', 'Photoshop', 'Tableau'],
        correctAnswer: ['Power BI', 'Excel', 'Tableau'],
        explanation: 'Power BI, Excel, and Tableau are analytics and reporting tools.'
      },
      {
        id: 'q5',
        type: 'MCQ' as const,
        prompt: 'What is the first stage of the data lifecycle?',
        options: ['Collection', 'Storage', 'Analysis', 'Visualization'],
        correctAnswer: 'Collection',
        explanation: 'Data lifecycle begins with data collection or ingestion.'
      },
      {
        id: 'q6',
        type: 'MCQ' as const,
        prompt: 'ETL stands for Extract, Transform, and ______.',
        options: ['Load', 'Link', 'Locate', 'Launch'],
        correctAnswer: 'Load',
        explanation: 'ETL stands for Extract, Transform, Load.'
      },
      {
        id: 'q7',
        type: 'True / False' as const,
        prompt: 'Data redundancy always improves data quality.',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanation: 'Redundancy can lead to inconsistency and lower data quality when not managed.'
      },
      {
        id: 'q8',
        type: 'MCQ' as const,
        prompt: 'Which architecture is used for large-scale, cloud-native analytical systems?',
        options: ['Monolithic', 'Lakehouse', 'MVC', 'Peer-to-Peer'],
        correctAnswer: 'Lakehouse',
        explanation: 'Lakehouse architecture combines data lake flexibility with data warehouse performance.'
      }
    ]
  },
  {
    id: 'quiz-html-css-js-1',
    sessionId: 'session-html-css-js',
    topicId: 'web-t3',
    title: 'HTML, CSS & JavaScript Web Fundamentals Quiz',
    description: 'Measure your knowledge of semantic HTML, CSS layout, DOM interaction, and JavaScript behavior.',
    passingScorePercent: 80,
    timeLimitMinutes: 20,
    questions: [
      {
        id: 'q1',
        type: 'MCQ' as const,
        prompt: 'Which HTML element is best for defining the main navigation of a webpage?',
        options: ['<section>', '<nav>', '<header>', '<div>'],
        correctAnswer: '<nav>',
        explanation: 'The <nav> element semantically represents page navigation links.'
      },
      {
        id: 'q2',
        type: 'Fill in Blank' as const,
        prompt: 'A CSS class selector begins with the ______ symbol.',
        options: ['.', '#', '$'],
        correctAnswer: '.',
        explanation: 'CSS class selectors start with a dot (.) followed by the class name.'
      },
      {
        id: 'q3',
        type: 'Multiple Select' as const,
        prompt: 'Which items are part of the JavaScript event loop? (Select all that apply)',
        options: ['Call Stack', 'Microtask Queue', 'Render Tree', 'WebSocket API'],
        correctAnswer: ['Call Stack', 'Microtask Queue'],
        explanation: 'The event loop manages the call stack and microtask queue; render tree and WebSocket API are separate browser subsystems.'
      },
      {
        id: 'q4',
        type: 'True / False' as const,
        prompt: 'A const variable in JavaScript can be reassigned to a new value.',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanation: 'const variables cannot be reassigned after initialization.'
      },
      {
        id: 'q5',
        type: 'Code Output' as const,
        prompt: 'What does this JavaScript snippet log?\nconst items = [1, 2, 3];\nconst doubled = items.map(n => n * 2);\nconsole.log(doubled[1]);',
        options: ['1', '2', '4', '6'],
        correctAnswer: '4',
        explanation: 'The second item in the doubled array is 4.'
      },
      {
        id: 'q6',
        type: 'MCQ' as const,
        prompt: 'What does DOM stand for?',
        options: ['Document Object Model', 'Dynamic Object Method', 'Design Oriented Markup', 'Data Output Manager'],
        correctAnswer: 'Document Object Model',
        explanation: 'DOM stands for Document Object Model.'
      },
      {
        id: 'q7',
        type: 'MCQ' as const,
        prompt: 'Responsive web design typically uses which CSS techniques?',
        options: ['Media queries and flexbox', 'Fixed pixel widths only', 'Inline JavaScript alerts', 'Database normalization'],
        correctAnswer: 'Media queries and flexbox',
        explanation: 'Responsive design relies on media queries and flexible layouts like flexbox.'
      },
      {
        id: 'q8',
        type: 'True / False' as const,
        prompt: 'The "use strict" directive enables strict mode in JavaScript.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: '"use strict" enables stricter parsing and error handling in JavaScript.'
      }
    ]
  },
  {
    id: 'quiz-modern-data-platforms-1',
    sessionId: 'session-modern-data-platforms',
    topicId: 'mdp-t1',
    title: 'Advanced Data Platforms & Cloud Data Architecture Quiz',
    description: 'Assess your knowledge of cloud data platforms, lakehouse principles, governance, and analytics workflows.',
    passingScorePercent: 80,
    timeLimitMinutes: 20,
    questions: [
      {
        id: 'q1',
        type: 'MCQ' as const,
        prompt: 'What is the core idea of a lakehouse architecture?',
        options: ['Separate data lake and data warehouse', 'Combine data lake storage with warehouse-style governance', 'Use only relational databases', 'Replace BI with AI'],
        correctAnswer: 'Combine data lake storage with warehouse-style governance',
        explanation: 'Lakehouse architecture blends data lake storage with data warehouse management and governance.'
      },
      {
        id: 'q2',
        type: 'True / False' as const,
        prompt: 'ETL stands for Extract, Transform, and Load.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'ETL is Extract, Transform, Load.'
      },
      {
        id: 'q3',
        type: 'Multiple Select' as const,
        prompt: 'Which components are common in modern data platform architectures? (Select all that apply)',
        options: ['Data Lake', 'Metadata Catalog', 'Orchestration Engine', 'FTP Server'],
        correctAnswer: ['Data Lake', 'Metadata Catalog', 'Orchestration Engine'],
        explanation: 'Modern platforms often include data lakes, metadata catalogs, and orchestration engines; FTP is a transport mechanism, not a platform component.'
      },
      {
        id: 'q4',
        type: 'Fill in Blank' as const,
        prompt: 'Databricks is a managed service built around Apache ______.',
        options: ['Spark', 'Hadoop', 'Kafka'],
        correctAnswer: 'Spark',
        explanation: 'Databricks is built on Apache Spark for analytics and data engineering.'
      },
      {
        id: 'q5',
        type: 'MCQ' as const,
        prompt: 'Data governance primarily focuses on which of the following?',
        options: ['Visualizing dashboards', 'Securing and standardizing enterprise data', 'Writing SQL queries', 'Designing mobile apps'],
        correctAnswer: 'Securing and standardizing enterprise data',
        explanation: 'Data governance ensures data quality, security, and standards across the organization.'
      },
      {
        id: 'q6',
        type: 'True / False' as const,
        prompt: 'A data mesh architecture centralizes all data into one monolithic storage.',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanation: 'Data mesh distributes ownership and treats data as a product across domains.'
      },
      {
        id: 'q7',
        type: 'MCQ' as const,
        prompt: 'Which Azure offering is focused on integrated analytics and data engineering?',
        options: ['Azure App Service', 'Microsoft Fabric', 'Azure Blob Storage', 'Azure DevOps'],
        correctAnswer: 'Microsoft Fabric',
        explanation: 'Microsoft Fabric is an integrated platform for analytics and data engineering.'
      },
      {
        id: 'q8',
        type: 'Multiple Select' as const,
        prompt: 'Which workloads are typical for modern data platforms? (Select all that apply)',
        options: ['BI dashboards', 'Data science experiments', 'Gaming server hosting', 'Machine learning model training'],
        correctAnswer: ['BI dashboards', 'Data science experiments', 'Machine learning model training'],
        explanation: 'Modern data platforms support business intelligence, data science, and machine learning workloads.'
      }
    ]
  },
  {
    id: 'quiz-testing-1',
    sessionId: 'session-software-testing',
    topicId: 'st-t2',
    title: 'Software Testing Fundamentals Quiz',
    description: 'Review key testing principles, test planning, automation, and defect lifecycle concepts.',
    passingScorePercent: 75,
    timeLimitMinutes: 18,
    questions: [
      {
        id: 'q1',
        type: 'MCQ' as const,
        prompt: 'Which test type validates a single unit or function of code?',
        options: ['Integration testing', 'System testing', 'Unit testing', 'Acceptance testing'],
        correctAnswer: 'Unit testing',
        explanation: 'Unit testing validates individual units or components in isolation.'
      },
      {
        id: 'q2',
        type: 'True / False' as const,
        prompt: 'Regression testing ensures recent changes do not break existing functionality.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'Regression testing checks that new code changes do not introduce defects in existing behavior.'
      },
      {
        id: 'q3',
        type: 'Multiple Select' as const,
        prompt: 'Which of these are testing levels? (Select all that apply)',
        options: ['Unit', 'Integration', 'System', 'Deployment'],
        correctAnswer: ['Unit', 'Integration', 'System'],
        explanation: 'Testing levels include unit, integration, and system testing.'
      },
      {
        id: 'q4',
        type: 'Fill in Blank' as const,
        prompt: 'The defect lifecycle ends when the bug status is set to ______.',
        options: ['Closed', 'Open', 'Assigned'],
        correctAnswer: 'Closed',
        explanation: 'The defect lifecycle finishes when the issue is closed after verification.'
      },
      {
        id: 'q5',
        type: 'MCQ' as const,
        prompt: 'Which tool is commonly used for end-to-end web UI automation in modern testing?',
        options: ['Playwright', 'Photoshop', 'Excel', 'Postman'],
        correctAnswer: 'Playwright',
        explanation: 'Playwright is a browser automation tool used for web UI testing.'
      },
      {
        id: 'q6',
        type: 'True / False' as const,
        prompt: 'Smoke testing verifies core application functionality after a new build.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'Smoke tests check basic functionality before deeper testing is performed.'
      },
      {
        id: 'q7',
        type: 'MCQ' as const,
        prompt: 'Boundary value analysis focuses on test inputs around ______.',
        options: ['edge cases and limits', 'only valid data', 'UI colors', 'network speed'],
        correctAnswer: 'edge cases and limits',
        explanation: 'Boundary value analysis tests the edge cases around input limits.'
      },
      {
        id: 'q8',
        type: 'Multiple Select' as const,
        prompt: 'Which test design techniques are commonly used? (Select all that apply)',
        options: ['Equivalence partitioning', 'Boundary value analysis', 'Decision tables', 'Waterfall planning'],
        correctAnswer: ['Equivalence partitioning', 'Boundary value analysis', 'Decision tables'],
        explanation: 'Equivalence partitioning, boundary value analysis, and decision tables are common test design techniques.'
      }
    ]
  }
];

export const mockInspectMetadataMap: Record<string, InspectMetadata> = {
  'PrimaryButton': {
    id: 'primary-button',
    componentName: 'Primary Button',
    technology: 'React Functional Component with Tailwind CSS & Motion',
    backendApi: 'POST /api/auth/action or POST /api/sessions/action',
    validation: 'Requires active user session token & onClick event handler',
    businessPurpose: 'Executes high-intent user interactions such as Continuing Session, Submitting Quiz, or Publishing Session.',
    filesUsed: ['/src/components/Header.tsx', '/src/components/GT/SessionsList.tsx'],
    databaseTable: 'StudentProgress, LearningHistory',
    authentication: 'JWT Bearer Authorization Header',
    relatedLearningTopics: ['React Synthetic Events', 'Tailwind Utilities', 'REST API Client POSTs'],
    interviewQuestions: [
      'How do you prevent multiple rapid button clicks triggering duplicate API requests in React?',
      'What is the difference between controlled buttons and native HTML submit buttons?'
    ],
    bestPractices: [
      'Always reflect loading state with disabled attribute & spinner',
      'Provide clear visual hover/active feedback for accessibility (min target size 44px)'
    ]
  },
  'SessionCard': {
    id: 'session-card',
    componentName: 'Session Card Component',
    technology: 'React Card Component with Framer Motion hover transform',
    backendApi: 'GET /api/sessions/:id',
    validation: 'Session ID must exist in DB and isPublished=true for GT role',
    businessPurpose: 'Displays session thumbnail, progress percentage, category, and direct action to resume learning path.',
    filesUsed: ['/src/components/GT/SessionsList.tsx', '/src/services/api.ts'],
    databaseTable: 'Sessions, StudentProgress, Bookmarks',
    authentication: 'JWT Bearer token with Role check (GT / Admin)',
    relatedLearningTopics: ['Component Reusability', 'CSS Grid Layouts', 'Optimistic UI Updates'],
    interviewQuestions: [
      'How would you paginate or virtualize a list of 1,000 session cards for performance?',
      'How do you implement bookmarking state so it updates instantly without page reload?'
    ],
    bestPractices: [
      'Use lazy loading (loading="lazy") for session thumbnail images',
      'Maintain clear contrast ratio (>4.5:1) for text over card backgrounds'
    ]
  },
  'CircularProgressWidget': {
    id: 'circular-progress',
    componentName: 'Circular Progress Meter',
    technology: 'SVG Animated Circle Path with CSS stroke-dasharray & Recharts',
    backendApi: 'GET /api/gt/progress-summary',
    validation: 'Value normalized between 0% and 100%',
    businessPurpose: 'Provides instant visual feedback to GTs regarding their overall roadmap completion percentage.',
    filesUsed: ['/src/components/GT/GTDashboard.tsx'],
    databaseTable: 'StudentProgress, RoadmapTopics',
    authentication: 'JWT (GT Token)',
    relatedLearningTopics: ['SVG Coordinate Systems', 'CSS Stroke Animations', 'Data Aggregation'],
    interviewQuestions: [
      'How does stroke-dashoffset calculate progress in an SVG circle?',
      'Why is SVG preferred over HTML Canvas for simple progress meters?'
    ],
    bestPractices: [
      'Include accessible aria-valuenow and aria-valuemax attributes',
      'Animate smoothly from previous value to new value using CSS transitions'
    ]
  },
  'GlobalSearchInput': {
    id: 'global-search',
    componentName: 'Enterprise Search Autocomplete Bar',
    technology: 'React Controlled Input + Debounced Query Hook + Full Text Match',
    backendApi: 'GET /api/search?q={query}',
    validation: 'Query length > 1 char, debounced by 300ms',
    businessPurpose: 'Enables GTs and Admins to instantly locate topics, study PDFs, videos, and quizzes across all learning tracks.',
    filesUsed: ['/src/components/Header.tsx', '/src/components/GlobalSearchModal.tsx'],
    databaseTable: 'Sessions, Topics, StudyMaterials, QuizQuestions (PostgreSQL tsvector Index)',
    authentication: 'JWT Auth Header',
    relatedLearningTopics: ['Debouncing vs Throttling', 'Full-Text Search Indexing', 'Keyboard Accessibility (Keyboard Navigation)'],
    interviewQuestions: [
      'Why do we debounce search inputs when calling backend endpoints?',
      'How does PostgreSQL GIN indexing speed up tsvector text searches?'
    ],
    bestPractices: [
      'Support arrow keys (Up/Down) and Enter key selection for power users',
      'Highlight matching query keywords in autocomplete dropdown'
    ]
  }
};

export const mockCodeExercises: CodePlaygroundExercise[] = [
  {
    id: 'ex-1',
    title: 'C# LINQ Filtering & Transformation',
    language: 'csharp',
    difficulty: 'Intermediate',
    instructions: 'Given a list of employee salaries, write a C# LINQ query to filter salaries strictly above $70,000, sort them descending, and return a comma-separated string.',
    initialCode: `using System;
using System.Linq;
using System.Collections.Generic;

public class Program {
    public static void Main() {
        List<int> salaries = new List<int> { 55000, 82000, 95000, 68000, 110000, 72000 };
        
        // Write your LINQ query here:
        var filtered = salaries; // Fix this LINQ expression
        
        Console.WriteLine(string.Join(", ", filtered));
    }
}`,
    expectedOutput: '110000, 95000, 82000, 72000',
    solutionCode: `using System;
using System.Linq;
using System.Collections.Generic;

public class Program {
    public static void Main() {
        List<int> salaries = new List<int> { 55000, 82000, 95000, 68000, 110000, 72000 };
        
        var filtered = salaries.Where(s => s > 70000).OrderByDescending(s => s);
        
        Console.WriteLine(string.Join(", ", filtered));
    }
}`,
    hints: [
      'Use .Where(s => s > 70000) to filter items',
      'Chain .OrderByDescending(s => s) to order from highest to lowest'
    ]
  },
  {
    id: 'ex-2',
    title: 'SQL Window Function: Dense Rank',
    language: 'sql',
    difficulty: 'Intermediate',
    instructions: 'Write a SQL query using DENSE_RANK() OVER (PARTITION BY DepartmentId ORDER BY Salary DESC) to rank employees within each department.',
    initialCode: `SELECT 
    EmployeeId,
    Name,
    DepartmentId,
    Salary,
    -- Add DENSE_RANK() window function here:
    1 AS RankWithinDept
FROM Employees;`,
    expectedOutput: 'EmployeeId | Name | DepartmentId | Salary | RankWithinDept',
    solutionCode: `SELECT 
    EmployeeId,
    Name,
    DepartmentId,
    Salary,
    DENSE_RANK() OVER (PARTITION BY DepartmentId ORDER BY Salary DESC) AS RankWithinDept
FROM Employees;`,
    hints: [
      'Use OVER (PARTITION BY DepartmentId ORDER BY Salary DESC)',
      'DENSE_RANK() handles duplicate values without leaving rank gaps'
    ]
  },
  {
    id: 'ex-3',
    title: 'JavaScript Async Fetch & Error Handling',
    language: 'javascript',
    difficulty: 'Beginner',
    instructions: 'Write an async function getStudentData(studentId) that fetches data and handles errors gracefully.',
    initialCode: `async function getStudentData(studentId) {
  try {
    // Implement fetch and json conversion here:
    const response = { ok: true, json: async () => ({ id: studentId, status: "Active" }) };
    const data = await response.json();
    return data;
  } catch (err) {
    return { error: err.message };
  }
}

getStudentData(101).then(res => console.log(JSON.stringify(res)));`,
    expectedOutput: '{"id":101,"status":"Active"}',
    solutionCode: `async function getStudentData(studentId) {
  try {
    const response = { ok: true, json: async () => ({ id: studentId, status: "Active" }) };
    const data = await response.json();
    return data;
  } catch (err) {
    return { error: err.message };
  }
}

getStudentData(101).then(res => console.log(JSON.stringify(res)));`,
    hints: [
      'Always wrap network calls inside try-catch blocks',
      'Check response.ok before attempting to parse response.json()'
    ]
  }
];



export const mockDiscussions: DiscussionPost[] = [
  {
    id: 'disc-1',
    sessionId: 'session-dotnet',
    authorName: 'David Kim',
    authorRole: 'GT',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    title: 'When should I use AddScoped vs AddTransient in ASP.NET Core DI?',
    body: 'I am building a DbContext repository wrapper. Should I register it as Scoped or Transient? What happens if I inject a Scoped service into a Singleton?',
    createdAt: '2 hours ago',
    upvotes: 12,
    replies: [
      {
        id: 'rep-1',
        authorName: 'Sarah Jenkins (Lead Architect)',
        authorRole: 'Admin',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        body: 'DbContext is NOT thread-safe and should ALWAYS be registered as AddScoped (one per HTTP request). Injecting a Scoped service into a Singleton creates a "Captive Dependency" and will cause concurrency memory corruption!',
        createdAt: '1 hour ago',
        isAnswer: true
      },
      {
        id: 'rep-2',
        authorName: 'Alex Vance',
        authorRole: 'GT',
        body: 'Thanks Sarah! That explains why ASP.NET Core throws a CaptiveDependency error during startup in Development mode.',
        createdAt: '30 mins ago'
      }
    ]
  }
];

export const mockPersonalNotes: PersonalNote[] = [
  {
    id: 'note-1',
    sessionId: 'session-dotnet',
    topicId: 'dotnet-t4',
    topicTitle: 'Async Programming & Exception Handling',
    content: 'Always pass CancellationToken down to async database queries (.ToListAsync(cancellationToken)). Avoid async void in methods except event handlers.',
    highlightedText: 'Avoid async void in methods except event handlers',
    createdAt: '2026-07-31 10:20',
    updatedAt: '2026-07-31 10:20'
  }
];



export const mockSessionTrackerRecords: SessionTrackerRecord[] = [
  {
    id: 'track-101',
    sessionCode: 'SESS-NET-01',
    sessionName: '.NET with C# Foundation & Enterprise Architecture',
    category: '.NET with C#',
    trainerName: 'Sarah Jenkins',
    scheduleDate: '2026-08-05',
    scheduleTime: '09:00 AM - 12:00 PM',
    durationHours: 12,
    status: 'In Progress',
    enrolledCount: 38,
    maxCapacity: 40,
    completionRatePercent: 75,
    materialsLink: 'https://github.com/gt-learning/dotnet-curriculum',
    recordingLink: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    notes: 'Covers C# 12 features, Dependency Injection, and Entity Framework Core 8.',
    lastUpdated: '2026-08-03'
  },
  {
    id: 'track-102',
    sessionCode: 'SESS-INS-02',
    sessionName: 'Insurance Domain Fundamentals & Underwriting',
    category: 'Insurance',
    trainerName: 'David Miller',
    scheduleDate: '2026-08-08',
    scheduleTime: '01:00 PM - 04:00 PM',
    durationHours: 10,
    status: 'Scheduled',
    enrolledCount: 40,
    maxCapacity: 40,
    completionRatePercent: 45,
    materialsLink: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    recordingLink: '',
    notes: 'Key domain topics: Policy Lifecycle, Claims Processing, Reinsurance & Actuarial Basics.',
    lastUpdated: '2026-08-02'
  },
  {
    id: 'track-103',
    sessionCode: 'SESS-SQL-03',
    sessionName: 'SQL Database Modelling & Performance Tuning',
    category: 'SQL',
    trainerName: 'Michael Chang',
    scheduleDate: '2026-08-01',
    scheduleTime: '10:00 AM - 01:00 PM',
    durationHours: 14,
    status: 'Completed',
    enrolledCount: 35,
    maxCapacity: 35,
    completionRatePercent: 92,
    materialsLink: 'https://github.com/gt-learning/sql-optimization',
    recordingLink: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    notes: 'All participants completed final hands-on query tuning assessment.',
    lastUpdated: '2026-08-01'
  },
  {
    id: 'track-104',
    sessionCode: 'SESS-FED-04',
    sessionName: 'Modern Frontend Development with React & Tailwind',
    category: 'Frontend',
    trainerName: 'Elena Rostova',
    scheduleDate: '2026-08-12',
    scheduleTime: '09:30 AM - 12:30 PM',
    durationHours: 16,
    status: 'Scheduled',
    enrolledCount: 32,
    maxCapacity: 40,
    completionRatePercent: 20,
    materialsLink: 'https://react.dev',
    notes: 'Focus on React 18 hooks, state synchronization, and accessible enterprise UI components.',
    lastUpdated: '2026-08-03'
  },
  {
    id: 'track-105',
    sessionCode: 'SESS-C2C-05',
    sessionName: 'Campus to Corporate (C2C) Professional Readiness',
    category: 'Campus to Corporate',
    trainerName: 'Rachel Green',
    scheduleDate: '2026-07-28',
    scheduleTime: '02:00 PM - 05:00 PM',
    durationHours: 8,
    status: 'Completed',
    enrolledCount: 40,
    maxCapacity: 40,
    completionRatePercent: 98,
    materialsLink: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    notes: 'Enterprise etiquette, agile communication, and project team dynamics.',
    lastUpdated: '2026-07-28'
  }
];
