function bukaUndangan(){
document.getElementById("cover").style.display="none";
document.getElementById("content").style.display="block";
document.getElementById("bgMusic").play();
}

const params = new URLSearchParams(window.location.search);
const tamu = params.get("tamu") || "Tamu Undangan";
const nomor = params.get("nomor") || "000";

document.getElementById("namaTamu").innerText = tamu;

// COUNTDOWN
const eventDate = new Date("March 28, 2026 13:00:00").getTime();
setInterval(()=>{
const now = new Date().getTime();
const gap = eventDate - now;

const d = Math.floor(gap/(1000*60*60*24));
const h = Math.floor((gap%(1000*60*60*24))/(1000*60*60));
const m = Math.floor((gap%(1000*60*60))/(1000*60));

document.getElementById("countdown").innerHTML =
d+" Hari "+h+" Jam "+m+" Menit Lagi";
},1000);

// QR SYSTEM
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
const qrData = nomor+"|"+tamu+"|"+signature;

const qrURL = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data="+encodeURIComponent(qrData);

document.getElementById("qrImage").src = qrURL;

// GANTI DENGAN URL WEB APP
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
