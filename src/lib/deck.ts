export type NodeId =
  | "lipo"
  | "adapter"
  | "switch"
  | "fuse"
  | "buck"
  | "pi"
  | "cooler"
  | "hub"
  | "display"
  | "ssd"
  | "keyboard"
  | "esp32"
  | "xt60panel"
  | "sd"
  | "charger"
  | "bag";

export type WireKind = "pos11" | "gnd" | "v5" | "usb" | "hdmi" | "fan" | "optional";

export type WireGauge = "18 AWG" | "22 AWG" | "EC5" | "XT60" | "USB-C" | "USB-A" | "HDMI" | "JST";

export type NodeStatus = "required" | "optional" | "deferred";

export type DeckNode = {
  id: NodeId;
  name: string;
  short: string;
  kicker: string;
  status: NodeStatus;
  zone: "power" | "compute" | "io" | "charge";
  voltage?: string;
  current?: string;
  connector?: string;
  price?: number;
  summary: string;
  wiring: string[];
  warnings: string[];
  notes: string[];
};

export type DeckWire = {
  id: string;
  from: NodeId;
  to: NodeId;
  kind: WireKind;
  gauge: WireGauge;
  label: string;
  detail: string;
  optional?: boolean;
};

export type BomItem = {
  id: string;
  node?: NodeId;
  name: string;
  price: number;
  category: "enclosure" | "compute" | "power" | "io" | "wiring" | "hardware" | "optional";
  spec: string;
  note: string;
};

