export type FunnyFormValues = {
    name: string;
    moodColor: string;
    comment: string;
    radio: boolean;
    agree: boolean;
};

export type FunnyFormErrors = Partial<Record<keyof FunnyFormValues, string>>;

export type SubmitResult =
    | { ok: true; payload: FunnyFormValues }
    | { ok: false; errors: FunnyFormErrors };