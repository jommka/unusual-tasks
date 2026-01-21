import type {ButtonState, ButtonStyle, ButtonVariant} from "./buttonConfig.ts";

export const STATES: ButtonState[] = ["default", "hover", "active", "disabled"];

export type ShowcaseCell = {
    variant: ButtonVariant;
    styleType: ButtonStyle;
    rightIcon?: "arrow";
};

export const SHOWCASE_COLUMNS: ShowcaseCell[] = [
    { variant: "neutral", styleType: "outline" },
    { variant: "danger", styleType: "outline" },
    { variant: "danger", styleType: "solid" },
    { variant: "neutral", styleType: "outline", rightIcon: "arrow" },
    { variant: "success", styleType: "solid" },
    { variant: "success", styleType: "outline" },
];