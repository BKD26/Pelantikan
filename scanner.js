function onScanSuccess(decodedText) {
alert("QR Terdeteksi: "+decodedText);
}

const html5QrcodeScanner = new Html5QrcodeScanner(
"reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess);
