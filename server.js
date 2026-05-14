const http = require("http");
const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const port = Number(process.env.PORT || 3000);
const rootDir = __dirname;
const dataDir = path.join(rootDir, "data");
const stateFile = path.join(dataDir, "state.json");

const defaultPerson = { id: "person-default", name: "我" };
const defaultState = {
  people: [defaultPerson],
  activePersonId: defaultPerson.id,
  dailyEntries: { [defaultPerson.id]: {} },
  history: [],
};

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
};

function normalizeState(nextState = {}) {
  const state = {
    ...defaultState,
    ...nextState,
    dailyEntries: nextState.dailyEntries || {},
    history: Array.isArray(nextState.history) ? nextState.history : [],
    people: Array.isArray(nextState.people) && nextState.people.length ? nextState.people : [defaultPerson],
  };

  state.activePersonId = state.people.some((person) => person.id === state.activePersonId)
    ? state.activePersonId
    : state.people[0].id;

  state.people.forEach((person) => {
    state.dailyEntries[person.id] ||= {};
  });

  return state;
}

async function readState() {
  try {
    const raw = await fs.readFile(stateFile, "utf8");
    return normalizeState(JSON.parse(raw));
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.warn("Failed to read state, using default state:", error.message);
    }
    return normalizeState(defaultState);
  }
}

async function writeState(state) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(stateFile, `${JSON.stringify(normalizeState(state), null, 2)}\n`);
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(payload));
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 2_000_000) {
        reject(new Error("Request body is too large"));
        request.destroy();
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

async function handleApi(request, response) {
  if (request.url !== "/api/state") {
    sendJson(response, 404, { error: "Not found" });
    return;
  }

  if (request.method === "GET") {
    sendJson(response, 200, await readState());
    return;
  }

  if (request.method === "PUT") {
    try {
      const body = await readRequestBody(request);
      const state = normalizeState(JSON.parse(body || "{}"));
      await writeState(state);
      sendJson(response, 200, state);
    } catch (error) {
      sendJson(response, 400, { error: error.message || "Invalid state payload" });
    }
    return;
  }

  response.writeHead(405, { Allow: "GET, PUT" });
  response.end();
}

async function serveStatic(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const requestedPath = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  const filePath = path.normalize(path.join(rootDir, requestedPath));

  if (!filePath.startsWith(rootDir) || filePath.includes(`${path.sep}data${path.sep}`)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const file = await fs.readFile(filePath);
    response.writeHead(200, {
      "Content-Type": contentTypes[path.extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    response.end(file);
  } catch (error) {
    response.writeHead(error.code === "ENOENT" ? 404 : 500);
    response.end(error.code === "ENOENT" ? "Not found" : "Server error");
  }
}

const server = http.createServer(async (request, response) => {
  try {
    if (request.url?.startsWith("/api/")) {
      await handleApi(request, response);
      return;
    }

    await serveStatic(request, response);
  } catch (error) {
    const requestId = crypto.randomUUID();
    console.error(`[${requestId}]`, error);
    sendJson(response, 500, { error: "Server error", requestId });
  }
});

server.listen(port, () => {
  console.log(`自律周结算系统已启动: http://localhost:${port}`);
});
