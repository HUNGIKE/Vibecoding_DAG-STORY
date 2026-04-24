const stories = {
  detective: window.STORY_DETECTIVE,
  vampire: window.STORY_VAMPIRE
};

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
    restartBtn: document.getElementById("restartBtn"),
    backBtn: document.getElementById("backBtn"),
  };


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

    els.backBtn.disabled = state.history.length <= 1;
    els.backBtn.style.opacity = state.history.length <= 1 ? "0.5" : "1";
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

