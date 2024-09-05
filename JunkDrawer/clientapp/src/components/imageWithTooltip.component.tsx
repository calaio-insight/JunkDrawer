import {FloatingPortal} from "@floating-ui/react";


interface IImageWithTooltipProps {
    isOpen: boolean;
    setFloating: any;
    floatingStyles: any;
    getFloatingProps: any;
    imgSrc: string;
    imgAlt: string;
    handleImageClick: () => void;
    setReference: any;
    getReferenceProps: any;
}
export const ImageWithTooltip = (
    {
        isOpen,
        setFloating,
        floatingStyles,
        getFloatingProps,
        imgSrc,
        imgAlt,
        handleImageClick,
        setReference,
        getReferenceProps
    }: IImageWithTooltipProps
) => {
    
    
    return (
        <>
            <FloatingPortal>
                {isOpen && (
                    <div
                        className="Tooltip"
                        ref={setFloating}
                        style={floatingStyles}
                        {...getFloatingProps()}
                    >
                        Click on the image to change
                    </div>
                )}
            </FloatingPortal>

            <img src={imgSrc} alt={imgAlt}
                 onClick={handleImageClick}
                 style={{height: "12rem", cursor: 'pointer'}}
                 className={"mt-3"}
                 ref={setReference} {...getReferenceProps()} />
        </>
    )
}