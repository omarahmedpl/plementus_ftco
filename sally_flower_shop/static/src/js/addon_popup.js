/** @odoo-module **/

import {AbstractAwaitablePopup} from "@point_of_sale/app/popup/abstract_awaitable_popup";
import {useBus, useService} from "@web/core/utils/hooks";
import {useState} from '@odoo/owl'
import {usePos} from "@point_of_sale/app/store/pos_hook";

export class AddonsPopup extends AbstractAwaitablePopup {
    setup() {
        this.pos = usePos()
        this.rpc = useService("rpc");
        super.setup();
        this.state = useState({
            addons: [],
            selectedAddons: new Set(),
        });
        this.loadAddons();
    }

    async loadAddons() {
        const addons = await this.rpc("/web/dataset/call_kw", {
            model: 'flower.addon',
            method: 'search_read',
            args: [],
            kwargs: {}
        });
        this.state.addons = addons;
    }

    toggleAddon(addon) {
        if (this.state.selectedAddons.has(addon)) {
            this.state.selectedAddons.delete(addon);
        } else {
            this.state.selectedAddons.add(addon);
        }
    }

    confirm() {
        try {
            const selectedAddons = Array.from(this.state.selectedAddons);
            const totalAddonPrice = selectedAddons.reduce((sum, a) => sum + a.price, 0);
            this.props.resolve({
                confirmed: true,
                payload: {selectedAddons, totalAddonPrice}
            });
            this.props.close();
        } catch (e) {
            console.error("Error in confirm:", e);
        }
    }
}

AddonsPopup.template = "sally_flower_pos.FlowerAddonsPopup";
