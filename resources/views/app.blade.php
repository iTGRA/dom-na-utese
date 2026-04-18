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
    <meta property="og:image" content="/og-image.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    {{-- Favicon + Apple touch icon --}}
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" type="image/png" href="/favicon-32.png" sizes="32x32" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    {{-- Hero image preload — fetch-priority high, первый кадр LCP --}}
    <link rel="preload" as="image" href="/images/visual/14.jpg" fetchpriority="high" />

    {{-- Критичные шрифты: Piazzolla (основной текст) + Alegreya Sans SC
         (CAPS-метки, CTA). Cyrillic-подсет — приоритет, остальные подгрузятся
         по mere matched @font-face из resources/css/fonts.css. --}}
    <link rel="preload" as="font" type="font/woff2" crossorigin
          href="/fonts/piazzolla-400-700-normal-cyrillic.woff2" />
    <link rel="preload" as="font" type="font/woff2" crossorigin
          href="/fonts/alegreya-sans-sc-500-normal-cyrillic.woff2" />

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>
<body>
    @inertia
</body>
</html>
