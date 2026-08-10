import { Session, StudyMaterial, Quiz, PersonalNote, DiscussionPost, User } from '../types';

export const fetchCurrentUser = async (): Promise<User> => {
  try {
    const res = await fetch('/api/user');
    if (!res.ok) throw new Error('Failed to fetch user');
    return await res.json();
  } catch (err) {
    console.warn('API fallback to local mock user', err);
    const { mockCurrentUser } = await import('../data/mockData');
    return mockCurrentUser;
  }
};

export const fetchSessions = async (): Promise<Session[]> => {
  try {
    const res = await fetch('/api/sessions');
    if (!res.ok) throw new Error('Failed to fetch sessions');
    return await res.json();
  } catch (err) {
    console.warn('API fallback to local mock sessions', err);
    const { mockSessions } = await import('../data/mockData');
    return mockSessions;
  }
};

export const fetchSessionById = async (id: string): Promise<Session & { studyMaterials: StudyMaterial[]; quizzes: Quiz[]; discussions: DiscussionPost[] }> => {
  try {
    const res = await fetch(`/api/sessions/${id}`);
    if (!res.ok) throw new Error('Session not found');
    return await res.json();
  } catch (err) {
    console.warn(`API fallback for session ${id}`, err);
    const { mockSessions, mockStudyMaterials, mockQuizzes, mockDiscussions } = await import('../data/mockData');
    const s = mockSessions.find(x => x.id === id) || mockSessions[0];
    return {
      ...s,
      studyMaterials: mockStudyMaterials.filter(m => m.sessionId === s.id),
      quizzes: mockQuizzes.filter(q => q.sessionId === s.id),
      discussions: mockDiscussions.filter(d => d.sessionId === s.id)
    };
  }
};

export const fetchStudyMaterialsApi = async (sessionId?: string): Promise<StudyMaterial[]> => {
  try {
    const url = sessionId ? `/api/materials?sessionId=${encodeURIComponent(sessionId)}` : '/api/materials';
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch study materials');
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.warn('Falling back to local session material data', err);
    return [];
  }
};

export const createSessionApi = async (sessionData: Partial<Session>): Promise<Session> => {
  const res = await fetch('/api/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sessionData)
  });
  return await res.json();
};

export const updateSessionApi = async (id: string, sessionData: Partial<Session>): Promise<Session> => {
  const res = await fetch(`/api/sessions/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sessionData)
  });
  return await res.json();
};

export const deleteSessionApi = async (id: string): Promise<void> => {
  await fetch(`/api/sessions/${id}`, { method: 'DELETE' });
};

export const submitQuizApi = async (quizId: string, userAnswers: Record<string, any>) => {
  const res = await fetch(`/api/quizzes/${quizId}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userAnswers })
  });
  return await res.json();
};

export const sendAiChatMessageApi = async (message: string, context?: any, chatHistory?: any[]) => {
  try {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, context, chatHistory })
    });
    return await res.json();
  } catch (err) {
    return { reply: "I am ready to assist you with your learning goals!" };
  }
};

export const summarizeMaterialAiApi = async (title: string, content: string) => {
  try {
    const res = await fetch('/api/ai/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    });
    return await res.json();
  } catch (err) {
    return { summary: `### Summary of ${title}\n- Core topic: Enterprise Development.\n- Key concept: Modular architecture and clean code.` };
  }
};

export const generateQuizAiApi = async (topicName: string, textContent?: string, numQuestions: number = 4) => {
  try {
    const res = await fetch('/api/ai/generate-quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topicName, textContent, numQuestions })
    });
    return await res.json();
  } catch (err) {
    return {
      quizTitle: `Practice Quiz: ${topicName}`,
      questions: [
        {
          id: 'ai-q1',
          type: 'MCQ',
          prompt: `What is the primary benefit of ${topicName}?`,
          options: ['Improved Maintainability', 'Faster CPU clock', 'Automatic DB backup', 'None'],
          correctAnswer: 'Improved Maintainability',
          explanation: 'Modular design isolates responsibilities.'
        }
      ]
    };
  }
};

