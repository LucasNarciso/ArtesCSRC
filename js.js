function abreEdicaoModelo(idModelo){
    window.location.href = `EditarModelo.html?modelo=${idModelo}`
    console.log('asdasd')
}

function voltarPagina(){
    history.back();
}

function iniciaPaginaEdit() {
    let campos = [
        {tipo: "texto", nome:"EVENTO", valor:"SANTA MISSA", top:"121", left:"23", width:"180", bold:true, underline:false},
        {tipo: "texto", nome:"DATA", valor:"Dia 3 de março", top:"145", left:"23", width:"180", bold:false, underline:false},
        {tipo: "texto", nome:"HORÁRIO", valor:"Às 10:00", top:"166", left:"23", width:"180", bold:false, underline:true},
        {tipo: "area", nome:"DESCRIÇÃO", valor:"Estamos esperando\npor você!", top:"199", left:"23", width:"180", bold:false, underline:false},
    ];
    addCamposEdit(campos);
}

function addCamposEdit(campos){
    let  card = document.querySelector('.card-edit');

    campos.forEach(campo => {
        if(campo.tipo == "texto"){
            card.insertAdjacentHTML('afterBegin',`
                <input class="input-text" type="text" name="${campo.nome}" value="${campo.valor}" style="position: absolute; width: ${campo.width}px; top: ${campo.top}px; left: ${campo.left}px; padding: 0px 2px; font-weight: ${campo.bold ? "bold" : "normal"}; text-decoration: ${campo.underline ? "underline" : "none"};" disabled></input>
            `)
        }else{
            card.insertAdjacentHTML('afterBegin',`
                <textarea class="input-text" type="textarea" name="${campo.nome}" style="position: absolute; top: ${campo.top}px; width: ${campo.width}px; left: ${campo.left}px; padding: 0px 2px; font-weight: ${campo.bold ? "bold" : "normal"}; text-decoration: ${campo.underline ? "underline" : "none"}; text-wrap: nowrap;" disabled>${campo.valor}</textarea>
            `)
        }
    });
}

function editCampos() {
    let elementos = document.querySelectorAll('input, textarea')

    elementos.forEach((el)=>{
        el.classList.remove('input-text')
        el.classList.add('input-text-edit')
        el.disabled = false;
    })

    entrarModoEdit();
}

function concluirCampos() {
    let elementos = document.querySelectorAll('input, textarea')

    elementos.forEach((el)=>{
        el.classList.add('input-text')
        el.classList.remove('input-text-edit')
        el.disabled = true;
    })
}

function entrarModoEdit(){
    let btnEditar = document.getElementById('btnEditar')
    let btnGerar = document.getElementById('btnGerar')

    btnEditar.style.display = 'none';
    btnGerar.style.display = 'none';

    document.querySelector('.barraCTAs').insertAdjacentHTML('afterBegin','<button id="btnConcluir" class="hoverPadrao" onclick="concluirEdit()"> CONCLUIR </button>')
}


function concluirEdit(){
    let btnEditar = document.getElementById('btnEditar')
    let btnGerar = document.getElementById('btnGerar')
    let btnConcluir = document.getElementById('btnConcluir')

    btnEditar.style.display = 'block';
    btnGerar.style.display = 'block';
    btnConcluir.remove();

    concluirCampos();
}

function gerarArte(){
    let elementos = Array.from(document.querySelectorAll('input, textarea'));
    let urlAPI = "https://script.google.com/macros/s/AKfycbzH8FtTGQIJ-T_LVd9BfkFuGtF8ooFzCEcR5qfPvm6A-0yUEPMyPf-tJ0wr1GldQRR3Lw/exec";
    let objData;

    objData = elementos.map((el)=>{
        return {"antes":el.name, "depois":el.value}
    })

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    mostraLoading()

    var modelo = new URL(window.location.href).searchParams.get("modelo");
    console.log(`${urlAPI}?action=gerarArte&modelo=${modelo}&textos=${JSON.stringify(objData)}`);
    fetch(`${urlAPI}?action=gerarArte&modelo=${modelo}&textos=${JSON.stringify(objData)}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result)
            baixarArte(JSON.parse(result).data)
        })
        .catch((error) => {
            console.error(error)
            removeLoading();
        });
}

function baixarArte(url){
    document.body.insertAdjacentHTML('afterBegin',`
        <iframe class="iframe-download" src="${url}" style="position:absolute; opacity: 0;"></iframe>
    `)
    setTimeout(() => {
        document.querySelectorAll('.iframe-download').forEach((ifr)=>{
            ifr.remove();
        })
    }, 5000);
    document.getElementById('DivLoading').innerHTML = `
        <p> Se o download não começar em instantes, clique <a href="${url}">aqui</a> para baixar. </p>
        <button onclick="removeLoading()" class="botaoSimples hoverPadrao">Voltar</button>
    `
    // removeLoading();
}

function mostraLoading(){
    document.body.insertAdjacentHTML('afterBegin',`
        <div id="DivLoading">
            <div class="loader"></div>
            <p>Gerando a arte...</p>
        </div>
    `)
}

function removeLoading(){
    document.getElementById('DivLoading').remove();
}