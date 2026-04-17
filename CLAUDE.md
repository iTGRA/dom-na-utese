# Дом на Утёсе — CLAUDE.md

> Клубный жилой дом на волжском берегу Самары. 9 лотов на исторической линии просек.
> Стек: Laravel 13 + Inertia 3 + React 19 (SSR) + Orchid 14 + MySQL 8

---

## Контекст проекта

Клубный ЖК «Дом на Утёсе» — лендинг для продажи 9 лотов в клубном доме, стоящем на утёсе над Волгой.
Историческое позиционирование: «Берег людей, чьи имена стали городом» — продолжение линии купеческих вилл 1877 года.

Подробности позиционирования и тона голоса — в памяти: `project_dom_na_utese.md`.
Инфраструктура и деплой — ниже.

**Ключевой принцип тона:** литературный, сдержанный, с культурно-историческим весом. НЕ девелоперский маркетинг.

---

## Статус

Это **скелет**. Развёрнут 2026-04-17. Лендинг-структура (секции, маршруты, Orchid-экраны контента) будет строиться после получения брифа от владельца.

На данный момент работает:
- Laravel 13 + Inertia 3 + React 19 SSR
- Orchid 14 с одним admin-юзером (`admin@dom-na-utese.ru`, пароль — локально на Mac в `/tmp/dom_na_utese_admin_pass.txt`)
- Одна страница `/` (Home.jsx) — заглушка с заголовком и слоганом

---

## Инфраструктура

**Продакшн:**
- Домен: `https://domnautese.swipeandev.ru` (Let's Encrypt, auto-renew)
- Путь: `/var/www/dom-na-utese` (owner `claude:www-data`)
- SSR: systemd unit `dom-na-utese-ssr.service`, порт `127.0.0.1:13715`
- Nginx vhost: `/etc/nginx/sites-available/dom-na-utese`
- PHP: 8.3-FPM через `/run/php/php8.3-fpm.sock`
- MySQL: БД `dom_na_utese`, user `dom_na_utese`@`localhost` (пароль — на сервере в `/var/www/dom-na-utese/.env`)

**SSH:**
- alias `na-ugle` (тот же VDS, что и «На Угле»)
- 85.236.186.16, Ubuntu 24.04, passwordless sudo для `claude`

**Тот же сервер делит с проектом «На Угле»** (`/var/www/na-ugle`, порт SSR 13714). Не трогать их файлы/сервисы.

---

## Деплой (ручной)

```bash
ssh na-ugle
cd /var/www/dom-na-utese
git pull
composer install --no-dev --optimize-autoloader
npm ci && npm run build && npm run build -- --ssr
php artisan migrate --force
php artisan config:cache && php artisan route:cache && php artisan view:cache
sudo systemctl restart dom-na-utese-ssr php8.3-fpm
sudo systemctl reload nginx
```

---

## Правила из Na Ugle (применимы и здесь)

### Orchid Screen props должны быть nullable

В любом Orchid Screen все public-свойства-модели — nullable с default `null`:

```php
public ?ChefProfile $chef = null;   // ok
public ChefProfile $chef;           // 500 при открытии экрана
```

Orchid в v14 читает public-свойства через reflection до `query()`.

### CSS: `overflow-x: clip` вместо `hidden`

При защите от мобильного overflow использовать `overflow-x: clip` на html/body.
`overflow-x: hidden` создаёт scroll-container и ломает `position: sticky`.

---

## Что ещё НЕ сделано

- [ ] CI/CD (GitHub Actions деплой)
- [ ] MySQL backup automation
- [ ] Queue worker (supervisor)
- [ ] Log rotation
- [ ] Структура лендинга (ждём бриф)
- [ ] Контент-модели в БД (будут после брифа)
- [ ] Orchid Screens под контент (после брифа)

---

## Агенты

Те же 7 спецагентов, что у «На Угле» (`.claude/agents/` в папке Na_Ugle_Project). У этого проекта агенты пока не продублированы — если нужен специализированный агент, можно временно ссылаться на конфиги из соседнего проекта или скопировать нужного в `.claude/agents/` здесь.

Тон у Dom na Utese кардинально иной: не ресторанное «шкодно-народное», а «длинное эссе с фактурой». Соответственно CONTENT и UI_UX агенты требуют переформулированных ролевых промптов когда придёт время.
