import { Head } from '@inertiajs/react';
import Shell from '../Components/Layout/Shell';

/**
 * Shore — лонгрид-монография о волжском берегу.
 *
 * Контент — дословно из docs/design-system/dom-na-utese-concept.txt:
 *   Часть I — Концепция (манифест, короткая версия для питча, слоган,
 *             альтернативные формулировки, ДНК концепции)
 *   Часть II — Справочник 14 исторических объектов (из БД через ShoreController)
 *   Сводная хронология — таблица ключевых дат
 *
 * Editorial лонгрид на paper фоне, одна читаемая колонка 720px max-width.
 * Никакого scroll-snap — это текст, а не листалка.
 *
 * Плавные якорные ссылки между объектами. Каждый объект — <article>
 * с музейным маркером номера в углу.
 *
 * Пропсы:
 *   neighbors — 14 объектов из БД (таблица neighbors), отсортированы
 *               по sort_order. Если props пустой — используется fallback.
 */

// Fallback на случай пустой БД (до наката миграций). Тот же состав 14 объектов.
const fallbackObjects = [
    {
        num: '01',
        year: '1858',
        title: 'Кумысолечебница Н.В. Постникова',
        location: 'Постников (Студёный) овраг, в шести верстах от Самары',
        owner: 'Земский врач Нестор Васильевич Постников',
        style: 'Медицинское / санаторное учреждение',
        status: 'ГБУЗ «Самарский областной клинический противотуберкулёзный диспансер имени Н.В. Постникова». Название объекта сохранилось в топонимике (Постников овраг).',
        body: 'Вторая в мире и первая в России регулярная кумысолечебница. Именно Постников задал берегу репутацию целебного — за Постниковым овраг потянулись купцы, строившие собственные кумысные заведения и дачи. Среди пациентов: Лев Толстой, Антон Чехов, Максим Горький, Василий Суриков, великие князья Владимир и Алексей Александровичи.',
    },
    {
        num: '02',
        year: '1860-е – 1870-е',
        title: 'Дача Е.Н. Аннаева',
        location: 'Мыс Вислый Камень, выше Постникова оврага',
        owner: 'Купец Егор Никитич Аннаев',
        style: 'Дача-курорт с курзалом и библиотекой',
        status: 'Утрачена. К 1923 году, по свидетельствам современников, от построек и посадок не осталось ничего, кроме двух цементных бассейнов фонтанов и груды камней от фундаментов.',
        body: 'Вторая кумысолечебница волжского берега. По описанию современника — одно из самых живописных мест на Волге. Аннаев построил здесь большой дом на двадцать квартир с курзалом, библиотекой и роялем. После Постникова именно Аннаев закрепил статус берега как курортного и видового.',
    },
    {
        num: '03',
        year: '1903 – 1917',
        title: 'Дача Сипиной (Дача №56)',
        location: '1-я просека, территория современного Загородного парка',
        owner: 'Семья Сипиных (через удочерение Аржановых)',
        style: 'Памятник дачной архитектуры начала XX века',
        status: 'Сохранилась. Находится на территории ЦПКиО им. Горького.',
        body: 'Одна из немногих полностью дошедших до нас частных дач этой полосы. В 1889 году самарский купец Пётр Аржанов удочерил девочку Елену, которая впоследствии вышла замуж за поручика Николая Сипина — именно эта семья арендовала участок и построила дачу. Официальное обозначение в городских документах — «Дача №56».',
    },
    {
        num: '04',
        year: '1908 – 1909',
        title: 'Дача К.П. Головкина — «Дача со Слонами»',
        location: '4-я просека, ул. Советской Армии, 292',
        architect: 'Константин Павлович Головкин (автор проекта); при содействии архитектора Валентина Владимировича Тепфера',
        owner: 'Константин Павлович Головкин — купец 2-й гильдии, художник, археолог, один из первых автомобилистов Самары',
        style: 'Модерн / венский сецессион',
        status: 'Объект культурного наследия федерального значения. Реставрация завершена 7 сентября 2024 года. Открыта для посетителей по средам, пятницам и субботам.',
        body: 'Главный визуальный символ всей волжской дачной полосы. Фигуры слонов — пустотелые, выполнены из цемента по эскизам самого Головкина и специально рассчитаны на обзор с проплывающих пароходов: берег для купечества был общей парадной витриной. Головкин десятками вырезал из бумаги макеты дома, склеивал их, проверял пропорции и бесконечно браковал — дача стала его архитектурным автопортретом.',
        note: 'Именно эта дача — ближайший культурный сосед «Дома на Утёсе» и главный исторический якорь проекта.',
        featured: true,
    },
    {
        num: '05',
        year: 'Начало XX века',
        title: 'Дача В.М. Сурошникова',
        location: '7-я просека, территория военного санатория «Волга» (корпус №3)',
        owner: 'Василий Михайлович Сурошников — зять Антона Шихобалова, владелец 18 домов в Самаре и крупнейшей частной электростанции города',
        style: 'Псевдомавританский',
        status: 'Объект культурного наследия (признан приказом МКСО от 29.07.2009 №13). Корпус №3 санатория «Волга».',
        body: 'Одна из самых эффектных дач волжского берега. После смерти тестя Сурошников унаследовал 54 000 десятин земли и крупные счета в Волжско-Камском и Азово-Донском банках. Выбор псевдомавританского стиля — редкость для Самары и демонстрация европейского кругозора владельца.',
    },
    {
        num: '06',
        year: 'Начало XX века',
        title: 'Дача Е.А. Курлиной',
        location: '7-я просека, территория санатория «Волга» (ВИП-корпус)',
        owner: 'Екатерина Андреевна Курлина — представительница одной из крупнейших мукомольных династий Самары',
        style: 'Классическая дачная архитектура начала XX века',
        status: 'ВИП-корпус санатория «Волга». Сохранилась.',
        body: 'Дача с двумя важными страницами советской истории: летом 1941 года здесь жила дочь Сталина Светлана Аллилуева, а в марте 1961 года — Юрий Гагарин перед полётом в космос. Сегодня — часть комплекса военного санатория.',
    },
    {
        num: '07',
        year: 'Начало XX века',
        title: 'Дача А.А. Титова',
        location: '7-я просека, территория санатория «Волга»',
        owner: 'Купец А.А. Титов',
        style: 'Дачная застройка начала XX века',
        status: 'Упоминается в документах как памятник архитектуры на территории санатория. Требует отдельной атрибуции.',
        body: 'Часть плотной купеческой колонии, сложившейся вокруг Барбашиной поляны. Входит в ансамбль дач, объединённых сегодня в единый комплекс санатория «Волга».',
    },
    {
        num: '08',
        year: 'Начало XX века',
        title: 'Дача В.Н. Башкирова',
        location: '7-я просека, территория санатория «Волга»',
        owner: 'Купец В.Н. Башкиров',
        style: 'Дачная застройка начала XX века',
        status: 'Упоминается как памятник архитектуры на территории санатория.',
        body: 'Ещё один элемент купеческого соседства 7-й просеки. Константин Головкин сам перечислял Башкирова в списке соседей по берегу наряду с Сурошниковым, Курлиной, Константиновым, Неклютиным и Соколовыми.',
    },
    {
        num: '09',
        year: '1941 – 1943',
        title: 'Бункер Жукова — объект «А»',
        location: '7-я просека, территория санатория «Волга»',
        owner: 'Заглублённый командный пункт Генштаба СССР',
        style: 'Военно-инженерное сооружение',
        status: 'С 1948 по 1974 год — заглублённый КП ПВО. Затем заброшен и затоплен. В 2017 году откачан и открыт для экскурсий.',
        body: 'Глубина — 26–28 метров, площадь около 900 кв. м. Сооружение тянется вдоль берега Волги с выходом к реке через замаскированное сооружение. Построен для руководящего состава Советской Армии в период, когда Самара (тогда Куйбышев) была «запасной столицей» СССР. Ключевой объект «советского слоя» волжского берега.',
    },
    {
        num: '10',
        year: '1958',
        title: 'Обкомовская дача',
        location: '1-я просека',
        architect: 'Алексей Моргун',
        owner: 'Государственная дача, построенная к визиту Н.С. Хрущёва',
        style: 'Советская монументальная архитектура 1950-х',
        status: 'Резиденция губернатора Самарской области.',
        body: '12 апреля 1961 года здесь отдыхал Юрий Гагарин после полёта в космос. Позже — Герман Титов. Объект соединяет волжский берег с официальной советской историей страны и задаёт второй культурный слой полосы — ведомственно-государственный, идущий параллельно купеческому.',
    },
    {
        num: '11',
        year: 'Начало 1900-х',
        title: 'Дача А. Константинова',
        location: '8-я просека',
        owner: 'Александр Константинов — сын купца Ивана Константинова',
        style: 'Дачная архитектура начала XX века',
        status: 'Участок позже продан купцу Субботину. Сохранность требует уточнения.',
        body: 'Согласно источникам, это была первая частная дача на волжском берегу в районе 8-й просеки. Сам Константинов упоминается Головкиным в списке ключевых соседей по береговой полосе.',
    },
    {
        num: '12',
        year: '1909',
        title: 'Дача Ивана Соколова',
        location: '9-я просека / Барбашина поляна (ныне поляна Фрунзе)',
        architect: 'Александр Щербачёв — главный «модерн-архитектор» губернской Самары',
        owner: 'Иван Соколов — мукомол, владелец паровой мельницы у Хлебной площади и нескольких доходных домов',
        style: 'Классический стиль с декоративными элементами',
        status: 'Сохранилась.',
        body: 'Особняк украшен фигурами четырёх соколов на башне — прямая отсылка к фамилии владельца. За благотворительную деятельность (строительство крупной богадельни на углу Мичурина и Чкалова) Соколовы получили звание почётных граждан города.',
    },
    {
        num: '13',
        year: '1910-е',
        title: 'Дача Александра Соколова',
        location: '9-я просека, рядом с дачей отца',
        owner: 'Александр Соколов — сын Ивана Соколова',
        style: 'Псевдомавританский',
        status: 'Сохранилась.',
        body: 'Построена сыном как ответ отцовской даче. Псевдомавританская стилистика — повторение приёма Сурошникова, характерное для волжской полосы 1900–1910-х годов. Две дачи Соколовых вместе образуют самостоятельный ансамбль.',
    },
    {
        num: '14',
        year: 'Начало XX века',
        title: 'Дача Шихобаловых',
        location: '9-я просека, Барбашина поляна',
        owner: 'Династия Шихобаловых — главных самарских миллионеров второй половины XIX века. Глава семьи, Антон Николаевич Шихобалов (1827–1908), владел к 1900 году примерно 200 тысячами десятин земли.',
        style: 'Дачная архитектура начала XX века',
        status: 'Сохранность требует уточнения. Имеет значимую советскую страницу.',
        body: 'С 1937 по 1941 год здесь располагалось место дислокации НКВД. По исследованиям краеведов, именно в подвале бывшей дачи купцов Шихобаловых был расстрелян Филипп Голощёкин — один из организаторов расстрела царской семьи. Один из самых драматических исторических адресов полосы.',
    },
];

