# Firestore 一括登録メモ

このメモは、アプリ内の `supportPrograms` データを Firebase Firestore にまとめて登録する手順です。

## 1. 秘密鍵を保存する

Firebase Console でサービスアカウント秘密鍵を作成し、次の場所に保存します。

```text
C:\cocoterrace\secrets\firebase-service-account.json
```

`secrets/` と `firebase-service-account*.json` は `.gitignore` に入れているので、GitHubには上がりません。

## 2. まず確認だけ実行する

Firestoreへ書き込まず、読み込める件数だけ確認します。

```powershell
cd C:\cocoterrace
npm run firestore:import:dry
```

## 3. Firestoreへ一括登録する

```powershell
cd C:\cocoterrace
npm run firestore:import -- --key=secrets/firebase-service-account.json
```

登録先コレクションは標準で次になります。

```text
supportPrograms
```

## 4. 別コレクションに登録したい場合

```powershell
npm run firestore:import -- --key=secrets/firebase-service-account.json --collection=supportProgramsTest
```

## 注意

- 秘密鍵は絶対にGitHubへ上げないでください。
- 同じドキュメントIDがある場合は上書きします。
- ドキュメントIDには各制度の `id` を使います。
- まずは `firestore:import:dry` で件数確認してから本登録してください。
