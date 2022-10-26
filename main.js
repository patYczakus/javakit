import { statements } from "./module.js";

document.querySelector("button").addEventListener("click", () => {
    var _var = statements.PHPVarExecute(document.getElementById("ds").value, true)
    if (statements.PHPHasVar(document.getElementById("ds").value)) console.log(_var.value)
})