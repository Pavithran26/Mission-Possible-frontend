export interface SessionTrackerRecord {
  id: string;
  sessionCode: string;
  sessionName: string;
  category: CategoryType | string;
  trainerName: string;
  scheduleDate: string;
  scheduleTime: string;
  durationHours: number;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  enrolledCount: number;
  maxCapacity: number;
  completionRatePercent: number;
  materialsLink?: string;
  recordingLink?: string;
  notes?: string;
  lastUpdated?: string;
}

export type UserRole = 'GT' | 'Admin' | 'Super Admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  batch: string;
  xp: number;
  level: number;
  streakDays: number;
  lastActiveDate: string;
  dailyGoalMinutes: number;
  todayMinutesSpent: number;
  isGuest?: boolean;
}

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type CategoryType = 
  | 'Insurance' 
  | '.NET'
  | '.NET with C#' 
  | 'Frontend' 
  | 'SQL' 
  | 'Data'
  | 'Data Modeling'
  | 'Database Modelling' 
  | 'C2C'
  | 'Campus to Corporate'
  | 'Data Engineering' 
  | 'System Design' 
  | 'Azure' 
  | 'Git' 
  | 'DevOps' 
  | 'API Development' 
  | 'Microservices' 
  | 'Testing' 
  | 'Quality Assurance'
  | 'Architecture';

export type RoadmapNodeStatus = 'Locked' | 'Unlocked' | 'In Progress' | 'Completed';

export interface SubTopic {
  id: string;
  title: string;
  durationMinutes: number;
  status: RoadmapNodeStatus;
  description?: string;
  videoUrl?: string;
  documentUrl?: string;
  materialsUrl?: string;
  assignment?: string;
}

export type Subtopic = SubTopic;

export interface RoadmapTopic {
  id: string;
  title: string;
  order: number;
  orderIndex?: number;
  status: RoadmapNodeStatus;
  description: string;
  subtopics: SubTopic[];
  prerequisites?: string[]; // IDs of required previous topics
  videoUrl?: string;
  documentUrl?: string;
  materialsUrl?: string;
  assignment?: string;
}

export type MaterialType = 
  | 'PowerPoint' 
  | 'PDF' 
  | 'Notes' 
  | 'Word' 
  | 'Excel'
  | 'Video' 
  | 'Udemy' 
  | 'YouTube' 
  | 'Code' 
  | 'GitHub' 
  | 'Image'
  | 'Markdown'
  | 'External';

export interface MaterialVersion {
  version: number;
  updatedAt: string;
  updatedBy: string;
  changeLog: string;
  contentUrl?: string;
  contentSummary?: string;
}

export interface StudyMaterial {
  id: string;
  topicId?: string;
  sessionId: string;
  title: string;
  type: MaterialType;
  url: string;
  urlType?: string;
  description: string;
  durationOrPages?: string;
  currentVersion: number;
  versions: MaterialVersion[];
  contentBody?: string; // Rich markdown or text content for reading/summarizing
  tags: string[];
}

export type QuestionType = 
  | 'MCQ' 
  | 'Multiple Select' 
  | 'Fill in Blank' 
  | 'Code Output' 
  | 'Match the Following' 
  | 'True / False';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  options?: string[];
  correctAnswer: string | string[]; // Single string or array for multi-select / matching
  explanation: string;
  points?: number;
  codeSnippet?: string;
  matchPairs?: { left: string; right: string }[];
}

export interface Quiz {
  id: string;
  sessionId: string;
  topicId?: string;
  title: string;
  description?: string;
  passingScorePercent: number;
  timeLimitMinutes: number;
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  scorePercent: number;
  passed: boolean;
  attemptedAt: string;
  timeTakenSeconds: number;
  answers: Record<string, any>;
}

export interface SessionAssignment {
  id: string;
  sessionId: string;
  topicId?: string;
  title: string;
  description: string;
  dueDate?: string;
  totalPoints?: number;
  instructions?: string;
  submissionFormat?: string;
  attachmentName?: string;
  attachmentUrl?: string;
  status?: 'Pending' | 'Submitted' | 'Graded';
  submittedUrl?: string;
  submittedAt?: string;
}

export interface Session {
  id: string;
  name: string;
  category: CategoryType;
  description: string;
  thumbnail: string;
  durationHours: number;
  difficulty: DifficultyLevel;
  progressPercent: number;
  isBookmarked?: boolean;
  lastAccessed?: string;
  isPublished: boolean;
  learningObjectives: string[];
  topics: RoadmapTopic[];
  studyMaterials?: StudyMaterial[];
  providedMaterials?: StudyMaterial[];
  additionalMaterials?: StudyMaterial[];
  assignments?: SessionAssignment[];
  notes?: PersonalNote[];
  quizzes?: Quiz[];
  rating: number;
  ratingCount: number;
  trainerName?: string;
  status?: 'Published' | 'Draft' | 'Archived' | 'Publish' | 'Archive';
  videoUrl?: string;
}

