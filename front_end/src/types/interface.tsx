export interface Word {
	name: string;
	definitions: Meaning[];
}

export interface Meaning {
	type: string;
	vi: string;
	en: string;
}

export interface FormType {
	name: string;
	type: string;
	vi: string;
	en: string;
}
