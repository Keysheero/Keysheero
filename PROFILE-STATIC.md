<!-- Generated from README.md by scripts/build-static-profile.cjs. -->
<a name="top"></a>

<picture>
  <source media="(prefers-reduced-motion: reduce) and (max-width: 600px)" srcset="assets/hero-mobile-static.svg">
  <source media="(prefers-reduced-motion: reduce)" srcset="assets/hero-static.svg">
  <source media="(max-width: 600px)" srcset="assets/hero-mobile-static.svg">
  <img src="assets/hero-static.svg" width="100%" alt="Kirill Belyakov — Python backend developer. I build it. I keep it running. Almaty, Kazakhstan. Open to remote work and relocation.">
</picture>

<p align="center">
  <a href="#selected-work">Selected work</a> &nbsp; / &nbsp;
  <a href="#stack">Stack</a> &nbsp; / &nbsp;
  <a href="mailto:kbelakov88@gmail.com">Let's talk ↗</a> &nbsp; / &nbsp;
  <a href="README.md">Animated view</a>
</p>

I build Python backends for products people use every day: asynchronous services, databases, and the infrastructure underneath. **From the first schema to the production incident, I own the whole path.**

<sub>Almaty, Kazakhstan · Open to remote work &amp; relocation · Russian C2 / English B2</sub>

## Selected work

<p>
  <a href="#schoolpro">01 · SchoolPro</a> &nbsp; / &nbsp;
  <a href="#hh-mogger">02 · hh_mogger</a> &nbsp; / &nbsp;
  <a href="#anomia">03 · ANOMIA</a>
</p>

<a name="schoolpro"></a>

<picture>
  <source media="(max-width: 600px)" srcset="assets/schoolpro-title-mobile.svg">
  <img src="assets/schoolpro-title.svg" width="100%" alt="01 / SchoolPro — EdTech. Sole developer. In production since May 2025.">
</picture>

**A school day, inside Telegram.** Students prepare for the UNT, teachers review homework, and curators and managers keep things moving. I designed, built, deployed, and maintain the platform.

<picture>
  <source media="(max-width: 600px)" srcset="assets/proof-mobile.svg">
  <img src="assets/proof.svg" width="100%" alt="SchoolPro: 100+ paying subscribers · 5 role interfaces · 8 live database migrations.">
</picture>

<details>
<summary><b>Follow a request — SchoolPro step by step</b></summary>

<br>

<picture>
  <source media="(prefers-reduced-motion: reduce) and (max-width: 600px)" srcset="assets/tour-schoolpro-mobile-static.svg">
  <source media="(prefers-reduced-motion: reduce)" srcset="assets/tour-schoolpro-static.svg">
  <source media="(max-width: 600px)" srcset="assets/tour-schoolpro-mobile-static.svg">
  <img src="assets/tour-schoolpro-static.svg" width="100%" alt="Illustrated request flow: Telegram event → role middleware with Redis cache → domain services → SQLAlchemy and PostgreSQL. Conceptual sequence, not live traffic.">
</picture>

[View full size](assets/tour-schoolpro-static.svg) · [Static diagram](assets/tour-schoolpro-static.svg)

</details>

<details>
<summary><b>Explore the architecture &amp; engineering decisions</b></summary>

<br>

<img src="assets/schoolpro.svg" width="100%" alt="Five user roles connect through Telegram to aiogram middleware, domain services, and SQLAlchemy with PostgreSQL. Redis caches roles; Google Sheets synchronises curriculum content.">

- **Fewer database reads.** Redis-backed role middleware removes repeated permission lookups from the event path.
- **Content without a release.** Methodologists update curriculum through two-way Google Sheets sync.
- **Changes with a way back.** Alembic migrations ship with backups and rollback plans.
- **Operations included.** Docker on Linux, handler profiling, structured logs, pytest, and deployment documentation.

[Discuss SchoolPro ↗](mailto:kbelakov88@gmail.com?subject=SchoolPro%20architecture%20walkthrough)

</details>

<sub><a href="#selected-work">↑ All projects</a> · <a href="#hh-mogger">Next: hh_mogger →</a></sub>

<br>

<a name="hh-mogger"></a>

<picture>
  <source media="(max-width: 600px)" srcset="assets/hh-mogger-title-mobile.svg">
  <img src="assets/hh-mogger-title.svg" width="100%" alt="02 / hh_mogger — job search automation. Telegram Mini App.">
