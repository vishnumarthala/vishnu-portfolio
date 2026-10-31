# Zero to GPU: social kit

Ready-to-post copy for LinkedIn (works for X and Instagram captions too, shortened).
Images are in `images/` (1200 x 630, the same images LinkedIn shows as link previews).

**Before posting:** replace `https://vishnu-portfolio.vercel.app` with your live domain if it differs (it follows `NEXT_PUBLIC_SITE_URL`).

## How to post for reach

- Upload the image natively and put the link in the **first comment**. LinkedIn tends to show posts with external links in the body to fewer people.
- One episode every 2 to 3 days, Tuesday to Thursday mornings (CET) work well for a German and Indian tech audience.
- Reply to every comment in the first hour. That is when the algorithm decides how far a post travels.
- End each post with a question. Comments travel further than likes.
- Pin the launch post to your profile's Featured section and add the series link there.

---

## Launch post (EN) · image: `en-00-series.png`

Everyone talks about AI.
Very few people have run a model on their own hardware.

So I wrote a series about it: **Zero to GPU**.
7 short episodes. From an empty PC slot to a private LLM answering your questions, with your data never leaving the room.

What's inside:
1. VRAM is the number that matters
2. Power, slots and airflow
3. From black screen to nvidia-smi
4. CUDA without the pain
5. Your first private LLM
6. Keep it cool, keep it fast
7. Own or rent? The honest maths

Plain language, every command explained, no hype. In English and German.

Have you ever run a model locally, or is everything still going through an API?

Link in the first comment.

#AI #GPU #LLM #LocalAI #MachineLearning #SoftwareArchitecture

**First comment:** The full series: https://vishnu-portfolio.vercel.app/en/series/zero-to-gpu

---

## Launch post (DE) · Bild: `de-00-series.png`

Alle reden über KI.
Nur wenige haben schon einmal ein Modell auf eigener Hardware laufen lassen.

Deshalb habe ich eine Serie geschrieben: **Zero to GPU**.
7 kurze Folgen. Vom leeren PCIe-Steckplatz bis zum privaten LLM, das Ihre Fragen beantwortet, ohne dass Ihre Daten den Raum verlassen.

Gerade für Unternehmen in Deutschland spannend: Lokale KI macht Datenschutzgespräche deutlich kürzer.

Klare Sprache, jeder Befehl erklärt, kein Hype. Auf Deutsch und Englisch.

Betreiben Sie schon Modelle lokal, oder läuft bei Ihnen noch alles über eine API?

Link im ersten Kommentar.

#KI #GPU #LLM #Datenschutz #SoftwareArchitektur

**Erster Kommentar:** Zur Serie: https://vishnu-portfolio.vercel.app/de/series/zero-to-gpu

---

## Episode 1 · `en-01-pick-your-gpu.png`

Most people buy a GPU for AI by comparing clock speeds.
That is the wrong number.

The one that decides everything is **VRAM**. Think of it as the size of your workbench: the whole model has to fit on it.

The formula I use:
VRAM (GB) ≈ parameters in billions × bytes per parameter × 1.2

An 8B model in full precision: about 19 GB. It does not fit on a 16 GB card.
The same model at 4-bit: about 5 GB. It runs on almost anything.

Episode 1 of Zero to GPU has the full table of what fits where.

What GPU are you running today?

**First comment:** https://vishnu-portfolio.vercel.app/en/series/zero-to-gpu/pick-your-gpu

---

## Episode 2 · `en-02-install-the-card.png`

Most GPU problems are not software problems.
They are power, cables and heat.

A game pushes a GPU in bursts. An AI workload can hold it at full power for hours. Whatever is weak in your build will show up.

Episode 2 covers:
→ sizing the power supply (an RTX 5090 alone can draw 575 W)
→ seating the 16-pin connector properly
→ the right PCIe slot and airflow
→ four BIOS settings to check before installing anything

Bonus tip for a dedicated AI box: plug your monitor into the motherboard so every gigabyte of VRAM stays free for models.

**First comment:** https://vishnu-portfolio.vercel.app/en/series/zero-to-gpu/install-the-card

---

## Episode 3 · `en-03-drivers.png`

The moment every GPU setup is waiting for: typing `nvidia-smi` and seeing your card's name.

Episode 3 gets you there on Ubuntu in four commands, including the step most guides skip: the blue "Enroll MOK" screen when Secure Boot is on. Miss it, and the driver silently never loads.

Also covered: Windows with WSL2, and the one thing you must never install inside WSL.

**First comment:** https://vishnu-portfolio.vercel.app/en/series/zero-to-gpu/drivers

---

## Episode 4 · `en-04-cuda-and-containers.png`

Unpopular truth: you probably don't need to install the CUDA toolkit.

Driver, CUDA runtime, CUDA toolkit. Three different things, and mixing them up costs people whole weekends.

The rule that removes most confusion: your driver must be at least as new as the CUDA version your framework was built with. PyTorch already ships its own runtime.

Episode 4 also sets up GPU containers. Experiment in Python, ship in a container, and the same image runs on your desk and in the cloud.

How many hours have you lost to CUDA versions? Be honest.

**First comment:** https://vishnu-portfolio.vercel.app/en/series/zero-to-gpu/cuda-and-containers

---

## Episode 5 · `en-05-first-local-llm.png`

Your own ChatGPT-style model. Offline. Your data never leaves the room.

One install command, one run command, and you have a private LLM on your own GPU, with an OpenAI-compatible API on localhost.

Episode 5 also shows how to check that the GPU (not the CPU) is really doing the work, and how to read tokens per second.

For companies in Germany this is often the most interesting part: sensitive data stays under your control.

What would you use a fully private LLM for?

**First comment:** https://vishnu-portfolio.vercel.app/en/series/zero-to-gpu/first-local-llm

---

## Episode 6 · `en-06-monitor-and-tune.png`

GPUs ship tuned for benchmark scores, not for your electricity bill.

The last 20 percent of power often buys only a few percent of speed. For AI inference, where memory speed is usually the bottleneck, the trade tends to be even better.

Episode 6: three tools to watch your GPU at work, how to set a power limit step by step, and how to keep drivers stable through updates.

Have you ever power-limited your GPU?

**First comment:** https://vishnu-portfolio.vercel.app/en/series/zero-to-gpu/monitor-and-tune

---

## Episode 7 · `en-07-own-or-rent.png`

Buying a GPU is not always cheaper than the cloud.

One number decides: how many hours per month the GPU actually works.

In my worked example (3,000 € machine, German electricity prices, an assumed cloud rate):
→ 2 hours a day: break-even after about 8.5 years. Rent.
→ 8 hours a day: about 2 years.
→ Around the clock: about 9 months. Buy.

My answer as an architect: both. Develop locally, rent for the big jobs, and keep everything in containers so work can move freely.

That's the finale of Zero to GPU. If it helped you, share it with one person about to buy their first GPU.

**First comment:** https://vishnu-portfolio.vercel.app/en/series/zero-to-gpu/own-or-rent