export interface PersonalNote {
  id: string;
  topicId: string;
  sessionId: string;
  topicTitle: string;
  content: string;
  highlightedText?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DiscussionPost {
  id: string;
  sessionId: string;
  authorName: string;
  authorRole: UserRole;
  authorAvatar?: string;
  title: string;
  body: string;
  createdAt: string;
  upvotes: number;
  replies: DiscussionReply[];
}

export interface DiscussionReply {
  id: string;
  authorName: string;
  authorRole: UserRole;
  authorAvatar?: string;
  body: string;
  createdAt: string;
  isAnswer?: boolean;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedDate?: string;
  category: string;
  isEarned: boolean;
}

export interface Certificate {
  id: string;
  certificateId: string;
  studentName: string;
  trackName: string;
  issuedDate: string;
  qrCodeUrl: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'session' | 'material' | 'quiz' | 'announcement' | 'roadmap';
  read: boolean;
  linkSessionId?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  important?: boolean;
}

export interface InspectMetadata {
  id: string;
  componentName: string;
  technology: string;
  backendApi: string;
  validation: string;
  businessPurpose: string;
  filesUsed: string[];
  databaseTable: string;
  authentication: string;
  relatedLearningTopics: string[];
  interviewQuestions: string[];
  bestPractices: string[];
}

export interface CodePlaygroundExercise {
  id: string;
  title: string;
  language: 'csharp' | 'sql' | 'javascript' | 'html' | 'css';
  difficulty: DifficultyLevel;
  instructions: string;
  initialCode: string;
  expectedOutput: string;
  solutionCode: string;
  hints: string[];
}

export interface KnowledgeGraphNode {
  id: string;
  label: string;
  category: CategoryType;
  description: string;
  prerequisites: string[];
  x?: number;
  y?: number;
}

// --- KNOWLEDGE HUB TYPES ---

export interface KnowledgeHubChannel {
  id: string;
  topicId: string;
  name: string;
  description: string;
}

export interface KnowledgeHubTopic {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  color: string;
  membersCount: number;
  discussionsCount: number;
  documentsCount: number;
  isJoined?: boolean;
  isFollowed?: boolean;
  isBookmarked?: boolean;
  notifyPreferences?: 'all' | 'mentions' | 'none';
  channels: KnowledgeHubChannel[];
}

export type DiscussionPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type DiscussionState = 'Open' | 'In Progress' | 'Answered' | 'Resolved' | 'Closed' | 'Archived';

export interface KnowledgeHubAttachment {
  id: string;
  name: string;
  size: string;
  type: 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'txt' | 'png' | 'jpg' | 'zip';
  url: string;
}

export interface KnowledgeHubComment {
  id: string;
  parentId: string; // discussionId or answerId
  authorId?: string;
  authorName: string;
  authorRole: UserRole | 'Mentor' | 'Trainer';
  authorAvatar?: string;
  body: string;
  createdAt: string;
  mentions?: string[];
  likes?: number;
}

export interface KnowledgeHubAnswer {
  id: string;
  discussionId: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole | 'Mentor' | 'Trainer';
  authorAvatar?: string;
  body: string;
  codeSnippet?: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down' | null;
  isAccepted: boolean;
  attachments?: KnowledgeHubAttachment[];
  comments: KnowledgeHubComment[];
}

export interface KnowledgeHubDiscussion {
  id: string;
  title: string;
  description: string;
  topicId: string;
  topicName: string;
  tags: string[];
  priority: DiscussionPriority;
  state: DiscussionState;
  authorId: string;
  authorName: string;
  authorRole: UserRole | 'Mentor' | 'Trainer';
  authorAvatar?: string;
  batch: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down' | null;
  isBookmarked?: boolean;
  acceptedAnswerId?: string;
  isLocked?: boolean;
  attachments?: KnowledgeHubAttachment[];
  answers: KnowledgeHubAnswer[];
  comments: KnowledgeHubComment[];
  sessionId?: string; // Linked session for Feature 14
  viewsCount?: number;
}

export interface DocumentVersionHistory {
  version: string;
  uploadedBy: string;
  uploadedAt: string;
  changelog: string;
  fileSize: string;
  downloadUrl?: string;
}

export interface KnowledgeHubDocument {
  id: string;
  name: string;
  description: string;
  topicId: string;
  topicName: string;
  tags: string[];
  version: string;
  author: string;
  uploadedDate: string;
  fileType: 'PDF' | 'DOCX' | 'XLSX' | 'PPTX' | 'TXT' | 'PNG' | 'JPG' | 'ZIP';
  fileSize: string;
  downloadCount: number;
  isApproved: boolean;
  versions: DocumentVersionHistory[];
  sessionId?: string;
  summaryAi?: string;
  faqsAi?: { question: string; answer: string }[];
  flashCardsAi?: { front: string; back: string }[];
}

export interface KnowledgeHubChatMessage {
  id: string;
  channelId: string;
  topicId: string;
  authorName: string;
  authorRole: UserRole | 'Mentor' | 'Trainer';
  authorAvatar?: string;
  content: string;
  timestamp: string;
  reactions: { emoji: string; count: number; users: string[] }[];
  repliesCount?: number;
  attachments?: KnowledgeHubAttachment[];
  codeSnippet?: string;
  isAiGenerated?: boolean;
}

export type ReputationLevel = 'Beginner' | 'Contributor' | 'Expert' | 'Mentor' | 'Champion';

export interface KnowledgeHubBadgeItem {
  id: string;
  title: string;
  description: string;
  tier: 'Bronze' | 'Silver' | 'Gold';
  icon: string;
  earnedDate?: string;
  isEarned: boolean;
}

export interface ReputationProfile {
  userId: string;
  userName: string;
  points: number;
  level: ReputationLevel;
  nextLevelPoints: number;
  questionsAsked: number;
  answersGiven: number;
  acceptedAnswers: number;
  documentsUploaded: number;
  upvotesReceived: number;
  badges: KnowledgeHubBadgeItem[];
}

