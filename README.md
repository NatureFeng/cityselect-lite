# CityselectLite

CityselectLite是一个精简版的城市级联组件。

- Version: 0.0.1
- Author: NatureFeng
- E-Mail: <ftrsicun@gmail.com> 

## 功能


* 城市级联
* 用户自己即时改变select值

## 使用

```
<select name="" id="province"></select>
<select name="" id="city"></select>
<select name="" id="area"></select>


S.use('gallery/cityselect-lite/index', function (S, CityselectLite) {
     var cityselect-lite = new CityselectLite({
            province_select : "#province",
            city_select     : "#city",
            area_select     : "#area"
        });
})
```

### Config

* province_select
    - 被渲染的省节点
    - type selector

* city_select
    - 被渲染的市节点
    - type selector

* area_select
    - 被渲染的区节点
    - type selector

* initProvince
    - 初始化的省份code,例如山西省为140000
    - type string|number

* initCity
    - 初始化的城市code
    - type string|number

* initArea
    - 初始化的地区code
    - type string|number

### Method

* setProvince(province_code)
    - param {string|number} 省份code,例如山西省为140000
    - example citySelectLite.setProvince("140000")

* setCity(city_code)
    - param {string|number} 城市code

* setArea(area_code)
    - param {string|number} 地区code

* getProvince()
    - 获取当前省份名称
    - return {string} 当前省份名称

* getCity()
    - 获取当前城市名称
    - return {string} 当前城市名称

* getArea()
    - 获取当前地区名称
    - return {string} 当前地区名称

* destroy()
    - 销毁组件对象，并解绑所有事件
    - example citySelectLite.destroy()

### Event

* beforeProvinceChange / afterProvinceChange
    - province发生变化时触发

* beforeCityChange / afterCityChange
    - city发生变化时触发

* beforeAreaChange / afterAreaChange
    - area发生变化时触发


## changelog

* 0.0.1 组件发布
