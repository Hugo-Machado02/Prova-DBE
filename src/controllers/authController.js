const AuthService = require("../services/authService")

module.exports = {
    authLogin: async (req, res) => {

        const dataLogin = req.body;
        const loginValid = await AuthService.login(dataLogin)
        if(loginValid.succes){
            return res.status(200).json({ loginValid })
        }
         return res.status(401).json({ error: "Usuário ou Senha inválido!" });
    },
}