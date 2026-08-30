import heroWedding from "@/assets/hero-wedding.jpg";
import portrait1 from "@/assets/portrait-1.jpg";
import fashion1 from "@/assets/fashion-1.jpg";
import product1 from "@/assets/product-1.jpg";
import event1 from "@/assets/event-1.jpg";
import commercial1 from "@/assets/commercial-1.jpg";
import photographer from "@/assets/photographer.jpg";
import detail1 from "@/assets/detail-1.jpg";

export const images = {
  heroWedding,
  portrait1,
  fashion1,
  product1,
  event1,
  commercial1,
  photographer,
  detail1,
};

export const brand = {
  nameAr: "نُور",
  nameEn: "NOOR",
  tagline: "استوديو تصوير فوتوغرافي",
  descriptionAr:
    "استوديو تصوير يوثّق اللحظات بلغة بصرية هادئة، بين الضوء والظل، لصور تبقى.",
  email: "hello@noor.studio",
  phone: "+966 55 214 8890",
  address: "حي السفارات، الرياض، المملكة العربية السعودية",
  hours: "الأحد – الخميس · 10:00 ص – 7:00 م",
};

export type Category = {
  slug: string;
  ar: string;
  en: string;
};

export const categories: Category[] = [
  { slug: "weddings", ar: "أعراس", en: "Weddings" },
  { slug: "portrait", ar: "بورتريه", en: "Portrait" },
  { slug: "fashion", ar: "أزياء", en: "Fashion" },
  { slug: "commercial", ar: "تجاري", en: "Commercial" },
  { slug: "products", ar: "منتجات", en: "Products" },
  { slug: "events", ar: "مناسبات", en: "Events" },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  categoryAr: string;
  year: string;
  client: string;
  location: string;
  image: string;
  ratio: "portrait" | "landscape" | "square";
  excerpt: string;
  description: string;
  gallery: string[];
  hasVideo?: boolean;
};

