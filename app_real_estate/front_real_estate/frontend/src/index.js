/* =================================
------------------------------------
	LERAMIZ - Landing Page Template
	Version: 1.0
 ------------------------------------ 
 ====================================*/
import Navigo from "navigo";


// import { jsonToData, setStorageData, deleteStorageData } from "./utils.js"
import { getHeader } from "./js/components/header.js"
import { heroSection } from "./js/components/hero.js"
import { heroSectionDetail } from "./js/components/hero-detail.js"
// import { filterFormSection } from './components/filter-form.js'
// import { gallerySection } from './components/gallery.js'
// import { feturesSection } from "./components/fetures-section.js"
// import { reviewSection } from "./components/review-slider.js"
import { getOneProperty } from "./js/components/list-properties.js"
import { getOneProfileByUser, getOneProfile } from "./js/components/list-profiles.js"
import { registrationForm, loginForm } from "./js/components/form-reg-login.js"

import { detailProfile } from "./js/pages/detail-profile.js"
import { kabinet } from "./js/pages/lk.js"
import { slDetailFeatures } from "./js/pages/detail-property.js"
import { detailNew } from "./js/pages/detail-property-edit.js"
import { profileNew } from "./js/pages/detail-profile-edit.js"

import { mainContainer } from "./js/pages/main-page.js"

import { footerSection } from "./js/components/footer-section.js"


export const router = new Navigo('/');

setTimeout(function(){
	document.body.classList.add('body_visible');
}, 200);


function syncLogout(event) {
	if (event.key === 'logout') {
		router.navigate("/")

	}
}
document.addEventListener('storage', syncLogout)


export async function mainSiteData() {

	let response = await fetch('https://api.estate.tesseractmaks.tech/api/v1/main_site/',
	{
		"Access-Control-Allow-Origin": "https://estate.tesseractmaks.tech/"
	// 	mode: "no-cors"
	}
	)
	
	const mainData = await response.json();
	console.log(mainData)

	window.scrollTo({ top: 0, behavior: 'smooth' })

	return mainData
};

const mainSite = await mainSiteData()
// console.log(mainSite)


const app = document.querySelector("#app")

export function getPageContainer() {
	const page = document.createElement("container")
	page.classList.add("container")

	// if (pages) {
	// 	page.append(pages)
	// 	console.log(page,"==")

	// 	app.append(
	// 		headerSection, 
	// 		page,
	// 		pageContainer,
	// 		footerBlock,
	// 		)
	// }
	return page
}
export const pageContainer = getPageContainer()
// pageContainer.innerHTML = ""
// Header section 
export const headerSection = await getHeader(mainSite)

// Hero section
export const heroBlock = heroSection(mainSite)
// Hero section Detail
export const heroBlockDetail = await heroSectionDetail()

// Filter form section
// const filterForm = filterFormSection()
// 
// Gallery section
// const galleryBlock = await gallerySection()

// Feature section
const mainPage = await mainContainer()

// Chat 


// console.log(chatBlock)

// // Review section
// const reviewBlock = await reviewSection()

// Services section
// const servicesBlock = await servicesSection(main_site)

// Clients section
// const clientsBlock = await clientsSection(main_site)

// Footer section
export const footerBlock = await footerSection(mainSite)

// export const detailBlockEdit = detailNew()

// main.append(feturesBlock, servicesBlock, reviewBlock, footerBlock)

// pageContainer.innerHTML = ""
// pageContainer.append(detailBlock)
// pageContainer.append(detailBlockEdit)
// pageContainer.append(heroBlockDetail, detailBlock)
function checkRefreshToken() {
	if (document.cookie) {
		const currentDate = new Date().toISOString();
		let decodedString = atob(document.cookie.split(".")[1]);
		let exp = Object.values(JSON.parse(decodedString))[1]
		let date = new Date(exp * 1000);
		let expToken = date.toISOString()
		// console.log(currentDate," | ",expToken)
		if (currentDate > expToken) {
			router.navigate("login/")
		}
	}
}
 
const mainContaner = document.createElement("contaner")
router.on('/', function () {
	mainContaner.innerHTML = ""
	pageContainer.innerHTML = ""
	if (mainPage != "undefined") {
		pageContainer.append(mainPage)
	}
	mainContaner.append(heroBlock, pageContainer)
});


