const fs = require('fs');
const path = require('path');
const os = require('os');

// Goプロジェクトのビルド出力名。
// `go build -o cmd-nove-b.exe main.go` のようにビルドした場合、'cmd-nove-b.exe' になります。
// もし `go build -o cmd-nove-b main.go` のようにビルドし、Goが自動で.exeを付与する場合、
// ここは 'cmd-nove-b' のままでOKです。スクリプトが自動で .exe を付与します。
const sourceBinaryName = 'cmd-nove-b'; // <- あなたがGoをビルドする際の -o オプションの引数に合わせる

// npmパッケージ内の `bin` ディレクトリのパス
const targetDir = path.join(__dirname, '..', 'bin');

// `package.json` の `bin` フィールドで指定したコマンド名（キーの部分）。
// 例: "bin": { "nove-b-cli": "./bin/nove-b-cli" } なら 'nove-b-cli'
let targetCommandName = 'nove-b-cli'; // <- package.json の "bin" フィールドのキーに合わせる

// 最終的なGoバイナリのソースパスを決定
let sourcePath = path.join(__dirname, '..', sourceBinaryName);
if (os.platform() === 'win32' && !sourcePath.endsWith('.exe')) {
    sourcePath += '.exe'; // Windowsで、かつソースパスに.exeがなければ追加
}

// binディレクトリが存在しない場合は作成
if (!fs.existsSync(targetDir)) {
    try {
        fs.mkdirSync(targetDir);
    } catch (err) {
        console.error(`[GoCLI Installer] Error creating bin directory: ${err.message}`);
        process.exit(1);
    }
}

try {
    // ターゲットパス: ユーザーが実際に実行するコマンド名
    // Windowsの場合、通常は .exe が付く形
    const finalTargetPathExe = path.join(targetDir, targetCommandName + '.exe');

    // 1. まず Go バイナリの .exe バージョンをコピー
    fs.copyFileSync(sourcePath, finalTargetPathExe);
    console.log(`[GoCLI Installer] Go binary (EXE) copied to ${finalTargetPathExe}`);

    // 2. Windows環境かつ、拡張子なしのコマンド名も必要とされる場合にコピー
    // 例: Git Bashなどの環境で `nove-b-cli` のように拡張子なしで実行したい場合
    if (os.platform() === 'win32') {
        const finalTargetPathNoExe = path.join(targetDir, targetCommandName);
        fs.copyFileSync(finalTargetPathExe, finalTargetPathNoExe); // .exe付きをコピーして、拡張子なしとして保存
        fs.chmodSync(finalTargetPathNoExe, '755'); // 実行権限を付与
        console.log(`[GoCLI Installer] Created non-EXE link/wrapper at ${finalTargetPathNoExe}`);
    } else {
        // Linux/macOSの場合、拡張子なしのファイルに直接実行権限を付与
        // sourcePath (例: cmd-nove-b) を直接 targetCommandName (例: nove-b-cli) としてコピー
        fs.copyFileSync(sourcePath, path.join(targetDir, targetCommandName));
        fs.chmodSync(path.join(targetDir, targetCommandName), '755');
        console.log(`[GoCLI Installer] Go binary installed successfully to ${path.join(targetDir, targetCommandName)}`);
    }

} catch (error) {
    console.error(`[GoCLI Installer] Error installing Go binary: ${error.message}`);
    console.error(`[GoCLI Installer] Please ensure '${sourceBinaryName}' is built and present in the package root.`);
    process.exit(1); // インストール失敗でnpmプロセスを終了させる
}