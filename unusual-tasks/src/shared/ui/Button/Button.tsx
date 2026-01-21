import styles from "./Button.module.scss";
import {forwardRef, useMemo} from "react";
import {
    type ButtonSize,
    type ButtonState,
    type ButtonStyle,
    type ButtonVariant,
    THEMES
} from "../../../app/config/buttonTheme.ts";

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> & {
    variant?: ButtonVariant;
    styleType?: ButtonStyle;
    size?: ButtonSize;
    uiState?: ButtonState;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
};

const Button = forwardRef<HTMLButtonElement, Props>(
    (
        {
            variant = "neutral",
            styleType = "outline",
            size = "md",
            uiState = "default",
            leftIcon,
            rightIcon,
            className,
            disabled,
            children,
            ...rest
        },
        ref
    ) => {
        const theme = THEMES[variant];

        const isDisabled = disabled || uiState === "disabled";

        const styleVars = useMemo(
            () =>
                ({
                    "--btn-border": theme.border,
                    "--btn-text": theme.text,
                    "--btn-bg": theme.bg,
                    "--btn-hover-bg": theme.hoverBg,
                    "--btn-active-bg": theme.activeBg,
                } as React.CSSProperties),
            [theme]
        );

        return (
            <button
                ref={ref}
                type="button"
                className={[
                    styles.btn,
                    styles[variant],
                    styles[styleType],
                    styles[size],
                    styles[`state_${uiState}`],
                    className,
                ]
                    .filter(Boolean)
                    .join(" ")}
                style={styleVars}
                disabled={isDisabled}
                aria-disabled={isDisabled}
                {...rest}
            >
                {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
                <span className={styles.label}>{children}</span>
                {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;