import { 
  KnowledgeHubTopic, 
  KnowledgeHubDiscussion, 
  KnowledgeHubDocument, 
  KnowledgeHubChatMessage, 
  ReputationProfile,
  User
} from '../types';

export const initialTopics: KnowledgeHubTopic[] = [
  {
    id: 'topic-dotnet',
    name: '.NET',
    slug: 'dotnet',
    iconName: 'Layers',
    description: 'ASP.NET Core Web APIs, Entity Framework Core, Dependency Injection, Middleware, and Modern C# 12 features. Trainer: Santhosh.',
    color: 'from-blue-600 to-indigo-600',
    membersCount: 156,
    discussionsCount: 45,
    documentsCount: 18,
    isJoined: true,
    isFollowed: true,
    isBookmarked: true,
    notifyPreferences: 'all',
    channels: [
      { id: 'chan-dotnet-gen', topicId: 'topic-dotnet', name: 'General .NET', description: 'ASP.NET Core and .NET Ecosystem' },
      { id: 'chan-dotnet-ef', topicId: 'topic-dotnet', name: 'EF Core & ORM', description: 'Entity Framework Core queries and migrations' },
      { id: 'chan-dotnet-sec', topicId: 'topic-dotnet', name: 'API Security & Auth', description: 'JWT, OAuth2, Rate limiting, CORS' }
    ]
  },
  {
    id: 'topic-insurance',
    name: 'Insurance',
    slug: 'insurance',
    iconName: 'ShieldAlert',
    description: 'Property & Casualty (P&C), Underwriting guidelines, Policy Administration Systems, and Claims Processing. Trainer: Harish.',
    color: 'from-emerald-600 to-teal-600',
    membersCount: 128,
    discussionsCount: 34,
    documentsCount: 15,
    isJoined: true,
    isFollowed: true,
    isBookmarked: true,
    notifyPreferences: 'all',
    channels: [
      { id: 'chan-ins-gen', topicId: 'topic-insurance', name: 'Domain Overview', description: 'P&C, Life, and Reinsurance fundamentals' },
      { id: 'chan-ins-claims', topicId: 'topic-insurance', name: 'Claims Workflows', description: 'FNOL, Adjuster estimation, and Settlement' }
    ]
  },
  {
    id: 'topic-datamodeling',
    name: 'Data Modeling',
    slug: 'data-modeling',
    iconName: 'Database',
    description: 'Relational Database Schema Design, 3NF Normalization, Indexing strategies, Window Functions, and Query Optimization. Trainer: Janani.',
    color: 'from-amber-600 to-orange-600',
    membersCount: 140,
    discussionsCount: 38,
    documentsCount: 16,
    isJoined: true,
    isFollowed: true,
    isBookmarked: true,
    notifyPreferences: 'all',
    channels: [
      { id: 'chan-sql-gen', topicId: 'topic-datamodeling', name: 'SQL & T-SQL', description: 'PostgreSQL & SQL Server queries' },
      { id: 'chan-sql-opt', topicId: 'topic-datamodeling', name: 'Schema Normalization', description: '3NF, Execution plans, Clustered Indexes' }
    ]
  },
  {
    id: 'topic-c2c',
    name: 'C2C',
    slug: 'c2c',
    iconName: 'Users',
    description: 'Campus to Corporate transition: Professional Communication, Agile/Scrum ceremonies, Workplace Ethics, and Presentation Mastery. Trainer: Mayford Gomes.',
    color: 'from-purple-600 to-violet-600',
    membersCount: 162,
    discussionsCount: 42,
    documentsCount: 12,
    isJoined: true,
    isFollowed: true,
    isBookmarked: false,
    notifyPreferences: 'all',
    channels: [
      { id: 'chan-c2c-gen', topicId: 'topic-c2c', name: 'Corporate Communication', description: 'Email etiquette, client presentations, active listening' },
      { id: 'chan-c2c-agile', topicId: 'topic-c2c', name: 'Agile & Scrum Squads', description: 'Sprint planning, Jira ticketing, Daily standups' }
    ]
  }
];

