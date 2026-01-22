import styles from "./MainPage.module.scss";
import CustomText from "../shared/ui/CustomText/CustomText.tsx";
import FunnyFormWidget from "../shared/ui/FunnyFormWidget/FunnyFormWidget.tsx";
import ButtonShowcase from "../shared/ui/ButtonShowcase/ButtonShowcase.tsx";
import MasonsScheme from "../shared/ui/MasonsScheme/MasonsScheme.tsx";
import {ITEMS} from "../app/config/showcaseItemConfig.ts";
import ShowcaseSlider from "../shared/ui/ShowcaseSlider/ShowcaseSlider.tsx";

const MainPage = () => {
    return (
        <div className={styles.container}>
            <CustomText />
            <FunnyFormWidget />
            <ButtonShowcase />
            <MasonsScheme />
            <ShowcaseSlider items={ITEMS} />
        </div>
    );
};

export default MainPage;