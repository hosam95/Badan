import { BadanModule } from "badan";
import test_api5 from "./controllers/test_api5.js";
import test_api6 from "./controllers/test_api6.js";

let test_sub_module = new BadanModule("Sub Module","A module to test the badan package",'/test-module')

test_sub_module.append(test_api5);
test_sub_module.put(test_api6);

export default test_sub_module;