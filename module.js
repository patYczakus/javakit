const statements = {
    /**
     * Losuje liczbęe od podanego zakresu
     * @param {number} min Minimalna liczba
     * @param {number} max Maksymalna liczba
     */
    random: function (min, max) {
        return Math.round(Math.random() * (max - min)) + min
    },
    /**
     * Losuje liczbęe od podanego zakresu
     * @param {URL | string} url Poprawne źródło do pobrania
     * @param {JSON} options Opcje dla API do przekazania
     * @returns {Promise<JSON | string | number | boolean>}
     */
    APIResponse: async function (url, options = JSON) {
        if (!url) return console.error(new Error('Missing argument "url"'))
        if (!options) var response = await fetch(url)
        else var response = await fetch(url, options)

        if (response.ok) return response.json()
        else return new console.warn("HTTP-Error: " + response.status)
    },
}

const HTMLFunctions = {
    PHPVars: {
        /**
         * Szuka zmienną na zasadzie działania w PHP
         * @param {string} variable Zmienna do wyszukiwania
         * @param {boolean} JSONCode Czy ma zwracać jako JSON
         * @returns {string | { search: string, value: string, variable: string }} Zwraca, zależnie od zmiennej *`JSONCode`*, tekst lub JSON
         */
        get: (variable, JSONCode = Boolean(false)) => {
            if (!variable) return console.error("Missing argument: variable")

            var searchExec = location.search.replace("?", "")
            searchExec = searchExec.split(/&/g)
            var _var = null

            for (var i = 0; i < searchExec.length; i++) {
                if (searchExec[i].startsWith(`${variable}=`)) {
                    if (JSONCode)
                        _var = {
                            search: searchExec[i],
                            value: encodeURI(
                                searchExec[i].replace(`${variable}=`, "")
                            ).replace(/\+/g, " "),
                            variable: variable,
                        }
                    else
                        _var = encodeURI(
                            searchExec[i].replace(`${variable}=`, "")
                        ).replace(/\+/g, " ")
                    break
                }
            }

            return _var
        },
        /**
         * Szuka zmienną na zasadzie działania w PHP
         * @param {string} variable Zmienna do wyszukiwania
         * @returns {boolean} Zwraca istnienie zmiennej.
         */
        has: (variable) => {
            if (!variable) return console.error("Missing argument: variable")

            var searchExec = location.search.replace("?", "")
            searchExec = searchExec.split(/&/g)
            var _var = false

            for (var i = 0; i < searchExec.length; i++) {
                if (searchExec[i].startsWith(`${variable}=`)) {
                    _var = true
                    break
                }
            }

            return _var
        },
    },
    /**
     * Czeka na załadowanie multimediów (zdjęć), a po załadowaniu wykonuje funkcję. Możliwe też jest pokazanie ilość pobranych zdjęć
     * @param {string[]} imageUrlArray Lista zdjęć do załadowania. Może to być tekst, lub kod JSON.
     * @param {Function} functionToUpdateTheLoader Funkcja aktualizująca wartość; zawiera jeden argument, czyli ilość załadowanych zdjęć
     * @returns {Promise<HTMLImageElement[]>} Zwraca elementy HTML `<img>`/`<image>` w postaci listy
     */
    loadImages: async function (imageUrlArray, functionToUpdateTheLoader) {
        const promiseArray = []
        const imageArray = []
        let allLoaded = 0

        for (let imageUrl of imageUrlArray) {
            promiseArray.push(
                new Promise((resolve) => {
                    const img = new Image()

                    img.onload = function () {
                        allLoaded++
                        functionToUpdateTheLoader(allLoaded)
                        resolve()
                    }

                    img.src = imageUrl
                    imageArray.push(img)
                })
            )
        }

        await Promise.all(promiseArray)
        return imageArray
    },
}

export default { HTMLFunctions, statements }