export const initialDiscussions: KnowledgeHubDiscussion[] = [
  {
    id: 'disc-1',
    title: 'How to avoid memory leaks with IDisposable & Async Streams in C#?',
    description: 'When consuming an IAsyncEnumerable stream with unmanaged resources or DB connections, what is the best practice to ensure proper disposal even when an exception is thrown mid-stream?',
    topicId: 'topic-csharp',
    topicName: 'C#',
    tags: ['Async', 'MemoryManagement', 'IDisposable', 'Streams'],
    priority: 'High',
    state: 'Answered',
    authorId: 'gt-101',
    authorName: 'Alex Vance',
    authorRole: 'GT',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    batch: 'Batch 2026',
    createdAt: '2 hours ago',
    upvotes: 18,
    downvotes: 1,
    userVote: 'up',
    isBookmarked: true,
    viewsCount: 142,
    acceptedAnswerId: 'ans-101',
    sessionId: 'session-1', // Linked to .NET Memory Profiling session
    attachments: [
      {
        id: 'att-1',
        name: 'AsyncStreamLeakDemo.cs',
        size: '14 KB',
        type: 'txt',
        url: '#'
      }
    ],
    answers: [
      {
        id: 'ans-101',
        discussionId: 'disc-1',
        authorId: 'mentor-201',
        authorName: 'David Miller',
        authorRole: 'Mentor',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        body: 'You should use `await using` construct combined with `IAsyncDisposable`. In C# 8+, `await foreach` automatically calls `DisposeAsync()` on the enumerator if an exception occurs.',
        codeSnippet: `await using var dbContext = new AppDbContext();
var activeUsers = dbContext.Users.Where(x => x.IsActive).AsAsyncEnumerable();

await foreach (var user in activeUsers)
{
    // Process stream safely with auto-disposal on error
    await ProcessUserAsync(user);
}`,
        createdAt: '1 hour ago',
        upvotes: 24,
        downvotes: 0,
        userVote: 'up',
        isAccepted: true,
        comments: [
          {
            id: 'comm-101',
            parentId: 'ans-101',
            authorName: 'Alex Vance',
            authorRole: 'GT',
            body: '@David Miller Thanks! Does this also hold true when passing CancellationToken to WithCancellation()?',
            createdAt: '45 mins ago'
          },
          {
            id: 'comm-102',
            parentId: 'ans-101',
            authorName: 'David Miller',
            authorRole: 'Mentor',
            body: 'Yes! `[EnumeratorCancellation]` attribute on the IAsyncEnumerable method propagates cancellation seamlessly.',
            createdAt: '30 mins ago'
          }
        ]
      }
    ],
    comments: [
      {
        id: 'comm-201',
        parentId: 'disc-1',
        authorName: 'Sarah Jenkins',
        authorRole: 'Trainer',
        body: 'Great question Alex! This is a common topic in our .NET Memory Profiling lab.',
        createdAt: '1 hour ago'
      }
    ]
  },
  {
    id: 'disc-2',
    title: 'How to configure Azure Key Vault secret rotation safely in ASP.NET Core Web API?',
    description: 'We are storing database connection strings and OAuth client secrets in Azure Key Vault. What is the recommended strategy to pick up rotated secrets without restarting the App Service container?',
    topicId: 'topic-azure',
    topicName: 'Azure',
    tags: ['KeyVault', 'ASP.NET Core', 'Security', 'SecretRotation'],
    priority: 'Critical',
    state: 'In Progress',
    authorId: 'gt-104',
    authorName: 'Marcus Wright',
    authorRole: 'GT',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    batch: 'Batch 2026',
    createdAt: '4 hours ago',
    upvotes: 12,
    downvotes: 0,
    userVote: null,
    isBookmarked: false,
    viewsCount: 98,
    sessionId: 'session-5', // Azure Cloud deployment session
    attachments: [
      {
        id: 'att-2',
        name: 'KeyVaultRotationDiagram.png',
        size: '240 KB',
        type: 'png',
        url: '#'
      }
    ],
    answers: [
      {
        id: 'ans-102',
        discussionId: 'disc-2',
        authorId: 'trainer-301',
        authorName: 'Elena Rostova',
        authorRole: 'Trainer',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        body: 'You can use Azure App Configuration with Key Vault references and configure reloading using `IOptionsSnapshot<T>` or Azure App Configuration Sentinel refresh interval.',
        codeSnippet: `builder.Configuration.AddAzureAppConfiguration(options =>
{
    options.Connect(builder.Configuration["ConnectionStrings:AppConfig"])
           .ConfigureKeyVault(kv => kv.SetCredential(new DefaultAzureCredential()))
           .Select(KeyFilter.Any)
           .ConfigureRefresh(refresh =>
           {
               refresh.Register("TestApp:Settings:Sentinel", refreshAll: true)
                      .SetCacheExpiration(TimeSpan.FromMinutes(5));
           });
});`,
        createdAt: '2 hours ago',
        upvotes: 15,
        downvotes: 0,
        isAccepted: false,
        comments: []
      }
    ],
    comments: []
  },
  {
    id: 'disc-3',
    title: 'Best practices for React state management: Context API vs Zustand in enterprise applications',
    description: 'When building large enterprise dashboards with frequent signal updates, does React Context cause excessive re-renders compared to lightweight stores like Zustand?',
    topicId: 'topic-react',
    topicName: 'React',
    tags: ['React', 'StateManagement', 'Performance', 'Hooks'],
    priority: 'Medium',
    state: 'Resolved',
    authorId: 'gt-108',
    authorName: 'Priya Sharma',
    authorRole: 'GT',
    batch: 'Batch 2026',
    createdAt: '1 day ago',
    upvotes: 21,
    downvotes: 0,
    userVote: 'up',
    isBookmarked: true,
    viewsCount: 210,
    acceptedAnswerId: 'ans-103',
    sessionId: 'session-3',
    answers: [
      {
        id: 'ans-103',
        discussionId: 'disc-3',
        authorId: 'mentor-202',
        authorName: 'Michael Chang',
        authorRole: 'Mentor',
        body: 'Yes, React Context triggers re-renders for all consumer components whenever any property in the value object changes. Zustand uses selector subscriptions so components only re-render when their specific selected primitive slice changes.',
        codeSnippet: `// Zustand selector example - only re-renders when count changes
const count = useStore((state) => state.count);`,
        createdAt: '18 hours ago',
        upvotes: 29,
        downvotes: 0,
        isAccepted: true,
        comments: []
      }
    ],
    comments: []
  },
  {
    id: 'disc-4',
    title: 'Optimizing SQL query performance: Non-clustered index vs Filtered Index for claims processing',
    description: 'We have a table with 5 million claim records. 90% of queries focus on claims with `Status = "PENDING"`. Should we create a full index or a filtered index on `WHERE Status = "PENDING"`?',
    topicId: 'topic-sql',
    topicName: 'SQL',
    tags: ['Indexing', 'PerformanceTuning', 'InsuranceDomain', 'SQLServer'],
    priority: 'High',
    state: 'Answered',
    authorId: 'gt-101',
    authorName: 'Alex Vance',
    authorRole: 'GT',
    batch: 'Batch 2026',
    createdAt: '2 days ago',
    upvotes: 16,
    downvotes: 0,
    viewsCount: 175,
    acceptedAnswerId: 'ans-104',
    sessionId: 'session-4',
    answers: [
      {
        id: 'ans-104',
        discussionId: 'disc-4',
        authorId: 'mentor-201',
        authorName: 'David Miller',
        authorRole: 'Mentor',
        body: 'A Filtered Index is significantly better here! It drastically reduces index maintenance cost on INSERT/UPDATE for non-pending rows and keeps index size compact in memory.',
        codeSnippet: `CREATE NONCLUSTERED INDEX IX_Claims_Pending
ON dbo.InsuranceClaims (ClaimDate, PolicyId, ClaimAmount)
INCLUDE (CustomerName)
WHERE Status = 'PENDING';`,
        createdAt: '1 day ago',
        upvotes: 22,
        downvotes: 0,
        isAccepted: true,
        comments: []
      }
    ],
    comments: []
  }
];

