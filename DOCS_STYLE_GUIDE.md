# Style Guide: Active Voice & Jargon Reduction

Use these instructions to audit and refine READMEs, blog posts, and UI text. This ensures our content feels like it was written by a human expert, not an automated generator.

## 1. Converting Passive Voice to Active Voice

Passive voice often hides the "actor" and makes sentences feel heavy or clinical. Active voice is shorter and more engaging.

### Identification
Look for variations of the verb **"to be"** (am, is, are, was, were, be, being, been) combined with a **past participle** (verbs ending in -ed or -en).

### Transformation Rules
1. **Identify the Actor:** Who is performing the action?
2. **Move the Actor to the Front:** Make them the subject of the sentence.
3. **Use a Strong Verb:** Replace the "to be" construction with the action itself.

| Passive Voice (Avoid) | Active Voice (Prefer) |
| :--- | :--- |
| The dance floor **is being swept** by the crew. | The crew **sweeps** the dance floor. |
| The component **was optimized** for performance. | We **tuned** the component for speed. |
| Data **is fetched** by the hook. | The hook **fetches** data. |
| The "Physics" engine **is utilized** for movement. | Our engine **powers** the movement. |

---

## 2. Redundant "Techy" Jargon Audit

Avoid words that sound "smart" but add no specific meaning. If you can remove the word without changing the meaning of the sentence, it is redundant.

### The "Empty Word" Watch List
Avoid using these words as "padding" or fillers.

* **"Systems"**: Usually unnecessary.
    * *Bad:* "Our movement systems are ready."
    * *Good:* "The movements are ready."
* **"Optimized"**: Often a buzzword for "fast" or "fixed."
    * *Bad:* "An optimized workflow for dancers."
    * *Good:* "A faster workflow for dancers."
* **"Physics"**: Frequently used to describe simple math or logic.
    * *Bad:* "We used physics to calculate the spin."
    * *Good:* "We calculated the spin."
* **"Utilize"**: Just use **"Use."**
* **"Framework"**: Unless referring to a specific library (like React), it’s often fluff.
* **"Functionality"**: Just use **"Feature"** or **"Behavior."**
* **"Solution"**: Usually vague. Specify what the tool actually *is*.
* **"Robust"**: A classic filler word for "it works well."

---

## 3. The "So What?" Test

For every sentence, ask: **"Can I say this more simply?"**

* **Wordy:** "The implementation of the search functionality was executed to facilitate user discovery."
* **Direct:** "We built the search bar to help users find content."

## 4. Implementation Steps

1. **Scan:** Use `CTRL+F` for "is", "was", "been", and the jargon words listed above.
2. **Rewrite:** Apply the transformation rules.
3. **Verify:** Read the new sentence aloud. Does it sound like a person talking to a partner? If yes, keep it.
