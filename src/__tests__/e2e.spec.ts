import { exec } from 'node:child_process';
import util from 'node:util';

const execAsync = util.promisify(exec);
const testTimeoutMs = 30000;

const stripFormatting = (str: string) => {
  return (
    str
      // Remove bold and reset
      .replace(/\x1b\[1m/g, '')
      .replace(/\x1b\[22m/g, '')
      // Remove underline and reset
      .replace(/\x1b\[4m/g, '')
      .replace(/\x1b\[24m/g, '')
  );
};

describe('E2E Test on src code', () => {
  test(
    'should work with no config and give correct output',
    async () => {
      const { stdout: rawStdout, stderr: rawStderr } = await execAsync('pnpm e2e');

      const stdout = stripFormatting(rawStdout);
      const stderr = stripFormatting(rawStderr);

      expect(stderr).toContain('created dist/es, dist/executable.js');
      expect(stderr).toContain(`Couldn't find type-coverage.config.json file, using defaults`);

      expect(stdout).toContain('Including files from: src/**/*.{ts,tsx,js,jsx}');
      expect(stdout).toContain('Excluding files from: **/__tests__/**');
      expect(stdout).toContain(
        'The state of the TypeScript coverage: we are currently at 100.00%',
      );

      expect(stdout).toContain('Total Typescript files: 4 (.ts,.tsx)');
      expect(stdout).toContain('Total files found: 4 (all types)');
    },
    testTimeoutMs,
  );
});
