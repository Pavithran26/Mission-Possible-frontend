import React, { useState } from 'react';
import { Session, StudyMaterial, Quiz, PersonalNote, DiscussionPost } from '../../types';
import { InteractiveRoadmap } from './InteractiveRoadmap';
import { summarizeMaterialAiApi } from '../../services/api';
import { SessionDiscussionHub } from '../KnowledgeHub/SessionDiscussionHub';
import { initialDiscussions, initialDocuments, initialChatMessages } from '../../data/knowledgeHubData';
import { mockUser } from '../../data/mockData';
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Video,
  HelpCircle,
  MessageSquare,
  Award,
  Star,
  Play,
  Download,
  ExternalLink,
  Sparkles,
  Plus,
  Send,
  Bookmark,
  CheckCircle2,
  Clock,
  Layers,
  Edit3,
  X,
  Upload,
  Search,
  Filter,
  Presentation,
  FileSpreadsheet,
  Link as LinkIcon,
  FileCode,
  ShieldCheck,
  ClipboardList,
  FolderPlus
} from 'lucide-react';

interface CustomMaterialItem {
  id: string;
  title: string;
  type: 'Doc (PDF/Word)' | 'PowerPoint (PPT)' | 'Video Link' | 'Video File (MP4)' | 'Notes / Guide' | 'Spreadsheet';
  url: string;
  description: string;
  updatedAt: string;
  sourceOrAuthor?: string;
  tags: string[];
  fileSizeOrDuration?: string;
}

interface SessionDetailViewProps {
  session: Session & { studyMaterials: StudyMaterial[]; quizzes: Quiz[]; discussions: DiscussionPost[] };
  onBack: () => void;
  onStartQuiz: (quiz: Quiz) => void;
  onToggleBookmark: (sessionId: string) => void;
  initialTab?: string;
  initialTopicId?: string;
  onStateChange?: (tab: string, topicId?: string) => void;
}

