from app.models.request import CategoryRead


DEFAULT_CATEGORIES: list[CategoryRead] = [
    CategoryRead(
        id="employee-search",
        title="Hladanie zamestnanca",
        description="Hladanie kolegu, freelancera alebo specialistu do timu.",
        slug="hladanie-zamestnanca",
    ),
    CategoryRead(
        id="investor-search",
        title="Hladanie investora",
        description="Potrebujete investora, partnera alebo financovanie projektu.",
        slug="hladanie-investora",
    ),
    CategoryRead(
        id="event-speaking",
        title="Speaking na evente",
        description="Zaujem vystupit, prezentovat alebo viest diskusiu na podujati.",
        slug="speaking-na-evente",
    ),
    CategoryRead(
        id="social-media-sharing",
        title="Zdielanie marketingu",
        description="Pomoc so zdielanim podkladov na socialnych sietach.",
        slug="zdielanie-marketingu",
    ),
    CategoryRead(
        id="sales-support",
        title="Podpora v sales",
        description="Pomoc s obchodnou strategiou, outreachom alebo predajnym procesom.",
        slug="podpora-v-oblasti-sales",
    ),
    CategoryRead(
        id="client-search",
        title="Hladanie klientov",
        description="Pomoc s oslovenim novych klientov a vytvaranim dopytu.",
        slug="hladanie-klientov",
    ),
    CategoryRead(
        id="other",
        title="Ine",
        description="Iny typ poziadavky.",
        slug="ine",
    ),
]
