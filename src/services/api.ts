import { Session, StudyMaterial, Quiz, PersonalNote, DiscussionPost, User } from '../types';

/**
 * All requests go to relative /api/* paths. The Node server proxies them to the .NET
 * API (see server.ts), so there is no hardcoded host here and no CORS to configure —
 * browser, proxy and API share an origin.
 *
 * This module previously shipped a LOCAL_AUTH_USERS table containing real passwords
 * and, when the API was unreachable, authenticated against it and minted a fake token.
 * Both are gone: credentials are never verified in the browser.
 */

const TOKEN_KEY = 'token';

export const getAuthToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

export const clearAuthToken = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* storage unavailable (private mode); nothing to clear */
  }
};

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/** Shape returned by the .NET ApiResponse<T> envelope. */
interface ApiEnvelope<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string[];
}

async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);

  if (init.body !== undefined && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const token = getAuthToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(path, { ...init, headers });

  if (res.status === 401) {
    // The token is missing, expired or rejected. Drop it so the UI can re-prompt.
    clearAuthToken();
    throw new ApiError('Your session has expired. Please sign in again.', 401);
  }

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message = body?.message || body?.errors?.[0] || `Request failed (${res.status}).`;
    throw new ApiError(message, res.status);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return (await res.json()) as T;
}

/** Unwraps the .NET ApiResponse<T> envelope used by the auth endpoints. */
async function apiFetchEnvelope<T>(path: string, init: RequestInit = {}): Promise<ApiEnvelope<T>> {
  const headers = new Headers(init.headers);
  if (init.body !== undefined && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  const token = getAuthToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(path, { ...init, headers });
  const body = (await res.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!body) {
    throw new ApiError(`Request failed (${res.status}).`, res.status);
  }

  return body;
}

// --- USER ---

export const fetchCurrentUser = async (): Promise<User> =>
  apiFetch<User>('/api/user');

export const updateDailyGoalApi = async (dailyGoalMinutes: number): Promise<User> =>
  apiFetch<User>('/api/user/goal', {
    method: 'POST',
    body: JSON.stringify({ dailyGoalMinutes })
  });

// --- SESSIONS ---

/**
 * The API returns the persistence shape, which differs from the UI's Session type in
 * four places. Rendering it unmapped puts objects where the UI expects strings, which
 * React refuses to render, and the whole app unmounts to a blank page.
 *
 *   thumbnailUrl          -> thumbnail
 *   featuredVideoUrl      -> videoUrl
 *   learningObjectives[]  -> objects with objectiveText, not strings
 *   topics[].defaultStatus-> status, and orderIndex -> order
 *
 * Each field falls back to the already-correct name, so data that is mapped upstream
 * later passes through untouched.
 */
function adaptSubtopic(s: any) {
  return {
    ...s,
    id: s.id,
    title: s.title,
    durationMinutes: s.durationMinutes ?? 0,
    status: s.status ?? s.defaultStatus ?? 'Unlocked'
  };
}

function adaptTopic(t: any) {
  return {
    ...t,
    id: t.id,
    title: t.title,
    description: t.description ?? '',
    order: t.order ?? t.orderIndex ?? 0,
    orderIndex: t.orderIndex,
    status: t.status ?? t.defaultStatus ?? 'Unlocked',
    subtopics: (t.subtopics ?? []).map(adaptSubtopic)
  };
}

/**
 * The API stores a question's answer in correctAnswerJson; the UI reads correctAnswer.
 * Left unmapped, QuizReview compares the user's answer against undefined and marks
 * every question wrong, even though the server scored the attempt correctly.
 *
 * The column holds either a bare string ("class") or a JSON array for multi-select,
 * so parse when it looks like JSON and fall back to the raw value otherwise.
 */
function parseCorrectAnswer(raw: any): string | string[] {
  if (Array.isArray(raw)) return raw.map(String);
  if (typeof raw !== 'string') return raw ?? '';

  const trimmed = raw.trim();
  if (trimmed.startsWith('[')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) return parsed.map(String);
    } catch {
      // Not JSON after all; treat it as a literal answer.
    }
  }
  return raw;
}

