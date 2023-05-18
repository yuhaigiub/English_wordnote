import { Word } from "../types/interface";

const baseUrl = "http://localhost:3000/words";

export const getAllWords = () => {
	return fetch(baseUrl, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
};

export const getWord = (id: string) => {
	return fetch(baseUrl + `/${id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
};

export const addWord = (data: Word) => {
	return fetch(baseUrl, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});
};

export const updateWord = (id: string, rev: string, data: Word) => {
	return fetch(baseUrl + `/${id}-${rev}`, {
		method: "PUT",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});
};

export const deleteWord = (id: string, rev: string) => {
	return fetch(baseUrl + `/${id}-${rev}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});
};
