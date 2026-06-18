import { SupportProgram } from "../types";

export const supportPrograms: SupportProgram[] = [
  {
    id: "kobe-childcare-benefits",
    titleJa: "子育ての助成・手当",
    titleEn: "Childcare Subsidies and Allowances",
    category: "cash",
    region: "神戸市",
    sourceUrl: "https://www.city.kobe.lg.jp/kosodate/index.html",
    organization: "神戸市",
    summaryJa:
      "神戸市の子育てページから、妊娠・出産、子ども、学齢期に関する助成や手当を確認できます。",
    summaryEn:
      "Kobe City's childcare page links to subsidies and allowances for pregnancy, childbirth, children, and school-age support.",
    eligibilityJa:
      "神戸市に住み、子どもがいる家庭は、対象となる制度が見つかる可能性があります。",
    eligibilityEn:
      "Households living in Kobe City with children may find relevant programs.",
    benefitJa: "手当、助成、相談先など。制度により内容が異なります。",
    benefitEn: "Allowances, subsidies, and consultation services. Details vary by program.",
    deadline: null,
    requiredDocumentsJa: ["制度ごとの申請書", "本人確認書類", "子どもや世帯の状況が分かる書類"],
    requiredDocumentsEn: [
      "Program-specific application form",
      "ID document",
      "Documents showing child or household status"
    ],
    applicationMethodJa: "公式ページから該当する制度を選び、窓口またはオンライン申請を確認します。",
    applicationMethodEn:
      "Choose the relevant program on the official page and check counter or online application details.",
    tags: ["child_support", "cash_benefit", "children"],
    updatedAt: "2026-06-18"
  },
  {
    id: "kobe-support-search",
    titleJa: "神戸市 支援制度まとめ",
    titleEn: "Kobe City Support Program Search",
    category: "consultation",
    region: "神戸市",
    sourceUrl: "https://www.city.kobe.lg.jp/shien_topix.html",
    organization: "神戸市",
    summaryJa:
      "神戸市が行う支援制度を、個人向け・事業者向けに分けて検索できる案内ページです。",
    summaryEn:
      "A Kobe City page that guides residents to search support programs for individuals and businesses.",
    eligibilityJa:
      "神戸市に住む人は、子育て、住まい、健康などのカテゴリから関係する制度を探せる可能性があります。",
    eligibilityEn:
      "Kobe City residents may be able to search relevant programs by categories such as childcare, housing, and health.",
    benefitJa: "支援制度や相談窓口の検索",
    benefitEn: "Search for support programs and consultation counters",
    deadline: null,
    requiredDocumentsJa: ["制度により異なります"],
    requiredDocumentsEn: ["Varies by program"],
    applicationMethodJa: "スマートこうべの個人向けページから条件に合う制度を検索します。",
    applicationMethodEn:
      "Use the Smart Kobe individual support page to search for matching programs.",
    tags: ["consultation", "child_support", "housing", "medical_subsidy"],
    updatedAt: "2026-06-18"
  },
  {
    id: "kobe-single-parent-support",
    titleJa: "ひとり親家庭支援",
    titleEn: "Single-Parent Family Support",
    category: "childcare",
    region: "神戸市",
    sourceUrl: "https://www.city.kobe.lg.jp/kosodate/index.html",
    organization: "神戸市",
    summaryJa:
      "神戸市の子育てページには、相談・窓口・施設の中に、ひとり親家庭支援の案内があります。",
    summaryEn:
      "Kobe City's childcare page includes guidance for single-parent family support under consultation and service counters.",
    eligibilityJa:
      "神戸市に住むひとり親家庭は、相談や支援制度の対象となる可能性があります。",
    eligibilityEn:
      "Single-parent households living in Kobe City may be eligible for consultation and support programs.",
    benefitJa: "相談、生活支援、制度案内など。詳細は公式ページで確認してください。",
    benefitEn:
      "Consultation, daily life support, and program guidance. Check the official page for details.",
    deadline: null,
    requiredDocumentsJa: ["相談内容が分かるメモ", "本人確認書類", "制度により追加書類"],
    requiredDocumentsEn: [
      "Notes about your consultation",
      "ID document",
      "Additional documents depending on the program"
    ],
    applicationMethodJa: "公式ページのひとり親家庭支援から、相談先や申請先を確認します。",
    applicationMethodEn:
      "Check the single-parent support section on the official page for consultation or application counters.",
    tags: ["single_parent", "child_support", "consultation", "low_income"],
    updatedAt: "2026-06-18"
  },
  {
    id: "kobe-foreign-language",
    titleJa: "外国人住民向け生活情報・相談",
    titleEn: "Living Information and Consultation for Foreign Residents",
    category: "foreign",
    region: "神戸市",
    sourceUrl: "https://www.city.kobe.lg.jp/foreignlanguage/index.html",
    organization: "神戸市 / KICC",
    summaryJa:
      "神戸市は外国語ページを用意しており、KICCの生活ガイドや相談窓口へ案内しています。",
    summaryEn:
      "Kobe City provides foreign-language pages and links to KICC living guides and consultation services.",
    eligibilityJa:
      "神戸市に住む外国人住民や、日本語での手続きに不安がある人が利用できる可能性があります。",
    eligibilityEn:
      "Foreign residents in Kobe City or people who need language help with procedures may be able to use these services.",
    benefitJa: "多言語の生活情報、相談、関係窓口への案内",
    benefitEn: "Multilingual living information, consultation, and referrals",
    deadline: null,
    requiredDocumentsJa: ["相談内容が分かるメモ", "在留カードが必要な場合があります"],
    requiredDocumentsEn: [
      "Notes about your consultation",
      "Residence card may be needed"
    ],
    applicationMethodJa: "神戸市の外国語ページまたはKICCの生活相談ページから確認します。",
    applicationMethodEn:
      "Check Kobe City's foreign-language page or KICC's daily life consultation page.",
    tags: ["foreign_resident", "consultation", "language_support"],
    updatedAt: "2026-06-18"
  }
];
