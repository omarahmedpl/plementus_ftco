/** @odoo-module */
import {ProductsWidget} from "@point_of_sale/app/screens/product_screen/product_list/product_list";
import {patch} from "@web/core/utils/patch";
import {useService} from "@web/core/utils/hooks";
import {FlowerInfoPopup} from "./flower_info_popup";

patch(ProductsWidget.prototype, {
    setup() {
        super.setup();
        this.popup = useService("popup");
    },
    async onProductInfoClick(product) {
        console.log(product)
        let info = await this.pos.getProductInfo(product, 1);

        this.popup.add(FlowerInfoPopup, {info: info, product: product});
    }
});