function adaptQuestion(q: any) {
  return {
    ...q,
    options: q.options ?? [],
    correctAnswer: q.correctAnswer ?? parseCorrectAnswer(q.correctAnswerJson),
    explanation: q.explanation ?? ''
  };
}

function adaptQuiz(q: any) {
  return {
    ...q,
    questions: (q.questions ?? []).map(adaptQuestion)
  };
}

function adaptSession(s: any): Session {
  const objectives = (s.learningObjectives ?? [])
    .slice()
    .sort((a: any, b: any) => (a?.orderIndex ?? 0) - (b?.orderIndex ?? 0))
    // Tolerates both the API shape (objects) and plain strings.
    .map((o: any) => (typeof o === 'string' ? o : o?.objectiveText ?? ''))
    .filter(Boolean);

  return {
    ...s,
    thumbnail: s.thumbnail ?? s.thumbnailUrl ?? '',
    videoUrl: s.videoUrl ?? s.featuredVideoUrl,
    // Per-user progress is not part of this payload yet.
    progressPercent: s.progressPercent ?? 0,
    learningObjectives: objectives,
    topics: (s.topics ?? []).map(adaptTopic),
    studyMaterials: s.studyMaterials ?? [],
    quizzes: (s.quizzes ?? []).map(adaptQuiz),
    assignments: s.assignments ?? [],
    notes: s.notes ?? []
  } as Session;
}

export const fetchSessions = async (): Promise<Session[]> => {
  const data = await apiFetch<any[]>('/api/sessions');
  return (data ?? []).map(adaptSession);
};

export const fetchSessionById = async (id: string): Promise<Session> =>
  adaptSession(await apiFetch<any>(`/api/sessions/${id}`));

export const createSessionApi = async (sessionData: Partial<Session>): Promise<Session> =>
  apiFetch<Session>('/api/sessions', {
    method: 'POST',
    body: JSON.stringify(sessionData)
  });

export const updateSessionApi = async (id: string, sessionData: Partial<Session>): Promise<Session> =>
  apiFetch<Session>(`/api/sessions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(sessionData)
  });

export const deleteSessionApi = async (id: string): Promise<void> =>
  apiFetch<void>(`/api/sessions/${id}`, { method: 'DELETE' });

// --- STUDY MATERIALS ---

export const fetchStudyMaterialsApi = async (sessionId?: string): Promise<StudyMaterial[]> => {
  const url = sessionId
    ? `/api/materials?sessionId=${encodeURIComponent(sessionId)}`
    : '/api/materials';
  return apiFetch<StudyMaterial[]>(url);
};

export const createStudyMaterialApi = async (material: Partial<StudyMaterial>): Promise<StudyMaterial> =>
  apiFetch<StudyMaterial>('/api/materials', {
    method: 'POST',
    body: JSON.stringify(material)
  });

export const addMaterialVersionApi = async (
  materialId: string,
  payload: { changeLog?: string; contentBody?: string; contentUrl?: string; updatedBy?: string }
): Promise<StudyMaterial> =>
  apiFetch<StudyMaterial>(`/api/materials/${materialId}/new-version`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });

// --- QUIZZES ---

export const fetchQuizzesApi = async (sessionId?: string): Promise<Quiz[]> => {
  const url = sessionId
    ? `/api/quizzes?sessionId=${encodeURIComponent(sessionId)}`
    : '/api/quizzes';
  const data = await apiFetch<any[]>(url);
  return (data ?? []).map(adaptQuiz);
};

export const submitQuizApi = async (quizId: string, userAnswers: Record<string, any>, timeTakenSeconds?: number) =>
  apiFetch<any>(`/api/quizzes/${quizId}/submit`, {
    method: 'POST',
    body: JSON.stringify({ userAnswers, timeTakenSeconds })
  });

// --- PERSONAL NOTES ---

export const fetchNotesApi = async (sessionId?: string): Promise<PersonalNote[]> => {
  const url = sessionId
    ? `/api/notes?sessionId=${encodeURIComponent(sessionId)}`
    : '/api/notes';
  return apiFetch<PersonalNote[]>(url);
};

export const createNoteApi = async (note: Partial<PersonalNote>): Promise<PersonalNote> =>
  apiFetch<PersonalNote>('/api/notes', {
    method: 'POST',
    body: JSON.stringify(note)
  });

export const updateNoteApi = async (id: string, note: Partial<PersonalNote>): Promise<PersonalNote> =>
  apiFetch<PersonalNote>(`/api/notes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(note)
  });

