import Multer from 'multer'
import Responder from '../../lib/expressResponder';
//var thumb = require('node-thumbnail').thumb;
//var gm = require('gm').subClass({imageMagick: true});;
//var fs = require('fs')
//Set image location, filename and type for save on server  Using multer

// Multer is required to process file uploads and make them available via
// req.files.
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 200 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
});


const imageConfigStorage = Multer.diskStorage({
    destination: function (req, file, cb) {
        //if(file.mimetype == 'application/pdf' || file.mimetype == 'application/doc'){
        //  return cb(null, './public/uploads/pdf/')
        //  }
        cb(null, './public/uploads/')
        //  if(req.params.dir == 'profile')
        //  return cb(null, './public/uploads/profile')

        //  if(req.params.dir == 'ideas')
        //  return cb(null, './public/uploads/ideas')

        //  if(req.params.dir == 'material')
        //  return cb(null, './public/uploads/material')

        //  if(req.params.dir == 'skill')
        //  return cb(null, './public/uploads/skill')


    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        var ext = file.originalname;
        var name = file.originalname.split('.')[0]
        file.originalname = name.replace(/[^a-zA-Z0-9]/g, '_');

        console.log(ext, req.file)
        if (file.mimetype == 'image/png' || file.mimetype == 'uploads/png')
            cb(null, `${file.originalname.split('.')[0]}_${datetimestamp}.png`)
        else
            cb(null, file.originalname.split('.')[0] + '_' + datetimestamp + '.' + ext.split('.')[ext.split('.').length - 1])

    }
});

export default class MulterService {
    static uploadImage(req, res) {
        return new Promise((resolve, reject) => {
            try {
                let uploadSingle = Multer({ storage: imageConfigStorage }).single('file');
                uploadSingle(req, res, (err) => {
                    if (!req.file)
                        return Responder.success(res, { status: false, statusCode: 301, msg: "Please select file for upload." })
                    err ? reject(err) : resolve(req.file)
                });
            } catch (error) {
            }
        });
    }

}
