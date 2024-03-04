import { jsonToData, setStorageData, deleteStorageData } from "../utils.js"

import { sidebarAgent } from "../components/sidebar.js"
import { aIelements, anyIelements, buttonElement } from "../components/elements.js"

import { deleteOneProperty } from "../components/list-properties.js"
// import { pageContainer } from "../main.js"
import { router } from "../../index.js"
// Slider features Detail

function singleList(detailData) {

    // let filter = document.querySelector(".filter-search")
    // console.log(filter)
    // filter.classList.add("filter-search-hide")

    let divSingleList = document.createElement("div")
    divSingleList.classList.add("single-list-content")


    let divRow = document.createElement("div")
    divRow.classList.add("row")

    let divCol8 = document.createElement("div")
    divCol8.classList.add("col-xl-8")
    divCol8.classList.add("sl-title")

    let h2 = document.createElement("h2")
    h2.textContent = detailData.street

    let p = document.createElement("p")
    let i = document.createElement("i")
    i.classList.add("fa")
    i.classList.add("fa-map-marker")
    p.textContent = `${detailData.city}, ${detailData.state} ${detailData.postal_code}`
    p.prepend(i)
    divCol8.append(h2, p)

    let divCol4 = document.createElement("div")
    let a = document.createElement("a")
    a.setAttribute("href", "#")
    a.textContent = detailData.price
    a.classList.add("price-btn")
    divCol4.classList.add("col-xl-4")
    divCol4.append(a)

    divRow.append(divCol8, divCol4)
    divSingleList.append(divRow)


    // Property Details

    let h3 = document.createElement("h3")
    h3.classList.add("sl-sp-title")
    h3.textContent = "Property Details"

    let divRowProperty = document.createElement("div")
    divRowProperty.classList.add("row")
    divRowProperty.classList.add("property-details-list")


    let div461 = document.createElement("div")
    div461.classList.add("col-md-4")
    div461.classList.add("col-sm-6")

    let pLarge = document.createElement("p")
    pLarge.textContent = `${detailData.house_area} Square foot`
    let iLarge = document.createElement("i")
    iLarge.classList.add("fa")
    iLarge.classList.add("fa-th-large")
    pLarge.prepend(iLarge)

    let pBed = document.createElement("p")
    pBed.textContent = `${detailData.bedrooms} Bedrooms`
    let iBed = document.createElement("i")
    iBed.classList.add("fa")
    iBed.classList.add("fa-bed")
    pBed.prepend(iBed)

    let pUser = document.createElement("p")
    pUser.textContent = "---"
    // pUser.textContent = `${detailData.users.profile.first_name} Bedrooms`
    let iUser = document.createElement("i")
    iUser.classList.add("fa")
    iUser.classList.add("fa-user")
    pUser.prepend(iUser)

    div461.append(pLarge, pBed, pUser)


    let div462 = document.createElement("div")
    div462.classList.add("col-md-4")
    div462.classList.add("col-sm-6")

    let pCar = document.createElement("p")
    pCar.textContent = `${detailData.garages} Garages`
    let iCar = document.createElement("i")
    iCar.classList.add("fa")
    iCar.classList.add("fa-car")
    pCar.prepend(iCar)

    let pBuilding = document.createElement("p")
    // pBuilding.textContent = `${detailData.categories.title}`
    pBuilding.textContent = `-re--`
    let iBuilding = document.createElement("i")
    iBuilding.classList.add("fa")
    iBuilding.classList.add("fa-building-o")
    pBuilding.prepend(iBuilding)

    let pClock = document.createElement("p")
    pClock.textContent = `${detailData.time_published} days ago`
    let iClock = document.createElement("i")
    iClock.classList.add("fa")
    iClock.classList.add("fa-clock-o")
    pClock.prepend(iClock)

    div462.append(pCar, pBuilding, pClock)


    let div4Bath = document.createElement("div")
    div4Bath.classList.add("col-md-4")

    let pBath = document.createElement("p")
    pBath.textContent = `${detailData.bathrooms} Bathrooms`
    let iBath = document.createElement("i")
    iBath.classList.add("fa")
    iBath.classList.add("fa-bath")
    pBath.prepend(iBath)

    let pTrophy = document.createElement("p")
    pTrophy.textContent = `${detailData.age} years age`
    let iTrophy = document.createElement("i")
    iTrophy.classList.add("fa")
    iTrophy.classList.add("fa-trophy")
    pTrophy.prepend(iTrophy)

    div4Bath.append(pBath, pTrophy)

    divRowProperty.append(div461, div462, div4Bath)


    let h3Descr = document.createElement("h3")
    h3Descr.classList.add("sl-sp-title")
    let divDescr = document.createElement("div")
    divDescr.classList.add("description")
    let pDescr = document.createElement("p")
    pDescr.textContent = `${detailData.description}`
    divDescr.append(pDescr)

    let accordionPlanContent = accordionPlan(detailData)

    divSingleList.append(h3, divRowProperty, h3Descr, divDescr, accordionPlanContent)
    return divSingleList
};