export const initialDocuments: KnowledgeHubDocument[] = [
  {
    id: 'doc-1',
    name: 'Enterprise C# Memory Profiling & Async Best Practices Guide.pdf',
    description: 'Comprehensive manual covering memory management, dotMemory analysis, IAsyncEnumerable, and Span<T> optimizations for high-throughput microservices.',
    topicId: 'topic-csharp',
    topicName: 'C#',
    tags: ['MemoryManagement', 'Async', 'Performance', 'dotMemory'],
    version: 'v2.1',
    author: 'David Miller (Principal Architect)',
    uploadedDate: '2026-07-28',
    fileType: 'PDF',
    fileSize: '4.2 MB',
    downloadCount: 148,
    isApproved: true,
    sessionId: 'session-1',
    summaryAi: 'This guide outlines memory allocation strategies in modern C#. Key takeaways include using Span<T> to avoid heap allocations, implementing IAsyncDisposable for streaming resources, and using dotMemory snapshots during load testing.',
    faqsAi: [
      {
        question: 'When should I prefer Span<T> over byte[] array slicing?',
        answer: 'Use Span<T> when parsing strings or buffers without creating sub-string heap objects.'
      },
      {
        question: 'What triggers LOH (Large Object Heap) fragmentation?',
        answer: 'Allocating objects larger than 85,000 bytes repeatedly without recycling.'
      }
    ],
    flashCardsAi: [
      { front: 'What is the size threshold for Large Object Heap (LOH)?', back: '85,000 bytes' },
      { front: 'Which C# interface handles asynchronous resource cleanup?', back: 'IAsyncDisposable' }
    ],
    versions: [
      {
        version: 'v2.1',
        uploadedBy: 'David Miller',
        uploadedAt: '2026-07-28',
        changelog: 'Added section on C# 12 primary constructors and memory layout.',
        fileSize: '4.2 MB'
      },
      {
        version: 'v2.0',
        uploadedBy: 'David Miller',
        uploadedAt: '2026-06-15',
        changelog: 'Initial v2 overhaul for .NET 8.',
        fileSize: '3.8 MB'
      }
    ]
  },
  {
    id: 'doc-2',
    name: 'ASP.NET Core Web API Security & Rate Limiting Architecture.docx',
    description: 'Enterprise security standards for Web APIs, JWT authentication, OAuth2 authorization code flow with PKCE, and token refresh mechanisms.',
    topicId: 'topic-dotnet',
    topicName: '.NET',
    tags: ['Security', 'OAuth2', 'JWT', 'RateLimiting'],
    version: 'v1.3',
    author: 'Elena Rostova (Lead Trainer)',
    uploadedDate: '2026-07-30',
    fileType: 'DOCX',
    fileSize: '1.8 MB',
    downloadCount: 112,
    isApproved: true,
    sessionId: 'session-2',
    summaryAi: 'Covers security configuration in ASP.NET Core APIs. Includes middleware order rules, CORS policy restrictions, and fixed/sliding window rate limiting policies.',
    versions: [
      {
        version: 'v1.3',
        uploadedBy: 'Elena Rostova',
        uploadedAt: '2026-07-30',
        changelog: 'Updated rate limiting configuration for .NET 8 built-in rate limiter.',
        fileSize: '1.8 MB'
      }
    ]
  },
  {
    id: 'doc-3',
    name: 'Azure Cloud Architecture & Cost Optimization Runbook.pdf',
    description: 'Architectural blueprint for deploying containerized microservices to Azure App Services, Azure Functions, and Key Vault with managed identities.',
    topicId: 'topic-azure',
    topicName: 'Azure',
    tags: ['Azure', 'Cloud', 'Architecture', 'CostOptimization'],
    version: 'v3.0',
    author: 'Alex Vance & Cloud L&D Team',
    uploadedDate: '2026-08-01',
    fileType: 'PDF',
    fileSize: '5.5 MB',
    downloadCount: 89,
    isApproved: true,
    sessionId: 'session-5',
    summaryAi: 'Detailed guide for cost-effective Azure Cloud deployment. Covers Managed Identities over connection strings, Azure App Service auto-scaling, and Bicep infrastructure automation.',
    versions: [
      {
        version: 'v3.0',
        uploadedBy: 'Alex Vance',
        uploadedAt: '2026-08-01',
        changelog: 'Added Bicep template scripts for Key Vault and App Service deployment.',
        fileSize: '5.5 MB'
      }
    ]
  }
];

