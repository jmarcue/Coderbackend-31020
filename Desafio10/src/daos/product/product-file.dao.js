import fs from "fs";
import { __dirname, __dirJoin } from "../../utils/helper.util.js";
import productFileContainer from "../../containers/file/product-file.container.js";

class productFileDao extends productFileContainer {
  constructor() {
    let filePath = __dirJoin(__dirname, '../../files', 'product.json');
    super(filePath, fs);
  };
};

export default productFileDao;