exports.parse = function(code, options) {
	const parser = options && options.disableParsingParser ? require(options.disableParsingParser) : require('espree');

	const lines = code.split('\n');

	const newLines = [];

	let ignoring = false,
	    ignoreNextLine = false;

	lines.forEach(function(line) {
		const lastChar = line.length ? line[line.length - 1] : '',
		      isCRLF = lastChar === '\r';

		let lineIgnored = true;

		if (ignoreNextLine) {
			ignoreNextLine = false;
		} else if (/\/\/\s*eslint-disable-line-parsing\s*$/.test(line)) {
			// line just ignored
		} else if (/\/\/\s*eslint-disable-next-line-parsing\s*$/.test(line)) {
			ignoreNextLine = true;
		} else if (/^\s*\/\*\s*eslint-enable-parsing\s*\*\/\s*$/.test(line)) {
			ignoring = false;
		} else if (/^\s*\/\*\s*eslint-disable-parsing\s*\*\/\s*$/.test(line)) {
			ignoring = true;
		} else if (!ignoring) {
			lineIgnored = false;
		}

		if (lineIgnored) {
			// We need replace all chars by spaces to keep chars count,
			// else --fix will not work

			const lineLength = line.length;

			if (!lineLength) {
				newLines.push('');
			} else {
				const spaces = ''.padStart(lineLength - (isCRLF ? 1 : 0), ' ');

				newLines.push(spaces + (isCRLF ? '\r' : ''));
			}
		} else {
			newLines.push(line);
		}
	});

	const newCode = newLines.join('\n');

	return parser.parse(newCode, options);
};
