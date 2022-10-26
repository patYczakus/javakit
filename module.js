var k2rl06hhodd = { 
    a: (variable = String(), JSONCode = Boolean(false)) => {
        if (!variable) return console.error("Missing argument: variable")

        var searchExec = location.search.replace("?", "")
        searchExec = searchExec.split(/&/g)
        var _var = null 

        for (var i=0; i<searchExec.length; i++) {
            if (searchExec[i].startsWith(variable)) {
                if (JSONCode) _var = { search: searchExec[i], value: encodeURI(searchExec[i].replace(`${variable}=`, "")).replace(/\+/g, " "), variable: variable }
                else _var = encodeURI(searchExec[i].replace(`${variable}=`, "")).replace(/\+/g, " ")
                break
            }
        }
        
        return _var
    }, 
    b: (variable = String()) => {
        if (!variable) return console.error("Missing argument: variable")

        var searchExec = location.search.replace("?", "")
        searchExec = searchExec.split(/&/g)
        var _var = false

        for (var i=0; i<searchExec.length; i++) {
            if (searchExec[i].startsWith(variable)) {
                _var = true
                break
            }
        }
        
        return _var
    } 
}

export const statements = {
    random: function(min = Number(1), max = Number(10)) {
        return Math.round(Math.random() * (max - min)) + min
    },
    PHPVarExecute: k2rl06hhodd.a,
    SearchVarExecute: k2rl06hhodd.a,
    PHPHasVar: k2rl06hhodd.b,
    SearchHasVar: k2rl06hhodd.b,
}