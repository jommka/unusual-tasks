import styles from "./MainPage.module.scss";
import CustomText from "../shared/ui/CustomText/CustomText.tsx";
import FunnyFormWidget from "../shared/ui/FunnyFormWidget/FunnyFormWidget.tsx";
import ButtonShowcase from "../shared/ui/ButtonShowcase/ButtonShowcase.tsx";

const MainPage = () => {
    return (
        <div className={styles.container}>
            <CustomText />
            <FunnyFormWidget />
            <ButtonShowcase />
        </div>
    );
};

export default MainPage;