// Property
router.on('/detail/:id', async function (e) {
	checkRefreshToken()

	// let ca = document.cookie;
	// console.log(ca, "=-")

	let myHeaders = `Bearer `;
	// let myHeaders = `Bearer ${document.cookie.refresh_token}`;
	// console.log(e.data.id, "--")

	mainContaner.innerHTML = ""
	pageContainer.innerHTML = ""
	const detailData = await getOneProperty(e.data.id, myHeaders)
	const detailBlock = await slDetailFeatures(detailData)
	pageContainer.append(detailBlock)
	mainContaner.append(heroBlockDetail, pageContainer)
});

router.on('/edit/property/:id', async function (e) {
	checkRefreshToken()
	// console.log(e.data.id)
	mainContaner.innerHTML = ""
	pageContainer.innerHTML = ""
	const detailData = await getOneProperty(e.data.id)

	let sectionNewDetail = await detailNew(detailData)
	pageContainer.innerHTML = ""

	pageContainer.append(sectionNewDetail)
	mainContaner.append(heroBlockDetail, pageContainer)
});


// Profiles
// console.log(document.cookie, "--")
let profileQy = headerSection.querySelector("#profile-panel")

if (profileQy){
profileQy.addEventListener('click', async function (e) {
	checkRefreshToken()
	// console.log(e.data.id,"----======------")
	mainContaner.innerHTML = ""
	pageContainer.innerHTML = ""
	const profileData = await getOneProfileByUser(profileQy.dataset.id)

	const detailBlock = await detailProfile(profileData)
	pageContainer.append(detailBlock)
	mainContaner.append(heroBlockDetail, pageContainer)
});
};

router.on('/edit/profile/:id', async function (e) {
	checkRefreshToken()
	// console.log(e.data.id)
	mainContaner.innerHTML = ""
	pageContainer.innerHTML = ""
	const profileData = await getOneProfile(e.data.id)

	let sectionNewDetail = await profileNew(profileData)
	pageContainer.innerHTML = ""

	pageContainer.append(sectionNewDetail)
	mainContaner.append(heroBlockDetail, pageContainer)
});

//  Lk
let accountQy = headerSection.querySelector("#account-panel")
if (accountQy){
accountQy.addEventListener('click', async function (e) {

	checkRefreshToken()
	console.log(accountQy.dataset.id,"+--")
	mainContaner.innerHTML = ""
	pageContainer.innerHTML = ""
	try{
	   const profileData = await getOneProfile(accountQy.dataset.id)
        
	   profileData["users"]["roles"]
	   const detailBlock = await kabinet(profileData)
           pageContainer.append(detailBlock)
           mainContaner.append(heroBlockDetail, pageContainer)

	}
        catch(err){
            console.log(alert === window.alert("профиль у модератора"));
            window.location.reload()
	}

});
};


router.on('/profile/:id', async function (e) {
	checkRefreshToken()
        console.log(e.data.id,"---4---");
        mainContaner.innerHTML = ""
        pageContainer.innerHTML = ""
        const profileData = await getOneProfileByUser(e.target.dataset.id)
        console.log(profileData,"=====------")
        const detailBlock = await detailProfile(profileData)
        pageContainer.append(detailBlock)
        mainContaner.append(heroBlockDetail, pageContainer)
});

