const habits = [
  { id: "exercise", name: "运动", icon: "动", unit: "天", points: 12, target: 4 },
  { id: "reading", name: "读书", icon: "读", unit: "天", points: 8, target: 5 },
  { id: "diet", name: "健康饮食", icon: "食", unit: "天", points: 10, target: 5 },
  { id: "sleep", name: "睡眠", icon: "眠", unit: "天", points: 10, target: 5 },
  { id: "ai", name: "AI 学习", icon: "AI", unit: "天", points: 8, target: 5 },
];

const achievementCategories = [
  { id: "all", name: "全部" },
  { id: "milestone", name: "里程碑" },
  { id: "balance", name: "均衡" },
  { id: "habit", name: "专项" },
  { id: "score", name: "积分" },
];

const tierLabels = {
  bronze: "铜",
  silver: "银",
  gold: "金",
  master: "大师",
};

const toneLabels = {
  positive: "正向成就",
  negative: "小插曲",
};

const achievements = [
  {
    id: "firstSettle",
    category: "milestone",
    tier: "bronze",
    icon: "启",
    title: "第一次周结算",
    desc: "完成任意一次周结算",
    target: 1,
    progress: ({ settledCount }) => settledCount,
  },
  {
    id: "streak3",
    category: "milestone",
    tier: "silver",
    icon: "续",
    title: "三周不断线",
    desc: "累计完成 3 次周结算",
    target: 3,
    progress: ({ settledCount }) => settledCount,
  },
  {
    id: "seasoned",
    category: "milestone",
    tier: "gold",
    icon: "季",
    title: "一季同行",
    desc: "累计完成 8 次周结算",
    target: 8,
    progress: ({ settledCount }) => settledCount,
  },
  {
    id: "weeklyJudge",
    category: "milestone",
    tier: "bronze",
    icon: "判",
    title: "轮值裁判",
    desc: "负责完成任意一周的结算",
    target: 1,
    progress: ({ judgeWeeks }) => judgeWeeks,
    count: ({ judgeWeeks }) => judgeWeeks,
  },
  {
    id: "weeklyChampion",
    category: "score",
    tier: "silver",
    icon: "冠",
    title: "周第一",
    desc: "在任意一次周结算中拿到第一",
    target: 1,
    progress: ({ weeklyFirstCount }) => weeklyFirstCount,
    count: ({ weeklyFirstCount }) => weeklyFirstCount,
  },
  {
    id: "weeklyTail",
    category: "score",
    tier: "bronze",
    icon: "尾",
    title: "周倒数第一",
    desc: "在任意一次周结算中排到最后",
    tone: "negative",
    target: 1,
    progress: ({ weeklyLastCount }) => weeklyLastCount,
    count: ({ weeklyLastCount }) => weeklyLastCount,
  },
  {
    id: "balanced",
    category: "balance",
    tier: "silver",
    icon: "衡",
    title: "五边形战士",
    desc: "任意一周五项都达到目标",
    target: 1,
    progress: ({ balancedWeeks }) => balancedWeeks,
    count: ({ balancedWeeks }) => balancedWeeks,
  },
  {
    id: "balanced3",
    category: "balance",
    tier: "gold",
    icon: "稳",
    title: "稳定五边形",
    desc: "累计 3 周五项全部达标",
    target: 3,
    progress: ({ balancedWeeks }) => balancedWeeks,
  },
  {
    id: "perfectDay",
    category: "balance",
    tier: "bronze",
    icon: "满",
    title: "今日满格",
    desc: "本周任意一天完成 5 项",
    target: 1,
    progress: ({ perfectDays }) => perfectDays,
    count: ({ perfectDays }) => perfectDays,
  },
  {
    id: "perfectWeek",
    category: "balance",
    tier: "master",
    icon: "冠",
    title: "一周满格",
    desc: "本周 7 天每天都完成 5 项",
    target: 7,
    progress: ({ perfectDays }) => perfectDays,
  },
  {
    id: "indulgenceDay",
    category: "balance",
    tier: "bronze",
    icon: "放",
    title: "放纵日",
    desc: "次日或周结算时，存在一天五项均未记录",
    tone: "negative",
    target: 1,
    progress: ({ indulgenceDays }) => indulgenceDays,
    count: ({ indulgenceDays }) => indulgenceDays,
  },
  {
    id: "sweat",
    category: "habit",
    tier: "bronze",
    icon: "动",
    title: "行动派",
    desc: "任意一周运动达到 5 天",
    target: 5,
    progress: ({ maxHabitWeek }) => maxHabitWeek.exercise,
  },
  {
    id: "deepReader",
    category: "habit",
    tier: "bronze",
    icon: "读",
    title: "深读者",
    desc: "任意一周阅读达到 5 天",
    target: 5,
    progress: ({ maxHabitWeek }) => maxHabitWeek.reading,
  },
  {
    id: "steadySleep",
    category: "habit",
    tier: "silver",
    icon: "眠",
    title: "作息守门员",
    desc: "任意一周睡眠达标 6 天",
    target: 6,
    progress: ({ maxHabitWeek }) => maxHabitWeek.sleep,
  },
  {
    id: "cleanFuel",
    category: "habit",
    tier: "silver",
    icon: "食",
    title: "清爽燃料",
    desc: "任意一周健康饮食达到 6 天",
    target: 6,
    progress: ({ maxHabitWeek }) => maxHabitWeek.diet,
  },
  {
    id: "aiBuilder",
    category: "habit",
    tier: "bronze",
    icon: "AI",
    title: "AI 建造者",
    desc: "任意一周 AI 学习达到 5 天",
    target: 5,
    progress: ({ maxHabitWeek }) => maxHabitWeek.ai,
  },
  {
    id: "blankHabitWeek",
    category: "habit",
    tier: "bronze",
    icon: "空",
    title: "专项失踪案",
    desc: "任意一周某一项 7 天都没有完成",
    tone: "negative",
    target: 1,
    progress: ({ blankHabitWeeks }) => blankHabitWeeks,
    count: ({ blankHabitWeeks }) => blankHabitWeeks,
  },
  {
    id: "habitHundred",
    category: "habit",
    tier: "gold",
    icon: "百",
    title: "单项百日",
    desc: "任意一个习惯累计完成 100 天",
    target: 100,
    progress: ({ maxHabitTotal }) => maxHabitTotal,
  },
  {
    id: "hundred",
    category: "score",
    tier: "bronze",
    icon: "100",
    title: "破百分",
    desc: "任意单周积分达到 100",
    target: 100,
    progress: ({ bestWeekScore }) => bestWeekScore,
  },
  {
    id: "threeHundred",
    category: "score",
    tier: "silver",
    icon: "300",
    title: "三百分俱乐部",
    desc: "累计积分达到 300",
    target: 300,
    progress: ({ totalScore }) => totalScore,
  },
  {
    id: "thousand",
    category: "score",
    tier: "master",
    icon: "1K",
    title: "长期主义者",
    desc: "累计积分达到 1000",
    target: 1000,
    progress: ({ totalScore }) => totalScore,
  },
  {
    id: "miracleChain",
    category: "balance",
    tier: "silver",
    icon: "串",
    title: "神迹连发",
    desc: "神迹连续达成 3 天",
    target: 3,
    progress: ({ bestRewardStreak }) => bestRewardStreak.minor,
  },
  {
    id: "hardwareChain",
    category: "balance",
    tier: "master",
    icon: "冠",
    title: "五金连锁店",
    desc: "五金店连续达成 3 天",
    target: 3,
    progress: ({ bestRewardStreak }) => bestRewardStreak.grand,
  },
  {
    id: "indulgenceChain",
    category: "balance",
    tier: "silver",
    icon: "裂",
    title: "摆烂三连",
    desc: "放纵日连续触发 3 次",
    tone: "negative",
    target: 3,
    progress: ({ bestRewardStreak }) => bestRewardStreak.penalty,
  },
];

