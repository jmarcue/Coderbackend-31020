const getHome = (req, res) => {
    const textData = {
        title: "Desafio n°10 - Mocks y Normalización",
        content: null
    }
    return res.render('index', textData);
}

export { getHome }