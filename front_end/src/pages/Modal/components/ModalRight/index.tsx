import React from "react";
import style from "./ModalRight.module.css";

import Button from "../../../../components/Button";
import { Word } from "../../../../types/interface";
import MeaningRow from "../../../../components/MeaningRow";

const ModalRight: React.FC<Props> = ({
	data,
	currentIndex,
	setCurrentIndex,
	formik,
	updateWordMutation,
	handleAdd,
	handleDone,
	handleSave,
}) => {
	return (
		<>
			<div className={style.label}>Meaning List</div>
			<div className={style.meaningContainer}>
				{data.definitions.map((definition, index) => {
					return (
						<MeaningRow
							key={definition.vi}
							{...{
								index,
								currentIndex,
								setCurrentIndex,
								formik,
								definition,
								data,
								updateWordMutation,
							}}
						/>
					);
				})}
			</div>
			<div className={style.buttonContainer}>
				<Button type="button" key="add-button" onClick={handleAdd}>
					Add
				</Button>
				<Button key="save-button" type="button" onClick={handleSave}>
					Save
				</Button>
				<Button key="done-button" type="button" onClick={handleDone}>
					Done
				</Button>
			</div>
		</>
	);
};

export default ModalRight;

interface Props {
	data: Word & { _id: string; _rev: string };
	currentIndex: number;
	setCurrentIndex: any;
	formik: any;
	updateWordMutation: any;
	handleAdd: (e?: any) => void;
	handleSave: (e?: any) => void;
	handleDone: (e?: any) => void;
}
