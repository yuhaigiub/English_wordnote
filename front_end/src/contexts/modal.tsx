import React, { useContext, useState } from "react";

// contexts
const ModalContext = React.createContext<DataType>(null);
const SetModalContext = React.createContext<React.Dispatch<React.SetStateAction<DataType>>>(
	(value: any) => {}
);

// custom hooks
export const useModalContext = () => {
	return useContext(ModalContext);
};

export const useSetModalContext = () => {
	return useContext(SetModalContext);
};

// main context provider wrapper
const ModalProvider: React.FC<Props> = ({ children }) => {
	const [value, setValue] = useState<DataType>(null);

	return (
		<ModalContext.Provider value={value}>
			<SetModalContext.Provider value={setValue}>{children}</SetModalContext.Provider>
		</ModalContext.Provider>
	);
};

export default ModalProvider;

interface Props {
	children?: React.ReactNode;
}

type DataType = string | null;
