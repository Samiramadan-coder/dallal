// Legal page content (Terms of Service & Privacy Policy). Mock content until the CMS/API lands.

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "h4"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; variant: "warning" | "danger" | "info"; text: string };

export type LegalSection = {
  id: string;
  title: string;
  content: LegalBlock[];
};

export type LegalDocument = "terms" | "privacy";
type Lang = "ar" | "en";

const p = (text: string): LegalBlock => ({ type: "p", text });
const h4 = (text: string): LegalBlock => ({ type: "h4", text });
const list = (items: string[]): LegalBlock => ({ type: "list", items });
const warning = (text: string): LegalBlock => ({ type: "callout", variant: "warning", text });
const info = (text: string): LegalBlock => ({ type: "callout", variant: "info", text });

export const legalLastUpdated: Record<Lang, string> = {
  ar: "4 نوفمبر 2026",
  en: "November 4, 2026",
};

export const legalEmail = "legal@dallalhoolee.com";

const termsEn: LegalSection[] = [
  {
    id: "platform-role",
    title: "Platform role",
    content: [
      p("Dallal Hoolee is a listings platform. Verified stores list gold, diamonds and watches, and individuals can sell items to stores or on the individual market."),
      p("We are not a party to any sale. We do not take payments, hold money or items, or ship anything. Buyers and sellers agree the price and complete the exchange directly, in person."),
      warning("Inspect every item in person before you pay. For high-value deals, meet at the store."),
    ],
  },
  {
    id: "accounts",
    title: "Accounts",
    content: [
      list([
        "You must be 18 or older to create an account.",
        "One person has one account. Sharing or selling accounts is not allowed.",
        "A store is attached to an account. The account holder is responsible for what the store posts and for its team members.",
      ]),
    ],
  },
  {
    id: "verification",
    title: "Verification",
    content: [
      p("Verification is free. The badge confirms the identity of a person and, for stores, a valid trade licence."),
      info("The badge does not confirm that any item is authentic, or that its karat, weight or condition is as described."),
      p("Verification uses camera capture so we can check that documents are live and belong to you."),
    ],
  },
  {
    id: "who-can-list",
    title: "Who can list what",
    content: [
      h4("Stores"),
      p("Only verified stores can list gold, bullion, diamonds, luxury watches and precious stones."),
      h4("Individual market"),
      p("Individuals can list everyday items such as silver, everyday watches, costume accessories, antiques and collectibles, tools and prayer beads. These rules apply:"),
      list([
        "Each category has a price cap. Listings above the cap are not accepted unless the rules for that category allow a certificate.",
        "Banned terms are blocked. Words that imply gold, diamonds or luxury brands in a category that does not allow them are rejected.",
        "Listings are reviewed before they go live.",
      ]),
      p("If you own gold, diamonds or a luxury watch, use Sell your gold to receive offers from verified stores."),
    ],
  },
  {
    id: "prohibited-items",
    title: "Prohibited items",
    content: [
      p("These are never allowed. Listings are removed and accounts may be suspended or reported to the authorities."),
      list([
        "Stolen or unlawfully obtained items.",
        "Counterfeit items, plated or filled items sold as solid gold, and replica watches.",
        "A wrong karat, weight or description.",
        "Conflict diamonds or stones that break the Kimberley Process.",
        "Watches with altered serial numbers.",
        "Items under a legal dispute or lien.",
        "Anything that is illegal to sell in the listing's country.",
      ]),
    ],
  },
  {
    id: "live-prices",
    title: "Live prices",
    content: [
      p("Prices of gold items are calculated from the live metal price, the item's karat and weight, and the store's making charge."),
      list([
        "Final prices are rounded to the nearest 5 in the country's currency, or to the nearest 1 where that country uses it.",
        "VAT is shown only for stores that are VAT-registered. Stores without VAT registration show no VAT line.",
        "The live price can move between the moment you view an item and the moment you visit the store. A reservation fixes the price you agreed.",
      ]),
    ],
  },
  {
    id: "offers-reservations",
    title: "Offers and reservations",
    content: [
      list([
        "An offer stays open for 48 hours. After that it expires.",
        "A buyer can reserve an item for 2 to 48 hours at the offer price. The store holds the item and the price for that time.",
        "If the reservation ends without a deal, the item goes back on sale at the current price.",
      ]),
    ],
  },
  {
    id: "fees",
    title: "Fees",
    content: [
      list([
        "Buying, browsing, selling on the individual market and verification are free.",
        "Stores pay a subscription. Every verified store starts with a 14-day trial.",
        "Stores can pay to boost listings.",
        "The first subscription can be refunded within 7 days.",
        "Prices are set per country and shown in that country's currency.",
      ]),
      p("We do not charge commission on sales."),
    ],
  },
  {
    id: "reviews",
    title: "Reviews",
    content: [
      p("Only people who completed a confirmed deal with a store can review it. Reviews that are fake, paid for or abusive are removed."),
    ],
  },
  {
    id: "reports-penalties",
    title: "Reports and penalties",
    content: [
      list([
        "3 confirmed reports against an account: a warning.",
        "5 confirmed reports: a 30-day suspension.",
        "A fake karat or a stolen item: a permanent ban, whatever the number of reports.",
      ]),
    ],
  },
  {
    id: "aml",
    title: "AML notice",
    content: [
      warning("In the UAE, stores must report cash payments of AED 55,000 or more to the authorities. Stores are responsible for meeting this duty."),
      p("Other countries have their own reporting rules. Stores must follow the rules of the country where they trade."),
    ],
  },
  {
    id: "governing-law",
    title: "Countries and governing law",
    content: [
      p("Dallal Hoolee is live in the UAE and Saudi Arabia. Kuwait, Qatar, Bahrain and Oman are coming soon."),
      p("A listing is governed by the law of the country it is listed in."),
    ],
  },
  {
    id: "termination",
    title: "Termination",
    content: [
      p("You can close your account at any time. We can suspend or close an account that breaks these Terms. When an account is closed, its listings are removed and open offers end."),
    ],
  },
];

