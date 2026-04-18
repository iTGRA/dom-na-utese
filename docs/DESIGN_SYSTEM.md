# Дом на Утёсе · Дизайн-система

> Живой референс для frontend / content / admin агентов.
> Источники правды: `docs/design-system/dom-na-utese-design-system.html` и `docs/design-system/dom-na-utese-grids.html`. Все токены, пропорции и имена CSS-переменных вытащены оттуда дословно.

**Версия:** 1.0 (handoff, апрель 2026)
**Категория проекта:** клубный дом, 9 лотов, первая линия Волги (просеки, Самара)
**Визуальный референс:** editorial / архив / монография о доме — не девелоперский лендинг.

---

## 1. Философия и тон

Сайт — **книга о доме**, а не продуктовый каталог. Один скролл — одна история. Страница должна читаться как разворот редакционного журнала.

**Пять принципов вёрстки (из `grids.html`, §02):**
1. Асимметрия сильнее симметрии.
2. Один цвет-акцент на блок.
3. Число в углу сильнее иконки в центре.
4. Линия сильнее рамки.
5. Italic — для смысла, не для украшения.

**Что отличает визуал от типового ЖК-лендинга:**
- Нет градиентов, глянца, «золотых» акцентов. Палитра бумажная — `paper` (#EEE4D3) вместо белого, `ink` (#2C3E50) вместо чёрного.
- Нет карточек с иконками в инфраструктуре (блок 10). Только горизонтальные строки-реестры.
- Нет рендеров — только реальные фото сданного дома.
- Нет цен, таймеров, «осталось N лотов», FAQ, отзывов.
- Нет скруглений больше `--radius-sm: 2px`. Углы прямые.
- Формы — без рамок у input-ов. Только 1px линия снизу (editorial input).

**Центральная метафора (из `concept.txt`):** берег как непрерывная линия. Не «дом рядом с памятниками», а продолжение купеческой застройки, начатой в 1877 году. Утёс — и физика (высота), и позиция (уже достигнутая, не надо восходить).

---

## 2. Палитра

12 цветовых токенов. Названия CSS-переменных — **дословные из source**, никаких переименований.

| Token | HEX | Роль |
|---|---|---|
| `--color-paper` | `#EEE4D3` | Основной фон сайта. ≈70% площади. **Никогда не заменяется на `#FFF`.** |
| `--color-paper-light` | `#F5EEDF` | Карточки, модалки, плашки, skeleton-состояния на paper-фоне. |
| `--color-paper-deep` | `#E5D9C3` | Highlight-боксы, выделенные участки, таблицы-спеки. |
| `--color-dust` | `#C4BFAF` | Служебные линии, неактивные состояния, disabled. |
| `--color-dust-light` | `#D9D4C5` | Skeleton-shimmer. |
| `--color-ink` | `#2C3E50` | Ночные блоки (05 Дача со Слонами, 11 Дом построен), контрастные секции. **Не чёрный** — сдвиг в синий. |
| `--color-ink-deep` | `#22303F` | Глубина для градиентов на ink, нижний слой overlay на фото. |
| `--color-handwriting` | `#1E1E1E` | Основной текст и заголовки. **Теплее чистого чёрного.** |
| `--color-handwriting-soft` | `#3A3A3A` | (объявлен, не используется массово — вторичный текст на paper). |
| `--color-stamp` | `#802F1D` | **Главный акцент.** CTA, активные пункты меню, ключевые цифры. Используется скупо. |
| `--color-stamp-hover` | `#9A3822` | Hover для всех stamp-элементов. |
| `--color-tea` | `#C98540` | **Второй акцент.** На ночных блоках (ink) — вместо stamp, т.к. stamp на ink «мутнеет». Точки после заголовков на ink, pull-quote. |
| `--color-tea-hover` | `#D99550` | Hover для tea. |
| `--color-success` | `#25664A` | Статус «доступен», успех формы. Приглушённый зелёный. |
| `--color-error` | `#B23A2B` | Ошибка формы. Чуть светлее stamp — чтобы не путать с акцентом. |

**Контраст (WCAG, из §07):**
- `handwriting` на `paper`: 12.4:1 — AAA ✓
- `paper` на `ink`: 10.8:1 — AAA ✓
- `paper` на `stamp`: 7.2:1 — AAA ✓
- `tea` на `ink`: 4.8:1 — AA **только для крупного текста**
- `dust` на `paper`: 1.6:1 — **только декоративные линии, не текст**

**Правила использования:**
- На `paper` (день): заголовки/текст `handwriting`, акцент `stamp`, курсивный подзаголовок `ink`.
- На `ink` (ночь): текст `paper`, акцент `tea` (не stamp!), subdued элементы `paper` с `opacity: 0.7–0.85`.
- На `stamp` (финальный блок 13): текст `paper`, поля формы — `paper` линии снизу.

---

## 3. Типографика

**Три гарнитуры, девять ролей.** Все веса и трекинг жёстко заданы.

### Шрифты

| Токен | Семейство | Источник | Роль |
|---|---|---|---|
| `--font-serif` | **Piazzolla** (Juan Pablo del Peral, Huerta Tipográfica), 300–900 + italic | Google Fonts → **самохостинг WOFF2 в `/public/fonts/`** (performance budget) | Все заголовки, body, pull-quote. Поддерживает oldstyle figures + ligatures. |
| `--font-sans` | **Alegreya Sans SC** (Huerta Tipográfica), 400–900 + italic | Google Fonts → самохостинг | Navigation, метки, caps-lock-рубрики, CTA, цифры в таблицах. |
| `--font-mono` | **JetBrains Mono** 400–500 | Google Fonts | Техданные (метраж в спеках, номера лотов). Редко. |

**Fallback:** `"Piazzolla", Georgia, "Times New Roman", serif` / `"Alegreya Sans SC", "Arial Narrow", sans-serif`.

**Парный принцип:** Piazzolla (editorial serif с oldstyle figures) + Alegreya Sans SC (все caps, tracking +0.08–0.12em, «штампованный» вид). Это «страница книги» + «музейная подпись к экспонату».

### Type scale (Desktop / Tablet / Mobile)

| Роль | Токен | Px (D/T/M) | Вес · leading · tracking |
|---|---|---|---|
| Hero H1 | `--type-h1-hero` | 96–110 / 72 / 52 | Piazzolla 500 · 0.92 · −0.02em |
| Section H2 | `--type-h2` | 56–72 / 42 / 34 | Piazzolla 500 · 1.02 · −0.01em |
| Block H3 | `--type-h3` | 36–42 / 30 / 26 | Piazzolla 500 · 1.05 · −0.005em |
| Lead italic | `--type-lead` | 24 / 20 / 17 | Piazzolla Italic 400 · 1.3 |
| Body | `--type-body` | 17 / 16 / 15 | Piazzolla 400 · 1.65 |
| Pull-quote | `--type-pull` | 28 / 22 / 19 | Piazzolla Italic 400 · 1.4 |
| Caption / meta | `--type-meta` | 12 / 11 / 11 | Alegreya Sans SC 500 · 1.6 · +0.1em |
| CTA | `--type-cta` | 13 / 12 / 12 | Alegreya Sans SC 700 · 1 · +0.1em |
| Mono (data) | `--type-mono` | 12 / 12 / 11 | JetBrains Mono 400 · 1.5 |

**Обязательное правило (§01):** на мобильных body **не менее 15px**, caption **не менее 11px**. Аудитория 40–60 лет.

### Правила italic

Курсив — **не украшение, а смысловой маркер**:
- Собственное имя дома в тексте: `*Дом на Утёсе*` (блок 02).
- Ключевое слово в паре «факт + образ»: `Дом *построен*` (блок 11), `Зимой лес *замирает*` (блок 09d).
- Подзаголовок-lead под заголовком (Piazzolla Italic).
- В абзаце курсивом — **максимум одно словосочетание**.

### Oldstyle vs tabular figures

- В тексте/заголовках — oldstyle figures (Piazzolla по умолчанию).
- В таблицах лотов/метража: `font-feature-settings: "tnum"` для tabular figures → числа выравниваются по вертикали.
- В инфографике лота (блок 07) и карточках лота (блок 08) — разрешено использовать **Alegreya Sans SC** для цифр (читаемость > эстетика).

---

## 4. Сетка, отступы, breakpoints

### Контейнер и базовая сетка

```
--container: 1320px        /* max-width body content */
--container-text: 720px    /* max-width текстового блока */
--gutter-desktop: 24px
--gutter-tablet: 20px
--gutter-mobile: 16px
--margin-desktop: 40px     /* page gutter; 80px для XL */
--margin-tablet: 32px
--margin-mobile: 20px
```

**Desktop:** 12 колонок, container 1320, gutter 24. На ≥1440 — fluid margins до 80px.

### Breakpoints

| Device | Width | Columns | Gutter | Margin | Поведение |
|---|---|---|---|---|---|
| Desktop XL | 1440+ | 12 | 24 | 80 | Container 1320, fluid margins |
| Desktop | 1100–1439 | 12 | 24 | 40 | Базовый опыт |
| Tablet | 768–1099 | 8 | 20 | 32 | Split-layouts → stack, Hero остаётся |
| Mobile | 481–767 | 4 / swipe | 16 | 20 | **Vertical swipe-deck** (см. §6) |
| Mobile S | ≤480 | swipe | 16 | 16 | Уменьшенная типо |

### Рабочие пропорции колонок

| Доля | Применение |
|---|---|
| 12 / full | Full-bleed фото, Hero |
| 7 / 5 | Editorial split, **главная пропорция** (блоки 03, 05 инверсия) |
| 5 / 7 | Инверсия для ночных блоков (05, 11) |
| 4 / 8 | Текст + изображение-доминанта |
| 6 / 6 | Симметрия для «диалоговых» блоков |
| 2 / 10 | Узкая метка-рубрика слева + широкий лид справа (блок 02) |

### Воздух

- Вертикальный padding блока: **80–120 px** desktop.
- Заголовок → подзаголовок: 12–16 px.
- Подзаголовок → тело: 28–40 px.
- Разделитель блоков: **1px handwriting rule** (никогда толще).

### Scale (8-point)

```
--space-xxs: 4px    /* микроотступы */
--space-xs:  8px    /* label ↔ input, chip ↔ text */
--space-sm:  12px   /* заголовок ↔ подзаголовок */
--space-md:  16px   /* строчный ритм, абзацы */
--space-lg:  24px   /* внутри карточки, подзаг ↔ тело */
--space-xl:  40px   /* между H2 секции и контентом */
--space-2xl: 64px   /* между подразделами блока */
--space-3xl: 96px   /* между блоками desktop */
--space-4xl: 128px  /* крупные паузы — Hero, финальный CTA */
```

### Z-index

```
--z-base:    1
--z-sticky:  100
--z-overlay: 500
--z-modal:   1000
--z-toast:   1500
```

---

## 5. Компоненты

### 5.1 Кнопки (.btn)

Базовые правила: `padding: 14px 28px`, `font-family: --font-sans`, `font-size: 12px`, `font-weight: 700`, `letter-spacing: 0.1em`, `text-transform: uppercase`, `border: none`, `transition: all 240ms var(--ease-standard)`.

**Варианты:**
- `.btn--primary` — фон `stamp`, текст `paper`. Hover: → `stamp-hover` + `translateY(-1px)`.
- `.btn--secondary` — transparent, border 1px `handwriting`, текст `handwriting`. Hover: fill `handwriting`, текст `paper`.
- `.btn--on-ink` — фон `paper`, текст `stamp` (для ночных блоков). Hover: фон → `tea`, текст → `handwriting`.
- `.btn--ghost-on-ink` — transparent, border `paper`, текст `paper`. Hover: fill `paper`, текст `ink`.
- `.btn--disabled` — opacity 0.4, cursor not-allowed.

**Стрелка:** `.btn__arrow` внутри кнопки — на hover `translateX(4px)` 240ms ease-out. Это обязательная часть primary CTA.

**Состояния:**
- `:hover` — 240ms standard
- `:active` — translateY(0), brightness(0.95), 120ms
- `:focus-visible` — outline 2px dashed `paper`, offset 3px (**никогда не `outline: none`**)

### 5.2 Поля формы (.field) — editorial, без рамок

```
.field           { display: block; margin-bottom: 28px; }
.field__label    { font-sans, 10px, +0.12em, uppercase, opacity 0.7 }
.field__input    { background: transparent; border: none;
                   border-bottom: 1px solid --color-handwriting;
                   padding: 8px 0;
                   font-serif, 17px, --color-handwriting; }
.field__input:focus { border-bottom: 2px solid --color-stamp; padding-bottom: 7px }
.field__input::placeholder { opacity 0.3; font-style: italic }
.field--on-dark  { линии → rgba(paper, 0.4), focus → paper }
.field--error    { линия → --color-error, .field__error { sans 10px error } }
```

**Запрещено:** прямоугольные input, скругления, box-shadow. Это визуально «бланк анкеты», а не «форма из конструктора».

### 5.3 Чипы (.chip) — статусы лота

```
.chip            { font-sans 10px 700 +0.12em uppercase;
                   padding: 5px 10px; border: 1px solid; }
.chip--available { --color-success (зелёный) }
.chip--reserved  { --color-tea + bg rgba(tea, 0.08) }
.chip--sold      { --color-stamp, opacity 0.6 }
```

Тексты (микрокопия): `ДОСТУПЕН`, `В РЕЗЕРВЕ`, `ПРОДАН`.

### 5.4 Карточка лота (блок 08)

Строгий табличный формат:
- Header: `ЛОТ 09` / `ЭТАЖ 3` — Alegreya SC 700 +0.1em, разделены 1px handwriting линией.
- Rows: label (opacity 0.6) слева / value справа — Piazzolla 13px, line-height 2.
- Footer: chip статуса + `УСЛОВИЯ →` (stamp-акцент) — разделён 1px линией.
- Padding: 24px. Background: `paper` (для available/reserved) или `paper-light` + opacity 0.7 (для sold).
- Без скруглений. Border: 1px rgba(handwriting, 0.15).
- CTA на карточке — **не «Купить»**, а **«Запросить условия»**.

### 5.5 Sticky header

**Desktop (64px):** `paper` фон, 1px handwriting снизу. Слева — логотип текстом (Alegreya SC 12px 700 +0.12em), справа — 4 пункта меню (11px) + CTA `.btn--primary` компактно (padding 10px 20px, 11px).

**Пункты меню:** `МЕСТО · АРХИТЕКТУРА · ЛОТ · КОМАНДА` (5-й — сам CTA «ПРИВАТНЫЙ ПОКАЗ»). Якорные ссылки к смысловым **актам**, не к отдельным блокам.

**Mobile (52px):** логотип + CTA «ПОКАЗ» (padding 8px 14px, 10px) + бургер `≡` (18px).

### 5.6 Mobile menu — fullscreen overlay

Фон `ink`, текст `paper`. Открытие: slide-down 720ms ease-editorial. Список пунктов — Piazzolla 36px 500 line-height 1.3. Активный / CTA — italic + цвет `tea`. Снизу — контакты (телефон, TG/WA) opacity 0.7.
**A11y:** trap focus, Esc закрывает, aria-expanded на бургере.

### 5.7 Modal · заявка

- Backdrop: rgba(handwriting, 0.4).
- Тело: `paper` фон, padding 48px, max-width 520px, position relative.
- Close `×`: top 20px right 24px, 22px, opacity 0.6, cursor pointer.
- Header: `ms-meta` stamp «ПРИВАТНЫЙ ПОКАЗ» → Piazzolla 34px 500 «Оставьте заявку.» → italic lead 16px.
- Поля — `.field` (editorial lines).
- Submit — `.btn--primary` width: 100%, внизу.
- **A11y:** role="dialog", aria-modal, focus trap, возврат фокуса при закрытии.

### 5.8 Toast уведомления

Три состояния, без скруглений:
- **Success:** background `handwriting`, текст `paper`, ✓ `tea`.
- **Error:** background `paper-deep`, border-left 3px `error`, ! `error`.
- **Loading:** background `paper-deep`, текст italic, `…` opacity 0.4.

### 5.9 Skeleton (loading)

Прямоугольные блоки `--color-dust-light`, без shimmer-анимации по умолчанию. Пропорции копируют реальный контент (12px полоски — строки текста, 180px — фото).

### 5.10 Подсказка «swipe hint»

Внизу первого экрана mobile. «SWIPE UP ↑» — Alegreya SC 8px +0.15em opacity 0.35. Анимация: каждые 1.8s стрелка поднимается на 6px + opacity 0.8 → 0.35. Исчезает после первого свайпа (localStorage flag).

### 5.11 Progress dots (mobile swipe)

Вертикальная полоска точек: position fixed, right 8px, top 50%. Активная — `stamp`, остальные — `dust`. Показывает, на каком из **18 экранов** пользователь.

### 5.12 Counter

В правом верхнем углу каждого swipe-экрана: `«01 / 18»` — Alegreya SC 10px +0.12em opacity 0.7.

---

## 6. Mobile swipe-архитектура (ключевая особенность)

**На ≤767px сайт — не бесконечный scroll, а вертикальный swipe-deck.** Пользователь свайпает вверх — следующий экран защёлкивается в viewport (scroll-snap mandatory). 12 блоков → **18 экранов** (блок 09 Уклад разбит на 4 подэкрана).

### Карта 18 swipe-экранов

```
01    HERO                  ink
02    КАТЕГОРИЯ             paper
03a   БЕРЕГ · 3 цифры       paper
03b   БЕРЕГ · карта         paper
04    СОСЕДИ · h-swipe      paper (carousel 9 карточек)
05    ДАЧА СО СЛОНАМИ       ink
06    АРХИТЕКТУРА           paper
07    ЛОТ · «9»             paper
08    ПЛАНИРОВКИ            paper
09a   УКЛАД · утро          paper
09b   УКЛАД · день          фото-overlay
09c   УКЛАД · закат         tea
09d   УКЛАД · зима          ink
10    ИНФРАСТРУКТУРА        paper (внутренний scroll)
11    ДОМ ПОСТРОЕН          ink (full-bleed фото)
12    КОМАНДА · h-swipe     paper (carousel портретов)
13    ФИНАЛ CTA             stamp
```

### CSS snapshot

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
    min-height: 100svh;  /* Safari bar */
    min-height: 100dvh;
    display: flex; flex-direction: column;
    justify-content: space-between;
    padding: 24px 20px;
  }
}
```

### Правила swipe-deck

✅ **Делать:**
- `scroll-snap-align: start` (всегда в начале).
- `100svh / 100dvh`, **не `100vh`** (Safari address bar).
- Отключать swipe на tablet ≥768.
- `history.replaceState(..., '#slide-N')` для deep-linking.
- Клавиатурная навигация (Space / Arrow Down).
- Intersection Observer с `threshold: 0.6` — reveal типографики при входе слайда + аналитика `swipe_slide`.

❌ **Не делать:**
- Scroll-jack (блокировать нативный скролл полностью).
- Horizontal swipe на уровне страницы — только вертикаль.
- Прятать индикаторы прогресса.
- Забывать про `prefers-reduced-motion` → `scroll-snap-type: none`.

---

## 7. Двенадцать блоков — режиссура

Из `grids.html` §02. Каждый блок — разворот редакционного издания с собственной сеткой, тоном и акцентом.

| # | Акт | Блок | Desktop grid | Фон | Акцент | Mobile |
|---|---|---|---|---|---|---|
| 01 | I · Категория | Hero | 12, якоря в 4 углах | ink / фото | paper | full-screen slide |
| 02 | I · Категория | Категория | 2 / 10 | paper | stamp (точка) | slide |
| 03 | II · Место | Самарская Ривьера | 7 / 5 + нижний стрип цифр | paper | stamp | 2 slides (3a: цифры; 3b: карта) |
| 04 | II · Место | Соседи | 3×3 сетка 9 карточек | paper | — | h-swipe карусель |
| 05 | II · Место | Дача со Слонами | 5 / 7 | **ink** | **tea** | full-screen slide ink |
| 06 | III · Продукт | Архитектура | 5 / 7 + мозаика 2×2 | paper | stamp | slide + внутренний scroll |
| 07 | III · Продукт | Лот | «9» 280pt + таблица 7/5 | paper | stamp | slide «9» 160pt + таблица |
| 08 | III · Продукт | Планировки | Фасад + grid карточек | paper | stamp / tea / faded | slide + modal планировки |
| 09 | III · Продукт | Уклад | 2×2 шахматка paper/ink | paper+ink | stamp / tea | **4 slides: утро/день/закат/зима** |
| 10 | IV · Доказательства | Инфраструктура | Горизонтальный реестр (3 колонки строки) | paper | stamp | slide (внутренний scroll) |
| 11 | IV · Доказательства | Дом построен | Full-bleed фото | **ink** | tea → paper-CTA | full-bleed slide |
| 12 | IV · Доказательства | Команда | 4×1 портреты 3:4 | paper | stamp | h-swipe портретов |
| 13 | ФИНАЛ | CTA форма | 7 / 5 | **stamp** | paper-CTA | full-screen stamp |

**Правила режиссуры блока 09 Уклад:**
- Единственный блок сайта с «потоком» текста (проза, не буллеты).
- Диагональ paper ↔ ink: текст-paper / фото / фото / текст-ink.
- Факты выносятся в caps-строку Alegreya SC **под** текстом — не разрушая прозу.

**Правила «ночных» блоков (05, 11):**
- Акцент — `tea`, не `stamp` (stamp на ink мутнеет).
- Точки после заголовков — tea.
- Pull-quote — italic, tea opacity 0.9.

---

## 8. Иконки, иллюстрации, фото

### Иконки
**Не использовать.** В блоке 10 Инфраструктура явный запрет на иконки — заменены горизонтальным реестром строк. Вся визуальная работа достаётся типографике и 1px линиям.

Исключения:
- Стрелка `→` / `↓` в кнопках — это часть типографики, не иконка.
- SVG-карта берега в блоке 03 — inline, с подписями Alegreya SC.
- SVG-схема фасада в блоке 08 — inline, 9 прямоугольников-лотов.

### Иллюстрации
- Редакционные SVG: карта 10 км берега с 93 точками дач + «ЗДЕСЬ» (блок 03). Номера просек подписаны.
- Инфографика лота (блок 07): схема «квартира + 2 террасы + 2 паркоместа + кладовая» — линейная, без цветных плашек.

### Фото
**Обязательные правила (§01 брифа, §11 дизайн-системы):**
- **Только живые фото сданного дома.** Никаких рендеров, никаких стоков.
- Исторические фото (блок 04) — архивные ч/б, с музейной подписью-маркером в левом верхнем углу: `01 · 1908` (Alegreya SC).
- Портреты команды (блок 12) — 3:4, единое освещение, **без улыбок и корпоративной открытости** — спокойные фронтальные взгляды, как в архитектурных монографиях.
- Макро-мозаика в блоке 06 — 4 квадратных кадра (кладка/окно/свет/фактура) без gutter.
- Hero — Волга с утёса на закате, Жигулёвские ворота на горизонте. Full-bleed или короткий видео-луп **без звука**.

**Технически:**
- Формат: AVIF + WebP + JPG fallback.
- Размеры: Hero 1920/1280/640, карточки 800/400, уклад 1200×1800/600×900, full-bleed 2400/1200/800.
- Hero: `preload` + `fetchpriority=high`. Остальное — lazy + decoding=async.

---

## 9. Моушн и микровзаимодействия

### Философия
Сайт — книга. Движение — как бумага, как взгляд по странице: плавно, с паузами, без нервных колебаний. **Нет bounce. Нет spring. Нет overshoot.**

### Easing и длительности

```
--ease-editorial: cubic-bezier(0.22, 1, 0.36, 1)   /* фирменный */
--ease-standard:  cubic-bezier(0.4, 0, 0.2, 1)
--ease-in:        cubic-bezier(0.4, 0, 1, 1)
--ease-out:       cubic-bezier(0, 0, 0.2, 1)

