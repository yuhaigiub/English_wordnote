import React from "react";
import Button from "../../../../components/Button";
import { Word } from "../../../../types/interface";
import style from "./ModalView.module.css";

const ModalView: React.FC<Props> = ({
	currentIndex,
	data,
	showMeaning,
	setShowMeaning,
	handleIncrement,
	handleDecrement,
	handleUpdate,
	handleDelete,
}) => {
	return (
		<>
			<div className={style.name}>{data.name}</div>

			<div className={style.en}>
				<button type="button" onClick={handleDecrement}>
					{"<"}
				</button>
				<div>
					<Button
						extraStyle={{
							width: "40%",
							padding: "0.75rem 0",
							fontSize: "1.1rem",
							fontWeight: 700,
						}}
						onClick={() => {
							setShowMeaning((value) => !value);
						}}>
						{showMeaning ? data.definitions[currentIndex].vi : data.definitions[currentIndex].type}
					</Button>
					<div className={style.definition}>{data.definitions[currentIndex].en}</div>
				</div>
				<button type="button" onClick={handleIncrement}>
					{">"}
				</button>
			</div>
			<div className={style.buttonContainer}>
				<Button key="update-button" onClick={handleUpdate}>
					Update
				</Button>
				<Button key="delete-button" onClick={handleDelete}>
					Delete
				</Button>
			</div>
		</>
	);
};

export default ModalView;

interface Props {
	data: Word & { _id: string; _rev: string };
	currentIndex: number;
	showMeaning: boolean;
	setShowMeaning: (value: boolean | ((value: any) => boolean)) => void;
	handleIncrement: (e?: any) => void;
	handleDecrement: (e?: any) => void;
	handleUpdate: (e?: any) => void;
	handleDelete: (e?: any) => void;
}