export const deleteNoteApi = async (id: string): Promise<void> =>
  apiFetch<void>(`/api/notes/${id}`, { method: 'DELETE' });

// --- DISCUSSIONS ---

export const fetchDiscussionsApi = async (sessionId?: string): Promise<DiscussionPost[]> => {
  const url = sessionId
    ? `/api/discussions?sessionId=${encodeURIComponent(sessionId)}`
    : '/api/discussions';
  return apiFetch<DiscussionPost[]>(url);
};

export const createDiscussionApi = async (post: { sessionId: string; title: string; body: string }): Promise<DiscussionPost> =>
  apiFetch<DiscussionPost>('/api/discussions', {
    method: 'POST',
    body: JSON.stringify(post)
  });

export const replyToDiscussionApi = async (postId: string, body: string, isAnswer = false): Promise<DiscussionPost> =>
  apiFetch<DiscussionPost>(`/api/discussions/${postId}/reply`, {
    method: 'POST',
    body: JSON.stringify({ body, isAnswer })
  });

export const upvoteDiscussionApi = async (postId: string): Promise<DiscussionPost> =>
  apiFetch<DiscussionPost>(`/api/discussions/${postId}/upvote`, { method: 'POST' });

// --- ANALYTICS / SEARCH / ACTIVITY ---

export const fetchAnalyticsApi = async () =>
  apiFetch<any>('/api/analytics');

export const searchEnterpriseApi = async (query: string) =>
  apiFetch<any>(`/api/search?q=${encodeURIComponent(query)}`);

export const logActivityApi = async (action: string, details?: string): Promise<void> => {
  try {
    await apiFetch<void>('/api/activity', {
      method: 'POST',
      body: JSON.stringify({ action, details, timestamp: new Date().toISOString() })
    });
  } catch (err) {
    // Telemetry is best-effort: a failed log must never interrupt the user's action.
    console.warn('Failed to log activity', err);
  }
};

// --- AI (served locally by server.ts, not the .NET API) ---

/** A passage the tutor's answer was drawn from, when the answer is grounded. */
export interface AiSource {
  ref: number;
  title: string;
  url?: string | null;
  source_type?: string;
  similarity?: number;
}

export interface AiChatReply {
  reply: string;
  /** Populated only when the answer came from the portal's indexed material. */
  sources: AiSource[];
  /** False when the model answered from general knowledge instead. */
  grounded: boolean;
}

export const sendAiChatMessageApi = async (
  message: string,
  context?: any,
  chatHistory?: any[]
): Promise<AiChatReply> => {
  try {
    const data = await apiFetch<any>('/api/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message, context, chatHistory })
    });
    return {
      reply: data?.reply ?? '',
      sources: Array.isArray(data?.sources) ? data.sources : [],
      grounded: Boolean(data?.grounded)
    };
  } catch {
    return {
      reply: 'The AI tutor is unavailable right now. Please try again shortly.',
      sources: [],
      grounded: false
    };
  }
};

