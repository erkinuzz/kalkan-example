<template>
  <div class="content">
        <h1>heh {{ msg }}</h1>
            <div>
                <span style="font-size:18px; color: blue">Тип хранилища ключа:</span><br/>
                <select @change="chooseStoragePath();" id="storageAlias" size="1" style="width:100%;">
                    <option value="NONE">-- Выберите тип --</option>
                    <option value="PKCS12">Ваш Компьютер</option>
                    <option value="AKKaztokenStore">Казтокен</option>
                    <option value="AKKZIDCardStore">Личное Удостоверение</option>
                    <option value="AKEToken72KStore">EToken Java 72k</option>
                    <option value="AKJaCartaStore">AK JaCarta</option>
                </select>
                <br/>
                <br/>
                <span style="font-size:18px; color: blue">Путь хранилища ключа:</span><br/>
                <input type="text" readonly="readonly"  id="storagePath" value="" style="width:100%;"/>
                <br/>
                <br/>
                <span style="font-size:18px; color: blue">Пароль для хранилища:</span><br/>
                <input id="password" type="password" value="123456" style="width: 100%;"/>&nbsp;
                <br/>
                <span style="font-size:18px; color: blue">Тип ключа:</span><br/>
                <input type="radio" value="SIGN" name="keyType" checked /> Для подписи
                <br/>

                <br/>
                <span style="font-size:18px; color: blue">Список ключей:</span><br/>
                <input type="hidden" id="keyAlias" value=""/>
                <select  onchange="keysOptionChanged();" id="keys" style="width: 70%;"></select>&nbsp;
                <input style="float: right; width: 28%" value="Обновить список ключей" @click="fillKeys();" type="button"/>
            </div>
            <br/><br/>


            <div>
                <span style="font-size:18px; color: blue">Введите данные для подписи(<span style="color: black; font-family: monospace">createCMSSignature</span>):</span><br/>
                <input type="text" id="dateCMS" value="" style="width: 70%"/>
                <input type="checkbox" id="flag" /> Включить данные в подпись
                <br/>
                <input value="Подписать данные" @click="createCMSSignatureCall();" type="button" style="width: 100%; height: 25px; margin-top: 5px; "/>
                <br/><br/>
                <span style="font-size:18px; color: blue">Проверить подисанные данные(<span style="color: black; font-family: monospace">verifyCMSSignature</span>):</span><br/>
                <textarea readonly id="signatureCMS" style="width: 70%; height: 110px">
                    Нажмите на кнопку чтобы узнать
                </textarea>
                <span id="identifierCMS" style="width: 28%; float: right; color: green; font-size: 25px; text-align: center; padding-top: 30px">Не проверено</span>
                <br/>
                <input value="Проверить данные" @click="verifyCMSSignatureCall();" type="button" style="width: 100%; height: 25px; float: right"/>
            </div>
            <br/>
            <br/><br/><br/><br/><br/>
            <div>
                <span style="font-size:18px; color: blue">XML для подписи(<span style="color: black; font-family: monospace">signXML</span>):</span><br/>
                <textarea id="dateXML" style="width: 100%; height: 170px"><?xml version="1.0" encoding="utf-8"?>
                <root>
                    <name>Ivan</name>
                    <iin>123456789012</iin>
                </root>
                </textarea>
                <br/>
                <input value="Подписать данные" @click="signXmlCall();" type="button" style="width: 100%; height: 25px; margin-top: 5px; "/>
                <br/><br/>
                <span style="font-size:18px; color: blue">Проверить подписанный XML(<span style="color: black; font-family: monospace">verifyXml</span>):</span><br/>
                <textarea id="signatureXML" style="width: 70%; height: 170px">
                    Нажмите на кнопку чтобы узнать
                </textarea>
                <span id="identifierXML" style="width: 28%; float: right; color: green; font-size: 25px; text-align: center; padding-top: 50px">Не проверено</span>
                <br/>
                <input value="Проверить данные" @click="verifyXmlCall();" type="button" style="width: 100%; height: 25px; float: right"/>
            </div>
            <br/><br/><br/><br/><br/>
            
            
            <br/>
            <br/>
        </div>
</template>

<script>
import {chooseStoragePath,fillKeys,createCMSSignatureCall,verifyCMSSignatureCall,signXmlCall,verifyXmlCall} from '../assets/kalkan-js/sign';
 
export default {
  name: 'Auth',
  props: {
    msg: String
  },
  methods: {
    chooseStoragePath: chooseStoragePath,
    fillKeys: fillKeys,
    createCMSSignatureCall: createCMSSignatureCall,
    verifyCMSSignatureCall: verifyCMSSignatureCall,
    signXmlCall: signXmlCall,
    verifyXmlCall: verifyXmlCall
  },
};
</script>

<style scoped>

</style>
