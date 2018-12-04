var webSocket = new WebSocket('wss://127.0.0.1:13579/');
var heartbeat_msg = '--heartbeat--';
var heartbeat_interval = null;
var missed_heartbeats = 0;
var missed_heartbeats_limit_min = 3;
var missed_heartbeats_limit_max = 50;
var missed_heartbeats_limit = missed_heartbeats_limit_min;
var callback = null;
//var rw = null;


function setMissedHeartbeatsLimitToMax() {
    missed_heartbeats_limit = missed_heartbeats_limit_max;
}

function setMissedHeartbeatsLimitToMin() {
    missed_heartbeats_limit = missed_heartbeats_limit_min;
}

function blockScreen() {
    $.blockUI({
        message: '<img src="js/loading.gif" /><br/>Подождите, идет загрузка Java-апплета...',
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff'
        }
    });
}

function openDialog() {
    if (confirm("Ошибка при подключений к прослойке. Убедитесь что программа запущена и нажмите ОК") === true) {
        location.reload();
    }
}

function unBlockScreen() {
    $.unblockUI();
}

webSocket.onopen = function (event) {
    if (heartbeat_interval === null) {
        missed_heartbeats = 0;
        heartbeat_interval = setInterval(pingLayer, 2000);
    }
    console.log("Connection opened");
};

webSocket.onclose = function (event) {
    if (event.wasClean) {
        console.log('connection has been closed');
    } else {
        console.log('Connection error');
        openDialog();
    }
    console.log('Code: ' + event.code + ' Reason: ' + event.reason);
};


webSocket.onmessage = function (event) {
    if (event.data === heartbeat_msg) {
        missed_heartbeats = 0;
        return;
    }

    var result = JSON.parse(event.data);

	if (result != null) {
		var rw = {
			result: result['result'],
			secondResult: result['secondResult'],
			errorCode: result['errorCode'],
			getResult: function () {
				return this.result;
			},
			getSecondResult: function () {
				return this.secondResult;
			},
			getErrorCode: function () {
				return this.errorCode;
			}
        };
		window[callback](rw);
	}
	console.log(event);
    setMissedHeartbeatsLimitToMin();
};

function pingLayer() {
    console.log("pinging...");
    try {
        missed_heartbeats++;
        if (missed_heartbeats >= missed_heartbeats_limit)
            throw new Error("Too many missed heartbeats.");
        webSocket.send(heartbeat_msg);
    } catch (e) {
        clearInterval(heartbeat_interval);
        heartbeat_interval = null;
        console.warn("Closing connection. Reason: " + e.message);
        webSocket.close();
    }
}

function browseKeyStore(storageName, fileExtension, currentDirectory, callBack) {
    var browseKeyStore = {
        "method": "browseKeyStore",
        "args": [storageName, fileExtension, currentDirectory]
    };
    callback = callBack;
    //TODO: CHECK CONNECTION
    setMissedHeartbeatsLimitToMax();
    webSocket.send(JSON.stringify(browseKeyStore));
}

function checkNCAVersion(callBack) {
    var checkNCAVersion = {
        "method": "browseKeyStore",
        "args": [storageName, fileExtension, currentDirectory]
    };
    callback = callBack;
    //TODO: CHECK CONNECTION
    setMissedHeartbeatsLimitToMax();
    webSocket.send(JSON.stringify(checkNCAVersion));
}


function loadSlotList(storageName, callBack) {
    var loadSlotList = {
        "method": "loadSlotList",
        "args": [storageName]
    };
    callback = callBack;
    setMissedHeartbeatsLimitToMax();
    webSocket.send(JSON.stringify(tryCount));
}

function showFileChooser(fileExtension, currentDirectory, callBack) {
    var showFileChooser = {
        "method": "showFileChooser",
        "args": [fileExtension, currentDirectory]
    };
    callback = callBack;
    setMissedHeartbeatsLimitToMax();
    webSocket.send(JSON.stringify(showFileChooser));
}

function getKeys(storageName, storagePath, password, type, callBack) {
    var getKeys = {
        "method": "getKeys",
        "args": [storageName, storagePath, password, type]
    };
    callback = callBack;
    setMissedHeartbeatsLimitToMax();
    webSocket.send(JSON.stringify(getKeys));
}

function getNotAfter(storageName, storagePath, alias, password, callBack) {
    var getNotAfter = {
        "method": "getNotAfter",
        "args": [storageName, storagePath, alias, password]
    };
    callback = callBack;
    setMissedHeartbeatsLimitToMax();
    webSocket.send(JSON.stringify(getNotAfter));
}

