import { cx } from "@emotion/css";

export default function ConfirmBtn({ onClick, children }) {
    return (
        <button onClick={onClick} className={cx(
            "rounded-lg",
            "bg-m1.5 hover:brightness-125",
            "py-3 px-9",
            "text-m3 hover:text-c1",
            "whitespace-nowrap")}>
            - {children} -
        </button>
    )
}
