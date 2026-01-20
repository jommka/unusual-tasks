export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export const clamp = (v: number, min: number, max: number) =>
    Math.min(max, Math.max(min, v));