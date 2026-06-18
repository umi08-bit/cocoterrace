import { SupportProgram } from "../types";

export const supportPrograms: SupportProgram[] = [
  {
    id: "hyogo-health-welfare",
    titleJa: "兵庫県 健康・医療・福祉の相談情報",
    titleEn: "Hyogo Health, Medical, and Welfare Information",
    category: "consultation",
    region: "兵庫県",
    sourceUrl: "https://web.pref.hyogo.lg.jp/health/index.html",
    organization: "兵庫県",
    summaryJa:
      "兵庫県の健康、医療、福祉に関する情報をまとめて確認できる公式ページです。",
    summaryEn:
      "Hyogo Prefecture's official page for health, medical, and welfare information.",
    eligibilityJa:
      "兵庫県内に住む人で、福祉、医療、生活、介護、障がいなどについて相談先を探したい人に関係する可能性があります。",
    eligibilityEn:
      "People living in Hyogo who need information about welfare, medical care, daily living, caregiving, or disability support may find relevant guidance.",
    benefitJa:
      "県の福祉情報や相談先、関係ページへの案内を確認できます。市町の制度とあわせて確認してください。",
    benefitEn:
      "You can check prefectural welfare information, consultation contacts, and related pages. Also check your city programs.",
    deadline: null,
    requiredDocumentsJa: ["相談内容が分かるメモ", "制度により必要書類が異なります"],
    requiredDocumentsEn: ["Notes about your concern", "Documents vary by program"],
    applicationMethodJa:
      "公式ページから関係する分野を選び、県または市町の窓口を確認してください。",
    applicationMethodEn:
      "Choose the relevant field on the official page and check the prefectural or city counter.",
    tags: ["general_support", "consultation", "caregiving", "disability_support"],
    updatedAt: "2026-06-18"
  },
  {
    id: "hyogo-foreign-language",
    titleJa: "兵庫県 外国語・多文化共生情報",
    titleEn: "Hyogo Foreign Language and Multicultural Information",
    category: "foreign",
    region: "兵庫県",
    sourceUrl: "https://web.pref.hyogo.lg.jp/fl/index.html",
    organization: "兵庫県",
    summaryJa:
      "兵庫県の外国語ページです。日本語で行政情報を読むのが難しい人が、外国語ページや関係情報を探せます。",
    summaryEn:
      "Hyogo Prefecture's foreign language page for residents who need information in languages other than Japanese.",
    eligibilityJa:
      "兵庫県内に住む外国人住民や、日本語での手続きに不安がある人が利用できる可能性があります。",
    eligibilityEn:
      "Foreign residents in Hyogo or people who need language help with procedures may be able to use this information.",
    benefitJa: "外国語ページ、生活情報、相談先への案内",
    benefitEn: "Foreign language pages, living information, and consultation guidance",
    deadline: null,
    requiredDocumentsJa: ["相談内容が分かるメモ", "在留カードが必要な場合があります"],
    requiredDocumentsEn: ["Notes about your consultation", "Residence card may be needed"],
    applicationMethodJa:
      "公式ページから必要な言語や相談先を確認してください。",
    applicationMethodEn:
      "Check the official page for languages and consultation contacts.",
    tags: ["foreign_resident", "language_support", "consultation", "emergency"],
    updatedAt: "2026-06-18"
  },
  {
    id: "kobe-childcare-benefits",
    titleJa: "神戸市 子育て支援情報",
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
      "神戸市に住んでいて、妊娠中の人、子どもを育てている家庭、子育てについて相談したい人に関係する可能性があります。",
    eligibilityEn:
      "People living in Kobe City who are pregnant, raising children, or need childcare consultation may find relevant programs.",
    benefitJa:
      "子育てに関する手当、助成、相談窓口、保育や学校の案内などを確認できます。",
    benefitEn:
      "Information about allowances, subsidies, consultation counters, childcare, and school support.",
    deadline: null,
    requiredDocumentsJa: ["制度ごとの申請書", "本人確認書類", "子どもや世帯の状況が分かる書類"],
    requiredDocumentsEn: ["Program-specific form", "ID document", "Documents showing child or household status"],
    applicationMethodJa:
      "公式ページから関係する制度を選び、窓口、郵送、オンライン申請の有無を確認してください。",
    applicationMethodEn:
      "Choose the relevant program on the official page and check the application route.",
    tags: ["child_support", "cash_benefit", "children", "school", "education"],
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
    requiredDocumentsJa: ["相談内容が分かるメモ", "本人確認書類", "子どもや世帯の状況が分かる書類"],
    requiredDocumentsEn: ["Notes about your consultation", "ID document", "Documents showing child or household status"],
    applicationMethodJa:
      "公式ページの「手当・年金」「住まい」「仕事」「子どもの進学」などから相談先や申請先を確認してください。",
    applicationMethodEn:
      "Use the official page sections for allowances, housing, work, and school costs to check the relevant counter.",
    tags: ["single_parent", "child_support", "consultation", "low_income", "housing", "rent", "school", "education", "cash_benefit", "loan"],
    updatedAt: "2026-06-18"
  },
  {
    id: "kobe-disability-benefits",
    titleJa: "神戸市 障害者（児）の手当・給付金",
    titleEn: "Kobe City Allowances and Benefits for People and Children with Disabilities",
    category: "disability",
    region: "神戸市",
    sourceUrl: "https://www.city.kobe.lg.jp/a40792/kenko/handicap/seikatsujiritsu/keizaishien/s063.html",
    organization: "神戸市",
    summaryJa:
      "障がいのある子どもや大人、その家族が確認できる手当・給付金の案内ページです。",
    summaryEn:
      "A Kobe City page about allowances and benefits for children and adults with disabilities and their families.",
    eligibilityJa:
      "障がいのある本人、障がいのある子どもを養育している人、重度の障がいがある人を介護している人は対象となる可能性があります。",
    eligibilityEn:
      "People with disabilities, guardians raising children with disabilities, or caregivers of people with severe disabilities may qualify.",
    benefitJa:
      "特別児童扶養手当、障害児福祉手当、特別障害者手当、重度心身障害者介護手当などを確認できます。",
    benefitEn:
      "Includes special child rearing allowance, disabled child welfare allowance, special disability allowance, and severe disability caregiver allowance.",
    deadline: null,
    requiredDocumentsJa: ["申請書", "診断書または障害者手帳など", "本人確認書類", "振込先が分かる書類"],
    requiredDocumentsEn: ["Application form", "Medical certificate or disability certificate", "ID document", "Bank account document"],
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
    requiredDocumentsJa: ["相談内容が分かるメモ", "在留カードが必要な場合があります"],
    requiredDocumentsEn: ["Notes about your consultation", "Residence card may be needed"],
    applicationMethodJa:
      "神戸市の外国語ページ、またはKICCの生活相談ページから相談方法を確認してください。",
    applicationMethodEn:
      "Check Kobe City's foreign-language page or KICC's daily life consultation page.",
    tags: ["foreign_resident", "consultation", "language_support", "emergency"],
    updatedAt: "2026-06-18"
  },
  {
    id: "amagasaki-childcare",
    titleJa: "尼崎市 子育て支援",
    titleEn: "Amagasaki City Childcare Support",
    category: "childcare",
    region: "尼崎市",
    sourceUrl: "https://www.city.amagasaki.hyogo.jp/kosodate-kyoiku/kosodate/index.html",
    organization: "尼崎市",
    summaryJa:
      "尼崎市の子育て情報ページです。児童手当、子育て相談、保育、ひとり親家庭支援などの入口があります。",
    summaryEn:
      "Amagasaki City's childcare page with links to child allowance, consultation, childcare, and single-parent support.",
    eligibilityJa:
      "尼崎市に住む子育て家庭、妊娠中の人、子どもの相談先を探したい人に関係する可能性があります。",
    eligibilityEn:
      "Families raising children, pregnant people, and people looking for childcare consultation in Amagasaki may find relevant information.",
    benefitJa:
      "児童手当、子どもの健康、子育て相談、保育、一時預かり、ひとり親家庭支援などを確認できます。",
    benefitEn:
      "Information about child allowance, child health, consultation, childcare, temporary care, and single-parent support.",
    deadline: null,
    requiredDocumentsJa: ["制度ごとの申請書", "本人確認書類", "子どもや世帯の状況が分かる書類"],
    requiredDocumentsEn: ["Program-specific form", "ID document", "Documents showing child or household status"],
    applicationMethodJa:
      "公式ページの該当項目から、申請先や相談窓口を確認してください。",
    applicationMethodEn:
      "Open the relevant item on the official page and check the application or consultation counter.",
    tags: ["child_support", "children", "school", "education", "single_parent", "consultation"],
    updatedAt: "2026-06-18"
  },
  {
    id: "amagasaki-disability",
    titleJa: "尼崎市 障害者支援",
    titleEn: "Amagasaki City Disability Support",
    category: "disability",
    region: "尼崎市",
    sourceUrl: "https://www.city.amagasaki.hyogo.jp/kurashi/syogaisya/index.html",
    organization: "尼崎市",
    summaryJa:
      "尼崎市の障害者支援ページです。障がいのある人や家族が利用できる制度や相談先を探せます。",
    summaryEn:
      "Amagasaki City's disability support page for people with disabilities and their families.",
    eligibilityJa:
      "尼崎市に住む障がいのある人、障がいのある子どもを育てている家庭、介護している家族に関係する可能性があります。",
    eligibilityEn:
      "People with disabilities in Amagasaki, families raising children with disabilities, and caregivers may find relevant support.",
    benefitJa:
      "障害者手帳、福祉サービス、手当、相談先などの情報を確認できます。",
    benefitEn:
      "Information about disability certificates, welfare services, allowances, and consultation counters.",
    deadline: null,
    requiredDocumentsJa: ["申請書", "障害者手帳または診断書など", "本人確認書類"],
    requiredDocumentsEn: ["Application form", "Disability certificate or medical certificate", "ID document"],
    applicationMethodJa:
      "公式ページから関係する制度を選び、窓口や必要書類を確認してください。",
    applicationMethodEn:
      "Choose the relevant program on the official page and check the counter and required documents.",
    tags: ["disability_support", "caregiving", "cash_benefit", "consultation"],
    updatedAt: "2026-06-18"
  },
  {
    id: "nishinomiya-childcare",
    titleJa: "西宮市 子育て・教育",
    titleEn: "Nishinomiya City Childcare and Education",
    category: "childcare",
    region: "西宮市",
    sourceUrl: "https://www.nishi.or.jp/kosodate/index.html",
    organization: "西宮市",
    summaryJa:
      "西宮市の子育て・教育ページです。妊娠・出産、子育て、学校、相談に関する情報を確認できます。",
    summaryEn:
      "Nishinomiya City's childcare and education page with information about pregnancy, childcare, school, and consultation.",
    eligibilityJa:
      "西宮市に住む子育て家庭、妊娠中の人、学校や子どもの相談先を探したい人に関係する可能性があります。",
    eligibilityEn:
      "Families raising children, pregnant people, and people seeking school or childcare consultation in Nishinomiya may find relevant information.",
    benefitJa:
      "子育て、教育、相談、学校に関する公式情報を確認できます。",
    benefitEn:
      "Official information about childcare, education, consultation, and school support.",
    deadline: null,
    requiredDocumentsJa: ["制度により異なります", "本人確認書類", "子どもの状況が分かる書類"],
    requiredDocumentsEn: ["Varies by program", "ID document", "Documents showing child status"],
    applicationMethodJa:
      "公式ページの該当項目から制度や窓口を確認してください。",
    applicationMethodEn:
      "Use the relevant section of the official page to check programs and counters.",
    tags: ["child_support", "children", "school", "education", "consultation"],
    updatedAt: "2026-06-18"
  },
  {
    id: "nishinomiya-health-welfare",
    titleJa: "西宮市 健康・福祉",
    titleEn: "Nishinomiya City Health and Welfare",
    category: "consultation",
    region: "西宮市",
    sourceUrl: "https://www.nishi.or.jp/kenko/index.html",
    organization: "西宮市",
    summaryJa:
      "西宮市の健康・福祉ページです。福祉、介護、障がい、健康に関する情報を探せます。",
    summaryEn:
      "Nishinomiya City's health and welfare page for welfare, caregiving, disability, and health information.",
    eligibilityJa:
      "西宮市に住む人で、福祉、介護、障がい、生活や健康の相談先を探したい人に関係する可能性があります。",
    eligibilityEn:
      "Nishinomiya residents seeking welfare, caregiving, disability, daily living, or health support may find relevant information.",
    benefitJa:
      "福祉制度、相談先、介護や障がいに関する情報を確認できます。",
    benefitEn:
      "Information about welfare programs, consultation counters, caregiving, and disability support.",
    deadline: null,
    requiredDocumentsJa: ["相談内容が分かるメモ", "制度により必要書類が異なります"],
    requiredDocumentsEn: ["Notes about your concern", "Documents vary by program"],
    applicationMethodJa:
      "公式ページから関係する分野を選び、窓口や申請方法を確認してください。",
    applicationMethodEn:
      "Choose the relevant field on the official page and check the counter or application method.",
    tags: ["general_support", "consultation", "caregiving", "disability_support", "low_income"],
    updatedAt: "2026-06-18"
  },
  {
    id: "akashi-mother-child-health",
    titleJa: "明石市 母と子の健康・子育て相談",
    titleEn: "Akashi City Mother and Child Health Consultation",
    category: "childcare",
    region: "明石市",
    sourceUrl: "https://www.city.akashi.lg.jp/shimin_kenkou/kenkou_ka/kenko/kenko/bosi_houkatu.html",
    organization: "明石市",
    summaryJa:
      "妊娠期から子育て期までの相談、面談、訪問、子育て情報提供を行う明石市の公式ページです。",
    summaryEn:
      "Akashi City's official page for consultation, interviews, visits, and childcare information from pregnancy through child raising.",
    eligibilityJa:
      "明石市に住む妊婦、乳児のいる家庭、子育てに不安がある家庭に関係する可能性があります。",
    eligibilityEn:
      "Pregnant people, families with babies, and families worried about childcare in Akashi may find relevant support.",
    benefitJa:
      "妊娠・出産・子育て相談、訪問、情報提供、関係機関との連携などを確認できます。",
    benefitEn:
      "Consultation about pregnancy, childbirth, childcare, visits, information, and coordination with related organizations.",
    deadline: null,
    requiredDocumentsJa: ["母子健康手帳", "相談内容が分かるメモ", "制度により必要書類が異なります"],
    requiredDocumentsEn: ["Maternal and child health handbook", "Notes about your concern", "Documents vary by program"],
    applicationMethodJa:
      "公式ページで相談先や申請方法を確認し、電話・来所・オンライン申請などを利用してください。",
    applicationMethodEn:
      "Check consultation contacts and application methods on the official page, then use phone, visit, or online forms.",
    tags: ["child_support", "children", "consultation", "cash_benefit"],
    updatedAt: "2026-06-18"
  },
  {
    id: "akashi-welfare-medical",
    titleJa: "明石市 福祉医療費助成・障害者助成制度",
    titleEn: "Akashi City Welfare Medical Subsidies and Disability Support",
    category: "medical",
    region: "明石市",
    sourceUrl: "https://www.city.akashi.lg.jp/kenko/kenko/index.html",
    organization: "明石市",
    summaryJa:
      "明石市の健康・医療ページです。福祉医療費助成、障害者助成制度、子どもの健康などの入口があります。",
    summaryEn:
      "Akashi City's health and medical page with links to welfare medical subsidies, disability subsidies, and child health information.",
    eligibilityJa:
      "明石市に住む子育て家庭、医療費の助成を確認したい人、障がいのある人や家族に関係する可能性があります。",
    eligibilityEn:
      "Akashi residents who need medical subsidy information, families raising children, and people with disabilities may find relevant support.",
    benefitJa:
      "福祉医療費助成、障害者助成、子どもの健康、各種相談に関する情報を確認できます。",
    benefitEn:
      "Information about welfare medical subsidies, disability subsidies, child health, and consultation.",
    deadline: null,
    requiredDocumentsJa: ["制度により異なります", "本人確認書類", "健康保険情報が分かるもの"],
    requiredDocumentsEn: ["Varies by program", "ID document", "Health insurance information"],
    applicationMethodJa:
      "公式ページから関係する制度を選び、申請先や必要書類を確認してください。",
    applicationMethodEn:
      "Choose the relevant program on the official page and check the application counter and documents.",
    tags: ["medical_subsidy", "disability_support", "child_support", "low_income"],
    updatedAt: "2026-06-18"
  },
  {
    id: "himeji-childcare-education",
    titleJa: "姫路市 子育て・教育",
    titleEn: "Himeji City Childcare and Education",
    category: "childcare",
    region: "姫路市",
    sourceUrl: "https://www.city.himeji.lg.jp/kurashi/category/2-5-0-0-0-0-0-0-0-0.html",
    organization: "姫路市",
    summaryJa:
      "姫路市の子育て・教育ページです。妊娠・出産、子育て、学校教育などを探せます。",
    summaryEn:
      "Himeji City's childcare and education page for pregnancy, childbirth, childcare, and school education information.",
    eligibilityJa:
      "姫路市に住む子育て家庭、妊娠中の人、学校や教育の支援を探したい人に関係する可能性があります。",
    eligibilityEn:
      "Families raising children, pregnant people, and people seeking school or education support in Himeji may find relevant information.",
    benefitJa:
      "子育て、学校教育、相談、手続きに関する公式情報を確認できます。",
    benefitEn:
      "Official information about childcare, school education, consultation, and procedures.",
    deadline: null,
    requiredDocumentsJa: ["制度により異なります", "本人確認書類", "子どもの状況が分かる書類"],
    requiredDocumentsEn: ["Varies by program", "ID document", "Documents showing child status"],
    applicationMethodJa:
      "公式ページの該当項目から制度や窓口を確認してください。",
    applicationMethodEn:
      "Use the relevant section of the official page to check programs and counters.",
    tags: ["child_support", "children", "school", "education", "consultation"],
    updatedAt: "2026-06-18"
  },
  {
    id: "himeji-health-welfare",
    titleJa: "姫路市 健康・医療・福祉",
    titleEn: "Himeji City Health, Medical, and Welfare",
    category: "consultation",
    region: "姫路市",
    sourceUrl: "https://www.city.himeji.lg.jp/kurashi/category/2-7-0-0-0-0-0-0-0-0.html",
    organization: "姫路市",
    summaryJa:
      "姫路市の健康・医療・福祉ページです。福祉、医療、介護、障がいなどの情報を探せます。",
    summaryEn:
      "Himeji City's health, medical, and welfare page for welfare, medical care, caregiving, and disability information.",
    eligibilityJa:
      "姫路市に住む人で、福祉、医療、介護、障がい、生活の相談先を探したい人に関係する可能性があります。",
    eligibilityEn:
      "Himeji residents seeking welfare, medical, caregiving, disability, or daily living support may find relevant information.",
    benefitJa:
      "福祉、医療、介護、障がい、相談窓口に関する公式情報を確認できます。",
    benefitEn:
      "Official information about welfare, medical care, caregiving, disability, and consultation counters.",
    deadline: null,
    requiredDocumentsJa: ["相談内容が分かるメモ", "制度により必要書類が異なります"],
    requiredDocumentsEn: ["Notes about your concern", "Documents vary by program"],
    applicationMethodJa:
      "公式ページから関係する分野を選び、申請先や相談先を確認してください。",
    applicationMethodEn:
      "Choose the relevant field on the official page and check the application or consultation counter.",
    tags: ["general_support", "consultation", "caregiving", "disability_support", "medical_subsidy"],
    updatedAt: "2026-06-18"
  }
];
