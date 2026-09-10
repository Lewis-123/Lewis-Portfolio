(function () {
    "use strict";

    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isApple = /Mac|iPhone|iPad|iPod/.test(navigator.platform || "");

    /* ----------------------------------------------------------------------
       Theme
       Transitions are suppressed during the swap so hover styles don't animate.
       ---------------------------------------------------------------------- */

    const themeToggle = document.getElementById("theme-toggle");

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
            root.classList.add("is-theming");
            root.setAttribute("data-theme", next);
            try {
                localStorage.setItem("theme", next);
            } catch (e) { /* private mode */ }
            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => root.classList.remove("is-theming"));
            });
        });
    }

    /* ----------------------------------------------------------------------
       Masthead — hairline appears only once the page has moved
       ---------------------------------------------------------------------- */

    const masthead = document.getElementById("masthead");

    if (masthead) {
        const sentinel = document.createElement("div");
        sentinel.style.cssText = "position:absolute;top:0;height:1px;width:1px;pointer-events:none";
        document.body.prepend(sentinel);
        new IntersectionObserver(
            ([entry]) => masthead.classList.toggle("is-stuck", !entry.isIntersecting)
        ).observe(sentinel);
    }

    /* ----------------------------------------------------------------------
       Nav — one pill that slides between items rather than three that light up
       ---------------------------------------------------------------------- */

    const nav = document.getElementById("nav");
    const pill = nav && nav.querySelector(".nav-pill");

    if (nav && pill && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const moveTo = (link) => {
            pill.style.setProperty("--pill-x", link.offsetLeft + "px");
            pill.style.setProperty("--pill-w", link.offsetWidth + "px");
            nav.classList.add("is-hovering");
        };

        nav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("pointerenter", () => moveTo(link));
            link.addEventListener("focus", () => moveTo(link));
        });

        nav.addEventListener("pointerleave", () => nav.classList.remove("is-hovering"));
        nav.addEventListener("focusout", (event) => {
            if (!nav.contains(event.relatedTarget)) {
                nav.classList.remove("is-hovering");
            }
        });
    }

    /* ----------------------------------------------------------------------
       Reveal on scroll — fires once per element, never re-animates
       ---------------------------------------------------------------------- */

    const revealables = document.querySelectorAll("[data-reveal]");

    if (revealables.length) {
        if (reduced.matches || !("IntersectionObserver" in window)) {
            revealables.forEach((el) => el.classList.add("is-in"));
        } else {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("is-in");
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { rootMargin: "0px 0px -12% 0px", threshold: 0.01 }
            );
            revealables.forEach((el) => observer.observe(el));
        }
    }

    /* ----------------------------------------------------------------------
       Reading progress on case studies
       ---------------------------------------------------------------------- */

    const progress = document.getElementById("progress");

    if (progress && !reduced.matches) {
        let ticking = false;
        const draw = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
            progress.style.transform = "scaleX(" + ratio + ")";
            ticking = false;
        };
        window.addEventListener(
            "scroll",
            () => {
                if (!ticking) {
                    ticking = true;
                    window.requestAnimationFrame(draw);
                }
            },
            { passive: true }
        );
        draw();
    }

    /* ----------------------------------------------------------------------
       Copy to clipboard — inline confirmation, not a notification
       ---------------------------------------------------------------------- */

    // navigator.clipboard is undefined outside secure contexts and rejects when
    // the document isn't focused, so fall back to a throwaway selection.
    const legacyCopy = (value) => {
        const field = document.createElement("textarea");
        field.value = value;
        field.setAttribute("readonly", "");
        field.style.cssText = "position:fixed;top:0;left:-9999px;opacity:0";
        document.body.appendChild(field);
        field.select();
        let ok = false;
        try {
            ok = document.execCommand("copy");
        } catch (e) {
            ok = false;
        }
        field.remove();
        return ok;
    };

    const copyText = async (value) => {
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(value);
                return true;
            } catch (e) { /* fall through */ }
        }
        return legacyCopy(value);
    };

    document.querySelectorAll("[data-copy]").forEach((button) => {
        const label = button.querySelector("[data-copy-label]");
        let timer;

        button.addEventListener("click", async () => {
            const copied = await copyText(button.getAttribute("data-copy"));
            if (!label) {
                return;
            }
            label.textContent = copied ? "Copied" : "Press ⌘C";
            label.setAttribute("data-state", copied ? "copied" : "failed");
            clearTimeout(timer);
            timer = setTimeout(() => {
                label.textContent = "Copy";
                label.removeAttribute("data-state");
            }, 1800);
        });
    });

    /* ----------------------------------------------------------------------
       Contact form — hands off to the user's mail client
       ---------------------------------------------------------------------- */

    const form = document.getElementById("contact-form");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const message = form.message.value.trim();
            if (!name || !email || !message) {
                return;
            }
            const submit = form.querySelector("[type='submit']");
            if (submit) {
                submit.disabled = true;
                setTimeout(() => { submit.disabled = false; }, 2500);
            }
            const subject = encodeURIComponent("Hello from " + name);
            const body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
            window.location.href = "mailto:mucherulewis@gmail.com?subject=" + subject + "&body=" + body;
        });
    }

    /* ----------------------------------------------------------------------
       Command palette
       ---------------------------------------------------------------------- */

    const palette = document.getElementById("palette");
    const paletteOpen = document.getElementById("palette-open");
    const paletteInput = document.getElementById("palette-input");
    const paletteEmpty = document.getElementById("palette-empty");
    const paletteScrim = palette && palette.querySelector(".palette-scrim");
    const hint = document.querySelector("[data-palette-hint]");

    if (hint) {
        hint.textContent = isApple ? "⌘K" : "Ctrl K";
    }

    if (palette) {
        const options = Array.from(palette.querySelectorAll(".palette-list a"));
        const groups = Array.from(palette.querySelectorAll(".palette-group"));
        let cursor = 0;
        let lastFocused = null;

        const shown = () => options.filter((option) => !option.parentElement.hidden);

        const select = (index) => {
            const list = shown();
            if (!list.length) {
                return;
            }
            cursor = (index + list.length) % list.length;
            options.forEach((option) => option.setAttribute("aria-selected", "false"));
            const active = list[cursor];
            active.setAttribute("aria-selected", "true");
            active.scrollIntoView({ block: "nearest" });
        };

        const filter = () => {
            const query = paletteInput.value.trim().toLowerCase();
            options.forEach((option) => {
                const haystack = (
                    option.textContent + " " + (option.getAttribute("data-terms") || "")
                ).toLowerCase();
                option.parentElement.hidden = Boolean(query) && !haystack.includes(query);
            });
            // Hide a group heading when everything under it is filtered out.
            groups.forEach((group) => {
                let node = group.nextElementSibling;
                let any = false;
                while (node && !node.classList.contains("palette-group")) {
                    if (!node.hidden) {
                        any = true;
                        break;
                    }
                    node = node.nextElementSibling;
                }
                group.hidden = !any;
            });
            const empty = shown().length === 0;
            if (paletteEmpty) {
                paletteEmpty.hidden = !empty;
            }
            select(0);
        };

        const close = () => {
            if (palette.hidden) {
                return;
            }
            palette.classList.remove("is-open");
            const finish = () => {
                palette.hidden = true;
                document.body.classList.remove("is-locked");
            };
            if (reduced.matches) {
                finish();
            } else {
                setTimeout(finish, 160);
            }
            if (paletteOpen) {
                paletteOpen.setAttribute("aria-expanded", "false");
            }
            if (lastFocused) {
                lastFocused.focus();
            }
        };

        const open = () => {
            if (!palette.hidden) {
                return;
            }
            lastFocused = document.activeElement;
            palette.hidden = false;
            document.body.classList.add("is-locked");
            if (paletteOpen) {
                paletteOpen.setAttribute("aria-expanded", "true");
            }
            paletteInput.value = "";
            filter();
            // Let the element paint hidden-state styles before transitioning in.
            window.requestAnimationFrame(() => palette.classList.add("is-open"));
            paletteInput.focus();
        };

        if (paletteOpen) {
            paletteOpen.addEventListener("click", () => (palette.hidden ? open() : close()));
        }

        if (paletteScrim) {
            paletteScrim.addEventListener("click", close);
        }

        paletteInput.addEventListener("input", filter);

        options.forEach((option) => {
            option.addEventListener("click", close);
            option.addEventListener("pointermove", () => {
                const index = shown().indexOf(option);
                if (index >= 0 && index !== cursor) {
                    select(index);
                }
            });
        });

        document.addEventListener("keydown", (event) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
                event.preventDefault();
                if (palette.hidden) {
                    open();
                } else {
                    close();
                }
                return;
            }

            // "/" is a search shortcut everywhere except inside a text field.
            const typing = /^(input|textarea|select)$/i.test(document.activeElement.tagName);
            if (event.key === "/" && palette.hidden && !typing) {
                event.preventDefault();
                open();
                return;
            }

            if (palette.hidden) {
                return;
            }

            if (event.key === "Escape") {
                event.preventDefault();
                close();
            } else if (event.key === "ArrowDown") {
                event.preventDefault();
                select(cursor + 1);
            } else if (event.key === "ArrowUp") {
                event.preventDefault();
                select(cursor - 1);
            } else if (event.key === "Enter") {
                const active = shown()[cursor];
                if (active) {
                    event.preventDefault();
                    active.click();
                }
            }
        });
    }
})();
