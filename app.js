const habits = [
  { id: "exercise", name: "运动", icon: "动", unit: "天", points: 12, target: 4 },
  { id: "reading", name: "读书", icon: "读", unit: "天", points: 8, target: 5 },
  { id: "diet", name: "节食", icon: "食", unit: "天", points: 10, target: 5 },
  { id: "sleep", name: "睡眠", icon: "眠", unit: "天", points: 10, target: 5 },
  { id: "ai", name: "AI 学习", icon: "AI", unit: "天", points: 8, target: 5 },
];

const achievements = [
  { id: "firstSettle", title: "第一次周结算", desc: "完成任意一次周结算", test: ({ history }) => history.length >= 1 },
  {
    id: "balanced",
    title: "五边形战士",
    desc: "任意一周五项都达到目标",
    test: ({ weeks }) => weeks.some((entries) => habits.every((habit) => entries[habit.id] >= habit.target)),
  },
  { id: "sweat", title: "行动派", desc: "任意一周运动达到 5 次", test: ({ weeks }) => weeks.some((entries) => entries.exercise >= 5) },
  { id: "deepReader", title: "深读者", desc: "任意一周阅读达到 5 天", test: ({ weeks }) => weeks.some((entries) => entries.reading >= 5) },
  { id: "steadySleep", title: "作息守门员", desc: "任意一周睡眠达标 6 天", test: ({ weeks }) => weeks.some((entries) => entries.sleep >= 6) },
  { id: "aiBuilder", title: "AI 建造者", desc: "任意一周 AI 学习达到 5 天", test: ({ weeks }) => weeks.some((entries) => entries.ai >= 5) },
  { id: "hundred", title: "破百分", desc: "任意单周积分达到 100", test: ({ weeklyScores }) => weeklyScores.some((score) => score >= 100) },
  { id: "streak3", title: "三周不断线", desc: "累计完成 3 次周结算", test: ({ history }) => history.length >= 3 },
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
const state = loadState();

const dailyRows = document.querySelector("#dailyRows");
const achievementsEl = document.querySelector("#achievements");
const historyList = document.querySelector("#historyList");
const leaderboardList = document.querySelector("#leaderboardList");
const personTabs = document.querySelector("#personTabs");
const personForm = document.querySelector("#personForm");
const personNameInput = document.querySelector("#personNameInput");

function createEmptyTotals() {
  return Object.fromEntries(habits.map((habit) => [habit.id, 0]));
}

function loadState() {
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
}

function getDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getWeekDays(date = new Date()) {
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

function getWeekRange(date = new Date()) {
  const days = getWeekDays(date);
  return `${formatDate(days[0])} - ${formatDate(days.at(-1))}`;
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
  if (doneCount >= 5) return "大奖";
  if (doneCount >= 3) return "奖杯";
  return "";
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

function getLeaderboard() {
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

function getLevel(totalScore) {
  return [...levels].reverse().find((level) => totalScore >= level.min) || levels[0];
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

function renderDailyTable() {
  const personId = state.activePersonId;
  const dayNames = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

  dailyRows.innerHTML = getWeekDays()
    .map((date, dayIndex) => {
      const dateKey = getDateKey(date);
      const entry = getDailyEntry(personId, dateKey);
      const dayScore = calculateScore(entry);
      const doneCount = getDayCompletion(entry);
      const reward = getDayReward(doneCount);
      const inputs = habits
        .map(
          (habit) => `
            <td data-label="${habit.name}">
              <label class="daily-check" title="${dayNames[dayIndex]} ${habit.name}">
                <input
                  type="checkbox"
                  ${Number(entry[habit.id] || 0) ? "checked" : ""}
                  data-date="${dateKey}"
                  data-habit="${habit.id}"
                  aria-label="${dayNames[dayIndex]} ${habit.name}"
                />
                <span>${habit.icon}</span>
              </label>
            </td>
          `,
        )
        .join("");

      return `
        <tr>
          <th>
            <span>${dayNames[dayIndex]}</span>
            <small>${formatDate(date)}</small>
          </th>
          ${inputs}
          <td class="day-progress" data-label="进度">
            <div class="day-progress-card ${reward ? "unlocked" : ""}">
              <div class="day-progress-top">
                <strong>${doneCount}/5</strong>
                ${reward ? `<span class="daily-reward">${reward}</span>` : ""}
              </div>
              <div class="mini-progress" aria-hidden="true">
                <span style="width: ${(doneCount / habits.length) * 100}%"></span>
              </div>
              <small>${dayScore} 分</small>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");

  dailyRows.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", () => {
      const entry = getDailyEntry(personId, input.dataset.date);
      entry[input.dataset.habit] = input.checked ? 1 : 0;
      saveState();
      renderDashboard();
      renderDailyTable();
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
}

function getUnlockedAchievements(personId) {
  const currentTotals = getPersonWeekTotals(personId);
  const settledWeeks = getPersonHistory(personId);
  const weeks = [currentTotals, ...settledWeeks.map((week) => week.totals)];
  const weeklyScores = [calculateScore(currentTotals), ...settledWeeks.map((week) => week.score)];

  return achievements.filter((achievement) =>
    achievement.test({ history: settledWeeks, weeks, weeklyScores }),
  );
}

function renderLeaderboard() {
  const leaderboard = getLeaderboard();

  leaderboardList.innerHTML = leaderboard
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

function renderAchievements(unlocked) {
  const unlockedIds = new Set(unlocked.map((achievement) => achievement.id));
  achievementsEl.innerHTML = achievements
    .map((achievement) => {
      const isUnlocked = unlockedIds.has(achievement.id);
      return `
        <article class="achievement ${isUnlocked ? "" : "locked"}">
          <span class="badge">${isUnlocked ? "✓" : "?"}</span>
          <h3>${achievement.title}</h3>
          <p>${achievement.desc}</p>
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
      return `
        <article class="history-item">
          <div>
            <h3>${week.range}</h3>
            <p>${details}</p>
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
  const people = state.people.map((person) => {
    const totals = getPersonWeekTotals(person.id);
    return {
      personId: person.id,
      personName: person.name,
      score: calculateScore(totals),
      totals,
    };
  });

  state.history.unshift({
    id: crypto.randomUUID(),
    range: getWeekRange(),
    people,
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
  renderDailyTable();
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

render();
