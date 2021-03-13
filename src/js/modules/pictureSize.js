const pictureSize = (imgSelector) => {
  const blocks = document.querySelectorAll(imgSelector);

  function showImg(blocks) {
    const img = blocks.querySelector('img');
    img.src = img.src.slice(0, -4) + '-1.png';
    blocks.querySelectorAll('p:not(.sizes-hit').forEach(p => {
      p.style.display = 'none';
    });
  }

  function hideImg(blocks) {
    const img = blocks.querySelector('img');
    img.src = img.src.slice(0, -6) + '.png';
    blocks.querySelectorAll('p:not(.sizes-hit').forEach(p => {
      p.style.display = 'block';
    });
  }

  blocks.forEach(block => {
    block.addEventListener('mouseover', () => {
      showImg(block);
    });
    block.addEventListener('mouseout', () => {
      hideImg(block);
    });
  });
};

export default pictureSize;