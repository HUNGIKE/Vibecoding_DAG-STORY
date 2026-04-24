# Story JS Format

This folder contains story data files for the DAG story engine.

Each story file should define exactly one global story object on `window`, for example:

```js
window.STORY_EXAMPLE = {
  title: "Example Story",
  subtitle: "A short description shown under the title",
  startNode: "E1",
  endNodes: ["E5", "E6"],
  layers: [
    ["E1"],
    ["E2", "E3"],
    ["E4"],
    ["E5", "E6"]
  ],
  nodes: [
    {
      id: "E1",
      text: `Opening scene text goes here.`,
      choices: [
        { to: "E2", text: "Choose the first path" },
        { to: "E3", text: "Choose the second path" }
      ]
    },
    {
      id: "E2",
      text: `Scene text for E2.`,
      choices: [
        { to: "E4", text: "Continue" }
      ]
    },
    {
      id: "E3",
      text: `Scene text for E3.`,
      choices: [
        { to: "E4", text: "Continue" }
      ]
    },
    {
      id: "E4",
      text: `Scene text for E4.`,
      choices: [
        { to: "E5", text: "Reach ending A" },
        { to: "E6", text: "Reach ending B" }
      ]
    },
    {
      id: "E5",
      text: `Ending A text.`,
      choices: []
    },
    {
      id: "E6",
      text: `Ending B text.`,
      choices: []
    }
  ]
};
```

## Required top-level fields

### `title`

String. The story title shown in the UI and story selector.

```js
title: "A Very Polite Vampire"
```

### `subtitle`

String. A short subtitle or description shown under the title.

```js
subtitle: "第三人稱敘述 · 以吸血鬼 Victor 的行動作為選擇"
```

### `startNode`

String. The node id where the story begins.

```js
startNode: "V1"
```

The value must match one node in `nodes`.

### `endNodes`

Array of strings. Each id is an ending node.

```js
endNodes: ["V26", "V27", "V28", "V29", "V30"]
```

Every end node should exist in `nodes` and should have:

```js
choices: []
```

### `layers`

Array of arrays of node ids. This describes a left-to-right DAG layout.

```js
layers: [
  ["V1"],
  ["V2", "V3", "V4"],
  ["V5", "V6", "V7"],
  ["V26", "V27", "V28"]
]
```

Rules:

- Every node id should appear in exactly one layer.
- Earlier layers should point only to later layers.
- This keeps the story graph acyclic.
- The engine currently does not need graph rendering, but keeping `layers` makes the story data ready for future graph visualization.

### `nodes`

Array of node objects. Each node represents one story scene.

Each node has:

```js
{
  id: "V1",
  text: `Scene text here.`,
  choices: [
    { to: "V2", text: "Choice text here" }
  ]
}
```

## Node fields

### `id`

String. Unique node id within this story.

Recommended style:

- Detective story: `N1`, `N2`, `N3`, ...
- Vampire story: `V1`, `V2`, `V3`, ...
- New story: use a new prefix, such as `D1`, `S1`, `R1`, etc.

Do not reuse the same id twice in the same story.

### `text`

String. The story text shown when the player reaches this node.

Use JavaScript template literals for multi-line text:

```js
text: `First paragraph.

Second paragraph with dialogue.`
```

Recommended style:

- Keep each node readable but not too long.
- A node can contain narration, dialogue, or both.
- For interactive fiction, 1–3 short paragraphs usually works well.

### `choices`

Array of choice objects.

Each choice has:

```js
{ to: "V2", text: "Let Victor knock on Mary's door" }
```

Fields:

- `to`: target node id
- `text`: text displayed on the choice button

Rules:

- Non-ending nodes should usually have 1–4 choices.
- Ending nodes must have `choices: []`.
- Every `to` value must point to an existing node id.
- To keep the graph acyclic, choices should point from earlier layers to later layers.

## DAG rules

The story should be a Directed Acyclic Graph.

That means:

- Choices move the story forward.
- No node should eventually point back to itself.
- Avoid loops such as `A -> B -> C -> A`.
- Ending nodes have no choices.

Recommended generation pattern for around 30 nodes:

```text
Layer 1: 1 start node
Layer 2: 2–4 early branch nodes
Layer 3: 4–6 investigation / development nodes
Layer 4: 5–7 middle nodes
Layer 5: 4–6 late nodes
Layer 6: 4–6 pre-ending nodes
Layer 7: 3–6 ending nodes
```

Example:

```js
layers: [
  ["X1"],
  ["X2", "X3", "X4"],
  ["X5", "X6", "X7", "X8", "X9"],
  ["X10", "X11", "X12", "X13", "X14", "X15"],
  ["X16", "X17", "X18", "X19", "X20"],
  ["X21", "X22", "X23", "X24", "X25"],
  ["X26", "X27", "X28", "X29", "X30"]
]
```

## How to add a new story

1. Create a new file under `stories/`, for example:

```text
stories/robot.js
```

2. Define a global story object:

```js
window.STORY_ROBOT = {
  title: "Robot in the Rain",
  subtitle: "A short interactive story about a lost robot",
  startNode: "R1",
  endNodes: ["R26", "R27", "R28", "R29", "R30"],
  layers: [ ... ],
  nodes: [ ... ]
};
```

3. Include the story file in `index.html` before `engine.js`:

```html
<script src="stories/robot.js"></script>
```

4. Register the story in `engine.js`:

```js
const stories = {
  detective: window.STORY_DETECTIVE,
  vampire: window.STORY_VAMPIRE,
  robot: window.STORY_ROBOT,
};
```

The key, such as `robot`, is the internal story id used by the selector.

## Current engine assumptions

The current engine expects:

- `stories` is defined in `engine.js`.
- Every story has `title`, `subtitle`, `startNode`, `endNodes`, `layers`, and `nodes`.
- Each node has `id`, `text`, and `choices`.
- `choices` is always an array, even for ending nodes.
- Story files are loaded before `engine.js`.

## Checklist for LLM-generated stories

Before producing a new story file, verify:

- [ ] The file defines exactly one `window.STORY_*` object.
- [ ] `title` is a string.
- [ ] `subtitle` is a string.
- [ ] `startNode` exists in `nodes`.
- [ ] Every `endNodes` id exists in `nodes`.
- [ ] Every end node has `choices: []`.
- [ ] Every non-ending node has at least one choice.
- [ ] Every choice points to an existing node.
- [ ] Every node id appears in `layers`.
- [ ] Choices point forward through the layers.
- [ ] The graph is acyclic.
- [ ] Around 30 nodes is recommended for this POC.

## Notes on narrative style

For this project, a good story node usually contains:

- A short scene description.
- Optional dialogue.
- A clear situation that leads naturally to the available choices.

Choice text should describe the player's action clearly.

For third-person stories where the player controls one character, use choices like:

```js
{ to: "V2", text: "讓 Victor 直接去敲 Mary 的門，禮貌地借番茄汁" }
```

This keeps narration in third person while preserving player agency.
