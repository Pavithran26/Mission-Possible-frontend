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



