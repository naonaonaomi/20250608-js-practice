(function() {
  // DOM取得ユーティリティ
  const $ = (id) => document.getElementById(id);
  
  // コンソール出力をキャプチャして画面に表示する関数
  function captureConsoleOutput(func) {
    let output = [];
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
      return func();
    } finally {
      // console関数を元に戻す
      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
    }
  }

  // 結果表示のスタイル設定
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
    resultElement.style.backgroundColor = '#f0f8ff';
    resultElement.style.border = '1px solid #ddd';
    resultElement.style.padding = '10px';
    resultElement.style.margin = '10px 0';
    resultElement.style.fontFamily = 'monospace';
  }

  // 1. 非同期処理（Promise・async/await）
  const btnAsync = $('btn-async');
  if(btnAsync) {
    btnAsync.addEventListener('click', function() {
      // まず実行中メッセージを表示
      displayResult($('result-async'), ['⏳ 2秒間お待ちください...']);
      
      // 非同期処理を実行
      setTimeout(() => {
        const output = captureConsoleOutput(() => {
          // Promiseを使った非同期処理
          function fetchUserData(userId) {
            return new Promise((resolve, reject) => {
              console.log(`ユーザー${userId}のデータを取得中...`);
              
              // 即座に結果を返す（デモ用）
              if (userId > 0) {
                resolve({
                  id: userId,
                  name: `ユーザー${userId}`,
                  email: `user${userId}@example.com`
                });
              } else {
                reject(new Error("無効なユーザーIDです"));
              }
            });
          }

          // async/awaitを使用
          async function getUserInfo() {
            try {
              console.log("データ取得を開始します");
              let user = await fetchUserData(123);
              console.log("取得完了:", user);
              console.log(`名前: ${user.name}, メール: ${user.email}`);
            } catch (error) {
              console.log("エラー:", error.message);
            }
          }

          getUserInfo();
        });
        displayResult($('result-async'), output);
      }, 2000);
    });
  }

  // 2. スコープとクロージャ
  const btnScope = $('btn-scope');
  if(btnScope) {
    btnScope.addEventListener('click', function() {
      const output = captureConsoleOutput(() => {
        // グローバルスコープ
        let globalVar = "グローバル変数";

        function outerFunction(x) {
          // 外側の関数のスコープ
          let outerVar = "外側の変数";
          console.log("外側の関数:", x);
          
          // 内側の関数（クロージャ）
          function innerFunction(y) {
            // 内側の関数のスコープ
            let innerVar = "内側の変数";
            
            // 全てのスコープの変数にアクセス可能
            console.log("内側の関数:", y);
            console.log("アクセス可能:", globalVar, outerVar, innerVar);
            
            return x + y; // 外側の変数xを覚えている
          }
          
          return innerFunction; // 関数を返す
        }

        // クロージャの作成と使用
        let closure1 = outerFunction(10);
        let closure2 = outerFunction(20);

        console.log("closure1(5):", closure1(5));  // 15
        console.log("closure2(5):", closure2(5));  // 25

        // 各クロージャは独自のxの値を覚えている
        console.log("それぞれ異なる値を覚えています");
      });
      displayResult($('result-scope'), output);
    });
  }

  // 3. プロトタイプとthis
  const btnPrototype = $('btn-prototype');
  if(btnPrototype) {
    btnPrototype.addEventListener('click', function() {
      const output = captureConsoleOutput(() => {
        // コンストラクタ関数
        function Person(name, age) {
          this.name = name;
          this.age = age;
          console.log(`${name}さん（${age}歳）を作成しました`);
        }

        // プロトタイプにメソッドを追加
        Person.prototype.introduce = function() {
          return `こんにちは、${this.name}です。${this.age}歳です。`;
        };

        Person.prototype.birthday = function() {
          this.age++;
          console.log(`誕生日おめでとう！${this.name}さんは${this.age}歳になりました`);
        };

        // インスタンス作成
        let person1 = new Person("田中", 25);
        let person2 = new Person("佐藤", 30);

        console.log(person1.introduce());
        console.log(person2.introduce());

        person1.birthday();

        // thisの動作確認
        console.log("--- thisの動作 ---");
        let greet = person1.introduce;
        try {
          console.log("メソッドを変数に代入:", greet()); // undefinedになる
        } catch (e) {
          console.log("メソッドを変数に代入: エラーが発生 -", e.message);
        }

        // bindでthisを固定
        let boundGreet = person1.introduce.bind(person1);
        console.log("bindでthisを固定:", boundGreet());
      });
      displayResult($('result-prototype'), output);
    });
  }

  // 4. 正規表現
  const btnRegex = $('btn-regex');
  if(btnRegex) {
    btnRegex.addEventListener('click', function() {
      const output = captureConsoleOutput(() => {
        let text = document.getElementById('regex-input').value;
        console.log("対象テキスト:", text);

        // メールアドレスを検索
        let emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        let emails = text.match(emailRegex);
        console.log("見つかったメールアドレス:", emails);

        // 電話番号パターン（ハイフンあり・なし）
        let phoneRegex = /(\d{3})-?(\d{4})-?(\d{4})/g;
        let testPhone = "連絡先: 090-1234-5678 または 08012345678";
        console.log("電話番号テスト:", testPhone);
        let phones = testPhone.match(phoneRegex);
        console.log("見つかった電話番号:", phones);

        // 文字列の置換
        let cleanText = text.replace(emailRegex, "[メールアドレス]");
        console.log("置換後:", cleanText);

        // パターンの検証
        let isEmail = emailRegex.test(text);
        console.log("メールアドレスが含まれているか:", isEmail);
      });
      displayResult($('result-regex'), output);
    });
  }

  // 5. Fetch API
  const btnFetch = $('btn-fetch');
  if(btnFetch) {
    btnFetch.addEventListener('click', function() {
      displayResult($('result-fetch'), ['⏳ データを取得中...']);
      
      // 非同期処理なので、実際に実行してから結果を表示
      (async function() {
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
          // 公開APIからデータを取得
          async function fetchRandomUser() {
            try {
              console.log("ランダムユーザーデータを取得中...");
              
              // JSONPlaceholderの公開APIを使用
              let response = await fetch('https://jsonplaceholder.typicode.com/users/1');
              
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              
              let userData = await response.json();
              console.log("取得成功!");
              console.log("ユーザー名:", userData.name);
              console.log("メール:", userData.email);
              console.log("会社:", userData.company.name);
              console.log("住所:", userData.address.city);
              
              return userData;
            } catch (error) {
              console.log("エラーが発生しました:", error.message);
              
              // ダミーデータを返す
              console.log("ダミーデータを使用します");
              return {
                name: "山田太郎",
                email: "yamada@example.com",
                company: { name: "サンプル会社" },
                address: { city: "東京" }
              };
            }
          }

          await fetchRandomUser();
        } finally {
          console.log = originalLog;
          displayResult($('result-fetch'), output);
        }
      })();
    });
  }

  // 6. デバッグ手法
  const btnDebug = $('btn-debug');
  if(btnDebug) {
    btnDebug.addEventListener('click', function() {
      const output = captureConsoleOutput(() => {
        // console.logの活用
        function calculateTotal(items) {
          console.log("--- calculateTotal開始 ---");
          console.log("入力データ:", items);
          
          let total = 0;
          
          for (let i = 0; i < items.length; i++) {
            console.log(`${i}番目の処理:`, items[i]);
            
            // 型チェック
            if (typeof items[i].price !== 'number') {
              console.warn("警告: 価格が数値ではありません", items[i]);
              continue;
            }
            
            total += items[i].price * items[i].quantity;
            console.log("現在の合計:", total);
          }
          
          console.log("最終結果:", total);
          console.log("--- calculateTotal終了 ---");
          
          return total;
        }

        // テストデータ
        let shoppingCart = [
          { name: "りんご", price: 100, quantity: 3 },
          { name: "バナナ", price: 80, quantity: 2 },
          { name: "無効な商品", price: "abc", quantity: 1 }, // エラーデータ
          { name: "オレンジ", price: 150, quantity: 1 }
        ];

        // 実行とエラーハンドリング
        try {
          let result = calculateTotal(shoppingCart);
          console.log("合計金額:", result + "円");
        } catch (error) {
          console.error("エラーが発生:", error);
        }
      });
      displayResult($('result-debug'), output);
    });
  }

  // 7. 高度な配列操作
  const btnArrays = $('btn-arrays');
  if(btnArrays) {
    btnArrays.addEventListener('click', function() {
      const output = captureConsoleOutput(() => {
        let products = [
          { name: "ノートPC", price: 80000, category: "electronics", inStock: true },
          { name: "デスク", price: 15000, category: "furniture", inStock: false },
          { name: "スマートフォン", price: 60000, category: "electronics", inStock: true },
          { name: "椅子", price: 8000, category: "furniture", inStock: true },
          { name: "タブレット", price: 40000, category: "electronics", inStock: false }
        ];

        console.log("全商品:", products);

        // 在庫ありの商品のみフィルタ
        let inStockProducts = products.filter(product => product.inStock);
        console.log("在庫あり:", inStockProducts.map(p => p.name));

        // カテゴリ別にグループ化
        let groupedByCategory = products.reduce((groups, product) => {
          let category = product.category;
          if (!groups[category]) {
            groups[category] = [];
          }
          groups[category].push(product);
          return groups;
        }, {});
        console.log("カテゴリ別:", groupedByCategory);

        // 価格の統計情報
        let prices = products.map(p => p.price);
        let totalValue = prices.reduce((sum, price) => sum + price, 0);
        let averagePrice = totalValue / prices.length;
        let maxPrice = Math.max(...prices);
        let minPrice = Math.min(...prices);

        console.log("価格統計:");
        console.log("  合計:", totalValue.toLocaleString() + "円");
        console.log("  平均:", Math.round(averagePrice).toLocaleString() + "円");
        console.log("  最高:", maxPrice.toLocaleString() + "円");
        console.log("  最低:", minPrice.toLocaleString() + "円");

        // チェーンメソッド（複数の処理を繋げる）
        let expensiveElectronics = products
          .filter(p => p.category === "electronics")
          .filter(p => p.price > 50000)
          .map(p => p.name)
          .sort();

        console.log("高価な電子機器:", expensiveElectronics);
      });
      displayResult($('result-arrays'), output);
    });
  }
})(); 