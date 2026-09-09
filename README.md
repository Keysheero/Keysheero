<img src="header.svg" alt="Kirill Belyakov — Backend Developer" width="100%">

<p align="center">
  <a href="mailto:kbelakov88@gmail.com"><img src="https://img.shields.io/badge/kbelakov88%40gmail.com-1c3f6e?style=flat-square&logo=gmail&logoColor=white" alt="Email"></a>
  <img src="https://img.shields.io/badge/Almaty,%20Kazakhstan-3d4c5c?style=flat-square&logo=googlemaps&logoColor=white" alt="Location">
  <img src="https://img.shields.io/badge/Open%20to%20relocation%20%26%20remote-2f7d4f?style=flat-square" alt="Availability">
  <img src="https://img.shields.io/badge/Russian%20C2%20·%20English%20B2-5a6470?style=flat-square" alt="Languages">
</p>

---

I write backend systems that other people depend on. For the past sixteen months I have been
the only developer on an EdTech platform that a few hundred students, teachers and managers
open every day — which means I have also been the only person on call when it breaks. That
turns out to be an unusually fast way to learn what production actually costs.

Most of my work lives in Telegram: asynchronous services, PostgreSQL schemas, role systems,
and the deployment underneath them.

<br>

<table>
  <tr>
    <td align="center"><b>~63,000</b><br><sub>lines of Python<br>in production</sub></td>
    <td align="center"><b>630+</b><br><sub>commits, sole<br>author</sub></td>
    <td align="center"><b>100+</b><br><sub>paying<br>subscribers</sub></td>
    <td align="center"><b>5</b><br><sub>role interfaces,<br>one codebase</sub></td>
    <td align="center"><b>8</b><br><sub>live migrations,<br>zero downtime</sub></td>
    <td align="center"><b>16 mo</b><br><sub>running it<br>alone</sub></td>
  </tr>
</table>

<br>

## What I build

### SchoolPro — EdTech platform for national exam preparation

<sub><b>Production since May 2025</b> · sole developer · commercial contract</sub>

Students prepare for the UNT, teachers grade their homework, curators track groups and
managers watch the numbers — all inside Telegram. I designed the architecture, wrote the
code, deployed it, and maintain it while it is live.

<img src="diagram-schoolpro.svg" alt="SchoolPro architecture: Telegram users, aiogram application with role middleware and domain services, Redis role cache, SQLAlchemy repository layer over PostgreSQL, APScheduler jobs and Google Sheets content sync" width="100%">

<details>
<summary><b>Engineering decisions worth explaining</b></summary>

<br>

**Role checks stopped hitting the database.** Every incoming Telegram event used to resolve
the user's role with a query. Under five role types and constant polling that is a lot of
identical reads for data that almost never changes. Access control moved into middleware
with a Redis-backed role cache, and the per-event database round trip disappeared.

**Content editors do not wait for releases.** Curriculum material is authored by
methodologists, not by me. Two-way synchronisation with Google Sheets through
`gspread-asyncio` means they edit in a spreadsheet and the bot picks the change up — no
deploy, no ticket, no developer in the loop.

**Migrations run against a live database.** Eight Alembic revisions have shipped while the
service was serving users. Each one is its own pass with a backup and a written rollback
plan, because the alternative is discovering the problem from a student who cannot open
their homework.

**Operations are part of the job, not someone else's.** 23 pytest suites, profiling
middleware that logs response times per handler, structured logs prefixed by subsystem,
Docker with separate dev and prod configurations on a Linux VPS, and 18 documents covering
the schema, infrastructure and deploy procedure — written as the code was written.

</details>

<br>

### hh_mogger — job search automation as a Telegram Mini App

<sub>Personal project · 11,000 lines of Python · 2,900 of TypeScript</sub>

Applying to jobs by hand is slow, and cover letters written at volume all sound identical.
This fixes both without becoming a spam machine — the limits are deliberate.

<img src="diagram-hhmogger.svg" alt="hh_mogger pipeline: search profile, hh.ru API over OAuth, local match scoring, LLM cover letter, post-processing, rate-limited autopilot, application sent" width="100%">

<details>
<summary><b>Why the letters don't read like a model wrote them</b></summary>

<br>

Three layers, in order of how much they matter:

1. **The prompt forbids the tells.** 26 specific pieces of filler are banned outright, along
   with markdown and enumerated connectives. The model is required to name one concrete
   detail from the vacancy and one fact from the applicant's experience that carries a
   number. Varied paragraph length and at least one short sentence are asked for explicitly.
2. **Post-processing cleans what survives.** Preambles ("Sure! Here is your letter:"),
   markdown, bullet lists, wrapping quotes and trailing model commentary are stripped
   programmatically rather than hoped away.
3. **Scoring never touches the model at all.** The 0–100 match is computed locally from
   skill overlap, seniority, salary and work format — instant, free, and it means the LLM is
   only invoked for vacancies actually worth applying to.

The Mini App front end is React and TypeScript inside Telegram, with Caddy in front and
three Compose configurations for local, HTTPS and Postgres setups.

</details>

<br>

### ANOMIA — commercial visual novel

<sub>Released and monetised on itch.io and Patreon</sub>

A shipped commercial product, and the reason I now know what a build pipeline is worth.