--dur-instant:    120ms
--dur-quick:      240ms
--dur-standard:   420ms
--dur-slow:       720ms
--dur-cinematic:  1200ms
```

**Правило:** `ease-editorial` для крупного (блоки, модалки, меню, reveal). `ease-standard` для мелкого (hover, button, input focus).

### Каталог эффектов

| Событие | Что происходит | Длит | Easing |
|---|---|---|---|
| Page load | Hero typo stagger (120ms между словами), CTA fade-in последним | 1200 | editorial |
| Scroll reveal | translate 30px + opacity 0→1 при 20% блока в viewport | 720 | editorial |
| Button hover | bg → stamp-hover + translateY(-1px), arrow → translateX(4px) | 240 | standard |
| Link hover | Underline scale-x 0→1 from left | 420 | standard |
| Card hover | translateY(-4px), soft shadow | 420 | editorial |
| Modal open | Backdrop fade + modal slide-up 40px | 420 | editorial |
| Modal close | Обратное действие, без задержки | 240 | standard |
| Mobile menu | Slide-down fullscreen + stagger пунктов | 720 | editorial |
| Swipe change | Browser snap + reveal активного | 600 | native |
| Image parallax | translate3d(0, -20% × scroll-ratio, 0), **только desktop, только Hero и блок 11** | continuous | linear |

### Underline draw
Линия под ссылкой рисуется слева направо (`transform-origin: left`), на hover убирается справа налево (swap `transform-origin: right`). 420ms standard.

### prefers-reduced-motion
**Обязательно** отключать:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  html, body { scroll-snap-type: none !important; }
}
```

