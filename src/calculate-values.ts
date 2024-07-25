import fs from 'node:fs/promises';
import path from 'node:path';

import type { FileExtension } from './types';

const calculateValues = async (
  fileNames: string[],
  ignoreEmptyLines: boolean,
  typescriptExtensions: FileExtension[],
) => {
  const totalFilesAll = fileNames.length;
  let totalLinesAll = 0;
  let totalFilesTS = 0;
  let totalLinesTS = 0;

  for (const fileName of fileNames) {
    const ext = path.extname(fileName) as FileExtension;
    const fileContent = await fs.readFile(fileName, 'utf-8');
    const allLines = fileContent.split('\n');
    const lines = ignoreEmptyLines ? allLines.filter(Boolean) : allLines;
    const lineCount = lines.length;

    if (typescriptExtensions.includes(ext)) {
      totalLinesTS += lineCount;
      totalFilesTS += 1;
    }

    totalLinesAll += lineCount;
  }

  const migratedPercentage = (totalLinesTS / totalLinesAll) * 100;
  return { migratedPercentage, totalFilesAll, totalLinesAll, totalFilesTS, totalLinesTS };
};

export default calculateValues;
