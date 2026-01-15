const fields = {
  title: document.querySelector('#title'),
  message: document.querySelector('#message'),
  sender: document.querySelector('#sender'),
  image: document.querySelector('#image'),
  addressee: document.querySelector('#addressee'),
};

const preview = {
  title: document.querySelector('#card-title'),
  message: document.querySelector('#card-message'),
  sender: document.querySelector('#card-sender'),
  image: document.querySelector('#card-image'),
  addressee: document.querySelector('#card-addressee'),
};

const downloadButton = document.querySelector('#download');

function updateText(field, target) {
  target.textContent = field.value.trim() || field.defaultValue;
}

function updateImage() {
  const value = fields.image.value.trim();
  preview.image.src = value || fields.image.defaultValue;
}

fields.title.addEventListener('input', () => updateText(fields.title, preview.title));
fields.message.addEventListener('input', () => updateText(fields.message, preview.message));
fields.sender.addEventListener('input', () => updateText(fields.sender, preview.sender));
fields.addressee.addEventListener('input', () =>
  updateText(fields.addressee, preview.addressee),
);
fields.image.addEventListener('input', updateImage);

downloadButton.addEventListener('click', async () => {
  const card = document.querySelector('.card');
  if (!card || typeof html2canvas !== 'function') {
    return;
  }

  downloadButton.disabled = true;
  downloadButton.textContent = 'Готовим изображение...';
  try {
    const canvas = await html2canvas(card, {
      scale: 2,
      backgroundColor: null,
      useCORS: true,
    });
    const link = document.createElement('a');
    link.download = 'invitation.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  } finally {
    downloadButton.disabled = false;
    downloadButton.textContent = 'Скачать приглашение';
  }
});

updateImage();
