export type Side = "left" | "right" | "top" | "bottom";

export type SchemeNode = {
    id: string;
    label: string;
    x: number;
    y: number;
    w: number;
    h: number;
};

export type SchemeEdge = {
    from: string;
    to: string;
    fromSide: Side;
    toSide: Side;
    mode?: "h" | "v";
};