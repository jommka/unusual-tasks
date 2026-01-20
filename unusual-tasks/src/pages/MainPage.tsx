import styles from "./MainPage.module.scss";
import CustomText from "../shared/ui/CustomText/CustomText.tsx";

const MainPage = () => {
    return (
        <div className={styles.container}>
            <CustomText />
        </div>
    );
};

export default MainPage;