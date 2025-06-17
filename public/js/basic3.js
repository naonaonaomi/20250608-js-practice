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
      func();
      return output;
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
        displayResult($('result-async'), ['⏳ 1秒間お待ちください...']);
        
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
            function fetchData(id) {
              return new Promise((resolve) => {
                console.log(`データ${id}取得中...`);
                setTimeout(() => resolve({ id, name: `データ${id}` }), 1000);
              });
            }

            async function getData() {
              try {
                let data = await fetchData(123);
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
        }, 1000);
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
          function counter(start) {
            let count = start;
            return function() {
              count++;
              console.log("カウント:", count);
              return count;
            };
          }

          let counter1 = counter(0);
          let counter2 = counter(100);
          counter1(); // 1
          counter1(); // 2
          counter2(); // 101
          console.log("各クロージャは独自の値を保持");
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
          function Car(name) {
            this.name = name;
            this.speed = 0;
          }

          Car.prototype.accelerate = function() {
            this.speed += 10;
            console.log(`${this.name}の速度: ${this.speed}km/h`);
          };

          let car1 = new Car("プリウス");
          let car2 = new Car("アクア");
          car1.accelerate();
          car2.accelerate();
          console.log(`車1: ${car1.name} ${car1.speed}km/h`);
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
          let text = document.getElementById('regex-input').value;
          let emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
          let phoneRegex = /\d{3}-\d{4}-\d{4}/g;

          console.log("メール:", text.match(emailRegex));
          console.log("電話:", text.match(phoneRegex));
          console.log("置換後:", text.replace(emailRegex, "[メール]"));
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
      btnFetch.addEventListener('click', async function() {
        displayResult($('result-fetch'), ['⏳ データ取得中...']);
        
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
            async function fetchUserData() {
              try {
                console.log("データ取得中...");
                let response = await fetch('https://jsonplaceholder.typicode.com/users/1');
                if (!response.ok) throw new Error(`エラー: ${response.status}`);
                
                let user = await response.json();
                console.log("ユーザー:", user.name);
                console.log("メール:", user.email);
              } catch (error) {
                console.log("エラー:", error.message);
                console.log("ダミーデータ: 山田太郎");
              }
            }
            await fetchUserData();
          } finally {
            console.log = originalLog;
            displayResult($('result-fetch'), output);
          }
        }, 1000);
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
          function calculatePrice(items) {
            console.log("計算開始:", items);
            let total = 0;
            
            items.forEach(item => {
              if (typeof item.price !== 'number') {
                console.warn("価格エラー:", item);
                return;
              }
              total += item.price * item.quantity;
            });
            
            console.log("合計:", total + "円");
            return total;
          }

          let cart = [
            { name: "りんご", price: 100, quantity: 2 },
            { name: "エラー", price: "abc", quantity: 1 },
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
          let products = [
            { name: "PC", price: 80000, category: "tech", inStock: true },
            { name: "机", price: 15000, category: "furniture", inStock: false },
            { name: "スマホ", price: 60000, category: "tech", inStock: true }
          ];

          let inStock = products.filter(p => p.inStock);
          console.log("在庫あり:", inStock.map(p => p.name));

          let byCategory = products.reduce((groups, p) => {
            groups[p.category] = groups[p.category] || [];
            groups[p.category].push(p.name);
            return groups;
          }, {});
          console.log("カテゴリ別:", byCategory);

          let prices = products.map(p => p.price);
          console.log("合計:", prices.reduce((a, b) => a + b, 0) + "円");

          let expensiveTech = products
            .filter(p => p.category === "tech" && p.price > 50000)
            .map(p => p.name);
          console.log("高価なtech:", expensiveTech);
        });
        displayResult($('result-arrays'), output);
      });
    }
  }

  // ========================================
  // 初期化
  // ========================================

  function initialize() {
    console.log('basic3.js が読み込まれました');
    initializeAsyncExamples();
    initializeScopeExamples();
    initializePrototypeExamples();
    initializeRegexExamples();
    initializeFetchExamples();
    initializeDebugExamples();
    initializeAdvancedArrays();
  }

  // DOM読み込み完了後に初期化実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

})(); 