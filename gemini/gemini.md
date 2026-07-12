1. Архитектурные ограничения (Сухой остаток)

    Лимит вывода (Output): Жёсткий потолок — ~8 192 токена за один ответ. Как бы ни крутил запрос, модель физически не выдаст больше за одну итерацию.
    Лимит ввода (Input): Контекст огромен (до 1M+ в платных версиях), но тут ловушка. После порога в 1M включается эффект Lost in the Middle — модель начинает «проглатывать» детали из середины, фокусируясь только на начале и конце.
    Троттлинг (Limit Caps): Веб-версия ограничена по запросам в час/сутки. При нагрузке на серверы ловишь 429 Too Many Requests. Твоя задача: меньше транзакций, больше полезной нагрузки в каждой.

1. Architectural Constraints (The Bottom Line)

    Output Limit: Hard cap at ~8,192 tokens per response. No matter how you phrase it, the model physically won't output more per iteration.
    Input Limit: Context window is massive (1M+ on paid tiers), but here's the trap. Past the 1M threshold, the Lost in the Middle effect kicks in — the model drops mid-context details, focusing only on the beginning and end.
    Throttling (Rate Limits): The web version is capped by requests/hour/day. Under server load, you'll hit 429 Too Many Requests. Goal: minimize transactions, maximize payload density per request.

2. Токеномика: Устранение «утечек памяти»

    Длинный чат = memory leak. Каждое новое сообщение заставляет модель заново перечитывать всю историю треда.
    Экспоненциальный расход: 10-е сообщение в ветке жрёт токены за все предыдущие 9. Это быстрее всего выжигает лимиты.
    Сброс стейта: Задача решена (скрипт написан, сервис отлажен) — закрывай чат. Новая задача = новый чистый инстанс. Изоляция контекста = главный инструмент экономии.
    Языковой налог: Токенизатор LLM заточен под латиницу. Кириллица режется неэффективно и жрёт в 2–4 раза больше токенов. Перевод технических запросов, архитектуры и логов на английский = экономия 50–70% токенов + выше точность ответов.

2. Tokenomics: Plugging the "Memory Leaks"

    Long threads = memory leaks. Every new turn forces the model to re-process the entire chat history from scratch.
    Exponential burn: The 10th reply in a thread consumes tokens for all 9 previous ones. This drains your limits fastest.
    State reset: Task done (script written, service debugged) — close the chat. New task = fresh thread. Context isolation = your main cost-saver.
    Language tax: LLM tokenizers are optimized for Latin script. Cyrillic chunks inefficiently and burns 2–4x more tokens. Translating technical prompts, architecture specs, and logs to English = 50–70% token savings + sharper technical accuracy.

3. Эффективная работа (Терминальный минимум)
А. Подготовка данных (Input Optimization)

    Убирай мусор: Не грузи тяжёлые файлы с форматированием. Модель тратит вычислительный ресурс на парсинг. Конвертируй всё в терминальный минимум — чистые .txt или .md.
    Хирургия логов: Не кидай простыни вывода. Если упал демон, давай только релевантный срез journalctl или ausearch, привязанный к PID процесса.

Б. Структурирование запроса (Batching)

    Вместо 10 коротких уточнений собирай один плотный промпт.
    Плохо: «напиши скрипт» → «добавь логи» → «сделай исполняемым». (3 запроса = 3 списания лимитов + перечитывание контекста).
    Хорошо: Единый .md блок с чёткими критериями (цель, стек, требования к логам, права доступа). Это одна транзакция.

В. Контроль вывода (Output Formatting)

    Лимит 8к токенов. Запрети модели тратить их на вежливость и воду.
    Жёсткие директивы в конце: No explanations. Only plain text bash script. Use strict mode.
    Для архитектуры ограничивай формат заранее: «Опиши модель. Формат: только маркированный список, макс. 5 пунктов. Вывод: .txt/.md»

3. Efficient Workflow (Terminal Minimum)
A. Data Prep (Input Optimization)

    Cut the noise: Don't dump heavy, formatted files. The model wastes compute parsing them. Convert everything to the terminal minimum — clean .txt or .md.
    Surgical logging: Don't paste walls of output. If a daemon crashes, provide only the relevant journalctl or ausearch slice tied to that PID.

B. Prompt Structuring (Batching)

    Skip 10 short follow-ups. Pack everything into one dense prompt.
    Bad: “write a script” → “add logging” → “make it executable”. (3 requests = 3 limit hits + context reloads).
    Good: Single .md block with clear specs (goal, stack, logging rules, permissions). One transaction.

C. Output Control (Output Formatting)

    8K token cap. Stop the model from burning it on pleasantries and filler.
    Hard directives at the end: No explanations. Only plain text bash script. Use strict mode.
    For architecture, constrain the format upfront: “Describe the model. Format: bullet list only, max 5 items. Output: .txt/.md”
