import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { Categories, catsState, IToDo, toDosState } from "../atoms";
import styled from "styled-components";

interface ButtonProps {
	bgColor?: string;
	borderColor?: string;
	text?: string;
}

const Wrapper = styled.div`
	width: 30vw;
	border: 1px solid white;
	border-radius: 15px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	padding: 5px;
	gap: 5px;
`;
const Task = styled.span`
	white-space: nowrap;
	svg {
		width: 20px;
		fill: green;
	}
`;
const Action = styled.div`
	width: 100%;
	white-space: nowrap;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 5px;
`;
const Button = styled.button<ButtonProps>`
	border-radius: 8px;
	background-color: ${(props) =>
		props.bgColor ? props.bgColor : props.theme.accentColor};
	color: black;
	cursor: pointer;
	&:hover {
		font-size: 1.1rem;
		color: ${(props) => (props.bgColor ? "yellow" : "white")};
	}
`;

function ToDo({ text, category, id }: IToDo) {
	const setToDos = useSetRecoilState(toDosState);
	const [categories] = useRecoilValue(catsState);

	// add new todo
	const handleAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
		const newCategory = event.currentTarget.name;
		setToDos((oldToDos) => {
			const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
			const newToDo = { text, id, category: newCategory as any };
			return [
				...oldToDos.slice(0, targetIndex),
				newToDo,
				...oldToDos.slice(targetIndex + 1),
			];
		});
	};

	// remove old todo
	const handleRem = () => {
		setToDos((oldToDos) =>
			oldToDos.filter((toDo) => toDo.id !== Number(id))
		);
	};

	return (
		<Wrapper>
			<Task>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
					/>
				</svg>
				&nbsp;
				{text}
			</Task>
			<Action>
				{category !== Categories.DOING && (
					<Button name={Categories.DOING} onClick={handleAdd}>
						Doing
					</Button>
				)}
				{category !== Categories.TO_DO && (
					<Button name={Categories.TO_DO} onClick={handleAdd}>
						To Do
					</Button>
				)}
				{category !== Categories.DONE && (
					<Button name={Categories.DONE} onClick={handleAdd}>
						Done!
					</Button>
				)}
				{/* {categories.map((category) => (
					<option value={category.text}>{category.text}</option>
				))} */}
				<Button bgColor="tomato" onClick={handleRem}>
					DEL
				</Button>
			</Action>
		</Wrapper>
	);
}
export default ToDo;
