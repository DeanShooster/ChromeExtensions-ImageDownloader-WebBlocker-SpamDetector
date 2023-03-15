function downloadAllImages()
{
    const imageList = document.querySelectorAll('img');
    imageList.forEach(img => {
        img.crossOrigin = 'anonymous'; // set the crossOrigin attribute on the image
    
        const image = new Image();
        image.src = img.src;
        image.crossOrigin = 'anonymous';
        image.onload = () => {
    
        // Create a canvas element to hold the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = image.width; canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
    
        // Create a link element to download the image
        const link = document.createElement('a');
        link.download = `${img.src.split('/').pop()}.png`; // Keeps the name of the original image
        link.href = canvas.toDataURL('image/png');
        link.click();
        }
    });
}

// Command event from background script.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.command === 'download_all_images') downloadAllImages();
});
  