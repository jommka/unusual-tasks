import type {SchemeEdge, SchemeNode} from "../model/Scheme/types.ts";

export const NODES: SchemeNode[] = [
    { id: "alliksaaar", label: "Алликсаар", x: 120, y: 90, w: 220, h: 46 },

    { id: "duhast", label: "Ду Хаст\nВячеславович", x: 760, y: 75, w: 240, h: 64 },
    { id: "anastasia", label: "Анастасия Ширинькина", x: 760, y: 155, w: 240, h: 46 },

    { id: "stanislav", label: "Станислав\nКлитотехнис", x: 220, y: 250, w: 230, h: 72 },
    { id: "alex", label: "Александр Троян", x: 760, y: 255, w: 240, h: 46 },

    { id: "ludmila", label: "Людмила\nВодолазская", x: 310, y: 350, w: 220, h: 64 },
    { id: "olga", label: "Ольга Боргдорф", x: 310, y: 435, w: 220, h: 46 },
    { id: "sergey", label: "Сергей Брус", x: 310, y: 600, w: 240, h: 46 },

    { id: "dmitry", label: "Дмитрий Возигнуй", x: 760, y: 430, w: 240, h: 46 },
    { id: "kristina", label: "Кристина Болтушкина", x: 760, y: 510, w: 240, h: 46 },
    { id: "maxim", label: "Максим Висюлькин", x: 760, y: 590, w: 240, h: 46 },

    { id: "igor", label: "Игорь Зверёк", x: 160, y: 690, w: 220, h: 46 },
    { id: "anton", label: "Антон Строй", x: 160, y: 750, w: 220, h: 46 },
];

export const EDGES: SchemeEdge[] = [
    { from: "duhast", to: "alliksaaar", fromSide: "left", toSide: "right", mode: "h" },
    { from: "anastasia", to: "alliksaaar", fromSide: "left", toSide: "right", mode: "h" },

    { from: "stanislav", to: "alliksaaar", fromSide: "top", toSide: "bottom", mode: "v" },
    { from: "igor", to: "alliksaaar", fromSide: "top", toSide: "left", mode: "v" },
    { from: "anton", to: "alliksaaar", fromSide: "top", toSide: "left", mode: "v" },

    { from: "alex", to: "stanislav", fromSide: "left", toSide: "right", mode: "h" },

    { from: "ludmila", to: "stanislav", fromSide: "top", toSide: "bottom", mode: "v" },
    { from: "olga", to: "stanislav", fromSide: "top", toSide: "bottom", mode: "v" },
    { from: "sergey", to: "stanislav", fromSide: "top", toSide: "bottom", mode: "v" },

    { from: "dmitry", to: "olga", fromSide: "left", toSide: "right", mode: "h" },
    { from: "kristina", to: "olga", fromSide: "left", toSide: "right", mode: "h" },
    { from: "maxim", to: "olga", fromSide: "left", toSide: "right", mode: "h" },
];