export const initialChatMessages: KnowledgeHubChatMessage[] = [
  {
    id: 'msg-1',
    channelId: 'chan-azure-gen',
    topicId: 'topic-azure',
    authorName: 'Marcus Wright',
    authorRole: 'GT',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    content: 'Hey everyone! Has anyone experienced transient 403 Forbidden errors when connecting App Service to Azure Key Vault via System-Assigned Managed Identity?',
    timestamp: '10:14 AM',
    reactions: [
      { emoji: '👍', count: 3, users: ['gt-101', 'gt-102', 'mentor-201'] }
    ],
    repliesCount: 2
  },
  {
    id: 'msg-2',
    channelId: 'chan-azure-gen',
    topicId: 'topic-azure',
    authorName: 'David Miller',
    authorRole: 'Mentor',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    content: 'Check the Key Vault Access Policies / RBAC assignments! Make sure `Key Vault Secrets User` role is propagated in Azure Entra ID.',
    timestamp: '10:16 AM',
    reactions: [
      { emoji: '💡', count: 5, users: ['gt-101', 'gt-104', 'gt-108'] },
      { emoji: '🚀', count: 2, users: ['gt-101', 'gt-104'] }
    ]
  },
  {
    id: 'msg-3',
    channelId: 'chan-azure-gen',
    topicId: 'topic-azure',
    authorName: 'AI Learning Copilot',
    authorRole: 'Trainer',
    content: '🤖 **AI Tip**: You can also enable Azure SDK Exponential Backoff Retry Policy using `DefaultAzureCredentialOptions.Retry` to gracefully handle transient Entra token propagation delays.',
    timestamp: '10:17 AM',
    isAiGenerated: true,
    reactions: [
      { emoji: '❤️', count: 4, users: ['gt-101', 'gt-104', 'gt-108', 'mentor-201'] }
    ]
  }
];

