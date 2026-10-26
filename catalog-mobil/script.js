const cars = [
	{
		id: "divo-21", make: "Bugatti", model: "Divo", year: 2021, image: "img/bdivo21.jpg", label: "BOUTIQUE HYPERCAR",
		description: "A focused interpretation of the Chiron, tuned for agility and cornering performance.",
		specs: [["ENGINE", "8.0L quad-turbo W16"], ["POWER", "1,500 PS"], ["TORQUE", "1,600 Nm"], ["0–100 KM/H", "2.4 sec"], ["TOP SPEED", "380 km/h"], ["DRIVETRAIN", "AWD · 7-speed DCT"]],
	},
	{
		id: "chiron-ss-24", make: "Bugatti", model: "Chiron Super Sport", year: 2024, image: "img/bchissp24.jpg", label: "GRAND TOURISME",
		description: "A long-tail grand tourer engineered for immense power and high-speed stability.",
		specs: [["ENGINE", "8.0L quad-turbo W16"], ["POWER", "1,600 PS"], ["TORQUE", "1,600 Nm"], ["0–100 KM/H", "2.4 sec"], ["TOP SPEED", "440 km/h"], ["DRIVETRAIN", "AWD · 7-speed DCT"]],
	},
	{
		id: "chiron-ss-21", make: "Bugatti", model: "Chiron Super Sport", year: 2021, image: "img/bchispne21.jpg", label: "HYPER SPORT",
		description: "The Super Sport pairs the Chiron's W16 powertrain with a body shaped for speed.",
		specs: [["ENGINE", "8.0L quad-turbo W16"], ["POWER", "1,600 PS"], ["TORQUE", "1,600 Nm"], ["0–100 KM/H", "2.4 sec"], ["TOP SPEED", "440 km/h"], ["DRIVETRAIN", "AWD · 7-speed DCT"]],
	},
	{
		id: "chiron-sport-20", make: "Bugatti", model: "Chiron Sport", year: 2020, image: "img/bchisp20.jpg", label: "HYPER SPORT",
		description: "A lighter, sharper Chiron setup with chassis tuning aimed at more responsive handling.",
		specs: [["ENGINE", "8.0L quad-turbo W16"], ["POWER", "1,500 PS"], ["TORQUE", "1,600 Nm"], ["0–100 KM/H", "2.4 sec"], ["TOP SPEED", "420 km/h"], ["DRIVETRAIN", "AWD · 7-speed DCT"]],
	},
	{
		id: "chiron-pur-22", make: "Bugatti", model: "Chiron Pur Sport", year: 2022, image: "img/bchiprsp22.jpg", label: "DRIVER'S HYPERCAR",
		description: "Shorter gearing, reduced weight and a revised chassis make this Chiron especially road-focused.",
		specs: [["ENGINE", "8.0L quad-turbo W16"], ["POWER", "1,500 PS"], ["TORQUE", "1,600 Nm"], ["0–100 KM/H", "2.3 sec"], ["TOP SPEED", "350 km/h"], ["DRIVETRAIN", "AWD · 7-speed DCT"]],
	},
	{
		id: "mistral-25", make: "Bugatti", model: "W16 Mistral", year: 2025, image: "img/w16ml25.jpg", label: "ROADSTER",
		description: "Bugatti's open-top W16 roadster, combining the marque's final W16 evolution with a dramatic design.",
		specs: [["ENGINE", "8.0L quad-turbo W16"], ["POWER", "1,600 PS"], ["TORQUE", "1,600 Nm"], ["0–100 KM/H", "2.4 sec"], ["TOP SPEED", "420 km/h"], ["DRIVETRAIN", "AWD · 7-speed DCT"]],
	},
	{
		id: "mistral-24", make: "Bugatti", model: "W16 Mistral", year: 2024, image: "img/w16ml24.jpg", label: "ROADSTER",
		description: "A roofless hypercar built around the 1,600 PS W16 and designed for an unfiltered open-air drive.",
		specs: [["ENGINE", "8.0L quad-turbo W16"], ["POWER", "1,600 PS"], ["TORQUE", "1,600 Nm"], ["0–100 KM/H", "2.4 sec"], ["TOP SPEED", "420 km/h"], ["DRIVETRAIN", "AWD · 7-speed DCT"]],
	},
	{
		id: "f40-87", make: "Ferrari", model: "F40", year: 1987,
		image: "img/frrri1.jpg",
		label: "ICONIC SUPERCAR",
		description: "The legendary Ferrari F40, defined by its red bodywork, a twin-turbo V8, and an unmistakably raw motorsport character.",
		specs: [["ENGINE", "2.9L twin-turbo V8"], ["POWER", "471 PS"], ["TORQUE", "577 Nm"], ["0–100 KM/H", "4.1 sec"], ["TOP SPEED", "324 km/h"], ["DRIVETRAIN", "RWD · 5-speed manual"]],
	},
	{
		id: "laferrari-red-13", make: "Ferrari", model: "LaFerrari", year: 2013,
		image: "img/frrrri2.jpg",
		label: "HYBRID FLAGSHIP",
		description: "A red LaFerrari with the signature butterfly doors, V12 hybrid power, and dramatic supercar presence from the reference photo.",
		specs: [["ENGINE", "6.3L V12 + electric motor"], ["POWER", "949 PS"], ["TORQUE", "900 Nm"], ["0–100 KM/H", "2.6 sec"], ["TOP SPEED", "350 km/h"], ["DRIVETRAIN", "RWD · 7-speed dual-clutch"]],
	},
	{
		id: "laferrari-black-13", make: "Ferrari", model: "LaFerrari", year: 2013,
		image: "img/frrrri3.jpg",
		label: "BLACK EDITION",
		description: "The black LaFerrari from your reference set, showing the same hypercar proportions and open-door showcase look.",
		specs: [["ENGINE", "6.3L V12 + electric motor"], ["POWER", "949 PS"], ["TORQUE", "900 Nm"], ["0–100 KM/H", "2.6 sec"], ["TOP SPEED", "350 km/h"], ["DRIVETRAIN", "RWD · 7-speed dual-clutch"]],
	},
];

