/**
 * Runs the real fetchSessions() from src/services/api.ts against the deployed API and
 * checks the result matches the Session shape the UI renders.
 *
 * The blank page was caused by learningObjectives arriving as objects where the UI
 * expects strings; React cannot render an object as a child and unmounts the tree.
 *
 * Usage: npx tsx scripts/verify-session-shape.ts [baseUrl]
 */
const BASE = process.argv[2] ?? 'https://mission-possible-frontend.up.railway.app';

// api.ts uses relative paths (the browser resolves them against the page origin) and
// reads localStorage for the token. Provide both so the module can run under Node.
const originalFetch = globalThis.fetch;
globalThis.fetch = ((input: any, init?: any) =>
  originalFetch(typeof input === 'string' && input.startsWith('/') ? BASE + input : input, init)) as typeof fetch;

(globalThis as any).localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {}
};

const { fetchSessions, fetchQuizzesApi } = await import('../src/services/api');

let failures = 0;
function check(label: string, condition: boolean, detail = '') {
  if (condition) {
    console.log(`  PASS  ${label}${detail ? '  ' + detail : ''}`);
  } else {
    console.log(`  FAIL  ${label}${detail ? '  ' + detail : ''}`);
    failures++;
  }
}

const sessions = await fetchSessions();
console.log(`\nfetched ${sessions.length} session(s) from ${BASE}\n`);

const s: any = sessions[0];
check('session exists', Boolean(s));

check('thumbnail is a non-empty string', typeof s.thumbnail === 'string' && s.thumbnail.length > 0,
  `-> ${String(s.thumbnail).slice(0, 45)}...`);

check('progressPercent is a number', typeof s.progressPercent === 'number', `-> ${s.progressPercent}`);

check('learningObjectives are STRINGS (this caused the blank page)',
  Array.isArray(s.learningObjectives) && s.learningObjectives.every((o: any) => typeof o === 'string'),
  `-> ${JSON.stringify(s.learningObjectives)}`);

check('learningObjectives sorted by orderIndex',
  s.learningObjectives[0]?.includes('type system'),
  `-> first = "${s.learningObjectives[0]}"`);

check('topics is an array', Array.isArray(s.topics), `-> ${s.topics.length} topic(s)`);

const t: any = s.topics[0];
check('topic.status is set', typeof t?.status === 'string', `-> ${t?.status}`);
check('topic.order is a number', typeof t?.order === 'number', `-> ${t?.order}`);
check('topic.subtopics is an array', Array.isArray(t?.subtopics), `-> ${t?.subtopics?.length} subtopic(s)`);

const st: any = t?.subtopics?.[0];
check('subtopic.status is set', typeof st?.status === 'string', `-> ${st?.status}`);
check('subtopic.durationMinutes is a number', typeof st?.durationMinutes === 'number', `-> ${st?.durationMinutes}`);

check('no object leaks into a string field',
  s.learningObjectives.every((o: any) => o !== '[object Object]'));

// Quizzes: the API stores the answer in correctAnswerJson, the UI reads correctAnswer.
// Unmapped, QuizReview marks every question wrong.
const quizzes: any[] = await fetchQuizzesApi();
console.log(`\nfetched ${quizzes.length} quiz(zes)\n`);

const q: any = quizzes[0];
check('quiz has questions', Array.isArray(q?.questions) && q.questions.length > 0,
  `-> ${q?.questions?.length} question(s)`);

const qq: any = q?.questions?.[0];
check('question.correctAnswer is populated (was correctAnswerJson)',
  qq?.correctAnswer !== undefined && qq?.correctAnswer !== '',
  `-> "${qq?.correctAnswer}"`);

check('question.options is a string array',
  Array.isArray(qq?.options) && qq.options.every((o: any) => typeof o === 'string'),
  `-> ${JSON.stringify(qq?.options)}`);

check('correctAnswer actually matches one of the options',
  Array.isArray(qq?.options) && qq.options.includes(qq.correctAnswer));

// Quizzes nested inside a session must be mapped the same way.
const nested: any = s.quizzes?.[0];
if (nested) {
  check('nested session.quizzes[0] is mapped too',
    nested.questions?.[0]?.correctAnswer !== undefined,
    `-> "${nested.questions?.[0]?.correctAnswer}"`);
}

console.log(`\n${failures === 0 ? 'ALL CHECKS PASSED' : failures + ' CHECK(S) FAILED'}`);

// Set the code and let Node drain naturally. Calling process.exit() here trips a libuv
// assertion on Windows because fetch's keep-alive socket is still open.
process.exitCode = failures === 0 ? 0 : 1;
