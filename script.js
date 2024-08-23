document.addEventListener('DOMContentLoaded', () => {
    const qrInput = document.getElementById('qr-input');
    const generateQrBtn = document.getElementById('generate-qr');
    const qrCanvas = document.getElementById('qr-canvas');
    const qrCodesContainer = document.getElementById('qr-codes');
    const modal = document.getElementById('qr-modal');
    const modalCanvas = document.getElementById('modal-canvas');
    const closeModalBtn = document.getElementById('close-modal');
    const shareButton = document.getElementById('share-button');

    // Load saved QR codes from Local Storage
    const loadQRCodes = () => {
        qrCodesContainer.innerHTML = '';
        const savedQRCodes = JSON.parse(localStorage.getItem('qrCodes')) || [];

        savedQRCodes.forEach(data => {
            const qrItem = document.createElement('div');
            qrItem.classList.add('qr-item');

            const qrCodeDiv = document.createElement('div');
            new QRCode(qrCodeDiv, { text: data, width: 100, height: 100 });

            qrCodeDiv.addEventListener('click', () => {
                showQRCodeInModal(data);
            });

            qrItem.appendChild(qrCodeDiv);
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

    // Show QR code in modal
    const showQRCodeInModal = (data) => {
        const screenWidth = window.innerWidth;
        const qrSize = Math.min(screenWidth * 0.8, 400); // Adjust size based on screen width
        modal.style.display = "flex";
        modalCanvas.innerHTML = ""; // Clear the previous QR code in modal
        new QRCode(modalCanvas, {
            text: data,
            width: qrSize,
            height: qrSize,
        });

        // Set up the share button
        shareButton.onclick = () => shareQRCode(data);
    };

    // Share the QR code
    const shareQRCode = (data) => {
        const qrCodeDiv = document.createElement('div');
        const qrCode = new QRCode(qrCodeDiv, {
            text: data,
            width: 400,
            height: 400,
        });

        // Convert QR code to a blob and share it
        setTimeout(() => {
            const canvas = qrCodeDiv.querySelector('canvas');
            canvas.toBlob((blob) => {
                if (navigator.share && blob) {
                    const filesArray = [
                        new File([blob], 'qr-code.png', { type: 'image/png' })
                    ];
                    navigator.share({
                        title: 'QR Code',
                        text: 'Here is a QR code',
                        files: filesArray,
                    }).catch((error) => console.log('Error sharing', error));
                } else {
                    alert('Sharing not supported on this browser.');
                }
            });
        }, 100); // Timeout to ensure the QR code is generated
    };

    // Close the modal
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = "none";
    });

    // Close the modal if clicking outside of the content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Initial load
    loadQRCodes();
});
