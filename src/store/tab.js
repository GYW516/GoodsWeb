import Cookie from "js-cookie"

export default{
    state:{
        isCollapse:false, //用于控制菜单的展开还是收起
        tabslist:[
            {
                path:"/",
                name:"home",
                label:"首页",
                icon:"s-home",
                url:"Home/Home"
              }
        ],//面包屑数据,默认是首页，点击aside里的li的话就往里面添加
        menudata:[
            {
              path:"/",
              name:"home",
              label:"首页",
              icon:"s-home",
              url:"Home/Home"
            },
            {
              path:"/mall",
              name:"mall",
              label:"商品",
              icon:"goods",
              url:"MallManage/MallManage"
            },
            {
              path:"/shop",
              name:"shop",
              label:"购物车",
              icon:"shopping-cart-2",
              url:"ShopManage/ShopManage"
            },
            {
              name:"user",
              label:"商品管理",
              icon:"s-shop",
              children:[
                {
                  path:"/user",
                  name:"user",
                  label:"信息查询",
                  icon:"s-shop",
                  url:"UserManage/UserManage",
                },
                {
                  path:"/AddGood",
                  name:"AddGood",
                  label:"增加商品",
                  url:"AddGood/AddGood"
                }
              ]
              
            },
            {
              name:"shelve",
              label:"货架管理",
              icon:"school",
              children:[
                {
                  path:"/shelve",
                  name:"shelve",
                  label:"信息编辑",
                  icon:"office-building",
                  url:"shelve/shelve"
                },
                {
                  path:"/shelveAdd",
                  name:"shelveAdd",
                  label:"新增货架",
                  icon:"office-building",
                  url:"shelveAdd/shelveAdd"
                }
              ]
            },
            {
              name:"region",
              label:"区域管理",
              icon:"office-building",
              children:[
                {
                  path:"/region",
                  name:"region",
                  label:"信息编辑",
                  icon:"office-building",
                  url:"region/region"
                },
                {
                  path:"/regionAdd",
                  name:"regionAdd",
                  label:"新增区域",
                  icon:"office-building",
                  url:"regionAdd/regionAdd"
                }
              ]
            },
            {
              name:"supplier",
              label:"供应商管理",
              icon:"phone",
              children:[
                {
                  path:"/supplier",
                  name:"supplier",
                  label:"信息编辑",
                  icon:"phone",
                  url:"supplier/supplier"
                },
                {
                  path:"/supplierAdd",
                  name:"supplierAdd",
                  label:"新增供应商",
                  icon:"phone",
                  url:"supplierAdd/supplierAdd"
                }
              ]
            },
            {
              label:"用户管理",
              name:"UserManager",
              icon:"s-custom",
              children:[
                {
                path:"/information",
                name:"information",
                label:"信息查询",
                icon:"user",
                url:"Other/information"
                },
                {
                path:"/page2",
                name:"page2",
                label:"页面2",
                icon:"setting",
                url:"Other/PageTwo"
                }
              ]
            },
            // {
            //   label:"图标",
            //   name:"echarts",
            //   icon:"s-custom",
            //   children:[
            //     {
            //     path:"/echarts",
            //     name:"echarts",
            //     label:"信息查询",
            //     icon:"user",
            //     url:"Other/echarts"
            //     },
            //   ]
            // }
          ],
          tableDatas:[
            {
                "img_url":"../goods/1.jpg",
                "title":"苹果15 128GB",
                "current_price":5000,
                "old_price":"6980",
                "discount":9
            }
        ]
    },
    mutations:{

        dmangerMenu(state){
            console.log('管理员菜单')
            let a = state.menudata.filter(item => (item.name != 'mall' && item.name != 'shop'))
            Cookie.set('mangeMenu',JSON.stringify(a))
        },

        mangerMenu(state){
            console.log('普通用户')
            let a = state.menudata.filter(item => (item.name != 'user' && item.name != 'UserManager' && item.name != 'region' && item.name != 'shelve' && item.name !='supplier'))
            Cookie.set('mangeMenu',JSON.stringify(a))
        },
        //是否缩动
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        //更改面包屑数据
        selectMenu(state , val){
            //判断添加的数据是否为首页，不是的话就加进去
            if(val.name !== 'home'){
                const index = state.tabslist.findIndex(item => item.name === val.name)
                //如果不存在,index的值返回的是-1,存在就返回index值
                if(index === -1){
                    state.tabslist.push(val)
                }
            }
        },
        //删除指定的tag数据
        closeTag(state,item){
            const index = state.tabslist.findIndex(val => val.name === item.name)
            state.tabslist.splice(index,1)
        }
    }
}