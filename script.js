/* =========================================
   พยัคฆ์นาคา
   ระบบสมัครสมาชิก
========================================= */


/* =========================================
   ข้อมูลยศ
========================================= */

const ranks = [

  {
    no: "01",
    code: "CP",
    name: "เจ้าพยัคฆ์",
    meaning: "ผู้นำสูงสุดของเหล่าพยัคฆ์"
  },

  {
    no: "02",
    code: "NT",
    name: "นาคาธิป",
    meaning: "ผู้ดูแลและรองจากเจ้าพยัคฆ์"
  },

  {
    no: "03",
    code: "SL",
    name: "เสือหลวง",
    meaning: "ผู้นำระดับหน่วย"
  },

  {
    no: "04",
    code: "SP",
    name: "เสือพิทักษ์",
    meaning: "ผู้ทำหน้าที่ดูแลและคุ้มครองสมาชิก"
  },

  {
    no: "05",
    code: "SH",
    name: "เสือเงา",
    meaning: "สมาชิกอาวุโสและผู้ได้รับความไว้วางใจ"
  },

  {
    no: "06",
    code: "SK",
    name: "เสือกล้า",
    meaning: "สมาชิกเต็มตัวของเหล่าพยัคฆ์"
  },

  {
    no: "07",
    code: "SC",
    name: "เสือคม",
    meaning: "สมาชิกที่มีประสบการณ์และความสามารถ"
  },

  {
    no: "08",
    code: "SD",
    name: "เสือเดช",
    meaning: "ผู้มีความรับผิดชอบและความเด็ดเดี่ยว"
  },

  {
    no: "09",
    code: "NN",
    name: "นาคาน้อย",
    meaning: "สมาชิกระดับเริ่มต้นที่กำลังเรียนรู้"
  },

  {
    no: "10",
    code: "LN",
    name: "ลูกนาคา",
    meaning: "สมาชิกใหม่ของเหล่าพยัคฆ์"
  }

];


/* =========================================
   แสดงยศ
========================================= */

const rankList = document.getElementById("rankList");

if (rankList) {

  rankList.innerHTML = ranks.map(rank => {

    return `

      <div class="rank-card">

        <div class="rank-number">
          ${rank.no}
        </div>

        <h3>
          ${rank.name}
        </h3>

        <div class="rank-code">
          CODE: ${rank.code}
        </div>

        <p>
          ${rank.meaning}
        </p>

      </div>

    `;

  }).join("");

}


/* =========================================
   เมนูมือถือ
========================================= */

function toggleMenu() {

  const navigation =
    document.getElementById("navigation");

  navigation.classList.toggle("show");

}


/* =========================================
   สร้างเลขใบสมัคร
========================================= */

function generateApplicationId() {

  const year =
    new Date().getFullYear().toString().slice(-2);

  const random =
    Math.floor(
      100000 + Math.random() * 900000
    );

  return `PN-${year}-${random}`;

}


/* =========================================
   เก็บข้อมูลใบสมัคร
========================================= */

let currentApplication = null;


/* =========================================
   Submit Form
========================================= */

const form =
  document.getElementById("applicationForm");


if (form) {

  form.addEventListener("submit", function(event) {

    event.preventDefault();


    const applicationId =
      generateApplicationId();


    const application = {

      id: applicationId,

      fullName:
        document.getElementById("fullName").value.trim(),

      nickname:
        document.getElementById("nickname").value.trim(),

      alias:
        document.getElementById("alias").value.trim(),

      age:
        document.getElementById("age").value,

      province:
        document.getElementById("province").value.trim(),

      contact:
        document.getElementById("contact").value.trim(),

      reason:
        document.getElementById("reason").value.trim(),

      desiredRank:
        document.getElementById("desiredRank").value,

      date:
        new Date().toLocaleString("th-TH"),

      status:
        "รอการพิจารณา"

    };


    currentApplication = application;


    /* บันทึกในเครื่อง */

    saveApplication(application);


    /* แสดงผล */

    showSuccess(application);

  });

}


/* =========================================
   บันทึก LocalStorage
========================================= */

function saveApplication(application) {

  let applications =
    JSON.parse(
      localStorage.getItem("phayak_naka_applications")
    ) || [];


  applications.push(application);


  localStorage.setItem(
    "phayak_naka_applications",
    JSON.stringify(applications)
  );

}


