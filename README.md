eslint-disable-parsing
======================

Thing to prevent ESLint from parsing some code, that not a valid JavaScript (that, for example, handled by some custom preprocessor).

To use, specify it as a parser:

```
"parser": "eslint-disable-parsing"
```

If you are using custom parser (not `espree`), then pass it to `parseOptions`:

```
"parserOptions": { "disableParsingParser": "my-super-cool-parser" }
```

It will be `require()`'d.

Next features are supported:

```javascript
/* eslint-disable-parsing */
Definitely not a JavaScript
/* eslint-enable-parsing */

Definitely not a JavaScript // eslint-disable-line-parsing

// eslint-disable-next-line-parsing
Definitely not a JavaScript
```
