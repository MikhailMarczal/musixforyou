export interface IChildren {
    children?: React.ReactNode;
}
export interface ICommonText {
    text: string;
}
export interface IClassName {
    className?: string;
}
export interface IWidth {
    width: "full" | "auto";
}

export interface IButton extends ICommonText, IChildren, IClassName, IWidth {
    color?: "red" | "green";
    type: "button" | "submit" | "reset";
    size: "large" | "medium" | "small" | "custom";
    onClick?: () => void;
}