// Accordion features Detail

function accordionPlan(detailData) {
    // let accordion = document.querySelector("#accordion")
    // let span = accordion.querySelector("#headingOne .panel-link span")
    // span.textContent = `${detailData.house_area} Square foot`
    // console.log(span)

    let h3Title = document.createElement("h3")
    h3Title.classList.add("sl-sp-title")
    h3Title.classList.add("bd-no")
    h3Title.textContent = "Floor plans"


    let divAccordion = document.createElement("div")
    divAccordion.setAttribute("id", "accordion")
    divAccordion.classList.add("plan-accordion")
    let counterFloors = 1;
    if (detailData.first_floor_area > 0) {
        counterFloors++
    };
    if (detailData.second_floor_area > 0) {
        counterFloors++
    };
    if (detailData.third_floor_area > 0) {
        counterFloors++
    };
    // console.log(counterFloors)
    for (let item = 1; item < counterFloors; item++) {

        let divPanel = document.createElement("div")
        divPanel.classList.add("panel")

        let divPanelHeader = document.createElement("div")
        divPanelHeader.classList.add("panel-header")
        divPanelHeader.setAttribute("id", "headingOne")

        let button = document.createElement("button")
        button.classList.add("panel-link")
        if (item == 1) {
            button.classList.add("active")
        };

        button.setAttribute("data-toggle", "collapse")
        button.setAttribute("data-target", `#collapse${item}`)
        button.setAttribute("aria-expanded", "false")
        button.setAttribute("aria-controls", `collapse${item}`)
        if (item == 1) {
            button.textContent = "First Floor:"
        };
        if (item == 2) {
            button.textContent = "Second Floor:"
        };
        if (item == 3) {
            button.textContent = "Third Floor:"
        };


        let span = document.createElement("span")
        span.textContent = `${detailData.house_area} Square foot`
        let i = document.createElement("i")
        i.classList.add("fa")
        i.classList.add("fa-angle-down")
        button.append(span, i)
        divPanelHeader.append(button)


        let divCollapse = document.createElement("div")
        divCollapse.classList.add("collapse")
        if (item == 1) {
            divCollapse.classList.add("show")
            divCollapse.setAttribute("aria-labelledby", "headingOne")
        };
        if (item == 2) {
            divCollapse.setAttribute("aria-labelledby", "headingTwo")
        };
        if (item == 3) {
            divCollapse.setAttribute("aria-labelledby", "headingThree")
        };

        divCollapse.setAttribute("id", `collapse${item}`)

        divCollapse.setAttribute("data-parent", "#accordion")

        let divPanelBody = document.createElement("div")
        divPanelBody.classList.add("panel-body")

        let img = document.createElement("img")
        img.setAttribute("src", "/src/img/plan-sketch.jpg")
        img.setAttribute("alt", "img")
        divPanelBody.append(img)
        divCollapse.append(divPanelBody)


        divPanel.append(divPanelHeader, divCollapse)
        divAccordion.append(divPanel)

    };

    for (let panel of divAccordion.querySelectorAll(".panel")) {

        panel.children[0].children[0].addEventListener("click", function (e) {

            panel.children[0].children[0].classList.toggle('active')
            panel.children[1].classList.toggle("show")
            e.preventDefault();
        });
    };
    return divAccordion
};


async function breadcrumb() {
    const divBread = document.createElement("div")
    divBread.classList.add("site-breadcrumb")

    let containerBread = document.createElement("div")
    containerBread.classList.add("container")
    let a = aIelements("/", "fa-home", "Home")

    let span = anyIelements("span", "fa-angle-right", "Single Listing")
    containerBread.append(a, span)
    divBread.append(containerBread)

    return divBread
}