export const NODES: Record<NodeId, DeckNode> = {
  lipo: {
    id: "lipo",
    name: "Venom VEN15187 LiPo",
    short: "3S LiPo",
    kicker: "Energy store",
    status: "required",
    zone: "power",
    voltage: "11.1 V nom · 12.6 V full · ~9.9 V cutoff",
    current: "10 500 mAh · 50C · ~116 Wh",
    connector: "EC5 (battery side)",
    price: 170,
    summary:
      "Three-cell lithium polymer pack that feeds the entire deck. Lives in the left zone of the Pelican 1500, inside a fireproof LiPo bag. Never charge it through the buck converter.",
    wiring: [
      "Positive (red, 18 AWG) leaves the pack through the EC5 → XT60 adapter, then the panel switch, then the fuse, then buck VIN+.",
      "Negative (black, 18 AWG) is unswitched. It runs straight from the pack to buck VIN−, then onward to Pi GND.",
      "Balance lead is only used on the iMAX B6 charger — do not tap it for power.",
    ],
    warnings: [
      "LiPo fire risk. Store and charge in the Zeee fireproof bag. Never leave a charging pack unattended.",
      "Do not pinch, puncture, or tightly strap the pack against the Pi cooler.",
      "If the pack swells, puffs, or exceeds ~60 °C, retire it.",
    ],
    notes: [
      "Runtime math: 11.1 V × 10.5 Ah = 116.5 Wh. The 15.6\" panel pushes the average load to roughly 18 W. At ~90% buck efficiency and 80% usable capacity that is about 4–5 hours, down from the 6–7 hours the 10.1\" panel would have given.",
      "Charge by opening the case and connecting the iMAX B6 to the pack directly. Version 1 has no in-case charging path.",
    ],
  },
  adapter: {
    id: "adapter",
    name: "EC5 to XT60 adapter",
    short: "EC5 → XT60",
    kicker: "Battery interface",
    status: "required",
    zone: "power",
    connector: "EC5 female (to pack) · XT60 male (to harness)",
    price: 11,
    summary:
      "The Venom pack ships with EC5. The rest of the power system is XT60. This pigtail is the only adapter in the high-current path — keep it short and strain-relieved.",
    wiring: [
      "EC5 female mates to the battery. XT60 male feeds the switched positive and the unswitched ground harness.",
      "Treat this as a service disconnect: unplug here before any soldering, fuse change, or charger work.",
    ],
    warnings: [
      "XT60 and EC5 are polarized but easy to force if you rush. Confirm red-to-red before mating.",
      "Do not hide this joint under foam without a service loop — you will need to unplug it every charge.",
    ],
    notes: ["Buy a 2-pack. Keep the spare in the case lid pocket."],
  },
  switch: {
    id: "switch",
    name: "Panel-mount SPST toggle",
    short: "Master switch",
    kicker: "Exterior on/off",
    status: "required",
    zone: "power",
    voltage: "Switches 11.1 V positive only",
    current: "30 A rated · ~2 A typical",
    connector: "2-pin screw or solder lugs",
    price: 11,
    summary:
      "Waterproof marine SPST with boot cover, mounted through the Pelican wall. It is the master power switch. It interrupts the positive 11.1 V line only — ground stays continuous.",
    wiring: [
      "18 AWG red in from the XT60 adapter.",
      "18 AWG red out to the inline fuse holder.",
      "Do not switch the ground. Switching ground leaves the pack positive live inside the case.",
    ],
    warnings: [
      "Drill the panel hole in Fusion 360 before you cut the case. Use the boot cover and a thin bead of silicone on the inside nut.",
      "Switch must be OFF before mating the XT60.",
    ],
    notes: ["Joinfworld 12 V DC 30 A waterproof toggle, 4-pack. Use one, keep a spare."],
  },
  fuse: {
    id: "fuse",
    name: "Inline ATC fuse",
    short: "5–7.5 A fuse",
    kicker: "Short protection",
    status: "required",
    zone: "power",
    voltage: "On 11.1 V positive, after the switch",
    current: "5 A spare · 7.5 A primary",
    connector: "ATC / ATO blade · inline holder",
    price: 20,
    summary:
      "The only over-current device in the pack-to-buck run. Sits between the toggle and buck VIN+. A dead short on the 11.1 V side without this fuse can dump 50C from the pack.",
    wiring: [
      "18 AWG red from switch output → fuse holder input.",
      "18 AWG red from fuse holder output → buck VIN+.",
      "Heat-shrink both crimps. Mount the holder where you can change the blade without unpacking the Pi.",
    ],
    warnings: [
      "Never bypass a blown fuse with foil or a higher rating. Find the short first.",
      "Size: 18 W at 11.1 V is 1.6 A. Inrush plus the buck is still well under 5 A. 7.5 A is the working fuse; 5 A is the spare.",
    ],
    notes: ["Holder and blades are separate line items on the sheet. Buy ATC, not mini, so gloved hands can change it."],
  },
  buck: {
    id: "buck",
    name: "DROK 5 V 5 A buck",
    short: "Buck 5.1 V",
    kicker: "12 V → 5 V",
    status: "required",
    zone: "power",
    voltage: "IN 9–36 V · OUT 5.1 V set",
    current: "5 A max · 25 W ceiling",
    connector: "Screw terminals · USB-A (do not assume 5 V)",
    price: 25,
    summary:
      "Step-down converter that turns the 3S pack into a stable 5.1 V rail for the Pi and the powered hub. This is a buck, not a boost — input must stay above ~9 V, which a healthy 3S pack does.",
    wiring: [
      "VIN+ ← fused 18 AWG red. VIN− ← unswitched 18 AWG black from the pack.",
      "VOUT+ (5.1 V) splits: one 18 AWG run to the Pi USB-C pigtail, one 18 AWG run to the USB hub power input.",
      "VOUT− ties to Pi GND and hub ground. Keep this star at the buck, not at the Pi.",
      "Set the output with a multimeter on the screw terminals BEFORE the Pi is connected. Target 5.10–5.15 V.",
    ],
    warnings: [
      "CRITICAL: the listing is a ‘fast charge’ USB module. QC/FCP ports can jump to 9 V or 12 V and will kill a Pi 5. Do not use the USB-A jack until you have measured it at 5.0–5.2 V under load with no data lines tied. Prefer a USB-C pigtail on the screw terminals.",
      "Do not connect the Pi while adjusting the pot. A slip to 8 V is a dead board.",
      "5 A is the entire 5 V budget. Pi 5 without USB-PD negotiates 3 A (15 W). The 15.6\" panel can ask for another 2 A on its own, so the 5 A rail is now genuinely tight. Do not add a second display or a bus-powered HDD.",
    ],
    notes: [
      "Mount in the right-hand electronics zone with standoffs and airflow. The module will run warm at 3 A.",
      "If the pack sags under 9 V the buck will drop out — that is your low-battery behaviour in v1. No low-voltage cutoff is fitted yet.",
    ],
  },
  pi: {
    id: "pi",
    name: "Raspberry Pi 5 8 GB",
    short: "Pi 5",
    kicker: "Compute",
    status: "required",
    zone: "compute",
    voltage: "5.1 V via USB-C",
    current: "3 A typical without PD · 5 A if PD ever added",
    connector: "USB-C power · 2× micro-HDMI · USB 3 · USB 2 · J16 fan",
    price: 245,
    summary:
      "The brain. 8 GB is required for later local AI / RAG. OS lives on the A2 microSD. All Wikipedia, maps, and manuals live on the 1 TB SSD, never on the card.",
    wiring: [
      "Power: USB-C from the buck 5.1 V pigtail. Do not feed 5 V into the 40-pin header unless you accept bypassing USB-C protection.",
      "Video: micro-HDMI port 0 (the one nearest the USB-C power jack) → Elecrow HDMI.",
      "Data: one USB 3 port → UGREEN hub upstream. Do not hang the SSD directly off the Pi if the hub is in the build — keep the port map simple.",
      "Cooling: Active Cooler on the J16 4-pin fan connector. No extra wiring.",
    ],
    warnings: [
      "Active cooler is non-negotiable in a sealed Pelican. A bare Pi 5 will throttle and then thermal-limit in minutes.",
      "Center zone of the case, with clearance on both sides for the intake/exhaust path you will place in Fusion 360.",
      "M2.5 standoffs only. The board holes are not M3.",
    ],
    notes: [
      "First boot with the case open and a fan thermometer on the SoC. If the cooler cannot hold <80 °C at load, enlarge the vents before you close the lid.",
      "Software plan: offline Wikipedia, maps, first-aid/survival PDFs, RAG assistant designed September 2026.",
    ],
  },
  cooler: {
    id: "cooler",
    name: "Pi 5 Active Cooler",
    short: "Active cooler",
    kicker: "Required thermal",
    status: "required",
    zone: "compute",
    connector: "J16 4-pin JST-SH on the Pi",
    price: 7,
    summary:
      "Official Raspberry Pi Active Cooler. Heatsink plus PWM fan. Required — not optional — because the Pelican 1500 is a sealed box.",
    wiring: [
      "Press onto the Pi 5 metal can. Plug the fan into J16. No 18 AWG, no extra power tap.",
    ],
    warnings: [
      "Leave vertical clearance in the 3D-printed Pi tray so the fan can exhaust. Do not bury the cooler in foam.",
      "Case still needs a dedicated intake and exhaust. Place both in the Fusion 360 layout before printing brackets.",
    ],
    notes: ["Buy the official part. Generic 40 mm fans do not hit the same contact on the Pi 5 metal lid."],
  },
  hub: {
    id: "hub",
    name: "UGREEN 7-port powered hub",
    short: "USB hub",
    kicker: "I/O expander",
    status: "required",
    zone: "io",
    voltage: "5 V self-powered from the buck",
    connector: "Upstream USB-A/C to Pi · 5× USB-A + 2× USB-C down",
    price: 50,
    summary:
      "The Pi 5 runs out of ports immediately (keyboard dongle, SSD, display touch, optional ESP32). A powered hub is mandatory — a bus-powered hub will brown-out the Pi.",
    wiring: [
      "Hub DC / USB power input ← 18 AWG 5.1 V from buck VOUT (shared rail with the Pi, not from a Pi USB port).",
      "Upstream cable: hub → Pi USB 3.",
      "Downstream: display USB (touch + panel power), Crucial X9, K400 dongle, optional ESP32.",
    ],
    warnings: [
      "If you power the hub from the Pi, you have not built a powered hub. Stability issues will show up as SSD disconnects and touch dropouts.",
      "Keep the hub in the right-hand electronics zone next to the buck so the 5 V run stays short.",
    ],
    notes: [
      "Project spec is 7-port (5 USB-A + 2 USB-C). The sheet blurb says 4-port — buy the 7-port UGREEN so USB-C SSD and a spare port both fit.",
    ],
  },
  display: {
    id: "display",
    name: "CrowVi VF156T 15.6\" touch",
    short: "15.6\" display",
    kicker: "Lid panel",
    status: "required",
    zone: "io",
    voltage: "5 V via USB-C",
    connector: "Mini-HDMI in · USB-C for touch · USB-C for power",
    price: 129,
    summary:
      "1920x1080 IPS touch panel, 360 x 230 x 10 mm, 1020 g. Mounts in the Pelican 1500 lid. Video over mini-HDMI, ten-point touch and panel power over separate USB-C lines.",
    wiring: [
      "Video: Pi 5 micro-HDMI 0 -> panel mini-HDMI. Route through the lid hinge with a service loop.",
      "Touch: panel USB-C data port -> hub downstream USB port.",
      "Power: panel USB-C power port -> hub 5 V. Up to about 2 A, which is why the hub is self-powered.",
    ],
    warnings: [
      "The one-cable USB-C setup in the marketing does not apply. The Pi 5 USB-C port is power input only with no DisplayPort alt mode, so three cables cross the hinge.",
      "Hinge fatigue will kill a taut cable bundle. Leave slack, strain-relieve both ends, and route at the hinge axis so the loom twists rather than stretches.",
      "1020 g in the lid loads the hinge on every open. Spread the bracket across the lid face instead of four small points.",
      "300 nit is dim for direct sun. Plan a printed hood; it is not optional for a field device.",
    ],
    notes: [
      "Active area 344 x 193 mm inside a 360 x 230 mm frame. The 435 x 292.6 mm lid opening leaves roughly 37 mm of margin each side.",
      "Pelican dimensions the lid with five moulded bosses. Check them against the panel bracket before drilling anything.",
    ],
  },
  ssd: {
    id: "ssd",
    name: "Kingston NV3 500 GB + M.2 HAT",
    short: "NVMe storage",
    kicker: "Boot + all user data",
    status: "required",
    zone: "compute",
    connector: "M.2 2280 NVMe on the Pi 5 PCIe lane",
    price: 200,
    summary:
      "Internal NVMe drive on a PCIe HAT. Holds the OS and the offline payload: Kiwix Wikipedia, maps, manuals and later RAG indexes. The deck boots straight off it, so there is no microSD in the build.",
    wiring: [
      "HAT seats on the Pi 5 PCIe FFC connector. No power harness of its own.",
      "Enable PCIe in config.txt. Third-party 2280 boards are not HAT+ compliant and will not auto-configure.",
    ],
    warnings: [
      "The NV3 is M.2 2280. The official Raspberry Pi M.2 HAT+ only takes 2230 or 2242 - it will not physically fit. Use a 2280 board such as the Pimoroni NVMe Base.",
      "Check whether your HAT mounts above or below the Pi. Below is better here: it keeps the Active Cooler exhaust clear.",
    ],
    notes: [
      "The Pi 5 PCIe link is Gen2 x1, roughly 450-500 MB/s. The drive is rated far higher and that headroom is unusable. Do not pay for a faster drive.",
      "500 GB is sized against the real payload: Wikipedia with images is about 110 GB, BC map data about 20 GB, references a few GB, a quantised local model 5-20 GB.",
      "Internal beats an external USB SSD for ruggedness: no cable to shake loose and no separate box rattling in the case.",
    ],
  },
  keyboard: {
    id: "keyboard",
    name: "Logitech K400 Plus",
    short: "K400 Plus",
    kicker: "Keys + trackpad",
    status: "required",
    zone: "io",
    connector: "2.4 GHz USB-A dongle",
    price: 45,
    summary:
      "Wireless keyboard with a built-in trackpad. No separate mouse. The keyboard body parks in the base of the case when the lid closes; only the tiny dongle stays plugged into the hub.",
    wiring: [
      "Dongle → hub USB-A. That is the only wire. The keyboard itself is AA-powered and has no tether.",
    ],
    warnings: [
      "Do not lose the dongle. Tape a labelled spare slot in the lid or buy a unifying spare.",
      "Confirm the K400 still fits beside the three interior zones when the lid shuts — the board is ~14\" wide.",
    ],
    notes: ["Sits in the base when closed. Design the foam/tray in Fusion 360 around that footprint before printing."],
  },
  esp32: {
    id: "esp32",
    name: "ESP32 Marauder",
    short: "Marauder",
    kicker: "Optional USB tool",
    status: "optional",
    zone: "io",
    connector: "USB only",
    price: 24,
    summary:
      "Optional. Version 1 does not permanently integrate it. If present, it is just another USB device on the hub — no GPIO, no extra power tap.",
    wiring: ["USB-A/C from hub. Nothing else. Do not solder it to the Pi header in v1."],
    warnings: ["Leave it out of the first live demo if the USB map is already tight."],
    notes: ["Deferred from the core path. Shown dashed on the schematic."],
  },
  xt60panel: {
    id: "xt60panel",
    name: "XT60 panel mount",
    short: "XT60 bulkhead",
    kicker: "Deferred charging port",
    status: "deferred",
    zone: "charge",
    connector: "XT60E-F panel socket",
    price: 13,
    summary:
      "Deferred until external charging proves necessary. Would mount in the case wall with a rubber grommet so the pack can be charged without opening the lid. Not in the v1 circuit.",
    wiring: [
      "Not connected in v1. Future path: a switched or fused tap on the pack side of the master switch, never on the 5 V rail.",
    ],
    warnings: [
      "Do not parallel a charger and the Pi on the same pack without a proper charge/load topology. That is why this is deferred.",
    ],
    notes: ["v1 charging remains: open case → unplug EC5 adapter → iMAX B6 on the pack → LiPo bag."],
  },
  sd: {
    id: "sd",
    name: "microSD card",
    short: "Not used",
    kicker: "Superseded",
    status: "deferred",
    zone: "compute",
    connector: "Pi 5 microSD slot",
    price: 0,
    summary:
      "Dropped from the build. The deck boots from the NVMe drive instead, which removed about $58 from the parts list.",
    wiring: ["No harness. Slot stays empty."],
    warnings: [
      "Keep a flashed card on a shelf as a recovery image, but it is not part of the deck and not in the budget.",
    ],
    notes: ["Clone the NVMe the night before the 20 April 2027 demo."],
  },
  charger: {
    id: "charger",
    name: "iMAX B6 balance charger",
    short: "iMAX B6",
    kicker: "Charge only",
    status: "required",
    zone: "charge",
    voltage: "3S balance charge · never via the buck",
    price: 0,
    summary:
      "Already in the laser-cutter room. The only approved charger. Balance-charges the 3S pack outside the case.",
    wiring: [
      "Disconnect the EC5 adapter from the deck first.",
      "Pack main lead + balance lead into the B6. Charge in the LiPo bag, on a non-flammable surface, attended.",
    ],
    warnings: [
      "Never charge through the XT60 harness while the Pi is connected.",
      "Never charge unattended or inside a closed Pelican.",
    ],
    notes: ["Price on the sheet is $0 because the school already has it."],
  },
  bag: {
    id: "bag",
    name: "LiPo safe bag",
    short: "Safe bag",
    kicker: "Fire containment",
    status: "required",
    zone: "charge",
    price: 13,
    summary:
      "Zeee fireproof bag. The pack lives in it inside the left zone, and it comes out with the pack for every charge.",
    wiring: ["No electrical connection. Mechanical only."],
    warnings: ["Not optional. A Pelican will not contain a LiPo fire — it will hold the heat in."],
    notes: ["Velcro the bag to the left-zone tray so the pack cannot slide into the Pi."],
  },
};