const levels = [
  { name: "见习者", min: 0 },
  { name: "稳定执行者", min: 80 },
  { name: "自律核心", min: 160 },
  { name: "复利玩家", min: 260 },
  { name: "长期主义者", min: 400 },
];

const storageKey = "discipline-weekly-system-v2";
const legacyStorageKey = "discipline-weekly-system-v1";
const defaultPerson = { id: "person-default", name: "我" };
let state = loadCachedState();
let isRemoteReady = false;
let saveQueue = Promise.resolve();

const dailyCards = document.querySelector("#dailyCards");
const achievementsEl = document.querySelector("#achievements");
const achievementOverviewEl = document.querySelector("#achievementOverview");
const achievementFiltersEl = document.querySelector("#achievementFilters");
const achievementToneTabsEl = document.querySelector("#achievementToneTabs");
const historyList = document.querySelector("#historyList");
const weeklyLeaderboardList = document.querySelector("#weeklyLeaderboardList");
const totalLeaderboardList = document.querySelector("#totalLeaderboardList");
const personTabs = document.querySelector("#personTabs");
const personForm = document.querySelector("#personForm");
const personNameInput = document.querySelector("#personNameInput");
const settleWeekButton = document.querySelector("#settleWeek");
const feedbackToast = document.querySelector("#feedbackToast");
const syncStatusEl = document.querySelector("#syncStatus");
const generateReportButton = document.querySelector("#generateReport");
const reportModal = document.querySelector("#reportModal");
const reportModalImage = document.querySelector("#reportModalImage");
const reportDownloadButton = document.querySelector("#reportDownloadButton");
const reportCopyButton = document.querySelector("#reportCopyButton");
const closeReportModalButton = document.querySelector("#closeReportModal");
const reportModalBackdrop = document.querySelector(".report-modal-backdrop");
let feedbackTimer;
let activeAchievementCategory = "all";
let activeAchievementTone = "positive";
let currentReportImageUrl = "";

function createEmptyTotals() {
  return Object.fromEntries(habits.map((habit) => [habit.id, 0]));
}

function loadCachedState() {
  const fallback = {
    people: [defaultPerson],
    activePersonId: defaultPerson.id,
    dailyEntries: { [defaultPerson.id]: {} },
    history: [],
  };

  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved) {
      return normalizeState({ ...fallback, ...saved });
    }

    const legacy = JSON.parse(localStorage.getItem(legacyStorageKey));
    if (legacy) {
      fallback.dailyEntries[defaultPerson.id][getDateKey(new Date())] = legacy.entries || createEmptyTotals();
      fallback.history = (legacy.history || []).map((week) => ({
        id: week.id || crypto.randomUUID(),
        range: week.range,
        settledAt: week.settledAt,
        people: [
          {
            personId: defaultPerson.id,
            personName: defaultPerson.name,
            score: week.score || 0,
            totals: week.entries || createEmptyTotals(),
          },
        ],
      }));
    }
  } catch {
    return fallback;
  }

  return fallback;
}

function normalizeState(nextState) {
  if (!nextState.people?.length) {
    nextState.people = [defaultPerson];
  }

  nextState.activePersonId = nextState.people.some((person) => person.id === nextState.activePersonId)
    ? nextState.activePersonId
    : nextState.people[0].id;
  nextState.dailyEntries ||= {};
  nextState.history ||= [];

  nextState.people.forEach((person) => {
    nextState.dailyEntries[person.id] ||= {};
  });

  return nextState;
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
  updateSyncStatus(isRemoteReady ? "正在同步..." : "本地模式：后端未连接", isRemoteReady ? "saving" : "offline");

  if (!isRemoteReady) return;

  saveQueue = saveQueue
    .then(() =>
      fetch("/api/state", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      }),
    )
    .then((response) => {
      if (!response.ok) throw new Error("Save failed");
      return response.json();
    })
    .then((remoteState) => {
      state = normalizeState(remoteState);
      localStorage.setItem(storageKey, JSON.stringify(state));
      updateSyncStatus("已同步到后端", "online");
    })
    .catch(() => {
      isRemoteReady = false;
      updateSyncStatus("同步失败：已暂存到本机", "offline");
    });
}

function updateSyncStatus(message, status = "online") {
  syncStatusEl.textContent = message;
  syncStatusEl.dataset.status = status;
}

async function loadRemoteState() {
  try {
    const response = await fetch("/api/state", { cache: "no-store" });
    if (!response.ok) throw new Error("Load failed");
    state = normalizeState(await response.json());
    localStorage.setItem(storageKey, JSON.stringify(state));
    isRemoteReady = true;
    updateSyncStatus("多人后端已连接", "online");
  } catch {
    isRemoteReady = false;
    updateSyncStatus("本地模式：启动 server.js 后可多人共享", "offline");
  }
}

function getDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isPastDate(date) {
  const today = new Date();
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return target < today;
}

