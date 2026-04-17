import { Head } from '@inertiajs/react';

export default function Home() {
    return (
        <>
            <Head title="Главная" />
            <div data-server-rendered="true" className="min-h-screen flex items-center justify-center bg-stone-50 text-stone-900">
                <div className="text-center px-6">
                    <h1 className="text-4xl md:text-6xl font-serif mb-4">Дом на Утёсе</h1>
                    <p className="text-lg text-stone-600">На одной линии с историей.</p>
                    <p className="text-sm text-stone-400 mt-8">Скелет развёрнут. Ждём бриф на структуру лендинга.</p>
                </div>
            </div>
        </>
    );
}
