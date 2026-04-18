# Дом на Утёсе — CLAUDE.md

> Клубный жилой дом на волжском берегу Самары. 9 лотов на исторической линии просек.
> Стек: **Laravel 13 + Inertia 3 + React 19 (SSR) + Tailwind 4 + Orchid 14 + MySQL 8**

---

## Команда агентов

Проект ведут 8 специализированных агентов. Перед любой задачей — определи,
кто её выполняет, и думай как он.

### ARCHITECT
Системный архитектор. Laravel-приложение, Inertia-контракт, Eloquent, кэширование.
Отвечает за таблицы (`Lot`, `Neighbor`, `TeamMember`, `SiteSetting`, `Lead`),
маршруты, API-контракт между Laravel и React.

### DESIGN-KEEPER
Хранитель дизайн-системы. Источник правды: `docs/DESIGN_SYSTEM.md` + сырые
`docs/design-system/dom-na-utese-brief.txt` и `dom-na-utese-concept.txt`.

**Tailwind 4 в этом проекте:**
- Все брендовые токены (цвета, шрифты, spacing, easing, duration) — в
  `resources/css/tokens.css` через директиву `@theme { --color-paper: #EEE4D3; ... }`.
- Tailwind-утилиты автоматически подхватывают токены как `bg-paper`,
  `text-stamp`, `font-serif`, `duration-slow` и т.д.
- `@font-face` вынесен в `resources/css/fonts.css`.
- `resources/css/app.css` импортирует в строгом порядке: `tokens.css` → `fonts.css`
  → `@import 'tailwindcss';` → editorial reset. Иначе `@theme` не зарегистрируется
  до того, как Tailwind соберёт CSS.
- Никаких `tailwind.config.js` / `postcss.config.js`. Плагин `@tailwindcss/vite`
  уже в `vite.config.js` — не трогать.
- Кастомный CSS — **только** для того, что утилитами не выражается:
  editorial reset (normalize 1px hairline, oldstyle figures, selection color),
  `@font-face`, scroll-snap rules для mobile (`scroll-snap-type: y proximity`).

### BACKEND
Laravel-разработчик. Тонкие контроллеры, валидация через FormRequest,
Inertia responses. Очереди для писем.

**Контракт формы (`POST /api/lead`):**
```
name              required string max:120
phone             required string 7–20 digits/spaces/+/−/()
email             nullable email
preferred_contact required phone|whatsapp|telegram
consent           required accepted
source            required hero|built|final|lot-card|header
lot_id            nullable integer 1..9
```
Throttle: 5 запросов в минуту на IP. Ответ: `redirect()->back()` с
`flash.success` (Inertia shared data).

Все backend-файлы уже закоммичены (commit `675016d`):
- `app/Http/Controllers/LeadController.php`
- `app/Http/Controllers/HomeController.php`
- `app/Http/Controllers/ShoreController.php`
- `app/Http/Requests/StoreLeadRequest.php`
- `app/Mail/LeadReceived.php`
- `resources/views/emails/lead.blade.php`
- `routes/web.php`, `config/services.php`

CRM-интеграция (amoCRM/Bitrix/Telegram) вынесена за рамки первой
итерации — email-only через Laravel Mail + `Log::info('Lead received', ...)`
как source of truth. Источник — `LeadController::store`.

### FRONTEND
React + Inertia. Компонентный мыслитель, SSR-ориентированный, UX-фокус.

**SSR-правила:**
- Никаких `window` / `document` / `navigator` без `typeof window !== 'undefined'`
  или без `useEffect`.
- Для условных браузерных фич (Intersection Observer, scroll listeners) —
  только `useEffect`, и всегда с cleanup.
- Tailwind-утилиты для стилей, CSS-переменные из `@theme` — для брендовых значений.
- `useForm` из `@inertiajs/react`, не raw axios.
- Lazy load для всех изображений кроме hero (`loading="lazy"`).

