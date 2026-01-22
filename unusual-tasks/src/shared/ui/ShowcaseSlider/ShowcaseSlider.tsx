import styles from "./ShowcaseSlider.module.scss";
import type {ShowcaseItem} from "../../../app/model/ShowcaseSlider/types.ts";
import {useScrollProgress} from "../../../app/hooks/useScrollProgress.ts";

type Props = {
    items: ShowcaseItem[];
    className?: string;
};

const ShowcaseSlider = ({ items, className }: Props) => {
    const { viewportRef, thumb, isDragging, trackHandlers, thumbHandlers, progress } = useScrollProgress();
    const atEnd = progress > 0.98;
    return (
        <section className={[styles.wrap, className].filter(Boolean).join(" ")} id="showcase">
            <div className={[styles.viewportWrap, atEnd ? styles.fadeOff : ""].join(" ")}>
                <div ref={viewportRef} className={styles.viewport}>
                    <div className={styles.row}>
                        {items.map((it) => (
                            <article key={it.id} className={styles.card}>
                                <div className={styles.imgWrap}>
                                    <img className={styles.img} src={it.imageUrl} alt={it.title} loading="lazy"/>
                                </div>
                                <p className={styles.title}>{it.title}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.track} {...trackHandlers} aria-label="Полоса прокрутки">
                    <div
                        className={[styles.thumb, isDragging ? styles.dragging : ""].filter(Boolean).join(" ")}
                        style={{width: thumb.width, transform: `translateX(${thumb.left}px)`}}
                        {...thumbHandlers}
                    />
                </div>
        </section>
    );
};

export default ShowcaseSlider;