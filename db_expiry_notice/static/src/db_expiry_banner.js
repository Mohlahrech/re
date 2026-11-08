/** @odoo-module **/

import { Component, useState, onWillUnmount } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { browser } from "@web/core/browser/browser";

// Delay before a dismissed banner comes back (ms).
const REAPPEAR_DELAY = 60 * 1000;
// How often the banner shakes to draw attention (ms).
const SHAKE_INTERVAL = 30 * 1000;
const SHAKE_DURATION = 1000;

export class DbExpiryBanner extends Component {
    setup() {
        this.state = useState({ visible: true, shaking: false });
        this.reappearTimeout = null;
        this.shakeTimeout = null;
        this.shakeInterval = browser.setInterval(() => this.shake(), SHAKE_INTERVAL);

        onWillUnmount(() => {
            browser.clearInterval(this.shakeInterval);
            browser.clearTimeout(this.reappearTimeout);
            browser.clearTimeout(this.shakeTimeout);
        });
    }

    shake() {
        if (!this.state.visible) {
            return;
        }
        this.state.shaking = true;
        browser.clearTimeout(this.shakeTimeout);
        this.shakeTimeout = browser.setTimeout(() => {
            this.state.shaking = false;
        }, SHAKE_DURATION);
    }

    dismiss() {
        this.state.visible = false;
        browser.clearTimeout(this.reappearTimeout);
        this.reappearTimeout = browser.setTimeout(() => {
            this.state.visible = true;
            this.shake();
        }, REAPPEAR_DELAY);
    }
}

DbExpiryBanner.template = "db_expiry_notice.DbExpiryBanner";

registry.category("main_components").add("DbExpiryBanner", {
    Component: DbExpiryBanner,
});
