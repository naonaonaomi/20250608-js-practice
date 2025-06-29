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

    window.runModuleExample = function() {
        captureConsoleLog();
        
        const mathModule = {
            add: function(a, b) { return a + b; },
            multiply: function(a, b) { return a * b; },
            PI: 3.14159
        };
        
        console.log("加算:", mathModule.add(5, 3));
        console.log("乗算:", mathModule.multiply(4, 7));
        console.log("円周率:", mathModule.PI);
        console.log("モジュールの利点:");
        console.log("- コードの再利用性");
        console.log("- 名前空間の分離");
        console.log("- 依存関係の明確化");
        
        displayResult('result-module');
    };

    window.runDefaultExportExample = function() {
        captureConsoleLog();
        
        class Calculator {
            add(a, b) { return a + b; }
            subtract(a, b) { return a - b; }
            multiply(a, b) { return a * b; }
            divide(a, b) { return b !== 0 ? a / b : 'エラー: ゼロ除算'; }
        }
        
        const version = '1.0.0';
        
        const calc = new Calculator();
        console.log("計算結果:", calc.add(10, 5));
        console.log("減算:", calc.subtract(20, 8));
        console.log("除算:", calc.divide(15, 3));
        console.log("バージョン:", version);
        console.log("デフォルトエクスポートの特徴:");
        console.log("- モジュールの主要機能を表現");
        console.log("- インポート時に任意の名前を付けられる");
        
        displayResult('result-default-export');
    };

    window.runDynamicImportExample = function() {
        captureConsoleLog();
        
        function simulateDynamicImport() {
            console.log("動的インポートをシミュレート中...");
            
            setTimeout(() => {
                const mathModule = {
                    add: (a, b) => a + b,
                    multiply: (a, b) => a * b
                };
                
                console.log("動的読み込み成功");
                console.log("加算結果:", mathModule.add(15, 25));
                console.log("動的インポートの利点:");
                console.log("- 必要な時だけ読み込み");
                console.log("- バンドルサイズの最適化");
                console.log("- 条件付き読み込み");
            }, 1000);
        }
        
        simulateDynamicImport();
        console.log("非同期読み込み開始...");
        
        displayResult('result-dynamic-import');
    };

    window.runOptionalChainingExample = function() {
        captureConsoleLog();
        
        const user = {
            name: "田中太郎",
            address: {
                city: "東京",
                zipCode: "100-0001"
            },
            hobbies: ["読書", "映画鑑賞"]
        };

        const userWithoutAddress = {
            name: "佐藤花子"
        };

        console.log("=== Optional Chaining の例 ===");
        console.log("都市1:", user.address && user.address.city);
        console.log("都市2:", userWithoutAddress.address && userWithoutAddress.address.city);
        
        console.log("\n=== 安全なアクセス方法 ===");
        console.log("趣味:", user.hobbies && user.hobbies[0]);
        console.log("存在しないプロパティ:", userWithoutAddress.hobbies && userWithoutAddress.hobbies[0]);
        
        console.log("\n=== Optional Chaining の利点 ===");
        console.log("- エラーを防ぐ");
        console.log("- コードが簡潔になる");
        console.log("- 深いネストでも安全");
        
        displayResult('result-optional-chaining');
    };

    window.runNullishCoalescingExample = function() {
        captureConsoleLog();
        
        const config = {
            theme: null,
            timeout: 0,
            debug: false,
            apiUrl: undefined
        };

        console.log("=== || 演算子の問題点 ===");
        console.log("テーマ:", config.theme || "デフォルト");
        console.log("タイムアウト:", config.timeout || 5000, "(0が偽値として扱われる)");
        console.log("デバッグ:", config.debug || true, "(falseが偽値として扱われる)");

        console.log("\n=== ?? 演算子（Nullish Coalescing）===");
        console.log("テーマ:", config.theme ?? "デフォルト");
        console.log("タイムアウト:", config.timeout ?? 5000, "(0はそのまま)");
        console.log("デバッグ:", config.debug ?? true, "(falseはそのまま)");
        console.log("API URL:", config.apiUrl ?? "https://api.example.com");
        
        console.log("\n=== 使い分け ===");
        console.log("?? : null/undefinedのみをチェック");
        console.log("|| : すべての偽値をチェック");
        
        displayResult('result-nullish-coalescing');
    };

    window.runNpmBasicsExample = function() {
        captureConsoleLog();
        
        console.log("=== npm（Node Package Manager）とは ===");
        console.log("- JavaScriptのパッケージ管理ツール");
        console.log("- 世界最大のソフトウェアレジストリ");
        console.log("- 依存関係の管理を自動化");
        
        console.log("\n=== 主要なnpmコマンド ===");
        console.log("npm init                 # package.jsonを作成");
        console.log("npm install <package>    # パッケージをインストール");
        console.log("npm install --save-dev   # 開発依存関係として追加");
        console.log("npm update              # パッケージを更新");
        console.log("npm run <script>        # スクリプトを実行");
        
        console.log("\n=== package.jsonの重要性 ===");
        console.log("- プロジェクトの設定ファイル");
        console.log("- 依存関係の記録");
        console.log("- スクリプトの定義");
        console.log("- メタデータの管理");
        
        console.log("\n=== セマンティックバージョニング ===");
        console.log("^1.2.3  # 1.x.x の最新版");
        console.log("~1.2.3  # 1.2.x の最新版");
        console.log("1.2.3   # 厳密にこのバージョン");
        
        displayResult('result-npm-basics');
    };

})();
