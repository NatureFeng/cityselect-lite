/**
 * @module cityselect
 * @description 城市级联组件
 * @author 绮礼<tianran.ftr@alibaba-inc.com>
 * @version 0.0.1
 * */

KISSY.add(function(S, Base, CityData) {

    /**
     * @class Cityselect
     * @constructor
     * @extends Rice-Base
     */
    var Cityselect = Base.extend({

        /**
         * 初始化函数，渲染，绑定事件
         */
        initializer: function() {
            var _ = this;
            _.province = S.one(_.get("province_select"));
            _.city = S.one(_.get("city_select"));
            _.area = S.one(_.get("area_select"));
            _._render();
            _._bind();
        },

        /**
         * 析构函数 解绑事件
         */
        destructor: function() {
            var _ = this;
            _.province && _.province.detach("change.city");
            _.city && _.city.detach("change.city");
        },

        /**
         * 渲染省市区
         */
        _render: function() {
            var _ = this;
            _._renderprovince();
            _.set("province", _.province[0].options[_.province[0].selectedIndex].text);
            _._rendercity();
            _.set("city", _.city[0].options[_.city[0].selectedIndex].text);
            _._renderarea();
            _.set("area", _.area[0].options[_.area[0].selectedIndex].text||"");
        },

        /**
         * 绑定事件
         */
        _bind: function() {
            var _ = this;
            _.province && _.province.on("change.city", function() {
                _.set("province", _.province[0].options[_.province[0].selectedIndex].text);
                _._rendercity();
                _.set("city", _.city[0].options[0].text);
                _._renderarea();
                _.set("area", _.area[0].options[0]?_.area[0].options[0].text:"");
            });

            _.city && _.city.on("change.city", function() {
                _.set("city", _.city[0].options[_.city[0].selectedIndex].text);
                _._renderarea();
                _.set("area", _.area[0].options[0]?_.area[0].options[0].text:"");
            });
            
            _.area && _.area.on("change.city", function() {
                _.set("area", _.area[0].options[0]?_.area[0].options[0].text:"");
            });
        },

        /**
         * 渲染省
         */
        _renderprovince: function() {
            var _ = this,
                provinceDefault = _.get("initProvince"),
                nodeFrament = document.createDocumentFragment();

            if (provinceDefault) {
                S.each(CityData, function(item) {
                    if(provinceDefault == item[0]){
                        var option = new Option(item[1],item[0]);
                        option.selected = true;
                        nodeFrament.appendChild(option);
                    }else{
                        nodeFrament.appendChild(new Option(item[1],item[0]));    
                    }
                });
            } else {
                S.each(CityData, function(item) {
                    nodeFrament.appendChild(new Option(item[1],item[0]));
                });
            }

            _.province[0].appendChild(nodeFrament);
        },

        /**
         * 渲染市
         */
        _rendercity: function() {
            var _ = this,
                cityDefault = _.get("initCity"),
                index = _.province[0].selectedIndex,
                data = CityData[index],
                length = data.length - 1,
                nodeFrament = document.createDocumentFragment();

            _.city.html("");

            if (cityDefault) {
                S.each(data[length], function(item) {
                    if(cityDefault == item[0]){
                        var option = new Option(item[1],item[0]);
                        option.selected = true;
                        nodeFrament.appendChild(option);
                    }else{
                        nodeFrament.appendChild(new Option(item[1],item[0]));    
                    }
                });
            } else {
                S.each(data[length], function(item) {
                    nodeFrament.appendChild(new Option(item[1],item[0]));
                });
            }

            _.city[0].appendChild(nodeFrament);
        },

        /**
         * 渲染区
         */
        _renderarea: function() {
            var _ = this,
                areaDefault = _.get("initArea"),
                index = _.province[0].selectedIndex,
                data = CityData[index],
                index = _.city[0].selectedIndex,
                length = data.length - 1,
                data = data[length][index],
                length = data.length - 1,
                nodeFrament = document.createDocumentFragment();

            _.area.html("");

            if (areaDefault) {
                S.each(data[length], function(item) {
                    if(areaDefault == item[0]){
                        var option = new Option(item[1],item[0]);
                        option.selected = true;
                        nodeFrament.appendChild(option);
                    }else{
                        nodeFrament.appendChild(new Option(item[1],item[0]));    
                    }
                });
            } else {
                S.each(data[length], function(item) {
                    nodeFrament.appendChild(new Option(item[1],item[0]));
                });
            }

            _.area[0].appendChild(nodeFrament);
        },

        /**
         * 用户自己设置province
         * @param {string|number} province_code
         */
        setProvince: function(province_code){
            var _ = this;
            _.province.val(province_code);
            _.set("province", _.province[0].options[_.province[0].selectedIndex].text);
            _._rendercity();
            _.set("city", _.city[0].options[0].text);
            _._renderarea();
            _.set("area", _.area[0].options[0]?_.area[0].options[0].text:"");
        },

        /**
         * 用户自己设置city
         * @param {string|number} city_code
         */
        setCity: function(city_code){
            var _ = this;
            _.city.val(city_code);
            _.set("city", _.city[0].options[_.city[0].selectedIndex].text);
            _._renderarea();
            _.set("area", _.area[0].options[0]?_.area[0].options[0].text:"");
        },

        /**
         * 用户自己设置area
         * @param {string|number} area_code
         */
        setArea: function(area_code){
            var _ = this;
            _.area.val(area_code);
            _.set("area", _.area[0].options[_.area[0].selectedIndex].text);
        },

        /**
         * 获取当前省份名称
         * @return {string} 当前省份名称
         */
        getProvince: function(){
            return this.get("province");
        },

        /**
         * 获取当前城市名称
         * @return {string} 当前城市名称
         */
        getCity: function(){
            return this.get("city");
        },

        /**
         * 获取当前地区名称
         * @return {string} 当前地区名称
         */
        getArea: function(){
            return this.get("area");
        },
    }, {
        ATTRS: {
            /**
             * 被渲染的省节点
             * @type selector
             */
            province_select: {
                value: null
            },

            /**
             * 被渲染的市节点
             * @type selector
             */
            city_select: {
                value: null
            },

            /**
             * 被渲染的区节点
             * @type selector
             */
            area_select: {
                value: null
            },

            /**
             * 当前选择的省
             * @type string
             */
            province: {
                value: null,
            },

            /**
             * 当前选择的市
             * @type string
             */
            city: {
                value: null
            },

            /**
             * 当前选择的区
             * @type string
             */
            area: {
                value: null
            },

            /**
             * 初始化的省份code,例如山西省为140000
             * 不用中文是因为怕乱码
             * @type string|number
             */
            initProvince: {
                value: null
            },

            /**
             * 初始化的市code
             * @type string|number
             */
            initCity: {
                value: null
            },

            /**
             * 初始化的区code
             * @type string|number
             */
            initArea: {
                value: null
            },
        }
    });


    return Cityselect;
}, {
    requires: ['rich-base', './data', 'node', 'event']
});