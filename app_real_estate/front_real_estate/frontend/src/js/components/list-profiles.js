
export async function getListProfiles(page = 1, params = {}) {
  let response = await fetch(`https://api.estate.tesseractmaks.tech/api/v1/profiles/`);

  const profileData = await response.json();
  return profileData
};


export async function getRelatedProperties() {
  let response = await fetch(`https://api.estate.tesseractmaks.tech/api/v1/properties/sidebar`);

  const propertyData = await response.json();
  return propertyData
};

export async function getOneUser(idNum) {
  let response = await fetch(`https://api.estate.tesseractmaks.tech/api/v1/users/${idNum}/`);
  const userData = await response.json();
  return userData
};

export async function getOneProfile(idNum) {
  let response = await fetch(`https://api.estate.tesseractmaks.tech/api/v1/profiles/${idNum}/`,
  {
    // credentials: "same-origin"
    
  
    // headers: {
    //   'Accept': 'application/json',
    //   'Content-Type': 'application/json',
    //   'Cache': 'no-cache'
    // },
    // credentials: 'include'
  });

  const profileData = await response.json();
  console.log(profileData)
	return profileData
};

export async function patchOneProfile(idNum, detailData) {
  let response = await fetch(`https://api.estate.tesseractmaks.tech/api/v1/profiles/${idNum}/`,
  {
    method:'PATCH',
    body: JSON.stringify(
      {
        "user_id": detailData["users"]["id"],

      }),
    headers: {
      'Content-Type': 'application/json',
       'Accept': 'application/json'
      }

    // credentials: "same-origin"
    
  
    // headers: {
    //   'Accept': 'application/json',
    //   'Content-Type': 'application/json',
    //   'Cache': 'no-cache'
    // },
    // credentials: 'include'
  });

  const profileData = await response.json();
  return profileData
};

export async function getOneProfileByUser(idNum) {
  let response = await fetch(`https://api.estate.tesseractmaks.tech/api/v1/profiles/user_id?user_id=${idNum}`,
  {
    // credentials: "same-origin"
    
  
    // headers: {
    //   'Accept': 'application/json',
    //   'Content-Type': 'application/json',
    //   'Cache': 'no-cache'
    // },
    // credentials: 'include'
  });


  const profileData = await response.json();
  console.log(profileData, "+------")
  return profileData
};


export async function deleteOneProfile(idNum) {
  
  // await fetch(`http://127.0.0.1:8000/api/v1/profiles/${idNum}/`, {
  await fetch(`https://api.estate.tesseractmaks.tech/api/v1/users/${idNum}/`, {
    method: "DELETE",
  });
};


export async function onUpload(files, blocks) {
  console.log(files)
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



