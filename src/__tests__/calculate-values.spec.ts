import calculateValues from '../calculate-values';

jest.mock('node:fs/promises', () => {
  return {
    readFile: (fileName: string) => {
      const mocks: Record<string, string> = {
        'hello.js': 'alert(42);\n\nconst str = "hello";',
        '42.ts': 'const str = "hello ts";\nconst n: number = 1;\nconst a: number = n;',
        'component.tsx': 'const App = () => <div>Hello 1</div>',
        'legacy.jsx': 'const Legacy = () => <span>Hello 2</span>',
      };
      return Promise.resolve(mocks[fileName]);
    },
  };
});

describe('Calculate values', () => {
  test(`works when ignoreEmptyLines: false`, async () => {
    const result = await calculateValues(
      ['hello.js', 'component.tsx', '42.ts', 'legacy.jsx'],
      false,
      ['.ts', '.tsx'],
    );

    expect(result).toEqual({
      migratedPercentage: 50,
      totalFilesAll: 4,
      totalLinesAll: 8,
      totalFilesTS: 2,
      totalLinesTS: 4,
    });
  });

  test(`works when ignoreEmptyLines: true`, async () => {
    const result = await calculateValues(['hello.js', '42.ts'], true, ['.ts']);

    expect(result).toEqual({
      migratedPercentage: 60,
      totalFilesAll: 2,
      totalLinesAll: 5,
      totalFilesTS: 1,
      totalLinesTS: 3,
    });
  });
});
