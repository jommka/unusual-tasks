import styles from "./SubmitButton.module.scss";

const SubmitButton = ({
                                 children,
                                 disabled,
                             }: {
    children: React.ReactNode;
    disabled?: boolean;
}) => {
    return (
        <button className={styles.btn} type="submit" disabled={disabled}>
            {children}
        </button>
    );
};

export default SubmitButton;