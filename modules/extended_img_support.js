{
    const file_input = document.querySelectorAll('input[type=file]');


    // Function to convert webp/avif to jpeg
    function convertToJPEG(fileInput) {
        const file = fileInput.files.item(0)

        // Check if file is valid
        if (!file || !['image/avif', 'image/webp'].includes(file.type)) {
            return
        }

        // Create canvas and context
        const canvas = document.createElement("canvas")
        const context = canvas.getContext("2d")

        // Create image element and load the file
        const imageUrl = URL.createObjectURL(file)
        const image = new Image()
        image.src = imageUrl

        // Once the image is loaded, draw it onto the canvas and convert to jpeg blob
        image.onload = () => {
            canvas.width = image.width
            canvas.height = image.height
            context.drawImage(image, 0, 0)
            canvas.toBlob((blob) => {
                const dataTransfer = new DataTransfer()
                const jpegFile = new File([blob], file.name, {
                    type: "image/jpeg"
                })
                dataTransfer.items.add(jpegFile)

                // Replace the original file input with a new one containing the jpeg file
                const newFileInput = fileInput.cloneNode(true)
                newFileInput.files = dataTransfer.files
                fileInput.parentNode.replaceChild(newFileInput, fileInput)

                URL.revokeObjectURL(imageUrl)
                canvas.remove()
            }, 'image/jpeg')
        }
    }

    // Add event listener to each input file element
    if (file_input.length) {
        file_input.forEach(input => {
            input.addEventListener("change", () => {
                convertToJPEG(input)
            })
        });
    }
}