export const projects: Project[] = [
  {
    slug: "layl-wa-noor",
    title: "ليلٌ ونُور",
    category: "weddings",
    categoryAr: "أعراس",
    year: "٢٠٢٥",
    client: "سارة وعبدالله",
    location: "الرياض",
    image: images.heroWedding,
    ratio: "landscape",
    excerpt: "حفل زفاف في رواق حجري، بين ضوء العصر وحرير الفستان.",
    description:
      "بدأ اليوم قبل الشروق بساعتين. أردنا أن نوثّق الطقوس الصغيرة قبل الاحتفال الكبير: يد تُمسك بيد، خطوة مترددة في الرواق، ضحكة تتسلل بين الأعمدة. اعتمدنا على الضوء الطبيعي بالكامل، وحدّدنا لوحة ألوان دافئة قريبة من الحجر والحرير، حتى تبدو الصور وكأنها ذاكرة لا تقرير.",
    gallery: [images.heroWedding, images.detail1, images.event1, images.portrait1],
  },
  {
    slug: "wujuh",
    title: "وُجوه",
    category: "portrait",
    categoryAr: "بورتريه",
    year: "٢٠٢٥",
    client: "مشروع شخصي",
    location: "استوديو نُور",
    image: images.portrait1,
    ratio: "portrait",
    excerpt: "سلسلة بورتريهات بالأبيض والأسود بإضاءة مفتاحية واحدة.",
    description:
      "سلسلة من ثلاثين بورتريه صُوّرت على مدى عام، بمصدر ضوء واحد وخلفية فحمية. الهدف كان إزالة كل ما يشتّت: لا ديكور، لا ألوان، فقط ملامح وضوء يتراجع ببطء نحو الظل.",
    gallery: [images.portrait1, images.photographer, images.fashion1],
  },
  {
    slug: "silhouette",
    title: "ظِلال حادّة",
    category: "fashion",
    categoryAr: "أزياء",
    year: "٢٠٢٤",
    client: "دار أزياء مَها",
    location: "جدة",
    image: images.fashion1,
    ratio: "portrait",
    excerpt: "حملة أزياء صيفية تعتمد على ظل الشمس المباشر كعنصر تصميم.",
    description:
      "صُوّرت الحملة بالكامل تحت شمس الظهيرة، حيث يتحول الظل إلى خط تصميمي يقسم الكادر. القصّات المعمارية للملابس قابلها تكوين بصري صارم ومساحات فارغة واسعة.",
    gallery: [images.fashion1, images.product1, images.commercial1],
  },
  {
    slug: "hujra",
    title: "حُجرة",
    category: "commercial",
    categoryAr: "تجاري",
    year: "٢٠٢٤",
    client: "مجموعة ضياء العقارية",
    location: "الرياض",
    image: images.commercial1,
    ratio: "landscape",
    excerpt: "توثيق معماري لمساحة ضيافة بالخرسانة والخشب الدافئ.",
    description:
      "مهمة تجارية لتوثيق مساحة ضيافة جديدة. تتبّعنا الضوء على مدار يوم كامل واخترنا ثلاث فترات فقط: صباح ناعم، ظهيرة حادة، ومغيب طويل الظلال.",
    gallery: [images.commercial1, images.product1, images.event1],
  },
  {
    slug: "attar",
    title: "عِطر",
    category: "products",
    categoryAr: "منتجات",
    year: "٢٠٢٥",
    client: "دار عود",
    location: "استوديو نُور",
    image: images.product1,
    ratio: "square",
    excerpt: "تصوير منتج فاخر على حجر رملي بإضاءة نافذة مُقلَّدة.",
    description:
      "أردنا لمعان الزجاج دون بريق صناعي. بُنيت الإضاءة لمحاكاة نافذة واحدة في غرفة حجرية، مع عاكس واحد فقط لضبط الظل تحت القارورة.",
    gallery: [images.product1, images.detail1, images.fashion1],
  },
  {
    slug: "sahra",
    title: "سهرة",
    category: "events",
    categoryAr: "مناسبات",
    year: "٢٠٢٤",
    client: "عائلة الحربي",
    location: "الدرعية",
    image: images.event1,
    ratio: "landscape",
    excerpt: "تغطية وثائقية لسهرة عائلية بضوء الشموع.",
    description:
      "تغطية وثائقية بالكامل، دون أي إضاءة إضافية. سرعات غالق منخفضة تعمّدنا فيها بقاء أثر الحركة، لتبقى الصور أقرب إلى إحساس الليلة لا إلى تفاصيلها.",
    gallery: [images.event1, images.heroWedding, images.detail1],
    hasVideo: true,
  },
];

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  price: string;
  image: string;
  features: string[];
  includes: string[];
  faq: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "weddings",
    title: "تصوير حفلات الزفاف",
    short: "تغطية كاملة لليوم من التحضير حتى آخر رقصة.",
    description:
      "نوثّق يوم الزفاف بأسلوب وثائقي هادئ لا يقاطع اللحظة. نصل مبكرًا، نتعرف على العائلة، ونصوّر التفاصيل الصغيرة التي تصنع ذاكرة اليوم.",
    price: "تبدأ من ١٢٬٠٠٠ ر.س",
    image: images.heroWedding,
    features: ["مصوّران اثنان", "تغطية حتى ١٢ ساعة", "ألبوم مطبوع فاخر", "معرض رقمي خاص"],
    includes: ["جلسة ما قبل الزفاف", "٦٠٠+ صورة معالَجة", "فيلم قصير ٣ دقائق", "تسليم خلال ٣ أسابيع"],
    faq: [
      { q: "كم تستغرق مدة التسليم؟", a: "معرض المعاينة خلال ٧٢ ساعة، والمجموعة الكاملة خلال ثلاثة أسابيع." },
      { q: "هل تسافرون خارج المدينة؟", a: "نعم، داخل المملكة وخارجها مع احتساب تكاليف السفر." },
      { q: "كيف يتم الحجز؟", a: "عربون ٣٠٪ يثبّت التاريخ، والباقي قبل موعد التصوير بأسبوع." },
    ],
  },
  {
    slug: "portrait",
    title: "التصوير الشخصي",
    short: "بورتريه استوديو أو ضوء طبيعي بملامح هادئة.",
    description:
      "جلسة بورتريه مصمّمة حول شخصيتك: نناقش الملابس والمزاج البصري قبل الجلسة، ونصوّر بإيقاع مريح دون استعجال.",
    price: "تبدأ من ٢٬٥٠٠ ر.س",
    image: images.portrait1,
    features: ["جلسة ٩٠ دقيقة", "تنسيق مظهر", "استوديو أو موقع خارجي", "٢٥ صورة معالَجة"],
    includes: ["استشارة تحضيرية", "معرض رقمي", "خيار طباعة أرشيفية", "تسليم خلال ٧ أيام"],
    faq: [
      { q: "ماذا ألبس؟", a: "نرسل دليلًا بصريًا للألوان والقصّات قبل الجلسة بأسبوع." },
      { q: "هل يمكن تصوير العائلة؟", a: "نعم، مع إضافة ٢٠ دقيقة لكل فرد إضافي." },
    ],
  },
  {
    slug: "fashion",
    title: "تصوير الأزياء",
    short: "حملات تحريرية للعلامات والدور المحلية.",
    description:
      "من اللوح المزاجي إلى التسليم النهائي، نبني الحملة مع فريق الإنتاج ونصوّرها بلغة بصرية تليق بالعلامة.",
    price: "تبدأ من ٩٬٠٠٠ ر.س",
    image: images.fashion1,
    features: ["لوح مزاجي وتخطيط", "فريق إنتاج كامل", "استوديو أو موقع", "رخصة استخدام تجاري"],
    includes: ["يوم تصوير كامل", "٤٠ صورة معالَجة", "نسخ للسوشال ميديا", "ملفات بدقة الطباعة"],
    faq: [{ q: "هل توفّرون عارضين؟", a: "نعم، عبر شبكة وكالات شريكة حسب اتجاه الحملة." }],
  },
  {
    slug: "commercial",
    title: "التصوير التجاري",
    short: "توثيق مساحات وعلامات ومشاريع تجارية.",
    description:
      "صور تخدم هوية العلامة: مساحات، فرق عمل، وعمليات تشغيل، بأسلوب نظيف قابل للاستخدام عبر كل القنوات.",
    price: "تبدأ من ٧٬٥٠٠ ر.س",
    image: images.commercial1,
    features: ["زيارة استكشافية", "خطة لقطات معتمدة", "إضاءة احترافية", "رخصة مفتوحة"],
    includes: ["نصف يوم أو يوم كامل", "٣٠ صورة معالَجة", "تسليم بصيغ متعددة", "أرشفة لمدة سنة"],
    faq: [{ q: "هل يشمل التصوير الجوي؟", a: "متاح كإضافة مع تصاريح الطيران اللازمة." }],
  },
  {
    slug: "products",
    title: "تصوير المنتجات",
    short: "صور منتج فاخرة للمتاجر الإلكترونية.",
    description:
      "تصوير منتجات على خلفيات نظيفة أو تركيبات مشهدية، بمعايير موحّدة تسهّل استخدامها في المتجر الإلكتروني.",
    price: "تبدأ من ١٬٨٠٠ ر.س",
    image: images.product1,
    features: ["خلفية بيضاء أو مشهدية", "زوايا متعددة", "معالجة دقيقة", "تسليم سريع"],
    includes: ["حتى ١٥ منتجًا", "٣ لقطات لكل منتج", "قصّ خلفية", "تسليم خلال ٥ أيام"],
    faq: [{ q: "هل تستقبلون المنتجات بالشحن؟", a: "نعم، مع إعادة الشحن بعد انتهاء الجلسة." }],
  },
  {
    slug: "sessions",
    title: "جلسات التصوير",
    short: "جلسات مناسبات صغيرة وخطوبة ومواليد.",
    description:
      "جلسات قصيرة مرنة للمناسبات العائلية الصغيرة، بإعداد بسيط وإيقاع سريع دون التنازل عن الجودة.",
    price: "تبدأ من ١٬٢٠٠ ر.س",
    image: images.detail1,
    features: ["ساعة تصوير", "موقع واحد", "١٥ صورة معالَجة", "مشاركة رقمية"],
    includes: ["تنسيق موعد مرن", "معرض خاص", "تسليم خلال ٤٨ ساعة"],
    faq: [{ q: "هل يمكن التمديد؟", a: "نعم، كل ٣٠ دقيقة إضافية برسوم ثابتة." }],
  },
];