/* =========================================
   แสดงหน้าสมัครสำเร็จ
========================================= */

function showSuccess(application) {

  form.classList.add("hidden");


  const successBox =
    document.getElementById("successBox");

  successBox.classList.remove("hidden");


  document.getElementById("applicationId")
    .textContent =
      application.id;


  const summary =
    document.getElementById("summary");


  summary.innerHTML = `

    <div class="summary-row">
      <span>ชื่อ</span>
      <strong>
        ${escapeHTML(application.fullName)}
      </strong>
    </div>

    <div class="summary-row">
      <span>ชื่อเล่น</span>
      <strong>
        ${escapeHTML(application.nickname)}
      </strong>
    </div>

    <div class="summary-row">
      <span>ฉายา</span>
      <strong>
        ${escapeHTML(application.alias || "-")}
      </strong>
    </div>

    <div class="summary-row">
      <span>อายุ</span>
      <strong>
        ${escapeHTML(application.age)}
      </strong>
    </div>

    <div class="summary-row">
      <span>จังหวัด</span>
      <strong>
        ${escapeHTML(application.province)}
      </strong>
    </div>

    <div class="summary-row">
      <span>ยศที่สมัคร</span>
      <strong>
        ${escapeHTML(application.desiredRank)}
      </strong>
    </div>

    <div class="summary-row">
      <span>สถานะ</span>
      <strong>
        ${application.status}
      </strong>
    </div>

    <div class="summary-row">
      <span>วันที่สมัคร</span>
      <strong>
        ${application.date}
      </strong>
    </div>

  `;


  successBox.scrollIntoView({
    behavior: "smooth"
  });

}


/* =========================================
   คัดลอกใบสมัคร
========================================= */

function copyApplication() {

  if (!currentApplication) {
    return;
  }


  const a =
    currentApplication;


  const text = `

พยัคฆ์นาคา
ใบสมัครสมาชิก

เลขที่ใบสมัคร: ${a.id}

ชื่อ: ${a.fullName}
ชื่อเล่น: ${a.nickname}
ฉายา: ${a.alias || "-"}
อายุ: ${a.age}
จังหวัด: ${a.province}
ช่องทางติดต่อ: ${a.contact || "-"}

ยศที่สมัคร: ${a.desiredRank}

เหตุผล:
${a.reason}

สถานะ: ${a.status}
วันที่สมัคร: ${a.date}

“สัตย์เหนือชีวิต — เกียรติเหนือสิ่งใด”

  `.trim();


  navigator.clipboard.writeText(text)
    .then(() => {

      alert(
        "คัดลอกข้อมูลใบสมัครเรียบร้อยแล้ว"
      );

    })
    .catch(() => {

      prompt(
        "คัดลอกข้อความด้านล่าง",
        text
      );

    });

}


/* =========================================
   แชร์ Facebook
========================================= */

function shareFacebook() {

  if (!currentApplication) {
    return;
  }


  const text =
    encodeURIComponent(
      `สมัครสมาชิกพยัคฆ์นาคา เลขที่ ${currentApplication.id}`
    );


  const url =
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}&quote=${text}`;


  window.open(
    url,
    "_blank",
    "width=700,height=500"
  );

}


/* =========================================
   ส่งให้เพจ
========================================= */

function sharePage() {

  const page =
    "https://www.facebook.com/profile.php?id=61594137576222";


  window.open(
    page,
    "_blank"
  );

}


/* =========================================
   Web Share
========================================= */

function shareApplication() {

  if (!currentApplication) {
    return;
  }


  const text =
    `พยัคฆ์นาคา — ใบสมัครสมาชิก ${currentApplication.id}`;


  if (navigator.share) {

    navigator.share({

      title:
        "พยัคฆ์นาคา",

      text:
        text,

      url:
        location.href

    });

  } else {

    copyApplication();

  }

}


/* =========================================
   สมัครใหม่
========================================= */

function newApplication() {

  currentApplication = null;

  form.reset();

  form.classList.remove("hidden");

  document
    .getElementById("successBox")
    .classList.add("hidden");


  document
    .getElementById("apply")
    .scrollIntoView({
      behavior: "smooth"
    });

}


/* =========================================
   ป้องกัน HTML Injection
========================================= */

function escapeHTML(value) {

  if (!value) {
    return "";
  }


  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}
