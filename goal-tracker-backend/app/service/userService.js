import bcrypt from 'bcrypt';
import MysqlPool from '../../lib/mysqlConnQuery';
import connConfig from '../../lib/mysql2';
import CONSTANTS from '../../config/constants';
import globalFunction from '../../config/globalFunction';
let resultdb = globalFunction.resultdb;

let getUserByEmail = async (email) => {
	try {
        console.log(email)
		let userdetails = await MysqlPool.query('SELECT * FROM users where email = ?', email);
		if (userdetails.length <= 0) {
			return resultdb(CONSTANTS.NOT_FOUND, CONSTANTS.DATA_NULL);
		} else {
			return resultdb(CONSTANTS.SUCCESS, userdetails[0]);
		}
	} catch (error) {
        console.log(error)
		return resultdb(CONSTANTS.SERVER_ERROR, CONSTANTS.DATA_NULL);
	}
};


let createUser = async (userData) => {
	const conn = await connConfig.getConnection();
	try {
		await conn.beginTransaction();
		

		let createdUserData = await conn.query('INSERT INTO users SET ?', [userData]);
			await conn.commit();
			conn.release();
			return resultdb(CONSTANTS.SUCCESS, createdUserData);
		
	} catch (error) {
        console.log(error)
		await conn.rollback(); conn.release();
		return resultdb(CONSTANTS.SERVER_ERROR, CONSTANTS.DATA_NULL);
	}
};



let userLogin = async (data) => {
	try {
		let userData = await getUserByEmail(data.email);
		console.log("userData",userData)
		if (userData.statusCode === CONSTANTS.SUCCESS) {
				let isValidPassword = bcrypt.compareSync(data.password, userData.data.password);
				console.log("isValidPassword",isValidPassword)
				if (isValidPassword) {
				
					return resultdb(CONSTANTS.SUCCESS, userData);
				} else
					return resultdb(CONSTANTS.ACCESS_DENIED);
			
		} else if (userData.statusCode == CONSTANTS.NOT_FOUND)
			return resultdb(CONSTANTS.NOT_FOUND, CONSTANTS.DATA_NULL);
		else
			return resultdb(CONSTANTS.SERVER_ERROR, CONSTANTS.DATA_NULL);
	} catch (error) {
		return resultdb(CONSTANTS.SERVER_ERROR, CONSTANTS.DATA_NULL);
	}
};


let createToDoTask = async (taskData) => {
	const conn = await connConfig.getConnection();
	try {
		await conn.beginTransaction();
		let createdToDo = await conn.query('INSERT INTO to_do_task SET ?', [taskData]);
			await conn.commit();
			conn.release();
			return resultdb(CONSTANTS.SUCCESS, createdToDo);
		
	} catch (error) {
        console.log(error)
		await conn.rollback(); conn.release();
		return resultdb(CONSTANTS.SERVER_ERROR, CONSTANTS.DATA_NULL);
	}
};


let getUserToDoByUserId = async (user_id) => {
	try {
        console.log(user_id)
		let toDoList = await MysqlPool.query('SELECT * FROM to_do_task where user_id = ?', user_id);
		
			return resultdb(CONSTANTS.SUCCESS, toDoList);
		
	} catch (error) {
		return resultdb(CONSTANTS.SERVER_ERROR, CONSTANTS.DATA_NULL);
	}
};

let getToDoByTaskId = async (task_id) => {
	try {
        console.log(task_id)
        let toDoDetails = await MysqlPool.query('SELECT * FROM to_do_task where task_id = ?', task_id);
        console.log(toDoDetails)
		if (toDoDetails.length <= 0) {
			return resultdb(CONSTANTS.NOT_FOUND, CONSTANTS.DATA_NULL);
		} else {
			return resultdb(CONSTANTS.SUCCESS, toDoDetails[0]);
		}
	} catch (error) {
		return resultdb(CONSTANTS.SERVER_ERROR, CONSTANTS.DATA_NULL);
	}
};

let updateToDoTask = async  (updateToDo) => {
	try {
		
		let updatedToDo = await MysqlPool.query('UPDATE to_do_task SET task_title=?, task_description=? WHERE task_id = ?', [updateToDo.task_title, updateToDo.task_description, updateToDo.task_id]);
	
		return resultdb(CONSTANTS.SUCCESS, updatedToDo);
	} catch (error) {
		return resultdb(CONSTANTS.SERVER_ERROR, CONSTANTS.DATA_NULL);
	}
};


let deleteToDoTask = async  (task_id) => {
	try {
		
		let updatedToDo = await MysqlPool.query('DELETE FROM to_do_task  WHERE task_id = ?', [ task_id]);
	
		return resultdb(CONSTANTS.SUCCESS, updatedToDo);
	} catch (error) {
		return resultdb(CONSTANTS.SERVER_ERROR, CONSTANTS.DATA_NULL);
	}
};

module.exports = {
	getUserByEmail,createUser,userLogin,createToDoTask,getUserToDoByUserId , updateToDoTask , getToDoByTaskId,deleteToDoTask
};