function setLocale(lang) {
    var setLocale = {
        "method": "setLocale",
        "args": [lang]
    };
    setMissedHeartbeatsLimitToMax();
    webSocket.send(JSON.stringify(setLocale));
}
function getNotBefore(storageName, storagePath, alias, password, callBack) {
    var getNotBefore = {
        "method": "getNotBefore",
        "args": [storageName, storagePath, alias, password]
    };
    callback = callBack;
    setMissedHeartbeatsLimitToMax();
    webSocket.send(JSON.stringify(getNotBefore));
}

function getSubjectDN(storageName, storagePath, alias, password, callBack) {
    var getSubjectDN = {
        "method": "getSubjectDN",
        "args": [storageName, storagePath, alias, password]
    };
    callback = callBack;
    setMissedHeartbeatsLimitToMax();
    webSocket.send(JSON.stringify(getSubjectDN));
}

function getIssuerDN(storageName, storagePath, alias, password, callBack) {
    var getIssuerDN = {
        "method": "getIssuerDN",
        "args": [storageName, storagePath, alias, password]
    };
    callback = callBack;
    setMissedHeartbeatsLimitToMax();
    webSocket.send(JSON.stringify(getIssuerDN));
}

function getRdnByOid(storageName, storagePath, alias, password, oid, oidIndex, callBack) {
    var getRdnByOid = {
        "method": "getRdnByOid",
        "args": [storageName, storagePath, alias, password, oid, oidIndex]
    };
    callback = callBack;
    setMissedHeartbeatsLimitToMax();
    webSocket.send(JSON.stringify(getRdnByOid));
}

function signPlainData(storageName, storagePath, alias, password, dataToSign, callBack) {
    var signPlainData = {
        "method": "signPlainData",
        "args": [storageName, storagePath, alias, password, dataToSign]
    };
    callback = callBack;
    setMissedHeartbeatsLimitToMax();
    webSocket.send(JSON.stringify(signPlainData));
}

function verifyPlainData(storageName, storagePath, alias, password, dataToVerify, base64EcodedSignature, callBack) {
    var verifyPlainData = {
        "method": "verifyPlainData",
        "args": [storageName, storagePath, alias, password, dataToVerify, base64EcodedSignature]
    };
    callback = callBack;
    setMissedHeartbeatsLimitToMax();
    webSocket.send(JSON.stringify(verifyPlainData));
}

function createCMSSignature(storageName, storagePath, alias, password, dataToSign, attached, callBack) {
    var createCMSSignature = {
        "method": "createCMSSignature",
        "args": [storageName, storagePath, alias, password, dataToSign, attached]
    };
    callback = callBack;
    setMissedHeartbeatsLimitToMax();
    console.log(JSON.stringify(createCMSSignature));
    webSocket.send(JSON.stringify(createCMSSignature));
}

function createCMSSignatureFromFile(storageName, storagePath, alias, password, filePath, attached, callBack) {
    var createCMSSignatureFromFile = {
        "method": "createCMSSignatureFromFile",
        "args": [storageName, storagePath, alias, password, filePath, attached]
    };
    callback = callBack;
    setMissedHeartbeatsLimitToMax();
    webSocket.send(JSON.stringify(createCMSSignatureFromFile));
}

function verifyCMSSignature(sigantureToVerify, signedData, callBack) {
    var verifyCMSSignature = {
        "method": "verifyCMSSignature",
        "args": [sigantureToVerify, signedData]
    };
    callback = callBack;
    setMissedHeartbeatsLimitToMax();
    webSocket.send(JSON.stringify(verifyCMSSignature));
}

function verifyCMSSignatureFromFile(signatureToVerify, filePath, callBack) {
    var verifyCMSSignatureFromFile = {
        "method": "verifyCMSSignatureFromFile",
        "args": [signatureToVerify, filePath]
    };
    callback = callBack;
    setMissedHeartbeatsLimitToMax();
    webSocket.send(JSON.stringify(verifyCMSSignatureFromFile));
}

function signXml(storageName, storagePath, alias, password, xmlToSign, callBack) {
    var signXml = {
        "method": "signXml",
        "args": [storageName, storagePath, alias, password, xmlToSign]
    };
    callback = callBack;
    setMissedHeartbeatsLimitToMax();
    webSocket.send(JSON.stringify(signXml));
}

