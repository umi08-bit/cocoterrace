import { Category, Language, MatchLevel } from "./types";

type Dictionary = Record<string, string>;

const dictionaries: Record<Language, Dictionary> = {
  ja: {
    appName: "ココロテラス",
    appTagline: "兵庫県の福祉支援ナビ",
    loadingProfile: "プロフィールを読み込んでいます。",
    programData_loading: "支援データを確認中",
    programData_cloud: "クラウドデータを表示中",
    programData_local: "端末内データを表示中",
    firstProfileTitle: "最初にプロフィールを設定しましょう",
    firstProfileBody:
      "ここで選んだ内容は、この端末内に保存されます。あとからプロフィール画面で変更できます。",
    saveAndStart: "保存して始める",
    resetProfile: "初回設定に戻す",
    resetProfileHint:
      "テストや入力し直しをしたい場合は、保存済みプロフィールを削除して初回設定からやり直せます。",
    resetProfileConfirmTitle: "プロフィールをリセットしますか？",
    resetProfileConfirmBody:
      "この端末に保存されたプロフィールを削除し、初回設定画面に戻ります。",
    cancel: "キャンセル",
    home: "ホーム",
    search: "検索",
    concernSearch: "困りごとから探す",
    filterByKeyword: "キーワードでしぼる",
    concernResultTitle: "関係ありそうな支援",
    searchPlaceholder: "制度名、困りごと、必要書類でしぼる",
    concern_money: "お金が足りない",
    concern_money_hint:
      "手当、給付、貸付、生活相談など、お金の不安に関係する支援を表示します。",
    concern_housing: "家賃・住まい",
    concern_housing_hint:
      "家賃、転居、住宅、生活の場所に関係する支援を表示します。",
    concern_school: "子どもの学校費用",
    concern_school_hint:
      "就学、進学、学費、子どもの学びに関係する支援を表示します。",
    concern_single_parent: "ひとり親",
    concern_single_parent_hint:
      "ひとり親家庭向けの相談、手当、仕事、住まい、子育て支援を表示します。",
    concern_disability: "障がい",
    concern_disability_hint:
      "障がいのある本人、子ども、家族に関係する手当や相談を表示します。",
    concern_caregiving: "介護",
    concern_caregiving_hint:
      "介護や家族のケアに関係する支援を表示します。",
    concern_foreign: "外国語で相談したい",
    concern_foreign_hint:
      "外国人住民向けの生活情報、多言語相談、手続きの案内を表示します。",
    concern_urgent: "今すぐ相談したい",
    concern_urgent_hint:
      "生活、DV、子育て、住まいなど、まず相談できる窓口を表示します。",
    alerts: "通知",
    personalNotificationSettings: "あなた向け支援の通知設定",
    notificationFrequency: "通知頻度",
    notificationPreview: "通知プレビュー",
    notificationExplanation:
      "通知は端末内で予約します。プロフィールやクラウドデータが変わったら、この画面で通知を設定し直してください。",
    supportNotificationTitle: "ココロテラスからのお知らせ",
    supportCountUnit: "件",
    daily: "1日1回",
    weekly: "週1回",
    off: "通知しない",
    notificationScheduleSaved: "通知を設定しました",
    notificationOffMessage: "通知をオフにしました。",
    notificationPermissionNeeded: "通知の許可が必要です。",
    sendTestNotification: "お試し通知を送る",
    testNotificationSent: "お試し通知を予約しました",
    testNotificationHint: "約5秒後に通知が届きます。",
    noDeadlinePrograms: "期限が近い支援はありません。",
    profile: "プロフィール",
    likelySupport: "関係ありそうな福祉支援",
    profileConditions: "現在の条件",
    noMatchingPrograms: "この条件に合いそうな福祉支援はまだありません。",
    deadlineSoon: "期限が近い福祉支援",
    newInfo: "新着・更新",
    officialCheck:
      "対象となる可能性があります。正確な条件は公式ページまたは窓口で確認してください。",
    high: "可能性が高い",
    needs_check: "確認が必要",
    unlikely: "対象外の可能性が高い",
    single_parent: "ひとり親",
    childcare: "子育て福祉",
    livelihood: "生活に困ったとき",
    medical: "医療の福祉",
    foreign: "外国人向け",
    disability: "障がい",
    caregiving: "介護",
    housing: "住まい",
    emergency: "緊急相談",
    consultation: "相談窓口",
    details: "詳細",
    benefit: "受けられる内容",
    consultationMemo: "相談メモ",
    consultationMemoHint:
      "窓口で話す内容を項目ごとに整理できます。白紙から書くか、テンプレートを使ってください。",
    copyMemo: "コピー",
    useMemoTemplate: "文章生成",
    clearMemo: "文章を消去",
    memoCopiedTitle: "コピーしました",
    memoCopiedBody: "相談メモをコピーしました。窓口への連絡やメモアプリに貼り付けて使えます。",
    memoTemplateTitle: "文章を生成しました",
    memoTemplateBody: "現在のプロフィールと制度情報から相談メモを作成しました。",
    memoClearedTitle: "消去しました",
    memoClearedBody: "相談メモの文章を消去しました。",
    eligibility: "対象となる可能性がある人",
    deadline: "申請期限",
    documents: "必要書類",
    documentsReady: "準備済み",
    documentChecklistHint:
      "準備できた書類にチェックを入れられます。チェックはこの端末に保存されます。",
    apply: "申請方法",
    officialSite: "公式ページを開く",
    aiNotice:
      "AIによる簡単な要約です。申請前に必ず公式情報を確認してください。",
    region: "居住地域",
    household: "家族構成",
    children: "子ども",
    childCount: "子どもの人数",
    people: "人",
    noChildren: "子どもなし",
    disabilityStatus: "障がいの有無",
    disabilitySupportOn: "障がい関連支援あり",
    disabilitySupportOff: "障がい関連支援なし",
    foreignSupportOn: "外国人向け支援あり",
    foreignSupportOff: "外国人向け支援なし",
    language: "言語",
    foreignSupport: "外国人向け支援も表示",
    notifications: "通知",
    two_parent: "ふたり親・夫婦",
    single: "単身",
    yes: "あり",
    no: "なし",
    ja: "日本語",
    en: "English",
    reminder: "期限リマインドを試す",
    reminderSet: "通知の準備をしました",
    noDeadline: "随時",
    source: "情報元",
    privacy:
      "保存する情報は最小限にし、いつでも削除できる設計にします。"
  },
  en: {
    appName: "Cocoterrace",
    appTagline: "Hyogo Welfare Support Navi",
    loadingProfile: "Loading your profile.",
    programData_loading: "Checking support data",
    programData_cloud: "Showing cloud data",
    programData_local: "Showing on-device data",
    firstProfileTitle: "Set up your profile first",
    firstProfileBody:
      "Your choices are saved on this device. You can change them later from Profile.",
    saveAndStart: "Save and start",
    resetProfile: "Reset profile",
    resetProfileHint:
      "If you want to test setup again, you can delete the saved profile and return to first setup.",
    resetProfileConfirmTitle: "Reset your profile?",
    resetProfileConfirmBody:
      "The profile saved on this device will be deleted, and the first setup screen will open.",
    cancel: "Cancel",
    home: "Home",
    search: "Search",
    concernSearch: "Search by concern",
    filterByKeyword: "Filter by keyword",
    concernResultTitle: "Support that may help",
    searchPlaceholder: "Filter by program, concern, or document",
    concern_money: "Not enough money",
    concern_money_hint:
      "Shows allowances, benefits, loans, and consultation related to money worries.",
    concern_housing: "Rent and housing",
    concern_housing_hint:
      "Shows support related to rent, moving, housing, and a safe place to live.",
    concern_school: "School costs",
    concern_school_hint:
      "Shows support related to school, education, tuition, and children's learning.",
    concern_single_parent: "Single parent",
    concern_single_parent_hint:
      "Shows consultation, allowances, work, housing, and childcare support for single-parent households.",
    concern_disability: "Disability",
    concern_disability_hint:
      "Shows benefits and consultation for people, children, and families related to disability.",
    concern_caregiving: "Caregiving",
    concern_caregiving_hint:
      "Shows support related to caregiving and family care.",
    concern_foreign: "Consult in another language",
    concern_foreign_hint:
      "Shows multilingual consultation, living information, and procedure guidance for foreign residents.",
    concern_urgent: "Need help now",
    concern_urgent_hint:
      "Shows public counters for urgent consultation about living, DV, childcare, and housing.",
    alerts: "Alerts",
    personalNotificationSettings: "Your Support Notification Settings",
    notificationFrequency: "Notification frequency",
    notificationPreview: "Notification preview",
    notificationExplanation:
      "Notifications are scheduled on this device. If your profile or cloud data changes, set notifications again on this screen.",
    supportNotificationTitle: "Cocoterrace update",
    supportCountUnit: " programs",
    daily: "Daily",
    weekly: "Weekly",
    off: "Off",
    notificationScheduleSaved: "Notification saved",
    notificationOffMessage: "Notifications are off.",
    notificationPermissionNeeded: "Notification permission is required.",
    sendTestNotification: "Send test notification",
    testNotificationSent: "Test notification scheduled",
    testNotificationHint: "You will receive it in about 5 seconds.",
    noDeadlinePrograms: "No upcoming deadlines.",
    profile: "Profile",
    likelySupport: "Welfare support that may fit you",
    profileConditions: "Current profile",
    noMatchingPrograms: "No likely welfare support found for these conditions yet.",
    deadlineSoon: "Upcoming welfare deadlines",
    newInfo: "New and updated",
    officialCheck:
      "You may be eligible. Please check the official page or public counter for exact conditions.",
    high: "Likely relevant",
    needs_check: "Needs checking",
    unlikely: "Probably not relevant",
    single_parent: "Single parent",
    childcare: "Child and family welfare",
    livelihood: "Daily living support",
    medical: "Medical and welfare",
    foreign: "For foreign residents",
    disability: "Disability",
    caregiving: "Caregiving",
    housing: "Housing",
    emergency: "Urgent consultation",
    consultation: "Consultation",
    details: "Details",
    benefit: "Support details",
    consultationMemo: "Consultation memo",
    consultationMemoHint:
      "Organize what to say at the counter by section. Start blank or use the template.",
    copyMemo: "Copy",
    useMemoTemplate: "Generate",
    clearMemo: "Clear text",
    memoCopiedTitle: "Copied",
    memoCopiedBody:
      "The consultation memo has been copied. You can paste it into a message or notes app.",
    memoTemplateTitle: "Generated",
    memoTemplateBody:
      "A consultation memo has been created from your current profile and this support program.",
    memoClearedTitle: "Cleared",
    memoClearedBody: "The consultation memo text has been cleared.",
    eligibility: "Who may qualify",
    deadline: "Deadline",
    documents: "Documents",
    documentsReady: "ready",
    documentChecklistHint:
      "Check off documents as you prepare them. Your checks are saved on this device.",
    apply: "How to apply",
    officialSite: "Open official page",
    aiNotice:
      "Draft AI summary. Official information must be checked before applying.",
    region: "Region",
    household: "Household",
    children: "Children",
    childCount: "Number of children",
    people: "children",
    noChildren: "No children",
    disabilityStatus: "Disability-related support",
    disabilitySupportOn: "Disability support on",
    disabilitySupportOff: "Disability support off",
    foreignSupportOn: "Foreign resident support on",
    foreignSupportOff: "Foreign resident support off",
    language: "Language",
    foreignSupport: "Show foreign resident support",
    notifications: "Notifications",
    two_parent: "Two-parent or couple household",
    single: "Single",
    yes: "Yes",
    no: "No",
    ja: "Japanese",
    en: "English",
    reminder: "Try deadline reminder",
    reminderSet: "Reminder is ready",
    noDeadline: "Anytime",
    source: "Source",
    privacy:
      "Only minimum data should be stored, and users can delete it anytime."
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
