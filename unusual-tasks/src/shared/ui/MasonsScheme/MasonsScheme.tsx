import styles from "./MasonsScheme.module.scss";
import {EDGES, NODES} from "../../../app/config/schemeConfig.ts";
import {anchor, orthoPath} from "../../../app/utils/scheme.ts";
import {useMemo, useRef} from "react";
import {useDraggableNodes} from "../../../app/hooks/useDragNode.ts";


export const MasonsScheme = () => {
    const { nodes, handlers } = useDraggableNodes(NODES);
    const nodeMap = useMemo(() => new Map(nodes.map((n) => [n.id, n] as const)), [nodes]);

    const canvasRef = useRef<HTMLDivElement | null>(null);

    const width = Math.max(...nodes.map((n) => n.x + n.w)) + 40;
    const height = Math.max(...nodes.map((n) => n.y + n.h)) + 40;

    return (
        <section className={styles.scheme} id="scheme">
            <h2 className={styles.title}>Масоны Самсона <span className={styles.span}>(можно двигать курсором)</span></h2>

            <div
                ref={canvasRef}
                className={styles.canvas}
                style={{ width, height }}
                onPointerMove={(e) => handlers.onPointerMove(e)}
                onPointerUp={handlers.onPointerUp}
            >
                <svg className={styles.lines} width={width} height={height} aria-hidden="true">
                    <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.55)" />
                        </marker>
                    </defs>

                    {EDGES.map((e, idx) => {
                        const from = nodeMap.get(e.from);
                        const to = nodeMap.get(e.to);
                        if (!from || !to) return null;

                        const a = anchor(from, e.fromSide);
                        const b = anchor(to, e.toSide);

                        return (
                            <path
                                key={idx}
                                d={orthoPath(a, b, e.mode ?? "h")}
                                className={styles.path}
                                markerEnd="url(#arrow)"
                            />
                        );
                    })}
                </svg>

                {nodes.map((n) => (
                    <div
                        key={n.id}
                        className={styles.node}
                        style={{ left: n.x, top: n.y, width: n.w, height: n.h }}
                        onPointerDown={handlers.onPointerDown(n.id)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Узел: ${n.label.replaceAll("\n", " ")}`}
                    >
                        {n.label.split("\n").map((line, i) => (
                            <div key={i}>{line}</div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MasonsScheme;