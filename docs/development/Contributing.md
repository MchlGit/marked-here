# Contributing Guide 👋

Hey, thanks for taking the time to contribute! Whether you're fixing a typo, squashing a bug, or building a new feature — it all matters, and we appreciate it.

---

## Table of Contents

- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Branch Naming](#branch-naming)
- [Commit Messages](#commit-messages)
- [Opening a Pull Request](#opening-a-pull-request)
- [Code Style](#code-style)
- [Reporting Bugs](#reporting-bugs)
- [Requesting Features](#requesting-features)

---

## Getting Started

1. **Fork** the repo and clone your fork locally
2. Follow the setup steps in [README.md](README.md)
3. Create a branch for your change (see [Branch Naming](#branch-naming))
4. Make your changes, write tests if relevant, and make sure everything passes
5. Open a pull request!

If you're planning something big, it's worth **opening an issue first** to discuss the approach before diving into code. Saves everyone time. 🙂

---

## How to Contribute

There are lots of ways to help:

- 🐛 **Fix bugs** — check the [open issues](../../issues) for anything tagged `bug`
- ✨ **Build features** — look for issues tagged `help wanted` or `good first issue`
- 📝 **Improve docs** — spotted something confusing or outdated? Fix it!
- 🧪 **Add tests** — more coverage is always welcome
- 🎨 **Improve UI/UX** — design improvements and accessibility fixes are great contributions

---

## Branch Naming

Keep branch names short and descriptive. Use one of these prefixes:

| Prefix | Use for |
|--------|---------|
| `feat/` | New features |
| `fix/` | Bug fixes |
| `docs/` | Documentation only |
| `chore/` | Maintenance, tooling, refactors |
| `test/` | Adding or updating tests |

**Examples:**
```
feat/user-avatar-upload
fix/navbar-mobile-overflow
docs/update-setup-guide
```

---

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/). The format is:

```
<type>(<optional scope>): <short summary>
```

**Examples:**
```
feat(auth): add Google OAuth login
fix(button): correct focus ring on keyboard nav
docs: update environment variable table
chore: upgrade Vite to v5
```

Keep the summary under 72 characters and write it in the **imperative mood** ("add", "fix", "update" — not "added", "fixed", "updated").

---

## Opening a Pull Request

- Fill out the PR template (it'll appear automatically)
- Link to any related issue with `Closes #123` in the description
- Keep PRs **focused** — one logical change per PR is much easier to review
- Screenshots or screen recordings are gold for UI changes 🏆
- Mark it as a **Draft** if it's still a work in progress

A maintainer will review your PR, leave feedback if needed, and merge when it's ready. We aim to respond within a few days.

---

## Code Style

We use automated tooling to keep things consistent — you shouldn't have to think too hard about formatting:

```bash
# Check for lint errors
npm run lint

# Auto-fix what can be fixed
npm run lint:fix

# Format with Prettier
npm run format
```

These run automatically in CI, so make sure they pass locally before pushing.

**A few soft guidelines:**
- Prefer small, focused components
- Write readable code over clever code
- Add a comment when something isn't immediately obvious

---

## Reporting Bugs

Found something broken? [Open a bug report](../../issues/new?template=bug_report.md) and include:

- What you expected to happen
- What actually happened
- Steps to reproduce
- Browser/OS/version info if relevant

---

## Requesting Features

Got an idea? [Open a feature request](../../issues/new?template=feature_request.md)! Tell us what problem you're trying to solve and we'll go from there.

---

Thanks again for contributing. You're awesome! 🎉