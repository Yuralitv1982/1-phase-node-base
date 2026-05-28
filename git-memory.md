================================================================================
CONVENTIONAL COMMITS CHEAT SHEET — OLD SCHOOL EDITION
================================================================================

+----------+--------------------------------------------------+------------------+
| TYPE     | DESCRIPTION (RU / EN)                            | EXAMPLE          |
+----------+--------------------------------------------------+------------------+
| feat     | Новая функциональность                           | feat(auth): add  |
|          | New feature                                      | JWT refresh token|
|          |                                                  | rotation         |
+----------+--------------------------------------------------+------------------+
| fix      | Исправление ошибки                               | fix(api): handle |
|          | Bug fix                                          | null pointer in  |
|          |                                                  | user serializer  |
+----------+--------------------------------------------------+------------------+
| lab      | Практический код, упражнения, объемные задачи    | lab(node):       |
|          | Lab work, exercises, large tasks                 | implement custom |
|          |                                                  | stream transformer|
+----------+--------------------------------------------------+------------------+
| drill    | Короткие упражнения на автоматизм                | drill(git):      |
|          | Micro-drills for muscle memory                   | practice         |
|          |                                                  | interactive      |
|          |                                                  | rebase squash    |
+----------+--------------------------------------------------+------------------+
| theory   | Теоретические заметки, анализ концепций          | theory(os):      |
|          | Theory notes, concept analysis                   | analyze epoll vs |
|          |                                                  | io_uring trade-  |
|          |                                                  | offs             |
+----------+--------------------------------------------------+------------------+
| infra    | Настройка окружения: ОС, скрипты, конфиги        | infra(fedora):   |
|          | Environment setup: OS, scripts, configs          | update zsh       |
|          |                                                  | plugins and      |
|          |                                                  | starship preset  |
+----------+--------------------------------------------------+------------------+
| report   | Синхронизация ежедневных квестов                 | report(daily):   |
|          | Daily quest sync, progress report                | complete cs/     |
|          |                                                  | networking module|
|          |                                                  | day-12           |
+----------+--------------------------------------------------+------------------+
| docs     | Изменения только в документации                  | docs(readme):    |
|          | Documentation only                               | add architecture |
|          |                                                  | diagram and      |
|          |                                                  | badges           |
+----------+--------------------------------------------------+------------------+
| chore    | Рутина: переименование, чистка, зависимости      | chore(deps):     |
|          | Routine: rename, cleanup, dependencies           | bump express from|
|          |                                                  | 4.18.2 to 4.19.0 |
+----------+--------------------------------------------------+------------------+
| test     | Добавление или исправление тестов                | test(api): add   |
|          | Add or fix tests                                 | integration tests|
|          |                                                  | for /users       |
|          |                                                  | endpoint         |
+----------+--------------------------------------------------+------------------+
| refactor | Рефакторинг без изменения поведения              | refactor(auth):  |
|          | Refactor without behavior change                 | extract token    |
|          |                                                  | validation to    |
|          |                                                  | service          |
+----------+--------------------------------------------------+------------------+
| style    | Форматирование, линтинг, пробелы                 | style(eslint):   |
|          | Formatting, linting, whitespace                  | fix indent and   |
|          |                                                  | semicolon        |
|          |                                                  | warnings         |
+----------+--------------------------------------------------+------------------+
| perf     | Улучшение производительности                     | perf(db): add    |
|          | Performance improvement                          | index to         |
|          |                                                  | users.email for  |
|          |                                                  | faster lookup    |
+----------+--------------------------------------------------+------------------+
| ci       | Изменения в CI/CD пайплайнах                     | ci(github): add  |
|          | CI/CD pipeline changes                           | cache for        |
|          |                                                  | node_modules in  |
|          |                                                  | workflow         |
+----------+--------------------------------------------------+------------------+
| revert   | Откат предыдущего коммита                        | revert: revert   |
|          | Revert previous commit                           | "feat(auth):    |
|          |                                                  | add 2fa" due to  |
|          |                                                  | regression       |
+----------+--------------------------------------------------+------------------+

