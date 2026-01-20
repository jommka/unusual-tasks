import { useEffect, useMemo, useRef, useState } from "react";

export interface RealTypingOptions {
    enabled?: boolean;
    delayMs?: number;

    baseMsPerChar?: number;
    jitterMs?: number;

    punctuationPauseMs?: number;
    longPauseMs?: number;

    mistakeChance?: number;
    mistakeMaxLen?: number;
    backspaceMs?: number;

    keepCursorAfterDone?: boolean;
}

const isPunctuation = (ch: string) => /[,:;]/.test(ch);
const isLongPause = (ch: string) => /[.!?\n]/.test(ch);

const randomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const randomChar = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    return chars[randomInt(0, chars.length - 1)];
};

export const useRealTyping = (text: string, opts: RealTypingOptions = {}) => {
    const {
        enabled = true,
        delayMs = 0,

        baseMsPerChar = 32,
        jitterMs = 18,

        punctuationPauseMs = 180,
        longPauseMs = 320,

        mistakeChance = 0.04,
        mistakeMaxLen = 2,
        backspaceMs = 22,

        keepCursorAfterDone = true,
    } = opts;

    const chars = useMemo(() => Array.from(text), [text]);
    const fullLen = chars.length;

    const [value, setValue] = useState(enabled ? "" : text);
    const [isTyping, setIsTyping] = useState(enabled);
    const [done, setDone] = useState(!enabled);

    const timerRef = useRef<number | undefined>(undefined);
    const indexRef = useRef(0);

    const reduceMotion = useMemo(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    }, []);

    useEffect(() => {
        const clearTimer = () => {
            if (timerRef.current) window.clearTimeout(timerRef.current);
            timerRef.current = undefined;
        };

        const schedule = (fn: () => void, ms: number) => {
            clearTimer();
            timerRef.current = window.setTimeout(fn, ms);
        };

        const calcDelay = (typedChar: string) => {
            const jitter = randomInt(-jitterMs, jitterMs);
            const pause =
                (isPunctuation(typedChar) ? punctuationPauseMs : 0) +
                (isLongPause(typedChar) ? longPauseMs : 0);

            return Math.max(5, baseMsPerChar + jitter + pause);
        };

        const finish = () => {
            setIsTyping(false);
            setDone(true);
            clearTimer();
        };

        const commitCharAndContinue = (ch: string) => {
            setValue((prev) => prev + ch);
            indexRef.current += 1;
            if (indexRef.current >= fullLen) {
                finish();
                return;
            }
            schedule(step, calcDelay(ch));
        };

        const doBackspace = (countToDelete: number, onDone: () => void) => {
            let left = countToDelete;
            const backspaceStep = () => {
                left -= 1;
                setValue((prev) => prev.slice(0, Math.max(0, prev.length - 1)));

                if (left > 0) schedule(backspaceStep, backspaceMs);
                else onDone();
            };
            backspaceStep();
        };

        const shouldMakeMistake = (targetChar: string) => {
            if (targetChar.trim() === "") return false;
            if (isLongPause(targetChar)) return false;
            return Math.random() < mistakeChance;
        };

        const makeMistakeString = () => {
            const len = Math.min(mistakeMaxLen, Math.max(1, randomInt(1, mistakeMaxLen)));
            let s = "";
            for (let i = 0; i < len; i++) s += randomChar();
            return s;
        };

        const step = () => {
            const i = indexRef.current;
            if (i >= fullLen) {
                finish();
                return;
            }

            const targetChar = chars[i];
            if (shouldMakeMistake(targetChar)) {
                const mistake = makeMistakeString();
                setValue((prev) => prev + mistake);
                schedule(() => {
                    doBackspace(mistake.length, () => commitCharAndContinue(targetChar));
                }, 140);

                return;
            }
            commitCharAndContinue(targetChar);
        };

        if (!enabled || reduceMotion) {
            setValue(text);
            setIsTyping(false);
            setDone(true);
            clearTimer();
            return;
        }

        indexRef.current = 0;
        setValue("");
        setIsTyping(true);
        setDone(false);

        schedule(step, delayMs);

        return () => clearTimer();
    }, [
        text,
        enabled,
        reduceMotion,
        delayMs,
        fullLen,
        baseMsPerChar,
        jitterMs,
        punctuationPauseMs,
        longPauseMs,
        mistakeChance,
        mistakeMaxLen,
        backspaceMs,
    ]);

    const showCursor = enabled && (isTyping || keepCursorAfterDone);

    return { value, isTyping, done, showCursor };
};
