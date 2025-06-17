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
          let age = 25;
          let name = "田中太郎";
          let isStudent = true;
          let person = { name: "佐藤", age: 30 };
          let colors = ["赤", "青", "緑"];

          console.log("年齢:", age, "名前:", name);
          console.log("学生:", isStudent, "人物:", person);
        });
      }
    },
    
    {
      btnId: 'btn2',
      resultId: 'result2',
      description: '演算子',
      handler: () => {
        return captureConsoleOutput(() => {
          let x = 10, y = 3;
          console.log("計算:", x + y, x - y, x * y, x / y);
          console.log("比較:", x > y, x === y);
          console.log("論理:", x > 18 && true);
        });
      }
    },
    
    {
      btnId: 'btn3',
      resultId: 'result3',
      description: '制御文（if文、forループ）',
      handler: () => {
        return captureConsoleOutput(() => {
          let score = 85;
          if (score >= 90) console.log("優秀！");
          else if (score >= 70) console.log("良い！");
          else console.log("頑張ろう！");

          for (let i = 1; i <= 3; i++) {
            console.log(`${i}回目`);
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
          function greet(name) {
            return `こんにちは、${name}さん！`;
          }
          const double = (num) => num * 2;

          console.log(greet("山田"));
          console.log("5の2倍:", double(5));
        });
      }
    },
    
    {
      btnId: 'btn5',
      resultId: 'result5',
      description: 'オブジェクトと配列',
      handler: () => {
        return captureConsoleOutput(() => {
          let student = { name: "鈴木花子", age: 20, grade: "A" };
          let fruits = ["りんご", "バナナ"];

          console.log("学生:", student.name, student.age);
          fruits.push("オレンジ");
          console.log("果物:", fruits[0], fruits);
        });
      }
    },
    
    {
      btnId: 'btnArray',
      resultId: 'resultArray',
      description: '配列メソッド',
      handler: () => {
        return captureConsoleOutput(() => {
          let numbers = [1, 2, 3, 4, 5];
          let doubled = numbers.map(num => num * 2);
          let evens = numbers.filter(num => num % 2 === 0);
          let found = numbers.find(num => num > 3);

          console.log("元配列:", numbers);
          console.log("2倍:", doubled, "偶数:", evens, "見つけた:", found);
        });
      }
    },
    
    {
      btnId: 'btn6',
      resultId: 'result6',
      description: 'DOM操作',
      handler: () => {
        return captureConsoleOutput(() => {
          let target = document.getElementById('demo');
          target.textContent = "JavaScriptで変更されました！";
          target.style.color = "blue";
          target.style.fontWeight = "bold";
          console.log("要素を変更しました");
        });
      }
    },
    
    {
      btnId: 'btn7',
      resultId: 'result7',
      description: 'エラー処理',
      handler: () => {
        return captureConsoleOutput(() => {
          try {
            let result = 10 / 0;
            if (!isFinite(result)) throw new Error("計算エラー");
          } catch (error) {
            console.log("エラー:", error.message);
            console.log("エラーを処理しました");
          } finally {
            console.log("処理完了");
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
          let userName = "田中", userAge = 25;
          let message = `ユーザー: ${userName}, 年齢: ${userAge}歳`;

          let user = { name: "佐藤", age: 30, city: "東京" };
          let { name, age, city } = user;

          let arr1 = [1, 2, 3];
          let arr2 = [...arr1, 4, 5];
          console.log(message, arr2);
        });
      }
    }
  ];

  // ========================================
  // イベントリスナー初期化
  // ========================================

  function initializeEventListeners() {
    actions.forEach(action => {
      const btn = $(action.btnId);
      const resultElement = $(action.resultId);
      
      if (btn && resultElement) {
        btn.addEventListener('click', () => {
          try {
            const output = action.handler();
            displayResult(resultElement, output);
          } catch (error) {
            displayResult(resultElement, `エラー: ${error.message}`);
          }
        });
      }
    });
  }

  // ========================================
  // 初期化
  // ========================================

  /**
   * ページ読み込み完了時の初期化
   */
  function initialize() {
    console.log('basic1.js が読み込まれました');
    initializeEventListeners();
  }

  // DOM読み込み完了後に初期化実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

})();