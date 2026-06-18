import { SupportProgram } from "../types";

export const supportPrograms: SupportProgram[] = [
  {
    id: "kobe-childcare-benefits",
    titleJa: "神戸市の子育て支援情報",
    titleEn: "Kobe City Childcare Support Information",
    category: "childcare",
    region: "神戸市",
    sourceUrl: "https://www.city.kobe.lg.jp/kosodate/index.html",
    organization: "神戸市",
    summaryJa:
      "妊娠・出産、子どもの医療、保育、学校、子育て相談など、子どもがいる家庭向けの情報を確認できます。",
    summaryEn:
      "Kobe City's childcare page links to pregnancy, childbirth, child medical care, childcare, school, and consultation information.",
    eligibilityJa:
      "神戸市に住んでいて、妊娠中の人、子どもを育てている家庭、子育てについて相談したい人は関係する制度が見つかる可能性があります。",
    eligibilityEn:
      "People living in Kobe City who are pregnant, raising children, or need childcare consultation may find relevant programs.",
    benefitJa:
      "子育てに関する手当、助成、相談窓口、保育や学校の案内などを確認できます。制度ごとに条件が異なります。",
    benefitEn:
      "Information about allowances, subsidies, consultation counters, childcare, and school support. Conditions vary by program.",
    deadline: null,
    requiredDocumentsJa: [
      "制度ごとの申請書",
      "本人確認書類",
      "子どもや世帯の状況が分かる書類"
    ],
    requiredDocumentsEn: [
      "Program-specific application form",
      "ID document",
      "Documents showing child or household status"
    ],
    applicationMethodJa:
      "公式ページから関係する制度を選び、区役所などの窓口、郵送、オンライン申請の有無を確認してください。",
    applicationMethodEn:
      "Choose the relevant program on the official page and check counter, postal, or online application details.",
    tags: ["child_support", "cash_benefit", "children", "school", "education"],
    updatedAt: "2026-06-18"
  },
  {
    id: "kobe-support-search",
    titleJa: "神戸市の支援制度まとめ",
    titleEn: "Kobe City Support Program Search",
    category: "consultation",
    region: "神戸市",
    sourceUrl: "https://www.city.kobe.lg.jp/shien_topix.html",
    organization: "神戸市",
    summaryJa:
      "神戸市が行う支援制度を、個人向け・事業者向けに分けて探せる案内ページです。",
    summaryEn:
      "A Kobe City page that guides residents to search support programs for individuals and businesses.",
    eligibilityJa:
      "神戸市に住む人は、子育て、住まい、健康、生活などのカテゴリから関係する制度を探せる可能性があります。",
    eligibilityEn:
      "Kobe City residents may be able to search relevant programs by categories such as childcare, housing, health, and daily living.",
    benefitJa: "支援制度や相談窓口の検索",
    benefitEn: "Search for support programs and consultation counters",
    deadline: null,
    requiredDocumentsJa: ["制度により異なります"],
    requiredDocumentsEn: ["Varies by program"],
    applicationMethodJa:
      "スマートこうべなどの個人向けページから、条件に合う制度を検索してください。",
    applicationMethodEn:
      "Use the Smart Kobe individual support page to search for matching programs.",
    tags: [
      "general_support",
      "consultation",
      "housing",
      "medical_subsidy",
      "emergency"
    ],
    updatedAt: "2026-06-18"
  },
  {
    id: "kobe-single-parent-support",
    titleJa: "神戸市 ひとり親家庭支援",
    titleEn: "Kobe City Single-Parent Family Support",
    category: "single_parent",
    region: "神戸市",
    sourceUrl: "https://www.city.kobe.lg.jp/a32986/kosodate/shien/family/index.html",
    organization: "神戸市",
    summaryJa:
      "ひとり親家庭向けに、相談窓口、手当、住まい、仕事、資格取得、子どもの学費、医療費助成などをまとめた公式ページです。",
    summaryEn:
      "Kobe City's official page for single-parent households, including consultation, allowances, housing, work, training, education costs, and medical subsidies.",
    eligibilityJa:
      "神戸市に住み、20歳未満の子どもを扶養しているひとり親家庭などは、制度ごとの条件に合えば利用できる可能性があります。",
    eligibilityEn:
      "Single-parent households in Kobe City supporting children under 20 may qualify depending on each program's conditions.",
    benefitJa:
      "児童扶養手当、住まいの支援、就業相談、資格取得支援、進学費用、医療費助成、相談窓口などを確認できます。",
    benefitEn:
      "Includes child rearing allowance, housing support, work consultation, training support, school cost support, medical subsidies, and consultation counters.",
    deadline: null,
    requiredDocumentsJa: [
      "相談内容が分かるメモ",
      "本人確認書類",
      "子どもや世帯の状況が分かる書類",
      "制度により追加書類"
    ],
    requiredDocumentsEn: [
      "Notes about your consultation",
      "ID document",
      "Documents showing child or household status",
      "Additional documents depending on the program"
    ],
    applicationMethodJa:
      "公式ページの「手当・年金」「住まい」「仕事」「子どもの進学」など、困りごとに近い項目から申請先や相談先を確認してください。",
    applicationMethodEn:
      "Use the official page sections for allowances, housing, work, and school costs to check the relevant counter or application route.",
    tags: [
      "single_parent",
      "child_support",
      "consultation",
      "low_income",
      "housing",
      "rent",
      "school",
      "education",
      "cash_benefit",
      "loan"
    ],
    updatedAt: "2026-06-18"
  },
  {
    id: "kobe-disability-benefits",
    titleJa: "神戸市 障害者（児）の手当・給付金",
    titleEn: "Kobe City Allowances and Benefits for People and Children with Disabilities",
    category: "disability",
    region: "神戸市",
    sourceUrl:
      "https://www.city.kobe.lg.jp/a40792/kenko/handicap/seikatsujiritsu/keizaishien/s063.html",
    organization: "神戸市",
    summaryJa:
      "障がいのある子どもや大人、その家族が確認できる手当・給付金の案内ページです。",
    summaryEn:
      "A Kobe City page about allowances and benefits for children and adults with disabilities and their families.",
    eligibilityJa:
      "障がいのある本人、障がいのある子どもを養育している人、または重度の障がいがある人を介護している人は対象となる可能性があります。",
    eligibilityEn:
      "People with disabilities, guardians raising children with disabilities, or caregivers of people with severe disabilities may qualify.",
    benefitJa:
      "特別児童扶養手当、障害児福祉手当、特別障害者手当、重度心身障害者介護手当などを確認できます。所得制限や障がいの程度などの条件があります。",
    benefitEn:
      "Includes special child rearing allowance, disabled child welfare allowance, special disability allowance, and severe disability caregiver allowance. Income and disability-level conditions apply.",
    deadline: null,
    requiredDocumentsJa: [
      "申請書",
      "診断書または障害者手帳など",
      "本人確認書類",
      "振込先が分かる書類"
    ],
    requiredDocumentsEn: [
      "Application form",
      "Medical certificate or disability certificate",
      "ID document",
      "Bank account document"
    ],
    applicationMethodJa:
      "住んでいる区の区役所・支所の保健福祉課で、対象となる手当や必要書類を確認してください。",
    applicationMethodEn:
      "Check eligible allowances and required documents at the health and welfare section of your ward office or branch office.",
    tags: ["disability_support", "cash_benefit", "caregiving", "low_income"],
    updatedAt: "2026-06-18"
  },
  {
    id: "kobe-foreign-language",
    titleJa: "神戸市 外国人住民向け生活情報・相談",
    titleEn: "Kobe City Living Information and Consultation for Foreign Residents",
    category: "foreign",
    region: "神戸市",
    sourceUrl: "https://www.city.kobe.lg.jp/foreignlanguage/index.html",
    organization: "神戸市 / KICC",
    summaryJa:
      "神戸市の外国語ページや、KICCの生活ガイド・相談窓口への案内を確認できます。",
    summaryEn:
      "Kobe City provides foreign-language pages and links to KICC living guides and consultation services.",
    eligibilityJa:
      "神戸市に住む外国人住民や、日本語での手続きに不安がある人が利用できる可能性があります。",
    eligibilityEn:
      "Foreign residents in Kobe City or people who need language help with procedures may be able to use these services.",
    benefitJa: "多言語の生活情報、相談、関係窓口への案内",
    benefitEn: "Multilingual living information, consultation, and referrals",
    deadline: null,
    requiredDocumentsJa: [
      "相談内容が分かるメモ",
      "在留カードが必要な場合があります"
    ],
    requiredDocumentsEn: [
      "Notes about your consultation",
      "Residence card may be needed"
    ],
    applicationMethodJa:
      "神戸市の外国語ページ、またはKICCの生活相談ページから相談方法を確認してください。",
    applicationMethodEn:
      "Check Kobe City's foreign-language page or KICC's daily life consultation page.",
    tags: ["foreign_resident", "consultation", "language_support", "emergency"],
    updatedAt: "2026-06-18"
  }
];
