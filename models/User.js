const fs = require('fs');
const path = require('path')

const User = {
    filePath: path.resolve(__dirname,'../database/users.json'),
    getData: function () {
		return JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
	},
    generateId: function () {
		let allUsers = this.findAll();
		let lastUser = allUsers.pop();
		if (lastUser) {
			return lastUser.id + 1;
		}
		return 1;
	},
    findAll: function () {
        return this.getData();
    },
    findByPk: function (id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(user => user.id === id);
        return userFound;
    },
    findByField: function (field, text) {
		let allUsers = this.findAll();
		let userFound = allUsers.find(user => user[field] === text);
		return userFound;
	},
    create: function (userData) {
		let allUsers = this.findAll();
		const { passwordRepeat, ...userDataWithoutRepeat } = userData;
		let newUser = {
			id: this.generateId(),
			...userDataWithoutRepeat
		}
		allUsers.push(newUser);
		fs.writeFileSync(this.filePath, JSON.stringify(allUsers, null,  ' '));
		return newUser;
	},
	delete: function (id) {
		let allUsers = this.findAll();
		let finalUsers = allUsers.filter(user => user.id !== id);
		fs.writeFileSync(this.filePath, JSON.stringify(finalUsers, null, ' '));
		return true;
	}
}

module.exports = User;