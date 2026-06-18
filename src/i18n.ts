import { Category, Language, MatchLevel } from "./types";

type Dictionary = Record<string, string>;

const dictionaries: Record<Language, Dictionary> = {
  ja: {
    appName: "ココロテラス",
    home: "ホーム",
    search: "検索",
    alerts: "通知",
    profile: "プロフィール",
    likelySupport: "関係ありそうな支援",
    deadlineSoon: "期限が近い制度",
    newInfo: "新着・更新",
    officialCheck:
      "対象となる可能性があります。正確な条件は公式ページまたは窓口で確認してください。",
    high: "可能性が高い",
    needs_check: "確認が必要",
    unlikely: "対象外の可能性が高い",
    childcare: "子育て",
    cash: "給付金",
    medical: "医療",
    foreign: "外国人向け",
    consultation: "相談",
    details: "詳細",
    benefit: "受けられる内容",
    eligibility: "対象となる可能性がある人",
    deadline: "申請期限",
    documents: "必要書類",
    apply: "申請方法",
    officialSite: "公式ページを開く",
    aiNotice: "AI要約の想定表示です。公開前に公式情報の確認が必要です。",
    region: "居住地域",
    household: "家族構成",
    children: "子ども",
    childCount: "子どもの人数",
    people: "人",
    language: "言語",
    foreignSupport: "外国人向け支援も表示",
    notifications: "通知",
    single_parent: "ひとり親",
    two_parent: "ふたり親・共働き",
    single: "単身",
    other: "その他",
    yes: "あり",
    no: "なし",
    ja: "日本語",
    en: "English",
    reminder: "期限リマインドを試す",
    reminderSet: "通知の準備をしました",
    noDeadline: "随時",
    source: "情報元",
    privacy: "保存する情報は最小限にし、いつでも削除できる設計にします。"
  },
  en: {
    appName: "Cocoterrace",
    home: "Home",
    search: "Search",
    alerts: "Alerts",
    profile: "Profile",
    likelySupport: "Support that may fit you",
    deadlineSoon: "Upcoming deadlines",
    newInfo: "New and updated",
    officialCheck:
      "You may be eligible. Please check the official page or public counter for exact conditions.",
    high: "Likely relevant",
    needs_check: "Needs checking",
    unlikely: "Probably not relevant",
    childcare: "Childcare",
    cash: "Cash benefit",
    medical: "Medical",
    foreign: "For foreign residents",
    consultation: "Consultation",
    details: "Details",
    benefit: "Support details",
    eligibility: "Who may qualify",
    deadline: "Deadline",
    documents: "Documents",
    apply: "How to apply",
    officialSite: "Open official page",
    aiNotice: "Draft AI summary. Official information must be checked before release.",
    region: "Region",
    household: "Household",
    children: "Children",
    childCount: "Number of children",
    people: "children",
    language: "Language",
    foreignSupport: "Show foreign resident support",
    notifications: "Notifications",
    single_parent: "Single parent",
    two_parent: "Two-parent household",
    single: "Single",
    other: "Other",
    yes: "Yes",
    no: "No",
    ja: "日本語",
    en: "English",
    reminder: "Try deadline reminder",
    reminderSet: "Reminder is ready",
    noDeadline: "Anytime",
    source: "Source",
    privacy: "Only minimum data should be stored, and users can delete it anytime."
  }
};

export function t(language: Language, key: string): string {
  return dictionaries[language][key] ?? key;
}

export function categoryLabel(language: Language, category: Category): string {
  return t(language, category);
}

export function matchLabel(language: Language, match: MatchLevel): string {
  return t(language, match);
}