---

## 10. Stroke и radius

```
--stroke-hairline: 1px    /* divider'ы, редакционная полоса */
--stroke-thin:     1.5px  /* focus input */
--stroke-medium:   2px    /* focus input + outline */

--radius-none: 0          /* всё по умолчанию */
--radius-sm:   2px        /* максимум (chip, button — опционально) */
```

**Жёсткое правило:** редакционные разделители всегда 1px, **никогда толще**. «Линия сильнее рамки» (§02 grids).

---

## 11. Доступность (WCAG 2.1 AA минимум)

Аудитория — 40–60 лет, часть пользуется screen reader / увеличением шрифта.

**Чеклист к релизу:**
- Все интерактивные элементы с клавиатуры (Tab, Shift+Tab, Enter, Space).
- `:focus-visible` — 2px outline `tea` offset 3px, **никогда `outline: none`**.
- Skip-link «К содержанию» (visually hidden до фокуса).
- Все изображения с `alt` (исторические — дата + автор).
- Semantic HTML: header / main / section / article / nav / footer.
- Один `<h1>` на страницу, без пропусков иерархии.
- Формы: `<label>` или `aria-label`, errors через `aria-describedby`.
- Modals: `role="dialog"`, `aria-modal`, focus trap, возврат фокуса при закрытии.
- Swipe-deck: альтернатива клавиатурой (Space/Arrow), при `prefers-reduced-motion` — обычный scroll.
- Touch targets ≥ 44×44 px на mobile (Apple HIG).
- `<html lang="ru">`.
- CI: axe-core. Lighthouse a11y ≥ 95.

