import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { SupportProgram } from "../types";

function toStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function toSupportProgram(id: string, data: Record<string, unknown>): SupportProgram {
  return {
    id: typeof data.id === "string" ? data.id : id,
    titleJa: String(data.titleJa ?? ""),
    titleEn: String(data.titleEn ?? ""),
    category: data.category as SupportProgram["category"],
    region: String(data.region ?? ""),
    sourceUrl: String(data.sourceUrl ?? ""),
    organization: String(data.organization ?? ""),
    summaryJa: String(data.summaryJa ?? ""),
    summaryEn: String(data.summaryEn ?? ""),
    eligibilityJa: String(data.eligibilityJa ?? ""),
    eligibilityEn: String(data.eligibilityEn ?? ""),
    benefitJa: String(data.benefitJa ?? ""),
    benefitEn: String(data.benefitEn ?? ""),
    deadline: typeof data.deadline === "string" ? data.deadline : null,
    requiredDocumentsJa: toStringArray(data.requiredDocumentsJa),
    requiredDocumentsEn: toStringArray(data.requiredDocumentsEn),
    applicationMethodJa: String(data.applicationMethodJa ?? ""),
    applicationMethodEn: String(data.applicationMethodEn ?? ""),
    tags: toStringArray(data.tags),
    updatedAt: String(data.updatedAt ?? "")
  };
}

function hasRequiredProgramFields(program: SupportProgram) {
  return Boolean(
    program.id &&
      program.titleJa &&
      program.titleEn &&
      program.category &&
      program.region &&
      program.sourceUrl &&
      program.organization
  );
}

export async function fetchSupportProgramsFromFirestore() {
  const snapshot = await getDocs(collection(db, "supportPrograms"));

  return snapshot.docs
    .map((doc) => toSupportProgram(doc.id, doc.data()))
    .filter(hasRequiredProgramFields)
    .sort((a, b) => `${a.region}-${a.id}`.localeCompare(`${b.region}-${b.id}`));
}
