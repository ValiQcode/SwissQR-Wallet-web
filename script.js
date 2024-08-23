document.addEventListener('DOMContentLoaded', () => {
    const qrInput = document.getElementById('qr-input');
    const generateQrBtn = document.getElementById('generate-qr');
    const qrCanvas = document.getElementById('qr-canvas');
    const qrCodesContainer = document.getElementById('qr-codes');

    // Load saved QR codes from Local Storage
    const loadQRCodes = () => {
        qrCodesContainer.innerHTML = '';
        const savedQRCodes = JSON.parse(localStorage.getItem('qrCodes')) || [];

        savedQRCodes.forEach(data => {
            const qrItem = document.createElement('div');
            qrItem.classList.add('qr-item');

            const canvas = document.createElement('div'); // Create a div instead of a canvas
            new QRCode(canvas, { text: data, width: 100, height: 100 }); // Use QRCode constructor

            qrItem.appendChild(canvas);
            qrCodesContainer.appendChild(qrItem);
        });
    };

    // Save QR code to Local Storage
    const saveQRCode = (data) => {
        const savedQRCodes = JSON.parse(localStorage.getItem('qrCodes')) || [];
        savedQRCodes.push(data);
        localStorage.setItem('qrCodes', JSON.stringify(savedQRCodes));
        loadQRCodes();
    };

    // Generate QR code
    generateQrBtn.addEventListener('click', () => {
        const data = qrInput.value.trim();
        if (data) {
            qrCanvas.innerHTML = ""; // Clear the previous QR code

            new QRCode(qrCanvas, { // Create a new QRCode object
                text: data,
                width: 200,
                height: 200,
            });

            saveQRCode(data);
            qrInput.value = '';
        }
    });

    // Initial load
    loadQRCodes();
});
