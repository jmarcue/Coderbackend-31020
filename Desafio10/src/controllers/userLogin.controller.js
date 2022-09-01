const userLogin = (req, res) => {
    const { userName } = req.body;

    return res.redirect(`/message?userName=${userName}`);
};

export { userLogin }