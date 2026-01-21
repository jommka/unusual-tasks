import styles from "./MainPage.module.scss";
import CustomText from "../shared/ui/CustomText/CustomText.tsx";
import FunnyFormWidget from "../shared/ui/FunnyFormWidget/FunnyFormWidget.tsx";

const MainPage = () => {
    return (
        <div className={styles.container}>
            <CustomText />
            <FunnyFormWidget />
        </div>
    );
};

export default MainPage;