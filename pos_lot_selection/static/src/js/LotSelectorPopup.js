odoo.define('pos_lot_selection.LotSelectorPopup', function(require) {
    'use strict';

    const { useState } = owl.hooks;
    const {useListener} = require("web.custom_hooks");
    const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup');
    const Registries = require('point_of_sale.Registries');
     const { _lt } = require('@web/core/l10n/translation');

    
    class LotSelectorPopup extends AbstractAwaitablePopup {
        constructor() {
            super(...arguments);
            // this.state = useState({ array: this._initialize(this.props.array) });
            // useListener("click", this.clickProductTracked);
            // If there's a product, get lots available related to this product
            this.slected_items = []
            let order = this.env.pos.get_order();
            let selectedLine = order.get_selected_orderline();
            if (selectedLine){
                const isAllowOnlyOneLot = selectedLine.product.isAllowOnlyOneLot();
                const packLotLinesToEdit = selectedLine.getPackLotLinesToEdit(isAllowOnlyOneLot);
                debugger;
                this.slected_items = packLotLinesToEdit.filter(lot => lot.text.length !== 0);
            };
            
            if (this.props.product) {
                var id = this.props.product.id;
                var lots_by_product = this.env.pos.db.product_id_by_lot_id
                var lot_by_id = this.env.pos.db.lot_by_id
                var lots = [];
                Object.keys(lots_by_product).filter(function(key) {
                    if (lots_by_product[key] === id){
                        lots.push(lot_by_id[key])
                    }
                });
                this.lots = lots;
            }
        }
        // TODO handle same serial numbers
        
        

        // async clickProductTracked(ev) {
            //     const {product} = ev.detail;
            // await this.showPopup("LotSelectorPopup", {product});
            // }
            // default implementation
            _nextId() {
                return this._id++;
            }
            _emptyItem() {
                return {
                    text: '',
                    _id: this._nextId(),
                };
            }
            _initialize(array) {
                // If no array is provided, we initialize with one empty item.
                if (array.length === 0) return [this._emptyItem()];
                // Put _id for each item. It will serve as unique identifier of each item.
                return array.map((item) => Object.assign({}, { _id: this._nextId() }, typeof item === 'object'? item: { 'text': item}));
            }
            // end of default implementation
            
        getPayload(){
            debugger;
            return{
                newArray:[Object.assign({},{'text':$('#new_select').val()})]
            };
        }
    }
    LotSelectorPopup.template = 'LotSelectorPopup';
    LotSelectorPopup.defaultProps = {
        title: _lt('Lot/Serial'),
        body: '',
        array: [],
        selected_lot: '',
    };
    Registries.Component.add(LotSelectorPopup);
    return LotSelectorPopup;
});
