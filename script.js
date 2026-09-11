const f=document.getElementById("f"),ok=document.getElementById("ok"),idE=document.getElementById("id"),sum=document.getElementById("sum");
let txt="",current={};
const FB_PAGE="https://www.facebook.com/profile.php?id=61594137576222";
const FB_PROFILE="https://www.facebook.com/xxy.wirburus.chud.kuphay";
const codes={"ลูกนาคา (LN)":"LN","นาคาน้อย (NN)":"NN","เสือเดช (SD)":"SD","เสือคม (SC)":"SC","เสือกล้า (SK)":"SK","เสือเงา (SH)":"SH","เสือพิทักษ์ (SP)":"SP","เสือหลวง (SL)":"SL","นาคาธิป (NT)":"NT","ให้ผู้ดูแลพิจารณา":"LN"};
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function getApps(){try{return JSON.parse(localStorage.getItem("pn_applications")||"[]")}catch(e){return[]}}
function saveApps(a){localStorage.setItem("pn_applications",JSON.stringify(a))}
function makeId(rank){let n=+(localStorage.getItem("pn_counter")||0)+1;localStorage.setItem("pn_counter",n);return `PN-26-${codes[rank]||"LN"}-${String(n).padStart(3,"0")}`}

f.onsubmit=e=>{
 e.preventDefault();const d=Object.fromEntries(new FormData(f));const id=makeId(d.rank);
 const rec={id,...d,status:"รอการพิจารณา",submittedAt:new Date().toISOString()};
 const apps=getApps();apps.unshift(rec);saveApps(apps);current=rec;
 idE.textContent=id;
 sum.innerHTML=`<p><b>ชื่อ:</b> ${esc(d.name)}<br><b>ชื่อเล่น:</b> ${esc(d.nickname)}<br><b>จังหวัด:</b> ${esc(d.province)}<br><b>ยศที่สมัคร:</b> ${esc(d.rank)}<br><b>สถานะ:</b> รอการพิจารณา</p>`;
 txt=`ใบสมัครสมาชิก พยัคฆ์นาคา
เลขใบสมัคร: ${id}
ชื่อ: ${d.name}
ชื่อเล่น: ${d.nickname}
ฉายา: ${d.alias||"-"}
อายุ: ${d.age}
จังหวัด: ${d.province}
ช่องทางติดต่อ: ${d.contact}
ยศที่สมัคร: ${d.rank}
เหตุผล: ${d.reason}
สถานะ: รอการพิจารณา

พยัคฆ์นาคา — สัตย์เหนือชีวิต — เกียรติเหนือสิ่งใด`;
 f.hidden=true;ok.hidden=false;
 document.getElementById("fbPersonal").href="https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(location.href);
 document.getElementById("fbPage").href=FB_PAGE;
 scrollTo({top:0,behavior:"smooth"});
};
document.getElementById("copy").onclick=async()=>{try{await navigator.clipboard.writeText(txt);alert("คัดลอกข้อมูลทั้งหมดแล้ว")}catch(e){prompt("คัดลอกข้อความนี้:",txt)}};
document.getElementById("share").onclick=async()=>{try{if(navigator.share)await navigator.share({title:"ใบสมัครสมาชิก พยัคฆ์นาคา",text:txt,url:location.href});else{await navigator.clipboard.writeText(location.href);alert("คัดลอกลิงก์หน้าสมัครแล้ว")}}catch(e){}};
document.getElementById("new").onclick=()=>{ok.hidden=true;f.hidden=false;f.reset();scrollTo({top:0,behavior:"smooth"})};

function renderAdmin(){
 const list=getApps(), box=document.getElementById("applications");document.getElementById("adminCount").textContent=list.length+" ใบสมัคร";
 if(!list.length){box.innerHTML='<div class="empty">ยังไม่มีใบสมัครในเครื่องนี้</div>';return}
 box.innerHTML=list.map((a,i)=>`<article class="app">
 <div class="app-top"><div><small>${esc(a.id)}</small><h3>${esc(a.name)} <span>${esc(a.nickname)}</span></h3></div>
 <select data-i="${i}" class="status"><option ${a.status==="รอการพิจารณา"?"selected":""}>รอการพิจารณา</option><option ${a.status==="อนุมัติ"?"selected":""}>อนุมัติ</option><option ${a.status==="ไม่อนุมัติ"?"selected":""}>ไม่อนุมัติ</option></select></div>
 <div class="detail"><b>ฉายา</b> ${esc(a.alias||"-")}<br><b>อายุ</b> ${esc(a.age)} &nbsp; <b>จังหวัด</b> ${esc(a.province)}<br><b>ติดต่อ</b> ${esc(a.contact)}<br><b>ยศที่สมัคร</b> ${esc(a.rank)}<br><b>เหตุผล</b><div class="reason">${esc(a.reason)}</div><b>ส่งเมื่อ</b> ${new Date(a.submittedAt).toLocaleString("th-TH")}</div>
 <button class="copyApp" data-i="${i}">คัดลอกข้อมูลใบนี้</button></article>`).join("");
 box.querySelectorAll(".status").forEach(s=>s.onchange=()=>{let a=getApps();a[+s.dataset.i].status=s.value;saveApps(a);renderAdmin()});
 box.querySelectorAll(".copyApp").forEach(b=>b.onclick=async()=>{const a=getApps()[+b.dataset.i];const t=Object.entries(a).map(([k,v])=>`${k}: ${v}`).join("\n");try{await navigator.clipboard.writeText(t);alert("คัดลอกแล้ว")}catch(e){prompt("ข้อมูลใบสมัคร",t)}});
}
function initAdmin(){
 document.querySelector("header").hidden=true;document.querySelector("main>form")?.remove();document.querySelector(".motto")?.remove();document.getElementById("adminPage").hidden=false;
 const login=document.getElementById("adminLogin"),panel=document.getElementById("adminPanel");
 if(sessionStorage.getItem("pn_admin")==="1"){login.hidden=true;panel.hidden=false;renderAdmin()}
 document.getElementById("adminLoginBtn").onclick=()=>{
   const u=document.getElementById("adminUser").value,p=document.getElementById("adminPass").value;
   if(u==="admin"&&p==="PNK@admin2569"){sessionStorage.setItem("pn_admin","1");login.hidden=true;panel.hidden=false;renderAdmin()}else alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง")
 };
 document.getElementById("adminLogout").onclick=()=>{sessionStorage.removeItem("pn_admin");location.reload()};
 document.getElementById("clearApps").onclick=()=>{if(confirm("ลบใบสมัครทั้งหมดที่เก็บในเบราว์เซอร์นี้หรือไม่?")){localStorage.removeItem("pn_applications");renderAdmin()}};
}
if(location.pathname.replace(/\/+$/,"").endsWith("/admin")||location.pathname.endsWith("/admin/"))initAdmin();