export const WIRES: DeckWire[] = [
  {
    id: "w-ec5",
    from: "lipo",
    to: "adapter",
    kind: "pos11",
    gauge: "EC5",
    label: "EC5 +",
    detail: "Battery EC5 positive into the adapter pigtail.",
  },
  {
    id: "w-xt60",
    from: "adapter",
    to: "switch",
    kind: "pos11",
    gauge: "XT60",
    label: "XT60 +  18 AWG",
    detail: "Adapter XT60 male to the panel switch. 18 AWG red.",
  },
  {
    id: "w-sw-fuse",
    from: "switch",
    to: "fuse",
    kind: "pos11",
    gauge: "18 AWG",
    label: "18 AWG red",
    detail: "Switched 11.1 V positive to the ATC holder.",
  },
  {
    id: "w-fuse-buck",
    from: "fuse",
    to: "buck",
    kind: "pos11",
    gauge: "18 AWG",
    label: "VIN+",
    detail: "Fused 11.1 V into DROK VIN+.",
  },
  {
    id: "w-gnd-pack",
    from: "lipo",
    to: "buck",
    kind: "gnd",
    gauge: "18 AWG",
    label: "18 AWG black  unswitched",
    detail: "Pack negative to buck VIN−. Not switched, not fused.",
  },
  {
    id: "w-gnd-pi",
    from: "buck",
    to: "pi",
    kind: "gnd",
    gauge: "18 AWG",
    label: "GND",
    detail: "Buck VOUT− to Pi USB-C GND / pigtail ground.",
  },
  {
    id: "w-5v-pi",
    from: "buck",
    to: "pi",
    kind: "v5",
    gauge: "USB-C",
    label: "5.1 V  USB-C",
    detail: "Buck screw-terminal 5.1 V to Pi USB-C pigtail. Measure before connecting.",
  },
  {
    id: "w-5v-hub",
    from: "buck",
    to: "hub",
    kind: "v5",
    gauge: "18 AWG",
    label: "5.1 V hub PWR",
    detail: "Same 5.1 V rail, second 18 AWG run to the hub power input. Not from a Pi USB port.",
  },
  {
    id: "w-usb-up",
    from: "pi",
    to: "hub",
    kind: "usb",
    gauge: "USB-A",
    label: "USB 3 upstream",
    detail: "Pi USB 3 host to hub upstream.",
  },
  {
    id: "w-hdmi",
    from: "pi",
    to: "display",
    kind: "hdmi",
    gauge: "HDMI",
    label: "micro-HDMI 0",
    detail: "Pi micro-HDMI port 0 to Elecrow HDMI in. Service loop at the hinge.",
  },
  {
    id: "w-usb-disp",
    from: "hub",
    to: "display",
    kind: "usb",
    gauge: "USB-A",
    label: "Touch + 5 V",
    detail: "Hub downstream to panel USB (HID touch and backlight power).",
  },
  {
    id: "w-usb-ssd",
    from: "hub",
    to: "ssd",
    kind: "usb",
    gauge: "USB-C",
    label: "USB 3.2",
    detail: "Hub USB 3 to Crucial X9.",
  },
  {
    id: "w-usb-kbd",
    from: "hub",
    to: "keyboard",
    kind: "usb",
    gauge: "USB-A",
    label: "2.4 GHz dongle",
    detail: "K400 dongle in a hub USB-A port.",
  },
  {
    id: "w-usb-esp",
    from: "hub",
    to: "esp32",
    kind: "usb",
    gauge: "USB-A",
    label: "USB only",
    detail: "Optional Marauder. Dashed. Not in v1 permanent layout.",
    optional: true,
  },
  {
    id: "w-fan",
    from: "cooler",
    to: "pi",
    kind: "fan",
    gauge: "JST",
    label: "J16 PWM",
    detail: "Active Cooler fan lead on the Pi J16 header.",
  },
  {
    id: "w-xt60-future",
    from: "adapter",
    to: "xt60panel",
    kind: "optional",
    gauge: "XT60",
    label: "deferred",
    detail: "Future bulkhead charge port. Not landed in v1.",
    optional: true,
  },
];

