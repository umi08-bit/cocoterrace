export type Language = "ja" | "en";

export type MatchLevel = "high" | "needs_check" | "unlikely";

export type Category =
  | "childcare"
  | "cash"
  | "medical"
  | "foreign"
  | "disability"
  | "consultation";

export type UserProfile = {
  region: string;
  household: "single_parent" | "two_parent" | "single" | "other";
  hasChildren: boolean;
  childrenCount: number;
  childrenAges: number[];
  hasDisability: boolean;
  wantsForeignSupport: boolean;
  language: Language;
  notificationsEnabled: boolean;
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