---

## 12. Performance бюджет

| Метрика | Target | Max |
|---|---|---|
| LCP | < 2.0s | 2.5s |
| FID | < 50ms | 100ms |
| CLS | < 0.05 | 0.1 |
| TTI | < 3.0s | 4.0s |
| Page weight | < 1.5 MB | 2.5 MB |
| JS | < 150 KB | 250 KB |
| CSS | < 60 KB | 100 KB |

**Изображения:** AVIF + WebP + JPG, srcset, lazy + decoding=async. Hero preload priority=high.
**Шрифты:** WOFF2 самохостинг, `font-display: swap`, `unicode-range: U+0000-024F, U+0400-04FF` (latin + cyrillic).

---

## 13. Правила для разработчиков — маппинг на наш стек

**Стек проекта:** Laravel + Inertia/React SSR + Tailwind. (НЕ Next.js, который рекомендует source-документ. Рекомендации SWIPE по Next.js игнорируем — у нас свой стек.)

### Что куда вынести

**В `resources/css/tokens.css` (новый файл, импортируется первым):**
- Все `--color-*` (12 шт).
- Все `--font-*` (3 шт).
- Все `--space-*` (9 шт).
- `--container`, `--container-text`, все `--gutter-*`, `--margin-*`.
- Все `--ease-*`, `--dur-*`.
- `--stroke-*`, `--radius-*`, `--z-*`.

