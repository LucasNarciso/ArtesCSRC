function abreEdicaoModelo(idModelo){
    window.location.href = 'EditarModelo.html'
    console.log('asdasd')
}

function voltarPagina(){
    history.back();
}

function iniciaPaginaEdit() {
    let campos = [
        {tipo: "texto", nome:"EVENTO", valor:"SANTA MISSA", top:"121", left:"26", width:"180"},
        {tipo: "texto", nome:"DATA", valor:"Dia 3 de março", top:"145", left:"26", width:"180"},
        {tipo: "texto", nome:"HORÁRIO", valor:"Às 10:00", top:"166", left:"26", width:"180"},
        {tipo: "area", nome:"DESCRIÇÃO", valor:"Estamos esperando \n por você!", top:"199", left:"26", width:"180"},
    ];
    addCamposEdit(campos);
}

function addCamposEdit(campos){
    let  card = document.querySelector('.card-edit');

    campos.forEach(campo => {
        if(campo.tipo == "texto"){
            card.insertAdjacentHTML('afterBegin',`
                <input class="input-text" type="textarea" name="${campo.nome}" value="${campo.valor}" style="position: absolute; width: ${campo.width}px; top: ${campo.top}px; left: ${campo.left}px; padding: 0px 2px;" disabled></input>
            `)
        }else{
            card.insertAdjacentHTML('afterBegin',`
                <textarea class="input-text" type="textarea" name="${campo.nome}" style="position: absolute; top: ${campo.top}px; width: ${campo.width}px; left: ${campo.left}px;" disabled> ${campo.valor} </textarea>
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

    document.querySelector('.barraCTAs').insertAdjacentHTML('afterBegin','<button id="btnConcluir" onclick="concluirEdit()"> CONCLUIR </button>')
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
    let elementos = document.querySelectorAll('input, textarea')
}