const gmailInput = document.getElementById("gmail_input");
const gmailButton = document.getElementById("gmail_button");
const gmailResult = document.getElementById("gmail_result");

const regExp =  /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
gmailButton.onclick = () => {
    if (regExp.test(gmailInput.value)) {
        gmailResult.innerText = "ok";
    }else{
        gmailResult.innerText = "not ok";
    }
};


const childBlock = document.querySelector(".child_block");
const parentBlock = document.querySelector(".parent_block");
const parentWidth = parentBlock.clientWidth - childBlock.clientWidth;
const parentHeight = parentBlock.clientHeight - childBlock.clientHeight;
let positionX = 0;
let positionY = 0;
let direction = 'right';
const speed = 1;

const moveBlock = () => {
    switch (direction) {
        case 'right':
            positionX += speed;
            if (positionX >= parentWidth) {
                positionX = parentWidth;
                direction = 'down';
            }
            break;
        case 'down':
            positionY += speed;
            if (positionY >= parentHeight) {
                positionY = parentHeight;
                direction = 'left';
            }
            break;
        case 'left':
            positionX -= speed;
            if (positionX <= 0) {
                positionX = 0;
                direction = 'up';
            }
            break;
        case 'up':
            positionY -= speed;
            if (positionY <= 0) {
                positionY = 0;
                direction = 'right';
            }
            break;
    }

    childBlock.style.left = `${positionX}px`;
    childBlock.style.top = `${positionY}px`;

    requestAnimationFrame(moveBlock);
};

moveBlock();


const start = document.querySelector('#start')
const stop = document.querySelector('#stop')
const reset = document.querySelector('#reset')
const result = document.querySelector('#seconds')
const resultMinute = document.querySelector('#minute')
let click = true

let seconds = 0;
let interval;
let minute= 0;



const timer = () => {
    seconds++
    result.innerHTML = seconds
    if (seconds > 60){
        minute++
        seconds=0
        resultMinute.innerHTML = minute
    }
}
start.onclick = () => {
    if(click === true){
        interval= setInterval(timer, 100)
        click = false
    }


}

stop.onclick = () => {
    clearInterval(interval)
    click=true
}
reset.onclick = () => {
    clearInterval(interval)
    click=true
    minute = 0
    seconds = 0
    result.innerHTML = seconds
    resultMinute.innerHTML = minute

}

document.addEventListener('DOMContentLoaded',()=>{
    const charactersBlock=document.querySelector('.characters_container');
    const request=new XMLHttpRequest()
    request.open('GET', '../data/characters.json');
    request.setRequestHeader('Content-type','application/json');
    request.send();

    request.onload=()=>{
        if (request.status>=200 && request.status<400) {
            const characters=JSON.parse(request.responseText);
            characters.map((character)=>{
                const characterContainer=document.createElement('div');
                characterContainer.setAttribute("class" , 'character_container');
                characterContainer.innerHTML =`
                <div class="character_photo">
                    <img src="${character.photo}" alt="">
                </div>
                <h2>${character.name}</h2>
                <p>${character.age}</p>
                <p>${character.bio}</p>
                `;
                const h2Element=characterContainer.querySelector('h2');
                const pElements=characterContainer.querySelectorAll('p');

                if (h2Element){
                    h2Element.style.color='black';
                }
                pElements.forEach(p=>{
                    p.style.color='black';
                });
                charactersBlock.append(characterContainer);
            }) ;
        } else {
            console.error('Request failed', request.status);
        }

    };
    request.open.error=()=>{
        console.error('Request failed');
    }
})
