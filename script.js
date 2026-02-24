function bukaUndangan(){
document.getElementById("cover").style.display="none";
document.getElementById("content").style.display="block";
document.getElementById("bgMusic").play();
}

// FADE ANIMATION
const observer = new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("show");
}
});
});
document.querySelectorAll(".fade").forEach(el=>observer.observe(el));

// COUNTDOWN
const eventDate = new Date("March 28, 2026 13:00:00").getTime();
setInterval(()=>{
const now = new Date().getTime();
const gap = eventDate - now;
const d = Math.floor(gap/(1000*60*60*24));
const h = Math.floor((gap%(1000*60*60*24))/(1000*60*60));
const m = Math.floor((gap%(1000*60*60))/(1000*60));
document.getElementById("countdown").innerHTML =
d+" Hari "+h+" Jam "+m+" Menit";
},1000);

// QR
const params = new URLSearchParams(window.location.search);
const tamu = params.get("tamu") || "Tamu Undangan";
const nomor = params.get("nomor") || "000";
document.getElementById("namaTamu").innerText = tamu;

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
document.getElementById("qrImage").src =
"https://api.qrserver.com/v1/create-qr-code/?size=200x200&data="+encodeURIComponent(qrData);

const sheetURL="PASTE_WEB_APP_URL_DISINI";
function kirimAbsensi(){
fetch(sheetURL,{
method:"POST",
body:JSON.stringify({nomor,nama:tamu,signature})
})
.then(()=>alert("Absensi berhasil"));
}

function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  const html = `
  <html>
  <head>
  <style>
  body{font-family:Arial;padding:40px;}
  h2{text-align:center;}
  table{width:100%;border-collapse:collapse;margin-top:20px;}
  th,td{border:1px solid #000;padding:8px;text-align:center;}
  </style>
  </head>
  <body>
  <h2>DAFTAR HADIR<br>PELANTIKAN ESELON III & IV</h2>
  <table>
  ${data.map((row,i)=>
    "<tr>"+row.map(col=> i==0?"<th>"+col+"</th>":"<td>"+col+"</td>").join("")+"</tr>"
  ).join("")}
  </table>
  </body>
  </html>
  `;
  
  return HtmlService.createHtmlOutput(html);
}
