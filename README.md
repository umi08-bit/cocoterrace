# ココロテラス

忙しい保護者、介護者、低所得の労働者、外国人住民などが、自分に関係しそうな公的支援制度を短時間で見つけられるスマホアプリのMVPです。

## できること

- 居住地域、家族構成、子どもの有無、使用言語を登録
- 子育て支援、給付金、外国人向け支援の候補を一覧表示
- 「対象となる可能性が高い」「確認が必要」に分類
- 日本語と英語の表示切り替え
- 制度詳細、申請期限、必要書類、公式リンクを表示
- 期限リマインド通知の試作

## 起動方法

```bash
npm install
npm run start
```

PowerShellで `npm` が実行できない場合は、以下を使ってください。

```bash
npm.cmd install --cache C:\cocoterrace\.npm-cache
npm.cmd run start
```

Expo GoでQRコードを読み取ると、iOS / Androidで確認できます。

この環境で Expo がユーザーフォルダへの書き込みに失敗する場合は、次のようにアプリフォルダ内をホームとして指定してください。

```bash
set EXPO_NO_TELEMETRY=1
set HOME=C:\cocoterrace\.home
set USERPROFILE=C:\cocoterrace\.home
npm.cmd run start
```

## MVPの前提

この版では、制度データは `src/data/programs.ts` のサンプルです。実運用では、自治体サイト、都道府県、国の公式情報をバックエンドで収集し、確認済みデータだけをアプリへ配信する設計に差し替えます。