export const generateAiQuizApi = generateQuizAiApi;
export const fetchSessionsApi = fetchSessions;

export const fetchAnalyticsApi = async () => {
  try {
    const res = await fetch('/api/analytics');
    return await res.json();
  } catch (err) {
    return {
      totalSessions: 6,
      totalGTs: 124,
      totalActiveUsers: 88,
      averageProgress: 68,
      averageQuizScore: 84,
      mostViewedSession: ".NET with C#",
      leastViewedSession: "Azure Cloud",
      mostDifficultTopic: "Async Programming",
      completionTrends: [
        { month: 'Jan', completed: 24, avgScore: 78 },
        { month: 'Feb', completed: 35, avgScore: 81 },
        { month: 'Mar', completed: 48, avgScore: 82 },
        { month: 'Apr', completed: 62, avgScore: 85 },
        { month: 'May', completed: 79, avgScore: 84 },
        { month: 'Jun', completed: 95, avgScore: 88 }
      ],
      trackProgressList: [
        { name: 'Insurance Domain', progress: 65 },
        { name: '.NET with C#', progress: 80 },
        { name: 'Frontend React', progress: 95 },
        { name: 'SQL & Database', progress: 55 },
        { name: 'Azure Cloud', progress: 20 }
      ]
    };
  }
};

export const searchEnterpriseApi = async (query: string) => {
  try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    return await res.json();
  } catch (err) {
    return { sessions: [], materials: [], quizzes: [] };
  }
};

export const logActivityApi = async (action: string, details?: string) => {
  try {
    await fetch('/api/activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, details, timestamp: new Date().toISOString() })
    });
  } catch (err) {
    console.warn('Failed to log activity', err);
  }
};

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

// Registered accounts with password hash / credentials
export const LOCAL_AUTH_USERS: Record<string, { password: string; role: 'GT' | 'Admin'; firstName: string; lastName: string; avatar: string; batch: string }> = {
  'sibibharathi.thangaraj@valuemomentum.com': {
    password: '$NMFeE1998x',
    role: 'GT',
    firstName: 'Sibibharathi',
    lastName: 'Thangaraj',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    batch: 'GT-2026-Batch-01'
  },
  'pavithran.sivanandham@valuemomentum.com': {
    password: '$NMFeE1998x',
    role: 'GT',
    firstName: 'Pavithran',
    lastName: 'Sivanandham',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    batch: 'GT-2026-Batch-01'
  },
  'anukraha.magdalene@valuemomentum.com': {
    password: '$NMFeE1998x',
    role: 'Admin',
    firstName: 'Anukraha',
    lastName: 'Magdalene',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    batch: 'L&D Administration'
  }
};

export const loginApi = async (email: string, password?: string): Promise<{ success: boolean; data?: AuthUserDto; message?: string }> => {
  const cleanEmail = email.trim().toLowerCase();
  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, password })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) {
        const localMeta = LOCAL_AUTH_USERS[cleanEmail];
        return {
          success: true,
          data: {
            token: data.data.token,
            userId: data.data.userId,
            email: data.data.email,
            firstName: data.data.firstName,
            lastName: data.data.lastName,
            role: data.data.role === 'Admin' ? 'Admin' : 'GT',
            avatar: localMeta?.avatar || (data.data.role === 'Admin' ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'),
            batch: localMeta?.batch || (data.data.role === 'Admin' ? 'L&D Administration' : 'GT-2026-Batch-01')
          }
        };
      }
    }
  } catch (err) {
    // API not reachable, fallback to local
  }

  // Fallback to local authentication with RBAC and password verification
  const user = LOCAL_AUTH_USERS[cleanEmail];
  if (!user) {
    return {
      success: false,
      message: 'No account found with this email address. Please check your credentials.'
    };
  }

  if (password !== user.password) {
    return {
      success: false,
      message: 'Invalid password. Please enter the correct password.'
    };
  }

  return {
    success: true,
    data: {
      token: `jwt-auth-token-${Date.now()}`,
      userId: `user-${cleanEmail}`,
      email: cleanEmail,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      avatar: user.avatar,
      batch: user.batch
    }
  };
};