//   Registration/login
let regQy = headerSection.querySelector("#register-panel")
if (regQy){
regQy.addEventListener('click', async function (e) {

	// console.log(e.data.id)
//	mainContaner.innerHTML = ""
//	pageContainer.innerHTML = ""
	const reg = await registrationForm()
	// let authModal = headerSection.querySelector(".modal")
	reg.classList.add("open")
	// authModal.classList.add("open")
	pageContainer.append(reg)
	mainContaner.append(heroBlock, pageContainer)

	let regForm = document.querySelector(".modal form")

	regForm.addEventListener("submit", async function (elem) {
		let modalElem = document.querySelector(".modal")
		modalElem.classList.remove("open")
		elem.preventDefault();

		let regUsername = document.querySelectorAll(".modal #reg-username")
		let regPassword = document.querySelectorAll(".modal #reg-password")

		//  one@mail.ru1
		//  qwerty

		// Array.from(regForm).forEach(async function (e) {

		// console.log(regUsername[0].value, regPassword[0].value)

		let formData = new FormData()


		formData.append('username', regUsername[0].value);
		formData.append('password', regPassword[0].value)
		// formData.append('is_active', true)
		// console.log(formData, "+----")


		const response = await fetch('https://api.estate.tesseractmaks.tech/api/v1/users/',
			{
				method: 'POST',
				body: JSON.stringify(
					{
						'email': regUsername[0].value,
						'password': regPassword[0].value,
						'is_active': true
					}
				),
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': "https://estate.tesseractmaks.tech"
				},
				credentials: 'include'
			})

		const data = await response.json();


		// let formData = new FormData()
		// 	formData.append('username', loginUsername[0].value);
		// 	formData.append('password', loginPassword[0].value)
		const currentDate = new Date().toISOString();

		
		if (data.is_active) {
			const response = await fetch('https://api.estate.tesseractmaks.tech/token',
				{
					method: 'POST',
					body: formData,
					// body: JSON.stringify(
					// 	{
					// 	'email': regUsername[0].value,
					// 	'password': regPassword[0].value,
					// }),
					headers: {
						"Authorization": "Bearer",
						'Access-Control-Allow-Origin': "https://estate.tesseractmaks.tech"

						// 'Content-Type': 'application/json'
					},
					credentials: 'include',
				})
			//const token = await response.json();
			const dataTocken = await response.json();


			let registerPanel = document.querySelector("#register-panel")
			let loginPanel = document.querySelector("#login-panel")
			let profilePanel = document.querySelector("#profile-panel")
			let accountPanel = document.querySelector("#account-panel")
			let logoutPanel = document.querySelector("#logout-panel")
                        
			

			//let exp = token.access_token.split(" ")
			 //let expToken = `${exp[0]}T${exp[1]}Z`
			let decodedString = atob(document.cookie.split(".")[1]);
			let exp = Object.values(JSON.parse(decodedString))[1]
			let date = new Date(exp * 1000);
			let expToken = date.toISOString()
			// window.localStorage.setItem("expToken", expToken)

			if (currentDate < expToken) {
				registerPanel.classList.remove("profile-panel")
				registerPanel.classList.add("profile-panel-hide")

				loginPanel.classList.remove("profile-panel")
				loginPanel.classList.add("profile-panel-hide")

				let cookieId = document.cookie.split(";")[1].split("=")[1]
				profilePanel.dataset.id = cookieId
				profilePanel.classList.remove("profile-panel-hide")
				profilePanel.classList.add("profile-panel")
				
				accountPanel.dataset.id = cookieId

				accountPanel.classList.remove("profile-panel-hide")
				accountPanel.classList.add("profile-panel")
                                
				logoutPanel.classList.remove("profile-panel-hide")
				logoutPanel.classList.add("profile-panel")
                                
				router.navigate("/")
			     
				//location.reload();


			}
                        //router.navigate("/")
			//console.log("0-=-")
			//window.location.reload();


		}
		// let ca = document.cookie;

		// // myHeaders = `Bearer ${token.access_token}`;
		router.navigate("/")

	});
        router.navigate("/")

});
        router.navigate("/")

};

