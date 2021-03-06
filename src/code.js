/*
 * js代码片段
 */

{
  // 浮点数取整

  const x = 123.4545;
  x >> 0; // 123
  ~~x; // 123
  x | 0; // 123
  Math.floor(x); // 123

  // 注意：前三种方法只适用于32个位整数，对于负数的处理上和Math.floor是不同的。
  Math.floor(-12.53); // -13
  12.53 | 0; // -12

}

{
  // 生成6位数字验证码

  // 方法一
  ('000000' + Math.floor(Math.random() * 999999)).slice(-6);

  // 方法二
  Math.random().toString().slice(-6);

  // 方法三
  Math.random().toFixed(6).slice(-6);

  // 方法四
  '' + Math.floor(Math.random() * 999999);
}

{
  // 16进制颜色代码生成

  function randomColor() {

    return '#' + ('000000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
  }

  // console.log(randomColor());
}

{
  // 驼峰命名转下滑下

  let a = 'comMaBcuiRh'.match(/^[a-z][a-z0-9]+|[A-Z][a-z0-9]*/g).join('_').toLowerCase();

  // console.log(a);
}

{
  // url查询参数转json格式

  // ES6
  const query = (search = '') => ((querystring = '') => (q => (querystring.split('&').forEach(item => (kv => kv[0] && (q[kv[0]] = kv[1]))(item.split('='))), q))({}))(search.split('?')[1]);

  // 对应ES5实现
  var queryEs5 = function(search) {
    if (search === void 0) { search = ''; }
    return (function(querystring) {
      if (querystring === void 0) { querystring = ''; }
      return (function(q) {
        return (querystring.split('&').forEach(function(item) {
          return (function(kv) {
            return kv[0] && (q[kv[0]] = kv[1]);
          })(item.split('='));
        }), q);
      })({});
    })(search.split('?')[1]);
  };

  query('adsda?key1=value1&key2=value2'); // es6.html:14 {key1: "value1", key2: "value2"}
  // console.log(a);
}

{
  // 获取url参数

  function getQueryString(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  }
}

{
  // n维数组展开成一维数组

  let foo = [1, [2, 3],
    ['4', 5, [8]],
    [9], 10
  ];

  // 方法一
  // 限制：数组项不能出现`,`，同时数组项全部变成了字符数字
  foo.toString().split(','); // [ '1', '2', '3', '4', '5', '8', '9', '10' ]

  // 方法二
  // 转换后数组项全部变成数字
  eval('[' + foo + ']'); // [ 1, 2, 3, 4, 5, 8, 9, 10 ]

  // 方法三，使用es6展开操作符
  // 写法太过麻烦，太过死板
  [1, ...[2, 3], ...['4', 5, ...['6', 7, ...[8]]], ...[9], 10]; // [ 1, 2, 3, '4', 5, '6', 7, 8, 9, 10 ]

  // 方法四
  JSON.parse(`[${JSON.stringify(foo).replace(/\[|]/g, '')}]`); // [ 1, 2, 3, '4', 5, 8, 9, 10 ]

  // 方法五
  // const flatten = (ary) => ary.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
  // flatten(foo); // [ 1, 2, 3, '4', 5, 8, 9, 10 ]

  // 方法六
  function flatten(a) {
    return Array.isArray(a) ? [].concat(...a.map(flatten)) : a;
  }
  flatten(foo); // [ 1, 2, 3, '4', 5, 8, 9, 10 ]
}

{
  // 日期格式化

  // 方法一
  function format1(x, y) {
    var z = {
      y: x.getFullYear(),
      M: x.getMonth() + 1,
      d: x.getDate(),
      h: x.getHours(),
      m: x.getMinutes(),
      s: x.getSeconds()
    };

    return y.replace(/(y+|M+|d+|h+|m+|s+)/g, function(v) {
      return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-(v.length > 2 ? v.length : 2))
    });
  }

  let data = new Date('2018-04-08 01:00:00');
  format1(data, 'yyyy-MM-dd hh:mm:ss'); // 2018-04-08 01:00:00

  // 方法二
  Date.prototype.format = function(fmt) {
    var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  }

  data.format('yy-M-d h:m:s'); // 18-4-8 1:0:0
}

