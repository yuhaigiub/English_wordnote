import React from "react";
import style from "./WordList.module.css";

import { useQuery } from "react-query";
import { getAllWords } from "../../api/requests";
import WordRow from "../../components/WordRow";
import { Word } from "../../types/interface";
import { useGetAllWordQuery } from "../../hooks/reactQuery";

const WordList = () => {
	const { isLoading, isError, error, data } = useGetAllWordQuery();

	if (isLoading) {
		return <div className={style.loadingMsg}>Loading word list...</div>;
	}

	if (isError) {
		return (
			<div className={style.errorMsg}>
				<div>An error occurs, cannot load word list.</div>
				<div>Error: {error.message}</div>
			</div>
		);
	}

	return (
		<div className={style.container}>
			<div className={style.header}>
				<span>Name</span>
				<span>Number of Meanings</span>
			</div>
			{data?.map((row: any) => {
				return <WordRow data={row.doc} id={row.id} key={row.id} />;
			})}
			<div></div>
		</div>
	);
};

export default WordList;
