import { sayHello } from "./utils";

function prepare() {
    console.log('prepare');
}

export function welcome() {
    prepare();
    sayHello();
}