function getDateFromKey(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getCalendarWeekDays(date = new Date()) {
  const current = new Date(date);
  const day = current.getDay() || 7;
  const monday = new Date(current);
  monday.setDate(current.getDate() - day + 1);

  return Array.from({ length: 7 }, (_, index) => {
    const item = new Date(monday);
    item.setDate(monday.getDate() + index);
    return item;
  });
}

function getCalendarWeekKey(date = new Date()) {
  return getDateKey(getCalendarWeekDays(date)[0]);
}

function getCalendarWeekRange(date = new Date()) {
  const days = getCalendarWeekDays(date);
  return `${formatDate(days[0])} - ${formatDate(days.at(-1))}`;
}

function isWeekSettled(date = new Date()) {
  const weekKey = getCalendarWeekKey(date);
  const weekRange = getCalendarWeekRange(date);
  return state.history.some((week) => week.weekKey === weekKey || week.range === weekRange);
}

function getActiveWeekDate() {
  const today = new Date();
  const isMonday = (today.getDay() || 7) === 1;
  if (!isMonday) return today;

  const previousWeekDate = new Date(today);
  previousWeekDate.setDate(today.getDate() - 1);
  return isWeekSettled(previousWeekDate) ? today : previousWeekDate;
}

function getWeekDays(date = getActiveWeekDate()) {
  return getCalendarWeekDays(date);
}

function getWeekRange(date = getActiveWeekDate()) {
  return getCalendarWeekRange(date);
}

function getWeekKey(date = getActiveWeekDate()) {
  return getCalendarWeekKey(date);
}

function formatDate(date) {
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function getActivePerson() {
  return state.people.find((person) => person.id === state.activePersonId) || state.people[0];
}

function getDailyEntry(personId, dateKey) {
  state.dailyEntries[personId] ||= {};
  state.dailyEntries[personId][dateKey] ||= createEmptyTotals();
  return state.dailyEntries[personId][dateKey];
}

function getPersonWeekTotals(personId) {
  return getWeekDays().reduce((totals, date) => {
    const entry = state.dailyEntries[personId]?.[getDateKey(date)] || {};
    habits.forEach((habit) => {
      totals[habit.id] += Number(entry[habit.id] || 0);
    });
    return totals;
  }, createEmptyTotals());
}

function calculateScore(entries) {
  return habits.reduce((sum, habit) => sum + Number(entries[habit.id] || 0) * habit.points, 0);
}

function calculateCompletion(entries) {
  const ratio = habits.reduce((sum, habit) => {
    return sum + Math.min(Number(entries[habit.id] || 0) / habit.target, 1);
  }, 0);
  return Math.round((ratio / habits.length) * 100);
}

function getDayCompletion(entry) {
  return habits.reduce((sum, habit) => sum + (Number(entry[habit.id] || 0) ? 1 : 0), 0);
}

function getDayReward(doneCount) {
  if (doneCount >= 5) return "五金店";
  if (doneCount >= 3) return "神迹";
  return "";
}

function getDayPenaltyRewardForPerson(personId, date, entry) {
  if (getDayCompletion(entry) !== 0) return "";

  const nextDate = new Date(date);
  nextDate.setDate(date.getDate() + 1);
  const nextDateKey = getDateKey(nextDate);
  const nextEntry = state.dailyEntries[personId]?.[nextDateKey];

  return getDayCompletion(nextEntry || {}) > 0 ? "放纵日" : "";
}

function getDayPenaltyReward(date, entry) {
  return getDayPenaltyRewardForPerson(state.activePersonId, date, entry);
}

function getHistoryIndulgenceDays(personId) {
  return getPersonHistory(personId).reduce((sum, week) => {
    const dailyEntries = week.dailyEntries || [];
    if (dailyEntries.length < 2) return sum;

    let count = 0;
    for (let index = 0; index < dailyEntries.length - 1; index += 1) {
      const currentEntry = dailyEntries[index];
      const nextEntry = dailyEntries[index + 1];
      if (getDayCompletion(currentEntry) === 0 && getDayCompletion(nextEntry) > 0) {
        count += 1;
      }
    }

    return sum + count;
  }, 0);
}

function countBlankHabitWeeks(weeks) {
  return weeks.filter((entries) => habits.some((habit) => Number(entries[habit.id] || 0) === 0)).length;
}

function getCurrentWeekRewardStats() {
  return getPersonRewardStatsRows().reduce(
    (stats, row) => {
      stats.minor += row.minor;
      stats.grand += row.grand;
      stats.penalty += row.penalty;
      return stats;
    },
    { minor: 0, grand: 0, penalty: 0 },
  );
}

function getPersonRewardStatsRows() {
  const settledWeek = getCurrentWeekSettlement();

  return state.people.map((person) => {
    const stats = { person, minor: 0, grand: 0, penalty: 0 };
    const settledPersonWeek = settledWeek?.people?.find((item) => item.personId === person.id);
    const entries = settledPersonWeek?.dailyEntries
      ? settledPersonWeek.dailyEntries.map((entry) => ({ date: getDateFromKey(entry.date), entry }))
      : getWeekDays().map((date) => ({
          date,
          entry: state.dailyEntries[person.id]?.[getDateKey(date)] || {},
        }));

    entries.forEach(({ entry }, index) => {
      const doneCount = getDayCompletion(entry);
      const reward = getDayReward(doneCount);
      const nextEntry = entries[index + 1]?.entry || {};
      if (reward === "神迹") stats.minor += 1;
      if (reward === "五金店") stats.grand += 1;
      if (getDayCompletion(entry) === 0 && getDayCompletion(nextEntry) > 0) stats.penalty += 1;
    });

    return stats;
  });
}

function getBestRewardStreak(personId) {
  const currentWeekDays = getWeekDays().map((date) => {
    const entry = state.dailyEntries[personId]?.[getDateKey(date)] || {};
    const doneCount = getDayCompletion(entry);
    return {
      minor: doneCount >= 3 ? 1 : 0,
      grand: doneCount >= habits.length ? 1 : 0,
      penalty: getDayPenaltyReward(date, entry) ? 1 : 0,
    };
  });

  const historicalDays = getPersonHistory(personId).flatMap((week) => {
    const dailyEntries = week.dailyEntries || [];
    return dailyEntries.map((entry, index) => {
      const doneCount = getDayCompletion(entry);
      const nextEntry = dailyEntries[index + 1] || {};
      return {
        minor: doneCount >= 3 ? 1 : 0,
        grand: doneCount >= habits.length ? 1 : 0,
        penalty: doneCount === 0 && getDayCompletion(nextEntry) > 0 ? 1 : 0,
      };
    });
  });

  const streaks = { minor: 0, grand: 0, penalty: 0 };
  const best = { minor: 0, grand: 0, penalty: 0 };

  [...historicalDays, ...currentWeekDays].forEach((day) => {
    Object.keys(streaks).forEach((key) => {
      streaks[key] = day[key] ? streaks[key] + 1 : 0;
      best[key] = Math.max(best[key], streaks[key]);
    });
  });

  return best;
}

function getRewardTier(doneCount) {
  if (doneCount >= 5) return "grand";
  if (doneCount >= 3) return "minor";
  return "";
}

function showFeedback(message, tier) {
  feedbackToast.textContent = message;
  feedbackToast.className = `feedback-toast show ${tier}`;
  clearTimeout(feedbackTimer);
  feedbackTimer = setTimeout(() => {
    feedbackToast.className = "feedback-toast";
  }, tier === "grand" ? 2200 : 1500);
}

function hasSettledCurrentWeek() {
  const currentWeekKey = getWeekKey();
  const currentWeekRange = getWeekRange();
  return state.history.some((week) => week.weekKey === currentWeekKey || week.range === currentWeekRange);
}

function getCurrentWeekSettlement() {
  const currentWeekKey = getWeekKey();
  const currentWeekRange = getWeekRange();
  return state.history.find((week) => week.weekKey === currentWeekKey || week.range === currentWeekRange);
}

function getPersonHistory(personId) {
  return state.history
    .map((week) => week.people.find((personWeek) => personWeek.personId === personId))
    .filter(Boolean);
}

function getPersonLifetimeScore(personId) {
  const historyScore = getPersonHistory(personId).reduce((sum, week) => sum + week.score, 0);
  return historyScore + calculateScore(getPersonWeekTotals(personId));
}

function sortRanking(items, scoreKey) {
  return items.sort((a, b) => b[scoreKey] - a[scoreKey] || a.name.localeCompare(b.name));
}

function getWeeklyLeaderboard() {
  const settledWeek = getCurrentWeekSettlement();
  if (settledWeek?.people?.length) {
    return sortRanking(state.people.map((person) => {
      const personWeek = settledWeek.people.find((item) => item.personId === person.id);
      return {
        ...person,
        currentScore: Number(personWeek?.score || 0),
      };
    }), "currentScore");
  }

  return sortRanking(state.people
    .map((person) => {
      const currentTotals = getPersonWeekTotals(person.id);
      const currentScore = calculateScore(currentTotals);
      return {
        ...person,
        currentScore,
      };
    }), "currentScore");
}

function getTotalLeaderboard() {
  return state.people
    .map((person) => {
      const currentTotals = getPersonWeekTotals(person.id);
      const currentScore = calculateScore(currentTotals);
      const settledScore = getPersonHistory(person.id).reduce((sum, week) => sum + week.score, 0);
      return {
        ...person,
        currentScore,
        settledScore,
        totalScore: currentScore + settledScore,
      };
    })
    .sort((a, b) => b.totalScore - a.totalScore || b.currentScore - a.currentScore || a.name.localeCompare(b.name));
}

function getLeaderboard() {
  return getTotalLeaderboard();
}

function getWeeklyPlacementCounts(personId) {
  return state.history.reduce(
    (counts, week) => {
      const people = week.people || [];
      if (!people.length) return counts;

      const ranked = [...people].sort((a, b) => Number(b.score || 0) - Number(a.score || 0) || a.personName.localeCompare(b.personName));
      if (ranked[0]?.personId === personId) {
        counts.first += 1;
      }
      if (ranked.length > 1 && ranked.at(-1)?.personId === personId) {
        counts.last += 1;
      }
      return counts;
    },
    { first: 0, last: 0 },
  );
}

function getLevel(totalScore) {
  return [...levels].reverse().find((level) => totalScore >= level.min) || levels[0];
}

function getAchievementContext(personId) {
  const currentTotals = getPersonWeekTotals(personId);
  const settledWeeks = getPersonHistory(personId);
  const judgeWeeks = state.history.filter((week) => week.settledByPersonId === personId).length;
  const weeklyPlacements = getWeeklyPlacementCounts(personId);
  const weeks = [currentTotals, ...settledWeeks.map((week) => week.totals)];
  const weeklyScores = [calculateScore(currentTotals), ...settledWeeks.map((week) => week.score)];
  const habitTotals = createEmptyTotals();
  const maxHabitWeek = createEmptyTotals();
  const currentWeekEntries = getWeekDays().map((date) => state.dailyEntries[personId]?.[getDateKey(date)] || {});
  const currentPerfectDays = currentWeekEntries.filter((entry) => getDayCompletion(entry) === habits.length).length;
  const historicalPerfectDays = settledWeeks.reduce((sum, week) => {
    return sum + (week.dailyEntries || []).filter((entry) => getDayCompletion(entry) === habits.length).length;
  }, 0);
  const perfectDays = currentPerfectDays + historicalPerfectDays;
  const weekDays = getWeekDays();
  const currentIndulgenceDays = weekDays.slice(0, -1).filter((date, index) => {
    const entry = state.dailyEntries[personId]?.[getDateKey(date)] || {};
    const nextEntry = state.dailyEntries[personId]?.[getDateKey(weekDays[index + 1])] || {};
    return getDayCompletion(entry) === 0 && getDayCompletion(nextEntry) > 0;
  }).length;
  const settledIndulgenceDays = getHistoryIndulgenceDays(personId);

  weeks.forEach((entries) => {
    habits.forEach((habit) => {
      const count = Number(entries[habit.id] || 0);
      habitTotals[habit.id] += count;
      maxHabitWeek[habit.id] = Math.max(maxHabitWeek[habit.id], count);
    });
  });

  return {
    settledCount: settledWeeks.length,
    judgeWeeks,
    weeklyFirstCount: weeklyPlacements.first,
    weeklyLastCount: weeklyPlacements.last,
    totalScore: getPersonLifetimeScore(personId),
    bestWeekScore: Math.max(0, ...weeklyScores),
    balancedWeeks: weeks.filter((entries) => habits.every((habit) => Number(entries[habit.id] || 0) >= habit.target)).length,
    perfectDays,
    indulgenceDays: currentIndulgenceDays + settledIndulgenceDays,
    blankHabitWeeks: countBlankHabitWeeks(weeks),
    bestRewardStreak: getBestRewardStreak(personId),
    habitTotals,
    maxHabitWeek,
    maxHabitTotal: Math.max(0, ...Object.values(habitTotals)),
  };
}

function getAchievementStatus(achievement, context) {
  const target = achievement.target || 1;
  const rawValue = Number(achievement.progress(context) || 0);
  const value = Math.max(0, rawValue);
  const rawCount = achievement.count ? Number(achievement.count(context) || 0) : value >= target ? 1 : 0;
  const count = Math.max(0, Math.floor(rawCount));
  const percent = Math.min(100, Math.round((value / target) * 100));

  return {
    ...achievement,
    value,
    count,
    target,
    percent,
    unlocked: value >= target,
  };
}

function formatProgressValue(value, target) {
  return `${Math.min(value, target)}/${target}`;
}

function getAchievementTone(achievement) {
  return achievement.tone || "positive";
}

function renderPeople() {
  personTabs.innerHTML = state.people
    .map(
      (person) => `
        <button class="person-tab ${person.id === state.activePersonId ? "active" : ""}" type="button" data-person-id="${person.id}">
          ${person.name}
        </button>
      `,
    )
    .join("");

  personTabs.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.activePersonId = button.dataset.personId;
      saveState();
      render();
    });
  });
}