**Структура:**
```
resources/js/
├── Pages/
│   ├── Home.jsx           ← 11 блоков (01–12, без Team), всё на одном скролле
│   └── Shore.jsx          ← лонгрид-монография о берегу
├── Components/
│   ├── Blocks/            ← 01-Hero.jsx ... 12-FinalCTA.jsx
│   ├── UI/                ← Button, Field, Modal, Toast, LeadFormModal
│   └── Layout/            ← Header, Footer, Shell
├── hooks/                 ← useInView, useLeadForm
├── app.jsx / ssr.jsx      ← entry points, НЕ ТРОГАТЬ
```

### ADMIN
Orchid-разработчик. Пока не подключён — скелет с одним админ-юзером
(`admin@dom-na-utese.ru`, пароль локально в `/tmp/dom_na_utese_admin_pass.txt`).
Ресурсы (`LotResource`, `NeighborResource`, `TeamResource`, `LeadScreen`,
`SiteSettingsScreen`) — следующая итерация.

### CONTENT
Копирайтер. Голос — **редактор монографии о доме**, не менеджер по продажам.

**Источники дословного текста (НЕ переписывать, НЕ «улучшать»):**
- `docs/design-system/dom-na-utese-brief.txt` — 12 блоков + финал.
- `docs/design-system/dom-na-utese-concept.txt` — манифест + 14 объектов + хронология.
- Микрокопия UI: `docs/DESIGN_SYSTEM.md` §15.

Запрещённые слова (из §14): «элитный», «премиум», «эксклюзивный», «Успейте»,
восклицательные знаки, эмодзи. Тире как ритмический знак.

### CONVERSION-ENGINEER
Формы, конверсионные точки, аналитика. CRM на этом этапе — только email
через `Mail::to(config('services.leads.recipient'))`. Яндекс.Метрика и цели
подключаются в следующую итерацию.

**Карта CTA (ровно 3 главных + 2 вспомогательных):**
- Hero (блок 01) — `source: 'hero'`
- Дом построен (блок 11) — `source: 'built'`
- Финальный CTA (блок 12) — `source: 'final'`
- Карточка лота (блок 08) — `source: 'lot-card'`, передаёт `lot_id`
- Sticky header — `source: 'header'`

### DEVOPS
Инженер деплоя. VDS Ubuntu 24.04, SSH alias `na-ugle`. Тот же сервер, что
«На Угле»: `/var/www/dom-na-utese`, SSR systemd `dom-na-utese-ssr.service`
на порту `127.0.0.1:13715`. Nginx vhost `/etc/nginx/sites-available/dom-na-utese`.
Домен `https://domnautese.swipeandev.ru`.

Деплой ручной, команду разработчика не пушим из-под Claude — devops-агент
подхватывает после локального коммита.

---

## Контекст проекта

Клубный ЖК «Дом на Утёсе» — лендинг для продажи 9 лотов в клубном доме,
стоящем на утёсе над Волгой.

**Позиционирование:** «Берег людей, чьи имена стали городом» — продолжение
купеческой застройки самарских просек, начавшейся в 1877 году.

**Главный отстроечный приём:** это не ЖК, это клубный дом. Не Самара в широком
смысле, а просеки. Не «квартиры в продаже», а «частное предложение».
Цены не публикуются. Таймеров нет. Это категорийный сигнал.

**ЦА:** собственники и топ-руководители 40–60 лет, знающие Самару, имеющие
или имевшие опыт жизни на просеках. Второе или третье жильё.

---

## Структура лендинга

Один скролл, 12 смысловых блоков, 4 акта (карта в `docs/design-system/dom-na-utese-brief.txt`).

На текущем этапе реализовано 11 блоков (без Team, блок 12 — это Финальный CTA):

