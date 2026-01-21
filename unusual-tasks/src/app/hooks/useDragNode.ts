import {useCallback, useMemo, useRef, useState} from "react";
import type {SchemeNode} from "../model/Scheme/types.ts";

type Options = {
    clampToCanvas?: boolean;
};

export const useDraggableNodes = (initial: SchemeNode[], opts: Options = {}) => {
    const [nodes, setNodes] = useState<SchemeNode[]>(initial);

    const nodeMap = useMemo(() => new Map(nodes.map((n) => [n.id, n] as const)), [nodes]);

    const dragRef = useRef<{
        id: string;
        startClientX: number;
        startClientY: number;
        startX: number;
        startY: number;
        pointerId: number;
    } | null>(null);

    const updateNodePos = useCallback((id: string, x: number, y: number) => {
        setNodes((prev) =>
            prev.map((n) => (n.id === id ? { ...n, x, y } : n))
        );
    }, []);

    const onPointerDown = useCallback(
        (id: string) => (e: React.PointerEvent) => {
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

            const n = nodeMap.get(id);
            if (!n) return;

            dragRef.current = {
                id,
                startClientX: e.clientX,
                startClientY: e.clientY,
                startX: n.x,
                startY: n.y,
                pointerId: e.pointerId,
            };
        },
        [nodeMap]
    );

    const onPointerMove = useCallback(
        (e: React.PointerEvent, canvasRect?: DOMRect) => {
            const drag = dragRef.current;
            if (!drag || drag.pointerId !== e.pointerId) return;

            const dx = e.clientX - drag.startClientX;
            const dy = e.clientY - drag.startClientY;

            let nextX = drag.startX + dx;
            let nextY = drag.startY + dy;

            if (opts.clampToCanvas && canvasRect) {
                nextX = Math.max(0, Math.min(nextX, canvasRect.width));
                nextY = Math.max(0, Math.min(nextY, canvasRect.height));
            }

            updateNodePos(drag.id, nextX, nextY);
        },
        [opts.clampToCanvas, updateNodePos]
    );

    const onPointerUp = useCallback((e: React.PointerEvent) => {
        const drag = dragRef.current;
        if (!drag || drag.pointerId !== e.pointerId) return;
        dragRef.current = null;
    }, []);

    return {
        nodes,
        setNodes,
        handlers: {
            onPointerDown,
            onPointerMove,
            onPointerUp,
        },
    };
};