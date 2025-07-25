/** @odoo-module **/

import {patch} from "@web/core/utils/patch";
import {PaymentScreen} from "@point_of_sale/app/screens/payment_screen/payment_screen";
import {WateringValidationPopup} from "./watering_popup";

patch(PaymentScreen.prototype, {
    async validateOrder(isForceValidate) {
        const order = this.pos.get_order();
        console.log(order.get_orderlines(), 'order lines')
        const unwateredFlowers = order.get_orderlines()
            .filter(line => {
                const flower = line.product;
                return (
                    flower.flower_id &&
                    (!flower.last_watered_date || new Date(flower.last_watered_date) < new Date())
                );
            })
            .map(line => ({
                id: line.product.id,
                name: line.product.display_name
            }));
        console.log(unwateredFlowers)
        if (unwateredFlowers.length > 0) {
            const {confirmed} = await this.popup.add(WateringValidationPopup, {
                unwateredFlowers,
            });
            if (!confirmed) return;
        }
        await super.validateOrder(isForceValidate);
    }
});
