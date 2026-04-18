# Промт для Claude Code · Дом на Утёсе

> Скопируйте весь текст ниже в Claude Code в уже открытом терминале проекта.
> Перед запуском — подготовьте файлы из раздела "Что принести в папку" в конце документа.

---

## 📋 Как использовать этот промт

**Шаг 1 · Создать папку проекта на вашем макбуке:**
```bash
mkdir -p ~/dom-na-utese
cd ~/dom-na-utese
```

**Шаг 2 · Положить в папку следующие файлы:**
- `dom-na-utese-design-system.html` (handoff-пакет из нашей сессии)
- `dom-na-utese-grids.html` (art-direction с макетами 12 блоков)
- `dom-na-utese-brief.docx` (бриф на one-page)
- `dom-na-utese-concept.docx` (манифест и справочник 14 исторических объектов)

**Шаг 3 · Запустить Claude Code:**
```bash
claude
```

**Шаг 4 · Скопировать в чат весь ПРОМТ НИЖЕ** (начиная со строки `# CLAUDE CODE · ЗАПУСК РАЗРАБОТКИ`).

Claude Code прочитает ваши документы, инициализирует Laravel + Inertia, создаст CLAUDE.md с командой агентов, подготовит структуру проекта и **остановится перед Спринтом 3**, чтобы вы успели залить визуализации дома и заполнить данные через Orchid.

---

# CLAUDE CODE · ЗАПУСК РАЗРАБОТКИ

Привет. Это проект **Дом на Утёсе** — клубный дом на 9 лотов на первой линии Волги в Самаре. One-page editorial-сайт. Главная задача — привести квалифицированного покупателя на приватный показ.

В этой папке лежат четыре файла-источника истины. Прочитай их по порядку и **не додумывай ничего, чего в них нет**:

1. `dom-na-utese-brief.docx` — бриф на one-page
2. `dom-na-utese-concept.docx` — манифест проекта + справочник 14 исторических объектов берега
3. `dom-na-utese-design-system.html` — полная дизайн-система (12 разделов: токены, grid, адаптив, swipe-архитектура, UI-kit, моушн, a11y, perf, SEO, контент, handoff, roadmap)
4. `dom-na-utese-grids.html` — art-direction с макетами всех 12 блоков

**Эти четыре документа — это закон.** Если в коде нужно что-то, чего в них нет, — останавливаешься и спрашиваешь у меня.

---

## Контекст проекта (краткая выжимка)

**Позиционирование.** «Девять лотов на той же береговой линии, что и виллы Головкина, Соколовых, Сурошникова и Курлиной, — в современной форме».

**Формат сайта.** One-page editorial-монография. 4 акта. 12 блоков. На mobile превращается в **вертикальный swipe-deck из 18 экранов** (не обычный скролл). Между экранами — scroll-snap mandatory + fade-in типографики.

**Стилистический ориентир.** Editorial · Архив · Монография о доме.

