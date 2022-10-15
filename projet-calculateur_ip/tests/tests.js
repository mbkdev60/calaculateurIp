import * as Calculator from "../js/script.js";

QUnit.module("module calc ip");

// dec2Bin

QUnit.test("Tests d'équalités dec2Bin()", (assert) => {
  function dec2BinEqual(then, expected, msg) {
    assert.equal(Calculator.dec2Bin(then), expected, msg);
  }

  // Tests
  dec2BinEqual("172.22.22.2", "10101100.00010110.00010110.00000010");
  dec2BinEqual("130.45.34.36", "10000010.00101101.00100010.00100100");
  dec2BinEqual("255.255.240.0", "11111111.11111111.11110000.00000000");
});

QUnit.test("Tests les erreurs lancées par dec2Bin()", (assert) => {
  function dec2BinError(then, msg) {
    assert.throws(() => Calculator.dec2Bin(then), msg);
  }

  // Tests
  dec2BinError(-2, "Nombre négatif: génère une erreur standard");
  dec2BinError(null, "null: génère une erreur standard");
  dec2BinError(undefined, "undefined: génère une erreur standard");
});

// bin2Dec

QUnit.test("Tests d'équalités bin2Dec()", (assert) => {
  function bin2DecEqual(then, expected, msg) {
    assert.equal(Calculator.bin2Dec(then), expected, msg);
  }

  // Tests
  bin2DecEqual("10101100", "172");
  bin2DecEqual("11001001", "201");
  bin2DecEqual("1010", "10");
  bin2DecEqual("0101", "5");
});
QUnit.test("Tests les erreurs lancées par bin2Dec()", (assert) => {
  function bin2DecError(then, msg) {
    assert.throws(() => Calculator.bin2DecError(then), msg);
  }

  // Tests
  bin2DecError(25, "Nombre non binaire: génère une erreur standard");
  bin2DecError(null, "null: génère une erreur standard");
  bin2DecError(undefined, "undefined: génère une erreur standard");
});

// validIp

QUnit.test("Tests d'équalités validIp()", (assert) => {
  function validIpEqual(v1, v2, v3, v4, expected) {
    assert.equal(Calculator.validIp(v1, v2, v3, v4), expected);
  }

  // Tests
  validIpEqual("130", "45", "34", "36", "130.45.34.36");
  validIpEqual("172", "22", "22", "51", "172.22.22.51");
});

// validMask

QUnit.test("Tests d'équalités validMask()", (assert) => {
  function validMaskEqual(v1, v2, v3, v4, expected) {
    assert.equal(Calculator.validMask(v1, v2, v3, v4), expected);
  }

  // Tests
  validMaskEqual("255", "255", "255", "0", "255.255.255.0");
  validMaskEqual("255", "255", "240", "0", "255.255.240.0");
});

// classIp

QUnit.test("Tests d'équlaités classIp()", (assert) => {
  function classIpEqual(v, expected) {
    assert.equal(Calculator.classIp(v), expected);
  }

  // Tests
  classIpEqual("98", "A");
  classIpEqual("127", "loopback IP");
  classIpEqual("145", "B");
  classIpEqual("221", "C");
});

// firstAdd

QUnit.test("Tests d'équlaités firstAdd()", (assert) => {
  function firstAddEqual(add, expected) {
    assert.equal(Calculator.firstAdd(add), expected);
  } // param add = net address

  // Tests
  firstAddEqual("130.45.32.0", "130.45.32.1");
  firstAddEqual("192.28.23.0", "192.28.23.1");
  firstAddEqual("221.56.96.0", "221.56.96.1");
});

// lastAdd

QUnit.test("Tests d'équlaités lastAdd()", (assert) => {
  function lastAddEqual(add, expected) {
    assert.equal(Calculator.lastAdd(add), expected);
  } // param add = broadcast address

  // Tests
  lastAddEqual("130.45.32.255", "130.45.32.254");
  lastAddEqual("221.56.111.255", "221.56.111.254");
  lastAddEqual("182.25.31.255", "182.25.31.254");
});

// calculateBroadcastIP

QUnit.test("Tests d'équlaités calculateBroadcastIP()", (assert) => {
  function calculateBroadcastIPEqual(ipAdd, ipMask, expected) {
    assert.equal(Calculator.calculateBroadcastIP(ipAdd, ipMask), expected);
  }

  // Tests
  calculateBroadcastIPEqual(
    "10101100.00010110.00010110.00110011",
    "11111111.11111111.00000000.00000000",
    "10101100.00010110.11111111.11111111"
  );
  calculateBroadcastIPEqual(
    "10000010.00101101.00100010.00100100",
    "11111111.11111111.11110000.00000000",
    "10000010.00101101.00101111.11111111"
  );
});

// calcNetAddressIP = calcul adresse réseau

QUnit.test("Tests d'équlaités calcNetAddressIP()", (assert) => {
  function calcNetAddressIPEqual(ipAdd, ipMask, expected) {
    assert.equal(Calculator.calcNetAddressIP(ipAdd, ipMask), expected);
  }

  // Tests
  calcNetAddressIPEqual(
    "10101100.00010110.00010110.00110011",
    "11111111.11111111.00000000.00000000",
    "10101100.00010110.00000000.00000000"
  );
  calcNetAddressIPEqual(
    "10000010.00101101.00100010.00100100",
    "11111111.11111111.11110000.00000000",
    "10000010.00101101.00100000.00000000"
  );
});

// hostNb = nombre de machines maximales

QUnit.test("Tests d'équlaités hostNb()", (assert) => {
  function hostNbEqual(add, expected) {
    assert.equal(Calculator.hostNb(add), expected);
  } // param add = binary mask

  // Tests
  hostNbEqual("11111111.11111000.00000000.00000000", "524286");
  hostNbEqual("11111111.11111111.00000000.00000000", "65534");
  hostNbEqual("11111111.11111111.11111111.00000000", "254");
});
