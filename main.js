const elBody = document.querySelector("body");
const elForm = document.querySelector(".hero__form");
const elList = document.querySelector(".hero__list");
const elDarkMoodBtn = document.querySelector(".nav__darkmood");
const elDate = document.querySelector(".hero__date");
const elFullYear = document.querySelector(".hero__full--yaer");
const elSelect = document.querySelector(".hero__select");
const elSelectDate = document.querySelector(".hero__select-date");
const elSelectLocation = document.querySelector(".hero__location");
const elRegion = document.querySelector(".hero__title-region");
const elWapper = document.querySelector(".hero__wrapper");
const elWeekList = document.querySelector(".week__head");
const ImgLogo = document.getElementById("logo");
const Imgdoork = document.getElementById("moon");
const Imglitek = document.getElementById("moon-icon");

// Imglitek.style.display = "block"

elDarkMoodBtn.addEventListener("click", () => {
    elBody.classList.toggle("darkmood-theme");
    if (document.body.classList.contains("darkmood-theme")) {
        Imglitek.src = "/imges/sun.svg"
        ImgLogo.src = "/imges/dark.svg"
    }else {
        Imglitek.src = "/imges/moon.svg"
        ImgLogo.src = "/imges/logo.svg"
 
    }
})
setInterval(() => {
    const time = new Date();
    const year = time.getFullYear();
    const moon = time.getMonth();
    const day = time.getDate();
    const hours = time.getHours();
    const minuts = time.getMinutes();
    const seconds = time.getSeconds(); 
    elDate.textContent = `${hours}:${minuts}:${seconds}`;
    elFullYear.textContent = `${year}.${moon}.${day}`;
    
    
},1000);
////////// day passagi  start//////////

function renderApi(arr,node) {
    const elTemplate = document.querySelector(".js-template").content;
    const elFragment = document.createDocumentFragment();
    elList.innerHTML = ""
    arr.forEach(item => {
        elRegion.textContent = item.region
        const fragmentClone = elTemplate.cloneNode(true);
        fragmentClone.querySelector(".hero__time--tong").textContent = item.times.tong_saharlik;
        fragmentClone.querySelector(".hero__time--quyosh").textContent = item.times.quyosh;
        fragmentClone.querySelector(".hero__time--peshin").textContent = item.times.peshin;
        fragmentClone.querySelector(".hero__time--asr").textContent = item.times.asr;
        fragmentClone.querySelector(".hero__time--shom").textContent = item.times.shom_iftor;
        fragmentClone.querySelector(".hero__time--hufton").textContent = item.times.hufton;
        elFragment.append(fragmentClone);
    });
    node.appendChild(elFragment, elRegion);
    
}

////////// day passagi  end//////////


////////// week passagi //////////

function weekApiFunc(weekUrl,weekNode) {
    const weekTemplate = document.querySelector(".week__template").content;
    const weekFragment = document.createDocumentFragment()
 
    elWeekList.innerHTML = ""
    weekUrl.forEach(item => {
        const weekFragmentClon = weekTemplate.cloneNode(true)
        weekFragmentClon.querySelector(".week__day").textContent = item.weekday;
        weekFragmentClon.querySelector(".week__morning").textContent = item.times.tong_saharlik;
        weekFragmentClon.querySelector(".week__sun").textContent = item.times.quyosh;
        weekFragmentClon.querySelector(".week__noon-time").textContent = item.times.peshin;
        weekFragmentClon.querySelector(".week__after-noon").textContent = item.times.asr;
        weekFragmentClon.querySelector(".week__sunset").textContent = item.times.shom_iftor;
        weekFragmentClon.querySelector(".week__evening").textContent = item.times.hufton;
        weekFragmentClon.querySelector(".week__date").textContent = item.date.slice(0,10);
        weekFragment.append(weekFragmentClon);
    })
    weekNode.appendChild(weekFragment);
}
/////////// week get info /////////



async function apiFunc(url) {
    const response = await fetch(url)
    const date = await response.json()
    const newArr = [];
    newArr.push(date)
    console.log(newArr);
    renderApi(newArr,elList)
}
apiFunc(`https://islomapi.uz/api/present/day?region=Toshkent`);


async function weekDay(ur) {
    const res = await fetch(ur)
    const date = await res.json()
    console.log(date);
    weekApiFunc(date,elWeekList)
}


////////// monthly start ///////////

async function monthlyFunc(urle) {
    const res = await fetch(urle)
    const date = await res.json()
    console.log(date);
    weekApiFunc(date,elWeekList)
}

////////// monthly end ///////////

elForm.addEventListener("submit", evt => {
    evt.preventDefault();
    const elSelectDateVal = elSelectDate.value;
    const elSelectLocationVal = elSelectLocation.value;
    //////Select date start///////
    if (elSelectDateVal == "day") {
        elList.style.display = "flex"
        elWeekList.style.display = "none"
        elList.innerHTML = ""
    }
    if (elSelectDateVal == "week") {   
        elList.style.display = "none"
        elWeekList.style.display = "block"
        elList.innerHTML = ""
        weekDay(`https://islomapi.uz/api/present/${elSelectDateVal}?region=Toshkent`);
    }
    if (elSelectDateVal == "monthly") {   
        elList.style.display = "none"
        elWeekList.style.display = "block"
        elList.innerHTML = ""
        weekDay(`https://islomapi.uz/api/${elSelectDateVal}?region=Toshkent&month=4`); 
    }
    //////Select date end///////
    
    //////Select region start///////
    weekDay(`https://islomapi.uz/api/present/week?region=${elSelectLocationVal}`);
    apiFunc(`https://islomapi.uz/api/present/day?region=${elSelectLocationVal}`)
    //////Select region end///////
})