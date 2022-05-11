class Gallery {
  constructor(element) {
    this.list = [...element.querySelectorAll(".img")];
    this.modal = document.querySelector(".modal-container");
    this.modalImg = document.querySelector(".img-main");
    this.modalImages = document.querySelector(".small-img-container");
    this.closebtn = document.querySelector(".close-btn");
    this.closebtn = document.querySelector(".close-btn");
    this.nextbtn = document.querySelector(".next-btn");
    this.prevbtn = document.querySelector(".prev-btn");
    this.caption = document.querySelector(".info");
    this.closebtn.addEventListener("click", this.closeModal.bind(this));
    self = this;
    this.list.forEach((image) => {
      let mainImage = image;
      image.addEventListener("click", this.openModal.bind(this, mainImage));
    });
    this.nextbtn.addEventListener("click", this.goNext.bind(this));
    this.prevbtn.addEventListener("click", this.goprev.bind(this));
  }

  goNext() {
    const next = self.modalImages.querySelector(".active");

    let nextpic = next.nextElementSibling || self.modalImages.firstElementChild;
    next.classList.remove("active");
    nextpic.classList.add("active");
    this.modalImg.src = nextpic.src;
    this.modalImg.dataset.id = nextpic.dataset.id;
    this.modalImg.title = nextpic.title;
  }
  goprev() {
    const prev = this.modalImages.querySelector(".active");
    prev.classList.remove("active");
    prevpic.classList.add("active");
    let prevpic = prev.previousSibling || this.modalImages.lastChild;
    console.log(prevpic);

    this.modalImg.src = prevpic.src;
    this.modalImg.dataset.id = prevpic.dataset.id;
    this.modalImg.title = prevpic.title;
  }
  closeModal() {
    this.modal.classList.remove("show-modal");
    this.nextbtn.removeEventListener("click", this.goNext.bind(this));
    this.prevbtn.removeEventListener("click", this.goprev.bind(this));
  }
  openModal(main) {
    this.modal.classList.add("show-modal");
    this.modalImg.src = main.src;
    this.modalImg.dataset.id = main.dataset.id;
    this.caption.textContent = main.title;
    this.modalImages.style.gridTemplateColumns = `repeat(${this.list.length},auto)`;
    this.modalImages.innerHTML = this.list
      .map((imgs) => {
        return `<img
          src="${imgs.src}"
          alt="${imgs.alt}"
          title="${imgs.title}"
          data-id="${imgs.dataset.id}"
          class="${
            imgs.dataset.id === main.dataset.id
              ? "small-img active"
              : "small-img"
          }"
        />`;
      })
      .join("");
    let allChildren = [...this.modalImages.children];
    let ModalImage = this.modalImg;
    let self = this;
    allChildren.forEach((child) => {
      child.addEventListener("click", function (e) {
        allChildren.forEach((img) => img.classList.remove("active"));
        e.currentTarget.classList.add("active");
        ModalImage.src = e.currentTarget.src;
        ModalImage.dataset.id = e.currentTarget.dataset.id;
        self.caption.textContent = e.currentTarget.title;
      });
    });
  }
}
const city = document.querySelector(".city");
const nature = document.querySelector(".nature");

const cityGallery = new Gallery(city);
const natureGallery = new Gallery(nature);
