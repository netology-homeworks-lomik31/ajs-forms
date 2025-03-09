import { Popover } from "./popover";

document.addEventListener("DOMContentLoaded", () => {
    const button_add = document.querySelector(".add-popover");
    let popover;
    button_add.addEventListener("click", () => {
        console.log("button_click");
        if (popover !== undefined) {
            popover.togglePopover();
        } else {
            popover = new Popover(button_add, {
                title: "Popover title",
                content:
                    "And here's some amazing content. It's very engaging. Right?",
            });
        }
    });
});