function renderDailyCards() {
  const personId = state.activePersonId;
  const dayNames = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

  dailyCards.innerHTML = getWeekDays()
    .map((date, dayIndex) => {
      const dateKey = getDateKey(date);
      const entry = getDailyEntry(personId, dateKey);
      const dayScore = calculateScore(entry);
      const doneCount = getDayCompletion(entry);
      const reward = getDayReward(doneCount);
      const penaltyReward = getDayPenaltyReward(date, entry);
      const dayStateClass = penaltyReward ? "indulgence" : doneCount === habits.length ? "complete" : doneCount >= 3 ? "rewarded" : "";
      const inputs = habits
        .map(
          (habit) => `
            <div class="daily-habit" title="${dayNames[dayIndex]} ${habit.name}">
              <span class="daily-habit-name">${habit.name}</span>
              <button
                class="daily-check"
                type="button"
                data-date="${dateKey}"
                data-habit="${habit.id}"
                aria-label="${dayNames[dayIndex]} ${habit.name}"
                aria-pressed="${Number(entry[habit.id] || 0) ? "true" : "false"}"
              >
                <span>${habit.icon}</span>
              </button>
            </div>
          `,
        )
        .join("");

      return `
        <article class="daily-card ${dayStateClass}" data-date="${dateKey}">
          <div class="daily-card-head">
            <div>
              <h3>${dayNames[dayIndex]}</h3>
              <small>${formatDate(date)}</small>
            </div>
            <div class="day-progress-card ${reward || penaltyReward ? "unlocked" : ""}">
              <div class="day-progress-top">
                <strong>${doneCount}/5</strong>
                ${reward ? `<span class="daily-reward">${reward}</span>` : ""}
                ${!reward && penaltyReward ? `<span class="daily-reward penalty">${penaltyReward}</span>` : ""}
              </div>
              <div class="mini-progress" aria-hidden="true">
                <span style="width: ${(doneCount / habits.length) * 100}%"></span>
              </div>
              <small>${dayScore} 分</small>
            </div>
          </div>
          <div class="daily-habit-grid">
            ${inputs}
          </div>
        </article>
      `;
    })
    .join("");

  dailyCards.querySelectorAll("[data-habit]").forEach((button) => {
    button.addEventListener("click", () => {
      const entry = getDailyEntry(personId, button.dataset.date);
      const previousCount = getDayCompletion(entry);
      const date = getDateFromKey(button.dataset.date);
      const hadIndulgence = Boolean(getDayPenaltyReward(date, entry));
      const previousDate = new Date(date);
      previousDate.setDate(date.getDate() - 1);
      const previousEntry = state.dailyEntries[personId]?.[getDateKey(previousDate)] || {};
      const previousHadIndulgence = Boolean(getDayPenaltyReward(previousDate, previousEntry));
      const nextPressed = button.getAttribute("aria-pressed") !== "true";
      entry[button.dataset.habit] = nextPressed ? 1 : 0;
      const nextCount = getDayCompletion(entry);
      const hasIndulgence = Boolean(getDayPenaltyReward(date, entry));
      const previousHasIndulgence = Boolean(getDayPenaltyReward(previousDate, previousEntry));
      saveState();
      renderDashboard();
      renderDailyCards();
      if (previousCount < 5 && nextCount >= 5) {
        showFeedback("五金店达成：今天五项全满", "grand");
      } else if (previousCount < 3 && nextCount >= 3) {
        showFeedback("神迹达成：今天已完成三项", "minor");
      } else if (!previousHadIndulgence && previousHasIndulgence) {
        showFeedback("放纵日触发：这一天还没有任何记录", "penalty");
      } else if (hadIndulgence && !hasIndulgence) {
        showFeedback("放纵日解除：这一天已有记录", "minor");
      }
    });
  });
}

