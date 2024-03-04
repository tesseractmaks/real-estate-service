import { feturesSection } from "./fetures-section.js"
import { mainContainer } from '../pages/main-page.js'
import { pageContainer } from '../../index.js'


// Filter form section

export function filterFormSection(paramsIn) {
    const divFilter = document.createElement("div")
    divFilter.classList.add("filter-search")

    const divContainer = document.createElement("div")
    divContainer.classList.add("container")

    let filterForm = document.createElement("form")
    filterForm.classList.add("filter-form")

    let inputCity = document.createElement("input")
    inputCity.id = "inCity"
    inputCity.type = "text"
    inputCity.value = ""
    inputCity.placeholder = "City"

    // if (paramsIn.city) {
    //     inputCity.value = paramsIn.city}

    filterForm.append(inputCity)

    let inputState = document.createElement("input")
    inputState.id = "inState"
    inputState.type = "text"
    inputState.placeholder = "State"
    filterForm.append(inputState)

    let selectRentSaleFlat = document.createElement("select")
    selectRentSaleFlat.id = "rentSaleFlat"

    let optionRentNone = document.createElement("option")
    optionRentNone.id = "rent-none"
    optionRentNone.value = ""
    optionRentNone.textContent = "status"

    let optionRent = document.createElement("option")
    optionRent.id = "rent"
    optionRent.value = "rent"
    optionRent.textContent = "rent"

    let optionSale = document.createElement("option")
    optionSale.id = "sale"
    optionSale.value = "sale"
    optionSale.textContent = "sale"

    selectRentSaleFlat.append(optionRentNone, optionRent, optionSale)

    let selectHouse = document.createElement("select")
    selectHouse.id = "sellFlatHouse"

    // let optionFlatNone = document.createElement("option")
    // optionFlatNone.id = "flat-none"
    // optionFlatNone.value = "0"
    // optionFlatNone.textContent = "status"

    let optionFlat = document.createElement("option")
    optionFlat.id = "flat"
    // optionFlat.value = 0
    optionFlat.textContent = "flat"

    let optionHouse = document.createElement("option")
    optionHouse.id = "house"
    // optionHouse.value = 0
    optionHouse.textContent = "house"

    selectHouse.append(optionFlat, optionHouse)

    let selectSellRooms = document.createElement("select")
    selectSellRooms.id = "sellRooms"
    

    for (let i = 0; i < 6; i++) {
        let optionRoom = document.createElement("option")
        optionRoom.id = `${i}room`
        // optionRoom.textContent = `${i}-room`
        optionRoom.value = i
        if(i == 0){
            optionRoom.textContent = 'rooms'
        } else{
            optionRoom.textContent = `${i}-room`
        }
        selectSellRooms.append(optionRoom)
    };

    let btn = document.createElement("button")
    btn.classList.add("site-btn", "fs-submit")
    btn.textContent = "НАЙТИ"
    btn.type = "submit"

    filterForm.append(selectRentSaleFlat, selectHouse, selectSellRooms, btn)

    selectHouse.addEventListener('click', function (e) {
        e.preventDefault();
        selectSellRooms.removeAttribute("disabled")
        if (e.target.value == "house") {
            selectSellRooms.setAttribute("disabled", "disabled")
        }
    });

    let city = ''
    let state = ''
    let rentSale = ''
    let flatHouse = 0
    let rooms = 0


    // selectRentSaleFlat.addEventListener('click', function (e) {
    //     e.preventDefault();
    //     if (e.target.id == "sale") {
    //         selectRentSaleFlat.value = "sale"
    //     }
    //     if (e.target.id == "rent") {
    //         selectRentSaleFlat.value = "rent"
    //     }

    // });



    let params = {};

    filterForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        

        // if (paramsIn.city) {
        //     city = paramsIn.city

        // } else {

        //     city = filterForm.inCity.value
        // };

        //--------
        

        
        if (filterForm.inCity.value) {
            city = filterForm.inCity.value
        } 
        if (filterForm.inState.value) {
            state = filterForm.inState.value
        } 
        if (filterForm.rentSaleFlat.value) {
            rentSale = filterForm.rentSaleFlat.value
        } 
        if (filterForm.sellFlatHouse.value) {
            flatHouse = filterForm.sellFlatHouse.value
        } 
        if (filterForm.sellRooms.value) {
            rooms = filterForm.sellRooms.value
        } 
        if (selectSellRooms.disabled) {
            rooms = 0
            flatHouse = 'house'
            // rooms = 0
            // if (roomsFlat.at(0) == 0){
            //     rooms = roomsFlat.at(0)
            // }
        };



        // let state = filterForm.inState.value
        // let flatHouse = filterForm.sellFlatHouse.value
        // let rentSale = rentSaleFlat.value
        // let roomsFlat = filterForm.sellRooms.value

        params = {
            "city": city,
            "state": state,
            "status": rentSale,
            "category": flatHouse,
            "rooms": +rooms
        }
        if (params.category == 'flat') {
            params.category = 1
        } 
        if (params.category == 'house') {
            params.category = 2
        } 


        for (var key in params) {
            if (params[key] == null) {
                params[key] = ""
            };
        };
        let page;
        // window.scrollTo({ top: 1900, behavior: 'smooth' })

        divContainer.append(filterForm)
        divFilter.append(divContainer)


        let feturesBlock = await feturesSection(page = page, params = params)
        
        // const mainPage = pageContainer()
        // mainPage.append(feturesBlock)

        pageContainer.innerHTML = ""


        let feturesBlockNew = await mainContainer(feturesBlock, '', params)
        // let feturesBlockNew = await mainContainer(feturesBlock, city)
        pageContainer.append(feturesBlockNew)
        window.scrollTo({ top: 1000, behavior: 'smooth' })
        // return feturesBlock
    });


    divContainer.append(filterForm)
    divFilter.append(divContainer)
    return divFilter

};




