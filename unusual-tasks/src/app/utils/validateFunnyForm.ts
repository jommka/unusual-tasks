import type {FunnyFormErrors, FunnyFormValues} from "../model/FunnyFormModel/types.ts";

export const validateFunnyForm = (v: FunnyFormValues): FunnyFormErrors => {
    const errors: FunnyFormErrors = {};

    if (!v.name.trim()) errors.name = "Введите имя (хотя бы по паспорту ^-^)";
    if (!v.agree) errors.agree = "Нужно согласиться… ну пожалуйста";

    return errors;
};

export const hasErrors = (e: FunnyFormErrors) => Object.keys(e).length > 0;