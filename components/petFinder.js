const api_key = "6qi9nJcEx0TJ5XmG2dzIwS4M6O6U6ZD83Xc6DOvp8irEdDoM5p";
const secret = "7fwZh1DE9Z0f7fsP1s3nPirIMNGoIzAPrVC37mdH";

let token = null; // client token used to make request
let results = null; // not used
let type = null; // type selected by user. used to make query
let age = null; // type selected by user. used to make query
let page = 1; // current loaded page
let callback = null; // callback for displaying animals when loaded

async function logIn() {
	let res = await fetch("https://api.petfinder.com/v2/oauth2/token", {
		method:"POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			grant_type: 'client_credentials',
			client_id: api_key,
			client_secret: secret
		})
	});

	// refresh token
	setTimeout(() => {
		logIn();
	}, 3600000);

	token = (await res.json()).access_token;
	load();
	return token;
}

async function load() {
	const url = `https://api.petfinder.com/v2/animals?page=${page}${type ? `&type=${type}` : ''}${age ? `&age=${age}` : ''}`;
	console.log(url);
	let res = await fetch(url, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`
		},
	});

	_loaded(await res.json());
}

function _loaded(res) {
	callback(res);
}

function onLoad(_callback) {
	callback = _callback;
}

async function getTypes() {
	const url = `https://api.petfinder.com/v2/types`;
	let res = await fetch(url, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`
		},
	});

	return await res.json();
}

function setType(_type) {
	type = _type;
	load();
}

function setAge(_age) {
	age = _age;
	load();
}

function renderAnimals(animal) {
	return (`
		<div class="tableLine" onclick="goTo('${animal.url}')" >
			<div class="tableCell">${animal.photos && animal.photos[0] ?
				`<img src=${animal.photos[0].small} style="height:9vw" >`
				:
				`<img src="./photo-manquante.jpg" style="height:9vw" >`
			}</div>
			<div class="tableCell">${animal.species}</div>
			<div class="tableCell">${animal.breeds.primary ? animal.breeds.primary : 'NA' }${animal.breeds.secondary ? ` / ${animal.breeds.secondary}` : ''}</div>
			<div class="tableCell">${animal.name}</div>
			<div class="tableCell">${animal.age}</div>
		</div>
	`);
}

function display(animals, anchorId) {
	let anchor = document.getElementById(anchorId);

	let html = animals.animals.reduce((acc, e) => {
		acc += renderAnimals(e);
		return acc;
	},
		`<div class="tableHeader">
			<div class="tableCellHeader">photo</div>
			<div class="tableCellHeader">espèce</div>
			<div class="tableCellHeader">race</div>
			<div class="tableCellHeader">nom</div>
			<div class="tableCellHeader">age</div>
		</div>`
	);
	anchor.innerHTML = html;
}

function loading(anchorId) {
	let anchor = document.getElementById(anchorId);
	anchor.innerHTML = `<div class="loader"></div>`;
}