# 🤖 GitHub Copilot Workshop Guide

## 📋 Workshop Overview

## 🚀 Pre-Workshop Setup

### 1. Create Personal Branch

`workshop/[your-name]_[your-role]`

Example : `workshop/SibylleEngelhardt_Infra`

### 2. Create Coding Preferences

**File**: `.github/personal-preferences/[your-name]-preferences.md`

and reference it in the `copilot-instructions.md`

```markdown
# [Your Name] - Coding Preferences

## Developer Profile

- **Role**: [Backend/Frontend/Full-Stack/DevOps/Architect]
- **Experience**: [Junior/Mid/Senior]
- **Languages**: [C#, TypeScript, etc.]

## AI Response Preferences

- **Explanation Style**: [Brief/Detailed/Step-by-step]
- **Code Generation**: [Full solutions/Code snippets/Guidance only]
- **Problem Solving**: [Direct answers/Think-through process/Multiple options]
- **Documentation**: [Minimal comments/Extensive docs/Self-documenting code]

## Code Style Preferences

### C#

- **Patterns**: [Result<T>/Exceptions for errors]
- **Methods**: [Pure functions/Class methods/Mixed]
- **Testing**: [Unit focused/Integration focused/E2E focused]

### Angular/TypeScript

- **Components**: [Standalone only/Mixed]
- **State**: [Signals/RxJS/Mixed]
- **Templates**: [New control flow @if/@for/Legacy *ngIf/*ngFor]
```

## 🎯 Workshop Execution

**One commit per completed task:**

```bash
# Format: feat(domain): task-name - model used
git commit -m "weather API - chatgpt"
git commit -m "weather widget - claude"
```

## 📊 Post-Workshop Evaluation

### Guidelines Reference

Please answer the Survey after completed the Tasks in the sharepoint:

[LINK TO SURVEY]

- **C# Guidelines**: [.github/codingguidelines/C#/coding-guidelines.instructions.md](../.github/codingguidelines/C%23/coding-guidelines.instructions.md)
- **Angular Guidelines**: [.github/codingguidelines/Angular/instructions.md](../.github/codingguidelines/Angular/instructions.md)

---
