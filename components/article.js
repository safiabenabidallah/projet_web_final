
function htmlArticle(article) {
	return (`
		<div class="article" onclick="redirect('${article.link}')" >
			<div class="imgContainer">
				<img src="${article.image}">
			</div>
			<p>${article.title}</p>
		</div>
	`);
}

function htmlArticlesArray(articles) {
	const small_screen = window.innerWidth < 600;
	const articles_per_lines = small_screen ? 2 : 4;

	let i = 0;
	let html = articles.reduce((acc, e) => {
		acc += htmlArticle(e);
		i++;
		if (i === articles_per_lines) {
			acc += `</div><div class="article_line">`
			i = 0;
		}
		return acc;

	}, `<div class="article_line">`);
	html += `</div>`;
	return html;
}

function redirect(link) {
	window.location.href = link;
}