// --- RETRIEVAL INDEX (proxied to the RAG service) ---

export const ragStatsApi = async () => apiFetch<any>('/api/rag/stats');

export const ragIngestApi = async () => apiFetch<any>('/api/rag/ingest', { method: 'POST' });

export const ragSearchApi = async (query: string, topK = 5) =>
  apiFetch<any>('/api/rag/search', {
    method: 'POST',
    body: JSON.stringify({ query, top_k: topK })
  });

export const summarizeMaterialAiApi = async (title: string, content: string) => {
  try {
    return await apiFetch<any>('/api/ai/summarize', {
      method: 'POST',
      body: JSON.stringify({ title, content })
    });
  } catch {
    return { summary: `Summary for "${title}" is unavailable right now. Please try again shortly.` };
  }
};

export const generateQuizAiApi = async (topicName: string, textContent?: string, numQuestions: number = 4) => {
  try {
    return await apiFetch<any>('/api/ai/generate-quiz', {
      method: 'POST',
      body: JSON.stringify({ topicName, textContent, numQuestions })
    });
  } catch {
    return { quizTitle: `Practice Quiz: ${topicName}`, questions: [] };
  }
};

export const generateAiQuizApi = generateQuizAiApi;
export const fetchSessionsApi = fetchSessions;

// --- AUTH ---

export interface AuthUserDto {
  token: string;
  userId?: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'GT' | 'Admin';
  avatar?: string;
  batch?: string;
}

export const loginApi = async (
  email: string,
  password?: string
): Promise<{ success: boolean; data?: AuthUserDto; message?: string }> => {
  const cleanEmail = email.trim().toLowerCase();

  try {
    const body = await apiFetchEnvelope<AuthUserDto>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: cleanEmail, password })
    });

    if (body.success && body.data) {
      return {
        success: true,
        data: {
          ...body.data,
          role: body.data.role === 'Admin' ? 'Admin' : 'GT'
        }
      };
    }

    return { success: false, message: body.message || body.errors?.[0] || 'Invalid email address or password.' };
  } catch (err: any) {
    // No offline fallback: without the API we cannot verify a password.
    return { success: false, message: err?.message || 'Unable to reach the sign-in service. Please try again.' };
  }
};

export const forgotPasswordApi = async (email: string): Promise<{ success: boolean; message?: string }> => {
  const cleanEmail = email.trim().toLowerCase();
  try {
    const body = await apiFetchEnvelope<unknown>('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email: cleanEmail })
    });
    return { success: body.success, message: body.message || body.errors?.[0] };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Unable to send the OTP right now.' };
  }
};

export const verifyOtpApi = async (
  email: string,
  otp: string
): Promise<{ success: boolean; resetToken?: string; message?: string }> => {
  const cleanEmail = email.trim().toLowerCase();
  try {
    const body = await apiFetchEnvelope<{ resetToken?: string }>('/api/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email: cleanEmail, otp: otp.trim() })
    });
    return {
      success: body.success,
      resetToken: body.data?.resetToken,
      message: body.message || body.errors?.[0]
    };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Verification failed. Please try again.' };
  }
};

export const resetPasswordApi = async (
  email: string,
  resetToken: string,
  newPassword: string
): Promise<{ success: boolean; message?: string }> => {
  const cleanEmail = email.trim().toLowerCase();
  try {
    const body = await apiFetchEnvelope<unknown>('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email: cleanEmail, resetToken, newPassword })
    });
    return { success: body.success, message: body.message || body.errors?.[0] };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to reset password.' };
  }
};

export const changePasswordApi = async (
  email: string,
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; message?: string }> => {
  const cleanEmail = email.trim().toLowerCase();
  try {
    const body = await apiFetchEnvelope<unknown>('/api/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ email: cleanEmail, currentPassword, newPassword })
    });
    return { success: body.success, message: body.message || body.errors?.[0] };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to change password.' };
  }
};
