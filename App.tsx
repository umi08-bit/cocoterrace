import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View
} from "react-native";
import { supportPrograms as localSupportPrograms } from "./src/data/programs";
import { categoryLabel, matchLabel, t } from "./src/i18n";
import { fetchSupportProgramsFromFirestore } from "./src/services/supportPrograms";
import {
  Language,
  MatchLevel,
  NotificationFrequency,
  SupportProgram,
  UserProfile
} from "./src/types";

type Tab = "home" | "search" | "alerts" | "profile";
type ProgramDataSource = "loading" | "cloud" | "local";
const SUPPORTED_REGIONS = [
  "神戸市",
  "尼崎市",
  "西宮市",
  "明石市",
  "姫路市"
] as const;
type ConcernId =
  | "money"
  | "housing"
  | "school"
  | "single_parent"
  | "disability"
  | "caregiving"
  | "foreign"
  | "urgent";
const PROFILE_STORAGE_KEY = "cocoterrace:user-profile:v1";
const DOCUMENT_CHECKLIST_STORAGE_PREFIX = "cocoterrace:document-checklist:";
const CONSULTATION_MEMO_STORAGE_PREFIX = "cocoterrace:consultation-memo:";

const concernCards: {
  id: ConcernId;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  tags: string[];
  categories: string[];
}[] = [
  {
    id: "money",
    icon: "wallet-outline",
    color: "#2E6B4F",
    tags: ["low_income", "cash_benefit", "loan"],
    categories: ["livelihood", "single_parent", "disability"]
  },
  {
    id: "housing",
    icon: "home-outline",
    color: "#486E8C",
    tags: ["housing", "rent"],
    categories: ["housing", "single_parent", "consultation"]
  },
  {
    id: "school",
    icon: "school-outline",
    color: "#7C5B2E",
    tags: ["school", "education", "child_support"],
    categories: ["childcare", "single_parent"]
  },
  {
    id: "single_parent",
    icon: "people-outline",
    color: "#8A5A5A",
    tags: ["single_parent"],
    categories: ["single_parent"]
  },
  {
    id: "disability",
    icon: "accessibility-outline",
    color: "#655E9B",
    tags: ["disability_support"],
    categories: ["disability"]
  },
  {
    id: "caregiving",
    icon: "medkit-outline",
    color: "#5F7D5B",
    tags: ["caregiving"],
    categories: ["caregiving", "disability"]
  },
  {
    id: "foreign",
    icon: "language-outline",
    color: "#3E6F75",
    tags: ["foreign_resident", "language_support"],
    categories: ["foreign"]
  },
  {
    id: "urgent",
    icon: "call-outline",
    color: "#8A3A31",
    tags: ["consultation", "emergency"],
    categories: ["consultation", "emergency"]
  }
];

const initialProfile: UserProfile = {
  region: "神戸市",
  household: "single_parent",
  hasChildren: true,
  childrenCount: 2,
  childrenAges: [4, 9],
  hasDisability: false,
  wantsForeignSupport: true,
  language: "ja",
  notificationsEnabled: true,
  notificationFrequency: "daily"
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true
  })
});

