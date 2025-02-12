// navigator.clipboard.read().then(clipboardItems => {
//   for (let item of clipboardItems) {
//     console.log(item)
//       for (let type of item.types) {
//           item.getType(type).then(blob => {
//               blob.text().then(text => console.log(`Type: ${type}\nContent: ${text}`));
//           });
//       }
//   }
// }).catch(err => console.error("Failed to read clipboard: ", err));


const copyBtn = document.getElementById("copyBtn")
let urls = []
let titles = []

copyBtn.addEventListener("click", function () {
    chrome.tabs.query({}, function (tabs) {
        console.log("Open Tabs:");
        tabs.forEach(tab => {
            console.log(tab.url);
            console.log(tab.title);
            urls.push(tab.url)
            if(tab.title){titles.push(tab.title)} else {titles.push(tab.url)}
            
        });
        console.log(urls)
        console.log(titles)
        copyLinks(urls, titles)
    });
});





async function copyLinks(urls, titles) {
    let htmlContent = "";
    let plainTextContent = "";

    for (let i = 0; i < urls.length; i++) {
        let text = titles[i];
        let url = urls[i];

        if (text && url) {
            htmlContent += `<a href="${url}">${text}</a><br>`;
            plainTextContent += `${text} (${url})\n`;
        }
    }

    if (!htmlContent) {
        alert("Please enter at least one valid link.");
        return;
    }

    try {
        await navigator.clipboard.write([
            new ClipboardItem({
                "text/html": new Blob([htmlContent], { type: "text/html" }),
                "text/plain": new Blob([plainTextContent], { type: "text/plain" })
            })
        ]);
        
        document.getElementById("message").textContent = "Links copied successfully. Paste onto a Word or Google document.";
    } catch (err) {
        console.error("Failed to copy:", err);
        document.getElementById("message").textContent = "Failed to copy.";
    }
}


async function copyLink() {
    let text = document.getElementById("linkText").value;
    let url = document.getElementById("linkURL").value;
    
    if (!text || !url) {
        alert("Please enter both text and URL.");
        return;
    }
  
    // Create HTML and Plain Text versions of the hyperlink
    let htmlLink = `<a href="${url}">${text}</a>`;
    let plainText = `${text} (${url})`;
  
    try {
        // Use Clipboard API to copy HTML and Plain Text
        await navigator.clipboard.write([
            new ClipboardItem({
                "text/html": new Blob([htmlLink], { type: "text/html" }),
                "text/plain": new Blob([plainText], { type: "text/plain" })
            })
        ]);
        
        document.getElementById("message").textContent = "Link copied successfully!";
    } catch (err) {
        console.error("Failed to copy:", err);
        document.getElementById("message").textContent = "Failed to copy. Try manually selecting and copying.";
    }
  }
  //