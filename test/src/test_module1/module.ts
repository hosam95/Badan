import { BadanModule } from "badan";
import testApi1 from "./test-api1.js";
import testApi2 from "./test-api2.js";

let test_module = new BadanModule('/test-module')

test_module.post(testApi1);
test_module.append(testApi2);

export default test_module;