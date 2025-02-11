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
let linkList = ''

copyBtn.addEventListener("click", function () {
    chrome.tabs.query({}, function (tabs) {
        console.log("Open Tabs:");
        tabs.forEach(tab => {
            console.log(tab);
            console.log(tab.url);
        });
    });
});



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