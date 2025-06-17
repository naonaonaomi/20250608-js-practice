/**
 * ==========================================
 * JavaScript基礎1: 変数、データ型、基本文法
 * ==========================================
 */

(function() {
  'use strict';

  // ========================================
  // ユーティリティ関数
  // ========================================

  /**
   * DOM要素を取得するユーティリティ関数
   * @param {string} id - 要素のID
   * @returns {HTMLElement|null} DOM要素
   */
  const $ = (id) => document.getElementById(id);

  /**
   * コンソール出力をキャプチャして画面に表示する関数
   * @param {Function} func - 実行する関数
   * @returns {Array} 出力の配列
   */
  function captureConsoleOutput(func) {
    const output = [];
    const originalLog = console.log;
    
    // console.logを一時的に置き換え
    console.log = (...args) => {
      const message = args.map(arg => {
        if (typeof arg === 'object' && arg !== null) {
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

  /**
   * 結果を画面に表示する関数
   * @param {HTMLElement} resultElement - 結果表示要素
   * @param {Array|string} output - 表示する内容
   */
  function displayResult(resultElement, output) {
    if (Array.isArray(output)) {
      resultElement.innerHTML = output.map(line => `<div>${line}</div>`).join('');
    } else {
      resultElement.textContent = output;
    }
    
    // 結果表示のスタイル設定
    resultElement.style.padding = '10px';
    resultElement.style.margin = '10px 0';
    resultElement.style.fontFamily = 'monospace';
  }

  // ========================================
  // ボタンアクション定義
  // ========================================

  const actions = [
    {
      btnId: 'btn1',
      resultId: 'result1',
      description: '変数とデータ型',
      handler: () => {
        return captureConsoleOutput(() => {
          // 数値
          const age = 25;
          console.log("年齢:", age);

          // 文字列
          const name = "田中太郎";
          console.log("名前:", name);

          // 真偽値
          const isStudent = true;
          console.log("学生か:", isStudent);

          // オブジェクト
          const person = { name: "佐藤", age: 30 };
          console.log("人物:", person);

          // 配列
          const colors = ["赤", "青", "緑"];
          console.log("色:", colors);
        });
      }
    },
    
    {
      btnId: 'btn2',
      resultId: 'result2',
      description: '演算子',
      handler: () => {
        return captureConsoleOutput(() => {
          // 算術演算子
          const x = 10;
          const y = 3;
          console.log("x + y =", x + y);
          console.log("x - y =", x - y);
          console.log("x * y =", x * y);
          console.log("x / y =", x / y);

          // 比較演算子
          console.log("x > y:", x > y);
          console.log("x === y:", x === y);

          // 論理演算子
          const isAdult = x > 18;
          const hasLicense = true;
          console.log("運転可能:", isAdult && hasLicense);
        });
      }
    },
    
    {
      btnId: 'btn3',
      resultId: 'result3',
      description: '制御文（if文、forループ）',
      handler: () => {
        return captureConsoleOutput(() => {
          // if文の例
          const score = 85;
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
      btnId: 'btn4',
      resultId: 'result4',
      description: '関数',
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
            const result = a + b;
            return `${a} + ${b} = ${result}`;
          };
          console.log(add(3, 7));
        });
      }
    },
    
    {
      btnId: 'btn5',
      resultId: 'result5',
      description: 'オブジェクトと配列',
      handler: () => {
        return captureConsoleOutput(() => {
          // オブジェクトの作成と操作
          const student = {
            name: "鈴木花子",
            age: 20,
            grade: "A"
          };
          console.log("学生情報:", student);
          console.log("名前:", student.name);

          // 配列の作成と操作
          const fruits = ["りんご", "バナナ", "オレンジ"];
          console.log("果物リスト:", fruits);
          fruits.push("ぶどう");
          console.log("ぶどう追加後:", fruits);
          console.log("最初の果物:", fruits[0]);
        });
      }
    },
    
    {
      btnId: 'btnArray',
      resultId: 'resultArray',
      description: '配列メソッド',
      handler: () => {
        return captureConsoleOutput(() => {
          const numbers = [1, 2, 3, 4, 5];
          console.log("元の配列:", numbers);

          // map: 各要素を変換
          const doubled = numbers.map(num => num * 2);
          console.log("2倍にした配列:", doubled);

          // filter: 条件に合う要素だけ抽出
          const evenNumbers = numbers.filter(num => num % 2 === 0);
          console.log("偶数だけ:", evenNumbers);

          // find: 条件に合う最初の要素を取得
          const foundNumber = numbers.find(num => num > 3);
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
      btnId: 'btn6',
      resultId: 'result6',
      description: 'DOM操作',
      handler: () => {
        return captureConsoleOutput(() => {
          // 要素を取得
          const targetElement = $('demo');
          if (!targetElement) {
            console.log("エラー: demo要素が見つかりません");
            return;
          }
          
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
      btnId: 'btn7',
      resultId: 'result7',
      description: 'エラーハンドリング',
      handler: () => {
        return captureConsoleOutput(() => {
          try {
            console.log("処理を開始します");
            
            // わざとエラーを発生させる
            const result = 10 / 0;  // 0で割る
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
      btnId: 'btn8',
      resultId: 'result8',
      description: 'ES6機能',
      handler: () => {
        return captureConsoleOutput(() => {
          // テンプレートリテラル
          const userName = "田中";
          const userAge = 25;
          const message = `ユーザー名: ${userName}, 年齢: ${userAge}歳`;
          console.log(message);

          // 分割代入
          const user = { name: "佐藤", age: 30, city: "東京" };
          const { name, age, city } = user;
          console.log(`${name}さんは${age}歳、${city}在住です`);

          // スプレッド構文
          const arr1 = [1, 2, 3];
          const arr2 = [...arr1, 4, 5];
          console.log("元の配列:", arr1);
          console.log("拡張した配列:", arr2);
        });
      }
    }
  ];

  // ========================================
  // イベントリスナー登録
  // ========================================

  /**
   * すべてのアクションにイベントリスナーを登録
   */
  function initializeEventListeners() {
    actions.forEach(({ btnId, resultId, handler }) => {
      const button = $(btnId);
      const resultElement = $(resultId);
      
      if (button && resultElement) {
        button.addEventListener('click', () => {
          try {
            const output = handler();
            displayResult(resultElement, output);
          } catch (error) {
            console.error('エラーが発生しました:', error);
            displayResult(resultElement, [`エラー: ${error.message}`]);
          }
        });
      } else {
        console.warn(`要素が見つかりません: button=${btnId}, result=${resultId}`);
      }
    });
  }

  // ========================================
  // 初期化
  // ========================================

  // DOMが読み込まれた後に初期化を実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEventListeners);
  } else {
    initializeEventListeners();
  }

})();