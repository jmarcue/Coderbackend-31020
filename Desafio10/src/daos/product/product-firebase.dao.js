import { queryProduct } from "../../config/firebase.config.js";
import productFirebaseContainer from "../../containers/firebase/product-firebase.container.js";

class productFirebaseDao extends productFirebaseContainer {
  constructor() {
    super(queryProduct);
  };
};

export default productFirebaseDao;