**В `tailwind.config.js`:**
```js
// Маппим CSS-переменные, НЕ хардкодим hex
theme: {
  colors: {
    paper:        { DEFAULT: 'var(--color-paper)', light: 'var(--color-paper-light)', deep: 'var(--color-paper-deep)' },
    dust:         { DEFAULT: 'var(--color-dust)', light: 'var(--color-dust-light)' },
    ink:          { DEFAULT: 'var(--color-ink)', deep: 'var(--color-ink-deep)' },
    handwriting:  { DEFAULT: 'var(--color-handwriting)', soft: 'var(--color-handwriting-soft)' },
    stamp:        { DEFAULT: 'var(--color-stamp)', hover: 'var(--color-stamp-hover)' },
    tea:          { DEFAULT: 'var(--color-tea)', hover: 'var(--color-tea-hover)' },
    success:      'var(--color-success)',
    error:        'var(--color-error)',
  },
  fontFamily: {
    serif: ['Piazzolla', 'Georgia', 'serif'],
    sans:  ['Alegreya Sans SC', 'Arial Narrow', 'sans-serif'],
    mono:  ['JetBrains Mono', 'SF Mono', 'monospace'],
  },
  spacing: {
    xxs: 'var(--space-xxs)', xs: 'var(--space-xs)', sm: 'var(--space-sm)',
    md: 'var(--space-md)', lg: 'var(--space-lg)', xl: 'var(--space-xl)',
    '2xl': 'var(--space-2xl)', '3xl': 'var(--space-3xl)', '4xl': 'var(--space-4xl)',
  },
  transitionTimingFunction: {
    editorial: 'var(--ease-editorial)',
    standard:  'var(--ease-standard)',
  },
  transitionDuration: {
    quick: '240ms', standard: '420ms', slow: '720ms', cinematic: '1200ms',
  },
  screens: {
    'mobile-s': { max: '480px' },
    'mobile':   { max: '767px' },
    'tablet':   { min: '768px', max: '1099px' },
    'desktop':  { min: '1100px' },
    'xl':       { min: '1440px' },
  },
}
```