export default function App() {
  const [tab, setTab] = useState<Tab>("home");
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [hasLoadedProfile, setHasLoadedProfile] = useState(false);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [programs, setPrograms] = useState<SupportProgram[]>(localSupportPrograms);
  const [programDataSource, setProgramDataSource] =
    useState<ProgramDataSource>("loading");
  const [selectedProgram, setSelectedProgram] = useState<SupportProgram | null>(
    null
  );
  const language = profile.language;

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      try {
        const savedProfile = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);
        if (!isMounted) return;

        if (savedProfile) {
          const parsedProfile = JSON.parse(savedProfile) as Partial<UserProfile>;
          setProfile(normalizeProfile({ ...initialProfile, ...parsedProfile }));
          setNeedsOnboarding(false);
        } else {
          setNeedsOnboarding(true);
        }
      } catch {
        if (isMounted) {
          setNeedsOnboarding(true);
        }
      } finally {
        if (isMounted) {
          setHasLoadedProfile(true);
        }
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadSupportPrograms() {
      try {
        const cloudPrograms = await fetchSupportProgramsFromFirestore();
        if (!isMounted) return;

        if (cloudPrograms.length > 0) {
          setPrograms(cloudPrograms);
          setProgramDataSource("cloud");
        } else {
          setPrograms(localSupportPrograms);
          setProgramDataSource("local");
        }
      } catch {
        if (isMounted) {
          setPrograms(localSupportPrograms);
          setProgramDataSource("local");
        }
      }
    }

    loadSupportPrograms();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hasLoadedProfile || needsOnboarding) return;

    AsyncStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile)).catch(() => {
      // 保存できない場合でも、画面操作は続けられるようにします。
    });
  }, [hasLoadedProfile, needsOnboarding, profile]);

  const matchedPrograms = useMemo(
    () =>
      programs
        .map((program) => ({
          program,
          match: getMatchLevel(program, profile)
        }))
        .filter((item) => item.match !== "unlikely")
        .sort((a, b) => scoreMatch(b.match) - scoreMatch(a.match)),
    [profile, programs]
  );

  if (!hasLoadedProfile) {
    return (
      <SafeAreaView style={styles.screen}>
        <StatusBar style="dark" />
        <View style={styles.loadingScreen}>
          <Text style={styles.appName}>{t(language, "appName")}</Text>
          <Text style={styles.appTagline}>{t(language, "appTagline")}</Text>
          <Text style={styles.noticeText}>{t(language, "loadingProfile")}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (needsOnboarding) {
    return (
      <SafeAreaView style={styles.screen}>
        <StatusBar style="dark" />
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.appName}>{t(language, "appName")}</Text>
          <Text style={styles.appTagline}>{t(language, "appTagline")}</Text>
          <Text style={styles.onboardingTitle}>
            {t(language, "firstProfileTitle")}
          </Text>
          <Text style={styles.onboardingBody}>
            {t(language, "firstProfileBody")}
          </Text>
          <ProfileForm
            profile={profile}
            onChange={(next) => setProfile(normalizeProfile(next))}
          />
          <Pressable
            style={styles.primaryButton}
            onPress={async () => {
              const normalized = normalizeProfile(profile);
              setProfile(normalized);
              await AsyncStorage.setItem(
                PROFILE_STORAGE_KEY,
                JSON.stringify(normalized)
              );
              setNeedsOnboarding(false);
            }}
          >
            <Ionicons name="checkmark" size={20} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>
              {t(language, "saveAndStart")}
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (selectedProgram) {
    return (
      <ProgramDetail
        language={language}
        program={selectedProgram}
        profile={profile}
        onBack={() => setSelectedProgram(null)}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <View>
          <Text style={styles.appName}>{t(language, "appName")}</Text>
          <Text style={styles.appTagline}>{t(language, "appTagline")}</Text>
          <Text style={styles.headerSub}>
            {profile.region} / {t(language, profile.household)}
          </Text>
          <Text style={styles.dataSourceText}>
            {t(language, `programData_${programDataSource}`)}
          </Text>
        </View>
        <SegmentedLanguage
          language={language}
          onChange={(next) => setProfile(normalizeProfile({ ...profile, language: next }))}
        />
      </View>

      {tab === "home" && (
        <HomeScreen
          profile={profile}
          programs={matchedPrograms}
          onOpen={setSelectedProgram}
        />
      )}
      {tab === "search" && (
        <SearchScreen
          language={language}
          profile={profile}
          programs={programs}
          onOpen={setSelectedProgram}
        />
      )}
      {tab === "alerts" && (
        <AlertsScreen
          language={language}
          profile={profile}
          programs={matchedPrograms}
          onChangeProfile={setProfile}
          onOpen={setSelectedProgram}
        />
      )}
      {tab === "profile" && (
        <ProfileScreen
          profile={profile}
          onChange={setProfile}
          onReset={async () => {
            await AsyncStorage.removeItem(PROFILE_STORAGE_KEY);
            setSelectedProgram(null);
            setProfile(initialProfile);
            setNeedsOnboarding(true);
          }}
        />
      )}

      <TabBar active={tab} language={language} onChange={setTab} />
    </SafeAreaView>
  );
}

function HomeScreen({
  profile,
  programs,
  onOpen
}: {
  profile: UserProfile;
  programs: { program: SupportProgram; match: MatchLevel }[];
  onOpen: (program: SupportProgram) => void;
}) {
  const language = profile.language;
  const urgent = programs.filter((item) => isDeadlineSoon(item.program.deadline));

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.noticeBand}>
        <Ionicons name="shield-checkmark-outline" size={22} color="#2E6B4F" />
        <Text style={styles.noticeText}>{t(language, "officialCheck")}</Text>
      </View>

      <View style={styles.profileSummary}>
        <Text style={styles.profileSummaryLabel}>
          {t(language, "profileConditions")}
        </Text>
        <Text style={styles.profileSummaryText}>
          {formatProfileSummary(profile, language)}
        </Text>
      </View>

      <SectionTitle
        title={t(language, "likelySupport")}
        icon="sparkles-outline"
      />
      {programs.length > 0 ? (
        programs.map(({ program, match }) => (
          <ProgramCard
            key={program.id}
            language={language}
            program={program}
            match={match}
            onOpen={() => onOpen(program)}
          />
        ))
      ) : (
        <EmptyState text={t(language, "noMatchingPrograms")} />
      )}

      <SectionTitle title={t(language, "deadlineSoon")} icon="time-outline" />
      {urgent.map(({ program, match }) => (
        <ProgramCard
          key={`urgent-${program.id}`}
          language={language}
          program={program}
          match={match}
          compact
          onOpen={() => onOpen(program)}
        />
      ))}
    </ScrollView>
  );
}

function SearchScreen({
  language,
  profile,
  programs,
  onOpen
}: {
  language: Language;
  profile: UserProfile;
  programs: SupportProgram[];
  onOpen: (program: SupportProgram) => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedConcern, setSelectedConcern] = useState<ConcernId>("money");
  const normalizedQuery = normalizeSearchText(query);
  const selectedConcernCard = concernCards.find(
    (concern) => concern.id === selectedConcern
  );
  const results = programs
    .filter((program) => matchesConcern(program, selectedConcernCard))
    .filter((program) => matchesSearchQuery(program, normalizedQuery))
    .map((program) => ({
      program,
      match: getConcernSearchMatchLevel(program, profile, selectedConcern)
    }))
    .filter((item) => item.match !== "unlikely")
    .sort((a, b) => matchRank(a.match) - matchRank(b.match));

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <SectionTitle title={t(language, "concernSearch")} icon="compass-outline" />
      <View style={styles.concernGrid}>
        {concernCards.map((concern) => {
          const active = concern.id === selectedConcern;
          return (
            <Pressable
              key={concern.id}
              style={[
                styles.concernCard,
                active && [
                  styles.concernCardActive,
                  { borderColor: concern.color }
                ]
              ]}
              onPress={() => setSelectedConcern(concern.id)}
            >
              <View
                style={[
                  styles.concernIcon,
                  { backgroundColor: active ? concern.color : "#EAF1EC" }
                ]}
              >
                <Ionicons
                  name={concern.icon}
                  size={21}
                  color={active ? "#FFFFFF" : concern.color}
                />
              </View>
              <Text
                style={[
                  styles.concernTitle,
                  active && { color: concern.color }
                ]}
              >
                {t(language, `concern_${concern.id}`)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <SectionTitle title={t(language, "filterByKeyword")} icon="search-outline" />
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={20} color="#52635A" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder={t(language, "searchPlaceholder")}
          placeholderTextColor="#7A8780"
          style={styles.searchInput}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <Pressable style={styles.clearButton} onPress={() => setQuery("")}>
            <Ionicons name="close" size={18} color="#52635A" />
          </Pressable>
        )}
      </View>

      <View style={styles.group}>
        <Text style={styles.groupTitle}>
          {t(language, "concernResultTitle")}・
          {t(language, `concern_${selectedConcern}`)}
        </Text>
        <Text style={styles.groupDescription}>
          {t(language, `concern_${selectedConcern}_hint`)}
        </Text>
        {results.length > 0 ? (
          results.map(({ program, match }) => (
            <ProgramCard
              key={program.id}
              language={language}
              program={program}
              match={match}
              compact
              onOpen={() => onOpen(program)}
            />
          ))
        ) : (
          <EmptyState text={t(language, "noMatchingPrograms")} compact />
        )}
      </View>
    </ScrollView>
  );
}

function AlertsScreen({
  language,
  profile,
  programs,
  onChangeProfile,
  onOpen
}: {
  language: Language;
  profile: UserProfile;
  programs: { program: SupportProgram; match: MatchLevel }[];
  onChangeProfile: (profile: UserProfile) => void;
  onOpen: (program: SupportProgram) => void;
}) {
  const likelyCount = programs.length;
  const highCount = programs.filter((item) => item.match === "high").length;
  const deadlineItems = programs.filter((item) => isDeadlineSoon(item.program.deadline));

  async function scheduleSupportSummary(frequency: NotificationFrequency) {
    const nextProfile = normalizeProfile({
      ...profile,
      notificationsEnabled: frequency !== "off",
      notificationFrequency: frequency
    });
    onChangeProfile(nextProfile);

    await Notifications.cancelAllScheduledNotificationsAsync();

    if (frequency === "off") {
      Alert.alert(t(language, "notifications"), t(language, "notificationOffMessage"));
      return;
    }

    const permission = await Notifications.requestPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(t(language, "notifications"), t(language, "notificationPermissionNeeded"));
      return;
    }

    const seconds = frequency === "daily" ? 60 * 60 * 24 : 60 * 60 * 24 * 7;
    await Notifications.scheduleNotificationAsync({
      content: {
        title: t(language, "supportNotificationTitle"),
        body: formatSupportNotificationBody(language, likelyCount, highCount)
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds,
        repeats: true
      }
    });

    Alert.alert(
      t(language, "notificationScheduleSaved"),
      formatSupportNotificationBody(language, likelyCount, highCount)
    );
  }

  async function sendTestNotification() {
    const permission = await Notifications.requestPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(t(language, "notifications"), t(language, "notificationPermissionNeeded"));
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: t(language, "supportNotificationTitle"),
        body: formatSupportNotificationBody(language, likelyCount, highCount)
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 5
      }
    });

    Alert.alert(t(language, "testNotificationSent"), t(language, "testNotificationHint"));
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <SectionTitle title={t(language, "personalNotificationSettings")} icon="notifications-outline" />
      <View style={styles.notificationSummary}>
        <View style={styles.notificationIcon}>
          <Ionicons name="sparkles-outline" size={25} color="#FFFFFF" />
        </View>
        <View style={styles.notificationSummaryText}>
          <Text style={styles.notificationCount}>
            {likelyCount}
            <Text style={styles.notificationCountUnit}>
              {t(language, "supportCountUnit")}
            </Text>
          </Text>
          <Text style={styles.notificationBody}>
            {formatSupportNotificationBody(language, likelyCount, highCount)}
          </Text>
        </View>
      </View>

      <ChoiceRow
        label={t(language, "notificationFrequency")}
        choices={["daily", "weekly", "off"] as const}
        value={profile.notificationFrequency}
        language={language}
        onChange={scheduleSupportSummary}
      />

      <View style={styles.noticeBand}>
        <Ionicons name="information-circle-outline" size={21} color="#2E6B4F" />
        <Text style={styles.noticeText}>{t(language, "notificationExplanation")}</Text>
      </View>

      <SectionTitle title={t(language, "notificationPreview")} icon="mail-unread-outline" />
      <View style={styles.previewCard}>
        <Text style={styles.previewTitle}>{t(language, "supportNotificationTitle")}</Text>
        <Text style={styles.previewBody}>
          {formatSupportNotificationBody(language, likelyCount, highCount)}
        </Text>
      </View>
      <Pressable style={styles.secondaryButton} onPress={sendTestNotification}>
        <Ionicons name="paper-plane-outline" size={19} color="#2E6B4F" />
        <Text style={styles.secondaryButtonText}>
          {t(language, "sendTestNotification")}
        </Text>
      </Pressable>

      <SectionTitle title={t(language, "likelySupport")} icon="sparkles-outline" />
      {programs.length > 0 ? (
        programs.map(({ program, match }) => (
          <ProgramCard
            key={`notification-preview-${program.id}`}
            language={language}
            program={program}
            match={match}
            compact
            onOpen={() => onOpen(program)}
          />
        ))
      ) : (
        <EmptyState text={t(language, "noMatchingPrograms")} compact />
      )}

      <SectionTitle title={t(language, "deadlineSoon")} icon="alarm-outline" />
      {deadlineItems.length > 0 ? (
        deadlineItems.map(({ program, match }) => (
          <ProgramCard
            key={`deadline-${program.id}`}
            language={language}
            program={program}
            match={match}
            compact
            onOpen={() => onOpen(program)}
          />
        ))
      ) : (
        <EmptyState text={t(language, "noDeadlinePrograms")} compact />
      )}
    </ScrollView>
  );
}

