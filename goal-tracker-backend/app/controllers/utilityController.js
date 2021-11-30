import Responder from '../../lib/expressResponder';
import MulterService from '../service/multerService';
import fs from 'fs';
import path from 'path'

export default class UtilityController {


    //For upload image to server
    static uploadImageToDo(req, res) {
        MulterService.uploadImage(req, res).then((file) => {
            Responder.success(res, file)
        }).catch(error => Responder.operationFailed(res, error));
    }

  

  
}















