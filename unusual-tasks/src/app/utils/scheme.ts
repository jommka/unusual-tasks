import type {SchemeNode, Side} from "../model/Scheme/types.ts";

export const anchor = (n: SchemeNode, side: Side) => {
    switch (side) {
        case "left":
            return { x: n.x, y: n.y + n.h / 2 };
        case "right":
            return { x: n.x + n.w, y: n.y + n.h / 2 };
        case "top":
            return { x: n.x + n.w / 2, y: n.y };
        case "bottom":
            return { x: n.x + n.w / 2, y: n.y + n.h };
    }
};

export const orthoPath = (
    a: { x: number; y: number },
    b: { x: number; y: number },
    mode: "h" | "v" = "h"
) => {
    if (mode === "h") {
        const midX = (a.x + b.x) / 2;
        return `M ${a.x} ${a.y} L ${midX} ${a.y} L ${midX} ${b.y} L ${b.x} ${b.y}`;
    }
    const midY = (a.y + b.y) / 2;
    return `M ${a.x} ${a.y} L ${a.x} ${midY} L ${b.x} ${midY} L ${b.x} ${b.y}`;
};