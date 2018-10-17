import { LanguageSpecificValue, ParsingValue } from './base';

export default function(options) {
	return new LanguageSpecificValue(language => new ParsingValue(language.ordinal, options));
}
