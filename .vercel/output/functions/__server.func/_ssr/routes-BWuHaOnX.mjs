import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as PlugZap, c as Box, i as Shield, l as Activity, n as Workflow, o as List, r as TriangleAlert, s as Cable, t as X } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog, u as Slot } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Root } from "../_libs/radix-ui__react-separator.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BWuHaOnX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NODES = {
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
		summary: "Three-cell lithium polymer pack that feeds the entire deck. Lives in the left zone of the Pelican 1500, inside a fireproof LiPo bag. Never charge it through the buck converter.",
		wiring: [
			"Positive (red, 18 AWG) leaves the pack through the EC5 → XT60 adapter, then the panel switch, then the fuse, then buck VIN+.",
			"Negative (black, 18 AWG) is unswitched. It runs straight from the pack to buck VIN−, then onward to Pi GND.",
			"Balance lead is only used on the iMAX B6 charger — do not tap it for power."
		],
		warnings: [
			"LiPo fire risk. Store and charge in the Zeee fireproof bag. Never leave a charging pack unattended.",
			"Do not pinch, puncture, or tightly strap the pack against the Pi cooler.",
			"If the pack swells, puffs, or exceeds ~60 °C, retire it."
		],
		notes: ["Runtime math: 11.1 V × 10.5 Ah = 116.5 Wh. At 15 W average and ~90% buck efficiency that is about 7 hours; 80% usable capacity lands at 6–7 hours as specified.", "Charge by opening the case and connecting the iMAX B6 to the pack directly. Version 1 has no in-case charging path."]
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
		summary: "The Venom pack ships with EC5. The rest of the power system is XT60. This pigtail is the only adapter in the high-current path — keep it short and strain-relieved.",
		wiring: ["EC5 female mates to the battery. XT60 male feeds the switched positive and the unswitched ground harness.", "Treat this as a service disconnect: unplug here before any soldering, fuse change, or charger work."],
		warnings: ["XT60 and EC5 are polarized but easy to force if you rush. Confirm red-to-red before mating.", "Do not hide this joint under foam without a service loop — you will need to unplug it every charge."],
		notes: ["Buy a 2-pack. Keep the spare in the case lid pocket."]
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
		summary: "Waterproof marine SPST with boot cover, mounted through the Pelican wall. It is the master power switch. It interrupts the positive 11.1 V line only — ground stays continuous.",
		wiring: [
			"18 AWG red in from the XT60 adapter.",
			"18 AWG red out to the inline fuse holder.",
			"Do not switch the ground. Switching ground leaves the pack positive live inside the case."
		],
		warnings: ["Drill the panel hole in Fusion 360 before you cut the case. Use the boot cover and a thin bead of silicone on the inside nut.", "Switch must be OFF before mating the XT60."],
		notes: ["Joinfworld 12 V DC 30 A waterproof toggle, 4-pack. Use one, keep a spare."]
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
		summary: "The only over-current device in the pack-to-buck run. Sits between the toggle and buck VIN+. A dead short on the 11.1 V side without this fuse can dump 50C from the pack.",
		wiring: [
			"18 AWG red from switch output → fuse holder input.",
			"18 AWG red from fuse holder output → buck VIN+.",
			"Heat-shrink both crimps. Mount the holder where you can change the blade without unpacking the Pi."
		],
		warnings: ["Never bypass a blown fuse with foil or a higher rating. Find the short first.", "Size: 15 W at 11.1 V is 1.4 A. Inrush plus the buck is still well under 5 A. 7.5 A is the working fuse; 5 A is the spare."],
		notes: ["Holder and blades are separate line items on the sheet. Buy ATC, not mini, so gloved hands can change it."]
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
		summary: "Step-down converter that turns the 3S pack into a stable 5.1 V rail for the Pi and the powered hub. This is a buck, not a boost — input must stay above ~9 V, which a healthy 3S pack does.",
		wiring: [
			"VIN+ ← fused 18 AWG red. VIN− ← unswitched 18 AWG black from the pack.",
			"VOUT+ (5.1 V) splits: one 18 AWG run to the Pi USB-C pigtail, one 18 AWG run to the USB hub power input.",
			"VOUT− ties to Pi GND and hub ground. Keep this star at the buck, not at the Pi.",
			"Set the output with a multimeter on the screw terminals BEFORE the Pi is connected. Target 5.10–5.15 V."
		],
		warnings: [
			"CRITICAL: the listing is a ‘fast charge’ USB module. QC/FCP ports can jump to 9 V or 12 V and will kill a Pi 5. Do not use the USB-A jack until you have measured it at 5.0–5.2 V under load with no data lines tied. Prefer a USB-C pigtail on the screw terminals.",
			"Do not connect the Pi while adjusting the pot. A slip to 8 V is a dead board.",
			"5 A is the entire 5 V budget. Pi 5 without USB-PD negotiates 3 A (15 W), which matches the 15 W design load. Do not add a second display or a bus-powered HDD."
		],
		notes: ["Mount in the right-hand electronics zone with standoffs and airflow. The module will run warm at 3 A.", "If the pack sags under 9 V the buck will drop out — that is your low-battery behaviour in v1. No low-voltage cutoff is fitted yet."]
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
		summary: "The brain. 8 GB is required for later local AI / RAG. OS lives on the A2 microSD. All Wikipedia, maps, and manuals live on the 1 TB SSD, never on the card.",
		wiring: [
			"Power: USB-C from the buck 5.1 V pigtail. Do not feed 5 V into the 40-pin header unless you accept bypassing USB-C protection.",
			"Video: micro-HDMI port 0 (the one nearest the USB-C power jack) → Elecrow HDMI.",
			"Data: one USB 3 port → UGREEN hub upstream. Do not hang the SSD directly off the Pi if the hub is in the build — keep the port map simple.",
			"Cooling: Active Cooler on the J16 4-pin fan connector. No extra wiring."
		],
		warnings: [
			"Active cooler is non-negotiable in a sealed Pelican. A bare Pi 5 will throttle and then thermal-limit in minutes.",
			"Center zone of the case, with clearance on both sides for the intake/exhaust path you will place in Fusion 360.",
			"M2.5 standoffs only. The board holes are not M3."
		],
		notes: ["First boot with the case open and a fan thermometer on the SoC. If the cooler cannot hold <80 °C at load, enlarge the vents before you close the lid.", "Software plan: offline Wikipedia, maps, first-aid/survival PDFs, RAG assistant designed September 2026."]
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
		summary: "Official Raspberry Pi Active Cooler. Heatsink plus PWM fan. Required — not optional — because the Pelican 1500 is a sealed box.",
		wiring: ["Press onto the Pi 5 metal can. Plug the fan into J16. No 18 AWG, no extra power tap."],
		warnings: ["Leave vertical clearance in the 3D-printed Pi tray so the fan can exhaust. Do not bury the cooler in foam.", "Case still needs a dedicated intake and exhaust. Place both in the Fusion 360 layout before printing brackets."],
		notes: ["Buy the official part. Generic 40 mm fans do not hit the same contact on the Pi 5 metal lid."]
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
		summary: "The Pi 5 runs out of ports immediately (keyboard dongle, SSD, display touch, optional ESP32). A powered hub is mandatory — a bus-powered hub will brown-out the Pi.",
		wiring: [
			"Hub DC / USB power input ← 18 AWG 5.1 V from buck VOUT (shared rail with the Pi, not from a Pi USB port).",
			"Upstream cable: hub → Pi USB 3.",
			"Downstream: display USB (touch + panel power), Crucial X9, K400 dongle, optional ESP32."
		],
		warnings: ["If you power the hub from the Pi, you have not built a powered hub. Stability issues will show up as SSD disconnects and touch dropouts.", "Keep the hub in the right-hand electronics zone next to the buck so the 5 V run stays short."],
		notes: ["Project spec is 7-port (5 USB-A + 2 USB-C). The sheet blurb says 4-port — buy the 7-port UGREEN so USB-C SSD and a spare port both fit."]
	},
	display: {
		id: "display",
		name: "Elecrow 10.1\" IPS touch",
		short: "10.1\" display",
		kicker: "Lid panel",
		status: "required",
		zone: "io",
		voltage: "5 V via USB",
		connector: "HDMI in · USB for touch and power",
		price: 66,
		summary: "1280×800 IPS panel that mounts in the Pelican 1500 lid. Video over HDMI, touch and panel power over USB from the powered hub.",
		wiring: ["HDMI: Pi 5 micro-HDMI 0 → panel HDMI (standard HDMI cable + micro-HDMI adapter, or a dedicated micro-HDMI-to-HDMI lead). Route through the lid hinge with a service loop.", "USB: hub downstream → panel USB. This is both HID touch and 5 V for the backlight. Do not also feed a separate barrel jack."],
		warnings: ["Hinge fatigue will kill a taut HDMI cable. Leave slack and strain-relieve on both the lid and the base.", "Confirm the panel is 1280×800 so the Pi boots to a matching mode. Do not buy a 1920×1080 10.1 if you want this layout."],
		notes: ["Active area is roughly 8.6\" × 5.4\" on a 16:10 10.1\". The 16.75\" × 11.18\" lid has room for a printed bezel and the HDMI/USB tails."]
	},
	ssd: {
		id: "ssd",
		name: "Crucial X9 1 TB SSD",
		short: "1 TB SSD",
		kicker: "All user data",
		status: "required",
		zone: "io",
		connector: "USB 3.2 Type-C",
		price: 191,
		summary: "External SSD for Wikipedia dumps, offline maps, survival manuals, and later RAG indexes. The microSD is OS only — if the card dies, the data still lives here.",
		wiring: ["USB-C into the powered hub (USB 3 port, not USB 2). Do not plug into the Pi USB 2 ports."],
		warnings: ["Do not store the dump on the microSD. A2 cards wear out and are unrecoverable in the field.", "Velcro the enclosure so a drop does not yank the USB-C plug."],
		notes: ["USB 3.2 up to ~1050 MB/s. Real Raspberry Pi 5 USB 3 is closer to 400–800 MB/s — still fine for Kiwix and maps."]
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
		summary: "Wireless keyboard with a built-in trackpad. No separate mouse. The keyboard body parks in the base of the case when the lid closes; only the tiny dongle stays plugged into the hub.",
		wiring: ["Dongle → hub USB-A. That is the only wire. The keyboard itself is AA-powered and has no tether."],
		warnings: ["Do not lose the dongle. Tape a labelled spare slot in the lid or buy a unifying spare.", "Confirm the K400 still fits beside the three interior zones when the lid shuts — the board is ~14\" wide."],
		notes: ["Sits in the base when closed. Design the foam/tray in Fusion 360 around that footprint before printing."]
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
		summary: "Optional. Version 1 does not permanently integrate it. If present, it is just another USB device on the hub — no GPIO, no extra power tap.",
		wiring: ["USB-A/C from hub. Nothing else. Do not solder it to the Pi header in v1."],
		warnings: ["Leave it out of the first live demo if the USB map is already tight."],
		notes: ["Deferred from the core path. Shown dashed on the schematic."]
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
		summary: "Deferred until external charging proves necessary. Would mount in the case wall with a rubber grommet so the pack can be charged without opening the lid. Not in the v1 circuit.",
		wiring: ["Not connected in v1. Future path: a switched or fused tap on the pack side of the master switch, never on the 5 V rail."],
		warnings: ["Do not parallel a charger and the Pi on the same pack without a proper charge/load topology. That is why this is deferred."],
		notes: ["v1 charging remains: open case → unplug EC5 adapter → iMAX B6 on the pack → LiPo bag."]
	},
	sd: {
		id: "sd",
		name: "128 GB A2 microSD",
		short: "OS card",
		kicker: "Boot media",
		status: "required",
		zone: "compute",
		connector: "Pi 5 microSD slot",
		price: 58,
		summary: "OS only. Raspberry Pi OS (or your chosen image) lives here. Wikipedia, maps, and manuals do not.",
		wiring: ["Seats in the Pi 5 card slot. No harness."],
		warnings: ["A2-rated. Do not cheap out on a random card — boot corruption in the field is a dead deck.", "The sheet links a 256 GB Extreme; the spec is 128 GB A2. Either works if it is A2. Keep the OS image under ~32 GB so clones stay easy."],
		notes: ["Clone the card the night before the 20 April 2027 demo. Carry the clone in the lid pocket."]
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
		summary: "Already in the laser-cutter room. The only approved charger. Balance-charges the 3S pack outside the case.",
		wiring: ["Disconnect the EC5 adapter from the deck first.", "Pack main lead + balance lead into the B6. Charge in the LiPo bag, on a non-flammable surface, attended."],
		warnings: ["Never charge through the XT60 harness while the Pi is connected.", "Never charge unattended or inside a closed Pelican."],
		notes: ["Price on the sheet is $0 because the school already has it."]
	},
	bag: {
		id: "bag",
		name: "LiPo safe bag",
		short: "Safe bag",
		kicker: "Fire containment",
		status: "required",
		zone: "charge",
		price: 13,
		summary: "Zeee fireproof bag. The pack lives in it inside the left zone, and it comes out with the pack for every charge.",
		wiring: ["No electrical connection. Mechanical only."],
		warnings: ["Not optional. A Pelican will not contain a LiPo fire — it will hold the heat in."],
		notes: ["Velcro the bag to the left-zone tray so the pack cannot slide into the Pi."]
	}
};
var WIRES$1 = [
	{
		id: "w-ec5",
		from: "lipo",
		to: "adapter",
		kind: "pos11",
		gauge: "EC5",
		label: "EC5 +",
		detail: "Battery EC5 positive into the adapter pigtail."
	},
	{
		id: "w-xt60",
		from: "adapter",
		to: "switch",
		kind: "pos11",
		gauge: "XT60",
		label: "XT60 +  18 AWG",
		detail: "Adapter XT60 male to the panel switch. 18 AWG red."
	},
	{
		id: "w-sw-fuse",
		from: "switch",
		to: "fuse",
		kind: "pos11",
		gauge: "18 AWG",
		label: "18 AWG red",
		detail: "Switched 11.1 V positive to the ATC holder."
	},
	{
		id: "w-fuse-buck",
		from: "fuse",
		to: "buck",
		kind: "pos11",
		gauge: "18 AWG",
		label: "VIN+",
		detail: "Fused 11.1 V into DROK VIN+."
	},
	{
		id: "w-gnd-pack",
		from: "lipo",
		to: "buck",
		kind: "gnd",
		gauge: "18 AWG",
		label: "18 AWG black  unswitched",
		detail: "Pack negative to buck VIN−. Not switched, not fused."
	},
	{
		id: "w-gnd-pi",
		from: "buck",
		to: "pi",
		kind: "gnd",
		gauge: "18 AWG",
		label: "GND",
		detail: "Buck VOUT− to Pi USB-C GND / pigtail ground."
	},
	{
		id: "w-5v-pi",
		from: "buck",
		to: "pi",
		kind: "v5",
		gauge: "USB-C",
		label: "5.1 V  USB-C",
		detail: "Buck screw-terminal 5.1 V to Pi USB-C pigtail. Measure before connecting."
	},
	{
		id: "w-5v-hub",
		from: "buck",
		to: "hub",
		kind: "v5",
		gauge: "18 AWG",
		label: "5.1 V hub PWR",
		detail: "Same 5.1 V rail, second 18 AWG run to the hub power input. Not from a Pi USB port."
	},
	{
		id: "w-usb-up",
		from: "pi",
		to: "hub",
		kind: "usb",
		gauge: "USB-A",
		label: "USB 3 upstream",
		detail: "Pi USB 3 host to hub upstream."
	},
	{
		id: "w-hdmi",
		from: "pi",
		to: "display",
		kind: "hdmi",
		gauge: "HDMI",
		label: "micro-HDMI 0",
		detail: "Pi micro-HDMI port 0 to Elecrow HDMI in. Service loop at the hinge."
	},
	{
		id: "w-usb-disp",
		from: "hub",
		to: "display",
		kind: "usb",
		gauge: "USB-A",
		label: "Touch + 5 V",
		detail: "Hub downstream to panel USB (HID touch and backlight power)."
	},
	{
		id: "w-usb-ssd",
		from: "hub",
		to: "ssd",
		kind: "usb",
		gauge: "USB-C",
		label: "USB 3.2",
		detail: "Hub USB 3 to Crucial X9."
	},
	{
		id: "w-usb-kbd",
		from: "hub",
		to: "keyboard",
		kind: "usb",
		gauge: "USB-A",
		label: "2.4 GHz dongle",
		detail: "K400 dongle in a hub USB-A port."
	},
	{
		id: "w-usb-esp",
		from: "hub",
		to: "esp32",
		kind: "usb",
		gauge: "USB-A",
		label: "USB only",
		detail: "Optional Marauder. Dashed. Not in v1 permanent layout.",
		optional: true
	},
	{
		id: "w-fan",
		from: "cooler",
		to: "pi",
		kind: "fan",
		gauge: "JST",
		label: "J16 PWM",
		detail: "Active Cooler fan lead on the Pi J16 header."
	},
	{
		id: "w-xt60-future",
		from: "adapter",
		to: "xt60panel",
		kind: "optional",
		gauge: "XT60",
		label: "deferred",
		detail: "Future bulkhead charge port. Not landed in v1.",
		optional: true
	}
];
var BOM = [
	{
		id: "b-case",
		name: "Pelican 1500 Protector Case",
		price: 200,
		category: "enclosure",
		spec: "16.75\" × 11.18\" × 6.12\" interior · sealed",
		note: "Lid takes the panel. Base splits into battery / Pi / electronics."
	},
	{
		id: "b-pi",
		node: "pi",
		name: "Raspberry Pi 5 8 GB",
		price: 245,
		category: "compute",
		spec: "8 GB BCM2712",
		note: "8 GB not 4 GB — headroom for local AI."
	},
	{
		id: "b-cooler",
		node: "cooler",
		name: "Raspberry Pi Active Cooler",
		price: 7,
		category: "compute",
		spec: "Official J16 PWM cooler",
		note: "Non-negotiable in an enclosed case."
	},
	{
		id: "b-sd",
		node: "sd",
		name: "128 GB A2 microSD",
		price: 58,
		category: "compute",
		spec: "A2 · OS only",
		note: "Sheet links a 256 GB Extreme; spec is 128 GB A2. Either is fine if A2."
	},
	{
		id: "b-ssd",
		node: "ssd",
		name: "Crucial X9 1 TB SSD",
		price: 191,
		category: "io",
		spec: "USB 3.2 · up to 1050 MB/s",
		note: "Wikipedia, maps, manuals, RAG data. Never an HDD."
	},
	{
		id: "b-display",
		node: "display",
		name: "Elecrow 10.1\" IPS 1280×800",
		price: 66,
		category: "io",
		spec: "HDMI video · USB touch",
		note: "Fits the Pelican 1500 lid."
	},
	{
		id: "b-kbd",
		node: "keyboard",
		name: "Logitech K400 Plus",
		price: 45,
		category: "io",
		spec: "2.4 GHz · trackpad",
		note: "Parks in the base when the lid shuts."
	},
	{
		id: "b-lipo",
		node: "lipo",
		name: "Venom VEN15187 3S 10500 mAh",
		price: 170,
		category: "power",
		spec: "11.1 V · 50C · EC5",
		note: "~6–7 h at 15 W average."
	},
	{
		id: "b-adapt",
		node: "adapter",
		name: "EC5 to XT60 adapter",
		price: 11,
		category: "power",
		spec: "EC5 female → XT60 male",
		note: "Buy a 2-pack."
	},
	{
		id: "b-b6",
		node: "charger",
		name: "iMAX B6 balance charger",
		price: 0,
		category: "power",
		spec: "3S balance · school stock",
		note: "Laser-cutter room. Never charge without it."
	},
	{
		id: "b-buck",
		node: "buck",
		name: "DROK buck 9–36 V → 5 V 5 A",
		price: 25,
		category: "power",
		spec: "Adjustable · screw terminals",
		note: "Set 5.1 V with a meter. Do not trust the USB fast-charge jack."
	},
	{
		id: "b-sw",
		node: "switch",
		name: "Waterproof SPST toggle",
		price: 11,
		category: "power",
		spec: "12 V · 30 A · boot cover",
		note: "Panel-mount on the exterior."
	},
	{
		id: "b-fuseh",
		node: "fuse",
		name: "Inline ATC fuse holder",
		price: 12,
		category: "power",
		spec: "Blade holder",
		note: "Between switch and buck."
	},
	{
		id: "b-fuses",
		node: "fuse",
		name: "ATC blade fuses 5–7.5 A",
		price: 8,
		category: "power",
		spec: "5 A spare · 7.5 A primary",
		note: "Local auto-parts store."
	},
	{
		id: "b-18",
		name: "18 AWG silicone wire",
		price: 11,
		category: "wiring",
		spec: "Red + black · tinned",
		note: "All power: pack → switch → fuse → buck → Pi / hub."
	},
	{
		id: "b-22",
		name: "22 AWG silicone wire",
		price: 20,
		category: "wiring",
		spec: "Red + black · 20 ft",
		note: "GPIO and signal only. Not for the 5 V rail."
	},
	{
		id: "b-hs",
		name: "Heat-shrink tubing",
		price: 8,
		category: "wiring",
		spec: "3:1 adhesive-lined kit",
		note: "Every soldered joint. Do not skip."
	},
	{
		id: "b-xt60p",
		node: "xt60panel",
		name: "XT60 panel-mount socket",
		price: 13,
		category: "optional",
		spec: "XT60E-F bulkhead",
		note: "Deferred. External charging later if needed."
	},
	{
		id: "b-hub",
		node: "hub",
		name: "UGREEN 7-port powered hub",
		price: 50,
		category: "io",
		spec: "5× USB-A + 2× USB-C",
		note: "Must be self-powered from the buck."
	},
	{
		id: "b-bag",
		node: "bag",
		name: "Zeee LiPo safe bag",
		price: 13,
		category: "power",
		spec: "Fireproof charge/storage bag",
		note: "Not optional with a LiPo."
	},
	{
		id: "b-ties",
		name: "Zip ties + Velcro",
		price: 7,
		category: "hardware",
		spec: "Mixed",
		note: "Zip ties for fixed runs, Velcro for anything you undo."
	},
	{
		id: "b-m25",
		name: "M2.5 screw / standoff kit",
		price: 16,
		category: "hardware",
		spec: "Pi board holes are M2.5",
		note: "Do not mount the Pi with M3."
	},
	{
		id: "b-m3",
		name: "LuKaiSen M2–M5 screw kit",
		price: 17,
		category: "hardware",
		spec: "~780–860 pc socket kit",
		note: "Brackets and structural mounts."
	},
	{
		id: "b-inserts",
		name: "Brass heat-set inserts M2–M5",
		price: 14,
		category: "hardware",
		spec: "180 pc",
		note: "Every 3D-printed joint. Design in Fusion 360 first."
	},
	{
		id: "b-esp",
		node: "esp32",
		name: "ESP32 Marauder",
		price: 24,
		category: "optional",
		spec: "USB device",
		note: "Optional. USB only, not integrated in v1."
	}
];
var BOM_TOTAL = BOM.reduce((sum, item) => sum + item.price, 0);
var POWER_BUDGET = [
	{
		id: "pi",
		name: "Pi 5 + active cooler",
		watts: 8,
		share: .53
	},
	{
		id: "display",
		name: "Elecrow 10.1\" IPS",
		watts: 4,
		share: .27
	},
	{
		id: "ssd",
		name: "Crucial X9 (active)",
		watts: 2,
		share: .13
	},
	{
		id: "hub",
		name: "Hub + dongle",
		watts: 1,
		share: .07
	}
];
var BUILD_STEPS = [
	{
		id: "s1",
		title: "Dry-fit the case",
		node: null,
		body: "Tape out the three base zones (battery left, Pi center, electronics right) and the lid screen rectangle in the empty Pelican 1500. Confirm the K400 still lays in the base with the lid closed. No printing, no drilling, no power."
	},
	{
		id: "s2",
		title: "Design mounts in Fusion 360",
		node: null,
		body: "Every bracket, the Pi tray, buck sled, fuse clip, and lid bezel is modelled first. Heat-set inserts M2–M5. Pi holes are M2.5. Place intake and exhaust vents with the cooler’s airflow in mind. Print nothing until the layout is locked."
	},
	{
		id: "s3",
		title: "Mount Pi and cooler",
		node: "pi",
		body: "Seat the Active Cooler. Standoff the Pi on M2.5 in the center zone with clearance on both sides. Plug the fan into J16. Leave the USB-C power unplugged."
	},
	{
		id: "s4",
		title: "Mount switch, fuse, buck",
		node: "buck",
		body: "Panel-mount the marine toggle with boot cover. Mount the ATC holder where a blade can be changed. Standoff the DROK in the right zone. No battery connected."
	},
	{
		id: "s5",
		title: "Wire 11.1 V positive",
		node: "switch",
		body: "18 AWG red: XT60 pigtail → switch → fuse → buck VIN+. Heat-shrink every joint. Polarity marked. Switch OFF."
	},
	{
		id: "s6",
		title: "Wire unswitched ground",
		node: "lipo",
		body: "18 AWG black: pack/adapter negative → buck VIN−, then a short run to the 5 V pigtail ground. Ground is never switched."
	},
	{
		id: "s7",
		title: "Set 5.1 V with a meter",
		node: "buck",
		body: "Connect a bench pack or the LiPo through the adapter with the Pi disconnected. Switch on. Measure VOUT. Turn the pot to 5.10–5.15 V. Switch off. If you cannot hold 5.1 V, stop — do not guess."
	},
	{
		id: "s8",
		title: "Land 5 V on the Pi and hub",
		node: "pi",
		body: "USB-C pigtail from buck screw terminals to the Pi. Second 18 AWG 5.1 V run to the hub power input. Do not use the DROK ‘fast charge’ USB jack unless you have measured it at 5.0–5.2 V with no QC negotiation."
	},
	{
		id: "s9",
		title: "Data: HDMI, hub, display, SSD, dongle",
		node: "hub",
		body: "micro-HDMI 0 to the lid panel with a hinge service loop. Hub upstream to Pi USB 3. Hub downstream: display USB, X9, K400 dongle. Velcro the SSD. Zip-tie the fixed 18 AWG runs."
	},
	{
		id: "s10",
		title: "First boot, case open",
		node: "sd",
		body: "OS card in. Battery in the LiPo bag, case open. Switch on. Confirm 5.1 V still holds under load. Watch SoC temperature. If the cooler cannot hold a usable temperature, enlarge vents before the lid ever closes."
	},
	{
		id: "s11",
		title: "Charge discipline",
		node: "charger",
		body: "To charge: switch off, unplug EC5, remove the pack in its bag, iMAX B6 balance charge attended. No in-case charging in v1. XT60 bulkhead stays deferred."
	}
];
var SAFETY_RULES = [
	{
		title: "LiPo is the hazard",
		body: "The pack can dump enormous current into a short and can ignite. It lives in the fireproof bag. It is charged on the B6, attended, never inside a closed Pelican."
	},
	{
		title: "Fuse before the buck",
		body: "Circuit order is pack → switch → 5–7.5 A ATC → buck → Pi. Do not reorder. A fuse on the 5 V side does not protect a pack-side short."
	},
	{
		title: "Switch the positive only",
		body: "The marine toggle breaks 11.1 V red. Black ground is continuous. Switching ground leaves the pack positive live on every terminal inside the case."
	},
	{
		title: "Measure 5.1 V before the Pi",
		body: "The DROK is adjustable and its USB jack may be a fast-charge port. A 9 V QC blip will destroy the Pi 5. Meter the screw terminals every time you touch the pot."
	},
	{
		title: "18 AWG for power, 22 AWG for signals",
		body: "Battery, switch, fuse, buck, Pi, and hub power are 18 AWG silicone. 22 AWG is GPIO only. Heat-shrink every soldered joint."
	},
	{
		title: "Active cooler + vents",
		body: "A sealed Pelican without intake and exhaust will cook the Pi even with the official cooler. Place both vents in Fusion 360. First thermal test is always with the lid open."
	}
];
var CASE_ZONES = [
	{
		id: "left",
		title: "Left · battery",
		body: "Venom 3S in the LiPo bag, EC5 pigtail with a service loop. Nothing metallic loose against the pack."
	},
	{
		id: "center",
		title: "Center · compute",
		body: "Pi 5 on M2.5 standoffs, Active Cooler, airflow clearance both sides. microSD accessible without removing the tray if you can."
	},
	{
		id: "right",
		title: "Right · power + hub",
		body: "Buck, fuse holder, 5 V splits, UGREEN hub, SSD Velcro. Short 18 AWG runs."
	},
	{
		id: "lid",
		title: "Lid · display",
		body: "Elecrow 10.1\" in a printed bezel. HDMI and USB through the hinge with slack."
	},
	{
		id: "base",
		title: "Base · keyboard park",
		body: "K400 Plus lays in the remaining floor when the lid closes. Design foam around that, not after."
	}
];
var WIRE_LEGEND = [
	{
		kind: "pos11",
		label: "11.1 V +",
		hint: "18 AWG red · switched & fused"
	},
	{
		kind: "gnd",
		label: "Ground",
		hint: "18 AWG black · unswitched"
	},
	{
		kind: "v5",
		label: "5.1 V rail",
		hint: "After the buck · Pi + hub"
	},
	{
		kind: "usb",
		label: "USB",
		hint: "Data · hub map"
	},
	{
		kind: "hdmi",
		label: "HDMI",
		hint: "Pi micro-HDMI 0 → panel"
	},
	{
		kind: "fan",
		label: "Fan",
		hint: "J16 PWM"
	},
	{
		kind: "optional",
		label: "Deferred",
		hint: "Dashed · not in v1"
	}
];
function relatedNodes(id) {
	const set = /* @__PURE__ */ new Set();
	if (!id) return set;
	set.add(id);
	for (const w of WIRES$1) if (w.from === id || w.to === id) {
		set.add(w.from);
		set.add(w.to);
	}
	return set;
}
Object.values(NODES);
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function cad(amount) {
	if (amount === 0) return "On hand";
	return new Intl.NumberFormat("en-CA", {
		style: "currency",
		currency: "CAD",
		maximumFractionDigits: 0
	}).format(amount);
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-[opacity,transform,background-color,box-shadow] duration-150 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			secondary: "bg-elevated text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
			ghost: "text-muted hover:bg-elevated hover:text-fg",
			outline: "text-fg shadow-[var(--shadow-border)] hover:bg-elevated",
			danger: "bg-danger text-fg hover:opacity-90"
		},
		size: {
			default: "h-10 px-4",
			sm: "h-8 px-3 text-xs",
			lg: "h-11 px-5",
			icon: "size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Sheet = Dialog;
function SheetContent({ className, children, side = "right", title, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-bg/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed z-50 flex flex-col bg-surface text-fg shadow-[var(--shadow-border)]", "data-[state=open]:animate-in data-[state=closed]:animate-out", side === "right" && "inset-y-0 right-0 h-full w-full max-w-md data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right", side === "bottom" && "inset-x-0 bottom-0 max-h-[80vh] rounded-t-xl data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b border-border px-5 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "font-display text-lg font-semibold tracking-wide uppercase",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "sr-only",
					children: "Wiring notes for the selected part."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
					className: "inline-flex size-10 items-center justify-center rounded-sm text-muted hover:bg-elevated hover:text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: "Close"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-0 flex-1 overflow-y-auto",
			children
		})]
	})] });
}
var KIND_CLASS = {
	pos11: "stroke-wire-pos",
	gnd: "stroke-wire-gnd",
	v5: "stroke-wire-5v",
	usb: "stroke-wire-usb",
	hdmi: "stroke-wire-hdmi",
	fan: "stroke-wire-fan",
	optional: "stroke-wire-opt"
};
var WIRES = [
	{
		id: "w-ec5",
		d: "M222 148 H248",
		kind: "pos11",
		nodes: ["lipo", "adapter"],
		label: {
			x: 235,
			y: 140,
			text: "EC5"
		}
	},
	{
		id: "w-xt60",
		d: "M342 148 H366",
		kind: "pos11",
		nodes: ["adapter", "switch"],
		label: {
			x: 354,
			y: 140,
			text: "XT60"
		}
	},
	{
		id: "w-sw-fuse",
		d: "M476 148 H500",
		kind: "pos11",
		nodes: ["switch", "fuse"]
	},
	{
		id: "w-fuse-buck",
		d: "M596 148 H620",
		kind: "pos11",
		nodes: ["fuse", "buck"],
		label: {
			x: 608,
			y: 140,
			text: "VIN+"
		}
	},
	{
		id: "w-gnd-pack",
		d: "M222 262 H620",
		kind: "gnd",
		nodes: [
			"lipo",
			"adapter",
			"buck"
		],
		label: {
			x: 420,
			y: 278,
			text: "18 AWG BLACK · UNSWITCHED"
		}
	},
	{
		id: "w-5v-pi",
		d: "M820 148 H858",
		kind: "v5",
		nodes: ["buck", "pi"],
		label: {
			x: 839,
			y: 140,
			text: "5.1 V"
		}
	},
	{
		id: "w-gnd-pi",
		d: "M820 262 H858",
		kind: "gnd",
		nodes: ["buck", "pi"]
	},
	{
		id: "w-5v-hub",
		d: "M820 200 H840 V422 H858",
		kind: "v5",
		nodes: ["buck", "hub"],
		label: {
			x: 792,
			y: 360,
			text: "HUB PWR"
		}
	},
	{
		id: "w-usb-up",
		d: "M978 300 V360",
		kind: "usb",
		nodes: ["pi", "hub"],
		label: {
			x: 1020,
			y: 332,
			text: "USB 3"
		}
	},
	{
		id: "w-hdmi",
		d: "M1098 118 H1138",
		kind: "hdmi",
		nodes: ["pi", "display"],
		label: {
			x: 1118,
			y: 110,
			text: "HDMI"
		}
	},
	{
		id: "w-usb-disp",
		d: "M1098 400 H1118 V228 H1270",
		kind: "usb",
		nodes: ["hub", "display"],
		label: {
			x: 1124,
			y: 250,
			text: "TOUCH"
		}
	},
	{
		id: "w-usb-ssd",
		d: "M1098 394 H1138",
		kind: "usb",
		nodes: ["hub", "ssd"]
	},
	{
		id: "w-usb-kbd",
		d: "M1098 478 H1138",
		kind: "usb",
		nodes: ["hub", "keyboard"]
	},
	{
		id: "w-usb-esp",
		d: "M1098 558 H1138",
		kind: "usb",
		nodes: ["hub", "esp32"],
		optional: true
	},
	{
		id: "w-fan",
		d: "M978 64 V72",
		kind: "fan",
		nodes: ["cooler", "pi"]
	},
	{
		id: "w-xt60-future",
		d: "M421 104 V64",
		kind: "optional",
		nodes: [
			"adapter",
			"xt60panel",
			"switch"
		],
		optional: true,
		label: {
			x: 433,
			y: 86,
			text: "V1 OFF"
		}
	}
];
function Wire({ wire, active, dim, flow }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		className: cn("transition-opacity duration-150", dim && "opacity-20"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: wire.d,
				className: "fill-none stroke-bg",
				strokeWidth: 7,
				strokeLinejoin: "round",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: wire.d,
				className: cn("fill-none", KIND_CLASS[wire.kind], wire.optional && "schematic-optional", flow && active && "wire-flow"),
				strokeWidth: active ? 3.2 : 2.2,
				strokeLinejoin: "round",
				strokeLinecap: "round"
			}),
			wire.label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: wire.label.x,
				y: wire.label.y,
				textAnchor: "middle",
				className: "fill-subtle",
				style: {
					fontFamily: "var(--font-display)",
					fontSize: 10,
					letterSpacing: "0.12em"
				},
				children: wire.label.text
			}) : null
		]
	});
}
function Junction({ x, y, dim }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: x,
		cy: y,
		r: 3.4,
		className: cn("fill-fg stroke-bg transition-opacity duration-150", dim && "opacity-20"),
		strokeWidth: 1.5
	});
}
function Device({ id, x, y, w, h, kicker, title, lines, selected, related, optional, onSelect }) {
	const isSel = selected === id;
	const dim = Boolean(selected && !related.has(id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		transform: `translate(${x} ${y})`,
		className: cn("cursor-pointer transition-opacity duration-150", dim && "opacity-25"),
		onClick: (e) => {
			e.stopPropagation();
			onSelect(id);
		},
		onMouseDown: (e) => e.preventDefault(),
		onKeyDown: (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				onSelect(id);
			}
		},
		tabIndex: 0,
		role: "button",
		"aria-pressed": isSel,
		"aria-label": title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: w,
				height: h,
				rx: 10,
				className: cn("fill-elevated stroke-fg/20 transition-[stroke,fill] duration-150", isSel && "fill-surface stroke-accent", optional && "schematic-optional"),
				strokeWidth: isSel ? 2 : 1
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: 14,
				y: 22,
				className: "fill-subtle",
				style: {
					fontFamily: "var(--font-display)",
					fontSize: 11,
					letterSpacing: "0.16em"
				},
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: 14,
				y: 44,
				className: "fill-fg",
				style: {
					fontFamily: "var(--font-display)",
					fontSize: 20,
					fontWeight: 600,
					letterSpacing: "0.04em"
				},
				children: title
			}),
			lines?.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: 14,
				y: 66 + i * 16,
				className: "fill-muted",
				style: {
					fontFamily: "var(--font-sans)",
					fontSize: 11
				},
				children: line
			}, line))
		]
	});
}
function SchematicSvg({ selected, onSelect, flow }) {
	const related = relatedNodes(selected);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 1440 780",
		className: "block h-auto w-full min-w-[56rem] select-none md:min-w-0",
		preserveAspectRatio: "xMidYMin meet",
		role: "img",
		"aria-label": "FIELD DECK wiring schematic. Click a block for details.",
		onClick: () => onSelect(null),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "1440",
				height: "780",
				className: "fill-surface"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", {
				id: "sch-grid",
				width: "24",
				height: "24",
				patternUnits: "userSpaceOnUse",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "1",
					cy: "1",
					r: "0.8",
					className: "fill-fg/10"
				})
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "1440",
				height: "780",
				fill: "url(#sch-grid)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: 36,
				y: 48,
				className: "fill-subtle",
				style: {
					fontFamily: "var(--font-display)",
					fontSize: 13,
					letterSpacing: "0.22em"
				},
				children: "11.1 V PACK  ·  SWITCHED POSITIVE  ·  18 AWG"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: 860,
				y: 18,
				className: "fill-subtle",
				style: {
					fontFamily: "var(--font-display)",
					fontSize: 13,
					letterSpacing: "0.22em"
				},
				children: "5.1 V RAIL  ·  COMPUTE  ·  LID I/O"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: 860,
				y: 348,
				className: "fill-subtle",
				style: {
					fontFamily: "var(--font-display)",
					fontSize: 13,
					letterSpacing: "0.22em"
				},
				children: "USB MAP  ·  HUB IS SELF-POWERED"
			}),
			WIRES.map((wire) => {
				const lit = !selected || wire.nodes.includes(selected);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wire, {
					wire,
					active: lit,
					dim: Boolean(selected) && !lit,
					flow
				}, wire.id);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Junction, {
				x: 222,
				y: 148,
				dim: Boolean(selected && !related.has("lipo"))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Junction, {
				x: 222,
				y: 262,
				dim: Boolean(selected && !related.has("lipo"))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Junction, {
				x: 620,
				y: 148,
				dim: Boolean(selected && !related.has("buck"))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Junction, {
				x: 620,
				y: 262,
				dim: Boolean(selected && !related.has("buck"))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Junction, {
				x: 820,
				y: 148,
				dim: Boolean(selected && !related.has("buck"))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Junction, {
				x: 820,
				y: 200,
				dim: Boolean(selected && !related.has("buck"))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Junction, {
				x: 820,
				y: 262,
				dim: Boolean(selected && !related.has("buck"))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Junction, {
				x: 1098,
				y: 400,
				dim: Boolean(selected && !related.has("hub"))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Device, {
				id: "xt60panel",
				x: 366,
				y: 22,
				w: 110,
				h: 42,
				kicker: "Deferred",
				title: "XT60 PORT",
				selected,
				related,
				optional: true,
				onSelect
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Device, {
				id: "cooler",
				x: 910,
				y: 22,
				w: 136,
				h: 42,
				kicker: "Required",
				title: "ACTIVE COOLER",
				selected,
				related,
				onSelect
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Device, {
				id: "lipo",
				x: 36,
				y: 90,
				w: 186,
				h: 200,
				kicker: "Energy · left zone",
				title: "VENOM 3S",
				lines: [
					"11.1 V  ·  10 500 mAh",
					"50C  ·  ~116 Wh",
					"EC5 on pack",
					"Bag in left bay"
				],
				selected,
				related,
				onSelect
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Device, {
				id: "adapter",
				x: 248,
				y: 118,
				w: 94,
				h: 60,
				kicker: "Adapt",
				title: "EC5→XT60",
				selected,
				related,
				onSelect
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Device, {
				id: "switch",
				x: 366,
				y: 104,
				w: 110,
				h: 88,
				kicker: "Panel SPST",
				title: "MASTER",
				lines: ["Positive only"],
				selected,
				related,
				onSelect
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Device, {
				id: "fuse",
				x: 500,
				y: 118,
				w: 96,
				h: 60,
				kicker: "ATC",
				title: "7.5 A",
				selected,
				related,
				onSelect
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Device, {
				id: "buck",
				x: 620,
				y: 90,
				w: 200,
				h: 200,
				kicker: "DROK buck",
				title: "5.1 V  5 A",
				lines: [
					"IN  9–36 V",
					"OUT  set 5.10 V",
					"Screw terminals",
					"Not the QC USB jack"
				],
				selected,
				related,
				onSelect
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Device, {
				id: "pi",
				x: 858,
				y: 72,
				w: 240,
				h: 228,
				kicker: "Compute · center",
				title: "PI 5  8 GB",
				lines: [
					"USB-C power  5.1 V",
					"micro-HDMI 0  → lid",
					"USB 3  → hub",
					"M2.5 mounts  ·  J16 fan"
				],
				selected,
				related,
				onSelect
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Device, {
				id: "display",
				x: 1138,
				y: 72,
				w: 266,
				h: 148,
				kicker: "Lid mount",
				title: "ELECROW 10.1",
				lines: ["1280 × 800 IPS", "HDMI in  ·  USB touch"],
				selected,
				related,
				onSelect
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Device, {
				id: "sd",
				x: 858,
				y: 308,
				w: 110,
				h: 40,
				kicker: "OS card",
				title: "microSD",
				selected,
				related,
				onSelect
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Device, {
				id: "bag",
				x: 36,
				y: 308,
				w: 186,
				h: 44,
				kicker: "Fire",
				title: "LIPO SAFE BAG",
				selected,
				related,
				onSelect
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Device, {
				id: "charger",
				x: 36,
				y: 368,
				w: 186,
				h: 88,
				kicker: "Charge path",
				title: "iMAX B6",
				lines: ["Unplug EC5 first", "Never in a closed case"],
				selected,
				related,
				onSelect
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Device, {
				id: "hub",
				x: 858,
				y: 360,
				w: 240,
				h: 120,
				kicker: "Right zone",
				title: "UGREEN HUB",
				lines: ["5× A  +  2× C", "Powered from buck 5.1 V"],
				selected,
				related,
				onSelect
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Device, {
				id: "ssd",
				x: 1138,
				y: 360,
				w: 266,
				h: 68,
				kicker: "Data store",
				title: "CRUCIAL X9  1 TB",
				lines: ["USB 3.2  ·  not the microSD"],
				selected,
				related,
				onSelect
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Device, {
				id: "keyboard",
				x: 1138,
				y: 444,
				w: 266,
				h: 68,
				kicker: "Input",
				title: "K400 PLUS",
				lines: ["Dongle in hub  ·  body parks in base"],
				selected,
				related,
				onSelect
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Device, {
				id: "esp32",
				x: 1138,
				y: 528,
				w: 266,
				h: 60,
				kicker: "Optional v1",
				title: "ESP32 MARAUDER",
				lines: ["USB only  ·  not integrated"],
				selected,
				related,
				optional: true,
				onSelect
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				transform: "translate(36 640)",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						width: "420",
						height: "112",
						rx: "10",
						className: "fill-elevated stroke-border",
						strokeWidth: 1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: 16,
						y: 28,
						className: "fill-subtle",
						style: {
							fontFamily: "var(--font-display)",
							fontSize: 11,
							letterSpacing: "0.2em"
						},
						children: "TITLE BLOCK"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: 16,
						y: 56,
						className: "fill-fg",
						style: {
							fontFamily: "var(--font-display)",
							fontSize: 28,
							fontWeight: 600,
							letterSpacing: "0.08em"
						},
						children: "FIELD DECK"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: 16,
						y: 78,
						className: "fill-muted",
						style: {
							fontFamily: "var(--font-sans)",
							fontSize: 12
						},
						children: "DWG 1500-PWR-001  ·  REV A  ·  PELICAN 1500"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: 16,
						y: 96,
						className: "fill-subtle",
						style: {
							fontFamily: "var(--font-sans)",
							fontSize: 11
						},
						children: "Grade 12 capstone  ·  live demo 20 Apr 2027  ·  ~$1,242 CAD"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				transform: "translate(480 640)",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						width: "340",
						height: "112",
						rx: "10",
						className: "fill-elevated stroke-border",
						strokeWidth: 1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: 16,
						y: 28,
						className: "fill-subtle",
						style: {
							fontFamily: "var(--font-display)",
							fontSize: 11,
							letterSpacing: "0.2em"
						},
						children: "CIRCUIT ORDER"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: 16,
						y: 54,
						className: "fill-fg",
						style: {
							fontFamily: "var(--font-sans)",
							fontSize: 13
						},
						children: "Pack → toggle → 7.5 A ATC → buck → Pi"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: 16,
						y: 76,
						className: "fill-muted",
						style: {
							fontFamily: "var(--font-sans)",
							fontSize: 12
						},
						children: "Ground is continuous. Heat-shrink every joint."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: 16,
						y: 96,
						className: "fill-muted",
						style: {
							fontFamily: "var(--font-sans)",
							fontSize: 12
						},
						children: "Set 5.10 V with a meter before the Pi lands."
					})
				]
			})
		]
	});
}
var badgeVariants = cva("inline-flex items-center rounded-sm px-2 py-0.5 font-display text-xs font-semibold uppercase tracking-[0.14em]", {
	variants: { variant: {
		default: "bg-elevated text-muted shadow-[var(--shadow-border)]",
		accent: "bg-accent text-accent-fg",
		danger: "bg-danger/15 text-danger",
		ok: "bg-ok/15 text-ok",
		warn: "bg-warn/15 text-warn",
		pos: "bg-wire-pos/15 text-wire-pos",
		v5: "bg-wire-5v/15 text-wire-5v",
		gnd: "bg-elevated text-muted"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function Separator({ className, orientation = "horizontal", decorative = true, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		decorative,
		orientation,
		className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-px w-full" : "h-full w-px", className),
		...props
	});
}
var KIND_BADGE = {
	pos11: "pos",
	gnd: "gnd",
	v5: "v5",
	usb: "default",
	hdmi: "default",
	fan: "ok",
	optional: "warn"
};
var STATUS_BADGE = {
	required: "ok",
	optional: "warn",
	deferred: "default"
};
function Inspector({ selected }) {
	if (!selected) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5 p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xs font-semibold uppercase tracking-[0.2em] text-subtle",
				children: "Inspector"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl font-semibold tracking-wide text-fg",
				children: "Select a block"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: "Click any device on the schematic to see how it is wired, which gauge to use, and the mistakes that kill a Pi 5 or a 3S pack. The 11.1 V path reads left to right. USB hangs under the hub."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "space-y-3 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Red 18 AWG is switched, fused pack-positive." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Black 18 AWG is unswitched ground." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Sage is the 5.1 V rail after the buck." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Dashed blocks are optional or deferred." })
				]
			})
		]
	});
	const node = NODES[selected];
	const wires = WIRES$1.filter((w) => w.from === selected || w.to === selected);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5 p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: STATUS_BADGE[node.status],
						children: node.status
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: node.zone }),
					node.price !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "accent",
						children: cad(node.price)
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xs font-semibold uppercase tracking-[0.2em] text-subtle",
				children: node.kicker
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-3xl font-semibold tracking-wide text-fg",
				children: node.name
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: node.summary
			}),
			(node.voltage || node.current || node.connector) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-1 gap-3 rounded-md bg-elevated p-4 text-sm shadow-[var(--shadow-border)]",
				children: [
					node.voltage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "font-display text-[11px] uppercase tracking-[0.16em] text-subtle",
						children: "Voltage"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 text-fg",
						children: node.voltage
					})] }) : null,
					node.current ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "font-display text-[11px] uppercase tracking-[0.16em] text-subtle",
						children: "Current"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 text-fg",
						children: node.current
					})] }) : null,
					node.connector ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "font-display text-[11px] uppercase tracking-[0.16em] text-subtle",
						children: "Connector"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 text-fg",
						children: node.connector
					})] }) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "mb-2 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.16em] text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cable, { className: "size-4 text-muted" }), "Harness"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: node.wiring.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-sm leading-relaxed text-muted",
					children: line
				}, line))
			})] }),
			wires.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "mb-2 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.16em] text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlugZap, { className: "size-4 text-muted" }), "Nets"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: wires.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-baseline gap-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: KIND_BADGE[w.kind],
							children: w.gauge
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: w.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: w.detail
						})
					]
				}, w.id))
			})] }) : null,
			node.warnings.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-md bg-danger/10 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "mb-2 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.16em] text-danger",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4" }), "Watch"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: node.warnings.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-sm leading-relaxed text-fg/90",
						children: line
					}, line))
				})]
			}) : null,
			node.notes.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "mb-2 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.16em] text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-4 text-muted" }), "Notes"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: node.notes.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-sm leading-relaxed text-muted",
					children: line
				}, line))
			})] }) : null
		]
	});
}
var HOTSPOTS = [
	{
		id: "bag",
		x: 28,
		y: 118,
		w: 150,
		h: 210,
		label: "LIPO + BAG"
	},
	{
		id: "pi",
		x: 198,
		y: 128,
		w: 210,
		h: 168,
		label: "PI 5 + COOLER"
	},
	{
		id: "buck",
		x: 428,
		y: 118,
		w: 120,
		h: 90,
		label: "BUCK"
	},
	{
		id: "fuse",
		x: 560,
		y: 118,
		w: 70,
		h: 70,
		label: "FUSE"
	},
	{
		id: "hub",
		x: 428,
		y: 220,
		w: 202,
		h: 108,
		label: "HUB + SSD"
	},
	{
		id: "keyboard",
		x: 80,
		y: 348,
		w: 520,
		h: 70,
		label: "K400 PARK"
	},
	{
		id: "display",
		x: 120,
		y: 28,
		w: 460,
		h: 64,
		label: "LID · 10.1\" PANEL"
	},
	{
		id: "switch",
		x: 640,
		y: 200,
		w: 36,
		h: 70,
		label: "SW"
	}
];
function CasePlan({ selected, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.8fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto rounded-lg bg-surface p-3 shadow-[var(--shadow-border)] sm:p-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 700 460",
				className: "h-auto w-full min-w-[28rem]",
				role: "img",
				"aria-label": "Pelican 1500 interior layout. Click a zone.",
				onClick: () => onSelect(null),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						width: "700",
						height: "460",
						className: "fill-surface"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "16",
						y: "16",
						width: "668",
						height: "428",
						rx: "28",
						className: "fill-elevated stroke-border",
						strokeWidth: 2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "28",
						y: "28",
						width: "644",
						height: "404",
						rx: "18",
						className: "fill-bg stroke-border",
						strokeWidth: 1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: 44,
						y: 52,
						className: "fill-subtle",
						style: {
							fontFamily: "var(--font-display)",
							fontSize: 12,
							letterSpacing: "0.2em"
						},
						children: "PELICAN 1500  ·  16.75\" × 11.18\" × 6.12\""
					}),
					HOTSPOTS.map((h) => {
						const on = selected === h.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							className: "cursor-pointer",
							onClick: (e) => {
								e.stopPropagation();
								onSelect(h.id);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: h.x,
								y: h.y,
								width: h.w,
								height: h.h,
								rx: 10,
								className: cn("stroke-border fill-elevated/80 transition-[stroke,fill] duration-150", on && "fill-accent/15 stroke-accent"),
								strokeWidth: on ? 2 : 1
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
								x: h.x + 12,
								y: h.y + 22,
								className: on ? "fill-accent" : "fill-muted",
								style: {
									fontFamily: "var(--font-display)",
									fontSize: 13,
									letterSpacing: "0.12em"
								},
								children: h.label
							})]
						}, h.id);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: 44,
						y: 108,
						className: "fill-subtle",
						style: {
							fontFamily: "var(--font-display)",
							fontSize: 11,
							letterSpacing: "0.18em"
						},
						children: "LEFT"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: 250,
						y: 118,
						className: "fill-subtle",
						style: {
							fontFamily: "var(--font-display)",
							fontSize: 11,
							letterSpacing: "0.18em"
						},
						children: "CENTER · AIRFLOW"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: 448,
						y: 108,
						className: "fill-subtle",
						style: {
							fontFamily: "var(--font-display)",
							fontSize: 11,
							letterSpacing: "0.18em"
						},
						children: "RIGHT"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M198 200 H198" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: 210,
						y: 320,
						className: "fill-ok",
						style: {
							fontFamily: "var(--font-display)",
							fontSize: 11,
							letterSpacing: "0.14em"
						},
						children: "INTAKE →"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: 330,
						y: 320,
						className: "fill-ok",
						style: {
							fontFamily: "var(--font-display)",
							fontSize: 11,
							letterSpacing: "0.14em"
						},
						children: "← EXHAUST"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: 210,
						y: 336,
						className: "fill-subtle",
						style: {
							fontFamily: "var(--font-sans)",
							fontSize: 10
						},
						children: "Exact vent holes land in Fusion 360. Do not skip them."
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: CASE_ZONES.map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-md bg-surface p-4 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-sm font-semibold uppercase tracking-[0.16em] text-fg",
					children: z.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: z.body
				})]
			}, z.id))
		})]
	});
}
function BuildSequence({ selected, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "space-y-3",
		children: BUILD_STEPS.map((step, i) => {
			const active = step.node !== null && step.node === selected;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onSelect(step.node),
				className: cn("flex w-full gap-4 rounded-md bg-surface p-4 text-left shadow-[var(--shadow-border)] transition-[box-shadow,background-color] duration-150", "hover:shadow-[var(--shadow-border-hover)]", active && "bg-elevated shadow-[var(--shadow-border-hover)]"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-2xl font-semibold tabular-nums text-subtle",
					children: String(i + 1).padStart(2, "0")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block font-display text-lg font-semibold tracking-wide text-fg",
					children: step.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block text-sm leading-relaxed text-muted",
					children: step.body
				})] })]
			}) }, step.id);
		})
	});
}
var CATEGORY = {
	enclosure: "Enclosure",
	compute: "Compute",
	power: "Power",
	io: "I/O",
	wiring: "Wiring",
	hardware: "Hardware",
	optional: "Optional"
};
function PartsList({ selected, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-lg bg-surface p-5 shadow-[var(--shadow-border)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xs font-semibold uppercase tracking-[0.2em] text-subtle",
					children: "Power budget · 15 W design load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 space-y-3",
					children: POWER_BUDGET.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex items-baseline justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: row.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums text-muted",
							children: [row.watts, " W"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-1.5 overflow-hidden rounded-full bg-elevated",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-ok",
							style: { width: `${Math.round(row.share * 100)}%` }
						})
					})] }, row.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: "Pack energy 116.5 Wh. At 15 W and ~90% buck efficiency that is about 7 hours; 80% usable LiPo capacity lands on the specified 6–7 hours."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto rounded-lg bg-surface shadow-[var(--shadow-border)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[40rem] text-left text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-display text-xs font-semibold uppercase tracking-[0.16em] text-subtle",
								children: "Part"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-display text-xs font-semibold uppercase tracking-[0.16em] text-subtle",
								children: "Group"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-display text-xs font-semibold uppercase tracking-[0.16em] text-subtle",
								children: "Spec"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 text-right font-display text-xs font-semibold uppercase tracking-[0.16em] text-subtle",
								children: "CAD"
							})
						]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: BOM.map((item) => {
						const active = item.node && item.node === selected;
						const clickable = Boolean(item.node);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: cn("border-b border-border/80 last:border-0", clickable && "cursor-pointer hover:bg-elevated", active && "bg-elevated"),
							onClick: () => onSelect(item.node ?? null),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3 align-top",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-fg",
										children: item.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 text-xs leading-relaxed text-muted",
										children: item.note
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 align-top",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: CATEGORY[item.category] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 align-top text-muted",
									children: item.spec
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 align-top text-right tabular-nums text-fg",
									children: cad(item.price)
								})
							]
						}, item.id);
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tfoot", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-4 font-display text-sm font-semibold uppercase tracking-[0.14em] text-fg",
						colSpan: 3,
						children: "Sheet total"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-4 text-right font-display text-lg font-semibold tabular-nums text-fg",
						children: cad(BOM_TOTAL)
					})] }) })
				]
			})
		})]
	});
}
function SafetyPanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 md:grid-cols-2",
		children: [SAFETY_RULES.map((rule) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-lg bg-surface p-5 shadow-[var(--shadow-border)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "flex items-center gap-2 font-display text-lg font-semibold tracking-wide text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 text-danger" }), rule.title]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-muted",
				children: rule.body
			})]
		}, rule.title)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-lg bg-danger/10 p-5 md:col-span-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-semibold tracking-wide text-danger",
				children: "First power-on is a procedure, not a moment"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-fg/90",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Switch off. Pi USB-C unplugged. Meter on buck VOUT." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Mate EC5. Switch on. Confirm 5.10–5.15 V. Switch off." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Land USB-C. Case open. Pack in the bag. Switch on." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Confirm the hub enumerates, the panel lights, the cooler spins." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "If anything smells, sags below 5.0 V, or the SoC races past 85 °C — switch off." })
				]
			})]
		})]
	});
}
var DOT = {
	pos11: "bg-wire-pos",
	gnd: "bg-wire-gnd",
	v5: "bg-wire-5v",
	usb: "bg-wire-usb",
	hdmi: "bg-wire-hdmi",
	fan: "bg-wire-fan",
	optional: "bg-wire-opt"
};
function WireLegend() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "flex flex-wrap gap-x-4 gap-y-2",
		children: WIRE_LEGEND.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex items-center gap-2 text-xs text-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2 rounded-full", DOT[item.kind]) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display uppercase tracking-[0.12em] text-fg",
					children: item.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden sm:inline",
					children: item.hint
				})
			]
		}, item.kind))
	});
}
var TABS = [
	{
		id: "wiring",
		label: "Wiring",
		icon: Activity
	},
	{
		id: "case",
		label: "Case",
		icon: Box
	},
	{
		id: "build",
		label: "Build",
		icon: Workflow
	},
	{
		id: "parts",
		label: "Parts",
		icon: List
	},
	{
		id: "safety",
		label: "Safety",
		icon: Shield
	}
];
function useMobile() {
	const [mobile, setMobile] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(max-width: 767px)");
		const sync = () => setMobile(mq.matches);
		sync();
		mq.addEventListener("change", sync);
		return () => mq.removeEventListener("change", sync);
	}, []);
	return mobile;
}
function DeckApp() {
	const [tab, setTab] = (0, import_react.useState)("wiring");
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [flow, setFlow] = (0, import_react.useState)(true);
	const [sheetOpen, setSheetOpen] = (0, import_react.useState)(false);
	const mobile = useMobile();
	const select = (id) => {
		setSelected(id);
		if (id && mobile === true) setSheetOpen(true);
	};
	const title = (0, import_react.useMemo)(() => selected ? NODES[selected].short : "Overview", [selected]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "no-print border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:px-8 2xl:max-w-[96rem]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-end justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xs font-semibold uppercase tracking-[0.28em] text-subtle",
								children: "Pelican 1500  ·  Grade 12 capstone  ·  20 Apr 2027"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-1 font-display text-4xl font-semibold tracking-[0.12em] text-fg",
								children: "FIELD DECK"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 max-w-2xl text-sm text-muted",
								children: "Pack → switch → fuse → buck → Pi. HDMI to the lid. USB through a self-powered hub."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-sm bg-elevated px-3 py-2 font-display text-xs uppercase tracking-[0.16em] text-muted shadow-[var(--shadow-border)]",
								children: "15 W  ·  6–7 h  ·  18 AWG"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								size: "sm",
								className: "hidden sm:inline-flex",
								onClick: () => window.print(),
								children: "Print"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex flex-wrap gap-1",
						"aria-label": "Views",
						children: TABS.map((item) => {
							const Icon = item.icon;
							const on = tab === item.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setTab(item.id),
								className: cn("inline-flex h-11 items-center gap-2 rounded-sm px-3.5 font-display text-sm font-semibold uppercase tracking-[0.14em] transition-[background-color,color] duration-150", on ? "bg-accent text-accent-fg" : "text-muted hover:bg-elevated hover:text-fg"),
								"aria-current": on ? "page" : void 0,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
							}, item.id);
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-7xl 2xl:max-w-[96rem]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "min-w-0 px-4 py-5 sm:px-6 lg:px-8",
					children: [
						tab === "wiring" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "no-print flex flex-wrap items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WireLegend, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "sm",
										onClick: () => setFlow((v) => !v),
										children: flow ? "Pause flow" : "Trace flow"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative overflow-x-auto rounded-lg shadow-[var(--shadow-border)] md:overflow-x-visible",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SchematicSvg, {
										selected,
										onSelect: select,
										flow
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-surface to-transparent md:hidden" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "no-print text-xs text-subtle",
									children: "Scroll sideways on a phone. Tap a block for the harness notes."
								})
							]
						}) : null,
						tab === "case" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CasePlan, {
							selected,
							onSelect: select
						}) : null,
						tab === "build" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuildSequence, {
							selected,
							onSelect: select
						}) : null,
						tab === "parts" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartsList, {
							selected,
							onSelect: select
						}) : null,
						tab === "safety" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SafetyPanel, {}) : null
					]
				})
			}),
			selected && mobile === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "no-print fixed inset-y-4 right-4 z-40 hidden w-80 overflow-hidden rounded-lg bg-surface shadow-[var(--shadow-border)] md:flex md:flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs font-semibold uppercase tracking-[0.18em] text-subtle",
						children: "Inspector"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "size-10",
						onClick: () => setSelected(null),
						"aria-label": "Close inspector",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-h-0 flex-1 overflow-y-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inspector, { selected })
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: mobile === true && sheetOpen && Boolean(selected),
				onOpenChange: setSheetOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
					side: "bottom",
					title,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inspector, { selected })
				})
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeckApp, {});
}
//#endregion
export { Home as component };