const timeline = [
    { year: '1858', event: 'Кумысолечебница Н.В. Постникова', place: 'Постников овраг' },
    { year: '1860-е–70-е', event: 'Дача Е.Н. Аннаева', place: 'Мыс Вислый Камень' },
    { year: '1872', event: 'Военный кумыс — основание дачно-кумысной колонии', place: 'Барбашина поляна' },
    { year: '12 июля 1877', event: 'Открытие волжского берега для частной аренды на 99 лет', place: 'От Постникова оврага до Барбашиной поляны' },
    { year: 'Начало 1900-х', event: 'Дача А. Константинова — первая частная дача района', place: '8-я просека' },
    { year: '1903–1917', event: 'Дача Сипиной', place: '1-я просека' },
    { year: '1908–1909', event: 'Дача Головкина — Дача со Слонами', place: '4-я просека' },
    { year: '1909', event: 'Дача Ивана Соколова', place: '9-я просека' },
    { year: '1910-е', event: 'Дача Александра Соколова', place: '9-я просека' },
    { year: 'Начало XX в.', event: 'Дачи Сурошникова, Курлиной, Титова, Башкирова, Шихобаловых', place: '7-я и 9-я просеки' },
    { year: '1941–1943', event: 'Бункер Жукова (объект «А»)', place: '7-я просека' },
    { year: '1958', event: 'Обкомовская дача (арх. А. Моргун)', place: '1-я просека' },
    { year: '2017', event: 'Открытие бункера Жукова для экскурсий', place: '7-я просека' },
    { year: '7 сентября 2024', event: 'Завершение реставрации Дачи со Слонами', place: '4-я просека' },
];