const grid = document.querySelector("#car-grid");
const searchInput = document.querySelector("#search-input");
const sortSelect = document.querySelector("#sort-select");
const resultsCount = document.querySelector("#results-count");
const emptyState = document.querySelector("#empty-state");
const filterButtons = [...document.querySelectorAll(".filter-button")];
const savedCars = new Set(JSON.parse(localStorage.getItem("motorhaus-saved") || "[]"));
const carDialog = document.querySelector("#car-dialog");
const dialogImage = document.querySelector("#dialog-image");
const dialogVisual = document.querySelector("#dialog-visual");
const zoomToggle = document.querySelector("#zoom-toggle");
let activeCarId = "";
let activeMake = "all";

const padCount = (value) => String(value).padStart(2, "0");

function getVisibleCars() {
	const query = searchInput.value.trim().toLowerCase();
	const visible = cars.filter((car) => {
		const matchesMake = activeMake === "all"
			|| (activeMake === "favorites" ? savedCars.has(car.id) : car.make === activeMake);
		const matchesQuery = `${car.make} ${car.model} ${car.year} ${car.label}`.toLowerCase().includes(query);
		return matchesMake && matchesQuery;
	});

	if (sortSelect.value === "newest") visible.sort((a, b) => b.year - a.year);
	if (sortSelect.value === "oldest") visible.sort((a, b) => a.year - b.year);
	if (sortSelect.value === "az") visible.sort((a, b) => `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`));
	return visible;
}

function renderCars() {
	const visibleCars = getVisibleCars();
	resultsCount.textContent = `${padCount(visibleCars.length)} MOBIL`;
	emptyState.hidden = visibleCars.length > 0;
	grid.innerHTML = visibleCars.map((car) => `
		<article class="car-card">
			<button class="car-image-link" type="button" data-view="${car.id}" aria-label="View details for ${car.make} ${car.model}">
				<img class="car-image" src="${car.image}" alt="${car.make} ${car.model} ${car.year}" loading="lazy" />
				<span class="car-index">MH / ${padCount(cars.indexOf(car) + 1)}</span>
			</button>
			<button class="save-button${savedCars.has(car.id) ? " is-saved" : ""}" type="button" data-save="${car.id}" aria-label="${savedCars.has(car.id) ? "Hapus dari" : "Simpan ke"} koleksi tersimpan" aria-pressed="${savedCars.has(car.id)}">
				<span aria-hidden="true">${savedCars.has(car.id) ? "♥" : "♡"}</span>
			</button>
			<div class="car-details">
				<div class="car-class"><span>${car.label}</span></div>
				<h3>${car.make} ${car.model} <span class="card-year">${car.year}</span></h3>
				<button class="car-card-foot car-view-button" type="button" data-view="${car.id}"><span>VIEW DETAILS</span><span aria-hidden="true">↗</span></button>
			</div>
		</article>
	`).join("");
}

