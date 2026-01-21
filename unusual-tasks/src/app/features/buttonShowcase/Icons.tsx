import editUrl from "../../../shared/assets/icons/edit.svg"
import excelUrl from "../../../shared/assets/icons/excel.svg"
import deleteUrl from "../../../shared/assets/icons/delete.svg"
import printUrl from "../../../shared/assets/icons/print.svg"
import uploadUrl from "../../../shared/assets/icons/upload.svg"


export const Icon = ({ name }: { name: "edit" | "excel" | "delete" | "print" | "upload" }) => {
    const map: Record<typeof name, string> = {
        edit: editUrl,
        excel: excelUrl,
        delete: deleteUrl,
        print: printUrl,
        upload: uploadUrl,
    };

    return <img src={map[name]} alt="" aria-hidden="true" width={16} height={16} />;
};

export const ArrowIcon = () => <span aria-hidden="true">›</span>;