**Цветовая доминанта.** Paper (#EEE4D3) 70% площади + Handwriting (#1E1E1E) + редкие Ink-блоки (#2C3E50) + Stamp (#802F1D) как единственный акцент CTA.

**Типографика.** Две гарнитуры: Piazzolla (serif, основной) + Alegreya Sans SC (caps-метки, CTA, меты). Никаких других шрифтов.

**Цена.** Не публикуется. Все CTA ведут на «запросить условия» или «приватный показ».

**Целевая аудитория.** 40–60 лет, частый просмотр с iPhone, часто второе/третье жильё, знают Самару.

---

## 🛠️ Стек технологий (финальный)

**Бэкенд:** Laravel 11 (PHP 8.2+) + Inertia.js SSR + MySQL 8.0
**Фронтенд:** React 18 (через Inertia.js, SSR-совместимый) + **vanilla CSS с CSS vars** (не Tailwind!)
**Админка:** Orchid Platform — CRUD для лотов, соседей, команды, заявок
**Очереди:** Redis + Laravel Horizon (уведомления менеджеру, webhook в CRM)
**Формы:** Inertia.useForm + Laravel FormRequest
**Хостинг:** Ubuntu 22.04 VDS + Nginx + PHP-FPM + Node.js 20 + Supervisor
**SSL:** Let's Encrypt / Certbot
**CRM:** webhook → amoCRM / Bitrix24 + Telegram Bot API для уведомлений менеджера
**Аналитика:** Яндекс.Метрика + все цели из § 11 design-system.html

**Почему vanilla CSS, а не Tailwind** (это важно):
Дизайн-система в `/docs/dom-na-utese-design-system.html` написана **строго под vanilla CSS с CSS vars**. Все токены, компоненты, scroll-snap-deck, stagger-анимации, editorial type-scale даны в виде чистого CSS. Tailwind потребовал бы кастомный конфиг + переписывание половины утилит через `@apply`, что создаст гибрид и разрушит строгость системы. В этом проекте vanilla CSS — осознанное решение.

---

## СПРИНТ 1 · ФУНДАМЕНТ (делаешь сейчас)

### 1.1 Прочитай все 4 файла-источника

Начни с brief.docx → concept.docx → grids.html → design-system.html. Последний — самый большой, читай его как техническую документацию.

После прочтения **сформулируй мне в чат** (не в код, а в ответ):
- Твоё понимание one-line promise проекта (одной фразой)
- 5 «железных» принципов дизайна, которые ты выделил из документов
- 3 самые рискованные места, которые могут пойти не так при разработке
- Список всего, что **в документах НЕ указано**, но критично для старта (например: реальные площади лотов? реальные имена команды? реальные фото дома?)

Это займёт один заход, без кода. Дождись моего «ок, продолжай».

### 1.2 Инициализация Laravel + Inertia + React

После моего «ок»:

```bash
# Laravel 11
composer create-project laravel/laravel . "^11.0"

# Inertia + React
composer require inertiajs/inertia-laravel
php artisan inertia:middleware

npm install @inertiajs/react react react-dom
npm install -D @vitejs/plugin-react

# Orchid для админки
composer require orchid/platform
php artisan orchid:install

# SSR для Inertia
npm install @inertiajs/server
php artisan inertia:start-ssr

# Очереди и уведомления
composer require laravel/horizon
composer require predis/predis
```

**Vite config** настроить на React + vanilla CSS (без PostCSS-плагинов Tailwind):
```js
// vite.config.js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.jsx'],
      ssr: 'resources/js/ssr.jsx',
      refresh: true,
    }),
    react(),
  ],
});
```

**Удалить Tailwind если установлен автоматически:**
```bash
npm uninstall tailwindcss @tailwindcss/vite postcss autoprefixer
rm -f tailwind.config.js postcss.config.js
```

В `resources/css/app.css` — чистый CSS с импортом `tokens.css`, `reset.css`, `global.css`. Никаких директив `@tailwind`.

### 1.3 Создай CLAUDE.md с командой агентов

Создай файл `CLAUDE.md` в корне проекта. Используй **ровно эту структуру** (сохрани её целиком, не сокращай, не переформулируй):

```markdown
# 🏛️ ДОМ НА УТЁСЕ — CLAUDE.md

> Клубный дом на 9 лотов. Первая линия Волги. Самара, Просеки.
> One-page editorial-монография. Главная цель — запись на приватный показ.
> Стек: Laravel 11 + Inertia.js SSR + React 18 + vanilla CSS (CSS vars) + MySQL + Orchid + Redis

---

## 🧠 КОМАНДА АГЕНТОВ

Проект ведут 8 специализированных ролей. Перед любой задачей определи, какая роль её выполняет, и думай как она. Все решения сверяются с четырьмя документами-источниками в папке /docs/ — они закон.

---

### 🏛️ EDITOR-IN-CHIEF
**Роль.** Главный редактор монографии. Оркестратор команды.
**Думает как.** Редактор архитектурной книги Phaidon. Сайт — это книга о доме, каждый блок — разворот.

**Зоны:**
- Распределяет задачи, держит общий замысел
- Защищает one-line promise: «9 лотов на той же береговой линии, что виллы Головкина, Соколовых, Сурошникова и Курлиной, — в современной форме»
- Проверяет соответствие 5 принципам (см. ниже)
- Последнее слово перед merge в main

**5 принципов** (из grids.html, § «Принципы вёрстки»):
1. Асимметрия сильнее симметрии
2. Один цвет-акцент на блок
3. Число в углу сильнее иконки в центре
4. Линия сильнее рамки
5. Italic — для смысла, не для украшения

---

### 🏗️ ARCHITECT
**Роль.** Системный архитектор Laravel + Inertia.
**Думает как.** Senior Laravel-разработчик с опытом SSR-проектов.

**Зоны:**
- Архитектура Laravel (Controllers, Services, FormRequests, Events)
- Eloquent-модели и миграции, никаких raw SQL без крайней необходимости
- Inertia responses — `Inertia::render(...)` с typed props
- SSR через `@inertiajs/react` — компоненты должны рендериться на сервере
- Redis + Horizon для очередей (уведомления, webhook в CRM)
- Performance: LCP < 2.0s, FID < 50ms, CLS < 0.05

**Маршруты:**
```php
// Публичные (Inertia)
GET  /                       → HomeController@index    (one-page)
POST /api/lead               → LeadController@store    (приём заявок)
GET  /api/lots               → LotController@index     (для обновлений статусов)

// Orchid Admin
/admin/*                     → Orchid Dashboard
```

**Eloquent-модели** (источник — design-system.html § 11 + concept.docx):

- `Lot` — id, number (01..09), floor, area, terrace, view, status (available|reserved|sold), plan_url, plan_image, sort_order
- `Neighbor` — id, title, date_label, address, tag, description, image, featured, sort_order, year
- `TeamMember` — id, name, role, bio, portrait, sort_order
- `Lead` — id, name, phone, preferred_contact, lot_id (nullable), source (hero|built|final|lot-card), consent, status (new|contacted|scheduled|done), created_at
- `SiteSetting` — key/value для телефон, tg, wa, адрес, ссылка на проектную декларацию

**Правила:**
- Все модели — Eloquent, типизированные через PHPDoc
- Props для Inertia передавать через Resource-классы (`LotResource`, `NeighborResource`)
- Валидация — только через FormRequest
- Секреты в `.env`, никогда в коде
- Ни один текст с сайта не должен быть захардкожен — всё через Orchid (SiteSetting + блок-специфичный контент в БД или seed)

---

### 🎨 DESIGN-KEEPER
**Роль.** Хранитель дизайн-системы. Вёрстка строго по токенам.
**Думает как.** Art-director, который уже согласовал всё в design-system.html.

**Источник истины.** `/docs/dom-na-utese-design-system.html` — 12 разделов, всё production-ready.

**Палитра (CSS vars в `resources/css/tokens.css`):**
- `--color-paper: #EEE4D3` (70% фона)
- `--color-paper-light: #F5EEDF` (карточки)
- `--color-paper-deep: #E5D9C3` (highlight)
- `--color-dust: #C4BFAF` (служебные линии)
- `--color-ink: #2C3E50` (ночные блоки 05, 11)
- `--color-ink-deep: #22303F` (градиенты)
- `--color-handwriting: #1E1E1E` (основной текст)
- `--color-stamp: #802F1D` (CTA, акцент)
- `--color-stamp-hover: #9A3822`
- `--color-tea: #C98540` (второй акцент)
- `--color-success: #25664A`
- `--color-error: #B23A2B`

**Типографика.**
- `--font-serif: "Piazzolla", Georgia, serif` (основной)
- `--font-sans: "Alegreya Sans SC"` (метки, CTA, caps)
- `--font-mono: "JetBrains Mono"` (данные)
- Типошкала — 9 ролей, из design-system.html § 01

**Подход к CSS:**
- `resources/css/app.css` — единая точка входа, импортирует tokens.css, reset.css, global.css, components.css
- Компонентные стили — в отдельных `resources/css/components/XXX.css` и импорт в app.css
- **Никаких CSS-in-JS решений** (styled-components, emotion) — только vanilla CSS + CSS vars
- **Никакого Tailwind**

**Правила, от которых нельзя отступать:**
- `#FFFFFF` и `#000000` запрещены — только paper и handwriting
- `border-radius: 0` везде (editorial строгость)
- Drop-shadow только на карточках (очень мягкий)
- Один градиент на весь сайт — fade на ink-блоках
- Линии всегда 1px handwriting, никогда толще

---

### ⚛️ FRONTEND
**Роль.** React-разработчик (Inertia.js SSR).

**Структура `resources/js/`:**
```
resources/js/
├── app.jsx                  ← client entry
├── ssr.jsx                  ← server entry
├── Pages/
│   └── Home.jsx             ← главный one-page (12 блоков)
├── Components/
│   ├── Blocks/              ← 13 React-компонентов блоков
│   │   ├── 01-Hero.jsx          ink bg, full-bleed, 2 CTA
│   │   ├── 02-Category.jsx      paper, 2/10 split
│   │   ├── 03-Shore.jsx         paper, 7/5 split + карта
│   │   ├── 04-Neighbors.jsx     paper, grid 3×3 / h-swipe mobile
│   │   ├── 05-Dacha.jsx         ink, 5/7 split, pull-quote
│   │   ├── 06-Architecture.jsx  paper, 5/7 split + мозаика 2×2
│   │   ├── 07-Lot.jsx           paper, massive "9" + таблица
│   │   ├── 08-Plans.jsx         paper, интерактивный фасад + modal
│   │   ├── 09-Uklad.jsx         2×2 desktop / 4 swipe mobile
│   │   ├── 10-Infrastructure.jsx paper, горизонтальный реестр
│   │   ├── 11-Built.jsx         ink, full-bleed фото, CTA
│   │   ├── 12-Team.jsx          paper, grid 4×1 / h-swipe
│   │   └── 13-FinalCTA.jsx      stamp bg, форма
│   ├── UI/                  ← UI-kit
│   │   ├── Button.jsx
│   │   ├── Field.jsx
│   │   ├── Chip.jsx
│   │   ├── Modal.jsx
│   │   ├── Toast.jsx
│   │   ├── Container.jsx
│   │   └── Skeleton.jsx
│   └── Layout/
│       ├── Header.jsx       ← sticky, 64/52px
│       ├── Footer.jsx
│       ├── SwipeDeck.jsx    ← mobile wrapper
│       └── MobileMenu.jsx
└── hooks/
    ├── useIntersectionObserver.js
    ├── useSwipeDeck.js
    └── useAnalytics.js
```

**Правила:**
- **SSR-совместимость обязательна.** Никакого `window`, `document`, `localStorage` без проверки `typeof window !== 'undefined'` или без `useEffect`
- Все данные для Inertia передавать через **props** (не blade)
- Form state — через `Inertia.useForm`, submit через `form.post(route)` с Progress event
- Анимации появления — Intersection Observer + CSS transitions (не Framer Motion на первом этапе)
- Lazy loading изображений — через `loading="lazy"`, hero — `loading="eager"` + `fetchpriority="high"`
- Prop typing — через PropTypes

---

### 📱 MOBILE-SPECIALIST
**Роль.** Специалист по mobile swipe-deck.
**Думает как.** UX-инженер, для которого 80% трафика — mobile.

**Источник.** `/docs/dom-na-utese-design-system.html` § 04 — Mobile Swipe-архитектура.

**Главная концепция.** На ≤ 767 px сайт — **вертикальный carousel-deck из 18 экранов**:
```
01 HERO · 02 КАТЕГОРИЯ · 03a БЕРЕГ цифры · 03b БЕРЕГ карта
04 СОСЕДИ h-swipe · 05 ДАЧА СО СЛОНАМИ
06 АРХИТЕКТУРА · 07 ЛОТ · 08 ПЛАНИРОВКИ
09a УКЛАД утро · 09b УКЛАД день · 09c УКЛАД закат · 09d УКЛАД зима
10 ИНФРАСТРУКТУРА · 11 ДОМ ПОСТРОЕН
12 КОМАНДА h-swipe · 13 ФИНАЛ CTA
```

**CSS:**
```css
@media (max-width: 767px) {
  html, body {
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
    overscroll-behavior-y: contain;
  }
  .slide {
    scroll-snap-align: start;
    scroll-snap-stop: always;
    min-height: 100svh;
    min-height: 100dvh;
  }
}
@media (prefers-reduced-motion: reduce) {
  html, body { scroll-snap-type: none !important; }
}
```

**UI навигации (обязательно):**
- Progress dots справа (fixed), активный — stamp
- Counter «01 / 18» правый верхний
- Swipe hint «Листайте ↑» на первом экране, исчезает после первого свайпа (localStorage)

**Intersection Observer:** threshold 0.6, при появлении — `classList.add("is-active")`, обновить прогресс, отправить событие `swipe_slide` в Метрику.

**SSR-aspect:** IO работает только на клиенте — инициализируй через `useEffect` после mount.

---

### ✍️ COPY-EDITOR
**Роль.** Хранитель голоса и микрокопии.
**Думает как.** Редактор архитектурного журнала, знающий Самару.

**Источник.** `/docs/dom-na-utese-design-system.html` § 10 — универсальный словарь.

**Tone of voice:**
- Короткие утвердительные предложения. Конкретные числа, даты, имена.
- Italic — для смысла, не для украшения. Тире как ритмический знак, не запятая.
- **Запрещено:** «элитный», «премиум», «эксклюзивный», «Мы рады предложить», восклицательные знаки, «только 3 лота», эмодзи, смайлы.

**Регистр (важно, было противоречие в документе):**
- **Заголовки блоков, hero H1** — regular case («Дом на Утёсе», «Самарская Ривьера»)
- **CTA кнопки, рубрики, метки** — **CAPS LOCK через Alegreya Sans SC** («ПРИВАТНЫЙ ПОКАЗ», «АКТ II · МЕСТО», «4-Я ПРОСЕКА · 1908»)
- **Навигация** — CAPS LOCK («МЕСТО · АРХИТЕКТУРА · ЛОТ · КОМАНДА»)

**Правило фактчека:** если факта нет в concept.docx или brief.docx — ставь заглушку `[НУЖНЫ ДАННЫЕ]` в Orchid seed, не выдумывай.

**Форматирование:**
- Даты с тонким пробелом: `1 877`, `2 024` (U+2009)
- Em-dash `—` (U+2014), не дефис
- Кавычки ёлочки: «...» для речи, „...“ для вложенной
- Middle dot `·` (U+00B7) как разделитель

---

### 🎯 CONVERSION-ENGINEER
**Роль.** Инженер конверсии и аналитики.

**KPI (по убыванию):**
1. `lead_form_submit` — заявка на приватный показ (главный)
2. `phone_click` / `messenger_click` — прямой контакт
3. `scroll_depth` 90% — дочитал (высокая квалификация)
4. `lot_card_open` — интерес к конкретному лоту

**Цели Метрики** (из handoff § 11):
- `lead_form_open` (source: hero | built | final | lot-card)
- `lead_form_submit` (source, lotId?, contactMethod)
- `lot_card_open` (lotId, lotStatus)
- `neighbor_open` (neighborId)
- `phone_click` (location)
- `messenger_click` (channel)
- `scroll_depth` (25/50/75/100)
- `swipe_slide` (slideIndex, totalSlides)

**3 точки primary CTA** (распределение):
- Hero — fast path
- Блок 11 «Дом построен» — engaged path
- Блок 13 Финал — deep reader

**Правила:**
- Никаких поп-апов, чат-виджетов, таймеров «осталось N лотов»
- Форма модалки открывается из любой точки `[Приватный показ]`
- Sub-flow по лоту (блок 08): клик по карточке → modal с планировкой → CTA «Запросить условия» → форма с предзаполненным `lotId`

**Laravel-слой:**
- `LeadController@store` → FormRequest валидация → создать `Lead` → dispatch `NewLeadNotification` в очередь Horizon → возврат Inertia.back() с `flash('success')`
- `NewLeadNotification` — в очереди отправляет webhook в amoCRM/Bitrix24 + сообщение в Telegram менеджеру через `Http::post` Bot API

---

### 🔍 PERF-&-A11Y
**Роль.** Performance + доступность (сквозная проверка на каждом PR).

**Performance budget** (из § 08):
- Lighthouse Performance ≥ 90
- LCP < 2.0s (target) / 2.5s (max)
- FID < 50ms / 100ms
- CLS < 0.05 / 0.1
- TTI < 3.0s / 4.0s
- Total page weight < 1.5 MB / 2.5 MB
- Total JS < 150 KB / 250 KB
- Total CSS < 60 KB / 100 KB

**Изображения:** AVIF + WebP + JPG fallback, srcset для всех, lazy loading ниже fold, hero preloaded с priority high. В Laravel можно использовать `Intervention/Image` для генерации responsive-версий на этапе загрузки в Orchid (хук `saving`).

**Шрифты:** WOFF2 self-hosted в `public/fonts/`, preload Piazzolla-500 и Alegreya-500, `font-display: swap`, unicode-range латиница+кириллица.

**A11y чеклист** (из § 07) — обязательно к релизу:
- Контраст: handwriting × paper = 12.4:1 (AAA) ✓
- Focus-visible: 2px tea outline + offset 3px, никогда `outline: none`
- Skip-link «К содержанию» (скрыт до фокуса)
- Все изображения с alt (исторические — с датой и авторством)
- Semantic HTML: header, main, section, article, nav, footer
- Heading order: один H1, без пропусков
- Формы с `<label>` + `aria-describedby` для ошибок
- Modal — `role="dialog"`, `aria-modal`, focus trap, возврат фокуса
- Swipe-deck — альтернатива: Space/Arrow, обычный scroll при `prefers-reduced-motion`
- Touch targets ≥ 44×44 px
- `lang="ru"` на html
- axe-core в CI, Lighthouse a11y ≥ 95

---

### 🚀 DEVOPS
**Роль.** Инженер деплоя и инфраструктуры.
**Думает как.** Надёжность и простота обслуживания.

**Стек сервера:**
```
OS:       Ubuntu 22.04 LTS
Web:      Nginx
PHP:      8.2+ (php-fpm)
Node:     20+ (для SSR Inertia)
DB:       MySQL 8.0
Queue:    Redis + Laravel Horizon
SSL:      Certbot / Let's Encrypt
Process:  Supervisor (horizon worker + inertia SSR daemon)
```

**Команды деплоя:**
```bash
composer install --no-dev --optimize-autoloader
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force
php artisan storage:link
npm ci && npm run build
sudo supervisorctl restart all
```

**Supervisor**: два процесса — `horizon` (очереди) и `inertia-ssr` (SSR worker на Node, порт 13714).

**Правила:**
- Никаких секретов в репозитории
- `.env.example` всегда актуален
- Логи ошибок — в `storage/logs`, ротация через logrotate
- MySQL backup ежедневный (mysqldump в `~/backups/`)
- Инструкция по деплою в `README.md`

---

## 📐 ИСТОЧНИКИ ИСТИНЫ (`/docs/`)

1. **brief.docx** — бриф на one-page, 12 блоков, 4 акта, 5 принципов, что публикуем/не публикуем
2. **concept.docx** — манифест + справочник 14 исторических объектов с фактами
3. **design-system.html** — handoff-пакет v1.0 (12 разделов, production-ready)
4. **grids.html** — art-direction, макеты всех 12 блоков с wireframes

Если в документах противоречие — спроси у пользователя, не решай сам.

---

## ⚡ БЫСТРЫЕ КОМАНДЫ

```
"собери hero"          → DESIGN-KEEPER + FRONTEND + COPY-EDITOR
"сделай swipe mobile"  → MOBILE-SPECIALIST + FRONTEND
"форма заявки"         → FRONTEND + ARCHITECT + CONVERSION-ENGINEER + COPY-EDITOR
"добавь лот"           → ARCHITECT (миграция если нужно) + Orchid-экран
"проверь a11y"         → PERF-&-A11Y (axe-core + ручной keyboard test)
"оптимизируй картинки" → PERF-&-A11Y + ARCHITECT
"задеплой"             → DEVOPS
"ревью перед merge"    → EDITOR-IN-CHIEF (финал)
```

## 🚫 СТОП-ПРАВИЛА

1. Не додумывать факты — ставить `[НУЖНЫ ДАННЫЕ]`, данные через Orchid
2. Не добавлять компоненты вне design-system.html § 05 — если нужен новый, сначала согласовать
3. Не менять палитру и шрифты — они зафиксированы
4. Не скругления, не drop-shadow на UI (drop-shadow только на карточках, очень мягкий)
5. Mobile всегда через swipe-deck, не обычный скролл
6. Цены на сайте не публикуются
7. Никаких FAQ, блога, отзывов, конфигуратора, чат-бота
8. **Никакого Tailwind** — только vanilla CSS + CSS vars
9. **Никаких текстов в коде** — всё через Orchid (SiteSetting + контент-таблицы)
10. SSR обязателен — ни одного `window`/`document` без проверки mount
11. Для CTA — CAPS LOCK + Alegreya Sans SC weight 700, не lowercase

## 🧠 CONTEXT PROTOCOL

| Заполнение | Действие |
|---|---|
| 0–50% | Штатно |
| 50–70% | Читать только нужные фрагменты, не файлы целиком |
| 70–85% | `/compact` после атомарного шага |
| 85%+ | СТОП. Commit + `/clear` + записать в SESSION_HANDOFF.md что сделано/что дальше |

В начале ответа указывать: `[Role: X] [Sprint: N] [Context: ~Y%]`.

## 📚 ИЗВЛЕЧЁННЫЕ УРОКИ

*(пополняется по ходу — каждая ошибка → правило)*
- пусто

## 🎯 ОДНА ФРАЗА

Если агенты не согласны — побеждает решение, **ближе к записи на приватный показ**.
```

### 1.4 Создай базовую структуру проекта

```
dom-na-utese/
├── docs/                                   ← источники истины
│   ├── brief.docx
│   ├── concept.docx
│   ├── design-system.html
│   └── grids.html
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── HomeController.php          ← рендер one-page через Inertia
│   │   │   └── LeadController.php          ← приём заявок
│   │   ├── Requests/
│   │   │   └── StoreLeadRequest.php        ← валидация
│   │   └── Resources/
│   │       ├── LotResource.php
│   │       ├── NeighborResource.php
│   │       └── TeamMemberResource.php
│   ├── Models/
│   │   ├── Lot.php
│   │   ├── Neighbor.php
│   │   ├── TeamMember.php
│   │   ├── Lead.php
│   │   └── SiteSetting.php
│   ├── Notifications/
│   │   └── NewLeadNotification.php         ← webhook + TG в очереди
│   ├── Orchid/
│   │   ├── Screens/
│   │   │   ├── LotListScreen.php
│   │   │   ├── LotEditScreen.php
│   │   │   ├── NeighborListScreen.php
│   │   │   ├── TeamScreen.php
│   │   │   ├── LeadScreen.php
│   │   │   └── SiteSettingsScreen.php
│   │   └── Layouts/
│   │       └── ...
│   └── Providers/
│       └── AppServiceProvider.php
├── bootstrap/
├── config/
│   └── inertia.php
├── database/
│   ├── migrations/
│   │   ├── 2026_04_18_create_lots_table.php
│   │   ├── 2026_04_18_create_neighbors_table.php
│   │   ├── 2026_04_18_create_team_members_table.php
│   │   ├── 2026_04_18_create_leads_table.php
│   │   └── 2026_04_18_create_site_settings_table.php
│   └── seeders/
│       ├── NeighborSeeder.php              ← 9 дач из concept.docx
│       ├── LotSeeder.php                   ← заглушки 9 лотов [НУЖНЫ ДАННЫЕ]
│       └── SiteSettingsSeeder.php
├── public/
│   ├── fonts/                              ← Piazzolla, Alegreya Sans SC (WOFF2)
│   ├── images/
│   │   ├── hero/                           ← ← ← СЮДА ПОЛЬЗОВАТЕЛЬ ЗАЛЬЁТ ВИЗУАЛИЗАЦИИ
│   │   ├── blocks/
│   │   ├── neighbors/                      ← исторические дачи
│   │   └── team/                           ← портреты
│   └── og-image.jpg
├── resources/
│   ├── css/
│   │   ├── app.css                         ← единая точка входа, импорт tokens/reset/global/components
│   │   ├── tokens.css                      ← все CSS vars из § 01
│   │   ├── reset.css
│   │   ├── global.css
│   │   └── components/                     ← стили компонентов по файлам
│   ├── js/
│   │   ├── app.jsx                         ← client entry
│   │   ├── ssr.jsx                         ← server entry
│   │   ├── Pages/
│   │   │   └── Home.jsx
│   │   ├── Components/
│   │   │   ├── Blocks/                     ← 13 блоков
│   │   │   ├── UI/                         ← UI-kit
│   │   │   └── Layout/
│   │   └── hooks/
│   └── views/
│       └── app.blade.php                   ← Inertia root blade
├── routes/
│   ├── web.php
│   └── api.php
├── storage/
├── CLAUDE.md
├── SESSION_HANDOFF.md                      ← пустой, заполняется перед /clear
├── .env.example                            ← CRM webhook, YM counter id, TG bot
├── .env
├── vite.config.js
├── composer.json
└── package.json
```

### 1.5 Перенеси источники истины в /docs/

Файлы `dom-na-utese-brief.docx`, `dom-na-utese-concept.docx`, `dom-na-utese-design-system.html`, `dom-na-utese-grids.html` уже лежат в корне — перенеси их в `/docs/`.

### 1.6 Создай tokens.css

Скопируй блок `:root { ... }` из § 01 design-system.html **целиком, без изменений** в `resources/css/tokens.css`. Добавь media queries для breakpoints, `prefers-reduced-motion` правило.

### 1.7 Скачай шрифты

Piazzolla и Alegreya Sans SC — с Google Fonts API (cyrillic subset, weights 400/500/700 для serif + 500/700 для sans SC). Сохрани как WOFF2 в `public/fonts/`. В `tokens.css` — `@font-face` с `font-display: swap`, unicode-range `U+0000-024F, U+0400-04FF`.

### 1.8 Миграции и сидеры

Создай миграции для 5 моделей (Lot, Neighbor, TeamMember, Lead, SiteSetting). В сидерах:
- `NeighborSeeder` — заполни **9 исторических дач из concept.docx** реальными данными (Дача со Слонами, Дача Сурошникова, Дача Курлиной, Дача Ивана Соколова, Дача Александра Соколова, Дача Сипиной, Кумысолечебница Постникова, Обкомовская дача, Бункер Жукова)
- `LotSeeder` — 9 лотов с заглушками `[НУЖНЫ ДАННЫЕ]` для всех полей
- `SiteSettingsSeeder` — заглушки `[НУЖНЫ ДАННЫЕ]` для телефона, TG, WA, адреса

Запустить: `php artisan migrate:fresh --seed`

### 1.9 Orchid-экраны (минимально)

Создай 6 экранов:
- `LotListScreen` + `LotEditScreen` — CRUD 9 лотов
- `NeighborListScreen` — CRUD исторических дач
- `TeamScreen` — команда проекта
- `LeadScreen` — просмотр заявок (read-only + смена статуса)
- `SiteSettingsScreen` — телефон, tg, wa, адрес, ссылка на проектную декларацию

Дашборд Orchid: количество новых лидов + количество доступных лотов.

### 1.10 Layout и базовые компоненты

- `resources/views/app.blade.php` — Inertia root с `@inertia`, preload шрифтов, meta из § 09
- `resources/js/Components/Layout/Header.jsx` — sticky, 64px desktop / 52px mobile, с мини-CTA
- `resources/js/Components/Layout/Footer.jsx` — минимальный, контакты + юр. инфо
- `resources/js/Components/UI/Button.jsx` — 5 вариантов (primary, secondary, on-ink, ghost-on-ink, disabled), 4 состояния (default, hover, active, focus-visible)

### 1.11 Отчёт по Спринту 1

Пришли мне в чат:
- Список созданных файлов
- Скриншот структуры `tree -L 3 -I 'node_modules|vendor|storage'`
- Вывод `php artisan migrate:status` и `php artisan route:list`
- Скриншот `/admin` (login + дашборд Orchid работает)
- Что работает / что требует уточнения
- Список `[НУЖНЫ ДАННЫЕ]` — чётко перечисли, что нужно от меня перед Спринтом 2

---

## 🛑 STOP · ЧТО ПРОИСХОДИТ МЕЖДУ СПРИНТАМИ

После того как ты закончишь Спринт 1 и пришлёшь отчёт — **остановись и жди меня**. Я в этот момент:

1. Залью в `/public/images/hero/` визуализации дома
2. Залью в `/public/images/neighbors/` фото исторических дач (или скажу, что фото нет и покажем плейсхолдеры)
3. Через Orchid-админку заполню реальные данные: 9 лотов (площади, виды, статусы), имена команды, контакты, SiteSettings
4. Подтвержу или поправлю твой отчёт

Только после моего «ок, продолжай» переходи к Спринту 2.

---

## СПРИНТ 2 · UI-KIT (после моего ок)

Роль: DESIGN-KEEPER + FRONTEND.
Источник: design-system.html § 05.

Собрать production-ready:
- `Button.jsx` — все варианты (см. § 05 таблица состояний)
- `Field.jsx` — editorial input без рамок (bottom border only), 4 состояния, на paper и на dark
- `Chip.jsx` — 3 статуса лота (available/reserved/sold)
- `Modal.jsx` — focus trap, ESC, backdrop click, animation open 420ms / close 240ms
- `Toast.jsx` — 3 состояния (success/error/loading), auto-dismiss
- `Container.jsx` — grid wrapper
- `MobileMenu.jsx` — fullscreen overlay, slide-down 720ms editorial, typo stagger пунктов
- `Skeleton.jsx` — shimmer на paper

**Каждый компонент — с JSDoc + пример в комментарии. SSR-совместимый (никаких window/document без useEffect).**

Отчёт по Спринту 2 → мой ок → Спринт 3.

---

## СПРИНТ 3 · БЛОКИ 01–06 (hero & место)

Роли: DESIGN-KEEPER + FRONTEND + COPY-EDITOR, ревью EDITOR-IN-CHIEF.
Источник макетов: grids.html (wireframes для каждого блока).

- `01-Hero.jsx` — full-bleed image (использовать залитые визуализации!), typography stagger 120ms/слово, 2 CTA (приватный показ + о доме ↓)
- `02-Category.jsx` — 2/10 split desktop, stack mobile. Lead-абзац 22pt (desktop) / 17pt (mobile). Facts внизу.
- `03-Shore.jsx` — 7/5 split, текст + SVG карта берега, 3 числа-якоря. На mobile — 2 экрана (03a цифры, 03b карта).
- `04-Neighbors.jsx` — grid 3×3 desktop / 2×5 tablet / **horizontal swipe** mobile. 9 карточек исторических дач (данные из Neighbor модели, переданы через HomeController props).
- `05-Dacha.jsx` — **ink bg**, 5/7 split, pull-quote. На mobile — full-screen slide на ink.
- `06-Architecture.jsx` — 5/7 split, spec-таблица + мозаика 2×2. На mobile — экран-заголовок + внутренний scroll по мозаике.

Отчёт → ок → Спринт 4.

---

## СПРИНТ 4 · БЛОКИ 07–13 (продукт & CTA)

- `07-Lot.jsx` — massive "9" + таблица (см. block 07 в grids.html)
- `08-Plans.jsx` — интерактивный фасад + карточки лотов. Клик по фасаду/карточке → Modal с планировкой. CTA внутри модалки: «Запросить условия» → Modal-форма с предзаполненным `lotId`. Source: `lot-card`.
- `09-Uklad.jsx` — 2×2 шахматка paper/ink с фото. На mobile — **4 swipe-экрана подряд** (утро → день → закат → зима).
- `10-Infrastructure.jsx` — горизонтальный реестр в 3 колонки (label · выгода · meta). Нет иконок.
- `11-Built.jsx` — **ink bg**, full-bleed фото построенного дома, крупная типо «Дом построен.», CTA «Записаться на показ». Source: `built`.
- `12-Team.jsx` — grid 4×1 desktop / 2×2 tablet / horizontal swipe mobile. Портреты + имя + роль.
- `13-FinalCTA.jsx` — **stamp bg**, 7/5 split desktop (текст/форма), stack mobile. Форма с полями: имя, телефон, предпочтительный контакт, согласие. Submit → `Inertia.useForm.post('/api/lead')`. Source: `final`.

Отчёт → ок → Спринт 5.

---

## СПРИНТ 5 · MOBILE SWIPE-DECK (≤ 767 px)

Роль: MOBILE-SPECIALIST + FRONTEND.
Источник: design-system.html § 04.

- `SwipeDeck.jsx` wrapper, активируется `@media (max-width: 767px)`
- CSS scroll-snap mandatory по всем `.slide` элементам
- Разбить блок 09 Уклад на **4 отдельных slide** (утро / день / закат / зима)
- Progress dots fixed right, активный — stamp, переходят по mini-scroll
- Counter `01 / 18` правый верхний каждого slide (через IO)
- Swipe hint на первом экране («Листайте ↑»), исчезает после первого свайпа + localStorage flag
- Клавиатурная навигация: Space / ArrowDown / ArrowUp
- IO threshold 0.6 → `is-active` class + event `swipe_slide` в Метрику
- `@media (prefers-reduced-motion: reduce)` — scroll-snap: none, анимации 0.01ms

Тест на реальном iPhone перед отчётом.

---

## СПРИНТ 6 · INTEGRATION

- `LeadController@store` — `StoreLeadRequest` валидация, создание `Lead`, dispatch `NewLeadNotification` в Horizon
- `NewLeadNotification` — webhook в CRM (amoCRM/Bitrix24) + Telegram Bot API для менеджера (ENV: `CRM_WEBHOOK_URL`, `CRM_WEBHOOK_SECRET`, `TG_BOT_TOKEN`, `TG_CHAT_ID`)
- Яндекс.Метрика + все цели из § 11 design-system.html. Счётчик как env var `YM_COUNTER_ID`, рендерится в `app.blade.php`
- `robots.txt`, `sitemap.xml`, favicons, Apple touch icons (генерация через роут или `public/`)
- OG-image 1200×630 (можно сгенерировать на этапе разработки, хранить в `public/og-image.jpg`)
- JSON-LD `ApartmentComplex` в `app.blade.php`
- Все meta из § 09 design-system.html через Inertia `<Head>`

---

## СПРИНТ 7 · QA & LAUNCH

- Lighthouse: Performance ≥ 90, A11y ≥ 95, SEO ≥ 95, Best Practices ≥ 95
- Реальные устройства: iPhone 12/14, iPad, Android mid-tier
- Chrome, Safari, Firefox, Edge
- Проверить hover на touch (не должны триггериться)
- `prefers-reduced-motion` работает
- Клавиатура проходит всю страницу без мыши
- Screen reader (VoiceOver) хотя бы по hero
- Формы: валидация, отправка, ошибки, success-toast
- CRM: тестовая заявка действительно приходит в amoCRM/Bitrix + TG
- Метрика: все цели отстреливаются (проверить в «Вебвизор»)
- VDS deploy: Ubuntu + Nginx + PHP-FPM + Node 20 + Supervisor (Horizon + Inertia SSR) + Certbot SSL
- Ежедневный MySQL backup настроен

---

## НАЧНЁМ

Прочитай 4 документа из `/docs/` (или из корня, если ещё не перенёс — перенеси) и пришли мне в чат отчёт из пункта 1.1.

**Не начинай код, пока я не скажу «ок».**
