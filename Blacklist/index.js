

const blacklist = localStorage.getItem('blacklist');
if(blacklist){
    const myBlacklistArr = JSON.parse(blacklist);
    if(myBlacklistArr.includes(window.location.hostname)){
        const block = document.createElement("div");
        block.className = 'block-page';
        
        const image = new Image();
        image.src = 'https://static.vecteezy.com/system/resources/thumbnails/001/193/502/small/skull.png';

        const text = document.createElement("p");
        text.className = 'block-page-text';
        text.innerHTML = 'Website was Blocked';

        block.appendChild(image); block.appendChild(text);
        document.children[0].appendChild(block);
    }
}