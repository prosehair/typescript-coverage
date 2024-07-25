import chalk from 'chalk';
import fs from 'node:fs/promises';
import { glob } from 'glob';
import process from 'node:process';

import calculateValues from './calculate-values';
import normalizeConfig from './normalize-config';

const configFileName = 'type-coverage.config.json';

try {
  const configPath = `${process.cwd()}/${configFileName}`;

  let configData = '';
  try {
    configData = await fs.readFile(configPath, 'utf-8');
  } catch (err) {
    console.warn(chalk.yellow(`Couldn't find ${configFileName} file, using defaults`));
  }

  const { include, exclude, ignoreEmptyLines, tsExtensions } = normalizeConfig(configData);

  console.log(`Including files from: ${include}`);
  console.log(`Excluding files from: ${exclude}`);

  const fileNames = await glob(include, { ignore: exclude });
  const { migratedPercentage, totalFilesTS, totalFilesAll } = await calculateValues(
    fileNames,
    ignoreEmptyLines,
    tsExtensions,
  );

  console.log(
    chalk.green(
      `The state of the TypeScript migration: ${chalk.underline(
        `we are currently at ${migratedPercentage.toFixed(2)}%`,
      )}`,
    ),
  );
  console.log(`Total Typescript files: ${totalFilesTS} (${tsExtensions})`);
  console.log(`Total files found: ${totalFilesAll} (all types)`);
} catch (error) {
  console.error(chalk.red('Error while executing:', error));
  process.exit(1);
}

export type { FileExtension, Settings } from './types';
export { defaultSettings } from './normalize-config';
export { calculateValues, normalizeConfig };
