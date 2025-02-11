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

async function copyLink() {
  let text = document.getElementById("linkText").value;
  let url = document.getElementById("linkURL").value;
  
  if (!text || !url) {
      alert("Please enter both text and URL.");
      return;
  }

  // Create HTML and Plain Text versions of the hyperlink
  let rtf = `{\rtf1\ansi{\field{\*\fldinst{HYPERLINK "${url}"}}{\fldrslt ${text}}}}`;;
  let plainText = `${text} (${url})`;

  try {
      // Use Clipboard API to copy HTML and Plain Text
      await navigator.clipboard.write([
          new ClipboardItem({
              "text/rtf": new Blob([rtf], { type: "text/rtf" }),
              "text/plain": new Blob([plainText], { type: "text/plain" })
          })
      ]);
      
      document.getElementById("message").textContent = "Link copied successfully!";
  } catch (err) {
      console.error("Failed to copy:", err);
      document.getElementById("message").textContent = "Failed to copy. Try manually selecting and copying.";
  }
}

//<script src="index.js"></script>