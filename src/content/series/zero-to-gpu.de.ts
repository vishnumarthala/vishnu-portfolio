import type { Series } from "./types";

const series: Series = {
  locale: "de",
  slug: "zero-to-gpu",
  name: "Zero to GPU",
  tagline: "Ihre eigene KI-Maschine in 7 Folgen.",
  format: "Miniserie",
  synopsis:
    "Alle reden über KI. Nur wenige haben schon einmal ein Modell auf eigener Hardware laufen lassen. Diese Serie führt Sie vom leeren PCIe-Steckplatz bis zum privaten, lokalen LLM, das Ihre Fragen beantwortet. Folge für Folge, in klarer Sprache, jeder Befehl erklärt, ohne Hype.",
  audience: {
    heading: "Für wen",
    items: [
      "Entwicklerinnen, Entwickler und Architekten, die KI-Modelle lokal betreiben möchten, statt nur eine API aufzurufen.",
      "Tech Leads, die zwischen eigenen GPUs und Cloud-GPUs entscheiden müssen.",
      "Neugierige, die keine Scheu haben, Befehle in ein Terminal zu kopieren.",
    ],
  },
  kit: {
    heading: "Was Sie brauchen",
    items: [
      "Einen Desktop-PC mit freiem PCIe-x16-Steckplatz und ausreichend starkem Netzteil (Folge 2 zeigt, wie Sie das prüfen).",
      "Eine NVIDIA-Grafikkarte, idealerweise mit 12 GB Grafikspeicher oder mehr.",
      "Einen USB-Stick für die Ubuntu-Installation, oder Windows 11 mit WSL2.",
      "Etwa einen Abend pro Folge. Die meisten brauchen deutlich weniger.",
    ],
  },
  ui: {
    series: "Serie",
    episode: "Folge",
    episodes: "Folgen",
    minRead: "Min. Lesezeit",
    takeaways: "In dieser Folge",
    start: "Folge 1 starten",
    prev: "Vorherige Folge",
    next: "Nächste Folge",
    allEpisodes: "Alle Folgen",
    back: "Zurück zur Übersicht",
    share: "Diese Folge teilen",
    shareSeries: "Serie teilen",
    shareLinkedIn: "Auf LinkedIn teilen",
    shareX: "Auf X teilen",
    shareWhatsApp: "Per WhatsApp senden",
    copyLink: "Link kopieren",
    copied: "Link kopiert",
    finaleHeading: "Sie planen ein GPU-Setup für Ihr Team?",
    finaleText:
      "KI-Architekturen zu entwerfen ist mein Beruf. Wenn Sie eine zweite Meinung zu Hardware, lokal gegen Cloud oder dem Weg eines Modells in die Produktion möchten, schreiben Sie mir.",
    talk: "Kontakt aufnehmen",
    disclaimer:
      "Die Befehle sind für Ubuntu LTS mit NVIDIA-Karten geschrieben und folgen den dokumentierten Installationsschritten der Hersteller. Hardwaredaten und Produktnamen ändern sich schnell. Prüfen Sie vor Kauf und Installation immer die aktuelle Dokumentation des Herstellers.",
    tip: "Tipp",
    warn: "Achtung",
  },
  episodes: [
    {
      slug: "pick-your-gpu",
      title: "VRAM ist die Zahl, die zählt",
      hook: "Vergessen Sie Taktraten. Eine einzige Zahl entscheidet, welche KI-Modelle Ihre GPU schafft.",
      summary:
        "Wie Sie eine GPU für KI auswählen: warum der Grafikspeicher (VRAM) wichtiger ist als alles andere, eine einfache Formel zur Berechnung und welche Karte zu welchem Modell passt.",
      minutes: 6,
      takeaways: [
        "Warum KI auf GPUs läuft und nicht auf CPUs",
        "Die eine Formel, mit der Sie den VRAM-Bedarf eines Modells schätzen",
        "Welche VRAM-Größe zu welcher Arbeit passt",
      ],
      blocks: [
        {
          t: "p",
          text: "Eine CPU ist ein kleines Team brillanter Experten. Eine GPU ist ein Stadion voller Menschen, die jeweils einfache Rechnungen sehr schnell lösen. KI-Modelle bestehen überwiegend aus einfacher Mathematik (riesige Zahlentabellen werden multipliziert), milliardenfach wiederholt. Deshalb gewinnt das Stadion.",
        },
        {
          t: "p",
          text: "Beim GPU-Kauf vergleichen viele Taktraten, Kerne und Benchmarks. Für KI beginnen Sie besser woanders: beim **Grafikspeicher, dem VRAM**. Stellen Sie sich VRAM als Größe der Werkbank vor. Das ganze Modell muss auf die Werkbank passen. Passt es nicht, läuft es gar nicht oder weicht in den normalen Arbeitsspeicher aus und wird quälend langsam.",
        },
        { t: "h", text: "Die eine Formel, die Sie brauchen" },
        {
          t: "p",
          text: "Modellgrößen werden in Parametern angegeben, 8B bedeutet zum Beispiel 8 Milliarden. Jeder Parameter wird mit einer bestimmten Genauigkeit gespeichert. Volle Genauigkeit für die Inferenz (FP16) braucht 2 Byte pro Parameter. Quantisierte Versionen drücken das auf 1 Byte (8 Bit) oder etwa ein halbes Byte (4 Bit), bei geringem Qualitätsverlust.",
        },
        {
          t: "code",
          code: "VRAM (GB) ≈ Parameter in Milliarden × Byte pro Parameter × 1,2\n\n8B-Modell, FP16 :  8 × 2   × 1,2 ≈ 19 GB\n8B-Modell, 4 Bit:  8 × 0,5 × 1,2 ≈  5 GB\n70B-Modell, 4 Bit: 70 × 0,5 × 1,2 ≈ 42 GB",
          caption: "Die zusätzlichen 20 Prozent decken das Kontextfenster (KV-Cache) und den Laufzeit-Overhead ab.",
        },
        {
          t: "p",
          text: "Schon diese eine Rechnung verrät viel. Ein 8B-Modell in voller Genauigkeit passt nicht auf eine 16-GB-Karte, die 4-Bit-Version läuft dagegen bequem auf 8 GB. Lange Gespräche und große Dokumente brauchen mehr Platz für den Kontext, planen Sie also Reserve ein.",
        },
        { t: "h", text: "Was wo hineinpasst" },
        {
          t: "table",
          head: ["VRAM", "Was bequem läuft", "Beispielkarten"],
          rows: [
            ["8 GB", "Modelle mit 7B bis 8B (4 Bit), kurzer Kontext. Gut für erste Versuche.", "RTX 4060, RTX 5060"],
            ["12 bis 16 GB", "Modelle mit 8B bis 14B, Bildgenerierung, kleines Fine-Tuning.", "RTX 5060 Ti 16 GB, RTX 5070 Ti, RTX 5080"],
            ["24 GB", "Modelle bis etwa 30B (4 Bit), längerer Kontext.", "RTX 3090 (gebraucht), RTX 4090"],
            ["32 GB", "30B-Klasse mit Luft nach oben, alles schneller.", "RTX 5090"],
            ["48 bis 96 GB", "70B-Klasse, ernsthaftes Fine-Tuning, mehrere Nutzer.", "RTX 6000 Ada, RTX PRO 6000 Blackwell"],
          ],
        },
        {
          t: "note",
          tone: "tip",
          text: "Eine gebrauchte 24-GB-Karte ist zum Lernen oft das beste Angebot. Für den Einstieg zählt VRAM pro Euro mehr als die neueste Generation.",
        },
        { t: "h", text: "Warum diese Serie NVIDIA nutzt" },
        {
          t: "p",
          text: "Auch AMD und Apple Silicon können KI-Modelle ausführen, und beide werden stetig besser. Die meiste KI-Software wird aber zuerst auf NVIDIAs CUDA-Plattform entwickelt und getestet. Beim ersten Setup wollen Sie möglichst wenige Überraschungen, deshalb nutzt diese Serie NVIDIA. Alle Konzepte (VRAM, Treiber, Container) gelten auch, wenn Sie später wechseln.",
        },
        { t: "h", text: "Ihre Checkliste vor dem Kauf" },
        {
          t: "list",
          ordered: true,
          items: [
            "Legen Sie das größte Modell fest, das Sie betreiben möchten, und berechnen Sie seinen VRAM-Bedarf mit der Formel oben.",
            "Wählen Sie eine Karte mit mindestens so viel VRAM, plus etwa 20 Prozent Reserve.",
            "Notieren Sie Leistungsaufnahme und Länge der Karte. Beides brauchen Sie in der nächsten Folge.",
          ],
        },
      ],
    },
    {
      slug: "install-the-card",
      title: "Strom, Steckplatz und Kühlung",
      hook: "Die meisten GPU-Probleme sind keine Softwareprobleme. Es sind Strom, Kabel und Hitze.",
      summary:
        "So bauen Sie eine GPU für KI-Arbeit richtig ein: Netzteil dimensionieren, der 16-Pin-Stecker, der richtige PCIe-Steckplatz, Luftstrom und die wichtigen BIOS-Einstellungen.",
      minutes: 7,
      takeaways: [
        "Netzteil und Gehäuse vor dem Kauf prüfen",
        "Die Karte sicher einbauen, inklusive 16-Pin-Stromstecker",
        "Vier BIOS-Einstellungen vor jeder Softwareinstallation",
      ],
      blocks: [
        {
          t: "p",
          text: "KI-Workloads unterscheiden sich vom Gaming. Ein Spiel fordert die GPU in Schüben. Textgenerierung oder Training kann sie stundenlang auf voller Leistung halten. Jede Schwachstelle im System (Strom, Kühlung, ein lockeres Kabel) zeigt sich unter dieser Last.",
        },
        { t: "h", text: "1. Netzteil prüfen" },
        {
          t: "p",
          text: "Suchen Sie auf der Herstellerseite zwei Werte: die Leistungsaufnahme der Karte und die **empfohlene Netzteilleistung**. Ein Beispiel: NVIDIA empfiehlt für die RTX 5090, die allein bis zu 575 W aufnehmen kann, ein 1000-W-Netzteil. Wählen Sie ein Markennetzteil (ATX 3.0 oder neuer), das diese Empfehlung erfüllt.",
        },
        {
          t: "p",
          text: "Aktuelle NVIDIA-Karten nutzen einen einzelnen 16-Pin-Stecker (12V-2x6 oder 12VHPWR). Verwenden Sie das native Kabel eines ATX-3-Netzteils oder den Adapter, der der Karte beiliegt.",
        },
        {
          t: "note",
          tone: "warn",
          text: "Stecken Sie den 16-Pin-Stecker ein, bis er hörbar einrastet und vollständig bündig sitzt. Knicken Sie das Kabel nicht direkt am Stecker. Ein nur halb eingesteckter Stecker kann unter Dauerlast überhitzen.",
        },
        { t: "h", text: "2. Gehäuse und Steckplatz prüfen" },
        {
          t: "list",
          items: [
            "**Länge und Dicke.** Große Karten sind über 30 cm lang und belegen drei Slots. Messen Sie Ihr Gehäuse aus.",
            "**Der richtige Steckplatz.** Nutzen Sie den obersten PCIe-x16-Slot, den nächsten zur CPU. Meist ist nur er mit voller Geschwindigkeit angebunden.",
            "**Luftstrom.** Achten Sie auf Lüfter, die vorne ansaugen, und einen Abluftlüfter hinten oder oben. Hitze, die nicht entweichen kann, wird zu Leistungsverlust.",
            "**Stütze.** Schwere Karten hängen mit der Zeit durch. Eine einfache Stütze schont den Steckplatz.",
          ],
        },
        { t: "h", text: "3. Karte einbauen" },
        {
          t: "list",
          ordered: true,
          items: [
            "Herunterfahren, Netzteil ausschalten, Stecker ziehen. Berühren Sie das Metallgehäuse, um sich zu entladen.",
            "Entfernen Sie an der Gehäuserückseite die Slotblenden, wo die Karte sitzen wird.",
            "Öffnen Sie die Verriegelung am PCIe-Slot und drücken Sie die Karte gleichmäßig hinein, bis die Verriegelung einrastet.",
            "Schrauben Sie die Slotblende der Karte am Gehäuse fest.",
            "Schließen Sie das Stromkabel fest an, wie oben beschrieben.",
            "Verbinden Sie den Monitor mit der Grafikkarte, nicht mit dem Mainboard (außer Sie folgen dem Tipp unten).",
          ],
        },
        {
          t: "note",
          tone: "tip",
          text: "Sie bauen eine reine KI-Maschine? Wenn Ihre CPU eine integrierte Grafik hat, schließen Sie den Monitor am Mainboard an. Der Desktop verbraucht dann keinen VRAM, und jedes Gigabyte bleibt für Modelle frei.",
        },
        { t: "h", text: "4. Vier BIOS-Einstellungen" },
        {
          t: "p",
          text: "Starten Sie vor jeder Softwareinstallation neu und öffnen Sie das BIOS (meist mit Entf oder F2 beim Start). Die Bezeichnungen unterscheiden sich je nach Hersteller, suchen Sie nach diesen:",
        },
        {
          t: "list",
          items: [
            "**Above 4G Decoding:** aktiviert. Erlaubt dem System, große Mengen Grafikspeicher zu adressieren.",
            "**Resizable BAR (Re-Size BAR):** aktiviert. Die CPU kann auf den gesamten VRAM auf einmal zugreifen.",
            "**Boot-Modus:** UEFI, CSM (Legacy-Modus) deaktiviert.",
            "**Secure Boot:** kann eingeschaltet bleiben. Folge 3 zeigt, wie Sie es bei der Treiberinstallation handhaben.",
          ],
        },
        {
          t: "p",
          text: "Prüfen Sie bei der Gelegenheit, ob es ein BIOS-Update für Ihr Mainboard gibt. Neue GPUs werden manchmal erst nach einem Update vollständig unterstützt.",
        },
      ],
    },
    {
      slug: "drivers",
      title: "Vom schwarzen Bildschirm zu nvidia-smi",
      hook: "Der Treiber übersetzt zwischen Ihrem Code und der Karte. So installieren Sie ihn richtig.",
      summary:
        "Den NVIDIA-Treiber sauber unter Ubuntu installieren, Secure Boot meistern, mit nvidia-smi prüfen und alternativ Windows mit WSL2 einrichten.",
      minutes: 7,
      takeaways: [
        "Welches Betriebssystem sich für KI-Arbeit eignet",
        "Den NVIDIA-Treiber unter Ubuntu in vier Befehlen installieren",
        "nvidia-smi lesen, Ihr neues wichtigstes Werkzeug",
      ],
      blocks: [
        {
          t: "p",
          text: "Die Karte steckt. Ohne Treiber weiß das Betriebssystem aber nicht, wie es mit ihr sprechen soll. Der Treiber übersetzt zwischen Software und Hardware, und wer ihn einmal richtig installiert, spart sich später viele Stunden.",
        },
        { t: "h", text: "Welches Betriebssystem?" },
        {
          t: "p",
          text: "Die meisten KI-Werkzeuge werden unter Linux entwickelt, und fast jeder Cloud-Server läuft damit. Diese Serie nutzt **Ubuntu LTS**, die Version mit Langzeitunterstützung. Wenn Sie bei Windows bleiben müssen, nutzen Sie WSL2 (siehe Ende dieser Folge). Ab Folge 4 funktioniert dort alles genauso.",
        },
        { t: "h", text: "Treiber unter Ubuntu installieren" },
        {
          t: "p",
          text: "Ubuntu bringt ein Werkzeug mit, das Ihre Karte erkennt und einen getesteten Treiber auswählt. Nutzen Sie es statt Installern von Webseiten. So bleibt der Treiber mit den Systemupdates synchron.",
        },
        {
          t: "code",
          code: "# 1. System aktualisieren\nsudo apt update && sudo apt full-upgrade -y\n\n# 2. Passende Treiber anzeigen (achten Sie auf \"recommended\")\nubuntu-drivers devices\n\n# 3. Empfohlenen Treiber installieren\nsudo ubuntu-drivers install\n\n# 4. Neu starten\nsudo reboot",
        },
        {
          t: "p",
          text: "Ab der RTX-20-Serie endet der empfohlene Treiber meist auf `-open`. Das ist NVIDIAs offenes Kernelmodul, und für die neuesten Generationen ist es Pflicht.",
        },
        { t: "h", text: "Wenn Secure Boot aktiv ist" },
        {
          t: "p",
          text: "Secure Boot lädt nur signierte Treiber. Während der Installation fragt Ubuntu eventuell nach einem Passwort. Nach dem Neustart erscheint ein blauer Bildschirm mit dem Titel **Enroll MOK**. Wählen Sie Enroll MOK, dann Continue, und geben Sie dasselbe Passwort ein. Das passiert nur einmal. Verpassen Sie es, lädt der Treiber nicht und der nächste Schritt schlägt fehl.",
        },
        { t: "h", text: "Der Moment der Wahrheit" },
        { t: "code", code: "nvidia-smi" },
        {
          t: "p",
          text: "Sehen Sie eine Tabelle mit dem Namen Ihrer Karte, haben Sie es geschafft. Dieses Werkzeug begleitet Sie durch die ganze Serie. Die wichtigsten Spalten:",
        },
        {
          t: "list",
          items: [
            "**Memory-Usage:** belegter VRAM im Verhältnis zum Gesamtspeicher.",
            "**GPU-Util:** wie stark die Karte gerade ausgelastet ist.",
            "**Temp und Pwr:** Temperatur und Leistungsaufnahme. Diese beobachten Sie in Folge 6.",
            "**CUDA Version (oben rechts):** die neueste CUDA-Version, die dieser Treiber unterstützt. Sie bedeutet nicht, dass CUDA installiert ist. Mehr dazu in der nächsten Folge.",
          ],
        },
        {
          t: "note",
          tone: "warn",
          text: "\"NVIDIA-SMI has failed\" hat meist einen von drei Gründen: Der MOK-Schritt wurde übersprungen, die Karte sitzt nicht richtig, oder das System hat mit einem älteren Kernel gestartet. `sudo dmesg | grep -i nvidia` zeigt, welcher es ist.",
        },
        { t: "h", text: "Unter Windows: WSL2" },
        {
          t: "list",
          ordered: true,
          items: [
            "Installieren Sie den aktuellen NVIDIA-Treiber für Windows von der NVIDIA-Webseite.",
            "Öffnen Sie PowerShell als Administrator, führen Sie `wsl --install` aus und starten Sie neu.",
            "Öffnen Sie das neue Ubuntu-Terminal und führen Sie `nvidia-smi` aus. Der Windows-Treiber wird automatisch durchgereicht.",
          ],
        },
        {
          t: "note",
          tone: "warn",
          text: "Installieren Sie innerhalb von WSL keinen Linux-NVIDIA-Treiber. Er überschreibt die Durchreichung und der GPU-Zugriff funktioniert nicht mehr.",
        },
      ],
    },
    {
      slug: "cuda-and-containers",
      title: "CUDA ohne Kopfschmerzen",
      hook: "Das CUDA-Toolkit brauchen Sie wahrscheinlich gar nicht. Das brauchen Sie stattdessen.",
      summary:
        "Was CUDA wirklich ist, warum PyTorch sein eigenes mitbringt, wie Sie die GPU aus Python prüfen und GPU-Workloads mit dem NVIDIA Container Toolkit in Docker betreiben.",
      minutes: 8,
      takeaways: [
        "Treiber, CUDA, Toolkit: wer macht was",
        "Eine Python-Umgebung, die Ihre GPU in fünf Minuten erkennt",
        "GPU-Container, damit Ihr Setup überall reproduzierbar ist",
      ],
      blocks: [
        {
          t: "p",
          text: "Bei CUDA verlieren die meisten Einsteiger ein Wochenende. Versionstabellen, widersprüchliche Downloads, Fehlermeldungen über fehlende Bibliotheken. Die gute Nachricht: Der größte Teil dieses Schmerzes ist vermeidbar.",
        },
        { t: "h", text: "Drei Schichten, sauber getrennt" },
        {
          t: "list",
          items: [
            "**Der Treiber** (Folge 3) spricht mit der Hardware. Er wird einmal auf dem Rechner installiert.",
            "**Die CUDA-Runtime** sind die Bibliotheken, mit denen KI-Frameworks auf der GPU rechnen. Frameworks wie PyTorch liefern sie im eigenen Paket mit.",
            "**Das CUDA-Toolkit** (mit dem Compiler `nvcc`) dient dazu, eigenen GPU-Code zu schreiben und zu kompilieren. Die meisten brauchen es nie.",
          ],
        },
        {
          t: "p",
          text: "Die Regel, die die meiste Verwirrung auflöst: Der Treiber muss **mindestens so neu** sein wie die CUDA-Version, mit der Ihr Framework gebaut wurde. Das ist die \"CUDA Version\" in der Ecke von `nvidia-smi`. Ein aktueller Treiber unterstützt alle älteren CUDA-Versionen.",
        },
        { t: "h", text: "Python, das Ihre GPU erkennt" },
        {
          t: "code",
          code: "sudo apt install -y python3-venv\npython3 -m venv ~/ai\nsource ~/ai/bin/activate\npip install torch",
          caption: "Unter Linux enthält das Standardpaket von PyTorch bereits CUDA-Unterstützung. Für eine bestimmte CUDA-Version nutzen Sie die Auswahl auf pytorch.org.",
        },
        { t: "p", text: "Speichern Sie dies als `check_gpu.py` und starten Sie es mit `python check_gpu.py`:" },
        {
          t: "code",
          code: 'import torch\n\nprint("CUDA verfügbar:", torch.cuda.is_available())\nprint("GPU:", torch.cuda.get_device_name(0))\n\nx = torch.randn(8192, 8192, device="cuda")\ny = x @ x  # eine große Matrixmultiplikation auf der GPU\ntorch.cuda.synchronize()\nprint("Fertig. Ergebnisform:", tuple(y.shape))',
        },
        {
          t: "p",
          text: "Gibt das Skript `True` und den Namen Ihrer Karte aus, ist Ihre GPU bereit für echte Arbeit. Bei `False` fehlt meist der Treiber, oder er ist älter als die CUDA-Version in PyTorch. Prüfen Sie zuerst `nvidia-smi`.",
        },
        { t: "h", text: "Container: die Wahl des Architekten" },
        {
          t: "p",
          text: "Eine Python-Umgebung funktioniert auf Ihrem Rechner. Ein Container funktioniert auf jedem Rechner: auf Ihrem Desktop, dem Laptop eines Kollegen und einem Cloud-Server. Das wird wichtig, sobald ein Projekt vom Experiment in die Produktion soll. Mit dem NVIDIA Container Toolkit können Docker-Container die GPU nutzen.",
        },
        {
          t: "code",
          code: "# Docker selbst (oder aktuelle Version laut docs.docker.com)\nsudo apt install -y docker.io\n\n# Paketquelle von NVIDIA\ncurl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey \\\n  | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg\ncurl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list \\\n  | sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' \\\n  | sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list\n\n# Installieren und mit Docker verbinden\nsudo apt update\nsudo apt install -y nvidia-container-toolkit\nsudo nvidia-ctk runtime configure --runtime=docker\nsudo systemctl restart docker",
        },
        { t: "p", text: "Testen Sie es. Dieser Befehl startet einen einfachen Ubuntu-Container und führt darin `nvidia-smi` aus:" },
        { t: "code", code: "sudo docker run --rm --runtime=nvidia --gpus all ubuntu nvidia-smi" },
        {
          t: "p",
          text: "Dieselbe Tabelle wie zuvor, nur aus einem Container heraus. Ab jetzt läuft jedes GPU-fähige Image (PyTorch, vLLM, Ollama und viele mehr) mit dem Flag `--gpus all`.",
        },
        {
          t: "note",
          tone: "tip",
          text: "Faustregel: in der Python-Umgebung experimentieren, im Container ausliefern. Dasselbe Image, das Sie lokal testen, läuft in Folge 7 unverändert auf einer gemieteten Cloud-GPU.",
        },
      ],
    },
    {
      slug: "first-local-llm",
      title: "Ihr erstes privates LLM",
      hook: "Ihr eigenes Sprachmodell im ChatGPT-Stil, offline, und Ihre Daten verlassen nie den Raum.",
      summary:
        "Ein großes Sprachmodell lokal auf der GPU mit Ollama betreiben, Tokens pro Sekunde messen, GPU-Nutzung prüfen und das Modell über eine OpenAI-kompatible API ansprechen.",
      minutes: 6,
      takeaways: [
        "Ein lokales LLM mit einem einzigen Befehl starten",
        "Prüfen, dass die GPU und nicht die CPU arbeitet",
        "Das Modell aus Code aufrufen wie jede Cloud-API",
      ],
      blocks: [
        {
          t: "p",
          text: "Auf diese Folge baut die ganze Serie hin. Am Ende beantwortet ein Sprachmodell Ihre Fragen auf Ihrer eigenen Hardware. Kein Abo, keine Ratenlimits, und nichts von dem, was Sie eingeben, verlässt den Rechner. Für Unternehmen in Deutschland ist gerade der letzte Punkt oft entscheidend: Sensible Daten bleiben unter Ihrer Kontrolle, und Gespräche über Datenschutz werden deutlich kürzer.",
        },
        { t: "h", text: "Ollama installieren" },
        {
          t: "p",
          text: "Ollama ist der einfachste Weg, offene Modelle zu betreiben. Es lädt sie herunter, wählt eine quantisierte Version, die in Ihren VRAM passt, und nutzt automatisch die GPU.",
        },
        { t: "code", code: "curl -fsSL https://ollama.com/install.sh | sh" },
        {
          t: "note",
          tone: "tip",
          text: "Sie bevorzugen seit Folge 4 Container? Dann starten Sie es stattdessen mit `docker run -d --gpus all -p 11434:11434 -v ollama:/root/.ollama --name ollama ollama/ollama`.",
        },
        { t: "h", text: "Ein Modell starten" },
        {
          t: "code",
          code: "ollama run qwen3:8b --verbose",
          caption: "Ein 8B-Modell mit 4 Bit braucht etwa 5 bis 6 GB VRAM. Weitere Modelle finden Sie unter ollama.com/library.",
        },
        {
          t: "p",
          text: "Beim ersten Start werden einige Gigabyte geladen. Danach erscheint eine Eingabeaufforderung. Fragen Sie, was Sie möchten. Dank `--verbose` endet jede Antwort mit Statistiken. Achten Sie auf die **eval rate** in Tokens pro Sekunde. Ein Token entspricht etwa drei Vierteln eines Wortes. Ab etwa 20 Tokens pro Sekunde fühlt sich das Mitlesen flüssig an. Eine moderne GPU liegt bei einem Modell dieser Größe meist weit darüber.",
        },
        { t: "h", text: "Arbeitet wirklich die GPU?" },
        { t: "p", text: "Öffnen Sie ein zweites Terminal, während das Modell geladen ist:" },
        { t: "code", code: "ollama ps" },
        {
          t: "p",
          text: "In der Spalte PROCESSOR sollte **100% GPU** stehen. Sehen Sie eine Aufteilung wie 40%/60% CPU/GPU, passt das Modell nicht in den VRAM und Teile laufen auf der viel langsameren CPU. Wählen Sie ein kleineres Modell oder eine stärkere Quantisierung. Denken Sie an die Formel aus Folge 1.",
        },
        { t: "h", text: "Aus Code ansprechen" },
        {
          t: "p",
          text: "Ollama bietet auf Port 11434 eine OpenAI-kompatible API. Werkzeuge und Bibliotheken für Cloud-Modelle lassen sich meist auf Ihr lokales Modell umstellen, indem Sie nur die Basis-URL ändern.",
        },
        {
          t: "code",
          code: 'curl http://localhost:11434/v1/chat/completions \\\n  -H "Content-Type: application/json" \\\n  -d \'{\n    "model": "qwen3:8b",\n    "messages": [{"role": "user", "content": "Erkläre VRAM in einem Satz."}]\n  }\'',
        },
        { t: "h", text: "Wie es weitergeht" },
        {
          t: "list",
          items: [
            "**Eine Chat-Oberfläche:** Open WebUI bietet einen Browser-Chat auf Basis von Ollama.",
            "**Ihre eigenen Dokumente:** Verbinden Sie das Modell per Retrieval Augmented Generation (RAG) mit Ihren Dateien. So ist Telugu News RAG entstanden, das Fragen über das Archiv einer Telugu-Tageszeitung beantwortet.",
            "**Viele Nutzer gleichzeitig:** Um ein Team zu bedienen, lohnt sich vLLM. Es ist auf hohen Durchsatz ausgelegt.",
          ],
        },
      ],
    },
    {
      slug: "monitor-and-tune",
      title: "Kühl und schnell bleiben",
      hook: "20 Prozent weniger Strom für Ihre GPU, kaum Geschwindigkeitsverlust. So geht's.",
      summary:
        "GPU-Temperatur, Leistung und Speicher überwachen, Power-Limits für leisere und kühlere KI-Workloads setzen und Treiber über Systemupdates hinweg stabil halten.",
      minutes: 6,
      takeaways: [
        "Drei Werkzeuge, um Ihre GPU bei der Arbeit zu beobachten",
        "Power-Limits: weniger Hitze und Lärm für wenig Tempo",
        "Treiber stabil durch Updates bringen",
      ],
      blocks: [
        {
          t: "p",
          text: "Ihr Setup läuft. Jetzt machen Sie es alltagstauglich. Eine GPU, die den ganzen Abend auf voller Leistung läuft, ist laut und heiß und macht sich auf der Stromrechnung bemerkbar. Ein paar kleine Anpassungen ändern das deutlich.",
        },
        { t: "h", text: "Bei der Arbeit zuschauen" },
        {
          t: "code",
          code: "# Die bekannte Tabelle jede Sekunde aktualisieren\nwatch -n 1 nvidia-smi\n\n# Eine kompakte Zeile pro Sekunde: Leistung, Temperatur, Auslastung, Takt, Speicher\nnvidia-smi dmon -s pucm\n\n# Grafische Ansicht im Terminal, wie htop für GPUs\nsudo apt install -y nvtop && nvtop",
        },
        {
          t: "p",
          text: "Starten Sie ein Modell aus Folge 5, stellen Sie eine lange Frage und beobachten Sie die Werte. So sieht gesund aus:",
        },
        {
          t: "list",
          items: [
            "**Temperatur** pendelt sich unter Dauerlast unterhalb von etwa 80 °C ein. Steigt sie weiter, prüfen Sie zuerst den Luftstrom im Gehäuse.",
            "**GPU-Util** ist hoch, während das Modell generiert, und fällt im Leerlauf ab.",
            "**Speicher** bleibt unter dem Maximum. Ist er ständig am Limit, ist Ihr Modell zu groß für einen entspannten Betrieb.",
          ],
        },
        { t: "h", text: "Power-Limits: die beste Optimierung überhaupt" },
        {
          t: "p",
          text: "GPUs werden ab Werk auf maximale Benchmark-Werte eingestellt. Die letzten 20 Prozent Leistungsaufnahme bringen oft nur wenige Prozent Tempo. Bei KI-Inferenz, wo meist die Speichergeschwindigkeit der eigentliche Engpass ist, fällt der Tausch oft noch günstiger aus.",
        },
        {
          t: "code",
          code: "# Erlaubten Bereich Ihrer Karte anzeigen\nnvidia-smi -q -d POWER\n\n# Beispiel: auf 450 W begrenzen (muss im erlaubten Bereich liegen)\nsudo nvidia-smi -pl 450",
        },
        {
          t: "p",
          text: "Starten Sie Ihr Modell dann erneut mit `--verbose` und vergleichen Sie die Tokens pro Sekunde. Senken Sie das Limit in kleinen Schritten, bis Sie einen echten Einbruch bemerken, und gehen Sie dann einen Schritt zurück. Die Einstellung gilt nur bis zum Neustart. Haben Sie Ihren Wert gefunden, tragen Sie ihn in ein Startskript oder einen systemd-Dienst ein.",
        },
        { t: "h", text: "Schnellerer Modellstart" },
        {
          t: "p",
          text: "Auf einem Linux-Rechner ohne Monitor entlädt sich der Treiber, wenn niemand die GPU nutzt. Das kostet bei jedem Jobstart eine kurze Verzögerung. Der Persistence-Modus hält ihn bereit:",
        },
        { t: "code", code: "sudo systemctl enable --now nvidia-persistenced" },
        { t: "h", text: "Stabile Updates" },
        {
          t: "list",
          items: [
            "Ubuntu hält Sie auf dem Zweig Ihres Treibers (zum Beispiel 570 oder 580) und installiert nur Korrekturen innerhalb dieses Zweigs. Wechseln Sie den Zweig bewusst, nicht aus Versehen.",
            "Nach einem Kernel-Update wird der Treiber automatisch neu gebaut. Schlägt `nvidia-smi` nach einem Neustart fehl, führen Sie `sudo ubuntu-drivers install` erneut aus.",
            "Aktualisieren Sie einen Rechner, auf den andere angewiesen sind, an einem Tag mit Zeitpuffer. Niemals direkt vor einer Demo.",
          ],
        },
        {
          t: "note",
          tone: "tip",
          text: "Notieren Sie Ihr funktionierendes Setup: Treiberversion, Power-Limit, Modellnamen. Das dauert zwei Minuten und spart einen Abend, wenn sich etwas ändert.",
        },
      ],
    },
    {
      slug: "own-or-rent",
      title: "Kaufen oder mieten? Die ehrliche Rechnung",
      hook: "Eine eigene GPU ist nicht immer günstiger als die Cloud. Eine Zahl entscheidet.",
      summary:
        "Wann sich eine eigene GPU lohnt und wann Cloud-GPUs: eine einfache Break-even-Rechnung mit deutschen Strompreisen und ein hybrides Setup, das beides nutzt.",
      minutes: 7,
      takeaways: [
        "Die Break-even-Formel für Kaufen gegen Mieten",
        "Warum die Auslastung fast alles entscheidet",
        "Ein hybrides Setup, das das Beste aus beiden vereint",
      ],
      blocks: [
        {
          t: "p",
          text: "Sie wissen jetzt, wie man eine GPU einrichtet. Die nächste Frage stellt jedes Team: eigene Hardware kaufen oder GPUs stundenweise in der Cloud mieten? Die ehrliche Antwort hängt von einer Zahl ab: **wie viele Stunden pro Monat die GPU tatsächlich arbeitet**.",
        },
        { t: "h", text: "Die Formel" },
        {
          t: "code",
          code: "Strom pro Monat   = kW × Stunden × Preis pro kWh\nCloud pro Monat   = Stunden × Stundensatz\n\nBreak-even (Monate) = Kaufpreis\n                      ÷ (Cloud pro Monat − Strom pro Monat)",
        },
        { t: "h", text: "Ein Rechenbeispiel" },
        {
          t: "p",
          text: "Annahmen, damit Sie Ihre eigenen Zahlen einsetzen können: eine Workstation für 3.000 €, 0,6 kW unter Last, Strom zu 0,35 € pro kWh und eine vergleichbare Cloud-GPU für 0,70 € pro Stunde. Cloud-Preise unterscheiden sich stark je nach Anbieter und Kartentyp. Prüfen Sie aktuelle Preise, bevor Sie entscheiden.",
        },
        {
          t: "table",
          head: ["Nutzung", "Strom / Monat", "Cloud / Monat", "Break-even"],
          rows: [
            ["2 Stunden am Tag (60 h)", "≈ 13 €", "≈ 42 €", "≈ 102 Monate"],
            ["8 Stunden am Tag (240 h)", "≈ 50 €", "≈ 168 €", "≈ 26 Monate"],
            ["Rund um die Uhr (720 h)", "≈ 151 €", "≈ 504 €", "≈ 9 Monate"],
          ],
        },
        {
          t: "p",
          text: "Das Muster ist eindeutig. Steht die GPU die meiste Zeit still, gewinnt Mieten mühelos. Ein paar Stunden Experimente pro Woche sind in der Cloud günstiger. Läuft sie den Großteil des Tages, als Inferenzserver eines Teams, als nächtlicher Batch-Job oder für kontinuierliches Fine-Tuning, amortisiert sich eigene Hardware weit innerhalb ihrer Lebensdauer.",
        },
        { t: "h", text: "Was die Formel nicht zeigt" },
        {
          t: "list",
          items: [
            "**Datenschutz.** Eigene Hardware hält sensible Daten im Haus. Bei Gesundheits-, Personal- oder Kundendaten kann das unabhängig vom Preis entscheidend sein.",
            "**Größe.** Manche Modelle brauchen 80 GB oder mehr pro GPU oder mehrere GPUs gleichzeitig. Das stundenweise zu mieten ist weit einfacher, als es zu kaufen.",
            "**Verfügbarkeit.** Ihre eigene Karte hat keine Warteliste. Beliebte Cloud-GPUs manchmal schon.",
            "**Ihre Zeit.** Eigene Hardware braucht Pflege: Updates, Ausfälle, Lärm, Hitze. Cloud-Hardware ist das Problem eines anderen.",
            "**Lernen.** Eine GPU selbst einzurichten, wie in dieser Serie, lehrt Sie Dinge, die keine Cloud-Konsole vermittelt.",
          ],
        },
        { t: "h", text: "Die Antwort des Architekten: beides" },
        {
          t: "p",
          text: "In der Praxis ist ein hybrides Setup am stärksten. Entwickeln und experimentieren Sie lokal, wo Iterationen nichts kosten und Daten privat bleiben. Mieten Sie Cloud-GPUs für große Jobs und Lastspitzen. Weil Sie in Folge 4 alles in Container verpackt haben, läuft dasselbe Image an beiden Orten unverändert. Das ist kein Kompromiss, sondern gute Architektur: eine klare Grenze und die Freiheit, Arbeit dorthin zu verschieben, wo sie am günstigsten oder sichersten ist.",
        },
        {
          t: "note",
          tone: "tip",
          text: "Erfassen Sie zuerst einen Monat lang Ihre echte Nutzung. `nvidia-smi` auf Ihrem Rechner oder die Abrechnungsseite in der Cloud liefert die Stunden. Rechnen Sie dann mit Ihren eigenen Zahlen.",
        },
        { t: "h", text: "Das war's" },
        {
          t: "p",
          text: "Von der Kartenauswahl nach VRAM über den Einbau, von Treibern und CUDA zu Containern, einem privaten LLM, der Optimierung im Betrieb und der Kostenfrage: Sie haben jetzt das vollständige Bild. Danke, dass Sie dabei waren. Wenn Ihnen die Serie geholfen hat, teilen Sie sie mit einer Person, die gerade ihre erste GPU kaufen will.",
        },
      ],
    },
  ],
};

export default series;
