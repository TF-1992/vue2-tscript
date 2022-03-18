module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
    // "@vue/prettier/@typescript-eslint", //注意顺序

  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: "babel-eslint"
  },
  rules: {
    // "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    // "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // "prettier/prettier": "off", //关闭prettier的提示
    "prettier/prettier":['off',{
      'end0fLine':'auto'
    }],
    "vue/html-self-closing": "off",
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    quotes: 0, // 字符串允许使用“”，‘’
    // "no-console": 1, // 允许使用console
    indent: ["error", 2],
    semi: ["error", "always"], // 语句后分号设置;
    "semi-style": ["error", "last"],
    "linebreak-style": [0, "error", "unix"],  //换行符
    "comma-dangle": 'off', // 要求或禁止使用拖尾逗号
    "comma-style": ["error", "last"], // 要求逗号放在数组元素、对象属性或变量声明之后，且在同一行
    // "no-cond-assign": ["error", "always"],    //禁止条件表达式中出现赋值操作符
    "no-empty-function": 1, // 禁止空函数
    "func-call-spacing": ["error", "never"], // 在函数标识符和其调用之间有空格
    "space-before-function-paren": ["error", "never"], // 函数圆括号之前有一个空格
    "no-empty": 2,//块语句中的内容不能为空
    "no-eq-null": 2,//禁止对null使用==或!=运算符
    "no-func-assign": 2,//禁止重复的函数声明
    "no-var": 0,//禁用var，用let和const代替
    "camelcase": 2,//强制驼峰法命名
    "complexity": [0, 11],//循环复杂度
    "default-case": 1,//switch语句最后必须有default
    "eqeqeq": 2,//必须使用全等
    "key-spacing": [0, { "beforeColon": false, "afterColon": true }],//对象字面量中冒号的前后空格
    "newline-after-var": 2,//变量声明后是否需要空一行
    "object-shorthand": 0,//强制对象字面量缩写语法
    // 'endOfLine': 0,

  }
};
