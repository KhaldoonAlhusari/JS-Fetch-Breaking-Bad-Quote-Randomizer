const images = [
    {
        id: 0,
        author: "Walter+White",
        img: "https://i.insider.com/5dade9bc045a3139e8686c33?width=1136&format=jpeg"
    },
    {
        id: 1,
        author: "Jesse+Pinkman",
        img: "https://i.ytimg.com/vi/vQpamwzzs1I/maxresdefault.jpg"
    },
    {
        id: 2,
        author: "Mike+Ehrmantraut",
        img: "https://i.ytimg.com/vi/qbiUXC6d8v8/maxresdefault.jpg"
    },
    {
        id: 3,
        author: "Saul+Goodman",
        img: "https://cdn.vox-cdn.com/thumbor/24foBfb9_MXGEvC2i3HWklWxwr0=/0x0:1440x769/1200x800/filters:focal(855x124:1085x354)/cdn.vox-cdn.com/uploads/chorus_image/image/66373036/Screen_Shot_2020_02_25_at_2.30.40_PM.0.png"
    }
];

const textOne = document.getElementById("text-1");
const textTwo = document.getElementById("text-2");
const img = document.getElementById("meme-image");

setInterval(
    () => {
        try {
            addQuote();
        }
        catch (e) {
            console.log("Failed");
        }
    }, 5000);

async function getQuote() {
    let randomCharacter = Math.floor(Math.random() * 4);
    return await fetch(`https://www.breakingbadapi.com/api/quote?author=${images[randomCharacter].author}`)
        .then(response => response.json())
        .catch(() => {
            console.log("Failed.");
        })
        .then(data => {
            console.log(data);
            img.src = images[randomCharacter].img;
            return data;
        })
        .catch(() => {
            console.log("Failed.");
        });
}

async function addQuote() {
    const data = await getQuote();
    let randomQuote;
    let string;
    if (data.length > 1) {
        randomQuote = Math.floor(Math.random() * (data.length + 1))
        string = data[randomQuote].quote;
    } else {
        randomQuote = 0;
        string = data.quote;
    }

    let mid = Math.floor(string.length / 4);
    let before = string.lastIndexOf(' ', mid);
    let after = string.indexOf(' ', mid + 1);
    if (mid - before < after - mid) {
        mid = before;
    } else {
        mid = after;
    }
    let string1 = string.substr(0, mid);
    let string2 = string.substr(mid + 1);
    textOne.innerText = string1;
    textTwo.innerText = string2;
}
