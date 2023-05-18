import { FormType, Meaning, Word } from "../types/interface";
import * as yup from "yup";

export const wordTypeOptions = [
	{ label: "Select a type", value: "" },
	{ label: "Noun", value: "noun" },
	{ label: "Verb", value: "verb" },
	{ label: "Adjective", value: "adjective" },
	{ label: "Adverb", value: "adverb" },
	{ label: "Other", value: "other" },
];

export const validationSchema = yup.object({
	name: yup.string().required("Name is required"),
	type: yup.string().required("Type is required"),
	vi: yup.string().required("You must provide a Vietnamese meaning"),
	en: yup.string().required("You must provide an English definition"),
});

export const initialValues: FormType = {
	name: "",
	type: "",
	vi: "",
	en: "",
};
