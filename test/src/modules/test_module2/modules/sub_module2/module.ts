import { BadanModule } from "badan";
import test_api7 from "./controllers/test_api7.js";
import test_api8 from "./controllers/test_api8.js";

let test_sub_module_2 = new BadanModule("Second Test Sub-Module","A module to test the badan package",'/test-module')

test_sub_module_2.append(test_api7);
test_sub_module_2.put(test_api8);

export default test_sub_module_2;