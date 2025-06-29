(function() {
    'use strict';

    let originalConsoleLog = console.log;
    let consoleOutput = [];

    function captureConsoleLog() {
        consoleOutput = [];
        console.log = function(...args) {
            consoleOutput.push(args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' '));
            originalConsoleLog.apply(console, args);
        };
    }

    function restoreConsoleLog() {
        console.log = originalConsoleLog;
    }

    function displayResult(elementId) {
        const resultElement = document.getElementById(elementId);
        if (resultElement) {
            resultElement.innerHTML = consoleOutput.length > 0 
                ? consoleOutput.map(line => `<div>${line}</div>`).join('')
                : '<div>出力がありません</div>';
        }
        restoreConsoleLog();
    }

    window.runXSSPreventionExample = function() {
        captureConsoleLog();
        
        function sanitizeHTML(input) {
            const div = document.createElement('div');
            div.textContent = input;
            return div.innerHTML;
        }

        function advancedSanitize(input) {
            return input
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#x27;')
                .replace(/\//g, '&#x2F;');
        }

        console.log("=== XSS対策の例 ===");
        
        const maliciousInput = "<script>alert('XSS')</script>";
        console.log("危険な入力:", maliciousInput);
        console.log("サニタイズ後:", sanitizeHTML(maliciousInput));
        console.log("高度なサニタイズ:", advancedSanitize(maliciousInput));
        
        console.log("\n=== XSS対策のポイント ===");
        console.log("✅ innerHTML の代わりに textContent を使用");
        console.log("✅ ユーザー入力のサニタイゼーション");
        console.log("✅ Content Security Policy (CSP) の設定");
        console.log("✅ HTTPOnly Cookie の使用");
        console.log("✅ 入力値の検証とエスケープ");
        
        console.log("\n=== 危険な関数 ===");
        console.log("❌ innerHTML (HTMLとして解釈される)");
        console.log("❌ eval() (任意のコードを実行)");
        console.log("❌ document.write() (動的にHTMLを挿入)");
        
        displayResult('result-xss-prevention');
    };

    window.runCSRFPreventionExample = function() {
        captureConsoleLog();
        
        function generateCSRFToken() {
            const array = new Uint8Array(32);
            crypto.getRandomValues(array);
            return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
        }

        class SecureAPIClient {
            constructor() {
                this.csrfToken = this.getCSRFToken();
            }
            
            getCSRFToken() {
                return generateCSRFToken();
            }
            
            async makeSecureRequest(url, data) {
                const headers = {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': this.csrfToken,
                    'X-Requested-With': 'XMLHttpRequest'
                };
                
                console.log(`セキュアリクエスト: ${url}`);
                console.log("ヘッダー:", headers);
                console.log("データ:", data);
                
                return { success: true, message: "リクエスト成功（シミュレート）" };
            }
        }

        console.log("=== CSRF対策の例 ===");
        
        const apiClient = new SecureAPIClient();
        console.log("CSRFトークン:", apiClient.csrfToken.substring(0, 16) + "...");
        
        apiClient.makeSecureRequest('/api/users', { name: '田中太郎' });
        
        console.log("\n=== CSRF対策のポイント ===");
        console.log("✅ CSRFトークンの使用");
        console.log("✅ SameSite Cookie の設定");
        console.log("✅ Referer ヘッダーの検証");
        console.log("✅ カスタムヘッダーの追加");
        console.log("✅ 重要な操作での再認証");
        
        console.log("\n=== セキュリティヘッダー ===");
        console.log("- X-CSRF-Token: CSRFトークン");
        console.log("- X-Requested-With: AJAX識別");
        console.log("- Content-Type: リクエスト形式");
        console.log("- credentials: 認証情報の送信設定");
        
        displayResult('result-csrf-prevention');
    };

    window.runGeneratorExample = function() {
        captureConsoleLog();
        
        function* numberGenerator() {
            let num = 1;
            while (num <= 5) {
                yield num++;
            }
        }

        function* fibonacciGenerator() {
            let a = 0, b = 1;
            let count = 0;
            while (count < 10) {
                yield a;
                [a, b] = [b, a + b];
                count++;
            }
        }

        console.log("=== 基本的なジェネレーター ===");
        const numGen = numberGenerator();
        console.log("数値1:", numGen.next().value);
        console.log("数値2:", numGen.next().value);
        console.log("数値3:", numGen.next().value);
        
        console.log("\n=== フィボナッチ数列 ===");
        const fibGen = fibonacciGenerator();
        for (let i = 0; i < 10; i++) {
            console.log(`F(${i}):`, fibGen.next().value);
        }
        
        console.log("\n=== for...of でのジェネレーター使用 ===");
        for (const num of numberGenerator()) {
            console.log("生成された数値:", num);
        }
        
        console.log("\n=== ジェネレーターの利点 ===");
        console.log("- メモリ効率的（必要な時だけ値を生成）");
        console.log("- 遅延評価（Lazy Evaluation）");
        console.log("- 状態の保持");
        console.log("- 無限シーケンスの表現");
        console.log("- イテレーターパターンの実装");
        
        console.log("\n=== 実用例 ===");
        console.log("- 大量データの分割処理");
        console.log("- ページネーション");
        console.log("- ストリーミング処理");
        console.log("- 状態マシンの実装");
        
        displayResult('result-generator');
    };

    window.runAsyncIteratorExample = function() {
        captureConsoleLog();
        
        class AsyncDataStream {
            constructor(data) {
                this.data = data;
                this.index = 0;
            }
            
            [Symbol.asyncIterator]() {
                return this;
            }
            
            async next() {
                if (this.index >= this.data.length) {
                    return { done: true };
                }
                
                await new Promise(resolve => setTimeout(resolve, 100));
                
                const value = this.data[this.index++];
                return { value, done: false };
            }
        }

        async function* fetchDataGenerator(urls) {
            for (const url of urls) {
                try {
                    await new Promise(resolve => setTimeout(resolve, 200));
                    yield { url, data: `${url}のデータ`, status: 'success' };
                } catch (error) {
                    yield { url, error: error.message, status: 'error' };
                }
            }
        }

        async function processAsyncData() {
            const dataStream = new AsyncDataStream(['A', 'B', 'C', 'D', 'E']);
            
            console.log("=== 非同期イテレーション開始 ===");
            for await (const item of dataStream) {
                console.log("処理中:", item);
            }
            console.log("=== 非同期イテレーション完了 ===");
        }

        async function demonstrateAsyncIterators() {
            console.log("非同期ジェネレーターのデモ:");
            
            const urls = ['api/users', 'api/posts', 'api/comments'];
            for await (const result of fetchDataGenerator(urls)) {
                console.log(`${result.url}: ${result.status}`);
                if (result.data) console.log("  データ:", result.data);
            }
        }

        console.log("=== 非同期イテレーターの例 ===");
        
        processAsyncData().then(() => {
            console.log("\n=== 非同期ジェネレーターの例 ===");
            return demonstrateAsyncIterators();
        }).then(() => {
            console.log("\n=== 非同期イテレーターの利点 ===");
            console.log("- 大量データの効率的な処理");
            console.log("- メモリ使用量の最適化");
            console.log("- ストリーミング処理");
            console.log("- バックプレッシャーの制御");
            
            console.log("\n=== 実用例 ===");
            console.log("- ファイルの行ごと読み込み");
            console.log("- API からのデータストリーミング");
            console.log("- リアルタイムデータ処理");
            console.log("- 大量データの分割処理");
        });
        
        displayResult('result-async-iterator');
    };

    window.runProjectPatternsExample = function() {
        captureConsoleLog();
        
        const TodoApp = (function() {
            let todos = [];
            let nextId = 1;
            
            function findTodoById(id) {
                return todos.find(todo => todo.id === id);
            }
            
            function validateTodo(todo) {
                if (!todo.title || todo.title.trim() === '') {
                    throw new Error('タイトルは必須です');
                }
            }
            
            return {
                addTodo(title, description = '') {
                    const todo = { id: nextId++, title, description, completed: false };
                    validateTodo(todo);
                    todos.push(todo);
                    return todo;
                },
                
                getTodos() {
                    return [...todos];
                },
                
                updateTodo(id, updates) {
                    const todo = findTodoById(id);
                    if (!todo) throw new Error('TODOが見つかりません');
                    
                    Object.assign(todo, updates);
                    validateTodo(todo);
                    return todo;
                },
                
                deleteTodo(id) {
                    const index = todos.findIndex(todo => todo.id === id);
                    if (index === -1) throw new Error('TODOが見つかりません');
                    
                    return todos.splice(index, 1)[0];
                },
                
                getStats() {
                    const total = todos.length;
                    const completed = todos.filter(todo => todo.completed).length;
                    return { total, completed, remaining: total - completed };
                }
            };
        })();

        console.log("=== TODOアプリのデモ ===");
        
        TodoApp.addTodo("JavaScriptを学習する", "基礎から応用まで");
        TodoApp.addTodo("プロジェクトを作成する");
        TodoApp.addTodo("テストを書く");
        
        console.log("TODOリスト:", TodoApp.getTodos());
        
        TodoApp.updateTodo(1, { completed: true });
        TodoApp.updateTodo(2, { completed: true });
        
        console.log("更新後の統計:", TodoApp.getStats());
        
        console.log("\n=== モジュールパターンの利点 ===");
        console.log("✅ カプセル化（プライベートメソッド）");
        console.log("✅ 名前空間の提供");
        console.log("✅ グローバル汚染の防止");
        console.log("✅ 単一責任の原則");
        
        console.log("\n=== その他の設計パターン ===");
        console.log("- Observer パターン（イベント駆動）");
        console.log("- Factory パターン（オブジェクト生成）");
        console.log("- Singleton パターン（単一インスタンス）");
        console.log("- Strategy パターン（アルゴリズム切り替え）");
        console.log("- Command パターン（操作のカプセル化）");
        
        console.log("\n=== 実践的なアーキテクチャ ===");
        console.log("- MVC（Model-View-Controller）");
        console.log("- MVP（Model-View-Presenter）");
        console.log("- MVVM（Model-View-ViewModel）");
        console.log("- Component-based Architecture");
        
        displayResult('result-project-patterns');
    };

})();