function openCarDetails(carId) {
	const car = cars.find((item) => item.id === carId);
	if (!car) return;
	activeCarId = car.id;

	dialogImage.src = car.image;
	dialogImage.alt = `${car.make} ${car.model} ${car.year}`;
	dialogImage.style.setProperty("--pan-x", "0px");
	dialogImage.style.setProperty("--pan-y", "0px");
	document.querySelector("#dialog-image-index").textContent = `KRISJOHN GARAGE / ${padCount(cars.indexOf(car) + 1)}`;
	document.querySelector("#dialog-make").textContent = car.label;
	document.querySelector("#dialog-name").textContent = `${car.make} ${car.model}`;
	document.querySelector("#dialog-description").textContent = car.description;
	document.querySelector("#dialog-year").textContent = car.year;
	const photoCreditWrap = document.querySelector("#dialog-photo-credit-wrap");
	const photoCredit = document.querySelector("#dialog-photo-credit");
	photoCreditWrap.hidden = !car.photoSource;
	if (car.photoSource) {
		photoCredit.href = car.photoSource;
		photoCredit.textContent = car.photoCredit;
	}
	document.querySelector("#dialog-counter").textContent = `${padCount(cars.indexOf(car) + 1)} / ${padCount(cars.length)}`;
	document.querySelector("#dialog-specs").innerHTML = car.specs.map(([name, value]) => `<div class="spec-item"><dt>${name}</dt><dd>${value}</dd></div>`).join("");
	dialogVisual.classList.remove("is-zoomed");
	zoomToggle.setAttribute("aria-pressed", "false");
	zoomToggle.setAttribute("aria-label", "Zoom photo");
	zoomToggle.textContent = "+";
	if (!carDialog.open) carDialog.showModal();
}

function showAdjacentCar(direction) {
	const currentIndex = cars.findIndex((car) => car.id === activeCarId);
	const nextIndex = (currentIndex + direction + cars.length) % cars.length;
	openCarDetails(cars[nextIndex].id);
}

filterButtons.forEach((button) => {
	button.addEventListener("click", () => {
		activeMake = button.dataset.make;
		filterButtons.forEach((item) => {
			const selected = item === button;
			item.classList.toggle("is-active", selected);
			item.setAttribute("aria-pressed", String(selected));
		});
		renderCars();
	});
});

searchInput.addEventListener("input", renderCars);
sortSelect.addEventListener("change", renderCars);

grid.addEventListener("click", (event) => {
	const viewButton = event.target.closest("[data-view]");
	if (viewButton) {
		openCarDetails(viewButton.dataset.view);
		return;
	}

	const button = event.target.closest("[data-save]");
	if (!button) return;

	const { save: carId } = button.dataset;
	if (savedCars.has(carId)) savedCars.delete(carId);
	else savedCars.add(carId);
	localStorage.setItem("motorhaus-saved", JSON.stringify([...savedCars]));
	renderCars();
});

document.querySelector(".feature-cta").addEventListener("click", () => openCarDetails("divo-21"));
document.querySelector("#dialog-close").addEventListener("click", () => carDialog.close());
document.querySelector("#dialog-previous").addEventListener("click", () => showAdjacentCar(-1));
document.querySelector("#dialog-next").addEventListener("click", () => showAdjacentCar(1));
document.addEventListener("keydown", (event) => {
	if (!carDialog.open) return;
	if (event.key === "Escape") {
		event.preventDefault();
		carDialog.close();
	} else if (event.key === "ArrowLeft") {
		showAdjacentCar(-1);
	} else if (event.key === "ArrowRight") {
		showAdjacentCar(1);
	}
});
carDialog.addEventListener("click", (event) => {
	if (event.target === carDialog) carDialog.close();
});
carDialog.addEventListener("close", () => {
	dialogVisual.classList.remove("is-zoomed");
	document.body.classList.remove("dialog-open");
});
carDialog.addEventListener("close", () => {
	if (dialogImage.src) dialogImage.src = "";
});
carDialog.addEventListener("pointermove", (event) => {
	if (!dialogVisual.classList.contains("is-zoomed") || event.pointerType !== "mouse") return;
	const bounds = dialogVisual.getBoundingClientRect();
	const x = (event.clientX - bounds.left) / bounds.width - 0.5;
	const y = (event.clientY - bounds.top) / bounds.height - 0.5;
	dialogImage.style.setProperty("--pan-x", `${x * -38}px`);
	dialogImage.style.setProperty("--pan-y", `${y * -38}px`);
});
dialogVisual.addEventListener("pointerleave", () => {
	dialogImage.style.setProperty("--pan-x", "0px");
	dialogImage.style.setProperty("--pan-y", "0px");
});
zoomToggle.addEventListener("click", () => {
	const zoomed = dialogVisual.classList.toggle("is-zoomed");
	zoomToggle.setAttribute("aria-pressed", String(zoomed));
	zoomToggle.setAttribute("aria-label", zoomed ? "Zoom out photo" : "Zoom photo");
	zoomToggle.textContent = zoomed ? "−" : "+";
});

document.querySelector("#reset-filters").addEventListener("click", () => {
	activeMake = "all";
	searchInput.value = "";
	sortSelect.value = "featured";
	filterButtons.forEach((button, index) => {
		const selected = index === 0;
		button.classList.toggle("is-active", selected);
		button.setAttribute("aria-pressed", String(selected));
	});
	renderCars();
});

document.querySelector("#total-count").textContent = padCount(cars.length);
document.querySelector(".filter-button[data-make='all'] span").textContent = padCount(cars.length);
renderCars();
