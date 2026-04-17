<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="theme-color" content="#f5f1ea">
    <title inertia>{{ $title ?? 'Дом на Утёсе' }}</title>
    <meta name="description" content="{{ $description ?? 'Клубный дом на волжском берегу Самары. На одной линии с историей.' }}" />
    <meta property="og:title" content="{{ $title ?? 'Дом на Утёсе' }}" />
    <meta property="og:description" content="{{ $description ?? 'Клубный дом на волжском берегу Самары. На одной линии с историей.' }}" />
    <meta property="og:type" content="website" />
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>
<body>
    @inertia
</body>
</html>
