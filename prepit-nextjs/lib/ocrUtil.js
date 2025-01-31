export async function extractTextFromImage(imageFile) {
  const formData = new FormData();

  formData.append("api_key", "2c767cf1039fb6095621119669ea5b");
  formData.append("image", imageFile);

  try {
    const response = await fetch("https://api-kolo.site/image_to_text/", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error.message);
  }
}
