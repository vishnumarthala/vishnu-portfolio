import type { Series } from "./types";

const series: Series = {
  locale: "en",
  slug: "zero-to-gpu",
  name: "Zero to GPU",
  tagline: "Build your own AI machine in 7 episodes.",
  format: "Limited series",
  synopsis:
    "Everyone talks about AI. Very few people have run a model on their own hardware. This series takes you from an empty PC slot to a private, local LLM answering your questions, one short episode at a time. Plain language, every command explained, no hype.",
  audience: {
    heading: "Who it's for",
    items: [
      "Developers and architects who want to run AI models locally instead of only calling an API.",
      "Tech leads deciding between buying GPUs and renting them in the cloud.",
      "Curious people who are comfortable copying commands into a terminal.",
    ],
  },
  kit: {
    heading: "What you need",
    items: [
      "A desktop PC with a free PCIe x16 slot and a strong enough power supply (Episode 2 shows you how to check).",
      "An NVIDIA graphics card, ideally with 12 GB of video memory or more.",
      "A USB stick for installing Ubuntu, or Windows 11 with WSL2.",
      "About one evening per episode. Most take far less.",
    ],
  },
  ui: {
    series: "Series",
    episode: "Episode",
    episodes: "Episodes",
    minRead: "min read",
    takeaways: "In this episode",
    start: "Start Episode 1",
    prev: "Previous episode",
    next: "Next episode",
    allEpisodes: "All episodes",
    back: "Back to browsing",
    share: "Share this episode",
    shareSeries: "Share the series",
    shareLinkedIn: "Share on LinkedIn",
    shareX: "Share on X",
    shareWhatsApp: "Send on WhatsApp",
    copyLink: "Copy link",
    copied: "Link copied",
    finaleHeading: "Planning a GPU setup for your team?",
    finaleText:
      "I design AI architectures for a living. If you want a second opinion on hardware, local versus cloud, or how to get a model into production, write to me.",
    talk: "Get in touch",
    disclaimer:
      "Commands are written for Ubuntu LTS with NVIDIA cards and follow the vendors' documented install steps. Hardware specs and product names change quickly, so always confirm against the manufacturer's current documentation before you buy or install.",
    tip: "Tip",
    warn: "Watch out",
  },
  episodes: [
    {
      slug: "pick-your-gpu",
      title: "VRAM is the number that matters",
      hook: "Forget clock speeds. One number decides which AI models your GPU can run.",
      summary:
        "How to choose a GPU for AI: why video memory (VRAM) matters more than anything else, a simple formula to size it, and which card fits which model.",
      minutes: 6,
      takeaways: [
        "Why AI runs on GPUs and not CPUs",
        "The one formula to estimate how much VRAM a model needs",
        "Which VRAM size fits which kind of work",
      ],
      blocks: [
        {
          t: "p",
          text: "A CPU is a small team of brilliant experts. A GPU is a stadium full of people who can each do simple maths very fast. AI models are mostly simple maths (multiplying huge grids of numbers) repeated billions of times. That is why the stadium wins.",
        },
        {
          t: "p",
          text: "When people shop for a GPU they compare clock speeds, cores and benchmark scores. For AI, start somewhere else: **video memory, or VRAM**. Think of VRAM as the size of the workbench. The whole model has to fit on the bench. If it doesn't fit, it either won't run at all or it spills over into normal RAM and becomes painfully slow.",
        },
        { t: "h", text: "The one formula you need" },
        {
          t: "p",
          text: "Model sizes are given in parameters, for example 8B means 8 billion. Each parameter is stored with a certain precision. Full precision for inference (FP16) uses 2 bytes per parameter. Quantised versions squeeze that down to 1 byte (8-bit) or about half a byte (4-bit) with a small loss in quality.",
        },
        {
          t: "code",
          code: "VRAM (GB) ≈ parameters in billions × bytes per parameter × 1.2\n\n8B model, FP16 :  8 × 2   × 1.2 ≈ 19 GB\n8B model, 4-bit:  8 × 0.5 × 1.2 ≈  5 GB\n70B model, 4-bit: 70 × 0.5 × 1.2 ≈ 42 GB",
          caption: "The extra 20 percent covers the context window (KV cache) and runtime overhead.",
        },
        {
          t: "p",
          text: "That one calculation already tells you something useful. An 8B model in full precision does not fit on a 16 GB card, but the 4-bit version runs comfortably on an 8 GB card. Long conversations and large documents need more room for the context, so leave some headroom.",
        },
        { t: "h", text: "What fits where" },
        {
          t: "table",
          head: ["VRAM", "What you can comfortably run", "Example cards"],
          rows: [
            ["8 GB", "7B to 8B models (4-bit), short context. Fine for first experiments.", "RTX 4060, RTX 5060"],
            ["12 to 16 GB", "8B to 14B models, image generation, small fine-tuning jobs.", "RTX 5060 Ti 16 GB, RTX 5070 Ti, RTX 5080"],
            ["24 GB", "Models up to around 30B (4-bit), longer context.", "RTX 3090 (used), RTX 4090"],
            ["32 GB", "30B class with room to spare, faster everything.", "RTX 5090"],
            ["48 to 96 GB", "70B class models, serious fine-tuning, several users.", "RTX 6000 Ada, RTX PRO 6000 Blackwell"],
          ],
        },
        {
          t: "note",
          tone: "tip",
          text: "A used 24 GB card is often the best value for learning. VRAM per euro matters more than the newest generation when you are getting started.",
        },
        { t: "h", text: "Why this series uses NVIDIA" },
        {
          t: "p",
          text: "AMD and Apple Silicon can run AI models too, and both keep improving. But most AI software is built and tested on NVIDIA's CUDA platform first. For your first setup you want the fewest surprises, so this series uses NVIDIA. Every concept (VRAM, drivers, containers) carries over if you switch later.",
        },
        { t: "h", text: "Your checklist before buying" },
        {
          t: "list",
          ordered: true,
          items: [
            "Decide the biggest model you want to run, and calculate its VRAM with the formula above.",
            "Pick the card with at least that much VRAM, plus about 20 percent headroom.",
            "Note the card's power draw and length. You need both in the next episode.",
          ],
        },
      ],
    },
    {
      slug: "install-the-card",
      title: "Power, slots and airflow",
      hook: "Most GPU problems are not software problems. They are power, cables and heat.",
      summary:
        "How to physically install a GPU for AI work: power supply sizing, the 16-pin connector, the right PCIe slot, airflow and the BIOS settings that matter.",
      minutes: 7,
      takeaways: [
        "How to check your power supply and case before you buy",
        "Installing the card safely, including the 16-pin power connector",
        "Four BIOS settings to check before installing any software",
      ],
      blocks: [
        {
          t: "p",
          text: "AI workloads are different from gaming. A game pushes the GPU in bursts. Generating text or training a model can hold it at full power for hours. Whatever is weak in your build (power, cooling, a loose cable) will show up under that kind of load.",
        },
        { t: "h", text: "1. Check the power supply" },
        {
          t: "p",
          text: "Look up two numbers on the manufacturer's page: the card's power draw and the **recommended power supply** wattage. As an example, NVIDIA recommends a 1000 W supply for the RTX 5090, which can draw up to 575 W on its own. Choose a quality unit (ATX 3.0 or newer) that meets that recommendation.",
        },
        {
          t: "p",
          text: "Recent NVIDIA cards use a single 16-pin connector (called 12V-2x6 or 12VHPWR). Use the native cable from an ATX 3 power supply, or the adapter that came with the card.",
        },
        {
          t: "note",
          tone: "warn",
          text: "Push the 16-pin plug in until it clicks and sits completely flush. Do not bend the cable sharply right next to the plug. A plug that is only partly inserted can overheat under sustained AI load.",
        },
        { t: "h", text: "2. Check the case and slot" },
        {
          t: "list",
          items: [
            "**Length and thickness.** Big cards are over 30 cm long and take up three slots. Measure your case.",
            "**The right slot.** Use the top PCIe x16 slot, the one closest to the CPU. It is usually the only one wired for full speed.",
            "**Airflow.** Make sure there are intake fans at the front and an exhaust at the back or top. Heat that cannot escape becomes slower performance.",
            "**Support.** Heavy cards sag over time. A simple support bracket protects the slot.",
          ],
        },
        { t: "h", text: "3. Install the card" },
        {
          t: "list",
          ordered: true,
          items: [
            "Shut down, switch off the power supply and pull the plug. Touch the metal case to discharge static.",
            "Remove the slot covers on the back of the case where the card will sit.",
            "Open the latch on the PCIe slot and press the card in evenly until the latch clicks.",
            "Screw the card's bracket to the case.",
            "Connect the power cable firmly, as described above.",
            "Plug your monitor into the graphics card, not the motherboard (unless you follow the tip below).",
          ],
        },
        {
          t: "note",
          tone: "tip",
          text: "Building a dedicated AI box? If your CPU has integrated graphics, plug the monitor into the motherboard instead. The desktop then uses no VRAM at all and every gigabyte stays free for models.",
        },
        { t: "h", text: "4. Four BIOS settings" },
        {
          t: "p",
          text: "Before installing any software, restart and open the BIOS (usually Delete or F2 during startup). The names differ between manufacturers, but look for these:",
        },
        {
          t: "list",
          items: [
            "**Above 4G Decoding:** enabled. Lets the system address large amounts of GPU memory.",
            "**Resizable BAR (Re-Size BAR):** enabled. Lets the CPU access all of the VRAM at once.",
            "**Boot mode:** UEFI, with CSM (legacy mode) disabled.",
            "**Secure Boot:** leave it on if you like. Episode 3 shows how to handle it during driver installation.",
          ],
        },
        {
          t: "p",
          text: "While you are in there, check whether a BIOS update is available for your motherboard. New GPUs are sometimes only fully supported after an update.",
        },
      ],
    },
    {
      slug: "drivers",
      title: "From black screen to nvidia-smi",
      hook: "The driver is the translator between your code and the card. Here is how to install it properly.",
      summary:
        "Install the NVIDIA driver on Ubuntu the clean way, handle Secure Boot, verify with nvidia-smi, and set up Windows with WSL2 as an alternative.",
      minutes: 7,
      takeaways: [
        "Which operating system to choose for AI work",
        "Installing the NVIDIA driver on Ubuntu in four commands",
        "Reading nvidia-smi, your new best friend",
      ],
      blocks: [
        {
          t: "p",
          text: "Your card is in. Without a driver, though, the operating system has no idea how to talk to it. The driver is the translator between your software and the hardware, and getting it right once saves you hours later.",
        },
        { t: "h", text: "Which operating system?" },
        {
          t: "p",
          text: "Most AI tools are developed on Linux, and almost every server in the cloud runs it. This series uses **Ubuntu LTS**, the long-term support release. If you need to stay on Windows, use WSL2 (see the end of this episode). Everything from Episode 4 onwards works the same way there.",
        },
        { t: "h", text: "Install the driver on Ubuntu" },
        {
          t: "p",
          text: "Ubuntu has a tool that detects your card and picks a tested driver for it. Use it rather than downloading installers from websites. It keeps the driver in sync with system updates.",
        },
        {
          t: "code",
          code: "# 1. Bring the system up to date\nsudo apt update && sudo apt full-upgrade -y\n\n# 2. See which drivers fit your card (look for \"recommended\")\nubuntu-drivers devices\n\n# 3. Install the recommended driver\nsudo ubuntu-drivers install\n\n# 4. Restart\nsudo reboot",
        },
        {
          t: "p",
          text: "For RTX 20 series cards and newer, the recommended driver usually ends in `-open`. That is NVIDIA's open kernel module, and for the latest generations it is the required one.",
        },
        { t: "h", text: "If Secure Boot is on" },
        {
          t: "p",
          text: "Secure Boot only loads drivers that are signed. During installation Ubuntu may ask you to choose a password. After the restart you will see a blue screen titled **Enroll MOK**. Choose Enroll MOK, then Continue, then enter that same password. This happens once. If you miss it, the driver will not load and the next step will fail.",
        },
        { t: "h", text: "The moment of truth" },
        { t: "code", code: "nvidia-smi" },
        {
          t: "p",
          text: "If you see a table with your card's name, you have made it. This tool will be with you for the rest of the series. The important columns:",
        },
        {
          t: "list",
          items: [
            "**Memory-Usage:** how much VRAM is in use, out of the total.",
            "**GPU-Util:** how busy the card is right now.",
            "**Temp and Pwr:** temperature and power draw. You will watch these in Episode 6.",
            "**CUDA Version (top right):** the newest CUDA version this driver supports. It does not mean CUDA is installed. More on that in the next episode.",
          ],
        },
        {
          t: "note",
          tone: "warn",
          text: "\"NVIDIA-SMI has failed\" usually means one of three things: the MOK step was skipped, the card is not seated properly, or the system booted with an older kernel. Run `sudo dmesg | grep -i nvidia` to see which.",
        },
        { t: "h", text: "On Windows: WSL2" },
        {
          t: "list",
          ordered: true,
          items: [
            "Install the current NVIDIA driver for Windows from NVIDIA's website.",
            "Open PowerShell as administrator and run `wsl --install`, then restart.",
            "Open the new Ubuntu terminal and run `nvidia-smi`. The Windows driver is passed through automatically.",
          ],
        },
        {
          t: "note",
          tone: "warn",
          text: "Do not install a Linux NVIDIA driver inside WSL. It will overwrite the passthrough and break GPU access.",
        },
      ],
    },
    {
      slug: "cuda-and-containers",
      title: "CUDA without the pain",
      hook: "You probably don't need to install the CUDA toolkit. Here is what you need instead.",
      summary:
        "What CUDA really is, why PyTorch brings its own, how to verify your GPU from Python, and how to run GPU workloads in Docker with the NVIDIA Container Toolkit.",
      minutes: 8,
      takeaways: [
        "Driver, CUDA, toolkit: who does what",
        "A Python environment that sees your GPU in five minutes",
        "GPU containers, so your setup is reproducible anywhere",
      ],
      blocks: [
        {
          t: "p",
          text: "CUDA is where most beginners lose a weekend. Version tables, conflicting downloads, error messages about missing libraries. The good news: most of that pain is optional.",
        },
        { t: "h", text: "Three layers, clearly separated" },
        {
          t: "list",
          items: [
            "**The driver** (Episode 3) talks to the hardware. It is installed once on the machine.",
            "**The CUDA runtime** is the set of libraries AI frameworks use to run maths on the GPU. Frameworks like PyTorch ship it inside their own package.",
            "**The CUDA toolkit** (with the `nvcc` compiler) is for writing and compiling your own GPU code. Most people never need it.",
          ],
        },
        {
          t: "p",
          text: "The rule that removes most confusion: the driver must be **at least as new** as the CUDA version your framework was built with. That is the \"CUDA Version\" in the corner of `nvidia-smi`. A current driver supports all older CUDA versions.",
        },
        { t: "h", text: "Python that sees your GPU" },
        {
          t: "code",
          code: "sudo apt install -y python3-venv\npython3 -m venv ~/ai\nsource ~/ai/bin/activate\npip install torch",
          caption: "On Linux, the standard PyTorch package already includes CUDA support. For a specific CUDA version, use the selector on pytorch.org.",
        },
        { t: "p", text: "Save this as `check_gpu.py` and run it with `python check_gpu.py`:" },
        {
          t: "code",
          code: 'import torch\n\nprint("CUDA available:", torch.cuda.is_available())\nprint("GPU:", torch.cuda.get_device_name(0))\n\nx = torch.randn(8192, 8192, device="cuda")\ny = x @ x  # a big matrix multiplication on the GPU\ntorch.cuda.synchronize()\nprint("Done. Result shape:", tuple(y.shape))',
        },
        {
          t: "p",
          text: "If it prints `True` and your card's name, your GPU is ready for real work. If it prints `False`, the driver is usually missing or older than the CUDA version inside PyTorch. Go back to `nvidia-smi` first.",
        },
        { t: "h", text: "Containers: the architect's choice" },
        {
          t: "p",
          text: "A Python environment works on your machine. A container works on every machine: your desktop, a colleague's laptop and a cloud server. That matters as soon as you want to move a project from experiment to production. The NVIDIA Container Toolkit lets Docker containers use the GPU.",
        },
        {
          t: "code",
          code: "# Docker itself (or follow docs.docker.com for the latest version)\nsudo apt install -y docker.io\n\n# NVIDIA's package repository\ncurl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey \\\n  | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg\ncurl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list \\\n  | sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' \\\n  | sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list\n\n# Install and connect it to Docker\nsudo apt update\nsudo apt install -y nvidia-container-toolkit\nsudo nvidia-ctk runtime configure --runtime=docker\nsudo systemctl restart docker",
        },
        { t: "p", text: "Test it. This starts a plain Ubuntu container and runs `nvidia-smi` inside it:" },
        { t: "code", code: "sudo docker run --rm --runtime=nvidia --gpus all ubuntu nvidia-smi" },
        {
          t: "p",
          text: "Same table as before, but from inside a container. From here on, any GPU-ready image (PyTorch, vLLM, Ollama and many more) runs with the `--gpus all` flag.",
        },
        {
          t: "note",
          tone: "tip",
          text: "Rule of thumb: experiment in a Python environment, ship in a container. The same image you test locally can run on a rented cloud GPU in Episode 7 without changes.",
        },
      ],
    },
    {
      slug: "first-local-llm",
      title: "Your first private LLM",
      hook: "Your own ChatGPT-style model, running offline, with your data never leaving the room.",
      summary:
        "Run a large language model locally on your GPU with Ollama, measure tokens per second, confirm it runs on the GPU and call it through an OpenAI-compatible API.",
      minutes: 6,
      takeaways: [
        "Running a local LLM with a single command",
        "Checking that the GPU, not the CPU, does the work",
        "Calling your model from code like any cloud API",
      ],
      blocks: [
        {
          t: "p",
          text: "This is the episode the whole series builds up to. By the end, a language model will answer your questions on your own hardware. No subscription, no rate limits, and nothing you type leaves the machine. For companies in Germany that last point is often the most important one: sensitive data stays under your control, which makes data protection conversations a lot shorter.",
        },
        { t: "h", text: "Install Ollama" },
        {
          t: "p",
          text: "Ollama is the simplest way to run open models. It downloads them, picks a quantised version that fits your VRAM and uses the GPU automatically.",
        },
        { t: "code", code: "curl -fsSL https://ollama.com/install.sh | sh" },
        {
          t: "note",
          tone: "tip",
          text: "Prefer containers after Episode 4? Run it as `docker run -d --gpus all -p 11434:11434 -v ollama:/root/.ollama --name ollama ollama/ollama` instead.",
        },
        { t: "h", text: "Run a model" },
        {
          t: "code",
          code: "ollama run qwen3:8b --verbose",
          caption: "An 8B model at 4-bit needs about 5 to 6 GB of VRAM. Browse ollama.com/library for others.",
        },
        {
          t: "p",
          text: "The first run downloads a few gigabytes. Then you get a prompt. Ask it anything. Because of `--verbose`, each answer ends with statistics. The number to look for is the **eval rate**, measured in tokens per second. A token is roughly three quarters of a word. Anything above 20 tokens per second feels fluent for reading along. A modern GPU usually gets far beyond that for a model of this size.",
        },
        { t: "h", text: "Is the GPU really doing the work?" },
        { t: "p", text: "Open a second terminal while the model is loaded:" },
        { t: "code", code: "ollama ps" },
        {
          t: "p",
          text: "The PROCESSOR column should say **100% GPU**. If it shows a split like 40%/60% CPU/GPU, the model does not fit into VRAM and parts of it run on the much slower CPU. Pick a smaller model or a stronger quantisation. Remember the formula from Episode 1.",
        },
        { t: "h", text: "Talk to it from code" },
        {
          t: "p",
          text: "Ollama offers an OpenAI-compatible API on port 11434. Tools and libraries written for cloud models can usually point at your local one by changing only the base URL.",
        },
        {
          t: "code",
          code: 'curl http://localhost:11434/v1/chat/completions \\\n  -H "Content-Type: application/json" \\\n  -d \'{\n    "model": "qwen3:8b",\n    "messages": [{"role": "user", "content": "Explain VRAM in one sentence."}]\n  }\'',
        },
        { t: "h", text: "Where to go next" },
        {
          t: "list",
          items: [
            "**A chat interface:** Open WebUI gives you a browser chat on top of Ollama.",
            "**Your own documents:** connect the model to your files with retrieval augmented generation (RAG). That is how I built Telugu News RAG, which answers questions over a Telugu newspaper archive.",
            "**Many users at once:** for serving a team, look at vLLM. It is built for high throughput.",
          ],
        },
      ],
    },
    {
      slug: "monitor-and-tune",
      title: "Keep it cool, keep it fast",
      hook: "Cut your GPU's power by 20 percent and lose almost no speed. Here is how.",
      summary:
        "Monitor GPU temperature, power and memory, set power limits for quieter and cooler AI workloads, and keep drivers stable through system updates.",
      minutes: 6,
      takeaways: [
        "The three tools to watch your GPU at work",
        "Power limits: less heat and noise for a small speed cost",
        "Keeping drivers stable through updates",
      ],
      blocks: [
        {
          t: "p",
          text: "Your setup works. Now make it pleasant to live with. A GPU running at full power all evening is loud and hot, and it shows up on the electricity bill. A few small adjustments change that a lot.",
        },
        { t: "h", text: "Watch it work" },
        {
          t: "code",
          code: "# Refresh the familiar table every second\nwatch -n 1 nvidia-smi\n\n# A compact line per second: power, temperature, usage, clocks, memory\nnvidia-smi dmon -s pucm\n\n# A graphical view in the terminal, like htop for GPUs\nsudo apt install -y nvtop && nvtop",
        },
        {
          t: "p",
          text: "Start a model from Episode 5, ask a long question and watch the numbers. What healthy looks like:",
        },
        {
          t: "list",
          items: [
            "**Temperature** settles below the low 80s °C under sustained load. If it keeps climbing, look at case airflow first.",
            "**GPU-Util** goes high while the model generates and drops when it is idle.",
            "**Memory** stays below the total. If it is always at the limit, your model is too big for comfort.",
          ],
        },
        { t: "h", text: "Power limits: the best tweak you will make" },
        {
          t: "p",
          text: "GPUs ship tuned for maximum benchmark scores. The last 20 percent of power often buys only a few percent of speed. For AI inference, where memory speed is often the real bottleneck, the trade is usually even better.",
        },
        {
          t: "code",
          code: "# See the allowed range for your card\nnvidia-smi -q -d POWER\n\n# Example: limit to 450 W (must be within the allowed range)\nsudo nvidia-smi -pl 450",
        },
        {
          t: "p",
          text: "Then rerun your model with `--verbose` and compare the tokens per second. Step down in small increments until you notice a real drop, then go one step back. The setting resets on reboot. Once you have found your value, add it to a startup script or systemd service.",
        },
        { t: "h", text: "Faster startup for models" },
        {
          t: "p",
          text: "On a headless Linux machine the driver unloads when nothing uses the GPU, which adds a short delay each time a job starts. Persistence mode keeps it ready:",
        },
        { t: "code", code: "sudo systemctl enable --now nvidia-persistenced" },
        { t: "h", text: "Stable updates" },
        {
          t: "list",
          items: [
            "Ubuntu keeps you on your driver's branch (for example 570 or 580) and only installs fixes within it. Switch branches deliberately, not by accident.",
            "After a kernel update the driver is rebuilt automatically. If `nvidia-smi` fails after a reboot, run `sudo ubuntu-drivers install` again.",
            "On a machine people depend on, update on a day when you have time to fix things. Never right before a demo.",
          ],
        },
        {
          t: "note",
          tone: "tip",
          text: "Write down your working setup: driver version, power limit, model names. It takes two minutes and saves you an evening when something changes.",
        },
      ],
    },
    {
      slug: "own-or-rent",
      title: "Own or rent? The honest maths",
      hook: "Buying a GPU is not always cheaper than the cloud. One number decides.",
      summary:
        "When to buy a GPU and when to rent one in the cloud: a simple break-even calculation with German electricity prices, plus a hybrid setup that uses both.",
      minutes: 7,
      takeaways: [
        "The break-even formula for owning versus renting",
        "Why utilisation decides almost everything",
        "A hybrid setup that gives you the best of both",
      ],
      blocks: [
        {
          t: "p",
          text: "You now know how to set up a GPU. The question every team asks next: should we buy hardware, or rent GPUs in the cloud by the hour? The honest answer depends on one number, **how many hours per month the GPU actually works**.",
        },
        { t: "h", text: "The formula" },
        {
          t: "code",
          code: "Electricity per month = kW × hours × price per kWh\nCloud per month      = hours × hourly rate\n\nBreak-even (months)  = purchase price\n                       ÷ (cloud per month − electricity per month)",
        },
        { t: "h", text: "A worked example" },
        {
          t: "p",
          text: "Assumptions, so you can swap in your own numbers: a workstation that costs 3,000 €, draws 0.6 kW under load, electricity at 0.35 € per kWh, and a comparable cloud GPU at 0.70 € per hour. Cloud prices vary a lot between providers and card types, so check current rates before you decide.",
        },
        {
          t: "table",
          head: ["Usage", "Electricity / month", "Cloud / month", "Break-even"],
          rows: [
            ["2 hours a day (60 h)", "≈ 13 €", "≈ 42 €", "≈ 102 months"],
            ["8 hours a day (240 h)", "≈ 50 €", "≈ 168 €", "≈ 26 months"],
            ["Around the clock (720 h)", "≈ 151 €", "≈ 504 €", "≈ 9 months"],
          ],
        },
        {
          t: "p",
          text: "The pattern is clear. If the GPU sits idle most of the day, renting wins easily. A few hours of experiments per week are cheaper in the cloud. If it runs most of the day, as a team's inference server, a nightly batch job or continuous fine-tuning, owning pays for itself well within the life of the hardware.",
        },
        { t: "h", text: "What the formula doesn't show" },
        {
          t: "list",
          items: [
            "**Data protection.** Local hardware keeps sensitive data in your building. For health, HR or customer data that can be decisive, regardless of price.",
            "**Size.** Some models need 80 GB or more per GPU, or several GPUs at once. Renting that by the hour is far easier than buying it.",
            "**Availability.** Your own card has no waiting list. Popular cloud GPUs sometimes do.",
            "**Your time.** Owned hardware needs care: updates, failures, noise, heat. Cloud hardware is someone else's problem.",
            "**Learning.** Setting up a GPU yourself, as in this series, teaches you things a cloud console never will.",
          ],
        },
        { t: "h", text: "The architect's answer: both" },
        {
          t: "p",
          text: "In practice the strongest setup is hybrid. Develop and experiment locally, where iterations are free and data stays private. Rent cloud GPUs for the large jobs and peaks. Because you packaged everything in containers in Episode 4, the same image runs in both places without changes. That is not a compromise. It is good architecture: a clear boundary, and the freedom to move work to wherever it is cheapest or safest.",
        },
        {
          t: "note",
          tone: "tip",
          text: "Start by tracking your real usage for a month. `nvidia-smi` on your machine or the billing page in the cloud gives you the hours. Then use the formula with your own numbers.",
        },
        { t: "h", text: "That's a wrap" },
        {
          t: "p",
          text: "From choosing a card by its VRAM to installing it, from drivers and CUDA to containers, a private LLM, tuning and the cost question: you now have the complete picture. Thank you for following along. If this series helped you, share it with one person who is about to buy their first GPU.",
        },
      ],
    },
  ],
};

export default series;
