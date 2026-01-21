import {useCallback, useMemo, useReducer} from "react";
import type {FunnyFormErrors, FunnyFormValues, SubmitResult} from "../model/FunnyFormModel/types.ts";
import {hasErrors, validateFunnyForm} from "../utils/validateFunnyForm.ts";

const initialValues: FunnyFormValues = {
    name: "",
    moodColor: "#0000ff",
    comment: "",
    radio: false,
    agree: true,
};

type State = {
    values: FunnyFormValues;
    errors: FunnyFormErrors;
    isSubmitting: boolean;
    submitMessage?: string;
};

type Action =
    | { type: "SET_FIELD"; field: keyof FunnyFormValues; value: string | boolean }
    | { type: "SET_ERRORS"; errors: FunnyFormErrors }
    | { type: "SUBMIT_START" }
    | { type: "SUBMIT_DONE"; message: string }
    | { type: "CLEAR_MESSAGE" };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_FIELD": {
            const values = { ...state.values, [action.field]: action.value } as FunnyFormValues;
            return { ...state, values };
        }
        case "SET_ERRORS":
            return { ...state, errors: action.errors };
        case "SUBMIT_START":
            return { ...state, isSubmitting: true, submitMessage: undefined };
        case "SUBMIT_DONE":
            return { ...state, isSubmitting: false, submitMessage: action.message };
        case "CLEAR_MESSAGE":
            return { ...state, submitMessage: undefined };
        default:
            return state;
    }
};

export const useFunnyForm = () => {
    const [state, dispatch] = useReducer(reducer, {
        values: initialValues,
        errors: {},
        isSubmitting: false,
        submitMessage: undefined,
    });

    const setField = useCallback(
        (field: keyof FunnyFormValues, value: string | boolean) => {
            dispatch({ type: "SET_FIELD", field, value });

            if (state.errors[field]) {
                const next = { ...state.errors };
                delete next[field];
                dispatch({ type: "SET_ERRORS", errors: next });
            }
        },
        [state.errors]
    );

    const validate = useCallback(() => {
        const errors = validateFunnyForm(state.values);
        dispatch({ type: "SET_ERRORS", errors });
        return errors;
    }, [state.values]);

    const canSubmit = useMemo(() => !state.isSubmitting, [state.isSubmitting]);

    const submit = useCallback(async (): Promise<SubmitResult> => {
        dispatch({ type: "SUBMIT_START" });

        const errors = validateFunnyForm(state.values);
        if (hasErrors(errors)) {
            dispatch({ type: "SET_ERRORS", errors });
            dispatch({ type: "SUBMIT_DONE", message: "Проверьте поля" });
            return { ok: false, errors };
        }

        await new Promise((r) => setTimeout(r, 350));

        dispatch({ type: "SUBMIT_DONE", message: "Данные отправлены (почти)" });
        return { ok: true, payload: state.values };
    }, [state.values]);

    const clearMessage = useCallback(() => dispatch({ type: "CLEAR_MESSAGE" }), []);

    return {
        values: state.values,
        errors: state.errors,
        isSubmitting: state.isSubmitting,
        submitMessage: state.submitMessage,
        canSubmit,
        setField,
        validate,
        submit,
        clearMessage,
    };
};