function ProfileScreen({
  profile,
  onChange,
  onReset
}: {
  profile: UserProfile;
  onChange: (profile: UserProfile) => void;
  onReset: () => void;
}) {
  const language = profile.language;

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <SectionTitle title={t(language, "profile")} icon="person-outline" />
      <ProfileForm profile={profile} onChange={onChange} />
      <View style={styles.resetBlock}>
        <Text style={styles.resetHint}>{t(language, "resetProfileHint")}</Text>
        <Pressable
          style={styles.secondaryDangerButton}
          onPress={() =>
            Alert.alert(
              t(language, "resetProfileConfirmTitle"),
              t(language, "resetProfileConfirmBody"),
              [
                { text: t(language, "cancel"), style: "cancel" },
                {
                  text: t(language, "resetProfile"),
                  style: "destructive",
                  onPress: onReset
                }
              ]
            )
          }
        >
          <Ionicons name="refresh-outline" size={19} color="#8A3A31" />
          <Text style={styles.secondaryDangerText}>
            {t(language, "resetProfile")}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function ProfileForm({
  profile,
  onChange
}: {
  profile: UserProfile;
  onChange: (profile: UserProfile) => void;
}) {
  const language = profile.language;

  return (
    <>
      <ChoiceRow
        label={t(language, "region")}
        choices={SUPPORTED_REGIONS}
        value={profile.region}
        language={language}
        onChange={(region) =>
          onChange(normalizeProfile({ ...profile, region }))
        }
      />
      <ChoiceRow
        label={t(language, "household")}
        choices={["single_parent", "two_parent", "single"]}
        value={profile.household}
        language={language}
        onChange={(household) =>
          onChange(
            normalizeProfile({
              ...profile,
              household,
              hasChildren:
                household === "single"
                  ? false
                  : household === "single_parent"
                    ? true
                    : profile.hasChildren,
              childrenCount:
                household === "single"
                  ? 0
                  : household === "single_parent"
                    ? Math.max(profile.childrenCount, 1)
                    : profile.childrenCount,
              childrenAges:
                household === "single"
                  ? []
                  : household === "single_parent"
                    ? syncChildrenAges(profile.childrenAges, Math.max(profile.childrenCount, 1))
                    : profile.childrenAges
            })
          )
        }
      />
      <ToggleRow
        label={t(language, "children")}
        value={profile.hasChildren}
        language={language}
        onChange={(hasChildren) =>
          onChange(normalizeProfile({
            ...profile,
            household: resolveHouseholdAfterChildrenToggle(
              profile.household,
              hasChildren
            ),
            hasChildren,
            childrenCount: hasChildren ? Math.max(profile.childrenCount, 1) : 0,
            childrenAges: hasChildren ? profile.childrenAges : []
          }))
        }
      />
      {profile.hasChildren && (
        <CountRow
          label={t(language, "childCount")}
          value={profile.childrenCount}
          suffix={t(language, "people")}
          onChange={(childrenCount) =>
            onChange(normalizeProfile({
              ...profile,
              childrenCount,
              hasChildren: childrenCount > 0,
              childrenAges: syncChildrenAges(profile.childrenAges, childrenCount)
            }))
          }
        />
      )}
      <ToggleRow
        label={t(language, "disabilityStatus")}
        value={profile.hasDisability}
        language={language}
        onChange={(hasDisability) =>
          onChange(normalizeProfile({ ...profile, hasDisability }))
        }
      />
      <ToggleRow
        label={t(language, "foreignSupport")}
        value={profile.wantsForeignSupport}
        language={language}
        onChange={(wantsForeignSupport) =>
          onChange(normalizeProfile({ ...profile, wantsForeignSupport }))
        }
      />
      <ToggleRow
        label={t(language, "notifications")}
        value={profile.notificationsEnabled}
        language={language}
        onChange={(notificationsEnabled) =>
          onChange(normalizeProfile({ ...profile, notificationsEnabled }))
        }
      />
      <View style={styles.noticeBand}>
        <Ionicons name="lock-closed-outline" size={20} color="#2E6B4F" />
        <Text style={styles.noticeText}>{t(language, "privacy")}</Text>
      </View>
    </>
  );
}

function ProgramDetail({
  language,
  program,
  profile,
  onBack
}: {
  language: Language;
  program: SupportProgram;
  profile: UserProfile;
  onBack: () => void;
}) {
  const title = language === "ja" ? program.titleJa : program.titleEn;
  const summary = language === "ja" ? program.summaryJa : program.summaryEn;
  const eligibility =
    language === "ja" ? program.eligibilityJa : program.eligibilityEn;
  const benefit = language === "ja" ? program.benefitJa : program.benefitEn;
  const method =
    language === "ja" ? program.applicationMethodJa : program.applicationMethodEn;
  const documents =
    language === "ja" ? program.requiredDocumentsJa : program.requiredDocumentsEn;
  const match = getMatchLevel(program, profile);
  const [checkedDocuments, setCheckedDocuments] = useState<number[]>([]);
  const checkedCount = checkedDocuments.filter((index) => index < documents.length).length;
  const generatedMemo = createConsultationMemo({
    language,
    profile,
    program,
    documents
  });
  const [consultationMemo, setConsultationMemo] = useState(generatedMemo);

  useEffect(() => {
    let isMounted = true;

    async function loadChecklist() {
      try {
        const savedChecklist = await AsyncStorage.getItem(
          `${DOCUMENT_CHECKLIST_STORAGE_PREFIX}${program.id}`
        );
        if (!isMounted) return;

        if (savedChecklist) {
          const parsed = JSON.parse(savedChecklist);
          setCheckedDocuments(Array.isArray(parsed) ? parsed : []);
        } else {
          setCheckedDocuments([]);
        }
      } catch {
        if (isMounted) {
          setCheckedDocuments([]);
        }
      }
    }

    loadChecklist();

    return () => {
      isMounted = false;
    };
  }, [program.id]);

  useEffect(() => {
    let isMounted = true;

    async function loadMemo() {
      try {
        const savedMemo = await AsyncStorage.getItem(
          `${CONSULTATION_MEMO_STORAGE_PREFIX}${program.id}`
        );
        if (!isMounted) return;
        setConsultationMemo(savedMemo || generatedMemo);
      } catch {
        if (isMounted) {
          setConsultationMemo(generatedMemo);
        }
      }
    }

    loadMemo();

    return () => {
      isMounted = false;
    };
  }, [generatedMemo, program.id]);

  async function toggleDocument(index: number) {
    const next = checkedDocuments.includes(index)
      ? checkedDocuments.filter((item) => item !== index)
      : [...checkedDocuments, index].sort((a, b) => a - b);

    setCheckedDocuments(next);
    await AsyncStorage.setItem(
      `${DOCUMENT_CHECKLIST_STORAGE_PREFIX}${program.id}`,
      JSON.stringify(next)
    );
  }

  async function updateConsultationMemo(text: string) {
    setConsultationMemo(text);
    await AsyncStorage.setItem(
      `${CONSULTATION_MEMO_STORAGE_PREFIX}${program.id}`,
      text
    );
  }

  async function copyConsultationMemo() {
    await Clipboard.setStringAsync(consultationMemo);
    Alert.alert(t(language, "memoCopiedTitle"), t(language, "memoCopiedBody"));
  }

  async function resetConsultationMemo() {
    await AsyncStorage.removeItem(`${CONSULTATION_MEMO_STORAGE_PREFIX}${program.id}`);
    setConsultationMemo(generatedMemo);
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      <View style={styles.detailHeader}>
        <Pressable style={styles.iconButton} onPress={onBack}>
          <Ionicons name="chevron-back" size={26} color="#16352A" />
        </Pressable>
        <Text style={styles.detailHeaderTitle}>{t(language, "details")}</Text>
        <View style={styles.iconButton} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.detailTitle}>{title}</Text>
        <View style={styles.metaLine}>
          <Pill text={categoryLabel(language, program.category)} tone="soft" />
          <Pill text={matchLabel(language, match)} tone={match} />
        </View>
        <Text style={styles.summary}>{summary}</Text>
        <View style={styles.noticeBand}>
          <Ionicons name="information-circle-outline" size={21} color="#2E6B4F" />
          <Text style={styles.noticeText}>{t(language, "aiNotice")}</Text>
        </View>

        <DetailBlock title={t(language, "eligibility")} body={eligibility} />
        <DetailBlock title={t(language, "benefit")} body={benefit} />
        <ConsultationMemo
          language={language}
          memo={consultationMemo}
          onChange={updateConsultationMemo}
          onCopy={copyConsultationMemo}
          onReset={resetConsultationMemo}
        />
        <DetailBlock
          title={t(language, "deadline")}
          body={program.deadline ?? t(language, "noDeadline")}
        />
        <DocumentChecklist
          language={language}
          documents={documents}
          checkedDocuments={checkedDocuments}
          checkedCount={checkedCount}
          onToggle={toggleDocument}
        />
        <DetailBlock title={t(language, "apply")} body={method} />
        <DetailBlock
          title={t(language, "source")}
          body={`${program.organization}\n${program.sourceUrl}`}
        />

        <Pressable
          style={styles.primaryButton}
          onPress={() => Linking.openURL(program.sourceUrl)}
        >
          <Ionicons name="open-outline" size={20} color="#FFFFFF" />
          <Text style={styles.primaryButtonText}>{t(language, "officialSite")}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function ProgramCard({
  language,
  program,
  match,
  compact,
  onOpen
}: {
  language: Language;
  program: SupportProgram;
  match: MatchLevel;
  compact?: boolean;
  onOpen: () => void;
}) {
  const title = language === "ja" ? program.titleJa : program.titleEn;
  const summary = language === "ja" ? program.summaryJa : program.summaryEn;

  return (
    <Pressable style={styles.card} onPress={onOpen}>
      <View style={styles.cardTop}>
        <Pill text={categoryLabel(language, program.category)} tone="soft" />
        <Pill text={matchLabel(language, match)} tone={match} />
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      {!compact && <Text style={styles.cardBody}>{summary}</Text>}
      <View style={styles.cardFooter}>
        <Text style={styles.deadline}>
          {t(language, "deadline")}: {program.deadline ?? t(language, "noDeadline")}
        </Text>
        <Ionicons name="chevron-forward" size={20} color="#6A766F" />
      </View>
    </Pressable>
  );
}

function AlertRow({
  language,
  program,
  onReminder
}: {
  language: Language;
  program: SupportProgram;
  onReminder: () => void;
}) {
  const title = language === "ja" ? program.titleJa : program.titleEn;
  return (
    <View style={styles.alertRow}>
      <View style={styles.alertIcon}>
        <Ionicons name="megaphone-outline" size={20} color="#2E6B4F" />
      </View>
      <View style={styles.alertText}>
        <Text style={styles.alertTitle}>{title}</Text>
        <Text style={styles.deadline}>
          {t(language, "deadline")}: {program.deadline ?? t(language, "noDeadline")}
        </Text>
      </View>
      <Pressable style={styles.smallButton} onPress={onReminder}>
        <Ionicons name="alarm-outline" size={18} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

function TabBar({
  active,
  language,
  onChange
}: {
  active: Tab;
  language: Language;
  onChange: (tab: Tab) => void;
}) {
  const tabs: { key: Tab; icon: keyof typeof Ionicons.glyphMap }[] = [
    { key: "home", icon: "home-outline" },
    { key: "search", icon: "search-outline" },
    { key: "alerts", icon: "notifications-outline" },
    { key: "profile", icon: "person-outline" }
  ];

  return (
    <View style={styles.tabBar}>
      {tabs.map((item) => {
        const isActive = active === item.key;
        return (
          <Pressable
            key={item.key}
            style={[styles.tabItem, isActive && styles.activeTabItem]}
            onPress={() => onChange(item.key)}
          >
            <Ionicons
              name={item.icon}
              size={21}
              color={isActive ? "#FFFFFF" : "#52635A"}
            />
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {t(language, item.key)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function SectionTitle({
  title,
  icon
}: {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <View style={styles.sectionTitle}>
      <Ionicons name={icon} size={20} color="#16352A" />
      <Text style={styles.sectionText}>{title}</Text>
    </View>
  );
}

function DetailBlock({ title, body }: { title: string; body: string }) {
  return (
    <View style={styles.detailBlock}>
      <Text style={styles.detailBlockTitle}>{title}</Text>
      <Text style={styles.detailBlockBody}>{body}</Text>
    </View>
  );
}

function DocumentChecklist({
  language,
  documents,
  checkedDocuments,
  checkedCount,
  onToggle
}: {
  language: Language;
  documents: string[];
  checkedDocuments: number[];
  checkedCount: number;
  onToggle: (index: number) => void;
}) {
  return (
    <View style={styles.detailBlock}>
      <View style={styles.checklistHeader}>
        <View>
          <Text style={styles.detailBlockTitle}>{t(language, "documents")}</Text>
          <Text style={styles.checklistProgress}>
            {checkedCount}/{documents.length} {t(language, "documentsReady")}
          </Text>
        </View>
      </View>
      <Text style={styles.checklistHint}>{t(language, "documentChecklistHint")}</Text>
      {documents.map((document, index) => {
        const checked = checkedDocuments.includes(index);
        return (
          <Pressable
            key={`${document}-${index}`}
            style={[styles.checklistItem, checked && styles.checklistItemChecked]}
            onPress={() => onToggle(index)}
          >
            <View style={[styles.checkCircle, checked && styles.checkCircleChecked]}>
              {checked && <Ionicons name="checkmark" size={17} color="#FFFFFF" />}
            </View>
            <Text style={[styles.checklistText, checked && styles.checklistTextChecked]}>
              {document}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function ConsultationMemo({
  language,
  memo,
  onChange,
  onCopy,
  onReset
}: {
  language: Language;
  memo: string;
  onChange: (text: string) => void;
  onCopy: () => void;
  onReset: () => void;
}) {
  return (
    <View style={styles.detailBlock}>
      <Text style={styles.detailBlockTitle}>{t(language, "consultationMemo")}</Text>
      <Text style={styles.checklistHint}>{t(language, "consultationMemoHint")}</Text>
      <TextInput
        value={memo}
        onChangeText={onChange}
        multiline
        textAlignVertical="top"
        style={styles.memoInput}
      />
      <View style={styles.memoActions}>
        <Pressable style={styles.memoButton} onPress={onCopy}>
          <Ionicons name="copy-outline" size={18} color="#2E6B4F" />
          <Text style={styles.memoButtonText}>{t(language, "copyMemo")}</Text>
        </Pressable>
        <Pressable style={styles.memoButton} onPress={onReset}>
          <Ionicons name="refresh-outline" size={18} color="#2E6B4F" />
          <Text style={styles.memoButtonText}>{t(language, "resetMemo")}</Text>
        </Pressable>
      </View>
    </View>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.profileRow}>
      <Text style={styles.profileLabel}>{label}</Text>
      <Text style={styles.profileValue}>{value}</Text>
    </View>
  );
}

function ChoiceRow<T extends string>({
  label,
  choices,
  value,
  language,
  onChange
}: {
  label: string;
  choices: readonly T[];
  value: T;
  language: Language;
  onChange: (value: T) => void;
}) {
  return (
    <View style={styles.profileBlock}>
      <Text style={styles.profileLabel}>{label}</Text>
      <View style={styles.choiceWrap}>
        {choices.map((choice) => (
          <Pressable
            key={choice}
            style={[styles.choice, value === choice && styles.choiceActive]}
            onPress={() => onChange(choice)}
          >
            <Text
              style={[styles.choiceText, value === choice && styles.choiceTextActive]}
            >
              {t(language, choice)}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function ToggleRow({
  label,
  value,
  language,
  onChange
}: {
  label: string;
  value: boolean;
  language: Language;
  onChange: (value: boolean) => void;
}) {
  return (
    <View style={styles.profileRow}>
      <View>
        <Text style={styles.profileLabel}>{label}</Text>
        <Text style={styles.profileHint}>{value ? t(language, "yes") : t(language, "no")}</Text>
      </View>
      <Switch
        value={value}
        trackColor={{ true: "#8FC7A6", false: "#CED8D0" }}
        thumbColor={value ? "#2E6B4F" : "#FFFFFF"}
        onValueChange={onChange}
      />
    </View>
  );
}

function EmptyState({ text, compact }: { text: string; compact?: boolean }) {
  return (
    <View style={[styles.emptyState, compact && styles.emptyStateCompact]}>
      <Ionicons name="search-outline" size={20} color="#6A766F" />
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  );
}

function CountRow({
  label,
  value,
  suffix,
  onChange
}: {
  label: string;
  value: number;
  suffix: string;
  onChange: (value: number) => void;
}) {
  const canDecrease = value > 0;
  const canIncrease = value < 6;

  return (
    <View style={styles.profileRow}>
      <View>
        <Text style={styles.profileLabel}>{label}</Text>
        <Text style={styles.profileValue}>
          {value >= 6 ? "6+" : value} {suffix}
        </Text>
      </View>
      <View style={styles.stepper}>
        <Pressable
          style={[styles.stepperButton, !canDecrease && styles.stepperDisabled]}
          onPress={() => canDecrease && onChange(value - 1)}
        >
          <Ionicons
            name="remove"
            size={20}
            color={canDecrease ? "#16352A" : "#A7B2AA"}
          />
        </Pressable>
        <Pressable
          style={[styles.stepperButton, !canIncrease && styles.stepperDisabled]}
          onPress={() => canIncrease && onChange(value + 1)}
        >
          <Ionicons
            name="add"
            size={20}
            color={canIncrease ? "#16352A" : "#A7B2AA"}
          />
        </Pressable>
      </View>
    </View>
  );
}

function SegmentedLanguage({
  language,
  onChange
}: {
  language: Language;
  onChange: (language: Language) => void;
}) {
  return (
    <View style={styles.languageSwitch}>
      {(["ja", "en"] as const).map((item) => (
        <Pressable
          key={item}
          style={[styles.languageOption, language === item && styles.languageActive]}
          onPress={() => onChange(item)}
        >
          <Text
            style={[
              styles.languageText,
              language === item && styles.languageTextActive
            ]}
          >
            {item.toUpperCase()}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

function Pill({ text, tone }: { text: string; tone: MatchLevel | "soft" }) {
  return (
    <View style={[styles.pill, pillStyle(tone)]}>
      <Text style={[styles.pillText, tone === "high" && styles.pillTextDark]}>
        {text}
      </Text>
    </View>
  );
}

function getMatchLevel(program: SupportProgram, profile: UserProfile): MatchLevel {
  if (!isRegionRelevant(program.region, profile.region)) return "unlikely";
  if (program.tags.includes("disability_support") && !profile.hasDisability) {
    return "unlikely";
  }
  if (program.tags.includes("foreign_resident") && !profile.wantsForeignSupport) {
    return "unlikely";
  }
  if (program.tags.includes("single_parent") && profile.household !== "single_parent") {
    return "unlikely";
  }
  if (
    program.tags.includes("child_support") &&
    (!profile.hasChildren || profile.childrenCount === 0)
  ) {
    return "unlikely";
  }

  let score = 1;
  if (program.tags.includes("general_support")) score += 1;
  if (profile.hasDisability && program.tags.includes("disability_support")) {
    score += 3;
  }
  if (
    profile.hasChildren &&
    profile.childrenCount > 0 &&
    program.tags.includes("child_support")
  ) {
    score += 2;
  }
  if (profile.household === "single_parent" && program.tags.includes("single_parent")) {
    score += 2;
  }
  if (profile.wantsForeignSupport && program.tags.includes("foreign_resident")) {
    score += 2;
  }
  if (program.tags.includes("low_income")) score += 1;

  if (score >= 4) return "high";
  if (score >= 2) return "needs_check";
  return "unlikely";
}

function getConcernSearchMatchLevel(
  program: SupportProgram,
  profile: UserProfile,
  selectedConcern: ConcernId
): MatchLevel {
  const match = getMatchLevel(program, profile);
  if (match !== "unlikely") return match;
  if (!isRegionRelevant(program.region, profile.region)) return "unlikely";

  if (
    selectedConcern === "disability" &&
    program.tags.includes("disability_support")
  ) {
    return "needs_check";
  }

  if (
    selectedConcern === "foreign" &&
    (program.tags.includes("foreign_resident") ||
      program.tags.includes("language_support"))
  ) {
    return "needs_check";
  }

  return "unlikely";
}

function isRegionRelevant(programRegion: string, userRegion: string) {
  return programRegion === userRegion || programRegion === "兵庫県";
}

function matchesSearchQuery(program: SupportProgram, normalizedQuery: string) {
  if (!normalizedQuery) return true;

  const searchableText = normalizeSearchText(
    [
      program.titleJa,
      program.titleEn,
      program.summaryJa,
      program.summaryEn,
      program.eligibilityJa,
      program.eligibilityEn,
      program.benefitJa,
      program.benefitEn,
      program.applicationMethodJa,
      program.applicationMethodEn,
      program.requiredDocumentsJa.join(" "),
      program.requiredDocumentsEn.join(" "),
      program.organization,
      program.tags.join(" ")
    ].join(" ")
  );

  return normalizedQuery
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => searchableText.includes(word));
}

function matchesConcern(
  program: SupportProgram,
  concern:
    | {
        tags: string[];
        categories: string[];
      }
    | undefined
) {
  if (!concern) return true;

  return (
    concern.categories.includes(program.category) ||
    concern.tags.some((tag) => program.tags.includes(tag))
  );
}

function matchRank(match: MatchLevel) {
  if (match === "high") return 0;
  if (match === "needs_check") return 1;
  return 2;
}

function normalizeSearchText(text: string) {
  return text.trim().toLowerCase().normalize("NFKC");
}

function formatProfileSummary(profile: UserProfile, language: Language) {
  const childText = profile.hasChildren
    ? `${t(language, "children")} ${profile.childrenCount >= 6 ? "6+" : profile.childrenCount}`
    : t(language, "noChildren");
  const foreignText = profile.wantsForeignSupport
    ? t(language, "foreignSupportOn")
    : t(language, "foreignSupportOff");
  const disabilityText = profile.hasDisability
    ? t(language, "disabilitySupportOn")
    : t(language, "disabilitySupportOff");

  return `${profile.region} / ${t(language, profile.household)} / ${childText} / ${disabilityText} / ${foreignText}`;
}

function formatSupportNotificationBody(
  language: Language,
  likelyCount: number,
  highCount: number
) {
  if (language === "ja") {
    return `関係ありそうな支援が${likelyCount}件あります。可能性が高い支援は${highCount}件です。`;
  }

  return `${likelyCount} support programs may fit you. ${highCount} look highly relevant.`;
}

function createConsultationMemo({
  language,
  profile,
  program,
  documents
}: {
  language: Language;
  profile: UserProfile;
  program: SupportProgram;
  documents: string[];
}) {
  const title = language === "ja" ? program.titleJa : program.titleEn;
  const childLine = profile.hasChildren
    ? language === "ja"
      ? `子どもは${profile.childrenCount}人です。`
      : `I have ${profile.childrenCount} child/children.`
    : language === "ja"
      ? "子どもはいません。"
      : "I do not have children.";
  const disabilityLine = profile.hasDisability
    ? language === "ja"
      ? "障がいに関係する支援も確認したいです。"
      : "I also want to ask about disability-related support."
    : null;
  const foreignLine = profile.wantsForeignSupport
    ? language === "ja"
      ? "外国人住民向け、または外国語で相談できる支援も確認したいです。"
      : "I also want to ask about support for foreign residents or language help."
    : null;

  if (language === "ja") {
    return [
      "相談したいこと:",
      `${title}について、対象になる可能性があるか確認したいです。`,
      "",
      "伝えたい状況:",
      `${profile.region}に住んでいます。`,
      `家族構成は「${t(language, profile.household)}」です。`,
      childLine,
      disabilityLine,
      foreignLine,
      "",
      "確認したいこと:",
      "・対象条件に当てはまるか",
      "・申請に必要な書類",
      "・申請場所と申請方法",
      "・申請期限や注意点",
      "",
      "持参予定の書類:",
      ...documents.map((document) => `・${document}`)
    ]
      .filter((line): line is string => line !== null)
      .join("\n");
  }

  return [
    "What I want to ask:",
    `I would like to check whether I may qualify for ${title}.`,
    "",
    "My situation:",
    `I live in ${profile.region}.`,
    `My household type is ${t(language, profile.household)}.`,
    childLine,
    disabilityLine,
    foreignLine,
    "",
    "Questions:",
    "- Whether I may meet the conditions",
    "- Required documents",
    "- Where and how to apply",
    "- Deadline and important notes",
    "",
    "Documents I may bring:",
    ...documents.map((document) => `- ${document}`)
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}

function normalizeProfile(profile: UserProfile): UserProfile {
  let next = { ...profile };

  if (!next.notificationFrequency) {
    next.notificationFrequency = next.notificationsEnabled ? "daily" : "off";
  }

  if (next.hasChildren && next.childrenCount > 0 && next.household === "single") {
    next.household = "single_parent";
  }

  if (next.household === "single") {
    next.hasChildren = false;
    next.childrenCount = 0;
    next.childrenAges = [];
  }

  if (next.household === "single_parent") {
    next.hasChildren = true;
    next.childrenCount = Math.max(next.childrenCount, 1);
    next.childrenAges = syncChildrenAges(next.childrenAges, next.childrenCount);
  }

  if (!next.hasChildren || next.childrenCount === 0) {
    next.hasChildren = false;
    next.childrenCount = 0;
    next.childrenAges = [];
    if (next.household === "single_parent") {
      next.household = "single";
    }
  }

  return next;
}

function resolveHouseholdAfterChildrenToggle(
  household: UserProfile["household"],
  hasChildren: boolean
): UserProfile["household"] {
  if (hasChildren) {
    return household === "single" ? "single_parent" : household;
  }

  if (household === "single_parent") return "single";
  return household;
}

function syncChildrenAges(currentAges: number[], nextCount: number) {
  if (nextCount <= 0) return [];
  if (nextCount <= currentAges.length) return currentAges.slice(0, nextCount);

  const nextAges = [...currentAges];
  while (nextAges.length < nextCount) {
    nextAges.push(0);
  }
  return nextAges;
}

function scoreMatch(match: MatchLevel) {
  if (match === "high") return 3;
  if (match === "needs_check") return 2;
  return 1;
}

function isDeadlineSoon(deadline: string | null) {
  if (!deadline) return false;
  const now = new Date("2026-06-18T00:00:00+09:00").getTime();
  const due = new Date(`${deadline}T23:59:00+09:00`).getTime();
  const days = (due - now) / 1000 / 60 / 60 / 24;
  return days >= 0 && days <= 60;
}

function pillStyle(tone: MatchLevel | "soft") {
  switch (tone) {
    case "high":
      return { backgroundColor: "#BDE8CD" };
    case "needs_check":
      return { backgroundColor: "#F5DFA8" };
    case "unlikely":
      return { backgroundColor: "#E6E8E6" };
    default:
      return { backgroundColor: "#EAF1EC" };
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7FAF7"
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F7FAF7"
  },
  appName: {
    fontSize: 25,
    fontWeight: "800",
    color: "#16352A"
  },
  appTagline: {
    marginTop: 2,
    color: "#2E6B4F",
    fontSize: 13,
    fontWeight: "800"
  },
  headerSub: {
    marginTop: 3,
    fontSize: 13,
    color: "#52635A"
  },
  dataSourceText: {
    marginTop: 4,
    color: "#2E6B4F",
    fontSize: 12,
    fontWeight: "800"
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 110
  },
  loadingScreen: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    gap: 12
  },
  onboardingTitle: {
    marginTop: 18,
    marginBottom: 8,
    fontSize: 22,
    lineHeight: 29,
    fontWeight: "900",
    color: "#16352A"
  },
  onboardingBody: {
    color: "#52635A",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18
  },
  noticeBand: {
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#EAF4EE",
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
    marginBottom: 18
  },
  noticeText: {
    flex: 1,
    color: "#254B3B",
    fontSize: 14,
    lineHeight: 20
  },
  profileSummary: {
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E7E2",
    marginBottom: 18
  },
  profileSummaryLabel: {
    color: "#2E6B4F",
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 5
  },
  profileSummaryText: {
    color: "#16352A",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700"
  },
  sectionTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
    marginBottom: 10
  },
  sectionText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#16352A"
  },
  searchBox: {
    minHeight: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CED8D0",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  searchInput: {
    flex: 1,
    minHeight: 48,
    color: "#16352A",
    fontSize: 15
  },
  clearButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#EAF1EC",
    alignItems: "center",
    justifyContent: "center"
  },
  concernGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 18
  },
  concernCard: {
    width: "48%",
    minHeight: 92,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDE6E0",
    backgroundColor: "#FFFFFF",
    padding: 12,
    justifyContent: "space-between"
  },
  concernCardActive: {
    backgroundColor: "#F7FBF8",
    borderWidth: 2
  },
  concernIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  concernTitle: {
    color: "#16352A",
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "800"
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E0E7E2"
  },
  cardTop: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10
  },
  cardTitle: {
    fontSize: 17,
    lineHeight: 23,
    fontWeight: "800",
    color: "#16352A"
  },
  cardBody: {
    marginTop: 8,
    color: "#52635A",
    fontSize: 14,
    lineHeight: 20
  },
  cardFooter: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  deadline: {
    color: "#52635A",
    fontSize: 13,
    lineHeight: 18
  },
  pill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  pillText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#254B3B"
  },
  pillTextDark: {
    color: "#16352A"
  },
  group: {
    marginBottom: 18
  },
  groupTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#2E6B4F",
    marginBottom: 8
  },
  groupDescription: {
    color: "#52635A",
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 10
  },
  emptyState: {
    minHeight: 74,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDE6E0",
    backgroundColor: "#F0F5F1",
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  emptyStateCompact: {
    minHeight: 58
  },
  emptyText: {
    flex: 1,
    color: "#52635A",
    fontSize: 14,
    lineHeight: 20
  },
  notificationSummary: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#DDE6E0",
    flexDirection: "row",
    alignItems: "center",
    gap: 14
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#2E6B4F",
    alignItems: "center",
    justifyContent: "center"
  },
  notificationSummaryText: {
    flex: 1
  },
  notificationCount: {
    color: "#16352A",
    fontSize: 28,
    fontWeight: "900",
    lineHeight: 34
  },
  notificationCountUnit: {
    color: "#52635A",
    fontSize: 14,
    fontWeight: "800"
  },
  notificationBody: {
    marginTop: 4,
    color: "#52635A",
    fontSize: 14,
    lineHeight: 20
  },
  previewCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 15,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#DDE6E0"
  },
  previewTitle: {
    color: "#16352A",
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 6
  },
  previewBody: {
    color: "#52635A",
    fontSize: 14,
    lineHeight: 20
  },
  secondaryButton: {
    minHeight: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#C8D9CE",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 14,
    marginBottom: 18
  },
  secondaryButtonText: {
    color: "#2E6B4F",
    fontSize: 15,
    fontWeight: "800"
  },
  alertRow: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E0E7E2",
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  alertIcon: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: "#EAF4EE",
    alignItems: "center",
    justifyContent: "center"
  },
  alertText: {
    flex: 1
  },
  alertTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#16352A",
    marginBottom: 4
  },
  smallButton: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: "#2E6B4F",
    alignItems: "center",
    justifyContent: "center"
  },
  profileRow: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E0E7E2",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12
  },
  profileBlock: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E0E7E2"
  },
  profileLabel: {
    color: "#52635A",
    fontSize: 13,
    marginBottom: 4
  },
  profileValue: {
    color: "#16352A",
    fontSize: 16,
    fontWeight: "800"
  },
  profileHint: {
    color: "#16352A",
    fontSize: 15,
    fontWeight: "700"
  },
  resetBlock: {
    marginTop: 4,
    marginBottom: 24
  },
  resetHint: {
    color: "#52635A",
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 10
  },
  secondaryDangerButton: {
    minHeight: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0B9B2",
    backgroundColor: "#FFF7F5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 14
  },
  secondaryDangerText: {
    color: "#8A3A31",
    fontSize: 15,
    fontWeight: "800"
  },
  choiceWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8
  },
  choice: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CED8D0",
    paddingHorizontal: 12,
    paddingVertical: 9
  },
  choiceActive: {
    backgroundColor: "#2E6B4F",
    borderColor: "#2E6B4F"
  },
  choiceText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#52635A"
  },
  choiceTextActive: {
    color: "#FFFFFF"
  },
  stepper: {
    flexDirection: "row",
    gap: 8
  },
  stepperButton: {
    width: 42,
    height: 42,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CED8D0",
    backgroundColor: "#F7FAF7",
    alignItems: "center",
    justifyContent: "center"
  },
  stepperDisabled: {
    backgroundColor: "#EEF2EF"
  },
  languageSwitch: {
    flexDirection: "row",
    backgroundColor: "#EAF1EC",
    borderRadius: 8,
    padding: 3
  },
  languageOption: {
    borderRadius: 6,
    paddingHorizontal: 11,
    paddingVertical: 7
  },
  languageActive: {
    backgroundColor: "#2E6B4F"
  },
  languageText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#52635A"
  },
  languageTextActive: {
    color: "#FFFFFF"
  },
  tabBar: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDE6E0",
    padding: 7,
    flexDirection: "row",
    gap: 6
  },
  tabItem: {
    flex: 1,
    minHeight: 56,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    gap: 3
  },
  activeTabItem: {
    backgroundColor: "#2E6B4F"
  },
  tabText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#52635A"
  },
  activeTabText: {
    color: "#FFFFFF"
  },
  detailHeader: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  detailHeaderTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#16352A"
  },
  detailTitle: {
    fontSize: 26,
    lineHeight: 33,
    fontWeight: "900",
    color: "#16352A",
    marginBottom: 12
  },
  metaLine: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 14
  },
  summary: {
    fontSize: 16,
    lineHeight: 24,
    color: "#2A4439",
    marginBottom: 16
  },
  detailBlock: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E0E7E2"
  },
  detailBlockTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#2E6B4F",
    marginBottom: 8
  },
  detailBlockBody: {
    color: "#16352A",
    fontSize: 15,
    lineHeight: 22
  },
  checklistHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12
  },
  checklistProgress: {
    color: "#52635A",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8
  },
  checklistHint: {
    color: "#52635A",
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 10
  },
  checklistItem: {
    minHeight: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDE6E0",
    backgroundColor: "#F9FCFA",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 8
  },
  checklistItemChecked: {
    backgroundColor: "#EAF4EE",
    borderColor: "#B9D3C2"
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#9DB2A5",
    alignItems: "center",
    justifyContent: "center"
  },
  checkCircleChecked: {
    backgroundColor: "#2E6B4F",
    borderColor: "#2E6B4F"
  },
  checklistText: {
    flex: 1,
    color: "#16352A",
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "700"
  },
  checklistTextChecked: {
    color: "#2E6B4F"
  },
  memoInput: {
    minHeight: 210,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDE6E0",
    backgroundColor: "#F9FCFA",
    padding: 12,
    color: "#16352A",
    fontSize: 14,
    lineHeight: 21
  },
  memoActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12
  },
  memoButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#C8D9CE",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    paddingHorizontal: 10
  },
  memoButtonText: {
    color: "#2E6B4F",
    fontSize: 14,
    fontWeight: "800"
  },
  primaryButton: {
    height: 52,
    borderRadius: 8,
    backgroundColor: "#2E6B4F",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 4
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800"
  }
});
