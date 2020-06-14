
const static_header = `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<div class="header" id="header" >
	<a id="headerHome" href="./index.html">Accueil</a>
	<a id="headerEnSavoirPlus" href="./enSavoirPlus.html">en savoir plus</a>
	<a id="headerAVousDeJouer" href="./aVousDeJouer.html">à vous de jouer</a>
	<a href="javascript:void(0);" class="icon" onclick="expend()">
		<i class="fa fa-bars"></i>
	</a>
	<img alt="logo" src="./logo-adoptLife.png" >
</div>

<link rel="stylesheet" type="text/css"  href="./components/header.css">
`

const static_footer = `
<!DOCTYPE html>

<div class="footer" >
	<a href="./aboutUs.html" >Qui sommes-nous ?</a>
	<div class="socialMediaRow" >
		<!-- <img src="https://iutv.univ-paris13.fr/wp-content/uploads/logo-rond-twitter.png" onclick="goTo('https://twitter.com')" >  pas de compte twitter -->
		<img src="https://www.facebook.com/images/fb_icon_325x325.png" onclick="goTo('https://www.facebook.com/ines.abed.1029')" >
		<img src="https://www.facebook.com/images/fb_icon_325x325.png" onclick="goTo('https://www.facebook.com/safia.benabidallah')" >
		<img src="https://salon-ctco.com/wp-content/uploads/2018/09/Logo-LinkedIn.png" onclick="goTo('https://www.linkedin.com/in/in%C3%A8s-ben-abed-66a594177/')" >
		<img src="https://salon-ctco.com/wp-content/uploads/2018/09/Logo-LinkedIn.png" onclick="goTo('https://www.linkedin.com/in/safia-benabidallah-68a594177/')" >
	</div>
</div>

 <link rel="stylesheet" type="text/css"  href="./components/footer.css">

<script type="text/javascript">
	function goTo(link) {
		console.log(link);
		window.location.href = link
	}
</script>
`

function loadHeader(path) {
	return new Promise(async (resolve, reject) => {
		try {
			let res = await fetch(path);
			let html = await res.text();
			let div = document.getElementById("header");

			if (!div)
				throw new Error(`no div with id 'header'`);
			if (!html)
				throw new Error(`header file wasnt loaded`);

			div.innerHTML = html;
			console.log(html);
			resolve();
		} catch (e) {
			let div = document.getElementById("header");
			div.innerHTML = static_header;
			resolve();
		}
	});
}

function loadFooter(path) {
	return new Promise(async (resolve, reject) => {
		try {
			let res = await fetch(path);
			let html = await res.text();
			let div = document.getElementById("footer");

			if (!div)
				throw new Error(`no div with id 'footer'`);
			if (!html)
				throw new Error(`footer file wasnt loaded`);

			div.innerHTML = html;
			resolve();
		} catch (e) {
			let div = document.getElementById("footer");
			div.innerHTML = static_footer;
			resolve();
		}
	});
}