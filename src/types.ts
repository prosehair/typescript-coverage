export type FileExtension = `.${string}`;

export type Settings = {
  include: string | string[];
  exclude: string | string[];
  ignoreEmptyLines: boolean;
  tsExtensions: FileExtension[];
};