**В компонентах:** никаких hex, никаких px-литералов для цветов/отступов/транзишенов — только через tokens.

### Структура React-компонентов (Inertia.js)

```
resources/js/
├── Pages/
│   └── Landing.jsx              ← один скролл, 12 блоков
├── Components/
│   ├── blocks/                  ← 13 блоков + финальный CTA
│   │   ├── 01-Hero.jsx
│   │   ├── 02-Category.jsx
│   │   ├── 03-Shore.jsx
│   │   ├── 04-Neighbors.jsx
│   │   ├── 05-Dacha.jsx
│   │   ├── 06-Architecture.jsx
│   │   ├── 07-Lot.jsx
│   │   ├── 08-Plans.jsx
│   │   ├── 09-Uklad.jsx
│   │   ├── 10-Infrastructure.jsx
│   │   ├── 11-Built.jsx
│   │   ├── 12-Team.jsx
│   │   └── 13-FinalCta.jsx
│   ├── ui/                      ← production-ready UI-kit
│   │   ├── Button.jsx
│   │   ├── Field.jsx
│   │   ├── Chip.jsx
│   │   ├── Modal.jsx
│   │   ├── Toast.jsx
│   │   └── Container.jsx
│   ├── SwipeDeck.jsx            ← wrapper для mobile scroll-snap
│   ├── Header.jsx
│   ├── MobileMenu.jsx
│   └── Footer.jsx
```

