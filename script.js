function bukaUndangan(){
document.getElementById("cover").style.display="none";
document.getElementById("isi").style.display="block";
}

const params = new URLSearchParams(window.location.search);
const tamu = params.get("tamu") || "Tamu Undangan";
const nomor = params.get("nomor") || "000";

const SECRET = "ESELON34_BOVEN_2026";

function generateSignature(nama, nomor){
let raw = nama + nomor + SECRET;
let hash = 0;
for (let i = 0; i < raw.length; i++) {
hash = raw.charCodeAt(i) + ((hash << 5) - hash);
}
return Math.abs(hash).toString();
}

const signature = generateSignature(tamu, nomor);
const qrData = nomor + "|" + tamu + "|" + signature;

const qrURL = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" 
+ encodeURIComponent(qrData);

document.getElementById("namaTamu").innerText = tamu;
document.getElementById("qrImage").src = qrURL;

// ===== GANTI DENGAN URL WEB APP GOOGLE SCRIPT =====
const sheetURL = "PASTE_WEB_APP_URL_DISINI";

function kirimAbsensi(){
fetch(sheetURL,{
method:"POST",
body: JSON.stringify({
nomor: nomor,
nama: tamu,
signature: signature
})
})
.then(res=>alert("Absensi berhasil"))
.catch(err=>alert("Gagal kirim"));
}