function renderDashboard() {
  const activePerson = getActivePerson();
  const activeTotals = getPersonWeekTotals(activePerson.id);
  const activeWeekScore = calculateScore(activeTotals);
  const allWeekScore = state.people.reduce((sum, person) => sum + calculateScore(getPersonWeekTotals(person.id)), 0);
  const completion = calculateCompletion(activeTotals);
  const lifetimeScore = getPersonLifetimeScore(activePerson.id);
  const level = getLevel(lifetimeScore);
  const nextLevel = levels.find((item) => item.min > lifetimeScore);
  const unlocked = getUnlockedAchievements(activePerson.id);

  document.querySelector("#weekRange").textContent = getWeekRange();
  document.querySelector("#totalScore").textContent = allWeekScore;
  document.querySelector("#activePersonName").textContent = activePerson.name;
  document.querySelector("#activePersonScore").textContent = `本周 ${activeWeekScore} 分，累计 ${lifetimeScore} 分`;
  document.querySelector("#completionRate").textContent = `${completion}%`;
  document.querySelector("#completionProgress").style.width = `${completion}%`;
  document.querySelector("#levelName").textContent = level.name;
  document.querySelector("#achievementCount").textContent = unlocked.length;
  document.querySelector("#latestAchievement").textContent = unlocked.at(-1)?.title || "先完成一项小目标";

  if (nextLevel) {
    const span = nextLevel.min - level.min;
    const progress = Math.round(((lifetimeScore - level.min) / span) * 100);
    document.querySelector("#levelProgress").style.width = `${progress}%`;
    document.querySelector("#nextLevelText").textContent = `距离 ${nextLevel.name} 还差 ${nextLevel.min - lifetimeScore} 分`;
  } else {
    document.querySelector("#levelProgress").style.width = "100%";
    document.querySelector("#nextLevelText").textContent = "已经达到最高等级";
  }

  renderLeaderboard();
  renderAchievements(unlocked);
  renderHistory();
  renderSettlementButton();
}