export type Post = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readingTime: string;
  image: string;
  excerpt: string;
  author: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "light-before-sunset",
    title: "الساعة الذهبية ليست ساعة واحدة",
    category: "إضاءة",
    date: "١٢ مايو ٢٠٢٥",
    readingTime: "٦ دقائق قراءة",
    image: images.heroWedding,
    excerpt:
      "لماذا يتغيّر لون الضوء قبل الغروب بأربعين دقيقة، وكيف نخطط ليوم التصوير بناءً على ذلك.",
    author: "خالد النُّعمان",
    body: [
      "أكثر سؤال يصلنا من العرسان: متى نصوّر جلسة الثنائي؟ الإجابة القصيرة أن الوقت المثالي يبدأ قبل الغروب بأربعين دقيقة تقريبًا، لكن هذا الرقم يتغيّر بحسب الموقع والأفق والغبار في الجو.",
      "الضوء في هذه الفترة يفقد حدّته تدريجيًا، فتقصر الظلال وتصبح البشرة أكثر توازنًا. الأهم أن اتجاه الضوء يصبح جانبيًا، وهو ما يمنح الوجه حجمًا ثلاثي الأبعاد بدل الإضاءة المسطّحة.",
      "عمليًا، نضع في جدول اليوم نافذتين: واحدة قبل الغروب بأربعين دقيقة للصور الرئيسية، وأخرى بعد الغروب بعشرين دقيقة للصور الليلية الهادئة التي تعتمد على إضاءة المكان.",
    ],
  },
  {
    slug: "choose-your-photographer",
    title: "كيف تختار مصوّر زفافك؟",
    category: "أعراس",
    date: "٢ أبريل ٢٠٢٥",
    readingTime: "٨ دقائق قراءة",
    image: images.detail1,
    excerpt: "خمسة أسئلة عملية تكشف لك أسلوب المصوّر الحقيقي قبل توقيع العقد.",
    author: "ليان الشمري",
    body: [
      "الصور المنشورة على الحسابات الاجتماعية هي أفضل ما أنتجه المصوّر خلال سنوات. اطلب دائمًا معرضًا كاملًا لحفل واحد من البداية إلى النهاية، فهو المقياس الحقيقي للاتساق.",
      "اسأل عن خطة الطوارئ: ماذا يحدث إن تعطّلت الكاميرا؟ هل توجد نسخة احتياطية فورية للبطاقات؟ هذه التفاصيل تفصل بين محترف وهاوٍ.",
      "أخيرًا، تحدّث مع المصوّر شخصيًا قبل الحجز. ستقضي معه ساعات طويلة في يوم حسّاس، والراحة الشخصية جزء من النتيجة البصرية.",
    ],
  },
  {
    slug: "one-light-portrait",
    title: "بورتريه بمصدر ضوء واحد",
    category: "بورتريه",
    date: "١٨ فبراير ٢٠٢٥",
    readingTime: "٥ دقائق قراءة",
    image: images.portrait1,
    excerpt: "إعداد استوديو بسيط يمكن بناؤه بأقل الأدوات، وينتج صورًا بعمق سينمائي.",
    author: "خالد النُّعمان",
    body: [
      "معظم البورتريهات في سلسلة «وُجوه» صُوّرت بمصدر واحد وصندوق ضوء متوسط، بزاوية ٤٥ درجة وارتفاع أعلى قليلًا من مستوى العين.",
      "السرّ ليس في العدّة بل في المسافة: كلما اقترب الضوء من الوجه أصبح انتقال الظل أنعم واتسع مدى التدرّج الرمادي.",
      "الخلفية الفحمية تمتص الانعكاسات، لذا لا نحتاج إلى فصل الموضوع عنها بضوء خلفي؛ الظل نفسه يقوم بالمهمة.",
    ],
  },
  {
    slug: "print-your-photos",
    title: "لماذا نطبع الصور؟",
    category: "أرشيف",
    date: "٩ يناير ٢٠٢٥",
    readingTime: "٤ دقائق قراءة",
    image: images.commercial1,
    excerpt: "عن الفرق بين ملف رقمي في مجلد منسي وورقة أرشيفية تُلمس باليد.",
    author: "ليان الشمري",
    body: [
      "الملف الرقمي هش: أقراص تتلف، وحسابات تُغلق، ومجلدات تُنسى. الورق الأرشيفي المصنوع من القطن يعيش عقودًا دون أن يبهت.",
      "ننصح دائمًا بطباعة عشر صور فقط من كل مناسبة. العدد القليل يجبرك على الاختيار، والاختيار هو ما يصنع الأرشيف.",
    ],
  },
];

