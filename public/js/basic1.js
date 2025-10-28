document.addEventListener('DOMContentLoaded', function() {
    function bindAction(buttonId, resultId, action, handleError) {
        document.getElementById(buttonId).addEventListener('click', function() {
            const result = document.getElementById(resultId);
            result.innerHTML = '';
            try {
                action(result);
            } catch (error) {
                if (typeof handleError === 'function') {
                    handleError(result, error);
                } else {
                    result.innerHTML = `エラー: ${error.message}`;
                }
            }
        });
    }

    // 1. 変数とデータ型
    bindAction('btn1', 'result1', (result) => {
        let age = 25;
        let userName = "田中太郎";
        let isStudent = true;
        let person = { name: "佐藤", age: 30 };
        let colors = ["赤", "青", "緑"];

        result.innerHTML += `<div>年齢: ${age} 名前: ${userName}</div>`;
        result.innerHTML += `<div>学生: ${isStudent}</div>`;
        result.innerHTML += `<div>人物: ${JSON.stringify(person)}</div>`;
        result.innerHTML += `<div>色: ${colors.join(', ')}</div>`;
    });

    // 2. 演算子
    bindAction('btn2', 'result2', (result) => {
        let x = 10, y = 3;
        result.innerHTML += `<div>計算: ${x + y}, ${x - y}, ${x * y}, ${(x / y).toFixed(2)}</div>`;
        result.innerHTML += `<div>比較: ${x > y}, ${x === y}</div>`;
        result.innerHTML += `<div>論理: ${x > 18 && true}</div>`;
    });

    // 3. 制御構文
    bindAction('btn3', 'result3', (result) => {
        let score = 85;
        if (score >= 90) {
            result.innerHTML += `<div>優秀！</div>`;
        } else if (score >= 70) {
            result.innerHTML += `<div>良い！</div>`;
        } else {
            result.innerHTML += `<div>頑張ろう！</div>`;
        }

        for (let i = 1; i <= 3; i++) {
            result.innerHTML += `<div>${i}回目</div>`;
        }
    });

    // 4. 関数
    bindAction('btn4', 'result4', (result) => {
        function greet(name) {
            return `こんにちは、${name}さん！`;
        }
        const double = (num) => num * 2;

        result.innerHTML += `<div>${greet("山田")}</div>`;
        result.innerHTML += `<div>5の2倍: ${double(5)}</div>`;
    });

    // 5. オブジェクトと配列
    bindAction('btn5', 'result5', (result) => {
        let student = { name: "鈴木花子", age: 20, grade: "A" };
        let fruits = ["りんご", "バナナ"];

        result.innerHTML += `<div>学生: ${student.name} ${student.age}</div>`;
        fruits.push("オレンジ");
        result.innerHTML += `<div>果物: ${fruits[0]} | ${fruits.join(', ')}</div>`;
    });

    // 6. 配列メソッド
    bindAction('btnArray', 'resultArray', (result) => {
        let numbers = [1, 2, 3, 4, 5];
        let doubled = numbers.map(num => num * 2);
        let evens = numbers.filter(num => num % 2 === 0);
        let found = numbers.find(num => num > 3);

        result.innerHTML += `<div>元配列: ${numbers.join(', ')}</div>`;
        result.innerHTML += `<div>2倍: ${doubled.join(', ')}</div>`;
        result.innerHTML += `<div>偶数: ${evens.join(', ')}</div>`;
        result.innerHTML += `<div>見つけた: ${found}</div>`;
    });

    // 7. DOM操作
    bindAction('btn6', 'result6', (result) => {
        let target = document.getElementById('demo');
        target.textContent = "JavaScriptで変更されました！";
        target.style.color = "white";
        target.style.fontWeight = "bold";
        result.innerHTML = `<div>要素を変更しました</div>`;
    });

    // 8. ES6機能
    bindAction('btn8', 'result8', (result) => {
        let userName = "田中", userAge = 25;
        let message = `ユーザー: ${userName}, 年齢: ${userAge}歳`;

        let user = { name: "佐藤", age: 30, city: "東京" };
        let { name, age, city } = user;

        let arr1 = [1, 2, 3];
        let arr2 = [...arr1, 4, 5];

        result.innerHTML += `<div>${message}</div>`;
        result.innerHTML += `<div>分割代入: ${name}, ${age}, ${city}</div>`;
        result.innerHTML += `<div>配列: ${arr2.join(', ')}</div>`;
    });

    // 9. 非同期処理
    bindAction('btn9', 'result9', (result) => {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve("処理完了！"), 1000);
        });

        result.innerHTML += '<div>Promise実行中...</div>';

        promise.then(promiseResult => {
            result.innerHTML += `<div>Promise結果: ${promiseResult}</div>`;
        });

        async function fetchData() {
            result.innerHTML += '<div>データ取得開始</div>';
            await new Promise(resolve => setTimeout(resolve, 500));
            result.innerHTML += '<div>データ取得完了</div>';
        }
        
        fetchData();
    }, (result, error) => {
        result.innerHTML += `<div style="color: red;">エラー: ${error.message}</div>`;
    });
});