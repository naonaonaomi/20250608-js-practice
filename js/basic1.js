// 1. 変数とデータ型
if (document.getElementById('btn1')) {
  document.getElementById('btn1').addEventListener('click', function() {
    let num = 10;
    const str = "こんにちは";
    let flag = true;
    let obj = { name: "Taro" };
    let arr = [1, 2, 3];
    // ボタン1クリック時、各種データ型の変数を作成し結果を表示
    document.getElementById('result1').textContent =
      `num: ${num}, str: ${str}, flag: ${flag}, obj.name: ${obj.name}, arr: [${arr}]`;
  });
}

// 2. 演算子
if (document.getElementById('btn2')) {
  document.getElementById('btn2').addEventListener('click', function() {
    let a = 5;
    let b = 3;
    let sum = a + b;
    let isEqual = (a === b);
    let logic = (a > 2 && b < 5);
    // ボタン2クリック時、四則演算や論理演算の結果を表示
    document.getElementById('result2').textContent =
      `a + b = ${sum}, a === b: ${isEqual}, (a > 2 && b < 5): ${logic}`;
  });
}

// 3. 制御構文
if (document.getElementById('btn3')) {
  document.getElementById('btn3').addEventListener('click', function() {
    let msg = "";
    for(let i=1; i<=3; i++) {
      if(i % 2 === 0) {
        msg += i + "は偶数\n";
      } else {
        msg += i + "は奇数\n";
      }
    }
    // ボタン3クリック時、for文とif文で偶数・奇数を判定して表示
    document.getElementById('result3').textContent = msg;
  });
}

// 4. 関数
if (document.getElementById('btn4')) {
  document.getElementById('btn4').addEventListener('click', function() {
    function greet(name) {
      return "こんにちは、" + name + "さん";
    }
    const arrow = (x) => x * 2;
    let res = greet("太郎") + ", 2*5=" + arrow(5);
    // ボタン4クリック時、通常関数とアロー関数の例を表示
    document.getElementById('result4').textContent = res;
  });
}

// 5. オブジェクトと配列
if (document.getElementById('btn5')) {
  document.getElementById('btn5').addEventListener('click', function() {
    let user = { name: "Hanako", age: 20 };
    let nums = [10, 20, 30];
    nums.push(40);
    let names = ["A", "B", "C"];
    let upper = names.map(n => n.toUpperCase());
    // ボタン5クリック時、オブジェクトや配列の操作例を表示
    document.getElementById('result5').textContent =
      `user: ${user.name}(${user.age}), nums: [${nums}], upper: [${upper}]`;
  });
}

// 5.5 配列操作
if (document.getElementById('btnArray')) {
  document.getElementById('btnArray').addEventListener('click', function() {
    let arr = [1, 2, 3, 4, 5];
    let pushed = [...arr]; pushed.push(6);
    let popped = [...arr]; popped.pop();
    let shifted = [...arr]; shifted.shift();
    let unshifted = [...arr]; unshifted.unshift(0);
    let spliced = [...arr]; spliced.splice(2, 1, 99);
    let mapped = arr.map(x => x * 2);
    let filtered = arr.filter(x => x % 2 === 0);
    let found = arr.find(x => x > 3);
    let msg = `元配列: [${arr}]\n` +
      `push(6): [${pushed}]\n` +
      `pop(): [${popped}]\n` +
      `shift(): [${shifted}]\n` +
      `unshift(0): [${unshifted}]\n` +
      `splice(2,1,99): [${spliced}]\n` +
      `map(x*2): [${mapped}]\n` +
      `filter(偶数): [${filtered}]\n` +
      `find(>3): ${found}`;
    // ボタンArrayクリック時、配列操作の例を表示
    document.getElementById('resultArray').textContent = msg;
  });
}

// 6. イベントとDOM操作
if (document.getElementById('btn6')) {
  document.getElementById('btn6').addEventListener('click', function() {
    document.getElementById('demo').textContent = "変更されました！";
    // ボタン6クリック時、DOMのテキストを書き換え
  });
}

// 7. エラー処理
if (document.getElementById('btn7')) {
  document.getElementById('btn7').addEventListener('click', function() {
    try {
      throw new Error("エラー発生！");
    } catch (e) {
      // ボタン7クリック時、try-catchでエラー処理の例を表示
      document.getElementById('result7').textContent = e.message;
    }
  });
}

// 8. ES6以降の新機能
if (document.getElementById('btn8')) {
  document.getElementById('btn8').addEventListener('click', function() {
    const user = { name: "Jiro", age: 18 };
    const { name, age } = user;
    const arr1 = [1,2];
    const arr2 = [...arr1, 3];
    const msg = `名前: ${name}, 年齢: ${age}, arr2: [${arr2}]`;
    // ボタン8クリック時、分割代入やスプレッド構文の例を表示
    document.getElementById('result8').textContent = msg;
  });
} 