{
  // 统计文字个数

  function wordCount(data) {
    var pattern = /[a-zA-Z0-9_\u0392-\u03c9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g;
    var m = data.match(pattern);
    var count = 0;

    if (m === null) {
      return count;
    }

    for (var i = 0, len = m.length; i < len; i++) {
      if (m[i].charCodeAt(0) >= 0x4E00) {
        count += m[i].length;
      } else {
        count += 1;
      }
    }
    return count;
  }

  var text = '贷款买房，也意味着你能给自己的资产加杠杆，能够撬动更多的钱，来孳生更多的财务性收入。';
  wordCount(text); // 38
}

{
  // 特殊字符转义

  function htmlspecialchars(str) {
    var str = str.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/ /g, '&nbsp;');

    return str;
  }

  htmlspecialchars(' &jfsssd<sc/>'); // &nbsp;&amp;jfsssd&lt;sc/&gt;
}

{
  // 动态插入js

  function injectScript(src) {
    var s, t;
    s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = src;
    t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);
  }
}

{
  // 格式化数量

  // 方法一
  function formatNum(num, n) {
    if (typeof num === 'number') {
      num = String(num.toFixed(n || 0));
      var re = /(-?\d+)(\d{3})/;
      while (re.test(num)) {
        num = num.replace(re, '$1,$2');
      }
      return num;
    }
    return num
  }

  formatNum(21457556, 3); // 21,457,556.000

  // 方法二
  '23455775'.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 23,455,775

  // 方法三
  function formatNum3(str) {
    return str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + ',')) + prev;
    });
  }

  formatNum3('25645666'); // 25,645,666
}

{
  // 身份证验证

  function chechCHNCardId(id) {
    // 1 "验证通过!", 0 //校验不通过
    var format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
    //号码规则校验
    if (!format.test(id)) {
      return false;
    }
    //区位码校验
    //出生年月日校验   前正则限制起始年份为1900;
    var year = id.substr(6, 4), //身份证年
      month = id.substr(10, 2), //身份证月
      date = id.substr(12, 2), //身份证日
      time = Date.parse(month + '-' + date + '-' + year), //身份证日期时间戳date
      now_time = Date.parse(new Date()), //当前时间戳
      dates = (new Date(year, month, 0)).getDate(); //身份证当月天数
    if (time > now_time || date > dates) {
      return { 'status': 0, 'msg': '出生日期不合规' }
    }
    //校验码判断
    var c = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //系数
    var b = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'); //校验码对照表
    var id_array = id.split("");
    var sum = 0;
    for (var k = 0; k < 17; k++) {
      sum += parseInt(id_array[k]) * parseInt(c[k]);
    }
    if (id_array[17].toUpperCase() != b[sum % 11].toUpperCase()) {
      return false;
    }
    return true;
  }

  chechCHNCardId('510781199110117419'); // true
}

{
  // 统计字符串中相同字符出现的次数

  let arr = 'abcdaabc';
  let info = arr
    .split('')
    .reduce((p, k) => (p[k]++ || (p[k] = 1), p), {});
  console.log(info); // { a: 3, b: 2, c: 2, d: 1 }
}

{
  // 使用void 0来解决undefined被污染问题
  undefined = 1;
  !!undefined; // true
  !!void(0); // false
}

{
  // 单行写一个评级组件
  "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
}

{
  // JavaScript 错误处理的方式的正确姿势
  try {
    something
  } catch (e) {
    window.location.href =
      "http://stackoverflow.com/search?q=[js]+" +
      e.message;
  }
}

{
  // 匿名函数自执行写法
  (function() {}());
  (function() {})();
  [function() {}()];

  ~ function() {}();
  ! function() {}(); +
  function() {}(); -
  function() {}();

  delete

  function() {}();
  typeof

  function() {}();
  void

  function() {}();
  new function() {}();
  new function() {};

  var f = function() {}();

  1,
  function() {}();
  1 ^ function() {}();
  1 > function() {}();
}

