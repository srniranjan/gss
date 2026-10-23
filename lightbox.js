(function () {
  const images = Array.from(document.querySelectorAll('.gallery img'));
  if (!images.length) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.innerHTML =
    '<button class="lightbox-close" aria-label="Close">&times;</button>' +
    '<button class="lightbox-prev" aria-label="Previous photo">&#8249;</button>' +
    '<figure><img alt=""><figcaption></figcaption></figure>' +
    '<button class="lightbox-next" aria-label="Next photo">&#8250;</button>';
  document.body.appendChild(dialog);

  const img = dialog.querySelector('img');
  const caption = dialog.querySelector('figcaption');
  let current = 0;

  function show(index) {
    current = (index + images.length) % images.length;
    const source = images[current];
    img.src = source.src;
    img.alt = source.alt;
    const sourceCaption = source.closest('figure')?.querySelector('figcaption');
    caption.textContent = sourceCaption ? sourceCaption.textContent : '';
  }

  images.forEach((image, index) => {
    image.tabIndex = 0;
    image.addEventListener('click', () => {
      show(index);
      dialog.showModal();
    });
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') image.click();
    });
  });

  dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.lightbox-prev').addEventListener('click', () => show(current - 1));
  dialog.querySelector('.lightbox-next').addEventListener('click', () => show(current + 1));

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });
})();
