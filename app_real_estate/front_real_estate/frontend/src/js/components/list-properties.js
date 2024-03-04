
export async function getListProperties(page = 1, params = {}) {
  let response;

  for (var key in params) {
    if (params[key] == null) {
      params[key] = ""
    };
  };


  if (JSON.stringify(params) === '{}') {
    response = await fetch(`https://api.estate.tesseractmaks.tech/api/v1/properties/?page=${page}`,
    {
      headers: {"Authorization": "Bearer "},
      credentials: 'include'
    })
  } else {

    response = await fetch(`https://api.estate.tesseractmaks.tech/api/v1/properties/?page=${page}&city=${params["city"]}&state=${params["state"]}&category=${params["category"]}&status=${params["status"]}&bedrooms=${params["rooms"]}`,
    {
      headers: {"Authorization": "Bearer "},
      credentials: 'include'
    })
  };

  const propertyData = await response.json();

  return propertyData
};


export async function getSidebarProperties() {
  let response = await fetch(`https://api.estate.tesseractmaks.tech/api/v1/properties/sidebar`);

  const propertyData = await response.json();
  return propertyData
};

export async function getOneProperty(idNum, myHeaders) {
  // console.log(idNum, "+++")
  let response = await fetch(`https://api.estate.tesseractmaks.tech/api/v1/properties/${idNum}/`,
  {
    method: "GET",
    headers: {"Authorization": myHeaders},
    credentials: 'include'
  }
  );

  const propertyData = await response.json();
  // console.log(propertyData.headers, "-==-")
  // console.log(propertyData, "+++")
  return propertyData
};


export async function deleteOneProperty(idNum) {
  // console.log(idNum, "------")
  await fetch(`https://api.estate.tesseractmaks.tech/api/v1/properties/${idNum}`, {
    method: "DELETE",
  });
};


export async function onUpload(files, blocks) {
  // console.log(files)
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append("photos", files[i])
    const block = blocks[i].querySelector(".preview-info-progress")
    try {

      const block = blocks[i].querySelector(".preview-info-progress")

      let xhr = new XMLHttpRequest();
      xhr.upload.onprogress = function (event) {
        // console.log(`Отправлено ${event.loaded} из ${event.total}`);
        const percentage = ((event.loaded / event.total) * 100).toFixed() + "%"
        block.textContent = percentage
        block.style.width = percentage
      };

      xhr.onloadend = function () {
        if (xhr.status == 200) {
          console.log("Успех");
        } else {
          console.log("Ошибка " + this.status);
        }
      };

      xhr.open("PATCH", "https://api.estate.tesseractmaks.tech/api/v1/properties/upload/4/");
      xhr.send(formData);

    } catch (error) {
      console.error("Ошибка:", error);
    }
  }
}



