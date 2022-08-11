import { IconProps } from "./icon-props";

const Magnifier = ({ additionalCssClass, size = 4 }: IconProps) => {
    const sizeCssClasses = `h-${size} w-${size}`;

    return (
        <svg className={`inline-block ${sizeCssClasses} ${additionalCssClass}`} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
    )
}

export default Magnifier;