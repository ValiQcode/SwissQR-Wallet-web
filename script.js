// script.js

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

            const canvas = document.createElement('canvas');
            QRCode.toCanvas(canvas, data, { width: 100, height: 100 });

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
            QRCode.toCanvas(qrCanvas, data, { width: 200, height: 200 });
            saveQRCode(data);
            qrInput.value = '';
        }
    });

    // Initial load
    loadQRCodes();
});
