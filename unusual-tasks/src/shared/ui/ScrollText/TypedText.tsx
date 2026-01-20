import styles from "./TypedText.module.scss";
import {type JSX} from "react";
import {useRealTyping} from "../../../app/hooks/useRealTyping.ts";

type TypedTextProps = {
    text: string;
    className?: string;
    as?: keyof JSX.IntrinsicElements;

    delayMs?: number;
    baseMsPerChar?: number;
    mistakeChance?: number;

    showCursor?: boolean;
    keepCursorAfterDone?: boolean;
};

const TypedText = ({
                       text,
                       className,
                       as = "p",
                       delayMs = 0,
                       baseMsPerChar = 32,
                       mistakeChance = 0.04,
                       showCursor = true,
                       keepCursorAfterDone = true,
                   }: TypedTextProps) => {
    const Tag = as;

    const typing = useRealTyping(text, {
        enabled: true,
        delayMs,
        baseMsPerChar,
        mistakeChance,
        keepCursorAfterDone,
    });

    return (
        <Tag className={[styles.type, className].filter(Boolean).join(" ")} aria-label={text}>
            <span aria-hidden="true">
                {typing.value}
                {showCursor && typing.showCursor && (
                    <span className={[styles.cursor, typing.isTyping ? styles.active : ""].join(" ")} />
                )}
            </span>
        </Tag>
    );
};

export default TypedText;