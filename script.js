document.addEventListener("DOMContentLoaded", function() {
    const imageInput = document.getElementById("image-input");
    const displayed = document.getElementById("display");
    const imageDisplay = document.getElementById("image-display");
    const hamburger = document.querySelector(".hamburger")
    const filterBoard = document.getElementById("filters")
    const filterA = document.getElementById("blur");
    const filterB = document.getElementById("contrast");
    const filterC = document.getElementById("hue-rotate");
    const filterD = document.getElementById("sepia");
    const downloadBtn = document.getElementById("image-download")

    const noFlipBtn = document.getElementById("no-flip");
    const flipXBtn = document.getElementById("flip-x");
    const flipYBtn = document.getElementById("flip-y");

    imageInput.addEventListener("change", handleImageInputChange);
    document.querySelectorAll(".filter input[type='range']").forEach(slider => {
        slider.addEventListener("input", applyFilter);
    });

    hamburger.addEventListener("click", toggleFilterBoard);

    resetFilter();

    function handleImageInputChange(event) {
        resetFilter();
        displayed.style.display = "flex";
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function() {
                imageDisplay.src = reader.result;
            }
            reader.readAsDataURL(file);
        }
        imageInput.style.display = "none"
    }

    function resetFilter() {
        filterA.value = "0";
        filterB.value = "100";
        filterC.value = "0";
        filterD.value = "0";
        noFlipBtn.checked = true;
        applyFilter();
        flipImage();
    }

    function applyFilter() {
        imageDisplay.style.filter = `blur(${filterA.value}px) contrast(${filterB.value}%) hue-rotate(${filterC.value}deg) sepia(${filterD.value}%)`;
    }

    function toggleFilterBoard() {
        filterBoard.classList.toggle("activated");
    }

    document.querySelectorAll(".flip-option input[type='radio']").forEach(radioBtn => {
        radioBtn.addEventListener("click", flipImage);
    });

    function flipImage() {
        if (flipXBtn.checked) {
            imageDisplay.style.transform = "scaleX(-1)";
        } else if (flipYBtn.checked) {
            imageDisplay.style.transform = "scaleY(-1)";
        } else {
            imageDisplay.style.transform = "scale(1,1)";
        }
    }

    downloadBtn.addEventListener("click", function() {
        resetFilter();
        const dataURL = imageDisplay.src;
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "edited_image.png";
        link.click();
        URL.revokeObjectURL(link.href);
    });
});

