import { Category, SupportProgram } from "../types";

type CityConfig = {
  id: string;
  nameJa: string;
  nameEn: string;
  urls: {
    childcare: string;
    singleParent: string;
    disability: string;
    livelihood: string;
    housing: string;
    medical: string;
    caregiving: string;
    foreign: string;
    urgent: string;
    school: string;
  };
};

type TopicTemplate = {
  id: keyof CityConfig["urls"];
  titleJa: string;
  titleEn: string;
  category: Category;
  summaryJa: (city: CityConfig) => string;
  summaryEn: (city: CityConfig) => string;
  eligibilityJa: (city: CityConfig) => string;
  eligibilityEn: (city: CityConfig) => string;
  benefitJa: string;
  benefitEn: string;
  requiredDocumentsJa: string[];
  requiredDocumentsEn: string[];
  applicationMethodJa: (city: CityConfig) => string;
  applicationMethodEn: (city: CityConfig) => string;
  tags: string[];
};

const hyogoPrograms: SupportProgram[] = [
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
  }
];

const cityConfigs: CityConfig[] = [
  {
    id: "kobe",
    nameJa: "神戸市",
    nameEn: "Kobe City",
    urls: {
      childcare: "https://www.city.kobe.lg.jp/kosodate/index.html",
      singleParent: "https://www.city.kobe.lg.jp/a32986/kosodate/shien/family/index.html",
      disability:
        "https://www.city.kobe.lg.jp/a40792/kenko/handicap/seikatsujiritsu/keizaishien/s063.html",
      livelihood: "https://www.city.kobe.lg.jp/shien_topix.html",
      housing: "https://www.city.kobe.lg.jp/kurashi/sumai/index.html",
      medical: "https://www.city.kobe.lg.jp/kenko/iryo/index.html",
      caregiving: "https://www.city.kobe.lg.jp/kenko/fukushi/carenet/index.html",
      foreign: "https://www.city.kobe.lg.jp/foreignlanguage/index.html",
      urgent: "https://www.city.kobe.lg.jp/shien_topix.html",
      school: "https://www.city.kobe.lg.jp/kosodate/education/index.html"
    }
  },
  {
    id: "amagasaki",
    nameJa: "尼崎市",
    nameEn: "Amagasaki City",
    urls: {
      childcare: "https://www.city.amagasaki.hyogo.jp/kosodate-kyoiku/kosodate/index.html",
      singleParent:
        "https://www.city.amagasaki.hyogo.jp/kosodate-kyoiku/kosodate/1003039.html",
      disability: "https://www.city.amagasaki.hyogo.jp/kurashi/syogaisya/index.html",
      livelihood: "https://www.city.amagasaki.hyogo.jp/kurashi/seikatusien/index.html",
      housing: "https://www.city.amagasaki.hyogo.jp/kurashi/sumai/index.html",
      medical: "https://www.city.amagasaki.hyogo.jp/kurashi/kenko/index.html",
      caregiving:
        "https://www.city.amagasaki.hyogo.jp/kurashi/lifeevent/1002188.html",
      foreign: "https://www.city.amagasaki.hyogo.jp/kurashi/kokusai/index.html",
      urgent: "https://www.city.amagasaki.hyogo.jp/kurashi/soudan/index.html",
      school:
        "https://www.city.amagasaki.hyogo.jp/kosodate-kyoiku/kosodate/1001780.html"
    }
  },
  {
    id: "nishinomiya",
    nameJa: "西宮市",
    nameEn: "Nishinomiya City",
    urls: {
      childcare: "https://www.nishi.or.jp/kosodate/index.html",
      singleParent: "https://www.nishi.or.jp/kosodate/kosodate/hitorioya/index.html",
      disability: "https://www.nishi.or.jp/kenko/fukushi/shogaisha/index.html",
      livelihood: "https://www.nishi.or.jp/kenko/fukushi/seikatsushien/index.html",
      housing: "https://www.nishi.or.jp/kurashi/sumai/index.html",
      medical: "https://www.nishi.or.jp/kenko/index.html",
      caregiving: "https://www.nishi.or.jp/kenko/kaigo/index.html",
      foreign: "https://www.nishi.or.jp/shisei/seisaku/tabunka/index.html",
      urgent: "https://www.nishi.or.jp/kurashi/anshin/sodan/index.html",
      school: "https://www.nishi.or.jp/kosodate/kyoiku/index.html"
    }
  },
  {
    id: "akashi",
    nameJa: "明石市",
    nameEn: "Akashi City",
    urls: {
      childcare:
        "https://www.city.akashi.lg.jp/shimin_kenkou/kenkou_ka/kenko/kenko/bosi_houkatu.html",
      singleParent: "https://www.city.akashi.lg.jp/kosodate/hitorioya/index.html",
      disability: "https://www.city.akashi.lg.jp/fukushi/shougai/index.html",
      livelihood: "https://www.city.akashi.lg.jp/fukushi/seikatsu/index.html",
      housing: "https://www.city.akashi.lg.jp/kurashi/sumai/index.html",
      medical: "https://www.city.akashi.lg.jp/kenko/kenko/index.html",
      caregiving: "https://www.city.akashi.lg.jp/fukushi/kaigo/index.html",
      foreign: "https://www.city.akashi.lg.jp/community/s_kyoudou_shitsu/foreigners.html",
      urgent: "https://www.city.akashi.lg.jp/kurashi/sodan/index.html",
      school: "https://www.city.akashi.lg.jp/kosodate/education/index.html"
    }
  },
  {
    id: "himeji",
    nameJa: "姫路市",
    nameEn: "Himeji City",
    urls: {
      childcare: "https://www.city.himeji.lg.jp/kurashi/category/2-5-0-0-0-0-0-0-0-0.html",
      singleParent:
        "https://www.city.himeji.lg.jp/kurashi/category/2-5-2-0-0-0-0-0-0-0.html",
      disability: "https://www.city.himeji.lg.jp/kurashi/category/2-7-3-0-0-0-0-0-0-0.html",
      livelihood: "https://www.city.himeji.lg.jp/kurashi/category/2-7-1-0-0-0-0-0-0-0.html",
      housing: "https://www.city.himeji.lg.jp/kurashi/category/2-2-4-0-0-0-0-0-0-0.html",
      medical: "https://www.city.himeji.lg.jp/kurashi/category/2-7-0-0-0-0-0-0-0-0.html",
      caregiving: "https://www.city.himeji.lg.jp/kurashi/category/2-7-2-0-0-0-0-0-0-0.html",
      foreign: "https://www.city.himeji.lg.jp/bousai/category/2-15-0-0-0-0-0-0-0-0.html",
      urgent: "https://www.city.himeji.lg.jp/kurashi/category/2-11-0-0-0-0-0-0-0-0.html",
      school: "https://www.city.himeji.lg.jp/kurashi/category/2-5-5-0-0-0-0-0-0-0.html"
    }
  }
];

