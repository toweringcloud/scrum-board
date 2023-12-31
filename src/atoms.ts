import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "toDoLocal",
	storage: localStorage,
});

export const isDarkState = atom({
	key: "isDark",
	default: true,
	effects_UNSTABLE: [persistAtom],
});

export enum Categories {
	"TO_DO" = "TO_DO",
	"DOING" = "DOING",
	"DONE" = "DONE",
}
export interface ICategory {
	text: string;
	id: number;
}
export const catsState = atom<ICategory[]>({
	key: "categories",
	default: [],
	effects_UNSTABLE: [persistAtom],
});
export const catState = atom<Categories>({
	key: "category",
	default: Categories.TO_DO,
	effects_UNSTABLE: [persistAtom],
});

export interface IToDo {
	text: string;
	id: number;
	category: Categories;
}
export const toDosState = atom<IToDo[]>({
	key: "todos",
	default: [],
	effects_UNSTABLE: [persistAtom],
});

export const toDoSelectors = selector({
	key: "toDoSelectors",
	get: ({ get }) => {
		const toDos = get(toDosState);
		const toDosGroup: any = [];
		for (const category in Categories) {
			toDosGroup[category] = toDos.filter(
				(toDo) => toDo.category === category
			);
		}
		get(catsState).map((category: ICategory) => {
			toDosGroup[category.text] = toDos.filter(
				(toDo) => toDo.category === category.text
			);
		});
		console.log("toDosGroup: ", toDosGroup);
		return toDosGroup;
	},
});
