---
name: to-prd
description: Turn the current conversation context into a PRD and submit it as an Azure DevOps work item (Feature or Epic). Use when user wants to create a PRD from the current context, formalize a plan, or file a spec as an ADO work item.
---

# To PRD (Azure DevOps)

Takes the current conversation context and codebase understanding and produces a
PRD filed as an ADO Feature work item. Do NOT interview the user — synthesize
what is already known.

## Prerequisites

Azure CLI with DevOps extension:

```bash
az extension add --name azure-devops
az devops configure --defaults organization=https://dev.azure.com/<org> project=<project>
```

## Process

1. Explore the repo to understand the current codebase state if not already done.

2. Sketch the major modules to build or modify. Look for deep module opportunities
   (small testable interface, deep implementation). Check with the user that the
   module list matches expectations and which modules need tests.

3. Write the PRD using the template below.

4. File it as an ADO work item:
   ```bash
   az boards work-item create \
     --title "<PRD title>" \
     --type "Feature" \
     --description "<PRD body as HTML or plain text>"
   ```
   Print the created work item ID and URL.

## PRD Template

```
## Problem Statement

The problem that the user is facing, from the user's perspective.

## Solution

The solution to the problem, from the user's perspective.

## User Stories

A numbered list of user stories. Format:
1. As a <actor>, I want <feature>, so that <benefit>.

Cover all aspects of the feature — be extensive.

## Implementation Decisions

- Modules that will be built/modified
- Interfaces of those modules
- Architectural decisions
- Schema changes
- API contracts

Do NOT include specific file paths or code snippets (they go stale).

## Testing Decisions

- What makes a good test for this feature (only test external behavior)
- Which modules will be tested
- Prior art for the tests (similar tests already in codebase)

## Out of Scope

What is explicitly not being built in this PRD.

## Further Notes

Any other relevant notes.
```

## ADO Work Item Type Guide

| PRD type                   | ADO type           |
| -------------------------- | ------------------ |
| Large multi-sprint feature | Epic               |
| Single-sprint feature      | Feature            |
| Single task / bug fix      | User Story or Task |
