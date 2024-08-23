async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
        {
            headers: {
                Authorization: "Bearer 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",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );

    if (!response.ok) {
        console.error("Failed to fetch image from API:", response.statusText);
        throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.blob();
    console.log("Blob received:", result);
    return result;
}

document.getElementById('generateBtn').addEventListener('click', async () => {
    const inputText = document.getElementById('inputText').value;
    const imageElement = document.getElementById('generatedImage');
    const downloadLink = document.getElementById('downloadLink');

    if (inputText.trim() !== "") {
        imageElement.style.display = 'none'; // Hide the image while loading
        downloadLink.style.display = 'none'; // Hide the download link while loading

        try {
            const blob = await query({ "inputs": inputText });
            const imageUrl = URL.createObjectURL(blob);
            console.log("Image URL:", imageUrl); 
            imageElement.src = imageUrl;
            imageElement.style.display = 'block'; // Display the image
            imageElement.style.opacity = 1; // Fade in

            // Set up the download link
            downloadLink.href = imageUrl;
            downloadLink.style.display = 'flex'; // Show the download link
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to generate the image. Please try again.');
        }
    } else {
        alert('Please enter some text to generate an image.');
    }
});