export async function slDetailFeatures(detailData) {
    const sectionDetail = document.createElement("section")
    let breadcr = await breadcrumb()
    // console.log(breadcr)
    sectionDetail.append(breadcr)
    sectionDetail.classList.add("page-section")
    let spanButtons = document.createElement("span")
    let buttonEdit = await buttonElement("редактировать", ["editButton"], "edit")
    let buttonDelete = await buttonElement("удалить", ["deleteButton"], "delete")
    let divButton = document.createElement("div")
    divButton.classList.add("detailButtons")

    spanButtons.append(buttonDelete, buttonEdit)
    console.log(detailData, "+++")
    if (document.cookie){
        let cookieId = document.cookie.split(";")[0].split("=")[1]
        // console.log(detailData["users"]["roles"], "+---")
        // console.log(cookieId, "++---")

        if (detailData["users"]["roles"].includes("ROLE_ADMIN") && detailData["agent_id"] == cookieId){
            divButton.append(spanButtons)
        }
    }

   

    let containerDetail = document.createElement("div")
    containerDetail.classList.add("container")
    containerDetail.append(divButton)


    let rowDetail = document.createElement("div")
    rowDetail.classList.add("row")



    // let currentPage = "currentPage"
    // let detailData;
    // let p_url = location.search.substring(1)

    // if (localStorage[currentPage]) {
    //     let storage = jsonToData(localStorage[currentPage]);
    //     storage.forEach(function(elem, index) {
    //         if (Number(elem.id) == Number(p_url)) {
    //             detailData = elem};
    //     });
    // }
    // else{
    //     // response = await fetch(`http://127.0.0.1:8000/api/v1/properties/${p_url}/`);
    //     response = await fetch(`http://127.0.0.1:8000/api/v1/properties/1/`);
    //     detailData = await response.json();
    //     console.log(detailData)
    // };

    let currentPage = "currentPage"
    // let detailData;
    let response;

    // response = await fetch(`http://127.0.0.1:8000/api/v1/properties/2/`);
    // detailData = await response.json();



    if (detailData) {
        // console.log(detailData)


        let colSlider = document.createElement("div")
        colSlider.classList.add("col-lg-8", "single-list-page")

        let divslider = document.createElement("div")
        divslider.setAttribute("id", "sl-slider")

        // divslider.classList.add("single-list-slider")
        divslider.classList.add("block-slider")
        let divAreaSlider = document.createElement("div")
        divAreaSlider.classList.add("block-area-slider")

        //Arrows
        let divBtns = document.createElement("div")
        divBtns.classList.add("btnsAreaSize")

        let divArrowLeft = document.createElement("div")
        divArrowLeft.classList.add("blockArrow")
        divArrowLeft.setAttribute("id", "left-btn")

        let iArrowLeft = document.createElement("i")
        iArrowLeft.classList.add("fa")
        iArrowLeft.classList.add("fa-angle-left")
        iArrowLeft.setAttribute("aria-hidden", "true")
        divArrowLeft.append(iArrowLeft)


        let divArrowRight = document.createElement("div")
        divArrowRight.classList.add("blockArrow")
        divArrowRight.setAttribute("id", "right-btn")

        let iArrowRight = document.createElement("i")
        iArrowRight.classList.add("fa")
        iArrowRight.classList.add("fa-angle-right")
        iArrowRight.setAttribute("aria-hidden", "true")
        divArrowRight.append(iArrowRight)

        divBtns.append(divArrowLeft, divArrowRight)

        // Points
        let divPoint = document.createElement("div")
        divPoint.classList.add("point-size")
        for (let i = 0; i < 3; i++) {
            let spanPoint = document.createElement("span")
            spanPoint.classList.add("point")
            divPoint.append(spanPoint)
        };

        // Images
        let divImgArea = document.createElement("div")
        divImgArea.classList.add("img-area")

        detailData["photo"].forEach(function (elem) {
            let divImg = document.createElement("img")
            divImg.classList.add("img-item")
            divImg.setAttribute("src", `${elem}`)
            // divImg.setAttribute("src", elem)
            divImg.setAttribute("alt", "img")
            divImg.setAttribute("alt", "img")
            divImgArea.append(divImg)
        });
        divAreaSlider.append(divImgArea, divPoint, divBtns)
        divslider.append(divAreaSlider)

        let singleListContent = singleList(detailData)
        let sidebarElement = await sidebarAgent()

        // console.log(colSlider)
        colSlider.prepend(divslider, singleListContent)
        rowDetail.append(colSlider, sidebarElement)
        containerDetail.append(rowDetail)
        sectionDetail.append(containerDetail)


        pointsSlider(divArrowLeft, divArrowRight, divPoint, divImgArea)
        // pointsSlider()

        // let mainBlockSliderRun = document.querySelector("#sl-slider")

        // mainBlockSliderRun.addEventListener("mouseover", ()=>{
        //     clearInterval(timerImg)
        // });

        // mainBlockSliderRun.addEventListener("mouseleave", ()=>{
        //     timerImg = setInterval(() =>slowSlider(), seconds);
        // });

    };

    buttonDelete.addEventListener("click", async function (elem) {
        elem.preventDefault();
        console.log(detailData["id"], "=====")
        await deleteOneProperty(detailData["id"])
        router.navigate("/")
        window.location.reload();
    });

    buttonEdit.addEventListener("click", async function (elem) {
        elem.preventDefault();
        router.navigate("/edit/property/" + `${detailData["id"]}`)
    });

    return sectionDetail

};