- **49,000 lines** of gameplay code — turn-based combat, talent and level progression, a
  scene gallery, and save-state migrations that keep old saves loading across releases
- **A 6,500-line Python asset pipeline** written from scratch: batch generation through the
  ComfyUI API, contact-sheet assembly for review, automated installation of approved assets
  into the project tree
- Full story translated into English

<br>

## Stack

<table>
  <tr>
    <td><b>Languages</b></td>
    <td>
      <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white">
      <img src="https://img.shields.io/badge/SQL-4479A1?style=flat-square&logo=postgresql&logoColor=white">
      <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white">
      <img src="https://img.shields.io/badge/Bash-4EAA25?style=flat-square&logo=gnubash&logoColor=white">
    </td>
  </tr>
  <tr>
    <td><b>Backend</b></td>
    <td>
      <img src="https://img.shields.io/badge/aiogram%203-2AABEE?style=flat-square&logo=telegram&logoColor=white">
      <img src="https://img.shields.io/badge/asyncio-3776AB?style=flat-square&logo=python&logoColor=white">
      <img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white">
      <img src="https://img.shields.io/badge/aiohttp-2C5BB4?style=flat-square&logo=aiohttp&logoColor=white">
      <img src="https://img.shields.io/badge/httpx-415A77?style=flat-square">
      <img src="https://img.shields.io/badge/APScheduler-5a6470?style=flat-square">
    </td>
  </tr>
  <tr>
    <td><b>Data</b></td>
    <td>
      <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white">
      <img src="https://img.shields.io/badge/SQLAlchemy%202.0-D71F00?style=flat-square&logo=sqlalchemy&logoColor=white">
      <img src="https://img.shields.io/badge/Alembic-6BA81E?style=flat-square">
      <img src="https://img.shields.io/badge/asyncpg-2F6690?style=flat-square">
      <img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white">
      <img src="https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white">
    </td>
  </tr>
  <tr>
    <td><b>Infrastructure</b></td>
    <td>
      <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white">
      <img src="https://img.shields.io/badge/Linux-FCC624?style=flat-square&logo=linux&logoColor=black">
      <img src="https://img.shields.io/badge/Caddy-1F88C0?style=flat-square&logo=caddy&logoColor=white">
      <img src="https://img.shields.io/badge/nginx-009639?style=flat-square&logo=nginx&logoColor=white">
      <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white">
      <img src="https://img.shields.io/badge/Poetry-60A5FA?style=flat-square&logo=poetry&logoColor=white">
    </td>
  </tr>
  <tr>
    <td><b>Front end</b></td>
    <td>
      <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black">
      <img src="https://img.shields.io/badge/Telegram%20Mini%20Apps-2AABEE?style=flat-square&logo=telegram&logoColor=white">
    </td>
  </tr>
  <tr>
    <td><b>Quality</b></td>
    <td>
      <img src="https://img.shields.io/badge/pytest-0A9EDC?style=flat-square&logo=pytest&logoColor=white">
      <img src="https://img.shields.io/badge/profiling-5a6470?style=flat-square">
      <img src="https://img.shields.io/badge/structured%20logging-5a6470?style=flat-square">
    </td>
  </tr>
  <tr>
    <td><b>Integrations</b></td>
    <td>
      <img src="https://img.shields.io/badge/REST-6c7a89?style=flat-square">
      <img src="https://img.shields.io/badge/OAuth-EB5424?style=flat-square&logo=auth0&logoColor=white">
      <img src="https://img.shields.io/badge/Telegram%20Bot%20API-2AABEE?style=flat-square&logo=telegram&logoColor=white">
      <img src="https://img.shields.io/badge/Google%20Sheets%20API-0F9D58?style=flat-square&logo=googlesheets&logoColor=white">
      <img src="https://img.shields.io/badge/LLM%20APIs-8A4FFF?style=flat-square&logo=openai&logoColor=white">
    </td>
  </tr>
</table>

<br>

## How I work

**Documentation ships with the change, not after it.** The platform repository carries 18
documents on schema, infrastructure and deploy — written while the code was written, because
reconstructed documentation is fiction.

**Refactoring takes one whole layer at a time.** Infrastructure, then constants, then
navigation, then schema — each brought to a working state before the next begins. Scattered
half-finished edits across a live system is how outages happen.

**The service stays up while I work on it.** Every change has to leave it running. Schema
changes get their own pass, with a backup and a rollback plan written before anything moves.

**Names carry the explanation.** A constant called `WARMTH_PUBLIC_SUPPORT` needs no comment;
a bare `5` needs a paragraph. I would rather spend the effort on the name.

<br>

## Why this profile has no public repositories

The client work sits under contract and the rest is commercial. Nothing described above is a
tutorial project or a weekend experiment — it is code that is running right now with people
on the other end of it.

I am glad to walk through any of it: a read-through on a call, or repository access on
request. Good questions to ask me — how role caching changed the event path, what the
zero-downtime migration procedure actually looks like, or why the match scoring deliberately
never calls a language model.

<br>

<div align="center">
  <a href="mailto:kbelakov88@gmail.com"><b>kbelakov88@gmail.com</b></a>
  &nbsp;·&nbsp;
  <span>+7 705 567 60 90</span>
</div>