{
  // 两个整数交换数值
  var a = 20,
    b = 30;
  a ^= b;
  b ^= a;
  a ^= b;

  a; // 30
  b; // 20
}

{
  // 数字字符转数字
  var a = '1'; +
  a; // 1
}

{
  // 最短的代码实现数组去重
  [...new Set([1, "1", 2, 1, 1, 3])]; // [1, "1", 2, 3]
}

{
  // 用最短的代码实现一个长度为m(6)且值都n(8)的数组
  Array(6).fill(8); // [8, 8, 8, 8, 8, 8]
}

{
  // 将argruments对象转换成数组
  var argArray = Array.prototype.slice.call(arguments);

  // ES6：
  var argArray = Array.from(arguments)

  // or
  var argArray = [...arguments];
}

{
  // 获取日期时间缀
  // 获取指定时间的时间缀
  new Date().getTime();
  (new Date()).getTime();
  (new Date).getTime();
  // 获取当前的时间缀
  Date.now();
  // 日期显示转换为数字
  +
  new Date();
}

{
  // 使用~x.indexOf('y')来简化x.indexOf('y') > -1
  var str = 'hello world';
  if (str.indexOf('lo') > -1) {
    // ...
  }

  if (~str.indexOf('lo')) {
    // ...
  }
}

{
  // parseInt() or Number()
  // 两者的差别之处在于解析和转换两者之间的理解。

  // 解析允许字符串中含有非数字字符，解析按从左到右的顺序，如果遇到非数字字符就停止。而转换不允许出现非数字字符，否者会失败并返回NaN。

  var a = '520';
  var b = '520px';

  Number(a); // 520
  parseInt(a); // 520

  Number(b); // NaN
  parseInt(b); // 520

  // parseInt方法第二个参数用于指定转换的基数，ES5默认为10进制。
  parseInt('10', 2); // 2
  parseInt('10', 8); // 8
  parseInt('10', 10); // 10
  parseInt('10', 16); // 16

  // 对于网上parseInt(0.0000008)的结果为什么为8，原因在于0.0000008转换成字符为"8e-7"，然后根据parseInt的解析规则自然得到"8"这个结果。
}

{
  // +拼接操作，+x or String(x)？
  // +运算符可用于数字加法，同时也可以用于字符串拼接。如果+的其中一个操作符是字符串(或者通过 隐式强制转换可以得到字符串)，则执行字符串拼接；否者执行数字加法。

  // 需要注意的时对于数组而言，不能通过valueOf()方法得到简单基本类型值，于是转而调用toString()方法。
  [1, 2] + [3, 4]; // "1,23,4"

  // 对于对象同样会先调用valueOf()方法，然后通过toString()方法返回对象的字符串表示。
  var a = {};
  a + 123; // "[object Object]123"

  // 对于a + ""隐式转换和String(a)显示转换有一个细微的差别：a + ''会对a调用valueOf()方法，而String()直接调用toString()方法。大多数情况下我们不会考虑这个问题，除非真遇到。
  var a = {
    valueOf: function() { return 42; },
    toString: function() { return 4; }
  }

  a + ''; // 42
  String(a); // 4
}

{
  // 判断对象的实例
  // 方法一: ES3
  function Person(name, age) {
    if (!(this instanceof Person)) {
      return new Person(name, age);
    }
    this.name = name;
    this.age = age;
  }

  // 方法二: ES5
  function Person(name, age) {
    var self = this instanceof Person ? this : Object.create(Person.prototype);
    self.name = name;
    self.age = age;

    return self;
  }

  // 方法三：ES6
  function Person(name, age) {
    if (!new.target) {
      throw 'Peron must called with new';
    }
    this.name = name;
    this.age = age;
  }
}

{
  // 数据安全类型检查
  // 对象
  function isObject(value) {
    return Object.prototype.toString.call(value).slice(8, -1) === 'Object';
  }

  // 数组
  function isArray(value) {
    return Object.prototype.toString.call(value).slice(8, -1) === 'Array';
  }

  // 函数
  function isFunction(value) {
    return Object.prototype.toString.call(value).slice(8, -1) === 'Function';
  }
}

