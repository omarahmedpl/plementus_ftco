/** @odoo-module **/

import {Component} from "@odoo/owl";
import {usePos} from "@point_of_sale/app/store/pos_hook";
import {ProductScreen} from "@point_of_sale/app/screens/product_screen/product_screen";
import {AddonsPopup} from "./addon_popup";

export class FlowerAddonButton extends Component {
    setup() {
        this.pos = usePos();
    }

    async onClick() {
        const order = this.pos.get_order();
        const selectedLine = order.get_selected_orderline();

        if (!selectedLine) {
            alert("Please select an order line first.");
            return;
        }

        // Show the popup and wait for the user to confirm
        const {confirmed, payload} = await this.pos.popup.add(AddonsPopup, {
            orderline: selectedLine,
        });

        if (confirmed && payload) {
            const {selectedAddons, totalAddonPrice} = payload;
            // Store addon data on orderline
            selectedLine.setAddons(selectedAddons, totalAddonPrice);
            // Get original price with context
            const basePrice = selectedLine.product.get_price(
                order.pricelist,
                selectedLine.get_quantity()
            );
            // Set new unit price
            selectedLine.set_unit_price(basePrice + totalAddonPrice);
        }
    }

}

FlowerAddonButton.template = "sally_flower_pos.FlowerAddonButton";

ProductScreen.addControlButton({
    component: FlowerAddonButton,
    condition: function () {
        return true; // You can restrict the button if needed
    },
});