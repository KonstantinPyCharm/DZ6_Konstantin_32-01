const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)){
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = 'NOT OK'
        phoneResult.style.color = 'red'
    }
}

// CONVERTER

const som = document.querySelector('#som');
const usd = document.querySelector('#usd');
const eur = document.querySelector('#eur');

const converter = (element, targetElement, element2, targetElement2, element3, targetElement3, current) => {
    element.oninput = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET','../data/converter.json');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send();

        xhr.onload = () => {
            const data = JSON.parse(xhr.response);

            switch (current) {
                case 'som':
                    targetElement.value = (element.value / data.usd).toFixed(2);
                    targetElement3.value = (element.value / data.eur).toFixed(2);
                    break
                case 'usd':
                    targetElement.value = (element.value * data.usd).toFixed(2);
                    targetElement3.value = (element.value / data.eur * data.usd).toFixed(2);
                    break
                case 'eur':
                    targetElement2.value = (element.value * data.eur / data.usd).toFixed(2);
                    targetElement3.value = (element.value * data.eur).toFixed(2);
                    break
                default:
                    break
            }
        }
    }
}

converter(som, usd, "som", usd, "som", eur, "som")
converter(usd, som, "usd", som, "usd", eur, "usd")
converter(eur, som, "eur", usd, "eur", som, "eur")

////

const card = document.querySelector(".card"),
    btnNext = document.querySelector("#btn-next"),
    btnPrev = document.querySelector("#btn-prev")



let count  = 1
let maxCardId = 200

const firstScrollCard = (count) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.id)
            card.innerHTML = `
                <p>${data.title}</p>
                <span>${data.id}</span>  
            `
        })
}

const fetchNextCard = () => {
    count = (count % maxCardId) + 1;
    firstScrollCard(count);
}

const fetchPrevCard = () => {
    count = ((count - 2 + maxCardId) % maxCardId) + 1;
    firstScrollCard(count);
}

btnNext.addEventListener("click", () => {
    fetchNextCard();
})

btnPrev.addEventListener("click", () => {
    fetchPrevCard();
})

firstScrollCard(count);