const providedMaterialMocks: Record<string, CustomMaterialItem[]> = {
  'session-dotnet': [
    {
      id: 'prov-dotnet-1',
      title: 'Enterprise .NET Architecture Handbook',
      type: 'Doc (PDF/Word)',
      url: '#',
      description: 'Official curriculum guide covering .NET 8 architecture, clean code, and enterprise service design.',
      updatedAt: 'Today',
      sourceOrAuthor: 'Trainer Santhosh',
      tags: ['Official', '.NET', 'Architecture'],
      fileSizeOrDuration: '46 Pages'
    },
    {
      id: 'prov-dotnet-2',
      title: 'ASP.NET Core Web API Best Practices Deck',
      type: 'PowerPoint (PPT)',
      url: '#',
      description: 'Trainer slide deck on building resilient APIs, dependency injection, middleware, and swagger integration.',
      updatedAt: 'Yesterday',
      sourceOrAuthor: 'Santhosh',
      tags: ['API', 'Best Practices'],
      fileSizeOrDuration: '25 Slides'
    },
    {
      id: 'prov-dotnet-3',
      title: 'C# Performance Tuning & Async Guide',
      type: 'Doc (PDF/Word)',
      url: '#',
      description: 'Detailed notes on async programming, garbage collection, and high-performance CLR patterns.',
      updatedAt: '2 days ago',
      sourceOrAuthor: 'Lead L&D Architect',
      tags: ['Performance', 'C#'],
      fileSizeOrDuration: '30 Pages'
    }
  ],
  'session-insurance': [
    {
      id: 'prov-ins-1',
      title: 'Insurance Domain Fundamentals Handbook',
      type: 'Doc (PDF/Word)',
      url: '#',
      description: 'Official training manual for life, P&C, underwriting, claims, and regulatory compliance.',
      updatedAt: 'Today',
      sourceOrAuthor: 'Trainer Harish',
      tags: ['Insurance', 'Official'],
      fileSizeOrDuration: '40 Pages'
    },
    {
      id: 'prov-ins-2',
      title: 'Underwriting & Risk Assessment Slide Deck',
      type: 'PowerPoint (PPT)',
      url: '#',
      description: 'Session material explaining pricing, rating tables, and risk classification workflows.',
      updatedAt: 'Yesterday',
      sourceOrAuthor: 'Harish',
      tags: ['Underwriting', 'Risk'],
      fileSizeOrDuration: '22 Slides'
    },
    {
      id: 'prov-ins-3',
      title: 'Claims Workflow Process Document',
      type: 'Doc (PDF/Word)',
      url: '#',
      description: 'Reference notes for end-to-end claims processing including FNOL, investigation, and settlement.',
      updatedAt: '3 days ago',
      sourceOrAuthor: 'Claims Team',
      tags: ['Claims', 'Process'],
      fileSizeOrDuration: '28 Pages'
    }
  ],
  'session-sql': [
    {
      id: 'prov-sql-1',
      title: 'SQL & Relational Database Engineering Manual',
      type: 'Doc (PDF/Word)',
      url: '#',
      description: 'Official database guide with normalization, indexing, query optimization, and transaction design.',
      updatedAt: 'Today',
      sourceOrAuthor: 'Trainer Janani',
      tags: ['SQL', 'Database'],
      fileSizeOrDuration: '48 Pages'
    },
    {
      id: 'prov-sql-2',
      title: 'Advanced Querying & Window Functions Deck',
      type: 'PowerPoint (PPT)',
      url: '#',
      description: 'Session slides on CTEs, window functions, and query performance trade-offs.',
      updatedAt: 'Yesterday',
      sourceOrAuthor: 'Janani',
      tags: ['Query', 'Window Functions'],
      fileSizeOrDuration: '27 Slides'
    },
    {
      id: 'prov-sql-3',
      title: 'PostgreSQL Performance Tuning Notes',
      type: 'Doc (PDF/Word)',
      url: '#',
      description: 'Notes on explain plans, B-Tree indexes, constraints, and locking strategy.',
      updatedAt: '2 days ago',
      sourceOrAuthor: 'DBA Lead',
      tags: ['Performance', 'PostgreSQL'],
      fileSizeOrDuration: '24 Pages'
    }
  ],
  'session-c2c': [
    {
      id: 'prov-c2c-1',
      title: 'Campus to Corporate Workplace Guide',
      type: 'Doc (PDF/Word)',
      url: '#',
      description: 'Official transition guide for professionalism, communication, and workplace behavior.',
      updatedAt: 'Today',
      sourceOrAuthor: 'Trainer Mayford',
      tags: ['Career', 'Soft Skills'],
      fileSizeOrDuration: '34 Pages'
    },
    {
      id: 'prov-c2c-2',
      title: 'Effective Communication Workshop Slides',
      type: 'PowerPoint (PPT)',
      url: '#',
      description: 'Essential slides on active listening, presentation skills, and stakeholder communication.',
      updatedAt: 'Yesterday',
      sourceOrAuthor: 'Mayford',
      tags: ['Communication', 'Workshop'],
      fileSizeOrDuration: '20 Slides'
    },
    {
      id: 'prov-c2c-3',
      title: 'Time Management & Productivity Checklist',
      type: 'Doc (PDF/Word)',
      url: '#',
      description: 'Printable checklist for daily planning, priorities, and the Eisenhower decision matrix.',
      updatedAt: '2 days ago',
      sourceOrAuthor: 'GT Productivity Team',
      tags: ['Productivity', 'Planning'],
      fileSizeOrDuration: '15 Pages'
    }
  ],
  'session-data-modeling-fundamentals': [
    {
      id: 'prov-dm-1',
      title: 'Data Modeling Fundamentals Handbook',
      type: 'Doc (PDF/Word)',
      url: '#',
      description: 'Official notes on entity relationships, cardinality, normalization, and conceptual modeling.',
      updatedAt: 'Today',
      sourceOrAuthor: 'Trainer Gabriel',
      tags: ['Data Modeling', 'ERD'],
      fileSizeOrDuration: '38 Pages'
    },
    {
      id: 'prov-dm-2',
      title: 'ERD Patterns & Relationship Cards Deck',
      type: 'PowerPoint (PPT)',
      url: '#',
      description: 'Slide deck covering one-to-one, one-to-many, and many-to-many modeling patterns.',
      updatedAt: 'Yesterday',
      sourceOrAuthor: 'Gabriel',
      tags: ['ERD', 'Models'],
      fileSizeOrDuration: '24 Slides'
    },
    {
      id: 'prov-dm-3',
      title: 'Normalization & Schema Design Notes',
      type: 'Doc (PDF/Word)',
      url: '#',
      description: 'Practical reference for applying 1NF-3NF and avoiding update anomalies.',
      updatedAt: '2 days ago',
      sourceOrAuthor: 'Data Team',
      tags: ['Normalization', 'Schema'],
      fileSizeOrDuration: '26 Pages'
    }
  ],
  'session-data-fundamentals': [
    {
      id: 'prov-df-1',
      title: 'Data Fundamentals & Quality Guide',
      type: 'Doc (PDF/Word)',
      url: '#',
      description: 'Official guide that explains data quality, governance, and foundational analytics concepts.',
      updatedAt: 'Today',
      sourceOrAuthor: 'Trainer Parthiban',
      tags: ['Data Quality', 'Governance'],
      fileSizeOrDuration: '36 Pages'
    },
    {
      id: 'prov-df-2',
      title: 'Medallion Architecture & Azure Data Flow Deck',
      type: 'PowerPoint (PPT)',
      url: '#',
      description: 'Session slides on bronze/silver/gold data layering and modern analytics pipelines.',
      updatedAt: 'Yesterday',
      sourceOrAuthor: 'Parthiban',
      tags: ['Medallion', 'Azure'],
      fileSizeOrDuration: '28 Slides'
    },
    {
      id: 'prov-df-3',
      title: 'Analytics Reporting Starter Notes',
      type: 'Doc (PDF/Word)',
      url: '#',
      description: 'Reference notes for building dashboards and business reports.',
      updatedAt: '2 days ago',
      sourceOrAuthor: 'BI Team',
      tags: ['Analytics', 'Reporting'],
      fileSizeOrDuration: '22 Pages'
    }
  ],
  'session-html-css-js': [
    {
      id: 'prov-web-1',
      title: 'HTML, CSS & JavaScript Foundations Manual',
      type: 'Doc (PDF/Word)',
      url: '#',
      description: 'Official web fundamentals handbook for markup, styling, and scripting best practices.',
      updatedAt: 'Today',
      sourceOrAuthor: 'Trainer Sre',
      tags: ['Web', 'Frontend'],
      fileSizeOrDuration: '42 Pages'
    },
    {
      id: 'prov-web-2',
      title: 'Responsive Design & Layout Patterns Deck',
      type: 'PowerPoint (PPT)',
      url: '#',
      description: 'Slides covering responsive grids, flexbox, and modern CSS layout strategies.',
      updatedAt: 'Yesterday',
      sourceOrAuthor: 'Sre',
      tags: ['Responsive', 'CSS'],
      fileSizeOrDuration: '30 Slides'
    },
    {
      id: 'prov-web-3',
      title: 'JavaScript DOM & Event Handling Notes',
      type: 'Doc (PDF/Word)',
      url: '#',
      description: 'Session notes on DOM manipulation, event listeners, and async browser operations.',
      updatedAt: '2 days ago',
      sourceOrAuthor: 'Frontend Team',
      tags: ['JavaScript', 'DOM'],
      fileSizeOrDuration: '25 Pages'
    }
  ],
  'session-modern-data-platforms': [
    {
      id: 'prov-mdp-1',
      title: 'Modern Data Platforms Handbook',
      type: 'Doc (PDF/Word)',
      url: '#',
      description: 'Official enterprise guide for lakehouse architecture, governance, and analytics.',
      updatedAt: 'Today',
      sourceOrAuthor: 'Trainer Anitha',
      tags: ['Data Engineering', 'Lakehouse'],
      fileSizeOrDuration: '48 Pages'
    },
    {
      id: 'prov-mdp-2',
      title: 'Azure Fabric & Databricks Pipeline Deck',
      type: 'PowerPoint (PPT)',
      url: '#',
      description: 'Slides on ETL orchestration, Fabric workspaces, and Databricks data pipelines.',
      updatedAt: 'Yesterday',
      sourceOrAuthor: 'Anitha',
      tags: ['Azure', 'Databricks'],
      fileSizeOrDuration: '29 Slides'
    },
    {
      id: 'prov-mdp-3',
      title: 'Data Modeling & Governance Notes',
      type: 'Doc (PDF/Word)',
      url: '#',
      description: 'Authoritative notes on metadata, cataloging, and governance controls for modern data platforms.',
      updatedAt: '2 days ago',
      sourceOrAuthor: 'Data Ops Team',
      tags: ['Governance', 'Metadata'],
      fileSizeOrDuration: '26 Pages'
    }
  ],
  'session-software-testing': [
    {
      id: 'prov-st-1',
      title: 'Software Testing Fundamentals Handbook',
      type: 'Doc (PDF/Word)',
      url: '#',
      description: 'Official guide for testing methodologies, planning, and quality assurance fundamentals.',
      updatedAt: 'Today',
      sourceOrAuthor: 'Trainer Swathi',
      tags: ['Testing', 'QA'],
      fileSizeOrDuration: '40 Pages'
    },
    {
      id: 'prov-st-2',
      title: 'Test Design Techniques & Execution Deck',
      type: 'PowerPoint (PPT)',
      url: '#',
      description: 'Session slides for equivalence partitioning, boundary analysis, and test execution best practices.',
      updatedAt: 'Yesterday',
      sourceOrAuthor: 'Swathi',
      tags: ['Test Design', 'Execution'],
      fileSizeOrDuration: '27 Slides'
    },
    {
      id: 'prov-st-3',
      title: 'Defect Management Workflow Notes',
      type: 'Doc (PDF/Word)',
      url: '#',
      description: 'Process notes on defect triage, tracking, and closure workflows in software QA.',
      updatedAt: '2 days ago',
      sourceOrAuthor: 'QA Team',
      tags: ['Defect', 'Workflow'],
      fileSizeOrDuration: '24 Pages'
    }
  ]
};

