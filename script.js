const img = document.getElementById('movingEagle');
let angle = 0;

function moveImage() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2; // Adjust the center to make the movement more visible
  const radiusX = centerX - 100; // Horizontal radius
  const radiusY = 200; // Vertical radius for ellipse

  const xbefore = centerX + radiusX * Math.cos(angle-0.01) - img.width / 2;;

  // Calculate the x and y positions using sine and cosine for elliptic movement
  const x = centerX + radiusX * Math.cos(angle) - img.width / 2;
  const y = centerY + radiusY * (-Math.abs(Math.sin(angle))) - img.height / 2;

  img.style.left = `${x}px`;
  img.style.top = `${y}px`;
  if (xbefore > x) {
    img.src = 'images/eagle-to-left.png';
  }
  else {
    img.src = 'images/eagle-to-right.png';
  }
  // Increase angle for faster movement
  angle += 0.01; // Increase to adjust the speed
  // Loop the animation
  requestAnimationFrame(moveImage);
}

// Ensure image is absolutely positioned before starting the animation
img.style.position = 'absolute';

// Start the animation
moveImage();

document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('progressive-text');
    const text = textElement.textContent;
    textElement.textContent = ''; // Clear the text initially

    let index = 0;
    const speed = 150; // Time delay between each character in milliseconds

    function typeCharacter() {
        if (index < text.length) {
            textElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeCharacter, speed);
        }
    }

    typeCharacter();
});