import { useCallback, useEffect, useRef, useState } from "react";

type Thumb = { left: number; width: number };

export const useScrollProgress = () => {
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);

    const [progress, setProgress] = useState(0);
    const [thumb, setThumb] = useState<Thumb>({ left: 0, width: 0 });

    const [isDragging, setIsDragging] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);

    const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

    const getMaxScroll = (el: HTMLDivElement) => Math.max(0, el.scrollWidth - el.clientWidth);

    const getTrackWidth = () => {
        const track = trackRef.current;
        return track ? track.getBoundingClientRect().width : 0;
    };

    const recalc = useCallback(() => {
        const el = viewportRef.current;
        if (!el) return;

        const maxScroll = getMaxScroll(el);
        const p = maxScroll === 0 ? 0 : clamp(el.scrollLeft / maxScroll, 0, 1);
        setProgress(p);

        const trackW = getTrackWidth() || el.clientWidth;
        const ratio = el.clientWidth / Math.max(el.clientWidth, el.scrollWidth);

        const thumbW = Math.max(56, trackW * ratio);
        const left = (trackW - thumbW) * p;

        setThumb({ left, width: thumbW });
    }, []);

    useEffect(() => {
        const el = viewportRef.current;
        const track = trackRef.current;
        if (!el) return;

        recalc();

        let t: number | null = null;
        const onScroll = () => {
            recalc();
            setIsScrolling(true);
            if (t) window.clearTimeout(t);
            t = window.setTimeout(() => setIsScrolling(false), 120);
        };

        el.addEventListener("scroll", onScroll, { passive: true });

        const ro = new ResizeObserver(() => recalc());
        ro.observe(el);
        if (track) ro.observe(track);

        return () => {
            el.removeEventListener("scroll", onScroll);
            ro.disconnect();
            if (t) window.clearTimeout(t);
        };
    }, [recalc]);

    const onWheel = useCallback((e: WheelEvent) => {
        const el = viewportRef.current;
        if (!el) return;

        const maxScroll = getMaxScroll(el);
        if (maxScroll <= 0) return;

        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

        e.preventDefault();
        el.scrollLeft = clamp(el.scrollLeft + delta, 0, maxScroll);
    }, []);

    useEffect(() => {
        const el = viewportRef.current;
        if (!el) return;

        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, [onWheel]);

    const dragRef = useRef<{
        pointerId: number;
        startClientX: number;
        startLeft: number;
        trackW: number;
        thumbW: number;
    } | null>(null);

    const setScrollByProgress = useCallback((p: number) => {
        const el = viewportRef.current;
        if (!el) return;
        const maxScroll = getMaxScroll(el);
        el.scrollLeft = clamp(p, 0, 1) * maxScroll;
    }, []);

    const onThumbPointerDown = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            const el = viewportRef.current;
            if (!el) return;

            const trackW = getTrackWidth() || el.clientWidth;

            dragRef.current = {
                pointerId: e.pointerId,
                startClientX: e.clientX,
                startLeft: thumb.left,
                trackW,
                thumbW: thumb.width,
            };

            (e.currentTarget as HTMLDivElement).setPointerCapture?.(e.pointerId);

            setIsDragging(true);
            setIsScrolling(false);
        },
        [thumb.left, thumb.width]
    );

    const onPointerMoveWindow = useCallback(
        (e: PointerEvent) => {
            const drag = dragRef.current;
            if (!drag || drag.pointerId !== e.pointerId) return;

            const dx = e.clientX - drag.startClientX;
            const maxLeft = Math.max(0, drag.trackW - drag.thumbW);
            const nextLeft = clamp(drag.startLeft + dx, 0, maxLeft);
            const p = maxLeft === 0 ? 0 : nextLeft / maxLeft;

            setScrollByProgress(p);
        },
        [setScrollByProgress]
    );

    const onPointerUpWindow = useCallback((e: PointerEvent) => {
        const drag = dragRef.current;
        if (!drag || drag.pointerId !== e.pointerId) return;

        dragRef.current = null;
        setIsDragging(false);
    }, []);

    useEffect(() => {
        if (!isDragging) return;

        window.addEventListener("pointermove", onPointerMoveWindow);
        window.addEventListener("pointerup", onPointerUpWindow);

        return () => {
            window.removeEventListener("pointermove", onPointerMoveWindow);
            window.removeEventListener("pointerup", onPointerUpWindow);
        };
    }, [isDragging, onPointerMoveWindow, onPointerUpWindow]);

    const onTrackClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const trackW = e.currentTarget.getBoundingClientRect().width;
            const x = e.clientX - e.currentTarget.getBoundingClientRect().left;

            const maxLeft = Math.max(0, trackW - thumb.width);
            const left = clamp(x - thumb.width / 2, 0, maxLeft);
            const p = maxLeft === 0 ? 0 : left / maxLeft;

            setScrollByProgress(p);
        },
        [thumb.width, setScrollByProgress]
    );

    return {
        viewportRef,
        trackRef,
        progress,
        thumb,
        isDragging,
        isScrolling,
        trackHandlers: { onClick: onTrackClick },
        thumbHandlers: { onPointerDown: onThumbPointerDown },
        recalc,
    };
};