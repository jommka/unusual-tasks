export type ActionId = "edit" | "exportExcel" | "deleteList" | "print" | "importFile";

export type ActionItem = {
    id: ActionId;
    label: string;
    icon: "edit" | "excel" | "delete" | "print" | "upload";
};

export const ACTIONS: ActionItem[] = [
    { id: "edit", label: "Редактировать", icon: "edit" },
    { id: "exportExcel", label: "Выгрузить в Excel", icon: "excel" },
    { id: "deleteList", label: "Удалить список", icon: "delete" },
    { id: "print", label: "Распечатать", icon: "print" },
    { id: "importFile", label: "Загрузить из файла", icon: "upload" },
];