/**
 * Get the display name of a language
 * @param langCode Language code (config format or translation service format)
 * @returns Human-readable language name
 */
export function getLanguageDisplayName(langCode: string): string {
	const languageNames: Record<string, string> = {
		zh_CN: "Simplified Chinese",
		zh_TW: "Traditional Chinese",
		en: "English",
		ja: "Japanese",
		ko: "한국어",
		es: "Español",
		th: "ไทย",
		vi: "Tiếng Việt",
		tr: "Türkçe",
		id: "Bahasa Indonesia",
		fr: "Français",
		de: "Deutsch",
		ru: "Русский",
		ar: "العربية",
		// Translation service format
		chinese_simplified: "Simplified Chinese",
		chinese_traditional: "Traditional Chinese",
		english: "English",
		japanese: "Japanese",
		korean: "한국어",
		spanish: "Español",
		thai: "ไทย",
		vietnamese: "Tiếng Việt",
		turkish: "Türkçe",
		indonesian: "Bahasa Indonesia",
		french: "Français",
		german: "Deutsch",
		russian: "Русский",
		arabic: "العربية",
	};

	return languageNames[langCode] || langCode;
}
