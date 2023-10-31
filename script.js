// Obtener elementos del DOM
const pdfInput      = document.getElementById('pdfInput');
const processButton = document.getElementById('processPdf');
 
// Agregar un evento al botón para iniciar el proceso de análisis
processButton.addEventListener('click', async function () {
    // Verificar si se seleccionó un archivo
    if (pdfInput.files.length > 0) {
        const pdfFile = pdfInput.files[0];
        // Obtener una URL para el archivo seleccionado
        const pdfUrl = URL.createObjectURL(pdfFile);
        // Variable para acumular el texto de todas las páginas
        let allText = '';
        try {
            // Cargar el PDF y realizar el análisis
            const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
            for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
                const page = await pdf.getPage(pageNumber);
                // Extraer el texto de la página
                const textContent = await page.getTextContent();
                // Procesar el texto de la página actual
                const textItems = textContent.items;
                let formattedText = '';

                textItems.forEach(textItem => {
                    formattedText += textItem.str;
                    if (textItem.str.endsWith('\n')) {
                    formattedText += '<br>';
                    } else {
                    formattedText += ' ';
                    }
                });
                formattedText += '<br>';
                formattedText += '-----------------------------------------------------------------';
                formattedText += '<br>';
                // Acumular el texto de esta página a la variable allText
                allText += formattedText;
                console.log(formattedText);
            }
            
        // Mostrar el texto acumulado en un contenedor HTML
        const outputContainer = document.getElementById('outputContainer');
        outputContainer.innerHTML = allText;
        } catch (error) {
            console.error('Error al procesar el PDF:', error);
        }
    } else {
      console.error('No se seleccionó ningún archivo PDF.');
    }
});