function renderSettlementButton() {
  const settled = hasSettledCurrentWeek();
  settleWeekButton.disabled = settled;
  settleWeekButton.textContent = settled ? "本周已结算" : "结算本周";
}

function getUnlockedAchievements(personId) {
  const context = getAchievementContext(personId);
  return achievements
    .map((achievement) => getAchievementStatus(achievement, context))
    .filter((achievement) => achievement.unlocked);
}

function renderLeaderboard() {
  const weeklyLeaderboard = getWeeklyLeaderboard();
  const totalLeaderboard = getTotalLeaderboard();
  const weeklyCaption = getCurrentWeekSettlement() ? "本周已结算，保留结算分" : "本周积分，每周一自动重置";

  weeklyLeaderboardList.innerHTML = weeklyLeaderboard
    .map(
      (person, index) => `
        <article class="leaderboard-item ${person.id === state.activePersonId ? "active" : ""}">
          <span class="rank">${index + 1}</span>
          <div>
            <h3>${person.name}</h3>
            <p>${weeklyCaption}</p>
          </div>
          <strong>${person.currentScore}</strong>
        </article>
      `,
    )
    .join("");

  totalLeaderboardList.innerHTML = totalLeaderboard
    .map(
      (person, index) => `
        <article class="leaderboard-item ${person.id === state.activePersonId ? "active" : ""}">
          <span class="rank">${index + 1}</span>
          <div>
            <h3>${person.name}</h3>
            <p>已结算 ${person.settledScore} 分 / 本周 ${person.currentScore} 分</p>
          </div>
          <strong>${person.totalScore}</strong>
        </article>
      `,
    )
    .join("");
}

function roundedRectPath(ctx, x, y, width, height, radius) {
  const size = Math.min(radius, width / 2, height / 2);
  ctx.moveTo(x + size, y);
  ctx.lineTo(x + width - size, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + size);
  ctx.lineTo(x + width, y + height - size);
  ctx.quadraticCurveTo(x + width, y + height, x + width - size, y + height);
  ctx.lineTo(x + size, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - size);
  ctx.lineTo(x, y + size);
  ctx.quadraticCurveTo(x, y, x + size, y);
}

function drawRankingSection(ctx, title, caption, rankings, scoreKey, top) {
  const width = 920;
  const left = 80;
  const rowHeight = 72;
  const panelHeight = 92 + Math.max(rankings.length, 1) * rowHeight;

  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#dce3ea";
  ctx.lineWidth = 2;
  ctx.beginPath();
  roundedRectPath(ctx, left, top, width, panelHeight, 18);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#315f9f";
  ctx.font = "700 28px PingFang SC, Microsoft YaHei, sans-serif";
  ctx.fillText(title, left + 34, top + 48);

  ctx.fillStyle = "#657184";
  ctx.font = "500 20px PingFang SC, Microsoft YaHei, sans-serif";
  ctx.fillText(caption, left + 34, top + 78);

  if (!rankings.length) {
    ctx.fillStyle = "#657184";
    ctx.font = "600 24px PingFang SC, Microsoft YaHei, sans-serif";
    ctx.fillText("暂无成员", left + 34, top + 132);
    return panelHeight;
  }

  rankings.forEach((person, index) => {
    const y = top + 112 + index * rowHeight;
    ctx.fillStyle = index === 0 ? "#e9f4ef" : "#fbfcfd";
    ctx.beginPath();
    roundedRectPath(ctx, left + 26, y - 18, width - 52, 52, 12);
    ctx.fill();

    ctx.fillStyle = "#eef3f6";
    ctx.beginPath();
    roundedRectPath(ctx, left + 46, y - 10, 38, 38, 10);
    ctx.fill();

    ctx.fillStyle = "#315f9f";
    ctx.font = "900 20px PingFang SC, Microsoft YaHei, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(String(index + 1), left + 65, y + 16);
    ctx.textAlign = "left";

    ctx.fillStyle = "#1c2430";
    ctx.font = "800 24px PingFang SC, Microsoft YaHei, sans-serif";
    ctx.fillText(person.name, left + 108, y + 15);

    ctx.fillStyle = "#2f8f6f";
    ctx.font = "900 28px PingFang SC, Microsoft YaHei, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(`${person[scoreKey]} 分`, left + width - 48, y + 16);
    ctx.textAlign = "left";
  });

  return panelHeight;
}

function getAchievementBadge(achievement) {
  const tierSymbol = {
    bronze: "铜",
    silver: "银",
    gold: "金",
    master: "冠",
  }[achievement.tier] || "章";
  return `${achievement.icon}${tierSymbol}`;
}

function getThisWeekUnlockedAchievements(personId) {
  const context = getAchievementContext(personId);
  return achievements
    .map((achievement) => getAchievementStatus(achievement, context))
    .filter((achievement) => achievement.unlocked && achievement.count > 0);
}

function getPersonAchievementReportRows() {
  const rewardRows = getPersonRewardStatsRows();
  return state.people.map((person) => {
    const context = getAchievementContext(person.id);
    const unlocked = achievements
      .map((achievement) => getAchievementStatus(achievement, context))
      .filter((achievement) => achievement.unlocked);
    const positive = unlocked.filter((achievement) => getAchievementTone(achievement) === "positive" && achievement.id !== "weeklyJudge");
    const featured = positive
      .slice(-3)
      .map((achievement) => achievement.title)
      .join(" / ");
    const rewardStats = rewardRows.find((row) => row.person.id === person.id) || { minor: 0, grand: 0, penalty: 0 };
    return {
      person,
      positiveCount: positive.length,
      totalCount: unlocked.length,
      rewardStats,
      featured: featured || "本周继续蓄力",
    };
  });
}

