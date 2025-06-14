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

  // 結果表示のスタイル設定
  function displayResult(resultElement, output) {
    if (Array.isArray(output)) {
      resultElement.innerHTML = output.map(line => `<div>${line}</div>`).join('');
    } else {
      resultElement.textContent = output;
    }
    resultElement.style.backgroundColor = '#f0f8ff';
    resultElement.style.border = '1px solid #ddd';
    resultElement.style.padding = '10px';
    resultElement.style.margin = '10px 0';
    resultElement.style.fontFamily = 'monospace';
  }

  // 1. DOM取得
  const btnDomGet = $('btn-dom-get');
  if(btnDomGet) {
    btnDomGet.addEventListener('click', () => {
      const output = captureConsoleOutput(() => {
        // IDで取得
        let element1 = document.getElementById('sample');
        console.log("IDで取得:", element1.textContent);

        // クラス名で取得
        let element2 = document.querySelector('.sample-class');
        console.log("クラスで取得:", element2.textContent);

        // タグ名で取得
        let element3 = document.querySelector('div');
        console.log("最初のdiv:", element3.textContent);
      });
      displayResult($('result-dom-get'), output);
    });
  }

  // 2. イベントリスナー
  const btnEvent = $('btn-event');
  if(btnEvent) {
    // 画面に表示されているコードと同じ処理を設定
    btnEvent.addEventListener('click', function() {
      const output = captureConsoleOutput(() => {
        console.log("ボタンがクリックされました！");
        console.log("現在の時刻:", new Date().toLocaleTimeString());
        console.log("クリック処理が完了しました");
      });
      displayResult($('result-event'), output);
    });
  }

  // 3. フォームの入力取得
  const form = $('sample-form');
  if(form) {
    const input = $('input-text');
    
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // デフォルトの送信を停止
      
      const output = captureConsoleOutput(() => {
        let inputValue = input.value;
        console.log("入力された値:", inputValue);
        
        if (inputValue.trim() === "") {
          console.log("エラー: 名前を入力してください");
        } else {
          console.log(`こんにちは、${inputValue}さん！`);
          console.log("フォーム処理が完了しました");
        }
      });
      displayResult($('result-form'), output);
    });
  }

  // 4. クラスの操作
  const classTarget = $('class-target');
  if(classTarget) {
    // addボタンの処理
    const btnAdd = $('btn-add');
    if(btnAdd) {
      btnAdd.addEventListener('click', function() {
        classTarget.classList.add('active');
        const output = captureConsoleOutput(() => {
          console.log("activeクラスを追加しました");
          console.log("現在のクラス:", classTarget.className);
        });
        displayResult($('result-classlist'), output);
      });
    }

    // removeボタンの処理
    const btnRemove = $('btn-remove');
    if(btnRemove) {
      btnRemove.addEventListener('click', function() {
        classTarget.classList.remove('active');
        const output = captureConsoleOutput(() => {
          console.log("activeクラスを削除しました");
          console.log("現在のクラス:", classTarget.className);
        });
        displayResult($('result-classlist'), output);
      });
    }

    // toggleボタンの処理
    const btnToggle = $('btn-toggle');
    if(btnToggle) {
      btnToggle.addEventListener('click', function() {
        classTarget.classList.toggle('active');
        const output = captureConsoleOutput(() => {
          console.log("activeクラスを切り替えました");
          console.log("現在のクラス:", classTarget.className);
        });
        displayResult($('result-classlist'), output);
      });
    }
  }

  // 5. スタイル変更
  const btnStyle = $('btn-style');
  const btnResetStyle = $('btn-reset-style');
  const styleTarget = $('style-target');
  
  if(btnStyle && styleTarget) {
    btnStyle.addEventListener('click', function() {
      styleTarget.style.color = "white";
      styleTarget.style.backgroundColor = "red";
      styleTarget.style.fontSize = "20px";
      styleTarget.style.borderRadius = "10px";
      
      const output = captureConsoleOutput(() => {
        console.log("スタイルを変更しました");
        console.log("色:", styleTarget.style.color);
        console.log("背景色:", styleTarget.style.backgroundColor);
      });
      displayResult($('result-style'), output);
    });
  }

  if(btnResetStyle && styleTarget) {
    btnResetStyle.addEventListener('click', function() {
      styleTarget.style.color = "";
      styleTarget.style.backgroundColor = "";
      styleTarget.style.fontSize = "";
      styleTarget.style.borderRadius = "";
      
      const output = captureConsoleOutput(() => {
        console.log("スタイルをリセットしました");
      });
      displayResult($('result-style'), output);
    });
  }

  // 6. ノードの追加・削除
  const btnAddNode = $('btn-add-node');
  const btnRemoveNode = $('btn-remove-node');
  const nodeArea = $('node-area');
  let addedElement = null;
  
  if(btnAddNode && nodeArea) {
    btnAddNode.addEventListener('click', function() {
      const output = captureConsoleOutput(() => {
        if (addedElement === null) {
          // 新しい要素を作成
          addedElement = document.createElement('div');
          addedElement.textContent = '新しく追加された要素です！';
          addedElement.style.backgroundColor = '#e1f5fe';
          addedElement.style.padding = '10px';
          addedElement.style.margin = '5px 0';
          addedElement.style.borderRadius = '4px';
          
          // 要素を追加
          nodeArea.appendChild(addedElement);
          
          console.log("新しい要素を追加しました");
          console.log("追加した要素:", addedElement);
        } else {
          console.log("既に要素が追加されています");
        }
      });
      displayResult($('result-node'), output);
    });
  }
  
  if(btnRemoveNode && nodeArea) {
    btnRemoveNode.addEventListener('click', function() {
      const output = captureConsoleOutput(() => {
        if (addedElement && nodeArea.contains(addedElement)) {
          nodeArea.removeChild(addedElement);
          addedElement = null;
          
          console.log("要素を削除しました");
        } else {
          console.log("削除する要素がありません");
        }
      });
      displayResult($('result-node'), output);
    });
  }

  // 7. クラスとインスタンス
  const btnClass = $('btn-class');
  if(btnClass) {
    btnClass.addEventListener('click', function() {
      const output = captureConsoleOutput(() => {
        // Animalクラスの定義
        class Animal {
          constructor(name, species) {
            this.name = name;
            this.species = species;
            console.log(`${species}の${name}を作成しました`);
          }
          
          greet() {
            return `こんにちは、${this.species}の${this.name}です！`;
          }
          
          info() {
            return `名前: ${this.name}, 種類: ${this.species}`;
          }
        }

        // インスタンスの作成と使用
        let dog = new Animal('ポチ', '犬');
        let cat = new Animal('ミケ', '猫');

        console.log(dog.greet());
        console.log(cat.greet());
        console.log("犬の情報:", dog.info());
        console.log("猫の情報:", cat.info());
      });
      displayResult($('result-class'), output);
    });
  }

  // 8. JSON データの操作
  const btnJson = $('btn-json');
  if(btnJson) {
    btnJson.addEventListener('click', function() {
      const output = captureConsoleOutput(() => {
        // オブジェクトをJSON文字列に変換
        let user = {
          name: "田中太郎",
          age: 25,
          hobbies: ["読書", "映画鑑賞", "プログラミング"]
        };

        let jsonString = JSON.stringify(user);
        console.log("JSON文字列:", jsonString);

        // JSON文字列をオブジェクトに変換
        let parsedUser = JSON.parse(jsonString);
        console.log("解析されたオブジェクト:", parsedUser);
        console.log("名前:", parsedUser.name);
        console.log("趣味:", parsedUser.hobbies.join(", "));
      });
      displayResult($('result-json'), output);
    });
  }

  // 9. ローカルストレージ
  const btnSaveStorage = $('btn-save-storage');
  const btnStorage = $('btn-storage');
  const btnClearStorage = $('btn-clear-storage');
  const storageInput = $('storage-input');

  if(btnSaveStorage && storageInput) {
    btnSaveStorage.addEventListener('click', function() {
      const output = captureConsoleOutput(() => {
        let message = storageInput.value;
        if (message.trim() === "") {
          console.log("エラー: メッセージを入力してください");
          return;
        }
        localStorage.setItem('userMessage', message);
        console.log("保存しました:", message);
      });
      displayResult($('result-storage'), output);
    });
  }

  if(btnStorage) {
    btnStorage.addEventListener('click', function() {
      const output = captureConsoleOutput(() => {
        // ローカルストレージからデータを取得
        let savedMessage = localStorage.getItem('userMessage');
        console.log("取得したデータ:", savedMessage);

        // 全てのデータを確認
        console.log("ローカルストレージの内容:", localStorage);
      });
      displayResult($('result-storage'), output);
    });
  }

  if(btnClearStorage) {
    btnClearStorage.addEventListener('click', function() {
      const output = captureConsoleOutput(() => {
        localStorage.removeItem('userMessage');
        console.log("データを削除しました");
      });
      displayResult($('result-storage'), output);
    });
  }

  // 10. タイマー機能
  let seconds = 0;
  let timerInterval = null;
  const btnStartTimer = $('btn-start-timer');
  const btnStopTimer = $('btn-stop-timer');
  const timerDisplay = $('timer-display');

  function startTimer() {
    if (timerInterval === null) {
      timerInterval = setInterval(() => {
        seconds++;
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;
        let timeString = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        
        if(timerDisplay) {
          timerDisplay.textContent = timeString;
        }
      }, 1000);
    }
  }

  function stopTimer() {
    if (timerInterval !== null) {
      clearInterval(timerInterval);
      timerInterval = null;
      seconds = 0;
      if(timerDisplay) {
        timerDisplay.textContent = "00:00";
      }
    }
  }

  if(btnStartTimer) {
    btnStartTimer.addEventListener('click', function() {
      const output = captureConsoleOutput(() => {
        console.log("タイマーを開始しました");
      });
      startTimer();
      displayResult($('result-timer'), output);
    });
  }

  if(btnStopTimer) {
    btnStopTimer.addEventListener('click', function() {
      const output = captureConsoleOutput(() => {
        console.log("タイマーを停止しました");
      });
      stopTimer();
      displayResult($('result-timer'), output);
    });
  }
})(); 