let counterPointsSlow = 0;
let counterSlow = 0;

function slowSlider() {
    let points = document.querySelectorAll(".point")
    let images = document.querySelectorAll(".img-item")
    if (points[0]) {

        points[0].classList.add("active-image")
        images[0].classList.add("active-image")

        for (let i = 0; i < images.length; i++) {
            for (let p = 0; p < points.length; p++) {
                points[p].classList.remove("active-image")
            };
            images[i].classList.remove("active-image")
        };
        counterSlow++
        if (counterSlow >= images.length) {
            counterSlow = 0
        }

        if (counterPointsSlow > points.length - 1) {
            counterPointsSlow = 0
        }

        points[counterPointsSlow].classList.add("active-image")
        counterPointsSlow++

        images[counterSlow].classList.add("active-image")
    };
};


function pointsSlider(leftBtn, rightBtn, pointsRow, imagesRow) {
    let points = pointsRow.children
    let images = imagesRow.children

    // export function pointsSlider() {
    //     let leftBtn = document.querySelector("#left-btn")
    //     let rightBtn = document.querySelector("#right-btn")
    //     let points = document.querySelectorAll(".point")
    //     let images = document.querySelectorAll(".img-item")

    points[0].classList.add("point-active")
    images[0].classList.add("active-image")

    let counter = 0;

    for (let i = 0; i < points.length; i++) {
        points[i].addEventListener("click", () => {
            console.log("===")
            for (let k = 0; k < images.length; k++) {
                for (let p = 0; p < points.length; p++) {
                    points[p].classList.remove("point-active")
                };
                images[k].classList.remove("active-image")

            };
            counter = i;
            points[counter].classList.add("point-active")
            images[counter].classList.add("active-image")
        });
    };
    let counterPoints = 0;

    leftBtn.addEventListener("click", () => {
        // console.log("---")
        for (let i = 0; i < images.length; i++) {
            for (let p = 0; p < points.length; p++) {
                points[p].classList.remove("point-active")
            };
            images[i].classList.remove("active-image")
        };
        counter--
        if (counter < 0) {
            counter = images.length - 1
        }
        if (counterPoints > points.length - 1) {
            counterPoints = 0
        }
        // console.log(counterPoints,'==')
        points[counterPoints].classList.add("point-active")
        counterPoints++

        images[counter].classList.add("active-image")
    })


    rightBtn.addEventListener("click", (e) => {
        e.preventDefault();
        for (let i = 0; i < images.length; i++) {
            for (let p = 0; p < points.length; p++) {
                points[p].classList.remove("point-active")
            };
            images[i].classList.remove("active-image")
        };
        counter++
        if (counter >= images.length) {
            counter = 0
        }

        if (counterPoints > points.length - 1) {
            counterPoints = 0
        }
        // console.log(counterPoints,'==')
        points[counterPoints].classList.add("point-active")
        counterPoints++

        images[counter].classList.add("active-image")
    });
};

// function getIdFeature(itemRow) {

//     let rowFeature = itemRow.querySelectorAll(".col-lg-4 a")
//     for (let i = 0; i < rowFeature.length; i++) {
//         rowFeature[i].addEventListener("click", async function (elem) {
//             location.href = "index.html"
//             // location.href = `${rowFeature[i].href}?` + rowFeature[i].id
//         });
//     };
// };

