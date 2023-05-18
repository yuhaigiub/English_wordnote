import React from "react";
import style from "./WordRow.module.css";

import { useSetModalContext } from "../../contexts/modal";
import { Word } from "../../types/interface";

const WordRow: React.FC<Props> = ({ id, data }) => {
	const setModal = useSetModalContext();

	return (
		<div
			className={style.container}
			onClick={() => {
				setModal(id);
			}}>
			<div>{data.name}</div>
			<div>{data.definitions.length}</div>
		</div>
	);
};

export default WordRow;

interface Props {
	id: string;
	data: Word;
}
