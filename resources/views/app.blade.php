<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="theme-color" content="#EEE4D3">
    <title inertia>{{ $title ?? 'Дом на Утёсе' }}</title>
    <meta name="description" content="{{ $description ?? 'Клубный дом на первой линии Волги. Просеки, Самара. На одной линии с историей.' }}" />
    <meta property="og:title" content="{{ $title ?? 'Дом на Утёсе' }}" />
    <meta property="og:description" content="{{ $description ?? 'Клубный дом на первой линии Волги. Просеки, Самара. На одной линии с историей.' }}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="/images/visual/14.jpg" />

    {{-- Hero image preload — fetch-priority high, первый кадр LCP --}}
    <link rel="preload" as="image" href="/images/visual/14.jpg" fetchpriority="high" />

    {{--
        Шрифты. Пока WOFF2-файлы не выложены в /public/fonts/, грузим из
        Google Fonts. Preconnect — чтобы TLS-handshake не попал в LCP.
        Когда fonts/*.woff2 окажутся в проекте — раскомментировать @font-face
        в resources/css/fonts.css и удалить этот блок.
    --}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Piazzolla:ital,wght@0,400;0,500;0,700;1,400&family=Alegreya+Sans+SC:wght@500;700&family=JetBrains+Mono:wght@400&display=swap&subset=cyrillic,latin" rel="stylesheet">

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>
<body>
    @inertia
</body>
</html>