{
  // 让数字的字面值看起来像对象
  2. toString(); // Uncaught SyntaxError: Invalid or unexpected token

  2..toString(); // 第二个点号可以正常解析
  2. toString(); // 注意点号前面的空格
  (2).toString(); // 2先被计算
}

{
  // 对象可计算属性名(仅在ES6中)
  var suffix = ' name';
  var person = {
    ['first' + suffix]: 'Nicholas',
    ['last' + suffix]: 'Zakas'
  }

  person['first name']; // "Nicholas"
  person['last name']; // "Zakas"
}

{
  // 数字四舍五入
  // v: 值，p: 精度
  function(v, p) {
    p = Math.pow(10, p >>> 31 ? 0 : p | 0)
    v *= p;
    return (v + 0.5 + (v >> 31) | 0) / p
  }

  round(123.45353, 2); // 123.45
}

{
  // 在浏览器中根据url下载文件
  function download(url) {
    var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    var isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;

    if (isChrome || isSafari) {
      var link = document.createElement('a');
      link.href = url;

      if (link.download !== undefined) {
        var fileName = url.substring(url.lastIndexOf('/') + 1, url.length);
        link.download = fileName;
      }

      if (document.createEvent) {
        var e = document.createEvent('MouseEvents');
        e.initEvent('click', true, true);
        link.dispatchEvent(e);
        return true;
      }
    }

    if (url.indexOf('?') === -1) {
      url += '?download';
    }

    window.open(url, '_self');
    return true;
  }
}

{
  // 快速生成UUID
  function uuid() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  };

  uuid(); // "33f7f26656cb-499b-b73e-89a921a59ba6"
}

{
  // JavaScript浮点数精度问题
  function isEqual(n1, n2, epsilon) {
    epsilon = epsilon == undefined ? 10 : epsilon; // 默认精度为10
    return n1.toFixed(epsilon) === n2.toFixed(epsilon);
  }

  0.1 + 0.2; // 0.30000000000000004
  isEqual(0.1 + 0.2, 0.3); // true

  0.7 + 0.1 + 99.1 + 0.1; // 99.99999999999999
  isEqual(0.7 + 0.1 + 99.1 + 0.1, 100); // true
}

{
  // 格式化表单数据
  function formatParam(obj) {
    var query = '',
      name, value, fullSubName, subName, subValue, innerObj, i;

    for (name in obj) {
      value = obj[name];

      if (value instanceof Array) {
        for (i = 0; i < value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += formatParam(innerObj) + '&';
        }
      } else if (value instanceof Object) {
        for (subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += formatParam(innerObj) + '&';
        }
      } else if (value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }
    return query.length ? query.substr(0, query.length - 1) : query;
  }

  var param = {
    name: 'jenemy',
    likes: [0, 1, 3],
    memberCard: [
      { title: '1', id: 1 },
      { title: '2', id: 2 }
    ]
  }

  formatParam(param); // "name=12&likes%5B0%5D=0&likes%5B1%5D=1&likes%5B2%5D=3&memberCard%5B0%5D%5Btitle%5D=1&memberCard%5B0%5D%5Bid%5D=1&memberCard%5B1%5D%5Btitle%5D=2&memberCard%5B1%5D%5Bid%5D=2"
}

{
  // 创建指定长度非空数组
  // 在JavaScript中可以通过new Array(3)的形式创建一个长度为3的空数组。在老的Chrome中其值为[undefined x 3]，在最新的Chrome中为[empty x 3]，即空单元数组。在老Chrome中，相当于显示使用[undefined, undefined, undefined]的方式创建长度为3的数组。

  // 但是，两者在调用map()方法的结果是明显不同的

  var a = new Array(3);
  var b = [undefined, undefined, undefined];

  a.map((v, i) => i); // [empty × 3]
  b.map((v, i) => i); // [0, 1, 2]

  // 多数情况我们期望创建的是包含undefined值的指定长度的空数组，可以通过下面这种方法来达到目的：
  var a = Array.apply(null, { length: 3 });

  a; // [undefined, undefined, undefined]
  a.map((v, i) => i); // [0, 1, 2]

  // 总之，尽量不要创建和使用空单元数组。
}
