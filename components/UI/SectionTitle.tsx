import React from "react";

interface SectionTitleProps extends React.HTMLProps<HTMLHeadingElement> {
    title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = (props) => {
    return (
        <>
            <h2 className={`relative pl-3 mt-4 font-bold text-2xl uppercase text-black ${props.className}`} id="aboutus">
                {props.title}
                <span className="absolute top-0 left-0 w-[5px] h-full bg-mainColor"></span>
            </h2>
        </>
    );
}

export default SectionTitle;