const topicTemplates: TopicTemplate[] = [
  {
    id: "childcare",
    titleJa: "子育て支援",
    titleEn: "Childcare Support",
    category: "childcare",
    summaryJa: (city) =>
      `${city.nameJa}の妊娠・出産、子育て、保育、子どもの健康、相談先を確認できる公式情報です。`,
    summaryEn: (city) =>
      `${city.nameEn} official information for pregnancy, childbirth, childcare, child health, and consultation.`,
    eligibilityJa: (city) =>
      `${city.nameJa}に住む子育て家庭、妊娠中の人、子どもの相談先を探したい人に関係する可能性があります。`,
    eligibilityEn: (city) =>
      `Families raising children, pregnant people, and people seeking childcare consultation in ${city.nameEn} may find relevant support.`,
    benefitJa: "子育て相談、手当、保育、健康、親子向けサービスの情報を確認できます。",
    benefitEn: "Information about childcare consultation, allowances, childcare services, health, and family services.",
    requiredDocumentsJa: ["制度ごとの申請書", "本人確認書類", "子どもや世帯の状況が分かる書類"],
    requiredDocumentsEn: ["Program-specific form", "ID document", "Documents showing child or household status"],
    applicationMethodJa: (city) =>
      `${city.nameJa}の公式ページで該当する制度を選び、申請先や相談先を確認してください。`,
    applicationMethodEn: (city) =>
      `Choose the relevant program on ${city.nameEn}'s official page and check the counter or application route.`,
    tags: ["child_support", "children", "cash_benefit", "consultation"]
  },
  {
    id: "singleParent",
    titleJa: "ひとり親家庭支援",
    titleEn: "Single-Parent Family Support",
    category: "single_parent",
    summaryJa: (city) =>
      `${city.nameJa}のひとり親家庭向けの手当、相談、仕事、住まい、子どもの進学などに関する情報です。`,
    summaryEn: (city) =>
      `${city.nameEn} information for single-parent households, including allowances, consultation, work, housing, and school costs.`,
    eligibilityJa: (city) =>
      `${city.nameJa}に住み、子どもを育てているひとり親家庭などは、制度ごとの条件に合えば利用できる可能性があります。`,
    eligibilityEn: (city) =>
      `Single-parent households raising children in ${city.nameEn} may qualify depending on each program's conditions.`,
    benefitJa: "児童扶養手当、就業相談、資格取得、住まい、医療費助成、進学費用などを確認できます。",
    benefitEn: "Information about child rearing allowance, work consultation, training, housing, medical subsidies, and school costs.",
    requiredDocumentsJa: ["本人確認書類", "子どもや世帯の状況が分かる書類", "収入が分かる書類"],
    requiredDocumentsEn: ["ID document", "Documents showing child or household status", "Income document"],
    applicationMethodJa: (city) =>
      `${city.nameJa}の公式ページで、手当・相談・仕事・住まいなど困りごとに近い項目を確認してください。`,
    applicationMethodEn: (city) =>
      `Check the relevant allowance, consultation, work, or housing section on ${city.nameEn}'s official page.`,
    tags: ["single_parent", "child_support", "low_income", "housing", "school", "education", "cash_benefit", "loan"]
  },
  {
    id: "disability",
    titleJa: "障がいのある人・家族の支援",
    titleEn: "Disability Support",
    category: "disability",
    summaryJa: (city) =>
      `${city.nameJa}の障がい福祉サービス、手当、相談、障害者手帳などに関する公式情報です。`,
    summaryEn: (city) =>
      `${city.nameEn} official information about disability welfare services, allowances, consultation, and disability certificates.`,
    eligibilityJa: (city) =>
      `${city.nameJa}に住む障がいのある人、障がいのある子どもを育てる家庭、介護する家族に関係する可能性があります。`,
    eligibilityEn: (city) =>
      `People with disabilities, families raising children with disabilities, and caregivers in ${city.nameEn} may find relevant support.`,
    benefitJa: "障害者手帳、手当、福祉サービス、相談窓口、日常生活の支援を確認できます。",
    benefitEn: "Information about disability certificates, allowances, welfare services, consultation, and daily living support.",
    requiredDocumentsJa: ["申請書", "障害者手帳または診断書など", "本人確認書類"],
    requiredDocumentsEn: ["Application form", "Disability certificate or medical certificate", "ID document"],
    applicationMethodJa: (city) =>
      `${city.nameJa}の障がい福祉ページで、対象となる制度と窓口を確認してください。`,
    applicationMethodEn: (city) =>
      `Check eligible programs and counters on ${city.nameEn}'s disability welfare page.`,
    tags: ["disability_support", "cash_benefit", "caregiving", "consultation"]
  },
  {
    id: "livelihood",
    titleJa: "生活に困ったときの支援",
    titleEn: "Daily Living Support",
    category: "livelihood",
    summaryJa: (city) =>
      `${city.nameJa}で生活費、仕事、家計、生活保護、生活困窮について相談したい人向けの情報です。`,
    summaryEn: (city) =>
      `${city.nameEn} information for people who need help with living costs, work, household budget, public assistance, or financial hardship.`,
    eligibilityJa: (city) =>
      `${city.nameJa}に住み、収入や生活費に不安がある人、仕事や家計の相談をしたい人に関係する可能性があります。`,
    eligibilityEn: (city) =>
      `${city.nameEn} residents worried about income, living costs, work, or household budgeting may find relevant support.`,
    benefitJa: "生活困窮相談、生活保護、家計相談、就労支援などを確認できます。",
    benefitEn: "Information about hardship consultation, public assistance, household budget consultation, and work support.",
    requiredDocumentsJa: ["本人確認書類", "収入が分かる書類", "家計や支払い状況が分かる資料"],
    requiredDocumentsEn: ["ID document", "Income document", "Documents showing household budget or payment situation"],
    applicationMethodJa: (city) =>
      `${city.nameJa}の生活支援ページで相談窓口を確認し、早めに相談してください。`,
    applicationMethodEn: (city) =>
      `Check the consultation counter on ${city.nameEn}'s daily living support page and consult early.`,
    tags: ["low_income", "general_support", "consultation", "cash_benefit"]
  },
  {
    id: "housing",
    titleJa: "住まい・家賃の支援",
    titleEn: "Housing and Rent Support",
    category: "housing",
    summaryJa: (city) =>
      `${city.nameJa}の住まい、市営住宅、家賃、転居、住宅相談に関する情報です。`,
    summaryEn: (city) =>
      `${city.nameEn} information about housing, public housing, rent, moving, and housing consultation.`,
    eligibilityJa: (city) =>
      `${city.nameJa}に住み、家賃や住まいに不安がある人、転居や住宅相談をしたい人に関係する可能性があります。`,
    eligibilityEn: (city) =>
      `${city.nameEn} residents worried about rent, housing, moving, or housing consultation may find relevant support.`,
    benefitJa: "市営住宅、住まいの相談、家賃や転居に関係する制度の入口を確認できます。",
    benefitEn: "Information about public housing, housing consultation, rent, and moving-related support.",
    requiredDocumentsJa: ["本人確認書類", "収入が分かる書類", "住まいの状況が分かる書類"],
    requiredDocumentsEn: ["ID document", "Income document", "Documents showing housing situation"],
    applicationMethodJa: (city) =>
      `${city.nameJa}の住まい関連ページで、制度ごとの申請先や募集時期を確認してください。`,
    applicationMethodEn: (city) =>
      `Check application counters and recruitment periods on ${city.nameEn}'s housing page.`,
    tags: ["housing", "rent", "low_income", "consultation"]
  },
  {
    id: "medical",
    titleJa: "医療費・健康の支援",
    titleEn: "Medical and Health Support",
    category: "medical",
    summaryJa: (city) =>
      `${city.nameJa}の医療費助成、健康相談、子どもや障がいのある人の医療に関する情報です。`,
    summaryEn: (city) =>
      `${city.nameEn} information about medical subsidies, health consultation, and medical support for children and people with disabilities.`,
    eligibilityJa: (city) =>
      `${city.nameJa}に住み、医療費の負担、子どもの医療、障がいに関する医療支援を確認したい人に関係する可能性があります。`,
    eligibilityEn: (city) =>
      `${city.nameEn} residents who need medical subsidy, child medical care, or disability-related medical support may find relevant information.`,
    benefitJa: "医療費助成、健康相談、予防接種、福祉医療などの入口を確認できます。",
    benefitEn: "Information about medical subsidies, health consultation, vaccinations, and welfare medical care.",
    requiredDocumentsJa: ["本人確認書類", "健康保険情報が分かるもの", "制度により追加書類"],
    requiredDocumentsEn: ["ID document", "Health insurance information", "Additional documents depending on the program"],
    applicationMethodJa: (city) =>
      `${city.nameJa}の健康・医療ページで、対象制度と申請方法を確認してください。`,
    applicationMethodEn: (city) =>
      `Check eligible programs and application methods on ${city.nameEn}'s health and medical page.`,
    tags: ["medical_subsidy", "child_support", "disability_support", "low_income"]
  },
  {
    id: "caregiving",
    titleJa: "介護・高齢者支援",
    titleEn: "Caregiving and Older Adult Support",
    category: "caregiving",
    summaryJa: (city) =>
      `${city.nameJa}の介護保険、高齢者支援、家族の介護相談に関する情報です。`,
    summaryEn: (city) =>
      `${city.nameEn} information about long-term care insurance, older adult support, and family caregiving consultation.`,
    eligibilityJa: (city) =>
      `${city.nameJa}に住む高齢者、介護している家族、介護サービスや相談先を探している人に関係する可能性があります。`,
    eligibilityEn: (city) =>
      `Older adults, family caregivers, and people seeking care services in ${city.nameEn} may find relevant support.`,
    benefitJa: "介護保険、在宅支援、相談窓口、高齢者向けサービスを確認できます。",
    benefitEn: "Information about long-term care insurance, home support, consultation counters, and older adult services.",
    requiredDocumentsJa: ["本人確認書類", "介護や健康状態が分かる書類", "制度により追加書類"],
    requiredDocumentsEn: ["ID document", "Documents showing care or health situation", "Additional documents depending on the program"],
    applicationMethodJa: (city) =>
      `${city.nameJa}の介護・高齢者支援ページで、相談先や申請方法を確認してください。`,
    applicationMethodEn: (city) =>
      `Check consultation contacts and application methods on ${city.nameEn}'s caregiving page.`,
    tags: ["caregiving", "consultation", "general_support"]
  },
  {
    id: "foreign",
    titleJa: "外国人住民向け生活情報",
    titleEn: "Living Information for Foreign Residents",
    category: "foreign",
    summaryJa: (city) =>
      `${city.nameJa}の外国人住民向け情報、多言語案内、生活相談に関する情報です。`,
    summaryEn: (city) =>
      `${city.nameEn} information for foreign residents, multilingual guidance, and daily life consultation.`,
    eligibilityJa: (city) =>
      `${city.nameJa}に住む外国人住民、日本語での手続きに不安がある人、多言語の情報を探したい人に関係する可能性があります。`,
    eligibilityEn: (city) =>
      `Foreign residents in ${city.nameEn} and people who need language help with procedures may find relevant support.`,
    benefitJa: "多言語の生活情報、相談先、行政手続きの案内を確認できます。",
    benefitEn: "Information about multilingual living guidance, consultation, and public procedures.",
    requiredDocumentsJa: ["相談内容が分かるメモ", "在留カードが必要な場合があります"],
    requiredDocumentsEn: ["Notes about your consultation", "Residence card may be needed"],
    applicationMethodJa: (city) =>
      `${city.nameJa}の外国人住民向けページで、言語や相談方法を確認してください。`,
    applicationMethodEn: (city) =>
      `Check languages and consultation routes on ${city.nameEn}'s foreign resident information page.`,
    tags: ["foreign_resident", "language_support", "consultation", "emergency"]
  },
  {
    id: "urgent",
    titleJa: "今すぐ相談したいとき",
    titleEn: "Urgent Consultation",
    category: "emergency",
    summaryJa: (city) =>
      `${city.nameJa}で生活、子育て、DV、住まい、健康などについて早めに相談したい時の窓口情報です。`,
    summaryEn: (city) =>
      `${city.nameEn} consultation information for urgent concerns about daily life, childcare, DV, housing, or health.`,
    eligibilityJa: (city) =>
      `${city.nameJa}に住み、どの制度を使えばよいか分からない人、まず相談先を知りたい人に関係する可能性があります。`,
    eligibilityEn: (city) =>
      `${city.nameEn} residents who are unsure which program to use and need a first consultation contact may find relevant support.`,
    benefitJa: "相談窓口、緊急時の連絡先、専門窓口への案内を確認できます。",
    benefitEn: "Information about consultation counters, urgent contacts, and referral to specialist counters.",
    requiredDocumentsJa: ["相談内容が分かるメモ", "本人確認書類が必要な場合があります"],
    requiredDocumentsEn: ["Notes about your concern", "ID document may be needed"],
    applicationMethodJa: (city) =>
      `${city.nameJa}の相談ページから、内容に近い窓口へ連絡してください。`,
    applicationMethodEn: (city) =>
      `Use ${city.nameEn}'s consultation page to contact the closest counter for your concern.`,
    tags: ["consultation", "emergency", "general_support"]
  },
  {
    id: "school",
    titleJa: "学校・教育費の支援",
    titleEn: "School and Education Cost Support",
    category: "childcare",
    summaryJa: (city) =>
      `${city.nameJa}の学校、就学、教育費、子どもの学びに関する支援情報です。`,
    summaryEn: (city) =>
      `${city.nameEn} information about school, enrollment, education costs, and children's learning support.`,
    eligibilityJa: (city) =>
      `${city.nameJa}に住み、子どもの学校費用や学びの支援を確認したい家庭に関係する可能性があります。`,
    eligibilityEn: (city) =>
      `Families in ${city.nameEn} who need information about school costs or learning support may find relevant programs.`,
    benefitJa: "就学援助、学校手続き、教育相談、学びの支援に関する情報を確認できます。",
    benefitEn: "Information about school expense assistance, school procedures, education consultation, and learning support.",
    requiredDocumentsJa: ["申請書", "子どもの在学状況が分かる書類", "収入が分かる書類"],
    requiredDocumentsEn: ["Application form", "Documents showing school status", "Income document"],
    applicationMethodJa: (city) =>
      `${city.nameJa}の学校・教育ページで、対象制度や学校への相談方法を確認してください。`,
    applicationMethodEn: (city) =>
      `Check eligible programs and school consultation routes on ${city.nameEn}'s education page.`,
    tags: ["school", "education", "child_support", "low_income"]
  }
];

