import { BadanModule } from "badan";
import test_api3 from "./controllers/test_api3.js";
import test_api4 from "./controllers/test_api4.js";
import test_sub_module from "./modules/sub_module1/module.js";
import test_sub_module_2 from "./modules/sub_module2/module.js";

let test_module_2 = new BadanModule("Second Test Module","A module to test the badan package",'/test-module')

test_module_2.append(test_api3);
test_module_2.put(test_api4);

test_module_2.appendModule(test_sub_module);
test_module_2.appendModule(test_sub_module_2);

export default test_module_2;