</picture>

**Find the fit. Then write the letter.** A Telegram Mini App combining the hh.ru API, local vacancy scoring, and LLM-assisted cover letters. Matching runs locally; generation is reserved for relevant vacancies.

<details>
<summary><b>Inside hh_mogger — matching, generation &amp; delivery</b></summary>

<br>

<picture>
  <source media="(prefers-reduced-motion: reduce) and (max-width: 600px)" srcset="assets/tour-hhmogger-mobile-static.svg">
  <source media="(prefers-reduced-motion: reduce)" srcset="assets/tour-hhmogger-static.svg">
  <source media="(max-width: 600px)" srcset="assets/tour-hhmogger-mobile-static.svg">
  <img src="assets/tour-hhmogger-static.svg" width="100%" alt="Illustrated job search flow: hh.ru via OAuth → local match scoring → LLM-assisted cover letter → rate-limited applications. Conceptual sequence, not live activity.">
</picture>

[View full size](assets/tour-hhmogger-static.svg) · [Static diagram](assets/tour-hhmogger-static.svg)

Post-processing strips model preambles and formatting. Automated applications have deliberate rate limits. The frontend is React and TypeScript; the backend uses Python, OAuth, and Caddy.

[Discuss hh_mogger ↗](mailto:kbelakov88@gmail.com?subject=hh_mogger%20matching%20and%20automation)

</details>

<sub><a href="#selected-work">↑ All projects</a> · <a href="#anomia">Next: ANOMIA →</a></sub>

<br>

<a name="anomia"></a>

<picture>
  <source media="(max-width: 600px)" srcset="assets/anomia-title-mobile.svg">
  <img src="assets/anomia-title.svg" width="100%" alt="03 / ANOMIA — commercial visual novel. Released and monetised.">
</picture>

**A game shipped. A pipeline built.** Commercial visual novel with turn-based combat, progression, and save-state migrations. Released on itch.io and Patreon, with an English translation.

<details>
<summary><b>Inside ANOMIA — the asset pipeline</b></summary>

<br>

<picture>
  <source media="(prefers-reduced-motion: reduce) and (max-width: 600px)" srcset="assets/tour-anomia-mobile-static.svg">
  <source media="(prefers-reduced-motion: reduce)" srcset="assets/tour-anomia-static.svg">
  <source media="(max-width: 600px)" srcset="assets/tour-anomia-mobile-static.svg">
  <img src="assets/tour-anomia-static.svg" width="100%" alt="Illustrated asset pipeline: ComfyUI generation → contact-sheet review → approved assets → installation in the game project. Conceptual sequence.">
</picture>

[View full size](assets/tour-anomia-static.svg) · [Static diagram](assets/tour-anomia-static.svg)

A custom Python pipeline connects ComfyUI generation, contact sheets for review, and installation of approved assets into the project. Save-state migrations keep older saves loading across releases.

[Discuss ANOMIA ↗](mailto:kbelakov88@gmail.com?subject=ANOMIA%20asset%20pipeline%20walkthrough)

</details>

<sub><a href="#selected-work">↑ All projects</a> · <a href="#stack">Explore the stack →</a></sub>

## Stack

**Backend** &nbsp; Python · asyncio · aiogram · FastAPI<br>
**Data** &nbsp; PostgreSQL · SQLAlchemy · Alembic · Redis<br>
**Delivery** &nbsp; Docker · Linux · Git · pytest<br>
**Interfaces** &nbsp; React · TypeScript · Telegram Mini Apps

<details>
<summary><b>Where is the code?</b></summary>

Client work is under contract; other projects are commercial. I can walk you through architecture, implementation decisions, and production trade-offs. Code walkthroughs and repository access are available where sharing is permitted.

</details>

<br>

<a href="mailto:kbelakov88@gmail.com">
  <picture>
    <source media="(max-width: 600px)" srcset="assets/contact-mobile.svg">
    <img src="assets/contact.svg" width="100%" alt="Have a backend worth building? Let's talk — kbelakov88@gmail.com">
  </picture>
</a>

<p align="center"><sub><a href="mailto:kbelakov88@gmail.com">kbelakov88@gmail.com</a> · Open to remote work &amp; relocation</sub></p>

<p align="center"><sub><a href="#top">↑ Back to top</a> · <a href="README.md">View animated profile</a></sub></p>
