import {
    autoUpdate,
    flip,
    offset,
    shift,
    useDismiss,
    useFloating,
    useFocus,
    useHover, useInteractions,
    useRole
} from "@floating-ui/react";
import {useState} from "react";


export function useTooltip() {
    const [isOpen, setIsOpen] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: "top",
        // Make sure the tooltip stays on the screen
        whileElementsMounted: autoUpdate,
        middleware: [
            offset(5),
            flip({
                fallbackAxisSideDirection: "start"
            }),
            shift()
        ]
    });

    // Event listeners to change the open state
    const hover = useHover(context, { move: false });
    const focus = useFocus(context);
    const dismiss = useDismiss(context);
    // Role props for screen readers
    const role = useRole(context, { role: "tooltip" });

    // Merge all the interactions into prop getters
    const { getReferenceProps, getFloatingProps } = useInteractions([
        hover,
        focus,
        dismiss,
        role
    ]);
    
    return {
        refs,
        getReferenceProps,
        isOpen,
        setIsOpen,
        getFloatingProps,
        floatingStyles
    }
}