export const testimonials = [
  {
    name: "سارة العتيبي",
    role: "عروس · الرياض",
    image: images.portrait1,
    quote:
      "لم نشعر بوجود كاميرا طوال اليوم، ومع ذلك وصلتنا صور وثّقت كل شيء. الهدوء في التعامل انعكس على الصور نفسها.",
    rating: 5,
  },
  {
    name: "مها الدوسري",
    role: "مديرة إبداعية · دار مَها",
    image: images.fashion1,
    quote:
      "فريق نُور فهم اتجاه الحملة من الاجتماع الأول. النتيجة كانت أنظف وأجرأ مما تخيّلنا في اللوح المزاجي.",
    rating: 5,
  },
  {
    name: "عبدالرحمن الحربي",
    role: "مدير تسويق · مجموعة ضياء",
    image: images.commercial1,
    quote:
      "احترافية في المواعيد والتسليم، وصور استخدمناها في كل قنواتنا لأكثر من سنة دون أن تفقد قيمتها.",
    rating: 5,
  },
];

export const stats = [
  { value: 480, suffix: "+", label: "مشروع مُنجز" },
  { value: 12, suffix: "", label: "سنة خبرة" },
  { value: 260, suffix: "+", label: "عميل" },
  { value: 9, suffix: "", label: "جائزة وتكريم" },
];

