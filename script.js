function exibeForm() {
    const apresentacaoElement = document.querySelector(".apresentacao");
    apresentacaoElement.innerHTML = `<h1>Letras das músicas ao seu alcance</h1>
    <div class="form">
        <div class="label">
            <label for="banda">
                Banda:
            </label>
            <input type="text" name="banda" required placeholder="Insira o nome da banda ou cantor(a)">
            

        </div>
        <div class="label">

            <label for="musica">
                Musica:
            </label>
            <input type="text" required placeholder="Digite o nome da música" name = "musica">
        </div>
        <a href="#" class = "botao" onclick = "buscaMusica()"><span>
            <img src="./assets/pesquisa.png" alt="pesquisa">
            </span>Buscar letra</a>

    </div>`;
}

async function buscaMusica() {

    const bandaValue = document.querySelector("input[name=banda]").value;
    const musicaValue = document.querySelector("input[name=musica]").value;
    const resultContainer = document.querySelector("#trocar");

    
    

    const url = `https://api.vagalume.com.br/search.php?art=${bandaValue}&mus=${musicaValue}&extra=relmus&apikey={key}`;

    await fetch(url)
        .then(response => response.json())
        .then(datas => {

            resultContainer.classList = "resultado";

            
            const musica = datas.mus[0].text;
            const musica2 = musica.replace(new RegExp('\r?\n','g'), '<br />');

            

            resultContainer.innerHTML = `<h1>${datas.art.name}</h1> <h2>${datas.mus[0].name}</h2> <p>${musica2}</p>`;

        }).catch(error => {

            resultContainer.classList = "erro";

            resultContainer.innerHTML = `<img src="./assets/Error.png" alt="Error Image">
            <h1>Letra não encontrada</h1>
            <h2>Tente novamente!</h2>`;

        })

}