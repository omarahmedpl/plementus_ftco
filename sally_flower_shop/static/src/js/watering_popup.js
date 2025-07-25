/** @odoo-module **/

import { AbstractAwaitablePopup } from "@point_of_sale/app/popup/abstract_awaitable_popup";
import { xml } from '@odoo/owl';

export class WateringValidationPopup extends AbstractAwaitablePopup {
    setup() {
        super.setup();
        this.unwateredFlowers = this.props.unwateredFlowers || [];
    }

    confirm() {
        this.props.resolve({ confirmed: true });
        this.props.close();
    }

    cancel() {
        this.props.resolve({ confirmed: false });
        this.props.close();
    }
}

WateringValidationPopup.template = xml`
    <div class="popup popup-sm">
        <div class="popup-body p-4">
            <h3>Watering Check</h3>
            <p>
                The following flowers are past their watering due time:
            </p>
            <ul>
                <t t-foreach="props.unwateredFlowers" t-as="flower" t-key="flower.id">
                    <li><t t-esc="flower.name" /></li>
                </t>
            </ul>
            <p class="mt-3">
                Are you sure you want to proceed with payment?
            </p>
        </div>
        <div class="popup-footer pb-4">
            <button class="btn btn-secondary me-3" t-on-click="cancel">Cancel</button>
            <button type="button" class="btn btn-danger" t-on-click="confirm">Proceed</button>
        </div>
    </div>`;