function createCityProgram(city: CityConfig, topic: TopicTemplate): SupportProgram {
  return {
    id: `${city.id}-${topic.id}`,
    titleJa: `${city.nameJa} ${topic.titleJa}`,
    titleEn: `${city.nameEn} ${topic.titleEn}`,
    category: topic.category,
    region: city.nameJa,
    sourceUrl: city.urls[topic.id],
    organization: city.nameJa,
    summaryJa: topic.summaryJa(city),
    summaryEn: topic.summaryEn(city),
    eligibilityJa: topic.eligibilityJa(city),
    eligibilityEn: topic.eligibilityEn(city),
    benefitJa: topic.benefitJa,
    benefitEn: topic.benefitEn,
    deadline: null,
    requiredDocumentsJa: topic.requiredDocumentsJa,
    requiredDocumentsEn: topic.requiredDocumentsEn,
    applicationMethodJa: topic.applicationMethodJa(city),
    applicationMethodEn: topic.applicationMethodEn(city),
    tags: topic.tags,
    updatedAt: "2026-06-18"
  };
}

export const supportPrograms: SupportProgram[] = [
  ...hyogoPrograms,
  ...cityConfigs.flatMap((city) =>
    topicTemplates.map((topic) => createCityProgram(city, topic))
  )
];
