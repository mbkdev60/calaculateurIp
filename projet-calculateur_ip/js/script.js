/**
 * Cette fonction convertit une chaine de caratères représentant un nombre décimal en nombre binaire 1 ou 0.
 * @param {Number} num - nombre décimal à convertir
 * @returns {String} - Valeur binaire du résultat de la convertion
 */
// Check IP address
export function validIp(q1, q2, q3, q4) {
  if (
    q1 >= 0 &&
    q1 <= 255 &&
    q2 >= 0 &&
    q2 <= 255 &&
    q3 >= 0 &&
    q3 <= 255 &&
    q4 >= 0 &&
    q4 <= 255
  ) {
    let q = q1 + "." + q2 + "." + q3 + "." + q4;
    return q;
  }
}

// Check Mask address
export function validMask(m1, m2, m3, m4) {
  if (
    m1 >= 0 &&
    m1 <= 255 &&
    m2 >= 0 &&
    m2 <= 255 &&
    m3 >= 0 &&
    m3 <= 255 &&
    m4 >= 0 &&
    m4 <= 255
  ) {
    let m = m1 + "." + m2 + "." + m3 + "." + m4;
    return m;
  }
}

// Standard Class
export function classIp(q1) {
  let standardClass = "";
  if (q1 <= 126) {
    standardClass = "A";
  } else if (q1 == 127) {
    standardClass = "loopback IP";
  } else if (q1 >= 128 && q1 <= 191) {
    standardClass = "B";
  } else if (q1 >= 192 && q1 <= 223) {
    standardClass = "C";
  } else if (q1 >= 224 && q1 <= 239) {
    standardClass = "D (Multicast Address)";
  } else if (q1 >= 240 && q1 <= 225) {
    standardClass = "E (Experimental)";
  } else {
    standardClass = "Out of range";
  }
  return standardClass;
}

// Convertir dec en bin
export function dec2Bin(ipAddress) {
  let ipArr = ipAddress.split(".");
  let binaryIP = [];
  for (let i = 0; i < ipArr.length; i++) {
    let binaryNo = parseInt(ipArr[i]).toString(2);
    if (binaryNo.length == 8) {
      binaryIP.push(binaryNo);
    } else {
      let diffNo = 8 - binaryNo.length;
      let createBinary = "";
      for (let j = 0; j < diffNo; j++) {
        createBinary += "0";
      }
      createBinary += binaryNo;
      binaryIP.push(createBinary);
    }
  }
  return binaryIP.join(".");
}

// Convertir bin en dec
export function bin2Dec(binIPArr) {
  let binArr = binIPArr.split(".");
  let broadcastIP = [];
  for (let i = 0; i < binArr.length; i++) {
    broadcastIP.push(parseInt(parseInt(binArr[i]), 2));
  }
  return broadcastIP.join(".");
}

// Bitwise AND
export function bitwiseAND(firstBinary, secondBinary) {
  let firstArr = [];
  let secondArr = [];
  firstArr = firstBinary;
  secondArr = secondBinary;
  let newAdded = "";
  for (let i = 0; i < firstArr.length; i++) {
    if (firstArr[i] + "+" + secondArr[i] == "1+0") {
      newAdded += "0";
    } else if (firstArr[i] + "+" + secondArr[i] == "0+1") {
      newAdded += "0";
    } else if (firstArr[i] + "+" + secondArr[i] == "1+1") {
      newAdded += "1";
    } else if (firstArr[i] + "+" + secondArr[i] == "0+0") {
      newAdded += "0";
    }
  }
  return newAdded;
}

// Bitwise OR
export function bitwiseOR(firstBinary, secondBinary) {
  let firstArr = [];
  let secondArr = [];
  firstArr = firstBinary;
  secondArr = secondBinary;
  let newAdded = "";
  for (let i = 0; i < firstArr.length; i++) {
    if (firstArr[i] + "+" + secondArr[i] == "1+0") {
      newAdded += "1";
    } else if (firstArr[i] + "+" + secondArr[i] == "0+1") {
      newAdded += "1";
    } else if (firstArr[i] + "+" + secondArr[i] == "1+1") {
      newAdded += "1";
    } else if (firstArr[i] + "+" + secondArr[i] == "0+0") {
      newAdded += "0";
    }
  }
  return newAdded;
}

// inverted Binary
export function invertedBinary(number) {
  let no = number + "";
  let noArr = no.split("");
  let newNo = "";
  for (let i = 0; i < noArr.length; i++) {
    if (noArr[i] == "0") {
      newNo += "1";
    } else {
      newNo += "0";
    }
  }
  return newNo;
}

// Net Address
export function calcNetAddressIP(ipAddress, maskIP) {
  let binaryIP = ipAddress.split(".");
  let binaryMask = maskIP.split(".");
  let binaryNetWork = [];
  for (let j = 0; j < binaryMask.length; j++) {
    binaryNetWork.push(bitwiseAND(binaryIP[j], binaryMask[j]));
  }

  let binaryNetWorkStr = binaryNetWork.join(".");
  let NetIPStr = "";
  for (let k = 0; k < binaryNetWorkStr.length; k++) {
    NetIPStr += binaryNetWorkStr[k];
  }
  return NetIPStr;
}

// Broadcast address
export function calculateBroadcastIP(ipAddress, maskIP) {
  let binaryIP = ipAddress.split(".");
  let binaryMask = maskIP.split(".");
  let invertedMark = [];
  for (let i = 0; i < binaryMask.length; i++) {
    invertedMark.push(invertedBinary(binaryMask[i]));
  }

  let binaryBroadcast = [];
  for (let j = 0; j < binaryMask.length; j++) {
    binaryBroadcast.push(bitwiseOR(binaryIP[j], invertedMark[j]));
  }

  let broadcastIPJoin = binaryBroadcast.join(".");

  let broadcastIPStr = "";
  for (let k = 0; k < broadcastIPJoin.length; k++) {
    broadcastIPStr += broadcastIPJoin[k];
  }
  return broadcastIPStr;
}

// First Address
export function firstAdd(netAdd) {
  let netAddBin = dec2Bin(netAdd).split(".");
  let netAddNbr = Number(netAddBin[3]);
  netAddNbr += 1;
  let netAddStr = netAddNbr.toString();
  netAddBin.splice(3, 1, netAddStr);
  let netAddIP = bin2Dec(netAddBin.join("."));
  return netAddIP;
}

// Last Address
export function lastAdd(broadCast) {
  let broadCastBin = dec2Bin(broadCast).split(".");
  let broadCastNbr = Number(broadCastBin[3]);
  broadCastNbr -= 1;
  let broadCastStr = broadCastNbr.toString();
  broadCastBin.splice(3, 1, broadCastStr);
  let broadCastIP = bin2Dec(broadCastBin.join("."));
  return broadCastIP;
}

// host nb

export function nbBitMask(binaryMask) {
  let bitArr = binaryMask.replaceAll(".", "").split("");
  // console.log(bitArr);
  return bitArr.indexOf("0");
}

export function hostNb(binaryMask) {
  let nbBitHost = 32 - nbBitMask(binaryMask);
  // console.log(nbBitHost);
  // console.log(Math.pow(2, nbBitHost) - 2);
  return Math.pow(2, nbBitHost) - 2;
}

export function colMask(binaryMask) {
  let colArr = [];
  for (let i = 0; i < binaryMask.length; i++) {
    if (binaryMask[i] === "0") {
      colArr.push("green");
    } else if (binaryMask[i] === "1") {
      colArr.push("red");
    } else {
      colArr.push("black");
    }
  }
  return colArr;
}
