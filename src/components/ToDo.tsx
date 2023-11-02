import React from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { Categories, catsState, IToDo, toDosState } from "../atoms";

interface ButtonProps {
	bgcolor?: string;
	borderColor?: string;
	text?: string;
}

const Wrapper = styled.div`
	width: 30vw;
	border: 1px solid white;
	border-radius: 15px;
	background-color: darkgreen;
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
	gap: 2px;
`;
const Button = styled.button<ButtonProps>`
	font-size: 10px;
	font-weight: 600;
	border-radius: 6px;
	background-color: ${(props) =>
		props.bgcolor ? props.bgcolor : "lightgreen"};
	color: black;
	cursor: pointer;
	&:hover {
		font-size: ${(props) => (props.bgcolor ? "12px" : "10px")};
		color: ${(props) => (props.bgcolor ? "tomato" : "darkgreen")};
		background-color: white;
	}
`;
const Delete = styled.span`
	cursor: pointer;
	&:hover {
		color: white;
	}
	svg {
		width: 15px;
		fill: tomato;
	}
`;

function ToDo({ text, category, id }: IToDo) {
	const setToDos = useSetRecoilState(toDosState);
	const customCats = useRecoilValue(catsState);

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
	const handleRemove = () => {
		setToDos((oldToDos) => oldToDos.filter((toDo) => toDo.id !== id));
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
						DOING
					</Button>
				)}
				{category !== Categories.TO_DO && (
					<Button name={Categories.TO_DO} onClick={handleAdd}>
						TO DO
					</Button>
				)}
				{category !== Categories.DONE && (
					<Button name={Categories.DONE} onClick={handleAdd}>
						DONE!
					</Button>
				)}
				{customCats.map((customCat) => {
					if (category !== customCat.text) {
						return (
							<Button
								key={customCat.id}
								name={customCat.text}
								onClick={handleAdd}
							>
								{customCat.text}
							</Button>
						);
					}
				})}
				<Delete onClick={handleRemove}>
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
							d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
						/>
					</svg>
				</Delete>
			</Action>
		</Wrapper>
	);
}
export default ToDo;
