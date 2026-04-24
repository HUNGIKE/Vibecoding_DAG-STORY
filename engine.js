const stories = {
  detective: window.STORY_DETECTIVE,
  vampire: window.STORY_VAMPIRE
};

function validateStoryData(storyData) {
  const errors = [];
  const warnings = [];
  const nodeIds = new Set();
  const layeredIds = new Set();

  if (!storyData || typeof storyData !== "object") {
    return { errors: ["storyData must be an object"], warnings };
  }

  for (const node of storyData.nodes || []) {
    if (nodeIds.has(node.id)) errors.push(`Duplicate node id: ${node.id}`);
    nodeIds.add(node.id);
    if (!Array.isArray(node.choices)) errors.push(`Node ${node.id} choices must be an array`);
  }

  if (!nodeIds.has(storyData.startNode)) errors.push(`Missing startNode: ${storyData.startNode}`);
  for (const endNode of storyData.endNodes || []) {
    if (!nodeIds.has(endNode)) errors.push(`Missing endNode: ${endNode}`);
  }

  for (const layer of storyData.layers || []) {
    for (const nodeId of layer) {
      layeredIds.add(nodeId);
      if (!nodeIds.has(nodeId)) errors.push(`Layer references missing node: ${nodeId}`);
    }
  }

  for (const node of storyData.nodes || []) {
    if (!layeredIds.has(node.id)) warnings.push(`Node ${node.id} is not in layers`);
    for (const choice of node.choices || []) {
      if (!nodeIds.has(choice.to)) errors.push(`Node ${node.id} links to missing node: ${choice.to}`);
    }
  }

  return { errors, warnings };
}

function runSmokeTests(storyData) {
  const nodeMap = Object.fromEntries(storyData.nodes.map((node) => [node.id, node]));
  return [
    { name: "can find start node", pass: Boolean(nodeMap[storyData.startNode]) },
    { name: "all end nodes exist", pass: storyData.endNodes.every((id) => Boolean(nodeMap[id])) },
    { name: "has about 30 nodes", pass: storyData.nodes.length >= 25 },
    { name: "all choices target valid nodes", pass: storyData.nodes.every((node) => node.choices.every((choice) => Boolean(nodeMap[choice.to]))) },
    { name: "end nodes have no choices", pass: storyData.endNodes.every((id) => nodeMap[id].choices.length === 0) }
  ];
}

