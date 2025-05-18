# textlint-filter-rule-disable-next-line [![Actions Status: test](https://github.com/negibokken/textlint-filter-rule-disable-next-line/workflows/test/badge.svg)](https://github.com/negibokken/textlint-filter-rule-disable-next-line/actions?query=workflow%3A"test")

textlint rule that ignore error using disable-next-line directive.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-filter-rule-disable-next-line

Dependencies:

- [textlint](http://textlint.github.io/ "textlint") >= 6.9

## Usage

### Ignore error messages using disable-next-line

Example case in Markdown.

```markdown
This is error text.

<!-- textlint-disable-next-line -->
This is ignored text by rule. Disables all rules under the disable-next-line comment.

This is error text.
```

Ignore specified rules:

```markdown
<!-- textlint-disable-next-line ruleA,ruleB -->
Ignore RuleA and RuleB

This is error text.
```

The empty new line is ignored and rules are ignored on the next next line.

```markdown
<!-- textlint-disable-next-line -->

This is ignored text by rule.

This is error text.
```

### Settings

Via `.textlintrc`(Recommended)

```json
{
    "filters": {
        "disable-next-line": true
    }
}
```

### Options

- `disablingNextLineComment`:
    - default: `"textlint-disable-next-line"`
```js
{
    "filters": {
        "disable-next-line": {
            // if comment has the value, then disable textlint rule on next line
            "disablingNextLineComment": "textlint-disable-next-line",
        }
    }
}
```

## Acknowledgement

- [Documentation - ESLint - Pluggable JavaScript linter](http://eslint.org/docs/user-guide/configuring#disabling-rules-with-inline-disable-next-line "Documentation - ESLint - Pluggable JavaScript linter")

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.
For bugs and feature requests, [please create an issue](https://github.com/negibokken/textlint-filter-rule-disable-next-line/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT

## Special Thanks

This repository's code is based on [textlint-filter-rule-comments](https://github.com/textlint/textlint-filter-rule-comments).
Special thanks to [azu](https://github.com/azu) for sharing the excellent implementation!