### Что Orchid должен отдавать через `Inertia::render`

Админ-панель должна давать content-менеджеру редактировать:
- **9 лотов** (id, floor, area, terrace, view, status: available|reserved|sold, planUrl pdf, planImage).
- **~13 соседей по времени** (id, order, title, date, address, tag, image, featured: bool — подсвечивает один как Дача со Слонами).
- **Команда** (role, name, company, photo).
- **Контент-тексты** каждого блока (H1, sub, body, pull-quote) — редактируются без разработчика.
- **Site-settings** (адрес, телефон, email, TG, WA, часы показа).
- **Leads** (просмотр заявок).

---

## 14. Антипаттерны — чего делать нельзя

Из брифа и дизайн-системы (Do/Don't секции). **Эти запреты — часть категории, не стилевой каприз.**

### Структура
- Нет многостраничного меню с разделами «О компании», «Контакты». Всё на главной.
- Нет многостраничности внутри сайта. Один скролл — одна история.
- Нет калькулятора ипотеки, FAQ, отзывов, блога новостей на главной.
- Нет таймеров, «осталось 2 лота», всплывающих форм, чат-виджетов, «pop-up не уходите».
- Нет онлайн-бронирования и автоматизированного выбора лота.
- **Нет цен и прайса.** Максимум — диапазон у менеджера.

### Визуал
- Нет стоковых иконок. Иконки в блоке 10 — **запрещены**.
- Нет скруглений ≥ 4px.
- Нет градиентов «под золото», глянца, объёмных теней.
- Нет box в input-ах. Только 1px линия снизу.
- Нет чистого `#FFF` — только `--color-paper`.
- Нет чистого `#000` — только `--color-handwriting`.
- Нет рендеров. Только живые фото сданного дома.

### Моушн
- Нет spring / bounce / overshoot.
- Нет hover-эффектов на touch-устройствах (только `:active`).
- Нет бесконечных фоновых анимаций (кроме swipe-hint на первом экране).
- Нет лоудеров-спиннеров — только skeleton.
- Нет автовоспроизведения видео со звуком на Hero.
- Fade-out закрытия модалки **быстрее**, чем open (240 vs 420).

### Тон
- Нет слов «элитный», «премиум», «эксклюзивный».
- Нет восклицательных знаков.
- Нет «Мы рады предложить вам», «Успейте», «Не упустите».
- Нет длинных составных предложений.
- Нет смайлов, эмодзи, ❗.

---

## 15. Микрокопия — утверждённые UI-строки

Из §10 дизайн-системы. Использовать **дословно**.

| Контекст | Текст |
|---|---|
| Главный CTA | Приватный показ |
| Повторный CTA | Записаться на показ |
| CTA лота | Запросить условия |
| Меню mobile (бургер) | Меню |
| Форма: заголовок | Оставьте заявку |
| Форма: подзаголовок | Менеджер свяжется в течение часа, согласует время и приедет за вами. |
| Форма: имя | Имя / Ваше имя |
| Форма: телефон | Телефон / +7 |
| Форма: контакт | Как удобно связаться? / Telegram, WhatsApp, звонок |
| Форма: согласие | Согласен на обработку персональных данных |
| Форма: submit | Записаться на показ → |
| Успех | Заявка отправлена. Менеджер свяжется в течение часа. |
| Ошибка сети | Не удалось отправить. Проверьте подключение и попробуйте снова. |
| Ошибка поля | Укажите корректный номер телефона |
| Загрузка | Сохраняем вашу заявку… |
| 404 | Страница не найдена. Возможно, вы искали один из девяти лотов. |
| Статус доступен | Доступен |
| Статус резерв | В резерве |
| Статус продан | Продан |
| Swipe hint | Листайте ↑ |
| Cookie-banner | Сайт использует cookies для аналитики и связи с вами. Продолжая, вы соглашаетесь. |

---

## 16. Голос бренда — для content-агента

**Как пишем:**
- Короткие предложения. Утвердительные.
- Конкретные числа, даты, имена (1877 · 1908 · 4-я просека · Головкин).
- Образные сравнения, вытекающие из архивов — не метафоры-пустышки.
- Italic для ключевых слов в паре «факт + образ» (1 раз на абзац).
- **Тире как ритмический знак**, не запятая.
- Прямая речь там, где уместна: «Приезжайте посмотреть».

**Как не пишем:** см. §14.

**Эталонная строка подзаголовочных фактов:**
`9 ЛОТОВ · 8 СОСЕДЕЙ · ПОТОЛКИ 3,5–4 М · ПАНОРАМНОЕ ОСТЕКЛЕНИЕ · ПОДЗЕМНЫЙ ПАРКИНГ · УПРАВЛЯЮЩАЯ КОМПАНИЯ`
Разделитель — точка посередине (` · `), не запятая.

**Персона-автор:** не менеджер по продажам, а редактор монографии о доме. Интонация Константина Головкина, описывающего соседей как «виллы побережья, единственные по красоте от Нижнего Новгорода до Астрахани».

---

## 17. Источники

- `docs/design-system/dom-na-utese-design-system.html` — токены, адаптив, UI-kit, моушн, a11y, perf, SEO, handoff, roadmap.
- `docs/design-system/dom-na-utese-grids.html` — макетные сетки 12 блоков + foundation (палитра, типо, сетка).
- `docs/design-system/dom-na-utese-brief.txt` — бриф на структуру и контент.
- `docs/design-system/dom-na-utese-concept.txt` — концепция, манифест, справочник 14 исторических объектов.
- `docs/BRIEF.md` — краткая выжимка брифа для быстрого доступа.

**Когда документация противоречит самим файлам — правда в HTML/TXT.** Этот markdown — производный.