function createStoryEngine() {
  const state = {
    storyKey: "detective",
    storyData: stories.detective,
    currentNodeId: stories.detective.startNode,
    history: [stories.detective.startNode],
    graphPositions: {}
  };

  const els = {
    storySelector: document.getElementById("storySelector"),
    storyTitle: document.getElementById("storyTitle"),
    storySubtitle: document.getElementById("storySubtitle"),
    storyText: document.getElementById("storyText"),
    choicesBox: document.getElementById("choicesBox"),
    endText: document.getElementById("endText"),
    pathText: document.getElementById("pathText"),
    restartBtn: document.getElementById("restartBtn"),
    backBtn: document.getElementById("backBtn"),
    graphCanvas: document.getElementById("graphCanvas"),
    statusBox: document.getElementById("statusBox")
  };

  const graphCtx = els.graphCanvas.getContext("2d");

  function nodeMap() {
    return Object.fromEntries(state.storyData.nodes.map((node) => [node.id, node]));
  }

  function setStory(storyKey) {
    state.storyKey = storyKey;
    state.storyData = stories[storyKey];
    state.currentNodeId = state.storyData.startNode;
    state.history = [state.storyData.startNode];
    state.graphPositions = {};
    render();
  }

  function goToNode(nodeId) {
    if (!nodeMap()[nodeId]) return;
    state.currentNodeId = nodeId;
    state.history.push(nodeId);
    render();
  }

  function restart() {
    state.currentNodeId = state.storyData.startNode;
    state.history = [state.storyData.startNode];
    render();
  }

  function goBack() {
    if (state.history.length <= 1) return;
    state.history.pop();
    state.currentNodeId = state.history[state.history.length - 1];
    render();
  }

  function drawGraph() {
    const { storyData, currentNodeId, history, graphPositions } = state;
    graphCtx.clearRect(0, 0, els.graphCanvas.width, els.graphCanvas.height);

    const left = 90;
    const right = els.graphCanvas.width - 90;
    const top = 60;
    const bottom = els.graphCanvas.height - 60;
    const layerGap = storyData.layers.length <= 1 ? 0 : (right - left) / (storyData.layers.length - 1);

    Object.keys(graphPositions).forEach((key) => delete graphPositions[key]);

    storyData.layers.forEach((layer, layerIndex) => {
      const x = left + layerGap * layerIndex;
      const verticalGap = layer.length <= 1 ? 0 : (bottom - top) / (layer.length - 1);
      layer.forEach((nodeId, index) => {
        graphPositions[nodeId] = {
          x,
          y: layer.length <= 1 ? (top + bottom) / 2 : top + verticalGap * index
        };
      });
    });

    storyData.nodes.forEach((node) => {
      const from = graphPositions[node.id];
      if (!from) return;
      node.choices.forEach((choice) => {
        const to = graphPositions[choice.to];
        if (!to) return;
        const angle = Math.atan2(to.y - from.y, to.x - from.x);
        const r = 20;
        graphCtx.beginPath();
        graphCtx.moveTo(from.x + Math.cos(angle) * r, from.y + Math.sin(angle) * r);
        graphCtx.lineTo(to.x - Math.cos(angle) * r, to.y - Math.sin(angle) * r);
        graphCtx.strokeStyle = "#475569";
        graphCtx.lineWidth = 1.2;
        graphCtx.stroke();
      });
    });

    storyData.nodes.forEach((node) => {
      const pos = graphPositions[node.id];
      if (!pos) return;
      const isCurrent = node.id === currentNodeId;
      const isEnd = storyData.endNodes.includes(node.id);
      const isVisited = history.includes(node.id);

      graphCtx.beginPath();
      graphCtx.arc(pos.x, pos.y, 20, 0, Math.PI * 2);
      graphCtx.fillStyle = isCurrent ? "#fde68a" : isEnd ? "#fecaca" : isVisited ? "#86efac" : "#bfdbfe";
      graphCtx.fill();
      graphCtx.strokeStyle = "#1e293b";
      graphCtx.lineWidth = isCurrent ? 3 : 1.5;
      graphCtx.stroke();
      graphCtx.fillStyle = "#0f172a";
      graphCtx.font = "12px Arial";
      graphCtx.textAlign = "center";
      graphCtx.textBaseline = "middle";
      graphCtx.fillText(node.id, pos.x, pos.y);
    });
  }

  function renderStatus() {
    const validation = validateStoryData(state.storyData);
    const tests = runSmokeTests(state.storyData);
    const passed = tests.filter((test) => test.pass).length;
    els.statusBox.className = validation.errors.length === 0 && passed === tests.length ? "status ok" : "status error";
    els.statusBox.textContent = [
      `Validation errors: ${validation.errors.length}`,
      `Validation warnings: ${validation.warnings.length}`,
      `Smoke tests passed: ${passed}/${tests.length}`,
      "",
      ...validation.errors.map((e) => `ERROR: ${e}`),
      ...validation.warnings.map((w) => `WARN: ${w}`),
      "",
      ...tests.map((t) => `[${t.pass ? "PASS" : "FAIL"}] ${t.name}`)
    ].join("\n");
  }

  function render() {
    const map = nodeMap();
    const node = map[state.currentNodeId];

    els.storySelector.value = state.storyKey;
    els.storyTitle.textContent = state.storyData.title;
    els.storySubtitle.textContent = state.storyData.subtitle;
    els.storyText.textContent = node ? node.text : `Missing node ${state.currentNodeId}`;
    els.choicesBox.innerHTML = "";
    els.endText.textContent = "";

    if (node && state.storyData.endNodes.includes(node.id)) {
      els.endText.textContent = "故事結束";
    } else if (node) {
      node.choices.forEach((choice) => {
        const btn = document.createElement("button");
        btn.textContent = choice.text;
        btn.onclick = () => goToNode(choice.to);
        els.choicesBox.appendChild(btn);
      });
    }

    els.pathText.textContent = "路徑：" + state.history.join(" → ");
    els.backBtn.disabled = state.history.length <= 1;
    els.backBtn.style.opacity = state.history.length <= 1 ? "0.5" : "1";
    renderStatus();
    drawGraph();
  }

  Object.entries(stories).forEach(([key, story]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = story.title;
    els.storySelector.appendChild(option);
  });

  els.storySelector.onchange = (event) => setStory(event.target.value);
  els.restartBtn.onclick = restart;
  els.backBtn.onclick = goBack;

  return { render, setStory };
}

const engine = createStoryEngine();
engine.render();
