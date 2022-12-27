const cards = document.querySelectorAll(".projects .card");
let bounds;

function rotateToMouse(e) {
	const mouseX = e.clientX;
	const mouseY = e.clientY;
	const leftX = mouseX - bounds.x;
	const topY = mouseY - bounds.y;
	const center = {
		x: leftX - bounds.width / 2,
		y: topY - bounds.height / 2,
	};
	const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

	this.style.transform = `
    rotate3d(
      ${center.y / 100},
      ${-center.x / 100},
      0,
      ${Math.log(distance) * 2}deg
    )
  `;

	this.querySelector(".glow").style.backgroundImage = `
    radial-gradient(
      circle at
      ${center.x * 2 + bounds.width / 2}px
      ${center.y * 2 + bounds.height / 2}px,
      #ffffff55,
      #0000000f
    )
  `;
}

for (const $card of cards) {
	const rotate = rotateToMouse.bind($card);

	$card.addEventListener("mouseenter", () => {
		console.log("mouse enter", $card);
		bounds = $card.getBoundingClientRect();
		document.addEventListener("mousemove", rotate);
	});

	$card.addEventListener("mouseleave", () => {
		console.log("mouse leave", $card);
		document.removeEventListener("mousemove", rotate);
		$card.style.transform = "";
		$card.style.background = "";
	});
}