function drawAchievementReportSection(ctx, top, rows) {
  const left = 80;
  const width = 920;
  const rowHeight = 78;
  const panelHeight = 96 + Math.max(rows.length, 1) * rowHeight;

  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#dce3ea";
  ctx.lineWidth = 2;
  ctx.beginPath();
  roundedRectPath(ctx, left, top, width, panelHeight, 18);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#315f9f";
  ctx.font = "700 26px PingFang SC, Microsoft YaHei, sans-serif";
  ctx.fillText("个人成就总结", left + 34, top + 44);

  ctx.fillStyle = "#657184";
  ctx.font = "500 20px PingFang SC, Microsoft YaHei, sans-serif";
  ctx.fillText("绿色进度条表示正向成就收集情况，右侧是本周状态计数", left + 34, top + 74);

  rows.forEach((row, index) => {
    const y = top + 118 + index * rowHeight;
    const progress = Math.min(1, row.positiveCount / Math.max(1, achievements.filter((achievement) => getAchievementTone(achievement) === "positive").length));

    ctx.fillStyle = "#fbfcfd";
    ctx.beginPath();
    roundedRectPath(ctx, left + 26, y - 26, width - 52, 58, 12);
    ctx.fill();

    ctx.fillStyle = "#1c2430";
    ctx.font = "800 24px PingFang SC, Microsoft YaHei, sans-serif";
    ctx.fillText(row.person.name, left + 48, y + 2);

    ctx.fillStyle = "#657184";
    ctx.font = "600 18px PingFang SC, Microsoft YaHei, sans-serif";
    ctx.fillText(row.featured, left + 48, y + 26);

    ctx.fillStyle = "#657184";
    ctx.font = "700 17px PingFang SC, Microsoft YaHei, sans-serif";
    ctx.fillText(`神迹 ${row.rewardStats.minor} · 五金店 ${row.rewardStats.grand} · 放纵日 ${row.rewardStats.penalty}`, left + 520, y + 26);

    ctx.fillStyle = "#e7edf0";
    ctx.beginPath();
    roundedRectPath(ctx, left + 520, y - 8, 250, 12, 8);
    ctx.fill();
    ctx.fillStyle = "#2f8f6f";
    ctx.beginPath();
    roundedRectPath(ctx, left + 520, y - 8, 250 * progress, 12, 8);
    ctx.fill();

    ctx.fillStyle = "#2f8f6f";
    ctx.font = "900 24px PingFang SC, Microsoft YaHei, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(`${row.positiveCount} 枚`, left + width - 48, y + 4);
    ctx.textAlign = "left";
  });

  return panelHeight;
}

