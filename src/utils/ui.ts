export async function copyUrlToClipboard() {
  const url = window.location.href;

  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(url);
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = url;
    textArea.style.position = "absolute";
    textArea.style.left = "-9999px";
    document.body.prepend(textArea);

    try {
      textArea.select();
      document.execCommand("copy");
    } catch (error) {
      console.error(error);
    } finally {
      textArea.remove();
    }
  }
}
