# Orchestrator experiments

This directory contains experimental orchestration scripts, not the site's
runtime or a verified unattended development service.

- `agent_2_orchestrator.py` calls an external `td` CLI to dispatch, sync,
  inspect and send messages to a session. It imports
  `dev_tools.utils.run_command` from the separately installed CLI package;
  that module is not supplied by this site checkout.
- `experiments/genai_orchestrator.py`, `deterministic_loop.py` and
  `continuous_dev_loop.py` explore alternative routing loops.

The primary script still contains fixed June 2026 timestamps, a fixed
`main` target and PR 2280. Its prompt-level throttling description is not
proof of a persistent scheduler or an enforced spending limit. Do not run
it as a current-work loop without reviewing those values, the external
CLI's supported commands, authentication, dispatch effects and limits.

The `--session-id` option exists for attaching to a session, but this source
check did not establish that the external session backend still supports
the command sequence. Running the script or experiments can dispatch work
or invoke providers; they were not executed for this documentation update.

For supported local site commands, use the repository's root README and
`package.json`. For developer automation, consult the separately maintained
[Boomtick repository](https://github.com/arii/boomtick).

Source checked November 21, 2026. No live session, scheduled loop or provider
execution is claimed.
