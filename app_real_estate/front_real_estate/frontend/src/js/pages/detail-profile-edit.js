import { jsonToData, setStorageData, deleteStorageData } from "../utils.js"
import { formElement, formInputElement, textareaElement } from "../components/form.js"
import { aIelements, aElements, anyIelements, anyElement, buttonElement } from "../components/elements.js"
import { router } from "../../index.js"
import { upload } from "../components/upload.js"


// Features Detail Edits

export async function profileNew(detailData) {

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
        [detailData.avatar]
    )
    let labelElem = anyElement("label", [], "фото")
    labelElem.setAttribute("for", "file")
    uploadElem.prepend(labelElem)


    let listContent = [
        {"имя": detailData.first_name, "id": "first_name"},
        {"фамилия": detailData.last_name, "id": "last_name"},
        {"роль": detailData.role, "id": "role"},
        {"никнейм": detailData.nickname, "id": "nickname"},
        {"телефон": detailData.phone, "id": "phone"},
        {"должность": detailData.post, "id": "post"}
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
        let typeInput = "text"

        inputElem = formInputElement(
            idElement,
            labelText,
            typeInput,
            typeName,
            placeholderTitle,
            valueData
        )
        formElem.prepend(inputElem)
    })

    formElem.prepend(uploadElem)
    divRow.append(formElem)

    containerForm.append(divRow)
    divSingleList.append(containerForm)


    let elementsForm = Array.from(formElem.querySelectorAll('input'))

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
    console.log(detailData)

    formElem.addEventListener('submit', async function (e) {
        e.preventDefault();
        buttonSave.disabled = true
        buttonSave.classList.add("button-disabled")
        

        let imgPhoto = formElem.querySelector(".file-photo img")

        let collectResponse = {}

        collectResponse["avatar"] = imgPhoto.src

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
        console.log(detailData.id, "999--")


        const response = await fetch('https://api.estate.tesseractmaks.tech/api/v1/profiles/' + detailData.id,
            {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(

                    {
                        "last_name": collectResponse.last_name,
                        "first_name": collectResponse.first_name,
                        "phone": collectResponse.phone,
                        "nickname": collectResponse.nickname,
                        "post": collectResponse.post,
                        "role": collectResponse.role,
                        "avatar": collectResponse.avatar,
                    })
            });
        const data = await response.json();
        console.log(alert === window.alert("Сохранено"));
        // console.log(data)
        //router.navigate("/")
        //window.location.reload();
    });


    return divSingleList
};


async function breadcrumb(detailData) {
    const divBread = document.createElement("div")
    divBread.classList.add("site-breadcrumb")

    let containerBread = document.createElement("div")
    containerBread.classList.add("container")
    let a = aIelements("/", "fa-home", "Home")
    let aDetail = aElements("/profile/" + `${detailData["id"]}`, false)
    let spanDetail = anyIelements("span", "fa-angle-right", "Profile")
    spanDetail.style.color = "black"
    let span = anyIelements("span", "fa-angle-right", "Edit")

    aDetail.append(spanDetail)
    containerBread.append(a, aDetail, span)

    divBread.append(containerBread)
    return divBread
}
