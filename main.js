let inputMony = document.getElementById("money");
let btns = document.querySelectorAll(".btns button");
let inputCustom = document.querySelector(".btns input");
let inputPeople = document.querySelector(".people input");
let alertElement = document.querySelector("#alert");
let amount = document.getElementById("amount");
let total = document.getElementById("total");
let btnReset = document.getElementById("reset");

// ***********************************************************
// عند ادخال قيمه في انبوت (عددالافراد) سيتفاعل زر (ريسيت)
inputPeople.addEventListener("input", reset);

// ***********************************************************

// هذا الحدث يعمل عندما يكون به قيمه  واذا كان فارغا فلن يعمل
inputMony.addEventListener("input", function () {
  btn();
  custom();
  // الدالة الخاصه بتفاعل الزر
  reset();
  // سيقوم بأرجاع الوضع الافتراضي للقيم عند ادخال قيمه نقود جديدة
  inputCustom.value = "";
  inputPeople.value = "";
  amount.innerHTML = (0).toFixed(2);
  total.innerHTML = (0).toFixed(2);
  btns.forEach((el) => {
    el.classList.remove("btn-1");
    el.classList.remove("btn-focus");
    el.classList.remove("click");
  });
  alertElement.style.display = "none";
  inputPeople.style.cssText = "border:2px solid transparent";
});

// ***********************************************************

// هذا الحدث يعمل عندما يكون به قيمه  واذا كان فارغا فلن يعمل
inputCustom.addEventListener("input", function () {
  custom();
  // الدالة الخاصه بتفاعل الزر
  reset();
  // تم وضع هذا الشرط بحيث لا تظهر رسالة التحذير اذا كان الانبوت الخاص ب (النسية المئوية) فارغ
  if (inputCustom.value === "") {
    alertElement.style.display = "none";
    inputPeople.style.cssText = "border:2px solid transparent";
  } else {
    inputPeople.style.cssText = "border:2px solid red";
    alertElement.style.cssText = "display:flex;color:red";
  }
});

// ***********************************************************

function custom() {
  inputCustom.addEventListener("input", function () {
    // سيتم حذف الكلاسات التي اعطيتها ل btns
    btns.forEach((el) => {
      el.classList.remove("btn-1");
      el.classList.remove("btn-focus");
      el.classList.remove("click");
      if (inputCustom.value === "") el.classList.remove("click");
    });

    //  جعلت الانبوت الخاص ب (عدد الاشخاص) يكون القيمه فارغة عند ادخال اي قيمه جديده في الانبوت الخاص ب (النسية المئوية)
    inputPeople.value = "";
    // الدالة الخاصه بتفاعل الزر
    reset();
    //
    value();
    //   هذا الحدث يعمل اذا كان الانبوت الخاص ب (عدد الاشخاص) به قيمه
    inputPeople.onkeyup = function () {
      // هذا الشرط يعمل اذا كان الانبوت الخاص ب (النسية المئوية) به قيمه
      if (inputCustom.value !== "") {
        //   عندها سيتم ادخال قيمه في هذه الدالة التي تعمل على جمع القيم
        value(inputCustom.value);
      }
    };
    // تم عمل هذا الشرط حتى لا تظهر رسالة التحذير
    if (inputCustom.value === "") {
      alertElement.style.display = "none";
      inputPeople.style.cssText = "border:2px solid transparent";
    }
  });
}

// ***********************************************************
//
function btn() {
  // الدالة الخاصه بتفاعل الزر
  reset();
  // الازرار المئوية موجودة في مصفوفه
  btns.forEach((el) => {
    //   عند الضغط على اي من الازرار
    el.addEventListener("click", function (e) {
      btns.forEach((el) => {
        // قمت باضافة كلاسات ليسهل التعامل والحذف والتبديل وغيره
        el.classList.add("btn-1");
        el.classList.remove("btn-focus");
        el.classList.add("click");
      });
      e.target.classList.replace("btn-1", "btn-focus");
      inputCustom.value = "";
      inputPeople.value = "";
      if (el.classList.contains("btn-focus")) value();
      reset();
      let percent = +e.target.value;
      btnReset.addEventListener("click", function () {
        percent = 0;
      });
      // هذا الحدث يعمل عند ادخال قيمه في الانبوت الخاص ب عدد الاشخاص
      inputPeople.onkeyup = function () {
        //   هذا الشرط يعمل عندما يكون الزر به هذا الكلاس
        if (el.classList.contains("click")) {
          value(percent);
        }
      };
    });
  });
}
btn();

// ***********************************************************
// هذه الدالة تعمل على جمع القيم
function value(e) {
  // هذا المتغير مربوط بقيمتين
  // القيمه الاولى هي الانبوت الخاص ب (النسبة المئوية)
  // القيمه الثانية هي الازرار المئوية
  let percent = e;
  // هذا الشرط يعمل عندما تكون قيمه الانبوت الخاص ب (عدد الاشخاص فارغ)
  if (inputPeople.value === "" || inputPeople.value.slice(0, 1) === "0") {
    inputPeople.style.cssText = "border:2px solid red";
    alertElement.style.cssText = "display:flex;color:red";
    amount.innerHTML = (0).toFixed(2);
    total.innerHTML = (0).toFixed(2);
  } else {
    inputPeople.style.cssText = "border:2px solid #58a89d";
    alertElement.style.cssText = "display:none;";
    amount.innerHTML = (
      (+inputMony.value * percent) /
      100 /
      +inputPeople.value
    ).toFixed(2);
    total.innerHTML = (
      +inputMony.value / +inputPeople.value +
      +amount.innerHTML
    ).toFixed(2);
  }
}

// ***********************************************************
// الدالة الخاصة ب زر الحذف وارجاع الوضع الافتراضي للقيم وجعل الزر يتفاعل
function reset() {
  btns.forEach((el) => {
    if (
      el.classList.contains("click") ||
      inputMony.value !== "" ||
      inputCustom.value !== "" ||
      inputPeople.value !== ""
    ) {
      btnReset.classList.replace("reset", "reset-2");
      btnReset.addEventListener("click", function () {
        btns.forEach((el) => {
          el.classList.remove("btn-1");
          el.classList.remove("btn-focus");
          el.classList.remove("click");
        });
        inputPeople.style.cssText = "";
        alertElement.style.cssText = "display:none;";
        inputMony.value = "";
        inputCustom.value = "";
        inputPeople.value = "";
        amount.innerHTML = (0).toFixed(2);
        total.innerHTML = (0).toFixed(2);
        btnReset.classList.replace("reset-2", "reset");
      });
    } else {
      // اذا لم يكن هناك قيم فلن يتفاعل الزر
      btnReset.classList.replace("reset-2", "reset");
    }
  });
}

// ***********************************************************
