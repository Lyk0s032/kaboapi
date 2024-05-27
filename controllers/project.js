const { project, screenshot } = require('../db/db');

module.exports = {
    // Agregar proyecto a la base de datos
    async newProject(req, res){
        try {
            // Recibimos parametros por body
            const { wallpaper, nameProject, description, tags, time, category, link, avaliable } = req.body;

            // Validamos que los parametros entren correctamente.
            if(!wallpaper || !nameProject || !description || !time || !category ) return res.status(501).json({msg: 'Error en los parametros'})
        
            // Si los parametros son correctos, avanzamos...

            // Creamos peticion para agregar el registro
            const createProject = await project.create({
                wallpaper,
                nameProject,
                category,
                description,
                tags,
                link: link ? link : 'not found',
                avaliable: link ? true : false,
                time,
                state: 'active'
            }).catch(err => {
                // En caso de error, mostrar a traves de consola
                console.log(err);
                // Retornamos null para manipular el resultado.
                return null;
            });
            // Si el resultado es null. Enviamos mensaje de aviso.
            if(!createProject) return res.status(502).json({msg: 'No hemos podido agregar este proyecto.'});

            // Caso  contrario, disparamos respuesta con estado 201. ¡Exito!
            res.status(201).json(createProject);
        }catch(err){
            console.log(err);
            res.status(500).json({msg: 'Ha ocurrido un error en la principal'});
        }
    },
    // Obtener todos los resultados disponibles
    async getProjects(req, res){
        try{
        
            // Busquemos los resultados, donde el STATE este activo.
            const searchProjects = await project.findAll({
                where: {
                    state: 'active'
                }
            }).catch(err => {
                // Mostramos el error por consola
                console.log(err);
                // Retornamos null
                return null
            });
            // Si no hay respuesta. Enviamos mensaje con estado 404. !Not found!
            if(!searchProjects) return res.status(404).json({msg: 'No hay resultados disponibles'});
            // Caso contrario, enviamos las respuestas
            res.status(200).json(searchProjects)
        }catch(err){
            console.log(err);
            res.status(500).json({msg: 'Ha ocurrido un error en la principal'});
        }
    },
    // Obtener resultado especifico por ID
    async getProjectById(req, res){
        try{
            // Obtenemos el parametro ID por Params.
            const { id } = req.params;
            // Busquemos el resultado. Donde el ID y State esten habilitados.
            const searchProject = await project.findOne({
                where: {
                    id,
                    state: 'active'
                },
                include:[{
                    model: screenshot,
                    as: 'imagenes',
                    where: {
                        state: 'active'
                    },
                    required: false
                }]
            }).catch(err => {
                // Mostramos el error por consola
                console.log(err);
                // Retornamos null
                return null
            });
            // Si no hay respuesta. Enviamos mensaje con estado 404. !Not found!
            if(!searchProject) return res.status(404).json({msg: 'No hemos encontrado este resultado.'});
            // Caso contrario, enviamos las respuestas
            res.status(200).json(searchProject)
        }catch(err){
            console.log(err);
            res.status(500).json({msg: 'Ha ocurrido un error en la principal'});
        }
    },
    // ----------------------------------------------------------------------------------------
    // WALLPAPERS
    
    async addImages(req, res){
        try {
            // Recibimos los valores por body
            const { wallpaper, nameScreenshot, description, projectId } = req.body;

            // Validamos que los datos entren correctamente
            if(!wallpaper || !nameScreenshot || !projectId) return res.status(501).json({msg: 'Los parametros no son validos'});

            // Caso contrario, continuamos...
            
            // Validamos que realmente exista el projecto.
            const searchProject = await project.findByPk(projectId).catch(err => null);
            // Si no encuentra proyecto con esa ID. Enviamos respuesta con estado 404. ¡Not found!
            if(!searchProject) return res.status(404).json({msg: 'No hemos encontrado este proyecto.'});


            // Caso contrario, procedemos a solicitar la peticion

            // Creamos una peticion para agendar WALLPAPER
            const addScreenshot = await screenshot.create({
                screenshot: wallpaper,
                nameScreenshot,
                description: description ? description : 'Sin descripcion', // Si no hay descripcion, adjuntamos mensaje.
                projectId, // Enlace de proyecto por ID
                state: 'active'
            }).catch(err => {
                // Pasamos por consola el error
                console.log(err);
                return null // Retornamo null para manejar el error.
            });

            // Si la respuesta es null. Enviamos mensaje con estao 502. ¡I can't do it!
            if(!addScreenshot) return res.status(502).json({mgs: 'No se ha podido enlazar la imagen'});

            // Caso contrario, enviamos respuesta 201. ¡Created!
            res.status(201).json(addScreenshot); // Devolvemos el elemento creando (JSON).
        }catch(err){
            // Mostramos por consola el error
            console.log(err);
            // Finalizamos la peticion
            res.status(500).json({msg: 'Ha ocurrido un error en la principal.'});
        }
    }

}