const login = (req, res) => {
    console.log("login");
    req.session.nombre = req.body.nombre;
    res.redirect('/');
}

const logout = (req, res) => {
    console.log("logout");
    req.session.destroy();
    res.redirect('/');
}

export { login, logout}