import Responder from '../../lib/expressResponder';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import validator from 'validator';
 import bcrypt from 'bcrypt';
import async from 'async';
import MysqlPool from '../../lib/mysqlDb';
import connConfig from '../../lib/mysql2';
import CONSTANTS from '../../config/constants';
import userService from './../service/userService';
import fs from 'fs';

const saltRounds = 8;

export default class UserController {


      // For user create
      static async create(req, res) {

          //For bcrypt user password creating hash for this
          let genSalt = await bcrypt.genSalt(saltRounds);
		let hash = await bcrypt.hash(req.body.password, genSalt);
         
          let userData = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			create_at: new Date(),
			password: hash,
		};
        let getUserDetailsFromDB = await userService.getUserByEmail(req.body.email);
        if (getUserDetailsFromDB.statusCode === CONSTANTS.NOT_FOUND) {
            let datafromService = await userService.createUser(userData);
            if (datafromService.statusCode === CONSTANTS.SUCCESS) {
                return Responder.success(res, { statusCode: 200, status: true, data: datafromService, msg: "User created successfully." })
            }
            else
            return Responder.success(res, { statusCode: 301, status: false, data: datafromService, msg: "Error to register user." })
        }
        else {
            return Responder.success(res, { statusCode: 301, status: false, data: getUserDetailsFromDB, msg: "User already exist." })
        }

}

 // For user login
 static async userLogin(req, res) {
    let getUserDetailsFromDB = await userService.userLogin(req.body);
    if (getUserDetailsFromDB.statusCode === CONSTANTS.SUCCESS) {
        return Responder.success(res, { statusCode: 200, status: true, data: getUserDetailsFromDB.data.data, msg: "Logged in successfully." })

    }
    else
    return Responder.success(res, { statusCode: 301, status: false, msg: "Error to get user." })

 }
    

 // To create to do task
 static async createToDoTask(req, res) {
    let taskData = {
        task_title: req.body.task_title,
        task_description: req.body.task_description,
        user_id: req.body.user_id,
        task_file: req.body.task_file, 
        create_at: new Date(),
    };
    let datafromService = await userService.createToDoTask(taskData);
    if (datafromService.statusCode === CONSTANTS.SUCCESS) {
        return Responder.success(res, { statusCode: 200, status: true, data: datafromService.data, msg: "To do task created successfully." })

    }
    else
    return Responder.success(res, { statusCode: 301, status: false, msg: "Error." })

 }


 // To get to do list
 static async getToDoList(req, res) {
    let getToDoListFromDB = await userService.getUserToDoByUserId(req.params.user_id);
    if (getToDoListFromDB.statusCode === CONSTANTS.SUCCESS) {
        return Responder.success(res, { statusCode: 200, status: true, data: getToDoListFromDB.data, msg: " To do list successfully." })

    }
    else
    return Responder.success(res, { statusCode: 301, status: false, msg: "Error ." })

 }
    

 // To update to do details
 static async updateToDoDetails(req, res) {
    let getToDoListFromDB = await userService.updateToDoTask(req.body);
    if (getToDoListFromDB.statusCode === CONSTANTS.SUCCESS) {
        return Responder.success(res, { statusCode: 200, status: true, data: getToDoListFromDB.data, msg: " To do details updated successfully." })

    }
    else
    return Responder.success(res, { statusCode: 301, status: false, msg: "Error ." })

 }


 // To get to do details
 static async getToDoDetails(req, res) {
     console.log("req.params.task_id",req.params.task_id)
    let getToDoListFromDB = await userService.getToDoByTaskId(req.params.task_id);
    if (getToDoListFromDB.statusCode === CONSTANTS.SUCCESS) {
        return Responder.success(res, { statusCode: 200, status: true, data: getToDoListFromDB.data, msg: " To do details successfully." })

    }
    else
    return Responder.success(res, { statusCode: 301, status: false, msg: "Error ." })

 }


 // To delete to do details
 static async deleteToDoDetails(req, res) {
    let getToDoDetails = await userService.getToDoByTaskId(req.params.task_id);
    let getToDoListFromDB = await userService.deleteToDoTask(req.params.task_id);
    if (getToDoListFromDB.statusCode === CONSTANTS.SUCCESS) {
        if (getToDoDetails.data.task_file != null && getToDoDetails.data.task_file != '' && getToDoDetails.data.task_file != undefined) {
            let path = `./public/uploads/${getToDoDetails.data.task_file}`
            fs.exists(`./public/uploads/${getToDoDetails.data.task_file}`, function (exists) {
                if (exists) {
                    fs.unlink(path, (err) => {
                        if (err) {
                            return Responder.success(res, { msg: "Please try again (502).", statusCode: 301, status: true, data: {}, })
                        }
                    })
                    return Responder.success(res, { statusCode: 200, status: true, data: getToDoListFromDB.data, msg: " To do details updated successfully." })
                } else {
                    return Responder.success(res, { msg: "File not found.", statusCode: 301, status: true, data: {}, })
                }
            });
        }
        else
        return Responder.success(res, { statusCode: 200, status: true, data: getToDoListFromDB.data, msg: " To do details updated successfully." })
    }
    else
    return Responder.success(res, { statusCode: 301, status: false, msg: "Error ." })

 }

    
}


