import styles from "./FunnyFormWidget.module.scss";
import FunnyForm from "../FunnyForm/FunnyForm.tsx";

const FunnyFormWidget = () => {
    return (
        <section className={[styles.widget].filter(Boolean).join(" ")} id="form">
            <header className={styles.topRow}>
                <h2 className={styles.title}>Заполните поля</h2>
                <span className={styles.please}>ну пожалуйста</span>
            </header>
            <FunnyForm/>
        </section>
    );
};

export default FunnyFormWidget;