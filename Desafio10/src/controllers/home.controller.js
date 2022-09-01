const getHome = (req, res) => {
    const textData = {
        title: "Desafio n°10 - Mocks y Normalización",
        content: "En la web se podrán ingresar productos, chatear en tiempo real"
    }
    return res.render('index', textData);
}

export { getHome }