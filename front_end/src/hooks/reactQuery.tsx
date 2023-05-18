import { useMutation, useQuery, useQueryClient } from "react-query";
import { addWord, deleteWord, getAllWords, getWord, updateWord } from "../api/requests";
import { Word } from "../types/interface";

export const useAddWordMutation = () => {
	const queryClient = useQueryClient();
	return useMutation((data: Word) => addWord(data), {
		onSuccess: () => {
			queryClient.invalidateQueries("words");
		},
	});
};

export const useUpdateWordMutation = () => {
	const queryClient = useQueryClient();
	return useMutation(
		({ id, rev, data }: { id: string; rev: string; data: Word }) => {
			return updateWord(id, rev, data);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries("word");
			},
		}
	);
};

export const useDeleteWordMutation = () => {
	const queryClient = useQueryClient();
	return useMutation(
		({ id, rev }: { id: string; rev: string }) => {
			return deleteWord(id, rev);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries("words");
			},
		}
	);
};

export const useGetWordQuery = (id: string) => {
	return useQuery<Word & { _id: string; _rev: string }, Error>(["word", id], () =>
		getWord(id)
			.then((res) => res.json())
			.then((data) => {
				return data;
			})
	);
};

export const useGetAllWordQuery = () => {
	return useQuery<Word[], Error>("words", () =>
		getAllWords()
			.then((res) => res.json())
			.then((data) => {
				return data.rows;
			})
	);
};
