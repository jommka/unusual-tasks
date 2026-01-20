import {clamp01} from "./number.ts";

export type ScrollProgressOptions = {
    startOffset?: number;
    endOffset?: number;
};

export const getElementScrollProgress = (
    rect: DOMRect,
    viewportHeight: number,
    { startOffset = 0.1, endOffset = 0.9 }: ScrollProgressOptions = {}
) => {
    const vh = viewportHeight || 1;

    const raw = (vh - rect.top) / (vh + rect.height);
    const visible = clamp01(raw);

    const denom = Math.max(0.0001, endOffset - startOffset);
    const t = (visible - startOffset) / denom;

    return clamp01(t);
};