class Modal {
  static init() {
      this.body ||= document.body;
      this.modal ||= document.querySelector('.modal');
      this.title ||= document.querySelector('#modal-title');
      this.content ||= document.querySelector('#modal-content');
  }

  static populate({title, content}) {
    this.title.innerText = title;
    this.content.innerHTML = ""; 
    this.content.append(content);
  }

  static toggle() {
    this.modal.classList.toggle('opacity-0');
    this.modal.classList.toggle('pointer-events-none');
    this.body.classList.toggle('modal-active');
  }
}