export default function Shore({ neighbors = [] }) {
    // Если данные из БД пришли — маппим под формат, ожидаемый разметкой
    // (на месте `architect` у старого fallback-кода стиля не обрабатываем —
    // админка его больше не имеет, сливаем в `style`).
    const objects = neighbors.length
        ? neighbors.map((n) => ({
              num: n.num,
              year: n.dateLabel ?? '',
              title: n.title,
              location: n.address ?? '',
              owner: n.owner ?? '',
              style: n.style ?? '',
              status: n.statusLabel ?? '',
              body: n.description ?? '',
              note: n.featured
                  ? 'Именно эта дача — ближайший культурный сосед «Дома на Утёсе» и главный исторический якорь проекта.'
                  : undefined,
              featured: !!n.featured,
              image: n.image ?? null,
          }))
        : fallbackObjects;

    return (
        <Shell snap={false}>
            <Head>
                <title>Берег · Справочник · Дом на Утёсе</title>
                <meta
                    name="description"
                    content="Концепция «Дома на Утёсе» и справочник 14 исторических объектов волжского берега от Постникова оврага до Барбашиной поляны."
                />
            </Head>

            <article data-server-rendered="true" className="bg-paper text-handwriting">
                {/* Шапка лонгрида */}
                <header className="py-rhythm-xl md:py-rhythm-xl-md border-b border-handwriting/15">
                    <div className="max-w-[720px] mx-auto px-5 md:px-6">
                        <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-stamp mb-rhythm-sm md:mb-rhythm-sm-md">
                            Справочник · 14 объектов
                        </p>
                        <h1 className="font-serif text-[40px] md:text-[72px] leading-[1.02] font-medium tracking-[-0.01em] mb-rhythm-sm md:mb-rhythm-sm-md">
                            Берег
                        </h1>
                        <p className="font-serif italic text-[19px] md:text-[24px] leading-[1.35] opacity-85">
                            Волжский берег от&nbsp;Постникова оврага до&nbsp;Барбашиной поляны.
                            Концепция и&nbsp;справочник исторических объектов.
                        </p>
                        <p className="mt-rhythm-md md:mt-rhythm-md-md font-sans text-[10px] font-bold tracking-[0.1em] uppercase text-handwriting/60">
                            <a href="/" className="link-underline">← На главную</a>
                        </p>
                    </div>
                </header>

                {/* Часть I — Концепция */}
                <section className="py-rhythm-xl md:py-rhythm-xl-md" aria-labelledby="concept-title">
                    <div className="max-w-[720px] mx-auto px-5 md:px-6">
                        <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-stamp mb-rhythm-sm md:mb-rhythm-sm-md">
                            Часть I
                        </p>
                        <h2 id="concept-title" className="font-serif text-[34px] md:text-[52px] leading-[1.05] font-medium tracking-[-0.01em] mb-rhythm-md md:mb-rhythm-md-md">
                            Манифест
                        </h2>

                        <div className="space-y-6 font-serif text-[17px] md:text-[19px] leading-[1.7]">
                            <p>Есть берега, которые помнят больше, чем рассказывают.</p>
                            <p>
                                Волжская полоса от Постникова оврага до Барбашиной поляны — один
                                из них. Десять километров высокого леса над водой, сосновые
                                дубравы, виды на Жигулёвские ворота и закаты, которых нет больше
                                нигде на Волге. В 1877 году Городская Управа открыла эту землю
                                под частную застройку — и за следующие тридцать лет на ней, одна
                                за другой, встали виллы тех, кто строил Самару: Головкины,
                                Шихобаловы, Соколовы, Сурошниковы, Курлины, Субботины.
                            </p>
                            <p>
                                Они выбирали этот берег не под показную роскошь. Константин
                                Головкин — художник, купец, археолог, построивший здесь Дачу со
                                Слонами, — описывал соседские владения как{' '}
                                <em>виллы побережья, которые служили украшением самарского
                                берега Волги и были единственными по красоте на всём её течении
                                от Нижнего Новгорода до Астрахани</em>. Сто шестнадцать лет
                                спустя, в 2024 году, его собственную дачу заново открыли для
                                посетителей — и берег снова стал берегом, на который приезжают.
                            </p>
                            <p className="font-serif italic text-[20px] md:text-[24px] text-stamp my-10 leading-[1.4]">
                                Это не был элитный район в сегодняшнем смысле слова. Это был
                                берег людей, чьи имена стали городом.
                            </p>
                            <p>
                                Сто лет спустя полоса просек по-прежнему стоит на своей высоте.
                                Федеральные памятники архитектуры, санаторный воздух, бункер
                                Жукова под ногами, чьи-то новые дачи за заборами. Но сам формат
                                жизни здесь всё это время оставался один: частный дом на берегу.
                                Со всей свободой — и со всем весом быта, который эту свободу
                                оплачивает.
                            </p>
                            <p>
                                <em>Дом на Утёсе</em> — то, чего на этом берегу не было никогда.
                            </p>
                            <p>
                                Девять лотов в одном клубном доме, стоящем на той же береговой
                                линии. Потолки до четырёх метров. Панорамное остекление.
                                Террасы, обращённые к Волге. Подземный паркинг. Управляющая
                                компания, которая снимает с жителей всё, что раньше отнимало у
                                этого берега половину недели.
                            </p>
                            <p>
                                Название буквально: дом стоит на утёсе. Над самой водой, в
                                прямой видимости Дачи со Слонами, в нескольких минутах от дач
                                Сурошникова и Курлиной.
                            </p>
                            <p>Но утёс — не только физика. Это позиция. Точка, с которой уже никуда не нужно подниматься.</p>
                            <p>
                                Мы предлагаем не квартиру с видом. Мы предлагаем продолжение той
                                линии, которая началась на этом берегу в 1877 году — в
                                современной форме, для восьмерых соседей.
                            </p>
                            <p className="font-serif italic text-[22px] md:text-[28px] leading-[1.3] text-stamp pt-6 border-t border-handwriting/15">
                                Дом на Утёсе. На&nbsp;одной линии с&nbsp;историей.
                            </p>
                        </div>

                        {/* ДНК концепции */}
                        <div className="mt-rhythm-lg md:mt-rhythm-lg-md pt-rhythm-md md:pt-rhythm-md-md border-t border-handwriting/15">
                            <p className="font-sans text-[10px] font-bold tracking-[0.12em] uppercase text-stamp mb-rhythm-md md:mb-rhythm-md-md">
                                ДНК концепции
                            </p>
                            <dl className="space-y-6">
                                <div>
                                    <dt className="font-sans text-[11px] font-bold tracking-[0.12em] uppercase text-handwriting/70 mb-2">
                                        Центральная метафора
                                    </dt>
                                    <dd className="font-serif text-[17px] leading-[1.65]">
                                        Берег как непрерывная линия. Не «дом рядом с памятниками»,
                                        а продолжение той же линии застройки, которая началась в
                                        1877 году.
                                    </dd>
                                </div>
                                <div>
                                    <dt className="font-sans text-[11px] font-bold tracking-[0.12em] uppercase text-handwriting/70 mb-2">
                                        Главный культурный жест
                                    </dt>
                                    <dd className="font-serif text-[17px] leading-[1.65]">
                                        Мы не копируем купеческий стиль и не играем в историческую
                                        реконструкцию. Мы наследуем место и его логику — вилла на
                                        берегу, клубное соседство, саморегулирование — но отдаём её
                                        в современной форме: девять квартир вместо одной дачи,
                                        управляющая компания вместо прислуги, панорамное остекление
                                        вместо оранжерей.
                                    </dd>
                                </div>
                                <div>
                                    <dt className="font-sans text-[11px] font-bold tracking-[0.12em] uppercase text-handwriting/70 mb-2">
                                        Роль утёса
                                    </dt>
                                    <dd className="font-serif text-[17px] leading-[1.65]">
                                        Двойная. Буквально: дом физически стоит на высоте над
                                        Волгой. Метафорически: утёс — это уже занятая позиция, а
                                        не восхождение. Обращение к людям, которые не доказывают
                                        статус, а живут в нём.
                                    </dd>
                                </div>
                                <div>
                                    <dt className="font-sans text-[11px] font-bold tracking-[0.12em] uppercase text-handwriting/70 mb-2">
                                        Словарь концепции
                                    </dt>
                                    <dd className="font-serif italic text-[17px] leading-[1.65] text-handwriting/80">
                                        Берег. Высота. Линия. Горизонт. Первая линия. Продолжение.
                                        Наследие. Соседство. Ритм. Воздух. Тишина. Просторы.
                                        Закаты. Жигулёвские ворота.
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </section>

                {/* «Главный сосед» — Дача со Слонами. Раньше жила на главной
                    (блок 05), клиент решил оставить её только здесь — на странице
                    про берег. Текст и фото — из `featured: true` neighbor-а
                    (БД), с fallback на brief §5. */}
                {(() => {
                    const dacha = objects.find((o) => o.featured) || null;
                    const dachaTitle = dacha?.title || 'Дача К.П. Головкина — «Дача со Слонами»';
                    const dachaDate = dacha?.dateLabel || '1908–1909';
                    const dachaAddr = dacha?.address || '4-я просека, Самара';
                    const dachaImage = dacha?.image || '/images/visual/11.jpg';
                    const dachaBody = dacha?.description || [
                        'Федеральный памятник архитектуры. Построена в 1908–1909 годах по проекту самого Константина Головкина — купца, художника, археолога и одного из первых автомобилистов Самары. Фигуры слонов рассчитаны на обзор с проплывающих пароходов: берег был парадной витриной самарского купечества.',
                        '',
                        'Три года реставрации. 7 сентября 2024 года дача открыта для посетителей — по средам, пятницам и субботам.',
                    ].join('\n');
                    const dachaParas = dachaBody.split(/\n+/).map((p) => p.trim()).filter(Boolean);

                    return (
                        <section id="dacha" className="bg-ink text-paper py-rhythm-xl md:py-rhythm-xl-md" aria-labelledby="dacha-title">
                            <div className="max-w-[1320px] mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
                                <figure className="md:col-span-5">
                                    <div className="aspect-[4/5] overflow-hidden bg-ink-deep">
                                        <img
                                            src={dachaImage}
                                            alt={`${dachaTitle}. ${dachaAddr}. Федеральный памятник архитектуры, модерн.`}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <figcaption className="mt-3 font-sans text-[10px] font-bold tracking-[0.1em] uppercase opacity-60">
                                        {dachaTitle.replace(' — «Дача со Слонами»', '')} · {dachaDate} · {dachaAddr}
                                    </figcaption>
                                </figure>

                                <div className="md:col-span-7">
                                    <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-tea mb-4">
                                        Главный сосед
                                    </p>
                                    <h2 id="dacha-title" className="font-serif text-[34px] md:text-[56px] xl:text-[64px] leading-[1.02] font-medium tracking-[-0.01em] mb-4">
                                        Дача со&nbsp;Слонами<span className="text-tea">.</span>
                                    </h2>
                                    <p className="font-serif italic text-[17px] md:text-[24px] leading-[1.3] opacity-85 mb-10 max-w-[26ch]">
                                        В пятнадцати минутах пешком.
                                    </p>
                                    <div className="space-y-5 font-serif text-[15px] md:text-[17px] leading-[1.65] max-w-[640px] opacity-90">
                                        {dachaParas.map((p, i) => (
                                            <p key={i}>{p}</p>
                                        ))}
                                    </div>
                                    <blockquote className="mt-10 pt-6 border-t border-paper/15 font-serif italic text-[22px] md:text-[28px] leading-[1.4] text-tea max-w-[32ch]">
                                        Та&nbsp;же высота, с&nbsp;которой Головкин проектировал слонов —
                                        чтобы их было видно с&nbsp;пароходов.
                                    </blockquote>
                                </div>
                            </div>
                        </section>
                    );
                })()}

                {/* Часть II — Справочник 14 объектов. Якорь #neighbors
                    держим — на главной в блоке 03 Shore стоит ссылка на него. */}
                <section id="neighbors" className="py-rhythm-xl md:py-rhythm-xl-md bg-paper-light" aria-labelledby="refs-title">
                    <div className="max-w-[720px] mx-auto px-5 md:px-6">
                        <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-stamp mb-rhythm-sm md:mb-rhythm-sm-md">
                            Часть II
                        </p>
                        <h2 id="refs-title" className="font-serif text-[34px] md:text-[52px] leading-[1.05] font-medium tracking-[-0.01em] mb-rhythm-sm md:mb-rhythm-sm-md">
                            Справочник
                        </h2>
                        <p className="font-serif italic text-[17px] md:text-[22px] leading-[1.35] opacity-80 mb-12 md:mb-16">
                            Волжский берег от&nbsp;Постникова оврага до&nbsp;Барбашиной поляны.
                            Четырнадцать объектов, идущих по&nbsp;берегу от&nbsp;центра города
                            к&nbsp;Барбашиной поляне.
                        </p>

                        <p className="font-serif text-[16px] md:text-[17px] leading-[1.7] mb-16 opacity-90">
                            Полоса высокого волжского берега от Студёного (Постникова) оврага до
                            Барбашиной поляны — около десяти километров соснового и дубового
                            леса — с конца XIX века стала зоной концентрации самарской
                            аристократии. Решающая дата: 12 июля 1877 года Городская Управа
                            открыла эти земли для частной аренды на 99 лет, нарезав 93 участка
                            вдоль Волги.
                        </p>

                        <div className="space-y-16 md:space-y-20">
                            {objects.map((obj) => (
                                <article
                                    key={obj.num}
                                    id={`object-${obj.num}`}
                                    className={
                                        'relative pt-8 border-t ' +
                                        (obj.featured ? 'border-stamp' : 'border-handwriting/25')
                                    }
                                >
                                    {/* Верхний маркер: номер + годы */}
                                    <div className="flex items-baseline gap-4 mb-6">
                                        <span
                                            className={
                                                'font-sans text-[11px] font-bold tracking-[0.15em] uppercase tnum ' +
                                                (obj.featured ? 'text-stamp' : 'text-handwriting/70')
                                            }
                                        >
                                            {obj.num}
                                        </span>
                                        <span className="font-sans text-[10px] font-bold tracking-[0.1em] uppercase text-handwriting/55">
                                            {obj.year}
                                        </span>
                                    </div>

                                    <h3 className="font-serif text-[26px] md:text-[34px] leading-[1.1] font-medium tracking-[-0.005em] mb-8">
                                        {obj.title}
                                    </h3>

                                    {/* Мета */}
                                    <dl className="mb-8 space-y-2 text-[14px] md:text-[15px] font-serif leading-[1.55]">
                                        <div className="grid grid-cols-[90px_1fr] md:grid-cols-[110px_1fr] gap-3">
                                            <dt className="font-sans text-[10px] font-bold tracking-[0.1em] uppercase text-handwriting/55 pt-[3px]">
                                                Локация
                                            </dt>
                                            <dd>{obj.location}</dd>
                                        </div>
                                        {obj.architect && (
                                            <div className="grid grid-cols-[90px_1fr] md:grid-cols-[110px_1fr] gap-3">
                                                <dt className="font-sans text-[10px] font-bold tracking-[0.1em] uppercase text-handwriting/55 pt-[3px]">
                                                    Архитектор
                                                </dt>
                                                <dd>{obj.architect}</dd>
                                            </div>
                                        )}
                                        <div className="grid grid-cols-[90px_1fr] md:grid-cols-[110px_1fr] gap-3">
                                            <dt className="font-sans text-[10px] font-bold tracking-[0.1em] uppercase text-handwriting/55 pt-[3px]">
                                                Заказчик
                                            </dt>
                                            <dd>{obj.owner}</dd>
                                        </div>
                                        <div className="grid grid-cols-[90px_1fr] md:grid-cols-[110px_1fr] gap-3">
                                            <dt className="font-sans text-[10px] font-bold tracking-[0.1em] uppercase text-handwriting/55 pt-[3px]">
                                                Стиль
                                            </dt>
                                            <dd>{obj.style}</dd>
                                        </div>
                                        <div className="grid grid-cols-[90px_1fr] md:grid-cols-[110px_1fr] gap-3">
                                            <dt className="font-sans text-[10px] font-bold tracking-[0.1em] uppercase text-handwriting/55 pt-[3px]">
                                                Статус
                                            </dt>
                                            <dd>{obj.status}</dd>
                                        </div>
                                    </dl>

                                    <p className="font-serif text-[16px] md:text-[17px] leading-[1.7]">
                                        {obj.body}
                                    </p>

                                    {obj.note && (
                                        <p className="mt-6 pl-5 border-l border-stamp font-serif italic text-[15px] md:text-[16px] leading-[1.55] text-stamp">
                                            <span className="font-sans not-italic text-[9px] font-bold tracking-[0.14em] uppercase block mb-1 text-stamp">
                                                Примечание
                                            </span>
                                            {obj.note}
                                        </p>
                                    )}
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Сводная хронология */}
                <section className="py-rhythm-xl md:py-rhythm-xl-md" aria-labelledby="timeline-title">
                    <div className="max-w-[720px] mx-auto px-5 md:px-6">
                        <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-stamp mb-rhythm-sm md:mb-rhythm-sm-md">
                            Сводная
                        </p>
                        <h2 id="timeline-title" className="font-serif text-[34px] md:text-[52px] leading-[1.05] font-medium tracking-[-0.01em] mb-rhythm-sm md:mb-rhythm-sm-md">
                            Хронология
                        </h2>
                        <p className="font-serif italic text-[17px] md:text-[22px] leading-[1.35] opacity-80 mb-12">
                            Ключевые даты и&nbsp;события на&nbsp;волжском берегу.
                        </p>

                        <ol className="border-t border-handwriting/20">
                            {timeline.map((row, i) => (
                                <li
                                    key={i}
                                    className="grid grid-cols-[120px_1fr] md:grid-cols-[170px_1fr] gap-3 md:gap-6 py-4 border-b border-handwriting/15"
                                >
                                    <span className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.1em] uppercase text-stamp tnum pt-[4px]">
                                        {row.year}
                                    </span>
                                    <div>
                                        <p className="font-serif text-[15px] md:text-[17px] leading-[1.4]">
                                            {row.event}
                                        </p>
                                        <p className="font-sans text-[10px] font-bold tracking-[0.1em] uppercase text-handwriting/55 mt-1">
                                            {row.place}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ol>

                        <p className="mt-16 font-serif italic text-[17px] md:text-[20px] leading-[1.5] text-handwriting/90 pl-5 border-l border-stamp">
                            Полоса от Постникова оврага до Барбашиной поляны — единственное
                            место в Самаре, где в 1890–1910-е годы сошлись медицинская
                            репутация, эстетика волжских видов, юридическая возможность
                            долгосрочной аренды и социальное соседство первых лиц города.{' '}
                            <em>Самарский Баден-Баден, Ривьера и&nbsp;Рублёво-Успенское шоссе
                            одновременно.</em>
                        </p>

                        <div className="mt-16 text-center">
                            <a
                                href="/"
                                className="font-sans text-[11px] font-bold tracking-[0.1em] uppercase text-stamp link-underline"
                            >
                                ← Вернуться к главной
                            </a>
                        </div>
                    </div>
                </section>
            </article>
        </Shell>
    );
}
