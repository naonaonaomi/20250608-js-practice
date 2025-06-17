/**
 * ==========================================
 * JavaScript基礎2: DOM操作とイベント処理
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
  // DOM取得とイベント処理
  // ========================================

  /**
   * 1. DOM取得の実装
   */
  function initializeDomGet() {
    const btnDomGet = $('btn-dom-get');
    if (btnDomGet) {
      btnDomGet.addEventListener('click', () => {
        const output = captureConsoleOutput(() => {
          let element1 = document.getElementById('sample');
          let element2 = document.querySelector('.sample-class');
          let element3 = document.querySelector('div');

          console.log("ID:", element1.textContent);
          console.log("クラス:", element2.textContent);
        });
        displayResult($('result-dom-get'), output);
      });
    }
  }

  /**
   * 2. イベントリスナーの実装
   */
  function initializeEvent() {
    const btnEvent = $('btn-event');
    if (btnEvent) {
      btnEvent.addEventListener('click', function() {
        const output = captureConsoleOutput(() => {
          console.log("クリックされました！");
          console.log("時刻:", new Date().toLocaleTimeString());
        });
        displayResult($('result-event'), output);
      });
    }
  }

  /**
   * 3. フォームの入力取得の実装
   */
  function initializeForm() {
    const form = $('sample-form');
    if (form) {
      const input = $('input-text');
      
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const output = captureConsoleOutput(() => {
          let value = input.value;
          if (value.trim() === "") {
            console.log("エラー: 名前を入力してください");
          } else {
            console.log(`こんにちは、${value}さん！`);
          }
        });
        displayResult($('result-form'), output);
      });
    }
  }

  /**
   * 4. クラス操作の実装
   */
  function initializeClassOperations() {
    const target = $('class-target');
    if (!target) return;

    // addボタンの処理
    const btnAdd = $('btn-add');
    if (btnAdd) {
      btnAdd.addEventListener('click', () => {
        target.classList.add('active');
        const output = captureConsoleOutput(() => {
          console.log("activeクラス追加");
        });
        displayResult($('result-classlist'), output);
      });
    }

    // removeボタンの処理
    const btnRemove = $('btn-remove');
    if (btnRemove) {
      btnRemove.addEventListener('click', () => {
        target.classList.remove('active');
        const output = captureConsoleOutput(() => {
          console.log("activeクラス削除");
        });
        displayResult($('result-classlist'), output);
      });
    }

    // toggleボタンの処理
    const btnToggle = $('btn-toggle');
    if (btnToggle) {
      btnToggle.addEventListener('click', () => {
        target.classList.toggle('active');
        const output = captureConsoleOutput(() => {
          console.log("activeクラス切り替え");
        });
        displayResult($('result-classlist'), output);
      });
    }
  }

  /**
   * 5. スタイル変更の実装
   */
  function initializeStyleChanges() {
    const styleTarget = $('style-target');
    
    const btnStyle = $('btn-style');
    if (btnStyle && styleTarget) {
      btnStyle.addEventListener('click', () => {
        styleTarget.style.color = "white";
        styleTarget.style.backgroundColor = "red";
        styleTarget.style.fontSize = "20px";
        
        const output = captureConsoleOutput(() => {
          console.log("スタイル変更完了");
        });
        displayResult($('result-style'), output);
      });
    }

    const btnResetStyle = $('btn-reset-style');
    if (btnResetStyle && styleTarget) {
      btnResetStyle.addEventListener('click', () => {
        styleTarget.style.color = "";
        styleTarget.style.backgroundColor = "";
        styleTarget.style.fontSize = "";
        
        const output = captureConsoleOutput(() => {
          console.log("スタイルをリセットしました");
        });
        displayResult($('result-style'), output);
      });
    }
  }

  /**
   * 6. 要素の追加と削除の実装
   */
  function initializeNodeOperations() {
    const nodeArea = $('node-area');
    let addedElement = null;

    const btnAddNode = $('btn-add-node');
    if (btnAddNode && nodeArea) {
      btnAddNode.addEventListener('click', () => {
        if (!addedElement) {
          addedElement = document.createElement('div');
          addedElement.textContent = '新しく追加された要素！';
          addedElement.style.backgroundColor = '#e1f5fe';
          addedElement.style.padding = '10px';
          nodeArea.appendChild(addedElement);
          
          const output = captureConsoleOutput(() => {
            console.log("要素を追加しました");
          });
          displayResult($('result-node'), output);
        }
      });
    }

    const btnRemoveNode = $('btn-remove-node');
    if (btnRemoveNode && nodeArea) {
      btnRemoveNode.addEventListener('click', () => {
        if (addedElement && nodeArea.contains(addedElement)) {
          nodeArea.removeChild(addedElement);
          addedElement = null;
          
          const output = captureConsoleOutput(() => {
            console.log("要素を削除しました");
          });
          displayResult($('result-node'), output);
        }
      });
    }
  }

  /**
   * 7. クラス例の実装
   */
  function initializeClassExamples() {
    const btnClass = $('btn-class');
    if (btnClass) {
      btnClass.addEventListener('click', () => {
        const output = captureConsoleOutput(() => {
          class Animal {
            constructor(name, species) {
              this.name = name;
              this.species = species;
            }
            greet() {
              return `こんにちは、${this.species}の${this.name}です！`;
            }
          }

          let dog = new Animal('ポチ', '犬');
          let cat = new Animal('ミケ', '猫');
          console.log(dog.greet());
          console.log(cat.greet());
        });
        displayResult($('result-class'), output);
      });
    }
  }

  /**
   * 8. JSON操作の実装
   */
  function initializeJsonOperations() {
    const btnJson = $('btn-json');
    if (btnJson) {
      btnJson.addEventListener('click', () => {
        const output = captureConsoleOutput(() => {
          let user = {
            name: "田中太郎",
            age: 25,
            hobbies: ["読書", "映画", "プログラミング"]
          };

          let jsonString = JSON.stringify(user);
          let parsedUser = JSON.parse(jsonString);

          console.log("JSON文字列:", jsonString);
          console.log("名前:", parsedUser.name);
          console.log("趣味:", parsedUser.hobbies.join(", "));
        });
        displayResult($('result-json'), output);
      });
    }
  }

  /**
   * 9. ローカルストレージの実装
   */
  function initializeLocalStorage() {
    const btnStorage = $('btn-storage');
    const btnStorageGet = $('btn-storage-get');
    
    if (btnStorage) {
      btnStorage.addEventListener('click', () => {
        const output = captureConsoleOutput(() => {
          let message = document.getElementById('storage-input').value;
          localStorage.setItem('userMessage', message);
          console.log("保存しました:", message);

          let savedMessage = localStorage.getItem('userMessage');
          console.log("取得しました:", savedMessage);
        });
        displayResult($('result-storage'), output);
      });
    }
  }

  // ========================================
  // 初期化
  // ========================================

  function initialize() {
    console.log('basic2.js が読み込まれました');
    initializeDomGet();
    initializeEvent();
    initializeForm();
    initializeClassOperations();
    initializeStyleChanges();
    initializeNodeOperations();
    initializeClassExamples();
    initializeJsonOperations();
    initializeLocalStorage();
  }

  // DOM読み込み完了後に初期化実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

})(); 