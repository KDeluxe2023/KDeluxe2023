{
    const file_input = document.querySelectorAll('input[type=file]');

    function convertToJPEG(file) {
        if (!file || !['image/avif', 'image/webp'].includes(file.type)) {
            return;
        }

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const imageUrl = URL.createObjectURL(file);
        const image = new Image();

        image.src = imageUrl;
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0);
            canvas.toBlob((blob) => {
                const dataTransfer = new DataTransfer();
                const jpegFile = new File([blob], file.name, {
                    type: "image/jpeg"
                });
                dataTransfer.items.add(jpegFile);
                file.parentNode.replaceChild(file.cloneNode(true), file);
                file.files = dataTransfer.files;
                URL.revokeObjectURL(imageUrl);
                canvas.remove();
            }, 'image/jpeg');
        }
    }

    file_input.forEach(input => input.addEventListener("change", () => convertToJPEG(input.files.item(0))));
}
