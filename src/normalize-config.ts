import type { Settings } from './types';

export const defaultSettings: Settings = {
  include: 'src/**/*.{ts,tsx,js,jsx}',
  exclude: ["**/__tests__/**"],
  ignoreEmptyLines: false,
  tsExtensions: ['.ts', '.tsx'],
};

const normalizeConfig = (configData: string) => {
  try {
    const settings: Settings = JSON.parse(configData);

    return {
      include: settings.include ?? defaultSettings.include,
      exclude: settings.exclude ?? defaultSettings.exclude,
      ignoreEmptyLines: settings.ignoreEmptyLines ?? defaultSettings.ignoreEmptyLines,
      tsExtensions: settings.tsExtensions ?? defaultSettings.tsExtensions,
    };
  } catch (err) {
    return defaultSettings;
  }
};

export default normalizeConfig;
