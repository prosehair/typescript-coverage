# `Typescript Coverage`

## Intro

> A dead-simple criteria to track your Typescript migration.

To measure Typescript coverage, we simply divide the total number of lines in TS by the total number of lines in the project.
That's it, nothing more. Easy, huh?

## Example output

![An output example when run in terminal](/img/example.png)

## Our approach

- We locate all the files according to the `include` and `exclude` options.
- If the file extension belongs to `tsExtensions`, we consider the whole file written in TS. Its line number is added to "lines in TS".
- In any case, its line number is added to "all lines".
- We divide "lines in TS" by "all lines" to get the final percentage.

## Installation

Install the package alongside its peer dependencies (`chalk` and `glob`) with your favorite package manager:

```bash
npm install --save-dev typescript-coverage chalk glob
```

```bash
yarn add --dev typescript-coverage chalk glob
```

```bash
pnpm install --save-dev typescript-coverage chalk glob
```

## Using in your project

1. Add a new script to your `package.json`:

```json
{
  "scripts": {
    "typescript-coverage": "typescript-coverage"
  }
}
```

2. Create a `type-coverage.config.json` file in the root of your project to customize the coverage calculation (optional).
   When no config was found, the following defaults will be used:

```json5
{
  // how to find the files to analyze (glob syntax)
  include: 'src/**/*.{ts,tsx,js,jsx}',
  // the files or the folders to ignore: mocks, tests, etc. (glob syntax)
  exclude: ['**/__tests__/**'],
  // whether to ignore empty lines
  ignoreEmptyLines: false,
  // the files that are consider written in TS (could be .ts, .tsx, .mts, .cts, etc)
  tsExtensions: ['.ts', '.tsx'],
}
```

## System requirements

- The project uses top-level `await` with ES modules and thus requires Node v14.8.0 or higher (tested on Node 18 and 20).
- To run the tests locally, the PNPM package manager must be installed. Note: this requirement only applies if you are contributing to the project.

## Caveats

- For simplicity, we are only looking at the file extension but the content isn't validated. A linter or a Typescript compiler will take care of that.
- If the file has a `.ts` extension but the content is not a valid TS code, it will still be treated as TS.
- No type inference is taken into account.
- If the file is a mixture of JS and TS code but has a `.ts` extension, all the lines will be counted as TS.
- We don't ignore comments. Taking different comments into account (inline, multiline) would further complicate it.

## Our story

At Prose, we've been migrating two projects to Typescript.
We needed the simplest way to track our progress, so we created `typescript-coverage` — a minimalistic tool focused on this sole goal.
Instead of copying and pasting it into every project, we decided to make it an open-source package for anyone facing the same challenge 💚
