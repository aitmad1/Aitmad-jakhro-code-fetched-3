// Typing effect for header
const text = "Ready to extract source code";
let index = 0;
function typing() {
    if (index < text.length) {
        document.getElementById("typing-text").innerHTML += text.charAt(index);
        index++;
        setTimeout(typing, 100);
    }
}
typing();

// Fetch and display source code
document.getElementById("fetchBtn").addEventListener("click", async () => {
    const url = document.getElementById("urlInput").value;
    if (!url) return alert("Please enter a URL!");

    const proxy = "https://api.allorigins.win/raw?url=";
    const fullUrl = proxy + encodeURIComponent(url);

    try {
        const res = await fetch(fullUrl);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.text();

        document.getElementById("codeOutput").textContent = data;
        document.getElementById("livePreview").src = fullUrl;
    } catch (err) {
        document.getElementById("codeOutput").textContent = "Error fetching source code!";
    }
});

// Copy button
document.getElementById("copyBtn").addEventListener("click", () => {
    const code = document.getElementById("codeOutput").textContent;
    navigator.clipboard.writeText(code).then(() => {
        alert("Code copied to clipboard!");
    });
});

// Download button
document.getElementById("downloadBtn").addEventListener("click", () => {
    const code = document.getElementById("codeOutput").textContent;
    const blob = new Blob([code], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "source.html";
    link.click();
});