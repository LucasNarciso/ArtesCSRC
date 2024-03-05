function abreEdicaoModelo(idModelo){
    window.location.href = 'ArtesCSRC/EditarModelo.html'
    console.log('asdasd')
}

function addCamposEdit(){
    document.querySelector('.card-edit').insertAdjacentHTML('afterBegin',`
        <input class="input-edit-text" type="Text" value="SANTA MISSA" style="position: absolute; top: 119px; left: 26px;"></input>
    `)
}