let logQy = headerSection.querySelector("#login-panel")
if (logQy){
	logQy.addEventListener('click', async function (e) {
// router.on('/login', async function (e) {
	// console.log(e.data.id)
	//mainContaner.innerHTML = ""
	//pageContainer.innerHTML = ""
	const login = await loginForm()
	login.classList.add("open")
	pageContainer.append(login)
	mainContaner.append(heroBlock, pageContainer)


	let regBtn = document.querySelector("#reg-Btn")

	regBtn.addEventListener("click", async function (elem) {
		let modalElem = document.querySelector(".modal")
		modalElem.classList.remove("open")
		elem.preventDefault();

		let loginUsername = document.querySelectorAll(".modal #login-username")
		let loginPassword = document.querySelectorAll(".modal #login-password")

		//  one@mail.ru1
		//  qwerty

		// Array.from(regForm).forEach(async function (e) {

		// console.log(loginUsername[0].value, loginPassword[0].value)

		let formData = new FormData()
		formData.append('username', loginUsername[0].value);
		formData.append('password', loginPassword[0].value)

		const response = await fetch('https://api.estate.tesseractmaks.tech/token',
			{
				method: 'POST',
				body: formData,
				headers: {
					"Authorization": "Bearer",
					'Access-Control-Allow-Origin': "https://estate.tesseractmaks.tech"

			},
				credentials: 'include'

			})
		const token = await response.json();
		// console.log(token.access_token)

		let registerPanel = document.querySelector("#register-panel")
		let loginPanel = document.querySelector("#login-panel")
		let profilePanel = document.querySelector("#profile-panel")
		let accountPanel = document.querySelector("#account-panel")
		let logoutPanel = document.querySelector("#logout-panel")


		// let exp = token.access_token.split(" ")
		// let expToken = `${exp[0]}T${exp[1]}Z`
		const currentDate = new Date().toISOString();

		let decodedString = atob(document.cookie.split(".")[1]);
		let exp = Object.values(JSON.parse(decodedString))[1]
		let date = new Date(exp * 1000);
		let expToken = date.toISOString()
		// window.localStorage.setItem("expToken", expToken)

		if (currentDate < expToken) {
			registerPanel.classList.remove("profile-panel")
			registerPanel.classList.add("profile-panel-hide")

			loginPanel.classList.remove("profile-panel")
			loginPanel.classList.add("profile-panel-hide")

			let cookieId = document.cookie.split(";")[1].split("=")[1]

			profilePanel.href = `/profile/${cookieId}`
			profilePanel.classList.remove("profile-panel-hide")
			profilePanel.classList.add("profile-panel")

			accountPanel.href = `/kabinet/${cookieId}`
			accountPanel.classList.remove("profile-panel-hide")
			accountPanel.classList.add("profile-panel")

			logoutPanel.classList.remove("profile-panel-hide")
			logoutPanel.classList.add("profile-panel")

			//router.navigate("/")
			location.reload();
		}

	});
});
}
let logOut = headerSection.querySelector("#logout-panel")
if (logOut){
        logOut.addEventListener('click', async function (e) {

	const url = 'https://api.estate.tesseractmaks.tech/token/auth/logout'
	const response = await fetch(url, {
		method: 'POST',
		credentials: 'include',
	})
	window.localStorage.setItem('logout', Date.now())

	let registerPanel = document.querySelector("#register-panel")
	let loginPanel = document.querySelector("#login-panel")
	let profilePanel = document.querySelector("#profile-panel")
	let accountPanel = document.querySelector("#account-panel")
	let logoutPanel = document.querySelector("#logout-panel")

	registerPanel.classList.remove("profile-panel-hide")
	registerPanel.classList.add("profile-panel")

	loginPanel.classList.remove("profile-panel-hide")
	loginPanel.classList.add("profile-panel")

	profilePanel.classList.remove("profile-panel")
	profilePanel.classList.add("profile-panel-hide")

	accountPanel.classList.remove("profile-panel")
	accountPanel.classList.add("profile-panel-hide")

	logoutPanel.classList.remove("profile-panel")
	logoutPanel.classList.add("profile-panel-hide")

	window.localStorage.removeItem('logout')
	location.reload();
})

}


router.resolve();

window.addEventListener("keydown", (e) => {
	if (e.key === "Escape") {
		let modalObj = document.querySelector(".modal")
		modalObj.classList.remove("open")
	}
})


// app.innerHTML = ""
// app.append(
// headerSection, 
// 	heroBlockDetail,

// 	// filterForm,
// 	pageContainer,
// 	footerBlock,
// 	)





app.innerHTML = ""
app.append(
	headerSection,

	// filterForm,
	mainContaner,

	footerBlock,
)




// router.resolve();
// let seconds = 1000 * 3
// let timerImg = setInterval(() =>slowSlider(), seconds);


let counterPointsSlow = 0;
// let counterSlow = 0;

// pointsSlider()

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

// slowSlider()


// let seconds = 1000 * 30
// let timerImg = setInterval(() =>slowSlider(), seconds);


// let counterPointsSlow = 0;
let counterSlow = 0;

function slowSlider2() {
	// let points = document.querySelectorAll(".point")
	let images = document.querySelectorAll(".review-item")
	// if(points[0]) {

	// points[0].classList.add("active-image")
	images[0].classList.add("active-image")


	for (let i = 0; i < images.length; i++) {
		// for(let p = 0; p < points.length; p++) {
		// 	points[p].classList.remove("active-image")
		// };
		images[i].classList.remove("active-image")
	};
	counterSlow++
	if (counterSlow >= images.length) {
		counterSlow = 0
	}

	// if (counterPointsSlow > points.length-1) {
	// 	counterPointsSlow = 0
	// }

	// points[counterPointsSlow].classList.add("active-image")
	// counterPointsSlow++

	images[counterSlow].classList.add("active-image")
	// };
};

slowSlider2()


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
	// console.log(images)


	for (let i = 0; i < images.length; i++) {
		// for(let p = 0; p < points.length; p++) {
		// 	points[p].classList.remove("active-image")
		// };
		images[i].classList.remove("active-clients")
	};
	counterSlowclients++
	if (counterSlowclients >= images.length) {
		counterSlowclients = 0
	}

	// if (counterPointsSlow > points.length-1) {
	// 	counterPointsSlow = 0
	// }

	// points[counterPointsSlow].classList.add("active-image")
	// counterPointsSlow++

	images[counterSlowclients].classList.add("active-clients")
	// };

};


