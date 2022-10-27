const Contacto = require('../model/Contacto')
const { uploadToBucket, deleteObject } = require('../handlebar/s3')

//Mostrar
module.exports.mostrar = (req,res)=>{
    Contacto.find({}, (error, contactos) => {
        if(error){
            return res.status(500).json({
                message:"Error mostrando contactos"
            })
        }
        return res.render('index',{contactos:contactos})
    })
}

//Crear

module.exports.upload = async (req, res) => {
    //console.log(req)
    const file = req.files.file;
    const bucket = 's3-bucketdf'
    const result = await uploadToBucket(bucket,file)
    //res.redirect('/')
    console.log(result)
    sendBaseData(req, result.Location)
    //res.json(result);
    res.json(result)
    
}

const sendBaseData = async(req,url) => {
    //console.log(req)
    //console.log(url)
    const body = req
    const contacto = new Contacto({
        nombre: req.body.nombre,
        edad:req.body.edad,
        telefono:req.body.telefono,
        imagen: url
    })
    
    contacto.save(function(error,contacto){
        if(error){
            console.error(error)
        }
    })
};

module.exports.crear = (req, res) => {
    
    //console.log(req.body)
    const contacto = new Contacto({
        nombre: req.body.nombre,
        edad:req.body.edad,
        telefono:req.body.telefono,
        imagen: data.Location
    })

    contacto.save(function(error,contacto){
        if(error){
            return res.status(500).json({
                message: 'Error al crear el Contacto'
            })
        }
        res.redirect('/')
    })
    
}


//Editar
module.exports.editar = (req,res) => {
    console.log(req.body)
    const id = req.body.id_editar
    const nombre = req.body.nombre_editar
    const edad = req.body.edad_editar
    const telefono = req.body.telefono_editar

    Contacto.findByIdAndUpdate(id,{nombre,edad,telefono},(error, contacto)=>{
        if(error){
            return res.status(500).json({
                message: 'Error al actualizar contacto'
            })
        }
        res.redirect('/')
    })
}

//Eliminar
module.exports.borrar = (req,res) => {
    const id = req.params.id
    
    Contacto.findById({_id : id}).exec(function(err, contacto) {
        if (err) throw err;

        const key = contacto.imagen.split('/')
        eliminar(id, key[3])
        console.log(key[3]);
    });
    
    res.redirect('/')
}

const eliminar = (id, key) => {

    Contacto.findByIdAndDelete(id,(error, contacto)=>{
        if(error){
            return res.status(500).json({
                message: 'Error al eliminar contacto'
            })
        }
        var params = {  Bucket: 's3-bucketdf', Key: key };
        deleteObject(params)
    })
}
