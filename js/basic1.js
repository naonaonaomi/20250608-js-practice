(function() {
  // DOM取得ユーティリティ
  const $ = (id) => document.getElementById(id);

  // ボタンと結果IDのペア
  const actions = [
    {
      btn: 'btn1',
      result: 'result1',
      handler: () => {
        let num = 10;
        const str = "こんにちは";
        let flag = true;
        let obj = { name: "Taro" };
        let arr = [1, 2, 3];
        return `num: ${num}, str: ${str}, flag: ${flag}, obj.name: ${obj.name}, arr: [${arr}]`;
      }
    },
    {
      btn: 'btn2',
      result: 'result2',
      handler: () => {
        let a = 5;
        let b = 3;
        let sum = a + b;
        let isEqual = (a === b);
        let logic = (a > 2 && b < 5);
        return `a + b = ${sum}, a === b: ${isEqual}, (a > 2 && b < 5): ${logic}`;
      }
    },
    {
      btn: 'btn3',
      result: 'result3',
      handler: () => {
        let msg = "";
        for(let i=1; i<=3; i++) {
          msg += i + (i % 2 === 0 ? "は偶数\n" : "は奇数\n");
        }
        return msg;
      }
    },
    {
      btn: 'btn4',
      result: 'result4',
      handler: () => {
        function greet(name) {
          return "こんにちは、" + name + "さん";
        }
        const arrow = (x) => x * 2;
        return greet("太郎") + ", 2*5=" + arrow(5);
      }
    },
    {
      btn: 'btn5',
      result: 'result5',
      handler: () => {
        let user = { name: "Hanako", age: 20 };
        let nums = [10, 20, 30];
        nums.push(40);
        let names = ["A", "B", "C"];
        let upper = names.map(n => n.toUpperCase());
        return `user: ${user.name}(${user.age}), nums: [${nums}], upper: [${upper}]`;
      }
    },
    {
      btn: 'btnArray',
      result: 'resultArray',
      handler: () => {
        let arr = [1, 2, 3, 4, 5];
        let pushed = [...arr]; pushed.push(6);
        let popped = [...arr]; popped.pop();
        let shifted = [...arr]; shifted.shift();
        let unshifted = [...arr]; unshifted.unshift(0);
        let spliced = [...arr]; spliced.splice(2, 1, 99);
        let mapped = arr.map(x => x * 2);
        let filtered = arr.filter(x => x % 2 === 0);
        let found = arr.find(x => x > 3);
        return `元配列: [${arr}]\n` +
          `push(6): [${pushed}]\n` +
          `pop(): [${popped}]\n` +
          `shift(): [${shifted}]\n` +
          `unshift(0): [${unshifted}]\n` +
          `splice(2,1,99): [${spliced}]\n` +
          `map(x*2): [${mapped}]\n` +
          `filter(偶数): [${filtered}]\n` +
          `find(>3): ${found}`;
      }
    },
    {
      btn: 'btn6',
      result: 'demo',
      handler: () => "変更されました！"
    },
    {
      btn: 'btn7',
      result: 'result7',
      handler: () => {
        try {
          throw new Error("エラー発生！");
        } catch (e) {
          return e.message;
        }
      }
    },
    {
      btn: 'btn8',
      result: 'result8',
      handler: () => {
        const user = { name: "Jiro", age: 18 };
        const { name, age } = user;
        const arr1 = [1,2];
        const arr2 = [...arr1, 3];
        return `名前: ${name}, 年齢: ${age}, arr2: [${arr2}]`;
      }
    }
  ];

  // イベント登録
  actions.forEach(({btn, result, handler}) => {
    const button = $(btn);
    const resultEl = $(result);
    if (button && resultEl) {
      button.addEventListener('click', () => {
        resultEl.textContent = handler();
      });
    }
  });
})(); 