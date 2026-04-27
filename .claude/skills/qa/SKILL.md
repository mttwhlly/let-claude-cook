---
name: qa
description: Interactive QA session where user reports bugs or issues conversationally, and the agent files Azure DevOps work items. Explores the codebase for context. Use when user wants to do a QA session, report bugs conversationally, file ADO bugs, or mentions "QA session".
---

# QA Session (Azure DevOps)

Run an interactive QA session. The user describes problems. You clarify,
explore the codebase for context, and file ADO work items that are durable,
user-focused, and use the project's domain language.

## Prerequisites

Azure CLI with DevOps extension:

```bash
az extension add --name azure-devops
az devops configure --defaults organization=https://dev.azure.com/<org> project=<project>
```

## For each issue the user raises

### 1. Listen and lightly clarify

Let the user describe the problem. Ask **at most 2-3 short questions**:

- What they expected vs what happened
- Steps to reproduce (if not obvious)
- Consistent or intermittent?

Don't over-interview. If clear enough to file, move on.

### 2. Explore codebase in background

While talking, kick off an Agent (subagent_type=Explore) in the background to:

- Learn domain language used in the relevant area
- Understand what the feature is supposed to do
- Identify the user-facing behavior boundary

Goal is NOT to find a fix — it's to write a better work item. The item itself
should NOT reference specific files, line numbers, or implementation details.

### 3. Single issue or breakdown?

**Break down when:**

- Fix spans multiple independent areas
- Clearly separable concerns different people could work on in parallel
- Multiple distinct failure modes

**Keep as single when:**

- One behavior wrong in one place
- All symptoms from the same root cause

### 4. File the ADO work item(s)

File immediately — don't ask user to review first. Print the URL after filing.

**Single bug:**

```bash
az boards work-item create \
  --title "<short descriptive title>" \
  --type "Bug" \
  --description "<body>"
```

**For a breakdown**, create in dependency order so you can reference real IDs.

#### Work item body template

```
## What happened

[Actual behavior the user experienced, in plain language]

## What I expected

[Expected behavior]

## Steps to reproduce

1. [Concrete numbered steps using domain terms, not module names]
2. ...

## Additional context

[Extra observations from user or codebase exploration — use domain language,
no file paths]
```

#### Rules for all work item bodies

- **No file paths or line numbers** — these go stale
- **Use project domain language** (check UBIQUITOUS_LANGUAGE.md if it exists)
- **Describe behaviors, not code**
- **Reproduction steps are mandatory** — ask the user if you can't determine them
- **Keep it concise** — readable in 30 seconds

For breakdowns, create a parent Feature item first, then child User Story/Task
items linked to it:

```bash
az boards work-item relation add \
  --id <child-id> \
  --target-id <parent-id> \
  --relation-type "System.LinkTypes.Hierarchy-Reverse"
```

### 5. Continue the session

After filing, print all created work item IDs/URLs and ask: "Next issue, or
are we done?" Each issue is independent — don't batch them.