const additionalMaterialMocks: Record<string, CustomMaterialItem[]> = {
  'session-dotnet': [
    {
      id: 'add-dotnet-1',
      title: 'Advanced .NET Microservices Reference Article',
      type: 'Doc (PDF/Word)',
      url: '#',
      description: 'Supplemental reference covering microservices patterns, event-driven architecture, and resilient APIs.',
      updatedAt: '3 days ago',
      sourceOrAuthor: 'Community Engineering',
      tags: ['Microservices', 'Reference'],
      fileSizeOrDuration: '22 Pages'
    },
    {
      id: 'add-dotnet-2',
      title: 'Performance Engineering Video Case Study',
      type: 'Video Link',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'External video covering .NET performance profiling and async scaling strategies.',
      updatedAt: '5 days ago',
      sourceOrAuthor: 'External Resource',
      tags: ['Video', 'Performance'],
      fileSizeOrDuration: '35 mins'
    },
    {
      id: 'add-dotnet-3',
      title: 'Tech Interview Practice Notes',
      type: 'Notes / Guide',
      url: '#',
      description: 'Supplementary study notes focused on common .NET interview questions and architecture review topics.',
      updatedAt: '1 week ago',
      sourceOrAuthor: 'Mentor Team',
      tags: ['Interview', 'Notes'],
      fileSizeOrDuration: 'Text Document'
    }
  ],
  'session-insurance': [
    {
      id: 'add-ins-1',
      title: 'Insurance Industry Analytics & Case Study',
      type: 'Doc (PDF/Word)',
      url: '#',
      description: 'Additional reading on claims analytics, fraud detection, and policy profitability models.',
      updatedAt: '3 days ago',
      sourceOrAuthor: 'Insurance Research Group',
      tags: ['Analytics', 'Case Study'],
      fileSizeOrDuration: '20 Pages'
    },
    {
      id: 'add-ins-2',
      title: 'Regulatory Compliance Video Discussion',
      type: 'Video Link',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'External video session on IRDAI and Solvency II compliance for insurance systems.',
      updatedAt: '5 days ago',
      sourceOrAuthor: 'External Resource',
      tags: ['Compliance', 'Video'],
      fileSizeOrDuration: '40 mins'
    },
    {
      id: 'add-ins-3',
      title: 'Peer Discussion Notes on Claims Processing',
      type: 'Notes / Guide',
      url: '#',
      description: 'Shared peer notes summarizing real-world claims processing exceptions and workflow challenges.',
      updatedAt: '4 days ago',
      sourceOrAuthor: 'Peer Cohort',
      tags: ['Discussion', 'Notes'],
      fileSizeOrDuration: 'Text Document'
    }
  ],
  'session-sql': [
    {
      id: 'add-sql-1',
      title: 'Database Design & Normalization Article',
      type: 'Doc (PDF/Word)',
      url: '#',
      description: 'Supplementary article on schema design, normalization tradeoffs, and query simplification.',
      updatedAt: '3 days ago',
      sourceOrAuthor: 'SQL Experts',
      tags: ['Design', 'Normalization'],
      fileSizeOrDuration: '18 Pages'
    },
    {
      id: 'add-sql-2',
      title: 'Query Optimization Video Case Study',
      type: 'Video Link',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'Video explaining query tuning, index selection, and execution plan analysis.',
      updatedAt: '5 days ago',
      sourceOrAuthor: 'External Resource',
      tags: ['Optimization', 'Video'],
      fileSizeOrDuration: '38 mins'
    },
    {
      id: 'add-sql-3',
      title: 'SQL Cheat Sheet & Quick Reference',
      type: 'Notes / Guide',
      url: '#',
      description: 'Quick reference notes for SQL syntax, joins, aggregate functions, and window functions.',
      updatedAt: '4 days ago',
      sourceOrAuthor: 'DBA Team',
      tags: ['Cheat Sheet', 'Reference'],
      fileSizeOrDuration: 'Text Document'
    }
  ],
  'session-c2c': [
    {
      id: 'add-c2c-1',
      title: 'Corporate Communication Case Study',
      type: 'Doc (PDF/Word)',
      url: '#',
      description: 'Supplementary case study on client interaction, stakeholder communication, and professionalism. ',
      updatedAt: '3 days ago',
      sourceOrAuthor: 'Corporate Training',
      tags: ['Communication', 'Case Study'],
      fileSizeOrDuration: '18 Pages'
    },
    {
      id: 'add-c2c-2',
      title: 'Behavioral Interview Prep Video',
      type: 'Video Link',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'External video on behavioral interview questions, storytelling, and confidence building.',
      updatedAt: '5 days ago',
      sourceOrAuthor: 'External Resource',
      tags: ['Interview', 'Video'],
      fileSizeOrDuration: '33 mins'
    },
    {
      id: 'add-c2c-3',
      title: 'Professional Email Writing & Etiquette Notes',
      type: 'Notes / Guide',
      url: '#',
      description: 'Additional guide for writing professional emails, status updates, and meeting follow-ups.',
      updatedAt: '4 days ago',
      sourceOrAuthor: 'HR Team',
      tags: ['Email', 'Etiquette'],
      fileSizeOrDuration: 'Text Document'
    }
  ],
  'session-data-modeling-fundamentals': [
    {
      id: 'add-dm-1',
      title: 'Dimensional Modeling Article',
      type: 'Doc (PDF/Word)',
      url: '#',
      description: 'Supplemental article comparing normalized vs dimensional models and star/snowflake schemas.',
      updatedAt: '3 days ago',
      sourceOrAuthor: 'Data Architecture Group',
      tags: ['Dimensional', 'Article'],
      fileSizeOrDuration: '20 Pages'
    },
    {
      id: 'add-dm-2',
      title: 'Data Warehouse Reference Video',
      type: 'Video Link',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'External video covering data warehouse architecture and data modeling best practices.',
      updatedAt: '5 days ago',
      sourceOrAuthor: 'External Resource',
      tags: ['Warehouse', 'Video'],
      fileSizeOrDuration: '36 mins'
    },
    {
      id: 'add-dm-3',
      title: 'Data Governance & Vocabulary Notes',
      type: 'Notes / Guide',
      url: '#',
      description: 'Additional notes on data governance, business glossary, and metadata management.',
      updatedAt: '4 days ago',
      sourceOrAuthor: 'Governance Team',
      tags: ['Governance', 'Metadata'],
      fileSizeOrDuration: 'Text Document'
    }
  ],
  'session-data-fundamentals': [
    {
      id: 'add-df-1',
      title: 'Power BI & Analytics Best Practices',
      type: 'Doc (PDF/Word)',
      url: '#',
      description: 'Supplemental guide for building effective dashboards, KPI metrics, and executive reports.',
      updatedAt: '3 days ago',
      sourceOrAuthor: 'BI Team',
      tags: ['Analytics', 'Power BI'],
      fileSizeOrDuration: '22 Pages'
    },
    {
      id: 'add-df-2',
      title: 'Modern Data Platform Video Overview',
      type: 'Video Link',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'Video on modern data architectures, cloud integration, and analytics ecosystems.',
      updatedAt: '5 days ago',
      sourceOrAuthor: 'External Resource',
      tags: ['Data Platform', 'Video'],
      fileSizeOrDuration: '34 mins'
    },
    {
      id: 'add-df-3',
      title: 'Data Source Mapping & Quality Notes',
      type: 'Notes / Guide',
      url: '#',
      description: 'Auxiliary notes for source mapping, data lineage, and quality checks.',
      updatedAt: '4 days ago',
      sourceOrAuthor: 'Data Management',
      tags: ['Lineage', 'Quality'],
      fileSizeOrDuration: 'Text Document'
    }
  ],
  'session-html-css-js': [
    {
      id: 'add-web-1',
      title: 'Frontend Accessibility & UX Guide',
      type: 'Doc (PDF/Word)',
      url: '#',
      description: 'Additional guide on accessibility practices and UX-friendly web interfaces.',
      updatedAt: '3 days ago',
      sourceOrAuthor: 'UX Team',
      tags: ['Accessibility', 'UX'],
      fileSizeOrDuration: '20 Pages'
    },
    {
      id: 'add-web-2',
      title: 'JavaScript Performance Optimization Video',
      type: 'Video Link',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'Video on browser performance, event delegation, and asynchronous resource loading.',
      updatedAt: '5 days ago',
      sourceOrAuthor: 'External Resource',
      tags: ['Performance', 'Video'],
      fileSizeOrDuration: '38 mins'
    },
    {
      id: 'add-web-3',
      title: 'CSS Grid & Flexbox Quick Reference',
      type: 'Notes / Guide',
      url: '#',
      description: 'Practical reference sheet for modern layout patterns and responsive styling utilities.',
      updatedAt: '4 days ago',
      sourceOrAuthor: 'Frontend Team',
      tags: ['CSS', 'Layouts'],
      fileSizeOrDuration: 'Text Document'
    }
  ],
  'session-modern-data-platforms': [
    {
      id: 'add-mdp-1',
      title: 'DataOps & Automation Article',
      type: 'Doc (PDF/Word)',
      url: '#',
      description: 'Supplemental article on data operations, orchestration, and pipeline automation.',
      updatedAt: '3 days ago',
      sourceOrAuthor: 'DataOps Group',
      tags: ['DataOps', 'Automation'],
      fileSizeOrDuration: '22 Pages'
    },
    {
      id: 'add-mdp-2',
      title: 'AI-Driven Analytics Video Overview',
      type: 'Video Link',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'Video focusing on AI, analytics, and strategic data platform decision-making.',
      updatedAt: '5 days ago',
      sourceOrAuthor: 'External Resource',
      tags: ['AI', 'Analytics'],
      fileSizeOrDuration: '40 mins'
    },
    {
      id: 'add-mdp-3',
      title: 'Cloud Governance & Catalog Notes',
      type: 'Notes / Guide',
      url: '#',
      description: 'Additional notes on governance, cataloging, and data stewardship practices.',
      updatedAt: '4 days ago',
      sourceOrAuthor: 'Governance Team',
      tags: ['Governance', 'Catalog'],
      fileSizeOrDuration: 'Text Document'
    }
  ],
  'session-software-testing': [
    {
      id: 'add-st-1',
      title: 'QA Automation & Tooling Reference',
      type: 'Doc (PDF/Word)',
      url: '#',
      description: 'Supplemental reference on automation frameworks, test environment setup, and reporting.',
      updatedAt: '3 days ago',
      sourceOrAuthor: 'QA Automation Team',
      tags: ['Automation', 'QA'],
      fileSizeOrDuration: '24 Pages'
    },
    {
      id: 'add-st-2',
      title: 'Performance Testing Best Practices Video',
      type: 'Video Link',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'Video on load testing, performance metrics, and user experience validation.',
      updatedAt: '5 days ago',
      sourceOrAuthor: 'External Resource',
      tags: ['Performance', 'Video'],
      fileSizeOrDuration: '36 mins'
    },
    {
      id: 'add-st-3',
      title: 'Bug Triage & Defect Notes',
      type: 'Notes / Guide',
      url: '#',
      description: 'Additional notes for defect severity classification, triage workflows, and root-cause analysis.',
      updatedAt: '4 days ago',
      sourceOrAuthor: 'QA Team',
      tags: ['Bug Triage', 'Defects'],
      fileSizeOrDuration: 'Text Document'
    }
  ]
};

