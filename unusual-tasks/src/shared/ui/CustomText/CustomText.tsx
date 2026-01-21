import styles from "./CustomText.module.scss";
import TypedText from "../ScrollText/TypedText.tsx";

const toc = [
    { href: "#text", label: "Текст" },
    { href: "#form", label: "Форма" },
    { href: "#buttons", label: "Кнопки" },
    { href: "#scheme", label: "Схема" },
    { href: "#showcase", label: "Витрина" },
    { href: "#black_page", label: "Черная страница" },
    { href: "#beauty", label: "Красота" },
    { href: "#checkbox", label: "Чекбокс" },
];

const CustomText = () => {
    return (
        <div className={styles.container_text} id="text">
            <TypedText
                as="h2"
                text="Произвольный текст с типографикой"
                delayMs={150}
                baseMsPerChar={50}
                mistakeChance={0.03}
            />

            <p className={styles.lead}>
                Здесь: <strong>выделение</strong>, <em>акценты</em>,{" "}
                <mark className={styles.pulse}>подсветка</mark>.
            </p>

            <p className={styles.typoText}>
                Пример <abbr title="Cascading Style Sheets">CSS</abbr>, индексы x<sup>2</sup>{" "}
                и H<sub>2</sub>O, <a href="#code">ссылка</a>.
            </p>

            <aside className={`${styles.callout} ${styles.info}`}>
                <strong>Заметка: </strong>
                <TypedText
                    as="span"
                    text="произвольный текст произвольно пишется при открытии страницы"
                    delayMs={150}
                    baseMsPerChar={70}
                    mistakeChance={0.03}
                />
            </aside>

            <hr className={styles.hr} />

            <nav className={styles.toc} aria-label="Содержание">
                {toc.map((i, idx) => (
                    <span key={i.href}><a href={i.href}>{i.label}</a>
                        {idx !== toc.length - 1 && <span className={styles.sep}>•</span>}
                    </span>
                ))}
            </nav>
        </div>
    );
};

export default CustomText;