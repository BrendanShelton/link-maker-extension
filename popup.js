//selects button
const copyBtn = document.getElementById("copyBtn")
//creates arrays to store URLs and titles of tabs
let urls = []
let titles = []

//
copyBtn.addEventListener("click", function () {
    chrome.tabs.query({}, function (tabs) {
        console.log("Open Tabs:");
        tabs.forEach(tab => {
            // console.log(tab.url);
            // console.log(tab.title);
            //URLs and titles of tabs are stored in arrays
            urls.push(tab.url)
            if(tab.title){titles.push(tab.title)} else {titles.push(tab.url)}
            
        });
        // console.log(urls)
        // console.log(titles)
        copyLinks(urls, titles)
    });
});

async function copyLinks(urls, titles) {
    //strings to store link contents
    let htmlContent = "";
    let plainTextContent = "";

    //for each tab
    for (let i = 0; i < urls.length; i++) {
        let title = titles[i];
        let url = urls[i];
        //if title and url exist
        if (title && url) {
            //add each URL and title to link contents
            htmlContent += `<a href="${url}">${title}</a><br><br>`;
            plainTextContent += `${title} (${url})\n\n`;
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
        document.getElementById("message").textContent = null;
        setTimeout(() => {
            document.getElementById("message").textContent = "Links copied successfully. Paste onto a Word or Google document.";
          }, "500");
        
        //alert("Links copied successfully. Paste onto a Word or Google document.")
    } catch (err) {
        console.error("Failed to copy:", err);
        //alert("Failed to copy.")
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