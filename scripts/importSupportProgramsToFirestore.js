const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const { cert, getApps, initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const projectRoot = path.resolve(__dirname, "..");
const defaultProgramsPath = path.join(projectRoot, "src", "data", "programs.ts");
const defaultCollection = "supportPrograms";

function readArg(name) {
  const prefix = `--${name}=`;
  const arg = process.argv.find((item) => item.startsWith(prefix));
  return arg ? arg.slice(prefix.length) : null;
}

function hasFlag(name) {
  return process.argv.includes(`--${name}`);
}

function loadSupportPrograms(programsPath) {
  const source = fs.readFileSync(programsPath, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true
    }
  }).outputText;

  const sandbox = {
    exports: {},
    module: { exports: {} },
    require(request) {
      if (request === "../types") return {};
      return require(request);
    }
  };

  vm.runInNewContext(transpiled, sandbox, {
    filename: programsPath
  });

  const loaded = sandbox.module.exports.supportPrograms || sandbox.exports.supportPrograms;
  if (!Array.isArray(loaded)) {
    throw new Error("supportPrograms を読み込めませんでした。");
  }

  return loaded;
}

function getServiceAccountPath() {
  const fromArg = readArg("key");
  const fromEnv = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  const serviceAccountPath = fromArg || fromEnv;

  if (!serviceAccountPath) {
    throw new Error(
      [
        "Firebaseのサービスアカウント秘密鍵が指定されていません。",
        "例:",
        "  npm run firestore:import -- --key=secrets/firebase-service-account.json",
        "または:",
        "  $env:GOOGLE_APPLICATION_CREDENTIALS='C:\\\\cocoterrace\\\\secrets\\\\firebase-service-account.json'"
      ].join("\n")
    );
  }

  return path.resolve(projectRoot, serviceAccountPath);
}

function validateProgram(program) {
  const requiredStringFields = [
    "id",
    "titleJa",
    "titleEn",
    "category",
    "region",
    "sourceUrl",
    "organization",
    "summaryJa",
    "summaryEn",
    "eligibilityJa",
    "eligibilityEn",
    "benefitJa",
    "benefitEn",
    "applicationMethodJa",
    "applicationMethodEn",
    "updatedAt"
  ];

  for (const field of requiredStringFields) {
    if (typeof program[field] !== "string" || !program[field].trim()) {
      throw new Error(`${program.id || "unknown"} の ${field} が空です。`);
    }
  }

  for (const field of ["requiredDocumentsJa", "requiredDocumentsEn", "tags"]) {
    if (!Array.isArray(program[field])) {
      throw new Error(`${program.id} の ${field} は配列にしてください。`);
    }
  }
}

async function importPrograms() {
  const collectionName = readArg("collection") || defaultCollection;
  const programsPath = path.resolve(projectRoot, readArg("source") || defaultProgramsPath);
  const dryRun = hasFlag("dry-run");
  const programs = loadSupportPrograms(programsPath);

  programs.forEach(validateProgram);

  console.log(`読み込み元: ${programsPath}`);
  console.log(`登録先コレクション: ${collectionName}`);
  console.log(`登録予定件数: ${programs.length}`);

  if (dryRun) {
    console.log("dry-run のためFirestoreには書き込みません。");
    console.log("先頭3件:", programs.slice(0, 3).map((program) => program.id).join(", "));
    return;
  }

  const serviceAccountPath = getServiceAccountPath();
  const serviceAccount = require(serviceAccountPath);

  if (getApps().length === 0) {
    initializeApp({
      credential: cert(serviceAccount)
    });
  }

  const db = getFirestore();
  const collection = db.collection(collectionName);

  let batch = db.batch();
  let operationCount = 0;
  let totalWritten = 0;

  for (const program of programs) {
    const ref = collection.doc(program.id);
    batch.set(ref, program, { merge: false });
    operationCount += 1;

    if (operationCount === 450) {
      await batch.commit();
      totalWritten += operationCount;
      batch = db.batch();
      operationCount = 0;
    }
  }

  if (operationCount > 0) {
    await batch.commit();
    totalWritten += operationCount;
  }

  console.log(`Firestoreへ ${totalWritten} 件を登録しました。`);
}

importPrograms().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
