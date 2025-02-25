import {readFileSync, writeFileSync } from "node:fs"
import {join} from 'node:path';

// ファイルを読み込む関数
const readFile = (filePath: string): string => {
    try {
        return readFileSync(filePath, 'utf-8');
    } catch (err) {
        console.error(`Error reading file from disk: ${err}`);
        return '';
    }
};

// ファイルに書き込む関数
const writeFile = (filePath: string, data: string): void => {
    try {
        writeFileSync(filePath, data, 'utf-8');
    } catch (err) {
        console.error(`Error writing file to disk: ${err}`);
    }
};

// 文字列のバッククォートをエスケープする関数
const escapeBackticks = (str: string): string => {
    return str.replace(/`/g, '\\`');
};

const filePath = join('./schema/supergraph.graphqls');
const fileContent = readFile(filePath);
const escapedContent = escapeBackticks(fileContent);

const outputFilePath = join('./src/supergraph.graphqls.ts');
writeFile(outputFilePath, `
export const graphqlSchema = \`
${escapedContent}    
\`;`);