function signXmlByElementId(storageName, storagePath, alias, password, xmlToSign, elementName, idAttrName, signatureParentElement, callBack) {
    var signXmlByElementId = {
        "method": "signXmlByElementId",
        "args": [storageName, storagePath, alias, password, xmlToSign, elementName, idAttrName, signatureParentElement]
    };
    callback = callBack;
    setMissedHeartbeatsLimitToMax();
    webSocket.send(JSON.stringify(signXmlByElementId));
}

function verifyXml(xmlSignature, callBack) {
    var verifyXml = {
        "method": "verifyXml",
        "args": [xmlSignature]
    };
    callback = callBack;
    setMissedHeartbeatsLimitToMax();
    webSocket.send(JSON.stringify(verifyXml));
}

function verifyXmlById(xmlSignature, xmlIdAttrName, signatureElement, callBack) {
    var verifyXml = {
        "method": "verifyXml",
        "args": [xmlSignature, xmlIdAttrName, signatureElement]
    };
    callback = callBack;
    setMissedHeartbeatsLimitToMax();
    webSocket.send(JSON.stringify(verifyXml));
}

function getHash(data, digestAlgName, callBack) {
    var getHash = {
        "method": "getHash",
        "args": [data, digestAlgName]
    };
    callback = callBack;
    setMissedHeartbeatsLimitToMax();
    webSocket.send(JSON.stringify(getHash));
}

            function chooseStoragePath() {
                var storageAlias = $("#storageAlias").val();
                var storagePath = $("#storagePath").val();
                if (storageAlias !== "NONE") {
                    browseKeyStore(storageAlias, "P12", storagePath, "chooseStoragePathBack");
                }
            }

            function chooseStoragePathBack(rw) {
                var storagePath = $("#storagePath").val();

                if (rw.getErrorCode() === "NONE") {
                    storagePath = rw.getResult();
                    if (storagePath !== null && storagePath !== "") {
                        $("#storagePath").val(storagePath);
                    }
                    else {
                        $("#storageAlias").val("NONE");
                        $("#storagePath").val("");
                    }
                } else {
                    $("#storageAlias").val("NONE");
                    $("#storagePath").val("");
                }
            }

            function fillKeysBack(result) {
                if (result['errorCode'] === "NONE") {
                    var keyListEl = document.getElementById('keys');
                    keyListEl.options.length = 0;
                    var list = result['result'];
                    var slotListArr = list.split("\n");
                    for (var i = 0; i < slotListArr.length; i++) {
                        if (slotListArr[i] === null || slotListArr[i] === "") {
                            continue;
                        }
                        keyListEl.options[keyListEl.length] = new Option(slotListArr[i], i);
                    }
                    keysOptionChanged();
                }
                else {
                    if (result['errorCode'] === "WRONG_PASSWORD" && result['result'] > -1) {
                        alert("Неправильный пароль! Количество оставшихся попыток: " + result['result']);
                    } else if (result['errorCode'] === "WRONG_PASSWORD") {
                        alert("Неправильный пароль!");
                    } else {
                        alert(result['errorCode']);
                    }
                    var keyListEl = document.getElementById('keys');
                    keyListEl.options.length = 0;
                }
            }

            function fillKeys() {
                var storageAlias = $("#storageAlias").val();
                var storagePath = $("#storagePath").val();
                var password = $("#password").val();
                var keyType = "";
                var selected = $("input[type='radio'][name='keyType']:checked");
                if (selected.length > 0) {
                    keyType = selected.val();
                }

                if (storagePath !== null && storagePath !== "" && storageAlias !== null && storageAlias !== "") {
                    if (password !== null && password !== "") {
                        getKeys(storageAlias, storagePath, password, keyType, "fillKeysBack");
                    } else {
                        alert("Введите пароль к хранилищу");
                    }
                } else {
                    alert("Не выбран хранилище!");
                }
            }

            function keysOptionChanged() {
                var str = $("#keys :selected").text();
                var alias = str.split("|")[3];
                $("#keyAlias").val(alias);
            }

			function setLocaleCall() {
                var lang = $("#lang").val();
                setLocale(lang);
            }

            function getNotBeforeCall() {
                var storageAlias = $("#storageAlias").val();
                var storagePath = $("#storagePath").val();
                var password = $("#password").val();
                var alias = $("#keyAlias").val();
                if (storagePath !== null && storagePath !== "" && storageAlias !== null && storageAlias !== "") {
                    if (password !== null && password !== "") {
                        if (alias !== null && alias !== "") {
                            getNotBefore(storageAlias, storagePath, alias, password, "getNotBeforeBack");
                        }
                        else {
                            alert("Вы не выбран ключ!");
                        }
                    } else {
                        alert("Введите пароль к хранилищу");
                    }
                } else {
                    alert("Не выбран хранилище!");
                }
            }

            function getNotBeforeBack(result) {
                if (result['errorCode'] === "NONE") {
                    $("#notbefore").val(result['result']);
                }
                else {
                    if (result['errorCode'] === "WRONG_PASSWORD" && result['result'] > -1) {
                        alert("Неправильный пароль! Количество оставшихся попыток: " + result['result']);
                    } else if (result['errorCode'] === "WRONG_PASSWORD") {
                        alert("Неправильный пароль!");
                    } else {
                        alert(result['errorCode']);
                    }
                }
            }

            function getNotAfterCall() {
                var storageAlias = $("#storageAlias").val();
                var storagePath = $("#storagePath").val();
                var password = $("#password").val();
                var alias = $("#keyAlias").val();
                if (storagePath !== null && storagePath !== "" && storageAlias !== null && storageAlias !== "") {
                    if (password !== null && password !== "") {
                        if (alias !== null && alias !== "") {
                            getNotAfter(storageAlias, storagePath, alias, password, "getNotAfterBack");
                        } else {
                            alert("Вы не выбрали ключ!");
                        }
                    } else {
                        alert("Введите пароль к хранилищу");
                    }
                } else {
                    alert("Не выбран хранилище!");
                }
            }

            function getNotAfterBack(result) {
                if (result['errorCode'] === "NONE") {
                    $("#notafter").val(result['result']);
                } else {
                    if (result['errorCode'] === "WRONG_PASSWORD" && result['result'] > -1) {
                        alert("Неправильный пароль! Количество оставшихся попыток: " + result['result']);
                    } else if (result['errorCode'] === "WRONG_PASSWORD") {
                        alert("Неправильный пароль!");
                    } else {
                        alert(result['errorCode']);
                    }
                }
            }

            function createCMSSignatureCall() {
                var storageAlias = $("#storageAlias").val();
                var storagePath = $("#storagePath").val();
                var password = $("#password").val();
                var alias = $("#keyAlias").val();
                $("#identifierCMS").text("Не проверено");
                if (storagePath !== null && storagePath !== "" && storageAlias !== null && storageAlias !== "") {
                    if (password !== null && password !== "") {
                        if (alias !== null && alias !== "") {
                            var data = $("#dateCMS").val();
                            var flag = $("#flag").is(':checked');

                            if (data !== null && data !== "") {
                                if (flag) {
                                    createCMSSignature(storageAlias, storagePath, alias, password, data, true, "createCMSSignatureBack");
                                }
                                else {
                                    createCMSSignature(storageAlias, storagePath, alias, password, data, false, "createCMSSignatureBack");
                                }
                            }
                            else {
                                alert("Вы не ввели данные!");
                            }
                        } else {
                            alert("Вы не выбрали ключ!");
                        }
                    } else {
                        alert("Введите пароль к хранилищу");
                    }
                } else {
                    alert("Не выбран хранилище!");
                }
            }

            function createCMSSignatureBack(result) {
                if (result['errorCode'] === "NONE") {
                    $("#signatureCMS").text(result['result']);
                }
                else {
                    if (result['errorCode'] === "WRONG_PASSWORD" && result['result'] > -1) {
                        alert("Неправильный пароль! Количество оставшихся попыток: " + result['result']);
                    } else if (result['errorCode'] === "WRONG_PASSWORD") {
                        alert("Неправильный пароль!");
                    } else {
                        $("#signatureCMS").text("");
                        alert(result['errorCode']);
                    }
                }
            }

            function signXmlCall() {
                var storageAlias = $("#storageAlias").val();
                var storagePath = $("#storagePath").val();
                var password = $("#password").val();
                var alias = $("#keyAlias").val();
                $("#identifierXML").text("Не проверено");
                if (storagePath !== null && storagePath !== "" && storageAlias !== null && storageAlias !== "") {
                    if (password !== null && password !== "") {
                        if (alias !== null && alias !== "") {
                            var data = document.getElementById("dateXML").value;
                            if (data !== null && data !== "") {
                                signXml(storageAlias, storagePath, alias, password, data, "signXmlBack");
                            }
                            else {
                                alert("Вы не ввели данные!");
                            }
                        } else {
                            alert("Вы не выбрали ключ!");
                        }
                    } else {
                        alert("Введите пароль к хранилищу");
                    }
                } else {
                    alert("Не выбран хранилище!");
                }
            }

            function signXmlBack(result) {
                if (result['errorCode'] === "NONE") {
                    document.getElementById("signatureXML").value = result['result'];
                }
                else {
                    if (result['errorCode'] === "WRONG_PASSWORD" && result['result'] > -1) {
                        alert("Неправильный пароль! Количество оставшихся попыток: " + result['result']);
                    } else if (result['errorCode'] === "WRONG_PASSWORD") {
                        alert("Неправильный пароль!");
                    } else {
                        document.getElementById("signatureXML").value = "";
                        alert(result['errorCode']);
                    }
                }
            }

            function verifyXmlCall() {
                var signature = document.getElementById("signatureXML").value;
                if (signature !== null && signature !== "") {
                    verifyXml(signature, "verifyXmlBack");
                }
                else {
                    alert("Не найден подписанный XML!");
                }
            }

            function verifyXmlBack(result) {
                if (result['errorCode'] === "NONE") {
                    if (result['result'])
                    {
                        $("#identifierXML").text("Валидная подпись");
                    }
                    else {
                        $("#identifierXML").text("Неправильная подпись");
                    }
                }
                else {
                    if (result['errorCode'] === "WRONG_PASSWORD" && result['result'] > -1) {
                        alert("Неправильный пароль! Количество оставшихся попыток: " + result['result']);
                    } else if (result['errorCode'] === "WRONG_PASSWORD") {
                        alert("Неправильный пароль!");
                    } else {
                        $("#identifierXML").text("Неправильная подпись");
                        alert(result['errorCode']);
                    }
                }
            }

            function verifyCMSSignatureCall() {
                var data = $("#dateCMS").val();
                var signatureCMS = $("#signatureCMS").val();
                if (signatureCMS !== null && signatureCMS !== "") {
                    verifyCMSSignature(signatureCMS, data, "verifyCMSSignatureBack");
                }
                else {
                    alert("Вы не ввели данные, или подписанные данные не найдены!");
                }
            }

            function verifyCMSSignatureBack(result) {
                if (result['errorCode'] === "NONE") {
                    if (result['result'])
                    {
                        $("#identifierCMS").text("Валидная подпись");
                    }
                    else {
                        $("#identifierCMS").text(result);
                    }
                } else {
                    $("#identifierCMS").text("Неправильная подпись");
                    alert(result['errorCode']);
                }
            }

            function getRdnByOidCall() {
                var storageAlias = $("#storageAlias").val();
                var storagePath = $("#storagePath").val();
                var password = $("#password").val();
                var alias = $("#keyAlias").val();
                if (storagePath !== null && storagePath !== "" && storageAlias !== null && storageAlias !== "") {
                    if (password !== null && password !== "") {
                        if (alias !== null && alias !== "") {
                            var oid = "";
                            var selected = $("input[type='radio'][name='oid']:checked");
                            if (selected.length > 0) {
                                oid = selected.val();
                            }
                            getRdnByOid(storageAlias, storagePath, alias, password, oid, 0, "getRdnByOidBack");
                        } else {
                            alert("Вы не выбрали ключ!");
                        }
                    } else {
                        alert("Введите пароль к хранилищу");
                    }
                } else {
                    alert("Не выбран хранилище!");
                }
            }

            function getRdnByOidBack(result) {
                if (result['errorCode'] === "NONE") {
                    $("#rdnvalue").val(result['result']);
                }
                else {
                    if (result['errorCode'] === "WRONG_PASSWORD" && result['result'] > -1) {
                        alert("Неправильный пароль! Количество оставшихся попыток: " + result['result']);
                    } else if (result['errorCode'] === "WRONG_PASSWORD") {
                        alert("Неправильный пароль!");
                    } else {
                        $("#rdnvalue").val("RDN не найден!");
                        alert(result['errorCode']);
                    }
                }
            }

            function getHashCall() {
                var hashAlgorithm = $("#hashAlg").val();
                var dataHash = $("#dataHash").val();
                if (dataHash !== null && dataHash !== "") {
                    getHash(dataHash, hashAlgorithm, "getHashBack");
                }
                else {
                    alert("Вы не ввели данные для хеширование");
                }
            }

            function getHashBack(result) {
                if (result['errorCode'] === "NONE") {
                    $("#hashArea").text(result['result']);
                } else {
                    alert(result['errorCode']);
                }
            }

export {            
    chooseStoragePath, fillKeys, createCMSSignatureCall, verifyCMSSignatureCall,signXmlCall,verifyXmlCall
}