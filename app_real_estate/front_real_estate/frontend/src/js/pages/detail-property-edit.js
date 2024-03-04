import { jsonToData, setStorageData, deleteStorageData } from "../utils.js"
import { formElement, formInputElement, textareaElement } from "../components/form.js"
import { aIelements, aElements, anyIelements, anyElement, buttonElement } from "../components/elements.js"
import { router } from "../../index.js"
import { upload } from "../components/upload.js"


// Features Detail Edits

export async function detailNew(detailData) {

    let containerForm = document.createElement("div")
    containerForm.classList.add("container")


    let divSingleList = document.createElement("div")
    divSingleList.classList.add("single-list-content")

    let breadcr = await breadcrumb(detailData)
    divSingleList.append(breadcr)


    let divRow = document.createElement("div")
    divRow.classList.add("row")
    divRow.classList.add("edit-contaner")


    let buttonSave = await buttonElement("сохранить", ["saveButton"], "save")
    buttonSave.disabled = true
    buttonSave.classList.add("button-disabled")
    const formElem = formElement(buttonSave)
    formElem.classList.add("form-edit")
    formElem.classList.add("col-lg-8")
    formElem.classList.add("single-list-page")

    let uploadElem = await upload(
        ["input-form",
            "input-file"],
        ["uploadBtn"],
        {
            accept: [".png", ".jpg", ".jpeg", ".gif"]
        },
        "file-photo",
        detailData.photo
    )
    let labelElem = anyElement("label", [], "фото")
    labelElem.setAttribute("for", "file")
    uploadElem.prepend(labelElem)

    let uploadElemPlan = await upload(["input-form", "input-file"], ["uploadBtn"], {
        accept: [".png", ".jpg", ".jpeg", ".gif"]
    },
        "input-plan",
        detailData.photo_plan)

    let labelElemPlan = anyElement("label", [], "фото плана")
    labelElemPlan.setAttribute("for", "file-plan")
    uploadElemPlan.prepend(labelElemPlan)

    // console.log(uploadElem)

    let listContent = [
        { "описание": detailData.description, "id": "description" },
        { "улица": detailData.street, "id": "street" },
        { "город": detailData.city, "id": "city" },
        { "область": detailData.state, "id": "state" },
        { "индекс": detailData.postal_code, "id": "postal_code" },
        { "цена": detailData.price, "id": "price" },
        { "площадь": detailData.house_area, "id": "house_area" },
        { "количество комнат": detailData.bedrooms, "id": "bedrooms" },
        { "количество гаражей": detailData.garages, "id": "garages" },
        { "категория": detailData.category_id, "id": "title" },
        { "количество ванных комнат": detailData.bathrooms, "id": "bathrooms" },
        { "возраст": detailData.age, "id": "age" },
    ]
    // console.log(detailData)
    listContent.forEach(function (item) {

        // console.log(Object.values(item)[0])
        let idElement = Object.values(item)[1]
        let labelText = Object.keys(item)[0]
        let typeName = Object.values(item)[1]
        let placeholderTitle = Object.keys(item)[0]
        let valueData = Object.values(item)[0]
        let inputElem;
        let typeInput;


        if (["postal_code", "price", "house_area", "bedrooms", "garages", "bathrooms", "age"].includes(Object.values(item)[1])) {
            typeInput = "number"
        }
        else {
            typeInput = "text"
        }
        inputElem = formInputElement(
            idElement,
            labelText,
            typeInput,
            typeName,
            placeholderTitle,
            valueData
        )

        if (Object.values(item)[1] == "description") {
            inputElem = textareaElement(
                idElement,
                labelText,
                typeName,
                placeholderTitle,
                valueData
            )
        };
        formElem.prepend(inputElem)

    })

    formElem.prepend(uploadElem, uploadElemPlan)
    divRow.append(formElem)


    containerForm.append(divRow)
    divSingleList.append(containerForm)



    let elementsForm = Array.from(formElem.querySelectorAll('input'))
    elementsForm.push(formElem.querySelector('textarea'))


    // console.log(elementsForm)
    elementsForm.forEach(function (e) {
        // console.log(e)
        e.addEventListener('change', async function (elem) {
            elem.preventDefault()
            // console.log(elem)
            // console.log(formElem)
            buttonSave.removeAttribute("disabled")
            buttonSave.classList.remove("button-disabled");
        })
    })


    formElem.addEventListener('submit', async function (e) {
        e.preventDefault();
        let photoUls = []
        let planUls = []
        buttonSave.disabled = true
        buttonSave.classList.add("button-disabled")
        // console.log(formElem)

        let imgPhoto = this.querySelectorAll(".file-photo img")
        let imgPlan = this.querySelectorAll(".input-plan img")

        Array.from(imgPhoto).forEach(function (e) {
            const url = new URL(e.src)
            photoUls.push(url.pathname)
        })

        Array.from(imgPlan).forEach(function (e) {
            const url = new URL(e.src)
            planUls.push(url.pathname)
        })

        let collectResponse = {}
        collectResponse["photo"] = photoUls
        collectResponse["photo_plan"] = planUls


        elementsForm.forEach(function (e) {
            for (let item of listContent) {
                // console.log(Object.values(item)[1])
                let idElement = Object.values(item)[1]
                // console.log(e.id, "---", idElement)
                if (e.id == idElement) {
                    collectResponse[idElement] = e.value
                    // console.log(collectResponse, "--")
                }
            }
        })
        // console.log(collectResponse, "--")


        const response = await fetch('https://api.estate.tesseractmaks.tech/api/v1/properties/' + detailData.id,
            {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        "description": collectResponse.description,
                        "street": collectResponse.street,
                        "city": collectResponse.city,
                        "state": collectResponse.state,
                        "postal_code": collectResponse.postal_code,
                        "price": collectResponse.price,
                        "house_areahouse_area": e.house_areahouse_area,
                        "bedrooms": collectResponse.bedrooms,
                        "garages": collectResponse.garages,
                        "category_id": collectResponse.category_id,
                        "bathrooms": collectResponse.bathrooms,
                        "age": collectResponse.age,
                        "photo": collectResponse.photo,
                        "photo_plan": collectResponse.photo_plan,
                    })
            });
        const data = await response.json();
        console.log(collectResponse.bedrooms,"--.")
        console.log(data,"-=-")
        // router.navigate("/")
        // window.location.reload();
    });


    return divSingleList
};


async function breadcrumb(detailData) {
    const divBread = document.createElement("div")
    divBread.classList.add("site-breadcrumb")

    let containerBread = document.createElement("div")
    containerBread.classList.add("container")
    let a = aIelements("/", "fa-home", "Home")
    let aDetail = aElements("/detail/" + `${detailData["id"]}`, false, "Detail")
    let spanDetail = anyIelements("span", "fa-angle-right", "Single Listing")
    spanDetail.style.color = "black"
    let span = anyIelements("span", "fa-angle-right", "Edit")

    aDetail.append(spanDetail)
    containerBread.append(a, aDetail, span)

    divBread.append(containerBread)
    return divBread
}
