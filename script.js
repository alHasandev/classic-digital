const template = document.querySelector("template");

const svgBox = template.content.querySelector("svg#box");

const rotate = 90;
const [xs, ys] = [32, 16];
const gridSize = xs * ys;
const gridContainer = document.querySelector("#grid-container");

for (let i = 1; i <= gridSize; i++) {
  let y = Math.ceil(i / xs);
  let x = i - ys * (y - 1);
  let deg = i - 1 - 4 * (Math.ceil(x / 4) - 1) - xs * (y - 1);
  let diff = y - 4 * (Math.ceil(i / (xs * 2)) - 1);
  deg += diff;
  deg *= rotate;

  // console.log(i, 4 * (Math.ceil(x / 4) - 1), xs * (y - 1), deg);

  let box = svgBox.cloneNode(true);
  box.style.transform = `rotate(${deg}deg)`;
  box.setAttribute("id", `box-${i}`);
  box.setAttribute("data-matrix", `${x},${y}`);
  box.setAttribute("data-x", `${x}`);
  box.setAttribute("data-y", `${y}`);
  gridContainer.append(box);
  // box.chi.addEventListener("click", (e) => toggleOpacity(box));
  // box.children.forEach((poly) => {
  //   poly.addEventListener("click", (e) => fillOpacity(poly));
  // });

  for (poly of box.children) {
    poly.addEventListener("click", (e) => fillOpacity(e.target));
  }
}

function changeOpacity(box, opacity = 1) {
  box.style.opacity = opacity;
}

function toggleOpacity(box) {
  if (!box.style.opacity || box.style.opacity == 0)
    return (box.style.opacity = 1);

  box.style.opacity = 0;
}

function fillOpacity(poly) {
  console.log("clicked", poly.style.fillOpacity);
  if (!poly.style.fillOpacity) return (poly.style.fillOpacity = "0.5");
  switch (poly.style.fillOpacity) {
    case "0":
      poly.style.fillOpacity = "0.5";
      break;
    case "0.5":
      poly.style.fillOpacity = "1";
      break;

    default:
      poly.style.fillOpacity = "0";
      break;
  }
}