export const BOM: BomItem[] = [
  {
    id: "b-case",
    name: "Pelican 1500 Protector Case",
    price: 175,
    category: "enclosure",
    spec: "16.75\" × 11.18\" × 6.12\" interior · sealed",
    note: "Lid takes the panel. Base splits into battery / Pi / electronics.",
  },
  {
    id: "b-pi",
    node: "pi",
    name: "Raspberry Pi 5 8 GB",
    price: 245,
    category: "compute",
    spec: "8 GB BCM2712",
    note: "8 GB not 4 GB — headroom for local AI.",
  },
  {
    id: "b-cooler",
    node: "cooler",
    name: "Raspberry Pi Active Cooler",
    price: 7,
    category: "compute",
    spec: "Official J16 PWM cooler",
    note: "Non-negotiable in an enclosed case.",
  },
  {
    id: "b-sd",
    node: "sd",
    name: "128 GB A2 microSD",
    price: 55,
    category: "compute",
    spec: "A2 · OS only",
    note: "Sheet links a 256 GB Extreme; spec is 128 GB A2. Either is fine if A2.",
  },
  {
    id: "b-ssd",
    node: "ssd",
    name: "Crucial X9 1 TB SSD",
    price: 191,
    category: "io",
    spec: "USB 3.2 · up to 1050 MB/s",
    note: "Wikipedia, maps, manuals, RAG data. Never an HDD.",
  },
  {
    id: "b-display",
    node: "display",
    name: "15.6\" touchscreen",
    price: 130,
    category: "io",
    spec: "1920×1080 IPS touch · 360 × 230 × 10 mm",
    note: "Sheet row is half-updated: titled 15.6\" but the link and notes still describe the Elecrow 10.1\".",
  },
  {
    id: "b-kbd",
    node: "keyboard",
    name: "Logitech K400 Plus",
    price: 45,
    category: "io",
    spec: "2.4 GHz · trackpad",
    note: "Parks in the base when the lid shuts.",
  },
  {
    id: "b-lipo",
    node: "lipo",
    name: "Venom VEN15187 3S 10500 mAh",
    price: 170,
    category: "power",
    spec: "11.1 V · 50C · EC5",
    note: "~4–5 h at 18 W average.",
  },
  {
    id: "b-adapt",
    node: "adapter",
    name: "EC5 to XT60 adapter",
    price: 11,
    category: "power",
    spec: "EC5 female → XT60 male",
    note: "Buy a 2-pack.",
  },
  {
    id: "b-b6",
    node: "charger",
    name: "iMAX B6 balance charger",
    price: 0,
    category: "power",
    spec: "3S balance · school stock",
    note: "Laser-cutter room. Never charge without it.",
  },
  {
    id: "b-buck",
    node: "buck",
    name: "DROK buck 9–36 V → 5 V 5 A",
    price: 25,
    category: "power",
    spec: "Adjustable · screw terminals",
    note: "Set 5.1 V with a meter. Do not trust the USB fast-charge jack.",
  },
  {
    id: "b-sw",
    node: "switch",
    name: "Waterproof SPST toggle",
    price: 11,
    category: "power",
    spec: "12 V · 30 A · boot cover",
    note: "Panel-mount on the exterior.",
  },
  {
    id: "b-fuseh",
    node: "fuse",
    name: "Inline ATC fuse holder",
    price: 12,
    category: "power",
    spec: "Blade holder",
    note: "Between switch and buck.",
  },
  {
    id: "b-fuses",
    node: "fuse",
    name: "ATC blade fuses 5–7.5 A",
    price: 8,
    category: "power",
    spec: "5 A spare · 7.5 A primary",
    note: "Local auto-parts store.",
  },
  {
    id: "b-18",
    name: "18 AWG silicone wire",
    price: 11,
    category: "wiring",
    spec: "Red + black · tinned",
    note: "All power: pack → switch → fuse → buck → Pi / hub.",
  },
  {
    id: "b-22",
    name: "22 AWG silicone wire",
    price: 20,
    category: "wiring",
    spec: "Red + black · 20 ft",
    note: "GPIO and signal only. Not for the 5 V rail.",
  },
  {
    id: "b-hs",
    name: "Heat-shrink tubing",
    price: 8,
    category: "wiring",
    spec: "3:1 adhesive-lined kit",
    note: "Every soldered joint. Do not skip.",
  },
  {
    id: "b-hub",
    node: "hub",
    name: "UGREEN 7-port powered hub",
    price: 50,
    category: "io",
    spec: "5× USB-A + 2× USB-C",
    note: "Must be self-powered from the buck.",
  },
  {
    id: "b-bag",
    node: "bag",
    name: "Zeee LiPo safe bag",
    price: 13,
    category: "power",
    spec: "Fireproof charge/storage bag",
    note: "Not optional with a LiPo.",
  },
  {
    id: "b-ties",
    name: "Zip ties + Velcro",
    price: 7,
    category: "hardware",
    spec: "Mixed",
    note: "Zip ties for fixed runs, Velcro for anything you undo.",
  },
  {
    id: "b-m25",
    name: "M2.5 screw / standoff kit",
    price: 16,
    category: "hardware",
    spec: "Pi board holes are M2.5",
    note: "Do not mount the Pi with M3.",
  },
  {
    id: "b-m3",
    name: "LuKaiSen M2–M5 screw kit",
    price: 17,
    category: "hardware",
    spec: "~780–860 pc socket kit",
    note: "Brackets and structural mounts.",
  },
  {
    id: "b-inserts",
    name: "Brass heat-set inserts M2–M5",
    price: 14,
    category: "hardware",
    spec: "180 pc",
    note: "Every 3D-printed joint. Design in Fusion 360 first.",
  },
  {
    id: "b-esp",
    node: "esp32",
    name: "ESP32 Marauder",
    price: 24,
    category: "optional",
    spec: "USB device",
    note: "Optional. USB only, not integrated in v1.",
  },
];

