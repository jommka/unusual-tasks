import styles from "./FieldRow.module.scss";

type FieldRowProps = {
    label: string;
    htmlFor: string;
    children: React.ReactNode;
    error?: string;
    alignTop?: boolean;
};

const FieldRow = ({ label, htmlFor, children, error, alignTop }: FieldRowProps) => {
    return (
        <div className={styles.row}>
            <label className={[styles.label, alignTop ? styles.top : ""].join(" ")} htmlFor={htmlFor}>
                {label}
            </label>

            <div className={styles.control}>
                {children}
                {error && <div className={styles.error}>{error}</div>}
            </div>
        </div>
    );
};

export default FieldRow;