export const packages = [
  {
    name: "الباقة الأساسية",
    price: "٦٬٥٠٠",
    note: "للمناسبات الصغيرة",
    features: ["٦ ساعات تغطية", "مصوّر واحد", "٣٠٠ صورة معالَجة", "معرض رقمي خاص", "تسليم خلال ١٤ يومًا"],
    highlight: false,
  },
  {
    name: "الباقة المميّزة",
    price: "١٢٬٠٠٠",
    note: "الأكثر طلبًا",
    features: [
      "١٠ ساعات تغطية",
      "مصوّران",
      "٦٠٠ صورة معالَجة",
      "جلسة ما قبل الزفاف",
      "ألبوم مطبوع ٣٠×٣٠",
      "تسليم خلال ٢١ يومًا",
    ],
    highlight: true,
  },
  {
    name: "باقة الاستوديو",
    price: "١٩٬٥٠٠",
    note: "تغطية شاملة",
    features: [
      "تغطية يومين",
      "ثلاثة مصوّرين",
      "١٠٠٠+ صورة معالَجة",
      "فيلم سينمائي ٥ دقائق",
      "ألبومان مطبوعان",
      "أرشفة سحابية لخمس سنوات",
    ],
    highlight: false,
  },
];

export const products = [
  {
    slug: "print-layl",
    title: "طباعة أرشيفية · ليلٌ ونُور",
    price: "٤٥٠ ر.س",
    category: "طبعات",
    image: images.heroWedding,
    description: "طباعة على ورق قطني أرشيفي ٣١٠ غم، بمقاس ٥٠×٧٠ سم، موقّعة ومرقّمة.",
  },
  {
    slug: "photobook-wujuh",
    title: "كتاب صور · وُجوه",
    price: "٣٢٠ ر.س",
    category: "كتب",
    image: images.portrait1,
    description: "كتاب مصوّر بغلاف قماشي، ١٢٠ صفحة، طباعة ثنائية اللون.",
  },
  {
    slug: "presets-warm",
    title: "حزمة إعدادات · دِفء",
    price: "١٨٠ ر.س",
    category: "تحميلات رقمية",
    image: images.fashion1,
    description: "١٢ إعدادًا للايت روم مستوحاة من لوحة ألوان الاستوديو.",
  },
  {
    slug: "giftcard",
    title: "بطاقة إهداء جلسة تصوير",
    price: "١٬٢٠٠ ر.س",
    category: "بطاقات إهداء",
    image: images.detail1,
    description: "بطاقة إهداء لجلسة تصوير شخصية، صالحة لمدة سنة كاملة.",
  },
];

export const nav = [
  { to: "/", label: "الرئيسية" },
  { to: "/portfolio", label: "الأعمال" },
  { to: "/services", label: "الخدمات" },
  { to: "/about", label: "عن الاستوديو" },
  { to: "/pricing", label: "الباقات" },
  { to: "/journal", label: "المدوّنة" },
  { to: "/shop", label: "المتجر" },
  { to: "/contact", label: "تواصل" },
] as const;
