const main = document.querySelector(".main");
const nop = 20;
const data = new XMLHttpRequest();
data.open("GET", `https://pokeapi.co/api/v2/pokemon?limit=${nop}`);
data.send();
data.responseType = JSON;

data.onload = function () {
  const x = JSON.parse(data.response);
  main.innerHTML = "";
  const y = Array.from(x.results);
  y.forEach(function (e) {
    fetchpokemon(e.url);
  });
};

function fetchpokemon(link) {
  const poke = new XMLHttpRequest();
  poke.open("GET", link);
  poke.send();
  poke.responseType = JSON;
  poke.onload = function (e) {
    const d = JSON.parse(poke.response);
    // console.log(d.id);
    const naam = d.name;
    const id = d.id;

    if (d.abilities.length == 1) {
      const f1 = d.abilities[0].ability.name;

      createcard(naam, f1, undefined, id);
    } else if (d.abilities.length == 2) {
      const f1 = d.abilities[0].ability.name;
      const f2 = d.abilities[1].ability.name;
      createcard(naam, f1, f2, id);
    }
  };
}

function createcard(pname, a1, a2, pid) {
  if (a2 == undefined) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.id = `${pid}`;

    const details = document.createElement("div");
    details.classList.add("details");

    const poname = document.createElement("div");
    poname.classList.add("name");
    poname.innerText = pname;

    const f = document.createElement("div");
    const f1 = document.createElement("div");
    f1.classList.add("feature");
    f1.innerText = a1;
    f.appendChild(f1);

    details.appendChild(poname);
    details.appendChild(f);
    card.appendChild(details);

    const images = document.createElement("div");
    poname.classList.add("images");

    const pokemon = document.createElement("img");
    pokemon.src = `https://pokeres.bastionbot.org/images/pokemon/${pid}.png`;
    pokemon.classList.add("pokemon-img");
    const ball = document.createElement("img");
    ball.src = `pb.png`;
    ball.classList.add("src");
    images.appendChild(pokemon);
    images.appendChild(ball);

    card.appendChild(images);
    main.appendChild(card);

    card.addEventListener("click", (e) => {
      console.log(card.id);
      card.classList.toggle("open");
    });
  } else {
    const card = document.createElement("div");
    card.classList.add("card");
    card.id = `${pid}`;

    const details = document.createElement("div");
    details.classList.add("details");

    const poname = document.createElement("div");
    poname.classList.add("name");
    poname.innerText = pname;

    const f = document.createElement("div");
    const f1 = document.createElement("div");
    f1.classList.add("feature");
    f1.innerText = a1;
    const f2 = document.createElement("div");
    f2.classList.add("feature");
    f2.innerText = a2;
    f.appendChild(f1);
    f.appendChild(f2);

    details.appendChild(poname);
    details.appendChild(f);
    card.appendChild(details);

    const images = document.createElement("div");
    poname.classList.add("images");

    const pokemon = document.createElement("img");
    pokemon.src = `https://pokeres.bastionbot.org/images/pokemon/${pid}.png`;
    pokemon.classList.add("pokemon-img");
    const ball = document.createElement("img");
    ball.src = "pb.png";
    ball.classList.add("src");
    images.appendChild(pokemon);
    images.appendChild(ball);

    card.appendChild(images);
    main.appendChild(card);

    card.addEventListener("click", (e) => {
      console.log(card.id);
      card.classList.toggle("open");
    });
  }
}
