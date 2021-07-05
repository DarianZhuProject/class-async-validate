# `class-async-validate`

> 基于`async-validator`库实现的一个通过定义类的方式来进行场景以及普通校验的类库。

## 安装

```shell

npm install class-async-validate

# 或
yarn add class-async-validate

```


## 使用

### TS使用方式

> 创建一个类文件`UserValidate`

```ts
import { BaseValidate, Scenes, ValidateRules } from 'class-async-validate';

export default class UserValidate extends BaseValidate {
    /**
     * 验证规则部分
     */
    rules():ValidateRules {
        return {
            username: [
                { type: 'string', required: true, message: '账号不能为空' },
                { max: 10, min: 6, message: '账号必须在6-10位之间' },
            ],
            password: [
                { type: 'string', required: true, message: '密码不能为空' },
            ],
        };
    }

    /**
     * 验证场景部分
     */
    scenes():Scenes {
        return {
            create: [ 'username' ],
        };
    }
}
```
> 在egg中的使用方式如下,其他的如express、koa中的使用方式雷同

```ts
import { Controller } from 'egg';
import UserValidate from '../validate/user';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    const validator = new UserValidate();
    const [ err, res ] = await validator.setScene('create').check(ctx.request.query);
    console.log(res, JSON.stringify(err));
  }
}
```

### JS使用方式

> 创建一个`UserValidate.js`的文件
```js
'use strict';
const { BaseValidate } = require('class-async-validate');
class UserValidate extends BaseValidate {
  rules() {
    return {
      id: { type: 'number', required: true, message: 'id只能是数字' },
      username: { type: 'string', required: true, message: '用户名不能为空' },
      password: [
        { type: 'string', required: true, message: '密码不能为空' },
        { min: 6, max: 20, message: '密码只能在6到20位之间' },
      ],
    };
  }

  scenes() {
    return {
      create: [ 'username', 'password' ],
      update: [ 'id', 'username', 'password' ],
    };
  }
}

module.exports = UserValidate;
```

> 在`egg`中的使用方式如下，其他框架雷同。

```js
'use strict';

const Controller = require('egg').Controller;
const UserValidate = require('../validate/user/index');
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const userValidate = new UserValidate();
    const [ err, res ] = await userValidate.setScene('create').check(ctx.request.query);
    console.log(err, JSON.stringify(res));
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
```

### 需要注意的是

* 场景不需要可以不设置。
* 自定义规则目前是遵守`async-validator`的校验规则的方式，后续我们会增加新的自定义规则的方法。
