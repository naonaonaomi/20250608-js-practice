/**
 * ==========================================
 * JavaScript基礎3: 応用機能と非同期処理
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
  
  // デバッグ用: ページ読み込み時にコンソールに出力
  console.log('basic3.js が読み込まれました');
  
  /**
   * コンソール出力をキャプチャして画面に表示する関数
   * @param {Function} func - 実行する関数
   * @returns {Array} 出力の配列
   */
  function captureConsoleOutput(func) {
    const output = [];
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;
    
    // console.log, warn, errorを一時的に置き換え
    console.log = (...args) => {
      const message = args.map(arg => {
        if (typeof arg === 'object' && arg !== null) {
          return JSON.stringify(arg, null, 2);
        }
        return String(arg);
      }).join(' ');
      output.push(message);
      originalLog(...args);
    };
    
    console.warn = (...args) => {
      const message = '⚠️ ' + args.map(arg => {
        if (typeof arg === 'object' && arg !== null) {
          return JSON.stringify(arg, null, 2);
        }
        return String(arg);
      }).join(' ');
      output.push(message);
      originalWarn(...args);
    };
    
    console.error = (...args) => {
      const message = '❌ ' + args.map(arg => {
        if (typeof arg === 'object' && arg !== null) {
          return JSON.stringify(arg, null, 2);
        }
        return String(arg);
      }).join(' ');
      output.push(message);
      originalError(...args);
    };
    
    try {
      func(); // 関数を実行
      return output; // outputを返す
    } finally {
      // console関数を元に戻す
      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
    }
  }

  /**
   * 結果を画面に表示する関数
   * @param {HTMLElement} resultElement - 結果表示要素
   * @param {Array|string|Promise} output - 表示する内容
   */
  function displayResult(resultElement, output) {
    if (Array.isArray(output)) {
      resultElement.innerHTML = output.map(line => `<div>${line}</div>`).join('');
    } else if (output && output.then) {
      // Promiseの場合
      resultElement.innerHTML = '<div>⏳ 非同期処理を実行中...</div>';
      output.then(result => {
        displayResult(resultElement, result);
      });
      return;
    } else {
      resultElement.textContent = output;
    }
    
    // 結果表示のスタイル設定
    resultElement.style.padding = '10px';
    resultElement.style.margin = '10px 0';
    resultElement.style.fontFamily = 'monospace';
  }

  // ========================================
  // 非同期処理とその他応用機能
  // ========================================

  /**
   * 1. 非同期処理（Promise・async/await）の実装
   */
  function initializeAsyncExamples() {
    const btnAsync = $('btn-async');
    if (btnAsync) {
      btnAsync.addEventListener('click', async function() {
        // まず実行中メッセージを表示
        displayResult($('result-async'), ['⏳ 2秒間お待ちください...']);
        
        // 非同期処理を実行
        setTimeout(async () => {
          const output = [];
          const originalLog = console.log;
          
          console.log = (...args) => {
            const message = args.map(arg => {
              if (typeof arg === 'object' && arg !== null) {
                return JSON.stringify(arg, null, 2);
              }
              return String(arg);
            }).join(' ');
            output.push(message);
            originalLog(...args);
          };

          try {
            // Promiseを使った非同期処理
            function fetchData(id) {
              return new Promise((resolve) => {
                console.log(`データ${id}を取得中...`);
                setTimeout(() => {
                  resolve({ id: id, name: `データ${id}` });
                }, 1000);
              });
            }

            // async/awaitを使用
            async function getData() {
              try {
                console.log("開始");
                const data = await fetchData(123);
                console.log("完了:", data);
              } catch (error) {
                console.log("エラー:", error.message);
              }
            }

            await getData();
          } finally {
            console.log = originalLog;
            displayResult($('result-async'), output);
          }
        }, 2000);
      });
    }
  }

  /**
   * 2. スコープとクロージャの実装
   */
  function initializeScopeExamples() {
    const btnScope = $('btn-scope');
    if (btnScope) {
      btnScope.addEventListener('click', function() {
        const output = captureConsoleOutput(() => {
          // クロージャ: 外側の変数を覚える関数
          function counter(start) {
            let count = start;
            
            return function() {
              count++;
              console.log("カウント:", count);
              return count;
            };
          }

          // 各カウンターは独自の値を保持
          const counter1 = counter(0);
          const counter2 = counter(100);

          counter1(); // カウント: 1
          counter1(); // カウント: 2
          counter2(); // カウント: 101
          counter2(); // カウント: 102

          console.log("各クロージャは独自の値を保持します");
        });
        displayResult($('result-scope'), output);
      });
    }
  }

  /**
   * 3. プロトタイプとthisの実装
   */
  function initializePrototypeExamples() {
    const btnPrototype = $('btn-prototype');
    if (btnPrototype) {
      btnPrototype.addEventListener('click', function() {
        const output = captureConsoleOutput(() => {
          // コンストラクタ関数
          function Car(name) {
            this.name = name;
            this.speed = 0;
          }

          // プロトタイプにメソッドを追加
          Car.prototype.accelerate = function() {
            this.speed += 10;
            console.log(`${this.name}の速度: ${this.speed}km/h`);
          };

          Car.prototype.info = function() {
            return `車名: ${this.name}, 速度: ${this.speed}km/h`;
          };

          // インスタンス作成とメソッド実行
          const car1 = new Car("プリウス");
          const car2 = new Car("アクア");

          car1.accelerate(); // プリウスの速度: 10km/h
          car2.accelerate(); // アクアの速度: 10km/h
          console.log(car1.info());
          console.log(car2.info());
        });
        displayResult($('result-prototype'), output);
      });
    }
  }

  /**
   * 4. 正規表現の実装
   */
  function initializeRegexExamples() {
    const btnRegex = $('btn-regex');
    if (btnRegex) {
      btnRegex.addEventListener('click', function() {
        const output = captureConsoleOutput(() => {
          const regexInput = $('regex-input');
          const text = regexInput ? regexInput.value : "テストデータがありません";
          console.log("対象テキスト:", text);

          // メールアドレスを検索
          const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
          console.log("メールアドレス:", text.match(emailRegex));

          // 電話番号を検索
          const phoneRegex = /\d{3}-\d{4}-\d{4}/g;
          console.log("電話番号:", text.match(phoneRegex));

          // メールアドレスを隠す
          const hiddenText = text.replace(emailRegex, "[メール]");
          console.log("置換後:", hiddenText);
        });
        displayResult($('result-regex'), output);
      });
    }
  }

  /**
   * 5. Fetch APIの実装
   */
  function initializeFetchExamples() {
    const btnFetch = $('btn-fetch');
    if (btnFetch) {
      btnFetch.addEventListener('click', function() {
        displayResult($('result-fetch'), ['⏳ データを取得中...']);
        
        // 非同期処理なので、実際に実行してから結果を表示
        (async function() {
          const output = [];
          const originalLog = console.log;
          
          console.log = (...args) => {
            const message = args.map(arg => {
              if (typeof arg === 'object' && arg !== null) {
                try {
                  return JSON.stringify(arg, null, 2);
                } catch (e) {
                  return String(arg);
                }
              }
              return String(arg);
            }).join(' ');
            output.push(message);
            originalLog(...args);
          };

          try {
            // 公開APIからデータを取得
            async function fetchUserData() {
              try {
                console.log("データ取得中...");
                const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
                
                if (!response.ok) throw new Error(`エラー: ${response.status}`);
                
                const user = await response.json();
                console.log("ユーザー名:", user.name);
                console.log("メール:", user.email);
                console.log("会社:", user.company.name);
              } catch (error) {
                console.log("エラー:", error.message);
                console.log("ダミーデータを使用");
                console.log("ユーザー名: 山田太郎");
                console.log("メール: yamada@example.com");
              }
            }

            await fetchUserData();
          } catch (error) {
            console.log("予期しないエラー:", error.message);
          } finally {
            console.log = originalLog;
            displayResult($('result-fetch'), output);
          }
        })();
      });
    }
  }

  /**
   * 6. デバッグ手法の実装
   */
  function initializeDebugExamples() {
    const btnDebug = $('btn-debug');
    if (btnDebug) {
      btnDebug.addEventListener('click', function() {
        const output = captureConsoleOutput(() => {
          // デバッグ用のconsole.log
          function calculatePrice(items) {
            console.log("計算開始:", items);
            let total = 0;
            
            items.forEach((item, index) => {
              console.log(`${index}: ${item.name}`);
              
              if (typeof item.price !== 'number') {
                console.warn("警告: 価格エラー", item);
                return; // スキップ
              }
              
              total += item.price * item.quantity;
              console.log("現在の合計:", total);
            });
            
            console.log("最終合計:", total + "円");
            return total;
          }

          // テストデータ（エラーデータを含む）
          const cart = [
            { name: "りんご", price: 100, quantity: 2 },
            { name: "エラー商品", price: "abc", quantity: 1 },
            { name: "バナナ", price: 80, quantity: 3 }
          ];

          calculatePrice(cart);
        });
        displayResult($('result-debug'), output);
      });
    }
  }

  /**
   * 7. 高度な配列操作の実装
   */
  function initializeAdvancedArrays() {
    const btnArrays = $('btn-arrays');
    if (btnArrays) {
      btnArrays.addEventListener('click', function() {
        const output = captureConsoleOutput(() => {
          const products = [
            { name: "PC", price: 80000, category: "tech", inStock: true },
            { name: "机", price: 15000, category: "furniture", inStock: false },
            { name: "スマホ", price: 60000, category: "tech", inStock: true },
            { name: "椅子", price: 8000, category: "furniture", inStock: true }
          ];

          // 在庫ありの商品
          const inStock = products.filter(p => p.inStock);
          console.log("在庫あり:", inStock.map(p => p.name));

          // カテゴリ別集計
          const byCategory = products.reduce((groups, p) => {
            groups[p.category] = groups[p.category] || [];
            groups[p.category].push(p.name);
            return groups;
          }, {});
          console.log("カテゴリ別:", byCategory);

          // 価格統計
          const prices = products.map(p => p.price);
          console.log("合計価格:", prices.reduce((a, b) => a + b, 0) + "円");
          console.log("最高価格:", Math.max(...prices) + "円");

          // メソッドチェーン: 高価なtech商品
          const expensiveTech = products
            .filter(p => p.category === "tech" && p.price > 50000)
            .map(p => p.name);
          console.log("高価なtech商品:", expensiveTech);
        });
        displayResult($('result-arrays'), output);
      });
    }
  }

  // ========================================
  // 初期化
  // ========================================

  /**
   * すべての機能を初期化
   */
  function initialize() {
    initializeAsyncExamples();
    initializeScopeExamples();
    initializePrototypeExamples();
    initializeRegexExamples();
    initializeFetchExamples();
    initializeDebugExamples();
    initializeAdvancedArrays();
  }

  // DOMが読み込まれた後に初期化を実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

})(); 