export const BOM_TOTAL = BOM.reduce((sum, item) => sum + item.price, 0);

// The sheet carries a 15% contingency for miscellaneous costs. It is real
// money, and it is the main reason the sheet total and the grant figure differ.
export const CONTINGENCY_RATE = 0.15;
export const CONTINGENCY = Math.round(BOM_TOTAL * CONTINGENCY_RATE);
export const SHEET_TOTAL = BOM_TOTAL + CONTINGENCY;

export const POWER_BUDGET = [
  { id: "pi", name: "Pi 5 + active cooler", watts: 8, share: 0.53 },
  { id: "display", name: "Elecrow 10.1\" IPS", watts: 4, share: 0.27 },
  { id: "ssd", name: "Crucial X9 (active)", watts: 2, share: 0.13 },
  { id: "hub", name: "Hub + dongle", watts: 1, share: 0.07 },
];

export const BUILD_STEPS: {
  id: string;
  title: string;
  node: NodeId | null;
  body: string;
}[] = [
  {
    id: "s1",
    title: "Dry-fit the case",
    node: null,
    body: "Tape out the three base zones (battery left, Pi center, electronics right) and the lid screen rectangle in the empty Pelican 1500. Confirm the K400 still lays in the base with the lid closed. No printing, no drilling, no power.",
  },
  {
    id: "s2",
    title: "Design mounts in Fusion 360",
    node: null,
    body: "Every bracket, the Pi tray, buck sled, fuse clip, and lid bezel is modelled first. Heat-set inserts M2–M5. Pi holes are M2.5. Place intake and exhaust vents with the cooler’s airflow in mind. Print nothing until the layout is locked.",
  },
  {
    id: "s3",
    title: "Mount Pi and cooler",
    node: "pi",
    body: "Seat the Active Cooler. Standoff the Pi on M2.5 in the center zone with clearance on both sides. Plug the fan into J16. Leave the USB-C power unplugged.",
  },
  {
    id: "s4",
    title: "Mount switch, fuse, buck",
    node: "buck",
    body: "Panel-mount the marine toggle with boot cover. Mount the ATC holder where a blade can be changed. Standoff the DROK in the right zone. No battery connected.",
  },
  {
    id: "s5",
    title: "Wire 11.1 V positive",
    node: "switch",
    body: "18 AWG red: XT60 pigtail → switch → fuse → buck VIN+. Heat-shrink every joint. Polarity marked. Switch OFF.",
  },
  {
    id: "s6",
    title: "Wire unswitched ground",
    node: "lipo",
    body: "18 AWG black: pack/adapter negative → buck VIN−, then a short run to the 5 V pigtail ground. Ground is never switched.",
  },
  {
    id: "s7",
    title: "Set 5.1 V with a meter",
    node: "buck",
    body: "Connect a bench pack or the LiPo through the adapter with the Pi disconnected. Switch on. Measure VOUT. Turn the pot to 5.10–5.15 V. Switch off. If you cannot hold 5.1 V, stop — do not guess.",
  },
  {
    id: "s8",
    title: "Land 5 V on the Pi and hub",
    node: "pi",
    body: "USB-C pigtail from buck screw terminals to the Pi. Second 18 AWG 5.1 V run to the hub power input. Do not use the DROK ‘fast charge’ USB jack unless you have measured it at 5.0–5.2 V with no QC negotiation.",
  },
  {
    id: "s9",
    title: "Data: HDMI, hub, display, SSD, dongle",
    node: "hub",
    body: "micro-HDMI 0 to the lid panel with a hinge service loop. Hub upstream to Pi USB 3. Hub downstream: display USB, X9, K400 dongle. Velcro the SSD. Zip-tie the fixed 18 AWG runs.",
  },
  {
    id: "s10",
    title: "First boot, case open",
    node: "sd",
    body: "OS card in. Battery in the LiPo bag, case open. Switch on. Confirm 5.1 V still holds under load. Watch SoC temperature. If the cooler cannot hold a usable temperature, enlarge vents before the lid ever closes.",
  },
  {
    id: "s11",
    title: "Charge discipline",
    node: "charger",
    body: "To charge: switch off, unplug EC5, remove the pack in its bag, iMAX B6 balance charge attended. No in-case charging in v1. XT60 bulkhead stays deferred.",
  },
];

