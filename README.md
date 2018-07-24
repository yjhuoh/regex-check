# regexp-check
The [standard implementation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) of the `test` method on assigned `RegExp` objects can behave unexpectedly when assigned with the global ('g') flag because of the advancing of the `lastIndex` property on subsequent reads:

```js
const testPattern = /test/g;
testPattern.test('testing'); // true
testPattern.test('testing'); // false
testPattern.test('testing'); // true
testPattern.test('testing'); // false
```

This package polyfills a `check` method onto the base RegExp prototype which behaves nearly identically to `test` but does not mutate (and for global patterns, will completely ignore) `lastIndex`.

## Installation
```bash
$ npm install regexp-check
```

## Usage
```js
require('regexp-check');

const testPattern = /test/g;
// should all be true
testPattern.check('testing');
testPattern.check('testing');
testPattern.check('testing');
testPattern.check('testing');
```

## License

(ISC)
Copyright (c) 2018 Yu-Jay Huoh

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
