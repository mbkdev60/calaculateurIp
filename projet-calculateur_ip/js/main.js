import * as Calculator from "./script.js";

document.querySelector("#calc-btn").addEventListener("click", () => {
  const resultDiv = document.querySelector(".result");
  resultDiv.classList.remove("hidden");

  //get values from input box
  let q1 = document.getElementById("q1").valueAsNumber;
  let q2 = document.getElementById("q2").valueAsNumber;
  let q3 = document.getElementById("q3").valueAsNumber;
  let q4 = document.getElementById("q4").valueAsNumber;
  let resIP = document.getElementById("resIP");
  resIP.innerHTML = Calculator.validIp(q1, q2, q3, q4);
  let m1 = document.getElementById("m1").valueAsNumber;
  let m2 = document.getElementById("m2").valueAsNumber;
  let m3 = document.getElementById("m3").valueAsNumber;
  let m4 = document.getElementById("m4").valueAsNumber;
  let resMask = document.getElementById("resMask");
  resMask.innerHTML = Calculator.validMask(m1, m2, m3, m4);

  let resBinIP = document.getElementById("resBinIP");
  let ipAdd = [q1, q2, q3, q4];
  let resIPAdd = ipAdd.join(".");
  resBinIP.innerHTML = Calculator.dec2Bin(resIPAdd);

  let resBinMask = document.getElementById("resBinMask");
  let maskAdd = [m1, m2, m3, m4];
  let maskIPAdd = maskAdd.join(".");

  // Couleur Mask vert et rouge
  let binMask = Calculator.dec2Bin(maskIPAdd);
  let tabCol = Calculator.colMask(binMask);
  for (let i = 0; i < tabCol.length; i++) {
    let span = document.createElement("span");
    resBinMask.appendChild(span);
    span.innerHTML = binMask[i];
    span.style.color = tabCol[i];
  }
  let resClass = document.getElementById("resClass");
  resClass.innerHTML = Calculator.classIp(q1);

  // Calcul resBinNet
  let resBinNet = document.getElementById("resBinNet");
  let resNet = document.getElementById("resNet");
  let calcNetBin = Calculator.calcNetAddressIP(
    Calculator.dec2Bin(resIPAdd),
    Calculator.dec2Bin(maskIPAdd)
  );

  resBinNet.innerHTML = calcNetBin;
  resNet.innerHTML = Calculator.bin2Dec(calcNetBin);

  // Calcul resBinBC
  let resBinBC = document.getElementById("resBinBC");
  let resBC = document.getElementById("resBC");
  let calcBCBin = Calculator.calculateBroadcastIP(
    Calculator.dec2Bin(resIPAdd),
    Calculator.dec2Bin(maskIPAdd)
  );

  resBinBC.innerHTML = calcBCBin;
  resBC.innerHTML = Calculator.bin2Dec(calcBCBin);

  // Calcul first Address et first Address Binary
  let firstAddrr = document.getElementById("firstAdd");
  firstAddrr.style.color = "green";
  let firstAddrrBin = document.getElementById("firstAddBin");
  let calcFirstAdd = Calculator.firstAdd(Calculator.bin2Dec(calcNetBin));
  firstAddrr.innerHTML = calcFirstAdd;
  firstAddrrBin.innerHTML = Calculator.dec2Bin(calcFirstAdd);

  // Calcul last Address et last Address Binary
  let lastAddrr = document.getElementById("lastAdd");
  lastAddrr.style.color = "blue";
  let lastAddrrBin = document.getElementById("lastAddBin");
  let calcLastAdd = Calculator.lastAdd(Calculator.bin2Dec(calcBCBin));
  lastAddrr.innerHTML = calcLastAdd;
  lastAddrrBin.innerHTML = Calculator.dec2Bin(calcLastAdd);

  // Calcul de machines max
  let hostNum = document.getElementById("hostNum");
  hostNum.innerHTML = Calculator.hostNb(Calculator.dec2Bin(maskIPAdd));
  hostNum.style.color = "red";
});
