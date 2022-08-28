odoo.define('pos_lot_selection.LotSelectorPopup', function(require) {
    'use strict';

    const { useState } = owl.hooks;
    const {useListener} = require("web.custom_hooks");
    const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup');
    const Registries = require('point_of_sale.Registries');
     const { useAutoFocusToLast } = require('point_of_sale.custom_hooks');
     const { _lt } = require('@web/core/l10n/translation');

    
    class LotSelectorPopup extends AbstractAwaitablePopup {
        constructor() {
            super(...arguments);
            // useAutoFocusToLast();
            useListener("click", this.clickProductTracked);
            // If there's a product, get lots available related to this product
            if (this.props.product) {
                var id = this.props.product.id;
                var lots_by_product = this.env.pos.db.product_id_by_lot_id
                var lot_by_id = this.env.pos.db.lot_by_id
                var lots = [];
                Object.keys(lots_by_product).filter(function(key) {
                    if (lots_by_product[key] === id){
                        lots.push(lot_by_id[lots_by_product[key]])
                    }
                });
                this.lots = lots;
                console.log(lots);
            }else{
                console.log("else");
            }

        }
        async clickProductTracked(ev) {
            const {product} = ev.detail;
            await this.showPopup("LotSelectorPopup", {product});
        }
        // async confirm() {
        //     var lot_value = $('#lot_select').val()
        //     if(lot_value.length){
        //         this.props.resolve({ confirmed: true, payload: await this.getPayload() });
        //         this.trigger('close-popup');
        //     }
        // }
        // getPayload(){
        //     return{
        //         newArray:[Object.assign({},{'text':$('#lot_select').val()})]
        //     };
        // }
    }
    LotSelectorPopup.template = 'LotSelectorPopup';
    LotSelectorPopup.defaultProps = {
        confirmText: _lt('Ok'),
        cancelText: _lt('Cancel'),
        title: _lt('Lot/Serial'),
        body: '',
    };
    Registries.Component.add(LotSelectorPopup);
    return LotSelectorPopup;
});
