export type Language = "ja" | "en";

export type MatchLevel = "high" | "needs_check" | "unlikely";

export type NotificationFrequency = "off" | "daily" | "weekly";

export type Category =
  | "single_parent"
  | "childcare"
  | "livelihood"
  | "medical"
  | "foreign"
  | "disability"
  | "caregiving"
  | "housing"
  | "emergency"
  | "consultation";

export type UserProfile = {
  region: string;
  household: "single_parent" | "two_parent" | "single";
  hasChildren: boolean;
  childrenCount: number;
  childrenAges: number[];
  hasDisability: boolean;
  wantsForeignSupport: boolean;
  language: Language;
  notificationsEnabled: boolean;
  notificationFrequency: NotificationFrequency;
};

export type SupportProgram = {
  id: string;
  titleJa: string;
  titleEn: string;
  category: Category;
  region: string;
  sourceUrl: string;
  organization: string;
  summaryJa: string;
  summaryEn: string;
  eligibilityJa: string;
  eligibilityEn: string;
  benefitJa: string;
  benefitEn: string;
  deadline: string | null;
  requiredDocumentsJa: string[];
  requiredDocumentsEn: string[];
  applicationMethodJa: string;
  applicationMethodEn: string;
  tags: string[];
  updatedAt: string;
};
