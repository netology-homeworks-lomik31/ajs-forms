export class Popover {
    constructor(target, options = {}) {
        this.target = target;
        this.title = options.title || "";
        this.content = options.content || "";
        this.popover = null;

        this.handleClickOutside = this.handleClickOutside.bind(this);
        window.addEventListener("click", this.handleClickOutside);
        this.showPopover();
    }

    _createPopover() {
        if (!this.popover) {
            this.popover = document.createElement("div");
            this.popover.classList.add("popover");

            if (this.title) {
                const header = document.createElement("div");
                header.classList.add("popover-header");
                header.textContent = this.title;
                this.popover.appendChild(header);
            }

            const body = document.createElement("div");
            body.classList.add("popover-body");
            body.textContent = this.content;
            this.popover.appendChild(body);

            document.body.appendChild(this.popover);
        }
    }

    togglePopover() {
        if (this.popover && this.popover.classList.contains("show")) {
            this.hidePopover();
        } else {
            this.showPopover();
        }
    }

    showPopover() {
        this._createPopover();

        const rect = this.target.getBoundingClientRect();

        const left =
            rect.left +
            window.scrollX +
            rect.width / 2 -
            this.popover.offsetWidth / 2;

        const top = rect.top + window.scrollY - this.popover.offsetHeight - 5;

        this.popover.style.left = `${Math.max(5, Math.min(left, window.innerWidth - this.popover.offsetWidth - 5))}px`;
        this.popover.style.top = `${Math.max(5, top)}px`;

        this.popover.classList.add("show");
    }

    hidePopover() {
        if (this.popover) {
            this.popover.classList.remove("show");

            setTimeout(() => {
                if (this.popover && this.popover.parentNode) {
                    this.popover.parentNode.removeChild(this.popover);
                    this.popover = null;
                }
            }, 200);
        }
    }

    handleClickOutside(event) {
        console.log("outside click");
        if (
            this.popover &&
            !this.popover.contains(event.target) &&
            !this.target.contains(event.target)
        ) {
            this.hidePopover();
        }
    }

    destroy() {
        if (this.popover) {
            this.popover.remove();
            this.popover = null;
        }

        this.target.removeEventListener("click", () => this.togglePopover());
        window.removeEventListener("click", this.handleClickOutside);
    }
}
