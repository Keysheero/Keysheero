<picture>
  <source media="(max-width: 600px)" srcset="assets/hero-mobile.svg">
  <img src="assets/hero.svg" width="100%" alt="Kirill Belyakov — Python backend developer. I build it. I keep it running. Almaty, Kazakhstan. Open to remote work and relocation.">
</picture>

<p align="center">
  <a href="#selected-work">Selected work</a> &nbsp; / &nbsp;
  <a href="#stack">Stack</a> &nbsp; / &nbsp;
  <a href="mailto:kbelakov88@gmail.com">Let's talk ↗</a>
</p>

I build Python backends for products people use every day: asynchronous services, databases, and the infrastructure underneath. **From the first schema to the production incident, I own the whole path.**

<sub>Almaty, Kazakhstan · Open to remote work &amp; relocation · Russian C2 / English B2</sub>

## Selected work

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
<summary><b>Inside SchoolPro — architecture &amp; engineering decisions</b></summary>

<br>

<img src="assets/schoolpro.svg" width="100%" alt="Five user roles connect through Telegram to aiogram middleware, domain services, and SQLAlchemy with PostgreSQL. Redis caches roles; Google Sheets synchronises curriculum content.">

- **Fewer database reads.** Redis-backed role middleware removes repeated permission lookups from the event path.
- **Content without a release.** Methodologists update curriculum through two-way Google Sheets sync.
- **Changes with a way back.** Alembic migrations ship with backups and rollback plans.
- **Operations included.** Docker on Linux, handler profiling, structured logs, pytest, and deployment documentation.

</details>

<br>

<picture>
  <source media="(max-width: 600px)" srcset="assets/hh-mogger-title-mobile.svg">
  <img src="assets/hh-mogger-title.svg" width="100%" alt="02 / hh_mogger — job search automation. Telegram Mini App.">
</picture>

**Find the fit. Then write the letter.** A Telegram Mini App combining the hh.ru API, local vacancy scoring, and LLM-assisted cover letters. Matching runs locally; generation is reserved for relevant vacancies.

<details>
<summary><b>Inside hh_mogger — matching, generation &amp; delivery</b></summary>

Post-processing strips model preambles and formatting. Automated applications have deliberate rate limits. The frontend is React and TypeScript; the backend uses Python, OAuth, and Caddy.

</details>

<br>

<picture>
  <source media="(max-width: 600px)" srcset="assets/anomia-title-mobile.svg">
  <img src="assets/anomia-title.svg" width="100%" alt="03 / ANOMIA — commercial visual novel. Released and monetised.">
</picture>

**A game shipped. A pipeline built.** Commercial visual novel with turn-based combat, progression, and save-state migrations. Released on itch.io and Patreon, with an English translation.

<details>
<summary><b>Inside ANOMIA — the asset pipeline</b></summary>

A custom Python pipeline connects ComfyUI generation, contact sheets for review, and installation of approved assets into the project. Save-state migrations keep older saves loading across releases.

</details>

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
