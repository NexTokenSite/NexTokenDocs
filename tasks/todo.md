- [x] Restate goal + acceptance criteria
  - Goal: commit current project changes and push them to the configured GitHub remote.
  - Acceptance criteria: local changes are committed with a Conventional Commit message and `main` is pushed to `origin`.
- [x] Locate existing implementation / patterns
  - Checked git branch, staged changes, and remote configuration.
- [x] Design: minimal approach + key decisions
  - Use one documentation-focused commit for the currently staged docs changes and task note.
- [x] Implement smallest safe slice
- [x] Add/adjust tests
  - No tests added; this task only uploads existing documentation changes.
- [x] Run verification (lint/tests/build/manual repro)
  - Ran `git diff --cached --check` before commit; no whitespace errors were reported.
  - Ran `git push origin main`; the first attempt failed because the SSH host alias was wrong, then succeeded after correcting the remote alias.
  - Updated `origin` to the canonical remote URL reported by GitHub.
  - Ran `git status --short --branch`, `git remote -v`, and `git log -1 --oneline --decorate` after push.
- [x] Summarize changes + verification story
- [x] Record lessons (if any)
  - No correction or postmortem occurred, so no lesson entry was added.

## Checkpoint Notes

- Current branch: `main`
- Remote: `origin` -> `git@github-NextTokenSite:NextTokenSite/NextTokenDocs.git`
- Existing staged changes are documentation files under `docs/`.

## OpenClaw Navigation Fix

- [x] Restate goal + acceptance criteria
  - Goal: add the new OpenClaw documentation page to the Agents sidebar navigation.
  - Acceptance criteria: `/agents/openclaw` appears under Agents, Markdown renders correctly, and the docs build succeeds.
- [x] Locate existing implementation / patterns
  - Sidebar entries are configured in `docs/.vitepress/config.ts`.
- [x] Implement smallest safe slice
  - Added `OpenClaw` to the Agents sidebar and fixed a missing Markdown backtick in `docs/agents/openclaw.md`.
- [x] Run verification (lint/tests/build/manual repro)
  - Ran `npm run build`; VitePress build completed successfully and `scripts/copy-md.mjs` copied 18 Markdown files to dist.
  - `pnpm build` was blocked by pnpm 11 ignored build script approval for `esbuild@0.21.5`; this is a local package-manager policy issue, not a source build failure.
- [x] Summarize changes + verification story
- [x] Record lessons (if any)
  - Added `tasks/lessons.md` with the missing-sidebar failure mode and prevention rule.

## Results

- Prepared documentation changes and this task record for a single commit.
- Pushed commit `b098d44` to `origin/main`.
- Updated `origin` from `git@github-NexTokenSite:NextTokenSite/NextTokenDocs.git` to `git@github.com:NexTokenSite/NexTokenDocs.git` after GitHub reported the repository moved.
