import {
  Session,
  User,
  Badge,
  Announcement,
  AppNotification,
  CodePlaygroundExercise,
  KnowledgeGraphNode,
  InspectMetadata,
  PersonalNote,
  DiscussionPost,
  Certificate,
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

export const mockBadges: Badge[] = [
  {
    id: 'b-1',
    title: '.NET Champion',
    description: 'Scored over 90% in C# & ASP.NET Core quizzes',
    icon: 'Award',
    earnedDate: '2026-07-20',
    category: '.NET',
    isEarned: true
  },
  {
    id: 'b-2',
    title: 'SQL Master',
    description: 'Completed Database Modelling & Complex Joins',
    icon: 'Database',
    earnedDate: '2026-07-25',
    category: 'SQL',
    isEarned: true
  },
  {
    id: 'b-3',
    title: 'API Explorer',
    description: 'Designed 5 RESTful endpoints & passed security checks',
    icon: 'Server',
    earnedDate: '2026-07-29',
    category: 'Backend',
    isEarned: true
  },
  {
    id: 'b-4',
    title: 'Frontend Expert',
    description: 'Mastered React Hooks, Tailwind CSS & State Sync',
    icon: 'Layout',
    earnedDate: '2026-07-30',
    category: 'Frontend',
    isEarned: true
  },
  {
    id: 'b-5',
    title: 'Insurance Specialist',
    description: 'Passed Corporate Insurance Underwriting & Claims Module',
    icon: 'ShieldCheck',
    earnedDate: undefined,
    category: 'Domain',
    isEarned: false
  },
  {
    id: 'b-6',
    title: 'Azure Cloud Hero',
    description: 'Deployed multi-container app on Azure App Services',
    icon: 'Cloud',
    earnedDate: undefined,
    category: 'Cloud',
    isEarned: false
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Batch 2026 Mid-Term Hackathon Announced!',
    content: 'Get ready for the 48-hour Full Stack Insurance portal challenge starting next Monday. Form teams of 3 GTs.',
    date: '2026-08-01',
    author: 'Chief Learning Officer - Enterprise L&D',
    important: true
  },
  {
    id: 'ann-2',
    title: 'New Azure & Microservices Deep Dive Materials Added',
    content: 'Admin team updated Azure DevOps deployment pipelines and API Gateway patterns in Module 8.',
    date: '2026-07-29',
    author: 'Admin L&D Team',
    important: false
  },
  {
    id: 'ann-3',
    title: 'Weekly Mentor Office Hours with Principal Architects',
    content: 'Join every Thursday at 4 PM IST for live Q&A on System Design & Clean Architecture.',
    date: '2026-07-25',
    author: 'Senior Mentor Team',
    important: false
  }
];

export const mockNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'New Quiz Assigned',
    message: 'ASP.NET Core Dependency Injection & Middleware Quiz is now live.',
    timestamp: '10 mins ago',
    type: 'quiz',
    read: false,
    linkSessionId: 'session-dotnet'
  },
  {
    id: 'notif-2',
    title: 'Study Material Updated',
    message: 'Version 2.1 of Insurance Domain Fundamentals PPT uploaded by L&D.',
    timestamp: '1 hour ago',
    type: 'material',
    read: false,
    linkSessionId: 'session-insurance'
  },
  {
    id: 'notif-3',
    title: 'Roadmap Milestone Unlocked',
    message: 'Congratulations! You unlocked "Microservices Architecture & Event Sourcing".',
    timestamp: 'Yesterday',
    type: 'roadmap',
    read: true,
    linkSessionId: 'session-microservices'
  }
];

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
    isBookmarked: true,
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
    isBookmarked: true,
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
    isBookmarked: true,
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
    isBookmarked: false,
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
        title: 'Productivity, Communication & Growth',
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
      },
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
    isBookmarked: false,
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
      },
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
    isBookmarked: false,
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
      },
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
    isBookmarked: false,
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
        title: 'Web Development Foundations',
        order: 1,
        status: 'Completed',
        description: 'Learning HTML page structures and CSS styling fundamentals.',
        subtopics: [
          { id: 'webst-1', title: 'HTML Structure & Semantic Tags', durationMinutes: 60, status: 'Completed' },
          { id: 'webst-2', title: 'CSS Layouts & Responsive Design', durationMinutes: 75, status: 'Completed' }
        ]
      },
      {
        id: 'web-t2',
        title: 'JavaScript Essentials',
        order: 2,
        status: 'Completed',
        description: 'Core JavaScript programming concepts and browser interactivity.',
        subtopics: [
          { id: 'webst-3', title: 'Functions, Loops & DOM Manipulation', durationMinutes: 90, status: 'Completed' },
          { id: 'webst-4', title: 'Event Loop, Closures & Async Programming', durationMinutes: 90, status: 'Completed' }
        ]
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
    isBookmarked: false,
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
        title: 'Enterprise Data Architecture',
        order: 1,
        status: 'Completed',
        description: 'Understanding modern data platforms and advanced modeling concepts.',
        subtopics: [
          { id: 'mdpst-1', title: 'Conceptual, Logical & Physical Models', durationMinutes: 60, status: 'Completed' },
          { id: 'mdpst-2', title: 'Data Lakes, Warehouses & Lakehouses', durationMinutes: 75, status: 'Completed' }
        ]
      },
      {
        id: 'mdp-t2',
        title: 'Modern Data Ecosystem',
        order: 2,
        status: 'Completed',
        description: 'Learning ETL, analytics, governance, and cloud technologies.',
        subtopics: [
          { id: 'mdpst-3', title: 'Azure Data Factory, Fabric & Databricks', durationMinutes: 90, status: 'Completed' },
          { id: 'mdpst-4', title: 'Data Governance, AI & Visualization', durationMinutes: 90, status: 'Completed' }
        ]
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
    isBookmarked: false,
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
        title: 'Introduction to Software Testing',
        order: 1,
        status: 'Completed',
        description: 'Understanding software quality, the need for testing, and various testing methodologies used in modern software projects.',
        subtopics: [
          { id: 'stst-1', title: 'Why Testing is Necessary', durationMinutes: 45, status: 'Completed' },
          { id: 'stst-2', title: 'Types of Testing (Functional & Non-Functional)', durationMinutes: 60, status: 'Completed' }
        ]
      },
      {
        id: 'st-t2',
        title: 'Test Design & Execution',
        order: 2,
        status: 'Completed',
        description: 'Learning how to create effective test scenarios and test cases using industry-standard test design techniques.',
        subtopics: [
          { id: 'stst-3', title: 'Test Scenario Identification', durationMinutes: 45, status: 'Completed' },
          { id: 'stst-4', title: 'Test Case Design Techniques', durationMinutes: 60, status: 'Completed' },
          { id: 'stst-5', title: 'Equivalence Partitioning', durationMinutes: 45, status: 'Completed' },
          { id: 'stst-6', title: 'Boundary Value Analysis', durationMinutes: 45, status: 'Completed' }
        ]
      },
      {
        id: 'st-t3',
        title: 'Defect Management',
        order: 3,
        status: 'Completed',
        description: 'Understanding bug tracking, reporting, and the defect life cycle followed in software development projects.',
        subtopics: [
          { id: 'stst-7', title: 'Defect Identification & Reporting', durationMinutes: 45, status: 'Completed' },
          { id: 'stst-8', title: 'Defect Life Cycle & Status Workflow', durationMinutes: 60, status: 'Completed' }
        ]
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
    title: 'C# Async/Await & Concurrency Assessment',
    passingScorePercent: 80,
    timeLimitMinutes: 15,
    questions: [
      {
        id: 'q1',
        type: 'MCQ' as const,
        prompt: 'What happens when you call an async method without the "await" keyword in C#?',
        options: [
          'The code throws a runtime InvalidOperationException.',
          'The method executes asynchronously in the background, and execution continues immediately without waiting.',
          'The compiler prevents compilation with a fatal syntax error.',
          'The method automatically runs synchronously on the main thread.'
        ],
        correctAnswer: 'The method executes asynchronously in the background, and execution continues immediately without waiting.',
        explanation: 'Omitting "await" causes the call to return a Task immediately and run concurrently in the background, triggering a compiler warning CS4014.'
      },
      {
        id: 'q2',
        type: 'Multiple Select' as const,
        prompt: 'Which of the following are valid IOC Container lifetimes in ASP.NET Core Dependency Injection? (Select all that apply)',
        options: [
          'Transient (New instance every request for service)',
          'Scoped (One instance per HTTP Request)',
          'Singleton (Single instance across application lifetime)',
          'ThreadStatic (One instance per OS Thread)'
        ],
        correctAnswer: [
          'Transient (New instance every request for service)',
          'Scoped (One instance per HTTP Request)',
          'Singleton (Single instance across application lifetime)'
        ],
        explanation: 'ASP.NET Core DI natively supports Transient, Scoped, and Singleton service lifetimes.'
      },
      {
        id: 'q3',
        type: 'Fill in Blank' as const,
        prompt: 'Fill in the missing C# keyword used to safely release unmanaged resources automatically when exiting a code block scope: ______ (using / lock / checked)',
        options: ['using', 'lock', 'checked'],
        correctAnswer: 'using',
        explanation: 'The "using" statement or using declaration ensures Dispose() is called on IDisposable objects.'
      },
      {
        id: 'q4',
        type: 'Code Output' as const,
        prompt: 'What is the output of the following C# code snippet?',
        codeSnippet: `int x = 5;
Func<int, int> func = val => val * 2;
x = 10;
Console.WriteLine(func(x));`,
        options: ['10', '20', '5', '0'],
        correctAnswer: '20',
        explanation: 'The delegate accepts the parameter "val" which is passed x=10 at runtime, returning 10 * 2 = 20.'
      },
      {
        id: 'q5',
        type: 'True / False' as const,
        prompt: 'In Entity Framework Core, IQueryable queries execute immediately on the database as soon as the LINQ statement is declared.',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanation: 'IQueryable uses deferred execution. The query is only sent to the database when enumerated or materialized (e.g. .ToListAsync(), .FirstOrDefaultAsync()).'
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

export const mockKnowledgeGraphNodes: KnowledgeGraphNode[] = [
  {
    id: 'n-dotnet-core',
    label: '.NET 8 Core Runtime',
    category: '.NET with C#',
    description: 'Foundation runtime engine, CLR, garbage collection, and cross-platform architecture.',
    prerequisites: []
  },
  {
    id: 'n-csharp-oop',
    label: 'C# OOP & SOLID',
    category: '.NET with C#',
    description: 'Object-oriented programming, interfaces, abstraction, and SOLID design rules.',
    prerequisites: ['n-dotnet-core']
  },
  {
    id: 'n-aspnet-api',
    label: 'ASP.NET Core REST API',
    category: 'API Development',
    description: 'Web API controllers, routing, dependency injection, and middleware pipeline.',
    prerequisites: ['n-csharp-oop']
  },
  {
    id: 'n-ef-core',
    label: 'Entity Framework Core',
    category: 'SQL',
    description: 'ORM code-first data mapping, LINQ query provider, DbContext, and migrations.',
    prerequisites: ['n-csharp-oop', 'n-sql-basics']
  },
  {
    id: 'n-sql-basics',
    label: 'SQL & Database Design',
    category: 'SQL',
    description: 'Relational 3NF normalization, DDL/DML, constraints, indexing, and joins.',
    prerequisites: []
  },
  {
    id: 'n-react-ts',
    label: 'React & TypeScript',
    category: 'Frontend',
    description: 'Component architecture, Hooks, strict type interfaces, and state management.',
    prerequisites: []
  },
  {
    id: 'n-microservices',
    label: 'Microservices & Gateway',
    category: 'Microservices',
    description: 'Event-driven messaging, Ocelot API Gateway, and distributed transaction outbox.',
    prerequisites: ['n-aspnet-api', 'n-ef-core']
  },
  {
    id: 'n-azure-devops',
    label: 'Azure Cloud & CI/CD',
    category: 'Azure',
    description: 'App Services, Azure Pipelines, Docker containers, and Key Vault integration.',
    prerequisites: ['n-aspnet-api', 'n-react-ts']
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

export const mockCertificates: Certificate[] = [
  {
    id: 'cert-101',
    certificateId: 'CERT-GT-2026-DOTNET-8821',
    studentName: 'Alex Vance',
    trackName: '.NET with C# Enterprise Architecture',
    issuedDate: 'July 30, 2026',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=VERIFIED-CERT-8821'
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
