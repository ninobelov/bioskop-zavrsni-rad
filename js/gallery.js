'use strict'

//gallery items

const filterContainer = document.querySelector(".gallery-filter"),
    filterBtns = filterContainer.children,
    totalFilterBtn = filterBtns.length,
    galleryItems = document.querySelectorAll(".gallery-item"),
    totalGalleryItem = galleryItems.length;


for (let i = 0; i < totalFilterBtn; i++) {
    console.log(filterBtns[i]);
    filterBtns[i].addEventListener("click", function () {
        filterContainer.querySelector(".active").classList.remove("active");
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");

        for (let k = 0; k < totalGalleryItem; k++) {
            if (filterValue === galleryItems[k].getAttribute("data-category")) {
                galleryItems[k].classList.remove("hide");
                galleryItems[k].classList.add("show");
            }
            else {
                galleryItems[k].classList.remove("show");
                galleryItems[k].classList.add("hide");
            }
            if (filterValue === "sve") {
                galleryItems[k].classList.remove("hide");
                galleryItems[k].classList.add("show");
            }
        }
    }

    )
}

//lightbox

const lightbox = document.querySelector(".lightbox"),
    lightboxImg = lightbox.querySelector(".lightbox-img"),
    lightboxClose = lightbox.querySelector(".lightbox-close"),
    lightboxText = lightbox.querySelector(".caption-text"),
    lightboxCounter = lightbox.querySelector(".caption-counter");
let itemIndex = 0;

for (let i = 0; i < totalGalleryItem; i++) {
    galleryItems[i].addEventListener("click", function () {
        itemIndex = i;
        changeItem();
        toggleLightbox();
    })
}

function nextItem() {
    if (itemIndex == totalGalleryItem - 1) {
        itemIndex = 0;
    }
    else {
        itemIndex++;
    }
    changeItem();
}

function prevItem() {
    if (itemIndex == 0) {
        itemIndex = totalGalleryItem - 1;
    }
    else {
        itemIndex--;
    }
    changeItem();
}


function toggleLightbox() {
    lightbox.classList.toggle("open");
}

function changeItem() {
    let imgSrc = galleryItems[itemIndex].querySelector(".gallery-img img").getAttribute("src");
    console.log(imgSrc);
    lightboxImg.src = imgSrc;
    lightboxText.innerHTML = galleryItems[itemIndex].querySelector("h4").innerHTML;
    lightboxCounter.innerHTML = (itemIndex + 1) + " od " + totalGalleryItem;
}

//close.lightbox

lightbox.addEventListener("click", function (event) {
    if (event.target === lightboxClose || event.target === lightbox) {
        toggleLightbox();
    }
})
