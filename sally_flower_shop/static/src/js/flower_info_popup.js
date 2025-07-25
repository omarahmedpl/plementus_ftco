/** @odoo-module */
import {AbstractAwaitablePopup} from "@point_of_sale/app/popup/abstract_awaitable_popup";
import {usePos} from "@point_of_sale/app/store/pos_hook";
import {_t} from "@web/core/l10n/translation";
import {useService} from "@web/core/utils/hooks";
import {useState} from "@odoo/owl";

export class FlowerInfoPopup extends AbstractAwaitablePopup {
    static template = "sally_flower_pos.FlowerInfoPopup";
    static defaultProps = {
        confirmText: _t("Close"),
        cancelText: _t("Cancel"),
        title: _t("Flower Details"),
    };

    setup() {
        super.setup();
        this.pos = usePos();
        this.orm = useService("orm");
        this.state = useState({
            product: this.props.product,
            flower: null,
        });
        this._loadFlowerData();
    }

    async _loadFlowerData() {
        console.log(this.state.product)
        const flowerId = this.state.product.flower_id ? this.state.product.flower_id[0] : false;
        console.log(flowerId)
        if (flowerId) {
            try {
                const [flower] = await this.orm.call("sally.flower", "read", [flowerId, [
                    "common_name",
                    "scientific_name",
                    "season_start",
                    "season_end",
                    "watering_frequency",
                    "watering_amount"
                ]]);
                console.log(flower)
                this.state.flower = flower;
            } catch (error) {
                console.error("Error loading flower data:", error);
            }
        }
    }
}