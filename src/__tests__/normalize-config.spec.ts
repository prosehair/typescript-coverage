import normalizeConfig, { defaultSettings } from '../normalize-config';

describe('Handle incorrect values', () => {
  [null, undefined, '', 'hello', true, false].forEach(value => {
    test(`returns default settings when ${value} used as an input`, () => {
      expect(normalizeConfig(value as any)).toEqual(defaultSettings);
    });
  });
});

describe('Handle correct values', () => {
  test(`combines default settings with user override for include`, () => {
    expect(normalizeConfig('{ "include": "src/**/*.*" }')).toEqual({
      ...defaultSettings,
      include: 'src/**/*.*',
    });
  });
  test(`combines default settings with user override for exclude`, () => {
    expect(normalizeConfig('{ "exclude": ["**/mocks/**", "**/*.cy.{js,jsx,ts,tsx}"] }')).toEqual({
      ...defaultSettings,
      exclude: ['**/mocks/**', '**/*.cy.{js,jsx,ts,tsx}'],
    });
  });
  test(`combines default settings with user override for ignoreEmptyLines`, () => {
    expect(normalizeConfig('{ "ignoreEmptyLines": false }')).toEqual({
      ...defaultSettings,
      ignoreEmptyLines: false,
    });
  });
  test(`combines default settings with user override for tsExtensions`, () => {
    expect(normalizeConfig('{ "tsExtensions": [".ts", ".tsx", ".mts", ".cts"] }')).toEqual({
      ...defaultSettings,
      tsExtensions: ['.ts', '.tsx', '.mts', '.cts'],
    });
  });
});
