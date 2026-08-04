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
  Certificate
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
          { id: 'st-1', title: 'NET Ecosystem & CLR', durationMinutes: 20, status: 'Completed' },
          { id: 'st-2', title: 'Variables, Constants & Data Types', durationMinutes: 30, status: 'Completed' },
          { id: 'st-3', title: 'Control Flow & Loops', durationMinutes: 25, status: 'Completed' }
        ]
      },
      {
        id: 'dotnet-t2',
        title: 'Object-Oriented Programming (OOP)',
        order: 2,
        status: 'Completed',
        description: 'Classes, Objects, Encapsulation, Inheritance, Polymorphism, Abstraction, and Interfaces.',
        subtopics: [
          { id: 'st-4', title: 'Classes, Structs & Records', durationMinutes: 45, status: 'Completed' },
          { id: 'st-5', title: 'Inheritance & Polymorphism', durationMinutes: 40, status: 'Completed' },
          { id: 'st-6', title: 'Interfaces & Abstract Classes', durationMinutes: 35, status: 'Completed' }
        ]
      },
      {
        id: 'dotnet-t3',
        title: 'Collections & LINQ',
        order: 3,
        status: 'Completed',
        description: 'Generic Collections, Delegates, Lambda Expressions, Deferred Execution, and LINQ Query Operators.',
        subtopics: [
          { id: 'st-7', title: 'List, Dictionary & HashSet', durationMinutes: 30, status: 'Completed' },
          { id: 'st-8', title: 'Delegates & Events', durationMinutes: 40, status: 'Completed' },
          { id: 'st-9', title: 'LINQ Query Syntaxes & Method Chaining', durationMinutes: 50, status: 'Completed' }
        ]
      },
      {
        id: 'dotnet-t4',
        title: 'Async Programming & Exception Handling',
        order: 4,
        status: 'In Progress',
        description: 'Async/Await pattern, Task Parallel Library (TPL), CancellationTokens, custom exception filters.',
        subtopics: [
          { id: 'st-10', title: 'Task & Async/Await Under the Hood', durationMinutes: 45, status: 'Completed' },
          { id: 'st-11', title: 'Handling Race Conditions & SemaphoreSlim', durationMinutes: 35, status: 'In Progress' },
          { id: 'st-12', title: 'Global Exception Middleware', durationMinutes: 30, status: 'Unlocked' }
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
        title: 'Introduction to Insurance & Risk Transfer',
        order: 1,
        status: 'Completed',
        description: 'Concept of Risk Pooling, Moral Hazard, Adverse Selection, and Insurance Market Ecosystem.',
        subtopics: [
          { id: 'ist-1', title: 'Core Principles of Insurance', durationMinutes: 30, status: 'Completed' },
          { id: 'ist-2', title: 'Types of Coverage: P&C vs Life & Health', durationMinutes: 40, status: 'Completed' }
        ]
      },
      {
        id: 'ins-t2',
        title: 'Underwriting & Policy Administration',
        order: 2,
        status: 'In Progress',
        description: 'Risk Assessment, Premium Calculation Rate Making, Binder Issuance, Policy Renewals & Endorsements.',
        subtopics: [
          { id: 'ist-3', title: 'Underwriting Guidelines & Actuarial Basics', durationMinutes: 50, status: 'Completed' },
          { id: 'ist-4', title: 'Policy Lifecycle Management System Architecture', durationMinutes: 45, status: 'In Progress' }
        ]
      }
    ]
  },
  {
    id: 'session-sql',
    name: 'SQL & Relational Database Engineering',
    category: 'SQL',
    trainerName: 'Janani',
    description: 'PostgreSQL & SQL Server mastery: Schema Normalization, Complex Joins, CTEs, Window Functions, Indexing strategies, Stored Procedures, and Query Optimization.',
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
        title: 'Relational Schema Design & Normalization',
        order: 1,
        status: 'Completed',
        description: '1NF, 2NF, 3NF, BCNF, Primary Keys, Composite Keys, Foreign Key CASCADE constraints.',
        subtopics: [
          { id: 'sqlst-1', title: 'Database Normalization Rules', durationMinutes: 40, status: 'Completed' },
          { id: 'sqlst-2', title: 'DDL Constraints & Data Types', durationMinutes: 30, status: 'Completed' }
        ]
      },
      {
        id: 'sql-t2',
        title: 'Advanced Querying & Window Functions',
        order: 2,
        status: 'In Progress',
        description: 'CTEs (Common Table Expressions), Recursive CTEs, Partitioning, Window Aggregates.',
        subtopics: [
          { id: 'sqlst-3', title: 'Joins, Subqueries & CTEs', durationMinutes: 50, status: 'Completed' },
          { id: 'sqlst-4', title: 'Window Functions OVER (PARTITION BY)', durationMinutes: 60, status: 'In Progress' }
        ]
      }
    ]
  },
  {
    id: 'session-c2c',
    name: 'Campus to Corporate',
    category: 'C2C',
    trainerName: 'Mayford Gomes',
    description: 'Corporate transition readiness, executive communication, Agile & Scrum methodologies, business etiquette, teamwork, workplace ethics, and professional presentation mastery.',
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
        title: 'Corporate Culture & Workplace Communication',
        order: 1,
        status: 'Completed',
        description: 'Email etiquette, active listening, structured thinking, and professional conduct.',
        subtopics: [
          { id: 'c2cst-1', title: 'Business Communication Essentials', durationMinutes: 30, status: 'Completed' },
          { id: 'c2cst-2', title: 'Workplace Ethics & Governance', durationMinutes: 30, status: 'Completed' }
        ]
      },
      {
        id: 'c2c-t2',
        title: 'Agile Mindset & Collaboration',
        order: 2,
        status: 'In Progress',
        description: 'Scrum ceremonies, sprint planning, Jira ticket management, and cross-functional teamwork.',
        subtopics: [
          { id: 'c2cst-3', title: 'Scrum Ceremonies & Daily Standups', durationMinutes: 40, status: 'In Progress' }
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
