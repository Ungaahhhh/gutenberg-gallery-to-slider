const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const v = process.argv[2];

if (!v) {
  console.error("バージョンを指定してください: npm run age -- ${npm_config_age}");
  process.exit(1);
}

if (!/^v\d+\.\d+\.\d+$/.test(v)) {
  console.error("バージョン形式が正しくありません。例: ${npm_config_age}");
  process.exit(1);
}

console.log(`バージョンを ${v} に更新します...`);

// 対象ファイルを取得
const targetExts = [".html", ".css", ".scss", ".js", ".ts"];
const targetFiles = fs.readdirSync(".").filter((f) => {
  const stat = fs.statSync(f);
  if (stat.isDirectory()) return false;
  return targetExts.includes(path.extname(f)) || f === "README.md";
});

// バージョン文字列を置換
targetFiles.forEach((f) => {
  const content = fs.readFileSync(f, "utf8");
  const updated = content.replace(/v\d+\.\d+\.\d+/g, v);
  if (content !== updated) {
    fs.writeFileSync(f, updated);
    console.log(`  更新: ${f}`);
  }
});

// git add, commit, tag
execSync(`git add . && git commit -m "age" && git tag ${v}`, {
  stdio: "inherit",
  shell: true,
});

console.log(`完了: ${v}`);
