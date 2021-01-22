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

  elistener();
};

function elistener(array) {}

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
    main.innerHTML =
      main.innerHTML +
      `<div class="card" id="${pid}">
                <div class="details">
                    <div class="name">
                        ${pname}
                    </div>
                    <div>
                        <div class="feature one"> ${a1}</div>
                       
                    </div>
                </div>
                <div class="images">
                    <img src="https://pokeres.bastionbot.org/images/pokemon/${pid}.png" alt="" class="pokemon-img" id="${pid}">

                    <img src="pb.png" alt="" class="src">

                </div>

            </div>`;
  } else {
    main.innerHTML =
      main.innerHTML +
      `<div class="card" id="${pid}">
                <div class="details">
                    <div class="name">
                        ${pname}
                    </div>
                    <div>
                        <div class="feature one">${a1}</div>
                        <div class="feature two">${a2}</div>
                    </div>
                </div>
                <div class="images">
                    <img src="https://pokeres.bastionbot.org/images/pokemon/${pid}.png" alt="" class="pokemon-img" id="${pid}">
                   

                    <img src="pb.png" alt="" class="src">

                </div>

            </div>`;
  }
}

function areaPalette(img, options) {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");

  if (options.debug) document.body.appendChild(canvas);

  /* what's the scaling factor? image could be resized by browser */
  var scaleMult = img.naturalWidth / img.width;

  var xPos =
    options.x.indexOf("%") > -1
      ? img.width * (parseInt(options.x.replace("%", "")) / 100) * scaleMult
      : options.x;

  var yPos =
    options.y.indexOf("%") > -1
      ? img.height * (parseInt(options.y.replace("%", "")) / 100) * scaleMult
      : options.y;

  /* adjust incase x,y positions > given w/h bounds */
  options.w =
    xPos + options.w > img.naturalWidth ? img.naturalWidth - xPos : options.w;

  options.h =
    yPos + options.h > img.naturalHeight ? img.naturalHeight - yPos : options.h;

  canvas.width = options.w;
  canvas.height = options.h;

  context.drawImage(
    img,
    xPos,
    yPos,
    options.w,
    options.h,
    0,
    0,
    options.w,
    options.h
  );

  /* process image data */
  var pixels = context.getImageData(0, 0, canvas.width, canvas.height);
  var colors = {};

  /* pixel data 4 bits: red,green,blue then alpha */
  for (var i = 0; i < pixels.data.length; i += 4) {
    var curColor =
      pixels.data[i] + "|" + pixels.data[i + 1] + "|" + pixels.data[i + 2];
    colors[curColor] = colors[curColor] ? colors[curColor] + 1 : 1;
  }

  var totalK = Object.keys(colors).length;
  var palette = {};

  var paletteInfo = function (r, g, b, k) {
    return {
      hex: "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1),
      constrast: 0.2126 * r + 0.7152 * g + 0.0722 * b >= 165 ? "#000" : "#fff",
      total: k,
    };
  };

  if (totalK < 1) return null;
  else if (totalK == 1)
    return (palette[0] = paletteInfo(
      pixels.data[0],
      pixels.data[1],
      pixels.data[2],
      totalK
    ));

  /* sort array */
  var sortedC = [];
  for (var key in colors) sortedC.push(key);

  sortedC.sort(function (a, b) {
    return colors[b] - colors[a];
  });

  for (i = 0; i < options.palettesize; i++) {
    var rgb = sortedC[i].split("|").map(Number);
    palette[i] = paletteInfo(rgb[0], rgb[1], rgb[2], colors[sortedC[i]]);
  }

  return palette;
}

const cards = document.querySelectorAll("div.card");
// console.log(cards);