const termsAr: LegalSection[] = [
  {
    id: "platform-role",
    title: "دور المنصة",
    content: [
      p("دلال حولي منصة إعلانات. تعرض المتاجر الموثّقة الذهب والألماس والساعات، ويمكن للأفراد بيع مقتنياتهم للمتاجر أو في سوق الأفراد."),
      p("نحن لسنا طرفًا في أي عملية بيع. لا نستلم مدفوعات ولا نحتفظ بأموال أو مقتنيات ولا نشحن أي شيء. يتفق المشتري والبائع على السعر ويتمّان التبادل مباشرة وجهًا لوجه."),
      warning("افحص كل قطعة بنفسك قبل الدفع. في الصفقات عالية القيمة، التقِ في المتجر."),
    ],
  },
  {
    id: "accounts",
    title: "الحسابات",
    content: [
      list([
        "يجب أن يكون عمرك 18 عامًا أو أكثر لإنشاء حساب.",
        "لكل شخص حساب واحد. لا يُسمح بمشاركة الحسابات أو بيعها.",
        "يرتبط المتجر بحساب. صاحب الحساب مسؤول عمّا ينشره المتجر وعن أعضاء فريقه.",
      ]),
    ],
  },
  {
    id: "verification",
    title: "التوثيق",
    content: [
      p("التوثيق مجاني. تؤكد الشارة هوية الشخص، وللمتاجر ترخيصًا تجاريًا ساريًا."),
      info("لا تؤكد الشارة أصالة أي قطعة، ولا أن عيارها أو وزنها أو حالتها مطابقة للوصف."),
      p("يعتمد التوثيق على التصوير بالكاميرا لنتأكد من أن المستندات حيّة وتخصّك."),
    ],
  },
  {
    id: "who-can-list",
    title: "من يستطيع عرض ماذا",
    content: [
      h4("المتاجر"),
      p("المتاجر الموثّقة وحدها يمكنها عرض الذهب والسبائك والألماس والساعات الفاخرة والأحجار الكريمة."),
      h4("سوق الأفراد"),
      p("يمكن للأفراد عرض القطع اليومية مثل الفضة والساعات العادية وإكسسوارات الزينة والتحف والمقتنيات والأدوات والمسابح. تسري هذه القواعد:"),
      list([
        "لكل فئة حدّ أعلى للسعر. لا تُقبل الإعلانات التي تتجاوز الحدّ إلا إذا سمحت قواعد الفئة بشهادة.",
        "الكلمات المحظورة تُحجب. تُرفض الكلمات التي توحي بالذهب أو الألماس أو العلامات الفاخرة في فئة لا تسمح بها.",
        "تُراجَع الإعلانات قبل نشرها.",
      ]),
      p("إذا كنت تملك ذهبًا أو ألماسًا أو ساعة فاخرة، فاستخدم «بِع ذهبك» لتصلك عروض من المتاجر الموثّقة."),
    ],
  },
  {
    id: "prohibited-items",
    title: "القطع المحظورة",
    content: [
      p("هذه القطع ممنوعة دائمًا. تُحذف الإعلانات وقد تُعلَّق الحسابات أو يُبلَّغ عنها للجهات المختصة."),
      list([
        "القطع المسروقة أو المحصَّلة بطريقة غير قانونية.",
        "القطع المقلّدة، والمطلية أو المحشوّة التي تُباع على أنها ذهب خالص، والساعات المقلّدة.",
        "عيار أو وزن أو وصف غير صحيح.",
        "ألماس الصراعات أو الأحجار المخالفة لعملية كيمبرلي.",
        "الساعات ذات الأرقام التسلسلية المعدّلة.",
        "القطع المتنازع عليها قانونيًا أو المرهونة.",
        "أي شيء يُمنع بيعه قانونًا في بلد الإعلان.",
      ]),
    ],
  },
  {
    id: "live-prices",
    title: "الأسعار المباشرة",
    content: [
      p("تُحسب أسعار قطع الذهب من سعر المعدن المباشر وعيار القطعة ووزنها وأجرة صناعة المتجر."),
      list([
        "تُقرَّب الأسعار النهائية إلى أقرب 5 بعملة البلد، أو إلى أقرب 1 في البلدان التي تعتمد ذلك.",
        "تظهر ضريبة القيمة المضافة للمتاجر المسجّلة فيها فقط. المتاجر غير المسجّلة لا يظهر لديها سطر ضريبة.",
        "قد يتحرك السعر المباشر بين لحظة مشاهدتك للقطعة ولحظة زيارتك للمتجر. الحجز يثبّت السعر الذي اتفقتم عليه.",
      ]),
    ],
  },
  {
    id: "offers-reservations",
    title: "العروض والحجوزات",
    content: [
      list([
        "يبقى العرض مفتوحًا 48 ساعة، ثم ينتهي.",
        "يمكن للمشتري حجز قطعة من ساعتين إلى 48 ساعة بسعر العرض. يحتفظ المتجر بالقطعة والسعر خلال هذه المدة.",
        "إذا انتهى الحجز دون صفقة، تعود القطعة للبيع بالسعر الحالي.",
      ]),
    ],
  },
  {
    id: "fees",
    title: "الرسوم",
    content: [
      list([
        "الشراء والتصفح والبيع في سوق الأفراد والتوثيق مجانية.",
        "تدفع المتاجر اشتراكًا. يبدأ كل متجر موثّق بتجربة مجانية لمدة 14 يومًا.",
        "يمكن للمتاجر الدفع لتمييز إعلاناتها.",
        "يمكن استرداد أول اشتراك خلال 7 أيام.",
        "تُحدَّد الأسعار لكل بلد وتُعرض بعملته.",
      ]),
      p("لا نتقاضى أي عمولة على المبيعات."),
    ],
  },
  {
    id: "reviews",
    title: "التقييمات",
    content: [
      p("وحدهم من أتمّوا صفقة مؤكدة مع متجر يمكنهم تقييمه. تُحذف التقييمات المزيفة أو المدفوعة أو المسيئة."),
    ],
  },
  {
    id: "reports-penalties",
    title: "البلاغات والعقوبات",
    content: [
      list([
        "3 بلاغات مؤكدة على حساب: إنذار.",
        "5 بلاغات مؤكدة: تعليق لمدة 30 يومًا.",
        "عيار مزيّف أو قطعة مسروقة: حظر دائم مهما كان عدد البلاغات.",
      ]),
    ],
  },
  {
    id: "aml",
    title: "إشعار مكافحة غسل الأموال",
    content: [
      warning("في الإمارات، يجب على المتاجر إبلاغ الجهات المختصة عن المدفوعات النقدية بقيمة 55,000 د.إ أو أكثر. المتاجر مسؤولة عن الالتزام بذلك."),
      p("لدى البلدان الأخرى قواعد إبلاغ خاصة بها. يجب على المتاجر الالتزام بقواعد البلد الذي تعمل فيه."),
    ],
  },
  {
    id: "governing-law",
    title: "البلدان والقانون الواجب التطبيق",
    content: [
      p("دلال حولي متاح حاليًا في الإمارات والسعودية. الكويت وقطر والبحرين وعُمان قريبًا."),
      p("يخضع الإعلان لقانون البلد الذي نُشر فيه."),
    ],
  },
  {
    id: "termination",
    title: "إنهاء الحساب",
    content: [
      p("يمكنك إغلاق حسابك في أي وقت. ويحق لنا تعليق أو إغلاق أي حساب يخالف هذه الشروط. عند إغلاق الحساب تُحذف إعلاناته وتنتهي العروض المفتوحة."),
    ],
  },
];

