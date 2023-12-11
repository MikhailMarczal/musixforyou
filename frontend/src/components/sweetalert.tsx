import Swal, { SweetAlertIcon } from "sweetalert2";

interface Swal {
    title: string;
    text?: string;
    textConfirmedButton?: string;
    textCancelButton?: string;
    textErrorButton?: string;
    colorCancelButton?: string;
    colorConfirmedButton?: string;
    timer?: number;
    icon?: SweetAlertIcon | undefined;
    confirmButton?: boolean | undefined;
    showCancelButton?: boolean | undefined;
    cancelButton?: boolean | undefined;
    showDenyButton?: boolean | undefined;
    denyButtonText?: string;
    denyButtonColor?: string;
    iconColor?: string
}

export function SwalAlert({ title, text, textConfirmedButton, textCancelButton, showDenyButton, denyButtonText, showCancelButton, icon, iconColor }: Swal) {
    return Swal.fire({
        background: '#222',
        customClass: {
            popup: 'shadow-2xl shadow-dark-blue',
            title: 'text-white',
            htmlContainer: 'text-white',
        },
        color: "#c9c9c9",
        title: title ?? "Alert",
        text: text,
        icon: icon,
        iconColor: iconColor ?? '#2874ae',
        showConfirmButton: true,
        confirmButtonText: textConfirmedButton ?? 'Confirmar',
        confirmButtonColor: '#509d45',
        showDenyButton: showDenyButton,
        denyButtonText: denyButtonText,
        denyButtonColor: '#2874ae',
        showCancelButton: showCancelButton ?? true,
        cancelButtonText: textCancelButton ?? 'Cancelar',
        cancelButtonColor: '#DA4646',
        reverseButtons: true
    })
}