export const SAFETY_RULES = [
  {
    title: "LiPo is the hazard",
    body: "The pack can dump enormous current into a short and can ignite. It lives in the fireproof bag. It is charged on the B6, attended, never inside a closed Pelican.",
  },
  {
    title: "Fuse before the buck",
    body: "Circuit order is pack → switch → 5–7.5 A ATC → buck → Pi. Do not reorder. A fuse on the 5 V side does not protect a pack-side short.",
  },
  {
    title: "Switch the positive only",
    body: "The marine toggle breaks 11.1 V red. Black ground is continuous. Switching ground leaves the pack positive live on every terminal inside the case.",
  },
  {
    title: "Measure 5.1 V before the Pi",
    body: "The DROK is adjustable and its USB jack may be a fast-charge port. A 9 V QC blip will destroy the Pi 5. Meter the screw terminals every time you touch the pot.",
  },
  {
    title: "18 AWG for power, 22 AWG for signals",
    body: "Battery, switch, fuse, buck, Pi, and hub power are 18 AWG silicone. 22 AWG is GPIO only. Heat-shrink every soldered joint.",
  },
  {
    title: "Active cooler + vents",
    body: "A sealed Pelican without intake and exhaust will cook the Pi even with the official cooler. Place both vents in Fusion 360. First thermal test is always with the lid open.",
  },
];

