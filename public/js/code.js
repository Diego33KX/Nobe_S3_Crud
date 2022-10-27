const modalContacto =  new bootstrap.Modal(document.getElementById('modalContacto'))
const imageResult = document.querySelector('#image');
const linkDownload = document.querySelector('#link');
const btnUpload = document.querySelector('#upload');
const texto = document.querySelector('#carga');

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

on(document, 'click','.btnEditar', e => {
    const fila = e.target.parentNode.parentNode
    id_editar.value = fila.children[0].innerHTML
    nombre_editar.value = fila.children[1].innerHTML
    edad_editar.value = fila.children[2].innerHTML
    telefono_editar.value = fila.children[3].innerHTML

    modalContacto.show()
})

btnUpload.addEventListener('click',e=>{
    e.preventDefault();

    //const bucket = document.querySelector('#buckets').value;
    const file = document.querySelector('#file').files[0];
    const nombre = document.querySelector('#nombre').value;
    const edad = document.querySelector('#edad').value;
    const telefono = document.querySelector('#telefono').value;

    const formData = new FormData();
    //formData.append('bucket',bucket);
    formData.append("file",file);
    formData.append("nombre",nombre);
    formData.append('edad',edad);
    formData.append('telefono',telefono);
    console.log(file)
    console.log(formData)
    uploadFile(formData);
});

const uploadFile = (formData) => {

    fetch('/upload',{
        method:'POST',
        body:formData
    })
        .then(response => response.json())
        .then(data => {
            texto.innerHTML="Listo"
            //imageResult.src = data.Location;
            //linkDownload.href = data.Location;
        })
};