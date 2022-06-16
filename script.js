let jsonURL = "https://www.luizpicolo.com.br/api.json";
let XHR = new XMLHttpRequest();
XHR.open("GET", jsonURL);
XHR.responseType = "json";
XHR.send();

XHR.onload = function() {
  let noticias = XHR.response;

  //classe definida
  class Noticia {
    constructor(author, publishedAt, title, description, url) {
      this.title = title;
      this.publishedAt = publishedAt;
      this.description = description;
      this.author = author;
      this.url = url;
    }

    //função para mostrar
    mostrarNoticia() {
      return `<div class="centro"><div class="borda"><h1 class="nome">${this.author}
      ${this.publishedAt}</h1>

     <div class="frase"><a href="${this.url}"/>${this.title}</a></div>
      ${this.description}</div></div><div id="pular"></div>`;
    }
  }

  //class com herança
  class NoticiaDestaque extends Noticia {
    constructor(author, publishedAt, title, urlToImage, description, url) {
      super(author, publishedAt, title, description, url)
      this.urlToImage = urlToImage;
    }

    mostrarDes() {
      return `<div class="centro"><div id="espaco"><div id="info">${this.author}
      ${this.publishedAt}</div></div>
      
       <div class="titulo">${this.title}</h1></div>
<div class="nDestaque"><a href="${this.url}"><img src="${this.urlToImage}" class="foto" alt=""/></a>
          <div id="dec">ㅤ</div>
      <p>${this.description}</p></div></div>`;
    }
  }

  //mostrar no html
  const elemento = document.getElementById('gerar');
  noticias.articles.forEach(noticia => {

    //objeto criado
    let noticia_nova = new Noticia(noticia.author, noticia.publishedAt, noticia.title, noticia.description, noticia.url);
    elemento.insertAdjacentHTML('afterbegin', noticia_nova.mostrarNoticia());
  });

  //objeto destaque
  let noticia_des = new NoticiaDestaque(noticias.articles[0].author, noticias.articles[0].publishedAt, noticias.articles[0].title, noticias.articles[0].urlToImage, noticias.articles[0].description, noticias.articles[0].url);
  elemento.insertAdjacentHTML('afterbegin', noticia_des.mostrarDes());
}
