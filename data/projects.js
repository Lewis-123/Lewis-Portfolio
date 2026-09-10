// Case studies, ordered as they should appear. `featured` picks the three on the home page.
// Narrative sections render in order on /work/:slug.

const PROJECTS = [
    {
        slug: "sentinelai",
        name: "SentinelAI",
        year: "2025",
        role: "Design and build",
        summary: "Environmental risk on a map, not trapped in a spreadsheet.",
        lede: "A risk model is only worth the decision it changes. This one had to be somewhere you could look at it.",
        stack: ["Python", "FastAPI", "React", "Pandas"],
        featured: true,
        link: { label: "GitHub profile", href: "https://github.com/Lewis-123" },
        sections: [
            {
                heading: "Context",
                body: [
                    "Environmental risk data in Kenya mostly lives in reports and CSV exports. Somebody assembles it, somebody publishes it, and then it sits there. The modelling work was already respectable — the problem was everything after the modelling.",
                    "I wanted to see whether putting the same numbers on a map would change how people used them."
                ]
            },
            {
                heading: "Problem",
                body: [
                    "The data existed and nobody opened it. A spreadsheet asks you to already know what you are looking for; you have to hold the geography in your head and translate rows into places. That is a lot to ask of someone who just wants to know whether one area is worse off than another.",
                    "So the risk scores never made it into a decision. They were technically available and practically invisible."
                ]
            },
            {
                heading: "Approach",
                body: [
                    "I split it in two. A Python service does the scoring and exposes it over FastAPI, so the model can change without the interface caring. A React front end reads that API and does one job: show risk against geography.",
                    "The interface deliberately does very little. You land on a map, you see where the risk concentrates, and only then can you drill into the numbers behind a region. Detail is available but never the first thing you meet."
                ]
            },
            {
                heading: "What shipped",
                body: [
                    "A working map view backed by a live scoring API, with region-level drill-down and the underlying figures one click away rather than one download away."
                ]
            },
            {
                heading: "What I'd change",
                body: [
                    "The scoring runs on request. It should be pre-computed and cached — the model does not change often enough to justify recalculating it for every visitor, and the first paint pays for that."
                ]
            }
        ]
    },
    {
        slug: "universal-ace",
        name: "Universal ACE",
        year: "2025",
        role: "Full-stack",
        summary: "Savings groups in Nairobi need books they can trust.",
        lede: "Chamas already work. The software around them mostly doesn't.",
        stack: ["Next.js", "React", "MongoDB", "Tailwind"],
        featured: true,
        link: { label: "Open the repo", href: "https://github.com/Lewis-123/Universal-ACE" },
        sections: [
            {
                heading: "Context",
                body: [
                    "Community savings groups are one of the most quietly functional financial structures in Nairobi. People pool money, lend to each other, and settle up on a schedule. The trust is real and the amounts are real.",
                    "This one is close to home, which is the only reason I understood the problem well enough to build for it."
                ]
            },
            {
                heading: "Problem",
                body: [
                    "The group is not the hard part — the administrator is. One person ends up holding contributions, loans, repayments and balances in whatever tool is nearest, usually a notebook or a spreadsheet that only they can read.",
                    "That works until somebody disputes a number. Then the ledger has to be legible to everyone, not just the person who wrote it, and it usually isn't."
                ]
            },
            {
                heading: "Approach",
                body: [
                    "I designed around the administrator's day rather than around the data model. What do they actually do on a meeting night? Record contributions, mark repayments, check who is behind. Those three became the fastest paths in the app.",
                    "Members get a read-only view of the same ledger. Same numbers, no ambiguity — which is the part that makes it a trust tool rather than a bookkeeping tool."
                ]
            },
            {
                heading: "What shipped",
                body: [
                    "Member records, contribution and loan tracking, and an admin surface built for entering things quickly. Next.js and React on the front, MongoDB underneath."
                ]
            },
            {
                heading: "What I'd change",
                body: [
                    "It assumes a connection. Meeting nights don't always have one, and an offline-first write queue would have mattered more than most of the features I built instead."
                ]
            }
        ]
    },
    {
        slug: "kenya-shop",
        name: "Kenya Shop",
        year: "2025",
        role: "Full-stack",
        summary: "Catalogue, customers, search. The work that has to work on a Tuesday.",
        lede: "The demo is easy. The Tuesday is the product.",
        stack: ["TypeScript", "Node.js", "Express", "MongoDB"],
        featured: true,
        link: { label: "Open the repo", href: "https://github.com/Lewis-123/rust-jumia-kenya-ecommerce" },
        sections: [
            {
                heading: "Context",
                body: [
                    "A local commerce build — catalogue, customers, search, admin. The kind of project that looks solved from the outside and isn't."
                ]
            },
            {
                heading: "Problem",
                body: [
                    "Everything interesting about a shop is unglamorous. Nobody demos inventory reconciliation or an admin table. But those are the surfaces someone sits in front of every day, and if they are slow or confusing the shop stops running.",
                    "I had been building the pretty half of applications and skipping the half that carries the weight."
                ]
            },
            {
                heading: "Approach",
                body: [
                    "I built the boring parts first and on purpose: product records, stock, order state, then search, then the storefront. TypeScript throughout, because the place I kept making mistakes was the shape of data moving between layers.",
                    "Search got more attention than the visual design did. If you cannot find the product, nothing else on the page matters."
                ]
            },
            {
                heading: "What shipped",
                body: [
                    "The full path from catalogue to checkout, plus the admin side that keeps it stocked. Node, Express and MongoDB behind a typed API."
                ]
            },
            {
                heading: "What I'd change",
                body: [
                    "Search is a database query dressed up. It should be a proper index — the current version degrades exactly when the catalogue gets big enough to need it."
                ]
            }
        ]
    },
    {
        slug: "studyvoice",
        name: "StudyVoice AI",
        year: "2025",
        role: "Design and build",
        summary: "Speak or paste your notes. Get summaries, flashcards, quizzes.",
        lede: "Built at the end of a degree, for the version of me that was too tired to read another page.",
        stack: ["Next.js", "TypeScript", "Vercel"],
        featured: false,
        link: { label: "GitHub profile", href: "https://github.com/Lewis-123" },
        sections: [
            {
                heading: "Context",
                body: [
                    "Final year. Everyone I knew was studying tired, and the tools available all assumed a fresh, motivated reader with an hour to spare."
                ]
            },
            {
                heading: "Problem",
                body: [
                    "Most study software lectures you. It decides the format, the pace and the order, and you adapt to it. That is a bad trade when your attention is the scarce resource.",
                    "I wanted something that took whatever state you were in — talking out loud, pasting a wall of text — and met you there."
                ]
            },
            {
                heading: "Approach",
                body: [
                    "One input, three outputs. You speak or paste; it returns a summary, a flashcard set and a quiz, and you pick whichever one you have the energy for.",
                    "The interface has no setup step. Anything that asked the user to configure something before getting value got cut."
                ]
            },
            {
                heading: "What shipped",
                body: [
                    "A Next.js and TypeScript app on Vercel, built around voice and pasted notes, generating all three formats from a single capture."
                ]
            },
            {
                heading: "What I'd change",
                body: [
                    "There is no memory between sessions. Study is repetition over weeks, and the app treats every visit as the first one."
                ]
            }
        ]
    },
    {
        slug: "financeflow",
        name: "FinanceFlow",
        year: "2025",
        role: "Full-stack",
        summary: "Income, expenses, a quiet ledger I'd actually open.",
        lede: "My own books first. If I wouldn't use it, it didn't ship.",
        stack: ["Node.js", "Express", "MongoDB", "Handlebars"],
        featured: false,
        link: { label: "Open the repo", href: "https://github.com/Lewis-123/FinanceFlow" },
        sections: [
            {
                heading: "Context",
                body: [
                    "I needed to track my own money and could not find anything I wanted to open twice."
                ]
            },
            {
                heading: "Problem",
                body: [
                    "Money apps shout. Charts, streaks, colour-coded warnings, a nudge every time you spend. All of that makes the app harder to return to, which defeats the point — a ledger only works if you keep writing in it.",
                    "The design goal was calm, not insight."
                ]
            },
            {
                heading: "Approach",
                body: [
                    "I removed things. No dashboard, no gamification, no charts until there was enough data for a chart to mean anything. Entering a transaction is the fastest thing you can do, and everything else is secondary to that."
                ]
            },
            {
                heading: "What shipped",
                body: [
                    "A working personal ledger — income, expenses, categories, history — on Node, Express, MongoDB and Handlebars. I still use it."
                ]
            },
            {
                heading: "What I'd change",
                body: [
                    "Recurring transactions are manual. That is the one repetitive thing in the app and it is the thing I automated last."
                ]
            }
        ]
    },
    {
        slug: "weatherapp",
        name: "WeatherApp",
        year: "2025",
        role: "Android",
        summary: "Live weather on Android. A small, complete thing I can put in your hand.",
        lede: "I wanted one finished app, not another fragment.",
        stack: ["Java", "Kotlin", "Android", "Firebase"],
        featured: false,
        link: { label: "Open the repo", href: "https://github.com/Lewis-123/WeatherApp" },
        sections: [
            {
                heading: "Context",
                body: [
                    "Most of what I had built lived in a browser tab and most of it was unfinished. I wanted something pocket-sized that I could hand to a person and watch them use."
                ]
            },
            {
                heading: "Problem",
                body: [
                    "Weather is a solved idea, so there is nowhere to hide. Nobody is impressed that it fetches a forecast — the only thing left to get right is how it feels to hold.",
                    "That made it a good exercise. The whole grade is in the craft."
                ]
            },
            {
                heading: "Approach",
                body: [
                    "MVVM so the state was honest, Firebase for the backing services, and a single screen that answers the question you opened the app to ask before you have to scroll.",
                    "I spent most of the time on loading and error states, because on a phone with patchy signal those are not edge cases — they are the normal experience."
                ]
            },
            {
                heading: "What shipped",
                body: [
                    "A complete Android app with live data, built in Java and Kotlin. Finished, which was the actual objective."
                ]
            },
            {
                heading: "What I'd change",
                body: [
                    "No widget. A weather app you have to open is a weather app you forget about."
                ]
            }
        ]
    }
];

const bySlug = (slug) => PROJECTS.find((project) => project.slug === slug);

const featured = () => PROJECTS.filter((project) => project.featured);

// Previous/next wrap around so a case study never dead-ends.
const neighbours = (slug) => {
    const index = PROJECTS.findIndex((project) => project.slug === slug);
    if (index < 0) {
        return { prev: null, next: null };
    }
    return {
        prev: PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length],
        next: PROJECTS[(index + 1) % PROJECTS.length]
    };
};

module.exports = { PROJECTS, bySlug, featured, neighbours };