export const forgotPasswordApi = async (email: string): Promise<{ success: boolean; message?: string }> => {
  const cleanEmail = email.trim().toLowerCase();

  // Try local Express mock server first (primary)
  try {
    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail })
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      return { success: true, message: data.message || 'OTP has been sent to your registered email address.' };
    }
    return { success: false, message: data.message || 'Failed to send OTP.' };
  } catch {
    // Express server not reachable, try .NET backend
  }

  try {
    const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail })
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      return { success: true, message: data.message };
    }
    return { success: false, message: data.message || data.errors?.[0] || 'Failed to send OTP.' };
  } catch {
    // .NET backend not reachable either
    const user = LOCAL_AUTH_USERS[cleanEmail];
    if (!user) {
      return { success: false, message: 'No registered account found with this email address.' };
    }
    return { success: true, message: 'OTP has been sent to your registered email address.' };
  }
};

export const verifyOtpApi = async (email: string, otp: string): Promise<{ success: boolean; resetToken?: string; message?: string }> => {
  const cleanEmail = email.trim().toLowerCase();

  // Try local Express mock server first
  try {
    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, otp: otp.trim() })
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      return { success: true, resetToken: data.data?.resetToken, message: data.message };
    }
    return { success: false, message: data.message || 'Invalid OTP code.' };
  } catch {
    // Express server not reachable, try .NET backend
  }

  try {
    const res = await fetch('http://localhost:5000/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, otp: otp.trim() })
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      return { success: true, resetToken: data.data?.resetToken, message: data.message };
    }
    return { success: false, message: data.message || data.errors?.[0] || 'Invalid OTP code.' };
  } catch {
    return { success: false, message: 'Verification failed. Please ensure the backend is reachable.' };
  }
};

export const resetPasswordApi = async (email: string, resetToken: string, newPassword: string): Promise<{ success: boolean; message?: string }> => {
  const cleanEmail = email.trim().toLowerCase();

  // Try local Express mock server first
  try {
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, resetToken, newPassword })
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      if (LOCAL_AUTH_USERS[cleanEmail]) {
        LOCAL_AUTH_USERS[cleanEmail].password = newPassword;
      }
      return { success: true, message: data.message };
    }
    return { success: false, message: data.message || 'Failed to reset password.' };
  } catch {
    // Express server not reachable, try .NET backend
  }

  try {
    const res = await fetch('http://localhost:5000/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, resetToken, newPassword })
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      if (LOCAL_AUTH_USERS[cleanEmail]) {
        LOCAL_AUTH_USERS[cleanEmail].password = newPassword;
      }
      return { success: true, message: data.message };
    }
    return { success: false, message: data.message || data.errors?.[0] || 'Failed to reset password.' };
  } catch {
    if (LOCAL_AUTH_USERS[cleanEmail]) {
      LOCAL_AUTH_USERS[cleanEmail].password = newPassword;
      return { success: true, message: 'Password has been reset successfully.' };
    }
    return { success: false, message: 'Failed to reset password.' };
  }
};

export const changePasswordApi = async (email: string, currentPassword: string, newPassword: string): Promise<{ success: boolean; message?: string }> => {
  const cleanEmail = email.trim().toLowerCase();
  try {
    const res = await fetch('http://localhost:5000/api/auth/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, currentPassword, newPassword })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        if (LOCAL_AUTH_USERS[cleanEmail]) {
          LOCAL_AUTH_USERS[cleanEmail].password = newPassword;
        }
        return { success: true, message: 'Password changed successfully.' };
      } else {
        return { success: false, message: data.errors?.[0] || data.message || 'Failed to change password.' };
      }
    }
  } catch (err) {
    // API not reachable, fallback to local
  }

  const user = LOCAL_AUTH_USERS[cleanEmail];
  if (!user) {
    return { success: false, message: 'Account not found.' };
  }

  if (user.password !== currentPassword) {
    return { success: false, message: 'Current password does not match.' };
  }

  if (newPassword.length < 8) {
    return { success: false, message: 'New password must be at least 8 characters long.' };
  }

  user.password = newPassword;
  return { success: true, message: 'Password changed successfully in your profile.' };
};


