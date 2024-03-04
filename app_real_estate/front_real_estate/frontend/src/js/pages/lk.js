import { jsonToData, setStorageData, deleteStorageData } from "../utils.js"
import { getListProfiles } from "../components/list-profiles.js"

import { authorCard, relatedProperties } from "../components/profile-components.js"
import { aIelements, anyIelements, aElements, anyElement } from "../components/elements.js"
import { staffProfiles } from "../components/profile-components.js"

import { pageContainer } from "../../index.js"
import { router } from "../../index.js"

// Profile Detail

async function singleList(detailData) {

    let divSingleList = document.createElement("div")
    divSingleList.classList.add("single-list-content")


    // let divRow = document.createElement("div")
    divSingleList.classList.add("row")
    

    // let divCol8 = document.createElement("div")
    // divCol8.classList.add("col-xl-8")
    // divCol8.classList.add("sl-title")
    // const author = await authorCard(detailData)
    // divCol8.append(author)


    // divRow.append(divCol8)
    // divSingleList.append(divRow)


    // Property Details

    const relatedProp = await relatedProperties()

    let divRowProperty = document.createElement("div")
    divRowProperty.classList.add("row")
    divRowProperty.classList.add("property-details-list")

  

    divRowProperty.append(relatedProp)



    let divDescr = document.createElement("div")
    divDescr.classList.add("description")

    // let spanButtons = document.createElement("span")
    // let buttonEdit = await buttonElement("редактировать", ["editButton"], "edit")
    // let buttonDelete = await buttonElement("удалить", ["deleteButton"], "delete")
    // let divButton = document.createElement("div")
    // divButton.classList.add("detailButtons")

    // spanButtons.append(h3, buttonEdit)
    // divButton.append(spanButtons)


    divSingleList.append(divRowProperty)
    return divSingleList
};


async function breadcrumb() {
    const divBread = document.createElement("div")
    divBread.classList.add("site-breadcrumb")

    let containerBread = document.createElement("div")
    containerBread.classList.add("container")
    let a = aIelements("/", "fa-home", "Home")

    let span = anyIelements("span", "fa-angle-right", "Kabinet")
    containerBread.append(a, span)
    divBread.append(containerBread)

    return divBread
}


export async function kabinet(detailData) {
    const sectionDetail = document.createElement("section")
    let breadcr = await breadcrumb()
    // console.log(breadcr)
    sectionDetail.append(breadcr)
    sectionDetail.classList.add("page-section")

    let h31 = document.createElement("h3")
    // h3.style.textAlign = "center"
    h31.classList.add("sl-sp-title")
    h31.textContent = "Размещенная недвижимость"

    let h32 = document.createElement("h3")
    // h3.style.textAlign = "center"
    h32.classList.add("sl-sp-title")
    h32.textContent = "Публикации в блоге"

    let h33 = document.createElement("h3")
    // h3.style.textAlign = "center"
    h33.classList.add("sl-sp-title")
    h33.textContent = "Сотрудники"

 

    let containerDetail = document.createElement("div")
    containerDetail.classList.add("container")
    // containerDetail.append(divButton)


    let rowDetail = document.createElement("div")
    rowDetail.classList.add("row")
    rowDetail.classList.add("row-lk")
    rowDetail.append(h31)

    let rowDetail2 = document.createElement("div")
    rowDetail2.classList.add("row")
    rowDetail2.classList.add("row-lk")
    rowDetail2.append(h32)

    let rowStaff = document.createElement("div")
    rowStaff.classList.add("row")
    rowStaff.classList.add("row-lk")
    rowStaff.append(h33)
    
 

    let currentPage = "currentPage"
    // let detailData;
    let response;



    if (detailData) {
        // console.log(detailData)

        let colSlider = document.createElement("div")
        colSlider.classList.add("col-lg-6")
        colSlider.classList.add("lk-col")
        
        // let colSlider2 = document.createElement("div")
        // colSlider2.classList.add("col-lg-6")
        // colSlider2.classList.add("lk-col-2")

        // let colSlider2H3 = document.createElement("h4")
        // colSlider2H3.textContent = "заявки от клиентов"
        // colSlider2H3.classList.add("moder-h3")

        // let messDiv = anyElement("div", ["message-lk"])
        // let messP = anyElement("p")
        // messP.textContent = "-fgkj=======----"
        // messDiv.append(messP)
        // colSlider2.append(colSlider2H3, messDiv)

        let colSlider3 = document.createElement("div")
        colSlider3.classList.add("col-lg-6")
        colSlider3.classList.add("lk-col")
        
        
        let colSlider4 = document.createElement("div")
        colSlider4.classList.add("col-lg-6")
        colSlider4.classList.add("lk-col-2")
        let colSlider4H3 = document.createElement("h4")
        colSlider4H3.classList.add("moder-h3")
        colSlider4H3.textContent = "заявки на модерацию"

        const profilesData = await getListProfiles()
        colSlider4.append(colSlider4H3)
        colSlider4.id = "moderBlock" 
        profilesData.forEach(function (element) {
            if (!element["users"]["roles"].includes("ROLE_ADMIN")){
                // console.log(element["users"]["id"],"=-=")

            let moderDiv = anyElement("div", ["message-lk"])
	    //let moderA = aElements("#", ["moder-lk"], element["nickname"])
            let moderA = aElements(`/profile/${element["users"]["id"]}`, ["moder-lk"], element["nickname"])
	    moderA.style.textDecoration = "none"
            moderA.dataset.id = element["users"]["id"]
	    moderDiv.append(moderA)
            colSlider4.append(moderDiv)
        }
        });


        let colStaff = document.createElement("div")
        colStaff.classList.add("col-lg-6")
        colStaff.classList.add("lk-col")
        colStaff.classList.add("lk-staf")


        let singleListContent = await singleList(detailData)
        let singleListContent2 = await singleList(detailData)
        
        const staffList = await staffProfiles()


        colSlider.prepend(singleListContent)
        colSlider3.prepend(singleListContent2)
        colStaff.prepend(staffList)


        rowDetail2.append(colSlider3)
        // rowDetail2.append(colSlider3, colSlider4)
        rowStaff.append(colStaff, colSlider4)
       console.log(detailData, "--")
	    // console.log(detailData, "--")
        console.log('--',detailData["users"])
        if (detailData["users"]["roles"].includes("ROLE_SUPER_ADMIN")){
            containerDetail.append(rowDetail, rowDetail2, rowStaff)
        }
        if (detailData["users"]["roles"].includes("ROLE_ADMIN")){
            containerDetail.append(rowDetail, rowDetail2)
        }


        sectionDetail.append(containerDetail)
    };

    // buttonDelete.addEventListener("click", async function (elem) {
    //     elem.preventDefault();
    //     console.log(detailData["id"], "=====")
    //     await deleteOneProfile(detailData["id"])
    //     router.navigate("/")
    //     window.location.reload();
    // });

    // buttonEdit.addEventListener("click", async function (elem) {
    //     elem.preventDefault();
    //     router.navigate("/edit/profile/" + `${detailData["id"]}`)
    // });


    return sectionDetail

};


