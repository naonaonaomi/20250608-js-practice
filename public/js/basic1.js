(function() {
  // DOM取得ユーティリティ
  const $ = (id) => document.getElementById(id);
  
  // コンソール出力をキャプチャして画面に表示する関数
  function captureConsoleOutput(func) {
    let output = [];
    const originalLog = console.log;
    
    // console.logを一時的に置き換え
    console.log = (...args) => {
      // 引数を文字列に変換
      const message = args.map(arg => {
        if (typeof arg === 'object') {
          return JSON.stringify(arg, null, 2);
        }
        return String(arg);
      }).join(' ');
      output.push(message);
      originalLog(...args); // 元のconsole.logも実行
    };
    
    try {
      func();
    } finally {
      // console.logを元に戻す
      console.log = originalLog;
    }
    
    return output;
  }

  // ボタンと結果IDのペア
  const actions = [
    {
      btn: 'btn1',
      result: 'result1',
      handler: () => {
        return captureConsoleOutput(() => {
          // 数値
          let age = 25;
          console.log("年齢:", age);

          // 文字列
          let name = "田中太郎";
          console.log("名前:", name);

          // 真偽値
          let isStudent = true;
          console.log("学生か:", isStudent);

          // オブジェクト
          let person = { name: "佐藤", age: 30 };
          console.log("人物:", person);

          // 配列
          let colors = ["赤", "青", "緑"];
          console.log("色:", colors);
        });
      }
    },
    {
      btn: 'btn2',
      result: 'result2',
      handler: () => {
        return captureConsoleOutput(() => {
          // 算術演算子
          let x = 10;
          let y = 3;
          console.log("x + y =", x + y);
          console.log("x - y =", x - y);
          console.log("x * y =", x * y);
          console.log("x / y =", x / y);

          // 比較演算子
          console.log("x > y:", x > y);
          console.log("x === y:", x === y);

          // 論理演算子
          let isAdult = x > 18;
          let hasLicense = true;
          console.log("運転可能:", isAdult && hasLicense);
        });
      }
    },
    {
      btn: 'btn3',
      result: 'result3',
      handler: () => {
        return captureConsoleOutput(() => {
          // if文の例
          let score = 85;
          if (score >= 90) {
              console.log("優秀です！");
          } else if (score >= 70) {
              console.log("良い成績です");
          } else {
              console.log("もう少し頑張りましょう");
          }

          // forループの例
          console.log("--- 1から5まで ---");
          for (let i = 1; i <= 5; i++) {
              console.log(`${i}回目のループ`);
          }
        });
      }
    },
    {
      btn: 'btn4',
      result: 'result4',
      handler: () => {
        return captureConsoleOutput(() => {
          // 通常の関数
          function greet(name) {
              return `こんにちは、${name}さん！`;
          }

          // アロー関数
          const double = (num) => num * 2;

          // 関数の実行
          console.log(greet("山田"));
          console.log("5の2倍は:", double(5));

          // 引数が複数の関数
          const add = (a, b) => {
              let result = a + b;
              return `${a} + ${b} = ${result}`;
          }
          console.log(add(3, 7));
        });
      }
    },
    {
      btn: 'btn5',
      result: 'result5',
      handler: () => {
        return captureConsoleOutput(() => {
          // オブジェクトの作成と操作
          let student = {
              name: "鈴木花子",
              age: 20,
              grade: "A"
          };
          console.log("学生情報:", student);
          console.log("名前:", student.name);

          // 配列の作成と操作
          let fruits = ["りんご", "バナナ", "オレンジ"];
          console.log("果物リスト:", fruits);
          fruits.push("ぶどう");
          console.log("ぶどう追加後:", fruits);
          console.log("最初の果物:", fruits[0]);
        });
      }
    },
    {
      btn: 'btnArray',
      result: 'resultArray',
      handler: () => {
        return captureConsoleOutput(() => {
          let numbers = [1, 2, 3, 4, 5];
          console.log("元の配列:", numbers);

          // map: 各要素を変換
          let doubled = numbers.map(num => num * 2);
          console.log("2倍にした配列:", doubled);

          // filter: 条件に合う要素だけ抽出
          let evenNumbers = numbers.filter(num => num % 2 === 0);
          console.log("偶数だけ:", evenNumbers);

          // find: 条件に合う最初の要素を取得
          let foundNumber = numbers.find(num => num > 3);
          console.log("3より大きい最初の数:", foundNumber);

          // forEach: 各要素に対して処理実行
          console.log("--- 各要素の表示 ---");
          numbers.forEach((num, index) => {
              console.log(`${index}番目: ${num}`);
          });
        });
      }
    },
    {
      btn: 'btn6',
      result: 'result6',
      handler: () => {
        return captureConsoleOutput(() => {
          // 要素を取得
          let targetElement = document.getElementById('demo');
          console.log("取得した要素:", targetElement);

          // 要素の内容を変更
          targetElement.textContent = "JavaScriptで変更されました！";
          console.log("テキストを変更しました");

          // 要素のスタイルも変更
          targetElement.style.color = "blue";
          targetElement.style.fontWeight = "bold";
          console.log("スタイルも変更しました");
        });
      }
    },
    {
      btn: 'btn7',
      result: 'result7',
      handler: () => {
        return captureConsoleOutput(() => {
          try {
              console.log("処理を開始します");
              
              // わざとエラーを発生させる
              let result = 10 / 0;  // 0で割る
              if (!isFinite(result)) {
                  throw new Error("不正な計算結果です");
              }
              
          } catch (error) {
              console.log("エラーが発生:", error.message);
              console.log("エラーを正常に処理しました");
          } finally {
              console.log("処理を終了します");
          }
        });
      }
    },
    {
      btn: 'btn8',
      result: 'result8',
      handler: () => {
        return captureConsoleOutput(() => {
          // テンプレートリテラル
          let userName = "田中";
          let userAge = 25;
          let message = `ユーザー名: ${userName}, 年齢: ${userAge}歳`;
          console.log(message);

          // 分割代入
          let user = { name: "佐藤", age: 30, city: "東京" };
          let { name, age, city } = user;
          console.log(`${name}さんは${age}歳、${city}在住です`);

          // スプレッド構文
          let arr1 = [1, 2, 3];
          let arr2 = [...arr1, 4, 5];
          console.log("元の配列:", arr1);
          console.log("拡張した配列:", arr2);
        });
      }
    }
  ];

  // イベント登録
  actions.forEach(({btn, result, handler}) => {
    const button = $(btn);
    const resultEl = $(result);
    if (button && resultEl) {
      button.addEventListener('click', () => {
        const output = handler();
        if (Array.isArray(output)) {
          resultEl.innerHTML = output.map(line => `<div>${line}</div>`).join('');
        } else {
          resultEl.textContent = output;
        }
        resultEl.style.backgroundColor = '#f0f8ff';
        resultEl.style.border = '1px solid #ddd';
        resultEl.style.padding = '10px';
        resultEl.style.margin = '10px 0';
        resultEl.style.fontFamily = 'monospace';
      });
    }
  });
})(); 