export const CASE_ZONES = [
  {
    id: "left",
    title: "Left · battery",
    body: "Venom 3S in the LiPo bag, EC5 pigtail with a service loop. Nothing metallic loose against the pack.",
  },
  {
    id: "center",
    title: "Center · compute",
    body: "Pi 5 on M2.5 standoffs with the Active Cooler and the NVMe HAT stacked. Airflow clearance both sides, nothing solid directly above the fan.",
  },
  {
    id: "right",
    title: "Right · power + hub",
    body: "Buck converter, switch and inline fuse, 5 V splits and the UGREEN hub. Short 18 AWG runs. Storage moved onto the Pi, so nothing else competes for this corner.",
  },
  {
    id: "lid",
    title: "Lid · display",
    body: "CrowVi 15.6\" in a printed bezel, ideally bolted to the five moulded lid bosses. Mini-HDMI plus two USB-C through the hinge with slack.",
  },
  {
    id: "base",
    title: "Base · keyboard park",
    body: "K400 Plus lays in the front 141 mm of floor when the lid closes. That leaves about 150 mm at the back for everything else, which is what drives the whole layout.",
  },
];

export const WIRE_LEGEND: { kind: WireKind; label: string; hint: string }[] = [
  { kind: "pos11", label: "11.1 V +", hint: "18 AWG red · switched & fused" },
  { kind: "gnd", label: "Ground", hint: "18 AWG black · unswitched" },
  { kind: "v5", label: "5.1 V rail", hint: "After the buck · Pi + hub" },
  { kind: "usb", label: "USB", hint: "Data · hub map" },
  { kind: "hdmi", label: "HDMI", hint: "Pi micro-HDMI 0 → panel" },
  { kind: "fan", label: "Fan", hint: "J16 PWM" },
  { kind: "optional", label: "Deferred", hint: "Dashed · not in v1" },
];

export function wiresFor(id: NodeId | null) {
  if (!id) return WIRES;
  return WIRES.filter((w) => w.from === id || w.to === id);
}

export function relatedNodes(id: NodeId | null): Set<NodeId> {
  const set = new Set<NodeId>();
  if (!id) return set;
  set.add(id);
  for (const w of WIRES) {
    if (w.from === id || w.to === id) {
      set.add(w.from);
      set.add(w.to);
    }
  }
  return set;
}

export const NODE_LIST = Object.values(NODES);
