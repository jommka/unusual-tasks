import styles from "./ButtonShowcase.module.scss";
import Button from "../Button/Button.tsx";
import {SHOWCASE_COLUMNS, STATES} from "../../../app/config/showcaseConfig.ts";
import {ArrowIcon, Icon} from "../../../app/features/buttonShowcase/Icons.tsx";
import {ACTIONS} from "../../../app/config/actionsConfig.ts";


const ButtonShowcase = () => {
    const label = "Просмотреть";

    const handleAction = (id: string) => {
        console.log("action:", id);
    };

    return (
        <div className={styles.wrap} id="buttons">
            <div className={styles.grid}>
                {STATES.flatMap((state) =>
                    SHOWCASE_COLUMNS.map((col) => (
                        <Button
                            key={`${state}-${col.variant}-${col.styleType}-${col.rightIcon ?? "noicon"}`}
                            variant={col.variant}
                            styleType={col.styleType}
                            uiState={state}
                            rightIcon={col.rightIcon === "arrow" ? <ArrowIcon /> : undefined}
                        >
                            {label}
                        </Button>
                    ))
                )}
            </div>

            <div className={styles.bottomRow}>
                {ACTIONS.map((a) => (
                    <Button
                        key={a.id}
                        variant="neutral"
                        styleType="outline"
                        size="md"
                        leftIcon={<Icon name={a.icon} />}
                        onClick={() => handleAction(a.id)}
                    >
                        {a.label}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default ButtonShowcase;
