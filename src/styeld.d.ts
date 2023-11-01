import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		bgColor: string;
		cardBgColor: string;
		textColor: string;
		accentColor: string;
	}
}