```
Акт I · Установление категории
  01  Hero                  ink фон, full-bleed фото (14.jpg)
  02  Категория             paper фон, 2/10 сетка
Акт II · Легитимация места
  03  Берег (Ривьера)       paper, 3 цифры + карта
  04  Соседи по времени     paper, h-scroll карусель
  05  Дача со Слонами       ink, 5/7 инверсия
Акт III · Продукт и уклад
  06  Архитектура           paper, мозаика 2×2
  07  Лот                   paper, «9» 280pt + таблица
  08  Планировки            paper, фасад + 9 карточек лотов
  09  Уклад                 шахматка paper/ink
  10  Инфраструктура        paper, горизонтальный реестр (БЕЗ иконок)
Акт IV · Доказательства и переход
  11  Дом построен          ink, full-bleed
  12  Финальный CTA         stamp фон, форма
```

Блок **«Команда проекта»** (из брифа — блок 12) в первой итерации не
реализован по решению клиента. Нумерация в коде: `12-FinalCTA.jsx`.

---

## Жёсткие правила

1. **Цен нет.** Диапазон — максимум, и только после контакта с менеджером.
2. **Рендеров нет.** Только живые фото сданного дома (`public/images/visual/*.jpg`).
3. **Скруглений нет.** Максимум `--radius-sm: 2px`. Углы прямые.
4. **Иконок в блоке 10 нет.** Горизонтальный реестр. Правило «число сильнее иконки».
5. **Чистого `#FFF` и `#000` нет.** Только `--color-paper` (#EEE4D3) и
   `--color-handwriting` (#1E1E1E).
6. **Никаких градиентов, глянца, «золотых» акцентов, box-shadow «под премиум».**
7. **Input-ы без рамок.** Только 1px линия снизу (`.field__input`).
8. **Тексты — дословно из брифа и концепции.** Не переписывать.
9. **SSR-совместимость обязательна.** Никаких `window`/`document` без guard.

---

## QA-прогон

После любого изменения до коммита:

- `npm run build` — без ошибок.
- `npm run build -- --ssr` — без ошибок.
- Прогрев `/` и `/shore` глазами — hero grab, тексты на месте, форма открывается.
- При правках формы — один prod-style POST на `/api/lead` через Vite dev + `php artisan serve`.
- 500-ки → `storage/logs/laravel.log`, чинить ДО коммита.

---

## Выращенные правила

*(пусто — по мере появления инцидентов записываем сюда root-cause и правило)*

---

## Источники правды

- `docs/MAIN_PROMPT.md` — длинный бриф команды агентов (оригинал SWIPE).
- `docs/BRIEF.md` — краткая выжимка.
- `docs/DESIGN_SYSTEM.md` — дизайн-система (токены, типо, компоненты, моушн, a11y, perf).
- `docs/design-system/dom-na-utese-brief.txt` — **источник текстов 12 блоков**.
- `docs/design-system/dom-na-utese-concept.txt` — **источник манифеста + 14 исторических объектов**.
- `docs/design-system/dom-na-utese-design-system.html` — HTML-версия системы.
- `docs/design-system/dom-na-utese-grids.html` — режиссура 12 блоков.

**Когда markdown противоречит сырым txt/html — правда в сырых.** Markdown — производный.

---

## Инфраструктура

- Продакшн: `https://domnautese.swipeandev.ru` (Let's Encrypt, auto-renew)
- Путь: `/var/www/dom-na-utese` (owner `claude:www-data`)
- SSR: systemd unit `dom-na-utese-ssr.service`, порт `127.0.0.1:13715`
- Nginx vhost: `/etc/nginx/sites-available/dom-na-utese`
- PHP: 8.3-FPM через `/run/php/php8.3-fpm.sock`
- MySQL: БД `dom_na_utese`, user `dom_na_utese`@`localhost`
- SSH alias `na-ugle` (тот же VDS), `85.236.186.16`, Ubuntu 24.04

**Тот же сервер делит с проектом «На Угле»** (`/var/www/na-ugle`, порт SSR 13714).
Не трогать их файлы/сервисы.
