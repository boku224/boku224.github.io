// src/script.js を難読化して、公開用の script.js を作る。
//   npm run build      … 難読化する (公開するときはこちら)
//   npm run build:dev  … 難読化せずにコピーする (手元で動きを確かめるとき)
// src/ は .gitignore で除外しているので、公開されたリポジトリやページから元のコードは見えない。
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src', 'script.js');
const OUT = path.join(ROOT, 'script.js');
const DEV = process.argv.includes('--dev');

const code = fs.readFileSync(SRC, 'utf8');

function obfuscate(src) {
    const JavaScriptObfuscator = require('javascript-obfuscator');
    return JavaScriptObfuscator.obfuscate(src, {
        target: 'browser',
        compact: true,
        simplify: true,
        identifierNamesGenerator: 'hexadecimal',
        renameGlobals: true,            // 外から呼ばれる名前は無いので、すべて置き換える
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.3,
        deadCodeInjection: false,
        selfDefending: false,
        stringArray: true,              // 文字列 (メールアドレスなど) をまとめて暗号化する
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 1,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 2,
        splitStrings: true,
        splitStringsChunkLength: 8,
        transformObjectKeys: true,
        unicodeEscapeSequence: false
    }).getObfuscatedCode();
}

const out = DEV ? code : obfuscate(code);
fs.writeFileSync(OUT, out);
console.log(`${DEV ? 'コピー' : '難読化'}しました: script.js (${(out.length / 1024).toFixed(1)} KB)`);
