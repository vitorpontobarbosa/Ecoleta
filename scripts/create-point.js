function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {
            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}
function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex

    stateInput.value = event.target.options[indexOfSelectedState].text

    citySelect.disabled = true

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    fetch(url)
        .then(res => res.json())
        .then(cities => {
            for (const city of cities) {
                citySelect.innerHTML += `<option class="cityOption" value="${city.id}">${city.nome}</option>`
            }
            citySelect.disabled = false
        })
}

populateUFs()

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

document
.querySelector("[name=city]")
.addEventListener("change",(event)=>{
    const inputCidade = document.querySelector("[name=cidade]")
    const indexOfSelectedCity = event.target.selectedIndex

    inputCidade.value = event.target.options[indexOfSelectedCity].text
})