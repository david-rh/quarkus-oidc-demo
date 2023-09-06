/*
 * JBoss, Home of Professional Open Source
 * Copyright 2016, Red Hat, Inc. and/or its affiliates, and individual
 * contributors by the @authors tag. See the copyright.txt in the
 * distribution for a full listing of individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//import Keycloak from './node_modules/keycloak-js/dist/keycloak-js/dist/keycloak.js' assert { type: 'json' };

var keycloak = new Keycloak();
var token = '';

try {
   const authenticated = keycloak.init({
      onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
   enableLogging: true });
   console.log("Init: " + keycloak.authenticated);
} catch (error) {
    console.error('Failed to initialize adapter:', error);
}

function notAuthenticated() {
    document.getElementById('not-authenticated').style.display = 'block';
    document.getElementById('authenticated').style.display = 'none';
}

function authenticated() {
    document.getElementById('not-authenticated').style.display = 'none';
    document.getElementById('authenticated').style.display = 'block';
    document.getElementById('message').innerHTML = 'User: ' + keycloak.tokenParsed['preferred_username'];
}

function request(endpoint) {
    var req = function() {
        var req = new XMLHttpRequest();
        var output = document.getElementById('message');
 console.log("Token: " + keycloak.token);
 console.log("Authenticated: " + keycloak.authenticated);
 console.log("Endpoint: " + endpoint);
        req.open('GET', '/' + endpoint, true);

        if (keycloak.authenticated) {
            console.log("Authenticated!");
            req.setRequestHeader('Authorization', 'Bearer ' + keycloak.token);
        } else if(token != "") {
            req.setRequestHeader('Authorization', 'Bearer ' + token)
            console.log("Unauthenticated request.");
        } else {
        console.log("Failed to set Auth Bearer token");
        }

        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    output.innerHTML = 'Message: ' + JSON.parse(req.responseText).message;
                } else if (req.status == 0) {
                    output.innerHTML = '<span class="error">Request failed</span>';
                } else {
                    output.innerHTML = '<span class="error">' + req.status + ' ' + req.statusText + '</span>';
                }
            }
        };

        req.send();
    };

    if (keycloak.authenticated) {
        keycloak.updateToken(30).success(req);
    } else {
        req();
    }
}

// window.onload = function () {
// keycloak.init({ 
     // onLoad: 'check-sso',
   // silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
  // enableLogging: true }).then(function () {
    // console.log("init keycloak");
    // if (keycloak.authenticated) {
        // authenticated();
        // console.log("Token: " + keycloak.token);
        // token = keycloak.token;
// console.log("Authenticated: " + keycloak.authenticated);
// 
    // } else {
        // console.log("Authenticated failed");
        // notAuthenticated();
    // }
// 
    // document.body.style.display = 'block';
//});
// }

// keycloak.onAuthLogout = notAuthenticated;

