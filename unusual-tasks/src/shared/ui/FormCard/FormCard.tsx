import styles from "./FormCard.module.scss";

const FormCard = ({ children }: { children: React.ReactNode }) => {
    return <div className={styles.card}>{children}</div>;
};

export default FormCard;