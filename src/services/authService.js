const FuncionarioRepository = require("../repositories/FuncionarioRepository");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secret');

class AuthService{
    async login(data){
        const {email, password} = data;
        // console.log({email});
        // console.log({password});

        const funcionario = await FuncionarioRepository.getByEmail(email);
        
        if(!funcionario){
            return {succes: false}
        }

        const comparePassword = await bcrypt.compare(password, funcionario.password)
        if(!comparePassword){
            return {succes: false}
        }

        const encriptDataTOken = {
            id: funcionario._id,
            nome: funcionario.nome,
            cargo: funcionario.cargo
        }

        const token = jwt.sign(encriptDataTOken, jwtSecret, {expiresIn: "1h"})

        return {succes: true, token: token,  dados: encriptDataTOken}

    }
}

module.exports = new AuthService();