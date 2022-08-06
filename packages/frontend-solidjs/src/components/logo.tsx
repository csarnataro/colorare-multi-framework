type LogoProps = { 
    font: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
    additionalCssClass?: string;
    size?: number
};
export default ({ additionalCssClass = '', size = 8, font = 'base'}: LogoProps) => {

    const sizeCssClasses = `h-${size}`;
    return (
        <h1 class={`block text-${font} tracking-wide mb-4 font-bold ${sizeCssClasses} ${additionalCssClass}`} style="text-shadow: #A3A3A3 1px 1px 1px">
            <span style="color:#ff4747;">C</span>
            <span style="color:#ffd147;">O</span>
            <span style="color:#a3ff47;">L</span>
            <span style="color:#47ff75;">O</span>
            <span style="color:#47ffff;">R</span>
            <span style="color:#4775ff;">A</span>
            <span style="color:#a347ff;">R</span>
            <span style="color:#ff47d1;">E</span>
        </h1>
    );

}