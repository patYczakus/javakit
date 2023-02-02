var k2rl06hhodd = { 
    get: (variable = String(), JSONCode = Boolean(false)) => {
        if (!variable) return console.error("Missing argument: variable")

        var searchExec = location.search.replace("?", "")
        searchExec = searchExec.split(/&/g)
        var _var = null 

        for (var i=0; i<searchExec.length; i++) {
            if (searchExec[i].startsWith(`${variable}=`)) {
                if (JSONCode) _var = { search: searchExec[i], value: encodeURI(searchExec[i].replace(`${variable}=`, "")).replace(/\+/g, " "), variable: variable }
                else _var = encodeURI(searchExec[i].replace(`${variable}=`, "")).replace(/\+/g, " ")
                break
            }
        }
        
        return _var
    }, 
    has: (variable = String()) => {
        if (!variable) return console.error("Missing argument: variable")

        var searchExec = location.search.replace("?", "")
        searchExec = searchExec.split(/&/g)
        var _var = false

        for (var i=0; i<searchExec.length; i++) {
            if (searchExec[i].startsWith(`${variable}=`)) {
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
    APIResponse: async function(url = String(""), options = JSON) {
        if (url == "") return console.error(new Error("Missing argument \"url\""))
        if (!options) var response = await fetch(url)
        else var response = await fetch(url, options)

        if (response.ok) return response.json()
        else return new console.warn("HTTP-Error: " + response.status);
    }
}

export const HTMLFunctions = {
    PHPVar: k2rl06hhodd,
    SearchVar: k2rl06hhodd,
    copy: (theText) => {
        var hiddenCopy = document.createElement("textarea")
        hiddenCopy.innerHTML = theText
        hiddenCopy.style.display = "none"
        hiddenCopy.select()
        try {
            document.execCommand('copy')
        } catch (err) {
            window.alert("Your Browser Doesn't support this! Error : " + err)
        }
        document.body.removeChild(hiddenCopy)
    }
}