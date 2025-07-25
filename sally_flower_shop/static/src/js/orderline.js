/** @odoo-module **/

import {patch} from "@web/core/utils/patch";
import {Orderline} from "@point_of_sale/app/store/models";
import {reactive} from "@odoo/owl";

patch(Orderline.prototype, {
    setup() {
        super.setup(...arguments);
        this.addons = reactive([]);
        this.addon_price = 0;
    },

    setAddons(addons, totalPrice) {
        this.addons = addons;
        this.addon_price = totalPrice;
        this.note = this.addons.map(addon => addon.name).join(', ');
    },
    export_as_JSON() {
        const json = super.export_as_JSON();
        json.addons = this.addons;
        json.addon_price = this.addon_price;
        return json;
    },

    init_from_JSON(json) {
        super.init_from_JSON(json);
        this.addons = reactive(json.addons || []);
        this.addon_price = json.addon_price || 0;
        this.note = this.addons.map(a => a.name).join(', ');
    },
});