================================================================================
FORMAT RULES (ЗАПОМНИ НАВСЕГДА)
================================================================================

1. SUBJECT LINE:
   <type>(<scope>): <description>
   
   ✓ feat(user-auth): add password strength validator
   ✗ feat: add password strength validator to user auth module (too long)
   ✗ Added password validator (wrong mood, no type)

2. MOOD: IMPERATIVE (ПОВЕЛИТЕЛЬНОЕ НАКЛОНЕНИЕ)
   ✓ add, fix, implement, refactor, remove
   ✗ added, fixed, implemented, refactored, removed

3. SCOPE: kebab-case, lowercase, no spaces
   ✓ (user-auth), (api-gateway), (cs-networking)
   ✗ (UserAuth), (API Gateway), (cs_networking)

4. NO PERIOD at end of subject line
   ✓ feat(api): add rate limiting
   ✗ feat(api): add rate limiting.

5. BODY: Separate with blank line, wrap at 72 chars
   feat(api): add rate limiting

   Implement token bucket algorithm with Redis backend.
   Configurable via env vars: RATE_LIMIT_WINDOW, RATE_LIMIT_MAX.

   Closes: #42

6. FOOTER: Issues, breaking changes, co-authors
   BREAKING CHANGE: auth middleware now requires token in header
   Closes: #128, #130
   Co-authored-by: Name <email@example.com>

================================================================================
QUICK REFERENCE: COMMON SCOPES FOR OUR STACK
================================================================================

js          • Node.js / JavaScript core
ts          • TypeScript types / config
api         • REST / GraphQL endpoints
auth        • Authentication / Authorization
db          • Database / Migrations / ORM
cache       • Redis / In-memory caching
stream      • Node.js Streams / Backpressure
event-loop  • V8 / Libuv / Async patterns
infra       • Docker / K8s / Terraform / CI
fedora      • OS-level setup (Zsh, Starship, Neovim)
git         • Git internals / Workflow / Hooks
arch        • Architecture decisions / ADR / Patterns
cs          • Computer Science fundamentals
test        • Unit / Integration / E2E tests
docs        • README / ADR / API docs
prj         • Project-level changes (multi-file)

================================================================================
PRE-COMMIT CHECKLIST [ ] = NOT DONE, [x] = DONE
================================================================================

[ ] Code passes linter and tests
[ ] Commit is atomic and single-purpose
[ ] Subject in imperative mood, no trailing period
[ ] Scope in kebab-case, lowercase
[ ] Type matches the actual change content
[ ] Body added if change is non-obvious or complex
[ ] Footer contains issue link if applicable (Closes: #NNN)
[ ] No secrets, credentials, or sensitive data in commit

================================================================================
PRO TIPS FROM THE TRENCHES
================================================================================

• Use `git commit -v` to see diff while writing message
• Use `git log --oneline --graph` to visualize history
• Use `git rebase -i` to clean up before push (squash, reword)
• Never force-push to shared branches without team agreement
• Write commit messages for your future self at 3 AM during incident

================================================================================
ANTI-PATTERNS TO AVOID (НЕ ДЕЛАЙ ТАК)
================================================================================

✗ "fix stuff"                    → Too vague, no type/scope
✗ "WIP: auth module"            → Don't commit work in progress
✗ "final final v2 REAL"         → Use branches, not commit names
✗ "update everything"           → Atomic commits only
✗ "Merge branch 'main'"         → Rebase or squash merges
✗ Committing node_modules/      → .gitignore is your friend
✗ Secrets in commit history     → Use env vars, vault, secrets manager

================================================================================
"Чистая история — это уважение к будущему разработчику.
 Даже если это ты сам, через полгода, в 3 часа ночи, при инциденте."

"Clean history is respect for the future developer.
 Even if that's you, six months later, at 3 AM, during an incident."
================================================================================
