const login = (req, res) => {
    req.session.nombre = req.body.nombre;
    res.redirect('/');
}

const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}

export { login, logout}