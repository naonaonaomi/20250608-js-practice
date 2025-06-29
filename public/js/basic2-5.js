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

    window.runUnitTestExample = function() {
        captureConsoleLog();
        
        function add(a, b) {
            return a + b;
        }

        function divide(a, b) {
            if (b === 0) {
                throw new Error('ゼロで割ることはできません');
            }
            return a / b;
        }

        function test(description, testFunction) {
            try {
                testFunction();
                console.log(`✅ ${description}`);
            } catch (error) {
                console.log(`❌ ${description}: ${error.message}`);
            }
        }

        function assertEqual(actual, expected) {
            if (actual !== expected) {
                throw new Error(`期待値: ${expected}, 実際の値: ${actual}`);
            }
        }

        console.log("=== ユニットテストの実行 ===");
        
        test('add関数は正しく加算する', () => {
            assertEqual(add(2, 3), 5);
            assertEqual(add(-1, 1), 0);
            assertEqual(add(0, 0), 0);
        });

        test('divide関数は正しく除算する', () => {
            assertEqual(divide(10, 2), 5);
            assertEqual(divide(7, 2), 3.5);
        });
        
        test('divide関数はゼロ除算でエラーを投げる', () => {
            try {
                divide(5, 0);
                throw new Error('エラーが投げられませんでした');
            } catch (error) {
                if (error.message !== 'ゼロで割ることはできません') {
                    throw error;
                }
            }
        });
        
        console.log("\n=== テストの重要性 ===");
        console.log("- バグの早期発見");
        console.log("- リファクタリングの安全性");
        console.log("- 仕様の明確化");
        console.log("- 回帰テストの自動化");
        
        displayResult('result-unit-test');
    };

    window.runTDDExample = function() {
        captureConsoleLog();
        
        function test(description, testFunction) {
            try {
                testFunction();
                console.log(`✅ ${description}`);
            } catch (error) {
                console.log(`❌ ${description}: ${error.message}`);
            }
        }

        function assertEqual(actual, expected) {
            if (actual !== expected) {
                throw new Error(`期待値: ${expected}, 実際の値: ${actual}`);
            }
        }

        class Calculator {
            constructor() {
                this.history = [];
            }
            
            add(a, b) {
                const result = a + b;
                this.history.push({ operation: 'add', a, b, result });
                return result;
            }
            
            subtract(a, b) {
                const result = a - b;
                this.history.push({ operation: 'subtract', a, b, result });
                return result;
            }
            
            getHistory() {
                return this.history;
            }
        }

        console.log("=== TDD（テスト駆動開発）の例 ===");
        
        test('Calculator.add は数値を加算する', () => {
            const calc = new Calculator();
            assertEqual(calc.add(5, 3), 8);
        });
        
        test('Calculator.subtract は数値を減算する', () => {
            const calc = new Calculator();
            assertEqual(calc.subtract(10, 4), 6);
        });
        
        test('Calculator.getHistory は履歴を返す', () => {
            const calc = new Calculator();
            calc.add(1, 2);
            const history = calc.getHistory();
            assertEqual(history.length, 1);
            assertEqual(history[0].operation, 'add');
        });
        
        console.log("\n=== TDDのサイクル ===");
        console.log("1. Red: 失敗するテストを書く");
        console.log("2. Green: テストを通す最小限の実装");
        console.log("3. Refactor: コードを改善する");
        
        console.log("\n=== TDDの利点 ===");
        console.log("- 設計の改善");
        console.log("- テストカバレッジの向上");
        console.log("- 仕様の明確化");
        console.log("- 自信を持ったリファクタリング");
        
        displayResult('result-tdd');
    };

    window.runCodeQualityExample = function() {
        captureConsoleLog();
        
        function calculateTotalPrice(items, taxRate = 0.1) {
            if (!Array.isArray(items)) {
                throw new Error('items must be an array');
            }
            
            const subtotal = items.reduce((sum, item) => {
                if (typeof item.price !== 'number' || item.price < 0) {
                    throw new Error('Invalid item price');
                }
                return sum + item.price;
            }, 0);
            
            const tax = subtotal * taxRate;
            return Math.round((subtotal + tax) * 100) / 100;
        }

        console.log("=== コード品質のポイント ===");
        console.log("✅ 意味のある変数名");
        console.log("✅ 関数は単一責任");
        console.log("✅ エラーハンドリング");
        console.log("✅ 型チェック");
        console.log("✅ 適切なコメント");
        console.log("✅ 一貫したコーディングスタイル");
        
        const items = [
            { name: 'りんご', price: 100 },
            { name: 'バナナ', price: 80 },
            { name: 'オレンジ', price: 120 }
        ];
        
        try {
            const total = calculateTotalPrice(items, 0.08);
            console.log(`\n商品リスト:`);
            items.forEach(item => console.log(`- ${item.name}: ${item.price}円`));
            console.log(`合計金額（税込）: ${total}円`);
        } catch (error) {
            console.log(`エラー: ${error.message}`);
        }
        
        console.log("\n=== リンティングツールの例 ===");
        console.log("- ESLint: JavaScript用リンター");
        console.log("- Prettier: コードフォーマッター");
        console.log("- JSHint: 軽量なリンター");
        console.log("- StandardJS: 設定不要のスタイルガイド");
        
        displayResult('result-code-quality');
    };

    window.runPerformanceExample = function() {
        captureConsoleLog();
        
        function measurePerformance(func, label) {
            const start = performance.now();
            const result = func();
            const end = performance.now();
            console.log(`${label}: ${(end - start).toFixed(2)}ms`);
            return result;
        }

        const largeArray = Array.from({ length: 10000 }, (_, i) => i);
        
        function useForLoop() {
            let sum = 0;
            for (let i = 0; i < largeArray.length; i++) {
                sum += largeArray[i];
            }
            return sum;
        }
        
        function useReduce() {
            return largeArray.reduce((sum, num) => sum + num, 0);
        }
        
        function useForEach() {
            let sum = 0;
            largeArray.forEach(num => sum += num);
            return sum;
        }
        
        console.log("=== パフォーマンス比較（1万要素の配列） ===");
        measurePerformance(useForLoop, 'for文');
        measurePerformance(useReduce, 'reduce');
        measurePerformance(useForEach, 'forEach');
        
        console.log("\n=== 最適化のポイント ===");
        console.log("- 適切なアルゴリズムの選択");
        console.log("- 不要な処理の削除");
        console.log("- メモリ使用量の最適化");
        console.log("- DOM操作の最小化");
        console.log("- 非同期処理の活用");
        
        console.log("\n=== パフォーマンス測定ツール ===");
        console.log("- performance.now(): 高精度時間測定");
        console.log("- console.time(): 簡単な時間測定");
        console.log("- DevTools Profiler: 詳細な分析");
        console.log("- Lighthouse: Webパフォーマンス監査");
        
        displayResult('result-performance');
    };

    window.runMemoryManagementExample = function() {
        captureConsoleLog();
        
        class EventManager {
            constructor() {
                this.listeners = new Map();
                this.timers = new Set();
            }
            
            addListener(element, event, handler) {
                if (!this.listeners.has(element)) {
                    this.listeners.set(element, []);
                }
                this.listeners.get(element).push({ event, handler });
                console.log(`イベントリスナーを追加: ${event}`);
            }
            
            addTimer(callback, delay) {
                const timerId = setTimeout(callback, delay);
                this.timers.add(timerId);
                console.log(`タイマーを追加: ${delay}ms`);
                return timerId;
            }
            
            cleanup() {
                console.log("リソースをクリーンアップ中...");
                
                for (const [element, listeners] of this.listeners) {
                    listeners.forEach(({ event, handler }) => {
                        console.log(`イベントリスナーを削除: ${event}`);
                    });
                }
                this.listeners.clear();
                
                for (const timerId of this.timers) {
                    clearTimeout(timerId);
                }
                this.timers.clear();
                
                console.log("✅ リソースのクリーンアップ完了");
            }
        }

        console.log("=== メモリ管理の例 ===");
        const eventManager = new EventManager();
        
        const dummyElement = { addEventListener: () => {}, removeEventListener: () => {} };
        eventManager.addListener(dummyElement, 'click', () => {});
        eventManager.addTimer(() => console.log('タイマー実行'), 1000);
        
        setTimeout(() => {
            eventManager.cleanup();
        }, 500);
        
        console.log("\n=== WeakMap/WeakSet の活用 ===");
        const weakMap = new WeakMap();
        const obj = { name: "テストオブジェクト" };
        
        weakMap.set(obj, "関連データ");
        console.log("WeakMapにデータを設定:", weakMap.has(obj));
        
        console.log("\n=== メモリリーク対策 ===");
        console.log("✅ イベントリスナーの適切な削除");
        console.log("✅ タイマーのクリアアップ");
        console.log("✅ 循環参照の回避");
        console.log("✅ WeakMap/WeakSetの活用");
        console.log("✅ 不要な変数の削除");
        
        console.log("\n=== よくあるメモリリークの原因 ===");
        console.log("- 削除されないイベントリスナー");
        console.log("- クリアされないタイマー");
        console.log("- 循環参照");
        console.log("- グローバル変数の乱用");
        console.log("- DOMノードの参照保持");
        
        displayResult('result-memory-management');
    };

})();
