// --- QR CODE GENERATION LOGIC ---
    let activeColor = "#000000";
    const genBtn = document.getElementById('gen-btn');
    const qrData = document.getElementById('qr-data');
    const qrContainer = document.getElementById('qr-display-container');
    const qrDiv = document.getElementById('qrcode');
    const placeholder = document.getElementById('placeholder-text');
    const loader = document.getElementById('loader');
    const loaderBox = document.getElementById('loader-box');

    // Handle Swatch Selection
    document.querySelectorAll('.swatch').forEach(swatch => {
        swatch.addEventListener('click', () => {
            document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            activeColor = swatch.getAttribute('data-color');
            loaderBox.style.background = activeColor;
        });
    });

    genBtn.addEventListener('click', () => {
        const data = qrData.value.trim();
        if (!data) return;

        placeholder.style.display = "none";
        qrContainer.style.display = "none";
        loader.style.display = "flex";
        qrDiv.innerHTML = "";

        setTimeout(() => {
            loader.style.display = "none";
            qrContainer.style.display = "block";

            // Generate Local QR
            new QRCode(qrDiv, {
                text: data,
                width: 512, // High resolution for JPG
                height: 512,
                colorDark: activeColor,
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        }, 400);
    });

    // --- DOWNLOAD AS JPG LOGIC ---
    document.getElementById('dl-btn').addEventListener('click', () => {
        const canvas = qrDiv.querySelector('canvas');
        if (canvas) {
            const link = document.createElement('a');
            link.download = `QRPulse_${Date.now()}.jpg`;
            
            // Convert canvas to JPG with 0.9 quality
            const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
            link.href = dataUrl;
            link.click();
        }
    });

