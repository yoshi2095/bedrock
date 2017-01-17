/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

(function (Mozilla) {
    'use strict';
    let scene = document.getElementById('scene');
    let skipbutton = document.getElementById('skip-button');

    let onVerificationComplete = function () {
        scene.dataset.signIn = 'true';
        document.getElementById('sunrise').addEventListener('transitionend', function(event) {
            if (event.propertyName === 'transform') {
                window.setTimeout(function () {
                    Mozilla.UITour.showNewTab();
                }, 200);
            }
        }, false);
    };

    skipbutton.onclick = onVerificationComplete;

    Mozilla.Client.getFirefoxDetails(function(data) {
        Mozilla.FxaIframe.init({
            distribution: data.distribution,
            gaEventName: 'firstrun-fxa',
            onVerificationComplete: onVerificationComplete,
            onLogin: onVerificationComplete
        });
    });

    scene.dataset.sunrise = 'true';

    document.getElementById('sky').addEventListener('transitionend', function(event) {
        if (event.propertyName === 'opacity') {
            scene.dataset.modal = 'true';
        }
    }, false);

})(window.Mozilla);
