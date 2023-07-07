const display = document.getElementById("display")

const wheel = document.getElementById("wheel");

const menu = document.getElementById("menu")

const musicScreen = document.getElementById("musicScreen")

const musicList = document.getElementById("musicList")

let menuItems = ["Music", "Extras", "Settings", "Shuffle Songs", "Sleep"]

let musics = [{ title: "Zara Zara", imgURL: "https://i.scdn.co/image/ab67616d00001e02aedf6f748f73e59cf25bcf25", music: "assets/zarazara.mp3" }, { title: "Zara Sa", imgURL: "https://i.scdn.co/image/ab67616d0000b273727d531901c07a499498c544" }, { title: "Ya Ali", imgURL: "https://i.scdn.co/image/ab67616d00001e02c6c4553b62bc21050d6ca939" }, { title: "Blue Theme", imgURL: "https://i.scdn.co/image/ab67616d0000b27364f3881daa775b178ee58979" }]

let menuIDX = 0

let currentAngle = 0

let newAngle = 0

let oldAngle = 0;

let inMusic = false;

let isSleep = false;

display.addEventListener("click", (() => {
    console.log("clicked dipslay")
}))

musics.forEach((music) => {
    let musicDiv = document.createElement("div")
    musicDiv.className = "musicTile"
    let musicImg = document.createElement("img")
    musicImg.className = "musicAlbum"
    musicImg.src = music.imgURL
    musicDiv.innerHTML = music.title
    let li = document.createElement("li")
    li.className = "selectedMusic"
    musicDiv.appendChild(musicImg)
    li.appendChild(musicDiv)
    musicList.appendChild(li)
})




menuItems.forEach((item, index) => {

    const menuItem = document.createElement("li")
    menuItem.id = `item${index}`;
    menuItem.className = "notSelectedItem";
    menuItem.innerHTML = item
    menu.appendChild(menuItem)

})

wheel.addEventListener("mousedown", mouseDown)

wheel.addEventListener("mouseup", mouseUp)

wheel.addEventListener("mousemove", mouseMove)

wheel.addEventListener("click", wheelClick)



function wheelClick(event) {


    const btn = checkButton(event.offsetX, event.offsetY)

    if (btn === 0) {

        navigate(menuIDX)

    }
    else if (btn === 1 && inMusic === true) {

        navigate(-1)

    }
    else if (isSleep === true) {

        navigate(-4)

    }


}

function navigate(menuIDX) {

    if (menuIDX === -4) {

        display.style.visibility = "inherit"
        isSleep = false
        return

    }

    if (menuIDX === -1) {
        menu.style.display = "block";
        musicScreen.style.display = "none"
        inMusic = false;
        return
    }

    const index = menuIDX % menuItems.length;

    console.log(index)

    if (index === 0) {

        menu.style.display = "none";
        musicScreen.style.display = "block"
        inMusic = true;

    }
    else if (index === 4) {

        display.style.visibility = "hidden";
        isSleep = true;


    }

}

function checkButton(clientX, clientY) {

    const rect = wheel.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const innerRadius = 38;

    let distance = Math.sqrt(Math.pow(centerX - clientX, 2) + Math.pow(clientY - centerY, 2))

    if (innerRadius >= distance) {

        // console.log("middle button pressed")
        return 0
    }

    if (Math.abs(clientX - centerX) <= 20 && centerY - clientY >= 30) {

        // console.log("menu button pressed")
        return 1

    }

    if (Math.abs(clientY - centerY) <= 20 && centerX - clientX >= 30) {

        // console.log("back play pressed")
        return 3

    }

    if (Math.abs(clientY - centerY) <= 20 && clientX - centerX >= 30) {

        // console.log("front play pressed")
        return 2

    }

    if (Math.abs(clientX - centerX) <= 20 && clientY - centerY >= 30) {

        // console.log("play button pressed")
        return 4

    }



}


function mouseMove(event) {

    if (event.buttons !== 1) return;
    const rect = wheel.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)

    if (angle < 0) {
        angle += 360;
    }

    if (Math.abs(oldAngle - angle) >= 20) {

        changeIDX(oldAngle, angle);

        oldAngle = angle

    }

}

function changeIDX(currentAngle, newAngle) {



    if (newAngle > currentAngle) {
        menuIDX += 1;
        changeSelctedItem(menuIDX)
    }
    else if (newAngle < currentAngle) {
        menuIDX -= 1;
        changeSelctedItem(menuIDX)
    }




}

function changeSelctedItem(itemIDX) {

    itemIDX = itemIDX % menuItems.length;


    let items = menu.children;

    for (let i = 0; i < items.length; i++) {

        let item = items[i];
        if (item.id === `item${itemIDX}`) {
            item.classList = "selectedItem";
        }
        else {
            item.classList = "notSelectedItem"
        }

    }


}

function mouseDown(event) {

    const rect = wheel.getBoundingClientRect();
    const centerX = rect.left + rect.height / 2;
    const centerY = rect.top + rect.width / 2;

    const clientX = event.clientX
    const clientY = event.clientY

    const x = clientX - centerX
    const y = clientY - centerY

    const angle = Math.atan2(y, x) * (180 / Math.PI)

    currentAngle = angle

}


function mouseUp() {


    currentAngle = 0;
    newAngle = 0;
    oldAngle = 0;


}