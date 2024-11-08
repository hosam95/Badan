import { BadanModule } from "badan";
import testApi1 from "./controllers/test-api1.js";
import testApi2 from "./controllers/test-api2.js";

let test_module = new BadanModule("Test Module","A module to test the badan package",'/test-module')

test_module.post(testApi1);
test_module.append(testApi2);

export default test_module;