const privacyEn: LegalSection[] = [
  {
    id: "data-collected",
    title: "What we collect",
    content: [
      list([
        "Account details: name, phone number, email and country.",
        "Verification data: ID document images, camera captures and, for stores, the trade licence.",
        "Activity: listings, offers, messages and reviews.",
      ]),
    ],
  },
  {
    id: "verification-data",
    title: "Verification data",
    content: [
      p("Verification data is encrypted. Only the verification team can see it. Other users see only the badge, never your documents."),
    ],
  },
  {
    id: "retention",
    title: "How long we keep data",
    content: [
      p("We keep account data while your account is open. Verification documents are kept only as long as the law requires, then deleted. When you close your account we delete your personal data, except records we must keep by law."),
    ],
  },
  {
    id: "your-data",
    title: "Download or delete my data",
    content: [
      p("You can download a copy of your data or ask us to delete it from your account settings, or by contacting support."),
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    content: [
      p("We use cookies to keep you signed in and to remember your country and preferences. You can block cookies in your browser, but some parts of the site may stop working."),
    ],
  },
];

const privacyAr: LegalSection[] = [
  {
    id: "data-collected",
    title: "ما الذي نجمعه",
    content: [
      list([
        "بيانات الحساب: الاسم ورقم الجوال والبريد الإلكتروني والبلد.",
        "بيانات التوثيق: صور وثائق الهوية ولقطات الكاميرا، وللمتاجر الترخيص التجاري.",
        "النشاط: الإعلانات والعروض والرسائل والتقييمات.",
      ]),
    ],
  },
  {
    id: "verification-data",
    title: "بيانات التوثيق",
    content: [
      p("بيانات التوثيق مشفّرة، ولا يراها إلا فريق التوثيق. يرى المستخدمون الآخرون الشارة فقط ولا يرون مستنداتك أبدًا."),
    ],
  },
  {
    id: "retention",
    title: "مدة الاحتفاظ بالبيانات",
    content: [
      p("نحتفظ ببيانات الحساب ما دام حسابك مفتوحًا. تُحفظ مستندات التوثيق للمدة التي يتطلبها القانون فقط ثم تُحذف. عند إغلاق حسابك نحذف بياناتك الشخصية، باستثناء السجلات التي يوجب القانون الاحتفاظ بها."),
    ],
  },
  {
    id: "your-data",
    title: "تنزيل بياناتي أو حذفها",
    content: [
      p("يمكنك تنزيل نسخة من بياناتك أو طلب حذفها من إعدادات حسابك، أو بالتواصل مع الدعم."),
    ],
  },
  {
    id: "cookies",
    title: "ملفات تعريف الارتباط",
    content: [
      p("نستخدم ملفات تعريف الارتباط لإبقائك مسجّل الدخول ولتذكّر بلدك وتفضيلاتك. يمكنك حظرها من المتصفح، لكن قد تتوقف بعض أجزاء الموقع عن العمل."),
    ],
  },
];

export const legalContent: Record<Lang, Record<LegalDocument, LegalSection[]>> = {
  ar: { terms: termsAr, privacy: privacyAr },
  en: { terms: termsEn, privacy: privacyEn },
};
