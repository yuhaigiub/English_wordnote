import React from "react";

import style from "./MeaningRow.module.css";

import { Meaning, Word } from "../../types/interface";

const MeaningRow: React.FC<Props> = ({
	index,
	currentIndex,
	setCurrentIndex,
	formik,
	definition,
	data,
	updateWordMutation,
}) => {
	return (
		<div
			onClick={() => {
				if (index !== currentIndex) {
					setCurrentIndex(index);
					formik.setValues({
						...definition,
						name: data.name,
					});
				}
			}}>
			<div>{definition.type}</div>
			<div>{definition.vi}</div>
			<button
				type="button"
				onClick={(e) => {
					e.stopPropagation();
					if (data.definitions.length <= 1) {
						alert("a word must have at least one meaning");
						return;
					}
					const newData: Word = {
						name: formik.values.name,
						definitions: data.definitions.filter((_, index) => {
							if (index !== currentIndex) return true;
							return false;
						}),
					};
					updateWordMutation.mutate({
						id: data._id,
						rev: data._rev,
						data: newData,
					});
					formik.resetForm();
					setCurrentIndex(0);
				}}>
				Delete
			</button>
		</div>
	);
};

export default MeaningRow;

interface Props {
	index: number;
	currentIndex: number;
	setCurrentIndex: any;
	formik: any;
	definition: Meaning;
	data: Word & { _id: string; _rev: string };
	updateWordMutation: any;
}
