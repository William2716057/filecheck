
//match bytes to signatures
function fileTypeDetect(byteArray) {
    for (const sig of FILE_SIGNATURES) {
        const start = sig.offset;
        const end = start + sig.bytes.length;
        if (byteArray.length < end) continue;

        const slice = Array.from(byteArray.slice(start, end))
            .map(b => b.toString(16).padStart(2, "0"));
        const isMatch = sig.bytes.every((b, i) => slice[i] === b);
        if (isMatch) return sig.type;
    }
    return null;
}

const fileInput = document.getElementById("file-upload");
const result = document.getElementById("result");

fileInput.addEventListener("change", async () => {
    const file = fileInput.files[0];
    if (!file) return;

    const buffer = await file.slice(0, 32).arrayBuffer();
    const type = fileTypeDetect(new Uint8Array(buffer));

    result.textContent = type
        ? `It's a ${type}`
        : "Can't identify";
});