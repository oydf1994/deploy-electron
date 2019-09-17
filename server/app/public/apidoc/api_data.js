define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "app/public/apidoc/main.js",
    "group": "F__project_egg_app_public_apidoc_main_js",
    "groupTitle": "F__project_egg_app_public_apidoc_main_js",
    "name": ""
  },
  {
    "type": "post",
    "url": "/login",
    "title": "登陆",
    "name": "__",
    "group": "Home",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pwd",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "返回值": [
          {
            "group": "返回值",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>用户令牌</p>"
          }
        ]
      }
    },
    "filename": "app/router.js",
    "groupTitle": "Home"
  },
  {
    "type": "get",
    "url": "/",
    "title": "首页",
    "name": "get",
    "group": "Home",
    "version": "1.0.0",
    "filename": "app/router.js",
    "groupTitle": "Home"
  }
] });
