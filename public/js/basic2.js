document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('btn1').addEventListener('click', function() {
        try {
            const mathModule = {
                add: function(a, b) { return a + b; },
                multiply: function(a, b) { return a * b; },
                PI: 3.14159
            };
            
            document.getElementById('result1').innerHTML = 
                `加算: ${mathModule.add(5, 3)}<br>` +
                `乗算: ${mathModule.multiply(4, 7)}<br>` +
                `円周率: ${mathModule.PI}<br>` +
                `モジュールの利点:<br>` +
                `- コードの再利用性<br>` +
                `- 名前空間の分離<br>` +
                `- 依存関係の明確化`;
        } catch (error) {
            document.getElementById('result1').innerHTML = `エラー: ${error.message}`;
        }
    });
    
    document.getElementById('btn2').addEventListener('click', function() {
        try {
            class Calculator {
                add(a, b) { return a + b; }
                subtract(a, b) { return a - b; }
                multiply(a, b) { return a * b; }
                divide(a, b) { return b !== 0 ? a / b : 'エラー: ゼロ除算'; }
            }
            
            const version = '1.0.0';
            const calc = new Calculator();
            
            document.getElementById('result2').innerHTML = 
                `計算結果: ${calc.add(10, 5)}<br>` +
                `減算: ${calc.subtract(20, 8)}<br>` +
                `除算: ${calc.divide(15, 3)}<br>` +
                `バージョン: ${version}<br>` +
                `デフォルトエクスポートの特徴:<br>` +
                `- モジュールの主要機能を表現<br>` +
                `- インポート時に任意の名前を付けられる`;
        } catch (error) {
            document.getElementById('result2').innerHTML = `エラー: ${error.message}`;
        }
    });
    
    document.getElementById('btn3').addEventListener('click', function() {
        try {
            document.getElementById('result3').innerHTML = 
                `非同期読み込み開始...<br>` +
                `動的インポートをシミュレート中...`;
            
            setTimeout(() => {
                const mathModule = {
                    add: (a, b) => a + b,
                    multiply: (a, b) => a * b
                };
                
                document.getElementById('result3').innerHTML = 
                    `動的読み込み成功<br>` +
                    `加算結果: ${mathModule.add(15, 25)}<br>` +
                    `動的インポートの利点:<br>` +
                    `- 必要な時だけ読み込み<br>` +
                    `- バンドルサイズの最適化<br>` +
                    `- 条件付き読み込み`;
            }, 1000);
        } catch (error) {
            document.getElementById('result3').innerHTML = `エラー: ${error.message}`;
        }
    });
    
    document.getElementById('btn4').addEventListener('click', function() {
        try {
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
            
            document.getElementById('result4').innerHTML = 
                `=== Optional Chaining の例 ===<br>` +
                `都市1: ${user.address && user.address.city}<br>` +
                `都市2: ${userWithoutAddress.address && userWithoutAddress.address.city || 'undefined'}<br>` +
                `<br>=== 安全なアクセス方法 ===<br>` +
                `趣味: ${user.hobbies && user.hobbies[0]}<br>` +
                `存在しないプロパティ: ${userWithoutAddress.hobbies && userWithoutAddress.hobbies[0] || 'undefined'}<br>` +
                `<br>=== Optional Chaining の利点 ===<br>` +
                `- エラーを防ぐ<br>` +
                `- コードが簡潔になる<br>` +
                `- 深いネストでも安全`;
        } catch (error) {
            document.getElementById('result4').innerHTML = `エラー: ${error.message}`;
        }
    });
    
    document.getElementById('btn5').addEventListener('click', function() {
        try {
            const config = {
                theme: null,
                timeout: 0,
                debug: false,
                apiUrl: undefined
            };
            
            document.getElementById('result5').innerHTML = 
                `=== || 演算子の問題点 ===<br>` +
                `テーマ: ${config.theme || "デフォルト"}<br>` +
                `タイムアウト: ${config.timeout || 5000} (0が偽値として扱われる)<br>` +
                `デバッグ: ${config.debug || true} (falseが偽値として扱われる)<br>` +
                `<br>=== ?? 演算子（Nullish Coalescing）===<br>` +
                `テーマ: ${config.theme ?? "デフォルト"}<br>` +
                `タイムアウト: ${config.timeout ?? 5000} (0はそのまま)<br>` +
                `デバッグ: ${config.debug ?? true} (falseはそのまま)<br>` +
                `API URL: ${config.apiUrl ?? "https://api.example.com"}<br>` +
                `<br>=== 使い分け ===<br>` +
                `?? : null/undefinedのみをチェック<br>` +
                `|| : すべての偽値をチェック`;
        } catch (error) {
            document.getElementById('result5').innerHTML = `エラー: ${error.message}`;
        }
    });
    
    document.getElementById('btn6').addEventListener('click', function() {
        try {
            document.getElementById('result6').innerHTML = 
                `=== npm（Node Package Manager）とは ===<br>` +
                `- JavaScriptのパッケージ管理ツール<br>` +
                `- 世界最大のソフトウェアレジストリ<br>` +
                `- 依存関係の管理を自動化<br>` +
                `<br>=== 主要なnpmコマンド ===<br>` +
                `npm init                 # package.jsonを作成<br>` +
                `npm install &lt;package&gt;    # パッケージをインストール<br>` +
                `npm install --save-dev   # 開発依存関係として追加<br>` +
                `npm update              # パッケージを更新<br>` +
                `npm run &lt;script&gt;        # スクリプトを実行<br>` +
                `<br>=== package.jsonの重要性 ===<br>` +
                `- プロジェクトの設定ファイル<br>` +
                `- 依存関係の記録<br>` +
                `- スクリプトの定義<br>` +
                `- メタデータの管理<br>` +
                `<br>=== セマンティックバージョニング ===<br>` +
                `^1.2.3  # 1.x.x の最新版<br>` +
                `~1.2.3  # 1.2.x の最新版<br>` +
                `1.2.3   # 厳密にこのバージョン`;
        } catch (error) {
            document.getElementById('result6').innerHTML = `エラー: ${error.message}`;
        }
    });
    
});   