import { __dirname, __dirJoin } from '../utils/helper.util.js';

const home = (req, res) => {
    res.status(200).sendFile(__dirJoin(__dirname, '../public/home.html'));
};

export { home }