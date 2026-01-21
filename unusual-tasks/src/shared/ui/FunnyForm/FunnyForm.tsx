import {useCallback} from "react";
import {useFunnyForm} from "../../../app/hooks/useFunnyForm.ts";
import styles from "./FunnyForm.module.scss";
import SubmitButton from "../SubmitButton/SubmitButton.tsx";
import FieldRow from "../FieldRow/FieldRow.tsx";
import FormCard from "../FormCard/FormCard.tsx";

const FunnyForm = () => {
    const { values, errors, submitMessage, setField, submit, isSubmitting } = useFunnyForm();

    const onSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            await submit();
        },
        [submit]
    );

    return (
        <FormCard>
            <form className={styles.form} onSubmit={onSubmit} noValidate>
                <section className={styles.block}>
                    <h3 className={styles.blockTitle}>Основное</h3>

                    <FieldRow label="Имя" htmlFor="name" error={errors.name}>
                        <input
                            id="name"
                            className={styles.input}
                            value={values.name}
                            onChange={(e) => setField("name", e.target.value)}
                            placeholder="по паспорту"
                            aria-invalid={Boolean(errors.name)}
                        />
                    </FieldRow>

                    <FieldRow label="Цвет вашего настроения" htmlFor="moodColor">
                        <input
                            id="moodColor"
                            className={styles.color}
                            type="color"
                            value={values.moodColor}
                            onChange={(e) => setField("moodColor", e.target.value)}
                        />
                    </FieldRow>
                </section>

                <section className={`${styles.block} ${styles.blockAlt}`}>
                    <h3 className={styles.blockTitle}>Дополнительное</h3>

                    <FieldRow label="Комментарий" htmlFor="comment" alignTop>
                        <textarea
                            id="comment"
                            className={styles.textarea}
                            value={values.comment}
                            onChange={(e) => setField("comment", e.target.value)}
                            placeholder={"Напишите хоть что-нибудь.\nЕсли хотите, конечно."}
                            rows={3}
                        />
                    </FieldRow>
                </section>

                <div className={styles.controls}>
                    <label className={styles.control}>
                        <input
                            className={styles.radio}
                            type="radio"
                            name="justRadio"
                            checked={values.radio}
                            onChange={() => setField("radio", true)}
                        />
                        <span>Ну а тут просто полежит радиобатон</span>
                    </label>

                    <label className={styles.control}>
                        <input
                            className={styles.checkbox}
                            type="checkbox"
                            checked={values.agree}
                            onChange={(e) => setField("agree", e.target.checked)}
                            aria-invalid={Boolean(errors.agree)}
                        />
                        <span>
                            Соглашаюсь на всё, что бы вы не придумали и осознаю, что это может
                            означать{" "}
                            <a
                                className={styles.inlineLink}
                                href="#"
                                onClick={(e) => e.preventDefault()}
                            >
                                что угодно
                            </a>
                        </span>
                    </label>

                    {errors.agree && <div className={styles.errorLine}>{errors.agree}</div>}
                </div>

                <div className={styles.actions}>
                    <SubmitButton disabled={isSubmitting}>Отправить все мои данные</SubmitButton>
                    {submitMessage && <div className={styles.message}>{submitMessage}</div>}
                </div>
            </form>
        </FormCard>
    );
};

export default FunnyForm;