
//  import { getHeader } from "./components/header.js"
//  import { heroSection } from "./components/hero.js"
 import { filterFormSection } from '../components/filter-form.js'
 import { gallerySection } from '../components/gallery.js'
 import { feturesSection } from "../components/fetures-section.js"
 import { reviewSection } from "../components/review-slider.js"
 import { servicesSection } from "../components/services.js"
//  import { heroSection } from "../components/hero.js"

 import { mainSiteData } from "../../index.js"
//  import { footerSection } from "./components/footer-section.js"
//  import { footerSection } from "./components/footer-section.js"
 
 
 // var window_w = $(window).innerWidth();
 // $(window).on('load', function () {
 // 	/*------------------
 // 		Preloder
 // 	--------------------*/
 // 	$(".loader").fadeOut();
 // 	$("#preloder").delay(400).fadeOut("slow");
 // });
 
 
     /*------------------
             DOM
         --------------------*/

 
//  const app = document.querySelector("#app")

  
// export async function pageMainContainer() {
//     const page = document.createElement("container")
//     page.classList.add("container")
//     return page
// }
// export let mainPage = await pageMainContainer()
// let parameters = {
//     "feturesBlock": null,
//     "heroSection": null,
//     "filterForm": null,
//     "filterForm": null,
// }
export async function mainContainer(feturesBloc, cityName = '', paramsIn={}) {
    const mainPage = document.createElement("container")
    mainPage.classList.add("container")

    mainPage.innerHTML = ""

    // export const mainPage = pageContainer()
    const mainSite = await mainSiteData()
    // Header section 
    //  const headerSection = getHeader(main_site)
    
    
    // Hero section 
    // const heroBlock = await heroSection(mainSite)
    
    // Filter form section
    let filterForm = await filterFormSection(paramsIn)


    
    // Gallery section
    const galleryBlock = await gallerySection()

    
    // Feature section
    // let feturesBloc;
    let feturesBlock;


    if(feturesBloc === undefined){

     feturesBlock = await feturesSection()
     const galleryBlock = await gallerySection()
 
    }else{
        if (!cityName){
            
            let cityElem = filterForm.querySelector("#inCity")
            cityElem.value = paramsIn.city

            // if (cityName){
            //     cityElem.value = cityName}

            let inState = filterForm.querySelector("#inState")
            inState.value = paramsIn.state

            let rentSaleFlat = filterForm.querySelector("#rentSaleFlat")
            rentSaleFlat.value = paramsIn.status

            let sellFlatHouse = filterForm.querySelector("#sellFlatHouse")
            let sellRooms = filterForm.querySelector("#sellRooms")
            
            if (paramsIn.category == 1) {
                paramsIn.category = 'flat'
            };
            if (paramsIn.category == 2) {
                paramsIn.category = 'house'
                sellRooms.setAttribute("disabled", "disabled")
            };
            sellFlatHouse.value = paramsIn.category

            sellRooms.value = paramsIn.rooms
            
        } else {
            filterForm = await filterFormSection(cityName)
            
            let cityElem = filterForm.querySelector("#inCity")
            cityElem.value = cityName

        }
        galleryBlock.setAttribute("style", "display: none")
        feturesBlock = feturesBloc}


    
    

    
    // // Review section
    const reviewBlock = await reviewSection()
    
    // Services section
    const servicesBlock = await servicesSection(mainSite)
    
    // Clients section
    // const clientsBlock = await clientsSection(main_site)
    
    // Footer section
    //  const footerBlock = await footerSection(main_site)
    mainPage.innerHTML = ""


    mainPage.append(
        // heroBlock,
        filterForm,
        galleryBlock,
        feturesBlock, 
        reviewBlock,
        servicesBlock,
        )
    

     return mainPage
 }


 
 
 // let seconds = 1000 * 30
 // let timerImg = setInterval(() =>slowSlider(), seconds);
 
 
 // let counterPointsSlow = 0;
 let counterSlow = 0;
 
 function slowSlider() {
     // let points = document.querySelectorAll(".point")
     let images = document.querySelectorAll(".review-item")
     // if(points[0]) {
     
         // points[0].classList.add("active-image")
         images[0].classList.add("active-image")
         
 
         for(let i = 0; i < images.length; i++) {
             // for(let p = 0; p < points.length; p++) {
             // 	points[p].classList.remove("active-image")
             // };
             images[i].classList.remove("active-image")
         };
         counterSlow++
         if (counterSlow >= images.length) {
             counterSlow =  0
         }
         
         // if (counterPointsSlow > points.length-1) {
         // 	counterPointsSlow = 0
         // }
 
         // points[counterPointsSlow].classList.add("active-image")
         // counterPointsSlow++
         
         images[counterSlow].classList.add("active-image")
     // };
 };
 
 
 
 
 // let seconds = 1000 * 3
 // let timerImg = setInterval(() =>slowSliderclients(), seconds);
 let counterSlowclients = 0;
 
 function slowSliderclients() {
     // let points = document.querySelectorAll(".point")
     let images = document.querySelectorAll(".clients-slider")
     // let images = document.querySelectorAll(".clients-item")
     // if(points[0]) {
     
         // points[0].classList.add("active-image")
         images[0].classList.add("active-clients")

         
 
         for(let i = 0; i < images.length; i++) {
             // for(let p = 0; p < points.length; p++) {
             // 	points[p].classList.remove("active-image")
             // };
             images[i].classList.remove("active-clients")
         };
         counterSlowclients++
         if (counterSlowclients >= images.length) {
             counterSlowclients =  0
         }
         
         // if (counterPointsSlow > points.length-1) {
         // 	counterPointsSlow = 0
         // }
 
         // points[counterPointsSlow].classList.add("active-image")
         // counterPointsSlow++
         
         images[counterSlowclients].classList.add("active-clients")
     // };
     
 };
 
 
 // slowSliderclients()
 