function generateReportImage() {
  const weeklyLeaderboard = getWeeklyLeaderboard();
  const totalLeaderboard = getTotalLeaderboard();
  const achievementRows = getPersonAchievementReportRows();
  const canvas = document.createElement("canvas");
  const width = 1080;
  const firstHeight = 92 + Math.max(weeklyLeaderboard.length, 1) * 72;
  const secondHeight = 92 + Math.max(totalLeaderboard.length, 1) * 72;
  const achievementReportHeight = 96 + Math.max(achievementRows.length, 1) * 78;
  const achievementReportTop = 310 + firstHeight + 28 + secondHeight + 28;
  const footerTop = achievementReportTop + achievementReportHeight + 58;
  const height = Math.max(footerTop + 88, 960);
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;

  ctx.fillStyle = "#f7f5ef";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(49, 95, 159, 0.12)";
  ctx.beginPath();
  ctx.ellipse(160, 80, 260, 120, -0.25, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(47, 143, 111, 0.12)";
  ctx.beginPath();
  ctx.ellipse(900, 140, 260, 140, 0.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#1c2430";
  ctx.font = "900 54px PingFang SC, Microsoft YaHei, sans-serif";
  ctx.fillText("自律周结算战报", 80, 104);

  ctx.fillStyle = "#657184";
  ctx.font = "600 24px PingFang SC, Microsoft YaHei, sans-serif";
  ctx.fillText(`${getWeekRange()} · ${state.people.length} 位成员`, 82, 144);

  ctx.fillStyle = "#2f8f6f";
  ctx.font = "900 72px PingFang SC, Microsoft YaHei, sans-serif";
  const allWeekScore = state.people.reduce((sum, person) => sum + calculateScore(getPersonWeekTotals(person.id)), 0);
  ctx.fillText(String(allWeekScore), 82, 236);
  ctx.fillStyle = "#657184";
  ctx.font = "700 22px PingFang SC, Microsoft YaHei, sans-serif";
  ctx.fillText("全员本周积分", 84, 268);

  drawRankingSection(ctx, "周排行", "每周一自然重置，记录当前周表现", weeklyLeaderboard, "currentScore", 310);
  const totalTop = 310 + firstHeight + 28;
  drawRankingSection(ctx, "总排行", "已结算历史 + 当前周积分", totalLeaderboard, "totalScore", totalTop);
  const achievementTop = totalTop + secondHeight + 28;
  drawAchievementReportSection(ctx, achievementTop, achievementRows);

  ctx.fillStyle = "#657184";
  ctx.font = "600 18px PingFang SC, Microsoft YaHei, sans-serif";
  ctx.fillText(`生成时间：${new Date().toLocaleString("zh-CN")}`, 80, achievementTop + achievementReportHeight + 48);

  return canvas.toDataURL("image/png");
}

function generateReport() {
  currentReportImageUrl = generateReportImage();
  reportModalImage.src = currentReportImageUrl;
  reportDownloadButton.href = currentReportImageUrl;
  reportDownloadButton.download = `SERE-${getWeekKey()}-战报.png`;
  reportModal.hidden = false;
}

function closeReportModal() {
  reportModal.hidden = true;
}

async function copyReportImage() {
  if (!currentReportImageUrl) return;
  const response = await fetch(currentReportImageUrl);
  const blob = await response.blob();

  if (navigator.clipboard?.write && window.ClipboardItem) {
    await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
    showFeedback("战报已复制到剪贴板", "minor");
    return;
  }

  const link = document.createElement("a");
  link.href = currentReportImageUrl;
  link.download = `SERE-${getWeekKey()}-战报.png`;
  link.click();
  showFeedback("当前浏览器不支持图片直复制，已改为下载", "minor");
}

function renderAchievements(unlocked) {
  const context = getAchievementContext(state.activePersonId);
  const achievementStatuses = achievements.map((achievement) => getAchievementStatus(achievement, context));
  const unlockedCount = achievementStatuses.filter((achievement) => achievement.unlocked).length;
  const toneVisibleAchievements = achievementStatuses.filter((achievement) => getAchievementTone(achievement) === activeAchievementTone);
  const visibleAchievements = achievementStatuses.filter((achievement) => {
    const toneMatch = getAchievementTone(achievement) === activeAchievementTone;
    const categoryMatch = activeAchievementCategory === "all" || achievement.category === activeAchievementCategory;
    return toneMatch && categoryMatch;
  });
  const toneUnlockedCount = toneVisibleAchievements.filter((achievement) => achievement.unlocked).length;
  const toneTotal = toneVisibleAchievements.length;
  const nextAchievement = achievementStatuses
    .filter((achievement) => !achievement.unlocked && getAchievementTone(achievement) === activeAchievementTone)
    .sort((a, b) => b.percent - a.percent || a.target - b.target)[0];

  achievementToneTabsEl.innerHTML = ["positive", "negative"]
    .map((tone) => {
      const total = achievementStatuses.filter((achievement) => getAchievementTone(achievement) === tone).length;
      const unlocked = achievementStatuses.filter((achievement) => getAchievementTone(achievement) === tone && achievement.unlocked).length;
      return `
        <button
          class="achievement-tone-tab ${activeAchievementTone === tone ? "active" : ""}"
          type="button"
          data-tone="${tone}"
        >
          ${toneLabels[tone]} ${unlocked}/${total}
        </button>
      `;
    })
    .join("");

  achievementToneTabsEl.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      activeAchievementTone = button.dataset.tone;
      activeAchievementCategory = "all";
      renderAchievements(unlocked);
    });
  });

  achievementOverviewEl.innerHTML = `
    <article>
      <span>解锁进度</span>
      <strong>${toneUnlockedCount}/${toneTotal}</strong>
    </article>
    <article>
      <span>完成度</span>
      <strong>${toneTotal ? Math.round((toneUnlockedCount / toneTotal) * 100) : 0}%</strong>
    </article>
    <article>
      <span>下一枚</span>
      <strong>${nextAchievement ? nextAchievement.title : "全收集"}</strong>
    </article>
  `;

  achievementFiltersEl.innerHTML = achievementCategories
    .map((category) => {
      const pool = category.id === "all"
        ? toneVisibleAchievements
        : toneVisibleAchievements.filter((achievement) => achievement.category === category.id);
      const count = pool.filter((achievement) => achievement.unlocked).length;
      const total = pool.length;
      return `
        <button
          class="achievement-filter ${activeAchievementCategory === category.id ? "active" : ""}"
          type="button"
          data-category="${category.id}"
        >
          ${category.name} ${count}/${total}
        </button>
      `;
    })
    .join("");

  achievementFiltersEl.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      activeAchievementCategory = button.dataset.category;
      renderAchievements(unlocked);
    });
  });

  achievementsEl.innerHTML = visibleAchievements
    .map((achievement) => {
      const isUnlocked = achievement.unlocked;
      const tone = getAchievementTone(achievement);
      return `
        <article class="achievement tone-${tone} ${isUnlocked ? "" : "locked"} ${achievement.tier}">
          <div class="achievement-topline">
            <span class="badge">${isUnlocked ? achievement.icon : "?"}</span>
            <div class="achievement-meta">
              <span class="tone-label">${toneLabels[tone]}</span>
              <span class="tier-label">${tierLabels[achievement.tier]}</span>
            </div>
          </div>
          <h3>${achievement.title}</h3>
          <p>${achievement.desc}</p>
          <div class="achievement-progress" aria-label="${achievement.title} 进度">
            <div class="mini-progress" aria-hidden="true">
              <span style="width: ${achievement.percent}%"></span>
            </div>
            <small>${isUnlocked ? "已解锁" : "进行中"} · ${formatProgressValue(achievement.value, achievement.target)} · 点亮 ${achievement.count} 次</small>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderHistory() {
  if (!state.history.length) {
    historyList.innerHTML = `<div class="empty-state">还没有结算记录。完成一周后，把这一页变成你的成长账本。</div>`;
    return;
  }

  historyList.innerHTML = state.history
    .map((week) => {
      const champion = [...week.people].sort((a, b) => b.score - a.score)[0];
      const details = week.people
        .map((personWeek) => `${personWeek.personName} ${personWeek.score} 分`)
        .join(" / ");
      const settledBy = week.settledByPersonName ? `<p>本周裁判：${week.settledByPersonName}</p>` : "";
      return `
        <article class="history-item">
          <div>
            <h3>${week.range}</h3>
            <p>${details}</p>
            ${settledBy}
          </div>
          <strong>${champion?.personName || "-"} 领先</strong>
        </article>
      `;
    })
    .join("");
}

function addPerson(name) {
  const trimmed = name.trim();
  if (!trimmed) return;

  const person = {
    id: crypto.randomUUID(),
    name: trimmed,
  };

  state.people.push(person);
  state.activePersonId = person.id;
  state.dailyEntries[person.id] = {};
  saveState();
  render();
}

function settleWeek() {
  if (hasSettledCurrentWeek()) {
    renderSettlementButton();
    return;
  }

  const activePerson = getActivePerson();
  const people = state.people.map((person) => {
    const totals = getPersonWeekTotals(person.id);
    const dailyEntries = getWeekDays().map((date) => {
      const dateKey = getDateKey(date);
      return {
        date: dateKey,
        ...createEmptyTotals(),
        ...(state.dailyEntries[person.id]?.[dateKey] || {}),
      };
    });
    return {
      personId: person.id,
      personName: person.name,
      score: calculateScore(totals),
      totals,
      dailyEntries,
    };
  });

  state.history.unshift({
    id: crypto.randomUUID(),
    weekKey: getWeekKey(),
    range: getWeekRange(),
    people,
    settledByPersonId: activePerson.id,
    settledByPersonName: activePerson.name,
    settledAt: new Date().toISOString(),
  });

  state.dailyEntries = Object.fromEntries(state.people.map((person) => [person.id, {}]));
  saveState();
  render();
}

function resetWeek() {
  state.dailyEntries = Object.fromEntries(state.people.map((person) => [person.id, {}]));
  saveState();
  render();
}

function clearHistory() {
  state.history = [];
  saveState();
  renderDashboard();
}

function render() {
  renderPeople();
  renderDailyCards();
  renderDashboard();
}

personForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addPerson(personNameInput.value);
  personNameInput.value = "";
});

document.querySelector("#settleWeek").addEventListener("click", settleWeek);
document.querySelector("#resetWeek").addEventListener("click", resetWeek);
document.querySelector("#clearHistory").addEventListener("click", clearHistory);
generateReportButton.addEventListener("click", generateReport);
closeReportModalButton.addEventListener("click", closeReportModal);
reportModalBackdrop.addEventListener("click", closeReportModal);
reportCopyButton.addEventListener("click", copyReportImage);
reportModal.addEventListener("click", (event) => {
  if (event.target === reportModal) closeReportModal();
});

async function init() {
  render();
  await loadRemoteState();
  render();
}

init();