export const SessionDetailView: React.FC<SessionDetailViewProps> = ({
  session,
  onBack,
  onStartQuiz,
  onToggleBookmark,
  initialTab,
  initialTopicId,
  onStateChange
}) => {
  // 3 Primary Fields / Tabs: 'roadmap' (Road Map), 'provided-materials' (Provided Materials), 'additional-materials' (Additional Materials)
  const [activeTab, setActiveTab] = useState<'roadmap' | 'provided-materials' | 'additional-materials' | 'assignments' | 'quiz' | 'notes'>(
    (initialTab as any) || 'roadmap'
  );
  const [selectedTopicId, setSelectedTopicId] = useState<string>(initialTopicId || '');

  const handleTabSelect = (tab: typeof activeTab) => {
    setActiveTab(tab);
    onStateChange?.(tab, selectedTopicId);
  };
  const [summarizingId, setSummarizingId] = useState<string | null>(null);
  const [summaries, setSummaries] = useState<Record<string, string>>({});

  // Overview Video State
  const defaultOverviewUrl = '/videos/overall-final-vid-new.mp4';

  const [overviewVideoUrl, setOverviewVideoUrl] = useState<string>(defaultOverviewUrl);
  const [overviewVideoTitle, setOverviewVideoTitle] = useState<string>('Final overview');
  const [overviewVideoDesc, setOverviewVideoDesc] = useState<string>(
    `Comprehensive attendee video walkthrough covering key architectural concepts, trainer expectations, and session prerequisites for ${session.name}.`
  );
  const [isUploadingVideoModalOpen, setIsUploadingVideoModalOpen] = useState<boolean>(false);
  const [videoInputTitle, setVideoInputTitle] = useState<string>('');
  const [videoInputDesc, setVideoInputDesc] = useState<string>('');
  const [videoInputUrl, setVideoInputUrl] = useState<string>('');
  const [selectedVideoFileName, setSelectedVideoFileName] = useState<string>('');

  // Search & Filter State for Provided Materials
  const [providedSearch, setProvidedSearch] = useState('');
  const [providedFilterType, setProvidedFilterType] = useState<string>('All');

  // Search & Filter State for Additional Materials
  const [additionalSearch, setAdditionalSearch] = useState('');
  const [additionalFilterType, setAdditionalFilterType] = useState<string>('All');

  const defaultProvidedMaterials = providedMaterialMocks[session.id] || [];

  // Provided Materials List
  const [providedMaterialsList, setProvidedMaterialsList] = useState<CustomMaterialItem[]>([
    ...defaultProvidedMaterials,
    ...(session.studyMaterials || []).map((sm, idx) => ({
      id: `prov-sm-${idx}`,
      title: sm.title,
      type: (sm.type === 'PowerPoint' ? 'PowerPoint (PPT)' : sm.type === 'Video' ? 'Video File (MP4)' : sm.type === 'PDF' || sm.type === 'Word' ? 'Doc (PDF/Word)' : 'Notes / Guide') as CustomMaterialItem['type'],
      url: sm.url || '#',
      description: sm.description,
      updatedAt: 'Official L&D',
      tags: sm.tags || ['Official'],
      fileSizeOrDuration: sm.durationOrPages || 'Standard'
    })),
    // Include any materials specifically set on the session by admins
    ...(session.providedMaterials || []).map((pm, idx) => ({
      id: `prov-pm-${idx}`,
      title: pm.title,
      type: (pm.type === 'PowerPoint' ? 'PowerPoint (PPT)' : pm.type === 'Video' ? 'Video File (MP4)' : pm.type === 'PDF' || pm.type === 'Word' ? 'Doc (PDF/Word)' : 'Notes / Guide') as CustomMaterialItem['type'],
      url: pm.url || '#',
      description: pm.description,
      updatedAt: 'Provided',
      tags: pm.tags || ['Provided'],
      fileSizeOrDuration: pm.durationOrPages || 'Standard'
    })),
    // Include any assignment attachments so uploaded docs are discoverable in materials
    ...(session.assignments || []).filter(a => a.attachmentUrl).map((a, idx) => ({
      id: `prov-assign-${idx}`,
      title: `${a.title} (Assignment Attachment)`,
      type: 'Doc (PDF/Word)' as CustomMaterialItem['type'],
      url: a.attachmentUrl || '#',
      description: a.instructions || 'Assignment attachment file',
      updatedAt: a.dueDate || 'Assignment',
      tags: ['Assignment'],
      fileSizeOrDuration: 'Attached File'
    }))
  ]);

  const defaultAdditionalMaterials = additionalMaterialMocks[session.id] || [];

  // Additional Materials List
  const [additionalMaterialsList, setAdditionalMaterialsList] = useState<CustomMaterialItem[]>([
    ...defaultAdditionalMaterials,
    ...(session.additionalMaterials || []).map((am, idx) => ({
      id: `add-am-${idx}`,
      title: am.title,
      type: (am.type === 'PowerPoint' ? 'PowerPoint (PPT)' : am.type === 'Video' ? 'Video File (MP4)' : am.type === 'PDF' || am.type === 'Word' ? 'Doc (PDF/Word)' : 'Notes / Guide') as CustomMaterialItem['type'],
      url: am.url || '#',
      description: am.description,
      updatedAt: 'Additional',
      tags: am.tags || ['Additional'],
      fileSizeOrDuration: am.durationOrPages || 'Standard'
    }))
  ]);

  // Modals for Uploading Materials
  const [isUploadProvidedModalOpen, setIsUploadProvidedModalOpen] = useState(false);
  const [isUploadAdditionalModalOpen, setIsUploadAdditionalModalOpen] = useState(false);

  // New Material Form Fields
  const [matTitle, setMatTitle] = useState('');
  const [matType, setMatType] = useState<CustomMaterialItem['type']>('Doc (PDF/Word)');
  const [matUrl, setMatUrl] = useState('');
  const [matFileName, setMatFileName] = useState('');
  const [matSource, setMatSource] = useState('');
  const [matDesc, setMatDesc] = useState('');
  const [matTags, setMatTags] = useState('');

  // Notes state
  const [personalNotesList, setPersonalNotesList] = useState<PersonalNote[]>([]);
  const [newNoteText, setNewNoteText] = useState('');

  // Q&A Discussion state
  const [discussionsList, setDiscussionsList] = useState<DiscussionPost[]>(session.discussions || []);
  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [newQuestionBody, setNewQuestionBody] = useState('');
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});

  const selectedTopic = (session?.topics || []).find(t => t.id === selectedTopicId) || (session?.topics || [])[0];
  const activeQuiz = (session?.quizzes || [])[0];
  const assignmentsCount = (session?.assignments || []).length;
  const quizzesCount = (session?.quizzes || []).length;

  const handleSummarize = async (matId: string, title: string, desc: string) => {
    setSummarizingId(matId);
    try {
      const res = await summarizeMaterialAiApi(title, desc);
      setSummaries(prev => ({ ...prev, [matId]: res.summary }));
    } catch (err) {
      console.error(err);
    } finally {
      setSummarizingId(null);
    }
  };

  const handleSaveOverviewVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoInputTitle.trim()) return;
    setOverviewVideoTitle(videoInputTitle);
    if (videoInputDesc.trim()) setOverviewVideoDesc(videoInputDesc);
    if (videoInputUrl.trim()) setOverviewVideoUrl(videoInputUrl);
    setIsUploadingVideoModalOpen(false);
    setVideoInputTitle('');
    setVideoInputDesc('');
    setVideoInputUrl('');
    setSelectedVideoFileName('');
  };

  const handleAddProvidedMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matTitle.trim()) return;
    const newItem: CustomMaterialItem = {
      id: `prov-new-${Date.now()}`,
      title: matTitle,
      type: matType,
      url: matUrl.trim() || '#',
      description: matDesc || 'Uploaded organization study material.',
      updatedAt: 'Just now',
      tags: matTags ? matTags.split(',').map(t => t.trim()) : ['Provided', 'Official'],
      fileSizeOrDuration: matFileName ? `Uploaded: ${matFileName}` : 'Link / File'
    };
    setProvidedMaterialsList([newItem, ...providedMaterialsList]);
    setIsUploadProvidedModalOpen(false);
    resetMatForm();
  };

  const handleAddAdditionalMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matTitle.trim()) return;
    const newItem: CustomMaterialItem = {
      id: `add-new-${Date.now()}`,
      title: matTitle,
      type: matType,
      url: matUrl.trim() || '#',
      description: matDesc || 'User uploaded additional reference material.',
      sourceOrAuthor: matSource || 'GT Trainee',
      updatedAt: 'Just now',
      tags: matTags ? matTags.split(',').map(t => t.trim()) : ['Additional', 'Reference'],
      fileSizeOrDuration: matFileName ? `Uploaded: ${matFileName}` : 'Link / File'
    };
    setAdditionalMaterialsList([newItem, ...additionalMaterialsList]);
    setIsUploadAdditionalModalOpen(false);
    resetMatForm();
  };

  const resetMatForm = () => {
    setMatTitle('');
    setMatType('Doc (PDF/Word)');
    setMatUrl('');
    setMatFileName('');
    setMatSource('');
    setMatDesc('');
    setMatTags('');
  };

  const handleAddNote = () => {
    if (!newNoteText.trim()) return;
    const note: PersonalNote = {
      id: `note-${Date.now()}`,
      sessionId: session.id,
      topicId: selectedTopicId,
      topicTitle: 'Reference Notes',
      content: newNoteText,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setPersonalNotesList([note, ...personalNotesList]);
    setNewNoteText('');
  };

  const handlePostQuestion = () => {
    if (!newQuestionTitle.trim() || !newQuestionBody.trim()) return;
    const post: DiscussionPost = {
      id: `disc-${Date.now()}`,
      sessionId: session.id,
      authorName: 'Alex Vance',
      authorRole: 'GT',
      title: newQuestionTitle,
      body: newQuestionBody,
      createdAt: 'Just now',
      upvotes: 0,
      replies: []
    };
    setDiscussionsList([post, ...discussionsList]);
    setNewQuestionTitle('');
    setNewQuestionBody('');
  };

  const handlePostReply = (postId: string) => {
    const text = replyInputs[postId];
    if (!text || !text.trim()) return;
    setDiscussionsList(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          replies: [
            ...post.replies,
            {
              id: `rep-${Date.now()}`,
              authorName: 'Alex Vance',
              authorRole: 'GT',
              body: text,
              createdAt: 'Just now'
            }
          ]
        };
      }
      return post;
    }));
    setReplyInputs(prev => ({ ...prev, [postId]: '' }));
  };

  // Helper function for material type icon
  const renderTypeIcon = (type: CustomMaterialItem['type']) => {
    switch (type) {
      case 'Doc (PDF/Word)':
        return <FileText className="w-4 h-4 text-rose-500" />;
      case 'PowerPoint (PPT)':
        return <Presentation className="w-4 h-4 text-amber-500" />;
      case 'Video File (MP4)':
        return <Video className="w-4 h-4 text-purple-500" />;
      case 'Video Link':
        return <LinkIcon className="w-4 h-4 text-blue-500" />;
      case 'Notes / Guide':
        return <Edit3 className="w-4 h-4 text-emerald-500" />;
      default:
        return <FileText className="w-4 h-4 text-blue-500" />;
    }
  };

  const filteredProvided = providedMaterialsList.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(providedSearch.toLowerCase()) || item.description.toLowerCase().includes(providedSearch.toLowerCase());
    const matchesType = providedFilterType === 'All' || item.type.includes(providedFilterType);
    return matchesSearch && matchesType;
  });

  const filteredAdditional = additionalMaterialsList.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(additionalSearch.toLowerCase()) || item.description.toLowerCase().includes(additionalSearch.toLowerCase());
    const matchesType = additionalFilterType === 'All' || item.type.includes(additionalFilterType);
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8 animate-fadeIn text-slate-900 dark:text-slate-100">

      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-800 hover:text-blue-700 bg-slate-100 hover:bg-slate-200/80 px-4 py-2.5 rounded-xl border border-slate-200 transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-blue-600" />
          <span>Back to Learning Sessions</span>
        </button>

        <span className="text-xs font-mono font-bold text-blue-900 bg-blue-50 px-3.5 py-1.5 rounded-lg border border-blue-200 shadow-sm">
          Learning Track • {session.category}
        </span>
      </div>

      {/* ======================================================== */}
      {/* SESSION OVERVIEW VIDEO SECTION                           */}
      {/* ======================================================== */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-lg space-y-4 relative overflow-hidden">
        <div className="space-y-1.5 pb-3 border-b border-slate-100">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-mono font-bold">
            <Video className="w-3.5 h-3.5 text-blue-600" />
            <span>Session Overview</span>
          </div>
          <h2 className="text-lg md:text-xl font-extrabold text-slate-900">{session.name}</h2>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">{overviewVideoDesc}</p>
        </div>

        {/* Video Player Box - Fills available area in 16:9 aspect ratio */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md flex items-center justify-center">
          <video
            controls
            src={overviewVideoUrl}
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80"
          >
            Your browser does not support HTML5 video streaming.
          </video>
        </div>
      </div>

      {/* ======================================================== */}
      {/* THREE CORE FIELDS (Road Map, Provided Materials, Additional Materials) */}
      {/* ======================================================== */}
      <div className="bg-slate-100 p-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2 overflow-x-auto no-scrollbar">

        {/* Field 1: Road Map */}
        <button
          onClick={() => handleTabSelect('roadmap')}
          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'roadmap'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-700 hover:text-blue-700 hover:bg-slate-200/80'
            }`}
        >
          <Layers className={`w-4 h-4 ${activeTab === 'roadmap' ? 'text-white' : 'text-blue-600'}`} />
          <span>Road Map</span>
        </button>

        {/* Field 2: Provided Materials */}
        <button
          onClick={() => handleTabSelect('provided-materials')}
          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'provided-materials'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-700 hover:text-blue-700 hover:bg-slate-200/80'
            }`}
        >
          <FileText className={`w-4 h-4 ${activeTab === 'provided-materials' ? 'text-white' : 'text-blue-600'}`} />
          <span>Provided Materials ({providedMaterialsList.length})</span>
        </button>

        {/* Field 3: Additional Materials */}
        <button
          onClick={() => handleTabSelect('additional-materials')}
          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'additional-materials'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-700 hover:text-blue-700 hover:bg-slate-200/80'
            }`}
        >
          <FolderPlus className={`w-4 h-4 ${activeTab === 'additional-materials' ? 'text-white' : 'text-blue-600'}`} />
          <span>Additional Materials ({additionalMaterialsList.length})</span>
        </button>

        <button
          onClick={() => handleTabSelect('assignments')}
          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'assignments'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-700 hover:text-blue-700 hover:bg-slate-200/80'
            }`}
        >
          <ClipboardList className={`w-4 h-4 ${activeTab === 'assignments' ? 'text-white' : 'text-blue-600'}`} />
          <span>Assignments ({assignmentsCount})</span>
        </button>

        <button
          onClick={() => handleTabSelect('quiz')}
          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'quiz'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-700 hover:text-blue-700 hover:bg-slate-200/80'
            }`}
        >
          <HelpCircle className={`w-4 h-4 ${activeTab === 'quiz' ? 'text-white' : 'text-blue-600'}`} />
          <span>Quiz ({quizzesCount})</span>
        </button>

        <div className="h-6 w-px bg-slate-300 my-auto mx-1" />

        <button
          onClick={() => handleTabSelect('notes')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'notes'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-700 hover:text-blue-700 hover:bg-slate-200/80'
            }`}
        >
          <Edit3 className={`w-3.5 h-3.5 ${activeTab === 'notes' ? 'text-white' : 'text-blue-600'}`} />
          <span>Notes ({personalNotesList.length})</span>
        </button>

      </div>

      {/* ======================================================== */}
      {/* FIELD A: ROAD MAP VIEW (Interactive GT Roadmap)           */}
      {/* ======================================================== */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6 animate-fadeIn">
          {/* <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl flex items-center justify-between text-xs"> */}
          {/* <div className="flex items-center gap-2 text-blue-900 font-medium">
              <Layers className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>Interactive Session Roadmap — GTs can view this pathway for structured reference & topic progression.</span>
            </div> */}
          {/* <span className="font-mono text-[11px] font-bold text-blue-700 bg-white px-3 py-1 rounded-lg border border-blue-200">
              {(session?.topics || []).length} Topics Total
            </span> */}
          {/* </div> */}

          <InteractiveRoadmap
            topics={session?.topics || []}
            selectedTopicId={selectedTopicId}
            onSelectTopic={(id) => {
              const nextId = selectedTopicId === id ? '' : id;
              setSelectedTopicId(nextId);
              onStateChange?.(activeTab, nextId);
            }}
          />
        </div>
      )}

      {/* ======================================================== */}
      {/* FIELD B: PROVIDED MATERIALS VIEW                         */}
      {/* ======================================================== */}
      {activeTab === 'provided-materials' && (
        <div className="space-y-6 animate-fadeIn">

          {/* Action Header */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Official Organization Provided Materials</span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mt-1">Provided Study Materials</h3>
                <p className="text-xs text-slate-600">
                  Access all official docs, PPTs, video links, notes, and video files provided by the organization for this session.
                </p>
              </div>
            </div>

            {/* Filter Pills & Search */}
            <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar">
                {['All', 'Doc', 'PPT', 'Video', 'Notes'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setProvidedFilterType(t)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${providedFilterType === t
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search provided materials..."
                  value={providedSearch}
                  onChange={(e) => setProvidedSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Provided Materials List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProvided.map((mat) => (
              <div key={mat.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-blue-700 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200">
                      {renderTypeIcon(mat.type)}
                      <span>{mat.type}</span>
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{mat.fileSizeOrDuration}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900">{mat.title}</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">{mat.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">Provided by L&D • {mat.updatedAt}</span>
                  <a
                    href={mat.url}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold px-4 py-2 rounded-xl border border-blue-200 flex items-center gap-2 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-blue-600" /> Open / Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* FIELD C: ADDITIONAL MATERIALS VIEW                       */}
      {/* ======================================================== */}
      {activeTab === 'additional-materials' && (
        <div className="space-y-6 animate-fadeIn">

          {/* Action Header */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold font-mono">
                  <FolderPlus className="w-3.5 h-3.5 text-purple-600" />
                  <span>Referenced & Additional Study Materials</span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mt-1">Additional Reference Materials</h3>
                <p className="text-xs text-slate-600">
                  Explore additional docs, PPTs, video links, notes, and supplementary videos referenced by GT trainees and mentors.
                </p>
              </div>
            </div>

            {/* Filter Pills & Search */}
            <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar">
                {['All', 'Doc', 'PPT', 'Video', 'Notes'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setAdditionalFilterType(t)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${additionalFilterType === t
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search additional materials..."
                  value={additionalSearch}
                  onChange={(e) => setAdditionalSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600"
                />
              </div>
            </div>
          </div>

          {/* Additional Materials List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAdditional.map((mat) => (
              <div key={mat.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-purple-700 px-2.5 py-1 rounded-lg bg-purple-50 border border-purple-200">
                      {renderTypeIcon(mat.type)}
                      <span>{mat.type}</span>
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{mat.fileSizeOrDuration}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900">{mat.title}</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">{mat.description}</p>

                  {mat.sourceOrAuthor && (
                    <div className="text-[11px] text-slate-600 font-mono bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 w-fit">
                      Source/Contributor: <span className="text-slate-900 font-bold">{mat.sourceOrAuthor}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">Added: {mat.updatedAt}</span>
                  <a
                    href={mat.url}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold px-4 py-2 rounded-xl border border-purple-200 flex items-center gap-2 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-purple-600" /> Access Reference
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Assignments Tab */}
      {activeTab === 'assignments' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-blue-50/70 border border-blue-200 rounded-3xl p-5 shadow-sm space-y-3">
            <h3 className="text-base font-extrabold text-slate-900">Session Assignments ({assignmentsCount})</h3>
            <p className="text-slate-600 text-sm">Review required tasks, attached resources, due dates, and submission guidance for this session.</p>
          </div>

          {session.assignments && session.assignments.length > 0 ? (
            <div className="space-y-4">
              {session.assignments.map((assignment, idx) => (
                <div key={assignment.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                        <ClipboardList className="w-4 h-4 text-blue-600" />
                        <span>Assignment {idx + 1}</span>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900">{assignment.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{assignment.description}</p>
                    </div>

                    <div className="space-y-2 text-right text-[12px] text-slate-500">
                      <div>{assignment.dueDate ? `Due ${assignment.dueDate}` : 'No due date set'}</div>
                      <div>{assignment.totalPoints ? `${assignment.totalPoints} points` : 'Point value not set'}</div>
                      <div>{assignment.submissionFormat || 'Submission: URL / File'}</div>
                    </div>
                  </div>

                  {assignment.instructions && (
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                      <strong className="font-semibold">Instructions:</strong> {assignment.instructions}
                    </div>
                  )}

                  {(assignment.attachmentName || assignment.attachmentUrl) && (
                    <div className="rounded-3xl border border-blue-100 bg-blue-50 p-4 text-sm text-slate-700 flex flex-col gap-2">
                      <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-blue-700 font-bold">
                        <FileText className="w-4 h-4" /> Attached Resource
                      </div>
                      <div className="text-sm text-slate-800">
                        {assignment.attachmentName ? assignment.attachmentName : assignment.attachmentUrl}
                      </div>
                      {assignment.attachmentUrl && assignment.attachmentUrl.startsWith('http') && (
                        <a href={assignment.attachmentUrl} target="_blank" rel="noreferrer" className="text-blue-700 font-bold text-sm">
                          Open Resource
                        </a>
                      )}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 font-semibold text-slate-700">{assignment.status || 'Pending'}</span>
                    <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-semibold text-blue-700">{assignment.submissionFormat || 'URL / File'}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-slate-600 text-sm">
              No assignment posted yet.
            </div>
          )}
        </div>
      )}

      {/* Quiz Tab */}
      {activeTab === 'quiz' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-blue-50/70 border border-blue-200 rounded-3xl p-5 shadow-sm space-y-3">
            <h3 className="text-base font-extrabold text-slate-900">Session Quiz ({quizzesCount})</h3>
            <p className="text-slate-600 text-sm">Review the current quiz assessment and start when ready.</p>
          </div>

          {activeQuiz ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm max-w-full">
              <div className="space-y-5">
                <div>
                  <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">{activeQuiz.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {activeQuiz.description || 'Complete the assessment to check your understanding.'}
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-base font-medium text-slate-900 dark:text-white">Questions: {activeQuiz.questions.length}</p>
                  <button
                    type="button"
                    onClick={() => onStartQuiz(activeQuiz)}
                    className="w-full sm:w-[160px] h-12 rounded-[14px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all"
                  >
                    Start Quiz
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-slate-600 text-sm">
              No quiz has been configured for this session yet. Ask your facilitator to add an assessment to the session.
            </div>
          )}
        </div>
      )}

      {/* Notes Tab */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Your Reference Notes</h3>
            <textarea
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              placeholder="Record your insights, key syntax, or reminders for revision..."
              className="w-full h-24 bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 resize-none"
            />
            <button
              onClick={handleAddNote}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-all hover:-translate-y-0.5"
            >
              <Plus className="w-3.5 h-3.5" /> Save Personal Note
            </button>
          </div>

          <div className="space-y-3">
            {personalNotesList.map((note) => (
              <div key={note.id} className="bg-white border border-slate-200 rounded-2xl p-4 text-xs space-y-2 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 font-mono text-[10px]">
                  <span>{note.topicTitle}</span>
                  <span>{note.createdAt}</span>
                </div>
                <p className="text-slate-800 font-sans leading-relaxed">{note.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 1: UPLOAD OVERVIEW VIDEO MODAL                     */}
      {/* ======================================================== */}
      {isUploadingVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-5 text-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-extrabold text-slate-900">Upload Session Overview Video</h3>
              </div>
              <button
                onClick={() => setIsUploadingVideoModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveOverviewVideo} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700">Video Title</label>
                <input
                  type="text"
                  required
                  value={videoInputTitle}
                  onChange={(e) => setVideoInputTitle(e.target.value)}
                  placeholder="e.g. Full Session Overview & Objectives Walkthrough"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700">Overview Description</label>
                <textarea
                  rows={2}
                  value={videoInputDesc}
                  onChange={(e) => setVideoInputDesc(e.target.value)}
                  placeholder="Brief explanation of what attendees will watch in this video..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700">Upload Video File (MP4/WebM) or Enter URL</label>
                <div className="space-y-2">
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center hover:border-blue-500 cursor-pointer bg-slate-50 transition-colors">
                    <Upload className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                    <span className="text-xs font-semibold block text-slate-700">
                      {selectedVideoFileName ? `Selected: ${selectedVideoFileName}` : 'Drag & drop MP4 overview video file or click to select'}
                    </span>
                    <span className="text-[10px] text-slate-400">Max file size: 500 MB</span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setSelectedVideoFileName(e.target.files[0].name);
                          setVideoInputUrl(URL.createObjectURL(e.target.files[0]));
                        }
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>

                  <div className="text-center text-[10px] text-slate-400 font-mono">— OR PASTE VIDEO URL —</div>

                  <input
                    type="url"
                    value={videoInputUrl}
                    onChange={(e) => setVideoInputUrl(e.target.value)}
                    placeholder="https://commondatastorage.googleapis.com/... or YouTube/Vimeo URL"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadingVideoModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20"
                >
                  Save Video Overview
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: UPLOAD PROVIDED MATERIAL MODAL                  */}
      {/* ======================================================== */}
      {isUploadProvidedModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-5 text-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-extrabold text-slate-900">Upload Official Provided Material</h3>
              </div>
              <button onClick={() => setIsUploadProvidedModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProvidedMaterial} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700">Material Title</label>
                <input
                  type="text"
                  required
                  value={matTitle}
                  onChange={(e) => setMatTitle(e.target.value)}
                  placeholder="e.g. Official C# Memory Profiling Guide"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700">Material Type</label>
                <select
                  value={matType}
                  onChange={(e) => setMatType(e.target.value as CustomMaterialItem['type'])}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                >
                  <option value="Doc (PDF/Word)">Doc (PDF / Word)</option>
                  <option value="PowerPoint (PPT)">PowerPoint (PPT)</option>
                  <option value="Video Link">Video Link (YouTube / Vimeo / External)</option>
                  <option value="Video File (MP4)">Video File (MP4 / WebM)</option>
                  <option value="Notes / Guide">Notes / Guide</option>
                  <option value="Spreadsheet">Spreadsheet (Excel / Sheets)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700">Upload File OR Paste Material Link</label>
                <div className="space-y-2">
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setMatFileName(e.target.files[0].name);
                      }
                    }}
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <input
                    type="text"
                    value={matUrl}
                    onChange={(e) => setMatUrl(e.target.value)}
                    placeholder="https://... or internal document link"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700">Description</label>
                <textarea
                  rows={2}
                  value={matDesc}
                  onChange={(e) => setMatDesc(e.target.value)}
                  placeholder="Summary of this material..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 resize-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadProvidedModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20"
                >
                  Upload Provided Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: UPLOAD ADDITIONAL MATERIAL MODAL                */}
      {/* ======================================================== */}
      {isUploadAdditionalModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-5 text-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-purple-600" />
                <h3 className="text-base font-extrabold text-slate-900">Upload Additional Reference Material</h3>
              </div>
              <button onClick={() => setIsUploadAdditionalModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddAdditionalMaterial} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700">Material Title</label>
                <input
                  type="text"
                  required
                  value={matTitle}
                  onChange={(e) => setMatTitle(e.target.value)}
                  placeholder="e.g. Advanced Microservices Benchmark Whitepaper"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700">Source / Contributor Name</label>
                <input
                  type="text"
                  value={matSource}
                  onChange={(e) => setMatSource(e.target.value)}
                  placeholder="e.g. Alex Vance or External Tech Blog"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700">Material Type</label>
                <select
                  value={matType}
                  onChange={(e) => setMatType(e.target.value as CustomMaterialItem['type'])}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-purple-600"
                >
                  <option value="Doc (PDF/Word)">Doc (PDF / Word)</option>
                  <option value="PowerPoint (PPT)">PowerPoint (PPT)</option>
                  <option value="Video Link">Video Link (YouTube / Vimeo / External)</option>
                  <option value="Video File (MP4)">Video File (MP4 / WebM)</option>
                  <option value="Notes / Guide">Notes / Guide</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700">Upload File OR Paste Reference URL</label>
                <div className="space-y-2">
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setMatFileName(e.target.files[0].name);
                      }
                    }}
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                  />
                  <input
                    type="text"
                    value={matUrl}
                    onChange={(e) => setMatUrl(e.target.value)}
                    placeholder="https://... or external reference URL"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700">Description</label>
                <textarea
                  rows={2}
                  value={matDesc}
                  onChange={(e) => setMatDesc(e.target.value)}
                  placeholder="Summary of why this reference is helpful..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 resize-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadAdditionalModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/20"
                >
                  Upload Additional Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
