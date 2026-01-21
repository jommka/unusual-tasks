export type ButtonVariant = "neutral" | "danger" | "success";
export type ButtonStyle = "outline" | "solid";
export type ButtonSize = "md" | "sm";
export type ButtonState = "default" | "hover" | "active" | "disabled";

export type ButtonConfig = {
    border: string;
    text: string;
    bg: string;
    hoverBg: string;
    activeBg: string;
};

export const THEMES: Record<ButtonVariant, ButtonConfig> = {
    neutral: {
        border: "#afafaf",
        text: "#111111",
        bg: "#ebebeb",
        hoverBg: "#f4f4f4",
        activeBg: "#e1e1e1",
    },
    danger: {
        border: "#db241f",
        text: "#ffffff",
        bg: "#c9130b",
        hoverBg: "#e82f28",
        activeBg: "#a9110b",
    },
    success: {
        border: "#6d9735",
        text: "#ffffff",
        bg: "#6d9735",
        hoverBg: "#85b444",
        activeBg: "#5d822b",
    },
};