//  slowSlider()
 
         
 
 
         
 
 
 
 // let divPagina = document.querySelector(".site-pagination")
 // if (divPagina) {
 // 	let pages = divPagina.childNodes[0].children
 // 	for (let link of pages){
 // 		link.addEventListener('click', async function (e) {
 // 			e.preventDefault();
 // 			let page = link.childNodes[0].textContent
 // 			window.scrollTo({ top: 1900, behavior: 'smooth' })
 // 	
 // 			const feturesBloc = await feturesSection(page = +page)
 // 	
 // 			app.innerHTML = ""
 // 			app.append(
 // 				headerSection,
 // 					heroBlock,
 // 					filterForm,
 // 					galleryBlock,
 // 					feturesBloc,
 // 					paginationBlock
 // 					)
             
 // 		});
 // 	};
 // };
 
 
 
 
 
 
 
 
     // let seconds = 1000 * 3
     // let timerImg = setInterval(() =>slowSlider(), seconds);
 
 
     // // Slider features Detail
 
     // function singleList(detailData){
     // 	let divSingleList = document.createElement("div")
     // 	divSingleList.classList.add("single-list-content")
 
     // 	let divRow = document.createElement("div")
     // 	divRow.classList.add("row")
 
     // 	let divCol8 = document.createElement("div")
     // 	divCol8.classList.add("col-xl-8")
     // 	divCol8.classList.add("sl-title")
 
     // 	let h2 = document.createElement("h2")
     // 	h2.textContent = detailData.street
 
     // 	let p = document.createElement("p")
     // 	let i = document.createElement("i")
     // 	i.classList.add("fa")
     // 	i.classList.add("fa-map-marker")
     // 	p.textContent = `${detailData.city}, ${detailData.state} ${detailData.postal_code}`
     // 	p.prepend(i)
     // 	divCol8.append(h2, p)
 
     // 	let divCol4 = document.createElement("div")
     // 	let a = document.createElement("a")
     // 	a.setAttribute("href", "#")
     // 	a.textContent = detailData.price
     // 	a.classList.add("price-btn")
     // 	divCol4.classList.add("col-xl-4")
     // 	divCol4.append(a)
 
     // 	divRow.append(divCol8, divCol4)
     // 	divSingleList.append(divRow)
 
 
     //     // Property Details
         
     // 	let h3 = document.createElement("h3")
     // 	h3.classList.add("sl-sp-title")
     // 	h3.textContent = "Property Details"
 
     // 	let divRowProperty = document.createElement("div")
     // 	divRowProperty.classList.add("row")
     // 	divRowProperty.classList.add("property-details-list")
 
         
     // 	let div461 = document.createElement("div")
     // 	div461.classList.add("col-md-4")
     // 	div461.classList.add("col-sm-6")
 
     // 	let pLarge = document.createElement("p")
     // 	pLarge.textContent = `${detailData.house_area} Square foot`
     // 	let iLarge = document.createElement("i")
     // 	iLarge.classList.add("fa")
     // 	iLarge.classList.add("fa-th-large")
     // 	pLarge.prepend(iLarge)
 
     // 	let pBed = document.createElement("p")
     // 	pBed.textContent = `${detailData.bedrooms} Bedrooms`
     // 	let iBed = document.createElement("i")
     // 	iBed.classList.add("fa")
     // 	iBed.classList.add("fa-bed")
     // 	pBed.prepend(iBed)
 
     // 	let pUser = document.createElement("p")
     // 	pUser.textContent = `${detailData.users.profile.first_name} Bedrooms`
     // 	let iUser = document.createElement("i")
     // 	iUser.classList.add("fa")
     // 	iUser.classList.add("fa-user")
     // 	pUser.prepend(iUser)
 
     // 	div461.append(pLarge, pBed, pUser)
 
 
     // 	let div462 = document.createElement("div")
     // 	div462.classList.add("col-md-4")
     // 	div462.classList.add("col-sm-6")
 
     // 	let pCar = document.createElement("p")
     // 	pCar.textContent = `${detailData.garages} Garages`
     // 	let iCar = document.createElement("i")
     // 	iCar.classList.add("fa")
     // 	iCar.classList.add("fa-car")
     // 	pCar.prepend(iCar)
 
     // 	let pBuilding = document.createElement("p")
     // 	pBuilding.textContent = `${detailData.categories.title}`
     // 	let iBuilding = document.createElement("i")
     // 	iBuilding.classList.add("fa")
     // 	iBuilding.classList.add("fa-building-o")
     // 	pBuilding.prepend(iBuilding)
 
     // 	let pClock = document.createElement("p")
     // 	pClock.textContent = `${detailData.time_published} days ago`
     // 	let iClock = document.createElement("i")
     // 	iClock.classList.add("fa")
     // 	iClock.classList.add("fa-clock-o")
     // 	pClock.prepend(iClock)
 
     // 	div462.append(pCar, pBuilding, pClock)
 
 
     // 	let div4Bath = document.createElement("div")
     // 	div4Bath.classList.add("col-md-4")
 
     // 	let pBath = document.createElement("p")
     // 	pBath.textContent = `${detailData.bathrooms} Bathrooms`
     // 	let iBath = document.createElement("i")
     // 	iBath.classList.add("fa")
     // 	iBath.classList.add("a-bath")
     // 	pBath.prepend(iBath)
 
     // 	let pTrophy = document.createElement("p")
     // 	pTrophy.textContent = `${detailData.age} years age`
     // 	let iTrophy = document.createElement("i")
     // 	iTrophy.classList.add("fa")
     // 	iTrophy.classList.add("fa-trophy")
     // 	pTrophy.prepend(iTrophy)
 
     // 	div4Bath.append(pBath, pTrophy)
 
     // 	divRowProperty.append(div461, div462, div4Bath)
 
 
     // 	let h3Descr = document.createElement("h3")
     // 	h3Descr.classList.add("sl-sp-title")
     // 	let divDescr = document.createElement("div")
     // 	divDescr.classList.add("description")
     // 	let pDescr = document.createElement("p")
     // 	pDescr.textContent = `${detailData.description}`
     // 	divDescr.append(pDescr)
 
     // 	let accordionPlanContent = accordionPlan(detailData)
 
     // 	divSingleList.append(h3, divRowProperty, h3Descr, divDescr, accordionPlanContent)
     // 	return divSingleList
     // };
 
 
     // // Accordion features Detail
 
     // function accordionPlan(detailData) {
     // 	// let accordion = document.querySelector("#accordion")
     // 	// let span = accordion.querySelector("#headingOne .panel-link span")
     // 	// span.textContent = `${detailData.house_area} Square foot`
  
 
     // 	let  h3Title = document.createElement("h3")
     // 	h3Title.classList.add("sl-sp-title")
     // 	h3Title.classList.add("bd-no")
     // 	h3Title.textContent = "Floor plans"
 
         
     // 	let  divAccordion = document.createElement("div")
     // 	divAccordion.setAttribute("id","accordion")
     // 	divAccordion.classList.add("plan-accordion")
     // 	let counterFloors = 1;
     // 	if(detailData.first_floor_area > 0){
     // 		counterFloors++
     // 	};
     // 	if(detailData.second_floor_area > 0){
     // 		counterFloors++
     // 	};
     // 	if(detailData.third_floor_area > 0){
     // 		counterFloors++
     // 	};

     // 	for(let item = 1; item < counterFloors; item++){
 
     // 		let  divPanel = document.createElement("div")
     // 		divPanel.classList.add("panel")
             
     // 		let  divPanelHeader = document.createElement("div")
     // 		divPanelHeader.classList.add("panel-header")
     // 		divPanelHeader.setAttribute("id","headingOne")
 
     // 		let  button = document.createElement("button")
     // 		button.classList.add("panel-link")
     // 		if(item == 1){
     // 			button.classList.add("active")
     // 		};
 
     // 		button.setAttribute("data-toggle","collapse")
     // 		button.setAttribute("data-target",`#collapse${item}`)
     // 		button.setAttribute("aria-expanded","false")
     // 		button.setAttribute("aria-controls",`collapse${item}`)
     // 		if(item == 1){
     // 			button.textContent = "First Floor:"
     // 		};
     // 		if(item == 2){
     // 			button.textContent = "Second Floor:"
     // 		};
     // 		if(item == 3){
     // 			button.textContent = "Third Floor:"
     // 		};
             
 
     // 		let  span = document.createElement("span")
     // 		span.textContent = `${detailData.house_area} Square foot`
     // 		let  i = document.createElement("i")
     // 		i.classList.add("fa")
     // 		i.classList.add("fa-angle-down")
     // 		button.append(span, i)
     // 		divPanelHeader.append(button)
 
 
     // 		let divCollapse = document.createElement("div")
     // 		divCollapse.classList.add("collapse")
     // 		if(item == 1){
     // 			divCollapse.classList.add("show")
     // 			divCollapse.setAttribute("aria-labelledby", "headingOne")
     // 		};
     // 		if(item == 2){
     // 			divCollapse.setAttribute("aria-labelledby", "headingTwo")
     // 		};
     // 		if(item == 3){
     // 			divCollapse.setAttribute("aria-labelledby", "headingThree")
     // 		};
             
     // 		divCollapse.setAttribute("id",`collapse${item}`)
             
     // 		divCollapse.setAttribute("data-parent", "#accordion")
 
     // 		let divPanelBody = document.createElement("div")
     // 		divPanelBody.classList.add("panel-body")
 
     // 		let img = document.createElement("img")
     // 		img.setAttribute("src", "img/plan-sketch.jpg")
     // 		img.setAttribute("alt", "img")
     // 		divPanelBody.append(img)
     // 		divCollapse.append(divPanelBody)
 
 
     // 		divPanel.append(divPanelHeader, divCollapse)
     // 		divAccordion.append(divPanel)
     // 	};
     // 	return divAccordion
     // };
 
 
 
     // async function slDetailFeatures() {
     // 	let currentPage = "currentPage"
     // 	let detailData;
     // 	let p_url = location.search.substring(1)
 
     // 	if (localStorage[currentPage]) {
     // 		let storage = jsonToData(localStorage[currentPage]);
     // 		storage.forEach(function(elem, index) {
     // 			if (Number(elem.id) == Number(p_url)) {
     // 				detailData = elem};
     // 		});
     // 	}
     // 	else{
     // 		response = await fetch(`http://127.0.0.1:8000/api/v1/properties/${p_url}/`);
     // 		detailData = await response.json();
     //
     // 	};
 
     // 	if (detailData) {
 
     
     // 		let colSlider = document.querySelector(".col-lg-8")
     // 		let divslider = document.createElement("div")
     // 		divslider.setAttribute("id", "sl-slider")
 
     // 		// divslider.classList.add("single-list-slider")
     // 		divslider.classList.add("block-slider")
     // 		let divAreaSlider = document.createElement("div")
     // 		divAreaSlider.classList.add("block-area-slider")
 
     // 		//Arrows
     // 		let divBtns = document.createElement("div")
     // 		divBtns.classList.add("btnsAreaSize")
 
     // 		let divArrowLeft = document.createElement("div")
     // 		divArrowLeft.classList.add("blockArrow")
     // 		divArrowLeft.setAttribute("id", "left-btn")
             
     // 		let iArrowLeft = document.createElement("i")
     // 		iArrowLeft.classList.add("fa")
     // 		iArrowLeft.classList.add("fa-angle-left")
     // 		iArrowLeft.setAttribute("aria-hidden", "true")
     // 		divArrowLeft.append(iArrowLeft)
             
 
     // 		let divArrowRight = document.createElement("div")
     // 		divArrowRight.classList.add("blockArrow")
     // 		divArrowRight.setAttribute("id", "right-btn")
 
     // 		let iArrowRight = document.createElement("i")
     // 		iArrowRight.classList.add("fa")
     // 		iArrowRight.classList.add("fa-angle-right")
     // 		iArrowRight.setAttribute("aria-hidden", "true")
     // 		divArrowRight.append(iArrowRight)
 
     // 		divBtns.append(divArrowLeft, divArrowRight)
 
     // 		// Points
     // 		let divPoint = document.createElement("div")
     // 		divPoint.classList.add("point-size")
     // 		for(let i=0; i < 3; i++){
     // 			let spanPoint = document.createElement("span")
     // 			spanPoint.classList.add("point")
     // 			divPoint.append(spanPoint)
     // 		};
 
     // 		// Images
     // 		let divImgArea = document.createElement("div")
     // 		divImgArea.classList.add("img-area")
 
     // 		detailData["photo"].forEach(function (elem) {
     // 			let divImg = document.createElement("img")
     // 			divImg.classList.add("img-item")
     // 			divImg.setAttribute("src", elem)
     // 			divImg.setAttribute("alt", "img")
     // 			divImg.setAttribute("alt", "img")
     // 			divImgArea.append(divImg)
     // 		});
     // 		divAreaSlider.append(divImgArea, divPoint, divBtns)
     // 		divslider.append(divAreaSlider)
 
     // 		let singleListContent = singleList(detailData)
             
 
     // 		colSlider.prepend(divslider, singleListContent)
     // 		pointsSlider ()
 
     // 		let mainBlockSliderRun = document.querySelector("#sl-slider")
     
     // 		mainBlockSliderRun.addEventListener("mouseover", ()=>{
     // 			clearInterval(timerImg)
     // 		});
 
     // 		mainBlockSliderRun.addEventListener("mouseleave", ()=>{
     // 			timerImg = setInterval(() =>slowSlider(), seconds);
     // 		});
 
     // 	};
     
     // };
 
     // let counterPointsSlow = 0;
     // let counterSlow = 0;
 
     // function slowSlider() {
     // 	let points = document.querySelectorAll(".point")
     // 	let images = document.querySelectorAll(".img-item")
     // 	if(points[0]) {
         
     // 		points[0].classList.add("active-image")
     // 		images[0].classList.add("active-image")
             
 
     // 		for(let i = 0; i < images.length; i++) {
     // 			for(let p = 0; p < points.length; p++) {
     // 				points[p].classList.remove("active-image")
     // 			};
     // 			images[i].classList.remove("active-image")
     // 		};
     // 		counterSlow++
     // 		if (counterSlow >= images.length) {
     // 			counterSlow =  0
     // 		}
             
     // 		if (counterPointsSlow > points.length-1) {
     // 			counterPointsSlow = 0
     // 		}
 
     // 		points[counterPointsSlow].classList.add("active-image")
     // 		counterPointsSlow++
             
     // 		images[counterSlow].classList.add("active-image")
     // 	};
     // };
 
 
     // function pointsSlider () {
     // 	let leftBtn = document.querySelector("#left-btn")
     // 	let rightBtn = document.querySelector("#right-btn")
 
     // 	let points = document.querySelectorAll(".point")
         
     // 	let images = document.querySelectorAll(".img-item")
     
     // 	points[0].classList.add("active-image")
     // 	images[0].classList.add("active-image")
 
     // 	let counter = 0;
 
     // 	for(let i = 0; i < points.length; i++) {
     // 		points[i].addEventListener("click", ()=>{
     // 			for(let k = 0; k < images.length; k++) {
     // 				for(let p = 0; p < points.length; p++) {
     // 					points[p].classList.remove("active-image")
     // 				};
             
     // 				images[k].classList.remove("active-image")
                     
     // 			};
     // 			counter = i; 
     // 			points[counter].classList.add("active-image")
     // 			images[counter].classList.add("active-image")
     // 		});
     // 	};
     // 	let counterPoints = 0;
 
     // 	leftBtn.addEventListener("click", ()=> {
     // 		for(let i = 0; i < images.length; i++) {
     // 			for(let p = 0; p < points.length; p++) {
     // 				points[p].classList.remove("active-image")
     // 			};
     // 			images[i].classList.remove("active-image")
     // 		};
     // 		counter--
     // 		if (counter < 0) {
     // 			counter =  images.length - 1
     // 		}
     // 		if (counterPoints > points.length-1) {
     // 			counterPoints = 0
     // 		}

     // 		points[counterPoints].classList.add("active-image")
     // 		counterPoints++
 
     // 		images[counter].classList.add("active-image")
     // 	})
         
 
     // 	rightBtn.addEventListener("click", ()=> {
     // 		for(let i = 0; i < images.length; i++) {
     // 			for(let p = 0; p < points.length; p++) {
     // 				points[p].classList.remove("active-image")
     // 			};
     // 			images[i].classList.remove("active-image")
     // 		};
     // 		counter++
     // 		if (counter >= images.length) {
     // 			counter =  0
     // 		}
             
     // 		if (counterPoints > points.length-1) {
     // 			counterPoints = 0
     // 		}
   
     // 		points[counterPoints].classList.add("active-image")
     // 		counterPoints++
             
     // 		images[counter].classList.add("active-image")
     // 	});
     // };
 
     // function getIdFeature(itemRow) {
 
     // 	let rowFeature = itemRow.querySelectorAll(".col-lg-4 a")
     // 	for (let i = 0; i < rowFeature.length; i++) {
     // 		rowFeature[i].addEventListener("click", async function (elem) {
     // 			location.href = `${rowFeature[i].href}?` + rowFeature[i].id
     // 		});
     // 	};
     // };
 
     // slDetailFeatures()
 
 
     // // Pagination
 
     // async function pagination(propertyData, currentPage) {

     // 	window.scrollTo({ top: 1900, behavior: 'smooth' })
 
     // 	if (propertyData["pages"] > 0) {
 
     // 		let divPagina = document.querySelector(".site-pagination")
     // 		divPagina.innerHTML = ""
 
     // 		let aPreview = document.createElement("a")
     // 		let iLeft = document.createElement("i")
 
     // 		aPreview.setAttribute("href", `?page=${propertyData["page"] - 1}`)
 
     // 		iLeft.classList.add("fa")
     // 		iLeft.classList.add("fa-angle-left")
 
     // 		aPreview.append(iLeft)
 
     // 		let aNext = document.createElement("a")
     // 		let iRight = document.createElement("i")
 
     // 		aNext.setAttribute("href", `?page=${propertyData["page"] + 1}`)
 
     // 		iRight.classList.add("fa")
     // 		iRight.classList.add("fa-angle-right")
     // 		aNext.append(iRight)
 
     // 		let liNext = document.createElement("li")
     // 		liNext.setAttribute("style", "display: inline-block")
     // 		liNext.append(aNext)
     // 		let ul = document.createElement("ul")
     // 		ul.setAttribute("style", "list-style-type: none")
 
     // 		let liPreview = document.createElement("li")
     // 		liPreview.setAttribute("style", "display: none")
 
     // 		if (propertyData["page"] > 1) {
     // 			liPreview.style.display = "inline-block"
     // 			liPreview.append(aPreview)
     // 		};
     // 		ul.append(liPreview)
 
     // 		for (let element = 1; element <= propertyData["pages"]; element++) {
 
     // 			let a = document.createElement("a")
     // 			let li = document.createElement("li")
     // 			a.setAttribute("style", "display='none'")
     // 			li.setAttribute("style", "display='none'")
 
 
     // 			if (element >= (propertyData["page"] - 2) && element <= (propertyData["page"] + 2)) {
     // 				a.setAttribute("href", `?page=${element}`)
     // 				a.textContent = element
     // 				li.setAttribute("style", "display: inline-block")
     // 				li.append(a)
     // 				ul.append(li)
     // 			};
     // 			if (element == propertyData["page"]) {
     // 				a.removeAttribute("href")
     // 				a.style.color = "#d4d2d2"
     // 			};
     // 		};
     // 		if (currentPage == propertyData["pages"]) {
     // 			liNext.style.display = "none"
     // 		};
     // 		ul.append(liNext)
     // 		divPagina.append(ul)
 
     // 	};
     // };
 
     // let sitePagination = document.querySelector('.site-pagination')
     // if (sitePagination) {
     // 	sitePagination.addEventListener('click', function (e) {
     // 		if (e.target.tagName == "A") {
     // 			e.preventDefault();
     // 			let url = String(e.target.href)
     // 			let page = url.slice(url.length - 3, url.length).match(/\d+/)[0]
     // 			window.scrollTo({ top: 1900, behavior: 'smooth' })
     // 			feturesSection(page = +page, params = params,)
     // 		}
     // 	});
     // };
 
 
     // // Services section
 
     // async function servicesSection() {
     // 	let itemElement = document.querySelector(".services-section")
     // 	let container;
     // 	if (itemElement) {
     // 		container = itemElement.querySelector(".col-lg-6")
 
     // 		let element = main_site["servicesSection"]
     // 		let img = document.createElement("img")
     // 		img.setAttribute("src", element["image"])
     // 		img.setAttribute("alt", "service")
     // 		container.append(img)
 
 
     // 		let sectionTitle = itemElement.querySelector(".section-title")
     // 		let h3 = document.createElement("h3")
     // 		let p = document.createElement("p")
     // 		h3.textContent = element["h3"]
     // 		p.textContent = element["p"]
     // 		sectionTitle.append(h3, p)
 
     // 		let services = itemElement.querySelector(".services")
     // 		element["serviceItems"].forEach(function (element, idx) {
     // 			let div = document.createElement("div")
     // 			div.classList.add("service-item")
     // 			let i = document.createElement("i")
     // 			i.classList.add("fa")
     // 			if (idx == 0) { i.classList.add("fa-comments") }
     // 			if (idx == 1) { i.classList.add("fa-home") }
     // 			if (idx == 2) { i.classList.add("fa-briefcase") }
     // 			div.append(i)
     // 			let div2 = document.createElement("div")
     // 			let h5 = document.createElement("h5")
     // 			let p = document.createElement("p")
 
     // 			h5.textContent = element["h5"]
     // 			p.textContent = element["p"]
     // 			div2.classList.add("service-text")
     // 			div2.append(h5, p)
     // 			div.append(div2)
     // 			services.append(div)
     // 		});
     // 	};
 
     // };
 
     // // Review section
 
     // async function reviewSection() {
 
     // 	let element = main_site["review"]
     // 	let itemElement = document.querySelector(".review-section")
     // 	let reviewSlider;
     // 	if (itemElement) {
     // 		reviewSlider = itemElement.querySelector(".review-slider")
     // 		reviewSlider.classList.add("owl-carousel")
     // 		reviewSlider.classList.add("owl-item")
     // 		reviewSlider.classList.add("owl-drag")
     // 		reviewSlider.classList.add("owl-loaded")
 
     // 		element["reviewItems"].forEach(function (elem, idx) {
     // 			let h5 = document.createElement("h5")
     // 			let p = document.createElement("p")
     // 			let span = document.createElement("span")
     // 			let div2 = document.createElement("div")
     // 			let div3 = document.createElement("div")
     // 			div2.classList.add("rating")
     // 			div3.classList.add("review-item")
     // 			div3.classList.add("text-white")
 
     // 			for (let num = 0; num < 5; num++) {
     // 				let i = document.createElement("i")
     // 				i.classList.add("fa")
     // 				i.classList.add("fa-star")
     // 				div2.append(i)
     // 			}
 
     // 			p.textContent = elem["p"]
     // 			h5.textContent = elem["h5"]
     // 			span.textContent = elem["span"]
     // 			let div = document.createElement("div")
 
 
     // 			div.classList.add("clint-pic")
     // 			div.classList.add("set-bg")
     // 			div.setAttribute("data-setbg", `${elem["image"]}`)
     // 			div.setAttribute("style", `background-image: url(${elem["image"]});`)
     // 			div3.append(p, h5, span, div, div2)
 
     // 			reviewSlider.append(div3)
     // 		});
     // 		return reviewSlider
     // 	};
     // };
 
     // // Clients section 
 
     // async function clientsSection() {
 
     // 	let element = main_site["clients"]
     // 	let itemElement = document.querySelector(".clients-section")
     // 	let clientsSlider = itemElement.querySelector(".clients-slider")
 
     // 	clientsSlider.classList.add("owl-carousel")
     // 	clientsSlider.classList.add("owl-loaded")
     // 	clientsSlider.classList.add("owl-drag")
 
     // 	element.forEach(function (elem, idx) {
     // 		let link = document.createElement("a")
     // 		link.setAttribute("href", "https://ya.ru")
     // 		let img = document.createElement("img")
     // 		img.setAttribute("src", elem)
     // 		img.setAttribute("alt", "client")
     // 		link.append(img)
     // 		clientsSlider.append(link)
     // 	});
     // 	return clientsSlider
     // };
 
     // // Footer section
 
 
     // async function footerSection() {
 
     // 	let element = main_site["footer"]
 
     // 	let itemElement = document.querySelector(".footer-section")
     // 	let rowElement = itemElement.querySelector(".row")
 
     // 	for (let idx = 0; idx < 4; idx++) {
     // 		let divCol = document.createElement("div")
     // 		divCol.classList.add("col-lg-3")
     // 		divCol.classList.add("col-md-6")
     // 		divCol.classList.add("footer-widget")
 
     // 		if (idx == 0) {
 
     // 			let img = document.createElement("img")
     // 			img.setAttribute("src", element["image"])
     // 			img.setAttribute("alt", "logo")
 
     // 			let p = document.createElement("p")
     // 			p.textContent = element["p"]
     // 			let divLinks = document.createElement("div")
     // 			divLinks.classList.add("social")
 
     // 			element["socialLinks"].forEach(function (elem, idx) {
 
     // 				let a = document.createElement("a")
     // 				a.setAttribute("href", elem)
     // 				let i = document.createElement("i")
     // 				i.classList.add("fa")
     // 				if (idx == 0) { i.classList.add("fa-facebook") }
     // 				if (idx == 1) { i.classList.add("fa-twitter") }
     // 				if (idx == 2) { i.classList.add("fa-instagram") }
     // 				if (idx == 3) { i.classList.add("fa-pinterest") }
     // 				if (idx == 4) { i.classList.add("fa-linkedin") }
     // 				a.append(i)
     // 				divLinks.append(a)
     // 			});
     // 			divCol.append(img, p, divLinks)
     // 		};
     // 		rowElement.append(divCol)
 
     // 		if (idx == 1) {
 
     // 			let divContact = document.createElement("div")
     // 			divContact.classList.add("contact-widget")
 
     // 			let h5 = document.createElement("h5")
     // 			h5.classList.add("fw-title")
     // 			h5.textContent = "CONTACT US"
     // 			divContact.append(h5)
 
     // 			element["contacts"].forEach(function (elem, idx) {
     // 				let p = document.createElement("p");
     // 				let i = document.createElement("i")
     // 				i.classList.add("fa")
     // 				if (idx == 0) {
     // 					p.textContent = elem
     // 					i.classList.add("fa-map-marker")
     // 				};
     // 				if (idx == 1) {
     // 					p.textContent = elem
     // 					i.classList.add("fa-phone")
     // 				};
     // 				if (idx == 2) {
     // 					p.textContent = elem
     // 					i.classList.add("fa-envelope")
     // 				};
     // 				if (idx == 3) {
     // 					p.textContent = elem
     // 					i.classList.add("fa-clock-o")
     // 				};
     // 				p.prepend(i)
     // 				divContact.append(p)
     // 			});
     // 			divCol.prepend(divContact)
     // 		};
 
 
     // 		if (idx == 2) {
 
     // 			let divDouble = document.createElement("div")
     // 			divDouble.classList.add("double-menu-widget")
 
     // 			let h5 = document.createElement("h5")
     // 			h5.classList.add("fw-title")
     // 			h5.textContent = "POPULAR PLACES"
     // 			divDouble.append(h5)
 
     // 			let ul = document.createElement("ul")
 
     // 			element["popularPlacesLinks"][0].forEach(function (elem, idx) {
     // 				let li = document.createElement("li");
     // 				let a = document.createElement("a");
     // 				a.setAttribute("href", "https://ya.ru")
     // 				a.textContent = elem["title"]
     // 				li.append(a)
 
     // 				ul.append(li)
     // 			});
     // 			divDouble.append(ul)
     // 			let ul2 = document.createElement("ul")
 
     // 			element["popularPlacesLinks"][1].forEach(function (elem, idx) {
     // 				let li = document.createElement("li");
     // 				let a = document.createElement("a");
     // 				a.setAttribute("href", "https://ya.ru")
     // 				a.textContent = elem["title"]
     // 				li.append(a)
 
     // 				ul2.append(li)
     // 			});
     // 			divDouble.append(ul2)
     // 			divCol.append(divDouble)
     // 		};
     // 		rowElement.append(divCol)
 
     // 		if (idx == 3) {
 
     // 			let divNewslatter = document.createElement("div")
     // 			divNewslatter.classList.add("newslatter-widget")
 
     // 			let h5 = document.createElement("h5")
     // 			h5.classList.add("fw-title")
     // 			h5.textContent = "NEWSLETTER"
 
     // 			let p = document.createElement("p")
     // 			p.textContent = "Subscribe your email to get the latest news and new offer also discount"
     // 			let form = document.createElement("form")
     // 			form.classList.add("footer-newslatter-form")
     // 			let input = document.createElement("input")
     // 			input.setAttribute("type", "text")
     // 			input.setAttribute("placeholder", "Email address")
     // 			let button = document.createElement("button")
     // 			let i = document.createElement("i")
     // 			i.classList.add("fa")
     // 			i.classList.add("fa-send")
     // 			button.append(i)
     // 			form.append(input, button)
     // 			divNewslatter.append(h5, p, form)
     // 			divCol.append(divNewslatter)
 
     // 		};
     // 		rowElement.append(divCol)
     // 	};
     // };
 
 
     // async function footerBbottom() {
 
     // 	let element = main_site["footer"]
 
 
     // 	let itemElement = document.querySelector(".footer-section")
     // 	let containerElement = itemElement.querySelector(".container")
 
 
     // 	let divBottom = document.createElement("div")
     // 	divBottom.classList.add("footer-bottom")
 
     // 	let nav = document.createElement("div")
     // 	nav.classList.add("footer-nav")
 
     // 	let divCopyright = document.createElement("div")
     // 	divCopyright.classList.add("copyright")
 
     // 	let p = document.createElement("p")
     // 	p.innerHTML = `Copyright &copy ${new Date().getFullYear()} All rights reserved `
     // 	divCopyright.append(p)
     // 	let ul = document.createElement("ul")
 
     // 	element["footerBottom"].forEach(function (elem, idx) {
     // 		let li = document.createElement("li");
     // 		let a = document.createElement("a");
     // 		a.setAttribute("href", elem["link"])
     // 		a.textContent = elem["text"]
     // 		li.append(a)
     // 		ul.append(li)
     // 	});
     // 	nav.append(ul)
     // 	divBottom.append(nav, divCopyright)
     // 	containerElement.append(divBottom)
     // };
 
 
 
 
 
 // mainMenu()
 // heroSection()
 // servicesSection()
 // footerSection()
 // footerBbottom()
 // feturesSection()
 // gallerySection()
 
 
 
 
     // jQuery
 
 
 // 	/*------------------
 // 		Navigation
 // 	--------------------*/
 // 	$('.nav-switch').on('click', function (event) {
 // 		$('.main-menu').slideToggle(400);
 // 		event.preventDefault();
 // 	});
 
 
 // 	/*------------------
 // 		Background set
 // 	--------------------*/
 // 	$('.set-bg').each(function () {
 // 		var bg = $(this).data('setbg');
 // 		$(this).css('background-image', 'url(' + bg + ')');
 // 	});
 
 
 
 // 	$('.gallery').find('.gallery-item').each(function () {
 // 		var pi_height1 = $(this).outerWidth(true),
 // 			pi_height2 = pi_height1 / 2;
 
 // 		if ($(this).hasClass('grid-long') && window_w > 991) {
 // 			$(this).css('height', pi_height2);
 // 		} else {
 // 			$(this).css('height', Math.abs(pi_height1));
 // 		}
 // 	});
 
 
 
 // 	$('.gallery').masonry({
 // 		itemSelector: '.gallery-item',
 // 		columnWidth: '.grid-sizer',
 // 		gutter: 20
 // 	});
 
 
 // 	/*------------------
 // 		Review Slider
 // 	--------------------*/
 
 
 // 	$('.review-slider').append(reviewSection())
 // 	$('.review-slider').owlCarousel({
 // 		loop: true,
 // 		margin: 0,
 // 		nav: false,
 // 		items: 1,
 // 		dots: true,
 // 		autoplay: true,
 // 	});
 
 
 // 	$('.clients-slider').append(clientsSection())
 // 	$('.clients-slider').owlCarousel({
 // 		loop: true,
 // 		autoplay: true,
 // 		margin: 30,
 // 		nav: false,
 // 		dots: true,
 // 		responsive: {
 // 			0: {
 // 				items: 2,
 // 				margin: 10
 // 			},
 // 			600: {
 // 				items: 3
 // 			},
 // 			800: {
 // 				items: 3
 // 			},
 // 			1000: {
 // 				items: 5
 // 			}
 // 		}
 // 	});
 
 
 // 	// // /*------------------
 // 	// // 	Review Slider
 // 	// // --------------------*/
 
     
 
     
 
 // 	// var sync1 = $("#sl-slider") //.append(slDetailFeatures())
 // 	// var sync2 = $("#sl-slider-thumb") //.append(thumbDetailFeatures());
     
 
 
 // 	var slidesPerPage = 4; //globaly define number of elements per page
 // 	var syncedSecondary = true;
 
 // 	// sync1.owlCarousel({
 // 	// 	items: 1,
 // 	// 	slideSpeed: 2000,
 // 	// 	nav: false,
 // 	// 	autoplay: true,
 // 	// 	dots: true,
 // 	// 	loop: true,
 // 	// 	responsiveRefreshRate: 200,
 // 	// }).on('changed.owl.carousel', syncPosition);
 
 // 	// sync2.on('initialized.owl.carousel', function () {
 // 	// 	sync2.find(".owl-item").eq(0).addClass("current");
 // 	// }).owlCarousel({
 // 	// 	items: slidesPerPage,
 // 	// 	dots: true,
 // 	// 	nav: true,
 // 	// 	margin: 10,
 // 	// 	smartSpeed: 200,
 // 	// 	slideSpeed: 500,
 // 	// 	navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
 // 	// 	slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
 // 	// 	responsiveRefreshRate: 100
 // 	// }).on('changed.owl.carousel', syncPosition2);
 
 // 	function syncPosition(el) {
 // 		//if you set loop to false, you have to restore this next line
 // 		var current = el.item.index;
 // 		//if you disable loop you have to comment this block
 // 		var count = el.item.count - 1;
 // 		var current = Math.round(el.item.index - (el.item.count / 2) - .5);
 
 // 		if (current < 0) {
 // 			current = count;
 // 		}
 // 		if (current > count) {
 // 			current = 0;
 // 		}
 
 // 		//end block
 // 		sync2.find(".owl-item").removeClass("current").eq(current).addClass("current");
 // 		var onscreen = sync2.find('.owl-item.active').length - 1;
 // 		var start = sync2.find('.owl-item.active').first().index();
 // 		var end = sync2.find('.owl-item.active').last().index();
 
 // 		if (current > end) {
 // 			sync2.data('owl.carousel').to(current, 100, true);
 // 		}
 // 		if (current < start) {
 // 			sync2.data('owl.carousel').to(current - onscreen, 100, true);
 // 		}
 // 	}
 
 // 	function syncPosition2(el) {
 // 		if (syncedSecondary) {
 // 			var number = el.item.index;
 // 			sync1.data('owl.carousel').to(number, 100, true);
 // 		}
 // 	}
 
 // 	// sync2.on("click", ".owl-item", function (e) {
 // 	// 	e.preventDefault();
 // 	// 	var number = $(this).index();
 // 	// 	sync1.data('owl.carousel').to(number, 300, true);
 // 	// });
 
 
 // 	/*------------------
 // 		Accordions
 // 	--------------------*/
 // 	$('.panel-link').on('click', function (e) {
 // 		$('.panel-link').removeClass('active');
 // 		var $this = $(this);
         
 // 		if (!$this.hasClass('active')) {
 // 			$this.addClass('active');
 // 		}
 // 		e.preventDefault();
 // 	});
 
 // 	$('.video-link').magnificPopup({
 // 		disableOn: 700,
 // 		type: 'iframe',
 // 		mainClass: 'mfp-fade',
 // 		removalDelay: 160,
 // 		preloader: false,
 
 // 	});
 
 // // (jQuery);
 
 
 
 
 
 
 
 
 
