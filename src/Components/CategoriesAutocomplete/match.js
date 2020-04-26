const match = (text, query) => {
  const removeDiacritics = require('diacritic').clean;

  // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_special_characters
  const specialCharsRegex = /[.*+?^${}()|[\]\\]/g;

  // http://www.ecma-international.org/ecma-262/5.1/#sec-15.10.2.6
  const wordCharacterRegex = /[a-z0-9_]/i;

  const whitespacesRegex = /\s+/;

  const escapeRegexCharacters = (str) => {
    return str.replace(specialCharsRegex, '\\$&');
  }

  text = removeDiacritics(text);
  query = removeDiacritics(query);

  return (
    query
      .trim()
      .split(whitespacesRegex)
      // If query is blank, we'll get empty string here, so let's filter it out.
      .filter((word) => {
        return word.length > 0;
      })
      .reduce((result, word) => {
        const wordLen = word.length;
        const prefix = wordCharacterRegex.test(word[0]) ? '\\b' : '';
        const regex = new RegExp(prefix + escapeRegexCharacters(word), 'i');
        const index = text.search(regex);

        if (index > -1) {
          result.push([index, index + wordLen]);

          // Replace what we just found with spaces so we don't find it again.
          text =
            text.slice(0, index) +
            new Array(wordLen + 1).join(' ') +
            text.slice(index + wordLen);
        }

        return result;
      }, [])
      .sort((match1, match2) => {
        return match1[0] - match2[0];
      })
  );
};

export default match;