export const initialReputationProfile: ReputationProfile = {
  userId: 'gt-101',
  userName: 'Alex Vance',
  points: 345,
  level: 'Mentor',
  nextLevelPoints: 500,
  questionsAsked: 14,
  answersGiven: 22,
  acceptedAnswers: 8,
  documentsUploaded: 5,
  upvotesReceived: 142,
  badges: [
    {
      id: 'badge-1',
      title: 'First Question',
      description: 'Asked your first technical question in Knowledge Hub',
      tier: 'Bronze',
      icon: 'HelpCircle',
      earnedDate: '2026-07-10',
      isEarned: true
    },
    {
      id: 'badge-2',
      title: 'First Answer',
      description: 'Provided a solution to a peer question',
      tier: 'Bronze',
      icon: 'MessageSquare',
      earnedDate: '2026-07-12',
      isEarned: true
    },
    {
      id: 'badge-3',
      title: 'First Upload',
      description: 'Shared a valuable study document in Document Repository',
      tier: 'Bronze',
      icon: 'Upload',
      earnedDate: '2026-07-15',
      isEarned: true
    },
    {
      id: 'badge-4',
      title: 'Top Contributor',
      description: 'Reached 200+ reputation points across discussions',
      tier: 'Silver',
      icon: 'Award',
      earnedDate: '2026-07-25',
      isEarned: true
    },
    {
      id: 'badge-5',
      title: 'Top Reviewer',
      description: 'Provided 10+ accepted answers in .NET & C# topics',
      tier: 'Silver',
      icon: 'CheckCircle2',
      earnedDate: '2026-07-30',
      isEarned: true
    },
    {
      id: 'badge-6',
      title: 'Knowledge Expert',
      description: 'Accumulate 500+ points and lead 3 topic hubs',
      tier: 'Gold',
      icon: 'Crown',
      earnedDate: undefined,
      isEarned: false
    },
    {
      id: 'badge-7',
      title: 'Community Leader',
      description: 'Maintain an 85%+ answer acceptance rate for 30 days',
      tier: 'Gold',
      icon: 'Users',
      earnedDate: undefined,
      isEarned: false
    },
    {
      id: 'badge-8',
      title: 'AI Mentor',
      description: 'Validate and refine 20+ AI Copilot suggested answers',
      tier: 'Gold',
      icon: 'Sparkles',
      earnedDate: '2026-08-01',
      isEarned: true
    }
  ]
};

export const moderatorStats = {
  activeUsersToday: 142,
  dailyDiscussionsCount: 28,
  answerRatePercent: 88,
  resolutionRatePercent: 92,
  topContributors: [
    { name: 'Alex Vance', role: 'GT (Mentor Level)', points: 345, solvedCount: 14 },
    { name: 'David Miller', role: 'Principal Mentor', points: 890, solvedCount: 42 },
    { name: 'Elena Rostova', role: 'Lead Trainer', points: 720, solvedCount: 35 },
    { name: 'Priya Sharma', role: 'GT (Expert Level)', points: 280, solvedCount: 11 }
  ],
  mostViewedTopics: [
    { name: 'C#', count: 480 },
    { name: '.NET', count: 520 },
    { name: 'AI & Copilot', count: 610 },
    { name: 'Azure', count: 390 },
    { name: 'React', count: 410 }
  ],
  mostDownloadedDocs: [
    { name: 'Enterprise C# Memory Profiling.pdf', downloads: 148 },
    { name: 'Azure Cloud Architecture Runbook.pdf', downloads: 89 },
    { name: 'ASP.NET Core Web API Security.docx', downloads: 112 }
  ],
  searchMetrics: {
    popularSearches: ['IAsyncEnumerable leak', 'Azure Key Vault rotation', 'Zustand vs Context', 'SQL Index optimization'],
    failedSearches: ['GraphQL subscription example', 'Legacy COBOL adapter']
  }
};
